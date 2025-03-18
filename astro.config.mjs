import { defineConfig } from 'astro/config';
import node from '@astrojs/node';

export default defineConfig({
	output: 'server', // Tryb SSR
	adapter: node({
		mode: 'standalone',
	}),
	server: {
		port: process.env.PORT || 8000, // 🔥 Dodaj ustawienie portu
	},
});
