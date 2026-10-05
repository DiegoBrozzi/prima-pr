// @ts-check
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://www.primatech.it',
  trailingSlash: 'always',
  build: {
    format: 'directory',
    // Niente <style> inline: la CSP consente solo fogli di stile dal dominio.
    inlineStylesheets: 'never',
  },
  vite: {
    build: { assetsInlineLimit: 0 },
  },
});
