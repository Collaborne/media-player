import { defineConfig } from 'vitest/config';

export default defineConfig({
	test: {
		environment: 'jsdom',
		include: ['src/**/*.spec.{ts,tsx}'],
		setupFiles: ['./src/utils/__test__/setup.ts'],
	},
});
