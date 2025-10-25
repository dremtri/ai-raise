<template>
  <div class="space-y-6">
    <div
      v-if="!text.trim()"
      class="text-gray-500 py-8 text-center"
    >
      <p>在上方输入中文文本以查看拼音注音</p>
      <p class="text-sm mt-2">
        Enter Chinese text above to see pinyin annotations
      </p>
    </div>

    <div
      v-else
      class="space-y-6"
    >
      <div
        class="p-6 rounded-lg flex flex-wrap"
        :class="[
          settings.textAlign === 'left'
            ? 'justify-start'
            : settings.textAlign === 'right'
              ? 'justify-end'
              : 'justify-center',
        ]"
        :style="{
          gap: `${settings.characterSpacing}px`,
          lineHeight: settings.pinyinPosition === 'right' ? '1.2' : 'normal',
          backgroundColor: settings.backgroundColor,
        }"
      >
        <template
          v-for="(char, index) in characters"
          :key="index"
        >
          <div
            v-if="isCharacter(char)"
            :class="settings.pinyinPosition === 'top' ? 'flex flex-col items-center' : 'flex items-center'"
          >
            <div
              class="text-sm"
              :style="{
                height: settings.pinyinPosition === 'top' ? '24px' : 'auto',
                minWidth: settings.pinyinPosition === 'right' ? '40px' : 'auto',
                textAlign: settings.pinyinPosition === 'right' ? 'left' : 'center',
                color: getToneColor(getPinyin(char) || ''),
                fontSize: `${settings.pinyinFontSize}px`,
              }"
            >
              {{ getPinyin(char) || '?' }}
            </div>
            <div
              class="text-2xl"
              :style="{
                color: settings.characterColor,
                marginLeft: settings.pinyinPosition === 'right' ? '8px' : '0',
                fontSize: `${settings.characterFontSize}px`,
              }"
            >
              {{ char }}
            </div>
          </div>
          <div
            v-else-if="char.trim()"
            :class="settings.pinyinPosition === 'top' ? 'flex flex-col items-center' : 'flex items-center'"
          >
            <div
              v-if="settings.pinyinPosition === 'top'"
              class="h-6"
            />
            <div
              class="text-2xl"
              :style="{ color: settings.characterColor, fontSize: `${settings.characterFontSize}px` }"
            >
              {{ char }}
            </div>
          </div>
        </template>
      </div>

      <!-- Tone legend -->
      <div class="flex justify-center">
        <div class="p-3 rounded-lg bg-gray-100">
          <p class="text-sm mb-2 text-center">
            声调颜色 (Tone Colors)
          </p>
          <div class="text-xs flex gap-4">
            <span style="color: #ef4444">一声 1st</span>
            <span style="color: #f97316">二声 2nd</span>
            <span style="color: #22c55e">三声 3rd</span>
            <span style="color: #3b82f6">四声 4th</span>
            <span style="color: #6b7280">轻声 Neutral</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { StyleSettings } from '~/composables/usePinyinData'

import { computed } from 'vue'

import { getPinyin, getToneColor } from '~/composables/usePinyinData'

interface Props {
  text: string
  settings: StyleSettings
}

const props = defineProps<Props>()

const characters = computed(() => props.text.split(''))

const isCharacter = (char: string) => /[\u4E00-\u9FFF]/.test(char)
</script>
