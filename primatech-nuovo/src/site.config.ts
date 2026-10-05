/**
 * Dati aziendali e recapiti, in un unico punto.
 * Prima del lancio: verificare email e WhatsApp (vedi CHECKLIST-LANCIO.md).
 */
export const site = {
  name: 'Primatech srl',
  url: 'https://www.primatech.it',
  // TODO lancio: confermare l'indirizzo che riceve le richieste.
  email: 'info@primatech.it',
  phone: '+39 075 529 2382',
  phoneHref: '+390755292382',
  // TODO lancio: numero WhatsApp Business in formato internazionale senza "+" (es. '393331234567').
  // Finché è vuoto, il pulsante WhatsApp non viene mostrato.
  whatsapp: '',
  vat: 'IT02506060546',
  vatDisplay: '02506060546',
  address: {
    street: 'Via Leone Maccheroni, 50',
    postalCode: '06132',
    locality: "Sant'Andrea delle Fratte",
    city: 'Perugia',
    region: 'PG',
    country: 'IT',
  },
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=Primatech+srl+Via+Leone+Maccheroni+50+Sant'Andrea+delle+Fratte+Perugia",
  // Chiave pubblica di Cloudflare Turnstile (la chiave segreta va solo nelle variabili d'ambiente).
  // TODO lancio: inserire la site key reale.
  turnstileSiteKey: '',
} as const;
