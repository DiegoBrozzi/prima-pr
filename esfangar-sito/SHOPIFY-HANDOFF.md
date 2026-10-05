# Es Fangar — guida per l'implementazione su Shopify

Destinatario: lo sviluppatore che trasformerà questo prototipo in un **tema Shopify Online Store 2.0** per lo store esistente di es-fangar.com.
Il prototipo è il riferimento approvato per design, testi (EN/ES/DE), animazioni, SEO e accessibilità.

---

## 1. Vedere il prototipo

Serve Node.js 20 o superiore.

```bash
npm install          # solo per gli script immagini/logo; la build non ha dipendenze
npm run build        # rigenera dist/ da src/
npm run serve        # http://localhost:8797
```

`dist/` è già compilata: si può anche servire con qualsiasi server statico.

## 2. Dove sta cosa

| Percorso | Contenuto |
|---|---|
| `src/build.mjs` | Tutto il markup: layout (head, header, footer, carrello), ogni pagina, componenti, JSON-LD, sitemap |
| `src/content/en.mjs`, `es.mjs`, `de.mjs` | **Tutti i testi** delle 3 lingue (UI, pagine, schede vini, moduli, pagine legali in bozza) |
| `src/content/site.mjs` | Contatti, dati societari, vini (prezzi, vitigni, gradazione…), case, link Airbnb/Vrbo, ID Bókun |
| `src/content/alts.mjs` | Testi alternativi delle foto in 3 lingue |
| `src/assets/css/site.css` | Design system (token colore, tipografia, layout) + motion layer in fondo al file |
| `src/assets/js/boot.js` | Classi `js` / `motion` / preloader (sincrono in `<head>`) |
| `src/assets/js/site.js` | Menu, carrello **demo**, filtri, video, modulo, caricamento Bókun |
| `src/assets/js/motion.js` | Animazioni (preloader, reveal, cursore, banda scorrevole, contatori…) |
| `src/assets/fonts/` | Cormorant + Jost (woff2, self-hosted) |
| `src/assets/img/`, `src/assets/video/` | Immagini ottimizzate (AVIF/WebP), share image `og/`, video hero |
| `source/` | Originali: foto, bottiglie, foto d'ambiente, PDF e SVG dei loghi |

## 3. Struttura del tema proposta

```
layout/theme.liquid          ← layout(): head (meta, hreflang lo fa Shopify), preloader, header, footer, cart drawer
sections/
  header.liquid  footer.liquid  cart-drawer.liquid
  home-hero.liquid           video 1280/1920 (desktop) + 720 verticale (mobile), poster, pulsante pausa
  stats-band.liquid  marquee.liquid  intro-text.liquid  pillars.liquid
  featured-wines.liquid      (collection picker)
  feature-dark.liquid  split.liquid  land-grid.liquid  visit-map.liquid
  page-hero.liquid  timeline.liquid  steps.liquid  facts.liquid  gallery-strip.liquid  cta-band.liquid
  experiences-grid.liquid  bokun-booking.liquid
  houses.liquid              (blocchi: una casa per blocco, galleria + link Airbnb/Vrbo + licenza)
  long-stay.liquid  facilities-grid.liquid  events-grid.liquid
  contact-form.liquid  main-product.liquid  main-collection.liquid  main-page.liquid  main-404.liquid
snippets/
  wine-card.liquid           card con hover: foto d'ambiente + pulsanti rotondi (vedi / aggiungi)
  picture.liquid             <picture> responsive con image_url / image_tag
  icon.liquid  logo.liquid   (SVG inline da source/logo/*.svg, fill="currentColor")
  json-ld-org.liquid  json-ld-product.liquid  json-ld-breadcrumb.liquid
templates/
  index.json  collection.json  product.json  404.json
  page.estate.json  page.winery.json  page.experiences.json  page.stays.json
  page.equestrian.json  page.events.json  page.contact.json  page.json (legali)
assets/  site.css  boot.js  site.js  motion.js  font .woff2  (video .mp4 ≤ 20 MB oppure in Contenuti → File)
locales/ en.default.json  es.json  de.json   (stringhe UI da ui.* nei file content)
```

Ogni testo delle pagine entra come **impostazione di sezione o blocco**, così lo staff lo modifica dall'editor. Le traduzioni si gestiscono con **Translate & Adapt**, incollando ES/DE da `src/content/es.mjs` e `de.mjs`.

## 4. Prodotti: metafield da creare

*Impostazioni → Dati personalizzati → Prodotti*, namespace `wine`. Tutti traducibili.

| Chiave | Tipo | Esempio / fonte |
|---|---|---|
| `wine.category` | Testo a riga singola (white / rose / red / sweet) | filtro dello shop |
| `wine.style` | Testo a riga singola | "Gran Reserva red · 32 months in barrel" (`wineText.*.type`) |
| `wine.short` | Testo a riga singola | nota breve della card (`wineText.*.short`) |
| `wine.varieties` | Testo a riga singola | `site.mjs → wines[].varieties` |
| `wine.abv` | Decimale | 13.6 |
| `wine.serving_temp` | Testo a riga singola | "16–18 °C" |
| `wine.color`, `wine.nose`, `wine.palate` | Testo multiriga | note di degustazione |
| `wine.pairing` | Testo a riga singola | abbinamenti |
| `wine.residual_sugar` | Testo a riga singola | solo Genesis Semi Dolç: "35 g/L" |
| `wine.scene_image` | File (immagine) | foto d'ambiente per l'hover: `source/bottles/scene-*.{png,jpg}` |

- **Annate:** restano varianti Shopify (es. N'Amarat 2013 / 2015).
- **Pacchetto 12-for-90:** varianti Pink / White con **immagine di variante**. Al cambio variante si mostra `variant.featured_image`, come già fa il prototipo.
- **Handle:** non cambiare quelli esistenti (`n-amarat-bio-es-fangar-vins` ecc.) per non perdere il posizionamento. Nel prototipo gli URL sono `/en/wines/<slug>`; su Shopify restano `/products/<handle>`.
- **Foto bottiglia:** sono già nei prodotti. Nella card hanno `mix-blend-mode: multiply` sullo sfondo `#F7F7F9` delle foto attuali.

## 5. Cosa sostituire rispetto al prototipo

| Prototipo | Su Shopify |
|---|---|
| Carrello in `localStorage` (`site.js`, sezione "basket") | **Ajax Cart API**: `POST /cart/add.js`, `/cart/change.js`, `GET /cart.js`; checkout su `/checkout`. Mantenere drawer, focus trap, soglia spedizione gratuita (89 €) e toast. |
| `CATALOG` in JSON nella pagina | Dati dal prodotto o dalla risposta di `/cart.js` |
| Modulo `[data-enquiry]` (non invia) | `{% form 'contact' %}` con campi `contact[type]`, `contact[name]`, `contact[email]`, `contact[phone]`, `contact[company]`, `contact[from]`, `contact[to]`, `contact[guests]`, `contact[horses]`, `contact[body]`. Mantenere validazione e messaggi accessibili. L'antispam (hCaptcha) è già incluso in Shopify. Le richieste vanno a **management@es-fangar.com**: è l'email di contatto dello store, oppure si usa un'app modulo. |
| Immagini AVIF/WebP pre-generate | `image_url` + `image_tag` con `widths` e `sizes` (Shopify serve AVIF/WebP in automatico). Foto caricate in **Contenuti → File** o nelle impostazioni di sezione. |
| `<meta http-equiv="Content-Security-Policy">` | Non controllabile su Shopify: rimuovere |
| Hreflang, canonical, sitemap, robots | Li genera Shopify. Tenere solo meta OG/Twitter e JSON-LD. |
| Mappa statica | Riusare l'immagine `map-mallorca-896.*` e il segnaposto, con attribuzione © OpenStreetMap |
| Banner cookie | Banner nativo di Shopify (Customer Privacy API). Bókun resta caricato solo al clic. |

## 6. Integrazioni

- **Bókun:**
  - loader `https://widgets.bokun.io/assets/javascripts/apps/build/BokunWidgetsLoader.js?bookingChannelUUID=6531113e-e97b-4c7b-8ab3-f54675aea107`
  - lista `https://widgets.bokun.io/online-sales/6531113e-e97b-4c7b-8ab3-f54675aea107/product-list/113213`
  - caricamento su clic, vedi `site.js` sezione "Bókun"
- **Alloggi:** solo link esterni ad Airbnb e Vrbo (in `site.mjs → houses`). Le prenotazioni restano su Guesty.
- **Analytics:** Plausible (senza cookie) in `theme.liquid`.

## 7. Lingue e URL

- **Lingue:** inglese primaria, spagnolo e tedesco pubblicati (*Impostazioni → Lingue*). Shopify crea `/es/…` e `/de/…` con hreflang.
- **Handle delle pagine tradotti con Translate & Adapt:**

  | EN | ES | DE |
  |---|---|---|
  | estate | finca | gut |
  | winery | bodega | weingut |
  | experiences | experiencias | erlebnisse |
  | stays | alojamientos | unterkuenfte |
  | equestrian | hipica | reiten |
  | events | eventos | events |
  | contact | contacto | kontakt |

- **Redirect 301** (*Navigazione → Reindirizzamenti URL*):
  - `/pages/rentals` → `/pages/stays`
  - `/pages/tastings` → `/pages/experiences`
  - `/pages/metode-gravetat` → `/pages/winery`
  - `/pages/learn-about-vins` → `/collections/vins`
  - `/pages/catalog` → `/collections/vins`

## 8. SEO da riportare nel tema

- **Title e description** per pagina e lingua: `meta.*` nei file content.
- **Title delle schede vino:** "{nome} · {wine.seoCat} · Es Fangar", con fallback senza "· Es Fangar" sopra i 60 caratteri.
- **JSON-LD** (vedi `build.mjs`: `websiteLd`, `wineryLd`, `productLd`, `breadcrumbLd`, ProductGroup del pacchetto, LodgingBusiness). In `productLd` ci sono anche `shippingDetails` per i 27 Paesi UE (14,90 €, consegna 2–7 giorni).
- **Share image 1200×630** per pagina e per vino: `src/assets/img/og/`, impostabili da metafield di pagina o di prodotto.
- **Testi alternativi:** `src/content/alts.mjs`. Per le foto caricate in Shopify si compilano nel campo "testo alternativo".
- **Logo PNG** per `Organization.logo`: `src/assets/img/logo-es-fangar.png`. Icone: `favicon-32.png`, `apple-touch-icon.png`, `icon-192/512.png`.

## 9. Requisiti da mantenere

- **Accessibilità WCAG 2.2 AA:**
  - skip link, focus visibile, menu e drawer con focus trap ed Esc
  - target di almeno 44 px
  - errori del modulo con riepilogo e `aria-invalid`
  - video con pulsante pausa
- **Movimento:** tutto il motion layer è subordinato a `html.motion`, cioè a `prefers-reduced-motion: no-preference`. Il cursore personalizzato è attivo solo con `pointer: fine`.
- **Prestazioni:**
  - nessuna libreria JS; font self-hosted con preload
  - LCP = immagine poster della hero (preload)
  - il video parte dopo il poster, non parte con Save-Data e va in pausa fuori schermo
- **Core Web Vitals in verde** su mobile, da verificare con PageSpeed prima della pubblicazione.

## 10. Procedura consigliata

1. **Duplicare il tema attuale** (backup).
2. Accesso **collaboratore** con permesso Temi, Prodotti e Pagine.
3. Sviluppare con Shopify CLI:
   ```bash
   shopify theme dev --store es-fangar.myshopify.com
   ```
4. Creare metafield, compilarli e caricare le foto d'ambiente.
5. Creare pagine e menu, poi le traduzioni ES/DE.
6. Caricare il tema **non pubblicato**:
   ```bash
   shopify theme push --unpublished
   ```
7. QA:
   - ordine di prova
   - modulo
   - Bókun (senza completare prenotazioni reali)
   - mobile, tastiera, PageSpeed
8. Pubblicare. Inviare la sitemap a Search Console e verificare il JSON-LD con il Rich Results Test.

## 11. Punti aperti (lato Es Fangar)

- Numeri di **licenza turistica** delle 3 case e del registro unico degli affitti (oggi "pending")
- **Revisione madrelingua** dei testi DE ed ES
- **Ettari della riserva naturale:** sul sito attuale ci sono due valori (400 / 600); ora è scritto "oltre 400"
- **Foto originali** ad alta risoluzione e **logo vettoriale** originale; gli SVG attuali sono ricostruiti da PDF Canva
- **Testi legali** (Aviso legal, Privacy, Cookie) da far rivedere al consulente
- Consigliata la **casella "+18" al checkout**
- **Revocare gli accessi** del vecchio gestore (Isle of Mallorca Group) a Shopify, Guesty, Bókun, dominio e Google
