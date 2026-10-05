# Checklist di lancio – sito Primatech

Spunta ogni voce prima di puntare il dominio sul nuovo sito. Le voci **obbligatorie** sono indicate con ⚠️.

## 1. Contenuti
- [ ] ⚠️ **Email di destinazione** definitiva in `src/site.config.ts` (`email`) e nella variabile `MAIL_TO` su Cloudflare.
- [ ] **Numero WhatsApp Business** in `src/site.config.ts` (`whatsapp`). Finché è vuoto, il pulsante non compare.
- [ ] ⚠️ **Traduzioni** EN, FR, DE, ES riviste da madrelingua del settore, soprattutto la terminologia tecnica
      (`src/i18n/ui/*.ts` e i file in `src/content/macchine/`).
- [ ] ⚠️ Verificare le affermazioni nei testi: "100+ macchine installate", "esclusiva importazione", "progettate e brevettate in Italia",
      il ruolo di BROZZI snc, il testo del contributo FESR e i loghi (obbligo di pubblicità del finanziamento).
- [ ] Foto mancanti: SBL 820 EF, SBL 1300 SEF, SBL 820 SE, SBL 1300 SE, TS 550 W, TS 800/1000 W, TS 1650 W, e le usate SP 76-E, SP 102-E II, SP 142-E.
- [ ] Dati tecnici e PDF delle schede tecniche (campo `specs` e `datasheet`). Senza, le pagine mostrano "Richiedi la scheda tecnica".
- [ ] ⚠️ Usato: verificare che SP 76-E, SP 102-E II, SP 104-E e SP 142-E siano davvero disponibili e completare marca, anno, formato e stato.
- [ ] Marca dei piega-incolla TS (oggi non indicata).

## 2. Privacy e aspetti legali
- [ ] ⚠️ Informativa privacy e cookie policy (oggi bozze) validate dal consulente privacy. Traduzioni FR/DE/ES
      (oggi queste lingue mostrano il testo inglese). Togliere poi l'avviso "Bozza" in `src/views/Legal.astro`.
- [ ] Nominare come responsabili del trattamento Cloudflare e Resend (o il servizio email scelto).
- [ ] Ragione sociale, sede e P.IVA nel piè di pagina: già presenti, da ricontrollare.

## 3. Account e servizi (gratuiti o quasi)
- [ ] ⚠️ **GitHub:** creare un repository dedicato (es. `primatech-sito`) con il contenuto di questa cartella alla radice.
      Attivare 2FA, protezione del ramo `main` e Dependabot.
- [ ] ⚠️ **Cloudflare Pages:** collegare il repository. Comando di build `npm run build`, cartella `dist`, variabile `NODE_VERSION = 22`.
- [ ] ⚠️ **Cloudflare Turnstile:** creare il widget per `primatech.it`. Inserire la *site key* in `src/site.config.ts` (`turnstileSiteKey`)
      e la *secret key* come variabile cifrata `TURNSTILE_SECRET`.
- [ ] ⚠️ **Invio email (Resend):** verificare il dominio aggiungendo i record SPF/DKIM indicati.
      **Attenzione:** se esiste già un record SPF, va *unito* a quello nuovo, non duplicato.
      Variabili cifrate: `RESEND_API_KEY`, `MAIL_FROM` (es. `Sito Primatech <sito@primatech.it>`), `MAIL_TO`,
      `ALLOWED_ORIGINS` (`https://www.primatech.it,https://primatech.it`).
- [ ] **Pannello usato:** creare una GitHub OAuth App e pubblicare il servizio di accesso
      [sveltia-cms-auth](https://github.com/sveltia/sveltia-cms-auth) su Cloudflare Workers (gratuito).
      Poi impostare `repo` e `base_url` in `public/admin/config.yml`. Aggiungere chi aggiorna l'usato come collaboratore *Write* del repository.
- [ ] **Regola di rate limiting** su Cloudflare (Security → WAF) per `/api/contatto`, ad esempio massimo 5 richieste al minuto per IP.

## 4. Dominio ed email (con la segretaria, che ha le credenziali)
- [ ] ⚠️ Scoprire dove è registrato `primatech.it` e chi gestisce le **email** (record MX).
- [ ] ⚠️ Prima di qualsiasi modifica, esportare o fotografare **tutti** i record DNS attuali (MX, SPF, DKIM, DMARC, eventuali sottodomini).
- [ ] Collegare il dominio personalizzato in Cloudflare Pages:
      - **Opzione A (consigliata):** spostare i DNS su Cloudflare, dopo aver ricopiato **tutti** i record esistenti, MX compresi.
      - **Opzione B:** lasciare i DNS dov'è e aggiungere solo un CNAME `www` verso il progetto Pages.
- [ ] Reindirizzare `primatech.it` → `https://www.primatech.it` (redirect 301).
- [ ] ⚠️ Dopo il cambio, verificare subito che le email in entrata e in uscita funzionino.

## 5. Verifiche dopo la pubblicazione
- [ ] ⚠️ Inviare una richiesta di prova dal modulo **in ogni lingua** e controllare che arrivi (anche nello spam).
- [ ] Provare il modulo senza JavaScript: deve portare alla pagina "Grazie".
- [ ] [securityheaders.com](https://securityheaders.com): obiettivo A o A+. [SSL Labs](https://www.ssllabs.com/ssltest/): obiettivo A.
- [ ] [PageSpeed Insights](https://pagespeed.web.dev/), mobile e desktop, sulla home e su una scheda macchina: Core Web Vitals in verde.
- [ ] Verifica di accessibilità con [WAVE](https://wave.webaim.org/) e navigazione completa solo da tastiera.
- [ ] Google Search Console: aggiungere la proprietà, inviare `https://www.primatech.it/sitemap.xml` e controllare gli `hreflang`.
      Lo stesso su Bing Webmaster Tools.
- [ ] Controllare la pagina 404 (es. `/pagina-inesistente/`).
- [ ] Dopo qualche settimana senza problemi su tutti i sottodomini, valutare HSTS con `includeSubDomains` in `public/_headers`.

## 6. Facoltativo
- [ ] Comprimere il video della home (oggi 4,3 MB) in MP4 da circa 1,5 MB e in WebM, per un caricamento ancora più rapido su desktop.
- [ ] Statistiche senza cookie (Cloudflare Web Analytics o Plausible), se in futuro serviranno dati sulle visite.
