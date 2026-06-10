// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
	site: 'https://zigbolt.marketmaker.cc',
	build: {
		// Inline all CSS to eliminate render-blocking stylesheet requests (Lighthouse)
		inlineStylesheets: 'always',
	},
	integrations: [
		starlight({
			title: 'ZigBolt',
			description: 'Ultra-Low Latency Messaging System for HFT',
			components: {
				// Override Hero to add fetchpriority="high" on LCP image
				Hero: './src/components/Hero.astro',
				Footer: './src/components/Footer.astro',
				ThemeSelect: './src/components/Empty.astro',
			},
			social: [
				{ icon: 'github', label: 'GitHub', href: 'https://github.com/suenot/zigbolt' },
			],
			logo: {
				light: './src/assets/zigbolt-logo-light.svg',
				dark: './src/assets/zigbolt-logo-dark.svg',
				replacesTitle: false,
			},
			customCss: [
				// Inter + JetBrains Mono variable fonts (self-hosted)
				'@fontsource-variable/inter',
				'@fontsource-variable/jetbrains-mono',
				// marketmaker.cc design tokens (dark default, indigo accent)
				'@marketmaker_cc/ui/styles.css',
				// Starlight ← marketmaker token mapping + docs chrome restyle
				'./src/styles/custom.css',
			],
			head: [
				{
					tag: 'link',
					attrs: { rel: 'dns-prefetch', href: 'https://zigbolt.marketmaker.cc' }
				},
				{
					tag: 'meta',
					attrs: { name: 'theme-color', content: '#09090b' }
				}
			],
			sidebar: [
				{
					label: 'Getting Started',
					items: [
						{ label: 'Introduction', slug: 'getting-started/introduction' },
						{ label: 'Quick Start', slug: 'getting-started/quick-start' },
						{ label: 'Installation', slug: 'getting-started/installation' },
					],
				},
				{
					label: 'Architecture',
					items: [
						{ label: 'Overview', slug: 'architecture/overview' },
					],
				},
				{
					label: 'API Reference',
					items: [
						{ label: 'Full Reference', slug: 'reference/api-reference' },
					],
				},
				{
					label: 'Examples',
					items: [
						{ label: 'Usage Examples', slug: 'examples/usage' },
					],
				},
				{
					label: 'Performance',
					items: [
						{ label: 'Benchmarks', slug: 'performance/benchmarks' },
					],
				},
				{
					label: 'Changelog',
					autogenerate: { directory: 'changelog' },
				},
			],
		}),
		react(),
	],
	vite: {
		build: {
			// Increase inline limit to pull more small scripts into the main bundle
			// avoiding extra network rounds for tiny utilities
			assetsInlineLimit: 4096,
		}
	}
});
