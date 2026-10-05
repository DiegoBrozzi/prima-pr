// Builds responsive AVIF/WebP images from /source into /src/assets/img
// and writes src/content/images.json (intrinsic sizes, used for width/height attrs).
// Usage: node tools/images.mjs  (needs sharp; path overridable with SHARP_PATH)
import { createRequire } from 'node:module';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const require = createRequire(import.meta.url);
// sharp from this project (npm install), else SHARP_PATH
const sharp = (() => { try { return require('sharp'); } catch { return require(process.env.SHARP_PATH); } })();
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const out = path.join(root, 'src/assets/img');
fs.mkdirSync(out, { recursive: true });

const P = f => path.join(root, 'source/photos', f);
const wa = (n, t = '28') => P(`${n}WhatsApp Image 2026-10-06 at 14.13.${t}.jpeg`);

const photos = {
  'main-house-arcade': P('WhatsApp Image 2026-10-06 at 14.13.27.jpeg'),
  'main-house-alcove': wa(1, '27'),
  'main-house-stairs': wa(2, '27'),
  'winery-hall': wa(3, '27'),
  'winery-tasting-bar': wa(4, '27'),
  'winery-tasting-room': wa(5, '27'),
  'winery-tanks': wa(6, '27'),
  'winery-gravity-hall': wa(7),
  'winery-barrels': wa(8),
  'arabic-house-interior': wa(9),
  'equestrian-aerial': wa(10),
  'equestrian-track': wa(11),
  'landscape-coast': wa(12),
  'gardens-aerial': wa(13),
  'reserve-dusk': wa(14),
  'estate-sunset': wa(15),
  'main-house-dusk-wide': wa(16),
  'main-house-topdown': wa(17),
  'main-house-night': wa(18),
  'main-house-night-front': wa(19),
  'main-house-pool-night': P('20.jpeg'),
  'main-house-sunset': wa(21),
  'vines-closeup': wa(22),
  'vineyard-manor': wa(23),
  'vineyard-wide': P('24.jpeg'),
  'main-house-lawn': wa(25, '29'),
  'main-house-pool': P('26.jpeg'),
  'hero-poster': P('drone-poster.jpg'),
  'arabic-house-pool': P('arabic-house-pool.jpg'),
  'arabic-house-lounge': P('arabic-house-lounge.jpg'),
  'arabic-house-aerial': P('arabic-house-aerial.jpg'),
  'arabic-house-garden': P('arabic-house-garden.jpg'),
  'mallorcan-house-garden': P('mallorcan-house-garden.jpg'),
  'mallorcan-house-living': P('mallorcan-house-living.jpg'),
  'mallorcan-house-aerial': P('mallorcan-house-aerial.jpg'),
  'mallorcan-house-pergola': P('mallorcan-house-pergola.jpg'),
  'lodge-pool': P('lodge-pool.jpg'),
  'lodge-living': P('lodge-living.jpg'),
  'lodge-terrace': P('lodge-terrace.jpg'),
};
const B = f => path.join(root, 'source/bottles', f);
const bottles = {
  'bottle-twentytwelve-white': B('twentytwelve-white.jpg'),
  'bottle-twentytwelve-pink': B('twentytwelve-pink.jpg'),
  'bottle-sa-sivina': B('sa-sivina.png'),
  'bottle-sa-fita': B('sa-fita.png'),
  'bottle-lo-cortinello': B('lo-cortinello.png'),
  'bottle-genesis': B('genesis.png'),
  'bottle-son-p': B('son-p.png'),
  'bottle-fangar-elements': B('fangar-elements.png'),
  'bottle-n-amarat': B('n-amarat.png'),
};
// lifestyle shots: fade in over the bottle on hover (as on the current es-fangar.com shop)
const sceneFiles = { 'twentytwelve-white': 'jpg', 'twentytwelve-pink': 'jpg', 'sa-sivina': 'png', 'sa-fita': 'png', 'lo-cortinello': 'png', genesis: 'png', 'son-p': 'png', 'fangar-elements': 'png', 'n-amarat': 'png' };
const scenes = { ...Object.fromEntries(Object.entries(sceneFiles).map(([n, ext]) => [`scene-${n}`, B(`scene-${n}.${ext}`)])), 'box-12': B('box-12.jpg'), 'box-12-white': B('box-12-white.jpg') };

const PHOTO_W = [640, 1024, 1600];
const BOTTLE_W = [360, 720];
const BOTTLE_BG = { r: 247, g: 247, b: 249 };
const manifest = {};

async function emit(name, input, widths) {
  const meta = await sharp(input).metadata();
  const ws = widths.filter(w => w <= meta.width);
  if (!ws.length || ws.at(-1) < meta.width && ws.length < widths.length) ws.push(meta.width);
  for (const w of ws) {
    const img = sharp(input).resize({ width: w, withoutEnlargement: true });
    await img.clone().avif({ quality: 52, effort: 5 }).toFile(path.join(out, `${name}-${w}.avif`));
    await img.clone().webp({ quality: 74 }).toFile(path.join(out, `${name}-${w}.webp`));
  }
  manifest[name] = { w: meta.width, h: meta.height, widths: ws };
}

// Bottles: crop to the bottle, then centre it on an identical 4:5 canvas so the shop grid lines up
async function normaliseBottle(input) {
  const trimmed = await sharp(input).trim({ background: BOTTLE_BG, threshold: 18 }).toBuffer();
  const m = await sharp(trimmed).metadata();
  const H = 1250, W = 1000, target = Math.round(H * 0.86);
  const scale = Math.min(target / m.height, (W * 0.9) / m.width);
  const bw = Math.round(m.width * scale), bh = Math.round(m.height * scale);
  const resized = await sharp(trimmed).resize(bw, bh).toBuffer();
  return sharp({ create: { width: W, height: H, channels: 3, background: BOTTLE_BG } })
    .composite([{ input: resized, left: Math.round((W - bw) / 2), top: Math.round((H - bh) / 2) }])
    .png().toBuffer();
}

const heroes = { 'hero-landscape-poster': P('hero-landscape-poster.jpg') };

const only = process.argv[2];
for (const [n, f] of Object.entries(heroes)) if (!only || n.includes(only)) { await emit(n, f, [640, 1024, 1600, 1920]); console.log('hero', n); }
for (const [n, f] of Object.entries(photos)) if (!only || n.includes(only)) { await emit(n, f, PHOTO_W); console.log('photo', n); }
for (const [n, f] of Object.entries(bottles)) if (!only || n.includes(only)) { await emit(n, await normaliseBottle(f), BOTTLE_W); console.log('bottle', n); }
for (const [n, f] of Object.entries(scenes)) if (!only || n.includes(only)) { await emit(n, f, [400, 720, 1200]); console.log('scene', n); }

// social share image (1200x630 JPEG)
await sharp(photos['main-house-sunset']).resize(1200, 630, { fit: 'cover' }).jpeg({ quality: 80, mozjpeg: true }).toFile(path.join(out, 'og-es-fangar.jpg'));

const mf = path.join(root, 'src/content/images.json');
const prev = only && fs.existsSync(mf) ? JSON.parse(fs.readFileSync(mf, 'utf8')) : {};
fs.writeFileSync(mf, JSON.stringify({ ...prev, ...manifest }, null, 1));
console.log('done', Object.keys(manifest).length);
