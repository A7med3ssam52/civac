import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// Single-file preview build: everything (including lazy admin chunks)
// is inlined into ONE js bundle so scripts/single-preview.mjs can embed
// it into dist-single/index.html. Opened via double-click (file://).
export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: './',
  build: {
    outDir: 'dist-single',
    emptyOutDir: true,
    assetsInlineLimit: 100 * 1024 * 1024,
    chunkSizeWarningLimit: 2000,
    rollupOptions: {
      output: {
        inlineDynamicImports: true,
      },
    },
  },
})
