import type { RequestConfig, RequestOptions } from '@/types/api'

export function useRequest<T = any>(options: RequestConfig) {
  const runtimeConfig = useRuntimeConfig()

  return $fetch<T>(options.url, {
    baseURL: runtimeConfig.public.baseURL,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  })
}

export function useGetRequest<T = any>(url: string, query?: any, options?: RequestOptions) {
  return useRequest<T>({ url, method: 'get', query, ...options })
}

export function usePostRequest<T = any>(url: string, data?: any, options?: RequestOptions) {
  return useRequest<T>({ url, method: 'post', body: data, ...options })
}

export function usePutRequest<T = any>(url: string, data?: any, options?: RequestOptions) {
  return useRequest<T>({ url, method: 'put', body: data, ...options })
}

export function useDeleteRequest<T = any>(url: string, options?: RequestOptions) {
  return useRequest<T>({ ...options, url, method: 'delete' })
}
