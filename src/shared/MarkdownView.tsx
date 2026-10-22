import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import type { Locale } from '../i18n/locale'
import { message } from '../i18n/messages'

interface Props {
  text: string
  locale?: Locale
  documentPath?: string
  onDocument?: (path: string) => void
}

export function MarkdownView({ text, documentPath, onDocument, locale = 'ko' }: Props) {
  return <div className="markdown">
    <ReactMarkdown skipHtml remarkPlugins={[remarkGfm]} components={{
      a({ href, children }) {
        const external = href?.startsWith('https://') || href?.startsWith('http://')
        if (external) return <a href={href} target="_blank" rel="noopener noreferrer">{children} ↗</a>
        if (href && documentPath && onDocument) {
          // Resolve against the displayed file, not its canonical Korean identity.
          const path = new URL(href, 'https://local-docs.invalid' + documentPath).pathname
          if (path.startsWith('/docs/') && path.endsWith('.md')) {
            return <button className="text-link" onClick={() => onDocument(path)}>{children}</button>
          }
        }
        return <span>{children}</span>
      },
      img({ alt }) { return <span className="image-placeholder">{message(locale, 'imagePlaceholder', { alt: alt || message(locale, 'noImageDescription', {}) })}</span> },
    }}>{text}</ReactMarkdown>
  </div>
}
