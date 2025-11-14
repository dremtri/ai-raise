<script lang="ts" setup>
// 全局通用的 meta 标签
useHead({
  htmlAttrs: {
    lang: 'zh-CN',
  },
  meta: [
    { name: 'author', content: 'Dremtri' },
    { name: 'robots', content: 'index, follow' },
    { name: 'apple-mobile-web-app-capable', content: 'yes' },
    { name: 'apple-mobile-web-app-status-bar-style', content: 'black' },
    { name: 'apple-mobile-web-app-title', content: 'AiRaise' },
  ],
})
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
