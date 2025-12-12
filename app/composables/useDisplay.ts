import { ref, computed, onMounted, onBeforeUnmount } from 'vue'

/**
 * Composable để xác định giao diện hiển thị hiện tại: 'mobile' | 'tablet' | 'desktop'
 * - SSR-safe: chỉ tương tác với window / matchMedia trong onMounted
 * - Hỗ trợ breakpoints tuỳ chỉnh
 */
export type DisplayType = 'mobile' | 'tablet' | 'desktop'

export interface UseDisplayOptions {
  /**
   * breakpoints.base là ngưỡng tablet (inclusive từ) và desktop (inclusive từ)
   * Ví dụ mặc định: tablet = 768, desktop = 1024
   */
  breakpoints?: {
    tablet?: number
    desktop?: number
  }
}

export function useDisplay(options: UseDisplayOptions = {}) {
  const tabletBp = options.breakpoints?.tablet ?? 768
  const desktopBp = options.breakpoints?.desktop ?? 1024

  const display = ref<DisplayType>('desktop')

  const isMobile = computed(() => display.value === 'mobile')
  const isTablet = computed(() => display.value === 'tablet')
  const isDesktop = computed(() => display.value === 'desktop')

  // MediaQueryList references so we can remove listeners later
  let mqlMobile: MediaQueryList | null = null
  let mqlTablet: MediaQueryList | null = null
  let mqlDesktop: MediaQueryList | null = null

  const setDisplayByWidth = (width: number) => {
    if (width >= desktopBp) display.value = 'desktop'
    else if (width >= tabletBp) display.value = 'tablet'
    else display.value = 'mobile'
  }

  const updateFromMql = () => {
    // Prefer matchMedia results if available
    if (mqlDesktop && mqlDesktop.matches) {
      display.value = 'desktop'
      return
    }
    if (mqlTablet && mqlTablet.matches) {
      display.value = 'tablet'
      return
    }
    if (mqlMobile && mqlMobile.matches) {
      display.value = 'mobile'
      return
    }

    // Fallback to window.innerWidth
    if (typeof window !== 'undefined') {
      setDisplayByWidth(window.innerWidth)
    }
  }

  const addChangeListener = (mql: MediaQueryList | null) => {
    if (!mql) return
    // modern
    if (typeof mql.addEventListener === 'function') {
      mql.addEventListener('change', updateFromMql)
    } else if (typeof mql.addListener === 'function') {
      // older browsers
      // @ts-ignore
      mql.addListener(updateFromMql)
    }
  }

  const removeChangeListener = (mql: MediaQueryList | null) => {
    if (!mql) return
    if (typeof mql.removeEventListener === 'function') {
      mql.removeEventListener('change', updateFromMql)
    } else if (typeof mql.removeListener === 'function') {
      // @ts-ignore
      mql.removeListener(updateFromMql)
    }
  }

  onMounted(() => {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
      // Nếu không có matchMedia (rất hiếm), dùng innerWidth
      if (typeof window !== 'undefined') setDisplayByWidth(window.innerWidth)
      return
    }

    // Tạo media queries
    mqlDesktop = window.matchMedia(`(min-width: ${desktopBp}px)`)
    mqlTablet = window.matchMedia(`(min-width: ${tabletBp}px) and (max-width: ${desktopBp - 1}px)`)
    mqlMobile = window.matchMedia(`(max-width: ${tabletBp - 1}px)`)

    // Thiết lập ban đầu
    updateFromMql()

    // Đăng ký listener
    addChangeListener(mqlDesktop)
    addChangeListener(mqlTablet)
    addChangeListener(mqlMobile)
  })

  onBeforeUnmount(() => {
    removeChangeListener(mqlDesktop)
    removeChangeListener(mqlTablet)
    removeChangeListener(mqlMobile)
  })

  return { display, isMobile, isTablet, isDesktop }
}
