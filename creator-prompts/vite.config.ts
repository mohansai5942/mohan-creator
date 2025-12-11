import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
  },
  define: {
    // Explicitly inject API_KEY from the environment
    'process.env.API_KEY': JSON.stringify(process.env.API_KEY),
    // Polyfill process.env for other uses to avoid "process is not defined" errors
    'process.env': {}
  }
});