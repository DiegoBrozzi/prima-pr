/* Intertec srl — interazioni */
(() => {
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const fine = matchMedia('(hover: hover) and (pointer: fine)').matches;

  /* ---------- Testi per lingua (la pagina dichiara la sua in <html lang>) ---------- */
  const T = {
    it: {
      menuOpen: 'Apri il menu', menuClose: 'Chiudi il menu',
      ghostOn: 'Privacy attiva', ghostOff: 'Vetro trasparente',
      switchOn: 'Disattiva la privacy', switchOff: 'Attiva la privacy',
      invalid: 'Inserisci nome ed email validi.',
      sent: 'Grazie! Completa l\'invio dal tuo programma di posta.',
      subject: 'Richiesta sopralluogo dal sito',
      name: 'Nome', phone: 'Telefono', interest: 'Interessato a'
    },
    en: {
      menuOpen: 'Open menu', menuClose: 'Close menu',
      ghostOn: 'Privacy on', ghostOff: 'Clear glass',
      switchOn: 'Turn privacy off', switchOff: 'Turn privacy on',
      invalid: 'Please enter a valid name and email.',
      sent: 'Thank you! Finish sending from your email app.',
      subject: 'Site survey request from the website',
      name: 'Name', phone: 'Phone', interest: 'Interested in'
    }
  };
  const t = T[document.documentElement.lang.slice(0, 2)] || T.it;

  /* ---------- Nav: sfondo, auto-hide, voce attiva ---------- */
  const nav = $('#nav');
  const bar = $('.progress');
  let lastY = 0;
  const onScroll = () => {
    const y = scrollY;
    nav.classList.toggle('is-scrolled', y > 20);
    const menuOpen = $('.burger').getAttribute('aria-expanded') === 'true';
    nav.classList.toggle('is-hidden', !menuOpen && y > 500 && y > lastY + 4);
    if (y < lastY - 4 || y < 500) nav.classList.remove('is-hidden');
    lastY = y;
    const max = document.documentElement.scrollHeight - innerHeight;
    bar.style.setProperty('--p', max > 0 ? y / max : 0);
    updateSteps();
  };

  const links = $$('.nav__links a');
  const spy = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      links.forEach(a => a.classList.toggle('is-active', a.getAttribute('href') === '#' + e.target.id));
    });
  }, { rootMargin: '-45% 0px -50% 0px' });
  links.forEach(a => { const s = $(a.getAttribute('href')); if (s) spy.observe(s); });

  /* ---------- Menu mobile ---------- */
  const burger = $('.burger');
  const menu = $('#mobile-menu');
  const setMenu = open => {
    burger.setAttribute('aria-expanded', open);
    burger.setAttribute('aria-label', open ? t.menuClose : t.menuOpen);
    menu.hidden = !open;
  };
  burger.addEventListener('click', () => setMenu(menu.hidden));
  $$('a', menu).forEach(a => a.addEventListener('click', () => setMenu(false)));
  addEventListener('keydown', e => { if (e.key === 'Escape') setMenu(false); });

  /* ---------- Reveal ---------- */
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      e.target.classList.add('is-in');
      io.unobserve(e.target);
    });
  }, { threshold: .15, rootMargin: '0px 0px -40px 0px' });
  $$('.reveal').forEach(el => io.observe(el));

  /* ---------- Contatori ---------- */
  const countUp = el => {
    const to = +el.dataset.to;
    if (reduced) { el.textContent = to; return; }
    const t0 = performance.now(), dur = 1800;
    const tick = t => {
      const k = Math.min((t - t0) / dur, 1);
      el.textContent = Math.round(to * (1 - Math.pow(1 - k, 4)));
      if (k < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };
  const co = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { countUp(e.target); co.unobserve(e.target); } });
  }, { threshold: 1 });
  $$('.count').forEach(el => co.observe(el));

  /* ---------- Tilt della finestra nell'hero ---------- */
  const win = $('.window.tilt');
  if (win && fine && !reduced) {
    const hero = $('.hero');
    hero.addEventListener('pointermove', e => {
      const r = hero.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - .5;
      const y = (e.clientY - r.top) / r.height - .5;
      win.style.setProperty('--ry', `${x * 12}deg`);
      win.style.setProperty('--rx', `${-y * 10}deg`);
    });
    hero.addEventListener('pointerleave', () => {
      win.style.setProperty('--ry', '0deg');
      win.style.setProperty('--rx', '0deg');
    });
  }

  /* ---------- Bottoni magnetici ---------- */
  if (fine && !reduced) {
    $$('.magnetic').forEach(btn => {
      btn.addEventListener('pointermove', e => {
        const r = btn.getBoundingClientRect();
        btn.style.setProperty('--bx', `${(e.clientX - r.left - r.width / 2) * .18}px`);
        btn.style.setProperty('--by', `${(e.clientY - r.top - r.height / 2) * .3}px`);
      });
      btn.addEventListener('pointerleave', () => {
        btn.style.setProperty('--bx', '0px');
        btn.style.setProperty('--by', '0px');
      });
    });
  }

  /* ---------- Spotlight sulle card ---------- */
  $$('.card').forEach(card => {
    card.addEventListener('pointermove', e => {
      const r = card.getBoundingClientRect();
      card.style.setProperty('--mx', `${e.clientX - r.left}px`);
      card.style.setProperty('--my', `${e.clientY - r.top}px`);
    });
  });

  /* ---------- Confronto prima/dopo ---------- */
  const cmp = $('#compare');
  if (cmp) {
    const range = $('.compare__range', cmp);
    const meters = $$('.meter i');
    const set = v => {
      cmp.style.setProperty('--pos', v + '%');
      // a sinistra della maniglia si vede il vetro nudo: più la maniglia va a sinistra, più "pellicola" si vede
      const film = 1 - v / 100;
      meters.forEach(m => {
        const b = +m.dataset.before, a = +m.dataset.after;
        m.style.setProperty('--w', (b + (a - b) * film) + '%');
      });
    };
    range.addEventListener('input', () => set(+range.value));
    range.addEventListener('pointerdown', () => cmp.classList.add('is-dragging'));
    addEventListener('pointerup', () => cmp.classList.remove('is-dragging'));
    set(50);

    // piccola animazione dimostrativa quando entra in vista
    if (!reduced) {
      const demo = new IntersectionObserver(([e]) => {
        if (!e.isIntersecting) return;
        demo.disconnect();
        const keys = [[0, 50], [700, 80], [1500, 22], [2300, 50]];
        const t0 = performance.now();
        const ease = k => k < .5 ? 4 * k * k * k : 1 - Math.pow(-2 * k + 2, 3) / 2;
        let touched = false;
        range.addEventListener('pointerdown', () => touched = true, { once: true });
        const step = t => {
          if (touched) return;
          const dt = t - t0;
          let i = keys.findIndex(k => k[0] > dt);
          if (i === -1) { range.value = 50; set(50); return; }
          const [ta, va] = keys[i - 1], [tb, vb] = keys[i];
          const v = va + (vb - va) * ease((dt - ta) / (tb - ta));
          range.value = v; set(v);
          requestAnimationFrame(step);
        };
        setTimeout(() => requestAnimationFrame(step), 400);
      }, { threshold: .6 });
      demo.observe(cmp);
    }
  }

  /* ---------- Ghost Film ---------- */
  const sw = $('#ghost-switch');
  const ghost = $('#ghost-demo');
  if (sw && ghost) {
    const status = $('.ghost__status', ghost);
    const label = $('.switch__text', sw);
    const toggle = on => {
      sw.setAttribute('aria-checked', on);
      ghost.dataset.on = on;
      status.textContent = on ? t.ghostOn : t.ghostOff;
      label.textContent = on ? t.switchOn : t.switchOff;
      ghost.classList.remove('flash'); void ghost.offsetWidth; ghost.classList.add('flash');
    };
    sw.addEventListener('click', () => toggle(sw.getAttribute('aria-checked') !== 'true'));
    ghost.addEventListener('click', () => toggle(sw.getAttribute('aria-checked') !== 'true'));
    ghost.style.cursor = 'pointer';
  }

  /* ---------- Linea dei passaggi ---------- */
  const steps = $('#steps');
  const stepItems = steps ? $$('.step', steps) : [];
  const line = steps && $('.steps__line', steps);
  function updateSteps() {
    if (!steps) return;
    const r = steps.getBoundingClientRect();
    const k = Math.min(Math.max((innerHeight * .75 - r.top) / (r.height + innerHeight * .2), 0), 1);
    if (line) line.style.setProperty('--sp', k);
    stepItems.forEach((s, i) => s.classList.toggle('is-lit', k >= i / stepItems.length + .05));
  }

  /* ---------- Form → email precompilata ---------- */
  const form = $('#form');
  if (form) {
    form.addEventListener('submit', e => {
      e.preventDefault();
      let ok = true;
      ['#f-nome', '#f-email'].forEach(id => {
        const input = $(id);
        const valid = input.checkValidity() && input.value.trim();
        input.parentElement.classList.toggle('is-invalid', !valid);
        if (!valid) ok = false;
      });
      const note = $('#form-note');
      if (!ok) { note.textContent = t.invalid; note.classList.remove('ok'); return; }
      const d = new FormData(form);
      const interessi = d.getAll('interesse').join(', ') || '—';
      const body = [
        `${t.name}: ${d.get('nome')}`,
        `Email: ${d.get('email')}`,
        `${t.phone}: ${d.get('telefono') || '—'}`,
        `${t.interest}: ${interessi}`,
        '',
        d.get('messaggio') || ''
      ].join('\n');
      location.href = `mailto:info@intertecsrl.it?subject=${encodeURIComponent(t.subject)}&body=${encodeURIComponent(body)}`;
      note.textContent = t.sent;
      note.classList.add('ok');
    });
    $$('.field input', form).forEach(i => i.addEventListener('input', () => i.parentElement.classList.remove('is-invalid')));
  }

  $('#year').textContent = new Date().getFullYear();
  addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();
