import { fileURLToPath } from "node:url";

export default defineNuxtConfig({
  ssr: true,

  alias: {
    "@": fileURLToPath(new URL("./app", import.meta.url)),
  },

  devtools: { enabled: true },

  css: ["@/assets/scss/main.scss"],

  modules: ["@vueuse/nuxt", "@pinia/nuxt", "@nuxt/image"],

  pinia: {
    autoImports: ["defineStore", "storeToRefs"],
  },

  runtimeConfig: {
    // Base URL của backend (chỉ dùng server-side). Client sẽ gọi qua Nitro proxy `/api/...`
    apiBaseUrl: process.env.NUXT_API_BASE_URL || "https://localhost:44389",
    public: {
      wixApiBase: "",
    },
    private: {},
  },

  debug: true
} as any);
