(() => {
  // Testi dell'interfaccia nelle tre lingue (la lingua viene da <html lang="...">)
  const STRINGS = {
    it: {
      menuOpen: 'Apri menu', menuClose: 'Chiudi menu',
      videoPause: 'Metti in pausa il video', videoPlay: 'Riproduci il video',
      formError: 'Compila i campi evidenziati.',
      formDemo: 'Questa è un’anteprima: il modulo verrà collegato all’invio email con la messa online. Per ora scrivi a info@primatech.it.',
      formSent: 'Grazie! Si sta aprendo il tuo programma di posta per completare l’invio.',
      mailSubject: '[Sito]', name: 'Nome', company: 'Azienda', phone: 'Telefono', thousands: '.',
    },
    en: {
      menuOpen: 'Open menu', menuClose: 'Close menu',
      videoPause: 'Pause video', videoPlay: 'Play video',
      formError: 'Please fill in the highlighted fields.',
      formDemo: 'This is a preview: the form will be connected to email once the site goes live. For now, write to info@primatech.it.',
      formSent: 'Thank you! Your email app is opening so you can send the request.',
      mailSubject: '[Website]', name: 'Name', company: 'Company', phone: 'Phone', thousands: ',',
    },
    de: {
      menuOpen: 'Menü öffnen', menuClose: 'Menü schließen',
      videoPause: 'Video anhalten', videoPlay: 'Video abspielen',
      formError: 'Bitte füllen Sie die markierten Felder aus.',
      formDemo: 'Dies ist eine Vorschau: Das Formular wird mit dem Livegang der Website an den E-Mail-Versand angebunden. Schreiben Sie uns bis dahin an info@primatech.it.',
      formSent: 'Vielen Dank! Ihr E-Mail-Programm öffnet sich, um die Anfrage zu senden.',
      mailSubject: '[Website]', name: 'Name', company: 'Unternehmen', phone: 'Telefon', thousands: '.',
    },
  };
  const t = STRINGS[document.documentElement.lang] || STRINGS.it;

  const header = document.querySelector('.site-header');
  const burger = document.querySelector('.burger');
  const nav = document.getElementById('nav');

  // Header solido dopo lo scroll
  const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 40);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  // Menu mobile
  const setMenu = (open) => {
    nav.classList.toggle('open', open);
    burger.setAttribute('aria-expanded', String(open));
    burger.setAttribute('aria-label', open ? t.menuClose : t.menuOpen);
    document.body.style.overflow = open ? 'hidden' : '';
  };
  burger.addEventListener('click', () => setMenu(!nav.classList.contains('open')));
  nav.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => setMenu(false)));
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') setMenu(false); });

  // Tab modelli, con indicatore che scorre sotto il tab attivo
  const tabs = [...document.querySelectorAll('[role="tab"]')];
  const tabList = document.querySelector('.tabs');
  const pill = tabList.querySelector('.tabs-pill');
  const movePill = () => {
    const on = tabs.find((t) => t.getAttribute('aria-selected') === 'true');
    pill.style.width = `${on.offsetWidth}px`;
    pill.style.transform = `translateX(${on.offsetLeft}px)`;
  };
  const select = (tab) => {
    tabs.forEach((t) => {
      const on = t === tab;
      t.setAttribute('aria-selected', String(on));
      t.tabIndex = on ? 0 : -1;
      document.getElementById(t.getAttribute('aria-controls')).hidden = !on;
    });
    movePill();
  };
  movePill();
  tabList.classList.add('ready');
  window.addEventListener('resize', movePill);
  document.fonts?.ready.then(movePill);
  tabs.forEach((t, i) => {
    t.addEventListener('click', () => select(t));
    t.addEventListener('keydown', (e) => {
      if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
      const next = tabs[(i + (e.key === 'ArrowRight' ? 1 : -1) + tabs.length) % tabs.length];
      select(next); next.focus();
    });
  });

  // Contatori hero
  const fmt = { format: (n) => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, t.thousands) };
  document.querySelectorAll('[data-count]').forEach((el) => {
    const end = +el.dataset.count;
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const t0 = performance.now(), dur = 1400;
    const tick = (now) => {
      const p = Math.min((now - t0) / dur, 1);
      el.textContent = fmt.format(Math.round(end * (1 - Math.pow(1 - p, 3))));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  });

  // I link "data-model" precompilano l'argomento del modulo
  const oggetto = document.getElementById('oggetto');
  document.querySelectorAll('[data-model]').forEach((a) => {
    a.addEventListener('click', () => {
      const opt = [...oggetto.options].find((o) => o.text === a.dataset.model);
      if (!opt) return;
      oggetto.value = opt.value;
      oggetto.classList.remove('flash'); void oggetto.offsetWidth; oggetto.classList.add('flash');
    });
  });

  // Modulo: validazione e invio via client email
  const form = document.getElementById('form');
  const note = form.querySelector('.form-note');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let ok = true;
    form.querySelectorAll('[required]').forEach((f) => {
      const bad = f.type === 'checkbox' ? !f.checked : !f.value.trim() || (f.type === 'email' && !/^\S+@\S+\.\S+$/.test(f.value));
      f.classList.toggle('invalid', bad);
      if (bad) ok = false;
    });
    if (!ok) { note.textContent = t.formError; return; }
    // Nelle anteprime pubblicate il modulo è solo dimostrativo
    if (form.dataset.demo !== undefined) {
      form.reset();
      note.textContent = t.formDemo;
      return;
    }
    const d = new FormData(form);
    const body = `${t.name}: ${d.get('nome')}\n${t.company}: ${d.get('azienda')}\nEmail: ${d.get('email')}\n${t.phone}: ${d.get('tel')}\n\n${d.get('messaggio')}`;
    window.location.href = `mailto:info@primatech.it?subject=${encodeURIComponent(t.mailSubject + ' ' + d.get('oggetto'))}&body=${encodeURIComponent(body)}`;
    note.textContent = t.formSent;
  });

  // Video di sfondo: caricati solo se l'utente non ha ridotto le animazioni né attivato il risparmio dati,
  // e messi in pausa quando escono dallo schermo
  const videos = [...document.querySelectorAll('video.bg-video')];
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const saveData = navigator.connection?.saveData;
  const toggle = document.querySelector('.video-toggle');
  const heroVideo = document.querySelector('.hero-video');
  let userPaused = false;
  if (!reduced && !saveData && videos.length) {
    const play = (v) => v.play().then(() => { v.classList.add('is-playing'); v.closest('.hero')?.classList.add('video-on'); }).catch(() => {});
    const vio = new IntersectionObserver((entries) => {
      entries.forEach(({ target: v, isIntersecting }) => {
        if (isIntersecting) {
          if (!v.src) { v.src = v.dataset.src; v.load(); }
          if (!(v === heroVideo && userPaused)) play(v);
        } else if (v.src) v.pause();
      });
    }, { rootMargin: '200px 0px' });
    videos.forEach((v) => vio.observe(v));

    if (toggle && heroVideo) {
      toggle.hidden = false;
      toggle.addEventListener('click', () => {
        userPaused = !heroVideo.paused;
        if (userPaused) heroVideo.pause(); else play(heroVideo);
        toggle.classList.toggle('paused', userPaused);
        toggle.setAttribute('aria-label', userPaused ? t.videoPlay : t.videoPause);
      });
    }
  }

  document.getElementById('y').textContent = new Date().getFullYear();
})();
