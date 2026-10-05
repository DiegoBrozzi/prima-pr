import type { APIRoute } from 'astro';
import { alternates, categories, categoryUrl, langMeta, locales, machineUrl, url, usedUrl, type Alternates, type PageKey } from '../i18n';
import { getMachines, getUsed } from '../lib/data';
import { site } from '../site.config';

const abs = (p: string) => new URL(p, site.url).href;

export const GET: APIRoute = async () => {
  const groups: Alternates[] = [];
  const pages: PageKey[] = ['home', 'machines', 'used', 'parts', 'services', 'company', 'contact', 'privacy', 'cookies'];
  for (const p of pages) groups.push(alternates((l) => url(p, l)));
  for (const c of categories) groups.push(alternates((l) => categoryUrl(c, l)));
  for (const m of await getMachines()) groups.push(alternates((l) => machineUrl(m.id, l)));
  for (const u of await getUsed()) if (u.data.status !== 'sold') groups.push(alternates((l) => usedUrl(u.id, l)));

  const entries = groups.flatMap((g) =>
    locales.map((lang) => {
      const links = locales
        .map((l) => `<xhtml:link rel="alternate" hreflang="${langMeta[l].hreflang}" href="${abs(g[l])}"/>`)
        .concat(`<xhtml:link rel="alternate" hreflang="x-default" href="${abs(g.en)}"/>`)
        .join('');
      return `<url><loc>${abs(g[lang])}</loc>${links}</url>`;
    }),
  );

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${entries.join('\n')}
</urlset>`;
  return new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
