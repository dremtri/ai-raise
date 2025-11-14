<template>
  <div class="bg---raise-bg p-4 min-h-screen">
    <div class="mx-auto max-w-4xl space-y-6">
      <!-- Header -->
      <div class="text-center space-y-2">
        <h1 class="text-3xl font-bold">
          汉字注音工具
        </h1>
        <p class="text-gray-600">
          Chinese Character Pinyin Annotation Tool
        </p>
      </div>

      <!-- Input Section -->
      <div class="p-6 border border-gray-200 rounded-lg bg-white shadow-sm">
        <div class="mb-4 flex gap-2 items-center">
          <span class="i-carbon-volume-up text-xl" />
          <h2 class="text-lg font-semibold">
            输入中文文本 (Enter Chinese Text)
          </h2>
        </div>
        <div class="space-y-4">
          <div class="space-y-2">
            <textarea
              v-model="inputText"
              placeholder="请输入中文文本... (Please enter Chinese text...)"
              class="text-lg p-3 border border-gray-300 rounded-lg min-h-[100px] w-full focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              :disabled="isExporting"
            />
            <div class="text-sm text-gray-600 flex justify-between">
              <span>{{ inputText.length }} 个字符</span>
              <button
                class="text-gray-600 p-1 flex gap-1 items-center hover:text-gray-900"
                @click="handleClearText"
              >
                <span class="i-carbon-reset" />
                清空
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Display Section -->
      <div class="p-6 border border-gray-200 rounded-lg bg-white shadow-sm">
        <div class="mb-4 flex items-center justify-between">
          <h2 class="text-lg font-semibold">
            拼音注音 (Pinyin Annotation)
          </h2>
          <button
            v-if="inputText.trim()"
            class="text-white px-4 py-2 rounded-lg bg-blue-500 flex gap-2 transition-colors items-center hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
            :disabled="isExporting"
            @click="exportToPDF"
          >
            <span class="i-carbon-download" />
            {{ isExporting ? '导出中...' : '导出PDF' }}
          </button>
        </div>
        <PinyinDisplay
          :text="inputText"
          :settings="styleSettings"
        />
      </div>

      <!-- Style Controls -->
      <div
        v-if="inputText.trim()"
        class="p-6 border border-gray-200 rounded-lg bg-white shadow-sm"
      >
        <div class="mb-4 flex gap-2 items-center">
          <span class="i-carbon-color-palette text-xl" />
          <h2 class="text-lg font-semibold">
            样式设置 (Style Settings)
          </h2>
        </div>
        <PinyinStyleControls
          :settings="styleSettings"
          @update="handleStyleChange"
        />
      </div>

      <!-- Separator -->
      <div class="border-t border-gray-300" />

      <!-- Sample Texts -->
      <PinyinSampleTexts @select-text="handleSampleSelect" />

      <!-- Instructions -->
      <div class="p-6 border border-gray-200 rounded-lg bg-gray-50 shadow-sm">
        <div class="text-sm space-y-3">
          <h4 class="font-semibold">
            使用说明 (Instructions):
          </h4>
          <ul class="text-gray-600 list-disc list-inside space-y-1">
            <li>在文本框中输入中文字符，系统会自动显示拼音注音</li>
            <li>拼音用不同颜色表示声调：红色(一声)，橙色(二声)，绿色(三声)，蓝色(四声)，灰色(轻声)</li>
            <li>点击示例文本可以快速体验注音功能</li>
            <li>支持常用汉字的拼音注音，未收录的字符会显示"?"</li>
            <li>可以使用预设模板或自定义字间距、汉字颜色、背景色和拼音位置</li>
            <li>注音完成后可点击"导出PDF"按钮将结果保存为PDF文件</li>
          </ul>
          <div class="pt-2 border-t border-gray-300">
            <ul class="text-gray-600 list-disc list-inside space-y-1">
              <li>Enter Chinese characters in the text box to see automatic pinyin annotations</li>
              <li>Pinyin tones are color-coded: Red (1st), Orange (2nd), Green (3rd), Blue (4th), Gray (Neutral)</li>
              <li>Click sample texts to quickly try the annotation feature</li>
              <li>Supports common Chinese characters; unrecognized characters show "?"</li>
              <li>Use preset templates or customize character spacing, character color, background color, and pinyin position</li>
              <li>After annotation is complete, click "Export PDF" to save results as a PDF file</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { StyleSettings } from '~/composables/usePinyinData'

import dayjs from 'dayjs'
import { ref } from 'vue'
import { defaultStyleSettings, getPinyin, getToneColor } from '~/composables/usePinyinData'

// 页面特定的 SEO 设置
useSeoMeta({
  title: '汉字注音工具 - 在线拼音标注',
  description: '免费在线汉字拼音注音工具，支持多种样式设置、PDF 导出，适用于教学、学习和文档制作。',
  ogTitle: '汉字注音工具 - 在线拼音标注',
  ogDescription: '免费在线汉字拼音注音工具，支持多种样式和 PDF 导出',
  twitterCard: 'summary',
})

const inputText = ref('')
const isExporting = ref(false)
const styleSettings = ref<StyleSettings>({ ...defaultStyleSettings })

function handleClearText() {
  inputText.value = ''
}

function handleSampleSelect(text: string) {
  inputText.value = text
}

function handleStyleChange(newSettings: StyleSettings) {
  // Create a new object to ensure reactivity
  styleSettings.value = { ...newSettings }
}

async function exportToPDF() {
  if (!inputText.value.trim())
    return

  try {
    isExporting.value = true

    // Dynamic import for PDF libraries
    const [{ default: jsPDF }, { default: html2canvas }] = await Promise.all([
      import('jspdf'),
      import('html2canvas'),
    ])

    // Create temporary container for PDF content
    const tempContainer = document.createElement('div')
    tempContainer.style.position = 'absolute'
    tempContainer.style.top = '-9999px'
    tempContainer.style.left = '-9999px'
    tempContainer.style.width = '210mm' // A4 width
    tempContainer.style.padding = '15mm 20mm' // 上下15mm, 左右20mm
    tempContainer.style.backgroundColor = styleSettings.value.backgroundColor
    tempContainer.style.fontFamily = 'Arial, "Microsoft YaHei", sans-serif'

    // Create content for PDF
    tempContainer.innerHTML = generatePDFContent(inputText.value, styleSettings.value)

    document.body.appendChild(tempContainer)

    // Convert to canvas
    const canvas = await html2canvas(tempContainer, {
      scale: 2,
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#ffffff',
    })

    // Remove temporary container
    document.body.removeChild(tempContainer)

    // Create PDF
    const imgData = canvas.toDataURL('image/png')
    // eslint-disable-next-line new-cap
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
    })

    const imgWidth = 210 // A4 width in mm
    const pageHeight = 297 // A4 height in mm
    const imgHeight = (canvas.height * imgWidth) / canvas.width
    let heightLeft = imgHeight
    let position = 0

    // Add first page
    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight)
    heightLeft -= pageHeight

    // Add additional pages if needed
    while (heightLeft >= 0) {
      position = heightLeft - imgHeight
      pdf.addPage()
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight)
      heightLeft -= pageHeight
    }

    // Save PDF
    const fileName = `汉字注音_${dayjs().format('YYYY-MM-DD')}.pdf`
    pdf.save(fileName)
  }
  catch (error) {
    console.error('PDF export failed:', error)
    // eslint-disable-next-line no-alert
    alert('PDF导出失败，请重试。')
  }
  finally {
    isExporting.value = false
  }
}

function generatePDFContent(text: string, settings: StyleSettings): string {
  const generatePinyinHTML = (text: string, settings: StyleSettings): string => {
    const characters = text.split('')
    let html = ''

    characters.forEach((char) => {
      const isCharacter = /[\u4E00-\u9FFF]/.test(char)

      if (!isCharacter && char.trim()) {
        html += `<span style="display: inline-block; margin: 0 ${Math.max(1, settings.characterSpacing - 8)}px; font-size: ${settings.characterFontSize}px; color: ${settings.characterColor};">${char}</span>`
        return
      }

      if (!isCharacter) {
        return
      }

      const pinyin = getPinyin(char)
      const color = pinyin ? getToneColor(pinyin) : '#9ca3af'

      if (settings.pinyinPosition === 'top') {
        html += `
          <span style="display: inline-block; margin: 0 ${Math.max(2, settings.characterSpacing - 6)}px; text-align: center; vertical-align: top;">
            <div style="font-size: ${settings.pinyinFontSize}px; color: ${color}; margin-bottom: 2px; line-height: 1.2;">${pinyin || '?'}</div>
            <div style="font-size: ${settings.characterFontSize}px; color: ${settings.characterColor}; line-height: 1.3;">${char}</div>
          </span>
        `
      }
      else {
        html += `
          <span style="display: inline-flex; align-items: center; margin: 0 ${Math.max(2, settings.characterSpacing - 6)}px;">
            <div style="font-size: ${settings.pinyinFontSize}px; color: ${color}; margin-right: 4px; min-width: 35px;">${pinyin || '?'}</div>
            <div style="font-size: ${settings.characterFontSize}px; color: ${settings.characterColor};">${char}</div>
          </span>
        `
      }
    })

    return html
  }

  return `
    <div style="margin-bottom: 20px;">
      <div id="pinyin-content" style="text-align: ${settings.textAlign}; line-height: ${settings.pinyinPosition === 'right' ? '1.8' : '2.5'}; padding: 10px; background-color: ${settings.backgroundColor};">
        ${generatePinyinHTML(text, settings)}
      </div>
    </div>
    
    <div style="margin-top: 25px; padding-top: 15px; border-top: 1px solid #ddd;">
      <div style="text-align: center;">
        <div style="display: flex; justify-content: center; gap: 15px; font-size: 11px; color: #666;">
          <span style="color: #ef4444;">一声</span>
          <span style="color: #f97316;">二声</span>
          <span style="color: #22c55e;">三声</span>
          <span style="color: #3b82f6;">四声</span>
          <span style="color: #6b7280;">轻声</span>
        </div>
      </div>
    </div>
    
    <div style="text-align: center; margin-top: 15px; font-size: 9px; color: #999;">
      ${dayjs().format('YYYY-MM-DD')}
    </div>
  `
}
</script>
