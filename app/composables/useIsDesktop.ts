import { ref, onMounted, onBeforeUnmount } from 'vue'

/**
 * Composable để phát hiện Desktop theo breakpoint px
 * Sử dụng matchMedia để tránh SSR issues (gọi trên mounted)
 */
export function useIsDesktop(breakpoint = 1024) {
  const isDesktop = ref(false)
  let mql: MediaQueryList | null = null

  const update = () => {
    if (typeof window === 'undefined') return
    isDesktop.value = window.matchMedia(`(min-width: ${breakpoint}px)`).matches
  }

  onMounted(() => {
    if (typeof window === 'undefined') return
    mql = window.matchMedia(`(min-width: ${breakpoint}px)`)
    isDesktop.value = mql.matches
    // addEventListener('change') modern, fallback to addListener
    if (typeof mql.addEventListener === 'function') {
      mql.addEventListener('change', update)
    } else if (typeof mql.addListener === 'function') {
      // older browsers
      // @ts-ignore
      mql.addListener(update)
    }
  })

  onBeforeUnmount(() => {
    if (!mql) return
    if (typeof mql.removeEventListener === 'function') {
      mql.removeEventListener('change', update)
    } else if (typeof mql.removeListener === 'function') {
      // @ts-ignore
      mql.removeListener(update)
    }
  })

  return { isDesktop }
}
