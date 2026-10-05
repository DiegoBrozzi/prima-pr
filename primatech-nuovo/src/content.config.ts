import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

/** Campo facoltativo che accetta anche valori vuoti scritti dal pannello ('' o null). */
const opt = <T extends z.ZodType>(schema: T) =>
  z.preprocess((v) => (v === '' || v === null ? undefined : v), schema.optional());

const category = z.enum(['hot-foil', 'die-cutting', 'folder-gluer', 'laminator', 'flexo']);

/** Testo in 5 lingue: l'italiano è obbligatorio, le altre ricadono su inglese → italiano. */
const localized = z.object({
  it: z.string(),
  en: z.string().optional(),
  fr: z.string().optional(),
  de: z.string().optional(),
  es: z.string().optional(),
});

const localizedList = z.object({
  it: z.array(z.string()),
  en: z.array(z.string()).optional(),
  fr: z.array(z.string()).optional(),
  de: z.array(z.string()).optional(),
  es: z.array(z.string()).optional(),
});

/** Dato tecnico: etichetta da dizionario + valore (numerico/neutro o tradotto). */
const spec = z.object({
  key: z.enum([
    'sheetMax',
    'sheetMin',
    'printArea',
    'pressure',
    'speed',
    'accuracy',
    'register',
    'materials',
    'power',
  ]),
  value: z.union([z.string(), localized]),
});

const macchine = defineCollection({
  loader: glob({ pattern: '**/*.yml', base: './src/content/macchine' }),
  schema: ({ image }) =>
    z.object({
      model: z.string(),
      brand: z.string().optional(),
      category,
      // Nome tradotto, per macchine senza un codice modello (es. linee di accoppiatura)
      title: localized.optional(),
      madeInItaly: z.boolean().default(false),
      order: z.number().default(100),
      image: image().optional(),
      imageAlt: localized.optional(),
      tagline: localized.optional(),
      description: localized.optional(),
      features: localizedList.optional(),
      specs: z.array(spec).default([]),
      // PDF in /public/schede/ (es. "/schede/primatech-140.pdf")
      datasheet: z.string().optional(),
    }),
});

const usato = defineCollection({
  loader: glob({ pattern: '**/*.yml', base: './src/content/usato' }),
  schema: ({ image }) =>
    z.object({
      model: z.string(),
      brand: opt(z.string()),
      category,
      status: z.enum(['available', 'negotiation', 'sold']).default('available'),
      year: opt(z.coerce.number().int().min(1950).max(2100)),
      sheetFormat: opt(z.string()),
      condition: opt(z.enum(['overhauled', 'working', 'as-is'])),
      location: opt(z.string()),
      // Elenco foto (la prima è la principale). Può mancare o essere null se salvato vuoto dal pannello.
      images: z.array(image()).nullish(),
      description: opt(
        z.object({
          it: z.string(),
          en: opt(z.string()),
          fr: opt(z.string()),
          de: opt(z.string()),
          es: opt(z.string()),
        }),
      ),
      published: z.boolean().default(true),
      order: z.number().default(100),
    }),
});

export const collections = { macchine, usato };
