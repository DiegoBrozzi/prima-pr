// Language-neutral data: contact details, routes, wines, houses.
// Prices and wine data mirror the live Shopify catalogue (es-fangar.com, October 2026).

export const site = {
  name: 'Es Fangar',
  origin: 'https://es-fangar.com',
  company: 'FINCA ES FANGAR, SAU',
  nif: 'A08269060',
  registry: 'Registro Mercantil de Mallorca, Hoja PM-51324, Tomo 2146, Folio 122',
  street: 'Camino Son Prohens, s/n',
  postcode: '07209',
  locality: 'Felanitx',
  region: 'Illes Balears',
  country: 'ES',
  phone: '+34 971 58 19 38',
  phoneHref: '+34971581938',
  email: 'info@es-fangar.com',
  enquiryEmail: 'management@es-fangar.com',
  geo: { lat: 39.495068, lng: 3.202373 },
  mapsUrl: 'https://www.google.com/maps/place/Finca+ES+FANGAR/@39.4956558,3.1977274,647m/data=!3m1!1e3!4m6!3m5!1s0x12964dbca9a9a1ed:0xaf9dd9ad324401!8m2!3d39.4958087!4d3.1958496!16zL20vMDgyNGZ3',
  social: {
    instagram: 'https://www.instagram.com/esfangarvins/',
    facebook: 'https://www.facebook.com/EsFangar/',
  },
  bokun: {
    loader: 'https://widgets.bokun.io/assets/javascripts/apps/build/BokunWidgetsLoader.js?bookingChannelUUID=6531113e-e97b-4c7b-8ab3-f54675aea107',
    list: 'https://widgets.bokun.io/online-sales/6531113e-e97b-4c7b-8ab3-f54675aea107/product-list/113213',
  },
  shipping: { flat: 14.9, freeFrom: 89 },
};

export const langs = ['en', 'es', 'de'];
export const defaultLang = 'en';

// page id -> slug per language ('' = language home)
export const routes = {
  home: { en: '', es: '', de: '' },
  estate: { en: 'estate', es: 'finca', de: 'gut' },
  wines: { en: 'wines', es: 'vinos', de: 'weine' },
  winery: { en: 'winery', es: 'bodega', de: 'weingut' },
  experiences: { en: 'experiences', es: 'experiencias', de: 'erlebnisse' },
  stays: { en: 'stays', es: 'alojamientos', de: 'unterkuenfte' },
  equestrian: { en: 'equestrian', es: 'hipica', de: 'reiten' },
  events: { en: 'events', es: 'eventos', de: 'events' },
  contact: { en: 'contact', es: 'contacto', de: 'kontakt' },
  legal: { en: 'legal-notice', es: 'aviso-legal', de: 'impressum' },
  privacy: { en: 'privacy', es: 'privacidad', de: 'datenschutz' },
  cookies: { en: 'cookies', es: 'cookies', de: 'cookies' },
};

export const url = (lang, page, extra = '') => {
  const slug = routes[page][lang];
  return `/${lang}/${slug ? slug + '/' : ''}${extra ? extra + '/' : ''}`;
};

// category: white | rose | red | sweet
export const wines = [
  { slug: 'twentytwelve-white', name: 'TwentyTwelve White', category: 'white', vintages: ['2025'], price: 15.0, img: 'bottle-twentytwelve-white', scene: 'scene-twentytwelve-white',
    varieties: 'Moscatell de gra petit 50%, Moscatell d’Alexandria 50%', abv: '13.5', temp: '10–12' },
  { slug: 'twentytwelve-pink', name: 'TwentyTwelve Pink', category: 'rose', vintages: ['2025'], price: 15.0, img: 'bottle-twentytwelve-pink',
    varieties: 'Syrah 86%, Manto Negro 14%', abv: '13.5', temp: '10–12' },
  { slug: 'sa-sivina', name: 'Sa Sivina', category: 'white', vintages: ['2024'], price: 15.6, img: 'bottle-sa-sivina', scene: 'scene-sa-sivina',
    varieties: 'Prensal Blanc 64%, Giró Ros 36%', abv: '12', temp: '10–12' },
  { slug: 'sa-fita', name: 'Sa Fita', category: 'white', vintages: ['2024'], price: 19.5, img: 'bottle-sa-fita',
    varieties: 'Chardonnay 77%, Viognier 15%, Giró Ros 8%', abv: '13.5', temp: '10–12' },
  { slug: 'lo-cortinello', name: 'Lo Cortinel·lo', category: 'white', vintages: ['2024'], price: 31.4, img: 'bottle-lo-cortinello',
    varieties: 'Chardonnay 50%, Viognier 50%', abv: '12.5', temp: '10–12' },
  { slug: 'genesis-semi-dolc', name: 'Genesis Semi Dolç', category: 'sweet', vintages: ['2023'], price: 24.0, img: 'bottle-genesis',
    varieties: 'Giró Blanc 59%, Prensal Blanc 41%', abv: '11', temp: '10–12', sugar: '35 g/L' },
  { slug: 'son-p', name: 'Son P', category: 'red', vintages: ['2024'], price: 15.6, img: 'bottle-son-p',
    varieties: 'Manto Negro 47%, Callet 33%, Syrah 15%, Cabernet Sauvignon 5%', abv: '11.5', temp: '14–16' },
  { slug: 'fangar-elements', name: 'Fangar · Elements', category: 'red', vintages: ['2013'], price: 30.5, img: 'bottle-fangar-elements',
    varieties: 'Cabernet Sauvignon, Callet, Manto Negro, Merlot, Syrah', abv: '14.5', temp: '16–18', months: 24 },
  { slug: 'n-amarat', name: 'N’Amarat', category: 'red', vintages: ['2013', '2015'], price: 48.9, img: 'bottle-n-amarat',
    varieties: 'Callet, Merlot, Cabernet Sauvignon, Syrah', abv: '13.6', temp: '16–18', months: 32 },
];

// each option has its own photo (red bottles for Pink, golden for White)
export const offer = { slug: 'twentytwelve-12-for-90', name: 'TwentyTwelve 12-for-90', price: 90, compareAt: 180, img: 'box-12',
  options: ['TwentyTwelve Pink', 'TwentyTwelve White'], optionImgs: { 'TwentyTwelve Pink': 'box-12', 'TwentyTwelve White': 'box-12-white' } };

export const houses = [
  { id: 'arabic-house', name: 'The Arabic House', bedrooms: 3, guests: 6,
    imgs: ['arabic-house-pool', 'arabic-house-lounge', 'arabic-house-interior', 'arabic-house-aerial'],
    airbnb: 'https://www.airbnb.com/h/esfangar-villa-arabica', vrbo: 'https://www.vrbo.com/en-gb/p12251735?dateless=true' },
  { id: 'mallorcan-house', name: 'The Mallorcan House', bedrooms: 2, guests: 4,
    imgs: ['mallorcan-house-garden', 'mallorcan-house-living', 'mallorcan-house-pergola', 'mallorcan-house-aerial'],
    airbnb: 'https://www.airbnb.com/h/esfangar-villa-mallorquina', vrbo: 'https://www.vrbo.com/en-gb/p12251733?dateless=true' },
  { id: 'the-lodge', name: 'The Lodge', bedrooms: 2, guests: 4,
    imgs: ['lodge-pool', 'lodge-living', 'lodge-terrace'],
    airbnb: 'https://www.airbnb.com/h/esfangar-villa-portocolom', vrbo: 'https://www.vrbo.com/en-gb/p12251734?dateless=true' },
];
