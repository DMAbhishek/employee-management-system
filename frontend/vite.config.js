// vite.config.js
// ─────────────────────────────────────────────────────────────
// Vite configuration for the React frontend.
// Replaces Create React App (CRA) which is incompatible with Node 22.
// ─────────────────────────────────────────────────────────────
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],

  // Dev server settings
  server: {
    port: 3000,       // same port CRA used, so nothing changes
    open: true,       // auto-open browser on `npm run dev`

    // Proxy: forwards /api requests to Spring Boot backend
    // This avoids CORS issues during development.
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        secure: false,
      },
    },
  },

  // Production build output folder
  build: {
    outDir: 'build',  // matches CRA convention
  },
});

