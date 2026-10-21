import { useEffect, useRef, useState } from 'react'
import runtime from './runtime.generated.js?raw'
import { createPreviewDocument } from './document'

interface Frame { token: string; document: string; code: string; revision: number }
export function Preview({ code, revision, notice }: { code: string; revision: number; notice?: string }) {
  const iframe = useRef<HTMLIFrameElement>(null)
  const active = useRef<Frame | null>(null)
  const [frame, setFrame] = useState<Frame | null>(null)
  const [result, setResult] = useState<{ token: string; status: string; message: string } | null>(null)
  useEffect(() => {
    let cancelled = false
    let fallback: number | undefined
    let disposedListener: ((event: MessageEvent) => void) | undefined
    const clear = () => {
      window.clearTimeout(fallback)
      if (disposedListener) window.removeEventListener('message', disposedListener)
    }
    const replace = () => {
      clear()
      if (cancelled) return
      const token = crypto.randomUUID()
      const next = { token, document: createPreviewDocument(code, token, runtime), code, revision }
      active.current = next
      setFrame(next)
    }
    const timer = window.setTimeout(() => {
      const previous = active.current
      const target = iframe.current?.contentWindow
      if (!previous || !target) { replace(); return }
      // Give the previous example a chance to release its resources before navigation.
      disposedListener = event => {
        if (event.source === target && event.data?.type === 'study-preview' &&
          event.data.token === previous.token && event.data.status === 'disposed') replace()
      }
      window.addEventListener('message', disposedListener)
      fallback = window.setTimeout(replace, 150)
      target.postMessage({ type: 'study-dispose', token: previous.token }, '*')
    }, 0)
    return () => { cancelled = true; window.clearTimeout(timer); clear() }
  }, [code, revision])
  useEffect(() => {
    if (!frame) return
    const element = iframe.current
    const listen = (event: MessageEvent) => {
      if (event.source !== element?.contentWindow || event.data?.type !== 'study-preview' || event.data.token !== frame.token) return
      if (event.data.status === 'ready' || event.data.status === 'error') {
        setResult({ token: frame.token, status: event.data.status, message: String(event.data.message).slice(0, 2000) })
      }
    }
    window.addEventListener('message', listen)
    return () => {
      element?.contentWindow?.postMessage({ type: 'study-dispose', token: frame.token }, '*')
      window.removeEventListener('message', listen)
    }
  }, [frame])
  const pending = !frame || frame.code !== code || frame.revision !== revision
  const current = result?.token === frame?.token ? result : null
  return <div className="preview-content">
    <div className="preview-status" role="status">
      {notice ?? (pending ? '검사된 코드 반영 중…' : current?.status === 'ready' ? '실행 중' : current?.status === 'error' ? '실행 오류' : '장면 준비 중…')}
    </div>
    <div className="canvas-shell">
      {frame && <iframe ref={iframe} title="실습 미리보기" sandbox="allow-scripts" srcDoc={frame.document} />}
    </div>
    {!pending && current?.status === 'error' && <div className="preview-error" role="alert">
      <strong>코드를 확인하세요</strong><pre>{current.message}</pre>
      <p>편집기에서 수정하면 다시 실행됩니다. 필기는 유지됩니다.</p>
    </div>}
    <p className="panel-hint">조작 방법은 예제의 주석을 확인하세요. OrbitControls 장면은 드래그·휠로 조작할 수 있습니다.</p>
  </div>
}
