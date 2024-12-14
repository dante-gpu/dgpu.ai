import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  resolve: {
    alias: {
      'buffer': 'buffer',
      'stream': 'stream-browserify',
    },
  },
  define: {
    'process.env': {},
    'global': 'globalThis',
  },
});