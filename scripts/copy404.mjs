// GitHub Pages serves SPAs from a static host with no rewrite rules,
// so a deep link like /CIVAC/projects refresh would 404.
// Copying the built index.html to 404.html makes Pages serve the app
// for unknown paths, and React Router takes over from there.
import { copyFileSync } from 'node:fs';

copyFileSync('dist/index.html', 'dist/404.html');
console.log('dist/404.html created (GitHub Pages SPA fallback)');
