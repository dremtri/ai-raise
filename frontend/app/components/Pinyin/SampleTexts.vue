<template>
  <div class="space-y-4">
    <h3 class="text-muted-foreground text-center">
      示例文本 (Sample Texts)
    </h3>
    <div class="gap-3 grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2">
      <button
        v-for="(sample, index) in sampleTexts"
        :key="index"
        class="p-3 text-left border border-gray-300 rounded-lg flex flex-col h-auto transition-colors items-start hover:border-blue-500 hover:bg-gray-50"
        @click="$emit('selectText', sample.text)"
      >
        <div class="text-xs text-gray-500 mb-1">
          {{ sample.title }}
        </div>
        <div class="text-sm">
          {{ sample.text }}
        </div>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { sampleTexts } from '~/composables/usePinyinData'

defineEmits<{
  selectText: [text: string]
}>()
</script>
