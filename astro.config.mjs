import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://lostal.dev',
  output: 'static',
  integrations: [sitemap()],
  image: {
    service: {
      entrypoint: 'astro/assets/services/sharp',
      config: {
        limitInputPixels: 268402689,
      },
    },
  },
  build: {
    inlineStylesheets: 'auto',
  },
});
