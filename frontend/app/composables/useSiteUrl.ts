/**
 * 获取站点 URL
 * 用于 SEO meta 标签、Open Graph、结构化数据等
 */
export function useSiteUrl() {
  const config = useRuntimeConfig()
  return config.public.siteUrl as string
}
