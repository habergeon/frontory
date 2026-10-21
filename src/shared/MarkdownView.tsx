import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

interface Props {
  text: string
  documentPath?: string
  onDocument?: (path: string) => void
}

export function MarkdownView({ text, documentPath, onDocument }: Props) {
  return <div className="markdown">
    <ReactMarkdown skipHtml remarkPlugins={[remarkGfm]} components={{
      a({ href, children }) {
        const external = href?.startsWith('https://') || href?.startsWith('http://')
        if (external) return <a href={href} target="_blank" rel="noopener noreferrer">{children} ↗</a>
        if (href && documentPath && onDocument) {
          const path = new URL(href, 'https://local-docs.invalid' + documentPath).pathname
          if (path.startsWith('/docs/') && path.endsWith('.md')) {
            return <button className="text-link" onClick={() => onDocument(path)}>{children}</button>
          }
        }
        return <span>{children}</span>
      },
      img({ alt }) { return <span className="image-placeholder">[이미지: {alt || '설명 없음'} — 외부 이미지는 자동 로드하지 않습니다]</span> },
    }}>{text}</ReactMarkdown>
  </div>
}
