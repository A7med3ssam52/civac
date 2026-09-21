// GitHub Pages is a static host with no rewrite rules, and its 404 fallback
// is unreliable for deep links. So after every pages build we:
//  1. copy index.html -> 404.html (fallback where supported)
//  2. generate a real index.html inside EVERY app route folder
//     (dist/projects/index.html, dist/ar/... etc.) so every URL returns 200.
import { copyFileSync, existsSync, mkdirSync, readFileSync } from 'node:fs';
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
