import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // GitHub Pages base URL for repository sameer-ansari-dev/Wedding-card
  base: '/Wedding-card/',
  server: {
    host: true, // Exposes server to local network for mobile testing
    port: 5173,
  },
  build: {
    target: 'esnext',
    cssCodeSplit: true,
  }
});
