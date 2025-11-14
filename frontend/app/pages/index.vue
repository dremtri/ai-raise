<script setup lang="ts">
import type { ToolWebsite } from '~/types/api'

const searchQuery = ref('')
const selectedCategory = ref<string>('All')
const viewMode = ref<'grid' | 'list'>('grid')

// 获取工具网站数据
const { data: websites } = await useFetch<ToolWebsite[]>('/api/tools/websites')

// 所有分类
const categories = computed(() => {
  if (!websites.value)
    return ['All']
  const cats = new Set(websites.value.map(site => site.category))
  return ['All', ...Array.from(cats)]
})

// 过滤后的网站列表
const filteredWebsites = computed(() => {
  if (!websites.value)
    return []

  let result = websites.value

  // 按分类过滤
  if (selectedCategory.value !== 'All') {
    result = result.filter(site => site.category === selectedCategory.value)
  }

  // 模糊搜索
  if (searchQuery.value.trim()) {
    const query = searchQuery.value.toLowerCase().trim()
    result = result.filter((site) => {
      return (
        site.name.toLowerCase().includes(query)
        || site.description.toLowerCase().includes(query)
        || site.tags.some(tag => tag.toLowerCase().includes(query))
        || site.category.toLowerCase().includes(query)
      )
    })
  }

  return result
})
</script>

<template>
  <div class="mx-auto px-4 py-8 container">
    <div class="mb-8">
      <h1 class="text-3xl font-bold mb-2">
        工具网站收录
      </h1>
      <p class="text-gray-600">
        收录了 AI、Electron、UI 等相关的优质工具网站
      </p>
    </div>

    <!-- 搜索和筛选栏 -->
    <div class="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <!-- 搜索框 -->
      <div class="flex-1 max-w-md">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="搜索网站名称、描述、标签..."
          class="px-4 py-2 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
      </div>

      <!-- 分类筛选和视图切换 -->
      <div class="flex gap-4 items-center">
        <!-- 分类选择 -->
        <div class="flex flex-wrap gap-2">
          <button
            v-for="cat in categories"
            :key="cat"
            class="px-4 py-2 rounded-lg transition-colors" :class="[
              selectedCategory === cat
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200',
            ]"
            @click="selectedCategory = cat"
          >
            {{ cat }}
          </button>
        </div>

        <!-- 视图切换 -->
        <div class="p-1 border border-gray-300 rounded-lg flex gap-2">
          <button
            class="p-2 rounded transition-colors" :class="[
              viewMode === 'grid'
                ? 'bg-blue-500 text-white'
                : 'text-gray-600 hover:bg-gray-100',
            ]"
            title="网格视图"
            @click="viewMode = 'grid'"
          >
            <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
            </svg>
          </button>
          <button
            class="p-2 rounded transition-colors" :class="[
              viewMode === 'list'
                ? 'bg-blue-500 text-white'
                : 'text-gray-600 hover:bg-gray-100',
            ]"
            title="列表视图"
            @click="viewMode = 'list'"
          >
            <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- 结果统计 -->
    <div class="text-gray-600 mb-4">
      找到 {{ filteredWebsites.length }} 个网站
    </div>

    <!-- 网站列表 - 网格视图 -->
    <div
      v-if="viewMode === 'grid'"
      class="gap-6 grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2"
    >
      <a
        v-for="site in filteredWebsites"
        :key="site.id"
        :href="site.url"
        target="_blank"
        rel="noopener noreferrer"
        class="p-6 border border-gray-200 rounded-lg bg-white block shadow-sm transition-shadow hover:shadow-md"
      >
        <div class="flex gap-4 items-start">
          <div class="text-4xl flex-shrink-0">
            {{ site.icon || '🔗' }}
          </div>
          <div class="flex-1 min-w-0">
            <h3 class="text-xl font-semibold mb-2 truncate">
              {{ site.name }}
            </h3>
            <p class="text-sm text-gray-600 mb-3 line-clamp-2">
              {{ site.description }}
            </p>
            <div class="mb-2 flex flex-wrap gap-2">
              <span class="text-xs text-blue-700 px-2 py-1 rounded bg-blue-100">
                {{ site.category }}
              </span>
              <span
                v-for="tag in site.tags.slice(0, 3)"
                :key="tag"
                class="text-xs text-gray-600 px-2 py-1 rounded bg-gray-100"
              >
                {{ tag }}
              </span>
            </div>
          </div>
        </div>
      </a>
    </div>

    <!-- 网站列表 - 列表视图 -->
    <div
      v-else
      class="space-y-4"
    >
      <a
        v-for="site in filteredWebsites"
        :key="site.id"
        :href="site.url"
        target="_blank"
        rel="noopener noreferrer"
        class="p-4 border border-gray-200 rounded-lg bg-white flex gap-4 transition-shadow items-center hover:shadow-md"
      >
        <div class="text-3xl flex-shrink-0">
          {{ site.icon || '🔗' }}
        </div>
        <div class="flex-1 min-w-0">
          <div class="mb-1 flex gap-3 items-center">
            <h3 class="text-lg font-semibold">
              {{ site.name }}
            </h3>
            <span class="text-xs text-blue-700 px-2 py-1 rounded bg-blue-100">
              {{ site.category }}
            </span>
          </div>
          <p class="text-sm text-gray-600 mb-2">
            {{ site.description }}
          </p>
          <div class="flex flex-wrap gap-2">
            <span
              v-for="tag in site.tags"
              :key="tag"
              class="text-xs text-gray-600 px-2 py-1 rounded bg-gray-100"
            >
              {{ tag }}
            </span>
          </div>
        </div>
        <div class="text-gray-400 flex-shrink-0">
          <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </div>
      </a>
    </div>

    <!-- 空状态 -->
    <div
      v-if="filteredWebsites.length === 0"
      class="text-gray-500 py-12 text-center"
    >
      <svg class="text-gray-300 mx-auto mb-4 h-16 w-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <p class="text-lg">
        没有找到匹配的网站
      </p>
      <p class="text-sm mt-2">
        试试其他搜索关键词或分类
      </p>
    </div>
  </div>
</template>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
