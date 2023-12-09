import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';
import Icons from 'unplugin-icons/vite';
import { FontaineTransform } from 'fontaine';

export default defineConfig({
	plugins: [
		sveltekit(),
		FontaineTransform.vite({ fallbacks: ['Arial', 'Roboto'] }),
		Icons({
			compiler: 'svelte',
			transform(svg) {
				// apply fill to this icon on this collection
				return svg.replace(/^<svg /, '<svg fill="currentColor" ');
			}
		})
	],
	optimizeDeps: {
		exclude: ['@ffmpeg/ffmpeg', '@ffmpeg/util']
	},
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	},
	server: {
		headers: {
			'Cross-Origin-Opener-Policy': 'same-origin',
			'Cross-Origin-Embedder-Policy': 'require-corp'
		}
	}
});
