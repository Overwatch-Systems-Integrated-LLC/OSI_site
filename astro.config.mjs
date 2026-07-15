// @ts-check
import { defineConfig } from 'astro/config';

// OSI_site — static output for GitHub Pages on the www.overwatchsi.com custom domain.
// Existing blog + tool URLs use trailing slashes (/blog/<slug>/); keep that convention.
// A committed public/.nojekyll stops GitHub Pages' Jekyll from stripping the _astro/ dir.
export default defineConfig({
  site: 'https://www.overwatchsi.com',
  output: 'static',
  trailingSlash: 'ignore',
  build: {
    // default asset dir is _astro; .nojekyll in public/ keeps Pages from dropping it
    assets: '_astro',
  },
});
