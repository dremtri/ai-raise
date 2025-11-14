import type { HTTPMethod } from 'h3'
import type { NitroFetchOptions, NitroFetchRequest } from 'nitropack'

export interface RequestConfig extends NitroFetchOptions<NitroFetchRequest, Lowercase<HTTPMethod>> {
  // 可扩展自定义属性
  url: string
}

export type RequestOptions = Omit<RequestConfig, 'method' | 'url'>

// 工具网站相关类型
export interface ToolWebsite {
  id: string
  name: string
  url: string
  description: string
  category: 'AI' | 'Vue' | 'UI' | 'Learn' | 'Canvas' | '3D' | 'Design' | 'Other'
  tags: string[]
  icon?: string
  createdAt: string
}
