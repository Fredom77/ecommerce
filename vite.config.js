import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  css: {
    postcss: './postcss.config.msj',  // O .mjs dependiendo de lo que hayas elegido
  },
});
