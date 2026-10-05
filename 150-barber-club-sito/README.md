# Sito 150 Barber Club

Sito vetrina a pagina singola per il 150 Barber Club, barbiere in Via Antonio Gramsci 150 a Chiugiana (Corciano, Perugia).
È fatto in HTML, CSS e JavaScript statici, senza dipendenze né build: per pubblicarlo basta copiare la cartella su un qualsiasi hosting
(Cloudflare Pages, Netlify, hosting tradizionale).

## Anteprima in locale

Apri l'anteprima `150-barber-club-sito` dal pannello del browser di Claude, oppure dalla cartella del progetto:

```bash
npx serve .
```

## Dove si trova cosa

| Cosa vuoi cambiare | Dove |
|---|---|
| Testi, prezzi, contatti, link di prenotazione | `index.html` |
| Orari (tabella) | `index.html`, sezione `#orari` |
| Orari (calcolo "Aperto ora / Chiuso") | `assets/js/main.js`, costante `HOURS` in cima al file |
| Colori, caratteri, animazioni | `assets/css/style.css` (variabili in `:root`) |
| Comportamenti (apertura, cursore, galleria, recensioni, mappa) | `assets/js/main.js` |
| Immagini | `assets/img/` (WebP, due formati: `-sm` 800px e `-lg` 1600px) |

## Stile e animazioni

Lo stile è "dark urban": nero, avorio e rosso da insegna da barbiere, con titoli condensati (Anton), testo in Manrope
ed etichette in JetBrains Mono.

- Apertura con contatore da 000 a 150 che si apre in due (solo alla prima visita della sessione).
- Titolo che entra riga per riga, foto con zoom lento e parallasse, "150" gigante in trasparenza, badge rotante "5.0 su Treatwell".
- Doppio nastro di parole che accelera e si inclina con la velocità dello scroll.
- Manifesto che si "accende" parola per parola, foto che si svelano, contatori numerici.
- Listino con riga che si riempie e foto che segue il mouse.
- Galleria orizzontale agganciata allo scroll su desktop, da scorrere col dito su mobile.
- Card del team con inclinazione 3D e strisce da palo del barbiere, recensioni a rotazione con barre di avanzamento.
- Stato "Aperto ora / Chiuso, riapre…" calcolato sull'ora italiana, giorno corrente evidenziato negli orari.
- Cursore personalizzato, bottoni magnetici, barra di prenotazione fissa su mobile.

Tutte le animazioni si spengono se il visitatore ha attivato "riduci movimento" nel sistema operativo,
e il contenuto resta leggibile anche senza JavaScript.

## Prima della messa online

- **Foto:** sono **segnaposto** gratuite da Unsplash (licenza libera, attribuzione non obbligatoria). Vanno sostituite con foto vere
  del negozio, dei lavori e del team, usando gli stessi nomi file e convertendole in WebP a 800 e 1600 px di larghezza.
- **Team:** le card mostrano le iniziali al posto delle foto. Con le foto vere si può mettere un `<img>` dentro `.member__art`.
- **Logo:** è tipografico ("150" con sottolineatura rossa). Se il negozio ha un logo ufficiale, va sostituito nell'header, nel footer
  e nelle icone (`favicon-32.png`, `apple-touch-icon.png`, `icon-512.png`, `og-image.jpg`).
- **Orari da confermare:** qui sono usati quelli di Treatwell (mar–ven 10–19, sab 9–17). Su Google/Fresha risultano invece
  mar–mer 10–13 e 15–19, gio–sab 10–19. Vanno chiesti al negozio e aggiornati sia nella tabella sia in `HOURS` e nel JSON-LD.
- **Nome:** sul sito è usato "150 Barber Club" (come su Treatwell). L'Instagram è `@150_152_barberclub`.
  Su Treatwell compare anche un "MV Club c/o 150 Barber Club" (barbiere Mattia): da chiarire se va citato.
- **Dominio:** canonical, Open Graph, `sitemap.xml` e `robots.txt` puntano a `https://150barberclub.it/`, che è un segnaposto.
  Va sostituito con il dominio reale.
- **Recensioni:** le citazioni sono brevi estratti di recensioni pubbliche su Treatwell; numero e media (5.0 su 99) sono quelli
  rilevati a ottobre 2026 e vanno aggiornati ogni tanto.
- **Facebook:** il profilo esiste ma l'indirizzo non era reperibile. Si può aggiungere nel footer e in `sameAs` del JSON-LD.
- **Mappa:** Google Maps si carica solo al clic, così non ci sono cookie di terze parti prima del consenso.
- **Privacy:** se si aggiungono statistiche o altri servizi esterni servono privacy policy e banner cookie.
  I font sono caricati da Google Fonts: per non contattare server esterni si possono ospitare in locale.
