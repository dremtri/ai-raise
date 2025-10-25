import { pinyin } from 'pinyin-pro'

// Get pinyin for a single character using pinyin-pro
export function getPinyin(char: string): string {
  if (!char || !/[\u4E00-\u9FFF]/.test(char)) {
    return ''
  }

  // pinyin-pro returns string by default
  return pinyin(char, {
    toneType: 'symbol', // 使用声调符号 (ā á ǎ à)
  })
}

// Get tone color based on pinyin tone
export function getToneColor(pinyinStr: string): string {
  if (!pinyinStr)
    return '#6b7280' // Neutral/no tone - gray

  if (pinyinStr.match(/[āēīōūǖáéíóúǘǎěǐǒǔǚàèìòùǜ]/)) {
    if (pinyinStr.match(/[āēīōūǖ]/))
      return '#ef4444' // First tone - red
    if (pinyinStr.match(/[áéíóúǘ]/))
      return '#f97316' // Second tone - orange
    if (pinyinStr.match(/[ǎěǐǒǔǚ]/))
      return '#22c55e' // Third tone - green
    if (pinyinStr.match(/[àèìòùǜ]/))
      return '#3b82f6' // Fourth tone - blue
  }
  return '#6b7280' // Neutral tone - gray
}

export interface StyleSettings {
  characterSpacing: number
  characterColor: string
  pinyinPosition: 'top' | 'right'
  backgroundColor: string
  textAlign: 'left' | 'center' | 'right'
  pinyinFontSize: number
  characterFontSize: number
}

export const defaultStyleSettings: StyleSettings = {
  characterSpacing: 16,
  characterColor: '#000000',
  pinyinPosition: 'top',
  backgroundColor: '#ffffff',
  textAlign: 'left',
  pinyinFontSize: 14,
  characterFontSize: 14,
}

export const sampleTexts = [
  {
    title: '基本问候 (Basic Greetings)',
    text: '你好，我很好。',
  },
  {
    title: '自我介绍 (Self Introduction)',
    text: '我是学生，我学习中文。',
  },
  {
    title: '数字 (Numbers)',
    text: '一二三四五六七八九十',
  },
  {
    title: '家庭 (Family)',
    text: '我爱我的家人和朋友。',
  },
  {
    title: '时间 (Time)',
    text: '今天天气很好。',
  },
  {
    title: '感谢 (Thanks)',
    text: '谢谢老师，再见！',
  },
]

export const styleTemplates = [
  {
    name: '默认白色',
    nameEn: 'Default White',
    description: '经典白色背景，适合正式文档',
    settings: {
      characterSpacing: 16,
      characterColor: '#000000',
      pinyinPosition: 'top',
      backgroundColor: '#ffffff',
      textAlign: 'left',
      pinyinFontSize: 14,
      characterFontSize: 14,
    } as StyleSettings,
  },
  {
    name: '温暖米色',
    nameEn: 'Warm Beige',
    description: '温暖的米色背景，护眼舒适',
    settings: {
      characterSpacing: 18,
      characterColor: '#2d1810',
      pinyinPosition: 'top',
      backgroundColor: '#fef7ed',
      textAlign: 'left',
      pinyinFontSize: 14,
      characterFontSize: 14,
    } as StyleSettings,
  },
  {
    name: '护眼绿色',
    nameEn: 'Eye-friendly Green',
    description: '柔和的绿色背景，减少眼疲劳',
    settings: {
      characterSpacing: 16,
      characterColor: '#1a2e05',
      pinyinPosition: 'top',
      backgroundColor: '#f0fdf4',
      textAlign: 'left',
      pinyinFontSize: 14,
      characterFontSize: 14,
    } as StyleSettings,
  },
  {
    name: '专业蓝色',
    nameEn: 'Professional Blue',
    description: '专业的蓝色调，适合商务场合',
    settings: {
      characterSpacing: 16,
      characterColor: '#1e3a8a',
      pinyinPosition: 'top',
      backgroundColor: '#eff6ff',
      textAlign: 'left',
      pinyinFontSize: 14,
      characterFontSize: 14,
    } as StyleSettings,
  },
  {
    name: '简约灰色',
    nameEn: 'Minimal Gray',
    description: '简约的灰色背景，现代感十足',
    settings: {
      characterSpacing: 20,
      characterColor: '#1f2937',
      pinyinPosition: 'top',
      backgroundColor: '#f9fafb',
      textAlign: 'left',
      pinyinFontSize: 14,
      characterFontSize: 14,
    } as StyleSettings,
  },
  {
    name: '横排模式',
    nameEn: 'Horizontal Layout',
    description: '拼音在右侧的横排布局',
    settings: {
      characterSpacing: 24,
      characterColor: '#374151',
      pinyinPosition: 'right',
      backgroundColor: '#ffffff',
      textAlign: 'left',
      pinyinFontSize: 14,
      characterFontSize: 14,
    } as StyleSettings,
  },
]
