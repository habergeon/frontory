import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import type { Locale } from '../i18n/locale'
import { messages } from '../i18n/messages'
import { loadRuntime } from './loadRuntime'
import { createPreviewDocument } from './document'
import { createHtmlPreviewDocument } from './html-document'
import type { PreviewInput } from './types'
import { ConsoleOutput, type ConsoleItem } from './ConsoleOutput'

interface Frame {
  token: string
  document: string
  input: PreviewInput
  revision: number
  locale: Locale
}
export function Preview({
  input,
  revision,
  notice,
  locale,
}: {
  input: PreviewInput
  revision: number
  notice?: string
  locale: Locale
}) {
  const { code, kind, profile } = input
  const text = messages[locale]
  const [webgl2] = useState(() => {
    const context = document.createElement('canvas').getContext('webgl2')
    context?.getExtension('WEBGL_lose_context')?.loseContext()
    return !!context
  })
  const blocked = kind === 'html' && profile === 'threejs' && !webgl2
  const [consoleItems, setConsoleItems] = useState<ConsoleItem[]>([])
  const latestLocale = useRef(locale)
  useLayoutEffect(() => {
    latestLocale.current = locale
  }, [locale])
  const iframe = useRef<HTMLIFrameElement>(null)
  const active = useRef<Frame | null>(null)
  const [frame, setFrame] = useState<Frame | null>(null)
  const [retry, setRetry] = useState(0)
  const [loadFailed, setLoadFailed] = useState(false)
  const [result, setResult] = useState<{
    token: string
    status: string
    message: string
    line?: number
    column?: number
  } | null>(null)
  useEffect(() => {
    if (blocked) return
    let cancelled = false
    let fallback: number | undefined
    let disposedListener: ((event: MessageEvent) => void) | undefined
    const clear = () => {
      window.clearTimeout(fallback)
      if (disposedListener)
        window.removeEventListener('message', disposedListener)
    }
    let runtime: Awaited<ReturnType<typeof loadRuntime>>
    const replace = () => {
      clear()
      if (cancelled) return
      const token = crypto.randomUUID()
      const locale = latestLocale.current
      const next = {
        token,
        document:
          kind === 'html'
            ? createHtmlPreviewDocument(code, token, locale, runtime.modules)
            : createPreviewDocument(code, token, runtime.legacy!, locale),
        input: { code, kind, profile },
        revision,
        locale,
      }
      active.current = next
      setConsoleItems([])
      setFrame(next)
    }
    const timer = window.setTimeout(async () => {
      setLoadFailed(false)
      try {
        runtime = await loadRuntime(
          kind === 'html'
            ? profile === 'threejs'
              ? 'threejs'
              : 'html'
            : 'legacy',
        )
      } catch {
        if (!cancelled) setLoadFailed(true)
        return
      }
      if (cancelled) return
      const previous = active.current
      const target = iframe.current?.contentWindow
      if (!previous || !target) {
        replace()
        return
      }
      // Give the previous example a chance to release its resources before navigation.
      disposedListener = (event) => {
        if (
          event.source === target &&
          event.data?.type === 'study-preview' &&
          event.data.token === previous.token &&
          event.data.status === 'disposed'
        )
          replace()
      }
      window.addEventListener('message', disposedListener)
      fallback = window.setTimeout(replace, 150)
      target.postMessage({ type: 'study-dispose', token: previous.token }, '*')
    }, 0)
    return () => {
      cancelled = true
      window.clearTimeout(timer)
      clear()
    }
  }, [code, kind, profile, revision, blocked, retry])
  useLayoutEffect(() => {
    if (!frame) return
    const element = iframe.current
    const listen = (event: MessageEvent) => {
      if (
        event.source !== element?.contentWindow ||
        event.data?.type !== 'study-preview' ||
        event.data.token !== frame.token
      )
        return
      const data = event.data
      if (typeof data.message !== 'string' || data.message.length > 4000) return
      if (data.status === 'console') {
        if (!['log', 'info', 'warn', 'error', 'debug'].includes(data.level))
          return
        setConsoleItems((items) =>
          [...items, { level: data.level, message: data.message }].slice(-200),
        )
      } else if (data.status === 'ready' || data.status === 'error') {
        if (
          (data.line !== undefined &&
            (!Number.isSafeInteger(data.line) || data.line < 1)) ||
          (data.column !== undefined &&
            (!Number.isSafeInteger(data.column) || data.column < 1))
        )
          return
        setResult({
          token: frame.token,
          status: data.status,
          message: data.message,
          ...(data.line !== undefined && data.column !== undefined
            ? { line: data.line, column: data.column }
            : {}),
        })
      }
    }
    window.addEventListener('message', listen)
    return () => {
      element?.contentWindow?.postMessage(
        { type: 'study-dispose', token: frame.token },
        '*',
      )
      window.removeEventListener('message', listen)
    }
  }, [frame])
  const pending =
    !frame ||
    frame.input.code !== code ||
    frame.input.kind !== kind ||
    frame.input.profile !== profile ||
    frame.revision !== revision
  const current = result?.token === frame?.token ? result : null
  return (
    <div className="preview-content">
      <div className="preview-status" role="status">
        {blocked
          ? text.webgl2Unavailable
          : loadFailed
            ? locale === 'ko'
              ? '미리보기에 필요한 파일을 불러오지 못했습니다.'
              : 'Could not load the files needed for the preview.'
            : (notice ??
              (pending
                ? text.applyingCode
                : current?.status === 'ready'
                  ? text.running
                  : current?.status === 'error'
                    ? text.runtimeError
                    : text.preparingScene))}
      </div>
      {loadFailed && !blocked && (
        <button type="button" onClick={() => setRetry((value) => value + 1)}>
          {locale === 'ko' ? '미리보기 다시 시도' : 'Retry preview'}
        </button>
      )}
      <div className="canvas-shell">
        {frame && !blocked && (
          <iframe
            key={frame.token}
            ref={iframe}
            title={text.practicePreview}
            sandbox="allow-scripts"
            srcDoc={frame.document}
          />
        )}
      </div>
      {!pending && current?.status === 'error' && (
        <div className="preview-error" role="alert">
          <strong>{text.checkCode}</strong>
          <pre>
            {current.line !== undefined
              ? `${current.line}:${current.column} `
              : ''}
            {current.message}
          </pre>
          <p>{text.previewErrorHint}</p>
        </div>
      )}
      <ConsoleOutput items={consoleItems} locale={locale} />
      {frame && frame.locale !== locale && (
        <p className="panel-hint preview-locale-notice">{text.nextRunLocale}</p>
      )}
      <p className="panel-hint">{text.controlsHint}</p>
    </div>
  )
}
