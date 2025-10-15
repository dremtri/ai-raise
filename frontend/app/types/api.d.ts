import type { HTTPMethod } from 'h3'
import type { NitroFetchOptions, NitroFetchRequest } from 'nitropack'

export interface RequestConfig extends NitroFetchOptions<NitroFetchRequest, Lowercase<HTTPMethod>> {
  // 可扩展自定义属性
  url: string
}

export type RequestOptions = Omit<RequestConfig, 'method' | 'url'>
