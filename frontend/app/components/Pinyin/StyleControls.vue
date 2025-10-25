<template>
  <div class="space-y-6">
    <!-- Templates or Custom tabs -->
    <div class="mb-4">
      <div class="mb-6 border-b border-gray-300 flex gap-2">
        <button
          class="font-medium px-4 py-2 transition-colors"
          :class="activeTab === 'templates' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-600 hover:text-gray-900'"
          @click="activeTab = 'templates'"
        >
          <span class="i-carbon-template mr-2 inline-block" />
          模板 (Templates)
        </button>
        <button
          class="font-medium px-4 py-2 transition-colors"
          :class="activeTab === 'custom' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-600 hover:text-gray-900'"
          @click="activeTab = 'custom'"
        >
          <span class="i-carbon-color-palette mr-2 inline-block" />
          自定义 (Custom)
        </button>
      </div>

      <!-- Templates Tab -->
      <div
        v-if="activeTab === 'templates'"
        class="space-y-4"
      >
        <div class="text-sm text-gray-600">
          选择预设模板快速应用样式设置
        </div>

        <div class="gap-3 grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2">
          <div
            v-for="(template, index) in styleTemplates"
            :key="index"
            class="p-4 border-2 rounded-lg transition-all relative"
            :class="isTemplateActive(template) ? 'border-blue-500 bg-blue-50 ring-2 ring-blue-200' : 'border-gray-300 hover:border-blue-300'"
          >
            <div
              v-if="isTemplateActive(template)"
              class="right-2 top-2 absolute"
            >
              <div class="text-white rounded-full bg-blue-500 flex h-6 w-6 items-center justify-center">
                <span class="i-carbon-checkmark text-sm" />
              </div>
            </div>

            <div class="space-y-3">
              <div>
                <h4 class="font-medium">
                  {{ template.name }}
                </h4>
                <p class="text-xs text-gray-600">
                  {{ template.nameEn }}
                </p>
              </div>

              <p class="text-sm text-gray-600">
                {{ template.description }}
              </p>

              <!-- Template Preview -->
              <div
                class="p-3 border rounded"
                :style="{ backgroundColor: template.settings.backgroundColor }"
              >
                <div
                  class="flex"
                  :class="template.settings.pinyinPosition === 'top' ? 'flex-col items-center' : 'items-center gap-2'"
                >
                  <div class="text-xs text-blue-500">
                    nǐ
                  </div>
                  <div
                    class="text-lg"
                    :style="{
                      color: template.settings.characterColor,
                      marginLeft: template.settings.pinyinPosition === 'right' ? '8px' : '0',
                    }"
                  >
                    你
                  </div>
                </div>
              </div>

              <button
                class="text-sm font-medium px-4 py-2 rounded-lg w-full transition-colors"
                :class="isTemplateActive(template) ? 'bg-blue-500 text-white cursor-default' : 'border border-gray-300 bg-white text-gray-700 hover:bg-gray-50'"
                :disabled="isTemplateActive(template)"
                @click="applyTemplate(template.settings)"
              >
                {{ isTemplateActive(template) ? '已应用' : '应用模板' }}
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Custom Tab -->
      <div
        v-if="activeTab === 'custom'"
        class="space-y-6"
      >
        <!-- Character Spacing -->
        <div class="space-y-3">
          <div class="flex gap-2 items-center">
            <span class="i-carbon-text-font" />
            <label class="font-medium">字间距 (Character Spacing): {{ localSettings.characterSpacing }}px</label>
          </div>
          <input
            v-model.number="localSettings.characterSpacing"
            type="range"
            min="0"
            max="50"
            step="2"
            class="w-full"
          >
          <div class="text-xs text-gray-600 flex justify-between">
            <span>紧密 (Tight)</span>
            <span>正常 (Normal)</span>
            <span>宽松 (Loose)</span>
          </div>
        </div>

        <!-- Character Color -->
        <div class="space-y-3">
          <div class="flex gap-2 items-center">
            <span class="i-carbon-color-palette" />
            <label class="font-medium">汉字颜色 (Character Color)</label>
          </div>

          <!-- Color Picker -->
          <div class="flex gap-3 items-center">
            <div class="flex gap-2 items-center">
              <div class="relative">
                <input
                  v-model="localSettings.characterColor"
                  type="color"
                  class="border-2 border-gray-300 rounded-md opacity-0 h-10 w-10 cursor-pointer inset-0 absolute"
                  title="选择自定义颜色"
                >
                <div
                  class="border-2 border-gray-300 rounded-md flex h-10 w-10 cursor-pointer items-center justify-center"
                  :style="{ backgroundColor: localSettings.characterColor }"
                >
                  <span class="i-carbon-eyedropper text-white" style="mix-blend-mode: difference;" />
                </div>
              </div>
              <div class="flex flex-col">
                <div class="text-sm text-gray-600">
                  自定义颜色 (Custom Color)
                </div>
                <div class="text-xs text-gray-600 font-mono">
                  {{ localSettings.characterColor.toUpperCase() }}
                </div>
              </div>
            </div>
          </div>

          <!-- Quick Color Selection -->
          <div>
            <div class="text-sm text-gray-600 mb-2">
              快速选择 (Quick Select)
            </div>
            <div class="gap-2 grid grid-cols-4">
              <button
                v-for="color in characterColorOptions"
                :key="color.value"
                class="p-2 border-2 rounded-md w-full transition-colors"
                :class="localSettings.characterColor === color.value ? 'border-blue-500 ring-2 ring-blue-200' : 'border-gray-300 hover:border-blue-300'"
                @click="localSettings.characterColor = color.value"
              >
                <div
                  class="mb-1 rounded-sm h-6 w-full"
                  :style="{ backgroundColor: color.value }"
                />
                <div class="text-xs text-center">
                  {{ color.label.split(' ')[0] }}
                </div>
              </button>
            </div>
          </div>
        </div>

        <!-- Background Color -->
        <div class="space-y-3">
          <div class="flex gap-2 items-center">
            <span class="i-carbon-color-switch" />
            <label class="font-medium">背景颜色 (Background Color)</label>
          </div>

          <!-- Color Picker -->
          <div class="flex gap-3 items-center">
            <div class="flex gap-2 items-center">
              <div class="relative">
                <input
                  v-model="localSettings.backgroundColor"
                  type="color"
                  class="border-2 border-gray-300 rounded-md opacity-0 h-10 w-10 cursor-pointer inset-0 absolute"
                  title="选择自定义背景色"
                >
                <div
                  class="border-2 border-gray-300 rounded-md flex h-10 w-10 cursor-pointer items-center justify-center"
                  :style="{ backgroundColor: localSettings.backgroundColor }"
                >
                  <span class="i-carbon-eyedropper text-black" style="mix-blend-mode: difference;" />
                </div>
              </div>
              <div class="flex flex-col">
                <div class="text-sm text-gray-600">
                  自定义背景色 (Custom Background)
                </div>
                <div class="text-xs text-gray-600 font-mono">
                  {{ localSettings.backgroundColor.toUpperCase() }}
                </div>
              </div>
            </div>
          </div>

          <!-- Quick Color Selection -->
          <div>
            <div class="text-sm text-gray-600 mb-2">
              快速选择 (Quick Select)
            </div>
            <div class="gap-2 grid grid-cols-4">
              <button
                v-for="color in backgroundColorOptions"
                :key="color.value"
                class="p-2 border-2 rounded-md w-full transition-colors"
                :class="localSettings.backgroundColor === color.value ? 'border-blue-500 ring-2 ring-blue-200' : 'border-gray-300 hover:border-blue-300'"
                @click="localSettings.backgroundColor = color.value"
              >
                <div
                  class="mb-1 border rounded-sm h-6 w-full"
                  :style="{ backgroundColor: color.value }"
                />
                <div class="text-xs text-center">
                  {{ color.label.split(' ')[0] }}
                </div>
              </button>
            </div>
          </div>
        </div>

        <!-- Pinyin Position -->
        <div class="space-y-3">
          <div class="flex gap-2 items-center">
            <span class="i-carbon-layout" />
            <label class="font-medium">拼音位置 (Pinyin Position)</label>
          </div>
          <div class="space-y-2">
            <label class="flex gap-2 items-center">
              <input
                v-model="localSettings.pinyinPosition"
                type="radio"
                value="top"
                class="h-4 w-4"
              >
              <span>汉字上方 (Above Characters)</span>
            </label>
            <label class="flex gap-2 items-center">
              <input
                v-model="localSettings.pinyinPosition"
                type="radio"
                value="right"
                class="h-4 w-4"
              >
              <span>汉字右侧 (Right of Characters)</span>
            </label>
          </div>
        </div>

        <!-- Text Alignment -->
        <div class="space-y-3">
          <div class="flex gap-2 items-center">
            <span class="i-carbon-text-align-center" />
            <label class="font-medium">文本对齐 (Text Alignment)</label>
          </div>
          <div class="space-y-2">
            <label class="flex gap-2 items-center">
              <input
                v-model="localSettings.textAlign"
                type="radio"
                value="left"
                class="h-4 w-4"
              >
              <span class="i-carbon-text-align-left" />
              <span>居左对齐 (Left Align)</span>
            </label>
            <label class="flex gap-2 items-center">
              <input
                v-model="localSettings.textAlign"
                type="radio"
                value="center"
                class="h-4 w-4"
              >
              <span class="i-carbon-text-align-center" />
              <span>居中对齐 (Center Align)</span>
            </label>
            <label class="flex gap-2 items-center">
              <input
                v-model="localSettings.textAlign"
                type="radio"
                value="right"
                class="h-4 w-4"
              >
              <span class="i-carbon-text-align-right" />
              <span>居右对齐 (Right Align)</span>
            </label>
          </div>
        </div>

        <!-- Font Sizes -->
        <div class="space-y-4">
          <!-- Pinyin Font Size -->
          <div class="space-y-3">
            <div class="flex gap-2 items-center">
              <span class="i-carbon-text-font" />
              <label class="font-medium">拼音字号 (Pinyin Font Size)</label>
            </div>
            <div class="space-y-2">
              <input
                v-model.number="localSettings.pinyinFontSize"
                type="range"
                min="10"
                max="24"
                step="1"
                class="w-full"
              >
              <div class="text-sm text-gray-600 flex justify-between">
                <span>{{ localSettings.pinyinFontSize }}px</span>
                <div class="flex gap-4">
                  <span>小 (Small)</span>
                  <span>中 (Medium)</span>
                  <span>大 (Large)</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Character Font Size -->
          <div class="space-y-3">
            <div class="flex gap-2 items-center">
              <span class="i-carbon-text-font" />
              <label class="font-medium">汉字字号 (Character Font Size)</label>
            </div>
            <div class="space-y-2">
              <input
                v-model.number="localSettings.characterFontSize"
                type="range"
                min="16"
                max="40"
                step="2"
                class="w-full"
              >
              <div class="text-sm text-gray-600 flex justify-between">
                <span>{{ localSettings.characterFontSize }}px</span>
                <div class="flex gap-4">
                  <span>小 (Small)</span>
                  <span>中 (Medium)</span>
                  <span>大 (Large)</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Preview -->
        <div class="space-y-2">
          <label class="font-medium">预览 (Preview)</label>
          <div
            class="p-4 border rounded-lg flex"
            :class="[
              localSettings.textAlign === 'left'
                ? 'justify-start'
                : localSettings.textAlign === 'right'
                  ? 'justify-end'
                  : 'justify-center',
            ]"
            :style="{ backgroundColor: localSettings.backgroundColor }"
          >
            <div
              class="flex"
              :class="localSettings.pinyinPosition === 'top' ? 'flex-col items-center' : 'items-center gap-2'"
              :style="{ gap: localSettings.pinyinPosition === 'top' ? '0' : `${localSettings.characterSpacing}px` }"
            >
              <div class="text-sm text-blue-500">
                nǐ
              </div>
              <div
                class="text-2xl"
                :style="{
                  color: localSettings.characterColor,
                  marginLeft: localSettings.pinyinPosition === 'top' ? '0' : `${localSettings.characterSpacing}px`,
                }"
              >
                你
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { StyleSettings } from '~/composables/usePinyinData'

import { nextTick, ref, watch } from 'vue'

import { styleTemplates } from '~/composables/usePinyinData'

interface Props {
  settings: StyleSettings
}

const props = defineProps<Props>()

const emit = defineEmits<{
  update: [settings: StyleSettings]
}>()

const activeTab = ref<'templates' | 'custom'>('templates')
const localSettings = ref<StyleSettings>({ ...props.settings })

// Track if we're updating from parent to avoid circular updates
let updatingFromParent = false

// Watch for external changes to settings (from parent component)
watch(() => props.settings, (newSettings) => {
  // Only update if the settings actually changed and not from our own emit
  const newJSON = JSON.stringify(newSettings)
  const localJSON = JSON.stringify(localSettings.value)

  if (newJSON !== localJSON && !updatingFromParent) {
    updatingFromParent = true
    localSettings.value = { ...newSettings }
    // Reset flag in next tick
    nextTick(() => {
      updatingFromParent = false
    })
  }
}, { deep: true })

// Emit updates when local settings change
watch(localSettings, (newSettings) => {
  // Don't emit if we're updating from parent
  if (!updatingFromParent) {
    emit('update', { ...newSettings })
  }
}, { deep: true })

const characterColorOptions = [
  { value: '#000000', label: '黑色 (Black)' },
  { value: '#374151', label: '深灰 (Dark Gray)' },
  { value: '#ef4444', label: '红色 (Red)' },
  { value: '#3b82f6', label: '蓝色 (Blue)' },
  { value: '#10b981', label: '绿色 (Green)' },
  { value: '#f59e0b', label: '橙色 (Orange)' },
  { value: '#8b5cf6', label: '紫色 (Purple)' },
  { value: '#ec4899', label: '粉色 (Pink)' },
]

const backgroundColorOptions = [
  { value: '#ffffff', label: '纯白 (White)' },
  { value: '#f9fafb', label: '浅灰 (Light Gray)' },
  { value: '#fef7ed', label: '米色 (Beige)' },
  { value: '#f0fdf4', label: '淡绿 (Light Green)' },
  { value: '#eff6ff', label: '淡蓝 (Light Blue)' },
  { value: '#fdf4ff', label: '淡紫 (Light Purple)' },
  { value: '#fce7f3', label: '淡黄 (Light Yellow)' },
  { value: '#fce7f3', label: '淡粉 (Light Pink)' },
]

function isTemplateActive(template: typeof styleTemplates[0]) {
  return JSON.stringify(template.settings) === JSON.stringify(localSettings.value)
}

function applyTemplate(settings: StyleSettings) {
  // Update all properties to trigger reactivity
  Object.assign(localSettings.value, settings)
}
</script>
