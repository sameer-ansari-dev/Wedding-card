import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Relative base path for GitHub Pages deployment
  base: './',
  server: {
    host: true, // Exposes the server to local network (0.0.0.0) for mobile testing
    port: 5173,
  },
  build: {
    target: 'esnext',
    cssCodeSplit: true,
  }
});
