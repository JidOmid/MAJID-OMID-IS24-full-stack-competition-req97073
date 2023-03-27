// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
//   server: {
//     port: 3000,
//     proxy: {
//     '/api': {
//       target: 'https://localhost:8000/',
//       changeOrigin: true,
//       ws: true,
//       rewrite: (path) => path.replace(/^\/api/, "")
//     }
//   }}

// })
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const { PORT = 8000 } = process.env;

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: `http://localhost:${PORT}`,
        changeOrigin: true,
        secure: false,
        ws: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
});
