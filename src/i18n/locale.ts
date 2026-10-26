export type Locale = 'ko' | 'en'

/** Classify route prefixes; generated public-page maps check page existence. */
export function localeFromPath(pathname: string): Locale | null {
  if (pathname === '/en' || pathname.startsWith('/en/')) return 'en'
  if (pathname === '/' || /^\/(learn|about|privacy)(\/|$)/.test(pathname))
    return 'ko'
  return null
}

/** koPath is a canonical Korean absolute path, including any query or fragment. */
export function localizePath(locale: Locale, koPath: string): string {
  return locale === 'en' ? '/en' + koPath : koPath
}

export function practicePath(locale: Locale, id: string): string {
  return localizePath(locale, '/') + '#' + id
}
