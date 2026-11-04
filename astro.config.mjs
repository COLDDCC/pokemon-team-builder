import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import { site } from './src/config/site.ts';
export default defineConfig({ site: site.url, trailingSlash: 'always', output: 'static', integrations: [react()] });
