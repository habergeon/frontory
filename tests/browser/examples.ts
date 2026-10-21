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
type Result = { id: string; ok: boolean; message: string }

async function inspect(id: string): Promise<Result> {
  const source = sources[`../../src/labs/${id}/example.js`]
  if (!source) return { id, ok: false, message: 'source missing' }
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
      resolve({ id, ok, message })
    }
    const receive = (event: MessageEvent) => {
      if (event.source !== frame.contentWindow || event.data?.token !== token || event.data?.type !== 'study-preview') return
      if (event.data.status === 'error') finish(false, event.data.message)
      else if (event.data.status === 'ready' && !cleanupPending) {
        cleanupPending = true
        frame.contentWindow?.postMessage({ type: 'study-dispose', token }, '*')
      } else if (event.data.status === 'disposed') finish(true, 'mount and dispose acknowledged')
    }
    const timeout = window.setTimeout(() => finish(false, 'mount/dispose timeout (15s)'), 15000)
    window.addEventListener('message', receive)
    frame.srcdoc = createPreviewDocument(source, token, runtime)
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
  const records: Result[] = []
  for (let index = 0; index < units.length && !stopped; index += 2) {
    status.textContent = `${records.length}/${units.length} 검사 중: ${units[index].id}`
    const batch = await Promise.all(units.slice(index, index + 2).map(unit => inspect(unit.id)))
    for (const record of batch) {
      records.push(record)
      const row = document.createElement('li')
      row.textContent = `${record.ok ? 'PASS' : 'FAIL'} ${record.id}: ${record.message}`
      results.append(row)
    }
  }
  const failures = records.filter(record => !record.ok)
  status.textContent = `${stopped ? '중단' : '완료'}: ${records.length}개 중 ${records.length - failures.length}개 통과, ${failures.length}개 실패`
  summary.textContent = JSON.stringify({ checked: records.length, failures }, null, 2)
  button.disabled = false; active = false
})
