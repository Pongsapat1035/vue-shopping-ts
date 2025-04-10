import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import tailwindcss from "@tailwindcss/vite";
import { resolve } from "path";
// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), tailwindcss()],
  // สร้าง proxy server เพื่อ binding path /api ไป http://127.0.0.1:5001/vue-shopping-web/us-central1/api
  server: {
    proxy: {
      "/api": {
        target: "http://127.0.0.1:5001/vue-shopping-web/us-central1/api",
        changeOrigin: true,
        // remove /api from request because /api already in target
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
    },
  },
});
