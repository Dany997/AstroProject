import { defineConfig } from 'astro/config';
import node from '@astrojs/node';

export default defineConfig({
	output: 'server', // 👈 Przełącz Astro na tryb SSR
	adapter: node({ mode: 'standalone' }),
});
