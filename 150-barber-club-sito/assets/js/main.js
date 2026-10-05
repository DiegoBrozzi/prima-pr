/* 150 Barber Club · comportamenti e animazioni (nessuna dipendenza) */
(() => {
  'use strict';

  const root = document.documentElement;
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
  const lerp = (a, b, t) => a + (b - a) * t;
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const fine = matchMedia('(hover: hover) and (pointer: fine)').matches;
  if (reduce) root.classList.add('reduced');

  /* ---------- Orari (modifica qui se cambiano) ----------
     giorno: 0 = domenica … 6 = sabato; fasce in minuti dalla mezzanotte */
  const HOURS = {
    2: [[600, 1140]], 3: [[600, 1140]], 4: [[600, 1140]], 5: [[600, 1140]],
    6: [[540, 1020]]
  };
  const DAYS = ['domenica', 'lunedì', 'martedì', 'mercoledì', 'giovedì', 'venerdì', 'sabato'];

  /* ---------- Spezza i testi in parole ---------- */
  let wordIndex = 0;
  function splitWords(el, wrap) {
    [...el.childNodes].forEach(node => {
      if (node.nodeType === 3) {
        const frag = document.createDocumentFragment();
        node.textContent.split(/(\s+)/).forEach(part => {
          if (!part) return;
          if (/^\s+$/.test(part)) { frag.append(' '); return; }
          frag.append(wrap(part, wordIndex++));
        });
        node.replaceWith(frag);
      } else if (node.nodeType === 1 && node.tagName !== 'BR') {
        splitWords(node, wrap);
      }
    });
  }
  $$('[data-split]').forEach(el => {
    wordIndex = 0;
    el.setAttribute('aria-label', el.textContent.replace(/\s+/g, ' ').trim());
    splitWords(el, (w, i) => {
      const o = document.createElement('span'); o.className = 'split-w'; o.setAttribute('aria-hidden', 'true');
      const s = document.createElement('span'); s.style.setProperty('--i', i); s.textContent = w;
      o.append(s); return o;
    });
  });
  const manifesto = $('[data-words]');
  let manifestoWords = [];
  if (manifesto) {
    splitWords(manifesto, w => { const s = document.createElement('span'); s.className = 'w'; s.textContent = w; return s; });
    manifestoWords = $$('.w', manifesto);
  }
  $$('.quote blockquote').forEach(q => {
    wordIndex = 0;
    splitWords(q, (w, i) => { const s = document.createElement('span'); s.className = 'qw'; s.style.setProperty('--i', i); s.textContent = w; return s; });
  });

  /* ---------- Apertura ---------- */
  const loader = $('.loader');
  const countEl = $('[data-loader-count]');
  const seen = (() => { try { return sessionStorage.getItem('b150'); } catch { return null; } })();
  function finishLoading() {
    root.classList.add('is-loaded');
    setTimeout(() => root.classList.add('is-done'), 1200);
    try { sessionStorage.setItem('b150', '1'); } catch {}
  }
  if (!loader || reduce || seen) {
    if (countEl) countEl.textContent = '150';
    requestAnimationFrame(() => requestAnimationFrame(finishLoading));
  } else {
    const dur = 1500, t0 = performance.now();
    const ease = t => 1 - Math.pow(1 - t, 3);
    (function tick(now) {
      const p = clamp((now - t0) / dur, 0, 1), e = ease(p);
      countEl.textContent = String(Math.round(e * 150)).padStart(3, '0');
      loader.style.setProperty('--p', e);
      if (p < 1) requestAnimationFrame(tick); else setTimeout(finishLoading, 180);
    })(t0);
  }

  /* ---------- Comparse allo scroll ---------- */
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      e.target.classList.add('is-in');
      if (e.target.matches('[data-count]')) countUp(e.target);
      io.unobserve(e.target);
    });
  }, { rootMargin: '0px 0px -8% 0px', threshold: .12 });
  $$('[data-reveal], [data-split], [data-count]').forEach(el => io.observe(el));

  function countUp(el) {
    const target = parseFloat(el.dataset.count), dec = +el.dataset.decimals || 0;
    if (reduce) { el.textContent = target.toFixed(dec); return; }
    const dur = 1800, t0 = performance.now();
    (function tick(now) {
      const p = clamp((now - t0) / dur, 0, 1), e = p === 1 ? 1 : 1 - Math.pow(2, -10 * p);
      el.textContent = (target * e).toFixed(dec);
      if (p < 1) requestAnimationFrame(tick);
    })(t0);
  }

  /* ---------- Navigazione ---------- */
  const nav = $('[data-nav]');
  const burger = $('[data-burger]');
  function setMenu(open) {
    root.classList.toggle('menu-open', open);
    if (open) { navHidden = false; nav.classList.remove('is-hidden'); }
    burger.setAttribute('aria-expanded', open);
    $('.sr', burger).textContent = open ? 'Chiudi il menu' : 'Apri il menu';
    document.body.style.overflow = open ? 'hidden' : '';
  }
  burger.addEventListener('click', () => setMenu(!root.classList.contains('menu-open')));
  $$('[data-menu] a').forEach(a => a.addEventListener('click', () => setMenu(false)));
  addEventListener('keydown', e => { if (e.key === 'Escape' && root.classList.contains('menu-open')) setMenu(false); });

  const navLinks = $$('.nav__links a');
  const spy = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      navLinks.forEach(a => a.classList.toggle('is-active', a.getAttribute('href') === '#' + e.target.id));
    });
  }, { rootMargin: '-45% 0px -50% 0px' });
  navLinks.forEach(a => { const s = $(a.getAttribute('href')); if (s) spy.observe(s); });

  /* ---------- Galleria orizzontale ---------- */
  const hs = $('[data-hscroll]');
  const hsTrack = $('[data-hscroll-track]');
  const hsBar = $('[data-hscroll-bar]');
  let hsOn = false, hsDist = 0;
  function setupHScroll() {
    const want = !reduce && innerWidth >= 900;
    hs.classList.toggle('hscroll-on', want);
    hsOn = want;
    if (!want) { hs.style.height = ''; hsTrack.style.transform = ''; return; }
    hsDist = Math.max(0, hsTrack.scrollWidth - innerWidth);
    hs.style.height = (innerHeight + hsDist) + 'px';
  }

  /* ---------- Nastro ---------- */
  const marquees = $$('[data-marquee]').map(row => {
    const track = $('.marquee__track', row);
    const items = [...track.children];
    for (let k = 0; k < 3; k++) items.forEach(n => track.append(n.cloneNode(true)));
    return { row, track, dir: +row.dataset.marquee, x: 0, w: 0, base: items };
  });
  function measureMarquees() {
    marquees.forEach(m => {
      const first = m.track.children[0], next = m.track.children[m.base.length];
      m.w = next.offsetLeft - first.offsetLeft;
    });
  }

  /* ---------- Parallasse ---------- */
  const parallax = $$('[data-parallax]').map(el => ({ el, f: parseFloat(el.dataset.parallax) || 0 }));

  /* ---------- Ciclo principale ---------- */
  const prog = $('.progress');
  const dock = $('[data-dock]');
  const hero = $('.hero');
  const stepsList = $('[data-steps]');
  let lastY = scrollY, vel = 0, navHidden = false, ticking = false;

  function onScroll() {
    const y = scrollY, vh = innerHeight;
    const max = document.documentElement.scrollHeight - vh;
    prog.style.setProperty('--p', max > 0 ? y / max : 0);

    nav.classList.toggle('is-scrolled', y > 40);
    const down = y > lastY;
    if (!root.classList.contains('menu-open')) {
      const hide = down && y > 400;
      if (hide !== navHidden) { navHidden = hide; nav.classList.toggle('is-hidden', hide); }
    }
    if (dock) dock.classList.toggle('is-on', y > hero.offsetHeight * .7);

    if (!reduce) {
      parallax.forEach(({ el, f }) => {
        const r = el.parentElement.getBoundingClientRect();
        if (r.bottom < -200 || r.top > vh + 200) return;
        const off = (r.top + r.height / 2) - vh / 2;
        el.style.transform = `translate3d(0, ${(-off * f).toFixed(1)}px, 0)`;
      });
    }

    if (manifestoWords.length) {
      const r = manifesto.getBoundingClientRect();
      const p = reduce ? 1 : clamp((vh * .85 - r.top) / (r.height + vh * .35), 0, 1);
      const n = Math.round(p * manifestoWords.length);
      manifestoWords.forEach((w, i) => w.classList.toggle('on', i < n));
    }

    if (hsOn) {
      const r = hs.getBoundingClientRect();
      const p = clamp(-r.top / (r.height - vh), 0, 1);
      hsTrack.style.transform = `translate3d(${(-p * hsDist).toFixed(1)}px, 0, 0)`;
      hsBar.style.setProperty('--p', p);
    }

    if (stepsList) {
      const r = stepsList.getBoundingClientRect();
      stepsList.querySelector('.steps__line').style.setProperty('--p', clamp((vh * .6 - r.top) / r.height, 0, 1));
    }

    lastY = y;
    ticking = false;
  }
  addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(onScroll); } }, { passive: true });

  let prevY = scrollY;
  function frame() {
    const y = scrollY;
    vel = lerp(vel, y - prevY, .12);
    prevY = y;
    if (!reduce) {
      marquees.forEach(m => {
        if (!m.w) return;
        m.x -= (0.6 + Math.min(Math.abs(vel) * .35, 14)) * m.dir;
        if (m.x <= -m.w) m.x += m.w;
        if (m.x > 0) m.x -= m.w;
        m.track.style.transform = `translate3d(${m.x.toFixed(2)}px,0,0) skewX(${clamp(-vel * .25, -10, 10).toFixed(2)}deg)`;
      });
    }
    requestAnimationFrame(frame);
  }

  function layout() { measureMarquees(); setupHScroll(); onScroll(); }
  addEventListener('resize', (() => { let t; return () => { clearTimeout(t); t = setTimeout(layout, 120); }; })());
  addEventListener('load', layout);
  document.fonts && document.fonts.ready.then(layout);
  layout();
  requestAnimationFrame(frame);

  /* ---------- Cursore, bottoni magnetici, inclinazione 3D ---------- */
  if (fine && !reduce) {
    const cur = $('.cursor'), ring = $('.cursor__ring'), dot = $('.cursor__dot'), label = $('.cursor__label');
    let mx = innerWidth / 2, my = innerHeight / 2, rx = mx, ry = my;
    addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; cur.classList.remove('is-hidden'); }, { passive: true });
    document.addEventListener('mouseleave', () => cur.classList.add('is-hidden'));
    (function loop() {
      rx = lerp(rx, mx, .18); ry = lerp(ry, my, .18);
      dot.style.transform = `translate3d(${mx}px, ${my}px, 0)`;
      ring.style.transform = `translate3d(${rx}px, ${ry}px, 0)`;
      requestAnimationFrame(loop);
    })();
    document.addEventListener('mouseover', e => {
      const lab = e.target.closest('[data-cursor]');
      const link = e.target.closest('a, button');
      cur.classList.toggle('is-label', !!lab);
      cur.classList.toggle('on-light', !!e.target.closest('.reviews'));
      cur.classList.toggle('is-link', !lab && !!link);
      if (lab) label.textContent = lab.dataset.cursor;
    });

    $$('[data-magnetic]').forEach(el => {
      el.addEventListener('mousemove', e => {
        const r = el.getBoundingClientRect();
        const dx = e.clientX - (r.left + r.width / 2), dy = e.clientY - (r.top + r.height / 2);
        el.style.transform = `translate(${dx * .25}px, ${dy * .35}px)`;
      });
      el.addEventListener('mouseleave', () => { el.style.transform = ''; });
    });

    $$('[data-tilt]').forEach(el => {
      el.addEventListener('mousemove', e => {
        if (el.hasAttribute('data-reveal') && !el.classList.contains('is-in')) return;
        const r = el.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - .5, py = (e.clientY - r.top) / r.height - .5;
        el.style.transition = 'transform .25s ease-out, border-color .4s, clip-path 1.4s';
        el.style.transform = `perspective(900px) rotateY(${px * 8}deg) rotateX(${-py * 8}deg)`;
      });
      el.addEventListener('mouseleave', () => {
        el.style.transition = 'transform .9s cubic-bezier(.22,1,.36,1), border-color .4s, clip-path 1.4s';
        el.style.transform = '';
      });
    });

    /* immagine che segue il mouse sul listino */
    const list = $('[data-hover-img]');
    const hv = $('.hover-img', list), hvImg = $('img', hv);
    let hx = 0, hy = 0, tx = 0, ty = 0, hvOn = false;
    $$('.svc', list).forEach(s => {
      new Image().src = s.dataset.img;
      s.addEventListener('mouseenter', () => {
        hvImg.src = s.dataset.img;
        hv.style.setProperty('--r', (Math.random() * 10 - 5).toFixed(1) + 'deg');
        hv.classList.add('is-on'); hvOn = true;
      });
    });
    list.addEventListener('mouseleave', () => { hv.classList.remove('is-on'); hvOn = false; });
    list.addEventListener('mousemove', e => { tx = e.clientX - 120; ty = e.clientY - 360; });
    (function follow() {
      if (hvOn) { hx = lerp(hx || tx, tx, .14); hy = lerp(hy || ty, ty, .14); hv.style.translate = `${hx}px ${hy}px`; }
      requestAnimationFrame(follow);
    })();
  }

  /* ---------- Recensioni ---------- */
  const quotes = $('[data-quotes]');
  if (quotes) {
    const items = $$('.quote', quotes), tabs = $$('.quotes__nav button', quotes);
    let cur = 0;
    const show = i => {
      cur = (i + items.length) % items.length;
      items.forEach((q, k) => q.classList.toggle('is-active', k === cur));
      tabs.forEach((t, k) => t.setAttribute('aria-selected', k === cur));
    };
    tabs.forEach((t, k) => t.addEventListener('click', () => show(k)));
    if (!reduce) {
      tabs.forEach(t => $('i', t).addEventListener('animationend', () => show(cur + 1)));
      quotes.addEventListener('mouseenter', () => quotes.classList.add('is-paused'));
      quotes.addEventListener('mouseleave', () => quotes.classList.remove('is-paused'));
      new IntersectionObserver(([e]) => quotes.classList.toggle('is-paused', !e.isIntersecting)).observe(quotes);
    }
    show(0);
  }

  /* ---------- Aperto / chiuso ---------- */
  function romeNow() {
    const parts = Object.fromEntries(new Intl.DateTimeFormat('en-GB', {
      timeZone: 'Europe/Rome', weekday: 'short', hour: '2-digit', minute: '2-digit', hourCycle: 'h23'
    }).formatToParts(new Date()).map(p => [p.type, p.value]));
    const day = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].indexOf(parts.weekday);
    return { day, min: +parts.hour * 60 + +parts.minute };
  }
  const hhmm = m => String(Math.floor(m / 60)).padStart(2, '0') + ':' + String(m % 60).padStart(2, '0');
  function updateStatus() {
    const { day, min } = romeNow();
    const today = HOURS[day] || [];
    const slot = today.find(([a, b]) => min >= a && min < b);
    let short, long, open = !!slot;
    if (slot) {
      const left = slot[1] - min;
      short = left <= 45 ? `Aperto · chiude tra ${left} min` : 'Aperto ora';
      long = `Chiude alle ${hhmm(slot[1])}. Prenota per non aspettare.`;
    } else {
      let d = 0, next = null;
      const later = today.find(([a]) => a > min);
      if (later) next = { d: 0, at: later[0] };
      while (!next && d < 7) { d++; const h = HOURS[(day + d) % 7]; if (h) next = { d, at: h[0][0] }; }
      const when = next.d === 0 ? 'oggi' : next.d === 1 ? 'domani' : DAYS[(day + next.d) % 7];
      short = `Chiuso · riapre ${when} ${hhmm(next.at)}`;
      long = `Riapriamo ${when} alle ${hhmm(next.at)}. Puoi già prenotare online.`;
    }
    $$('[data-status]').forEach(s => {
      s.classList.toggle('is-open', open); s.classList.toggle('is-closed', !open);
      $('[data-status-text]', s).textContent = s.classList.contains('status--lg') ? (open ? 'Aperto ora' : 'Ora chiuso') : short;
    });
    const sub = $('[data-status-sub]'); if (sub) sub.textContent = long;
    $$('[data-hours] li').forEach(li => li.classList.toggle('is-today', +li.dataset.day === day));
  }
  updateStatus();
  setInterval(updateStatus, 60000);

  /* ---------- Mappa su richiesta (niente cookie Google finché non si clicca) ---------- */
  const mapBtn = $('[data-map-load]');
  if (mapBtn) mapBtn.addEventListener('click', () => {
    const f = document.createElement('iframe');
    f.src = 'https://www.google.com/maps?q=150+Barber+Club,+Via+Antonio+Gramsci+150,+06073+Chiugiana+PG&output=embed';
    f.title = 'Mappa: 150 Barber Club, Via Antonio Gramsci 150, Chiugiana';
    f.loading = 'lazy'; f.referrerPolicy = 'no-referrer-when-downgrade';
    const map = $('[data-map]');
    map.replaceChildren(f);
  });

  /* ---------- Anno nel footer ---------- */
  const yr = $('[data-year]'); if (yr) yr.textContent = new Date().getFullYear();
})();
