import {defineConfig} from "vite";
import react from "@vitejs/plugin-react";

const {PORT = 8000} = process.env;

// Set port to 3000 and proxy from 8000
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      "/api": {
        target: `http://localhost:${PORT}`,
        changeOrigin: true,
        secure: false,
        ws: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
});
