import type { Locale } from './config'

const dictionaries = {
  'ru': () => import('./dictionaries/ru.json').then(module => module.default),
  'uk': () => import('./dictionaries/uk.json').then(module => module.default)
}

export const getDictionary = async (locale: Locale) => dictionaries[locale]()
