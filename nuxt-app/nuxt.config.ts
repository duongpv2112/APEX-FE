// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: [
    '@nuxt/content',
    '@pinia/nuxt',
    '@nuxt/image-edge',
    '@vueuse/nuxt',
    'nuxt-schema-org',
    '@nuxtjs/sitemap',
    '@nuxtjs/robots'
  ],
  runtimeConfig: {
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE || 'http://localhost:3000',
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL || 'http://localhost:3000'
    }
  },
  routeRules: {
    '/blog/**': { prerender: true, isr: 600 },
    '/product/**': { ssr: true, swr: 60 },
    '/': { ssr: true }
  },
  css: ['@/styles/main.scss']
})
