// Builds a SINGLE self-contained HTML preview:
//  - inlines the JS bundle + CSS into dist-single/index.html
//  - replaces local logo/favicon references with data URIs
//  - remote assets (Unsplash, Google Fonts, Maps) stay as links (needs internet)
// Result: one file that runs from double-click (file://) with full navigation
// (the app auto-switches to HashRouter on file:// — see src/App.tsx).
import { readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const root = process.cwd();
const dist = join(root, 'dist-single');
const read = (p) => readFileSync(p, 'utf8');

let html = read(join(dist, 'index.html'));

// inline JS bundle
const assets = readdirSync(join(dist, 'assets'));
const jsFile = assets.find((f) => f.endsWith('.js'));
const cssFile = assets.find((f) => f.endsWith('.css'));
if (!jsFile || !cssFile) throw new Error('bundle assets not found in dist-single/assets');
const jsCode = read(join(dist, 'assets', jsFile)).replace(/<\/script>/g, '<\\/script>');
const cssCode = read(join(dist, 'assets', cssFile));

html = html.replace(
  /<script[^>]*src="[^"]*assets\/[^"]+\.js"[^>]*><\/script>/,
  () => `<script type="module">${jsCode}</script>`,
);
html = html.replace(
  /<link[^>]*href="[^"]*assets\/[^"]+\.css"[^>]*>/,
  () => `<style>${cssCode}</style>`,
);
html = html.replace(/<link[^>]*rel="modulepreload"[^>]*>/g, '');

// embed local SVGs as data URIs (logo in header/footer, favicon)
for (const f of ['logo.svg', 'logo-white.svg', 'favicon.svg']) {
  try {
    const uri = `data:image/svg+xml,${encodeURIComponent(read(join(root, 'public', f)).trim())}`;
    html = html.split(`./${f}`).join(uri).split(`/${f}`).join(uri);
  } catch { /* file may not exist — leave reference as is */ }
}

writeFileSync(join(dist, 'index.html'), html);
console.log(`single-file preview ready: ${Math.round(Buffer.byteLength(html) / 1024)} KB`);
