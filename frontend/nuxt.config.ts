import { defineNuxtConfig } from 'nuxt/config'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@unocss/nuxt', '@vueuse/nuxt'],
  css: [
    '@/assets/css/main.css',
  ],
  runtimeConfig: {
    public: {
      strapiBaseUrl: 'http://localhost:1337',
    },
  },
  routeRules: {
    '/serviceWorker.js': { redirect: '/robots.txt' },
  },
})
