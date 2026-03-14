/**
 * Astro integration that adds <link rel="modulepreload"> hints
 * for dynamically imported JS modules to break waterfall chains.
 *
 * Scans built HTML for <script type="module"> tags, traces their
 * dynamic imports, and injects modulepreload links into <head>.
 */
import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { join, resolve } from 'node:path';

export default function modulePreload() {
	return {
		name: 'modulepreload',
		hooks: {
			'astro:build:done': async ({ dir }) => {
				const distDir = dir.pathname;
				const astroDir = join(distDir, '_astro');

				// Collect all JS modules and their dynamic imports
				const dynamicImports = new Map();
				let jsFiles;
				try {
					jsFiles = readdirSync(astroDir).filter(f => f.endsWith('.js'));
				} catch {
					return;
				}

				for (const file of jsFiles) {
					const content = readFileSync(join(astroDir, file), 'utf-8');
					// Match dynamic imports: import("./file.js") or import("/_astro/file.js")
					const matches = content.matchAll(/import\(\s*["']([^"']+)["']\s*\)/g);
					const imports = [];
					for (const m of matches) {
						const imp = m[1];
						// Resolve relative imports
						if (imp.startsWith('./')) {
							imports.push(`/_astro/${imp.slice(2)}`);
						} else if (imp.startsWith('/_astro/')) {
							imports.push(imp);
						}
					}
					if (imports.length > 0) {
						dynamicImports.set(`/_astro/${file}`, imports);
					}
				}

				// Process each HTML file
				const htmlFiles = findHtmlFiles(distDir);
				for (const htmlFile of htmlFiles) {
					let html = readFileSync(htmlFile, 'utf-8');
					const preloads = new Set();

					// Find all script modules in the HTML
					const scriptMatches = html.matchAll(/<script[^>]*src="([^"]*\.js)"[^>]*>/g);
					for (const m of scriptMatches) {
						collectDeepImports(m[1], dynamicImports, preloads);
					}

					if (preloads.size === 0) continue;

					// Inject modulepreload links before </head>
					const links = [...preloads]
						.map(href => `<link rel="modulepreload" href="${href}">`)
						.join('');
					html = html.replace('</head>', `${links}</head>`);
					writeFileSync(htmlFile, html);
				}

				console.log(`[modulepreload] Added preload hints to ${htmlFiles.length} pages`);
			},
		},
	};
}

function collectDeepImports(src, dynamicImports, preloads) {
	const imports = dynamicImports.get(src);
	if (!imports) return;
	for (const imp of imports) {
		if (!preloads.has(imp)) {
			preloads.add(imp);
			collectDeepImports(imp, dynamicImports, preloads);
		}
	}
}

function findHtmlFiles(dir) {
	const results = [];
	for (const entry of readdirSync(dir, { withFileTypes: true })) {
		const full = join(dir, entry.name);
		if (entry.isDirectory()) {
			results.push(...findHtmlFiles(full));
		} else if (entry.name.endsWith('.html')) {
			results.push(full);
		}
	}
	return results;
}
