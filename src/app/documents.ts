import { createDocumentLoader } from './documentLoader'

export { DocumentNotFoundError, localizedDocPath, parseDocumentPath } from './documentLoader'
export const loadDocument = createDocumentLoader(import.meta.glob<string>('/docs/**/*.md', {
  query: '?raw', import: 'default',
}))
