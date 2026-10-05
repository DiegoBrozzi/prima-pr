/**
 * Interazioni del sito. Tutto è "miglioramento progressivo":
 * senza JavaScript i contenuti restano visibili e i link funzionano.
 */

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const $ = <T extends Element = HTMLElement>(sel: string, root: ParentNode = document) => root.querySelector<T>(sel);
const $$ = <T extends Element = HTMLElement>(sel: string, root: ParentNode = document) =>
  Array.from(root.querySelectorAll<T>(sel));

const storage = {
  get(key: string) {
    try {
      return window.localStorage.getItem(key);
    } catch {
      return null;
    }
  },
  set(key: string, value: string) {
    try {
      window.localStorage.setItem(key, value);
    } catch {
      /* archiviazione non disponibile: si ignora */
    }
  },
};

/* --- Header: solido allo scroll, nascosto scendendo ------------------------ */
function initHeader() {
  const header = $('[data-header]');
  if (!header) return;
  let lastY = window.scrollY;
  let ticking = false;
  const update = () => {
    const y = window.scrollY;
    header.classList.toggle('is-solid', y > 24);
    const menuOpen = document.body.classList.contains('menu-open');
    const goingDown = y > lastY + 4;
    const goingUp = y < lastY - 4;
    if (!menuOpen && goingDown && y > 480 && !header.contains(document.activeElement)) header.classList.add('is-hidden');
    else if (goingUp || y < 480) header.classList.remove('is-hidden');
    lastY = y;
    ticking = false;
  };
  window.addEventListener(
    'scroll',
    () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    },
    { passive: true },
  );
  header.addEventListener('focusin', () => header.classList.remove('is-hidden'));
  update();
}

/* --- Menu mobile ----------------------------------------------------------- */
function initMenu() {
  const toggle = $<HTMLButtonElement>('[data-menu-toggle]');
  const nav = $('[data-nav]');
  const label = $('[data-menu-label]');
  if (!toggle || !nav || !label) return;
  const mq = window.matchMedia('(max-width: 960px)');

  const setOpen = (open: boolean, returnFocus = true) => {
    toggle.setAttribute('aria-expanded', String(open));
    nav.classList.toggle('is-open', open);
    document.body.classList.toggle('menu-open', open);
    label.textContent = open ? label.dataset.close! : label.dataset.open!;
    if (open) $('a', nav)?.focus();
    else if (returnFocus) toggle.focus();
  };

  toggle.addEventListener('click', () => setOpen(toggle.getAttribute('aria-expanded') !== 'true'));
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && nav.classList.contains('is-open')) setOpen(false);
  });
  nav.addEventListener('click', (e) => {
    if ((e.target as HTMLElement).closest('a') && nav.classList.contains('is-open')) setOpen(false, false);
  });
  // Mantiene il focus dentro il menu aperto
  nav.addEventListener('keydown', (e) => {
    if (e.key !== 'Tab' || !nav.classList.contains('is-open')) return;
    const focusables = [...$$<HTMLElement>('a, button', nav), toggle];
    const first = focusables[0];
    const last = focusables[focusables.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      toggle.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  });
  mq.addEventListener('change', (e) => {
    if (!e.matches && nav.classList.contains('is-open')) setOpen(false, false);
  });
}

/* --- Selettore lingua (<details>) ------------------------------------------ */
function initLangMenu() {
  const details = $<HTMLDetailsElement>('[data-lang-menu]');
  if (!details) return;
  document.addEventListener('click', (e) => {
    if (details.open && !details.contains(e.target as Node)) details.open = false;
  });
  details.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && details.open) {
      details.open = false;
      $('summary', details)?.focus();
    }
  });
  // Una scelta esplicita della lingua disattiva l'avviso automatico
  $$('[data-lang-link]', details).forEach((a) =>
    a.addEventListener('click', () => storage.set('pt-lang-choice', a.dataset.langLink!)),
  );
}

/* --- Avviso "questo sito è disponibile in…" -------------------------------- */
function initLangBanner() {
  const box = $('[data-lang-banner]');
  const dataEl = $('#lang-banner-data');
  if (!box || !dataEl) return;
  if (storage.get('pt-lang-choice') || storage.get('pt-lang-dismissed')) return;
  const { current, options } = JSON.parse(dataEl.textContent || '{}') as {
    current: string;
    options: Record<string, { text: string; go: string; dismiss: string; href: string }>;
  };
  const preferred = (navigator.languages || [navigator.language])
    .map((l) => l.slice(0, 2).toLowerCase())
    .find((l) => l === current || l in options);
  if (!preferred || preferred === current) return;
  const o = options[preferred];
  box.setAttribute('lang', preferred);
  $('[data-lb-text]', box)!.textContent = o.text;
  const go = $<HTMLAnchorElement>('[data-lb-go]', box)!;
  go.textContent = o.go;
  go.href = o.href;
  go.hreflang = preferred;
  go.addEventListener('click', () => storage.set('pt-lang-choice', preferred));
  const dismiss = $('[data-lb-dismiss]', box)!;
  dismiss.textContent = o.dismiss;
  dismiss.addEventListener('click', () => {
    storage.set('pt-lang-dismissed', '1');
    box.hidden = true;
  });
  box.hidden = false;
}

/* --- Comparsa degli elementi allo scroll ----------------------------------- */
function initReveal() {
  const items = $$('[data-reveal]');
  if (!items.length) return;
  if (reduceMotion.matches || !('IntersectionObserver' in window)) {
    items.forEach((el) => el.classList.add('is-in'));
    return;
  }
  // Gli effetti "taglio" e "linea" partono da un elemento invisibile (area nulla):
  // l'osservatore guarda quindi il contenitore, che è sempre visibile.
  const targets = new Map<Element, HTMLElement[]>();
  for (const el of items) {
    const hidden = el.dataset.reveal === 'cut' || el.dataset.reveal === 'line';
    const target = hidden && el.parentElement ? el.parentElement : el;
    targets.set(target, [...(targets.get(target) ?? []), el]);
  }
  const show = (target: Element) => targets.get(target)?.forEach((el) => el.classList.add('is-in'));
  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          show(entry.target);
          io.unobserve(entry.target);
        }
      }
    },
    { rootMargin: '0px 0px -8% 0px', threshold: 0 },
  );
  for (const target of targets.keys()) {
    // Ciò che è già nello schermo all'apertura compare subito
    const r = target.getBoundingClientRect();
    if (r.top < window.innerHeight && r.bottom > 0) show(target);
    else io.observe(target);
  }
}

/* --- Contatori numerici ---------------------------------------------------- */
function initCounters() {
  const els = $$('[data-count]');
  if (!els.length || reduceMotion.matches || !('IntersectionObserver' in window)) return;
  const nf = new Intl.NumberFormat(document.documentElement.lang, { useGrouping: true });
  const run = (el: HTMLElement) => {
    const target = Number(el.dataset.count);
    const suffix = el.dataset.suffix ?? '';
    const start = performance.now();
    const dur = 1600;
    const step = (now: number) => {
      const p = Math.min(1, (now - start) / dur);
      const eased = 1 - Math.pow(1 - p, 4);
      el.textContent = nf.format(Math.round(target * eased)) + suffix;
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };
  const io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (e.isIntersecting) {
          run(e.target as HTMLElement);
          io.unobserve(e.target);
        }
      }
    },
    { threshold: 0.6 },
  );
  els.forEach((el) => io.observe(el));
}

/* --- Nastro delle categorie: si muove con lo scroll (mai da solo) ---------- */
function initMarquee() {
  const marquees = $$('[data-marquee]');
  if (!marquees.length || reduceMotion.matches) return;
  let ticking = false;
  const update = () => {
    for (const m of marquees) {
      const track = $('.marquee-track', m);
      if (!track) continue;
      const r = m.getBoundingClientRect();
      if (r.bottom < 0 || r.top > window.innerHeight) continue;
      const progress = (window.innerHeight - r.top) / (window.innerHeight + r.height);
      const half = track.scrollWidth / 2;
      track.style.transform = `translate3d(${-progress * half * 0.5}px,0,0)`;
    }
    ticking = false;
  };
  window.addEventListener(
    'scroll',
    () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    },
    { passive: true },
  );
  update();
}

/* --- Video dell'hero: caricato solo se utile, sempre con pausa ------------- */
function initHeroVideo() {
  const video = $<HTMLVideoElement>('[data-hero-video]');
  const btn = $<HTMLButtonElement>('[data-video-toggle]');
  if (!video || !btn) return;
  const conn = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
  const wide = window.matchMedia('(min-width: 768px)').matches;
  if (reduceMotion.matches || conn?.saveData || !wide) return;

  // Il video parte dopo il caricamento della pagina, per non rallentare il primo rendering
  const start = () => {
    video.src = video.dataset.src!;
    video.muted = true;
    video.addEventListener('playing', () => video.classList.add('is-playing'), { once: true });
    video.play().catch(() => undefined);
    btn.hidden = false;
  };
  if (document.readyState === 'complete') start();
  else window.addEventListener('load', start, { once: true });

  const setState = (paused: boolean) => {
    btn.setAttribute('aria-pressed', String(paused));
    btn.querySelector('[data-label]')!.textContent = paused ? btn.dataset.play! : btn.dataset.pause!;
  };
  btn.addEventListener('click', () => {
    if (video.paused) {
      video.play().catch(() => undefined);
      setState(false);
    } else {
      video.pause();
      setState(true);
    }
  });
}

/* --- Filtri del catalogo --------------------------------------------------- */
function initFilters() {
  for (const group of $$('[data-filter-group]')) {
    const list = document.getElementById(group.dataset.filterGroup!);
    const status = $('[data-filter-status]', group.parentElement!);
    if (!list) continue;
    const items = $$('[data-cat]', list);
    const buttons = $$<HTMLButtonElement>('button[data-filter]', group);
    group.hidden = false;
    buttons.forEach((b) =>
      b.addEventListener('click', () => {
        const f = b.dataset.filter!;
        buttons.forEach((x) => x.setAttribute('aria-pressed', String(x === b)));
        let n = 0;
        for (const it of items) {
          const show = f === 'all' || it.dataset.cat === f;
          it.hidden = !show;
          if (show) n++;
        }
        if (status) status.textContent = status.dataset.template!.replace('{n}', String(n));
      }),
    );
  }
}

/* --- Modulo di contatto ---------------------------------------------------- */
function initForm() {
  const form = $<HTMLFormElement>('[data-contact-form]');
  if (!form) return;
  const params = new URLSearchParams(window.location.search);
  const machine = params.get('macchina');
  const topic = params.get('argomento');
  const machineInput = form.elements.namedItem('machine') as HTMLInputElement | null;
  const topicSelect = form.elements.namedItem('topic') as HTMLSelectElement | null;
  if (machine && machineInput) machineInput.value = machine.slice(0, 120);
  if (topic && topicSelect && [...topicSelect.options].some((o) => o.value === topic)) topicSelect.value = topic;

  const started = form.elements.namedItem('ts') as HTMLInputElement | null;
  if (started) started.value = String(Date.now());

  const msgs = JSON.parse(form.dataset.messages || '{}') as Record<string, string>;
  const status = $('[data-form-status]', form)!;
  if (params.has('errore')) status.textContent = msgs.send;
  const submit = $<HTMLButtonElement>('button[type="submit"]', form)!;

  const fieldError = (input: HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement): string => {
    if (input.validity.valueMissing) return input.type === 'checkbox' ? msgs.privacy : msgs.required;
    if (input.validity.typeMismatch || input.validity.patternMismatch) return msgs.email;
    return '';
  };
  const showError = (input: HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement, text: string) => {
    const box = document.getElementById(`${input.id}-error`);
    input.setAttribute('aria-invalid', text ? 'true' : 'false');
    if (box) {
      box.textContent = text;
      box.hidden = !text;
    }
  };

  form.setAttribute('novalidate', '');
  const fields = $$<HTMLInputElement>('input:not([type=hidden]):not(.hp input), select, textarea', form).filter(
    (f) => !f.closest('.hp'),
  );
  fields.forEach((f) =>
    f.addEventListener('blur', () => {
      if (f.getAttribute('aria-invalid') === 'true') showError(f, fieldError(f));
    }),
  );

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    status.textContent = '';
    let firstInvalid: HTMLElement | null = null;
    for (const f of fields) {
      const err = fieldError(f);
      showError(f, err);
      if (err && !firstInvalid) firstInvalid = f;
    }
    if (firstInvalid) {
      status.textContent = msgs.summary;
      firstInvalid.focus();
      return;
    }

    submit.setAttribute('aria-busy', 'true');
    submit.disabled = true;
    const label = $('[data-label]', submit)!;
    const original = label.textContent;
    label.textContent = msgs.sending;
    try {
      const res = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' },
      });
      const data = (await res.json().catch(() => ({}))) as { ok?: boolean; redirect?: string };
      if (!res.ok || !data.ok) throw new Error(String(res.status));
      window.location.assign(form.dataset.thanks!);
    } catch {
      status.textContent = msgs.send;
      status.focus();
      submit.removeAttribute('aria-busy');
      submit.disabled = false;
      label.textContent = original;
      // Turnstile richiede un nuovo token dopo ogni tentativo
      (window as Window & { turnstile?: { reset: () => void } }).turnstile?.reset();
    }
  });
}

initHeader();
initMenu();
initLangMenu();
initLangBanner();
initReveal();
initCounters();
initMarquee();
initHeroVideo();
initFilters();
initForm();
