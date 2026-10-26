import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import type { Locale } from '../i18n/locale'
import { messages } from '../i18n/messages'
import runtime from './runtime.generated.js?raw'
import { createPreviewDocument } from './document'

interface Frame {
  token: string
  document: string
  code: string
  revision: number
  locale: Locale
}
export function Preview({
  code,
  revision,
  notice,
  locale,
}: {
  code: string
  revision: number
  notice?: string
  locale: Locale
}) {
  const text = messages[locale]
  const latestLocale = useRef(locale)
  useLayoutEffect(() => {
    latestLocale.current = locale
  }, [locale])
  const iframe = useRef<HTMLIFrameElement>(null)
  const active = useRef<Frame | null>(null)
  const [frame, setFrame] = useState<Frame | null>(null)
  const [result, setResult] = useState<{
    token: string
    status: string
    message: string
  } | null>(null)
  useEffect(() => {
    let cancelled = false
    let fallback: number | undefined
    let disposedListener: ((event: MessageEvent) => void) | undefined
    const clear = () => {
      window.clearTimeout(fallback)
      if (disposedListener)
        window.removeEventListener('message', disposedListener)
    }
    const replace = () => {
      clear()
      if (cancelled) return
      const token = crypto.randomUUID()
      const locale = latestLocale.current
      const next = {
        token,
        document: createPreviewDocument(code, token, runtime, locale),
        code,
        revision,
        locale,
      }
      active.current = next
      setFrame(next)
    }
    const timer = window.setTimeout(() => {
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
  }, [code, revision])
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
      if (event.data.status === 'ready' || event.data.status === 'error') {
        setResult({
          token: frame.token,
          status: event.data.status,
          message: String(event.data.message).slice(0, 2000),
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
  const pending = !frame || frame.code !== code || frame.revision !== revision
  const current = result?.token === frame?.token ? result : null
  return (
    <div className="preview-content">
      <div className="preview-status" role="status">
        {notice ??
          (pending
            ? text.applyingCode
            : current?.status === 'ready'
              ? text.running
              : current?.status === 'error'
                ? text.runtimeError
                : text.preparingScene)}
      </div>
      <div className="canvas-shell">
        {frame && (
          <iframe
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
          <pre>{current.message}</pre>
          <p>{text.previewErrorHint}</p>
        </div>
      )}
      {frame && frame.locale !== locale && (
        <p className="panel-hint preview-locale-notice">{text.nextRunLocale}</p>
      )}
      <p className="panel-hint">{text.controlsHint}</p>
    </div>
  )
}
