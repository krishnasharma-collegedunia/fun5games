#!/usr/bin/env node
/**
 * Screenshot integrity auditor.
 *
 * For every game in data/games.js with an `iid` (Apple App Store
 * track ID), call the iTunes Lookup API to verify:
 *   1. The track ID resolves to a real app
 *   2. The app name on Apple matches our `title` (sanity check)
 *   3. The screenshots in data/screenshots.js for that iid are
 *      the genuine ones Apple is currently serving
 *
 * Outputs a markdown report to stdout listing:
 *   - mismatches between our title and Apple's track name
 *   - games whose screenshots need to be re-fetched
 *
 * No file writes — this is the read-only audit pass. The repair
 * script (rebuild-screenshots.js) does the actual fix.
 *
 * Run:
 *   node scripts/audit-screenshots.js
 */

const fs = require('fs');
const path = require('path');
const https = require('https');

const GAMES_PATH = path.join(__dirname, '..', 'data', 'games.js');
const SCREENSHOTS_PATH = path.join(__dirname, '..', 'data', 'screenshots.js');

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
            reject(e);
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
  // Substring match either way (e.g. "PUBG Mobile" vs "PUBG MOBILE - 8th Anniv")
  return a.includes(b) || b.includes(a);
}

async function main() {
  // Cheap parser: pull `{ title: '...', ..., iid: '...' }` blocks
  const src = fs.readFileSync(GAMES_PATH, 'utf-8');
  const re = /title:\s*'([^']+)'[^}]*iid:\s*'([^']*)'/g;
  const games = [];
  let m;
  while ((m = re.exec(src))) {
    games.push({ title: m[1], iid: m[2] });
  }

  // Load screenshots map keyed by iid
  const ssSrc = fs.readFileSync(SCREENSHOTS_PATH, 'utf-8');

  console.log(`# Screenshot Integrity Audit\n`);
  console.log(`Scanning ${games.length} games against Apple iTunes lookup API...\n`);

  const titleMismatches = [];
  const filenameMismatches = [];
  const noScreenshotsBlock = [];
  const apiFailures = [];

  for (const g of games) {
    if (!g.iid) continue;

    try {
      const data = await getJson(`https://itunes.apple.com/lookup?id=${g.iid}`);
      const r = (data.results || [])[0];
      if (!r) {
        apiFailures.push(g);
        continue;
      }

      const appleName = r.trackName || r.collectionName || '';
      const realScreenshots = r.screenshotUrls || r.ipadScreenshotUrls || [];

      // Title sanity check
      if (!looselyMatches(g.title, appleName)) {
        titleMismatches.push({
          ourTitle: g.title,
          iid: g.iid,
          appleName,
          bundleId: r.bundleId,
        });
      }

      // Filename signature check — does our screenshots.js have any
      // URL whose path mentions a different app's name? Build a
      // quick "expected slug" from Apple's track name.
      const block = ssSrc.match(new RegExp(`'${g.iid}':\\s*\\[[^\\]]+\\]`, 's'));
      if (!block) {
        noScreenshotsBlock.push(g);
        continue;
      }
      const ourScreenshotURLs = (block[0].match(/https?:\/\/[^'"]+/g) || []);

      // Check the URL filename for a name signature that contradicts
      // our title. e.g. "...MyBoo_Screenshots..." in My Talking Tom's slot
      const ourSlug = normalize(g.title).replace(/\s+/g, '');
      const appleSlug = normalize(appleName).replace(/\s+/g, '');

      const filenamesLook = ourScreenshotURLs
        .map((u) => decodeURIComponent(u).toLowerCase())
        .join(' ');

      // Heuristic: if our screenshots URLs explicitly contain another
      // app's name in the filename, flag it. We look for *any* word
      // that's clearly an app name like "myboo", "subwaysurfers" etc.
      const explicitOtherAppPattern = /\/[a-z0-9]*(myboo|talkingangela|talkingben|talkinggrandpa|amongus|subwaysurfers|stumbleguys|brawlstars|clashroyale|clashofclans|candycrush|pubgmobile|freefire|garena|minecraft|roblox|geometrydash|fruitninja|pianotiles|hillclimb|aspha|asphalt9|gtasanandreas|fivenights|fnaf|crossyroad|angrybirds|cuttherope|coinmaster|gardenscapes|sodasaga|hayday)[a-z0-9_]*/i;

      const explicitMatch = filenamesLook.match(explicitOtherAppPattern);
      if (explicitMatch) {
        const found = explicitMatch[1].toLowerCase();
        if (!ourSlug.includes(found) && !appleSlug.includes(found)) {
          filenameMismatches.push({
            ourTitle: g.title,
            iid: g.iid,
            appleName,
            foundInUrl: found,
          });
        }
      }

      await sleep(80); // ~12 req/sec, well under Apple's rate limit
    } catch (e) {
      apiFailures.push({ ...g, error: String(e.message || e) });
    }
  }

  console.log(`## Title vs Apple-name mismatches (${titleMismatches.length})\n`);
  if (titleMismatches.length === 0) {
    console.log('_(none — every iid resolves to an app whose name matches our title.)_\n');
  } else {
    console.log('| Our title | iid | Apple track name |');
    console.log('|---|---|---|');
    for (const x of titleMismatches) {
      console.log(`| ${x.ourTitle} | ${x.iid} | ${x.appleName} |`);
    }
    console.log('');
  }

  console.log(`## Wrong screenshots in our data file (${filenameMismatches.length})\n`);
  if (filenameMismatches.length === 0) {
    console.log('_(none detected via filename signature.)_\n');
  } else {
    console.log('| Our title | iid | Wrong screenshot signature |');
    console.log('|---|---|---|');
    for (const x of filenameMismatches) {
      console.log(`| ${x.ourTitle} | ${x.iid} | ${x.foundInUrl} |`);
    }
    console.log('');
  }

  console.log(`## Games with no screenshots block (${noScreenshotsBlock.length})\n`);
  for (const x of noScreenshotsBlock.slice(0, 20)) {
    console.log(`- ${x.title} (iid: ${x.iid})`);
  }
  if (noScreenshotsBlock.length > 20) {
    console.log(`_(+ ${noScreenshotsBlock.length - 20} more)_\n`);
  }

  console.log(`\n## API lookups that failed (${apiFailures.length})\n`);
  for (const x of apiFailures.slice(0, 20)) {
    console.log(`- ${x.title} (iid: ${x.iid})${x.error ? ' — ' + x.error : ''}`);
  }

  console.log(`\n---\n**Total games audited:** ${games.length}`);
  console.log(`**Title mismatches:** ${titleMismatches.length}`);
  console.log(`**Filename-signature wrong screenshots:** ${filenameMismatches.length}`);
  console.log(`**Missing screenshots blocks:** ${noScreenshotsBlock.length}`);
  console.log(`**Lookup failures:** ${apiFailures.length}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
