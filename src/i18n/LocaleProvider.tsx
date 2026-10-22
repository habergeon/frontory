import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import { localeFromPath, localizePath, type Locale } from './locale'

const LocaleContext = createContext<{ locale: Locale; setLocale: (locale: Locale) => void } | null>(null)

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, updateLocale] = useState<Locale>(() => localeFromPath(window.location.pathname) ?? 'ko')
  useEffect(() => {
    const sync = () => updateLocale(localeFromPath(window.location.pathname) ?? 'ko')
    window.addEventListener('popstate', sync)
    return () => window.removeEventListener('popstate', sync)
  }, [])
  const setLocale = (next: Locale) => {
    if (next === locale) return
    history.pushState(null, '', localizePath(next, '/') + window.location.search + window.location.hash)
    updateLocale(next)
  }
  return <LocaleContext.Provider value={{ locale, setLocale }}>{children}</LocaleContext.Provider>
}

export function useLocale() {
  const value = useContext(LocaleContext)
  if (!value) throw new Error('useLocale requires LocaleProvider')
  return value
}
