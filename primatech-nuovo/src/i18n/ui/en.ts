import type { UI } from './it';

const en: UI = {
  meta: {
    home: {
      title: 'New and used converting machinery | Primatech, Italy',
      description:
        'Automatic die cutters, hot foil stamping machines, folder-gluers, laminators and flexo printers, new and used. Over 60 years of experience, spare parts and service.',
    },
    machines: {
      title: 'New converting machinery catalogue | Primatech',
      description:
        'Automatic die cutters, hot foil stamping machines, folder-gluers, laminators and flexo printers: Made in Italy models and exclusive imports.',
    },
    used: {
      title: 'Used and overhauled converting machinery | Primatech',
      description:
        'Used die cutters and converting machinery, overhauled in our own workshop. We also buy and collect your used machine.',
    },
    parts: {
      title: 'SBL and Varimatrix spare parts | Primatech',
      description:
        'Spare parts for SBL and Varimatrix die cutters, hot foil stamping machines and folder-gluers. Send us model and serial number for a quote.',
    },
    services: {
      title: 'Technical service, training and upgrades | Primatech',
      description:
        'Maintenance, repairs, operator training and technical upgrades for converting machinery, in Italy and abroad.',
    },
    company: {
      title: 'Over 60 years in paper converting | Primatech, Italy',
      description:
        'Primatech designs machines in Italy and imports converting equipment, with hundreds of installations across Europe, the Americas and Asia.',
    },
    contact: {
      title: 'Contact us and request a quote | Primatech',
      description:
        'Request a quote, a datasheet, technical service or spare parts. Primatech srl, Sant’Andrea delle Fratte (Perugia, Italy).',
    },
    thanks: { title: 'Request sent | Primatech', description: 'Thank you for contacting us.' },
    privacy: { title: 'Privacy notice | Primatech', description: 'How we process personal data.' },
    cookies: { title: 'Cookie policy | Primatech', description: 'How this website uses cookies.' },
    notFound: { title: 'Page not found | Primatech', description: 'The requested page does not exist.' },
  },

  nav: {
    machines: 'Machines',
    used: 'Used',
    parts: 'Spare parts',
    services: 'Services',
    company: 'Company',
    contact: 'Contact',
    cta: 'Request a quote',
    menu: 'Menu',
    close: 'Close menu',
    skip: 'Skip to content',
    language: 'Language',
    home: 'Home',
    main: 'Main navigation',
  },

  common: {
    call: 'Call',
    write: 'Email us',
    whatsapp: 'WhatsApp',
    requestInfo: 'Request information',
    requestSheet: 'Request the datasheet',
    downloadSheet: 'Download the datasheet (PDF)',
    discover: 'Discover',
    viewAll: 'View the full catalogue',
    madeInItaly: 'Made in Italy',
    imported: 'Import',
    photoSoon: 'Photo coming soon',
    models: '{n} models',
    model: '{n} model',
    specs: 'Technical data',
    features: 'Key features',
    related: 'Other machines in this category',
    vat: 'VAT',
    address: 'Address',
    phone: 'Phone',
    email: 'Email',
    breadcrumb: 'Breadcrumb',
    filter: 'Filter by category',
    all: 'All',
    openMaps: 'Open in Google Maps',
    newWindow: '(opens in a new window)',
    showing: 'Models shown: {n}',
  },

  langBanner: {
    text: 'This website is also available in English.',
    go: 'Switch to English',
    dismiss: 'No, thanks',
  },

  specs: {
    sheetMax: 'Max sheet size',
    sheetMin: 'Min sheet size',
    printArea: 'Stamping area',
    pressure: 'Max pressure',
    speed: 'Max speed',
    accuracy: 'Accuracy',
    register: 'Register',
    materials: 'Materials',
    power: 'Installed power',
  },

  categories: {
    'hot-foil': {
      name: 'Hot foil stamping',
      long: 'Automatic hot foil stamping machines',
      singular: 'Automatic hot foil stamping machine',
      intro:
        'Automatic hot foil stamping machines for embellishing folding cartons, labels and premium packaging, with precise register and short make-ready times.',
    },
    'die-cutting': {
      name: 'Die cutters',
      long: 'Automatic die cutters with stripping',
      singular: 'Automatic die cutter',
      intro:
        'Automatic flatbed die cutters for paper, folding boxboard, solid and corrugated board, with waste stripping and blank separation.',
    },
    'folder-gluer': {
      name: 'Folder-gluers',
      long: 'Automatic folder-gluers',
      singular: 'Automatic folder-gluer',
      intro:
        'Automatic folder-gluers for folding cartons and boxes in board and micro-flute, available in several working widths, from compact to large formats.',
    },
    laminator: {
      name: 'Laminators',
      long: 'Laminating machines',
      singular: 'Automatic laminator',
      intro:
        'Automatic sheet-to-sheet laminating lines that bond printed paper to corrugated or solid board with high output and accurate register.',
    },
    flexo: {
      name: 'Flexo printers',
      long: 'Flexographic machines',
      singular: 'Flexographic machine',
      intro:
        'Flexographic machines for inline printing and die cutting of corrugated board, for regular slotted cases and transport packaging.',
    },
  },

  fallback: {
    description:
      'Available on request. Configuration, delivery, installation and service are handled directly by Primatech: ask us for the full datasheet and a tailored offer.',
    specsMissing:
      'The full datasheet for this model is available on request: write to us and we will send it along with the configuration options.',
  },

  home: {
    eyebrow: 'Converting machinery · Perugia, Italy',
    h1: ['Over 60 years', 'of precision', 'for paper converting.'],
    lead: 'We design, build and import machines for die cutting, hot foil stamping and board converting. New, used and overhauled, backed by a service that follows each machine throughout its life.',
    ctaPrimary: 'Explore the machines',
    ctaSecondary: 'Talk to a technician',
    scroll: 'Scroll',
    stats: [
      { value: 60, suffix: '+', label: 'years of experience' },
      { value: 600, suffix: ' t', label: 'maximum pressure' },
      { value: 5500, suffix: '', label: 'sheets per hour' },
      { value: 3, suffix: '', label: 'continents served' },
    ],
    madeEyebrow: 'Made in Italy',
    madeTitle: 'Designed and patented in Italy.',
    madeLead:
      'Primatech machines are born from our hands-on workshop experience: robust, easy to run and competitive on both short runs and high volumes.',
    catalogEyebrow: 'Catalogue',
    catalogTitle: 'A complete line for converting.',
    catalogLead:
      'From hot foil stamping to folder-gluing: machines built in Italy alongside models we import exclusively, selected from the best manufacturers.',
    usedCard: 'Used and overhauled machines',
    usedCardText: 'Collected, overhauled and guaranteed',
    valuesEyebrow: 'Our approach',
    values: [
      {
        title: 'Global Attitude',
        text: 'A reference point for the Italian market and active in international trade for decades: hundreds of machines installed across Europe, the Americas and Asia.',
      },
      {
        title: 'Smart',
        text: 'Our R&D department selects solutions that combine innovation, functionality and careful construction, and files patents for the machines we build in Italy.',
      },
      {
        title: 'Passion',
        text: 'Over 60 years of dedication to paper converting. Quality comes first, from the choice of components to the choice of suppliers.',
      },
    ],
    servicesEyebrow: 'Services',
    servicesTitle: ['We don’t just sell machines.', 'We stand by them.'],
    services: [
      {
        title: 'New',
        text: 'Made in Italy machines and exclusive imports, configured for your production, with a partner network on every continent.',
      },
      {
        title: 'Used',
        text: 'We buy, collect and overhaul used machines to bring them back to market reliable and compliant.',
      },
      {
        title: 'After-sales',
        text: 'Maintenance, repairs, spare parts and training, with technical support from BROZZI snc, in the industry for over six decades.',
      },
    ],
    servicesCta: 'All services',
    sellEyebrow: 'Used machinery trading',
    sellTitle: ['Selling a machine?', 'We’ll value it.'],
    sellText:
      'Tell us the model, year and condition: we will value it, collect it and overhaul it. Looking for a guaranteed used machine instead? Ask us for current availability.',
    sellCta: 'Sell your machine',
    sellCta2: 'Find a used machine',
  },

  contactBand: {
    eyebrow: 'Contact',
    title: ['Let’s talk about', 'your production.'],
    text: 'Tell us what you produce, in which formats and materials: we will suggest the right solution, new or used.',
    cta: 'Request a quote',
  },

  machinesPage: {
    eyebrow: 'New machinery catalogue',
    title: 'Machines for paper converting.',
    lead: 'Machines designed and patented in Italy alongside models we import exclusively, for every converting step: hot foil stamping, die cutting, folder-gluing, laminating and flexo printing.',
    usedHint: 'Looking for a used machine?',
    usedHintCta: 'See available used machines',
    categoriesTitle: 'Categories',
  },

  categoryPage: {
    eyebrow: 'Catalogue',
    usedIn: 'Used machines available in this category',
    allMachines: 'All machines',
  },

  machinePage: {
    ctaTitle: 'Interested in this machine?',
    ctaText:
      'Write or call us: a technician will get back to you with availability, configuration and an offer, and can arrange a production test if you wish.',
    brand: 'Brand',
    category: 'Category',
    origin: 'Origin',
    originIt: 'Designed and built in Italy',
    originImport: 'Exclusive Primatech import',
  },

  usedPage: {
    eyebrow: 'Guaranteed used machinery',
    title: 'Used and overhauled machines.',
    lead: 'We buy, collect and overhaul used converting machinery in our own workshop, bringing it back to market reliable and compliant. Availability changes often: if you can’t find the model you need, just ask.',
    status: { available: 'Available', negotiation: 'Under offer', sold: 'Sold' },
    condition: {
      overhauled: 'Overhauled',
      working: 'Working, can be seen in production',
      'as-is': 'To be overhauled',
    },
    year: 'Year',
    format: 'Format',
    location: 'Location',
    conditionLabel: 'Condition',
    statusLabel: 'Availability',
    empty:
      'There are currently no machines listed in this category. Contact us: some machines are not online yet.',
    ask: 'Ask about this machine',
    noDesc:
      'Ask us for technical details, more photos and a video of the machine running. We can also arrange a visit to see it in person.',
    back: 'Back to used machines',
    notFoundTitle: 'Can’t find the model you need?',
    notFoundText: 'Many machines pass through our workshop before they are listed. Tell us what you are looking for and we will let you know as soon as it is available.',
    notFoundCta: 'Search with us',
  },

  partsPage: {
    eyebrow: 'Spare parts',
    title: 'SBL and Varimatrix spare parts.',
    lead: 'Spare parts for die cutters, hot foil stamping machines and folder-gluers. Send us the model and serial number: we will identify the right part and send you an offer and delivery time.',
    stepsTitle: 'How to order a spare part',
    steps: [
      { title: 'Model and serial number', text: 'You will find them on the machine’s nameplate.' },
      { title: 'Photo or part code', text: 'A photo of the component or the code from the manual helps us get it right.' },
      { title: 'Offer and shipping', text: 'We confirm price, availability and delivery time.' },
    ],
    brandsTitle: 'Brands we support',
    brands: [
      { name: 'SBL', text: 'Spare parts for SBL die cutters, hot foil stamping machines and folder-gluers.' },
      { name: 'Varimatrix', text: 'Spare parts for Varimatrix die cutters, backed by decades of maintenance and overhaul experience.' },
    ],
    cta: 'Order a spare part',
  },

  servicesPage: {
    eyebrow: 'Services',
    title: 'By your side throughout the life of your machine.',
    lead: 'From choosing the configuration to training your operators, from maintenance to technical upgrades: one partner who knows your machines.',
    items: [
      {
        id: 'assistenza',
        title: 'Technical service',
        text: 'General maintenance and repairs. Send us the machine details and a few photos: we will reply with an initial diagnosis and a planned intervention.',
        cta: 'Open a request',
      },
      {
        id: 'formazione',
        title: 'Training',
        text: 'Technical training for your operators on Primatech machines and the models we import, so they can work safely and get the most out of them.',
        cta: 'Arrange a course',
      },
      {
        id: 'sviluppo',
        title: 'Research and development',
        text: 'Tailored technical upgrades with the latest accessories to boost the efficiency of machines already in production.',
        cta: 'Tell us about your project',
      },
      {
        id: 'post-vendita',
        title: 'After-sales and spare parts',
        text: 'Spare parts and technical support with BROZZI snc, in the industry for over six decades.',
        cta: 'Go to spare parts',
      },
    ],
    processTitle: 'How we work',
    process: [
      { title: 'Analysis', text: 'We study the products, formats and volumes of your production.' },
      { title: 'Proposal', text: 'We choose the machine, new or used, and its configuration.' },
      { title: 'Start-up', text: 'We handle delivery, commissioning and operator training.' },
      { title: 'Support', text: 'We stay by your side with maintenance, spare parts and upgrades.' },
    ],
    videoLabel: 'Video: the feeder of an automatic die cutter in operation',
  },

  companyPage: {
    eyebrow: 'Company',
    title: 'Over 60 years in paper converting.',
    lead: 'Primatech manufactures and sells new and used converting machinery from Sant’Andrea delle Fratte, just outside Perugia, for customers all over the world.',
    story: [
      'Our experience was born in the workshop: more than sixty years of work in paper converting and die cutting, through maintenance, overhauls and installations.',
      'Today we design and patent Primatech machines in Italy and offer them alongside models we import exclusively, selected for reliability and value for money.',
      'We are a lean team: the person who answers you knows the machines and follows your project from start to finish.',
    ],
    numbersTitle: 'Primatech in numbers',
    numbers: [
      { value: '60+', label: 'years of experience in paper converting' },
      { value: '100+', label: 'machines installed worldwide' },
      { value: '3', label: 'continents: Europe, the Americas, Asia' },
      { value: '1', label: 'direct contact person for every customer' },
    ],
    valuesTitle: 'What drives us',
    fesrTitle: 'Co-funded projects',
  },

  contactPage: {
    eyebrow: 'Contact',
    title: 'Let’s talk about your production.',
    lead: 'Write to us for a quote, a datasheet, technical service or a spare part: a technician will reply directly.',
    formTitle: 'Information request',
    directTitle: 'Direct contacts',
    mapTitle: 'Where we are',
    mapText: 'Just outside Perugia, in the Sant’Andrea delle Fratte industrial area.',
  },

  form: {
    name: 'Full name',
    company: 'Company',
    country: 'Country',
    email: 'Email',
    phone: 'Phone',
    optional: 'optional',
    topic: 'Subject',
    topics: {
      quote: 'Quote for a new machine',
      sheet: 'Datasheet request',
      usedBuy: 'Buying a used machine',
      usedSell: 'Selling my used machine',
      service: 'Technical service',
      parts: 'Spare parts',
      info: 'Other information',
    },
    machine: 'Machine of interest',
    machineHint: 'Model, or brand, model and serial number of your machine.',
    message: 'Message',
    messageHint: 'Formats, materials, volumes: the more details you give us, the more precise our reply.',
    privacyBefore: 'I have read the ',
    privacyLink: 'privacy notice',
    privacyAfter: ' and agree to the processing of my data in order to receive a reply.',
    required: 'required',
    requiredNote: 'All fields are required unless marked optional.',
    submit: 'Send request',
    sending: 'Sending…',
    errors: {
      required: 'Please fill in this field.',
      email: 'Enter a valid email address, e.g. name@company.com.',
      privacy: 'You need to accept the privacy notice to send the request.',
      summary: 'Please check the highlighted fields.',
      send: 'Your request could not be sent. Please try again in a few minutes or email us at {email}.',
    },
  },

  thanks: {
    title: 'Thank you, we have received your request.',
    text: 'We will get back to you as soon as possible. If it is urgent, call us on {phone}.',
    back: 'Back to home',
    catalog: 'Browse the catalogue',
  },

  footer: {
    tagline: 'Manufacturing and sale of new and used converting machinery.',
    machines: 'Machines',
    company: 'Primatech',
    contacts: 'Contact',
    privacy: 'Privacy',
    cookies: 'Cookies',
    rights: 'All rights reserved.',
    fesr: 'Participation in the Print4all trade fair from 27 to 30 May 2025 was made possible in part by funding from: PR FESR 2021-2027 Priority 1 – OS 1.3 – Action 1.3.2 – Support for the internationalisation of SMEs.',
    fesrAlt: 'Logos: Coesione Italia 21-27 Umbria, European Union, Italian Republic, Umbria Region, Sviluppumbria',
    backTop: 'Back to top',
  },

  notFound: {
    title: 'Page not found.',
    text: 'The page you are looking for does not exist or has been moved.',
    cta: 'Go to home',
  },

  legal: {
    draft: 'Draft to be validated by a privacy consultant before publication.',
    updated: 'Last updated',
  },
};

export default en;
