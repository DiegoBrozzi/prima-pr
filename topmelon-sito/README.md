# Sito Top Melon

Sito vetrina a pagina singola per la Società Agricola Top Melon srl di Pantalla di Todi (PG).
HTML, CSS e JavaScript statici, senza dipendenze né build: si pubblica copiando la cartella su qualsiasi hosting
(Cloudflare Pages, Netlify, hosting tradizionale).

## Anteprima in locale

Dalla cartella del progetto, con il Node portatile di `..\.tools\node\`:

```bash
npx serve .
```

oppure apri l'anteprima `topmelon-sito` dal pannello del browser di Claude.

## Dove si trova cosa

| Cosa vuoi cambiare | Dove |
|---|---|
| Testi, numeri, contatti | `index.html` |
| Schede tecniche dei prodotti (finestra che si apre al clic) | `index.html`, blocchi `<template id="p-…">` |
| Mesi del calendario di raccolta | `index.html`, sezione `#stagioni`: `--s` = mese di inizio, `--e` = mese di fine (1–12) |
| Colori, caratteri, animazioni | `assets/css/style.css` (variabili in `:root`) |
| Comportamenti (menu, contatori, scheda prodotto, modulo) | `assets/js/main.js` |
| Immagini | `assets/img/` (WebP, due formati: `-sm` e `-lg`) |

## Animazioni

- Apertura con logo e anelli, titolo che entra riga per riga, melone che segue il mouse, semi che fluttuano, badge rotante.
- Nastro dei prodotti, manifesto che si "accende" parola per parola con lo scroll, contatori numerici.
- Foto che si svelano, timeline che si riempie, card prodotto con inclinazione 3D e scheda tecnica animata.
- Calendario con barre che crescono e indicatore del mese corrente, filiera con immagine fissa che cambia a ogni passo.
- Anelli di avanzamento nella sostenibilità, parallax, bottoni "magnetici".

Tutte le animazioni si spengono se il visitatore ha attivato "riduci movimento" nel sistema operativo,
e il contenuto resta leggibile anche senza JavaScript.

## Prima della messa online

- **Modulo contatti:** oggi apre il programma di posta del visitatore con il messaggio già compilato per info@topmelon.it.
  Per riceverlo direttamente serve un servizio di invio (per esempio una Cloudflare Function come in `primatech-nuovo`, o Formspree).
- **Dati da far confermare all'azienda:** sul sito attuale la scheda del melone gialletto riporta gli stessi valori del retato
  (aprile–ottobre, 10.000 q), mentre il testo indica agosto–ottobre e circa 3.000 q. Qui è usato il testo; i volumi del retato
  sono 100.000 q nella scheda e 120.000 q nel testo (qui: 100.000 q).
- **Privacy e whistleblowing:** i link puntano alle pagine del sito attuale. Se il dominio passa al nuovo sito, vanno ricreate.
- **Font:** caricati da Google Fonts. Per non contattare server esterni si possono ospitare in locale.
- Immagini sorgente: scaricate da topmelon.it e convertite in WebP.
