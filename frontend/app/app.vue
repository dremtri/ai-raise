<script lang="ts" setup>
useHead({
  link: [
    { rel: 'icon', type: 'image/png', href: '/favicon.png' },
  ],
  meta: [
    { name: 'viewport', content: 'width=device-width, initial-scale=1, user-scalable=yes, viewport-fit=cover, maximum-scale=5.0, minimum-scale=1.0' },
    { name: 'mobile-web-app-capable', content: 'yes' },
    { name: 'apple-mobile-web-app-status-bar-style', content: 'black' },
    { name: 'apple-mobile-web-app-title', content: 'AiRaise' },
    { name: 'description', content: 'AiRaise | Dremtri' },
    { name: 'keywords', content: 'AiRaise, Dremtri' },
    { name: 'author', content: 'Dremtri' },
    { name: 'format-detection', content: 'telephone=no' },
    { name: 'robots', content: 'index, follow' },
    { name: 'applicable-device', content: 'pc,mobile' },
    { name: 'google', content: 'notranslate' },
    { name: 'google-site-verification', content: 'google-site-verification' },
    { name: 'msapplication-TileImage', content: '/favicon.png' },
    { name: 'msapplication-tap-highlight', content: 'no' },
    { name: 'msapplication-tooltip', content: 'AiRaise' },
    { name: 'msapplication-starturl', content: '/' },
    { name: 'msapplication-navbutton-color', content: '#000000' },
    { name: 'msapplication-task', content: 'name=AiRaise;action-uri=/;icon-uri=/favicon.png' },
    { name: 'msapplication-task-separator', content: 'AiRaise' },
    { name: 'msapplication-square70x70logo', content: '/favicon.png' },
    { name: 'msapplication-square150x150logo', content: '/favicon.png' },
    { name: 'msapplication-wide310x150logo', content: '/favicon.png' },
    { name: 'msapplication-square310x310logo', content: '/favicon.png' },
    { name: 'msapplication-notification', content: 'frequency=30;polling-uri=/favicon.png;polling-uri2=/favicon.png;polling-uri3=/favicon.png;polling-uri4=/favicon.png;cycle=1' },
    { name: 'msapplication-window', content: 'width=1024;height=768' },
    { name: 'msapplication-badge', content: 'frequency=30;polling-uri=/favicon.png;polling-uri2=/favicon.png;polling-uri3=/favicon.png;polling-uri4=/favicon.png;cycle=1' },
    { name: 'baidu-site-verification', content: '' },
  ],
})
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<style>
html,
body,
#__nuxt {
  overflow-x: initial;
  font-size: 12px;
  height: 100vh;
  margin: 0;
  padding: 0;
}
</style>
