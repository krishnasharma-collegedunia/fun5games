#!/usr/bin/env node
/**
 * Surgical screenshot cleanup.
 *
 * The full rebuild against Apple's API kept failing because the
 * iTunes Lookup endpoint stopped returning screenshotUrls in
 * 2024 and the App Store HTML scraper trips Apple's rate limit
 * after a few rapid requests.
 *
 * Pragmatic approach: keep the existing screenshots.js intact
 * (most entries are correct), but surgically REMOVE the entries
 * we've identified as wrong via:
 *
 *   1. Filename signature mismatch — a screenshot URL whose
 *      filename clearly belongs to a different app (e.g. our
 *      My Talking Tom slot containing "MyBoo_Screenshots…"
 *      filenames).
 *   2. The audit's "iid → wrong app" list — track IDs that
 *      Apple's Lookup confirms point to entirely different
 *      apps (Apple recycles delisted iids, Outfit7 / Supercell
 *      consolidate apps under new bundles, etc).
 *
 * For these games the screenshots.js entry is dropped. The
 * ScreenshotGallery component already returns null when its
 * screenshots prop is empty / missing, so the game detail page
 * cleanly hides the gallery section instead of showing a
 * misleading bath-tub-duck photo on a "My Talking Tom" page.
 *
 * Run:
 *   node scripts/strip-bad-screenshots.js
 */

const fs = require('fs');
const path = require('path');

const SS_PATH = path.join(__dirname, '..', 'data', 'screenshots.js');

// iids to drop entirely. Each has a one-line reason for the next
// developer / future auditor.
const BAD_IIDS = {
  // Filename signature shows MyBoo screenshots, not Tom.
  '657500465': 'My Talking Tom — wrong screenshots (MyBoo filenames)',

  // Apple Lookup confirms these track IDs now resolve to different
  // games than what we list. Most likely delisted-and-reused iids.
  '570306657': 'Batman: Arkham City — Apple now serves LEGO Batman',
  '1450578727': 'Archery King — Apple now serves Archery Pro',
  '373773634': 'Motocross Elite — Apple now serves Motocross 2',
  '1039686457': 'Flappy Bird — delisted; iid now serves Happy Rise',
  '1668983788': 'Clash Quest — discontinued; iid now serves Squad Busters',
  '1173388413': 'Garena AOV — Apple now serves Heroes Evolved',
  '6745961940': 'Color Match — Apple now serves Wood Color Jam',
  '404593641': 'Teen Titans GO — Apple now serves Cartoon Network App',
  '904062466': 'Smurfs Village — Apple now serves Smurfs Magical Meadow',

  // Filename signatures of additional likely-wrong entries.
  // These were flagged by the audit's "title vs Apple track name"
  // delta but have the right developer; keeping out until we can
  // verify the screenshots match the title.
  '1520462164': 'Pimple Pop — Apple track name "Beauty Care!"; verify screenshots',
};

function main() {
  const src = fs.readFileSync(SS_PATH, 'utf-8');

  let stripped = src;
  const removed = [];

  for (const [iid, reason] of Object.entries(BAD_IIDS)) {
    // Match the entry block: '157500465': [\n  '...',\n  '...',\n],\n
    const re = new RegExp(`\\s*'${iid}':\\s*\\[[^\\]]*\\],?\\s*\\n`, 'm');
    if (re.test(stripped)) {
      stripped = stripped.replace(re, '\n');
      removed.push({ iid, reason });
    }
  }

  // Collapse any double-blank lines we just introduced.
  stripped = stripped.replace(/\n{3,}/g, '\n\n');

  fs.writeFileSync(SS_PATH, stripped);

  console.log(`Stripped ${removed.length} entries from screenshots.js:\n`);
  for (const r of removed) {
    console.log(`  ✓ ${r.iid.padEnd(12)} ${r.reason}`);
  }
  console.log(`\nFile size: ${stripped.length} bytes`);
  console.log(`Game detail pages for these iids will now hide the screenshot gallery cleanly.`);
}

main();
