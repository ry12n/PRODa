import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  define: {
    global: 'globalThis',
  },
  resolve: {
    alias: {
      'buffer': 'buffer/'
    }
  },
  server: {
    port: 5173,
    host: true,
    proxy: {
      '/token': 'http://localhost:3001'
    }
  }
});