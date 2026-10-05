/* Es Fangar — site behaviour. No dependencies. */
(() => {
  'use strict';
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const readJSON = id => { try { return JSON.parse($(id).textContent); } catch { return {}; } };
  const I = readJSON('#es-i18n');
  const CATALOG = readJSON('#es-catalog');
  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)');
  const fmt = n => new Intl.NumberFormat(I.money || 'en-IE', { style: 'currency', currency: 'EUR' }).format(n);
  const root = document.documentElement;

  /* ---------- header state ---------- */
  const onScroll = () => root.classList.toggle('is-scrolled', scrollY > 24);
  addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- focus trap for dialogs/panels ---------- */
  const focusables = el => $$('a[href], button:not([disabled]), input:not([type=hidden]), select, textarea, [tabindex]:not([tabindex="-1"])', el)
    .filter(n => n.offsetParent !== null);
  function trap(el, e) {
    if (e.key !== 'Tab') return;
    const f = focusables(el); if (!f.length) return;
    const first = f[0], last = f[f.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  }

  /* ---------- mobile menu ---------- */
  const menuBtn = $('[data-menu]');
  const nav = $('#primary-nav');
  if (menuBtn && nav) {
    const header = $('.site-header');
    const setMenu = open => {
      menuBtn.setAttribute('aria-expanded', String(open));
      root.classList.toggle('menu-open', open);
      if (open) $('a', nav)?.focus(); else menuBtn.focus();
    };
    menuBtn.addEventListener('click', () => setMenu(menuBtn.getAttribute('aria-expanded') !== 'true'));
    header.addEventListener('keydown', e => {
      if (!root.classList.contains('menu-open')) return;
      if (e.key === 'Escape') setMenu(false); else trap(header, e);
    });
    matchMedia('(min-width: 1180px)').addEventListener('change', e => { if (e.matches && root.classList.contains('menu-open')) setMenu(false); });
  }

  /* ---------- reveal on scroll ---------- */
  const reveals = $$('.reveal');
  if ('IntersectionObserver' in window && !reduceMotion.matches) {
    const io = new IntersectionObserver(entries => entries.forEach(en => {
      if (en.isIntersecting) { en.target.classList.add('is-in'); io.unobserve(en.target); }
    }), { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    reveals.forEach(el => io.observe(el));
  } else reveals.forEach(el => el.classList.add('is-in'));

  /* ---------- hero video ---------- */
  const video = $('[data-hero-video]');
  const toggle = $('[data-video-toggle]');
  if (video) {
    const saveData = navigator.connection && navigator.connection.saveData;
    const portrait = matchMedia('(orientation: portrait) and (max-width: 899px)').matches;
    const src = portrait ? video.dataset.srcPortrait
      : (innerWidth * devicePixelRatio > 1600 ? video.dataset.srcLandscapeHd : video.dataset.srcLandscape);
    const label = $('[data-video-label]', toggle);
    const setState = playing => {
      toggle.setAttribute('aria-pressed', String(!playing));
      toggle.classList.toggle('is-paused', !playing);
      label.textContent = playing ? I.pause : I.play;
    };
    let userPaused = false, inView = true;
    const tryPlay = () => video.play().then(() => setState(true)).catch(() => setState(false));
    const start = () => {
      video.src = src;
      video.addEventListener('playing', () => { video.classList.add('is-playing'); toggle.hidden = false; }, { once: true });
      toggle.hidden = false;
      tryPlay();
    };
    if (!saveData && !reduceMotion.matches) start();
    else { toggle.hidden = false; setState(false); }
    // autoplay can be refused while the tab is hidden: retry once it becomes visible
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'visible' && video.src && video.paused && !userPaused && inView) tryPlay();
    });
    // pause off-screen to save battery, resume when back (unless the visitor paused it)
    if ('IntersectionObserver' in window) new IntersectionObserver(([en]) => {
      inView = en.isIntersecting;
      if (!video.src || userPaused) return;
      if (inView) tryPlay(); else video.pause();
    }).observe(video);
    toggle.addEventListener('click', () => {
      if (!video.src) { userPaused = false; start(); return; }
      if (video.paused) { userPaused = false; tryPlay(); } else { userPaused = true; video.pause(); setState(false); }
    });
  }

  /* ---------- toast ---------- */
  const toast = $('[data-toast]');
  let toastTimer;
  const say = msg => {
    if (!toast) return;
    toast.textContent = msg; toast.classList.add('is-visible');
    clearTimeout(toastTimer); toastTimer = setTimeout(() => toast.classList.remove('is-visible'), 2600);
  };

  /* ---------- basket (prototype: localStorage; live site: Shopify cart) ---------- */
  const KEY = 'esf-cart';
  const load = () => { try { return JSON.parse(localStorage.getItem(KEY)) || []; } catch { return []; } };
  const save = c => { try { localStorage.setItem(KEY, JSON.stringify(c)); } catch { /* private mode: basket lives for this page only */ } };
  let cart = load().filter(l => CATALOG[l.id]);
  const cartEl = $('#cart');
  const itemsEl = $('[data-cart-items]');
  const openBtn = $('[data-cart-open]');
  let lastFocus;

  function renderCart() {
    const count = cart.reduce((n, l) => n + l.qty, 0);
    $$('[data-cart-count]').forEach(el => { el.textContent = count; el.classList.toggle('is-empty', !count); });
    if (!itemsEl) return;
    if (!cart.length) itemsEl.innerHTML = `<p class="cart__empty">${I.cartEmpty}</p>`;
    else itemsEl.innerHTML = `<ul class="cart__list" role="list">${cart.map((l, i) => {
      const p = CATALOG[l.id];
      return `<li class="cart-line">
        <img src="${(p.imgs && p.imgs[l.variant]) || p.img}" alt="" width="72" height="90" loading="lazy">
        <div class="cart-line__info"><a href="${p.url}">${p.name}</a><span class="cart-line__variant">${l.variant || ''}</span>
          <div class="qty" role="group" aria-label="${I.qty}: ${p.name}">
            <button type="button" data-qty="${i}" data-d="-1" aria-label="${I.decrease}">−</button>
            <output aria-live="polite">${l.qty}</output>
            <button type="button" data-qty="${i}" data-d="1" aria-label="${I.increase}">+</button>
          </div>
        </div>
        <div class="cart-line__end"><span>${fmt(p.price * l.qty)}</span><button type="button" class="link-button" data-remove="${i}">${I.remove}<span class="visually-hidden"> ${p.name}</span></button></div>
      </li>`; }).join('')}</ul>`;
    const sub = cart.reduce((s, l) => s + CATALOG[l.id].price * l.qty, 0);
    const ship = !cart.length ? 0 : (sub >= I.shipping.freeFrom ? 0 : I.shipping.flat);
    $('[data-cart-subtotal]').textContent = fmt(sub);
    $('[data-cart-shipping]').textContent = !cart.length ? '–' : (ship ? fmt(ship) : I.free);
    $('[data-cart-total]').textContent = fmt(sub + ship);
    $('[data-cart-free]').textContent = !cart.length ? '' : (sub >= I.shipping.freeFrom ? I.freeReached : I.freeLeft.replace('{n}', fmt(I.shipping.freeFrom - sub)));
    $('[data-checkout]').disabled = !cart.length;
  }
  function add(id, variant, qty = 1) {
    if (!CATALOG[id]) return;
    const line = cart.find(l => l.id === id && l.variant === variant);
    if (line) line.qty = Math.min(line.qty + qty, 99); else cart.push({ id, variant, qty });
    save(cart); renderCart(); say(`${I.added}: ${CATALOG[id].name}`);
    openBtn?.classList.remove('bump'); void openBtn?.offsetWidth; openBtn?.classList.add('bump');
  }
  function openCart() {
    lastFocus = document.activeElement;
    cartEl.hidden = false; root.classList.add('cart-open'); openBtn.setAttribute('aria-expanded', 'true');
    requestAnimationFrame(() => cartEl.classList.add('is-open'));
    $('.cart__head button', cartEl).focus();
  }
  function closeCart() {
    cartEl.classList.remove('is-open'); root.classList.remove('cart-open'); openBtn.setAttribute('aria-expanded', 'false');
    setTimeout(() => { cartEl.hidden = true; }, reduceMotion.matches ? 0 : 250);
    (lastFocus || openBtn).focus();
  }
  if (cartEl) {
    openBtn?.addEventListener('click', openCart);
    cartEl.addEventListener('click', e => {
      const t = e.target.closest('button, [data-cart-close]'); if (!t) return;
      if (t.matches('[data-cart-close]')) closeCart();
      else if (t.dataset.qty) { const l = cart[+t.dataset.qty]; l.qty += +t.dataset.d; if (l.qty < 1) cart.splice(+t.dataset.qty, 1); save(cart); renderCart(); }
      else if (t.dataset.remove) { cart.splice(+t.dataset.remove, 1); save(cart); renderCart(); $('.cart__head button', cartEl).focus(); }
      else if (t.matches('[data-checkout]')) $('[data-checkout-note]').hidden = false;
    });
    cartEl.addEventListener('keydown', e => { if (e.key === 'Escape') closeCart(); else trap($('.cart__panel', cartEl), e); });
    addEventListener('storage', e => { if (e.key === KEY) { cart = load().filter(l => CATALOG[l.id]); renderCart(); } });
    renderCart();
  }
  document.addEventListener('click', e => {
    const b = e.target.closest('[data-add]'); if (b) add(b.dataset.add, b.dataset.variant);
  });
  // option with its own photo (e.g. 12-bottle offer: Pink / White): swap the image with the select
  $$('[data-buy]').forEach(f => {
    const media = f.closest('.offer, .product')?.querySelector('[data-variant-media]');
    const sel = $('select[name=variant]', f);
    if (!media || !sel) return;
    const show = () => $$('[data-variant-img]', media).forEach(el => el.classList.toggle('is-active', el.dataset.variantImg === sel.value));
    sel.addEventListener('change', show);
    show();
  });
  $$('[data-buy]').forEach(f => f.addEventListener('submit', e => {
    e.preventDefault();
    const d = new FormData(f);
    add(f.dataset.buy, d.get('variant') || '', Math.max(1, Math.min(36, parseInt(d.get('qty') || '1', 10) || 1)));
  }));

  /* ---------- wine filters ---------- */
  const filters = $('[data-filters]');
  if (filters) {
    const cards = $$('[data-wine-grid] .wine-card');
    const countEl = $('[data-filter-count]', filters);
    filters.addEventListener('click', e => {
      const b = e.target.closest('[data-filter]'); if (!b) return;
      $$('[data-filter]', filters).forEach(x => x.setAttribute('aria-pressed', String(x === b)));
      let n = 0;
      cards.forEach(c => { const show = b.dataset.filter === 'all' || c.dataset.cat === b.dataset.filter; c.hidden = !show; if (show) { n++; c.classList.add('is-in'); } });
      countEl.textContent = n === 1 ? countEl.dataset.labelOne : countEl.dataset.labelMany.replace('{n}', n);
    });
  }

  /* ---------- Bókun: loaded only on request ---------- */
  const bokun = $('[data-bokun]');
  if (bokun) {
    $('[data-bokun-load]', bokun).addEventListener('click', () => {
      bokun.innerHTML = `<p class="booking__loading" role="status">${I.loading}</p><div class="bokunWidget" data-src="${bokun.dataset.src}"></div>`;
      const s = document.createElement('script');
      s.src = bokun.dataset.loader; s.async = true;
      s.onload = () => { const l = $('.booking__loading', bokun); setTimeout(() => l && l.remove(), 1500); };
      document.body.appendChild(s);
    }, { once: true });
  }

  /* ---------- enquiry form ---------- */
  const form = $('[data-enquiry]');
  if (form) {
    const type = $('[data-type]', form);
    const pre = new URLSearchParams(location.search).get('type');
    if (pre && $(`option[value="${CSS.escape(pre)}"]`, type)) type.value = pre;
    const sync = () => $$('[data-show-for]', form).forEach(el => {
      const show = el.dataset.showFor.split(' ').includes(type.value);
      el.hidden = !show;
      $$('input, select, textarea', el).forEach(i => { i.disabled = !show; });
    });
    type.addEventListener('change', sync); sync();

    const E = I.form.errors;
    const setErr = (input, msg) => {
      const err = $('#' + input.id + '-err');
      input.setAttribute('aria-invalid', msg ? 'true' : 'false');
      if (err) { err.textContent = msg || ''; err.hidden = !msg; }
      return !msg;
    };
    const checks = {
      'f-name': i => i.value.trim().length >= 2 ? '' : E.name,
      'f-email': i => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(i.value.trim()) ? '' : E.email,
      'f-message': i => i.value.trim().length >= 10 ? '' : E.message,
      'f-consent': i => i.checked ? '' : E.consent,
      'f-to': i => { const from = $('#f-from', form); return (!i.disabled && i.value && from.value && i.value <= from.value) ? E.dates : ''; },
    };
    Object.keys(checks).forEach(id => {
      const i = $('#' + id, form);
      i.addEventListener(i.type === 'checkbox' ? 'change' : 'blur', () => { if (i.getAttribute('aria-invalid') === 'true' || i.value) setErr(i, checks[id](i)); });
    });
    form.addEventListener('submit', e => {
      e.preventDefault();
      if ($('#f-website', form).value) return; // honeypot: silently drop bots
      const bad = Object.keys(checks).map(id => $('#' + id, form)).filter(i => !setErr(i, checks[i.id](i)));
      const summary = $('[data-form-summary]', form);
      if (bad.length) {
        summary.innerHTML = `<p>${E.summary}</p><ul>${bad.map(i => `<li><a href="#${i.id}">${$('#' + i.id + '-err').textContent}</a></li>`).join('')}</ul>`;
        summary.hidden = false; summary.focus();
        return;
      }
      summary.hidden = true;
      const btn = $('button[type=submit]', form);
      btn.disabled = true; btn.textContent = I.form.sending;
      // Prototype: nothing is sent. Live site: POST to the Shopify contact endpoint (or the form app), server-side validated.
      setTimeout(() => {
        $('fieldset', form).hidden = true;
        const ok = $('[data-form-success]', form); ok.hidden = false; ok.focus();
      }, 700);
    });
    form.addEventListener('click', e => {
      const a = e.target.closest('[data-form-summary] a'); if (!a) return;
      e.preventDefault(); $(a.getAttribute('href'), form).focus();
    });
  }
})();
