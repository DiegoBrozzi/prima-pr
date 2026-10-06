(() => {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const finePointer = window.matchMedia("(pointer: fine)").matches;

  // Year
  document.getElementById("year").textContent = new Date().getFullYear();

  // Nav: shrink on scroll + mobile toggle
  const nav = document.getElementById("nav");
  const toggle = document.getElementById("nav-toggle");
  const links = document.getElementById("nav-links");
  const onScroll = () => nav.classList.toggle("scrolled", window.scrollY > 20);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
  toggle.addEventListener("click", () => {
    const open = links.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(open));
  });
  links.querySelectorAll("a").forEach((a) =>
    a.addEventListener("click", () => {
      links.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    })
  );

  // Reveal on scroll
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
  );
  document.querySelectorAll(".reveal").forEach((el) => revealObserver.observe(el));

  // Animated counters
  const animateCount = (el) => {
    const target = Number(el.dataset.count);
    const suffix = el.dataset.suffix || "";
    if (reduceMotion) { el.textContent = target + suffix; return; }
    const duration = 1800;
    const start = performance.now();
    const tick = (now) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 4);
      el.textContent = Math.round(target * eased) + suffix;
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };
  const countObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCount(entry.target);
          countObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.6 }
  );
  document.querySelectorAll("[data-count]").forEach((el) => countObserver.observe(el));

  // Rotating hero word
  const words = ["X4T", "speed", "style", "purpose"];
  const wordEl = document.querySelector(".rotator-word");
  if (!reduceMotion && wordEl) {
    let i = 0;
    setInterval(() => {
      wordEl.classList.add("out");
      setTimeout(() => {
        i = (i + 1) % words.length;
        wordEl.textContent = words[i];
        wordEl.classList.remove("out");
      }, 400);
    }, 2600);
  }

  // Timeline progress line
  const timeline = document.querySelector(".timeline");
  if (timeline) {
    const updateTimeline = () => {
      const rect = timeline.getBoundingClientRect();
      const vh = window.innerHeight;
      const progress = Math.min(Math.max((vh * 0.75 - rect.top) / rect.height, 0), 1);
      timeline.style.setProperty("--progress", progress.toFixed(3));
    };
    updateTimeline();
    window.addEventListener("scroll", updateTimeline, { passive: true });
    window.addEventListener("resize", updateTimeline);
  }

  // Testimonials carousel
  const quotes = document.querySelectorAll(".quote");
  const dots = document.querySelectorAll("#quote-dots button");
  let current = 0;
  let timer;
  const show = (n) => {
    quotes[current].classList.remove("active");
    dots[current].classList.remove("active");
    current = n;
    quotes[current].classList.add("active");
    dots[current].classList.add("active");
  };
  const autoplay = () => {
    clearInterval(timer);
    if (!reduceMotion) timer = setInterval(() => show((current + 1) % quotes.length), 6000);
  };
  dots.forEach((dot, n) => dot.addEventListener("click", () => { show(n); autoplay(); }));
  autoplay();

  // Contact form (front-end only)
  const form = document.getElementById("cta-form");
  const msg = document.getElementById("form-msg");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    msg.textContent = "Thanks! We'll be in touch within 24 hours. ✦";
    form.reset();
  });

  if (!finePointer || reduceMotion) { startParticles(); return; }

  // Cursor glow
  const glow = document.querySelector(".cursor-glow");
  window.addEventListener("pointermove", (e) => {
    glow.style.left = e.clientX + "px";
    glow.style.top = e.clientY + "px";
  }, { passive: true });

  // 3D tilt + spotlight on cards
  document.querySelectorAll(".tilt").forEach((card) => {
    card.addEventListener("pointermove", (e) => {
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width;
      const y = (e.clientY - r.top) / r.height;
      card.style.setProperty("--mx", x * 100 + "%");
      card.style.setProperty("--my", y * 100 + "%");
      card.style.transform = `perspective(800px) rotateX(${(0.5 - y) * 10}deg) rotateY(${(x - 0.5) * 12}deg) translateY(-6px)`;
    });
    card.addEventListener("pointerleave", () => { card.style.transform = ""; });
  });

  // Magnetic buttons
  document.querySelectorAll(".magnetic").forEach((btn) => {
    btn.addEventListener("pointermove", (e) => {
      const r = btn.getBoundingClientRect();
      const x = e.clientX - r.left - r.width / 2;
      const y = e.clientY - r.top - r.height / 2;
      btn.style.transform = `translate(${x * 0.25}px, ${y * 0.35}px)`;
    });
    btn.addEventListener("pointerleave", () => { btn.style.transform = ""; });
  });

  startParticles();

  // Floating particle network
  function startParticles() {
    const canvas = document.getElementById("particles");
    const ctx = canvas.getContext("2d");
    let w, h, particles;
    const colors = ["192,132,252", "232,121,249", "139,92,246", "99,102,241"];

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth; h = window.innerHeight;
      canvas.width = w * dpr; canvas.height = h * dpr;
      canvas.style.width = w + "px"; canvas.style.height = h + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.min(Math.floor((w * h) / 18000), 90);
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        r: Math.random() * 1.8 + 0.6,
        c: colors[Math.floor(Math.random() * colors.length)],
      }));
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.c},0.8)`;
        ctx.fill();
        for (let j = i + 1; j < particles.length; j++) {
          const q = particles[j];
          const dx = p.x - q.x, dy = p.y - q.y;
          const d = dx * dx + dy * dy;
          if (d < 14000) {
            ctx.strokeStyle = `rgba(168,85,247,${0.18 * (1 - d / 14000)})`;
            ctx.lineWidth = 1;
            ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y); ctx.stroke();
          }
        }
      }
      if (!reduceMotion) requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener("resize", resize);
    draw();
  }
})();
