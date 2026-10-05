import it, { type UI } from './ui/it';
import en from './ui/en';
import fr from './ui/fr';
import de from './ui/de';
import es from './ui/es';
import type { Lang } from './locales';

export * from './locales';

const dictionaries: Record<Lang, UI> = { it, en, fr, de, es };

export function useT(lang: Lang): UI {
  return dictionaries[lang];
}

/** Sostituisce i segnaposto {nome} in una stringa. */
export function fmt(str: string, vars: Record<string, string | number>): string {
  return str.replace(/\{(\w+)\}/g, (_, k) => String(vars[k] ?? `{${k}}`));
}

type Localized<T> = { it: T } & Partial<Record<Exclude<Lang, 'it'>, T>>;

/** Sceglie la traduzione: lingua richiesta → inglese → italiano. */
export function pick<T>(value: Localized<T> | undefined, lang: Lang): T | undefined {
  if (!value) return undefined;
  return value[lang] ?? value.en ?? value.it;
}
