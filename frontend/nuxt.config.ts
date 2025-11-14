import { defineNuxtConfig } from 'nuxt/config'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@unocss/nuxt', '@vueuse/nuxt', '@nuxt/image', '@nuxtjs/sitemap'],
  css: [
    '@/assets/styles/index.scss',
  ],

  // Site 配置（用于 sitemap 等 SEO 模块）
  // @ts-expect-error - site config is added by nuxt-site-config module
  site: {
    url: process.env.NUXT_PUBLIC_SITE_URL || 'http://localhost:3000',
  },

  runtimeConfig: {
    public: {
      baseURL: 'http://localhost:1337',
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL || 'http://localhost:3000',
    },
  },

  // SEO 优化
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      title: 'AiRaise - 开发者工具和资源平台',
      meta: [
        { name: 'format-detection', content: 'telephone=no' },
        { name: 'theme-color', content: '#6b7af4' },
      ],
      link: [
        { rel: 'icon', type: 'image/png', href: '/favicon.png' },
      ],
    },
  },

  // 性能优化
  nitro: {
    compressPublicAssets: true,
    prerender: {
      crawlLinks: true,
      routes: ['/', '/pinyin'],
    },
  },

  // 图片优化
  image: {
    quality: 80,
    format: ['webp', 'avif', 'png', 'jpg'],
  },
})
