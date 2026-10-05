"""Transparent cut-outs of the shop's product photos, for the Shopify theme.

    <venv python> tools/product-cutouts.py ../es-fangar-shopify [https://es-fangar.com | products.json]

The product photos in Shopify are bottles on a flat light background. This reads the
store's public /products.json, cuts the first photo of each product out of its background
(soft edges and the soft shadow are kept; photos without a flat background are skipped) and writes
  assets/cutout-<product handle>-<width>.webp   (WebP with transparency)
  assets/backdrop-<product handle>-<width>.webp (the second photo, moved and scaled like the cut-out)
  snippets/cutout-meta.liquid                    (which products have a cut-out / backdrop)
The theme shows the cut-out instead of the Shopify photo while the product's first photo is
still the one it was made from (otherwise it falls back to the Shopify photo). The lifestyle
photos show the same bottle in the same place as the product photo: the backdrop gets the same
scaling as the cut-out, so on hover its bottle sits exactly behind the cut-out, which stays still.
Run it again after adding a product or changing a product photo in Shopify.
Needs Pillow (with WebP), numpy and opencv-python.
"""
import io
import json
import ssl
import sys
import urllib.request
from pathlib import Path

import cv2
import numpy as np
from PIL import Image

try:  # up-to-date certificates (the bundled ones of an old Python may have expired)
    import certifi
    CTX = ssl.create_default_context(cafile=certifi.where())
except ImportError:
    CTX = None

WIDTHS = [480, 800, 1200]
LOW, HIGH = 4.0, 40.0     # distance from the background colour: fully transparent .. fully opaque
# Same size for every single bottle: height as a share of the square photo, standing on the same line.
# Magnums stay taller; Twenty Twelve, the offers (several bottles) and the accessories keep their photo as it is.
BOTTLE_HEIGHT, MAGNUM_HEIGHT, BASELINE = 0.68, 0.82, 0.88
KEEP_AS_IS = ('twentytwelve', 'twenty-twelve', 'accesor', 'accessor', 'choose-your')
# Packs of several bottles have no lifestyle photo: on hover they show the lifestyle photo of the
# wine they contain (its bottle painted out, the pack stands in front of it).
PACK_SCENES = {
    '12-for-90-twenty-twelve': 'twentytwelve-white-bio-es-fangar-vins',
    '10-for-99-son-p-2018': 'son-p-bio-es-fangar-vins',
    '10-for-99-sa-sivinia-2023': 'sa-sivina',
    '6-for-122-40-lo-cortinel-lo-2023': 'lo-cortinel-lo-bio-es-fangar-vins',
}


def fetch(url):
    req = urllib.request.Request(url, headers={'User-Agent': 'es-fangar-theme-tools'})
    return urllib.request.urlopen(req, timeout=60, context=CTX).read()


def file_name(url):
    return url.split('?')[0].rsplit('/', 1)[-1]


def flat_background(a):
    """Background colour when the photo's border is a flat colour, else None."""
    border = np.concatenate([a[0], a[-1], a[:, 0], a[:, -1]])
    bg = np.median(border, axis=0)
    flat = np.mean(np.abs(border - bg).max(axis=1) < 6) >= 0.97
    return bg if flat and bg.min() > 225 else None


def cutout(im):
    a = np.asarray(im.convert('RGB')).astype(np.float32)
    bg = flat_background(a)
    if bg is None:
        return None
    diff = np.abs(a - bg).max(axis=2)
    # only background connected to the border becomes transparent (white labels and caps stay)
    _, lab = cv2.connectedComponents((diff < HIGH).astype(np.uint8), connectivity=4)
    edge = set(np.unique(np.concatenate([lab[0], lab[-1], lab[:, 0], lab[:, -1]]))) - {0}
    region = np.isin(lab, list(edge))
    alpha = np.ones(diff.shape, np.float32)
    alpha[region] = np.clip((diff[region] - LOW) / (HIGH - LOW), 0, 1)
    al = alpha[..., None]
    rgb = np.clip(np.where(al > 0.01, (a - bg * (1 - al)) / np.maximum(al, 0.01), 0), 0, 255)
    return Image.fromarray(np.dstack([rgb, alpha * 255]).astype(np.uint8), 'RGBA')


def single_bottle(handle):
    return not (handle.startswith(KEEP_AS_IS) or handle[0].isdigit())  # digits: the multi-bottle offers


def same_size(cut, handle):
    """Scale and place a single bottle so that all bottles have the same height and base line.
    Returns the new image and the transform (scale, x, y) from the original photo."""
    if not single_bottle(handle):
        return cut, (1.0, 0, 0)
    a = np.asarray(cut)[..., 3]
    ys, xs = np.where(a > 150)                      # the bottle itself, without the soft shadow
    top, bottom, cx = ys.min(), ys.max(), (xs.min() + xs.max()) / 2
    size = max(cut.size)
    target = (MAGNUM_HEIGHT if 'magnum' in handle else BOTTLE_HEIGHT) * size
    k = target / (bottom - top)
    scaled = cut.resize((round(cut.width * k), round(cut.height * k)), Image.LANCZOS)
    canvas = Image.new('RGBA', (size, size), (0, 0, 0, 0))
    x, y = round(size / 2 - cx * k), round(BASELINE * size - bottom * k)
    canvas.paste(scaled, (x, y))                    # empty canvas: a plain copy keeps the transparency
    return canvas, (k, x, y)


def backdrop(scene, cut, original_cut, transform, size):
    """The lifestyle photo with the same transform as the cut-out, or None when its bottle does not
    sit where the cut-out is. Where the photo gets smaller its edges are mirrored: the bottle is
    painted out first (it stays hidden behind the cut-out) so that it is not mirrored too."""
    k, x, y = transform
    s = np.asarray(scene.convert('RGB').resize(size, Image.LANCZOS))
    if k < 1:
        f = min(1.0, 1000 / max(size))               # paint out at a moderate size, it is hidden anyway
        small = cv2.resize(s, None, fx=f, fy=f, interpolation=cv2.INTER_AREA)
        hole = cv2.resize((np.asarray(original_cut)[..., 3] > 20).astype(np.uint8) * 255, small.shape[1::-1])
        hole = cv2.dilate(hole, np.ones((9, 9), np.uint8))
        filled = cv2.resize(cv2.inpaint(small, hole, 7, cv2.INPAINT_TELEA), size, interpolation=cv2.INTER_CUBIC)
        big_hole = cv2.resize(hole, size) > 0
        s = np.where(big_hole[..., None], filled, s)
    m = np.float32([[k, 0, x], [0, k, y]])
    out = cv2.warpAffine(s, m, cut.size, flags=cv2.INTER_AREA if k < 1 else cv2.INTER_CUBIC, borderMode=cv2.BORDER_REFLECT)
    # check on the untouched photo: its bottle must match the cut-out (correlation inside the bottle)
    mask = np.asarray(original_cut)[..., 3] > 150
    g1 = cv2.cvtColor(np.asarray(original_cut.convert('RGB')), cv2.COLOR_RGB2GRAY)[mask].astype(np.float32)
    g2 = cv2.cvtColor(np.asarray(scene.convert('RGB').resize(original_cut.size, Image.LANCZOS)), cv2.COLOR_RGB2GRAY)[mask].astype(np.float32)
    score = float(np.corrcoef(g1, g2)[0, 1])
    return (Image.fromarray(out), score) if score > 0.5 else (None, score)


def painted_out(scene, bottle_cut, size):
    """A lifestyle photo without its bottle (painted out), as a square of the given size."""
    s = np.asarray(scene.convert('RGB').resize((1000, 1000), Image.LANCZOS))
    hole = cv2.resize((np.asarray(bottle_cut)[..., 3] > 20).astype(np.uint8) * 255, (1000, 1000))
    hole = cv2.dilate(hole, np.ones((15, 15), np.uint8))
    filled = cv2.inpaint(s, hole, 9, cv2.INPAINT_TELEA)
    return Image.fromarray(filled).resize((size, size), Image.LANCZOS)


# Packs on a glossy floor: on hover they stand in a lifestyle photo with a rough floor, so the mirror image
# below the bottles goes and a soft contact shadow takes its place. Where each bottle touches the floor,
# read from the photos (x from, x to, floor y; fractions of the cut-out's width and height; None: no bottle).
# A new pack needs its own line here (otherwise its hover photo keeps the reflection).
_TT = [(0, .05, None, .750), (.05, .125, 1, .765), (.125, .272, 1, .8175), (.272, .447, 1, .8625),
       (.447, .594, 1, .8175), (.594, 1, None, .750)]
PACK_FLOORS = {
    '12-for-90-twenty-twelve': _TT,
    '10-for-99-son-p-2018': [(0, .056, None, .751), (.056, .147, 1, .770), (.147, .278, 1, .819), (.278, .419, 1, .864),
                             (.419, .538, 1, .819), (.538, .616, 1, .770), (.616, 1, None, .751)],
    '10-for-99-sa-sivinia-2023': [(0, .125, None, .737), (.125, .1875, 1, .749), (.1875, .30, 1, .865), (.30, .3225, None, .752),
                                  (.3225, .434, 1, .869), (.434, .446, None, .752), (.446, .556, 1, .865), (.556, .60, 1, .749),
                                  (.60, 1, None, .737)],
    '6-for-122-40-lo-cortinel-lo-2023': [(0, .046, None, .750), (.046, .125, 1, .765), (.125, .275, 1, .815),
                                         (.275, .446, 1, .8625), (.446, .596, 1, .815), (.596, 1, None, .750)],
}


def without_reflection(cut, floors):
    """The pack without the mirror image below the bottles, with a soft contact shadow under each bottle."""
    r = np.asarray(cut).astype(np.float32)
    H, W = r.shape[:2]
    a = r[..., 3]
    yy = np.arange(H)[:, None]
    shadow = np.zeros((H, W), np.float32)
    for x0, x1, bottle, y in floors:
        c0, c1, fy = round(x0 * W), round(x1 * W), y * H
        # everything below the floor goes (soft 2px edge)
        keep = np.clip((fy + 1 - yy) / 2 + .5, 0, 1)
        a[:, c0:c1] *= keep[:, :1].repeat(c1 - c0, 1)
        # just above the floor: the half-transparent sheen of the glossy floor between the bottles goes too
        band = slice(max(0, round(fy - H * .14)), round(fy) + 1)
        seg = a[band, c0:c1]
        seg[seg < 215] = 0
        if bottle:
            cx, rx, ry = (c0 + c1) / 2, (c1 - c0) * .52, H * .012
            cv2.ellipse(shadow, (round(cx), round(fy)), (round(rx), round(ry)), 0, 0, 360, 1, -1)
    tight = cv2.GaussianBlur(shadow, (0, 0), W * .006)
    wide = cv2.GaussianBlur(cv2.dilate(shadow, np.ones((1, round(W * .03)), np.uint8)), (0, 0), W * .025)
    sh = np.clip(tight * .55 + wide * .3, 0, 1)
    out = np.zeros((H, W, 4), np.float32)
    out[..., :3] = (28, 22, 18)
    out[..., 3] = sh * 255
    # bottles over their shadow
    fa = a[..., None] / 255
    rgb = r[..., :3] * fa + out[..., :3] * (1 - fa) * (out[..., 3:] / 255)
    alpha = fa + (1 - fa) * (out[..., 3:] / 255)
    rgb = np.where(alpha > 0, rgb / np.maximum(alpha, 1e-6), 0)
    return Image.fromarray(np.dstack([np.clip(rgb, 0, 255), alpha * 255]).astype(np.uint8), 'RGBA')


def without_soft_shadow(cut, limit=90):
    """Packs: drop the faint shadow around the bottles (it would show outside the arched window on hover)."""
    a = np.asarray(cut).copy()
    a[..., 3] = np.where(a[..., 3] < limit, 0, a[..., 3])
    return Image.fromarray(a, 'RGBA')


def is_pack(handle):
    return handle[0].isdigit() and '-for-' in handle


def main(theme, store):
    theme = Path(theme)
    assets = theme / 'assets'
    for f in [*assets.glob('cutout-*.webp'), *assets.glob('backdrop-*.webp')]:
        f.unlink()
    # the store URL, or a products.json saved from it
    src = Path(store).read_bytes() if Path(store).is_file() else fetch(store.rstrip('/') + '/products.json?limit=250')
    products = json.loads(src)['products']
    lines = ['{%- comment -%}',
             '  Generated by tools/product-cutouts.py: "widths|width|height|source file|backdrop source file|',
             '  second photo source file" of the transparent cut-out of a product photo (assets/cutout-<handle>-<width>.webp),',
             '  of the backdrop made from its lifestyle photo (assets/backdrop-<handle>-<width>.webp; "*" for a pack, made',
             '  from the photo of the wine it contains) and of the second photo of a pack (assets/cutout-<handle>-alt-<width>.webp).',
             '  Accepts: handle',
             '{%- endcomment -%}',
             '{%- case handle -%}']
    wines = {}          # handle -> (cut-out before resizing, lifestyle photo), for the packs
    for p in sorted(products, key=lambda p: is_pack(p['handle'])):   # packs last
        if not p['images']:
            continue
        original = Image.open(io.BytesIO(fetch(p['images'][0]['src'])))
        cut = cutout(original)
        if cut is None:
            print('skip (no flat background)', p['handle'])
            continue
        if is_pack(p['handle']):
            cut = without_soft_shadow(cut)
        original_cut = cut
        cut, transform = same_size(cut, p['handle'])
        widths = [w for w in WIDTHS if w <= cut.width] or [cut.width]
        for w in widths:
            cut.resize((w, round(cut.height * w / cut.width)), Image.LANCZOS).save(
                assets / f'cutout-{p["handle"]}-{w}.webp', 'WEBP', quality=86, alpha_quality=90, method=6)
        h = round(cut.height * widths[-1] / cut.width)
        source = file_name(p['images'][0]['src'])
        # backdrop for the hover: only single bottles (offers and accessories have other compositions)
        back_source, note = '', ''
        if len(p['images']) > 1 and (single_bottle(p['handle']) or 'twentytwelve' in p['handle']):
            scene = Image.open(io.BytesIO(fetch(p['images'][1]['src'])))
            back, score = backdrop(scene, cut, original_cut, transform, original.size)
            note = f' (backdrop match {score:.2f}{"" if back else ", skipped"})'
            if back:
                for w in widths:
                    back.resize((w, w), Image.LANCZOS).save(assets / f'backdrop-{p["handle"]}-{w}.webp', 'WEBP', quality=80, method=6)
                back_source = file_name(p['images'][1]['src'])
                wines[p['handle']] = (original_cut, scene)
        alt_source = ''
        if is_pack(p['handle']):
            # backdrop: the lifestyle photo of the wine in the pack ("*": not tied to this product's photos)
            wine = wines.get(PACK_SCENES.get(p['handle'], ''))
            if wine:
                back = painted_out(wine[1], wine[0], cut.width)
                for w in widths:
                    back.resize((w, w), Image.LANCZOS).save(assets / f'backdrop-{p["handle"]}-{w}.webp', 'WEBP', quality=80, method=6)
                back_source, note = '*', f' (backdrop from {PACK_SCENES[p["handle"]]})'
            # hover photo: the second photo of the same pack (e.g. the White version), otherwise the pack
            # itself; without the floor reflection when its floor line is known (PACK_FLOORS)
            alt, alt_file = None, ''
            if len(p['images']) > 1:
                alt = cutout(Image.open(io.BytesIO(fetch(p['images'][1]['src']))))
                alt_file = p['images'][1]['src']
            if alt is None and p['handle'] in PACK_FLOORS:
                alt, alt_file = cutout(original), p['images'][0]['src']
            if alt is not None:
                alt = without_soft_shadow(alt)
                if p['handle'] in PACK_FLOORS:
                    alt = without_reflection(alt, PACK_FLOORS[p['handle']])
                for w in widths:
                    alt.resize((w, round(alt.height * w / alt.width)), Image.LANCZOS).save(
                        assets / f'cutout-{p["handle"]}-alt-{w}.webp', 'WEBP', quality=86, alpha_quality=90, method=6)
                alt_source = file_name(alt_file)
                note += ' + hover photo'
        lines.append(f"  {{%- when '{p['handle']}' -%}}{','.join(map(str, widths))}|{widths[-1]}|{h}|{source}|{back_source}|{alt_source}")
        print('cut', p['handle'] + note)
    lines.append('{%- endcase -%}')
    (theme / 'snippets' / 'cutout-meta.liquid').write_text('\n'.join(lines) + '\n', encoding='utf-8', newline='\n')


if __name__ == '__main__':
    main(sys.argv[1] if len(sys.argv) > 1 else '../es-fangar-shopify', sys.argv[2] if len(sys.argv) > 2 else 'https://es-fangar.com')
