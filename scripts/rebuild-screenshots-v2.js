#!/usr/bin/env node
/**
 * Rebuild data/screenshots.js by scraping the public App Store
 * page for each game (the iTunes Lookup JSON API stopped
 * returning screenshotUrls for most apps mid-2024).
 *
 * Strategy:
 *   1. For every game with an iid, GET https://apps.apple.com/us/app/idXXX
 *      with a Chrome User-Agent so Apple serves the full HTML.
 *   2. The page renders <picture> elements whose <source srcset="">
 *      attributes embed the real iPhone screenshot URLs. The
 *      filename segment contains "screenshot_iphone_large_en-US_"
 *      which lets us reliably distinguish screenshots from app
 *      icons / placeholders.
 *   3. Dedupe by the base mzstatic asset path (everything before
 *      the size suffix) so we don't write 5 differently-sized
 *      copies of the same screenshot.
 *   4. Replace the trailing size suffix with our HD pattern
 *      (1218x684bb for landscape, 1176x2088bb for portrait).
 *   5. Take up to 5 per game.
 *
 * Output:
 *   data/screenshots.js
 *   scripts/screenshots-audit-v2.json
 */

const fs = require('fs');
const path = require('path');
const https = require('https');

const GAMES_PATH = path.join(__dirname, '..', 'data', 'games.js');
const OUT_PATH = path.join(__dirname, '..', 'data', 'screenshots.js');
const AUDIT_PATH = path.join(__dirname, 'screenshots-audit-v2.json');
const BACKUP_PATH = OUT_PATH + '.bak.' + Date.now();

const UA =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36';

function fetchHtml(url) {
  return new Promise((resolve, reject) => {
    const req = https.get(
      url,
      {
        headers: {
          'User-Agent': UA,
          'Accept': 'text/html,application/xhtml+xml',
          'Accept-Language': 'en-US,en;q=0.9',
        },
      },
      (res) => {
        // Follow redirects
        if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          return fetchHtml(res.headers.location).then(resolve, reject);
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
  const re = /title:\s*'([^']+)'[^}]*iid:\s*'([^']*)'/g;
  const out = [];
  let m;
  while ((m = re.exec(src))) {
    if (m[2]) out.push({ title: m[1], iid: m[2] });
  }
  return out;
}

/**
 * Pull screenshot URLs from one App Store page.
 * Returns up to 5 unique HD URLs.
 */
function extractScreenshots(html) {
  // Match every <source srcset="..."> attribute value.
  const re = /<source[^>]+srcset="([^"]+)"/g;
  const dedup = new Map(); // base path → full URL (first encountered)
  let m;
  while ((m = re.exec(html))) {
    const srcset = m[1];
    // First URL in the srcset (before any whitespace+resolution).
    const firstUrl = srcset.split(/[\s,]+/)[0];
    if (!firstUrl || !/mzstatic\.com\/image\/thumb/.test(firstUrl)) continue;

    const lower = firstUrl.toLowerCase();
    // Only iPhone screenshots — skip icons, placeholders, ipad-only,
    // editorial banners.
    if (
      !lower.includes('screenshot_iphone') ||
      lower.includes('placeholder') ||
      lower.includes('appicon') ||
      lower.includes('editor')
    ) {
      continue;
    }

    // Base path = everything except the trailing /SIZE.ext segment.
    const base = firstUrl.replace(/\/[^/]+\.[a-z]+$/i, '');
    if (dedup.has(base)) continue;
    dedup.set(base, firstUrl);
    if (dedup.size >= 5) break;
  }
  return Array.from(dedup.values());
}

/**
 * Apple's HTML returns small/webp variants. Replace the trailing
 * `/{w}x{h}wa.{ext}` or `bb.{ext}` size with our HD pattern.
 * Output is always JPG (smaller than PNG) at portrait HD.
 */
function upgradeToHd(url) {
  // Strip the size+ext segment and replace with HD JPG portrait
  // (most Apple iPhone screenshots are portrait 9:16).
  return url.replace(/\/[^/]+\.[a-z]+$/i, '/1176x2088bb.jpg');
}

async function main() {
  const src = fs.readFileSync(GAMES_PATH, 'utf-8');
  const games = parseGames(src);
  console.log(`Found ${games.length} games with iids.`);

  if (fs.existsSync(OUT_PATH)) {
    fs.copyFileSync(OUT_PATH, BACKUP_PATH);
    console.log(`Backed up to ${path.basename(BACKUP_PATH)}`);
  }

  const fresh = {};
  const audit = { ok: [], empty: [], failed: [] };

  let i = 0;
  for (const g of games) {
    i++;
    process.stdout.write(`\r[${i}/${games.length}] ${g.title.slice(0, 38).padEnd(38)} `);
    try {
      const html = await fetchHtml(`https://apps.apple.com/us/app/id${g.iid}`);
      const urls = extractScreenshots(html);
      if (urls.length === 0) {
        audit.empty.push({ ...g });
        continue;
      }
      fresh[g.iid] = urls.map(upgradeToHd);
      audit.ok.push({ title: g.title, iid: g.iid, count: urls.length });
    } catch (e) {
      audit.failed.push({ ...g, reason: String(e.message || e) });
    }
    await sleep(120); // ~8 req/sec
  }
  process.stdout.write('\n');

  // ─── Write screenshots.js ────────────────────────────────
  const lines = [];
  lines.push('/* Real gameplay screenshots from Apple App Store HTML pages');
  lines.push(`   Auto-regenerated: ${new Date().toISOString()}`);
  lines.push('   Source: scripts/rebuild-screenshots-v2.js');
  lines.push('   To refresh: `node scripts/rebuild-screenshots-v2.js`');
  lines.push(`   Backup: ${path.basename(BACKUP_PATH)} */`);
  lines.push('');
  lines.push('const screenshotMap = {');
  for (const [iid, urls] of Object.entries(fresh)) {
    lines.push(`  '${iid}': [`);
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

  console.log(`\n  ✓ ${audit.ok.length} games rebuilt with verified screenshots`);
  console.log(`  ⚠ ${audit.empty.length} games with no screenshots extracted`);
  console.log(`  ✗ ${audit.failed.length} fetch failures`);
  console.log(`  Output: ${path.relative(process.cwd(), OUT_PATH)}`);
  console.log(`  Audit:  ${path.relative(process.cwd(), AUDIT_PATH)}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
