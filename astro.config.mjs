import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://lostal.dev',
  output: 'static',
  integrations: [],
  build: {
    inlineStylesheets: 'auto',
  },
});
