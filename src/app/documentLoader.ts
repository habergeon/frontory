import type { Locale } from '../i18n/locale'

/** Callers retain the original Korean path as the document's stable identity. */
export function localizedDocPath(locale: Locale, koDocPath: string): string {
  return locale === 'en' ? koDocPath.replace(/^\/docs\//, '/docs/en/') : koDocPath
}

/** Markdown navigation carries actual paths, including explicit Korean source links. */
export function parseDocumentPath(path: string): { locale: Locale; koDocPath: string } {
  return path.startsWith('/docs/en/')
    ? { locale: 'en', koDocPath: path.replace(/^\/docs\/en\//, '/docs/') }
    : { locale: 'ko', koDocPath: path }
}

export class DocumentNotFoundError extends Error {}

export function createDocumentLoader(loaders: Record<string, () => Promise<string>>) {
  const cache = new Map<string, Promise<string>>()
  return function loadDocument(locale: Locale, koDocPath: string): Promise<string> {
    const key = locale + ':' + koDocPath
    const cached = cache.get(key)
    if (cached) return cached
    const path = localizedDocPath(locale, koDocPath)
    const loader = loaders[path]
    if (!loader) return Promise.reject(new DocumentNotFoundError('Document not found: ' + path))
    const request = Promise.resolve().then(loader).catch(error => {
      cache.delete(key)
      throw error
    })
    cache.set(key, request)
    return request
  }
}
