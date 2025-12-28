/**
 * Utils dùng chung cho toàn project.
 *
 * Lưu ý SSR:
 * - Các hàm trong file này không phụ thuộc `window/document`.
 * - Có thể dùng an toàn trong server-side và client-side.
 */

export type AnyRecord = Record<string, any>

export function isNil(value: unknown): value is null | undefined {
  return value === null || value === undefined
}

export function isString(value: unknown): value is string {
  return typeof value === "string"
}

export function isNumber(value: unknown): value is number {
  return typeof value === "number" && !Number.isNaN(value)
}

export function isEmpty(value: unknown): boolean {
  if (isNil(value)) return true

  if (typeof value === "string") return value.trim().length === 0
  if (Array.isArray(value)) return value.length === 0
  if (value instanceof Map || value instanceof Set) return value.size === 0

  if (typeof value === "object") return Object.keys(value as object).length === 0

  return false
}

export function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value))
}

export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

/**
 * Slugify tiếng Việt (bỏ dấu) + chuẩn hoá URL segment.
 */
export function toSlug(input: string): string {
  return input
    .trim()
    .toLowerCase()
    .normalize("NFD")
    // loại bỏ dấu tiếng Việt
    .replace(/\p{Diacritic}+/gu, "")
    // đ/Đ
    .replace(/[đ]/g, "d")
    // ký tự không hợp lệ -> '-'
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-{2,}/g, "-")
}

export function formatNumber(
  value: number | string,
  options: Intl.NumberFormatOptions = {},
  locale = "vi-VN",
): string {
  const n = typeof value === "string" ? Number(value) : value
  if (!isNumber(n)) return ""
  return new Intl.NumberFormat(locale, options).format(n)
}

export function formatCurrency(
  value: number | string,
  currency: string = "VND",
  locale = "vi-VN",
): string {
  return formatNumber(
    value,
    {
      style: "currency",
      currency,
      maximumFractionDigits: 0,
    },
    locale,
  )
}

export function formatDate(
  date: Date | string | number,
  options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  },
  locale = "vi-VN",
): string {
  const d = date instanceof Date ? date : new Date(date)
  if (Number.isNaN(d.getTime())) return ""
  return new Intl.DateTimeFormat(locale, options).format(d)
}

export function formatDateTime(
  date: Date | string | number,
  options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  },
  locale = "vi-VN",
): string {
  const d = date instanceof Date ? date : new Date(date)
  if (Number.isNaN(d.getTime())) return ""

  // Yêu cầu hiển thị theo thứ tự: dd/MM/yyyy HH:mm (ngày/tháng/năm rồi đến giờ)
  // => dùng formatToParts để lấy giá trị theo locale nhưng tự ghép lại đúng thứ tự.
  const parts = new Intl.DateTimeFormat(locale, options).formatToParts(d)
  const get = (type: Intl.DateTimeFormatPartTypes) =>
    parts.find((p) => p.type === type)?.value

  const day = get("day")
  const month = get("month")
  const year = get("year")
  const hour = get("hour")
  const minute = get("minute")
  const second = get("second")

  // Nếu thiếu date parts thì fallback về format bình thường
  if (!day || !month || !year) return new Intl.DateTimeFormat(locale, options).format(d)

  const dateText = `${day}/${month}/${year}`

  // Có thể có case caller chỉ muốn date (không set hour/minute)
  if (!hour && !minute && !second) return dateText

  const timeText = [hour, minute, second].filter(Boolean).join(":")
  return timeText ? `${dateText} ${timeText}` : dateText
}

/**
 * Parse JSON an toàn (trả về fallback nếu lỗi).
 */
export function safeJsonParse<T>(input: string, fallback: T): T {
  try {
    return JSON.parse(input) as T
  } catch {
    return fallback
  }
}

/**
 * Tạo query string từ object.
 * - Bỏ qua key có giá trị null/undefined/"".
 * - Array sẽ được expand theo dạng key=a&key=b.
 */
export function toQueryString(params: Record<string, unknown>): string {
  const parts: string[] = []

  for (const [key, value] of Object.entries(params)) {
    if (isNil(value) || value === "") continue

    const k = encodeURIComponent(key)
    if (Array.isArray(value)) {
      for (const item of value) {
        if (isNil(item) || item === "") continue
        parts.push(`${k}=${encodeURIComponent(String(item))}`)
      }
      continue
    }

    parts.push(`${k}=${encodeURIComponent(String(value))}`)
  }

  return parts.length ? `?${parts.join("&")}` : ""
}

/**
 * debounce: chỉ gọi fn sau khi ngừng trigger trong `wait` ms.
 */
export function debounce<TArgs extends any[], TResult>(
  fn: (...args: TArgs) => TResult,
  wait = 200,
): (...args: TArgs) => void {
  let timer: ReturnType<typeof setTimeout> | undefined

  return (...args: TArgs) => {
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => fn(...args), wait)
  }
}

/**
 * throttle: giới hạn fn gọi tối đa 1 lần mỗi `wait` ms.
 */
export function throttle<TArgs extends any[], TResult>(
  fn: (...args: TArgs) => TResult,
  wait = 200,
): (...args: TArgs) => void {
  let last = 0
  let timer: ReturnType<typeof setTimeout> | undefined

  return (...args: TArgs) => {
    const now = Date.now()
    const remaining = wait - (now - last)

    if (remaining <= 0) {
      if (timer) {
        clearTimeout(timer)
        timer = undefined
      }
      last = now
      fn(...args)
      return
    }

    if (!timer) {
      timer = setTimeout(() => {
        last = Date.now()
        timer = undefined
        fn(...args)
      }, remaining)
    }
  }
}
