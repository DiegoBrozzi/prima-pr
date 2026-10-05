/* Top Melon · interazioni e animazioni (nessuna dipendenza esterna) */
(() => {
  'use strict';

  const root = document.documentElement;
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];

  /* ---------- Preloader ---------- */
  let loaded = false;
  const reveal = () => {
    if (loaded) return;
    loaded = true;
    root.classList.add('is-loaded');
    // dopo l'ingresso, il melone segue il mouse senza ritardi
    setTimeout(() => $('.hero__melon')?.classList.add('is-ready'), 2800);
  };
  if (reduced) reveal();
  else {
    window.addEventListener('load', () => setTimeout(reveal, 500));
    setTimeout(reveal, 2500); // rete lenta: non bloccare la pagina
  }

  /* ---------- Anno nel footer ---------- */
  const y = $('#year');
  if (y) y.textContent = new Date().getFullYear();

  /* ---------- Header: compatto, nascosto in discesa ---------- */
  const header = $('.header');
  const bar = $('.progress span');
  let lastY = window.scrollY;
  let ticking = false;

  /* ---------- Parallax ---------- */
  const parallax = $$('[data-speed]');

  /* ---------- Parole del manifesto ---------- */
  const manifesto = $('[data-words]');
  let words = [];
  if (manifesto) {
    const accent = new Set(['10%', 'amore,', 'amore']);
    manifesto.innerHTML = manifesto.textContent.trim().split(/\s+/).map((w) =>
      `<span class="w${accent.has(w) ? ' accent' : ''}">${w}</span>`).join(' ');
    words = $$('.w', manifesto);
  }

  /* ---------- Timeline ---------- */
  const timeline = $('.timeline');

  const onScroll = () => {
    const sy = window.scrollY;
    const vh = window.innerHeight;

    // barra di avanzamento
    const max = document.documentElement.scrollHeight - vh;
    if (bar) bar.style.setProperty('--p', max > 0 ? (sy / max).toFixed(4) : 0);

    // header
    header.classList.toggle('is-scrolled', sy > 40);
    const menuOpen = $('.nav')?.classList.contains('is-open');
    header.classList.toggle('is-hidden', !menuOpen && sy > lastY && sy > 600);
    lastY = sy;

    if (!reduced) {
      // parallax
      for (const el of parallax) {
        const r = el.getBoundingClientRect();
        if (r.bottom < -200 || r.top > vh + 200) continue;
        const center = r.top + r.height / 2 - vh / 2;
        el.style.transform = `translate3d(0, ${(center * -parseFloat(el.dataset.speed)).toFixed(1)}px, 0)`;
      }

      // manifesto: le parole si accendono con lo scroll
      if (words.length) {
        const r = manifesto.getBoundingClientRect();
        const p = Math.min(1, Math.max(0, (vh * .85 - r.top) / (r.height + vh * .35)));
        const n = Math.round(p * words.length);
        words.forEach((w, i) => w.classList.toggle('on', i < n));
      }
    }

    // timeline
    if (timeline) {
      const r = timeline.getBoundingClientRect();
      const p = Math.min(1, Math.max(0, (vh * .7 - r.top) / r.height));
      timeline.style.setProperty('--tl', p.toFixed(3));
    }

    ticking = false;
  };
  window.addEventListener('scroll', () => {
    if (!ticking) { requestAnimationFrame(onScroll); ticking = true; }
  }, { passive: true });
  window.addEventListener('resize', onScroll);
  onScroll();
  if (reduced) words.forEach((w) => w.classList.add('on'));

  /* ---------- Menu mobile ---------- */
  const burger = $('.burger');
  const nav = $('#menu');
  const setMenu = (open) => {
    nav.classList.toggle('is-open', open);
    burger.setAttribute('aria-expanded', String(open));
    burger.setAttribute('aria-label', open ? 'Chiudi il menu' : 'Apri il menu');
    document.body.style.overflow = open ? 'hidden' : '';
  };
  burger?.addEventListener('click', () => setMenu(!nav.classList.contains('is-open')));
  $$('a', nav).forEach((a) => a.addEventListener('click', () => setMenu(false)));
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && nav.classList.contains('is-open')) { setMenu(false); burger.focus(); }
  });

  /* ---------- Voce di menu attiva ---------- */
  const links = $$('.nav ul a');
  const sections = links.map((a) => $(a.getAttribute('href'))).filter(Boolean);
  const navIO = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      links.forEach((a) => a.classList.toggle('is-current', a.getAttribute('href') === `#${e.target.id}`));
    });
  }, { rootMargin: '-45% 0px -50% 0px' });
  sections.forEach((s) => navIO.observe(s));

  /* ---------- Rivelazioni allo scroll ---------- */
  // ritardo progressivo per gli elementi in griglia
  $$('.pgrid .pcard').forEach((el, i) => el.style.setProperty('--d', `${(i % 3) * 0.1}s`));

  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      e.target.classList.add('is-in');
      e.target.querySelectorAll(':scope > [data-clip]').forEach((c) => c.classList.add('is-in'));
      e.target.querySelectorAll('[data-count]').forEach(count);
      if (e.target.matches('[data-count]')) count(e.target);
      io.unobserve(e.target);
    });
  }, { rootMargin: '0px 0px -12% 0px', threshold: 0.08 });
  $$('[data-reveal], .cal, .pillar, .timeline li').forEach((el) => io.observe(el));
  // un elemento ritagliato con clip-path risulta invisibile all'observer: si osserva il contenitore
  new Set($$('[data-clip]').map((el) => el.parentElement)).forEach((p) => io.observe(p));

  /* ---------- Contatori ---------- */
  const fmt = new Intl.NumberFormat('it-IT');
  function count(el) {
    if (el.dataset.done) return;
    el.dataset.done = '1';
    const to = +el.dataset.count;
    const pre = el.dataset.prefix || '';
    const out = (v) => pre + (el.hasAttribute('data-sep') ? fmt.format(v) : v);
    if (reduced) { el.textContent = out(to); return; }
    const dur = 2000;
    const t0 = performance.now();
    const tick = (t) => {
      const p = Math.min(1, (t - t0) / dur);
      const eased = 1 - Math.pow(1 - p, 4);
      el.textContent = out(Math.round(to * eased));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }

  /* ---------- Hero: semi che salgono e parallax col mouse ---------- */
  const seeds = $('.seeds');
  if (seeds && !reduced) {
    const n = window.innerWidth < 700 ? 10 : 22;
    for (let i = 0; i < n; i++) {
      const s = document.createElement('span');
      s.className = 'seed';
      s.style.cssText = `left:${Math.random() * 100}%;bottom:${-Math.random() * 10}%;--t:${10 + Math.random() * 12}s;--delay:${-Math.random() * 20}s;--dx:${(Math.random() - .5) * 160}px;--r:${(Math.random() - .5) * 720}deg;scale:${.6 + Math.random() * .8}`;
      seeds.appendChild(s);
    }
  }

  const hero = $('.hero');
  const depthEls = $$('[data-depth]');
  if (hero && finePointer && !reduced) {
    hero.addEventListener('pointermove', (e) => {
      const r = hero.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - .5;
      const yy = (e.clientY - r.top) / r.height - .5;
      depthEls.forEach((el) => {
        const d = +el.dataset.depth;
        el.style.setProperty('--mx', `${(x * d).toFixed(1)}px`);
        el.style.setProperty('--my', `${(yy * d).toFixed(1)}px`);
      });
    });
    hero.addEventListener('pointerleave', () => depthEls.forEach((el) => {
      el.style.setProperty('--mx', '0px');
      el.style.setProperty('--my', '0px');
    }));
  }

  /* ---------- Bottoni magnetici ---------- */
  if (finePointer && !reduced) {
    $$('[data-magnetic]').forEach((b) => {
      b.addEventListener('pointermove', (e) => {
        const r = b.getBoundingClientRect();
        b.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * .25}px, ${(e.clientY - r.top - r.height / 2) * .35}px)`;
      });
      b.addEventListener('pointerleave', () => { b.style.transform = ''; });
    });
  }

  /* ---------- Card prodotto: inclinazione 3D ---------- */
  if (finePointer && !reduced) {
    $$('.pcard__btn').forEach((c) => {
      c.addEventListener('pointermove', (e) => {
        const r = c.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - .5;
        const yy = (e.clientY - r.top) / r.height - .5;
        c.style.setProperty('--ry', `${(x * 10).toFixed(2)}deg`);
        c.style.setProperty('--rx', `${(-yy * 10).toFixed(2)}deg`);
      });
      c.addEventListener('pointerleave', () => {
        c.style.setProperty('--ry', '0deg');
        c.style.setProperty('--rx', '0deg');
      });
    });
  }

  /* ---------- Scheda prodotto (dialog) ---------- */
  const dlg = $('#pd');
  const dlgBody = $('#pd-body');
  const dlgImg = $('#pd-img');
  let opener = null;

  const closeDialog = () => {
    if (!dlg.open || dlg.classList.contains('is-closing')) return;
    if (reduced) { dlg.close(); return; }
    dlg.classList.add('is-closing');
    // a tempo, non su animationend: anche le animazioni interne alla scheda emettono quell'evento
    setTimeout(() => {
      dlg.classList.remove('is-closing');
      dlg.close();
    }, 340);
  };

  $$('[data-product]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const id = btn.dataset.product;
      const tpl = $(`#p-${id}`);
      if (!tpl || !dlg) return;
      opener = btn;
      const card = btn.closest('.pcard');
      const cs = getComputedStyle(card);
      dlg.style.setProperty('--c', cs.getPropertyValue('--c'));
      dlg.style.setProperty('--c2', cs.getPropertyValue('--c2'));
      dlgBody.replaceChildren(tpl.content.cloneNode(true));
      const title = $('.pd__title', dlgBody);
      if (title) title.id = 'pd-heading';
      const img = $('.pcard__img', btn);
      dlgImg.src = img.currentSrc.replace('-sm.', '-lg.');
      dlgImg.alt = '';
      // riavvia le animazioni d'ingresso dell'immagine
      dlgImg.style.animation = 'none';
      void dlgImg.offsetWidth;
      dlgImg.style.animation = '';
      dlg.showModal();
      document.body.style.overflow = 'hidden';
    });
  });

  dlg?.addEventListener('click', (e) => {
    if (e.target === dlg || e.target.closest('[data-close]')) closeDialog();
  });
  dlg?.addEventListener('cancel', (e) => { e.preventDefault(); closeDialog(); });
  dlg?.addEventListener('close', () => {
    document.body.style.overflow = '';
    opener?.focus();
  });

  /* ---------- Calendario: indicatore "oggi" ---------- */
  const cal = $('.cal');
  const now = $('.cal__now');
  const placeNow = () => {
    if (!cal || !now) return;
    const months = $('.cal__row:not(.cal__row--head) .cal__months', cal);
    const d = new Date();
    const frac = (d.getMonth() + (d.getDate() - 1) / 31) / 12;
    const cr = cal.getBoundingClientRect();
    const mr = months.getBoundingClientRect();
    now.style.setProperty('--now-x', `${(mr.left - cr.left + cal.scrollLeft + mr.width * frac).toFixed(1)}px`);
  };
  placeNow();
  window.addEventListener('resize', placeNow);
  window.addEventListener('load', placeNow);

  /* ---------- Filiera: immagine che cambia con il passo attivo ---------- */
  const steps = $$('.step');
  const frames = $$('.chain__frame img');
  const counter = $('.chain__count b');
  const setStep = (i) => {
    steps.forEach((s, k) => s.classList.toggle('is-active', k === i));
    frames.forEach((f, k) => f.classList.toggle('is-active', k === i));
    if (counter) counter.textContent = String(i + 1).padStart(2, '0');
  };
  // le foto non attive sono ritagliate a zero e il lazy-loading non le scaricherebbe mai:
  // si caricano tutte quando la sezione si avvicina
  const chain = $('.chain');
  if (chain) {
    const preload = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      frames.forEach((f) => { f.loading = 'eager'; });
      preload.disconnect();
    }, { rootMargin: '600px 0px' });
    preload.observe(chain);
  }

  const stepIO = new IntersectionObserver((entries) => {
    entries.forEach((e) => { if (e.isIntersecting) setStep(+e.target.dataset.step); });
  }, { rootMargin: '-45% 0px -45% 0px' });
  steps.forEach((s) => stepIO.observe(s));

  /* ---------- Modulo contatti ---------- */
  const form = $('#form');
  const err = $('#form-error');
  form?.addEventListener('submit', (e) => {
    e.preventDefault();
    let firstBad = null;
    $$('.field', form).forEach((f) => f.classList.remove('is-invalid'));
    for (const el of $$('[required]', form)) {
      const ok = el.type === 'checkbox' ? el.checked : el.checkValidity() && el.value.trim() !== '';
      if (!ok) {
        el.closest('.field')?.classList.add('is-invalid');
        el.setAttribute('aria-invalid', 'true');
        firstBad ??= el;
      } else el.removeAttribute('aria-invalid');
    }
    if (firstBad) {
      err.textContent = firstBad.type === 'checkbox'
        ? 'Per inviare il messaggio serve il consenso alla privacy.'
        : firstBad.type === 'email' && firstBad.value ? 'Controlla l\'indirizzo email.' : 'Compila i campi obbligatori.';
      firstBad.focus();
      return;
    }
    err.textContent = '';
    const d = new FormData(form);
    const body = `${d.get('messaggio')}\n\n—\n${d.get('nome')}\n${d.get('email')}${d.get('telefono') ? `\n${d.get('telefono')}` : ''}`;
    const subject = `Richiesta dal sito da ${d.get('nome')}`;
    window.location.href = `mailto:info@topmelon.it?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    form.classList.add('is-sent');
  });
})();
