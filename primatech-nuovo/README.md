# Sito Primatech – guida alla manutenzione

Sito vetrina multilingua (IT, EN, FR, DE, ES) costruito con [Astro](https://astro.build): genera pagine HTML statiche,
veloci e senza database. Si pubblica su Cloudflare Pages. Prima della messa online segui [CHECKLIST-LANCIO.md](CHECKLIST-LANCIO.md).

## Avvio in locale

Serve Node.js 22 o superiore. Su questo PC c'è una copia portatile in `..\.tools\node\`.

```bash
npm install
npm run dev      # anteprima con ricaricamento automatico su http://localhost:4321
npm run build    # genera il sito in dist/ e verifica la CSP
npm run check    # controllo dei tipi TypeScript
```

## Dove si trova cosa

| Cosa vuoi cambiare | Dove |
|---|---|
| Email, telefono, WhatsApp, indirizzo, P.IVA | `src/site.config.ts` (un solo punto per tutto il sito) |
| Testi delle pagine e dell'interfaccia | `src/i18n/ui/it.ts` (e `en.ts`, `fr.ts`, `de.ts`, `es.ts`) |
| Macchine nuove (catalogo) | `src/content/macchine/*.yml`, un file per modello |
| Macchine usate | pannello **/admin/** oppure `src/content/usato/*.yml` |
| Foto | `src/assets/img/` (macchine e pagine), `src/assets/usato/` (usato) |
| Schede tecniche PDF | `public/schede/`, poi `datasheet: /schede/nome.pdf` nel file della macchina |
| Indirizzi delle pagine nelle 5 lingue | `src/i18n/locales.ts` |
| Colori, caratteri, spaziature | `src/styles/global.css` (variabili in `:root`) |
| Intestazioni di sicurezza (CSP, HSTS…) | `public/_headers` |
| Ricezione del modulo contatti | `functions/api/contatto.ts` |

## Operazioni frequenti

### Aggiungere o aggiornare una macchina usata (senza competenze tecniche)
1. Vai su `https://www.primatech.it/admin/` e accedi con il tuo account GitHub.
2. Apri **Macchine usate**, poi **Nuova** oppure scegli una macchina esistente.
3. Compila modello, categoria e disponibilità, carica le foto (la prima è quella principale) e scrivi la descrizione in italiano.
   Le altre lingue sono facoltative: se mancano, il sito mostra l'inglese o l'italiano.
4. **Salva**. Dopo 1–2 minuti la modifica è online.

Le macchine segnate come **Venduta** restano visibili, ma escono dalla sitemap e non vengono indicizzate da Google.
Per toglierne una dal sito senza cancellarla, disattiva **Pubblicata**.

### Aggiungere un modello nuovo al catalogo
Copia uno dei file in `src/content/macchine/`, ad esempio `primatech-140.yml`, rinominalo (il nome del file diventa l'indirizzo
della pagina) e compila i campi. Se non hai la foto, ometti `image`: comparirà un segnaposto grafico.
Se non hai una descrizione dedicata, ometti `tagline` e `description`: il sito usa un testo standard della categoria.
I dati tecnici (`specs`) usano etichette già tradotte. Indica i valori numerici con la formattazione italiana
oppure come testo nelle 5 lingue (vedi `primatech-140.yml`).

### Modificare un testo
Cerca la frase in `src/i18n/ui/it.ts` e modifica **tutte e cinque** le lingue allo stesso modo.
TypeScript segnala se una traduzione manca o ha una struttura diversa.

### Modificare lo script inline o aggiungerne uno
La CSP consente un solo script inline, identificato dal suo hash in `public/_headers`. Se lo cambi,
`npm run build` fallisce e indica il nuovo hash da copiare in `_headers`. È voluto: evita di pubblicare per errore script non autorizzati.

## Manutenzione periodica

| Quando | Cosa |
|---|---|
| Ogni settimana | Controllare che le richieste dal modulo arrivino (anche nella cartella spam). Aggiornare l'usato venduto. |
| Ogni mese | `npm outdated` e `npm audit`; aggiornare con `npm update`, poi `npm run build` e una verifica visiva. Su GitHub, attivare Dependabot per ricevere avvisi automatici. |
| Ogni 3 mesi | Controllare Google Search Console (errori, pagine escluse) e PageSpeed Insights in versione mobile. Rileggere i dati di contatto. |
| Ogni anno | Rinnovo del dominio. Revisione dell'informativa privacy con il consulente. Aggiornamenti "major" di Astro (leggere la guida di migrazione). |

**Backup:** ogni modifica (anche quelle fatte dal pannello) è un commit su GitHub, quindi la cronologia completa è il backup.
Per sicurezza, attiva la protezione del ramo `main` e l'autenticazione a due fattori per tutti gli account.

**Accessi (privilegio minimo):** un solo amministratore del repository GitHub e dell'account Cloudflare.
Chi aggiorna l'usato ha il ruolo *Write* sul repository, mai *Admin*. Mai account condivisi.

## Scelte tecniche

- **Prestazioni:** HTML statico, circa 3 KB di JavaScript compresso, immagini AVIF/WebP generate in più dimensioni,
  font ospitati sul sito (nessuna richiesta a Google Fonts). Il video della home parte solo su schermi ampi, dopo il caricamento
  della pagina, e mai con "riduci movimento" o "risparmio dati" attivi.
- **Accessibilità (WCAG 2.2 AA):** HTML semantico, link "Vai al contenuto", focus visibile, menu e modulo usabili da tastiera,
  errori del modulo annunciati agli screen reader. Le animazioni si spengono con "riduci movimento", il video ha un pulsante di pausa
  e il nastro delle categorie si muove solo con lo scroll.
- **SEO:** title e description per ogni pagina, URL tradotti, `hreflang` tra le 5 lingue, dati strutturati (Organization, Product,
  BreadcrumbList), `sitemap.xml` con le alternative linguistiche, `robots.txt`.
- **Sicurezza:** CSP restrittiva senza `unsafe-inline` per gli script, HSTS, nosniff, Referrer-Policy e Permissions-Policy.
  Il modulo controlla l'origine della richiesta, ha un campo trappola e un tempo minimo di compilazione, verifica Turnstile lato server,
  valida e ripulisce ogni campo e invia l'email in testo semplice. Le chiavi segrete stanno solo nelle variabili d'ambiente di Cloudflare.
- **Privacy:** nessun cookie e nessuno strumento di statistica, mappa statica senza servizi di terze parti. Per questo non serve il banner cookie.
