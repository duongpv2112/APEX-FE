import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { fileURLToPath, URL } from "node:url";

export default defineConfig({
  // Plugins
  plugins: [vue()],

  // Resolve - Cấu hình alias và extensions
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
      "@components": fileURLToPath(
        new URL("./src/components", import.meta.url)
      ),
      "@assets": fileURLToPath(new URL("./src/assets", import.meta.url)),
    },
    extensions: [".js", ".json", ".jsx", ".mjs", ".ts", ".tsx", ".vue"],
  },

  // Server - Cấu hình dev server
  server: {
    port: 3000,
    host: true,
    open: true,
    cors: true,
    proxy: {
      "/api": {
        target: "http://localhost:8080",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },

  // Build - Cấu hình build production
  build: {
    outDir: "dist",
    assetsDir: "assets",
    sourcemap: false,
    minify: "terser",
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["vue", "vue-router"],
        },
      },
    },
  },

  // CSS
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "@/styles/_variables.scss" as *;`,
      },
    },
  },

  // Define - Biến global
  define: {
    __APP_VERSION__: JSON.stringify("1.0.0"),
  },
});
