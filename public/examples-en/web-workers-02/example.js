export function mount({ locale = 'ko', container }) {
  const messages =
    locale === 'en'
      ? {
          display001:
            '<h3>Copy, transfer, cancel</h3><label>Float32 elements <input type="number" min="1" max="4000000" value="500000"></label> <button data-mode="copy">Copy</button> <button data-mode="transfer">Transfer</button> <button data-mode="error">Error path</button> <button data-mode="cancel">Cancel</button><pre aria-live="polite"></pre><p>Start another request immediately to ignore an older reply. Cancel terminates the worker and creates a fresh one on the next request. Input buffers are allocated anew.</p>',
          display002:
            'Canceled. Worker terminated; UI ready for a new request.',
          display003: 'Worker error: ',
          display004: 'Error: ',
          display005: 'PASS',
          display006: 'FAIL',
          display007: 'sum=',
          display008: '; expected=',
          display009: '; ',
          display010: 'Request ',
          display011: ', ',
          display012: '\npostMessage synchronous cost: ',
          display013: ' ms\nSender byteLength before=',
          display014: ', after=',
          display015:
            '\nWaiting… (Copy retains sender data; transfer detaches it.)',
          display016: 'Could not start worker: ',
        }
      : {
          display001:
            '<h3>Copy, transfer, cancel</h3><label>Float32 elements <input type="number" min="1" max="4000000" value="500000"></label> <button data-mode="copy">Copy</button> <button data-mode="transfer">Transfer</button> <button data-mode="error">Error path</button> <button data-mode="cancel">Cancel</button><pre aria-live="polite"></pre><p>Start another request immediately to ignore an older reply. Cancel terminates the worker and creates a fresh one on the next request. Input buffers are allocated anew.</p>',
          display002:
            'Canceled. Worker terminated; UI ready for a new request.',
          display003: 'Worker error: ',
          display004: 'Error: ',
          display005: 'PASS',
          display006: 'FAIL',
          display007: 'sum=',
          display008: '; expected=',
          display009: '; ',
          display010: 'Request ',
          display011: ', ',
          display012: '\npostMessage synchronous cost: ',
          display013: ' ms\nSender byteLength before=',
          display014: ', after=',
          display015:
            '\nWaiting… (Copy retains sender data; transfer detaches it.)',
          display016: 'Could not start worker: ',
        }
  const root = document.createElement('section')
  root.style.cssText = 'padding:16px'
  container.append(root)
  root.innerHTML =
    '<h3>Copy, transfer, cancel</h3><label>Float32 elements <input type="number" min="1" max="4000000" value="500000"></label> <button data-mode="copy">Copy</button> <button data-mode="transfer">Transfer</button> <button data-mode="error">Error path</button> <button data-mode="cancel">Cancel</button><pre aria-live="polite"></pre><p>Start another request immediately to ignore an older reply. Cancel terminates the worker and creates a fresh one on the next request. Input buffers are allocated anew.</p>'
  const output = root.querySelector('pre'),
    input = root.querySelector('input')
  let worker = null,
    url = '',
    requestId = 0,
    alive = true
  const source = `onmessage=({data})=>{try {if(data.fail)throw Error('Intentional worker failure');const values=new Float32Array(data.buffer);let sum=0;for(let round=0;round<12;round++){sum=0;for(let i=0;i<values.length;i++)sum+=values[i]}postMessage({id:data.id,sum})}catch(error){postMessage({id:data.id,error:error.message})}};`
  const stop = () => {
    requestId++
    worker?.terminate()
    worker = null
    if (url) URL.revokeObjectURL(url)
    url = ''
  }
  const start = (mode) => {
    if (mode === 'cancel') {
      stop()
      output.textContent =
        'Canceled. Worker terminated; UI ready for a new request.'
      return
    }
    try {
      if (!worker) {
        url = URL.createObjectURL(
          new Blob([source], { type: 'text/javascript' }),
        )
        worker = new Worker(url)
        worker.onerror = (event) => {
          output.textContent = 'Worker error: ' + event.message
          stop()
        }
      }
      const id = ++requestId,
        n = Math.max(
          1,
          Math.min(4000000, Math.trunc(Number(input.value) || 500000)),
        )
      input.value = String(n)
      const values = new Float32Array(n).fill(1)
      const before = values.byteLength
      const began = performance.now()
      worker.onmessage = (event) => {
        if (!alive || event.data.id !== requestId) return
        output.textContent +=
          '\n' +
          (event.data.error
            ? 'Error: ' + event.data.error
            : `sum=${event.data.sum}; expected=${n}; ${event.data.sum === n ? 'PASS' : 'FAIL'}`) +
          '\nEnd-to-end ' +
          (performance.now() - began).toFixed(2) +
          ' ms (queue, compute, messaging included)'
      }
      const postStart = performance.now()
      worker.postMessage(
        { id, buffer: values.buffer, fail: mode === 'error' },
        mode === 'transfer' ? [values.buffer] : [],
      )
      output.textContent = `Request ${id}, ${mode}\npostMessage synchronous cost: ${(performance.now() - postStart).toFixed(3)} ms\nSender byteLength before=${before}, after=${values.byteLength}\nWaiting… (Copy retains sender data; transfer detaches it.)`
    } catch (error) {
      stop()
      output.textContent = 'Could not start worker: ' + error
    }
  }
  root
    .querySelectorAll('button')
    .forEach((button) => (button.onclick = () => start(button.dataset.mode)))
  start('transfer')
  return () => {
    alive = false
    stop()
    root.remove()
  }
}
