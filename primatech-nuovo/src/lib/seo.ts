import { langMeta, url, type Lang } from '../i18n';
import { site } from '../site.config';

const abs = (p: string) => new URL(p, site.url).href;
const ORG_ID = `${site.url}/#azienda`;

export function organizationLd(lang: Lang) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': ORG_ID,
    name: site.name,
    legalName: site.name,
    url: abs(url('home', lang)),
    logo: abs('/img/apple-touch-icon.png'),
    image: abs('/img/og-image.jpg'),
    telephone: site.phone,
    email: site.email,
    vatID: site.vat,
    address: {
      '@type': 'PostalAddress',
      streetAddress: site.address.street,
      postalCode: site.address.postalCode,
      addressLocality: `${site.address.locality}, ${site.address.city}`,
      addressRegion: site.address.region,
      addressCountry: site.address.country,
    },
    areaServed: ['Europe', 'North America', 'South America', 'Asia'],
    knowsLanguage: ['it', 'en', 'fr', 'de', 'es'],
  };
}

export function websiteLd(lang: Lang) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${site.url}/#sito`,
    url: abs(url('home', lang)),
    name: 'Primatech',
    inLanguage: langMeta[lang].hreflang,
    publisher: { '@id': ORG_ID },
  };
}

export function breadcrumbLd(items: { label: string; href: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.label,
      item: abs(it.href),
    })),
  };
}

export function productLd(p: {
  name: string;
  description: string;
  category: string;
  brand?: string;
  image?: string;
  url: string;
  madeInItaly: boolean;
  specs: { name: string; value: string }[];
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: p.name,
    description: p.description,
    category: p.category,
    url: abs(p.url),
    ...(p.image && { image: abs(p.image) }),
    ...(p.brand && { brand: { '@type': 'Brand', name: p.brand } }),
    ...(p.madeInItaly && { manufacturer: { '@id': ORG_ID }, countryOfOrigin: 'IT' }),
    ...(p.specs.length > 0 && {
      additionalProperty: p.specs.map((s) => ({ '@type': 'PropertyValue', name: s.name, value: s.value })),
    }),
  };
}
