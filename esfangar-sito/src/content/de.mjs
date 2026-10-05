export default {
  lang: 'de', locale: 'de_DE', langName: 'Deutsch',

  ui: {
    skip: 'Zum Inhalt springen',
    menu: 'Menü', close: 'Schließen',
    nav: { estate: 'Das Gut', wines: 'Weine', winery: 'Die Bodega', experiences: 'Weinproben', stays: 'Unterkünfte', equestrian: 'Reiten', events: 'Events', contact: 'Kontakt' },
    enquire: 'Anfragen', shopNow: 'Jetzt kaufen', nextPage: 'Weiter', rangeTo: 'bis',
    language: 'Sprache',
    cart: 'Warenkorb', openCart: 'Warenkorb öffnen', cartTitle: 'Ihr Warenkorb', cartEmpty: 'Ihr Warenkorb ist leer.',
    subtotal: 'Zwischensumme', shipping: 'Versand', free: 'Kostenlos', total: 'Gesamt',
    freeLeft: n => `Noch ${n} bis zum kostenlosen Versand innerhalb der EU.`,
    freeReached: 'Kostenloser Versand innerhalb der EU.',
    checkout: 'Sicher bezahlen',
    checkoutNote: 'Prototyp: Auf der fertigen Website öffnet sich hier der sichere Shopify-Checkout.',
    remove: 'Entfernen', qty: 'Menge', increase: 'Menge erhöhen', decrease: 'Menge verringern',
    addToCart: 'In den Warenkorb', added: 'Zum Warenkorb hinzugefügt',
    vintage: 'Jahrgang', option: 'Auswählen', viewWine: 'Zum Wein', allWines: 'Alle Weine',
    pause: 'Video anhalten', play: 'Video abspielen',
    home: 'Startseite',
    opensNew: '(öffnet in neuem Tab)',
    taxNote: 'Inkl. MwSt. Versandkosten werden an der Kasse berechnet.',
    footer: {
      tagline: 'Ein privates Biogut im Südosten Mallorcas, erstmals im 14. Jahrhundert urkundlich erwähnt.',
      visit: 'Besuch', explore: 'Entdecken', follow: 'Folgen',
      organic: 'Zertifizierte biologische und vegane Weine · DO Pla i Llevant',
      legal: 'Impressum', privacy: 'Datenschutz', cookies: 'Cookies',
      rights: 'Alle Rechte vorbehalten.',
    },
    prototype: 'Prototyp — Inhalte zur Prüfung',
    cursor: { view: "Ansehen", discover: "Entdecken", drag: "Ziehen" },
    marquee: ["Biologisch", "Vegan", "DO Pla i Llevant", "Felanitx", "Mallorca", "Seit dem 14. Jahrhundert"],
  },

  meta: {
    home: { title: 'Es Fangar · Bioweingut und Finca auf Mallorca', description: 'Tausend Hektar biologisches Mallorca: preisgekrönte vegane Weine, Weinproben, private Häuser und Reitanlagen auf olympischem Niveau bei Felanitx.' },
    estate: { title: 'Das Gut · Es Fangar, Mallorca', description: 'Von der Römerzeit bis zu tausend Hektar Biolandwirtschaft: Geschichte, Landschaft und Naturschutzgebiet von Es Fangar im Südosten Mallorcas.' },
    wines: { title: 'Bioweine aus Mallorca · Shop · Es Fangar Vins', description: 'Zertifizierte biologische und vegane Weine von unserem Gut in Felanitx. Weißweine, Rosé, Rotweine und ein halbsüßer Weißwein. Lieferung in die ganze EU.' },
    winery: { title: 'Die Bodega und die Schwerkraftmethode · Es Fangar Vins', description: 'Unsere 2016 eröffnete Schwerkraftkellerei in Felanitx verarbeitet auf 7.300 m² jede Traube ohne Pumpen. Erfahren Sie, wie unsere Weine entstehen.' },
    experiences: { title: 'Weinproben und Kellerführungen auf Mallorca · Es Fangar', description: 'Geführte Kellerführungen, Weinproben und das Leseerlebnis bei Es Fangar Vins in Felanitx. Online buchen.' },
    stays: { title: 'Private Häuser auf einer mallorquinischen Finca · Es Fangar', description: 'Drei private Häuser mit eigenem Pool auf einem tausend Hektar großen Biogut, dazu das Haupthaus und die gesamte Finca für Aufenthalte ab 30 Nächten.' },
    equestrian: { title: 'Reitanlagen auf Mallorca · Es Fangar', description: 'Mieten Sie die gesamte Reitanlage von Es Fangar: Reithalle nach olympischen Maßstäben, Dressurplatz, Stallungen für rund 200 Pferde und eine Bahn von 380 Metern. Für Turniere auf höchstem Niveau.' },
    events: { title: 'Hochzeiten und Events · Es Fangar', description: 'Private Feiern, Hochzeiten und Firmenveranstaltungen in den Gärten, Innenhöfen, der Kapelle und der Kellerei von Es Fangar, Mallorca.' },
    contact: { title: 'Kontakt und Anfragen · Es Fangar', description: 'Planen Sie einen längeren Aufenthalt, ein Event, die Miete der Reitanlage oder eine Fachhandelsbestellung. Schreiben Sie uns, wir antworten persönlich.' },
    legal: { title: 'Impressum · Es Fangar', description: 'Impressum und Unternehmensangaben der FINCA ES FANGAR, SAU.' },
    privacy: { title: 'Datenschutzerklärung · Es Fangar', description: 'Wie Es Fangar personenbezogene Daten erhebt und schützt.' },
    cookies: { title: 'Cookierichtlinie · Es Fangar', description: 'Welche Cookies diese Website verwendet und warum.' },
    notFound: { title: 'Seite nicht gefunden · Es Fangar', description: 'Die gesuchte Seite existiert nicht.' },
  },

  home: {
    eyebrow: 'Felanitx · Mallorca · Seit dem 14. Jahrhundert',
    title: 'Tausend Hektar <em>biologisches</em> Mallorca',
    lead: 'Weinberge, Pinienwald und ein geschütztes Naturreservat im Südosten der Insel. Wir keltern zertifizierte biologische und vegane Weine und öffnen die Finca für wenige Gäste zugleich.',
    ctaWines: 'Die Weine entdecken', ctaStay: 'Auf der Finca wohnen',
    videoLabel: 'Luftaufnahme des Haupthauses und der Gärten in der Abenddämmerung',
    stats: [
      { n: '1.000', l: 'Hektar Gutsfläche' },
      { n: '56', l: 'Hektar Bioweinberge' },
      { n: '400+', l: 'Hektar Naturreservat' },
      { n: '2016', l: 'Eröffnung der Kellerei' },
    ],
    introTitle: 'Ein Gut, eine Haltung',
    intro: 'Es Fangar ist eine historische Possessió zwischen Felanitx und Manacor, erstmals im 14. Jahrhundert erwähnt. Heute wird das gesamte Gut biologisch bewirtschaftet: Reben, Olivenbäume und Johannisbrotbäume, Feigen, Mandeln und Bienen teilen sich das Land mit wildem Pinienwald.',
    pillarsTitle: 'Es Fangar entdecken',
    pillars: [
      { k: 'wines', t: 'Die Weine', d: 'Bio, vegan und zutiefst mediterran, aus den autochthonen Sorten Callet, Manto Negro und Prensal Blanc bis zu Chardonnay und Syrah.' },
      { k: 'experiences', t: 'Proben & Führungen', d: 'Entdecken Sie eine der modernsten Kellereien Spaniens und verkosten Sie die Weine dort, wo sie entstehen.' },
      { k: 'stays', t: 'Unterkünfte', d: 'Drei private Häuser mit eigenem Pool, dazu das Haupthaus für längere Aufenthalte.' },
      { k: 'equestrian', t: 'Reiten', d: 'Reitplätze auf olympischem Niveau, Stallungen und eine Bahn von 380 Metern: Die gesamte Anlage kann für Turniere und Training gemietet werden.' },
    ],
    winesTitle: 'Aus unserem Keller',
    winesLead: 'Jede Flasche ist zertifiziert biologisch und vegan: Wir schönen nie mit Gelatine oder Eiweiß.',
    bodegaEyebrow: 'Es Fangar Vins · Felanitx',
    bodegaTitle: 'Eine Kellerei, gebaut für die Schwerkraft',
    bodegaText: '2016 nach neun Jahren der Erprobung eröffnet, bewegt unsere Bodega Trauben und Wein ohne Pumpen, sanft, von Ebene zu Ebene. Siebentausenddreihundert Quadratmeter Architektur mit einem einzigen Ziel: Respekt vor der Frucht.',
    bodegaCta: 'Einblick in die Bodega',
    staysTitle: 'Wohnen auf einem lebendigen Gut',
    staysLead: 'Jedes Haus liegt für sich, mit eigener Terrasse und eigenem Pool. Die Strände von Porto Colom sind acht Minuten entfernt.',
    staysCta: 'Die Häuser ansehen',
    landTitle: 'Gewachsen auf dem Gut',
    landLead: 'Neben den Reben bringt die Finca hervor, was Mallorca seit jeher hervorbringt. Fragen Sie bei Ihrem Besuch danach.',
    land: [
      { t: 'Olivenöl', d: 'Aus jahrhundertealten, biologisch bewirtschafteten Olivenhainen.' },
      { t: 'Honig', d: 'Aus unseren eigenen Bienenstöcken zwischen Pinien, Rosmarin und wilden Kräutern.' },
      { t: 'Feigen', d: 'Traditionelle mallorquinische Sorten, geerntet im Spätsommer.' },
      { t: 'Mandeln', d: 'Von den Mandelbäumen, die jedes Jahr im Februar auf dem ganzen Gut blühen.' },
    ],
    visitTitle: 'Anfahrt',
    visitText: 'An der Straße zwischen Felanitx und Son Macià. Der Flughafen Palma ist etwa 45 Autominuten entfernt.',
    visitCta: 'Kontakt aufnehmen',
  },

  estate: {
    eyebrow: 'Das Gut',
    title: 'Neun Jahrhunderte auf einem Stück Land',
    lead: 'Mallorcas größte private Finca, vollständig nach biologischen Grundsätzen bewirtschaftet, und eine der außergewöhnlichsten Landschaften im Südosten der Insel.',
    historyTitle: 'Eine kurze Geschichte',
    timeline: [
      { y: 'Antike', t: 'Nachforschungen der Eigentümer führen die Geschichte des Guts bis in die Römerzeit zurück.' },
      { y: '14. Jh.', t: 'Erste schriftliche Erwähnung: Getreide und Wein des Guts versorgten die örtliche Gemeinschaft.' },
      { y: '19. Jh.', t: 'Die Reblaus vernichtet fast alle Weinberge der Insel; nur die Reste einer alten Kellerei bleiben erhalten.' },
      { y: '2004', t: 'Die ersten Reben werden auf den Hügeln des Guts neu gepflanzt: autochthone und internationale Sorten Seite an Seite.' },
      { y: '2007', t: 'Eine Versuchskellerei entsteht, um aus jedem Jahrgang zu lernen, bevor für die Zukunft gebaut wird.' },
      { y: '2009', t: 'Die ersten Weine von Es Fangar kommen in den Handel; 2012 folgen die ersten Auszeichnungen.' },
      { y: '2016', t: 'Die neue Schwerkraftbodega in Felanitx öffnet ihre Türen.' },
    ],
    landscapeTitle: 'Wald, Felder und ein geschütztes Reservat',
    landscape: 'Als die heutigen Eigentümer Es Fangar erwarben, fanden sie einen einzigartigen Ort: ein geschütztes Naturreservat von über 400 Hektar, weite Felder und wilde Wälder aus Pinien, Olivenbäumen und Johannisbrotbäumen. Das Gut erstreckt sich über rund 1.000 Hektar in den Gemeinden Manacor und Felanitx.',
    organicTitle: 'Bio aus Überzeugung',
    organic: 'Nachhaltige, biologische Landwirtschaft hat für uns oberste Priorität, auf dem gesamten Gut. Reben, Olivenhaine, Mandelbäume, Feigenbäume und unsere Bienenvölker werden ohne synthetische Chemie gepflegt, in einer Landschaft, die wir der nächsten Generation in besserem Zustand übergeben möchten, als wir sie vorgefunden haben.',
    selfTitle: 'Auf Selbstversorgung ausgelegt',
    self: [
      { n: '100 kW', l: 'Photovoltaikanlage' },
      { n: '9', l: 'genehmigte Brunnen mit Wasseraufbereitung' },
      { n: '56 ha', l: 'Weinberge, Tendenz steigend' },
    ],
    gardensTitle: 'Die Gärten des Haupthauses',
    gardens: 'Rund um das Haupthaus führen formale Gärten, Palmenalleen und stille Innenhöfe hinab zu einem beheizten Pool mit Mosaik von Bisazza: das Herz der Finca in der Abenddämmerung.',
    ctaTitle: 'Besuchen Sie uns',
    ctaText: 'Verkosten Sie die Weine in der Bodega oder wohnen Sie in einem unserer Häuser.',
  },

  wines: {
    eyebrow: 'Es Fangar Vins · Shop',
    title: 'Bioweine aus dem Herzen Mallorcas',
    lead: 'Zertifiziert biologisch, vegan und vegetarisch. Vom frischen Muskateller bis zum Gran Reserva mit 32 Monaten im Barrique.',
    filterLabel: 'Weine filtern',
    filters: { all: 'Alle', white: 'Weiß', rose: 'Rosé', red: 'Rot', sweet: 'Halbsüß', offers: 'Angebote' },
    count: n => `${n} ${n === 1 ? 'Wein' : 'Weine'}`,
    offerEyebrow: 'Angebot', offerTitle: 'TwentyTwelve · 12 Flaschen für 90 €',
    offerText: 'Zwölf Flaschen TwentyTwelve Pink oder White zum halben Preis: für den Sommer, für Freunde, für den Keller. Solange der Vorrat reicht.',
    offerSave: '90 € sparen',
    shipTitle: 'Lieferung',
    ship: [
      'Lieferung in die gesamte Europäische Union',
      'Pauschal 14,90 € · kostenlos ab 89 €',
      'Spanien 2 bis 3 Tage · EU 3 bis 7 Tage',
      'Auch in unserer Bodega in Felanitx erhältlich',
    ],
    tradeTitle: 'Gastronomie, Weinhandel und Importeure',
    tradeText: 'Für Händlerpreise, größere Bestellungen und Großformate senden Sie uns eine Fachhandelsanfrage.',
    tradeCta: 'Fachhandelsanfrage',
  },

  wine: {
    notes: 'Verkostungsnotiz', color: 'Farbe', nose: 'Nase', palate: 'Gaumen',
    details: 'Steckbrief', varieties: 'Rebsorten', type: 'Stil', abv: 'Alkohol', temp: 'Trinktemperatur', pairing: 'Speiseempfehlung', sugar: 'Restzucker',
    more: 'Weitere Weine',
    seoCat: { white: "Bioweißwein aus Mallorca", rose: "Biorosé aus Mallorca", red: "Biorotwein aus Mallorca", sweet: "Halbsüßer Biowein aus Mallorca" },
    seoTail: "Zertifiziert bio & vegan aus Felanitx. Lieferung in die ganze EU.",
    vintage: "Jahrgang",
    cats: { white: 'Weißwein', rose: 'Rosé', red: 'Rotwein', sweet: 'Halbsüßer Weißwein' },
    organic: 'Zertifiziert biologisch · Vegan',
  },

  wineText: {
    'twentytwelve-white': { type: 'Junger, trockener Muskateller', short: 'Blumig, frische Aprikose, ein Hauch Orangenmarmelade.',
      desc: 'Aus unserem Muskateller-Weinberg, der die Brisen der Küste einfängt – daher seine bemerkenswerte Frische. Ein trockener Muskateller, zutiefst mediterran und voller Feinheit im Detail.',
      color: 'Zartes Blassgelb mit grünlichen Reflexen.', nose: 'Blumige Noten mit frischer Aprikose und einem Hauch Orangenmarmelade.', palate: 'Elegantes Volumen im Einklang mit natürlicher Säure und feiner Mineralität; lebendig und vielseitig.', pairing: 'Mallorquinisches Tumbet, Meeresfrüchte-Paella' },
    'twentytwelve-pink': { type: 'Rosé', short: 'Erdbeere, Himbeere, Granatapfel und Kräuter.',
      desc: 'Ein intensiver, ausdrucksstarker Rosé mit Struktur. Frische rote Früchte und mediterrane Kräuter verbinden ihn mit der Landschaft um den Weinberg; die lebendige Säure macht ihn zum idealen Essensbegleiter.',
      color: 'Ansprechendes, intensives Rosa.', nose: 'Frische Erdbeeren und Himbeeren, Anklänge von Wassermelone, Granatapfel und mediterranen Kräutern.', palate: 'Lebendige Säure und strukturiertes Mundgefühl; intensiv und elegant.', pairing: 'Frito mallorquín, Hähnchen nach provenzalischer Art' },
    'sa-sivina': { type: 'Weißwein aus autochthonen Sorten', short: 'Wilde Kräuter, Pfirsich, Aprikose; markante Mineralität.',
      desc: 'Unser klares Bekenntnis zu den autochthonen Rebsorten der Insel. Frisch und ausdrucksstark, zutiefst mediterran, mit Kraft und Komplexität dank seiner markanten Mineralität.',
      color: 'Blassgelb mit goldenen Reflexen.', nose: 'Wilde mediterrane Kräuter und Sommerfrüchte – Pfirsich, Aprikose, Melone – mit feiner Würze im Abgang.', palate: 'Mineralisch und harmonisch, mit guter Säure, angenehmem Volumen und lebendigem Finale.', pairing: 'Mallorquinische Suppen, gegrillter Lachs mit Senf-Honig-Sauce' },
    'sa-fita': { type: 'Weißwein, kurz im Holz', short: 'Gelber Pfirsich, Ananas, Grapefruit; Mandel.',
      desc: 'Eine Reise durch dichten Wald mit der Brise des Meeres. Die ideale Cuvée unserer weißen Rebsorten – zart, lebendig und unverwechselbar mallorquinisch.',
      color: 'Blassgelb mit grünlichen Nuancen und großer Brillanz.', nose: 'Gelber Pfirsich und Ananas mit Zitrusnoten von Grapefruit.', palate: 'Frisch und lebendig, mit süßer Würze und Mandel aus dem kurzen Holzausbau; lebhaft und speisefreundlich.', pairing: 'Sopa de peix, Steinpilzrisotto' },
    'lo-cortinello': { type: 'Im Barrique ausgebauter Weißwein', short: 'Aprikose, Nüsse, süße Gewürze, honigartiger Abgang.',
      desc: 'Strahlend und golden, öffnet er sich mit der für Viognier typischen Aprikose, bevor Nüsse, süße Gewürze und ein Hauch Honig erscheinen. Guter Körper, lebendige Säure und ein langer, ausgewogener Abgang.',
      color: 'Leuchtendes Gelb mit goldenen Reflexen.', nose: 'Aprikose, dann Nüsse, süße Gewürze und eine zarte Honignote.', palate: 'Guter Körper, lebendige Säure und große Komplexität, die sich im Glas entfaltet; lang und ausgewogen.', pairing: 'Arròs brut, Filet Wellington' },
    'genesis-semi-dolc': { type: 'Halbsüßer Weißwein', short: 'Aprikose, Ananas, Jasmin; frisch und seidig.',
      desc: 'Ein halbsüßer Weißwein von großer Finesse: intensive frische Frucht und weiße Blüten, eine umhüllende Textur und eine Frische, die zum nächsten Schluck einlädt.',
      color: 'Hellgelb mit kupfernen Tönen.', nose: 'Aprikose, Ananas, Pfirsich, ein Hauch Banane und Jasmin.', palate: 'Sehr ausgewogen, frisch und zugleich umhüllend, mit mittlerem Abgang.', pairing: 'Desserts, Käse, helles Fleisch' },
    'son-p': { type: 'Rotwein, kurz gereift', short: 'Kirsche, Erdbeere, schwarzer Pfeffer, balsamisch.',
      desc: 'Die autochthonen Sorten Manto Negro und Callet prägen diesen Wein. Ein kurzer Ausbau verleiht feine Komplexität; Frucht, Würze und balsamische Noten erzählen von Mallorca. Frisch, weich und mit moderatem Alkohol.',
      color: 'Granatrot, mittlere Farbtiefe.', nose: 'Frische Kirsche und Erdbeerkonfitüre, schwarzer Pfeffer und zarte balsamische Noten.', palate: 'Frisch, ausgewogen und weich, mit guter Säure – ein Wein, den man Schluck für Schluck entdeckt.', pairing: 'Geschmorte Lammschulter mit Kräutern, Gemüselasagne' },
    'fangar-elements': { type: 'Rotwein Reserva · 24 Monate im Barrique', short: 'Rote und schwarze Waldfrüchte; seidig und lang.',
      desc: 'Alle roten Rebsorten des Guts, autochthon und gut angepasst, vereint in einem langen Barriqueausbau. Das mediterrane Klima und die Landschaft um uns – in einem eleganten Wein.',
      color: 'Leuchtendes Kirschrot mit ziegelfarbenen Reflexen.', nose: 'Großer Fruchtausdruck: rote und schwarze Waldfrüchte.', palate: 'Reife, seidige Tannine; Frucht und Holz im Gleichgewicht; elegant, rund und lang.', pairing: 'Rind mit Sobrassada, Wildragout' },
    'n-amarat': { type: 'Rotwein Gran Reserva · 32 Monate im Barrique', short: 'Früchtekompott, Gewürze, Kakao, Leder, Trüffel.',
      desc: 'Unser Bekenntnis zur Eleganz. Lehmig-tonige Böden und biologischer Anbau schenken reife, runde und feste Tannine; der lange Barriqueausbau schafft große Komplexität in Aroma und Textur.',
      color: 'Ziegelrot mit Terrakotta-Reflexen; strahlend.', nose: 'Früchtekompott, Himbeeren in Likör, Gewürze, mediterrane Kräuter, Lakritz, Kakao, edles Leder und ein Hauch weißer Trüffel.', palate: 'Intensiv, strukturiert und gereift, mit angenehmer Adstringenz.', pairing: 'Gebratenes Spanferkel, Schokoladen-Coulant' },
  },

  winery: {
    eyebrow: 'Es Fangar Vins',
    title: 'Die Bodega',
    lead: 'Eine der modernsten Kellereien Spaniens, in der jahrhundertealte Weinbautradition auf präzise, schonende Technik trifft.',
    storyTitle: 'Zwölf Jahre Geduld',
    story: 'Nach hervorragenden Ergebnissen einer ersten Versuchskellerei von 2007 wurde die neue Bodega von Es Fangar Vins im April 2016 nach dreijähriger Bauzeit eingeweiht. Planung und Kapazität folgten einem Anspruch: Tradition und Moderne ohne Kompromisse zu verbinden. Heute kommen Besucher aus aller Welt, wegen der Weine und wegen der Architektur.',
    gravityTitle: 'Métode Gravetat',
    gravityLead: 'Die Schwerkraftmethode beruht auf einem einfachen Prinzip: Die Schwerkraft übernimmt die Arbeit. Im gesamten Prozess verzichten wir darauf, Trauben und Wein zu pumpen, und bewahren so ihre Unversehrtheit.',
    steps: [
      { t: 'Handlese und Auslese', d: 'Die Trauben aus dem Weinberg werden sorgfältig von Hand sortiert, bevor sie gepresst oder in große Behälter gefüllt werden.' },
      { t: 'Über Kopf transportiert', d: 'Ein eigens für unseren Keller konstruierter Kran hebt die Behälter an und bringt sie über Deckenschienen zu den Edelstahltanks, wo die Gärung beginnt.' },
      { t: 'Sanft aus Prinzip', d: 'Die schonende Behandlung der Trauben verhindert vorzeitige Oxidation: der Schlüssel zu aromatischen Weinen, die ihren natürlichen Charakter bewahren.' },
    ],
    roomTitle: 'Die Produktionshalle',
    room: 'Weitläufig und auf mehreren Ebenen angelegt, erlaubt uns die Produktionshalle, jede Rebsorte in einem eigenen Bereich zu verarbeiten, ohne Vermischung. Sauberkeit und die Qualität der Ausstattung sind für jeden Jahrgang entscheidend.',
    factsTitle: 'In Zahlen',
    facts: [
      { n: '7.300 m²', l: 'auf vier Ebenen' },
      { n: '≈190', l: 'Fässer von 225 bis 500 Litern' },
      { n: '6.000 L', l: 'große Holzfässer (Foudres)' },
      { n: '56 ha', l: 'Bioweinberge' },
    ],
    machinery: 'Pressung und Verarbeitung erfolgen mit Anlagen von Bucher Vaslin, ausgewählt für die sorgfältige, präzise Behandlung, die die Frucht unversehrt lässt.',
    varietiesTitle: 'Was wir anbauen',
    varieties: 'Warme Sonne und salzige Meeresbrisen prägen den Charakter unserer Trauben. Die wichtigsten Sorten sind Chardonnay, Prensal Blanc, Cabernet Sauvignon und Callet, daneben Giró Ros, Manto Negro, Muskateller, Viognier, Syrah und Merlot.',
    philosophyTitle: 'Bio, vegan, vegetarisch',
    philosophy: 'Alle unsere Weine sind zertifiziert biologisch, vegan und vegetarisch. Wir schönen nie mit tierischer Gelatine oder Eiweiß. Das ist wichtig für Menschen mit Allergien und für uns eine Frage des Prinzips.',
    cta: 'Weinprobe in der Bodega buchen',
  },

  experiences: {
    eyebrow: 'Besuch in der Bodega',
    title: 'Weinproben, Führungen und Weinlese',
    lead: 'Jeder Besuch beginnt mit der Geschichte unserer Weine und einem Rundgang durch die Kellerei, dann schenken wir ein.',
    items: [
      { t: 'Kellerführung mit Weinprobe', d: 'Geführter Rundgang durch die Schwerkraftkellerei (Produktionshalle, Fasskeller und Verkostungsraum) mit anschließender Probe unserer Weine. Verschiedene Formate verfügbar.', img: 'winery-tasting-room' },
      { t: 'Weinlese auf Es Fangar', d: 'Zur Lesezeit Trauben in unseren Bioweinbergen ernten, die Weine verkosten und gemeinsam auf der Finca essen. Jede Saison mit mehreren Optionen und Preisstufen.', img: 'vines-closeup' },
      { t: 'Private Besuche & Gruppen', d: 'Individuelle Weinproben für private Gruppen und Unternehmen, in der Vinothek oder im Fasskeller.', img: 'winery-barrels' },
    ],
    bookTitle: 'Verfügbarkeit prüfen und buchen',
    bookText: 'Wählen Sie ein Datum, um die aktuelle Verfügbarkeit zu sehen und Ihren Besuch mit wenigen Klicks zu buchen.',
    bookFact1: 'Führung durch unsere Schwerkraftkellerei', bookFact2: 'Verkostung unserer biologischen und veganen Weine', bookFact3: '45 Minuten von Palma, nur mit Reservierung',
    bookButton: 'Verfügbarkeit anzeigen',
    bookConsent: 'Der Buchungskalender wird von Bókun (bokun.io) bereitgestellt, das eigene Cookies setzen kann. Siehe unsere Cookierichtlinie.',
    bookDemo: 'Hinweis zum Prototyp: Dies ist das echte Buchungssystem – bitte während der Präsentation keine Buchung abschließen.',
    loading: 'Buchungskalender wird geladen…',
    groupTitle: 'Eine private Gruppe oder ein Unternehmen?',
    groupText: 'Schreiben Sie uns, wir gestalten den Besuch gemeinsam mit Ihnen.',
    groupCta: 'Anfrage senden',
    practicalTitle: 'Gut zu wissen',
    practical: [
      'Besuche nur mit Reservierung.',
      'Die Bodega liegt am Camino Son Prohens in Felanitx, etwa 45 Minuten von Palma.',
      'Bitte planen Sie einen Fahrer ein: Weinprobe und Autofahren passen nicht zusammen.',
    ],
  },

  stays: {
    eyebrow: 'Unterkünfte',
    title: 'Wohnen auf der Finca',
    lead: 'Private Häuser auf Mallorcas größtem biologisch bewirtschafteten Gut. Weinberge, Pinienwald und tausend Hektar Stille.',
    bedrooms: n => `${n} Schlafzimmer`, guests: n => `${n} Gäste`,
    bookOn: 'Buchen auf', licence: 'Touristische Lizenz', licencePending: 'Nummer folgt',
    houses: {
      'arabic-house': { tagline: 'Maurische Details, zeitgemäßer Komfort',
        desc: 'Ein Haus auf zwei Ebenen mit Kaminen, voll ausgestatteter Küche und privatem Kino. Draußen: Terrassen und zwei Dachterrassen, Sommerküche und Grill, ein Pool mit Pavillon und ein eigener Massageraum.',
        features: ['Privater Pool', 'Privates Kino', 'Zwei Dachterrassen', 'Massageraum', 'Sommerküche & Grill'] },
      'mallorcan-house': { tagline: 'Traditioneller Charakter, modernes Wohnen',
        desc: 'Hell und warm, mit gemütlichem Wohnzimmer und Steinkamin, der sich zu einem großzügigen Essbereich öffnet. Mehrere Terrassen für Schatten, Mahlzeiten und Sonne, rund um einen privaten Pool im mediterranen Rasengarten.',
        features: ['Privater Pool', 'Steinkamin', 'Mehrere Terrassen', 'Voll ausgestattete Küche', 'Waschmaschine & Trockner'] },
      'the-lodge': { tagline: 'Der ruhigste Ort der Finca',
        desc: 'Weit abseits der anderen Häuser, umgeben von Pinien und Macchia. Zwei Schlafzimmer und eine helle offene Wohnküche blicken in die Bäume; ein kleiner Pool liegt auf einer Terrasse am Waldrand.',
        features: ['Privater Pool', 'Lage im Wald', 'Völlige Privatsphäre', 'Offene Wohnküche', 'Waschmaschine & Trockner'] },
    },
    longTitle: 'Das Haupthaus und die gesamte Finca',
    longEyebrow: 'Aufenthalte ab 30 Nächten',
    long: 'Für längere Aufenthalte kann das Haupthaus, oder das gesamte Gut, privat reserviert werden. Über 4.000 m² rund um einen Innenhof voller Palmen, mit einer restaurierten Kapelle, in der noch private Zeremonien stattfinden, einem beheizten Pool von 324 m² mit Mosaik von Bisazza, einem Spa mit Innenpool und Sauna, Tennisplatz, privatem Kino und gestalteten Gärten.',
    longFacts: ['Mindestaufenthalt 30 Nächte', 'Haupthaus oder gesamtes Gut', 'Preise auf Anfrage'],
    longCta: 'Längeren Aufenthalt anfragen',
    aroundTitle: 'Rund um die Finca',
    around: [
      { t: 'Porto Colom', d: 'Strände und Hafen sind etwa 8 Minuten entfernt; Cala Marçal und Mondragó erreichen Sie in kurzer Fahrt.' },
      { t: 'Felanitx', d: 'Wenige Autominuten entfernt: ein lebhafter Markt am Sonntagvormittag und gute Restaurants für das Abendessen.' },
      { t: 'Anreise', d: 'Der Flughafen Palma ist etwa 45 Autominuten entfernt. Ein Auto ist unerlässlich.' },
    ],
  },

  equestrian: {
    eyebrow: 'Reiten',
    title: 'Anlagen auf internationalem Turnierniveau',
    lead: 'Eine Reitanlage inmitten von Olivenhainen und Pinien, die komplett für Turniere auf höchstem internationalem Niveau gemietet werden kann.',
    facilitiesTitle: 'Die Anlagen',
    facilities: [
      { t: 'Reithalle', d: 'Nach olympischen Maßstäben gebaut, für das Training bei jedem Wetter.' },
      { t: 'Dressurplatz', d: 'Professionell gepflegt, geeignet für Veranstaltungen auf internationalem Niveau.' },
      { t: 'Rennbahn', d: '380 Meter lang und 3 Meter breit, für Training und Rennen.' },
      { t: 'Führanlage', d: 'Mit regelbarer Geschwindigkeit, für sicheres und effizientes Konditionstraining.' },
      { t: 'Stallungen', d: 'Platz für rund 200 Pferde, mit Sattelkammer und Waschräumen für Decken.' },
      { t: 'Infrastruktur', d: 'Hufschmiede, Büros für Trainer, Wasserspeicher und großzügige Lagerflächen.' },
    ],
    bringTitle: 'Die gesamte Anlage mieten',
    bring: 'Die gesamte Reitanlage kann exklusiv gemietet werden. Sie ist regelmäßig Austragungsort von Turnieren der höchsten Kategorien der Welt und eignet sich ebenso für ein Trainingslager oder eine ganze Saison. Wer die Anlage mietet, bringt seine eigenen Pferde mit.',
    bringCta: 'Miete der Anlage anfragen',
  },

  events: {
    eyebrow: 'Events',
    title: 'Feiern und Begegnungen auf der Finca',
    lead: 'Gärten, Innenhöfe, eine Kapelle und eine Kellerei: Es Fangar bietet Raum für besondere Momente, ganz privat.',
    items: [
      { t: 'Hochzeiten & private Zeremonien', d: 'In der restaurierten Kapelle des Haupthauses finden noch heute private Zeremonien statt; Gärten und Innenhöfe tun ihr Übriges.', img: 'main-house-night-front' },
      { t: 'Firmenveranstaltungen', d: 'Klausuren, Meetings und Incentives mit Weinproben in der Bodega, langen Tafeln unter den Arkaden und tausend Hektar zum Entdecken.', img: 'main-house-arcade' },
      { t: 'Geburtstage und Feiern in der Bodega', d: 'Feiern Sie einen Geburtstag, ein Jubiläum oder ein Familienfest in der Bodega: Führung durch die Kellerei, Verkostung unserer Weine mit regionalen Spezialitäten und der Verkostungsraum oder der Keller ganz für Sie. Nennen Sie uns die Zahl der Gäste, und wir gestalten den Abend gemeinsam mit Ihnen.', img: 'gardens-aerial' },
    ],
    tradeTitle: 'Fachhandel & Großkunden',
    trade: 'Restaurants, Hotels, Weinhandlungen und Importeure: Wir liefern unser gesamtes Sortiment, auch Großformate. Senden Sie uns eine Fachhandelsanfrage, wir melden uns mit Preisen und Verfügbarkeit.',
    tradeCta: 'Fachhandelsanfrage',
    cta: 'Erzählen Sie uns von Ihren Plänen',
    ctaBtn: 'Anfrage senden',
  },

  contact: {
    eyebrow: 'Kontakt',
    title: 'Schreiben Sie uns',
    lead: 'Längere Aufenthalte, Events, die Miete der Reitanlage, Fachhandelsbestellungen oder eine einfache Frage: Erzählen Sie uns, was Sie vorhaben, und wir antworten persönlich.',
    addressTitle: 'Adresse', phoneTitle: 'Telefon', emailTitle: 'Mail',
    mapAlt: 'Karte von Mallorca mit der Lage von Es Fangar im Südosten der Insel, zwischen Felanitx und Manacor',
    openMaps: 'In Google Maps öffnen',
    bookingNote: 'Sie möchten eine Weinprobe oder eines unserer Häuser buchen? Das geht online:',
  },

  form: {
    legend: 'Ihre Anfrage',
    type: 'Worum geht es in Ihrer Anfrage?',
    types: {
      'long-stay': 'Längerer Aufenthalt: Haupthaus oder gesamte Finca (ab 30 Nächten)',
      events: 'Hochzeit, Event oder Feier',
      trade: 'Bestellung für Fachhandel oder in großen Mengen',
      equestrian: 'Miete der Reitanlage',
      general: 'Allgemeine Anfrage',
    },
    name: 'Vorname und Nachname', email: 'Mail', phone: 'Telefon', optional: '(optional)',
    company: 'Unternehmen', from: 'Anreise / Datum', to: 'Abreise', guests: 'Anzahl der Personen', horses: 'Anzahl der Pferde',
    message: 'Nachricht', messageHint: 'Daten, Personenzahl und alles, was wir wissen sollten.',
    consent: 'Ich habe die <a href="{privacy}">Datenschutzerklärung</a> gelesen und bin einverstanden, dass Es Fangar meine Angaben zur Beantwortung dieser Anfrage verwendet.',
    required: 'Pflichtfeld',
    submit: 'Anfrage senden',
    sending: 'Wird gesendet…',
    errors: {
      summary: 'Bitte prüfen Sie die markierten Felder.',
      name: 'Bitte geben Sie Ihren Namen ein.',
      email: 'Bitte geben Sie eine gültige Mailadresse ein, z. B. name@beispiel.de.',
      message: 'Bitte schreiben Sie eine kurze Nachricht (mindestens 10 Zeichen).',
      consent: 'Bitte akzeptieren Sie die Datenschutzerklärung, um Ihre Anfrage zu senden.',
      dates: 'Das Abreisedatum muss nach dem Anreisedatum liegen.',
    },
    successTitle: 'Vielen Dank, Ihre Anfrage ist unterwegs.',
    successText: 'In der Regel antworten wir innerhalb eines Werktags.',
    demo: 'Prototyp: Es wurde nichts gesendet. Auf der fertigen Website geht diese Anfrage an management@es-fangar.com.',
  },

  legal: {
    title: 'Impressum',
    draft: 'Entwurf zur Prüfung durch die Rechtsberatung des Unternehmens.',
    body: `
<h2>Betreiber der Website</h2>
<p>Gemäß Artikel 10 des spanischen Gesetzes 34/2002 über Dienste der Informationsgesellschaft und den elektronischen Geschäftsverkehr (LSSI-CE) teilen wir folgende Angaben mit:</p>
<ul>
<li>Firma: FINCA ES FANGAR, SAU</li>
<li>Handelsname: Finca Es Fangar</li>
<li>Anschrift: Camino Son Prohens, s/n · 07209 Son Prohens (Felanitx) · Illes Balears · Spanien</li>
<li>Steuernummer (NIF): A08269060</li>
<li>Eingetragen im Handelsregister von Mallorca: Blatt PM-51324, Band 2146, Folio 122</li>
<li>Telefon: +34 971 58 19 38 · Mail: info@es-fangar.com</li>
</ul>
<h2>Zweck</h2>
<p>Diese Website stellt das Gut, seine Weine, Erlebnisse und Unterkünfte vor und ermöglicht den Kauf von Wein sowie die Buchung von Besuchen. Wer die Website aufruft, wird Nutzer und akzeptiert diese Bedingungen.</p>
<h2>Haftung</h2>
<p>Der Betreiber haftet nicht für von Dritten veränderte oder eingestellte Informationen und nicht für Inhalte verlinkter Websites Dritter (etwa Buchungsplattformen). Sollten Sie rechtswidrige Inhalte bemerken, teilen Sie uns dies bitte mit, damit sie entfernt werden können.</p>
<h2>Geistiges und gewerbliches Eigentum</h2>
<p>Gestaltung, Logos, Texte, Fotografien und sonstige Inhalte dieser Website gehören der FINCA ES FANGAR, SAU oder werden mit Genehmigung verwendet. Vervielfältigung, Verbreitung oder Bearbeitung ohne vorherige schriftliche Zustimmung sind untersagt.</p>
<h2>Verkauf alkoholischer Getränke</h2>
<p>Der Verkauf alkoholischer Getränke erfolgt nur an Personen ab 18 Jahren.</p>
<h2>Anwendbares Recht und Gerichtsstand</h2>
<p>Es gilt spanisches Recht. Gerichtsstand sind die Gerichte von Palma, unbeschadet der Rechte, die Verbrauchern nach geltendem Recht zustehen.</p>`,
  },

  privacy: {
    title: 'Datenschutzerklärung',
    draft: 'Entwurf zur Prüfung durch die Rechtsberatung des Unternehmens.',
    body: `
<h2>Verantwortlicher</h2>
<p>FINCA ES FANGAR, SAU (NIF A08269060), Camino Son Prohens, s/n, 07209 Son Prohens (Felanitx), Illes Balears, Spanien. Kontakt: info@es-fangar.com.</p>
<h2>Welche Daten wir verarbeiten und wozu</h2>
<ul>
<li><strong>Anfrageformular:</strong> Name, Mail, optional Telefon, Art der Anfrage, von Ihnen angegebene Daten oder Zahlen und Ihre Nachricht, ausschließlich zur Beantwortung Ihrer Anfrage und, auf Wunsch, zur Erstellung eines Angebots. Rechtsgrundlage: Ihre Einwilligung und vorvertragliche Maßnahmen auf Ihre Anfrage (Art. 6 Abs. 1 lit. a und b DSGVO).</li>
<li><strong>Onlineshop:</strong> Bestellungen werden von Shopify, unserem Anbieter für den Onlinehandel, zur Erfüllung des Kaufvertrags und unserer gesetzlichen Pflichten verarbeitet (Art. 6 Abs. 1 lit. b und c DSGVO). Vollständige Kartendaten sehen oder speichern wir nie.</li>
<li><strong>Buchung von Weinproben und Führungen:</strong> über Bókun, unseren Buchungsanbieter, zur Abwicklung Ihrer Reservierung (Art. 6 Abs. 1 lit. b DSGVO).</li>
<li><strong>Statistik:</strong> Wir messen Besuche mit einem datenschutzfreundlichen Analysetool, das keine Cookies verwendet und keine personenbezogenen Daten speichert.</li>
</ul>
<h2>Speicherdauer</h2>
<p>Anfragen speichern wir, solange es für die Beantwortung nötig ist, und bis zu 12 Monate danach, sofern kein Vertrag zustande kommt. Bestelldaten bewahren wir für die steuerrechtlich und handelsrechtlich vorgeschriebenen Fristen auf.</p>
<h2>Empfänger</h2>
<p>Nur die genannten Dienstleister, die auf Grundlage von Auftragsverarbeitungsverträgen in unserem Auftrag handeln. Wir verkaufen Ihre Daten nicht. Einige Anbieter verarbeiten Daten möglicherweise außerhalb der EU unter den von der DSGVO geforderten Garantien.</p>
<h2>Ihre Rechte</h2>
<p>Sie können jederzeit Auskunft, Berichtigung oder Löschung verlangen, der Verarbeitung widersprechen oder sie einschränken lassen, Datenübertragbarkeit verlangen und Ihre Einwilligung widerrufen, per Mail an info@es-fangar.com. Zudem können Sie sich bei der spanischen Datenschutzbehörde beschweren (www.aepd.es).</p>`,
  },

  cookies: {
    title: 'Cookierichtlinie',
    draft: 'Entwurf zur Prüfung durch die Rechtsberatung des Unternehmens.',
    body: `
<h2>Unser Ansatz</h2>
<p>Diese Website verwendet nur Cookies und lokalen Speicher, die für ihren Betrieb unbedingt erforderlich sind, etwa um den Inhalt Ihres Warenkorbs zu speichern. Dafür ist keine Einwilligung nötig.</p>
<h2>Statistik ohne Cookies</h2>
<p>Wir messen Besuche mit einem datenschutzfreundlichen Analysedienst, der keine Cookies setzt und Sie nicht über andere Websites hinweg verfolgt.</p>
<h2>Dienste Dritter, nur auf Ihren Wunsch</h2>
<p>Der Buchungskalender für Weinproben wird von Bókun bereitgestellt und auf der Seite „Weinproben“ geladen. Bókun kann dabei eigene Cookies gemäß seiner Datenschutzerklärung setzen. Links zu Airbnb und Vrbo führen auf deren Websites, wo deren eigene Cookierichtlinien gelten.</p>
<h2>Cookies verwalten</h2>
<p>Sie können Cookies jederzeit in den Einstellungen Ihres Browsers löschen oder blockieren.</p>`,
  },

  notFound: {
    title: 'Dieser Weg führt ins Leere',
    text: 'Die gesuchte Seite wurde verschoben oder hat nie existiert. Wir bringen Sie zurück auf die Finca.',
    cta: 'Zur Startseite',
  },
};
