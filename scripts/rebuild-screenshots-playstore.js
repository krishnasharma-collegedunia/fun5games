#!/usr/bin/env node
/**
 * Rebuild data/screenshots.js by scraping Google Play Store
 * pages instead of Apple App Store (much more permissive than
 * Apple — no rate limit on the public detail page in our
 * traffic range).
 *
 * For each game with an `apkg` (Google Play package id), we:
 *   1. GET https://play.google.com/store/apps/details?id={apkg}&hl=en&gl=US
 *   2. Extract every <img alt="Screenshot image" src="..."> URL
 *      (these are uniquely identified by the alt attribute Google
 *      sets on legitimate screenshot tiles in the carousel)
 *   3. Upgrade the size suffix on the play-lh.googleusercontent.com
 *      URL — Google CDN takes a `=w{W}-h{H}-rw` query that lets us
 *      request HD without re-fetching. Default in HTML is
 *      w526-h296; we swap to w1920-h1080 for retina.
 *   4. Dedupe by base path so we don't get the same image at
 *      multiple sizes.
 *   5. Take the first 5 per game.
 *
 * The map is keyed by iid (Apple track ID) instead of apkg so the
 * existing data/games.js consumer doesn't change. Games without an
 * iid are stored under their apkg as a fallback key — components
 * that resolve screenshots can fall through.
 *
 * Output:
 *   data/screenshots.js                   — regenerated map
 *   scripts/screenshots-audit-playstore.json
 */

const fs = require('fs');
const path = require('path');
const https = require('https');

const GAMES_PATH = path.join(__dirname, '..', 'data', 'games.js');
const OUT_PATH = path.join(__dirname, '..', 'data', 'screenshots.js');
const AUDIT_PATH = path.join(__dirname, 'screenshots-audit-playstore.json');
const BACKUP_PATH = OUT_PATH + '.bak.' + Date.now();

const UA =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36';

function fetchHtml(url, depth = 0) {
  if (depth > 4) return Promise.reject(new Error('too many redirects'));
  return new Promise((resolve, reject) => {
    const req = https.get(
      url,
      {
        headers: {
          'User-Agent': UA,
          'Accept-Language': 'en-US,en;q=0.9',
          Accept: 'text/html,application/xhtml+xml',
        },
      },
      (res) => {
        if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          return fetchHtml(res.headers.location, depth + 1).then(resolve, reject);
        }
        if (res.statusCode !== 200) {
          return reject(new Error(`HTTP ${res.statusCode}`));
        }
        let data = '';
        res.on('data', (c) => (data += c));
        res.on('end', () => resolve(data));
      }
    );
    req.on('error', reject);
    req.setTimeout(15000, () => req.destroy(new Error('timeout')));
  });
}

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

function parseGames(src) {
  // Pull title, iid, apkg per game definition.
  const out = [];
  // Each game block ends with "}". Scan for `title:` then within
  // the next ~600 chars, find iid + apkg.
  const re = /\{[^{}]*title:\s*'([^']+)'[^{}]*\}/g;
  let m;
  while ((m = re.exec(src))) {
    const block = m[0];
    const titleMatch = block.match(/title:\s*'([^']+)'/);
    const iidMatch = block.match(/iid:\s*'([^']*)'/);
    const apkgMatch = block.match(/apkg:\s*'([^']*)'/);
    if (titleMatch && apkgMatch && apkgMatch[1]) {
      out.push({
        title: titleMatch[1],
        iid: iidMatch ? iidMatch[1] : '',
        apkg: apkgMatch[1],
      });
    }
  }
  return out;
}

function extractScreenshots(html) {
  // Match <img ... alt="Screenshot image" src="..."> in either order.
  const re = /<img[^>]+(?:src="(https:\/\/play-lh\.googleusercontent\.com\/[^"]+)"[^>]*alt="Screenshot[^"]*"|alt="Screenshot[^"]*"[^>]*src="(https:\/\/play-lh\.googleusercontent\.com\/[^"]+)")/g;
  const seen = new Set(); // base path → already added
  const urls = [];
  let m;
  while ((m = re.exec(html))) {
    const url = m[1] || m[2];
    if (!url) continue;
    // The base of a play-lh URL is everything before the `=` size hint.
    const base = url.split('=')[0];
    if (seen.has(base)) continue;
    seen.add(base);
    urls.push(url);
    if (urls.length >= 6) break;
  }
  return urls;
}

function upgradeToHd(url) {
  // play-lh.googleusercontent.com URLs end with `=w{W}-h{H}-rw`
  // (or sometimes `=w{W}-h{H}`). Replace with HD.
  return url.replace(/=w\d+-h\d+(-rw)?$/, '=w1920-h1080-rw');
}

async function main() {
  const src = fs.readFileSync(GAMES_PATH, 'utf-8');
  const games = parseGames(src);
  console.log(`Found ${games.length} games with apkg.`);

  if (fs.existsSync(OUT_PATH)) {
    fs.copyFileSync(OUT_PATH, BACKUP_PATH);
    console.log(`Backed up old screenshots.js → ${path.basename(BACKUP_PATH)}`);
  }

  const fresh = {}; // iid → urls (or apkg as key when no iid)
  const audit = { ok: [], empty: [], failed: [] };

  let i = 0;
  for (const g of games) {
    i++;
    process.stdout.write(`\r[${i}/${games.length}] ${g.title.slice(0, 36).padEnd(36)} `);
    try {
      const html = await fetchHtml(
        `https://play.google.com/store/apps/details?id=${g.apkg}&hl=en&gl=US`
      );
      const urls = extractScreenshots(html);
      if (urls.length === 0) {
        audit.empty.push({ ...g });
        continue;
      }
      const key = g.iid || g.apkg;
      fresh[key] = urls.map(upgradeToHd);
      audit.ok.push({ title: g.title, key, count: urls.length });
    } catch (e) {
      audit.failed.push({ ...g, reason: String(e.message || e) });
    }
    await sleep(150); // ~6 req/sec — Google Play is permissive but be polite
  }
  process.stdout.write('\n');

  // ─── Write screenshots.js ──────────────────────────────────
  const lines = [];
  lines.push('/* Real gameplay screenshots from Google Play Store HTML pages');
  lines.push(`   Auto-regenerated: ${new Date().toISOString()}`);
  lines.push('   Source: scripts/rebuild-screenshots-playstore.js');
  lines.push('   To refresh: `node scripts/rebuild-screenshots-playstore.js`');
  lines.push(`   Backup: ${path.basename(BACKUP_PATH)} */`);
  lines.push('');
  lines.push('const screenshotMap = {');
  for (const [key, urls] of Object.entries(fresh)) {
    lines.push(`  '${key}': [`);
    for (const u of urls) {
      lines.push(`    '${u}',`);
    }
    lines.push('  ],');
  }
  lines.push('};');
  lines.push('');
  lines.push('export default screenshotMap;');
  lines.push('');

  fs.writeFileSync(OUT_PATH, lines.join('\n'));
  fs.writeFileSync(AUDIT_PATH, JSON.stringify(audit, null, 2));

  console.log(
    `\n  ✓ ${audit.ok.length} games with verified Play Store screenshots`
  );
  console.log(`  ⚠ ${audit.empty.length} games returned no screenshots`);
  console.log(`  ✗ ${audit.failed.length} fetch failures`);
  console.log(`  Output: ${path.relative(process.cwd(), OUT_PATH)}`);
  console.log(`  Audit:  ${path.relative(process.cwd(), AUDIT_PATH)}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
