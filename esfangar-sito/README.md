# Es Fangar — prototipo del nuovo sito

> **Para el desarrollador de Shopify:** ver [SHOPIFY-HANDOFF.es.md](SHOPIFY-HANDOFF.es.md) (guía en español).
> Per lo sviluppatore Shopify (italiano): [SHOPIFY-HANDOFF.md](SHOPIFY-HANDOFF.md).

Prototipo navigabile del nuovo sito di Es Fangar: tenuta, vini e shop, bodega, esperienze, alloggi, equitazione, eventi e contatti, in **inglese (predefinito), spagnolo e tedesco**.
È un sito statico generato da uno script Node senza dipendenze. Dopo l'approvazione va trasformato in tema Shopify (vedi "Dal prototipo al sito definitivo").

## Avviarlo

Serve Node.js 20 o superiore. Da questa cartella:

```bash
npm run serve
```

Poi apri http://localhost:8797/ (reindirizza a `/en/`).

Per rigenerare le pagine dopo aver modificato i testi:

```bash
npm run build
```

Gli script che rigenerano immagini, logo, mappa e immagini di condivisione richiedono prima `npm install`.

## Cosa è reale e cosa è dimostrativo

| Funzione | Nel prototipo | Nel sito definitivo |
|---|---|---|
| Catalogo vini, prezzi, schede | Reali (da es-fangar.com, ottobre 2026) | Prodotti Shopify |
| Carrello | Dimostrativo (salvato nel browser) | Carrello e checkout Shopify |
| Prenotazione degustazioni | **Widget Bókun reale**: non completare prenotazioni durante la demo | Uguale |
| Alloggi | Link reali ad Airbnb / Vrbo | Uguale |
| Modulo di richiesta | Validazione completa, **non invia nulla** | Invio a management@es-fangar.com |
| Mappa | Statica, senza cookie (© OpenStreetMap) | Uguale |

## Animazioni

Ispirate a centumbrie.com, ma scritte in JavaScript nativo (`src/assets/js/motion.js`, circa 12 KB) invece di GSAP, ScrollMagic e Three.js (oltre 300 KB):

- **Preloader** con emblema e scritta, solo alla prima pagina della sessione (al massimo 2,6 s)
- **Transizioni tra pagine** con effetto sipario (View Transitions: Chrome, Edge, Safari recenti; negli altri browser la navigazione resta normale)
- **Titoli** che salgono parola per parola da una maschera
- **Paragrafi chiave** che si "riempiono" durante lo scroll
- **Immagini** che si scoprono dal basso con uno zoom che rientra
- **Hero** che scivola e sfuma durante lo scroll; parallax nelle sezioni scure
- **Banda di testo** scorrevole, che accelera e si inclina con la velocità dello scroll
- **Numeri** che contano fino al valore
- **Header** che si nasconde scorrendo verso il basso e ricompare verso l'alto
- **Cursore personalizzato** (solo con mouse o trackpad), con etichette "View / Discover / Drag" sopra vini, sezioni e gallerie
- **Pulsanti magnetici**, **anteprima foto** che segue il mouse sull'elenco case della home, **gallerie trascinabili**
- **Hover dei vini come sul sito attuale**: compare la foto d'ambiente e scorrono dentro i pulsanti rotondi "vedi" e "aggiungi"

Tutto si disattiva con "riduci movimento" nelle impostazioni di sistema. Il sito resta completamente usabile anche senza JavaScript.

## SEO

- **Title e meta description** per ogni pagina e lingua. Nelle schede vino il title include la parola chiave, ad esempio "N’Amarat · Organic red wine from Mallorca · Es Fangar" (massimo 60 caratteri).
- **hreflang** EN/ES/DE + x-default, **canonical**, `robots` con `max-image-preview:large`.
- **Dati strutturati (JSON-LD)**:
  - `WebSite`
  - `Winery`/`Organization` con logo PNG, indirizzo, coordinate e mappa
  - `Product` per ogni vino, con immagini, vitigni, gradazione e offerta con spedizione UE (14,90 €, 2–7 giorni)
  - `ProductGroup` per il pacchetto da 12 (Pink/White)
  - `ItemList` dello shop, `LodgingBusiness` per gli alloggi, `BreadcrumbList`, `ContactPage`
- **Immagini di condivisione** (Open Graph / Twitter) da 1200×630 dedicate a ogni pagina e a ogni vino (`src/assets/img/og/`).
- **Testi alternativi** descrittivi per tutte le foto nelle 3 lingue (`src/content/alts.mjs`).
- **Sitemap** con alternative linguistiche e immagini; `robots.txt`; favicon, icona Apple e `site.webmanifest`.
- Per rigenerare logo PNG, icone e immagini di condivisione: `node tools/seo-assets.mjs`.

Dopo il lancio:
- inviare la sitemap a Google Search Console
- verificare i dati strutturati con lo strumento "Test dei risultati multimediali" di Google
- allineare la scheda Google Business Profile (nome, indirizzo, telefono identici al sito)

## Struttura

```
src/content/site.mjs     dati comuni: contatti, URL per lingua, vini, case
src/content/en|es|de.mjs tutti i testi, una lingua per file
src/build.mjs            generatore delle pagine (SEO, hreflang, dati strutturati, sitemap)
src/assets/              CSS, JS, font (self-hosted), immagini ottimizzate, video
tools/images.mjs         genera AVIF/WebP responsive dalle foto in source/
tools/map.mjs            genera la mappa statica
tools/extract-logo.cjs   vettorializza il logo dal PDF
source/                  materiale originale (foto, bottiglie, loghi, tile mappa)
dist/                    sito generato (non modificare a mano)
```

Note sui materiali:
- **Video**: dal file 4K da 600 MB è stato montato un loop di 19 s, in 1920 px (5,3 MB) e 1280 px (2,5 MB) per desktop; per smartphone c'è il verticale (1,8 MB). Il video parte solo dopo l'immagine di anteprima, ha il pulsante pausa, non si avvia con "riduci movimento" o "risparmio dati" e si mette in pausa fuori schermo.
- **Logo**: il logo principale (emblema + ES FANGAR, da `Es Fangar Logo.pdf`) e quello di Es Fangar Vins sono ricostruiti in SVG dai PDF di Canva. Vanno confrontati con gli originali e, se esistono, vanno usati i file vettoriali del grafico. Nell header il logo completo appare in cima alla pagina e diventa solo emblema durante lo scroll.
- **Foto**: arrivano da WhatsApp (1600 px). Per il sito definitivo servono gli originali.

## Dal prototipo al sito definitivo (Shopify)

1. Creare un **tema Shopify Online Store 2.0** su misura riprendendo HTML, CSS e JS del prototipo (sezioni modificabili dallo staff).
2. Lingue: app gratuita **Translate & Adapt**; inglese predefinito, `/es` e `/de`.
3. Modulo: form contatti di Shopify (ha già la protezione antispam e la validazione lato server) con destinatario **management@es-fangar.com**, oppure un'app form se servono campi strutturati.
4. Bókun: sezione con caricamento su clic, come nel prototipo.
5. Analytics: **Plausible**, senza cookie.
6. **Redirect 301** dalle vecchie URL, ad esempio:
   - `/pages/rentals` → `/pages/stays`
   - `/pages/tastings` → `/pages/experiences`
   - `/pages/metode-gravetat` → `/pages/winery`
   - `/pages/catalog` → `/collections/vins`

   Su Shopify le schede prodotto restano su `/products/…`.

## Checklist di lancio

**Contenuti**
- [ ] Numeri di **licenza turistica** delle tre case e numero del registro unico degli affitti (obbligatori negli annunci)
- [ ] Revisione dei testi **DE ed ES** da parte di un madrelingua
- [ ] Ettari della riserva naturale (il sito attuale riporta sia 400 sia 600: ora è scritto "oltre 400")
- [ ] Foto originali ad alta risoluzione; logo vettoriale originale
- [ ] Prezzi, annate e disponibilità verificati in Shopify
- [ ] Decisione sul Cellar Club (oggi escluso)

**Legale e privacy**
- [ ] Aviso legal, Privacy e Cookie rivisti dal consulente (le bozze sono pronte nelle 3 lingue)
- [ ] Banner cookie nativo di Shopify (Customer Privacy) per i cookie del negozio
- [ ] Consigliato: casella "ho almeno 18 anni" al checkout (Impostazioni → Checkout)
- [ ] Contratti di trattamento dati (DPA) con Shopify, Bókun e Plausible

**Sicurezza e accessi**
- [ ] **Revocare gli accessi di Isle of Mallorca Group** (collaborazione terminata) a Shopify, Guesty, Bókun, Airbnb/Vrbo, dominio/DNS e Google
- [ ] Ogni persona con un proprio account e solo i permessi necessari; **autenticazione a due fattori** obbligatoria
- [ ] Nessuna chiave o token nel codice del tema; app Shopify ridotte al minimo e aggiornate

**Qualità**
- [ ] PageSpeed Insights: Core Web Vitals in verde su mobile e desktop
- [ ] Controllo accessibilità (axe / WAVE) e prova completa da tastiera
- [ ] Ordine di prova completo, modulo di prova, prenotazione di prova Bókun (con un prodotto di test)
- [ ] Prove su iPhone e Android reali
- [ ] Sitemap inviata a Google Search Console; scheda Google Business Profile allineata (nome, indirizzo, telefono)

## Guida alla manutenzione

| Quando | Cosa | Chi |
|---|---|---|
| Al bisogno | Prezzi, annate, nuovi vini, foto, testi delle sezioni | Staff (editor Shopify) |
| Ogni mese | Controllo ordini e moduli in arrivo, aggiornamento app Shopify, verifica che il widget Bókun mostri le esperienze giuste | Staff |
| Ogni trimestre | Search Console (errori, pagine non indicizzate), Plausible (pagine più viste), PageSpeed | Staff o tecnico |
| Ogni anno | Revisione privacy e cookie, revisione degli accessi staff, rinnovo dominio | Direzione + consulente |
| Prima di modificare il tema | **Duplicare il tema** in Shopify (backup) e lavorare sulla copia | Tecnico |

Le modifiche al codice del tema (layout, nuove sezioni, integrazioni) richiedono un tecnico. Testi, prodotti e immagini no.
