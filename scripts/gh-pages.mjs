// GitHub Pages is a static host with no rewrite rules, and its 404 fallback
// is unreliable for deep links. So after every pages build we:
//  1. copy index.html -> 404.html (fallback where supported)
//  2. generate a real index.html inside EVERY app route folder
//     (dist/projects/index.html, dist/ar/... etc.) so every URL returns 200.
import { copyFileSync, existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const root = process.cwd();
const dist = join(root, 'dist');
const indexSrc = join(dist, 'index.html');

if (!existsSync(indexSrc)) {
  console.error('dist/index.html missing — run vite build first');
  process.exit(1);
}

copyFileSync(indexSrc, join(dist, '404.html'));

const projectsSrc = readFileSync(join(root, 'src/data/projects.ts'), 'utf8');
const servicesSrc = readFileSync(join(root, 'src/data/services.ts'), 'utf8');
const slugs = [...projectsSrc.matchAll(/slug:\s*"([^"]+)"/g)].map((m) => m[1]);
const serviceIds = [...servicesSrc.matchAll(/id:\s*"([^"]+)"/g)].map((m) => m[1]);

const routes = ['about', 'services', 'projects', 'clients', 'news', 'contact', 'quote'];
const all = ['ar'];
for (const r of routes) {
  all.push(r);
  all.push(`ar/${r}`);
}
for (const id of serviceIds) {
  all.push(`services/${id}`);
  all.push(`ar/services/${id}`);
}
for (const s of slugs) {
  all.push(`projects/${s}`);
  all.push(`ar/projects/${s}`);
}

for (const p of all) {
  const dir = join(dist, p);
  mkdirSync(dir, { recursive: true });
  copyFileSync(indexSrc, join(dir, 'index.html'));
}

console.log(`gh-pages ready: 404.html + ${all.length} route files (${slugs.length} projects, ${serviceIds.length} services)`);

// Legacy WordPress URLs (old bookmarks / Google results) -> new routes.
// Runtime base detection keeps them working on Pages (/civac) and root domain alike.
const legacy = {
  'our-story': 'about',
  'departments': 'services',
  'coming-soon-page': '',
  'home/industrial-projects': 'projects',
  'home/commercial-projects': 'projects',
  'home/residential-projects': 'projects',
  'home/food-and-beverage': 'projects',
  'home/infrastructure-projects': 'projects',
  'home/water-structures': 'projects',
  'home/eductional-facilities': 'projects',
  'home/engineering-works': 'projects',
};

for (const [oldP, newR] of Object.entries(legacy)) {
  const dir = join(dist, oldP);
  mkdirSync(dir, { recursive: true });
  const target = JSON.stringify(`/${newR}`);
  const html = `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Redirecting…</title></head><body style="font-family:sans-serif;text-align:center;padding:48px"><p>Redirecting…</p><script>(function(){var p=location.pathname;var b=p.indexOf('/civac/')===0?'/civac':'';var t=${target};location.replace(b+t||b+'/');})();</script></body></html>`;
  writeFileSync(join(dir, 'index.html'), html);
}
console.log(`+ ${Object.keys(legacy).length} legacy redirect pages`);
