import { defineConfig } from 'vite';
import injectHtml from 'vite-plugin-html-inject';
import sassGlobImports from 'vite-plugin-sass-glob-import'; 

export default defineConfig({
  base: '',
  root: './src',
  publicDir: './../public',
  build: {
    outDir: './../docs',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: '/index.html',
      },
    },
  },

  assetsInclude: ['**/*.html', '**/*.css'],

  plugins: [injectHtml(), sassGlobImports()],
});
