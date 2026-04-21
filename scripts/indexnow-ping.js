#!/usr/bin/env node
/**
 * IndexNow auto-submit — pings Bing / Yandex / Naver / Seznam / DDG
 * with every URL in our sitemap so new content gets indexed within
 * minutes instead of days.
 *
 * Usage:
 *   node scripts/indexnow-ping.js              # pings all sitemap URLs
 *   node scripts/indexnow-ping.js /game/pubg   # pings one specific path
 *   node scripts/indexnow-ping.js /a /b /c     # pings multiple specific paths
 *
 * Also exposed as `npm run indexnow` (see package.json).
 *
 * After every production deploy run:
 *   npm run build && pm2 reload fun5games-com && npm run indexnow
 *
 * Protocol spec: https://www.indexnow.org/documentation
 *
 * Key verification: public/{KEY}.txt must be publicly accessible and
 * contain the exact same KEY on one line. We generated a 32-char
 * random hex at install time and committed it.
 */

const https = require('https');
const http = require('http');

const HOST = 'fun5games.com';
const KEY = 'f683b6101b3a4a85856fa7ee2b4fde80';
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`;
const SITEMAP_URL = `https://${HOST}/sitemap.xml`;

// IndexNow accepts POSTs at api.indexnow.org which fans out to
// all participating engines (Bing, Yandex, Naver, Seznam, etc.).
// DuckDuckGo uses Bing's index so it picks up the change via Bing.
const INDEXNOW_ENDPOINT = 'https://api.indexnow.org/indexnow';

// Per-request limit from the IndexNow spec.
const MAX_URLS_PER_REQUEST = 10000;

function fetchText(url) {
  return new Promise((resolve, reject) => {
    const mod = url.startsWith('https') ? https : http;
    mod
      .get(url, (res) => {
        let data = '';
        res.on('data', (chunk) => (data += chunk));
        res.on('end', () => {
          if (res.statusCode >= 200 && res.statusCode < 300) {
            resolve(data);
          } else {
            reject(new Error(`HTTP ${res.statusCode} fetching ${url}`));
          }
        });
      })
      .on('error', reject);
  });
}

function extractUrls(xml) {
  // Fast, dependency-free <loc>...</loc> extractor — all Next.js
  // sitemap output uses this tag, no namespaces to worry about.
  const matches = xml.match(/<loc>([^<]+)<\/loc>/g) || [];
  return matches.map((m) => m.replace(/<\/?loc>/g, '').trim()).filter(Boolean);
}

function chunk(arr, size) {
  const out = [];
  for (let i = 0; i < arr.length; i += size) {
    out.push(arr.slice(i, i + size));
  }
  return out;
}

function postJson(url, body) {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify(body);
    const u = new URL(url);
    const req = https.request(
      {
        method: 'POST',
        hostname: u.hostname,
        port: u.port || 443,
        path: u.pathname + u.search,
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          'Content-Length': Buffer.byteLength(data),
          'User-Agent': 'fun5games-indexnow/1.0',
        },
      },
      (res) => {
        let response = '';
        res.on('data', (c) => (response += c));
        res.on('end', () => resolve({ status: res.statusCode, body: response }));
      }
    );
    req.on('error', reject);
    req.write(data);
    req.end();
  });
}

async function pingUrls(urls) {
  if (urls.length === 0) {
    console.log('No URLs to submit.');
    return;
  }

  const batches = chunk(urls, MAX_URLS_PER_REQUEST);
  let totalSubmitted = 0;

  for (let i = 0; i < batches.length; i++) {
    const batch = batches[i];
    const body = {
      host: HOST,
      key: KEY,
      keyLocation: KEY_LOCATION,
      urlList: batch,
    };

    try {
      const res = await postJson(INDEXNOW_ENDPOINT, body);
      // 200 = submitted, 202 = accepted (processing)
      if (res.status === 200 || res.status === 202) {
        totalSubmitted += batch.length;
        console.log(
          `  batch ${i + 1}/${batches.length}: ${batch.length} URLs submitted (HTTP ${res.status})`
        );
      } else {
        console.error(
          `  batch ${i + 1}/${batches.length}: FAILED (HTTP ${res.status}) — ${res.body.slice(0, 200)}`
        );
      }
    } catch (err) {
      console.error(`  batch ${i + 1}/${batches.length}: ERROR — ${err.message}`);
    }
  }

  console.log(`\n✓ IndexNow: ${totalSubmitted}/${urls.length} URLs submitted.`);
}

async function main() {
  const args = process.argv.slice(2);
  let urls;

  if (args.length > 0) {
    // Explicit paths provided on CLI — just ping those.
    urls = args.map((p) => {
      const path = p.startsWith('/') ? p : `/${p}`;
      return `https://${HOST}${path}`;
    });
    console.log(`IndexNow: pinging ${urls.length} specific URL(s)...`);
  } else {
    // No args — fetch sitemap and ping everything.
    console.log(`IndexNow: fetching sitemap from ${SITEMAP_URL}...`);
    try {
      const xml = await fetchText(SITEMAP_URL);
      urls = extractUrls(xml);
      console.log(`IndexNow: found ${urls.length} URLs in sitemap. Submitting...`);
    } catch (err) {
      console.error(`Failed to fetch sitemap: ${err.message}`);
      process.exit(1);
    }
  }

  await pingUrls(urls);
}

main().catch((err) => {
  console.error('IndexNow script failed:', err);
  process.exit(1);
});
