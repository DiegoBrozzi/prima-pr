import type { UI } from './it';

const es: UI = {
  meta: {
    home: {
      title: 'Maquinaria de cartonaje nueva y usada | Primatech, Italia',
      description:
        'Troqueladoras automáticas, estampación en caliente, plegadoras-engomadoras, laminadoras y flexográficas, nuevas y usadas. Más de 60 años de experiencia.',
    },
    machines: {
      title: 'Catálogo de maquinaria de cartonaje nueva | Primatech',
      description:
        'Troqueladoras automáticas, estampación en caliente, plegadoras-engomadoras, laminadoras y flexográficas: modelos Made in Italy e importación exclusiva.',
    },
    used: {
      title: 'Maquinaria de cartonaje usada y revisada | Primatech',
      description:
        'Troqueladoras y maquinaria de cartonaje usada, revisada en nuestro taller. También compramos y retiramos su máquina usada.',
    },
    parts: {
      title: 'Recambios SBL y Varimatrix | Primatech',
      description:
        'Recambios para troqueladoras, máquinas de estampación en caliente y plegadoras-engomadoras SBL y Varimatrix. Indíquenos modelo y número de serie.',
    },
    services: {
      title: 'Asistencia técnica, formación y actualizaciones | Primatech',
      description:
        'Mantenimiento, reparación, formación de operarios y actualizaciones técnicas para maquinaria de cartonaje, en Italia y en el extranjero.',
    },
    company: {
      title: 'Más de 60 años en el cartonaje | Primatech, Italia',
      description:
        'Primatech diseña en Italia e importa maquinaria de cartonaje, con cientos de instalaciones en Europa, América y Asia.',
    },
    contact: {
      title: 'Contacto y solicitud de presupuesto | Primatech',
      description:
        'Solicite un presupuesto, una ficha técnica, asistencia o recambios. Primatech srl, Sant’Andrea delle Fratte (Perugia, Italia).',
    },
    thanks: { title: 'Solicitud enviada | Primatech', description: 'Gracias por contactarnos.' },
    privacy: { title: 'Política de privacidad | Primatech', description: 'Tratamiento de los datos personales.' },
    cookies: { title: 'Política de cookies | Primatech', description: 'Uso de cookies en este sitio.' },
    notFound: { title: 'Página no encontrada | Primatech', description: 'La página solicitada no existe.' },
  },

  nav: {
    machines: 'Máquinas',
    used: 'Usadas',
    parts: 'Recambios',
    services: 'Servicios',
    company: 'Empresa',
    contact: 'Contacto',
    cta: 'Solicitar presupuesto',
    menu: 'Menú',
    close: 'Cerrar menú',
    skip: 'Ir al contenido',
    language: 'Idioma',
    home: 'Inicio',
    main: 'Navegación principal',
  },

  common: {
    call: 'Llamar',
    write: 'Escríbanos',
    whatsapp: 'WhatsApp',
    requestInfo: 'Solicitar información',
    requestSheet: 'Solicitar la ficha técnica',
    downloadSheet: 'Descargar la ficha técnica (PDF)',
    discover: 'Descubrir',
    viewAll: 'Ver todo el catálogo',
    madeInItaly: 'Made in Italy',
    imported: 'Importación',
    photoSoon: 'Foto próximamente',
    models: '{n} modelos',
    model: '{n} modelo',
    specs: 'Datos técnicos',
    features: 'Características principales',
    related: 'Otras máquinas de la misma categoría',
    vat: 'NIF-IVA',
    address: 'Sede',
    phone: 'Teléfono',
    email: 'Correo electrónico',
    breadcrumb: 'Ruta de navegación',
    filter: 'Filtrar por categoría',
    all: 'Todas',
    openMaps: 'Abrir en Google Maps',
    newWindow: '(se abre en una ventana nueva)',
    showing: 'Modelos mostrados: {n}',
  },

  langBanner: {
    text: 'Este sitio también está disponible en español.',
    go: 'Cambiar a español',
    dismiss: 'No, gracias',
  },

  specs: {
    sheetMax: 'Formato máx. de hoja',
    sheetMin: 'Formato mín. de hoja',
    printArea: 'Área de estampación',
    pressure: 'Presión máx.',
    speed: 'Velocidad máx.',
    accuracy: 'Precisión',
    register: 'Registro',
    materials: 'Materiales',
    power: 'Potencia instalada',
  },

  categories: {
    'hot-foil': {
      name: 'Estampación en caliente',
      long: 'Máquinas automáticas de estampación en caliente',
      singular: 'Máquina automática de estampación en caliente',
      intro:
        'Máquinas automáticas de estampación en caliente para ennoblecer estuches, etiquetas y envases de alta gama, con registro preciso y tiempos de preparación reducidos.',
    },
    'die-cutting': {
      name: 'Troqueladoras',
      long: 'Troqueladoras automáticas con expulsión',
      singular: 'Troqueladora automática',
      intro:
        'Troqueladoras automáticas planas para papel, cartoncillo, cartón compacto y ondulado, con expulsión de recortes y separación de poses.',
    },
    'folder-gluer': {
      name: 'Plegadoras-engomadoras',
      long: 'Plegadoras-engomadoras automáticas',
      singular: 'Plegadora-engomadora automática',
      intro:
        'Plegadoras-engomadoras automáticas para estuches y cajas de cartoncillo y microcanal, disponibles en varios anchos de trabajo, del formato compacto al gran formato.',
    },
    laminator: {
      name: 'Laminadoras',
      long: 'Máquinas laminadoras',
      singular: 'Laminadora automática',
      intro:
        'Líneas automáticas de laminado hoja a hoja para unir papel impreso con cartón ondulado o compacto, con alta productividad y registro preciso.',
    },
    flexo: {
      name: 'Flexográficas',
      long: 'Máquinas flexográficas',
      singular: 'Máquina flexográfica',
      intro:
        'Máquinas flexográficas para la impresión y el troquelado en línea de cartón ondulado, para cajas americanas y embalajes de transporte.',
    },
  },

  fallback: {
    description:
      'Disponible bajo pedido. Primatech se encarga directamente de la configuración, la entrega, la instalación y la asistencia: solicítenos la ficha técnica completa y una oferta a medida.',
    specsMissing:
      'La ficha técnica completa de este modelo está disponible bajo petición: escríbanos y se la enviaremos con las opciones de configuración.',
  },

  home: {
    eyebrow: 'Maquinaria de cartonaje · Perugia, Italia',
    h1: ['Más de 60 años', 'de precisión', 'para el cartonaje.'],
    lead: 'Diseñamos, fabricamos e importamos máquinas de troquelado, estampación en caliente y transformación del cartón. Nuevas, usadas y revisadas, con un servicio que acompaña a cada máquina durante toda su vida.',
    ctaPrimary: 'Descubrir las máquinas',
    ctaSecondary: 'Hablar con un técnico',
    scroll: 'Desplazar',
    stats: [
      { value: 60, suffix: '+', label: 'años de experiencia' },
      { value: 600, suffix: ' t', label: 'presión máxima' },
      { value: 5500, suffix: '', label: 'hojas por hora' },
      { value: 3, suffix: '', label: 'continentes' },
    ],
    madeEyebrow: 'Made in Italy',
    madeTitle: 'Diseñadas y patentadas en Italia.',
    madeLead:
      'Las máquinas Primatech nacen de nuestra experiencia en el taller: robustas, fáciles de manejar y competitivas tanto en tiradas cortas como en grandes volúmenes.',
    catalogEyebrow: 'Catálogo',
    catalogTitle: 'Una gama completa para la transformación.',
    catalogLead:
      'De la estampación en caliente a la plegadora-engomadora: máquinas fabricadas en Italia y modelos de importación exclusiva, seleccionados entre los mejores fabricantes.',
    usedCard: 'Máquinas usadas y revisadas',
    usedCardText: 'Retiradas, revisadas y garantizadas',
    valuesEyebrow: 'Nuestro enfoque',
    values: [
      {
        title: 'Global Attitude',
        text: 'Punto de referencia para el mercado italiano y presentes desde hace décadas en el comercio internacional: cientos de máquinas instaladas en Europa, América y Asia.',
      },
      {
        title: 'Smart',
        text: 'Nuestro departamento de I+D selecciona soluciones que combinan innovación, funcionalidad y construcción cuidada, y registra patentes para las máquinas fabricadas en Italia.',
      },
      {
        title: 'Passion',
        text: 'Más de 60 años de dedicación al cartonaje. La calidad, lo primero: desde la elección de los componentes hasta la de los proveedores.',
      },
    ],
    servicesEyebrow: 'Servicios',
    servicesTitle: ['No solo vendemos máquinas.', 'Las acompañamos.'],
    services: [
      {
        title: 'Nuevo',
        text: 'Máquinas Made in Italy y de importación exclusiva, configuradas para su producción, con una red de socios en cada continente.',
      },
      {
        title: 'Usado',
        text: 'Compramos, retiramos y revisamos máquinas usadas para devolverlas al mercado fiables y conformes.',
      },
      {
        title: 'Posventa',
        text: 'Mantenimiento, reparación, recambios y formación, con el apoyo técnico de BROZZI snc, en el sector desde hace más de seis décadas.',
      },
    ],
    servicesCta: 'Todos los servicios',
    sellEyebrow: 'Compraventa de usados',
    sellTitle: ['¿Vende una máquina?', 'Nosotros la valoramos.'],
    sellText:
      'Indíquenos modelo, año y estado: la valoramos, la retiramos y la revisamos. ¿Busca una máquina usada garantizada? Pregúntenos por la disponibilidad actual.',
    sellCta: 'Vender su máquina',
    sellCta2: 'Buscar una usada',
  },

  contactBand: {
    eyebrow: 'Contacto',
    title: ['Hablemos de', 'su producción.'],
    text: 'Cuéntenos qué produce, en qué formatos y materiales: le propondremos la solución adecuada, nueva o usada.',
    cta: 'Solicitar presupuesto',
  },

  machinesPage: {
    eyebrow: 'Catálogo de máquinas nuevas',
    title: 'Máquinas para el cartonaje.',
    lead: 'Máquinas diseñadas y patentadas en Italia y modelos de importación exclusiva, para cada fase de la transformación: estampación en caliente, troquelado, plegado-engomado, laminado y flexografía.',
    usedHint: '¿Busca una máquina usada?',
    usedHintCta: 'Ver las usadas disponibles',
    categoriesTitle: 'Categorías',
  },

  categoryPage: {
    eyebrow: 'Catálogo',
    usedIn: 'Usadas disponibles en esta categoría',
    allMachines: 'Todas las máquinas',
  },

  machinePage: {
    ctaTitle: '¿Le interesa esta máquina?',
    ctaText:
      'Escríbanos o llámenos: un técnico le responderá con disponibilidad, configuración y oferta, y si lo desea organizará una prueba de producción.',
    brand: 'Marca',
    category: 'Categoría',
    origin: 'Origen',
    originIt: 'Diseñada y fabricada en Italia',
    originImport: 'Importación exclusiva Primatech',
  },

  usedPage: {
    eyebrow: 'Usado garantizado',
    title: 'Máquinas usadas y revisadas.',
    lead: 'Compramos, retiramos y revisamos maquinaria de cartonaje usada en nuestro propio taller, para devolverla al mercado fiable y conforme. La disponibilidad cambia a menudo: si no encuentra el modelo que busca, pregúntenos.',
    status: { available: 'Disponible', negotiation: 'En negociación', sold: 'Vendida' },
    condition: {
      overhauled: 'Revisada',
      working: 'En funcionamiento, visible en producción',
      'as-is': 'Por revisar',
    },
    year: 'Año',
    format: 'Formato',
    location: 'Ubicación',
    conditionLabel: 'Estado',
    statusLabel: 'Disponibilidad',
    empty:
      'Actualmente no hay máquinas publicadas en esta categoría. Contáctenos: algunas disponibilidades aún no están en línea.',
    ask: 'Solicitar información sobre esta máquina',
    noDesc:
      'Pídanos detalles técnicos, más fotos y un vídeo de la máquina en funcionamiento. También podemos organizar una visita para verla en persona.',
    back: 'Volver a las usadas',
    notFoundTitle: '¿No encuentra el modelo que busca?',
    notFoundText: 'Muchas máquinas pasan por nuestro taller antes de publicarse. Díganos qué busca y le avisaremos en cuanto esté disponible.',
    notFoundCta: 'Buscar con nosotros',
  },

  partsPage: {
    eyebrow: 'Recambios',
    title: 'Recambios SBL y Varimatrix.',
    lead: 'Recambios para troqueladoras, máquinas de estampación en caliente y plegadoras-engomadoras. Indíquenos modelo y número de serie: identificamos la pieza correcta y le enviamos oferta y plazo de entrega.',
    stepsTitle: 'Cómo pedir un recambio',
    steps: [
      { title: 'Modelo y número de serie', text: 'Los encontrará en la placa de características de la máquina.' },
      { title: 'Foto o código de la pieza', text: 'Una foto del componente o el código del manual nos ayuda a no equivocarnos.' },
      { title: 'Oferta y envío', text: 'Le confirmamos precio, disponibilidad y plazo de entrega.' },
    ],
    brandsTitle: 'Marcas atendidas',
    brands: [
      { name: 'SBL', text: 'Recambios para troqueladoras, máquinas de estampación en caliente y plegadoras-engomadoras SBL.' },
      { name: 'Varimatrix', text: 'Recambios para troqueladoras Varimatrix, con décadas de experiencia en mantenimiento y revisiones.' },
    ],
    cta: 'Pedir un recambio',
  },

  servicesPage: {
    eyebrow: 'Servicios',
    title: 'A su lado durante toda la vida de la máquina.',
    lead: 'Desde la elección de la configuración hasta la formación de los operarios, desde el mantenimiento hasta las actualizaciones técnicas: un único interlocutor que conoce sus máquinas.',
    items: [
      {
        id: 'assistenza',
        title: 'Asistencia técnica',
        text: 'Mantenimiento general y reparación. Envíenos los datos y algunas fotos de la máquina: le responderemos con un primer diagnóstico y una intervención planificada.',
        cta: 'Abrir una solicitud',
      },
      {
        id: 'formazione',
        title: 'Formación',
        text: 'Formación técnica para sus operarios en las máquinas Primatech y en los modelos que importamos, para trabajar con seguridad y aprovechar todo su potencial.',
        cta: 'Organizar un curso',
      },
      {
        id: 'sviluppo',
        title: 'Investigación y desarrollo',
        text: 'Actualizaciones técnicas a medida con los accesorios más innovadores, para aumentar la eficiencia de las máquinas ya en producción.',
        cta: 'Cuéntenos su proyecto',
      },
      {
        id: 'post-vendita',
        title: 'Posventa y recambios',
        text: 'Recambios y soporte técnico con BROZZI snc, en el sector desde hace más de seis décadas.',
        cta: 'Ir a recambios',
      },
    ],
    processTitle: 'Cómo trabajamos',
    process: [
      { title: 'Análisis', text: 'Estudiamos los productos, formatos y volúmenes de su producción.' },
      { title: 'Propuesta', text: 'Elegimos la máquina, nueva o usada, y su configuración.' },
      { title: 'Puesta en marcha', text: 'Nos encargamos de la entrega, la puesta en servicio y la formación.' },
      { title: 'Asistencia', text: 'Seguimos a su lado con mantenimiento, recambios y actualizaciones.' },
    ],
    videoLabel: 'Vídeo: el alimentador de una troqueladora automática en funcionamiento',
  },

  companyPage: {
    eyebrow: 'Empresa',
    title: 'Más de 60 años en el cartonaje.',
    lead: 'Primatech fabrica y comercializa maquinaria de cartonaje nueva y usada desde Sant’Andrea delle Fratte, a las puertas de Perugia, para clientes de todo el mundo.',
    story: [
      'Nuestra experiencia nace en el taller: más de sesenta años de trabajo en el cartonaje y el troquelado, entre mantenimiento, revisiones e instalaciones.',
      'Hoy diseñamos y patentamos en Italia las máquinas Primatech y las ofrecemos junto a modelos de importación exclusiva, seleccionados por su fiabilidad y su relación calidad-precio.',
      'Somos un equipo ágil: quien le responde conoce las máquinas y sigue su proyecto de principio a fin.',
    ],
    numbersTitle: 'Primatech en cifras',
    numbers: [
      { value: '60+', label: 'años de experiencia en el cartonaje' },
      { value: '100+', label: 'máquinas instaladas en el mundo' },
      { value: '3', label: 'continentes: Europa, América, Asia' },
      { value: '1', label: 'interlocutor directo para cada cliente' },
    ],
    valuesTitle: 'Lo que nos mueve',
    fesrTitle: 'Proyectos cofinanciados',
  },

  contactPage: {
    eyebrow: 'Contacto',
    title: 'Hablemos de su producción.',
    lead: 'Escríbanos para un presupuesto, una ficha técnica, asistencia o un recambio: le responde directamente un técnico.',
    formTitle: 'Solicitud de información',
    directTitle: 'Contacto directo',
    mapTitle: 'Dónde estamos',
    mapText: 'A las puertas de Perugia, en la zona industrial de Sant’Andrea delle Fratte.',
  },

  form: {
    name: 'Nombre y apellidos',
    company: 'Empresa',
    country: 'País',
    email: 'Correo electrónico',
    phone: 'Teléfono',
    optional: 'opcional',
    topic: 'Asunto',
    topics: {
      quote: 'Presupuesto para una máquina nueva',
      sheet: 'Solicitud de ficha técnica',
      usedBuy: 'Compra de una máquina usada',
      usedSell: 'Venta de mi máquina usada',
      service: 'Asistencia técnica',
      parts: 'Recambios',
      info: 'Otra información',
    },
    machine: 'Máquina de interés',
    machineHint: 'Modelo, o marca, modelo y número de serie de su máquina.',
    message: 'Mensaje',
    messageHint: 'Formatos, materiales, volúmenes: cuantos más detalles nos dé, más precisa será la respuesta.',
    privacyBefore: 'He leído la ',
    privacyLink: 'política de privacidad',
    privacyAfter: ' y acepto el tratamiento de mis datos para recibir una respuesta.',
    required: 'obligatorio',
    requiredNote: 'Todos los campos son obligatorios salvo indicación contraria.',
    submit: 'Enviar solicitud',
    sending: 'Enviando…',
    errors: {
      required: 'Rellene este campo.',
      email: 'Introduzca una dirección de correo válida, p. ej. nombre@empresa.es.',
      privacy: 'Para enviar la solicitud debe aceptar la política de privacidad.',
      summary: 'Revise los campos señalados.',
      send: 'No se ha podido enviar la solicitud. Inténtelo de nuevo en unos minutos o escríbanos a {email}.',
    },
  },

  thanks: {
    title: 'Gracias, hemos recibido su solicitud.',
    text: 'Le responderemos lo antes posible. Si es urgente, llámenos al {phone}.',
    back: 'Volver al inicio',
    catalog: 'Ver el catálogo',
  },

  footer: {
    tagline: 'Fabricación y comercio de maquinaria de cartonaje nueva y usada.',
    machines: 'Máquinas',
    company: 'Primatech',
    contacts: 'Contacto',
    privacy: 'Privacidad',
    cookies: 'Cookies',
    rights: 'Todos los derechos reservados.',
    fesr: 'La participación en la feria Print4all del 27 al 30 de mayo de 2025 se ha realizado también gracias a la financiación de: PR FEDER 2021-2027 Prioridad 1 – OE 1.3 – Acción 1.3.2 – Apoyo a la internacionalización de las pymes.',
    fesrAlt: 'Logotipos: Coesione Italia 21-27 Umbria, Unión Europea, República Italiana, Región de Umbría, Sviluppumbria',
    backTop: 'Volver arriba',
  },

  notFound: {
    title: 'Página no encontrada.',
    text: 'La página que busca no existe o ha sido trasladada.',
    cta: 'Ir al inicio',
  },

  legal: {
    draft: 'Borrador pendiente de validación por un consultor de privacidad antes de su publicación.',
    updated: 'Última actualización',
  },
};

export default es;
