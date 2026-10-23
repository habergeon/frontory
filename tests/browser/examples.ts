import { createPreviewDocument } from '../../src/preview/document'
import runtime from '../../src/preview/runtime.generated.js?raw'
import catalog from '../../src/app/catalog.json'

const sources = import.meta.glob<string>('../../src/labs/*/example.js', { eager: true, query: '?raw', import: 'default' })
const status = document.querySelector('#status')!
const results = document.querySelector('#results')!
const summary = document.querySelector('#summary')!
const frames = document.querySelector('#frames')!
const button = document.querySelector<HTMLButtonElement>('#run')!
let stopped = false
let active = false
type Result = { id: string; seriesId: string; locale: 'ko' | 'en'; sourceSha256: string; ok: boolean; message: string; mountStatus: string; disposeStatus: string; executionKind: string; capabilityStatus: string; interactionStatus: string; error: string | null; elapsedMs: number }
const executionKind = (series: string) => ['webassembly', 'playwright'].includes(series) ? 'external-source-preview' : ['webgpu', 'wgsl'].includes(series) ? 'gpu-compute-or-render-preview' : ['webgl', 'threejs', 'react-three-fiber', 'pixijs', 'glsl'].includes(series) ? 'gpu-render-preview' : ['canvas-2d', 'gaussian-splatting', 'offscreen-canvas'].includes(series) ? 'canvas-preview' : 'dom-store-preview'

async function inspect(unit: {id: string; seriesId: string}, locale: 'ko' | 'en'): Promise<Result> {
  const { id, seriesId } = unit
  const started = performance.now()
  let mountStatus = 'not-acknowledged', disposeStatus = 'not-acknowledged'
  const source = sources[`../../src/labs/${id}/example.js`]
  const digest = source ? await crypto.subtle.digest('SHA-256', new TextEncoder().encode(source)) : new ArrayBuffer(0)
  const sourceSha256 = [...new Uint8Array(digest)].map(value => value.toString(16).padStart(2, '0')).join('')
  const record = (ok: boolean, message: string): Result => ({ id, seriesId, locale, sourceSha256, ok, message, mountStatus, disposeStatus, executionKind: executionKind(seriesId), capabilityStatus: 'not-assessed-by-readiness', interactionStatus: 'not-run', error: ok ? null : message, elapsedMs: Math.round(performance.now() - started) })
  if (!source) return record(false, 'source missing')
  const frame = document.createElement('iframe')
  frame.title = id
  frame.setAttribute('sandbox', 'allow-scripts')
  frame.style.cssText = 'width:100%;height:320px;border:1px solid #aaa'
  const token = crypto.randomUUID()
  return new Promise(resolve => {
    let finished = false
    let cleanupPending = false
    const finish = (ok: boolean, message: string) => {
      if (finished) return
      finished = true
      clearTimeout(timeout)
      window.removeEventListener('message', receive)
      frame.remove()
      resolve(record(ok, message))
    }
    const receive = (event: MessageEvent) => {
      if (event.source !== frame.contentWindow || event.data?.token !== token || event.data?.type !== 'study-preview') return
      if (event.data.status === 'error') finish(false, event.data.message)
      else if (event.data.status === 'ready' && !cleanupPending) {
        mountStatus = 'ready-acknowledged'
        cleanupPending = true
        frame.contentWindow?.postMessage({ type: 'study-dispose', token }, '*')
      } else if (event.data.status === 'disposed') { disposeStatus = 'disposed-acknowledged'; finish(true, 'mount-ready / dispose-ack only') }
    }
    const timeout = window.setTimeout(() => finish(false, 'mount/dispose timeout (15s)'), 15000)
    window.addEventListener('message', receive)
    frame.srcdoc = createPreviewDocument(source, token, runtime, locale)
    frames.append(frame)
  })
}

document.querySelector('#stop')!.addEventListener('click', () => { stopped = true })
button.addEventListener('click', async () => {
  if (active) return
  active = true; stopped = false; button.disabled = true
  results.replaceChildren(); summary.textContent = ''
  const filter = document.querySelector<HTMLInputElement>('#filter')!.value.trim()
  const filters = filter.split(',').map(value => value.trim()).filter(Boolean)
  const units = catalog.units.filter(unit => !filters.length || filters.includes(unit.seriesId) || filters.includes(unit.id))
  const cases = units.flatMap(unit => (['ko', 'en'] as const).map(locale => ({ unit, locale })))
  const records: Result[] = []
  for (let index = 0; index < cases.length && !stopped; index += 2) {
    status.textContent = `${records.length}/${cases.length} 검사 중: ${cases[index].unit.id}`
    const batch = await Promise.all(cases.slice(index, index + 2).map(({ unit, locale }) => inspect(unit, locale)))
    for (const record of batch) {
      records.push(record)
      const row = document.createElement('li')
      row.textContent = `${record.ok ? 'PASS' : 'FAIL'} ${record.locale} ${record.id}: ${record.message}`
      results.append(row)
    }
  }
  const failures = records.filter(record => !record.ok)
  status.textContent = `${stopped ? '중단' : '완료'}: ${records.length}개 중 ${records.length - failures.length}개 통과, ${failures.length}개 실패`
  summary.textContent = JSON.stringify({ scope: 'mount-ready / dispose-ack only; no interaction, GPU execution, external runner or leak-free claim', checked: records.length, unique: new Set(records.map(row => row.locale + '/' + row.id)).size, failures, records }, null, 2)
  button.disabled = false; active = false
})
