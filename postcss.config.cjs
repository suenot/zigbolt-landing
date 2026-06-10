// Tailwind v3 wired through Astro's native PostCSS support.
// (@astrojs/tailwind only supports Astro <= 5; this project runs Astro 6.)
module.exports = {
	plugins: {
		tailwindcss: {},
		autoprefixer: {},
	},
};
