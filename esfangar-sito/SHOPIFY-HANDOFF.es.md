# Es Fangar — guía para la implementación en Shopify

Destinatario: el desarrollador que convertirá este prototipo en un **tema de Shopify Online Store 2.0** para la tienda existente de es-fangar.com.
El prototipo es la referencia aprobada de diseño, textos (EN/ES/DE), animaciones, SEO y accesibilidad.

---

## 1. Ver el prototipo

Se necesita Node.js 20 o superior.

```bash
npm install          # solo para los scripts de imágenes/logo; el build no tiene dependencias
npm run build        # regenera dist/ a partir de src/
npm run serve        # http://localhost:8797
```

`dist/` ya viene compilado: también se puede servir con cualquier servidor estático.

## 2. Dónde está cada cosa

| Ruta | Contenido |
|---|---|
| `src/build.mjs` | Todo el markup: layout (head, header, footer, carrito), cada página, componentes, JSON-LD, sitemap |
| `src/content/en.mjs`, `es.mjs`, `de.mjs` | **Todos los textos** en los 3 idiomas (UI, páginas, fichas de vinos, formularios, páginas legales en borrador) |
| `src/content/site.mjs` | Contacto, datos de la empresa, vinos (precios, variedades, graduación…), casas, enlaces de Airbnb/Vrbo, ID de Bókun |
| `src/content/alts.mjs` | Textos alternativos de las fotos en 3 idiomas |
| `src/assets/css/site.css` | Sistema de diseño (tokens de color, tipografía, layout) + capa de animación al final del archivo |
| `src/assets/js/boot.js` | Clases `js` / `motion` / preloader (síncrono en el `<head>`) |
| `src/assets/js/site.js` | Menú, carrito **de demostración**, filtros, video, formulario, carga de Bókun |
| `src/assets/js/motion.js` | Animaciones (preloader, revelados, cursor, banda de texto, contadores…) |
| `src/assets/fonts/` | Cormorant + Jost (woff2, alojadas en el propio sitio) |
| `src/assets/img/`, `src/assets/video/` | Imágenes optimizadas (AVIF/WebP), imágenes para compartir `og/`, video del hero |
| `source/` | Originales: fotos, botellas, fotos de ambiente, PDF y SVG de los logos |

## 3. Estructura de tema propuesta

```
layout/theme.liquid          ← layout(): head (los hreflang los genera Shopify), preloader, header, footer, cajón del carrito
sections/
  header.liquid  footer.liquid  cart-drawer.liquid
  home-hero.liquid           video 1280/1920 (escritorio) + 720 vertical (móvil), póster, botón de pausa
  stats-band.liquid  marquee.liquid  intro-text.liquid  pillars.liquid
  featured-wines.liquid      (selector de colección)
  feature-dark.liquid  split.liquid  land-grid.liquid  visit-map.liquid
  page-hero.liquid  timeline.liquid  steps.liquid  facts.liquid  gallery-strip.liquid  cta-band.liquid
  experiences-grid.liquid  bokun-booking.liquid
  houses.liquid              (bloques: una casa por bloque, galería + enlaces Airbnb/Vrbo + licencia)
  long-stay.liquid  facilities-grid.liquid  events-grid.liquid
  contact-form.liquid  main-product.liquid  main-collection.liquid  main-page.liquid  main-404.liquid
snippets/
  wine-card.liquid           tarjeta con hover: foto de ambiente + botones redondos (ver / añadir)
  picture.liquid             <picture> responsive con image_url / image_tag
  icon.liquid  logo.liquid   (SVG inline desde source/logo/*.svg, fill="currentColor")
  json-ld-org.liquid  json-ld-product.liquid  json-ld-breadcrumb.liquid
templates/
  index.json  collection.json  product.json  404.json
  page.estate.json  page.winery.json  page.experiences.json  page.stays.json
  page.equestrian.json  page.events.json  page.contact.json  page.json (páginas legales)
assets/  site.css  boot.js  site.js  motion.js  fuentes .woff2  (video .mp4 ≤ 20 MB o en Contenido → Archivos)
locales/ en.default.json  es.json  de.json   (cadenas de UI tomadas de ui.* en los archivos de contenido)
```

Cada texto de las páginas entra como **ajuste de sección o de bloque**, para que el personal pueda editarlo desde el editor. Las traducciones se manejan con **Translate & Adapt**, pegando ES/DE desde `src/content/es.mjs` y `de.mjs`.

## 4. Productos: metacampos a crear

*Configuración → Datos personalizados → Productos*, espacio de nombres `wine`. Todos traducibles.

| Clave | Tipo | Ejemplo / origen |
|---|---|---|
| `wine.category` | Texto de una línea (white / rose / red / sweet) | filtro de la tienda |
| `wine.style` | Texto de una línea | "Gran Reserva red · 32 months in barrel" (`wineText.*.type`) |
| `wine.short` | Texto de una línea | nota breve de la tarjeta (`wineText.*.short`) |
| `wine.varieties` | Texto de una línea | `site.mjs → wines[].varieties` |
| `wine.abv` | Decimal | 13.6 |
| `wine.serving_temp` | Texto de una línea | "16–18 °C" |
| `wine.color`, `wine.nose`, `wine.palate` | Texto multilínea | notas de cata |
| `wine.pairing` | Texto de una línea | maridaje |
| `wine.residual_sugar` | Texto de una línea | solo Genesis Semi Dolç: "35 g/L" |
| `wine.scene_image` | Archivo (imagen) | foto de ambiente para el hover: `source/bottles/scene-*.{png,jpg}` |

- **Añadas:** siguen siendo variantes de Shopify (por ejemplo N'Amarat 2013 / 2015).
- **Pack 12-for-90:** variantes Pink / White con **imagen de variante**. Al cambiar de variante se muestra `variant.featured_image`, como ya hace el prototipo.
- **Handles:** no cambiar los existentes (`n-amarat-bio-es-fangar-vins`, etc.) para no perder el posicionamiento. En el prototipo las URL son `/en/wines/<slug>`; en Shopify siguen siendo `/products/<handle>`.
- **Fotos de botella:** ya están en los productos. En la tarjeta llevan `mix-blend-mode: multiply` sobre el fondo `#F7F7F9` de las fotos actuales.

## 5. Qué reemplazar respecto al prototipo

| Prototipo | En Shopify |
|---|---|
| Carrito en `localStorage` (`site.js`, sección "basket") | **Ajax Cart API**: `POST /cart/add.js`, `/cart/change.js`, `GET /cart.js`; checkout en `/checkout`. Mantener el cajón, el focus trap, el umbral de envío gratis (89 €) y el aviso emergente (toast). |
| `CATALOG` en JSON dentro de la página | Datos del producto o de la respuesta de `/cart.js` |
| Formulario `[data-enquiry]` (no envía nada) | `{% form 'contact' %}` con los campos `contact[type]`, `contact[name]`, `contact[email]`, `contact[phone]`, `contact[company]`, `contact[from]`, `contact[to]`, `contact[guests]`, `contact[horses]`, `contact[body]`. Mantener la validación y los mensajes accesibles. El antispam (hCaptcha) ya viene incluido en Shopify. Las consultas van a **management@es-fangar.com**: es el correo de contacto de la tienda, o se usa una app de formularios. |
| Imágenes AVIF/WebP pregeneradas | `image_url` + `image_tag` con `widths` y `sizes` (Shopify sirve AVIF/WebP automáticamente). Fotos subidas en **Contenido → Archivos** o en los ajustes de sección. |
| `<meta http-equiv="Content-Security-Policy">` | No se puede controlar en Shopify: quitarlo |
| Hreflang, canonical, sitemap, robots | Los genera Shopify. Mantener solo las meta OG/Twitter y el JSON-LD. |
| Mapa estático | Reutilizar la imagen `map-mallorca-896.*` y el marcador, con la atribución © OpenStreetMap |
| Banner de cookies | Banner nativo de Shopify (Customer Privacy API). Bókun se sigue cargando solo al hacer clic. |

## 6. Integraciones

- **Bókun:**
  - loader `https://widgets.bokun.io/assets/javascripts/apps/build/BokunWidgetsLoader.js?bookingChannelUUID=6531113e-e97b-4c7b-8ab3-f54675aea107`
  - lista `https://widgets.bokun.io/online-sales/6531113e-e97b-4c7b-8ab3-f54675aea107/product-list/113213`
  - carga al hacer clic, ver `site.js`, sección "Bókun"
- **Alojamientos:** solo enlaces externos a Airbnb y Vrbo (en `site.mjs → houses`). Las reservas siguen en Guesty.
- **Analítica:** Plausible (sin cookies) en `theme.liquid`.

## 7. Idiomas y URL

- **Idiomas:** inglés como principal, español y alemán publicados (*Configuración → Idiomas*). Shopify crea `/es/…` y `/de/…` con hreflang.
- **Handles de páginas traducidos con Translate & Adapt:**

  | EN | ES | DE |
  |---|---|---|
  | estate | finca | gut |
  | winery | bodega | weingut |
  | experiences | experiencias | erlebnisse |
  | stays | alojamientos | unterkuenfte |
  | equestrian | hipica | reiten |
  | events | eventos | events |
  | contact | contacto | kontakt |

- **Redirecciones 301** (*Navegación → Redirecciones de URL*):
  - `/pages/rentals` → `/pages/stays`
  - `/pages/tastings` → `/pages/experiences`
  - `/pages/metode-gravetat` → `/pages/winery`
  - `/pages/learn-about-vins` → `/collections/vins`
  - `/pages/catalog` → `/collections/vins`

## 8. SEO a trasladar al tema

- **Title y description** por página e idioma: `meta.*` en los archivos de contenido.
- **Title de las fichas de vino:** "{nombre} · {wine.seoCat} · Es Fangar", sin "· Es Fangar" cuando supera los 60 caracteres.
- **JSON-LD** (ver `build.mjs`: `websiteLd`, `wineryLd`, `productLd`, `breadcrumbLd`, ProductGroup del pack, LodgingBusiness). `productLd` incluye también `shippingDetails` para los 27 países de la UE (14,90 €, entrega en 2–7 días).
- **Imágenes para compartir 1200×630** por página y por vino: `src/assets/img/og/`, configurables desde metacampos de página o de producto.
- **Textos alternativos:** `src/content/alts.mjs`. Para las fotos subidas a Shopify se completan en el campo "texto alternativo".
- **Logo PNG** para `Organization.logo`: `src/assets/img/logo-es-fangar.png`. Íconos: `favicon-32.png`, `apple-touch-icon.png`, `icon-192/512.png`.

## 9. Requisitos a mantener

- **Accesibilidad WCAG 2.2 AA:**
  - skip link y foco visible
  - menú y cajón con focus trap y tecla Esc
  - objetivos táctiles de 44 px como mínimo
  - errores del formulario con resumen y `aria-invalid`
  - video con botón de pausa
- **Animaciones:** toda la capa de animación depende de `html.motion`, es decir de `prefers-reduced-motion: no-preference`. El cursor personalizado solo se activa con `pointer: fine`.
- **Rendimiento:**
  - ninguna librería JS; fuentes propias con preload
  - LCP = imagen póster del hero (con preload)
  - el video arranca después del póster, no arranca con Save-Data y se pausa fuera de pantalla
- **Core Web Vitals en verde** en móvil, a comprobar con PageSpeed antes de publicar.

## 10. Procedimiento recomendado

1. **Duplicar el tema actual** (respaldo).
2. Acceso de **colaborador** con permisos de Temas, Productos y Páginas.
3. Desarrollar con Shopify CLI:
   ```bash
   shopify theme dev --store es-fangar.myshopify.com
   ```
4. Crear los metacampos, completarlos y subir las fotos de ambiente.
5. Crear las páginas y los menús, y luego las traducciones ES/DE.
6. Subir el tema **sin publicar**:
   ```bash
   shopify theme push --unpublished
   ```
7. Control de calidad:
   - pedido de prueba
   - formulario
   - Bókun (sin completar reservas reales)
   - móvil, teclado, PageSpeed
8. Publicar. Enviar el sitemap a Search Console y validar el JSON-LD con la Prueba de resultados enriquecidos.

## 11. Puntos pendientes (por parte de Es Fangar)

- Números de **licencia turística** de las 3 casas y del registro único de alquileres (hoy figuran como "pendiente")
- **Revisión por hablantes nativos** de los textos DE y ES
- **Hectáreas de la reserva natural:** el sitio actual muestra dos valores (400 / 600); por ahora dice "más de 400"
- **Fotos originales** en alta resolución y **logo vectorial** original; los SVG actuales están reconstruidos a partir de PDF de Canva
- **Textos legales** (Aviso legal, Privacidad, Cookies) para revisar con el asesor jurídico
- Recomendada la **casilla "+18" en el checkout**
- **Revocar los accesos** del gestor anterior (Isle of Mallorca Group) a Shopify, Guesty, Bókun, dominio y Google
