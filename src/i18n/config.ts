export const defaultLocale = 'uk'
export const locales = ['uk', 'ru'] as const
export type Locale = typeof locales[number]

export const localeNames: Record<Locale, string> = {
  'uk': 'Українська',
  'ru': 'Русский'
} 
