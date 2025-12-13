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
    public: {
      wixApiBase: "",
    },
    private: {},
  },
} as any);
