import { useSiteMeta } from './useSiteMeta'

export function useAppSeo(overrides: Record<string, any> = {}) {
  const { defaultMeta } = useSiteMeta()
  const meta = defaultMeta(overrides)

  useHead({
    title: meta.title,
    meta: [
      { name: 'description', content: meta.description },
      { property: 'og:title', content: meta.og?.title },
      { property: 'og:description', content: meta.og?.description },
      { property: 'og:url', content: meta.og?.url },
      { name: 'twitter:card', content: 'summary_large_image' },
    ],
    link: [
      { rel: 'canonical', href: overrides.canonical || (meta.og?.url) },
    ],
  })

  return { meta }
}
