#!/usr/bin/env node
/**
 * Generate all favicon / touch-icon / manifest PNG variants from the
 * single source SVG at app/icon.svg.
 *
 * Outputs:
 *   public/favicon-16.png           16×16  — tiniest browser tab
 *   public/favicon-32.png           32×32  — classic favicon size
 *   public/favicon.ico              32×32  — legacy IE / fallback
 *   app/apple-icon.png              180×180 — iOS Safari, Add to Home
 *   public/icon-192.png             192×192 — Android PWA
 *   public/icon-512.png             512×512 — Android PWA high-res
 *
 * Run:
 *   node scripts/generate-favicons.js
 *
 * Run manually after editing app/icon.svg. Not wired into `npm run
 * build` because the PNGs are committed to git and the logo rarely
 * changes.
 */

const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const SRC = path.join(__dirname, '..', 'app', 'icon.svg');
const PUBLIC_DIR = path.join(__dirname, '..', 'public');
const APP_DIR = path.join(__dirname, '..', 'app');

const TARGETS = [
  { out: path.join(PUBLIC_DIR, 'favicon-16.png'), size: 16 },
  { out: path.join(PUBLIC_DIR, 'favicon-32.png'), size: 32 },
  { out: path.join(APP_DIR, 'apple-icon.png'), size: 180 },
  { out: path.join(PUBLIC_DIR, 'icon-192.png'), size: 192 },
  { out: path.join(PUBLIC_DIR, 'icon-512.png'), size: 512 },
];

async function main() {
  if (!fs.existsSync(SRC)) {
    console.error(`Source SVG not found at ${SRC}`);
    process.exit(1);
  }

  const svgBuffer = fs.readFileSync(SRC);

  for (const { out, size } of TARGETS) {
    await sharp(svgBuffer).resize(size, size).png({ quality: 95 }).toFile(out);
    console.log(`  ✓ ${path.relative(process.cwd(), out)}  (${size}×${size})`);
  }

  // favicon.ico — a 32×32 PNG saved with .ico extension works in
  // every browser from IE 11 onwards. For multi-resolution ICO we'd
  // need the to-ico package; not worth the extra dep for our needs.
  const icoPng = await sharp(svgBuffer).resize(32, 32).png().toBuffer();
  const icoPath = path.join(PUBLIC_DIR, 'favicon.ico');
  fs.writeFileSync(icoPath, icoPng);
  console.log(`  ✓ ${path.relative(process.cwd(), icoPath)}  (32×32)`);

  console.log('\nAll favicons generated.');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
