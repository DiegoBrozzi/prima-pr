/**
 * Cloudflare Pages Function: riceve il modulo di contatto (POST /api/contatto).
 *
 * Sicurezza:
 *  - accetta solo POST dallo stesso dominio (controllo Origin, protezione CSRF);
 *  - limita la dimensione della richiesta e la lunghezza di ogni campo;
 *  - campo trappola + tempo minimo di compilazione contro i bot;
 *  - verifica Cloudflare Turnstile lato server (se configurato);
 *  - email inviata in testo semplice (nessun HTML: niente iniezioni), intestazioni ripulite.
 *
 * Variabili d'ambiente (Cloudflare Pages → Settings → Environment variables, come "Secret"):
 *  - RESEND_API_KEY     chiave API del servizio di invio email (resend.com)
 *  - MAIL_TO            casella che riceve le richieste (es. info@primatech.it)
 *  - MAIL_FROM          mittente verificato (es. "Sito Primatech <sito@primatech.it>")
 *  - TURNSTILE_SECRET   chiave segreta di Cloudflare Turnstile
 *  - ALLOWED_ORIGINS    origini ammesse, separate da virgola (es. https://www.primatech.it,https://primatech.it)
 */

import { locales, url, type Lang } from '../../src/i18n/locales';

interface Env {
  RESEND_API_KEY?: string;
  MAIL_TO?: string;
  MAIL_FROM?: string;
  TURNSTILE_SECRET?: string;
  ALLOWED_ORIGINS?: string;
}

type Ctx = { request: Request; env: Env };

const MAX_BODY = 64 * 1024;
const MIN_FILL_MS = 3000;
const TOPICS = ['quote', 'sheet', 'usedBuy', 'usedSell', 'service', 'parts', 'info'] as const;
const TOPIC_LABELS: Record<(typeof TOPICS)[number], string> = {
  quote: 'Preventivo macchina nuova',
  sheet: 'Richiesta scheda tecnica',
  usedBuy: 'Acquisto usato',
  usedSell: 'Vendita usato',
  service: 'Assistenza tecnica',
  parts: 'Ricambi',
  info: 'Altre informazioni',
};
const EMAIL_RE = /^[^\s@<>()[\]\\,;:"]{1,64}@[^\s@<>()[\]\\,;:"]{1,190}\.[a-z]{2,24}$/i;

const clean = (v: FormDataEntryValue | null, max: number) =>
  typeof v === 'string'
    ? v
        .replace(/\r\n?/g, '\n')
        // eslint-disable-next-line no-control-regex
        .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, '')
        .trim()
        .slice(0, max)
    : '';
const oneLine = (s: string) => s.replace(/\s+/g, ' ').trim();

function respond(request: Request, ok: boolean, status: number, lang: Lang) {
  const wantsJson = (request.headers.get('Accept') || '').includes('application/json');
  if (wantsJson) {
    return new Response(JSON.stringify({ ok }), {
      status,
      headers: { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' },
    });
  }
  // Senza JavaScript: reindirizza alla pagina di ringraziamento o di nuovo al modulo
  const target = ok ? url('thanks', lang) : `${url('contact', lang)}?errore=1`;
  return new Response(null, { status: 303, headers: { Location: target, 'Cache-Control': 'no-store' } });
}

async function verifyTurnstile(secret: string, token: string, ip: string | null) {
  if (!token) return false;
  const body = new FormData();
  body.append('secret', secret);
  body.append('response', token);
  if (ip) body.append('remoteip', ip);
  const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', { method: 'POST', body });
  if (!res.ok) return false;
  const data = (await res.json()) as { success?: boolean };
  return data.success === true;
}

export const onRequestPost = async ({ request, env }: Ctx): Promise<Response> => {
  let lang: Lang = 'it';

  // 1. Origine: solo richieste dal nostro sito
  const origin = request.headers.get('Origin');
  const allowed = (env.ALLOWED_ORIGINS || new URL(request.url).origin).split(',').map((s) => s.trim());
  if (!origin || !allowed.includes(origin)) return respond(request, false, 403, lang);

  // 2. Dimensione e tipo
  const length = Number(request.headers.get('Content-Length') || 0);
  if (length > MAX_BODY) return respond(request, false, 413, lang);
  const type = request.headers.get('Content-Type') || '';
  if (!type.startsWith('multipart/form-data') && !type.startsWith('application/x-www-form-urlencoded')) {
    return respond(request, false, 415, lang);
  }

  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return respond(request, false, 400, lang);
  }

  const rawLang = clean(form.get('lang'), 5);
  if ((locales as readonly string[]).includes(rawLang)) lang = rawLang as Lang;

  // 3. Antispam silenzioso: ai bot rispondiamo "ok" senza inviare nulla
  const honeypot = clean(form.get('website'), 200);
  const started = Number(clean(form.get('ts'), 20));
  if (honeypot || (started && Date.now() - started < MIN_FILL_MS)) return respond(request, true, 200, lang);

  // 4. Validazione
  const data = {
    name: oneLine(clean(form.get('name'), 120)),
    company: oneLine(clean(form.get('company'), 160)),
    email: oneLine(clean(form.get('email'), 254)),
    phone: oneLine(clean(form.get('phone'), 40)),
    country: oneLine(clean(form.get('country'), 80)),
    topic: clean(form.get('topic'), 20),
    machine: oneLine(clean(form.get('machine'), 160)),
    message: clean(form.get('message'), 4000),
    privacy: clean(form.get('privacy'), 5),
  };
  const valid =
    data.name.length >= 2 &&
    data.company.length >= 1 &&
    EMAIL_RE.test(data.email) &&
    data.country.length >= 2 &&
    (TOPICS as readonly string[]).includes(data.topic) &&
    data.message.length >= 2 &&
    data.privacy === 'yes' &&
    (!data.phone || /^[+()\d\s./-]{5,40}$/.test(data.phone));
  if (!valid) return respond(request, false, 422, lang);

  // 5. Turnstile
  if (env.TURNSTILE_SECRET) {
    const token = clean(form.get('cf-turnstile-response'), 2048);
    const human = await verifyTurnstile(env.TURNSTILE_SECRET, token, request.headers.get('CF-Connecting-IP'));
    if (!human) return respond(request, false, 403, lang);
  }

  // 6. Invio email
  if (!env.RESEND_API_KEY || !env.MAIL_TO || !env.MAIL_FROM) {
    console.error('Modulo contatti: variabili email non configurate');
    return respond(request, false, 503, lang);
  }
  const topicLabel = TOPIC_LABELS[data.topic as keyof typeof TOPIC_LABELS];
  const subject = oneLine(`[Sito ${lang.toUpperCase()}] ${topicLabel} – ${data.company}`).slice(0, 180);
  const text = [
    `Nuova richiesta dal sito (${lang.toUpperCase()})`,
    '',
    `Argomento: ${topicLabel}`,
    `Macchina:  ${data.machine || '—'}`,
    '',
    `Nome:      ${data.name}`,
    `Azienda:   ${data.company}`,
    `Paese:     ${data.country}`,
    `Email:     ${data.email}`,
    `Telefono:  ${data.phone || '—'}`,
    '',
    'Messaggio:',
    data.message,
    '',
    '—',
    `Consenso privacy: sì · ${new Date().toISOString()}`,
  ].join('\n');

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${env.RESEND_API_KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ from: env.MAIL_FROM, to: [env.MAIL_TO], reply_to: data.email, subject, text }),
    });
    if (!res.ok) {
      console.error('Invio email fallito', res.status);
      return respond(request, false, 502, lang);
    }
  } catch (err) {
    console.error('Invio email fallito', err);
    return respond(request, false, 502, lang);
  }

  return respond(request, true, 200, lang);
};

// Qualsiasi altro metodo non è ammesso
export const onRequest = async (): Promise<Response> =>
  new Response('Method Not Allowed', { status: 405, headers: { Allow: 'POST' } });
