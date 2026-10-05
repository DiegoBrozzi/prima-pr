/* Es Fangar — motion layer (preloader, text reveals, scroll effects, cursor).
   Pure enhancement: nothing here is needed to use the site, and none of it runs
   when the visitor asks for reduced motion. No dependencies. */
(() => {
  'use strict';
  const root = document.documentElement;
  if (!root.classList.contains('motion')) { root.classList.remove('is-loading'); return; }

  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
  const lerp = (a, b, t) => a + (b - a) * t;
  const fine = matchMedia('(hover: hover) and (pointer: fine)').matches;
  let I = {};
  try { I = JSON.parse($('#es-i18n').textContent); } catch { /* labels fall back to none */ }

  /* ---------- preloader (first page of the session only, set by boot.js) ---------- */
  let ready;
  const whenReady = new Promise(r => { ready = r; });
  if (root.classList.contains('is-loading')) {
    const t0 = performance.now();
    let done = false;
    const finish = () => {
      if (done) return; done = true;
      root.classList.add('is-loaded');
      setTimeout(ready, 350);
      setTimeout(() => root.classList.remove('is-loading', 'is-loaded'), 1100);
    };
    const settle = () => setTimeout(finish, Math.max(0, 1200 - (performance.now() - t0)));
    if (document.readyState === 'complete') settle(); else addEventListener('load', settle, { once: true });
    setTimeout(finish, 2600); // never hold the page longer than this
  } else ready();

  /* ---------- word-by-word title reveal (masked) ---------- */
  function splitWords(el, cls) {
    let i = 0;
    const walk = node => {
      [...node.childNodes].forEach(n => {
        if (n.nodeType === 3) {
          const frag = document.createDocumentFragment();
          n.textContent.split(/(\s+)/).forEach(part => {
            if (!part) return;
            if (/^\s+$/.test(part)) { frag.append(document.createTextNode(part)); return; }
            const w = document.createElement('span'); w.className = cls;
            const inner = document.createElement('span'); inner.className = cls + '__i'; inner.textContent = part;
            inner.style.setProperty('--i', i++);
            w.append(inner); frag.append(w);
          });
          n.replaceWith(frag);
        } else if (n.nodeType === 1 && !n.matches('svg, .visually-hidden')) walk(n);
      });
    };
    walk(el);
    return i;
  }
  const titles = $$('.home-hero h1, .page-hero h1, .contact-hero h1, .shop-hero h1, .product h1, .not-found h1, main h2:not(.visually-hidden), .page-hero__lead, .home-hero__lead, .home-hero .eyebrow, .page-hero .eyebrow');
  titles.forEach(el => { el.classList.add('wsplit'); el.classList.remove('reveal'); splitWords(el, 'w'); });

  const io = new IntersectionObserver(entries => entries.forEach(en => {
    if (!en.isIntersecting) return;
    io.unobserve(en.target);
    whenReady.then(() => en.target.classList.add('is-in'));
  }), { rootMargin: '0px 0px -10% 0px' });
  titles.forEach(el => io.observe(el));

  /* ---------- image curtain reveal ---------- */
  $$('.pillar__media, .split__media > .arch, .split__media > picture, .exp__media, .step__media, .offer__media, .mosaic > div, .gallery-strip > div, .house__gallery, .map__frame, .product-scene__frame')
    .forEach(el => { el.classList.add('img-reveal'); io.observe(el); });

  /* ---------- paragraph "fills in" as you scroll ---------- */
  const fills = $$('.intro__text, .product__desc, .feature p:not(.eyebrow), .split__text > p:first-of-type').map(el => {
    el.classList.add('fill'); el.classList.remove('reveal');
    splitWords(el, 'f');
    return { el, words: $$('.f', el), lit: -1 };
  });
  function updateFills(vh) {
    fills.forEach(f => {
      const r = f.el.getBoundingClientRect();
      if (r.bottom < -50 || r.top > vh + 50) return;
      const p = clamp((vh * 0.88 - r.top) / (r.height + vh * 0.4));
      const lit = Math.round(p * f.words.length);
      if (lit === f.lit) return;
      f.words.forEach((w, i) => w.classList.toggle('on', i < lit));
      f.lit = lit;
    });
  }

  /* ---------- counters ---------- */
  const counters = $$('.stats__n').map(el => {
    const m = el.textContent.trim().match(/^([^\d]*)([\d.,]+)(.*)$/);
    if (!m || /^(1[89]|20)\d\d$/.test(m[2])) return null; // leave years alone
    const sep = (m[2].match(/[.,](?=\d{3}\b)/) || [''])[0];
    const target = parseInt(m[2].replace(/[.,]/g, ''), 10);
    if (!target) return null;
    el.setAttribute('aria-label', el.textContent.trim());
    return { el, pre: m[1], post: m[3], sep, target };
  }).filter(Boolean);
  const fmt = (n, sep) => sep ? String(n).replace(/\B(?=(\d{3})+(?!\d))/g, sep) : String(n);
  const runCounter = c => whenReady.then(() => {
    const t0 = performance.now(), D = 1600;
    const step = now => {
      const k = clamp((now - t0) / D); const e = 1 - Math.pow(1 - k, 4);
      c.el.textContent = c.pre + fmt(Math.round(c.target * e), c.sep) + c.post;
      if (k < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  });
  counters.forEach(c => { c.el.textContent = c.pre + '0' + c.post; });
  // checked on every scroll frame (an observer can miss a counter that is jumped over)
  function updateCounters(vh) {
    for (let i = counters.length - 1; i >= 0; i--) {
      if (counters[i].el.getBoundingClientRect().top < vh * 0.9) { runCounter(counters[i]); counters.splice(i, 1); }
    }
  }

  /* ---------- marquee driven by scroll velocity ---------- */
  const marquees = $$('.marquee').map(m => ({ el: m, track: $('.marquee__track', m), x: 0, w: 0, on: false }));
  const mqIO = new IntersectionObserver(entries => entries.forEach(en => { const m = marquees.find(x => x.el === en.target); m.on = en.isIntersecting; }));
  marquees.forEach(m => { mqIO.observe(m.el); m.w = $('.marquee__run', m.el).offsetWidth; });
  addEventListener('resize', () => marquees.forEach(m => { m.w = $('.marquee__run', m.el).offsetWidth; }), { passive: true });

  /* ---------- scroll-linked: hero drift, header hide/show, fills ---------- */
  const hero = $('.home-hero, .page-hero');
  let lastY = scrollY, vel = 0, dir = 1;
  function onScrollFrame() {
    const y = scrollY, vh = innerHeight;
    const dy = y - lastY;
    vel = lerp(vel, dy, 0.3);
    if (dy) dir = dy > 0 ? 1 : -1;
    if (hero) hero.style.setProperty('--p', clamp(y / hero.offsetHeight).toFixed(3));
    if (!root.classList.contains('menu-open') && !root.classList.contains('cart-open')) {
      if (dy > 6 && y > 420) root.classList.add('header-hidden');
      else if (dy < -6 || y < 200) root.classList.remove('header-hidden');
    }
    updateFills(vh);
    if (counters.length) updateCounters(vh);
    lastY = y;
  }
  $('.site-header')?.addEventListener('focusin', () => root.classList.remove('header-hidden'));

  /* ---------- cursor, magnetic buttons, hover-reveal, drag (mouse/trackpad only) ---------- */
  const mouse = { x: innerWidth / 2, y: innerHeight / 2 };
  let cursor, ring = { x: mouse.x, y: mouse.y }, reveal, revealPos = { x: 0, y: 0 }, revealOn = false;
  if (fine) {
    cursor = document.createElement('div');
    cursor.className = 'cursor'; cursor.setAttribute('aria-hidden', 'true');
    cursor.innerHTML = '<span class="cursor__ring"><span class="cursor__label"></span></span><span class="cursor__dot"></span>';
    document.body.append(cursor);
    root.classList.add('has-cursor');
    const label = $('.cursor__label', cursor);
    addEventListener('pointermove', e => {
      if (e.pointerType !== 'mouse') return;
      mouse.x = e.clientX; mouse.y = e.clientY;
      cursor.classList.add('is-visible');
    }, { passive: true });
    document.addEventListener('pointerover', e => {
      const t = e.target;
      const lab = t.closest('[data-cursor]');
      const text = t.closest('input:not([type=checkbox]):not([type=submit]), textarea, select, iframe');
      const link = t.closest('a, button, label, summary, [role=button], input[type=checkbox]');
      cursor.classList.toggle('is-label', !!lab && !text);
      cursor.classList.toggle('is-link', !lab && !!link);
      cursor.classList.toggle('is-text', !!text);
      label.textContent = lab ? lab.dataset.cursor : '';
    });
    document.addEventListener('pointerout', e => { if (!e.relatedTarget) cursor.classList.remove('is-visible'); });
    addEventListener('pointerdown', () => cursor.classList.add('is-down'));
    addEventListener('pointerup', () => cursor.classList.remove('is-down'));

    // magnetic buttons
    $$('.btn, .quick-btn, .video-toggle, .cart-button, .chip').forEach(b => {
      b.classList.add('magnetic');
      b.addEventListener('pointermove', e => {
        const r = b.getBoundingClientRect();
        b.style.translate = `${(e.clientX - r.left - r.width / 2) * 0.22}px ${(e.clientY - r.top - r.height / 2) * 0.32}px`;
      });
      b.addEventListener('pointerleave', () => { b.style.translate = ''; });
    });

    // image that follows the pointer over a list
    $$('[data-hover-reveal]').forEach(list => {
      if (!reveal) {
        reveal = document.createElement('div'); reveal.className = 'hover-reveal'; reveal.setAttribute('aria-hidden', 'true');
        reveal.innerHTML = '<img alt="" width="640" height="427">'; document.body.append(reveal);
      }
      const img = $('img', reveal);
      $$('[data-reveal]', list).forEach(a => {
        const pre = new Image(); pre.src = a.dataset.reveal;
        a.addEventListener('pointerenter', () => { img.src = a.dataset.reveal; revealOn = true; reveal.classList.add('is-on'); });
      });
      list.addEventListener('pointerleave', () => { revealOn = false; reveal.classList.remove('is-on'); });
    });

    // click-and-drag galleries
    $$('[data-drag]').forEach(track => {
      let down = false, moved = 0, sx = 0, sl = 0;
      track.addEventListener('pointerdown', e => {
        if (e.pointerType !== 'mouse' || e.button !== 0) return;
        down = true; moved = 0; sx = e.clientX; sl = track.scrollLeft;
        track.classList.add('is-dragging');
      });
      addEventListener('pointermove', e => {
        if (!down) return;
        moved = Math.abs(e.clientX - sx);
        track.scrollLeft = sl - (e.clientX - sx) * 1.2;
      });
      addEventListener('pointerup', () => { if (!down) return; down = false; track.classList.remove('is-dragging'); });
      track.addEventListener('click', e => { if (moved > 6) { e.preventDefault(); e.stopPropagation(); } }, true);
      track.addEventListener('dragstart', e => e.preventDefault());
    });
  }

  /* ---------- one animation loop ---------- */
  let prevScroll = -1;
  function frame() {
    if (scrollY !== prevScroll) { onScrollFrame(); prevScroll = scrollY; } else vel = lerp(vel, 0, 0.08);

    marquees.forEach(m => {
      if (!m.on || !m.w) return;
      m.x -= (0.45 + Math.min(Math.abs(vel), 60) * 0.12) * dir;
      if (m.x <= -m.w) m.x += m.w;
      if (m.x > 0) m.x -= m.w;
      m.track.style.transform = `translate3d(${m.x.toFixed(2)}px,0,0) skewX(${clamp(-vel * 0.15, -8, 8).toFixed(2)}deg)`;
    });

    if (cursor) {
      ring.x = lerp(ring.x, mouse.x, 0.2); ring.y = lerp(ring.y, mouse.y, 0.2);
      cursor.style.setProperty('--x', mouse.x + 'px'); cursor.style.setProperty('--y', mouse.y + 'px');
      cursor.style.setProperty('--rx', ring.x.toFixed(1) + 'px'); cursor.style.setProperty('--ry', ring.y.toFixed(1) + 'px');
    }
    if (reveal && (revealOn || reveal.classList.contains('is-on'))) {
      const nx = lerp(revealPos.x, mouse.x, 0.12), ny = lerp(revealPos.y, mouse.y, 0.12);
      const rot = clamp((mouse.x - revealPos.x) * 0.05, -8, 8);
      revealPos = { x: nx, y: ny };
      reveal.style.transform = `translate3d(${nx.toFixed(1)}px, ${ny.toFixed(1)}px, 0) translate(48px, -50%) rotate(${rot.toFixed(2)}deg)`;
    } else if (reveal) revealPos = { x: mouse.x, y: mouse.y };

    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
})();
