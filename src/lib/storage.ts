export const LS_SERIES = 'hw_series_v1'
export const LS_CHECKS = 'hw_checklist_v3'
export const LS_TAB = 'hw_ui_tab_v7'

export function load<T>(key: string, defaultValue: T): T {
  try {
    return (JSON.parse(localStorage.getItem(key) || 'null') ?? defaultValue) as T
  } catch {
    return defaultValue
  }
}

export function save(key: string, value: unknown): void {
  localStorage.setItem(key, JSON.stringify(value))
}
