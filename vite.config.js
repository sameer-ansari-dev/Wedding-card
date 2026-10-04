import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Relative base path for GitHub Pages deployment
  base: './',
  build: {
    target: 'esnext',
    cssCodeSplit: true,
  }
});
