import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'

export async function start(source: string, token: string) {
  let cleanup: (() => void) | undefined
  let closed = false
  let failed = false
  const send = (status: string, message = '') =>
    parent.postMessage({ type: 'study-preview', token, status, message }, '*')
  const report = (error: unknown) => {
    failed = true
    if (!closed) send('error', error instanceof Error ? error.message : String(error))
  }
  const dispose = () => {
    if (closed) return
    closed = true
    try { cleanup?.() } catch { /* Context removal is the final cleanup boundary. */ }
    cleanup = undefined
  }
  addEventListener('message', event => {
    if (event.source === parent && event.data?.type === 'study-dispose' && event.data.token === token) {
      dispose()
      send('disposed')
    }
  })
  addEventListener('pagehide', dispose, { once: true })
  addEventListener('error', event => { event.preventDefault(); report(event.error ?? event.message) })
  addEventListener('unhandledrejection', event => { event.preventDefault(); report(event.reason) })
  const url = URL.createObjectURL(new Blob([source], { type: 'text/javascript' }))
  try {
    const module = await import(/* @vite-ignore */ url)
    if (closed) return
    if (typeof module.mount !== 'function') throw new Error('export function mount(...) 함수를 정의하세요.')
    const result = module.mount({ THREE, OrbitControls, container: document.getElementById('scene-root') })
    if (typeof result !== 'function') throw new Error('mount는 자원을 정리하는 함수를 반환해야 합니다.')
    cleanup = result
    requestAnimationFrame(() => { if (!closed && !failed) send('ready') })
  } catch (error) { report(error) }
  finally { URL.revokeObjectURL(url) }
}
