import type { UI } from './it';

const de: UI = {
  meta: {
    home: {
      title: 'Neue und gebrauchte Maschinen für die Kartonagenindustrie | Primatech',
      description:
        'Stanzautomaten, Heißfolienprägemaschinen, Faltschachtel-Klebemaschinen, Kaschier- und Flexodruckmaschinen, neu und gebraucht. Über 60 Jahre Erfahrung.',
    },
    machines: {
      title: 'Katalog neuer Maschinen für die Kartonage | Primatech',
      description:
        'Stanzautomaten, Heißfolienprägung, Faltschachtel-Klebemaschinen, Kaschier- und Flexodruckmaschinen: Made in Italy und exklusive Importe.',
    },
    used: {
      title: 'Gebrauchte und überholte Kartonagemaschinen | Primatech',
      description:
        'Gebrauchte Stanzautomaten und Kartonagemaschinen, in unserer Werkstatt überholt. Wir kaufen und holen auch Ihre Gebrauchtmaschine ab.',
    },
    parts: {
      title: 'Ersatzteile für SBL und Varimatrix | Primatech',
      description:
        'Ersatzteile für SBL- und Varimatrix-Stanzautomaten, Heißfolienprägemaschinen und Faltschachtel-Klebemaschinen. Modell und Seriennummer genügen.',
    },
    services: {
      title: 'Technischer Service, Schulung und Nachrüstung | Primatech',
      description:
        'Wartung, Reparatur, Bedienerschulung und technische Nachrüstungen für Kartonagemaschinen, in Italien und international.',
    },
    company: {
      title: 'Über 60 Jahre Kartonage-Erfahrung | Primatech, Italien',
      description:
        'Primatech entwickelt Maschinen in Italien und importiert Kartonagemaschinen – mit Hunderten Installationen in Europa, Amerika und Asien.',
    },
    contact: {
      title: 'Kontakt und Angebotsanfrage | Primatech',
      description:
        'Fordern Sie ein Angebot, ein Datenblatt, Service oder Ersatzteile an. Primatech srl, Sant’Andrea delle Fratte (Perugia, Italien).',
    },
    thanks: { title: 'Anfrage gesendet | Primatech', description: 'Vielen Dank für Ihre Nachricht.' },
    privacy: { title: 'Datenschutzerklärung | Primatech', description: 'Informationen zur Verarbeitung personenbezogener Daten.' },
    cookies: { title: 'Cookie-Richtlinie | Primatech', description: 'Informationen zur Verwendung von Cookies.' },
    notFound: { title: 'Seite nicht gefunden | Primatech', description: 'Die angeforderte Seite existiert nicht.' },
  },

  nav: {
    machines: 'Maschinen',
    used: 'Gebraucht',
    parts: 'Ersatzteile',
    services: 'Service',
    company: 'Unternehmen',
    contact: 'Kontakt',
    cta: 'Angebot anfordern',
    menu: 'Menü',
    close: 'Menü schließen',
    skip: 'Zum Inhalt springen',
    language: 'Sprache',
    home: 'Startseite',
    main: 'Hauptnavigation',
  },

  common: {
    call: 'Anrufen',
    write: 'Schreiben',
    whatsapp: 'WhatsApp',
    requestInfo: 'Informationen anfordern',
    requestSheet: 'Datenblatt anfordern',
    downloadSheet: 'Datenblatt herunterladen (PDF)',
    discover: 'Entdecken',
    viewAll: 'Gesamten Katalog ansehen',
    madeInItaly: 'Made in Italy',
    imported: 'Import',
    photoSoon: 'Foto folgt',
    models: '{n} Modelle',
    model: '{n} Modell',
    specs: 'Technische Daten',
    features: 'Hauptmerkmale',
    related: 'Weitere Maschinen dieser Kategorie',
    vat: 'USt-IdNr.',
    address: 'Sitz',
    phone: 'Telefon',
    email: 'E-Mail',
    breadcrumb: 'Brotkrumennavigation',
    filter: 'Nach Kategorie filtern',
    all: 'Alle',
    openMaps: 'In Google Maps öffnen',
    newWindow: '(öffnet in einem neuen Fenster)',
    showing: 'Angezeigte Modelle: {n}',
  },

  langBanner: {
    text: 'Diese Website ist auch auf Deutsch verfügbar.',
    go: 'Auf Deutsch wechseln',
    dismiss: 'Nein, danke',
  },

  specs: {
    sheetMax: 'Max. Bogenformat',
    sheetMin: 'Min. Bogenformat',
    printArea: 'Prägefläche',
    pressure: 'Max. Druck',
    speed: 'Max. Geschwindigkeit',
    accuracy: 'Genauigkeit',
    register: 'Register',
    materials: 'Materialien',
    power: 'Installierte Leistung',
  },

  categories: {
    'hot-foil': {
      name: 'Heißfolienprägung',
      long: 'Automatische Heißfolienprägemaschinen',
      singular: 'Automatische Heißfolienprägemaschine',
      intro:
        'Automatische Heißfolienprägemaschinen für die Veredelung von Faltschachteln, Etiketten und hochwertigen Verpackungen – mit präzisem Register und kurzen Rüstzeiten.',
    },
    'die-cutting': {
      name: 'Stanzautomaten',
      long: 'Stanzautomaten mit Ausbrechstation',
      singular: 'Stanzautomat',
      intro:
        'Flachbett-Stanzautomaten für Papier, Faltschachtelkarton, Vollpappe und Wellpappe, mit Ausbrechen und Nutzentrennung.',
    },
    'folder-gluer': {
      name: 'Faltschachtel-Klebemaschinen',
      long: 'Automatische Faltschachtel-Klebemaschinen',
      singular: 'Faltschachtel-Klebemaschine',
      intro:
        'Automatische Faltschachtel-Klebemaschinen für Faltschachteln und Kartons aus Karton und Mikrowelle, in verschiedenen Arbeitsbreiten – vom kompakten bis zum Großformat.',
    },
    laminator: {
      name: 'Kaschiermaschinen',
      long: 'Kaschiermaschinen',
      singular: 'Kaschierautomat',
      intro:
        'Automatische Bogen-auf-Bogen-Kaschierlinien, die bedrucktes Papier mit Well- oder Vollpappe verbinden – mit hoher Leistung und genauem Register.',
    },
    flexo: {
      name: 'Flexodruck',
      long: 'Flexodruckmaschinen',
      singular: 'Flexodruckmaschine',
      intro:
        'Flexodruckmaschinen für Inline-Druck und -Stanzen von Wellpappe, für Faltkisten und Transportverpackungen.',
    },
  },

  fallback: {
    description:
      'Auf Anfrage erhältlich. Konfiguration, Lieferung, Installation und Service übernimmt Primatech direkt: Fordern Sie das vollständige Datenblatt und ein individuelles Angebot an.',
    specsMissing:
      'Das vollständige Datenblatt dieses Modells erhalten Sie auf Anfrage: Schreiben Sie uns, wir senden es Ihnen mit den Konfigurationsoptionen.',
  },

  home: {
    eyebrow: 'Kartonagemaschinen · Perugia, Italien',
    h1: ['Über 60 Jahre', 'Präzision', 'für die Kartonage.'],
    lead: 'Wir entwickeln, bauen und importieren Maschinen zum Stanzen, Heißfolienprägen und Verarbeiten von Karton. Neu, gebraucht und überholt – mit einem Service, der jede Maschine ein Leben lang begleitet.',
    ctaPrimary: 'Maschinen entdecken',
    ctaSecondary: 'Mit einem Techniker sprechen',
    scroll: 'Scrollen',
    stats: [
      { value: 60, suffix: '+', label: 'Jahre Erfahrung' },
      { value: 600, suffix: ' t', label: 'maximaler Druck' },
      { value: 5500, suffix: '', label: 'Bogen pro Stunde' },
      { value: 3, suffix: '', label: 'Kontinente' },
    ],
    madeEyebrow: 'Made in Italy',
    madeTitle: 'In Italien entwickelt und patentiert.',
    madeLead:
      'Primatech-Maschinen entstehen aus unserer Werkstatterfahrung: robust, einfach zu bedienen und wettbewerbsfähig bei Kleinauflagen wie bei großen Volumen.',
    catalogEyebrow: 'Katalog',
    catalogTitle: 'Ein komplettes Programm für die Verarbeitung.',
    catalogLead:
      'Von der Heißfolienprägung bis zur Faltschachtel-Klebemaschine: in Italien gebaute Maschinen und exklusiv von uns importierte Modelle, ausgewählt unter den besten Herstellern.',
    usedCard: 'Gebrauchte und überholte Maschinen',
    usedCardText: 'Abgeholt, überholt und geprüft',
    valuesEyebrow: 'Unser Ansatz',
    values: [
      {
        title: 'Global Attitude',
        text: 'Ein Referenzpunkt für den italienischen Markt und seit Jahrzehnten im internationalen Handel aktiv: Hunderte Maschinen in Europa, Amerika und Asien installiert.',
      },
      {
        title: 'Smart',
        text: 'Unsere F&E-Abteilung wählt Lösungen, die Innovation, Funktionalität und sorgfältige Konstruktion vereinen, und meldet Patente für die in Italien gebauten Maschinen an.',
      },
      {
        title: 'Passion',
        text: 'Über 60 Jahre Leidenschaft für die Kartonage. Qualität steht an erster Stelle – von der Wahl der Komponenten bis zur Wahl der Lieferanten.',
      },
    ],
    servicesEyebrow: 'Service',
    servicesTitle: ['Wir verkaufen nicht nur Maschinen.', 'Wir begleiten sie.'],
    services: [
      {
        title: 'Neu',
        text: 'Maschinen Made in Italy und exklusive Importe, auf Ihre Produktion konfiguriert, mit einem Partnernetz auf allen Kontinenten.',
      },
      {
        title: 'Gebraucht',
        text: 'Wir kaufen, holen ab und überholen Gebrauchtmaschinen, damit sie zuverlässig und konform zurück auf den Markt kommen.',
      },
      {
        title: 'After-Sales',
        text: 'Wartung, Reparatur, Ersatzteile und Schulung – mit technischer Unterstützung durch BROZZI snc, seit über sechs Jahrzehnten in der Branche.',
      },
    ],
    servicesCta: 'Alle Leistungen',
    sellEyebrow: 'Gebrauchtmaschinenhandel',
    sellTitle: ['Sie verkaufen eine Maschine?', 'Wir bewerten sie.'],
    sellText:
      'Nennen Sie uns Modell, Baujahr und Zustand: Wir bewerten, holen ab und überholen. Sie suchen eine geprüfte Gebrauchtmaschine? Fragen Sie nach der aktuellen Verfügbarkeit.',
    sellCta: 'Maschine verkaufen',
    sellCta2: 'Gebrauchtmaschine suchen',
  },

  contactBand: {
    eyebrow: 'Kontakt',
    title: ['Sprechen wir über', 'Ihre Produktion.'],
    text: 'Erzählen Sie uns, was Sie produzieren, in welchen Formaten und Materialien: Wir schlagen Ihnen die passende Lösung vor, neu oder gebraucht.',
    cta: 'Angebot anfordern',
  },

  machinesPage: {
    eyebrow: 'Katalog Neumaschinen',
    title: 'Maschinen für die Kartonage.',
    lead: 'In Italien entwickelte und patentierte Maschinen sowie exklusiv von uns importierte Modelle für jeden Verarbeitungsschritt: Heißfolienprägung, Stanzen, Falten und Kleben, Kaschieren und Flexodruck.',
    usedHint: 'Sie suchen eine Gebrauchtmaschine?',
    usedHintCta: 'Verfügbare Gebrauchtmaschinen ansehen',
    categoriesTitle: 'Kategorien',
  },

  categoryPage: {
    eyebrow: 'Katalog',
    usedIn: 'Verfügbare Gebrauchtmaschinen in dieser Kategorie',
    allMachines: 'Alle Maschinen',
  },

  machinePage: {
    ctaTitle: 'Interesse an dieser Maschine?',
    ctaText:
      'Schreiben oder rufen Sie uns an: Ein Techniker meldet sich mit Verfügbarkeit, Konfiguration und Angebot und organisiert auf Wunsch einen Produktionstest.',
    brand: 'Marke',
    category: 'Kategorie',
    origin: 'Herkunft',
    originIt: 'In Italien entwickelt und gebaut',
    originImport: 'Exklusiver Primatech-Import',
  },

  usedPage: {
    eyebrow: 'Geprüfte Gebrauchtmaschinen',
    title: 'Gebrauchte und überholte Maschinen.',
    lead: 'Wir kaufen, holen ab und überholen gebrauchte Kartonagemaschinen in unserer eigenen Werkstatt, damit sie zuverlässig und konform zurück auf den Markt kommen. Das Angebot ändert sich häufig: Fragen Sie uns, wenn Ihr Modell nicht dabei ist.',
    status: { available: 'Verfügbar', negotiation: 'In Verhandlung', sold: 'Verkauft' },
    condition: {
      overhauled: 'Überholt',
      working: 'Betriebsbereit, in Produktion zu besichtigen',
      'as-is': 'Zu überholen',
    },
    year: 'Baujahr',
    format: 'Format',
    location: 'Standort',
    conditionLabel: 'Zustand',
    statusLabel: 'Verfügbarkeit',
    empty:
      'In dieser Kategorie sind derzeit keine Maschinen veröffentlicht. Kontaktieren Sie uns: Einige Maschinen sind noch nicht online.',
    ask: 'Zu dieser Maschine anfragen',
    noDesc:
      'Fragen Sie uns nach technischen Details, weiteren Fotos und einem Video der Maschine im Betrieb. Gerne organisieren wir auch eine Besichtigung.',
    back: 'Zurück zu den Gebrauchtmaschinen',
    notFoundTitle: 'Ihr Modell ist nicht dabei?',
    notFoundText: 'Viele Maschinen durchlaufen unsere Werkstatt, bevor sie online gehen. Sagen Sie uns, was Sie suchen – wir melden uns, sobald sie verfügbar ist.',
    notFoundCta: 'Gemeinsam suchen',
  },

  partsPage: {
    eyebrow: 'Ersatzteile',
    title: 'Ersatzteile für SBL und Varimatrix.',
    lead: 'Ersatzteile für Stanzautomaten, Heißfolienprägemaschinen und Faltschachtel-Klebemaschinen. Nennen Sie uns Modell und Seriennummer: Wir finden das richtige Teil und senden Ihnen Angebot und Lieferzeit.',
    stepsTitle: 'So bestellen Sie ein Ersatzteil',
    steps: [
      { title: 'Modell und Seriennummer', text: 'Sie finden beides auf dem Typenschild der Maschine.' },
      { title: 'Foto oder Teilenummer', text: 'Ein Foto des Bauteils oder die Nummer aus dem Handbuch hilft uns, Fehler zu vermeiden.' },
      { title: 'Angebot und Versand', text: 'Wir bestätigen Preis, Verfügbarkeit und Lieferzeit.' },
    ],
    brandsTitle: 'Betreute Marken',
    brands: [
      { name: 'SBL', text: 'Ersatzteile für SBL-Stanzautomaten, Heißfolienprägemaschinen und Faltschachtel-Klebemaschinen.' },
      { name: 'Varimatrix', text: 'Ersatzteile für Varimatrix-Stanzautomaten – mit jahrzehntelanger Erfahrung in Wartung und Überholung.' },
    ],
    cta: 'Ersatzteil bestellen',
  },

  servicesPage: {
    eyebrow: 'Service',
    title: 'An Ihrer Seite – ein Maschinenleben lang.',
    lead: 'Von der Wahl der Konfiguration bis zur Bedienerschulung, von der Wartung bis zur technischen Nachrüstung: ein Ansprechpartner, der Ihre Maschinen kennt.',
    items: [
      {
        id: 'assistenza',
        title: 'Technischer Service',
        text: 'Allgemeine Wartung und Reparatur. Senden Sie uns die Maschinendaten und einige Fotos: Wir antworten mit einer ersten Diagnose und einem geplanten Einsatz.',
        cta: 'Anfrage stellen',
      },
      {
        id: 'formazione',
        title: 'Schulung',
        text: 'Technische Schulung Ihrer Bediener an Primatech-Maschinen und den von uns importierten Modellen – für sicheres Arbeiten und volle Leistung.',
        cta: 'Schulung planen',
      },
      {
        id: 'sviluppo',
        title: 'Forschung und Entwicklung',
        text: 'Maßgeschneiderte technische Nachrüstungen mit innovativem Zubehör, um die Effizienz bestehender Maschinen zu steigern.',
        cta: 'Projekt besprechen',
      },
      {
        id: 'post-vendita',
        title: 'After-Sales und Ersatzteile',
        text: 'Ersatzteile und technische Unterstützung mit BROZZI snc, seit über sechs Jahrzehnten in der Branche.',
        cta: 'Zu den Ersatzteilen',
      },
    ],
    processTitle: 'So arbeiten wir',
    process: [
      { title: 'Analyse', text: 'Wir untersuchen Produkte, Formate und Volumen Ihrer Produktion.' },
      { title: 'Angebot', text: 'Wir wählen die Maschine, neu oder gebraucht, und ihre Konfiguration.' },
      { title: 'Inbetriebnahme', text: 'Wir begleiten Lieferung, Inbetriebnahme und Bedienerschulung.' },
      { title: 'Betreuung', text: 'Wir bleiben an Ihrer Seite mit Wartung, Ersatzteilen und Nachrüstungen.' },
    ],
    videoLabel: 'Video: der Anleger eines Stanzautomaten im Betrieb',
  },

  companyPage: {
    eyebrow: 'Unternehmen',
    title: 'Über 60 Jahre Kartonage.',
    lead: 'Primatech produziert und vertreibt neue und gebrauchte Kartonagemaschinen aus Sant’Andrea delle Fratte bei Perugia – für Kunden in aller Welt.',
    story: [
      'Unsere Erfahrung ist in der Werkstatt entstanden: mehr als sechzig Jahre Arbeit in der Kartonage und Stanztechnik, mit Wartung, Überholung und Installation.',
      'Heute entwickeln und patentieren wir die Primatech-Maschinen in Italien und ergänzen sie um exklusiv importierte Modelle, ausgewählt nach Zuverlässigkeit und Preis-Leistungs-Verhältnis.',
      'Wir sind ein schlankes Team: Wer Ihnen antwortet, kennt die Maschinen und begleitet Ihr Projekt von Anfang bis Ende.',
    ],
    numbersTitle: 'Primatech in Zahlen',
    numbers: [
      { value: '60+', label: 'Jahre Erfahrung in der Kartonage' },
      { value: '100+', label: 'weltweit installierte Maschinen' },
      { value: '3', label: 'Kontinente: Europa, Amerika, Asien' },
      { value: '1', label: 'direkter Ansprechpartner für jeden Kunden' },
    ],
    valuesTitle: 'Was uns antreibt',
    fesrTitle: 'Kofinanzierte Projekte',
  },

  contactPage: {
    eyebrow: 'Kontakt',
    title: 'Sprechen wir über Ihre Produktion.',
    lead: 'Schreiben Sie uns für ein Angebot, ein Datenblatt, Service oder ein Ersatzteil: Ein Techniker antwortet Ihnen direkt.',
    formTitle: 'Informationsanfrage',
    directTitle: 'Direkter Kontakt',
    mapTitle: 'So finden Sie uns',
    mapText: 'Direkt bei Perugia, im Industriegebiet von Sant’Andrea delle Fratte.',
  },

  form: {
    name: 'Vor- und Nachname',
    company: 'Unternehmen',
    country: 'Land',
    email: 'E-Mail',
    phone: 'Telefon',
    optional: 'optional',
    topic: 'Betreff',
    topics: {
      quote: 'Angebot für eine Neumaschine',
      sheet: 'Datenblatt anfordern',
      usedBuy: 'Kauf einer Gebrauchtmaschine',
      usedSell: 'Verkauf meiner Gebrauchtmaschine',
      service: 'Technischer Service',
      parts: 'Ersatzteile',
      info: 'Sonstige Informationen',
    },
    machine: 'Gewünschte Maschine',
    machineHint: 'Modell oder Marke, Modell und Seriennummer Ihrer Maschine.',
    message: 'Nachricht',
    messageHint: 'Formate, Materialien, Volumen: Je mehr Details, desto genauer unsere Antwort.',
    privacyBefore: 'Ich habe die ',
    privacyLink: 'Datenschutzerklärung',
    privacyAfter: ' gelesen und stimme der Verarbeitung meiner Daten zur Beantwortung zu.',
    required: 'Pflichtfeld',
    requiredNote: 'Alle Felder sind Pflichtfelder, sofern nicht als optional gekennzeichnet.',
    submit: 'Anfrage senden',
    sending: 'Wird gesendet…',
    errors: {
      required: 'Bitte füllen Sie dieses Feld aus.',
      email: 'Bitte geben Sie eine gültige E-Mail-Adresse ein, z. B. name@firma.de.',
      privacy: 'Zum Senden der Anfrage müssen Sie der Datenschutzerklärung zustimmen.',
      summary: 'Bitte prüfen Sie die markierten Felder.',
      send: 'Die Anfrage konnte nicht gesendet werden. Bitte versuchen Sie es in einigen Minuten erneut oder schreiben Sie an {email}.',
    },
  },

  thanks: {
    title: 'Vielen Dank, wir haben Ihre Anfrage erhalten.',
    text: 'Wir melden uns so schnell wie möglich. In dringenden Fällen erreichen Sie uns unter {phone}.',
    back: 'Zur Startseite',
    catalog: 'Katalog ansehen',
  },

  footer: {
    tagline: 'Herstellung und Handel von neuen und gebrauchten Kartonagemaschinen.',
    machines: 'Maschinen',
    company: 'Primatech',
    contacts: 'Kontakt',
    privacy: 'Datenschutz',
    cookies: 'Cookies',
    rights: 'Alle Rechte vorbehalten.',
    fesr: 'Die Teilnahme an der Messe Print4all vom 27. bis 30. Mai 2025 wurde unter anderem gefördert durch: PR EFRE 2021-2027 Priorität 1 – OS 1.3 – Maßnahme 1.3.2 – Unterstützung der Internationalisierung von KMU.',
    fesrAlt: 'Logos: Coesione Italia 21-27 Umbria, Europäische Union, Italienische Republik, Region Umbrien, Sviluppumbria',
    backTop: 'Nach oben',
  },

  notFound: {
    title: 'Seite nicht gefunden.',
    text: 'Die gesuchte Seite existiert nicht oder wurde verschoben.',
    cta: 'Zur Startseite',
  },

  legal: {
    draft: 'Entwurf – vor der Veröffentlichung von einem Datenschutzberater zu prüfen.',
    updated: 'Zuletzt aktualisiert',
  },
};

export default de;
