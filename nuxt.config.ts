import { fileURLToPath } from "node:url";

export default defineNuxtConfig({
  ssr: true,

  app: {
    head: {
      link: [
        { rel: "preconnect", href: "https://fonts.googleapis.com" },
        {
          rel: "preconnect",
          href: "https://fonts.gstatic.com",
          crossorigin: "",
        },
        {
          rel: "stylesheet",
          href:
            "https://fonts.googleapis.com/css2?" +
            "family=Be+Vietnam+Pro:wght@700&" +
            "family=Inter:wght@400&" +
            "family=Roboto+Slab:wght@400&" +
            "display=swap",
        },
      ],
    },
  },

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
      // Dùng để set canonical/og:url cho SEO (ưu tiên set qua env NUXT_PUBLIC_SITE_URL)
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL || "",
      wixApiBase: "",
    },
    private: {},
  },

  debug: true
} as any);
