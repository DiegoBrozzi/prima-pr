# X4T website

A static, dependency-free one-page site for X4T, built on a purple palette with animations throughout.

Open `index.html` in a browser, or serve the folder:

```bash
cd x4t-website
python3 -m http.server 8000
```

- `index.html`: page structure
- `styles.css`: purple design tokens, layout and CSS animations
- `script.js`: scroll reveals, counters, particle background, tilt cards and the testimonial carousel

All animations respect `prefers-reduced-motion`.
