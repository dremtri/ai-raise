<script setup lang="ts">
import dayjs from 'dayjs'

const currentYear = dayjs().year()
</script>

<template>
  <div class="pt-16">
    <Navs class="h-[5rem] w-full relative" />
    <main class="min-h-[calc(100vh-5rem-80px)]">
      <slot class="mx-0 my-a max-w-[var(--raise-container)] w-100% relative" />
    </main>
    <footer class="py-6">
      <div class="mx-auto px-4 text-center max-w-[var(--raise-container)]">
        <p class="text-sm text-neutral-600">
          AiRaise © {{ currentYear }} Dremtri. All rights reserved.
        </p>
      </div>
    </footer>
  </div>
</template>
