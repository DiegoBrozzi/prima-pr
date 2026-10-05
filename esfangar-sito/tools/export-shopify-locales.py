"""Export the prototype texts (src/content/{en,es,de}.mjs) as Shopify storefront locales.

    py tools/export-shopify-locales.py ../es-fangar-shopify/locales

The content files are plain JS object literals; this reads them with a small
tokenizer (no Node needed). Rules for Shopify:
  - arrays become objects with keys item_1, item_2, ...
  - at most three levels (like Shopify's own themes): deeper paths are joined with
    underscores, e.g. sections.home_stats.items_item_1_n (plural objects stay objects)
  - keys are snake_case; values containing HTML get the `_html` suffix
  - the few arrow functions become Liquid interpolations / plural objects
Extra strings that only the theme needs (cart page, accounts, search...) are
merged from EXTRA below.
"""
import json
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
CONTENT = ROOT / 'src' / 'content'


# ---------- tiny JS literal reader ----------
class Reader:
    def __init__(self, src):
        self.s, self.i = src, 0

    def ws(self):
        while self.i < len(self.s):
            if self.s.startswith('//', self.i):
                self.i = self.s.index('\n', self.i)
            elif self.s[self.i].isspace():
                self.i += 1
            else:
                break

    def peek(self):
        self.ws()
        return self.s[self.i]

    def eat(self, ch):
        self.ws()
        assert self.s[self.i] == ch, (ch, self.s[self.i:self.i + 40])
        self.i += 1

    def string(self):
        q = self.s[self.i]
        self.i += 1
        out = []
        while self.s[self.i] != q:
            c = self.s[self.i]
            if c == '\\':
                self.i += 1
                c = {'n': '\n', 't': '\t'}.get(self.s[self.i], self.s[self.i])
            out.append(c)
            self.i += 1
        self.i += 1
        return ''.join(out)

    def value(self):
        c = self.peek()
        if c == '{':
            return self.obj()
        if c == '[':
            return self.arr()
        if c in '\'"`':
            return self.string()
        m = re.compile(r'(\w+)\s*=>\s*').match(self.s, self.i)
        if m:  # arrow function: keep the body source
            self.i = m.end()
            start = self.i
            self.string()
            return ('fn', self.s[start:self.i])
        m = re.compile(r'-?\d+(\.\d+)?').match(self.s, self.i)
        self.i = m.end()
        return float(m.group()) if '.' in m.group() else int(m.group())

    def key(self):
        c = self.peek()
        if c in '\'"':
            return self.string()
        m = re.compile(r'[A-Za-z_$][\w$]*').match(self.s, self.i)
        self.i = m.end()
        return m.group()

    def obj(self):
        self.eat('{')
        out = {}
        while self.peek() != '}':
            k = self.key()
            self.eat(':')
            out[k] = self.value()
            if self.peek() == ',':
                self.eat(',')
        self.eat('}')
        return out

    def arr(self):
        self.eat('[')
        out = []
        while self.peek() != ']':
            out.append(self.value())
            if self.peek() == ',':
                self.eat(',')
        self.eat(']')
        return out


def load(name):
    src = (CONTENT / f'{name}.mjs').read_text(encoding='utf-8')
    r = Reader(src)
    r.i = src.index('export default') + len('export default')
    return r.value()


# ---------- conversion ----------
def snake(k):
    k = re.sub(r'(?<=[a-z0-9])([A-Z])', r'_\1', k).lower()
    return re.sub(r'[^a-z0-9_]', '_', k)


def fn(body, key):
    """Turn the known arrow functions into Shopify strings."""
    tpl = body.strip('`')
    m = re.search(r"\$\{n === 1 \? '([^']*)' : '([^']*)'\}", tpl)
    if m:  # count: plural object
        return {'one': '{{ count }} ' + m.group(1), 'other': '{{ count }} ' + m.group(2)}
    var = 'amount' if key == 'freeLeft' else 'count'
    return tpl.replace('${n}', '{{ ' + var + ' }}')


def convert(v, key=''):
    if isinstance(v, dict):
        out = {}
        for k, x in v.items():
            name = snake(k)
            val = convert(x, k)
            if isinstance(val, str) and re.search(r'<[a-z/]', val) and not name.endswith('_html'):
                name += '_html'
            out[name] = val
        return out
    if isinstance(v, list):
        return {f'item_{i + 1}': convert(x) for i, x in enumerate(v)}
    if isinstance(v, tuple):
        return fn(v[1], key)
    if isinstance(v, str):
        return v.strip().replace('{privacy}', '{{ privacy_url }}')
    return str(v)


def merge(a, b):
    for k, v in b.items():
        if isinstance(v, dict) and isinstance(a.get(k), dict):
            merge(a[k], v)
        else:
            a[k] = v
    return a


# Cross links to Events and Wines (2026-10-09): texts that exist only in the theme
CROSSLINKS = {'en': {'sections': {'home_pillars': {'items_item_5_t': 'Events', 'items_item_5_d': 'Weddings, company gatherings and birthdays in the gardens, the courtyards and the bodega.', 'items_item_5_label': 'Events'}, 'estate_organic': {'more': 'Taste the estate in our wines'}, 'estate_gardens': {'more': 'Host your event in the gardens'}, 'winery_gravity': {'more': 'Discover the wines made this way'}, 'winery_story': {'more': 'Private tastings and celebrations at the bodega'}, 'experiences_info': {'items_item_2_text': 'Private tastings, company visits and celebrations at the bodega: see everything we can host.', 'items_item_2_cta': 'Discover our events', 'items_item_3_title': 'Take a bottle home', 'items_item_3_text': 'Loved a wine? Order it online and we deliver it across the EU.', 'items_item_3_cta': 'Shop the wines'}, 'stays_more': {'items_item_1_title': 'Our wines in the houses', 'items_item_1_text': 'In every house you will find a selection of Es Fangar wines. To take some home or send them to friends, order them online.', 'items_item_1_cta': 'Shop the wines', 'items_item_2_title': 'Celebrating something?', 'items_item_2_text': 'A birthday, an anniversary or a gathering with friends: celebrate at the finca or at the bodega.', 'items_item_2_cta': 'Discover our events'}, 'equestrian_bring': {'more': 'Add an event to your competition: dinners, awards, receptions'}, 'events_items': {'more': 'Our wines, also as gifts for your guests'}, 'wines_info': {'items_item_3_title': 'Celebrate at the bodega', 'items_item_3_text': 'Tastings, birthdays and private events among the vats where our wines are made.', 'items_item_3_cta': 'Discover our events'}, 'events_more': {'title': 'Everything the estate adds to your event', 'items_item_1_t': 'The Estate', 'items_item_1_d': 'A thousand hectares of vineyards, olive groves and nature reserve: the setting for photos, walks and dinners outdoors.', 'items_item_1_label': 'The Estate', 'items_item_2_t': 'The Bodega', 'items_item_2_d': 'A gravity winery unique in Mallorca: guided visits for your guests, among the vats and the barrels.', 'items_item_2_label': 'The Bodega', 'items_item_3_t': 'Tastings', 'items_item_3_d': 'Private tastings of our wines, to make part of the programme of your event.', 'items_item_3_label': 'Tastings', 'items_item_4_t': 'Wines', 'items_item_4_d': 'Our organic and vegan wines for the toast, or as a gift for your guests.', 'items_item_4_label': 'Wines', 'items_item_5_t': 'Stays', 'items_item_5_d': 'Three houses on the estate and the Main House for long stays, so your guests and family can stay at the finca.', 'items_item_5_label': 'Stays', 'items_item_6_t': 'Equestrian', 'items_item_6_d': 'An equestrian complex built for competitions, for events on horseback.', 'items_item_6_label': 'Equestrian'}}, 'wine': {'taste_cta': 'Taste it at the bodega: tastings and private events'}, 'wines': {'search_label': 'Search the wines', 'search_placeholder': 'Search by name, grape or style', 'search_empty': 'No wines match your search. Try another word or choose All.'}}, 'es': {'sections': {'home_pillars': {'items_item_5_t': 'Eventos', 'items_item_5_d': 'Bodas, encuentros de empresa y cumpleaños en los jardines, los patios y la bodega.', 'items_item_5_label': 'Eventos'}, 'estate_organic': {'more': 'Descubre la finca en nuestros vinos'}, 'estate_gardens': {'more': 'Celebra tu evento en los jardines'}, 'winery_gravity': {'more': 'Descubre los vinos elaborados así'}, 'winery_story': {'more': 'Catas privadas y celebraciones en la bodega'}, 'experiences_info': {'items_item_2_text': 'Catas privadas, visitas de empresa y celebraciones en la bodega: descubre todo lo que podemos organizar.', 'items_item_2_cta': 'Descubre nuestros eventos', 'items_item_3_title': 'Llévate una botella', 'items_item_3_text': '¿Te ha gustado un vino? Pídelo online y lo enviamos a toda la UE.', 'items_item_3_cta': 'Ver los vinos'}, 'stays_more': {'items_item_1_title': 'Nuestros vinos en las casas', 'items_item_1_text': 'En cada casa encontrarás una selección de vinos de Es Fangar. Para llevarte alguno o enviarlo a tus amigos, pídelo online.', 'items_item_1_cta': 'Ver los vinos', 'items_item_2_title': '¿Celebras algo?', 'items_item_2_text': 'Un cumpleaños, un aniversario o una reunión con amigos: celébralo en la finca o en la bodega.', 'items_item_2_cta': 'Descubre nuestros eventos'}, 'equestrian_bring': {'more': 'Completa tu competición con un evento: cenas, entregas de premios, recepciones'}, 'events_items': {'more': 'Nuestros vinos, también como regalo para tus invitados'}, 'wines_info': {'items_item_3_title': 'Celebra en la bodega', 'items_item_3_text': 'Catas, cumpleaños y eventos privados entre los depósitos donde nacen nuestros vinos.', 'items_item_3_cta': 'Descubre nuestros eventos'}, 'events_more': {'title': 'Todo lo que la finca aporta a tu evento', 'items_item_1_t': 'La Finca', 'items_item_1_d': 'Mil hectáreas de viñedos, olivares y reserva natural: el escenario para fotos, paseos y cenas al aire libre.', 'items_item_1_label': 'La Finca', 'items_item_2_t': 'La Bodega', 'items_item_2_d': 'Una bodega por gravedad única en Mallorca: visitas guiadas para tus invitados, entre depósitos y barricas.', 'items_item_2_label': 'La Bodega', 'items_item_3_t': 'Catas', 'items_item_3_d': 'Catas privadas de nuestros vinos, para incluir en el programa de tu evento.', 'items_item_3_label': 'Catas', 'items_item_4_t': 'Vinos', 'items_item_4_d': 'Nuestros vinos ecológicos y veganos para el brindis o como regalo para tus invitados.', 'items_item_4_label': 'Vinos', 'items_item_5_t': 'Alojamientos', 'items_item_5_d': 'Tres casas en la finca y la Casa Principal para estancias largas, para que invitados y familia se alojen en la finca.', 'items_item_5_label': 'Alojamientos', 'items_item_6_t': 'Hípica', 'items_item_6_d': 'Un complejo ecuestre pensado para competiciones, para eventos a caballo.', 'items_item_6_label': 'Hípica'}}, 'wine': {'taste_cta': 'Pruébalo en la bodega: catas y eventos privados'}, 'wines': {'search_label': 'Buscar vinos', 'search_placeholder': 'Busca por nombre, uva o estilo', 'search_empty': 'Ningún vino coincide con tu búsqueda. Prueba con otra palabra o elige Todos.'}}, 'de': {'sections': {'home_pillars': {'items_item_5_t': 'Events', 'items_item_5_d': 'Hochzeiten, Firmenevents und Geburtstage in den Gärten, Innenhöfen und der Bodega.', 'items_item_5_label': 'Events'}, 'estate_organic': {'more': 'Das Gut in unseren Weinen entdecken'}, 'estate_gardens': {'more': 'Ihr Event in den Gärten'}, 'winery_gravity': {'more': 'Die so gemachten Weine entdecken'}, 'winery_story': {'more': 'Private Verkostungen und Feiern in der Bodega'}, 'experiences_info': {'items_item_2_text': 'Private Verkostungen, Firmenbesuche und Feiern in der Bodega: entdecken Sie, was wir ausrichten.', 'items_item_2_cta': 'Unsere Events entdecken', 'items_item_3_title': 'Eine Flasche mitnehmen', 'items_item_3_text': 'Hat Ihnen ein Wein gefallen? Bestellen Sie ihn online, wir liefern in die ganze EU.', 'items_item_3_cta': 'Zu den Weinen'}, 'stays_more': {'items_item_1_title': 'Unsere Weine in den Häusern', 'items_item_1_text': 'In jedem Haus finden Sie eine Auswahl an Weinen von Es Fangar. Um welche mitzunehmen oder an Freunde zu schicken, bestellen Sie sie online.', 'items_item_1_cta': 'Zu den Weinen', 'items_item_2_title': 'Gibt es etwas zu feiern?', 'items_item_2_text': 'Ein Geburtstag, ein Jubiläum oder ein Treffen mit Freunden: feiern Sie auf der Finca oder in der Bodega.', 'items_item_2_cta': 'Unsere Events entdecken'}, 'equestrian_bring': {'more': 'Ergänzen Sie Ihr Turnier um ein Event: Dinner, Siegerehrungen, Empfänge'}, 'events_items': {'more': 'Unsere Weine, auch als Geschenk für Ihre Gäste'}, 'wines_info': {'items_item_3_title': 'Feiern in der Bodega', 'items_item_3_text': 'Verkostungen, Geburtstage und private Events zwischen den Tanks, in denen unsere Weine entstehen.', 'items_item_3_cta': 'Unsere Events entdecken'}, 'events_more': {'title': 'Was das Gut zu Ihrem Event beiträgt', 'items_item_1_t': 'Das Gut', 'items_item_1_d': 'Tausend Hektar Weinberge, Olivenhaine und Naturschutzgebiet: die Kulisse für Fotos, Spaziergänge und Dinner im Freien.', 'items_item_1_label': 'Das Gut', 'items_item_2_t': 'Die Bodega', 'items_item_2_d': 'Eine auf Mallorca einzigartige Schwerkraftkellerei: Führungen für Ihre Gäste zwischen Tanks und Fässern.', 'items_item_2_label': 'Die Bodega', 'items_item_3_t': 'Weinproben', 'items_item_3_d': 'Private Verkostungen unserer Weine als Teil des Programms Ihres Events.', 'items_item_3_label': 'Weinproben', 'items_item_4_t': 'Weine', 'items_item_4_d': 'Unsere biologischen und veganen Weine für den Toast oder als Geschenk für Ihre Gäste.', 'items_item_4_label': 'Weine', 'items_item_5_t': 'Unterkünfte', 'items_item_5_d': 'Drei Häuser auf dem Gut und das Haupthaus für längere Aufenthalte, damit Gäste und Familie auf der Finca wohnen.', 'items_item_5_label': 'Unterkünfte', 'items_item_6_t': 'Reiten', 'items_item_6_d': 'Eine für Turniere gebaute Reitanlage, für Events zu Pferd.', 'items_item_6_label': 'Reiten'}}, 'wine': {'taste_cta': 'Probieren Sie ihn in der Bodega: Verkostungen und private Events'}, 'wines': {'search_label': 'Weine suchen', 'search_placeholder': 'Nach Name, Rebsorte oder Stil suchen', 'search_empty': 'Kein Wein passt zu Ihrer Suche. Versuchen Sie ein anderes Wort oder wählen Sie Alle.'}}}

EXTRA = {
    'en': {
        'ui': {
            'announcement': 'Free shipping within the EU on orders over {{ amount }}', 'promo_title': 'Order 12 bottles of wine', 'promo_text': 'Get a free bottle opener', 'promo_close': 'Close', 'sold_out': 'Sold out', 'unavailable': 'Unavailable', 'view_cart': 'View cart', 'cart_error': 'Sorry, this could not be added. Please try again.',
            'loading': 'Loading…', 'breadcrumb': 'Breadcrumb', 'continue_shopping': 'Continue shopping', 'price': 'Price', 'country': 'Country',
            'search': 'Search', 'search_placeholder': 'Search wines and pages', 'no_results': 'No results for “{{ terms }}”.',
            'results': {'one': '{{ count }} result', 'other': '{{ count }} results'},
            'previous': 'Previous', 'next': 'Next', 'page_of': 'Page {{ current }} of {{ total }}',
            'read_more': 'Read more', 'back_to_blog': 'Back to the journal', 'published': 'Published {{ date }}',
            'all_products': 'All products', 'update_cart': 'Update cart', 'search_submit': 'Search', 'description': 'Description', 'pause_slideshow': 'Pause slideshow', 'play_slideshow': 'Play slideshow',
        },
        'form': {'sent': 'Your enquiry has been sent.', 'error_generic': 'Something went wrong. Please check the form and try again.'},
        'password': {'title': 'Opening soon', 'enter': 'Enter with password', 'label': 'Password', 'submit': 'Enter', 'admin': 'Are you the store owner?', 'admin_link': 'Log in here'},
        'gift_card': {'title': 'Your gift card', 'balance': 'Balance', 'code': 'Gift card code', 'copy': 'Copy code', 'copied': 'Copied', 'expired': 'This gift card has expired.', 'disabled': 'This gift card is disabled.', 'print': 'Print', 'shop': 'Visit the shop'},
        'customer': {
            'login': 'Sign in', 'email': 'Email', 'password': 'Password', 'submit_login': 'Sign in', 'register': 'Create account', 'submit_register': 'Create account',
            'first_name': 'First name', 'last_name': 'Last name', 'forgot': 'Forgot your password?', 'recover_title': 'Reset your password',
            'recover_text': 'We will send you an email to reset your password.', 'recover_submit': 'Send', 'recover_success': 'We have sent you an email with a link to reset your password.',
            'cancel': 'Cancel', 'reset_title': 'Choose a new password', 'password_confirm': 'Confirm password', 'reset_submit': 'Save password',
            'activate_title': 'Activate your account', 'activate_submit': 'Activate account', 'decline': 'Decline invitation',
            'account': 'My account', 'logout': 'Sign out', 'orders': 'Order history', 'no_orders': 'You have not placed any orders yet.',
            'order': 'Order', 'date': 'Date', 'payment': 'Payment', 'fulfillment': 'Fulfilment', 'total': 'Total', 'product': 'Product', 'quantity': 'Quantity',
            'details': 'Account details', 'addresses': 'Addresses', 'view_addresses': 'View addresses ({{ count }})', 'add_address': 'Add a new address',
            'edit': 'Edit', 'delete': 'Delete', 'delete_confirm': 'Are you sure you want to delete this address?', 'default': 'Default address', 'set_default': 'Set as default address',
            'company': 'Company', 'address1': 'Address', 'address2': 'Apartment, suite, etc.', 'city': 'City', 'country': 'Country', 'province': 'Province', 'zip': 'Postal code', 'phone': 'Phone',
            'save': 'Save address', 'back_account': 'Back to my account', 'cancelled': 'Cancelled on {{ date }}', 'billing': 'Billing address', 'shipping': 'Shipping address',
            'subtotal': 'Subtotal', 'shipping_cost': 'Shipping', 'tax': 'Tax', 'discount': 'Discount',
        },
    },
    'es': {
        'ui': {
            'announcement': 'Envío gratis en la UE para pedidos a partir de {{ amount }}', 'promo_title': 'Pide 12 botellas de vino', 'promo_text': 'Te regalamos un sacacorchos', 'promo_close': 'Cerrar', 'sold_out': 'Agotado', 'unavailable': 'No disponible', 'view_cart': 'Ver la cesta', 'cart_error': 'No se ha podido añadir. Inténtalo de nuevo.',
            'loading': 'Cargando…', 'breadcrumb': 'Ruta de navegación', 'continue_shopping': 'Seguir comprando', 'price': 'Precio', 'country': 'País',
            'search': 'Buscar', 'search_placeholder': 'Busca vinos y páginas', 'no_results': 'No hay resultados para «{{ terms }}».',
            'results': {'one': '{{ count }} resultado', 'other': '{{ count }} resultados'},
            'previous': 'Anterior', 'next': 'Siguiente', 'page_of': 'Página {{ current }} de {{ total }}',
            'read_more': 'Leer más', 'back_to_blog': 'Volver al blog', 'published': 'Publicado el {{ date }}',
            'all_products': 'Todos los productos', 'update_cart': 'Actualizar la cesta', 'search_submit': 'Buscar', 'description': 'Descripción', 'pause_slideshow': 'Pausar las fotos', 'play_slideshow': 'Reanudar las fotos',
        },
        'form': {'sent': 'Tu consulta se ha enviado.', 'error_generic': 'Algo ha fallado. Revisa el formulario e inténtalo de nuevo.'},
        'password': {'title': 'Muy pronto', 'enter': 'Entrar con contraseña', 'label': 'Contraseña', 'submit': 'Entrar', 'admin': '¿Eres el propietario de la tienda?', 'admin_link': 'Inicia sesión aquí'},
        'gift_card': {'title': 'Tu tarjeta regalo', 'balance': 'Saldo', 'code': 'Código de la tarjeta regalo', 'copy': 'Copiar código', 'copied': 'Copiado', 'expired': 'Esta tarjeta regalo ha caducado.', 'disabled': 'Esta tarjeta regalo está desactivada.', 'print': 'Imprimir', 'shop': 'Ir a la tienda'},
        'customer': {
            'login': 'Iniciar sesión', 'email': 'Email', 'password': 'Contraseña', 'submit_login': 'Entrar', 'register': 'Crear cuenta', 'submit_register': 'Crear cuenta',
            'first_name': 'Nombre', 'last_name': 'Apellidos', 'forgot': '¿Has olvidado tu contraseña?', 'recover_title': 'Restablecer la contraseña',
            'recover_text': 'Te enviaremos un email para restablecer tu contraseña.', 'recover_submit': 'Enviar', 'recover_success': 'Te hemos enviado un email con un enlace para restablecer tu contraseña.',
            'cancel': 'Cancelar', 'reset_title': 'Elige una nueva contraseña', 'password_confirm': 'Confirmar contraseña', 'reset_submit': 'Guardar contraseña',
            'activate_title': 'Activa tu cuenta', 'activate_submit': 'Activar cuenta', 'decline': 'Rechazar invitación',
            'account': 'Mi cuenta', 'logout': 'Cerrar sesión', 'orders': 'Historial de pedidos', 'no_orders': 'Todavía no has realizado ningún pedido.',
            'order': 'Pedido', 'date': 'Fecha', 'payment': 'Pago', 'fulfillment': 'Preparación', 'total': 'Total', 'product': 'Producto', 'quantity': 'Cantidad',
            'details': 'Datos de la cuenta', 'addresses': 'Direcciones', 'view_addresses': 'Ver direcciones ({{ count }})', 'add_address': 'Añadir una dirección',
            'edit': 'Editar', 'delete': 'Eliminar', 'delete_confirm': '¿Seguro que quieres eliminar esta dirección?', 'default': 'Dirección predeterminada', 'set_default': 'Usar como dirección predeterminada',
            'company': 'Empresa', 'address1': 'Dirección', 'address2': 'Piso, puerta, etc.', 'city': 'Ciudad', 'country': 'País', 'province': 'Provincia', 'zip': 'Código postal', 'phone': 'Teléfono',
            'save': 'Guardar dirección', 'back_account': 'Volver a mi cuenta', 'cancelled': 'Cancelado el {{ date }}', 'billing': 'Dirección de facturación', 'shipping': 'Dirección de envío',
            'subtotal': 'Subtotal', 'shipping_cost': 'Envío', 'tax': 'Impuestos', 'discount': 'Descuento',
        },
    },
    'de': {
        'ui': {
            'announcement': 'Kostenloser Versand in der EU ab {{ amount }} Bestellwert', 'promo_title': 'Bestellen Sie 12 Flaschen Wein', 'promo_text': 'Dazu gibt es einen Korkenzieher gratis', 'promo_close': 'Schließen', 'sold_out': 'Ausverkauft', 'unavailable': 'Nicht verfügbar', 'view_cart': 'Warenkorb ansehen', 'cart_error': 'Das hat leider nicht geklappt. Bitte versuchen Sie es erneut.',
            'loading': 'Wird geladen…', 'breadcrumb': 'Brotkrumennavigation', 'continue_shopping': 'Weiter einkaufen', 'price': 'Preis', 'country': 'Land',
            'search': 'Suche', 'search_placeholder': 'Weine und Seiten durchsuchen', 'no_results': 'Keine Ergebnisse für „{{ terms }}“.',
            'results': {'one': '{{ count }} Ergebnis', 'other': '{{ count }} Ergebnisse'},
            'previous': 'Zurück', 'next': 'Weiter', 'page_of': 'Seite {{ current }} von {{ total }}',
            'read_more': 'Weiterlesen', 'back_to_blog': 'Zurück zum Blog', 'published': 'Veröffentlicht am {{ date }}',
            'all_products': 'Alle Produkte', 'update_cart': 'Warenkorb aktualisieren', 'search_submit': 'Suchen', 'description': 'Beschreibung', 'pause_slideshow': 'Diashow anhalten', 'play_slideshow': 'Diashow fortsetzen',
        },
        'form': {'sent': 'Ihre Anfrage wurde gesendet.', 'error_generic': 'Etwas ist schiefgelaufen. Bitte prüfen Sie das Formular und versuchen Sie es erneut.'},
        'password': {'title': 'Bald geöffnet', 'enter': 'Mit Passwort eintreten', 'label': 'Passwort', 'submit': 'Eintreten', 'admin': 'Sind Sie der Shopinhaber?', 'admin_link': 'Hier anmelden'},
        'gift_card': {'title': 'Ihr Geschenkgutschein', 'balance': 'Guthaben', 'code': 'Gutscheincode', 'copy': 'Code kopieren', 'copied': 'Kopiert', 'expired': 'Dieser Gutschein ist abgelaufen.', 'disabled': 'Dieser Gutschein ist deaktiviert.', 'print': 'Drucken', 'shop': 'Zum Shop'},
        'customer': {
            'login': 'Anmelden', 'email': 'Mail', 'password': 'Passwort', 'submit_login': 'Anmelden', 'register': 'Konto erstellen', 'submit_register': 'Konto erstellen',
            'first_name': 'Vorname', 'last_name': 'Nachname', 'forgot': 'Passwort vergessen?', 'recover_title': 'Passwort zurücksetzen',
            'recover_text': 'Wir senden Ihnen eine Mail zum Zurücksetzen Ihres Passworts.', 'recover_submit': 'Senden', 'recover_success': 'Wir haben Ihnen eine Mail mit einem Link zum Zurücksetzen gesendet.',
            'cancel': 'Abbrechen', 'reset_title': 'Neues Passwort wählen', 'password_confirm': 'Passwort bestätigen', 'reset_submit': 'Passwort speichern',
            'activate_title': 'Konto aktivieren', 'activate_submit': 'Konto aktivieren', 'decline': 'Einladung ablehnen',
            'account': 'Mein Konto', 'logout': 'Abmelden', 'orders': 'Bestellverlauf', 'no_orders': 'Sie haben noch keine Bestellungen aufgegeben.',
            'order': 'Bestellung', 'date': 'Datum', 'payment': 'Zahlung', 'fulfillment': 'Versand', 'total': 'Gesamt', 'product': 'Produkt', 'quantity': 'Menge',
            'details': 'Kontodaten', 'addresses': 'Adressen', 'view_addresses': 'Adressen ansehen ({{ count }})', 'add_address': 'Neue Adresse hinzufügen',
            'edit': 'Bearbeiten', 'delete': 'Löschen', 'delete_confirm': 'Möchten Sie diese Adresse wirklich löschen?', 'default': 'Standardadresse', 'set_default': 'Als Standardadresse festlegen',
            'company': 'Firma', 'address1': 'Adresse', 'address2': 'Wohnung, Etage usw.', 'city': 'Ort', 'country': 'Land', 'province': 'Region', 'zip': 'Postleitzahl', 'phone': 'Telefon',
            'save': 'Adresse speichern', 'back_account': 'Zurück zu meinem Konto', 'cancelled': 'Storniert am {{ date }}', 'billing': 'Rechnungsadresse', 'shipping': 'Lieferadresse',
            'subtotal': 'Zwischensumme', 'shipping_cost': 'Versand', 'tax': 'Steuern', 'discount': 'Rabatt',
        },
    },
}

# Default texts of the reusable theme sections: sections.<content key>.<field>.
# Sources are paths in the converted data; they are moved (or copied with a leading '=').
# A dict value builds a nested object (used for the columns of info-cols).
SECTIONS = {
    'home_hero': {'eyebrow': 'home.eyebrow', 'title_html': 'home.title_html', 'text': 'home.lead', 'cta': 'home.cta_wines', 'cta_2': 'home.cta_stay', 'video_label': 'home.video_label'},
    'home_stats': {'items': 'home.stats'},
    'home_intro': {'title': 'home.intro_title', 'text': 'home.intro'},
    'home_pillars': {'title': 'home.pillars_title', 'items': 'home.pillars'},
    'home_wines': {'title': 'home.wines_title', 'text': 'home.wines_lead', 'cta': '=ui.all_wines'},
    'home_bodega': {'eyebrow': 'home.bodega_eyebrow', 'title': 'home.bodega_title', 'text': 'home.bodega_text', 'cta': 'home.bodega_cta'},
    'home_stays': {'title': 'home.stays_title', 'text': 'home.stays_lead', 'cta': 'home.stays_cta', 'main_facts': '=stays.long_facts.item_1'},
    'home_land': {'title': '=home.land_title', 'text': 'home.land_lead', 'items': '=home.land'},
    'home_visit': {'title': 'home.visit_title', 'text': 'home.visit_text', 'cta': 'home.visit_cta'},
    'estate_hero': {'eyebrow': 'estate.eyebrow', 'title': 'estate.title', 'text': 'estate.lead'},
    'estate_timeline': {'title': 'estate.history_title', 'items': 'estate.timeline'},
    'estate_landscape': {'title': 'estate.landscape_title', 'text': 'estate.landscape'},
    'estate_organic': {'title': 'estate.organic_title', 'text': 'estate.organic', 'stats_title': 'estate.self_title', 'stats': 'estate.self'},
    'estate_gardens': {'title': 'estate.gardens_title', 'text': 'estate.gardens'},
    'estate_land': {'title': 'home.land_title', 'items': 'home.land'},
    'estate_cta': {'title': 'estate.cta_title', 'text': 'estate.cta_text', 'cta': '=ui.nav.experiences'},
    'wines_info': {'items': {'item_1': {'title': 'wines.ship_title', 'list': 'wines.ship'},
                             'item_2': {'title': 'wines.trade_title', 'text': 'wines.trade_text', 'cta': 'wines.trade_cta'}}},
    'winery_hero': {'eyebrow': 'winery.eyebrow', 'title': 'winery.title', 'text': 'winery.lead'},
    'winery_gravity': {'eyebrow': 'winery.gravity_title', 'text': 'winery.gravity_lead'},
    'winery_story': {'title': 'winery.story_title', 'text': 'winery.story'},
    'winery_steps': {'items': 'winery.steps'},
    'winery_room': {'title': 'winery.room_title', 'text': 'winery.room', 'text_2': 'winery.machinery'},
    'winery_facts': {'title': 'winery.facts_title', 'items': 'winery.facts'},
    'winery_info': {'items': {'item_1': {'title': 'winery.varieties_title', 'text': 'winery.varieties'},
                              'item_2': {'title': 'winery.philosophy_title', 'text': 'winery.philosophy'}}},
    'winery_cta': {'title': 'winery.cta', 'cta': '=ui.nav.experiences'},
    'experiences_hero': {'eyebrow': 'experiences.eyebrow', 'title': 'experiences.title', 'text': 'experiences.lead'},
    'experiences_items': {'items': 'experiences.items'},
    'experiences_info': {'items': {'item_1': {'title': 'experiences.practical_title', 'list': 'experiences.practical'},
                                   'item_2': {'title': 'experiences.group_title', 'text': 'experiences.group_text', 'cta': 'experiences.group_cta'}}},
    'stays_hero': {'eyebrow': 'stays.eyebrow', 'title': 'stays.title', 'text': 'stays.lead'},
    'stays_long': {'eyebrow': 'stays.long_eyebrow', 'title': 'stays.long_title', 'text': 'stays.long', 'tags': 'stays.long_facts', 'cta': 'stays.long_cta'},
    'stays_around': {'title': 'stays.around_title', 'items': 'stays.around'},
    'equestrian_hero': {'eyebrow': 'equestrian.eyebrow', 'title': 'equestrian.title', 'text': 'equestrian.lead'},
    'equestrian_facilities': {'title': 'equestrian.facilities_title', 'items': 'equestrian.facilities'},
    'equestrian_bring': {'title': 'equestrian.bring_title', 'text': 'equestrian.bring', 'cta': 'equestrian.bring_cta'},
    'events_hero': {'eyebrow': 'events.eyebrow', 'title': 'events.title', 'text': 'events.lead'},
    'events_items': {'items': 'events.items', 'cta': '=events.cta_btn'},
    'events_trade': {'title': 'events.trade_title', 'text': 'events.trade', 'cta': 'events.trade_cta'},
    'events_cta': {'title': 'events.cta', 'cta': 'events.cta_btn'},
}


def take(data, path, moved):
    copy = path.startswith('=')
    path = path.lstrip('=')
    node = data
    for p in path.split('.'):
        node = node[p]
    if not copy:
        moved.append(path)
    return json.loads(json.dumps(node))


def drop(data, path):
    parts = path.split('.')
    node = data
    for p in parts[:-1]:
        node = node.get(p, {})
    node.pop(parts[-1], None)


def build_sections(data):
    moved, out = [], {}

    def build(spec):
        return {k: build(v) if isinstance(v, dict) else take(data, v, moved) for k, v in spec.items()}

    for key, spec in SECTIONS.items():
        out[key] = build(spec)
    # pillar links are labelled with the page name; image names are set in the templates
    for it in out['home_pillars']['items'].values():
        it['label'] = data['ui']['nav'][it.pop('k')]
    for it in out['experiences_items']['items'].values():
        it.pop('img', None)
    for it in out['events_items']['items'].values():
        it.pop('img', None)
    for path in moved:
        drop(data, path)
    for k in list(data):
        if isinstance(data[k], dict) and not data[k]:
            del data[k]
    data['sections'] = out


# Texts written for the Shopify theme (not in the prototype): the Métode Gravetat emphasis on the bodega page
THEME_SECTIONS = {
    'en': {
        'winery_gravity': {'title': 'Let gravity do the work', 'stats': [
            {'n': '0', 'l': 'pumps for grapes or wine'},
            {'n': '4', 'l': 'levels, built around the method'},
            {'n': '2016', 'l': 'opened after nine years of trials'}]},
        'winery_steps': {'eyebrow': 'How it works', 'title': 'From vine to tank, without pumps',
                         'text': 'Each grape moves down or is carried overhead, never pumped: the fruit arrives intact and the wine keeps its natural character.'},
    },
    'es': {
        'winery_gravity': {'title': 'Que la gravedad haga el trabajo', 'stats': [
            {'n': '0', 'l': 'bombas para la uva o el vino'},
            {'n': '4', 'l': 'niveles, diseñados en torno al método'},
            {'n': '2016', 'l': 'inaugurada tras nueve años de pruebas'}]},
        'winery_steps': {'eyebrow': 'Cómo funciona', 'title': 'De la viña al depósito, sin bombas',
                         'text': 'Cada uva baja o se transporta por el techo, nunca se bombea: la fruta llega intacta y el vino conserva su carácter natural.'},
    },
    'de': {
        'winery_gravity': {'title': 'Die Schwerkraft arbeiten lassen', 'stats': [
            {'n': '0', 'l': 'Pumpen für Trauben oder Wein'},
            {'n': '4', 'l': 'Ebenen, rund um die Methode gebaut'},
            {'n': '2016', 'l': 'nach neun Jahren Versuchen eröffnet'}]},
        'winery_steps': {'eyebrow': 'So funktioniert es', 'title': 'Vom Weinberg in den Tank, ohne Pumpen',
                         'text': 'Jede Traube bewegt sich nach unten oder wird über Kopf getragen, nie gepumpt: Die Frucht bleibt unversehrt, der Wein behält seinen natürlichen Charakter.'},
    },
}


# prototype-only strings that make no sense on the live store
DROP = [('ui', 'prototype'), ('ui', 'checkout_note'), ('form', 'demo'), ('experiences', 'book_demo')]
PLURAL = {'zero', 'one', 'two', 'few', 'many', 'other'}


def flatten(node, depth=1):
    """Keep three levels of objects; join the rest of each path with underscores."""
    out = {}
    for k, v in node.items():
        if isinstance(v, dict) and not set(v) <= PLURAL:
            if depth < 3:
                out[k] = flatten(v, depth + 1)
            else:
                for sk, sv in flatten_leaf(v).items():
                    out[f'{k}_{sk}'] = sv
        else:
            out[k] = v
    return out


def flatten_leaf(node):
    out = {}
    for k, v in node.items():
        if isinstance(v, dict) and not set(v) <= PLURAL:
            for sk, sv in flatten_leaf(v).items():
                out[f'{k}_{sk}'] = sv
        else:
            out[k] = v
    # keep the _html suffix at the end of joined keys
    return {(k.replace('_html_', '_') + '_html' if '_html_' in k else k): v for k, v in out.items()}


def chunk_html(html, limit=1000):
    """Split HTML into pieces under `limit` characters, only between top-level blocks
    (long lists are split between their items)."""
    blocks = []
    for m in re.finditer(r'<(h2|p|ul)>.*?</(?:h2|p|ul)>', html, re.S):
        b = m.group()
        if len(b) > limit and b.startswith('<ul>'):
            items = re.findall(r'<li>.*?</li>', b, re.S)
            cur = ''
            for li in items:
                if cur and len(cur) + len(li) + 9 > limit:
                    blocks.append('<ul>' + cur + '</ul>')
                    cur = ''
                cur += li
            blocks.append('<ul>' + cur + '</ul>')
        else:
            blocks.append(b)
    out, cur = [], ''
    for b in blocks:
        assert len(b) <= limit, b[:80]
        if cur and len(cur) + len(b) + 1 > limit:
            out.append(cur)
            cur = ''
        cur += ('\n' if cur else '') + b
    out.append(cur)
    return out


def walk(o, p=''):
    for k, v in o.items():
        if isinstance(v, dict):
            yield from walk(v, p + k + '.')
        else:
            yield p + k, v


def main(out_dir):
    global ALTS
    ALTS = load('alts')
    out = Path(out_dir)
    out.mkdir(parents=True, exist_ok=True)
    for lang in ['en', 'es', 'de']:
        data = convert(load(lang))
        for a, b in DROP:
            data[a].pop(b, None)
        for k in ['lang', 'locale', 'lang_name']:
            data.pop(k, None)
        build_sections(data)
        merge(data['sections'], convert(THEME_SECTIONS[lang]))
        merge(data, EXTRA[lang])
        merge(data, CROSSLINKS[lang])
        data['alts'] = {snake(k): v[lang] for k, v in ALTS.items()}
        # used by the `date: format: 'date'` filter (blog, accounts)
        data['date_formats'] = {'date': {'en': '%-d %B %Y', 'es': '%-d de %B de %Y', 'de': '%-d. %B %Y'}[lang]}
        # wine texts come from the Shopify products (description, metafields), not from the theme
        data.pop('wine_text', None)
        # Shopify rejects the whole locale file if one value is longer than 1000 characters:
        # split the legal texts into body_1_html, body_2_html...
        for page in ('legal', 'privacy', 'cookies'):
            for i, part in enumerate(chunk_html(data[page].pop('body_html')), 1):
                data[page][f'body_{i}_html'] = part
        # plain strings for theme.js (no interpolation needed in Liquid)
        data['ui']['free_left_js'] = data['ui']['free_left'].replace('{{ amount }}', '{n}')
        data['wines']['count_one_js'] = data['wines']['count']['one'].replace('{{ count }}', '1')
        data['wines']['count_many_js'] = data['wines']['count']['other'].replace('{{ count }}', '{n}')
        data = flatten(data)
        too_long = [(k, len(v)) for k, v in walk(data) if len(v) > 1000]
        assert not too_long, too_long
        name = 'en.default.json' if lang == 'en' else f'{lang}.json'
        (out / name).write_text(json.dumps(data, ensure_ascii=False, indent=2) + '\n', encoding='utf-8', newline='\n')
        print('wrote', out / name)


if __name__ == '__main__':
    main(sys.argv[1] if len(sys.argv) > 1 else '../es-fangar-shopify/locales')
