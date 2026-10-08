import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [
    react(),
    tailwindcss()
  ],
  server: {
    port: 3000,
    host: true,
    proxy: {
      '/api/tripo': {
        target: 'https://api.tripo3d.ai/v2/openapi',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/tripo/, '')
      }
    }
  }
});
