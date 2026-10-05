// Verifica che ogni script inline generato abbia il proprio hash nella CSP di public/_headers.
// Se si modifica lo script inline in Base.astro, la build fallisce finché l'hash non viene aggiornato.
import { createHash } from 'node:crypto';
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

const headers = readFileSync('public/_headers', 'utf8');
const csp = headers.split('\n').find((l) => l.trim().startsWith('Content-Security-Policy:') && l.includes("script-src 'self' 'sha256"));
const allowed = new Set([...(csp ?? '').matchAll(/'(sha256-[^']+)'/g)].map((m) => m[1]));

const walk = (dir) => readdirSync(dir).flatMap((f) => (statSync(join(dir, f)).isDirectory() ? walk(join(dir, f)) : [join(dir, f)]));
const missing = new Set();
for (const file of walk('dist').filter((f) => f.endsWith('.html') && !f.includes(`${'admin'}`))) {
  const html = readFileSync(file, 'utf8');
  for (const m of html.matchAll(/<script(?![^>]*\bsrc=)(?![^>]*type="application\/(?:ld\+)?json")[^>]*>([\s\S]*?)<\/script>/g)) {
    const hash = `sha256-${createHash('sha256').update(m[1]).digest('base64')}`;
    if (!allowed.has(hash)) missing.add(`${hash}  (${file})`);
  }
  if (/\sstyle="/.test(html)) missing.add(`attributo style inline in ${file}`);
}
if (missing.size) {
  console.error('CSP: elementi inline non autorizzati:\n' + [...missing].slice(0, 10).join('\n'));
  process.exit(1);
}
console.log('CSP: tutti gli script inline sono autorizzati.');
