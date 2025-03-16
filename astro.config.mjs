// import { defineConfig } from 'astro/config';
// import node from '@astrojs/node';

// export default defineConfig({
// 	output: 'server', // 👈 Przełącz Astro na tryb SSR
// 	adapter: node({ mode: 'standalone' }),
// });

import { defineConfig } from 'astro/config';

export default defineConfig({
	output: 'static', // 👈 Przełącza Astro na statyczny build
});
