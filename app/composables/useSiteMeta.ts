export function useSiteMeta() {
  const runtime = useRuntimeConfig()

  function defaultMeta(overrides: Record<string, any> = {}) {
    const siteUrl = runtime.public.siteUrl || 'http://localhost:3000'
    return {
      title: overrides.title || 'APEX',
      description: overrides.description || 'APEX - cộng đồng và sản phẩm công nghệ',
      og: {
        title: overrides.og?.title || overrides.title || 'APEX',
        description: overrides.og?.description || overrides.description,
        url: overrides.og?.url || siteUrl,
      },
      ...overrides,
    }
  }

  return { defaultMeta }
}
