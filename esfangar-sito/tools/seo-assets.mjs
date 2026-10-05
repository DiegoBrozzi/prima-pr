// Builds SEO/share assets: logo PNG (structured data), favicons + manifest icons,
// and a 1200x630 share image (Open Graph / Twitter) per page and per wine.
// Usage: node tools/seo-assets.mjs
import { createRequire } from 'node:module';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const require = createRequire(import.meta.url);
// sharp from this project (npm install), else SHARP_PATH
const sharp = (() => { try { return require('sharp'); } catch { return require(process.env.SHARP_PATH); } })();
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const logoDir = path.join(root, 'source/logo');
const out = path.join(root, 'src/assets');
const VIOLET = '#4A2C6E', IVORY = '#F7F2EA';

const svg = (n, color) => Buffer.from(fs.readFileSync(path.join(logoDir, n + '.svg'), 'utf8').replace('currentColor', color));
async function onCanvas(svgBuf, size, bg, pad) {
  const inner = Math.round(size * (1 - pad * 2));
  const img = await sharp(svgBuf, { density: 600 }).resize(inner, inner, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } }).png().toBuffer();
  return sharp({ create: { width: size, height: size, channels: 4, background: bg } }).composite([{ input: img, gravity: 'center' }]).png();
}

// logo for Organization / Winery structured data (square, >= 112px)
await (await onCanvas(svg('es-fangar-logo', VIOLET), 600, '#FFFFFF', 0.1)).toFile(path.join(out, 'img/logo-es-fangar.png'));
// icons
await (await onCanvas(svg('emblem', VIOLET), 32, { r: 0, g: 0, b: 0, alpha: 0 }, 0.02)).toFile(path.join(out, 'favicon-32.png'));
await (await onCanvas(svg('emblem', VIOLET), 180, IVORY, 0.16)).toFile(path.join(out, 'apple-touch-icon.png'));
await (await onCanvas(svg('emblem', VIOLET), 192, IVORY, 0.14)).toFile(path.join(out, 'icon-192.png'));
await (await onCanvas(svg('emblem', VIOLET), 512, IVORY, 0.14)).toFile(path.join(out, 'icon-512.png'));

// share images: photo + soft gradient + logo lockup bottom-left
const P = f => path.join(root, 'src/assets/img', f);
const pick = name => { const ws = JSON.parse(fs.readFileSync(path.join(root, 'src/content/images.json'), 'utf8'))[name].widths; return P(`${name}-${ws.at(-1)}.webp`); };
const shares = {
  home: 'main-house-sunset', estate: 'estate-sunset', wines: 'winery-barrels', winery: 'winery-hall', experiences: 'winery-tasting-bar',
  stays: 'main-house-pool', equestrian: 'equestrian-track', events: 'main-house-pool-night', contact: 'main-house-dusk-wide',
  ...Object.fromEntries(['twentytwelve-white', 'twentytwelve-pink', 'sa-sivina', 'sa-fita', 'lo-cortinello', 'genesis', 'son-p', 'fangar-elements', 'n-amarat'].map(w => [`wine-${w}`, `scene-${w}`])),
};
fs.mkdirSync(P('og'), { recursive: true });
const logoW = 210;
const logo = await sharp(svg('es-fangar-logo', IVORY), { density: 600 }).resize({ width: logoW }).png().toBuffer();
const shade = Buffer.from(`<svg width="1200" height="630"><defs><linearGradient id="g" x1="0" y1="1" x2="0.6" y2="0"><stop offset="0" stop-color="#141018" stop-opacity=".75"/><stop offset=".55" stop-color="#141018" stop-opacity="0"/></linearGradient></defs><rect width="1200" height="630" fill="url(#g)"/></svg>`);
for (const [key, img] of Object.entries(shares)) {
  await sharp(pick(img)).resize(1200, 630, { fit: 'cover', position: key.startsWith('wine-') ? 'centre' : 'attention' })
    .composite([{ input: shade }, { input: logo, left: 56, top: 630 - 56 - Math.round(logoW * 938 / 1057) }])
    .jpeg({ quality: 78, mozjpeg: true }).toFile(P(`og/${key}.jpg`));
}
console.log('seo assets done:', Object.keys(shares).length, 'share images');
