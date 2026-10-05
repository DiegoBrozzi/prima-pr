// One-off: pulls the alpha mask out of the Canva "Es Fangar Vins" logo PDF,
// splits it into emblem / "ES FANGAR" / "VINS" bands and traces each to SVG.
// Usage: node tools/extract-logo.cjs   (needs: npm install)
const fs = require('fs'), path = require('path'), zlib = require('zlib');
const sharp = (() => { try { return require('sharp'); } catch { return require(process.env.SHARP_PATH); } })();
const potrace = (() => { try { return require('potrace'); } catch { return require(process.argv[2]); } })();
const dir = path.join(__dirname, '../source/logo');

function maskFromPdf(file) {
  const buf = fs.readFileSync(file);
  const s = buf.toString('latin1');
  const re = /<<([^]*?)>>\s*stream\r?\n/g; let m;
  while ((m = re.exec(s))) {
    const d = m[1];
    if (/\/Subtype\s*\/Image/.test(d) && /DeviceGray/.test(d)) {
      const len = +d.match(/\/Length (\d+)/)[1];
      const w = +d.match(/\/Width (\d+)/)[1], h = +d.match(/\/Height (\d+)/)[1];
      const start = m.index + m[0].length;
      return { raw: zlib.inflateSync(buf.subarray(start, start + len)), w, h };
    }
  }
  throw new Error('no mask in ' + file);
}

const trace = png => new Promise((res, rej) =>
  potrace.trace(png, { threshold: 128, turdSize: 4, optTolerance: 0.25 }, (e, out) => e ? rej(e) : res(out)));

// potrace output -> compact SVG using currentColor, tight viewBox
function clean(svg) {
  const vb = svg.match(/viewBox="([^"]+)"/)[1];
  const d = [...svg.matchAll(/ d="([^"]+)"/g)].map(x => x[1]).join(' ');
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${vb}"><path fill="currentColor" fill-rule="evenodd" d="${d}"/></svg>\n`;
}

(async () => {
  const { raw, w, h } = maskFromPdf(path.join(dir, 'es-fangar-vins-logo.pdf'));
  // shave the opaque 1px frame Canva leaves on the edges, then shape -> black on white
  // (sharp runs trim before extract inside one pipeline, so materialise in between)
  const shaved = await sharp(raw, { raw: { width: w, height: h, channels: 1 } })
    .extract({ left: 6, top: 6, width: w - 12, height: h - 12 }).negate().png().toBuffer();
  const base = sharp(shaved).trim({ threshold: 10 }).toColourspace('b-w');
  const { data, info } = await base.raw().toBuffer({ resolveWithObject: true });
  // find horizontal bands of ink
  const ink = y => { for (let x = 0; x < info.width; x++) if (data[y * info.width + x] < 128) return true; return false; };
  const bands = []; let start = -1;
  for (let y = 0; y < info.height; y++) {
    if (ink(y) && start < 0) start = y;
    if (!ink(y) && start >= 0) { bands.push([start, y]); start = -1; }
  }
  if (start >= 0) bands.push([start, info.height]);
  console.log('bands', bands);
  const names = ['emblem', 'wordmark', 'vins'];
  for (let i = 0; i < 3; i++) {
    const [y0, y1] = bands[i];
    const band = await sharp(data, { raw: { width: info.width, height: info.height, channels: 1 } })
      .extract({ left: 0, top: y0, width: info.width, height: y1 - y0 }).png().toBuffer();
    const png = await sharp(band).trim({ threshold: 10 })
      .extend({ top: 4, bottom: 4, left: 4, right: 4, background: '#fff' }).png().toBuffer();
    fs.writeFileSync(path.join(dir, names[i] + '.svg'), clean(await trace(png)));
  }
  // main logo (source/logo/es-fangar-logo.pdf): the same artwork cropped above "VINS" -> emblem + ES FANGAR, stacked
  const main = await sharp(data, { raw: { width: info.width, height: info.height, channels: 1 } })
    .extract({ left: 0, top: 0, width: info.width, height: bands[1][1] }).png().toBuffer();
  const mainPng = await sharp(main).extend({ top: 4, bottom: 4, left: 4, right: 4, background: '#fff' }).png().toBuffer();
  fs.writeFileSync(path.join(dir, 'es-fangar-logo.svg'), clean(await trace(mainPng)));

  const full = await sharp(data, { raw: { width: info.width, height: info.height, channels: 1 } })
    .extend({ top: 4, bottom: 4, left: 4, right: 4, background: '#fff' }).png().toBuffer();
  fs.writeFileSync(path.join(dir, 'vins-logo.svg'), clean(await trace(full)));
  for (const n of [...names, 'vins-logo']) console.log(n, fs.statSync(path.join(dir, n + '.svg')).size);
})();
