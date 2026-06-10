/**
 * Tailwind config — marketmaker.cc design system.
 *
 * - Uses the shared @marketmaker_cc/ui preset (token-driven colors + radii).
 * - `preflight: false` is CRITICAL: Tailwind's reset is unlayered CSS and
 *   would override Starlight's cascade-layered docs styles. The utilities
 *   themselves are only loaded on the landing page (src/styles/landing.css).
 */
module.exports = {
	presets: [require('@marketmaker_cc/ui/tailwind-preset')],
	content: [
		'./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}',
		'./node_modules/@marketmaker_cc/ui/dist/**/*.js',
	],
	corePlugins: {
		preflight: false,
	},
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px',
			},
		},
		extend: {
			fontFamily: {
				sans: ['Inter Variable', 'Inter', 'sans-serif'],
				mono: [
					'JetBrains Mono Variable',
					'JetBrains Mono',
					'ui-monospace',
					'monospace',
				],
			},
			keyframes: {
				'fade-up': {
					'0%': { opacity: '0', transform: 'translateY(10px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' },
				},
				'shape-float': {
					'0%, 100%': { transform: 'translateY(0)' },
					'50%': { transform: 'translateY(15px)' },
				},
			},
			animation: {
				'fade-up': 'fade-up 0.5s ease-out',
				'shape-float': 'shape-float 12s ease-in-out infinite',
			},
		},
	},
	plugins: [require('tailwindcss-animate')],
};
