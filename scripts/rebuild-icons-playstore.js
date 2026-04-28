#!/usr/bin/env node
/**
 * Rebuild every game's app icon URL from the Google Play Store.
 *
 * Why: the existing icons are sourced from Apple's mzstatic CDN
 * which serves marketing banners for some titles (Free Fire,
 * PUBG Mobile) instead of the actual square app icon. Those tiles
 * end up with portrait/landscape art crammed into our square grid
 * cells, leaving black letterbox bars around the character — not
 * the uniform square-icon look bajgames.xyz has.
 *
 * Google Play returns a guaranteed-square 512×512 app icon for
 * every app via `<img alt="Icon image" srcset="…">` in the store
 * page HTML. We scrape that URL, upgrade it to 512×512, and emit
 * a `data/icons.js` map keyed by apkg.
 *
 * games.js is then updated to consult this map first, falling
 * back to the existing Apple CDN URL if the Play scrape didn't
 * find an icon for that apkg (rare).
 *
 * Run: node scripts/rebuild-icons-playstore.js
 */

const fs = require('fs');
const path = require('path');
const https = require('https');

const GAMES_PATH = path.join(__dirname, '..', 'data', 'games.js');
const OUT_PATH = path.join(__dirname, '..', 'data', 'icons.js');
const AUDIT_PATH = path.join(__dirname, 'icons-audit.json');

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
          Accept: 'text/html',
        },
      },
      (res) => {
        if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          return fetchHtml(res.headers.location, depth + 1).then(resolve, reject);
        }
        if (res.statusCode !== 200) return reject(new Error(`HTTP ${res.statusCode}`));
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
  const out = [];
  const re = /\{[^{}]*title:\s*'([^']+)'[^{}]*\}/g;
  let m;
  while ((m = re.exec(src))) {
    const block = m[0];
    const t = block.match(/title:\s*'([^']+)'/);
    const a = block.match(/apkg:\s*'([^']*)'/);
    if (t && a && a[1]) out.push({ title: t[1], apkg: a[1] });
  }
  return out;
}

function extractIcon(html) {
  // <img alt="Icon image" srcset="URL [size], URL2 [size2]">
  // Pick highest-res URL from srcset, then upgrade to 512×512.
  const re = /<img[^>]+alt="Icon image"[^>]+srcset="([^"]+)"|<img[^>]+srcset="([^"]+)"[^>]+alt="Icon image"/i;
  const m = html.match(re);
  if (!m) return null;
  const srcset = m[1] || m[2];
  const urls = (srcset.match(/https:\/\/play-lh\.googleusercontent\.com\/[^ ]+/g) || []);
  if (urls.length === 0) return null;
  // Take the last (highest resolution) and upgrade to a clean 512×512.
  const last = urls[urls.length - 1];
  return last.replace(/=w\d+-h\d+(-rw)?(\s|$)/, '=w512-h512-rw$2').split(' ')[0];
}

async function main() {
  const src = fs.readFileSync(GAMES_PATH, 'utf-8');
  const games = parseGames(src);
  console.log(`Found ${games.length} games with apkg.`);

  const map = {};
  const audit = { ok: [], failed: [] };

  for (let i = 0; i < games.length; i++) {
    const g = games[i];
    process.stdout.write(`\r[${i + 1}/${games.length}] ${g.title.slice(0, 36).padEnd(36)} `);
    try {
      const html = await fetchHtml(
        `https://play.google.com/store/apps/details?id=${g.apkg}&hl=en&gl=US`
      );
      const icon = extractIcon(html);
      if (icon) {
        map[g.apkg] = icon;
        audit.ok.push({ title: g.title, apkg: g.apkg });
      } else {
        audit.failed.push({ ...g, reason: 'icon not found in HTML' });
      }
    } catch (e) {
      audit.failed.push({ ...g, reason: String(e.message || e) });
    }
    await sleep(150);
  }
  process.stdout.write('\n');

  // ─── Write data/icons.js ────────────────────────────────
  const lines = [];
  lines.push('/* Real square app icons from Google Play Store HTML pages.');
  lines.push(`   Auto-regenerated: ${new Date().toISOString()}`);
  lines.push('   Source: scripts/rebuild-icons-playstore.js');
  lines.push('   Keyed by apkg. games.js consults this first, falls back to');
  lines.push('   the original Apple CDN URL if no Play Store icon is found. */');
  lines.push('');
  lines.push('const iconMap = {');
  for (const [apkg, url] of Object.entries(map)) {
    lines.push(`  '${apkg}': '${url}',`);
  }
  lines.push('};');
  lines.push('');
  lines.push('export default iconMap;');
  lines.push('');

  fs.writeFileSync(OUT_PATH, lines.join('\n'));
  fs.writeFileSync(AUDIT_PATH, JSON.stringify(audit, null, 2));

  console.log(`\n  ✓ ${audit.ok.length} icons fetched from Play Store`);
  console.log(`  ✗ ${audit.failed.length} games skipped (will fall back to existing icon)`);
  console.log(`  Output: ${path.relative(process.cwd(), OUT_PATH)}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
