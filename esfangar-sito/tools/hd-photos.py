"""Replace the site photos with the HD originals from Google Drive and add the new house photos.

    <python with pillow, opencv-python-headless, numpy> tools/hd-photos.py <index.json> <work dir> [names...]

index.json lists the Drive files ({folder, id, name}), made with gdown.download_folder(skip_download=True).
For each photo the Drive preview is downloaded at 4000 px (enough for the 2048 px output).
Photos already on the site keep their framing: the crop is found by matching features between the
current (low-resolution) photo and the HD original. New photos are used full frame.
Writes WebP + AVIF at 640/1024/1600 px (2048 for edge-to-edge photos) into src/assets/img and updates src/content/images.json.
"""
import json
import subprocess
import sys
from pathlib import Path

import cv2
import numpy as np
from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / 'src' / 'assets' / 'img'
SRC = ROOT / 'source' / 'photos'
WIDTHS = [640, 1024, 1600, 2048]
# 2048 px only for photos shown edge to edge (page heroes, dark features, call-to-action bands)
FULL_BLEED = {'estate-sunset', 'winery-hall', 'winery-tasting-bar', 'main-house-pool', 'equestrian-track', 'main-house-pool-night',
              'main-house-topdown', 'main-house-night', 'main-house-dusk-wide', 'winery-tasting-room', 'main-house-night-front', 'reserve-dusk'}

# photos already on the site: name -> (current low-res file, HD file on Drive)
EXISTING = {
    'main-house-arcade': ('WhatsApp Image 2026-10-06 at 14.13.27.jpeg', '_1VT2198.jpg'),
    'main-house-alcove': ('1WhatsApp Image 2026-10-06 at 14.13.27.jpeg', '_1VT2201.jpg'),
    'main-house-stairs': ('2WhatsApp Image 2026-10-06 at 14.13.27.jpeg', '_1VT2231.jpg'),
    'winery-hall': ('3WhatsApp Image 2026-10-06 at 14.13.27.jpeg', '_1VT6268-HDR-Bearbeitet.jpg'),
    'winery-tasting-bar': ('4WhatsApp Image 2026-10-06 at 14.13.27.jpeg', '_1VT6299-HDR-Bearbeitet.jpg'),
    'winery-tasting-room': ('5WhatsApp Image 2026-10-06 at 14.13.27.jpeg', '_1VT6354-HDR-Bearbeitet.jpg'),
    'winery-tanks': ('6WhatsApp Image 2026-10-06 at 14.13.27.jpeg', '_1VT6473-HDR.jpg'),
    'winery-gravity-hall': ('7WhatsApp Image 2026-10-06 at 14.13.28.jpeg', '_1VT6502-HDR.jpg'),
    'winery-barrels': ('8WhatsApp Image 2026-10-06 at 14.13.28.jpeg', '_1VT6530-HDR.jpg'),
    'arabic-house-interior': ('9WhatsApp Image 2026-10-06 at 14.13.28.jpeg', '_1VT6798-HDR.jpg'),
    'equestrian-aerial': ('10WhatsApp Image 2026-10-06 at 14.13.28.jpeg', 'DJI_0245.jpg'),
    'equestrian-track': ('11WhatsApp Image 2026-10-06 at 14.13.28.jpeg', 'DJI_0249.jpg'),
    'landscape-coast': ('12WhatsApp Image 2026-10-06 at 14.13.28.jpeg', 'DJI_0332.jpg'),
    'gardens-aerial': ('13WhatsApp Image 2026-10-06 at 14.13.28.jpeg', 'DJI_0553.jpg'),
    'reserve-dusk': ('14WhatsApp Image 2026-10-06 at 14.13.28.jpeg', 'DJI_0564.jpg'),
    'estate-sunset': ('15WhatsApp Image 2026-10-06 at 14.13.28.jpeg', 'DJI_0566.jpg'),
    'main-house-dusk-wide': ('16WhatsApp Image 2026-10-06 at 14.13.28.jpeg', 'DJI_0584.jpg'),
    'main-house-topdown': ('17WhatsApp Image 2026-10-06 at 14.13.28.jpeg', 'DJI_0590.jpg'),
    'main-house-night': ('18WhatsApp Image 2026-10-06 at 14.13.28.jpeg', 'DJI_0599.jpg'),
    'main-house-night-front': ('19WhatsApp Image 2026-10-06 at 14.13.28.jpeg', 'DJI_0605.jpg'),
    'main-house-pool-night': ('20.jpeg', 'DJI_0606.jpg'),
    'main-house-sunset': ('21WhatsApp Image 2026-10-06 at 14.13.28.jpeg', 'DJI_0609.jpg'),
    'vines-closeup': ('22WhatsApp Image 2026-10-06 at 14.13.28.jpeg', 'DJI_0661.JPG'),
    'vineyard-manor': ('23WhatsApp Image 2026-10-06 at 14.13.28.jpeg', 'DJI_0663 Kopie.jpg'),
    'vineyard-wide': ('24.jpeg', 'DJI_0664.jpg'),
    'main-house-lawn': ('25WhatsApp Image 2026-10-06 at 14.13.29.jpeg', 'DJI_0725.jpg'),
    'main-house-pool': ('26.jpeg', 'DJI_0732.jpg'),
    'arabic-house-pool': ('arabic-house-pool.jpg', '_1VT2151.jpg'),
    'arabic-house-lounge': ('arabic-house-lounge.jpg', '_1VT6792-HDR.jpg'),
    'arabic-house-aerial': ('arabic-house-aerial.jpg', 'DJI_0521.jpg'),
    'arabic-house-garden': ('arabic-house-garden.jpg', '_1VT6613-HDR.jpg'),
    'mallorcan-house-garden': ('mallorcan-house-garden.jpg', '_1VT6946-HDR.jpg'),
    'mallorcan-house-living': ('mallorcan-house-living.jpg', '_1VT6938-HDR.jpg'),
    'mallorcan-house-aerial': ('mallorcan-house-aerial.jpg', 'DJI_0539.jpg'),
    'mallorcan-house-pergola': ('mallorcan-house-pergola.jpg', '_1VT6955-HDR.jpg'),
    'lodge-living': ('lodge-living.jpg', '_1VT6845-HDR.jpg'),
}
# photos of the house galleries (full frame); lodge-pool and lodge-pool-2 come from the Airbnb listing (no HD). House attribution follows the Airbnb listings
# (the sales brochure puts some Lodge rooms and a Mallorcan House view on the wrong pages).
NEW = {
    'arabic-house-exterior': '_1VT6811-HDR.jpg',
    'arabic-house-living': '_1VT6804-HDR.jpg',
    'arabic-house-kitchen': '_1VT6807-HDR.jpg',
    'arabic-house-hall': '_1VT6784-HDR.jpg',
    'arabic-house-bedroom': '_1VT6767-HDR.jpg',
    'arabic-house-bedroom-2': '_1VT6760-HDR.jpg',
    'arabic-house-bath': '_1VT6777-HDR.jpg',
    'arabic-house-pool-aerial': 'DJI_0519.jpg',
    'mallorcan-house-exterior': 'DJI_0360.jpg',
    'mallorcan-house-dining': '_1VT6904-HDR.jpg',
    'mallorcan-house-kitchen': '_1VT6891-HDR.jpg',
    'mallorcan-house-bedroom': '_1VT6926-HDR.jpg',
    'mallorcan-house-bedroom-2': '_1VT6908-HDR.jpg',
    'mallorcan-house-bath': '_1VT6935-HDR.jpg',
    'mallorcan-house-garden-2': '_1VT6912-HDR.jpg',
    'mallorcan-house-view': '_1VT6958-HDR.jpg',
    'lodge-stone-room': '_1VT6841-HDR.jpg',
    'lodge-sitting': '_1VT6852-HDR.jpg',
    'lodge-kitchen': '_1VT6849-HDR.jpg',
    'lodge-bedroom': '_1VT6825-HDR.jpg',
    'lodge-bedroom-2': '_1VT6834-HDR.jpg',
    'lodge-bath': '_1VT6831-HDR.jpg',
    'lodge-porch': '_1VT6875-HDR.jpg',
    'lodge-aerial': 'DJI_0492.jpg',
    'lodge-terrace': 'DJI_0308.jpg',
    'lodge-forest': 'DJI_0313.jpg',
}


def load_cv(path, maxside):
    img = cv2.imdecode(np.fromfile(str(path), np.uint8), cv2.IMREAD_GRAYSCALE)
    s = maxside / max(img.shape)
    return (cv2.resize(img, None, fx=s, fy=s, interpolation=cv2.INTER_AREA) if s < 1 else img), min(s, 1)


def find_crop(low_path, hd_path):
    """Box (x0, y0, x1, y1) in HD pixels that shows what the low-resolution photo shows."""
    q, _ = load_cv(low_path, 1400)
    t, ts = load_cv(hd_path, 1400)
    orb = cv2.ORB_create(5000)
    kq, dq = orb.detectAndCompute(q, None)
    kt, dt = orb.detectAndCompute(t, None)
    m = cv2.BFMatcher(cv2.NORM_HAMMING).knnMatch(dq, dt, k=2)
    good = [a for a, b in (x for x in m if len(x) == 2) if a.distance < 0.75 * b.distance]
    A = np.float32([kq[g.queryIdx].pt for g in good]); B = np.float32([kt[g.trainIdx].pt for g in good])
    H, mask = cv2.findHomography(A, B, cv2.RANSAC, 4.0)
    h, w = q.shape
    corners = cv2.perspectiveTransform(np.float32([[0, 0], [w, 0], [w, h], [0, h]]).reshape(-1, 1, 2), H).reshape(-1, 2)
    x0, y0 = corners.min(0) / ts
    x1, y1 = corners.max(0) / ts
    return x0, y0, x1, y1, int(mask.sum())


def download(fid, dest):
    if not dest.exists():
        subprocess.run(['curl', '-s', '-L', '-o', str(dest), f'https://drive.google.com/thumbnail?id={fid}&sz=w4000'], check=True)
    return dest


def emit(name, img, manifest):
    w, h = img.size
    ws = [x for x in WIDTHS if x <= w and (x < 2048 or name in FULL_BLEED)] or [w]
    for x in ws:
        r = img.resize((x, round(h * x / w)), Image.LANCZOS)
        r.save(OUT / f'{name}-{x}.webp', 'WEBP', quality=78, method=6)
        r.save(OUT / f'{name}-{x}.avif', 'AVIF', quality=55)
    manifest[name] = {'w': w, 'h': h, 'widths': ws}


def main(index_path, work, only=None):
    work = Path(work); (work / 'hd4000').mkdir(parents=True, exist_ok=True)
    ids = {}
    for o in json.loads(Path(index_path).read_text()):
        ids.setdefault(o['name'], o['id'])
    manifest_path = ROOT / 'src' / 'content' / 'images.json'
    manifest = json.loads(manifest_path.read_text(encoding='utf-8'))
    for name, (low, hd) in EXISTING.items():
        if only and name not in only:
            continue
        src = download(ids[hd], work / 'hd4000' / hd.replace(' ', '_'))
        x0, y0, x1, y1, inl = find_crop(SRC / low, src)
        img = Image.open(src).convert('RGB')
        W, H = img.size
        box = (max(0, round(x0)), max(0, round(y0)), min(W, round(x1)), min(H, round(y1)))
        img = img.crop(box)
        emit(name, img, manifest)
        print(f'{name:26s} {hd:30s} inliers={inl:4d} crop={box} -> {img.size}', flush=True)
    for name, hd in NEW.items():
        if only and name not in only:
            continue
        src = download(ids[hd], work / 'hd4000' / hd.replace(' ', '_'))
        img = Image.open(src).convert('RGB')
        emit(name, img, manifest)
        print(f'{name:26s} {hd:30s} full {img.size}', flush=True)
    manifest_path.write_text(json.dumps(manifest, indent=1), encoding='utf-8')
    print('done', len(EXISTING) + len(NEW))


if __name__ == '__main__':
    main(sys.argv[1], sys.argv[2], set(sys.argv[3:]) or None)
