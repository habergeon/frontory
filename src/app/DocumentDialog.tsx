import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type RefObject,
} from 'react'
import { MarkdownView } from '../shared/MarkdownView'
import type { Locale } from '../i18n/locale'
import { messages } from '../i18n/messages'
import {
  DocumentNotFoundError,
  loadDocument,
  localizedDocPath,
  parseDocumentPath,
} from './documents'

interface Props {
  path: string
  unitPath: string
  onNavigate: (path: string) => void
  onClose: () => void
  locale?: Locale
  requestedLocale: Locale
  inline?: boolean
  active?: boolean
  readerRef?: RefObject<HTMLElement | null>
  onRestoreFocus?: () => void
}
export function DocumentDialog({
  path: requestedPath,
  unitPath,
  onNavigate,
  onClose,
  locale = 'ko',
  requestedLocale,
  inline = false,
  active = true,
  readerRef,
  onRestoreFocus,
}: Props) {
  const dialog = useRef<HTMLDialogElement>(null)
  const localReader = useRef<HTMLElement>(null)
  const pane = readerRef ?? localReader
  const revealPending = useRef(true)
  const previousFocus = useRef(document.activeElement)
  const article = useRef<HTMLElement>(null)
  const path =
    requestedLocale === locale
      ? requestedPath
      : localizedDocPath(locale, parseDocumentPath(requestedPath).koDocPath)
  const request = parseDocumentPath(path)
  const [content, setContent] = useState<{
    key: string
    text: string
    error?: 'missing' | 'failed'
  } | null>(null)
  const key = request.locale + ':' + request.koDocPath
  const current = content?.key === key ? content : null
  const copy = messages[locale]
  useEffect(() => {
    const element = dialog.current
    if (!inline) element?.showModal()
    return () => {
      // Restore after React removes the modal and its inert background.
      queueMicrotask(() => {
        if (element?.isConnected || pane.current?.isConnected) return
        if (
          previousFocus.current instanceof HTMLElement &&
          previousFocus.current.isConnected
        )
          previousFocus.current.focus()
        else onRestoreFocus?.()
      })
    }
  }, [])
  useLayoutEffect(() => {
    if (!active) revealPending.current = true
    if (!inline || !active || !current || !revealPending.current) return
    revealPending.current = false
    pane.current?.focus({ preventScroll: true })
    pane.current?.scrollIntoView({ block: 'start' })
  }, [inline, active, !!current])
  useEffect(() => {
    let cancelled = false
    loadDocument(request.locale, request.koDocPath).then(
      (text) => {
        if (!cancelled) setContent({ key, text })
      },
      (error) => {
        if (!cancelled)
          setContent({
            key,
            text: '',
            error:
              error instanceof DocumentNotFoundError ? 'missing' : 'failed',
          })
      },
    )
    return () => {
      cancelled = true
    }
  }, [request.locale, request.koDocPath, key])
  const navigate = (next: string) => {
    onNavigate(next)
    article.current?.scrollTo({ top: 0 })
  }
  const contents = (
    <>
      <header className="dialog-header">
        <h2 id="document-title">{copy.learningDocument}</h2>
        <button onClick={onClose} autoFocus={!inline}>
          {copy.close}
        </button>
      </header>
      <nav className="document-nav" aria-label={copy.documentNavigation}>
        <button
          onClick={() =>
            navigate(
              localizedDocPath(locale, parseDocumentPath(unitPath).koDocPath),
            )
          }
        >
          {copy.currentUnitDocument}
        </button>
        <button
          onClick={() => navigate(localizedDocPath(locale, '/docs/roadmap.md'))}
        >
          {copy.roadmap}
        </button>
        <button
          onClick={() =>
            navigate(localizedDocPath(locale, '/docs/learning-workspace.md'))
          }
        >
          {copy.usageAndStorage}
        </button>
      </nav>
      <article ref={article} aria-busy={!current}>
        {!current ? (
          <p role="status">
            {locale === 'en' ? 'Loading document…' : '문서 불러오는 중…'}
          </p>
        ) : current.error === 'failed' ? (
          <p role="alert">
            {locale === 'en'
              ? 'Could not load the document. Close and reopen it to retry.'
              : '문서를 불러오지 못했습니다. 닫았다가 다시 열어 주세요.'}
          </p>
        ) : (
          <MarkdownView
            locale={locale}
            text={
              current.error === 'missing' ? copy.documentNotFound : current.text
            }
            documentPath={path}
            onDocument={navigate}
          />
        )}
      </article>
    </>
  )
  return inline ? (
    <aside
      ref={pane}
      className="document-reader"
      tabIndex={-1}
      aria-labelledby="document-title"
      onKeyDown={(event) => {
        if (event.key === 'Escape') {
          event.preventDefault()
          event.stopPropagation()
          onClose()
        }
      }}
    >
      {contents}
    </aside>
  ) : (
    <dialog
      ref={dialog}
      className="document-dialog"
      onCancel={onClose}
      onClose={onClose}
      aria-labelledby="document-title"
    >
      {contents}
    </dialog>
  )
}
