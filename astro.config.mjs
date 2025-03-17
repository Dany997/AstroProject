// import { defineConfig } from 'astro/config';
// import node from '@astrojs/node';

// export default defineConfig({
// 	output: 'server', // 👈 Przełącz Astro na tryb SSR
// 	adapter: node({ mode: 'standalone' }),
// });

import { defineConfig } from 'astro/config';
import node from '@astrojs/node';

export default defineConfig({
	output: 'server', // Tryb SSR
	adapter: node({
		mode: 'standalone',
	}),
	server: {
		port: process.env.PORT || 8000, // Używaj dynamicznie przypisanego portu przez Railway lub 3000 lokalnie
	},
});
