import { getCollection, type CollectionEntry } from 'astro:content';
import { categories, pick, useT, type Category, type Lang } from '../i18n';

export type Machine = CollectionEntry<'macchine'>;
export type Used = CollectionEntry<'usato'>;

export async function getMachines(): Promise<Machine[]> {
  const all = await getCollection('macchine');
  return all.sort(
    (a, b) =>
      categories.indexOf(a.data.category) - categories.indexOf(b.data.category) ||
      Number(b.data.madeInItaly) - Number(a.data.madeInItaly) ||
      a.data.order - b.data.order ||
      a.data.model.localeCompare(b.data.model),
  );
}

export async function getUsed(): Promise<Used[]> {
  const all = await getCollection('usato', (e) => e.data.published);
  const statusRank = { available: 0, negotiation: 1, sold: 2 } as const;
  return all.sort(
    (a, b) =>
      statusRank[a.data.status] - statusRank[b.data.status] ||
      a.data.order - b.data.order ||
      a.data.model.localeCompare(b.data.model),
  );
}

export function machineName(m: Machine, lang: Lang): string {
  return pick(m.data.title, lang) ?? m.data.model;
}

export function machineTagline(m: Machine, lang: Lang): string {
  return pick(m.data.tagline, lang) ?? useT(lang).categories[m.data.category].singular;
}

export function machineDescription(m: Machine, lang: Lang): string {
  return pick(m.data.description, lang) ?? useT(lang).fallback.description;
}

export function machineAlt(m: Machine, lang: Lang): string {
  return pick(m.data.imageAlt, lang) ?? `${machineName(m, lang)} – ${machineTagline(m, lang)}`;
}

export function specValue(v: Machine['data']['specs'][number]['value'], lang: Lang): string {
  return typeof v === 'string' ? v : (pick(v, lang) ?? '');
}

export function countByCategory<T extends { data: { category: Category } }>(items: T[]) {
  const out = Object.fromEntries(categories.map((c) => [c, 0])) as Record<Category, number>;
  for (const i of items) out[i.data.category]++;
  return out;
}
