export default {
  lang: 'en', locale: 'en_GB', langName: 'English',

  ui: {
    skip: 'Skip to content',
    menu: 'Menu', close: 'Close',
    nav: { estate: 'The Estate', wines: 'Wines', winery: 'The Bodega', experiences: 'Tastings', stays: 'Stays', equestrian: 'Equestrian', events: 'Events', contact: 'Contact us' },
    enquire: 'Enquire', shopNow: 'Shop now', nextPage: 'Next', rangeTo: 'to',
    language: 'Language',
    cart: 'Cart', openCart: 'Open cart', cartTitle: 'Your cart', cartEmpty: 'Your cart is empty.',
    subtotal: 'Subtotal', shipping: 'Shipping', free: 'Free', total: 'Total',
    freeLeft: n => `Add ${n} more for free shipping in the EU.`,
    freeReached: 'Free shipping within the EU.',
    checkout: 'Secure checkout',
    checkoutNote: 'Prototype: on the live site this opens the secure Shopify checkout.',
    remove: 'Remove', qty: 'Quantity', increase: 'Increase quantity', decrease: 'Decrease quantity',
    addToCart: 'Add to cart', added: 'Added to cart',
    vintage: 'Vintage', option: 'Choose', viewWine: 'View wine', allWines: 'All wines',
    pause: 'Pause video', play: 'Play video',
    home: 'Home',
    opensNew: '(opens in a new tab)',
    taxNote: 'VAT included. Shipping calculated at checkout.',
    footer: {
      tagline: 'A private organic estate in the southeast of Mallorca, first recorded in the fourteenth century.',
      visit: 'Visit', explore: 'Explore', follow: 'Follow',
      organic: 'Certified organic & vegan wines · DO Pla i Llevant',
      legal: 'Legal notice', privacy: 'Privacy', cookies: 'Cookies',
      rights: 'All rights reserved.',
    },
    prototype: 'Prototype — content for review',
    cursor: { view: "View", discover: "Discover", drag: "Drag" },
    marquee: ["Organic", "Vegan", "DO Pla i Llevant", "Felanitx", "Mallorca", "Since the 14th century"],
  },

  meta: {
    home: { title: 'Es Fangar · Organic estate & winery in Mallorca', description: 'A thousand hectares of organic Mallorca: acclaimed vegan wines, winery tastings, private houses and equestrian facilities of Olympic standard near Felanitx.' },
    estate: { title: 'The Estate · Es Fangar, Mallorca', description: 'From Roman antiquity to a thousand organic hectares: the history, landscape and nature reserve of Es Fangar in southeast Mallorca.' },
    wines: { title: 'Organic wines from Mallorca · Shop · Es Fangar Vins', description: 'Certified organic and vegan wines from our estate in Felanitx. Whites, rosé, reds and a semisweet white, delivered across the EU.' },
    winery: { title: 'The Bodega & the gravity method · Es Fangar Vins', description: 'Opened in 2016, our 7,300 m² gravity winery in Felanitx handles every grape without pumps. Discover how we make our wines.' },
    experiences: { title: 'Wine tastings & winery tours in Mallorca · Es Fangar', description: 'Guided winery tours, tastings and the seasonal harvest experience at Es Fangar Vins in Felanitx. Book online.' },
    stays: { title: 'Private houses on a Mallorcan finca · Stays · Es Fangar', description: 'Three private houses with their own pools on an organic estate of a thousand hectares, plus the Main House and the whole finca for stays of 30 nights or more.' },
    equestrian: { title: 'Equestrian facilities in Mallorca · Es Fangar', description: 'Rent the whole equestrian complex of Es Fangar: an indoor arena built to Olympic specifications, dressage arena, stabling for around 200 horses and a 380 metre track. Host competitions of the highest level.' },
    events: { title: 'Weddings and events · Es Fangar', description: 'Private celebrations, weddings and corporate gatherings among the gardens, courtyards, chapel and winery of Es Fangar, Mallorca.' },
    contact: { title: 'Contact & enquiries · Es Fangar', description: 'Plan a long stay, an event, renting the equestrian complex or a trade order. Write to us and we will reply personally.' },
    legal: { title: 'Legal notice · Es Fangar', description: 'Legal notice and company information for FINCA ES FANGAR, SAU.' },
    privacy: { title: 'Privacy policy · Es Fangar', description: 'How Es Fangar collects and protects personal data.' },
    cookies: { title: 'Cookie policy · Es Fangar', description: 'Which cookies this website uses and why.' },
    notFound: { title: 'Page not found · Es Fangar', description: 'The page you are looking for does not exist.' },
  },

  home: {
    eyebrow: 'Felanitx · Mallorca · Since the 14th century',
    title: 'A thousand hectares of <em>organic</em> Mallorca',
    lead: 'Vineyards, pine forest and a protected nature reserve in the southeast of the island. We make certified organic, vegan wines and open the finca to a few guests at a time.',
    ctaWines: 'Discover the wines', ctaStay: 'Stay on the finca',
    videoLabel: 'Aerial view of the Main House and gardens at dusk',
    stats: [
      { n: '1,000', l: 'hectares of estate' },
      { n: '56', l: 'hectares of organic vineyard' },
      { n: '400+', l: 'hectares of nature reserve' },
      { n: '2016', l: 'gravity winery opened' },
    ],
    introTitle: 'One estate, one way of working',
    intro: 'Es Fangar is a historic possessió between Felanitx and Manacor, first recorded in the fourteenth century. Today the whole estate is farmed organically: vines, olive and carob trees, figs, almonds and bees share the land with wild pine forest.',
    pillarsTitle: 'Discover Es Fangar',
    pillars: [
      { k: 'wines', t: 'The wines', d: 'Organic, vegan and deeply Mediterranean, from native Callet, Manto Negro and Prensal Blanc to Chardonnay and Syrah.' },
      { k: 'experiences', t: 'Tastings & tours', d: 'Walk through one of Spain’s most modern wineries and taste the wines where they are made.' },
      { k: 'stays', t: 'Stays', d: 'Three private houses with their own pools, and the Main House for longer stays.' },
      { k: 'equestrian', t: 'Equestrian', d: 'Arenas of Olympic standard, stabling and a 380 metre track: the whole complex can be rented for competitions and training.' },
    ],
    winesTitle: 'From our cellar',
    winesLead: 'Every bottle is certified organic and vegan: we never clarify with gelatin or egg white.',
    bodegaEyebrow: 'Es Fangar Vins · Felanitx',
    bodegaTitle: 'A winery built around gravity',
    bodegaText: 'Inaugurated in 2016 after nine years of trials, our bodega moves grapes and wine without pumps, gently, from level to level. Seven thousand three hundred square metres of architecture designed for one thing: respect for the fruit.',
    bodegaCta: 'Inside the bodega',
    staysTitle: 'Stay on the working finca',
    staysLead: 'Each house sits apart from the others, with its own terrace and pool. The beaches of Porto Colom are eight minutes away.',
    staysCta: 'See the houses',
    landTitle: 'Grown on the estate',
    landLead: 'Beyond the vines, the finca produces what Mallorca has always produced. Ask for them when you visit.',
    land: [
      { t: 'Olive oil', d: 'From ancient olive groves, farmed organically.' },
      { t: 'Honey', d: 'From our own hives among pine, rosemary and wild herbs.' },
      { t: 'Figs', d: 'Traditional Mallorcan varieties, harvested at the end of summer.' },
      { t: 'Almonds', d: 'From the almond trees that blossom across the estate every February.' },
    ],
    visitTitle: 'Find us',
    visitText: 'On the road between Felanitx and Son Macià. Palma airport is about 45 minutes by car.',
    visitCta: 'Get in touch',
  },

  estate: {
    eyebrow: 'The Estate',
    title: 'Nine centuries on one piece of land',
    lead: 'Mallorca’s largest private finca, farmed entirely by organic principles, and one of the most extraordinary landscapes of the island’s southeast.',
    historyTitle: 'A short history',
    timeline: [
      { y: 'Antiquity', t: 'Research by the estate’s owners traces the property back to Roman times.' },
      { y: '14th c.', t: 'First written mention, when cereals and wine from the estate supplied the local community.' },
      { y: '19th c.', t: 'Phylloxera wipes out almost every vineyard on the island; only the remains of an old winery survive.' },
      { y: '2004', t: 'The first vines are replanted on the estate’s hills: native and international varieties side by side.' },
      { y: '2007', t: 'A trial winery is built to learn from each vintage before building for the long term.' },
      { y: '2009', t: 'The first Es Fangar wines go on sale; the first awards follow in 2012.' },
      { y: '2016', t: 'The new gravity bodega in Felanitx opens its doors.' },
    ],
    landscapeTitle: 'Forest, fields and a protected reserve',
    landscape: 'When the current owners acquired Es Fangar, they found a unique place: a protected nature reserve of more than 400 hectares, vast fields and wild forests of pine, olive and carob trees. The estate spans some 1,000 hectares in the municipalities of Manacor and Felanitx.',
    organicTitle: 'Organic by conviction',
    organic: 'Sustainable and organic farming is our first priority, across the whole estate. Vines, olive groves, almond and fig trees and our beehives are managed without synthetic chemicals, in a landscape we intend to hand on to the next generation in better shape than we found it.',
    selfTitle: 'Designed to be self sufficient',
    self: [
      { n: '100 kW', l: 'photovoltaic installation' },
      { n: '9', l: 'licensed wells with water purification' },
      { n: '56 ha', l: 'of vineyard, and growing' },
    ],
    gardensTitle: 'The gardens of the Main House',
    gardens: 'Around the Main House, formal gardens, avenues lined with palms and quiet courtyards lead down to a heated pool lined with Bisazza mosaic: the heart of the finca at dusk.',
    ctaTitle: 'Come and see it',
    ctaText: 'Taste the wines at the bodega or stay in one of our houses.',
  },

  wines: {
    eyebrow: 'Es Fangar Vins · Shop',
    title: 'Organic wines from the heart of Mallorca',
    lead: 'Certified organic, vegan and vegetarian. From fresh Moscatel to a Gran Reserva aged for 32 months in barrel.',
    filterLabel: 'Filter wines',
    filters: { all: 'All', white: 'White', rose: 'Rosé', red: 'Red', sweet: 'Semisweet', offers: 'Offers' },
    count: n => `${n} ${n === 1 ? 'wine' : 'wines'}`,
    offerEyebrow: 'Offer', offerTitle: 'TwentyTwelve · 12 bottles for €90',
    offerText: 'Twelve bottles of TwentyTwelve Pink or White at half price: for summer, for friends, for the cellar. While stocks last.',
    offerSave: 'Save €90',
    shipTitle: 'Delivery',
    ship: [
      'Delivery across the European Union',
      'Flat rate €14.90 · free from €89',
      'Spain 2 to 3 days · EU 3 to 7 days',
      'Also available at our bodega in Felanitx',
    ],
    tradeTitle: 'Restaurants, wine shops & distributors',
    tradeText: 'For trade prices, larger orders and large formats, send us a trade enquiry.',
    tradeCta: 'Trade enquiry',
  },

  wine: {
    notes: 'Tasting notes', color: 'Colour', nose: 'Nose', palate: 'Palate',
    details: 'Details', varieties: 'Varieties', type: 'Style', abv: 'Alcohol', temp: 'Serving temperature', pairing: 'Food pairing', sugar: 'Residual sugar',
    more: 'More wines',
    seoCat: { white: "Organic white wine from Mallorca", rose: "Organic rosé from Mallorca", red: "Organic red wine from Mallorca", sweet: "Organic semisweet wine from Mallorca" },
    seoTail: "Certified organic & vegan, from Felanitx. EU delivery.",
    vintage: "Vintage",
    cats: { white: 'White', rose: 'Rosé', red: 'Red', sweet: 'Semisweet white' },
    organic: 'Certified organic · Vegan',
  },

  wineText: {
    'twentytwelve-white': { type: 'Young dry Moscatel', short: 'Floral, fresh apricot, a hint of orange marmalade.',
      desc: 'From our Moscatel vineyard, which catches the coastal breezes that give this wine its remarkable freshness. A dry Moscatel, deeply Mediterranean, with real finesse in the detail.',
      color: 'Delicate pale yellow with greenish reflections.', nose: 'Floral notes with fresh apricot and a hint of orange marmalade.', palate: 'Elegant volume in harmony with natural acidity and a touch of minerality; vibrant and versatile.', pairing: 'Mallorcan tumbet, seafood paella' },
    'twentytwelve-pink': { type: 'Rosé', short: 'Strawberry, raspberry, pomegranate and herbs.',
      desc: 'An intense, expressive rosé with structure. Fresh red fruit and Mediterranean herbs connect it to the landscape around the vineyard; vibrant acidity makes it a wine for the table.',
      color: 'Attractive intense pink.', nose: 'Fresh strawberries and raspberries, hints of watermelon, pomegranate and Mediterranean herbs.', palate: 'Vibrant acidity and a structured mouthfeel; intense and elegant.', pairing: 'Frito mallorquín, Provençal chicken' },
    'sa-sivina': { type: 'Native white', short: 'Wild herbs, peach, apricot; marked minerality.',
      desc: 'Our clear bet on the native varieties of the island. Fresh and expressive, with a deeply Mediterranean character, power and complexity from its marked minerality.',
      color: 'Pale yellow with golden reflections.', nose: 'Wild Mediterranean herbs and summer fruit — peach, apricot, melon — with a subtle spicy finish.', palate: 'Mineral, harmonious, with good acidity, pleasant volume and a vibrant finish.', pairing: 'Mallorcan soups, grilled salmon with mustard and honey' },
    'sa-fita': { type: 'White, briefly oak-aged', short: 'Yellow peach, pineapple, grapefruit; almond.',
      desc: 'A journey through dense forest with the breeze of the sea. The ideal blend of the white varieties we grow — delicate, vibrant and unmistakably Mallorcan.',
      color: 'Pale yellow with greenish hues and great brightness.', nose: 'Yellow peach and pineapple with citrus hints of grapefruit.', palate: 'Fresh and vibrant, with sweet spice and almond from a brief time in oak; lively and gastronomic.', pairing: 'Sopa de peix, porcini risotto' },
    'lo-cortinello': { type: 'Barrel-aged white', short: 'Apricot, nuts, sweet spice, a honeyed finish.',
      desc: 'Bright and golden, opening with the apricot typical of Viognier before nuts, sweet spice and a honeyed nuance appear. Good body, vibrant acidity and a long, balanced finish.',
      color: 'Bright yellow with golden highlights.', nose: 'Apricot, then nuts, sweet spices and a gentle honeyed nuance.', palate: 'Good body, vibrant acidity and great complexity that unfolds in the glass; long and balanced.', pairing: 'Arròs brut, beef Wellington' },
    'genesis-semi-dolc': { type: 'Semisweet white', short: 'Apricot, pineapple, jasmine; fresh and silky.',
      desc: 'A semi-sweet white of real finesse: intense fresh fruit and white flowers, a mouth-coating texture and a freshness that keeps you coming back.',
      color: 'Light yellow with copper tones.', nose: 'Apricot, pineapple, peach, a touch of banana and jasmine.', palate: 'Extremely balanced, fresh yet mouth-coating, with a medium finish.', pairing: 'Desserts, cheeses, white meat' },
    'son-p': { type: 'Red, briefly aged', short: 'Cherry, strawberry, black pepper, balsamic.',
      desc: 'Native Manto Negro and Callet lead this wine. A short ageing adds subtle complexity; fruit, spice and balsamic notes speak of Mallorca. Fresh, smooth and lower in alcohol.',
      color: 'Medium-bodied garnet red.', nose: 'Fresh cherry and strawberry jam, black pepper and delicate balsamic notes.', palate: 'Fresh, balanced and smooth, with good acidity — a wine to explore sip by sip.', pairing: 'Roast lamb shoulder with herbs, vegetable lasagne' },
    'fangar-elements': { type: 'Reserva red · 24 months in barrel', short: 'Red and black forest fruit; silky and long.',
      desc: 'All the red varieties of the estate, native and well-adapted, brought together over a long barrel ageing. The Mediterranean climate and the landscape around us, in one elegant wine.',
      color: 'Bright cherry red with brown reflections.', nose: 'Great fruit expression: red and black forest fruits.', palate: 'Ripe, silky tannins; fruit and oak in balance; elegant, round and long.', pairing: 'Beef with sobrassada, game stew' },
    'n-amarat': { type: 'Gran Reserva red · 32 months in barrel', short: 'Fruit compote, spice, cocoa, leather, truffle.',
      desc: 'Our bet on elegance. Clay-loam soils and organic farming give ripe, round, firm tannins; long barrel ageing builds great complexity in aroma and texture.',
      color: 'Brick red with terracotta reflections; bright.', nose: 'Fruit compote, raspberries in liqueur, spice, Mediterranean herbs, liquorice, cocoa, elegant leather and a hint of white truffle.', palate: 'Intense, structured and mature, with pleasant astringency.', pairing: 'Roast suckling pig, chocolate coulant' },
  },

  winery: {
    eyebrow: 'Es Fangar Vins',
    title: 'The bodega',
    lead: 'One of Spain’s most modern wineries, where centuries of winemaking meets precise, gentle technology.',
    storyTitle: 'Twelve years of patience',
    story: 'After exceptional results from a first trial winery built in 2007, the new Es Fangar Vins bodega was inaugurated in April 2016, following three years of construction. Its design and capacity were shaped by one ambition: to bring tradition and modernity together without compromise. Today visitors come from around the world for the wines and for the architecture.',
    gravityTitle: 'Métode Gravetat',
    gravityLead: 'The gravity method rests on a simple principle: let gravity do the work. Throughout the whole process we avoid pumping grapes and wine, preserving their integrity.',
    steps: [
      { t: 'Hand selection', d: 'Grapes arriving from the vineyard are carefully sorted by hand before pressing or being placed in large containers.' },
      { t: 'Carried overhead', d: 'A crane designed for our cellar lifts the containers and carries them along ceiling rails to the stainless steel tanks, where fermentation begins.' },
      { t: 'Gentle by design', d: 'Handling the grapes as softly as possible prevents premature oxidation: the key to aromatic wines that keep all their natural character.' },
    ],
    roomTitle: 'The production hall',
    room: 'Spacious and set on several levels, the production hall lets us work each grape variety in its own area, with nothing mixed. Cleanliness and the quality of the equipment are fundamental to every vintage.',
    factsTitle: 'In numbers',
    facts: [
      { n: '7,300 m²', l: 'over four levels' },
      { n: '≈190', l: 'barrels of 225 to 500 litres' },
      { n: '6,000 L', l: 'large foudres' },
      { n: '56 ha', l: 'of organic vineyard' },
    ],
    machinery: 'Pressing and processing rely on equipment by Bucher Vaslin, chosen for the careful, precise handling that keeps the fruit intact.',
    varietiesTitle: 'What we grow',
    varieties: 'Warm sun and salty sea breezes shape the character of our grapes. The main varieties are Chardonnay, Prensal Blanc, Cabernet Sauvignon and Callet, alongside Giró Ros, Manto Negro, Moscatel, Viognier, Syrah and Merlot.',
    philosophyTitle: 'Organic, vegan, vegetarian',
    philosophy: 'All our wines are certified organic, vegan and vegetarian. We never clarify with animal gelatin or egg white. This is important for people with allergies, and for us a matter of principle.',
    cta: 'Book a tasting at the bodega',
  },

  experiences: {
    eyebrow: 'Visit the bodega',
    title: 'Tastings, tours & the harvest',
    lead: 'Every visit begins with the story of our wines and a walk through the winery, then we pour.',
    items: [
      { t: 'Winery tour & tasting', d: 'A guided tour of the gravity winery (production hall, barrel cellar and tasting room), followed by a tasting of our wines. Several formats are available.', img: 'winery-tasting-room' },
      { t: 'Harvest at Es Fangar', d: 'At harvest time, pick grapes in our organic vineyards, then taste the wines and share a meal on the finca. Several options and price levels each season.', img: 'vines-closeup' },
      { t: 'Private & group visits', d: 'Tailored tastings for private groups and companies, in the cellar library or the barrel room.', img: 'winery-barrels' },
    ],
    bookTitle: 'Check availability & book',
    bookText: 'Pick a date to see live availability and book your visit in a few clicks.',
    bookFact1: 'Guided tour of our gravity winery', bookFact2: 'Tasting of our organic & vegan wines', bookFact3: '45 minutes from Palma, by reservation',
    bookButton: 'Show availability',
    bookConsent: 'The booking calendar is provided by Bókun (bokun.io), which may set its own cookies. See our cookie policy.',
    bookDemo: 'Prototype note: this is the real booking system — please do not complete a booking during the demo.',
    loading: 'Loading the booking calendar…',
    groupTitle: 'A private group or a company?',
    groupText: 'Write to us and we will design the visit with you.',
    groupCta: 'Send an enquiry',
    practicalTitle: 'Good to know',
    practical: [
      'Visits are by reservation only.',
      'The bodega is at Camino Son Prohens, Felanitx, about 45 minutes from Palma.',
      'Please arrange a designated driver: wine tastings and driving don’t mix.',
    ],
  },

  stays: {
    eyebrow: 'Stays',
    title: 'Stay on the finca',
    lead: 'Private houses on Mallorca’s largest organically managed estate. Vineyards, pine forest and a thousand hectares of quiet.',
    bedrooms: n => `${n} bedrooms`, guests: n => `${n} guests`,
    bookOn: 'Book on', licence: 'Tourist licence', licencePending: 'number pending',
    houses: {
      'arabic-house': { tagline: 'Moorish detail, contemporary comfort',
        desc: 'A house on two levels with fireplaces, a fully equipped kitchen and a private cinema. Outside: terraces and two rooftop terraces, a summer kitchen and barbecue, a pavilion pool and a dedicated massage room.',
        features: ['Private pool', 'Private cinema', 'Two rooftop terraces', 'Massage room', 'Summer kitchen & barbecue'] },
      'mallorcan-house': { tagline: 'Traditional character, modern living',
        desc: 'Light and warm, with a cosy living room and stone fireplace opening into a spacious dining area. Several terraces for shade, meals and sun, around a private pool in a lawned Mediterranean garden.',
        features: ['Private pool', 'Stone fireplace', 'Several terraces', 'Full kitchen', 'Washer & dryer'] },
      'the-lodge': { tagline: 'The quietest stay on the finca',
        desc: 'Set well away from the other houses and wrapped in pine and scrub. Two bedrooms and a bright open plan living kitchen look out to the trees; a small pool sits on a terrace at the forest’s edge.',
        features: ['Private pool', 'Forest setting', 'Complete privacy', 'Open plan living', 'Washer & dryer'] },
    },
    longTitle: 'The Main House & the whole finca',
    longEyebrow: 'Stays of 30 nights or more',
    long: 'For extended stays, the Main House, or the entire estate, can be reserved privately. Over 4,000 m² around a courtyard filled with palms, with a restored chapel still used for private ceremonies, a heated 324 m² pool in Bisazza mosaic, a spa with indoor pool and sauna, a tennis court, a private cinema and landscaped gardens.',
    longFacts: ['Minimum stay 30 nights', 'Main House or the entire estate', 'Rates on request'],
    longCta: 'Enquire about a long stay',
    aroundTitle: 'Around the finca',
    around: [
      { t: 'Porto Colom', d: 'The beaches and harbour are about 8 minutes away; Cala Marçal and Mondragó are a short drive.' },
      { t: 'Felanitx', d: 'A short drive away: a lively market on Sunday mornings and good restaurants for dinner.' },
      { t: 'Getting here', d: 'Palma airport is about 45 minutes by car. A car is essential.' },
    ],
  },

  equestrian: {
    eyebrow: 'Equestrian',
    title: 'Facilities built for international competition',
    lead: 'An equestrian complex set among olive groves and pine, available to rent in its entirety for competitions of the highest international level.',
    facilitiesTitle: 'The facilities',
    facilities: [
      { t: 'Indoor arena', d: 'Built to Olympic specifications, for training in any weather.' },
      { t: 'Outdoor dressage arena', d: 'Professionally maintained, suitable for international events.' },
      { t: 'Racetrack', d: '380 metres long and 3 metres wide, for training and racing.' },
      { t: 'Lunging track', d: 'With adjustable speed control, for safe and efficient conditioning.' },
      { t: 'Stabling', d: 'Room for around 200 horses, with tack room and blanket wash rooms.' },
      { t: 'Support on site', d: 'Farrier’s workshop, instructors’ offices, water storage and generous storage areas.' },
    ],
    bringTitle: 'Rent the entire complex',
    bring: 'The whole equestrian complex can be rented exclusively. It regularly hosts competitions of the highest categories in the world, and it is just as suited to a training camp or a full season. When you rent the complex, you bring your own horses.',
    bringCta: 'Enquire about renting the complex',
  },

  events: {
    eyebrow: 'Events',
    title: 'Celebrations and gatherings at the finca',
    lead: 'Gardens, courtyards, a chapel and a winery: Es Fangar can host moments that matter, privately.',
    items: [
      { t: 'Weddings & private ceremonies', d: 'The restored chapel of the Main House is still used for private ceremonies; the gardens and courtyards do the rest.', img: 'main-house-night-front' },
      { t: 'Corporate gatherings', d: 'Retreats, meetings and incentives with tastings at the bodega, long tables under the arcades and a thousand hectares to explore.', img: 'main-house-arcade' },
      { t: 'Birthdays & celebrations at the bodega', d: 'Celebrate a birthday, an anniversary or a family occasion at the bodega: a guided tour of the winery, a tasting of our wines with local food, and the tasting room or the cellar all to yourselves. Tell us the number of guests and we will shape the evening with you.', img: 'gardens-aerial' },
    ],
    tradeTitle: 'Trade & wholesale',
    trade: 'Restaurants, hotels, wine shops and distributors: we supply our full range, including large formats. Send us a trade enquiry and we will get back to you with prices and availability.',
    tradeCta: 'Trade enquiry',
    cta: 'Tell us what you have in mind',
    ctaBtn: 'Send an enquiry',
  },

  contact: {
    eyebrow: 'Contact',
    title: 'Write to us',
    lead: 'Long stays, events, renting the equestrian complex, trade orders or a simple question: tell us what you have in mind and we will reply personally.',
    addressTitle: 'Address', phoneTitle: 'Telephone', emailTitle: 'Email',
    mapAlt: 'Map of Mallorca showing Es Fangar in the southeast of the island, between Felanitx and Manacor',
    openMaps: 'Open in Google Maps',
    bookingNote: 'Looking to book a tasting or one of our houses? You can do it online:',
  },

  form: {
    legend: 'Your enquiry',
    type: 'What is your enquiry about?',
    types: {
      'long-stay': 'Long stay: Main House or the whole finca (30+ nights)',
      events: 'Wedding, event or celebration',
      trade: 'Trade & wholesale order',
      equestrian: 'Rental of the equestrian complex',
      general: 'General enquiry',
    },
    name: 'Full name', email: 'Email', phone: 'Telephone', optional: '(optional)',
    company: 'Company', from: 'Arrival / date', to: 'Departure', guests: 'Number of guests', horses: 'Number of horses',
    message: 'Message', messageHint: 'Dates, number of people, anything we should know.',
    consent: 'I have read the <a href="{privacy}">privacy policy</a> and agree to Es Fangar using my details to answer this enquiry.',
    required: 'Required',
    submit: 'Send enquiry',
    sending: 'Sending…',
    errors: {
      summary: 'Please check the highlighted fields.',
      name: 'Please enter your name.',
      email: 'Please enter a valid email address, e.g. name@example.com.',
      message: 'Please write a short message (at least 10 characters).',
      consent: 'Please accept the privacy policy to send your enquiry.',
      dates: 'The departure date must be after the arrival date.',
    },
    successTitle: 'Thank you, your enquiry is on its way.',
    successText: 'We usually reply within one working day.',
    demo: 'Prototype: nothing was sent. On the live site this enquiry goes to management@es-fangar.com.',
  },

  legal: {
    title: 'Legal notice',
    draft: 'Draft for review by the company’s legal adviser.',
    body: `
<h2>Website owner</h2>
<p>In compliance with article 10 of Spanish Law 34/2002 on Information Society Services and Electronic Commerce (LSSI-CE), we inform you of the following details:</p>
<ul>
<li>Company name: FINCA ES FANGAR, SAU</li>
<li>Trade name: Finca Es Fangar</li>
<li>Registered address: Camino Son Prohens, s/n · 07209 Son Prohens (Felanitx) · Illes Balears · Spain</li>
<li>Tax ID (NIF): A08269060</li>
<li>Registered in the Mercantile Registry of Mallorca: sheet PM-51324, volume 2146, folio 122</li>
<li>Telephone: +34 971 58 19 38 · Email: info@es-fangar.com</li>
</ul>
<h2>Purpose</h2>
<p>This website presents the estate, its wines, experiences and accommodation, and allows the purchase of wine and the booking of visits. Anyone accessing it becomes a user and accepts these terms.</p>
<h2>Liability</h2>
<p>The owner is not liable for information manipulated or introduced by third parties, nor for content on third party websites linked from this site (such as booking platforms). Should you detect any unlawful content, please let us know so that it can be removed.</p>
<h2>Intellectual and industrial property</h2>
<p>The design, logos, texts, photographs and other content of this website belong to FINCA ES FANGAR, SAU or are used with authorisation. Their reproduction, distribution or transformation without prior written authorisation is prohibited.</p>
<h2>Sale of alcohol</h2>
<p>The sale of alcoholic beverages is restricted to persons aged 18 or over.</p>
<h2>Applicable law and jurisdiction</h2>
<p>Spanish law applies. Any dispute shall be submitted to the courts of Palma, without prejudice to the rights consumers may have under applicable regulations.</p>`,
  },

  privacy: {
    title: 'Privacy policy',
    draft: 'Draft for review by the company’s legal adviser.',
    body: `
<h2>Who is responsible for your data</h2>
<p>FINCA ES FANGAR, SAU (NIF A08269060), Camino Son Prohens, s/n, 07209 Son Prohens (Felanitx), Illes Balears, Spain. Contact: info@es-fangar.com.</p>
<h2>What data we collect and why</h2>
<ul>
<li><strong>Enquiry form:</strong> your name, email, optional telephone, the type of enquiry, any dates or numbers you provide and your message, only to answer your enquiry and, if you ask us to, prepare an offer. Legal basis: your consent and precontractual measures at your request (art. 6.1.a and 6.1.b GDPR).</li>
<li><strong>Online shop:</strong> orders are processed by Shopify, our ecommerce provider, to fulfil the contract of sale and meet our legal obligations (art. 6.1.b and 6.1.c GDPR). We never see or store your full card details.</li>
<li><strong>Bookings of tastings and tours:</strong> handled by Bókun, our booking provider, to manage your reservation (art. 6.1.b GDPR).</li>
<li><strong>Statistics:</strong> we measure visits with an analytics tool that respects your privacy that uses no cookies and stores no personal data.</li>
</ul>
<h2>How long we keep it</h2>
<p>Enquiries are kept for as long as needed to answer them and for up to 12 months afterwards, unless a contract follows. Order data is kept for the periods required by tax and commercial law.</p>
<h2>Who receives it</h2>
<p>Only the service providers mentioned above, acting on our behalf under data processing agreements. We do not sell your data. Some providers may process data outside the EU under the safeguards required by the GDPR.</p>
<h2>Your rights</h2>
<p>You may access, rectify or erase your data, object to or restrict its processing, request portability and withdraw consent at any time by writing to info@es-fangar.com. You can also lodge a complaint with the Spanish Data Protection Agency (www.aepd.es).</p>`,
  },

  cookies: {
    title: 'Cookie policy',
    draft: 'Draft for review by the company’s legal adviser.',
    body: `
<h2>Our approach</h2>
<p>This website uses only the cookies and local storage strictly necessary for it to work, for example, to remember the contents of your cart. These do not require consent.</p>
<h2>Statistics without cookies</h2>
<p>We measure visits with an analytics service that respects your privacy that sets no cookies and does not track you across websites.</p>
<h2>Third party services, only when you choose</h2>
<p>The booking calendar for tastings is provided by Bókun and is loaded on the Tastings page. Bókun may set its own cookies, as described in its privacy policy. Links to Airbnb and Vrbo take you to those websites, where their own cookie policies apply.</p>
<h2>Managing cookies</h2>
<p>You can delete or block cookies in your browser settings at any time.</p>`,
  },

  notFound: {
    title: 'This path leads nowhere',
    text: 'The page you are looking for has moved or never existed. Let us take you back to the finca.',
    cta: 'Back to the homepage',
  },
};
