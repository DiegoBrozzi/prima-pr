// Static site generator for the Es Fangar prototype. No dependencies.
// node src/build.mjs  ->  dist/
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { site, langs, defaultLang, routes, url, wines, offer, houses } from './content/site.mjs';
import en from './content/en.mjs';
import es from './content/es.mjs';
import de from './content/de.mjs';
import alts from './content/alts.mjs';

const T = { en, es, de };
let CUR = 'en'; // language of the page being rendered (for alt texts)
const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, '..');
const dist = path.join(root, 'dist');
const images = JSON.parse(fs.readFileSync(path.join(here, 'content/images.json'), 'utf8'));
const map = JSON.parse(fs.readFileSync(path.join(here, 'content/map.json'), 'utf8'));
const svgFile = n => fs.readFileSync(path.join(root, 'source/logo', n + '.svg'), 'utf8').trim();

// ---------- helpers ----------
const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const strip = s => String(s).replace(/<[^>]+>/g, '');
const money = (n, lang) => new Intl.NumberFormat({ en: 'en-IE', es: 'es-ES', de: 'de-DE' }[lang], { style: 'currency', currency: 'EUR' }).format(n);
const abs = p => site.origin + p;
const IMG = '/assets/img/';

function pic(name, { alt, sizes = '100vw', cls = '', eager = false, imgCls = '' } = {}) {
  const m = images[name];
  if (!m) throw new Error('missing image ' + name);
  if (alt === undefined) alt = (alts[name] && alts[name][CUR]) || '';
  const set = ext => m.widths.map(w => `${IMG}${name}-${w}.${ext} ${w}w`).join(', ');
  const h = Math.round(m.h * (m.widths.at(-1) / m.w));
  const fallback = m.widths[Math.min(1, m.widths.length - 1)];
  return `<picture${cls ? ` class="${cls}"` : ''}><source type="image/avif" srcset="${set('avif')}" sizes="${sizes}"><img${imgCls ? ` class="${imgCls}"` : ''} src="${IMG}${name}-${fallback}.webp" srcset="${set('webp')}" sizes="${sizes}" width="${m.widths.at(-1)}" height="${h}" alt="${esc(alt)}"${eager ? ' fetchpriority="high"' : ' loading="lazy"'} decoding="async"></picture>`;
}
const preloadImg = (name, sizes = '100vw') => {
  const m = images[name];
  return `<link rel="preload" as="image" type="image/avif" imagesrcset="${m.widths.map(w => `${IMG}${name}-${w}.avif ${w}w`).join(', ')}" imagesizes="${sizes}">`;
};

const icon = {
  cart: '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M6 7h12l-1 13H7L6 7Z" fill="none" stroke="currentColor" stroke-width="1.4"/><path d="M9 7V5.5a3 3 0 0 1 6 0V7" fill="none" stroke="currentColor" stroke-width="1.4"/></svg>',
  arrow: '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M4 12h15m-5-5 5 5-5 5" fill="none" stroke="currentColor" stroke-width="1.4"/></svg>',
  ext: '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M14 4h6v6m0-6-9 9M18 14v6H4V6h6" fill="none" stroke="currentColor" stroke-width="1.4"/></svg>',
  close: '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="m5 5 14 14M19 5 5 19" fill="none" stroke="currentColor" stroke-width="1.4"/></svg>',
  pause: '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M8 5v14M16 5v14" fill="none" stroke="currentColor" stroke-width="2"/></svg>',
  play: '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M7 4.5v15l12-7.5-12-7.5Z" fill="currentColor"/></svg>',
  pin: '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M12 22s7-6.3 7-12a7 7 0 0 0-14 0c0 5.7 7 12 7 12Z" fill="currentColor"/><circle cx="12" cy="10" r="2.6" fill="#F7F2EA"/></svg>',
  search: '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><circle cx="10.5" cy="10.5" r="6.5" fill="none" stroke="currentColor" stroke-width="1.4"/><path d="m15.5 15.5 5 5" fill="none" stroke="currentColor" stroke-width="1.4"/></svg>',
  plus: '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M12 4v16M4 12h16" fill="none" stroke="currentColor" stroke-width="1.4"/></svg>',
  leaf: '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M5 19c0-8 5-13 14-14-1 9-6 14-14 14Zm0 0 8-8" fill="none" stroke="currentColor" stroke-width="1.4"/></svg>',
};
const svgA11y = (svg, cls) => svg.replace('<svg ', `<svg class="${cls}" aria-hidden="true" focusable="false" `);
const emblem = svgA11y(svgFile('emblem'), 'logo__emblem');
const vinsLogo = svgA11y(svgFile('vins-logo'), 'vins-logo');
// main logo: emblem above ES FANGAR (source/logo/es-fangar-logo.pdf)
const mainLogo = svgA11y(svgFile('es-fangar-logo'), 'logo__full');

const breadcrumbLd = (lang, items) => ({
  '@type': 'BreadcrumbList',
  itemListElement: items.map((it, i) => ({ '@type': 'ListItem', position: i + 1, name: it.name, item: abs(it.url) })),
});
const orgId = site.origin + '/#org';
const websiteLd = lang => ({ '@type': 'WebSite', '@id': site.origin + '/#website', url: site.origin, name: 'Es Fangar', inLanguage: langs, publisher: { '@id': orgId } });
const wineryLd = () => ({
  '@type': ['Winery', 'Organization'], '@id': orgId, name: 'Es Fangar', legalName: site.company, url: site.origin,
  logo: { '@type': 'ImageObject', url: abs(IMG + 'logo-es-fangar.png'), width: 600, height: 600 }, image: abs(IMG + 'og/home.jpg'),
  telephone: site.phone, email: site.email, hasMap: site.mapsUrl, priceRange: '€€',
  description: 'Organic estate and winery in Felanitx, Mallorca: certified organic and vegan wines (DO Pla i Llevant), winery tours and tastings, private houses and equestrian facilities.',
  address: { '@type': 'PostalAddress', streetAddress: site.street, postalCode: site.postcode, addressLocality: site.locality, addressRegion: site.region, addressCountry: site.country },
  geo: { '@type': 'GeoCoordinates', latitude: site.geo.lat, longitude: site.geo.lng },
  sameAs: Object.values(site.social),
});

// ---------- layout ----------
function layout({ lang, page, extra = '', title, description, body, overlay = false, ld = [], preload = '', bodyClass = '', noindex = false, share = page }) {
  const t = T[lang];
  const self = page === '404' ? `/${lang}/404.html` : url(lang, page, extra);
  const alt = page === '404' ? [] : langs.map(l => ({ l, href: url(l, page, extra) }));
  const nav = ['estate', 'wines', 'winery', 'experiences', 'stays', 'equestrian', 'events'];
  const current = p => (p === page ? ' aria-current="page"' : '');
  const langLinks = langs.map(l => {
    const href = page === '404' ? url(l, 'home') : url(l, page, extra);
    return `<a href="${href}" hreflang="${l}" lang="${l}"${l === lang ? ' aria-current="true"' : ''}><span class="visually-hidden">${T[l].langName}</span><span aria-hidden="true">${l.toUpperCase()}</span></a>`;
  }).join('');
  const catalog = Object.fromEntries([
    ...wines.map(w => [w.slug, { name: w.name, price: w.price, img: `${IMG}${w.img}-360.webp`, url: url(lang, 'wines', w.slug) }]),
    [offer.slug, { name: offer.name, price: offer.price, img: `${IMG}${offer.img}-400.webp`, url: url(lang, 'wines') + '#offer',
      imgs: Object.fromEntries(Object.entries(offer.optionImgs).map(([o, n]) => [o, `${IMG}${n}-400.webp`])) }],
  ]);
  const i18n = {
    lang, money: { en: 'en-IE', es: 'es-ES', de: 'de-DE' }[lang], cursor: t.ui.cursor, cartEmpty: t.ui.cartEmpty, remove: t.ui.remove, increase: t.ui.increase, decrease: t.ui.decrease, qty: t.ui.qty,
    free: t.ui.free, freeLeft: t.ui.freeLeft('{n}'), freeReached: t.ui.freeReached, added: t.ui.added, pause: t.ui.pause, play: t.ui.play,
    shipping: site.shipping, form: { errors: t.form.errors, sending: t.form.sending }, loading: t.experiences.loading,
  };
  const graph = noindex ? [] : [websiteLd(lang), ...(page === 'home' ? [wineryLd()] : []), ...ld];
  const shareImg = abs(`${IMG}og/${fs.existsSync(path.join(here, 'assets/img/og', share + '.jpg')) ? share : 'home'}.jpg`);

  return `<!doctype html>
<html lang="${lang}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}">
${noindex ? '<meta name="robots" content="noindex, follow">' : `<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1">
<link rel="canonical" href="${abs(self)}">
${alt.map(a => `<link rel="alternate" hreflang="${a.l}" href="${abs(a.href)}">`).join('\n')}
<link rel="alternate" hreflang="x-default" href="${abs(url(defaultLang, page, extra))}">`}
<meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self' https://*.bokun.io; style-src 'self' 'unsafe-inline' https://*.bokun.io; img-src 'self' data: https:; font-src 'self' https://*.bokun.io; frame-src https://*.bokun.io; connect-src 'self' https://*.bokun.io; media-src 'self'; object-src 'none'; base-uri 'self'; form-action 'self'">
<meta name="referrer" content="strict-origin-when-cross-origin">
<meta name="theme-color" content="#F7F2EA">
<meta property="og:type" content="website">
<meta property="og:site_name" content="Es Fangar">
<meta property="og:locale" content="${t.locale}">
${langs.filter(l => l !== lang).map(l => `<meta property="og:locale:alternate" content="${T[l].locale}">`).join('\n')}
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:url" content="${abs(self)}">
<meta property="og:image" content="${shareImg}">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="${esc(title)}">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${esc(title)}">
<meta name="twitter:description" content="${esc(description)}">
<meta name="twitter:image" content="${shareImg}">
<link rel="icon" href="/assets/favicon.svg" type="image/svg+xml">
<link rel="icon" href="/assets/favicon-32.png" sizes="32x32" type="image/png">
<link rel="apple-touch-icon" href="/assets/apple-touch-icon.png">
<link rel="manifest" href="/site.webmanifest">
<link rel="preload" href="/assets/fonts/jost-latin.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="/assets/fonts/cormorant-latin.woff2" as="font" type="font/woff2" crossorigin>
${preload}
<link rel="stylesheet" href="/assets/css/site.css">
<script src="/assets/js/boot.js"></script>
<script src="/assets/js/site.js" defer></script>
<script src="/assets/js/motion.js" defer></script>
${graph.length ? `<script type="application/ld+json">${JSON.stringify({ '@context': 'https://schema.org', '@graph': graph })}</script>` : ''}
</head>
<body class="page-${page}${overlay ? ' has-overlay' : ''}${bodyClass ? ' ' + bodyClass : ''}">
<div class="preloader" aria-hidden="true"><div class="preloader__mark">${svgA11y(svgFile('emblem'), 'preloader__emblem')}${svgA11y(svgFile('wordmark'), 'preloader__word')}</div><span class="preloader__bar"></span></div>
<a class="skip-link" href="#main">${t.ui.skip}</a>
<header class="site-header">
  <div class="site-header__inner">
    <a class="logo" href="${url(lang, 'home')}">${mainLogo}${emblem}<span class="visually-hidden">Es Fangar — ${t.ui.home}</span></a>
    <nav class="primary-nav" id="primary-nav" aria-label="${esc(t.ui.menu)}">
      <ul>${nav.map(p => `<li><a href="${url(lang, p)}"${current(p)}>${t.ui.nav[p]}</a></li>`).join('')}</ul>
      <div class="primary-nav__extra">
        <div class="lang-switch lang-switch--menu" role="group" aria-label="${esc(t.ui.language)}">${langs.map(l => {
          const href = page === '404' ? url(l, 'home') : url(l, page, extra);
          return `<a href="${href}" hreflang="${l}" lang="${l}"${l === lang ? ' aria-current="true"' : ''}>${T[l].langName}</a>`;
        }).join('')}</div>
        <a class="btn btn--primary" href="${url(lang, 'contact')}">${t.ui.enquire}</a>
        <p class="primary-nav__contact"><a href="tel:${site.phoneHref}">${site.phone}</a><br><a href="mailto:${site.email}">${site.email}</a></p>
      </div>
    </nav>
    <div class="header-tools">
      <div class="lang-switch" role="group" aria-label="${esc(t.ui.language)}">${langLinks}</div>
      <a class="header-enquire" href="${url(lang, 'contact')}"${current('contact')}>${t.ui.enquire}</a>
      <button class="cart-button" type="button" aria-controls="cart" aria-expanded="false" data-cart-open>${icon.cart}<span class="visually-hidden">${t.ui.openCart}</span><span class="cart-count" data-cart-count aria-live="polite">0</span></button>
      <button class="menu-button" type="button" aria-controls="primary-nav" aria-expanded="false" data-menu><span class="menu-button__bars" aria-hidden="true"></span><span class="menu-button__label">${t.ui.menu}</span></button>
    </div>
  </div>
</header>
<main id="main" tabindex="-1">
${body}
</main>
${footer(lang)}
<div class="cart" id="cart" role="dialog" aria-modal="true" aria-labelledby="cart-title" hidden>
  <div class="cart__backdrop" data-cart-close></div>
  <div class="cart__panel">
    <div class="cart__head"><h2 id="cart-title">${t.ui.cartTitle}</h2><button type="button" class="icon-button" data-cart-close>${icon.close}<span class="visually-hidden">${t.ui.close}</span></button></div>
    <div class="cart__body" data-cart-items></div>
    <div class="cart__foot">
      <p class="cart__free" data-cart-free></p>
      <dl class="cart__sums"><div><dt>${t.ui.subtotal}</dt><dd data-cart-subtotal>–</dd></div><div><dt>${t.ui.shipping}</dt><dd data-cart-shipping>–</dd></div><div class="cart__total"><dt>${t.ui.total}</dt><dd data-cart-total>–</dd></div></dl>
      <button type="button" class="btn btn--primary btn--block" data-checkout>${t.ui.checkout}</button>
      <p class="cart__note" data-checkout-note hidden>${t.ui.checkoutNote}</p>
      <p class="cart__tax">${t.ui.taxNote}</p>
    </div>
  </div>
</div>
<div class="toast" role="status" aria-live="polite" data-toast></div>
<script type="application/json" id="es-catalog">${JSON.stringify(catalog)}</script>
<script type="application/json" id="es-i18n">${JSON.stringify(i18n)}</script>
</body>
</html>
`;
}

function footer(lang) {
  const t = T[lang], f = t.ui.footer;
  const links = ['estate', 'wines', 'winery', 'experiences', 'stays', 'equestrian', 'events', 'contact'];
  return `<footer class="site-footer">
  <div class="container site-footer__grid">
    <div class="site-footer__brand">
      <a class="logo logo--stack" href="${url(lang, 'home')}">${mainLogo}<span class="visually-hidden">Es Fangar</span></a>
      <p>${f.tagline}</p>
      <p class="site-footer__organic">${icon.leaf}<span>${f.organic}</span></p>
    </div>
    <div>
      <h2 class="site-footer__title">${f.visit}</h2>
      <address>Finca Es Fangar<br>${site.street}<br>${site.postcode} ${site.locality}<br>${site.region}, ${{ en: 'Spain', es: 'España', de: 'Spanien' }[lang]}</address>
      <p><a href="tel:${site.phoneHref}">${site.phone}</a><br><a href="mailto:${site.email}">${site.email}</a></p>
    </div>
    <nav aria-label="${esc(f.explore)}">
      <h2 class="site-footer__title">${f.explore}</h2>
      <ul>${links.map(p => `<li><a href="${url(lang, p)}">${t.ui.nav[p]}</a></li>`).join('')}</ul>
    </nav>
    <div>
      <h2 class="site-footer__title">${f.follow}</h2>
      <ul>
        <li><a href="${site.social.instagram}" rel="noopener" target="_blank">Instagram <span class="visually-hidden">${t.ui.opensNew}</span></a></li>
        <li><a href="${site.social.facebook}" rel="noopener" target="_blank">Facebook <span class="visually-hidden">${t.ui.opensNew}</span></a></li>
      </ul>
      <div class="site-footer__langs" role="group" aria-label="${esc(t.ui.language)}">${langs.map(l => `<a href="${url(l, 'home')}" hreflang="${l}" lang="${l}"${l === lang ? ' aria-current="true"' : ''}>${T[l].langName}</a>`).join('')}</div>
    </div>
  </div>
  <div class="container site-footer__base">
    <p>© ${new Date().getFullYear()} ${site.company} · NIF ${site.nif}. ${f.rights}</p>
    <ul><li><a href="${url(lang, 'legal')}">${f.legal}</a></li><li><a href="${url(lang, 'privacy')}">${f.privacy}</a></li><li><a href="${url(lang, 'cookies')}">${f.cookies}</a></li></ul>
  </div>
</footer>`;
}

// ---------- shared blocks ----------
const pageHero = ({ eyebrow, title, lead, img, alt, cls = '' }) => `
<section class="page-hero ${cls}">
  <div class="page-hero__media">${pic(img, { alt, eager: true })}</div>
  <div class="container page-hero__content">
    <p class="eyebrow">${eyebrow}</p>
    <h1>${title}</h1>
    ${lead ? `<p class="page-hero__lead">${lead}</p>` : ''}
  </div>
</section>`;

const crumbs = (lang, items) => `<nav class="breadcrumbs container" aria-label="Breadcrumb"><ol>${items.map((it, i) => i === items.length - 1
  ? `<li><span aria-current="page">${it.name}</span></li>` : `<li><a href="${it.url}">${it.name}</a></li>`).join('')}</ol></nav>`;

const ctaBand = (title, text, href, label, img) => `
<section class="cta-band">
  <div class="cta-band__media parallax">${pic(img)}</div>
  <div class="container cta-band__content reveal">
    <h2>${title}</h2>
    ${text ? `<p>${text}</p>` : ''}
    <a class="btn btn--light" href="${href}">${label}${icon.arrow}</a>
  </div>
</section>`;

const sceneOf = w => 'scene-' + w.img.replace('bottle-', '');

function wineCard(lang, w, { headingLevel = 3 } = {}) {
  const t = T[lang], wt = t.wineText[w.slug];
  const href = url(lang, 'wines', w.slug);
  const h = `h${headingLevel}`;
  const sizes = '(min-width: 1100px) 22vw, (min-width: 700px) 30vw, 45vw';
  // Hover (as on the current es-fangar.com shop): lifestyle shot fades in over the bottle, round quick actions slide in.
  // The quick actions duplicate the visible link/button below, so they stay out of the tab order.
  return `<article class="wine-card reveal" data-cat="${w.category}">
  <div class="wine-card__frame">
    <a class="wine-card__media" href="${href}" tabindex="-1" aria-hidden="true" data-cursor="${esc(t.ui.cursor.view)}">${pic(w.img, { alt: `${w.name} – ${t.wine.seoCat[w.category]}`, sizes })}<span class="wine-card__scene">${pic(sceneOf(w), { alt: `${w.name} – ${wt.short}`, sizes })}</span></a>
    <div class="wine-card__quick" aria-hidden="true">
      <a class="quick-btn" href="${href}" tabindex="-1" title="${esc(t.ui.viewWine)}">${icon.search}</a>
      <button class="quick-btn" type="button" tabindex="-1" title="${esc(t.ui.addToCart)}" data-add="${w.slug}" data-variant="${w.vintages[0]}">${icon.plus}</button>
    </div>
  </div>
  <div class="wine-card__body">
    <p class="wine-card__meta">${t.wine.cats[w.category]} · ${w.vintages.join(' / ')}</p>
    <${h} class="wine-card__name"><a href="${href}">${w.name}</a></${h}>
    <p class="wine-card__short">${wt.short}</p>
    <div class="wine-card__buy">
      <p class="price">${money(w.price, lang)}</p>
      <button class="btn btn--small" type="button" data-add="${w.slug}" data-variant="${w.vintages[0]}">${t.ui.addToCart}<span class="visually-hidden"> — ${w.name}</span></button>
    </div>
  </div>
</article>`;
}

// ---------- pages ----------
function home(lang) {
  const t = T[lang], h = t.home;
  const featured = ['twentytwelve-white', 'sa-sivina', 'son-p', 'n-amarat'].map(s => wines.find(w => w.slug === s));
  const pillarImg = { wines: 'winery-barrels', experiences: 'winery-tasting-room', stays: 'arabic-house-pool', equestrian: 'equestrian-aerial' };
  const body = `
<section class="home-hero">
  <div class="home-hero__media">
    <picture class="home-hero__poster">
      <source media="(orientation: portrait) and (max-width: 899px)" type="image/avif" srcset="${IMG}hero-poster-720.avif">
      <source media="(orientation: portrait) and (max-width: 899px)" type="image/webp" srcset="${IMG}hero-poster-720.webp">
      <source type="image/avif" srcset="${heroSet('avif')}" sizes="100vw">
      <img src="${IMG}hero-landscape-poster-1024.webp" srcset="${heroSet('webp')}" sizes="100vw" width="1920" height="1080" alt="" fetchpriority="high" decoding="async">
    </picture>
    <video class="home-hero__video" muted loop playsinline preload="none" aria-label="${esc(h.videoLabel)}" data-hero-video
      data-src-portrait="/assets/video/estate-drone-720.mp4" data-src-landscape="/assets/video/estate-drone-1280.mp4" data-src-landscape-hd="/assets/video/estate-drone-1920.mp4"></video>
  </div>
  <div class="container home-hero__content">
    <p class="eyebrow">${h.eyebrow}</p>
    <h1 class="display">${h.title}</h1>
    <p class="home-hero__lead">${h.lead}</p>
    <div class="button-row">
      <a class="btn btn--light-solid" href="${url(lang, 'wines')}">${h.ctaWines}</a>
      <a class="btn btn--light" href="${url(lang, 'stays')}">${h.ctaStay}</a>
    </div>
  </div>
  <button class="video-toggle" type="button" aria-pressed="false" hidden data-video-toggle>${icon.pause}${icon.play}<span class="visually-hidden" data-video-label>${t.ui.pause}</span></button>
</section>
<section class="stats-band" aria-label="Es Fangar">
  <div class="container">
    <ul class="stats" role="list">${h.stats.map(s => `<li><span class="stats__n" data-count>${s.n}</span><span class="stats__l">${s.l}</span></li>`).join('')}</ul>
  </div>
</section>
${marquee(lang)}

<section class="section intro">
  <div class="container intro__grid">
    <h2 class="reveal">${h.introTitle}</h2>
    <p class="intro__text reveal">${h.intro}</p>
  </div>
</section>

<section class="section section--tight pillars" aria-labelledby="pillars-title">
  <div class="container">
    <h2 id="pillars-title" class="section-title reveal">${h.pillarsTitle}</h2>
    <ul class="pillars__grid" role="list">
      ${h.pillars.map(p => `<li class="pillar reveal">
        <a href="${url(lang, p.k)}" data-cursor="${esc(t.ui.cursor.discover)}">
          <div class="arch pillar__media">${pic(pillarImg[p.k], { sizes: '(min-width: 1000px) 24vw, (min-width: 600px) 45vw, 90vw' })}</div>
          <h3>${p.t}</h3>
          <p>${p.d}</p>
          <span class="link-arrow">${t.ui.nav[p.k]}${icon.arrow}</span>
        </a>
      </li>`).join('')}
    </ul>
  </div>
</section>

<section class="section section--stone" aria-labelledby="home-wines">
  <div class="container">
    <div class="section-head reveal">
      <div><h2 id="home-wines">${h.winesTitle}</h2><p>${h.winesLead}</p></div>
      <a class="link-arrow" href="${url(lang, 'wines')}">${t.ui.allWines}${icon.arrow}</a>
    </div>
    <div class="wine-grid wine-grid--4">${featured.map(w => wineCard(lang, w)).join('')}</div>
  </div>
</section>

<section class="feature feature--dark" aria-labelledby="home-bodega">
  <div class="feature__media parallax">${pic('winery-hall')}</div>
  <div class="container feature__content reveal">
    <p class="eyebrow">${h.bodegaEyebrow}</p>
    <h2 id="home-bodega">${h.bodegaTitle}</h2>
    <p>${h.bodegaText}</p>
    <a class="btn btn--light" href="${url(lang, 'winery')}">${h.bodegaCta}${icon.arrow}</a>
  </div>
</section>

<section class="section" aria-labelledby="home-stays">
  <div class="container split">
    <div class="split__text reveal">
      <h2 id="home-stays">${h.staysTitle}</h2>
      <p>${h.staysLead}</p>
      <ul class="house-list" role="list" data-hover-reveal>${houses.map(x => `<li><a href="${url(lang, 'stays')}#${x.id}" data-reveal="${IMG}${x.imgs[0]}-640.webp"><span>${x.name}</span><span>${t.stays.bedrooms(x.bedrooms)} · ${t.stays.guests(x.guests)}</span></a></li>`).join('')}
        <li><a href="${url(lang, 'stays')}#long-stay" data-reveal="${IMG}main-house-night-640.webp"><span>Main House</span><span>${t.stays.longFacts[0]}</span></a></li></ul>
      <a class="btn btn--primary" href="${url(lang, 'stays')}">${h.staysCta}</a>
    </div>
    <div class="split__media mosaic reveal">
      <div class="arch">${pic('main-house-pool', { sizes: '(min-width: 900px) 30vw, 60vw' })}</div>
      <div>${pic('arabic-house-lounge', { sizes: '(min-width: 900px) 22vw, 40vw' })}</div>
    </div>
  </div>
</section>

<section class="section section--stone" aria-labelledby="home-land">
  <div class="container">
    <div class="section-head reveal"><div><h2 id="home-land">${h.landTitle}</h2><p>${h.landLead}</p></div></div>
    <ul class="land-grid" role="list">${h.land.map((x, i) => `<li class="reveal"><span class="land-grid__n" aria-hidden="true">0${i + 1}</span><h3>${x.t}</h3><p>${x.d}</p></li>`).join('')}</ul>
  </div>
</section>

${visitBlock(lang, h.visitTitle, h.visitText, h.visitCta)}
`;
  return layout({ lang, page: 'home', ...t.meta.home, body, overlay: true,
    preload: `<link rel="preload" as="image" type="image/avif" media="(orientation: portrait) and (max-width: 899px)" href="${IMG}hero-poster-720.avif">
<link rel="preload" as="image" type="image/avif" media="not ((orientation: portrait) and (max-width: 899px))" imagesrcset="${heroSet('avif')}" imagesizes="100vw">` });
}

function heroSet(ext) {
  const m = images['hero-landscape-poster'];
  return m.widths.map(w => `${IMG}hero-landscape-poster-${w}.${ext} ${w}w`).join(', ');
}

// Endless band of large type (decorative: the same words are on the page as real text)
function marquee(lang, variant = '') {
  const words = T[lang].ui.marquee;
  const run = words.map(w => `<span>${w}</span>${emblem.replace('logo__emblem', 'marquee__dot')}`).join('');
  return `<div class="marquee${variant ? ' marquee--' + variant : ''}" aria-hidden="true"><div class="marquee__track"><div class="marquee__run">${run}</div><div class="marquee__run">${run}</div></div></div>`;
}

function visitBlock(lang, title, text, cta) {
  const t = T[lang];
  return `<section class="section visit" aria-labelledby="visit-title">
  <div class="container visit__grid">
    <div class="visit__text reveal">
      <h2 id="visit-title">${title}</h2>
      <p>${text}</p>
      <address>Finca Es Fangar · ${site.street} · ${site.postcode} ${site.locality}</address>
      <div class="button-row">
        <a class="btn btn--primary" href="${url(lang, 'contact')}">${cta}</a>
        <a class="btn btn--ghost" href="${site.mapsUrl}" rel="noopener" target="_blank">${t.contact.openMaps}${icon.ext}<span class="visually-hidden">${t.ui.opensNew}</span></a>
      </div>
    </div>
    ${mapFigure(lang)}
  </div>
</section>`;
}

function mapFigure(lang) {
  const t = T[lang];
  return `<figure class="map reveal">
    <div class="map__frame">
      <picture><source type="image/avif" srcset="${IMG}map-mallorca-${map.w}.avif"><img src="${IMG}map-mallorca-${map.w}.webp" width="${map.w}" height="${map.h}" alt="${esc(t.contact.mapAlt)}" loading="lazy" decoding="async"></picture>
      <span class="map__pin" style="left:${map.marker.x}%;top:${map.marker.y}%">${icon.pin}<span class="map__label">Es Fangar</span></span>
    </div>
    <figcaption>© <a href="https://www.openstreetmap.org/copyright" rel="noopener" target="_blank">OpenStreetMap</a> contributors</figcaption>
  </figure>`;
}

function estate(lang) {
  const t = T[lang], e = t.estate;
  const body = `
${pageHero({ eyebrow: e.eyebrow, title: e.title, lead: e.lead, img: 'estate-sunset' })}
<section class="section">
  <div class="container narrow">
    <h2 class="section-title reveal">${e.historyTitle}</h2>
    <ol class="timeline">${e.timeline.map(x => `<li class="reveal"><span class="timeline__y">${x.y}</span><p>${x.t}</p></li>`).join('')}</ol>
  </div>
</section>
<section class="section section--stone">
  <div class="container split split--reverse">
    <div class="split__text reveal"><h2>${e.landscapeTitle}</h2><p>${e.landscape}</p></div>
    <div class="split__media reveal"><div class="arch">${pic('reserve-dusk', { sizes: '(min-width: 900px) 45vw, 90vw' })}</div></div>
  </div>
</section>
<section class="section">
  <div class="container split">
    <div class="split__text reveal"><h2>${e.organicTitle}</h2><p>${e.organic}</p>
      <h3 class="small-title">${e.selfTitle}</h3>
      <ul class="stats stats--inline" role="list">${e.self.map(s => `<li><span class="stats__n">${s.n}</span><span class="stats__l">${s.l}</span></li>`).join('')}</ul>
    </div>
    <div class="split__media reveal">${pic('vineyard-manor', { sizes: '(min-width: 900px) 45vw, 90vw' })}</div>
  </div>
</section>
<section class="feature feature--dark">
  <div class="feature__media parallax">${pic('main-house-topdown')}</div>
  <div class="container feature__content reveal"><h2>${e.gardensTitle}</h2><p>${e.gardens}</p></div>
</section>
<section class="section section--stone">
  <div class="container">
    <h2 class="section-title reveal">${T[lang].home.landTitle}</h2>
    <ul class="land-grid" role="list">${T[lang].home.land.map((x, i) => `<li class="reveal"><span class="land-grid__n" aria-hidden="true">0${i + 1}</span><h3>${x.t}</h3><p>${x.d}</p></li>`).join('')}</ul>
  </div>
</section>
<section class="gallery-strip" aria-hidden="true">
  ${['landscape-coast', 'gardens-aerial', 'equestrian-track', 'vineyard-wide'].map(n => `<div>${pic(n, { sizes: '(min-width: 900px) 25vw, 50vw' })}</div>`).join('')}
</section>
${ctaBand(e.ctaTitle, e.ctaText, url(lang, 'experiences'), t.ui.nav.experiences, 'main-house-dusk-wide')}
`;
  return layout({ lang, page: 'estate', ...t.meta.estate, body, overlay: true, preload: preloadImg('estate-sunset'),
    ld: [breadcrumbLd(lang, [{ name: t.ui.home, url: url(lang, 'home') }, { name: t.ui.nav.estate, url: url(lang, 'estate') }])] });
}

function winesPage(lang) {
  const t = T[lang], w = t.wines;
  const cats = ['all', 'white', 'rose', 'red', 'sweet'];
  const body = `
<section class="shop-hero">
  <div class="container shop-hero__grid">
    <div>
      <p class="eyebrow">${w.eyebrow}</p>
      <h1>${w.title}</h1>
      <p class="page-hero__lead">${w.lead}</p>
    </div>
    <div class="shop-hero__logo">${vinsLogo}</div>
  </div>
</section>
<section class="section section--tight" aria-label="${esc(w.filterLabel)}">
  <div class="container">
    <div class="filters" role="group" aria-label="${esc(w.filterLabel)}" data-filters>
      ${cats.map((c, i) => `<button type="button" class="chip" data-filter="${c}" aria-pressed="${i === 0}">${w.filters[c]}</button>`).join('')}
      <p class="filters__count" aria-live="polite" data-filter-count data-label-one="${esc(w.count(1))}" data-label-many="${esc(w.count(2).replace('2', '{n}'))}">${w.count(wines.length)}</p>
    </div>
    <div class="wine-grid" data-wine-grid>${wines.map(x => wineCard(lang, x, { headingLevel: 2 })).join('')}</div>
  </div>
</section>
<section class="section section--stone" id="offer" aria-labelledby="offer-title">
  <div class="container offer reveal">
    <div class="offer__media" data-variant-media>${offer.options.map((o, i) => `<div class="offer__img${i ? '' : ' is-active'}" data-variant-img="${esc(o)}">${pic(offer.optionImgs[o], { sizes: '(min-width: 900px) 40vw, 90vw' })}</div>`).join('')}</div>
    <div class="offer__text">
      <p class="eyebrow">${w.offerEyebrow}</p>
      <h2 id="offer-title">${w.offerTitle}</h2>
      <p>${w.offerText}</p>
      <p class="price price--lg"><span class="price__now">${money(offer.price, lang)}</span> <s class="price__was">${money(offer.compareAt, lang)}</s> <span class="badge">${w.offerSave}</span></p>
      <form class="buy-form" data-buy="${offer.slug}">
        <label class="field field--inline"><span>${t.ui.option}</span>
          <select name="variant">${offer.options.map(o => `<option>${o}</option>`).join('')}</select></label>
        <button class="btn btn--primary" type="submit">${t.ui.addToCart}</button>
      </form>
    </div>
  </div>
</section>
<section class="section">
  <div class="container info-cols">
    <div class="reveal"><h2 class="small-title">${w.shipTitle}</h2><ul class="ticks">${w.ship.map(s => `<li>${s}</li>`).join('')}</ul></div>
    <div class="reveal"><h2 class="small-title">${w.tradeTitle}</h2><p>${w.tradeText}</p><a class="btn btn--ghost" href="${url(lang, 'contact')}?type=trade">${w.tradeCta}</a></div>
  </div>
</section>
`;
  return layout({ lang, page: 'wines', ...t.meta.wines, body,
    ld: [breadcrumbLd(lang, [{ name: t.ui.home, url: url(lang, 'home') }, { name: t.ui.nav.wines, url: url(lang, 'wines') }]),
      { '@type': 'ItemList', itemListElement: wines.map((x, i) => ({ '@type': 'ListItem', position: i + 1, url: abs(url(lang, 'wines', x.slug)), name: x.name })) },
      { '@type': 'ProductGroup', name: offer.name, productGroupID: offer.slug, variesBy: 'https://schema.org/color', brand: { '@type': 'Brand', name: 'Es Fangar Vins' },
        hasVariant: offer.options.map(o => ({ '@type': 'Product', name: `${offer.name} – ${o}`, sku: `${offer.slug}-${o.split(' ').pop().toLowerCase()}`, image: abs(`${IMG}${offer.optionImgs[o]}-1200.webp`),
          offers: { '@type': 'Offer', price: offer.price.toFixed(2), priceCurrency: 'EUR', availability: 'https://schema.org/InStock', url: abs(url(lang, 'wines')) + '#offer', seller: { '@id': orgId } } })) }] });
}

const fitDesc = d => (d.length <= 158 ? d : d.slice(0, 155).replace(/[s,;:–-]+S*$/, '') + '…');
const EU = ['AT', 'BE', 'BG', 'HR', 'CY', 'CZ', 'DK', 'EE', 'FI', 'FR', 'DE', 'GR', 'HU', 'IE', 'IT', 'LV', 'LT', 'LU', 'MT', 'NL', 'PL', 'PT', 'RO', 'SK', 'SI', 'ES', 'SE'];
// Product + Offer with shipping details (Google merchant listing fields)
function productLd(lang, w, wt, L) {
  return { '@type': 'Product', '@id': abs(url(lang, 'wines', w.slug)) + '#product', name: w.name, sku: w.slug,
    image: [abs(`${IMG}${w.img}-720.webp`), abs(`${IMG}${sceneOf(w)}-1200.webp`)],
    description: wt.desc, brand: { '@type': 'Brand', name: 'Es Fangar Vins' }, manufacturer: { '@id': orgId }, category: L.cats[w.category],
    additionalProperty: [
      { '@type': 'PropertyValue', name: L.varieties, value: w.varieties },
      { '@type': 'PropertyValue', name: L.abv, value: w.abv + ' %' },
      { '@type': 'PropertyValue', name: L.vintage || 'Vintage', value: w.vintages.join(', ') },
    ],
    offers: { '@type': 'Offer', price: w.price.toFixed(2), priceCurrency: 'EUR', availability: 'https://schema.org/InStock', itemCondition: 'https://schema.org/NewCondition',
      url: abs(url(lang, 'wines', w.slug)), seller: { '@id': orgId },
      shippingDetails: { '@type': 'OfferShippingDetails',
        shippingRate: { '@type': 'MonetaryAmount', value: site.shipping.flat.toFixed(2), currency: 'EUR' },
        shippingDestination: EU.map(c => ({ '@type': 'DefinedRegion', addressCountry: c })),
        deliveryTime: { '@type': 'ShippingDeliveryTime',
          handlingTime: { '@type': 'QuantitativeValue', minValue: 0, maxValue: 1, unitCode: 'DAY' },
          transitTime: { '@type': 'QuantitativeValue', minValue: 2, maxValue: 7, unitCode: 'DAY' } } } } };
}

function winePage(lang, w) {
  const t = T[lang], wt = t.wineText[w.slug], L = t.wine;
  const others = wines.filter(x => x.slug !== w.slug && (x.category === w.category || x.category === 'white')).slice(0, 4);
  const detailRows = [
    [L.type, wt.type], [L.varieties, w.varieties], [L.abv, w.abv.replace('.', lang === 'en' ? '.' : ',') + ' %'],
    [L.temp, w.temp + ' °C'], ...(w.sugar ? [[L.sugar, w.sugar]] : []), [L.pairing, wt.pairing],
  ];
  const longTitle = `${w.name} · ${L.seoCat[w.category]} · Es Fangar`;
  const title = longTitle.length <= 60 ? longTitle : `${w.name} · ${L.seoCat[w.category]}`;
  const desc = fitDesc(`${w.name}: ${wt.type.toLowerCase()} – ${wt.short.replace(/.$/, '').toLowerCase()}. ${L.seoTail}`);
  const body = `
${crumbs(lang, [{ name: t.ui.home, url: url(lang, 'home') }, { name: t.ui.nav.wines, url: url(lang, 'wines') }, { name: w.name }])}
<section class="product container">
  <div class="product__media">${pic(w.img, { alt: `${w.name} — ${L.cats[w.category]}`, sizes: '(min-width: 900px) 42vw, 90vw', eager: true })}</div>
  <div class="product__info">
    <p class="eyebrow">${L.cats[w.category]} · DO Pla i Llevant</p>
    <h1>${w.name}</h1>
    <p class="product__type">${wt.type}</p>
    <p class="price price--lg">${money(w.price, lang)}</p>
    <form class="buy-form" data-buy="${w.slug}">
      ${w.vintages.length > 1 ? `<label class="field field--inline"><span>${t.ui.vintage}</span><select name="variant">${w.vintages.map(v => `<option>${v}</option>`).join('')}</select></label>`
        : `<p class="field field--inline"><span>${t.ui.vintage}</span><strong>${w.vintages[0]}</strong><input type="hidden" name="variant" value="${w.vintages[0]}"></p>`}
      <label class="field field--inline"><span>${t.ui.qty}</span><input type="number" name="qty" value="1" min="1" max="36" inputmode="numeric"></label>
      <button class="btn btn--primary btn--block" type="submit">${t.ui.addToCart}</button>
    </form>
    <p class="product__tax">${t.ui.taxNote}</p>
    <p class="product__organic">${icon.leaf}<span>${L.organic}</span></p>
    <p class="product__desc">${wt.desc}</p>
  </div>
</section>
<section class="section section--stone">
  <div class="container info-cols">
    <div class="reveal">
      <h2 class="small-title">${L.notes}</h2>
      <dl class="notes"><div><dt>${L.color}</dt><dd>${wt.color}</dd></div><div><dt>${L.nose}</dt><dd>${wt.nose}</dd></div><div><dt>${L.palate}</dt><dd>${wt.palate}</dd></div></dl>
    </div>
    <div class="reveal">
      <h2 class="small-title">${L.details}</h2>
      <dl class="specs">${detailRows.map(([k, v]) => `<div><dt>${k}</dt><dd>${v}</dd></div>`).join('')}</dl>
    </div>
  </div>
</section>
<section class="product-scene container" aria-hidden="true"><div class="product-scene__frame parallax">${pic(sceneOf(w), { alt: `${w.name} – ${wt.short}`, sizes: '(min-width: 1320px) 1320px, 100vw' })}</div></section>
<section class="section">
  <div class="container">
    <div class="section-head"><h2>${L.more}</h2><a class="link-arrow" href="${url(lang, 'wines')}">${t.ui.allWines}${icon.arrow}</a></div>
    <div class="wine-grid wine-grid--4">${others.map(x => wineCard(lang, x)).join('')}</div>
  </div>
</section>`;
  return layout({ lang, page: 'wines', extra: w.slug, title, description: desc, body, share: 'wine-' + sceneOf(w).replace('scene-', ''),
    preload: preloadImg(w.img, '(min-width: 900px) 42vw, 90vw'),
    ld: [breadcrumbLd(lang, [{ name: t.ui.home, url: url(lang, 'home') }, { name: t.ui.nav.wines, url: url(lang, 'wines') }, { name: w.name, url: url(lang, 'wines', w.slug) }]),
      productLd(lang, w, wt, L)] });
}

function winery(lang) {
  const t = T[lang], b = t.winery;
  const stepImg = ['winery-tasting-bar', 'winery-gravity-hall', 'winery-tanks'];
  const body = `
${pageHero({ eyebrow: b.eyebrow, title: b.title, lead: b.lead, img: 'winery-hall', cls: 'page-hero--violet' })}
<section class="section">
  <div class="container split">
    <div class="split__text reveal"><h2>${b.storyTitle}</h2><p>${b.story}</p></div>
    <div class="split__media reveal"><div class="arch">${pic('winery-barrels', { sizes: '(min-width: 900px) 45vw, 90vw' })}</div></div>
  </div>
</section>
<section class="section section--night" aria-labelledby="gravity">
  <div class="container">
    <div class="section-head reveal"><div><p class="eyebrow">${b.eyebrow}</p><h2 id="gravity">${b.gravityTitle}</h2><p>${b.gravityLead}</p></div></div>
    <ol class="steps" role="list">${b.steps.map((s, i) => `<li class="step reveal">
      <div class="step__media">${pic(stepImg[i], { sizes: '(min-width: 900px) 30vw, 90vw' })}</div>
      <span class="step__n" aria-hidden="true">0${i + 1}</span><h3>${s.t}</h3><p>${s.d}</p></li>`).join('')}</ol>
  </div>
</section>
<section class="section">
  <div class="container split split--reverse">
    <div class="split__text reveal"><h2>${b.roomTitle}</h2><p>${b.room}</p><p>${b.machinery}</p></div>
    <div class="split__media reveal">${pic('winery-gravity-hall', { sizes: '(min-width: 900px) 45vw, 90vw' })}</div>
  </div>
  <div class="container">
    <h2 class="visually-hidden">${b.factsTitle}</h2>
    <ul class="stats stats--boxed" role="list">${b.facts.map(s => `<li class="reveal"><span class="stats__n">${s.n}</span><span class="stats__l">${s.l}</span></li>`).join('')}</ul>
  </div>
</section>
<section class="section section--stone">
  <div class="container info-cols">
    <div class="reveal"><h2>${b.varietiesTitle}</h2><p>${b.varieties}</p></div>
    <div class="reveal"><h2>${b.philosophyTitle}</h2><p>${b.philosophy}</p></div>
  </div>
</section>
${marquee(lang, 'dark')}
${ctaBand(b.cta, '', url(lang, 'experiences'), t.ui.nav.experiences, 'winery-tasting-room')}
`;
  return layout({ lang, page: 'winery', ...t.meta.winery, body, overlay: true, preload: preloadImg('winery-hall'),
    ld: [breadcrumbLd(lang, [{ name: t.ui.home, url: url(lang, 'home') }, { name: t.ui.nav.winery, url: url(lang, 'winery') }])] });
}

function experiences(lang) {
  const t = T[lang], x = t.experiences;
  const body = `
${pageHero({ eyebrow: x.eyebrow, title: x.title, lead: x.lead, img: 'winery-tasting-bar', cls: 'page-hero--violet' })}
<section class="section">
  <div class="container">
    <ul class="exp-grid" role="list">${x.items.map(it => `<li class="exp reveal">
      <div class="arch exp__media">${pic(it.img, { sizes: '(min-width: 1000px) 30vw, (min-width: 600px) 45vw, 90vw' })}</div>
      <h2>${it.t}</h2><p>${it.d}</p></li>`).join('')}</ul>
  </div>
</section>
<section class="section section--stone" id="book" aria-labelledby="book-title">
  <div class="container booking">
    <h2 id="book-title">${x.bookTitle}</h2>
    <p>${x.bookText}</p>
    <div class="booking__widget" data-bokun data-src="${site.bokun.list}" data-loader="${site.bokun.loader}">
      <button class="btn btn--primary" type="button" data-bokun-load>${x.bookButton}</button>
      <p class="booking__consent">${x.bookConsent.replace(/(cookie policy|política de cookies|Cookie-Richtlinie)/, `<a href="${url(lang, 'cookies')}">$1</a>`)}</p>
      <p class="note">${x.bookDemo}</p>
    </div>
  </div>
</section>
<section class="section">
  <div class="container info-cols">
    <div class="reveal"><h2 class="small-title">${x.practicalTitle}</h2><ul class="ticks">${x.practical.map(p => `<li>${p}</li>`).join('')}</ul></div>
    <div class="reveal"><h2 class="small-title">${x.groupTitle}</h2><p>${x.groupText}</p><a class="btn btn--ghost" href="${url(lang, 'contact')}?type=events">${x.groupCta}</a></div>
  </div>
</section>`;
  return layout({ lang, page: 'experiences', ...t.meta.experiences, body, overlay: true, preload: preloadImg('winery-tasting-bar'),
    ld: [breadcrumbLd(lang, [{ name: t.ui.home, url: url(lang, 'home') }, { name: t.ui.nav.experiences, url: url(lang, 'experiences') }])] });
}

function stays(lang) {
  const t = T[lang], s = t.stays;
  const body = `
${pageHero({ eyebrow: s.eyebrow, title: s.title, lead: s.lead, img: 'main-house-pool' })}
<section class="section">
  <div class="container houses">
    ${houses.map((h, i) => {
      const ht = s.houses[h.id];
      return `<article class="house reveal" id="${h.id}" aria-labelledby="${h.id}-title">
      <div class="house__gallery" data-gallery>
        <ul class="house__track" role="list" tabindex="0" aria-label="${esc(h.name)}" data-drag data-cursor="${esc(t.ui.cursor.drag)}">${h.imgs.map((img, j) => `<li>${pic(img, { sizes: '(min-width: 1000px) 55vw, 95vw' })}</li>`).join('')}</ul>
      </div>
      <div class="house__info">
        <p class="eyebrow">${ht.tagline}</p>
        <h2 id="${h.id}-title">${h.name}</h2>
        <p class="house__facts">${s.bedrooms(h.bedrooms)} · ${s.guests(h.guests)}</p>
        <p>${ht.desc}</p>
        <ul class="tags" role="list">${ht.features.map(f => `<li>${f}</li>`).join('')}</ul>
        <div class="button-row">
          <a class="btn btn--primary" href="${h.airbnb}" rel="noopener" target="_blank">${s.bookOn} Airbnb${icon.ext}<span class="visually-hidden">${t.ui.opensNew}</span></a>
          <a class="btn btn--ghost" href="${h.vrbo}" rel="noopener" target="_blank">${s.bookOn} Vrbo${icon.ext}<span class="visually-hidden">${t.ui.opensNew}</span></a>
        </div>
        <p class="house__licence">${s.licence}: <span>${s.licencePending}</span></p>
      </div>
    </article>`; }).join('')}
  </div>
</section>
<section class="feature feature--dark" aria-labelledby="long-stay">
  <div class="feature__media parallax">${pic('main-house-night')}</div>
  <div class="container feature__content reveal">
    <p class="eyebrow">${s.longEyebrow}</p>
    <h2 id="long-stay">${s.longTitle}</h2>
    <p>${s.long}</p>
    <ul class="tags tags--light" role="list">${s.longFacts.map(f => `<li>${f}</li>`).join('')}</ul>
    <a class="btn btn--light" href="${url(lang, 'contact')}?type=long-stay">${s.longCta}${icon.arrow}</a>
  </div>
</section>
<section class="section section--stone">
  <div class="container">
    <h2 class="section-title reveal">${s.aroundTitle}</h2>
    <ul class="land-grid land-grid--3" role="list">${s.around.map(a => `<li class="reveal"><h3>${a.t}</h3><p>${a.d}</p></li>`).join('')}</ul>
  </div>
</section>
<section class="gallery-strip" aria-hidden="true">
  ${['main-house-arcade', 'main-house-alcove', 'main-house-stairs', 'main-house-lawn'].map(n => `<div>${pic(n, { sizes: '(min-width: 900px) 25vw, 50vw' })}</div>`).join('')}
</section>`;
  return layout({ lang, page: 'stays', ...t.meta.stays, body, overlay: true, preload: preloadImg('main-house-pool'),
    ld: [breadcrumbLd(lang, [{ name: t.ui.home, url: url(lang, 'home') }, { name: t.ui.nav.stays, url: url(lang, 'stays') }]),
      { '@type': 'LodgingBusiness', name: 'Es Fangar — Stays', url: abs(url(lang, 'stays')), telephone: site.phone, parentOrganization: { '@id': orgId },
        address: { '@type': 'PostalAddress', streetAddress: site.street, postalCode: site.postcode, addressLocality: site.locality, addressCountry: site.country },
        containsPlace: houses.map(h => ({ '@type': 'House', name: h.name, numberOfBedrooms: h.bedrooms, occupancy: { '@type': 'QuantitativeValue', maxValue: h.guests } })) }] });
}

function equestrian(lang) {
  const t = T[lang], q = t.equestrian;
  const body = `
${pageHero({ eyebrow: q.eyebrow, title: q.title, lead: q.lead, img: 'equestrian-track' })}
<section class="section">
  <div class="container">
    <h2 class="section-title reveal">${q.facilitiesTitle}</h2>
    <ul class="facility-grid" role="list">${q.facilities.map((f, i) => `<li class="reveal"><span class="land-grid__n" aria-hidden="true">0${i + 1}</span><h3>${f.t}</h3><p>${f.d}</p></li>`).join('')}</ul>
  </div>
</section>
<section class="section section--stone">
  <div class="container split">
    <div class="split__text reveal"><h2>${q.bringTitle}</h2><p>${q.bring}</p><a class="btn btn--primary" href="${url(lang, 'contact')}?type=equestrian">${q.bringCta}</a></div>
    <div class="split__media reveal"><div class="arch">${pic('equestrian-aerial', { sizes: '(min-width: 900px) 45vw, 90vw' })}</div></div>
  </div>
</section>`;
  return layout({ lang, page: 'equestrian', ...t.meta.equestrian, body, overlay: true, preload: preloadImg('equestrian-track'),
    ld: [breadcrumbLd(lang, [{ name: t.ui.home, url: url(lang, 'home') }, { name: t.ui.nav.equestrian, url: url(lang, 'equestrian') }])] });
}

function events(lang) {
  const t = T[lang], v = t.events;
  const body = `
${pageHero({ eyebrow: v.eyebrow, title: v.title, lead: v.lead, img: 'main-house-pool-night' })}
<section class="section">
  <div class="container">
    <ul class="exp-grid" role="list">${v.items.map(it => `<li class="exp reveal">
      <div class="arch exp__media">${pic(it.img, { sizes: '(min-width: 1000px) 30vw, (min-width: 600px) 45vw, 90vw' })}</div>
      <h2>${it.t}</h2><p>${it.d}</p></li>`).join('')}</ul>
    <p class="center reveal"><a class="btn btn--primary" href="${url(lang, 'contact')}?type=events">${v.ctaBtn}</a></p>
  </div>
</section>
<section class="section section--night">
  <div class="container split">
    <div class="split__text reveal"><h2>${v.tradeTitle}</h2><p>${v.trade}</p><a class="btn btn--light" href="${url(lang, 'contact')}?type=trade">${v.tradeCta}${icon.arrow}</a></div>
    <div class="split__media reveal">${pic('winery-tasting-room', { sizes: '(min-width: 900px) 45vw, 90vw' })}</div>
  </div>
</section>
${ctaBand(v.cta, '', url(lang, 'contact') + '?type=events', v.ctaBtn, 'main-house-night-front')}`;
  return layout({ lang, page: 'events', ...t.meta.events, body, overlay: true, preload: preloadImg('main-house-pool-night'),
    ld: [breadcrumbLd(lang, [{ name: t.ui.home, url: url(lang, 'home') }, { name: t.ui.nav.events, url: url(lang, 'events') }])] });
}

function contact(lang) {
  const t = T[lang], c = t.contact, f = t.form;
  const showFor = { dates: 'long-stay events equestrian', guests: 'long-stay events equestrian', horses: 'equestrian', company: 'trade events' };
  const req = `<span class="req" aria-hidden="true">*</span>`;
  const body = `
<section class="contact-hero">
  <div class="container">
    <p class="eyebrow">${c.eyebrow}</p>
    <h1>${c.title}</h1>
    <p class="page-hero__lead">${c.lead}</p>
  </div>
</section>
<section class="section section--tight">
  <div class="container contact-grid">
    <form class="enquiry" action="#" method="post" novalidate data-enquiry>
      <div class="form-error" role="alert" tabindex="-1" hidden data-form-summary></div>
      <fieldset>
        <legend class="visually-hidden">${f.legend}</legend>
        <div class="field">
          <label for="f-type">${f.type}</label>
          <select id="f-type" name="type" data-type>${Object.entries(f.types).map(([k, v]) => `<option value="${k}">${v}</option>`).join('')}</select>
        </div>
        <div class="field-row">
          <div class="field"><label for="f-name">${f.name} ${req}</label><input id="f-name" name="name" autocomplete="name" required aria-describedby="f-name-err"><p class="field__error" id="f-name-err" hidden></p></div>
          <div class="field"><label for="f-email">${f.email} ${req}</label><input id="f-email" name="email" type="email" autocomplete="email" required aria-describedby="f-email-err"><p class="field__error" id="f-email-err" hidden></p></div>
        </div>
        <div class="field-row">
          <div class="field"><label for="f-phone">${f.phone} <span class="opt">${f.optional}</span></label><input id="f-phone" name="phone" type="tel" autocomplete="tel"></div>
          <div class="field" data-show-for="${showFor.company}"><label for="f-company">${f.company} <span class="opt">${f.optional}</span></label><input id="f-company" name="company" autocomplete="organization"></div>
        </div>
        <div class="field-row" data-show-for="${showFor.dates}">
          <div class="field"><label for="f-from">${f.from}</label><input id="f-from" name="from" type="date"></div>
          <div class="field"><label for="f-to">${f.to}</label><input id="f-to" name="to" type="date" aria-describedby="f-to-err"><p class="field__error" id="f-to-err" hidden></p></div>
        </div>
        <div class="field-row">
          <div class="field" data-show-for="${showFor.guests}"><label for="f-guests">${f.guests}</label><input id="f-guests" name="guests" type="number" min="1" max="500" inputmode="numeric"></div>
          <div class="field" data-show-for="${showFor.horses}"><label for="f-horses">${f.horses}</label><input id="f-horses" name="horses" type="number" min="1" max="200" inputmode="numeric"></div>
        </div>
        <div class="field"><label for="f-message">${f.message} ${req}</label><textarea id="f-message" name="message" rows="6" required minlength="10" aria-describedby="f-message-hint f-message-err"></textarea><p class="field__hint" id="f-message-hint">${f.messageHint}</p><p class="field__error" id="f-message-err" hidden></p></div>
        <div class="hp" aria-hidden="true"><label for="f-website">Website</label><input id="f-website" name="website" tabindex="-1" autocomplete="off"></div>
        <div class="field field--check"><input id="f-consent" name="consent" type="checkbox" required aria-describedby="f-consent-err"><label for="f-consent">${f.consent.replace('{privacy}', url(lang, 'privacy'))} ${req}</label><p class="field__error" id="f-consent-err" hidden></p></div>
        <p class="form-legend"><span aria-hidden="true">*</span> ${f.required}</p>
        <button class="btn btn--primary" type="submit">${f.submit}</button>
      </fieldset>
      <div class="form-success" hidden tabindex="-1" data-form-success>
        <h2>${f.successTitle}</h2><p>${f.successText}</p><p class="note">${f.demo}</p>
      </div>
    </form>
    <aside class="contact-info">
      <dl>
        <div><dt>${c.addressTitle}</dt><dd><address>Finca Es Fangar<br>${site.street}<br>${site.postcode} ${site.locality}, ${site.region}</address></dd></div>
        <div><dt>${c.phoneTitle}</dt><dd><a href="tel:${site.phoneHref}">${site.phone}</a></dd></div>
        <div><dt>${c.emailTitle}</dt><dd><a href="mailto:${site.email}">${site.email}</a></dd></div>
      </dl>
      <p>${c.bookingNote}</p>
      <ul class="link-list"><li><a class="link-arrow" href="${url(lang, 'experiences')}#book">${t.ui.nav.experiences}${icon.arrow}</a></li><li><a class="link-arrow" href="${url(lang, 'stays')}">${t.ui.nav.stays}${icon.arrow}</a></li></ul>
      ${mapFigure(lang)}
      <p><a class="btn btn--ghost btn--block" href="${site.mapsUrl}" rel="noopener" target="_blank">${c.openMaps}${icon.ext}<span class="visually-hidden">${t.ui.opensNew}</span></a></p>
    </aside>
  </div>
</section>`;
  return layout({ lang, page: 'contact', ...t.meta.contact, body,
    ld: [breadcrumbLd(lang, [{ name: t.ui.home, url: url(lang, 'home') }, { name: t.ui.nav.contact, url: url(lang, 'contact') }]),
      { '@type': 'ContactPage', name: t.meta.contact.title, url: abs(url(lang, 'contact')), about: { '@id': orgId } }] });
}

function legalPage(lang, page) {
  const t = T[lang], p = t[page];
  const body = `
<section class="contact-hero"><div class="container narrow"><h1>${p.title}</h1><p class="note">${p.draft}</p></div></section>
<section class="section section--tight"><div class="container narrow prose">${p.body}</div></section>`;
  return layout({ lang, page, ...t.meta[page], body });
}

function notFound(lang) {
  const t = T[lang], n = t.notFound;
  const body = `
<section class="not-found">
  <div class="not-found__media">${pic('reserve-dusk', { eager: true })}</div>
  <div class="container not-found__content">
    <p class="eyebrow">404</p>
    <h1>${n.title}</h1>
    <p>${n.text}</p>
    <a class="btn btn--light" href="${url(lang, 'home')}">${n.cta}</a>
  </div>
</section>`;
  return layout({ lang, page: '404', ...t.meta.notFound, body, noindex: true, overlay: true });
}

// ---------- write ----------
fs.rmSync(dist, { recursive: true, force: true });
fs.mkdirSync(dist, { recursive: true });
const write = (p, html) => {
  const f = path.join(dist, p.endsWith('.html') ? p : path.join(p, 'index.html'));
  fs.mkdirSync(path.dirname(f), { recursive: true });
  fs.writeFileSync(f, html);
};

const sitemap = [];
const pageFns = { home, estate, wines: winesPage, winery, experiences, stays, equestrian, events, contact };
for (const lang of langs) {
  CUR = lang;
  for (const [page, fn] of Object.entries(pageFns)) { write(url(lang, page), fn(lang)); if (lang === defaultLang) sitemap.push([page, '']); }
  for (const page of ['legal', 'privacy', 'cookies']) { write(url(lang, page), legalPage(lang, page)); if (lang === defaultLang) sitemap.push([page, '']); }
  for (const w of wines) { write(url(lang, 'wines', w.slug), winePage(lang, w)); if (lang === defaultLang) sitemap.push(['wines', w.slug]); }
  write(`/${lang}/404.html`, notFound(lang));
}
fs.copyFileSync(path.join(dist, 'en/404.html'), path.join(dist, '404.html'));

// root: send visitors to the default language (the live server should do this with a 301/302 + Accept-Language)
write('/', `<!doctype html><html lang="en"><head><meta charset="utf-8"><title>Es Fangar</title><meta http-equiv="refresh" content="0; url=/en/"><link rel="canonical" href="${site.origin}/en/">${langs.map(l => `<link rel="alternate" hreflang="${l}" href="${site.origin}/${l}/">`).join('')}</head><body><p><a href="/en/">Es Fangar — English</a> · <a href="/es/">Español</a> · <a href="/de/">Deutsch</a></p></body></html>`);

const sitemapImage = (page, extra) => {
  const w = extra && wines.find(x => x.slug === extra);
  const key = w ? 'wine-' + sceneOf(w).replace('scene-', '') : page;
  return fs.existsSync(path.join(here, 'assets/img/og', key + '.jpg')) ? `<image:image><image:loc>${abs(`${IMG}og/${key}.jpg`)}</image:loc></image:image>` : '';
};
const today = new Date().toISOString().slice(0, 10);
fs.writeFileSync(path.join(dist, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${sitemap.flatMap(([page, extra]) => langs.map(l => `<url><loc>${abs(url(l, page, extra))}</loc><lastmod>${today}</lastmod>${langs.map(a => `<xhtml:link rel="alternate" hreflang="${a}" href="${abs(url(a, page, extra))}"/>`).join('')}<xhtml:link rel="alternate" hreflang="x-default" href="${abs(url(defaultLang, page, extra))}"/>${sitemapImage(page, extra)}</url>`)).join('\n')}
</urlset>
`);
fs.writeFileSync(path.join(dist, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${site.origin}/sitemap.xml\n`);

fs.cpSync(path.join(here, 'assets'), path.join(dist, 'assets'), { recursive: true });
fs.writeFileSync(path.join(dist, 'site.webmanifest'), JSON.stringify({ name: 'Es Fangar', short_name: 'Es Fangar', start_url: '/en/', display: 'browser', background_color: '#F7F2EA', theme_color: '#4A2C6E',
  icons: [{ src: '/assets/icon-192.png', sizes: '192x192', type: 'image/png' }, { src: '/assets/icon-512.png', sizes: '512x512', type: 'image/png' }] }, null, 1));
fs.writeFileSync(path.join(dist, 'assets/favicon.svg'), svgFile('emblem').replace('fill="currentColor"', 'fill="#4A2C6E"'));

const count = langs.length * (Object.keys(pageFns).length + 3 + wines.length + 1);
console.log(`built ${count} pages -> ${path.relative(root, dist)}`);
