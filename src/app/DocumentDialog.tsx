import { useEffect, useRef, useState } from 'react'
import { MarkdownView } from '../shared/MarkdownView'
import type { Locale } from '../i18n/locale'
import { messages } from '../i18n/messages'
import { DocumentNotFoundError, loadDocument, localizedDocPath, parseDocumentPath } from './documents'

interface Props { initialPath: string; unitPath: string; onClose: () => void; locale?: Locale }
export function DocumentDialog({ initialPath, unitPath, onClose, locale = 'ko' }: Props) {
  const dialog = useRef<HTMLDialogElement>(null)
  const previousFocus = useRef(document.activeElement)
  const article = useRef<HTMLElement>(null)
  const [selection, setSelection] = useState({ path: initialPath, locale })
  const path = selection.locale === locale ? selection.path : localizedDocPath(locale, parseDocumentPath(selection.path).koDocPath)
  const request = parseDocumentPath(path)
  const [content, setContent] = useState<{ key: string; text: string; error?: 'missing' | 'failed' } | null>(null)
  const key = request.locale + ':' + request.koDocPath
  const current = content?.key === key ? content : null
  const copy = messages[locale]
  useEffect(() => {
    const element = dialog.current
    element?.showModal()
    return () => {
      // Restore after React removes the modal and its inert background.
      queueMicrotask(() => {
        if (!element?.isConnected && previousFocus.current instanceof HTMLElement) previousFocus.current.focus()
      })
    }
  }, [])
  useEffect(() => {
    setSelection(current => current.locale === locale ? current : {
      path: localizedDocPath(locale, parseDocumentPath(current.path).koDocPath), locale,
    })
  }, [locale])
  useEffect(() => {
    let cancelled = false
    loadDocument(request.locale, request.koDocPath).then(text => {
      if (!cancelled) setContent({ key, text })
    }, error => {
      if (!cancelled) setContent({ key, text: '', error: error instanceof DocumentNotFoundError ? 'missing' : 'failed' })
    })
    return () => { cancelled = true }
  }, [request.locale, request.koDocPath, key])
  const navigate = (next: string) => {
    setSelection({ path: next, locale })
    article.current?.scrollTo({ top: 0 })
  }
  return <dialog ref={dialog} className="document-dialog" onCancel={onClose} onClose={onClose} aria-labelledby="document-title">
    <header className="dialog-header">
      <h2 id="document-title">{copy.learningDocument}</h2>
      <button onClick={onClose} autoFocus>{copy.close}</button>
    </header>
    <nav className="document-nav" aria-label={copy.documentNavigation}>
      <button onClick={() => navigate(localizedDocPath(locale, parseDocumentPath(unitPath).koDocPath))}>{copy.currentUnitDocument}</button>
      <button onClick={() => navigate(localizedDocPath(locale, '/docs/roadmap.md'))}>{copy.roadmap}</button>
      <button onClick={() => navigate(localizedDocPath(locale, '/docs/learning-workspace.md'))}>{copy.usageAndStorage}</button>
    </nav>
    <article ref={article} aria-busy={!current}>
      {!current ? <p role="status">{locale === 'en' ? 'Loading document…' : '문서 불러오는 중…'}</p>
        : current.error === 'failed' ? <p role="alert">{locale === 'en' ? 'Could not load the document. Close and reopen it to retry.' : '문서를 불러오지 못했습니다. 닫았다가 다시 열어 주세요.'}</p>
        : <MarkdownView locale={locale} text={current.error === 'missing' ? copy.documentNotFound : current.text}
          documentPath={path} onDocument={navigate} />}
    </article>
  </dialog>
}
