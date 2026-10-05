export const locales = ['it', 'en', 'fr', 'de', 'es'] as const;
export type Lang = (typeof locales)[number];
export const defaultLang: Lang = 'it';

export const langMeta: Record<Lang, { label: string; short: string; hreflang: string; og: string }> = {
  it: { label: 'Italiano', short: 'IT', hreflang: 'it', og: 'it_IT' },
  en: { label: 'English', short: 'EN', hreflang: 'en', og: 'en_GB' },
  fr: { label: 'Français', short: 'FR', hreflang: 'fr', og: 'fr_FR' },
  de: { label: 'Deutsch', short: 'DE', hreflang: 'de', og: 'de_DE' },
  es: { label: 'Español', short: 'ES', hreflang: 'es', og: 'es_ES' },
};

export type PageKey =
  | 'home'
  | 'machines'
  | 'used'
  | 'parts'
  | 'services'
  | 'company'
  | 'contact'
  | 'thanks'
  | 'privacy'
  | 'cookies';

const slugs: Record<Lang, Record<PageKey, string>> = {
  it: {
    home: '',
    machines: 'macchine',
    used: 'usato',
    parts: 'ricambi',
    services: 'servizi',
    company: 'azienda',
    contact: 'contatti',
    thanks: 'contatti/grazie',
    privacy: 'privacy',
    cookies: 'cookie',
  },
  en: {
    home: '',
    machines: 'machines',
    used: 'used-machines',
    parts: 'spare-parts',
    services: 'services',
    company: 'company',
    contact: 'contact',
    thanks: 'contact/thank-you',
    privacy: 'privacy',
    cookies: 'cookies',
  },
  fr: {
    home: '',
    machines: 'machines',
    used: 'machines-occasion',
    parts: 'pieces-detachees',
    services: 'services',
    company: 'entreprise',
    contact: 'contact',
    thanks: 'contact/merci',
    privacy: 'confidentialite',
    cookies: 'cookies',
  },
  de: {
    home: '',
    machines: 'maschinen',
    used: 'gebrauchtmaschinen',
    parts: 'ersatzteile',
    services: 'service',
    company: 'unternehmen',
    contact: 'kontakt',
    thanks: 'kontakt/danke',
    privacy: 'datenschutz',
    cookies: 'cookies',
  },
  es: {
    home: '',
    machines: 'maquinas',
    used: 'maquinas-usadas',
    parts: 'recambios',
    services: 'servicios',
    company: 'empresa',
    contact: 'contacto',
    thanks: 'contacto/gracias',
    privacy: 'privacidad',
    cookies: 'cookies',
  },
};

export const categories = ['hot-foil', 'die-cutting', 'folder-gluer', 'laminator', 'flexo'] as const;
export type Category = (typeof categories)[number];

const categorySlugs: Record<Lang, Record<Category, string>> = {
  it: {
    'hot-foil': 'stampa-a-caldo',
    'die-cutting': 'fustellatrici',
    'folder-gluer': 'piega-incolla',
    laminator: 'accoppiatrici',
    flexo: 'flessografiche',
  },
  en: {
    'hot-foil': 'hot-foil-stamping',
    'die-cutting': 'die-cutters',
    'folder-gluer': 'folder-gluers',
    laminator: 'laminators',
    flexo: 'flexo-printers',
  },
  fr: {
    'hot-foil': 'dorure-a-chaud',
    'die-cutting': 'decoupeuses',
    'folder-gluer': 'plieuses-colleuses',
    laminator: 'contrecolleuses',
    flexo: 'flexographie',
  },
  de: {
    'hot-foil': 'heissfolienpraegung',
    'die-cutting': 'stanzautomaten',
    'folder-gluer': 'faltschachtel-klebemaschinen',
    laminator: 'kaschiermaschinen',
    flexo: 'flexodruckmaschinen',
  },
  es: {
    'hot-foil': 'estampacion-en-caliente',
    'die-cutting': 'troqueladoras',
    'folder-gluer': 'plegadoras-engomadoras',
    laminator: 'laminadoras',
    flexo: 'flexograficas',
  },
};

const prefix = (lang: Lang) => (lang === defaultLang ? '/' : `/${lang}/`);
const join = (...parts: string[]) => parts.filter(Boolean).join('/');
const withSlash = (p: string) => (p.endsWith('/') ? p : `${p}/`);

/** Percorso di una pagina fissa, es. url('machines','en') → /en/machines/ */
export function url(page: PageKey, lang: Lang): string {
  return withSlash(prefix(lang) + slugs[lang][page]);
}

export function categoryUrl(cat: Category, lang: Lang): string {
  return withSlash(prefix(lang) + join(slugs[lang].machines, categorySlugs[lang][cat]));
}

export function machineUrl(slug: string, lang: Lang): string {
  return withSlash(prefix(lang) + join(slugs[lang].machines, slug));
}

export function usedUrl(slug: string, lang: Lang): string {
  return withSlash(prefix(lang) + join(slugs[lang].used, slug));
}

/** Segmenti (senza prefisso lingua) usati da getStaticPaths. */
export function pagePath(page: PageKey, lang: Lang) {
  return slugs[lang][page];
}
export function categoryPath(cat: Category, lang: Lang) {
  return join(slugs[lang].machines, categorySlugs[lang][cat]);
}
export function machinePath(slug: string, lang: Lang) {
  return join(slugs[lang].machines, slug);
}
export function usedPath(slug: string, lang: Lang) {
  return join(slugs[lang].used, slug);
}

/** Mappa lingua → URL per ogni versione della stessa pagina (per hreflang e selettore lingua). */
export type Alternates = Record<Lang, string>;
export function alternates(fn: (lang: Lang) => string): Alternates {
  return Object.fromEntries(locales.map((l) => [l, fn(l)])) as Alternates;
}
