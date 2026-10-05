// Builds a static, cookie-free map of Mallorca from OpenStreetMap tiles (© OpenStreetMap contributors)
// tinted to the site palette. Writes src/assets/img/map-mallorca-*.{avif,webp} and src/content/map.json
// (marker position in % so the pin can be drawn in HTML/CSS).
import { createRequire } from 'node:module';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const require = createRequire(import.meta.url);
// sharp from this project (npm install), else SHARP_PATH
const sharp = (() => { try { return require('sharp'); } catch { return require(process.env.SHARP_PATH); } })();
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const cache = path.join(root, 'source/map-tiles');
fs.mkdirSync(cache, { recursive: true });

const Z = 10;
const bounds = { west: 2.29, east: 3.52, north: 39.98, south: 39.24 };
const estate = { lat: 39.495068, lng: 3.202373 };

const px = (lng, lat) => {
  const n = 2 ** Z * 256;
  const x = (lng + 180) / 360 * n;
  const r = lat * Math.PI / 180;
  const y = (1 - Math.log(Math.tan(r) + 1 / Math.cos(r)) / Math.PI) / 2 * n;
  return { x, y };
};
const tl = px(bounds.west, bounds.north), br = px(bounds.east, bounds.south);
const tx0 = Math.floor(tl.x / 256), ty0 = Math.floor(tl.y / 256), tx1 = Math.floor(br.x / 256), ty1 = Math.floor(br.y / 256);

const tiles = [];
for (let x = tx0; x <= tx1; x++) for (let y = ty0; y <= ty1; y++) {
  const f = path.join(cache, `${Z}-${x}-${y}.png`);
  if (!fs.existsSync(f)) {
    const res = await fetch(`https://tile.openstreetmap.org/${Z}/${x}/${y}.png`, { headers: { 'User-Agent': 'EsFangarPrototype/1.0 (static map build; low volume)' } });
    if (!res.ok) throw new Error(`tile ${x},${y}: ${res.status}`);
    fs.writeFileSync(f, Buffer.from(await res.arrayBuffer()));
  }
  tiles.push({ input: f, left: (x - tx0) * 256, top: (y - ty0) * 256 });
}
const W = (tx1 - tx0 + 1) * 256, H = (ty1 - ty0 + 1) * 256;
const mosaic = await sharp({ create: { width: W, height: H, channels: 3, background: '#fff' } }).composite(tiles).png().toBuffer();

const left = Math.round(tl.x - tx0 * 256), top = Math.round(tl.y - ty0 * 256);
const width = Math.round(br.x - tl.x), height = Math.round(br.y - tl.y);
// greyscale, lift contrast, then tint warm stone
const tinted = await sharp(mosaic).extract({ left, top, width, height })
  .grayscale().linear(1.15, -12).tint({ r: 214, g: 196, b: 168 }).png().toBuffer();

const out = path.join(root, 'src/assets/img');
for (const w of [width]) {
  const img = sharp(tinted).resize({ width: w, kernel: 'lanczos3' });
  await img.clone().avif({ quality: 55 }).toFile(path.join(out, `map-mallorca-${w}.avif`));
  await img.clone().webp({ quality: 78 }).toFile(path.join(out, `map-mallorca-${w}.webp`));
}
const p = px(estate.lng, estate.lat);
const marker = { x: +((p.x - tl.x) / width * 100).toFixed(2), y: +((p.y - tl.y) / height * 100).toFixed(2) };
fs.writeFileSync(path.join(root, 'src/content/map.json'), JSON.stringify({ w: width, h: height, widths: [width], marker }, null, 1));
console.log({ W, H, width, height, marker, tiles: tiles.length });
