export default {
  lang: 'es', locale: 'es_ES', langName: 'Español',

  ui: {
    skip: 'Saltar al contenido',
    menu: 'Menú', close: 'Cerrar',
    nav: { estate: 'La Finca', wines: 'Vinos', winery: 'La Bodega', experiences: 'Catas', stays: 'Alojamientos', equestrian: 'Hípica', events: 'Eventos', contact: 'Contacto' },
    enquire: 'Consultar', shopNow: 'Comprar ahora', nextPage: 'Siguiente', rangeTo: 'a',
    language: 'Idioma',
    cart: 'Cesta', openCart: 'Abrir la cesta', cartTitle: 'Tu cesta', cartEmpty: 'Tu cesta está vacía.',
    subtotal: 'Subtotal', shipping: 'Envío', free: 'Gratis', total: 'Total',
    freeLeft: n => `Añade ${n} más para disfrutar del envío gratuito en la UE.`,
    freeReached: 'Envío gratuito en la UE.',
    checkout: 'Pago seguro',
    checkoutNote: 'Prototipo: en la web definitiva este botón abre el pago seguro de Shopify.',
    remove: 'Eliminar', qty: 'Cantidad', increase: 'Aumentar cantidad', decrease: 'Reducir cantidad',
    addToCart: 'Añadir a la cesta', added: 'Añadido a la cesta',
    vintage: 'Añada', option: 'Elige', viewWine: 'Ver vino', allWines: 'Todos los vinos',
    pause: 'Pausar vídeo', play: 'Reproducir vídeo',
    home: 'Inicio',
    opensNew: '(se abre en una pestaña nueva)',
    taxNote: 'IVA incluido. Gastos de envío calculados al finalizar la compra.',
    footer: {
      tagline: 'Una finca privada y ecológica en el sureste de Mallorca, documentada desde el siglo XIV.',
      visit: 'Visítanos', explore: 'Descubre', follow: 'Síguenos',
      organic: 'Vinos ecológicos y veganos certificados · DO Pla i Llevant',
      legal: 'Aviso legal', privacy: 'Privacidad', cookies: 'Cookies',
      rights: 'Todos los derechos reservados.',
    },
    prototype: 'Prototipo — contenido en revisión',
    cursor: { view: "Ver", discover: "Descubrir", drag: "Arrastra" },
    marquee: ["Ecológico", "Vegano", "DO Pla i Llevant", "Felanitx", "Mallorca", "Desde el siglo XIV"],
  },

  meta: {
    home: { title: 'Es Fangar · Finca y bodega ecológica en Mallorca', description: 'Mil hectáreas de Mallorca ecológica: vinos veganos premiados, catas en bodega, casas privadas e instalaciones ecuestres de nivel olímpico cerca de Felanitx.' },
    estate: { title: 'La Finca · Es Fangar, Mallorca', description: 'De la Antigüedad romana a mil hectáreas ecológicas: historia, paisaje y reserva natural de Es Fangar, en el sureste de Mallorca.' },
    wines: { title: 'Vinos ecológicos de Mallorca · Tienda · Es Fangar Vins', description: 'Vinos ecológicos y veganos certificados de nuestra finca en Felanitx. Blancos, rosado, tintos y un blanco semidulce, con envío a toda la UE.' },
    winery: { title: 'La bodega y el método gravedad · Es Fangar Vins', description: 'Inaugurada en 2016, nuestra bodega por gravedad de 7.300 m² en Felanitx trabaja la uva sin bombas. Descubre cómo elaboramos nuestros vinos.' },
    experiences: { title: 'Catas de vino y visitas a bodega en Mallorca · Es Fangar', description: 'Visitas guiadas, catas y la experiencia de vendimia en Es Fangar Vins, Felanitx. Reserva online.' },
    stays: { title: 'Casas privadas en una finca mallorquina · Es Fangar', description: 'Tres casas privadas con piscina en una finca ecológica de mil hectáreas, además de la Casa Principal y la finca completa para estancias de 30 noches o más.' },
    equestrian: { title: 'Instalaciones ecuestres en Mallorca · Es Fangar', description: 'Alquila el complejo ecuestre completo de Es Fangar: picadero cubierto con especificaciones olímpicas, pista de doma, cuadras para unos 200 caballos y una pista de 380 metros. Organiza competiciones del más alto nivel.' },
    events: { title: 'Bodas y eventos · Es Fangar', description: 'Celebraciones privadas, bodas y encuentros de empresa entre los jardines, los patios, la capilla y la bodega de Es Fangar, Mallorca.' },
    contact: { title: 'Contacto y consultas · Es Fangar', description: 'Planifica una estancia larga, un evento, el alquiler del complejo ecuestre o un pedido profesional. Escríbenos y te responderemos personalmente.' },
    legal: { title: 'Aviso legal · Es Fangar', description: 'Aviso legal e información de la empresa FINCA ES FANGAR, SAU.' },
    privacy: { title: 'Política de privacidad · Es Fangar', description: 'Cómo Es Fangar recoge y protege los datos personales.' },
    cookies: { title: 'Política de cookies · Es Fangar', description: 'Qué cookies utiliza esta web y por qué.' },
    notFound: { title: 'Página no encontrada · Es Fangar', description: 'La página que buscas no existe.' },
  },

  home: {
    eyebrow: 'Felanitx · Mallorca · Desde el siglo XIV',
    title: 'Mil hectáreas de Mallorca <em>ecológica</em>',
    lead: 'Viñedos, pinares y una reserva natural protegida en el sureste de la isla. Elaboramos vinos ecológicos y veganos certificados y abrimos la finca a unos pocos huéspedes a la vez.',
    ctaWines: 'Descubre los vinos', ctaStay: 'Alójate en la finca',
    videoLabel: 'Vista aérea de la Casa Principal y sus jardines al atardecer',
    stats: [
      { n: '1.000', l: 'hectáreas de finca' },
      { n: '56', l: 'hectáreas de viñedo ecológico' },
      { n: '400+', l: 'hectáreas de reserva natural' },
      { n: '2016', l: 'inauguración de la bodega' },
    ],
    introTitle: 'Una finca, una forma de trabajar',
    intro: 'Es Fangar es una possessió histórica entre Felanitx y Manacor, documentada por primera vez en el siglo XIV. Hoy toda la finca se cultiva en ecológico: viñas, olivos y algarrobos, higueras, almendros y abejas comparten la tierra con el pinar salvaje.',
    pillarsTitle: 'Descubre Es Fangar',
    pillars: [
      { k: 'wines', t: 'Los vinos', d: 'Ecológicos, veganos y profundamente mediterráneos: de las autóctonas Callet, Manto Negro y Prensal Blanc al Chardonnay y el Syrah.' },
      { k: 'experiences', t: 'Catas y visitas', d: 'Recorre una de las bodegas más modernas de España y prueba los vinos donde nacen.' },
      { k: 'stays', t: 'Alojamientos', d: 'Tres casas privadas con piscina propia y la Casa Principal para estancias largas.' },
      { k: 'equestrian', t: 'Hípica', d: 'Pistas de nivel olímpico, cuadras y una pista de 380 metros: el complejo completo se alquila para competiciones y entrenamientos.' },
    ],
    winesTitle: 'De nuestra bodega',
    winesLead: 'Todas las botellas son ecológicas y veganas certificadas: nunca clarificamos con gelatina ni clara de huevo.',
    bodegaEyebrow: 'Es Fangar Vins · Felanitx',
    bodegaTitle: 'Una bodega pensada para la gravedad',
    bodegaText: 'Inaugurada en 2016 tras nueve años de pruebas, nuestra bodega mueve la uva y el vino sin bombas, con suavidad, de un nivel a otro. Siete mil trescientos metros cuadrados de arquitectura al servicio de una sola idea: respetar el fruto.',
    bodegaCta: 'Conoce la bodega',
    staysTitle: 'Alójate en una finca viva',
    staysLead: 'Cada casa está separada de las demás, con su propia terraza y piscina. Las playas de Porto Colom quedan a ocho minutos.',
    staysCta: 'Ver las casas',
    landTitle: 'Cultivado en la finca',
    landLead: 'Más allá de las viñas, la finca produce lo que Mallorca ha producido siempre. Pregúntanos por ellos en tu visita.',
    land: [
      { t: 'Aceite de oliva', d: 'De olivares centenarios, en cultivo ecológico.' },
      { t: 'Miel', d: 'De nuestras propias colmenas, entre pinos, romero y hierbas silvestres.' },
      { t: 'Higos', d: 'Variedades mallorquinas tradicionales, recogidas al final del verano.' },
      { t: 'Almendras', d: 'De los almendros que florecen en toda la finca cada febrero.' },
    ],
    visitTitle: 'Cómo llegar',
    visitText: 'En la carretera entre Felanitx y Son Macià. El aeropuerto de Palma está a unos 45 minutos en coche.',
    visitCta: 'Contacta con nosotros',
  },

  estate: {
    eyebrow: 'La Finca',
    title: 'Nueve siglos sobre una misma tierra',
    lead: 'La mayor finca privada de Mallorca, cultivada íntegramente con criterios ecológicos, y uno de los paisajes más extraordinarios del sureste de la isla.',
    historyTitle: 'Breve historia',
    timeline: [
      { y: 'Antigüedad', t: 'Las investigaciones de los propietarios sitúan el origen de la finca en época romana.' },
      { y: 'Siglo XIV', t: 'Primera mención escrita: los cereales y el vino de la finca abastecían a la comunidad local.' },
      { y: 'Siglo XIX', t: 'La filoxera arrasa casi todos los viñedos de la isla; solo sobreviven los restos de una antigua bodega.' },
      { y: '2004', t: 'Se replantan las primeras viñas en las colinas de la finca, con variedades autóctonas e internacionales.' },
      { y: '2007', t: 'Se construye una bodega experimental para aprender de cada añada antes de construir a largo plazo.' },
      { y: '2009', t: 'Salen a la venta los primeros vinos de Es Fangar; los primeros premios llegan en 2012.' },
      { y: '2016', t: 'Abre sus puertas la nueva bodega por gravedad en Felanitx.' },
    ],
    landscapeTitle: 'Bosque, campos y una reserva protegida',
    landscape: 'Cuando los actuales propietarios adquirieron Es Fangar encontraron un lugar único: una reserva natural protegida de más de 400 hectáreas, amplios campos y bosques salvajes de pinos, olivos y algarrobos. La finca abarca unas 1.000 hectáreas entre los municipios de Manacor y Felanitx.',
    organicTitle: 'Ecológicos por convicción',
    organic: 'La agricultura sostenible y ecológica es nuestra prioridad en toda la finca. Viñas, olivares, almendros, higueras y colmenas se gestionan sin química de síntesis, en un paisaje que queremos legar a la próxima generación mejor de lo que lo encontramos.',
    selfTitle: 'Pensada para ser autosuficiente',
    self: [
      { n: '100 kW', l: 'de instalación fotovoltaica' },
      { n: '9', l: 'pozos legalizados con depuración de agua' },
      { n: '56 ha', l: 'de viñedo, y creciendo' },
    ],
    gardensTitle: 'Los jardines de la Casa Principal',
    gardens: 'Alrededor de la Casa Principal, jardines formales, avenidas de palmeras y patios tranquilos descienden hasta una piscina climatizada de mosaico Bisazza: el corazón de la finca al atardecer.',
    ctaTitle: 'Ven a conocerla',
    ctaText: 'Prueba los vinos en la bodega o alójate en una de nuestras casas.',
  },

  wines: {
    eyebrow: 'Es Fangar Vins · Tienda',
    title: 'Vinos ecológicos del corazón de Mallorca',
    lead: 'Ecológicos, veganos y vegetarianos certificados. Del Moscatel más fresco a un Gran Reserva con 32 meses en barrica.',
    filterLabel: 'Filtrar vinos',
    filters: { all: 'Todos', white: 'Blancos', rose: 'Rosado', red: 'Tintos', sweet: 'Semidulce', offers: 'Ofertas' },
    count: n => `${n} ${n === 1 ? 'vino' : 'vinos'}`,
    offerEyebrow: 'Oferta', offerTitle: 'TwentyTwelve · 12 botellas por 90 €',
    offerText: 'Doce botellas de TwentyTwelve Pink o White a mitad de precio: para el verano, para los amigos, para la bodega. Hasta agotar existencias.',
    offerSave: 'Ahorra 90 €',
    shipTitle: 'Envíos',
    ship: [
      'Envío a toda la Unión Europea',
      'Tarifa plana de 14,90 € · gratis desde 89 €',
      'España 2 a 3 días · UE 3 a 7 días',
      'También disponibles en nuestra bodega de Felanitx',
    ],
    tradeTitle: 'Restaurantes, vinotecas y distribuidores',
    tradeText: 'Para precios profesionales, pedidos mayores y grandes formatos, envíanos una consulta.',
    tradeCta: 'Consulta profesional',
  },

  wine: {
    notes: 'Nota de cata', color: 'Color', nose: 'Nariz', palate: 'Boca',
    details: 'Ficha', varieties: 'Variedades', type: 'Tipo', abv: 'Alcohol', temp: 'Temperatura de servicio', pairing: 'Maridaje', sugar: 'Azúcar residual',
    more: 'Más vinos',
    seoCat: { white: "Vino blanco ecológico de Mallorca", rose: "Rosado ecológico de Mallorca", red: "Vino tinto ecológico de Mallorca", sweet: "Vino semidulce ecológico de Mallorca" },
    seoTail: "Ecológico y vegano certificado, de Felanitx. Envío a toda la UE.",
    vintage: "Añada",
    cats: { white: 'Blanco', rose: 'Rosado', red: 'Tinto', sweet: 'Blanco semidulce' },
    organic: 'Ecológico certificado · Vegano',
  },

  wineText: {
    'twentytwelve-white': { type: 'Moscatel seco joven', short: 'Floral, albaricoque fresco, un toque de mermelada de naranja.',
      desc: 'De nuestro viñedo de Moscatel, que recibe las brisas de la costa y le aporta una frescura extraordinaria. Un Moscatel seco, profundamente mediterráneo y de gran finura en los detalles.',
      color: 'Amarillo pálido delicado con reflejos verdosos.', nose: 'Notas florales con albaricoque fresco y un toque de mermelada de naranja.', palate: 'Volumen elegante en armonía con la acidez natural y un punto mineral; vibrante y versátil.', pairing: 'Tumbet mallorquín, paella de marisco' },
    'twentytwelve-pink': { type: 'Rosado', short: 'Fresa, frambuesa, granada y hierbas.',
      desc: 'Un rosado intenso y expresivo, con estructura. La fruta roja fresca y las hierbas mediterráneas lo unen al paisaje del viñedo; su acidez vibrante lo hace muy gastronómico.',
      color: 'Rosa intenso y atractivo.', nose: 'Fresas y frambuesas frescas, toques de sandía, granada y hierbas mediterráneas.', palate: 'Acidez vibrante y boca estructurada; intenso y elegante.', pairing: 'Frito mallorquín, pollo a la provenzal' },
    'sa-sivina': { type: 'Blanco de variedades autóctonas', short: 'Hierbas silvestres, melocotón, albaricoque; marcada mineralidad.',
      desc: 'Nuestra apuesta clara por las variedades autóctonas de la isla. Fresco y expresivo, de carácter profundamente mediterráneo, con potencia y complejidad gracias a su marcada mineralidad.',
      color: 'Amarillo pálido con reflejos dorados.', nose: 'Hierbas mediterráneas silvestres y fruta de verano —melocotón, albaricoque, melón— con un final ligeramente especiado.', palate: 'Mineral y armonioso, con buena acidez, volumen agradable y un final vibrante.', pairing: 'Sopas mallorquinas, salmón a la plancha con salsa de mostaza y miel' },
    'sa-fita': { type: 'Blanco con breve paso por roble', short: 'Melocotón amarillo, piña, pomelo; almendra.',
      desc: 'Un viaje por el bosque espeso con la brisa del mar. La mezcla ideal de las variedades blancas que cultivamos: delicado, vibrante e inconfundiblemente mallorquín.',
      color: 'Amarillo pálido con matices verdosos y gran brillo.', nose: 'Melocotón amarillo y piña con toques cítricos de pomelo.', palate: 'Fresco y vibrante, con especias dulces y almendra de su breve paso por roble; vivo y gastronómico.', pairing: 'Sopa de peix, risotto de boletus' },
    'lo-cortinello': { type: 'Blanco fermentado en barrica', short: 'Albaricoque, frutos secos, especias dulces, final meloso.',
      desc: 'Brillante y dorado, se abre con el albaricoque típico del Viognier antes de mostrar frutos secos, especias dulces y un matiz meloso. Buen cuerpo, acidez vibrante y un final largo y equilibrado.',
      color: 'Amarillo brillante con destellos dorados.', nose: 'Albaricoque y, después, frutos secos, especias dulces y un suave matiz meloso.', palate: 'Buen cuerpo, acidez vibrante y gran complejidad que evoluciona en la copa; largo y equilibrado.', pairing: 'Arròs brut, solomillo Wellington' },
    'genesis-semi-dolc': { type: 'Blanco semidulce', short: 'Albaricoque, piña, jazmín; fresco y sedoso.',
      desc: 'Un blanco semidulce de gran finura: fruta fresca intensa y flores blancas, una textura envolvente y una frescura que invita a seguir bebiendo.',
      color: 'Amarillo claro con tonos cobrizos.', nose: 'Albaricoque, piña, melocotón, un toque de plátano y jazmín.', palate: 'Muy equilibrado, fresco y a la vez envolvente, con un final medio.', pairing: 'Postres, quesos, carnes blancas' },
    'son-p': { type: 'Tinto con crianza breve', short: 'Cereza, fresa, pimienta negra, balsámico.',
      desc: 'Las autóctonas Manto Negro y Callet protagonizan este vino. Una crianza breve le aporta una sutil complejidad; fruta, especias y notas balsámicas que hablan de Mallorca. Fresco, suave y de menor graduación.',
      color: 'Rojo granate de capa media.', nose: 'Cereza fresca y mermelada de fresa, pimienta negra y delicadas notas balsámicas.', palate: 'Fresco, equilibrado y suave, con buena acidez: un vino para descubrir sorbo a sorbo.', pairing: 'Paletilla de cordero asada con hierbas, lasaña de verduras' },
    'fangar-elements': { type: 'Tinto Reserva · 24 meses en barrica', short: 'Frutos rojos y negros del bosque; sedoso y largo.',
      desc: 'Todas las variedades tintas de la finca, autóctonas y bien adaptadas, unidas durante una larga crianza en barrica. El clima mediterráneo y el paisaje que nos rodea, en un vino elegante.',
      color: 'Rojo cereza brillante con reflejos teja.', nose: 'Gran expresión frutal: frutos rojos y negros del bosque.', palate: 'Taninos maduros y sedosos; fruta y madera en equilibrio; elegante, redondo y largo.', pairing: 'Ternera con sobrasada, guiso de caza' },
    'n-amarat': { type: 'Tinto Gran Reserva · 32 meses en barrica', short: 'Compota de fruta, especias, cacao, cuero, trufa.',
      desc: 'Nuestra apuesta por la elegancia. Los suelos franco-arcillosos y el cultivo ecológico dan taninos maduros, redondos y firmes; la larga crianza en barrica construye una gran complejidad en nariz y en boca.',
      color: 'Rojo teja con reflejos terracota; brillante.', nose: 'Compota de fruta, frambuesas en licor, especias, hierbas mediterráneas, regaliz, cacao, cuero elegante y un toque de trufa blanca.', palate: 'Intenso, estructurado y maduro, con una agradable astringencia.', pairing: 'Lechona asada, coulant de chocolate' },
  },

  winery: {
    eyebrow: 'Es Fangar Vins',
    title: 'La bodega',
    lead: 'Una de las bodegas más modernas de España, donde la tradición vinícola centenaria se une a una tecnología precisa y respetuosa.',
    storyTitle: 'Doce años de paciencia',
    story: 'Tras los excelentes resultados de una primera bodega experimental construida en 2007, la nueva bodega Es Fangar Vins se inauguró en abril de 2016, después de tres años de obras. Su diseño y su capacidad responden a una ambición: unir tradición y modernidad sin concesiones. Hoy nos visitan desde todo el mundo por los vinos y por la arquitectura.',
    gravityTitle: 'Métode Gravetat',
    gravityLead: 'El método gravedad se basa en un principio sencillo: dejar que la gravedad trabaje. Durante todo el proceso evitamos bombear la uva y el vino, preservando su integridad.',
    steps: [
      { t: 'Selección manual', d: 'La uva que llega del viñedo se selecciona cuidadosamente a mano antes del prensado o de pasar a grandes contenedores.' },
      { t: 'Por el aire', d: 'Una grúa diseñada para nuestra bodega eleva los contenedores y los traslada por raíles en el techo hasta los depósitos de acero inoxidable, donde empieza la fermentación.' },
      { t: 'Suavidad por diseño', d: 'Tratar la uva con la máxima delicadeza evita la oxidación prematura: la clave de unos vinos aromáticos que conservan todo su carácter natural.' },
    ],
    roomTitle: 'La sala de elaboración',
    room: 'Amplia y en varios niveles, la sala de elaboración nos permite trabajar cada variedad en su propia zona, sin contaminación cruzada. La limpieza y la calidad de los equipos son fundamentales en cada añada.',
    factsTitle: 'En cifras',
    facts: [
      { n: '7.300 m²', l: 'en cuatro niveles' },
      { n: '≈190', l: 'barricas de 225 a 500 litros' },
      { n: '6.000 L', l: 'grandes fudres' },
      { n: '56 ha', l: 'de viñedo ecológico' },
    ],
    machinery: 'El prensado y la elaboración se apoyan en equipos de Bucher Vaslin, elegidos por un manejo cuidadoso y preciso que mantiene intacto el fruto.',
    varietiesTitle: 'Qué cultivamos',
    varieties: 'El sol cálido y la brisa salina del mar marcan el carácter de nuestras uvas. Las variedades principales son Chardonnay, Prensal Blanc, Cabernet Sauvignon y Callet, junto a Giró Ros, Manto Negro, Moscatel, Viognier, Syrah y Merlot.',
    philosophyTitle: 'Ecológicos, veganos, vegetarianos',
    philosophy: 'Todos nuestros vinos son ecológicos, veganos y vegetarianos certificados. Nunca clarificamos con gelatina animal ni clara de huevo: algo importante para las personas con alergias y, para nosotros, una cuestión de principios.',
    cta: 'Reserva una cata en la bodega',
  },

  experiences: {
    eyebrow: 'Visita la bodega',
    title: 'Catas, visitas y vendimia',
    lead: 'Cada visita empieza con la historia de nuestros vinos y un paseo por la bodega. Después, servimos.',
    items: [
      { t: 'Visita y cata', d: 'Recorrido guiado por la bodega por gravedad (sala de elaboración, sala de barricas y sala de catas), seguido de una cata de nuestros vinos. Hay varios formatos disponibles.', img: 'winery-tasting-room' },
      { t: 'Vendimia en Es Fangar', d: 'En época de vendimia, recoge uva en nuestros viñedos ecológicos, prueba los vinos y comparte una comida en la finca. Varias opciones y precios cada temporada.', img: 'vines-closeup' },
      { t: 'Visitas privadas y de grupo', d: 'Catas a medida para grupos privados y empresas, en la vinoteca o en la sala de barricas.', img: 'winery-barrels' },
    ],
    bookTitle: 'Consulta disponibilidad y reserva',
    bookText: 'Elige una fecha para ver la disponibilidad en tiempo real y reservar tu visita en pocos clics.',
    bookFact1: 'Visita guiada a nuestra bodega por gravedad', bookFact2: 'Cata de nuestros vinos ecológicos y veganos', bookFact3: 'A 45 minutos de Palma, con reserva previa',
    bookButton: 'Ver disponibilidad',
    bookConsent: 'El calendario de reservas lo proporciona Bókun (bokun.io), que puede instalar sus propias cookies. Consulta nuestra política de cookies.',
    bookDemo: 'Nota del prototipo: este es el sistema de reservas real; por favor, no completes ninguna reserva durante la demo.',
    loading: 'Cargando el calendario de reservas…',
    groupTitle: '¿Un grupo privado o una empresa?',
    groupText: 'Escríbenos y diseñaremos la visita contigo.',
    groupCta: 'Enviar una consulta',
    practicalTitle: 'Información práctica',
    practical: [
      'Visitas solo con reserva previa.',
      'La bodega está en el Camino Son Prohens, Felanitx, a unos 45 minutos de Palma.',
      'Recuerda organizar un conductor: las catas y la conducción no combinan.',
    ],
  },

  stays: {
    eyebrow: 'Alojamientos',
    title: 'Alójate en la finca',
    lead: 'Casas privadas en la mayor finca de Mallorca gestionada en ecológico. Viñedos, pinares y mil hectáreas de silencio.',
    bedrooms: n => `${n} dormitorios`, guests: n => `${n} huéspedes`,
    bookOn: 'Reservar en', licence: 'Licencia turística', licencePending: 'número pendiente',
    houses: {
      'arabic-house': { tagline: 'Detalle morisco, confort contemporáneo',
        desc: 'Una casa de dos plantas con chimeneas, cocina totalmente equipada y cine privado. Fuera: terrazas y dos azoteas, cocina de verano y barbacoa, piscina con pabellón y una sala de masajes.',
        features: ['Piscina privada', 'Cine privado', 'Dos azoteas', 'Sala de masajes', 'Cocina de verano y barbacoa'] },
      'mallorcan-house': { tagline: 'Carácter tradicional, vida moderna',
        desc: 'Luminosa y cálida, con un salón acogedor y chimenea de piedra que se abre a un amplio comedor. Varias terrazas para la sombra, las comidas y el sol, alrededor de una piscina privada en un jardín mediterráneo con césped.',
        features: ['Piscina privada', 'Chimenea de piedra', 'Varias terrazas', 'Cocina completa', 'Lavadora y secadora'] },
      'the-lodge': { tagline: 'La estancia más tranquila de la finca',
        desc: 'Apartada de las demás casas y rodeada de pinar y monte bajo. Dos dormitorios y un luminoso salón con cocina abierta miran a los árboles; una pequeña piscina descansa en una terraza al borde del bosque.',
        features: ['Piscina privada', 'En pleno bosque', 'Privacidad total', 'Salón con cocina abierta', 'Lavadora y secadora'] },
    },
    longTitle: 'La Casa Principal y la finca completa',
    longEyebrow: 'Estancias de 30 noches o más',
    long: 'Para estancias largas, la Casa Principal, o la finca entera, puede reservarse en privado. Más de 4.000 m² alrededor de un patio de palmeras, con una capilla restaurada que aún acoge ceremonias privadas, una piscina climatizada de 324 m² de mosaico Bisazza, un spa con piscina interior y sauna, pista de tenis, cine privado y jardines.',
    longFacts: ['Estancia mínima de 30 noches', 'Casa Principal o la finca completa', 'Tarifas bajo consulta'],
    longCta: 'Consultar una estancia larga',
    aroundTitle: 'Alrededor de la finca',
    around: [
      { t: 'Porto Colom', d: 'Las playas y el puerto están a unos 8 minutos; Cala Marçal y Mondragó, a un corto trayecto.' },
      { t: 'Felanitx', d: 'A pocos minutos en coche: un mercado muy animado el domingo por la mañana y buenos restaurantes para cenar.' },
      { t: 'Cómo llegar', d: 'El aeropuerto de Palma está a unos 45 minutos en coche. El coche es imprescindible.' },
    ],
  },

  equestrian: {
    eyebrow: 'Hípica',
    title: 'Instalaciones a la altura de la competición internacional',
    lead: 'Un complejo ecuestre entre olivares y pinos, que se alquila completo para competiciones del más alto nivel internacional.',
    facilitiesTitle: 'Las instalaciones',
    facilities: [
      { t: 'Picadero cubierto', d: 'Construido con especificaciones olímpicas, para entrenar con cualquier tiempo.' },
      { t: 'Pista de doma exterior', d: 'Con mantenimiento profesional, apta para eventos de nivel internacional.' },
      { t: 'Pista de carreras', d: '380 metros de longitud y 3 metros de ancho, para entrenamiento y carreras.' },
      { t: 'Caminador', d: 'Con control de velocidad regulable, para un acondicionamiento seguro y eficaz.' },
      { t: 'Cuadras', d: 'Capacidad para unos 200 caballos, con guadarnés y lavadero de mantas.' },
      { t: 'Servicios', d: 'Taller de herrador, oficinas para instructores, almacenamiento de agua y amplios almacenes.' },
    ],
    bringTitle: 'Alquila el complejo completo',
    bring: 'El complejo ecuestre completo se puede alquilar en exclusiva. Acoge con regularidad competiciones de las mejores categorías del mundo, y es igual de adecuado para un stage de entrenamiento o una temporada entera. Al alquilar el complejo, vienes con tus propios caballos.',
    bringCta: 'Consultar el alquiler del complejo',
  },

  events: {
    eyebrow: 'Eventos',
    title: 'Celebraciones y encuentros en la finca',
    lead: 'Jardines, patios, una capilla y una bodega: Es Fangar puede acoger momentos importantes, en privado.',
    items: [
      { t: 'Bodas y ceremonias privadas', d: 'La capilla restaurada de la Casa Principal aún acoge ceremonias privadas; los jardines y los patios hacen el resto.', img: 'main-house-night-front' },
      { t: 'Encuentros de empresa', d: 'Retiros, reuniones e incentivos con catas en la bodega, mesas largas bajo los porches y mil hectáreas por descubrir.', img: 'main-house-arcade' },
      { t: 'Cumpleaños y celebraciones en la bodega', d: 'Celebra un cumpleaños, un aniversario o una ocasión familiar en la bodega: visita guiada, cata de nuestros vinos con productos locales y la sala de catas o la bodega solo para vosotros. Dinos cuántos invitados seréis y preparamos la velada contigo.', img: 'gardens-aerial' },
    ],
    tradeTitle: 'Venta profesional',
    trade: 'Restaurantes, hoteles, vinotecas y distribuidores: suministramos toda nuestra gama, incluidos los grandes formatos. Envíanos una consulta profesional y te responderemos con precios y disponibilidad.',
    tradeCta: 'Consulta profesional',
    cta: 'Cuéntanos qué tienes en mente',
    ctaBtn: 'Enviar una consulta',
  },

  contact: {
    eyebrow: 'Contacto',
    title: 'Escríbenos',
    lead: 'Estancias largas, eventos, el alquiler del complejo ecuestre, pedidos profesionales o una simple pregunta: cuéntanos qué tienes en mente y te responderemos personalmente.',
    addressTitle: 'Dirección', phoneTitle: 'Teléfono', emailTitle: 'Email',
    mapAlt: 'Mapa de Mallorca con la ubicación de Es Fangar en el sureste de la isla, entre Felanitx y Manacor',
    openMaps: 'Abrir en Google Maps',
    bookingNote: '¿Quieres reservar una cata o una de nuestras casas? Puedes hacerlo online:',
  },

  form: {
    legend: 'Tu consulta',
    type: '¿Sobre qué es tu consulta?',
    types: {
      'long-stay': 'Estancia larga: Casa Principal o la finca completa (30+ noches)',
      events: 'Boda, evento o celebración',
      trade: 'Pedido profesional',
      equestrian: 'Alquiler del complejo ecuestre',
      general: 'Consulta general',
    },
    name: 'Nombre y apellidos', email: 'Email', phone: 'Teléfono', optional: '(opcional)',
    company: 'Empresa', from: 'Llegada / fecha', to: 'Salida', guests: 'Número de personas', horses: 'Número de caballos',
    message: 'Mensaje', messageHint: 'Fechas, número de personas, cualquier cosa que debamos saber.',
    consent: 'He leído la <a href="{privacy}">política de privacidad</a> y acepto que Es Fangar utilice mis datos para responder a esta consulta.',
    required: 'Obligatorio',
    submit: 'Enviar consulta',
    sending: 'Enviando…',
    errors: {
      summary: 'Revisa los campos marcados.',
      name: 'Escribe tu nombre.',
      email: 'Escribe un email válido, por ejemplo nombre@ejemplo.com.',
      message: 'Escribe un breve mensaje (al menos 10 caracteres).',
      consent: 'Acepta la política de privacidad para enviar tu consulta.',
      dates: 'La fecha de salida debe ser posterior a la de llegada.',
    },
    successTitle: 'Gracias, tu consulta está en camino.',
    successText: 'Normalmente respondemos en un día laborable.',
    demo: 'Prototipo: no se ha enviado nada. En la web definitiva la consulta llega a management@es-fangar.com.',
  },

  legal: {
    title: 'Aviso legal',
    draft: 'Borrador pendiente de revisión por el asesor jurídico de la empresa.',
    body: `
<h2>Titular del sitio web</h2>
<p>En cumplimiento del artículo 10 de la Ley 34/2002, de Servicios de la Sociedad de la Información y de Comercio Electrónico (LSSI-CE), le informamos de los siguientes datos:</p>
<ul>
<li>Denominación social: FINCA ES FANGAR, SAU</li>
<li>Nombre comercial: Finca Es Fangar</li>
<li>Domicilio: Camino Son Prohens, s/n · 07209 Son Prohens (Felanitx) · Illes Balears · España</li>
<li>NIF: A08269060</li>
<li>Inscrita en el Registro Mercantil de Mallorca: hoja PM-51324, tomo 2146, folio 122</li>
<li>Teléfono: +34 971 58 19 38 · Email: info@es-fangar.com</li>
</ul>
<h2>Objeto</h2>
<p>Este sitio web presenta la finca, sus vinos, experiencias y alojamientos, y permite la compra de vino y la reserva de visitas. Toda persona que accede a él adquiere la condición de usuario y acepta estas condiciones.</p>
<h2>Responsabilidad</h2>
<p>El titular no se responsabiliza de la información manipulada o introducida por terceros, ni de los contenidos de sitios web de terceros enlazados desde este sitio (como plataformas de reserva). Si detecta algún contenido ilícito, comuníquenoslo para proceder a su retirada.</p>
<h2>Propiedad intelectual e industrial</h2>
<p>El diseño, los logotipos, textos, fotografías y demás contenidos de este sitio web pertenecen a FINCA ES FANGAR, SAU o se utilizan con autorización. Queda prohibida su reproducción, distribución o transformación sin autorización previa y por escrito.</p>
<h2>Venta de alcohol</h2>
<p>La venta de bebidas alcohólicas está reservada a mayores de 18 años.</p>
<h2>Legislación aplicable y jurisdicción</h2>
<p>Se aplica la legislación española. Cualquier controversia se someterá a los juzgados y tribunales de Palma, sin perjuicio de los derechos que la normativa reconozca a los consumidores.</p>`,
  },

  privacy: {
    title: 'Política de privacidad',
    draft: 'Borrador pendiente de revisión por el asesor jurídico de la empresa.',
    body: `
<h2>Responsable del tratamiento</h2>
<p>FINCA ES FANGAR, SAU (NIF A08269060), Camino Son Prohens, s/n, 07209 Son Prohens (Felanitx), Illes Balears, España. Contacto: info@es-fangar.com.</p>
<h2>Qué datos tratamos y para qué</h2>
<ul>
<li><strong>Formulario de consulta:</strong> nombre, email, teléfono opcional, tipo de consulta, las fechas o cifras que indiques y tu mensaje, únicamente para responder a tu consulta y, si lo solicitas, preparar una propuesta. Base jurídica: tu consentimiento y la aplicación de medidas precontractuales a petición tuya (art. 6.1.a y 6.1.b RGPD).</li>
<li><strong>Tienda online:</strong> los pedidos los gestiona Shopify, nuestro proveedor de comercio electrónico, para ejecutar el contrato de compraventa y cumplir nuestras obligaciones legales (art. 6.1.b y 6.1.c RGPD). Nunca vemos ni guardamos los datos completos de tu tarjeta.</li>
<li><strong>Reservas de catas y visitas:</strong> las gestiona Bókun, nuestro proveedor de reservas, para tramitar tu reserva (art. 6.1.b RGPD).</li>
<li><strong>Estadísticas:</strong> medimos las visitas con una herramienta de analítica respetuosa con la privacidad que no utiliza cookies ni guarda datos personales.</li>
</ul>
<h2>Cuánto tiempo los conservamos</h2>
<p>Las consultas se conservan el tiempo necesario para responderlas y hasta 12 meses después, salvo que den lugar a un contrato. Los datos de los pedidos se conservan durante los plazos exigidos por la normativa fiscal y mercantil.</p>
<h2>Destinatarios</h2>
<p>Solo los proveedores indicados, que actúan por nuestra cuenta con contratos de encargo de tratamiento. No vendemos tus datos. Algunos proveedores pueden tratar datos fuera de la UE con las garantías exigidas por el RGPD.</p>
<h2>Tus derechos</h2>
<p>Puedes acceder, rectificar o suprimir tus datos, oponerte a su tratamiento o limitarlo, solicitar la portabilidad y retirar tu consentimiento en cualquier momento escribiendo a info@es-fangar.com. También puedes presentar una reclamación ante la Agencia Española de Protección de Datos (www.aepd.es).</p>`,
  },

  cookies: {
    title: 'Política de cookies',
    draft: 'Borrador pendiente de revisión por el asesor jurídico de la empresa.',
    body: `
<h2>Nuestro enfoque</h2>
<p>Este sitio web utiliza únicamente las cookies y el almacenamiento local estrictamente necesarios para funcionar, por ejemplo para recordar el contenido de tu cesta. No requieren consentimiento.</p>
<h2>Estadísticas sin cookies</h2>
<p>Medimos las visitas con un servicio de analítica respetuoso con la privacidad que no instala cookies ni te sigue por otros sitios web.</p>
<h2>Servicios de terceros, solo si tú lo decides</h2>
<p>El calendario de reservas de catas lo proporciona Bókun y se carga en la página Catas. Bókun puede instalar sus propias cookies, según su política de privacidad. Los enlaces a Airbnb y Vrbo te llevan a esos sitios, donde se aplican sus propias políticas de cookies.</p>
<h2>Gestión de cookies</h2>
<p>Puedes eliminar o bloquear las cookies en la configuración de tu navegador en cualquier momento.</p>`,
  },

  notFound: {
    title: 'Este camino no lleva a ninguna parte',
    text: 'La página que buscas se ha movido o nunca existió. Te acompañamos de vuelta a la finca.',
    cta: 'Volver al inicio',
  },
};
