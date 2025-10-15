import { defineNuxtConfig } from 'nuxt/config'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@unocss/nuxt', '@vueuse/nuxt', '@nuxt/image'],
  css: [
    '@/assets/styles/index.scss',
  ],
  runtimeConfig: {
    public: {
      baseURL: 'http://localhost:1337',
    },
  },
})
