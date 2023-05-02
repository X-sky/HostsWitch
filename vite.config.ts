import { resolve } from 'node:path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  appType: 'mpa',
  plugins: [react()],
  root: 'src',
  publicDir: resolve(__dirname, 'public'),
  build: {
    rollupOptions: {
      input: {
        popup: resolve(__dirname, 'src/popup/index.html')
      },
      output: {
        dir: resolve(__dirname, 'dist')
      }
    }
  }
});
