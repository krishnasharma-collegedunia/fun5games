#!/usr/bin/env node
/**
 * Rebuild data/screenshots.js from Apple iTunes Lookup API.
 *
 * Why:
 *   The existing file was hand-curated and over time some entries
 *   drifted (wrong screenshots in My Talking Tom's slot, etc.).
 *   Apple's Lookup API returns the AUTHORITATIVE current screenshots
 *   for any given iid — pulling fresh fixes any drift in one pass.
 *
 * What:
 *   For each game in data/games.js:
 *     - Calls https://itunes.apple.com/lookup?id={iid}
 *     - If iid resolves AND track name loosely matches our title,
 *       writes the real screenshotUrls to the new file
 *     - If iid resolves but track name is wildly different, logs
 *       it to a "needs-manual-review" list and skips
 *     - Upgrades each screenshot URL to HD (replaces Apple's
 *       default thumbnail size with our HD pattern)
 *
 * Output:
 *   data/screenshots.js              — the regenerated file
 *   scripts/screenshots-audit.json   — full report (which games
 *                                      passed, which need review)
 *
 * Run:
 *   node scripts/rebuild-screenshots.js
 *
 * Idempotent — safe to re-run as Apple updates app screenshots.
 */

const fs = require('fs');
const path = require('path');
const https = require('https');

const GAMES_PATH = path.join(__dirname, '..', 'data', 'games.js');
const OUT_PATH = path.join(__dirname, '..', 'data', 'screenshots.js');
const AUDIT_PATH = path.join(__dirname, 'screenshots-audit.json');

const BACKUP_PATH = OUT_PATH + '.bak.' + Date.now();

function getJson(url) {
  return new Promise((resolve, reject) => {
    https
      .get(url, (res) => {
        let data = '';
        res.on('data', (c) => (data += c));
        res.on('end', () => {
          try {
            resolve(JSON.parse(data));
          } catch (e) {
            reject(new Error(`Bad JSON from ${url}: ${e.message}`));
          }
        });
      })
      .on('error', reject);
  });
}

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

function normalize(s) {
  return (s || '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();
}

function looselyMatches(ourTitle, appleName) {
  const a = normalize(ourTitle);
  const b = normalize(appleName);
  if (!a || !b) return false;
  if (a === b) return true;
  return a.includes(b) || b.includes(a);
}

/**
 * Apple's screenshotUrls come at a generic size. Replace the
 * trailing `/{w}x{h}bb.{ext}` segment with our HD target so the
 * pre-rendered HTML serves crisp images on retina screens.
 */
function upgradeToHd(url) {
  // Apple URLs end with `/[width]x[height]bb.[ext]` like
  // `/300x0w.png` or `/392x696bb.jpg`. Detect orientation from
  // the source ratio and pick a proper HD target.
  const sizeMatch = url.match(/\/(\d+)x(\d+)(bb|w)\.([a-z]+)$/i);
  if (!sizeMatch) return url;
  const w = Number(sizeMatch[1]);
  const h = Number(sizeMatch[2]);
  const ext = sizeMatch[4];
  const isLandscape = w > h;
  const target = isLandscape ? '1218x684bb' : '1176x2088bb';
  return url.replace(/\/\d+x\d+(bb|w)\.[a-z]+$/i, `/${target}.${ext}`);
}

/**
 * Tiny ad-hoc parser for data/games.js — extract title + iid
 * pairs without pulling in the whole module (the module imports
 * the very file we're rewriting, which would be circular at
 * script-runtime).
 */
function parseGames(src) {
  const re = /title:\s*'([^']+)'[^}]*iid:\s*'([^']*)'/g;
  const out = [];
  let m;
  while ((m = re.exec(src))) {
    if (m[2]) out.push({ title: m[1], iid: m[2] });
  }
  return out;
}

async function main() {
  const src = fs.readFileSync(GAMES_PATH, 'utf-8');
  const games = parseGames(src);
  console.log(`Found ${games.length} games with iids.`);

  // Backup existing screenshots.js so we can roll back if needed.
  if (fs.existsSync(OUT_PATH)) {
    fs.copyFileSync(OUT_PATH, BACKUP_PATH);
    console.log(`Backed up existing file to ${path.basename(BACKUP_PATH)}`);
  }

  const fresh = {}; // iid -> array of HD URLs
  const audit = {
    ok: [],
    nameMismatch: [],
    noScreenshots: [],
    apiFailed: [],
  };

  let i = 0;
  for (const g of games) {
    i++;
    process.stdout.write(`\r[${i}/${games.length}] ${g.title.slice(0, 40).padEnd(40)} `);
    try {
      const data = await getJson(`https://itunes.apple.com/lookup?id=${g.iid}`);
      const r = (data.results || [])[0];
      if (!r) {
        audit.apiFailed.push({ ...g, reason: 'iid not found' });
        continue;
      }

      const appleName = r.trackName || r.collectionName || '';
      const screenshotUrls = (r.screenshotUrls || []).slice(0, 5);
      const ipadUrls = (r.ipadScreenshotUrls || []).slice(0, 5);
      const allUrls = screenshotUrls.length > 0 ? screenshotUrls : ipadUrls;

      if (allUrls.length === 0) {
        audit.noScreenshots.push({ ...g, appleName });
        continue;
      }

      const matchesTitle = looselyMatches(g.title, appleName);

      // We only write screenshots for entries that pass the
      // name-similarity check. Mismatches are logged so a human
      // can decide whether to update the iid or remove the entry.
      if (!matchesTitle) {
        audit.nameMismatch.push({
          ourTitle: g.title,
          iid: g.iid,
          appleName,
          bundleId: r.bundleId,
          screenshotCount: allUrls.length,
        });
        continue;
      }

      fresh[g.iid] = allUrls.map(upgradeToHd);
      audit.ok.push({ title: g.title, iid: g.iid, count: allUrls.length });
    } catch (e) {
      audit.apiFailed.push({ ...g, reason: String(e.message || e) });
    }

    await sleep(80); // be nice to Apple
  }

  process.stdout.write('\n');

  // ─── Generate the new data/screenshots.js ─────────────────────
  const lines = [];
  lines.push("/* Real gameplay screenshots from Apple App Store");
  lines.push(`   Auto-regenerated: ${new Date().toISOString()}`);
  lines.push('   Source: scripts/rebuild-screenshots.js');
  lines.push('   To refresh: `node scripts/rebuild-screenshots.js`');
  lines.push('   Backup of previous file at ' + path.basename(BACKUP_PATH) + ' */');
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

  console.log(`\nDone.`);
  console.log(`  ✓ ${audit.ok.length} games with verified Apple screenshots`);
  console.log(`  ⚠ ${audit.nameMismatch.length} games with iid → wrong app (skipped, see audit)`);
  console.log(`  ⚠ ${audit.noScreenshots.length} games with no screenshots in Apple data`);
  console.log(`  ⚠ ${audit.apiFailed.length} API lookup failures`);
  console.log(`  Output: ${path.relative(process.cwd(), OUT_PATH)}`);
  console.log(`  Audit:  ${path.relative(process.cwd(), AUDIT_PATH)}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
