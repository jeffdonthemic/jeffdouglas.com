import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://jeffdonthemic.github.io',
  base: '/jeffdouglas.com',
  integrations: [mdx(), sitemap()],
});
