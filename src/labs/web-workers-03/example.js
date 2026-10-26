export function mount({ locale = 'ko', container }) {
  const messages =
    locale === 'en'
      ? {
          display001:
            '<h3>Bounded worker queue</h3><label>Workers <input data-pool type="number" min="1" max="4" value="2"></label> <label>Jobs <input data-jobs type="number" min="1" max="24" value="8"></label> <button data-run="workers">Worker pool</button> <button data-run="main">Main thread</button> <button data-run="stop">Stop</button><label>Type while running <input data-probe></label><pre aria-live="polite"></pre><p>Same deterministic CPU kernel in both modes. End-to-end includes worker startup and messages. The heartbeat gap measures event-loop responsiveness, not hardware input latency.</p>',
          display002: 'Stopped: no active workers or queued main-thread jobs.',
          display003: ': ',
          display004: '/',
          display005: ' completed; at most ',
          display006: ' in flight\nElapsed ',
          display007: ' ms; heartbeat max gap ',
          display008: ' ms\nResult checksum ',
          display009: '\nFinal end-to-end ',
          display010: ' ms; observed heartbeat gap ',
          display011: ' ms.\nAll jobs finished; pool terminated.',
          display012: 'Worker failed: ',
          display013:
            'Choose a mode. Compare the same job count and type into the input.',
          displayFix1001: ' input events; event-loop max gap ',
          displayFix1002: ' ms',
        }
      : {
          display001:
            '<h3>Bounded worker queue</h3><label>Workers <input data-pool type="number" min="1" max="4" value="2"></label> <label>Jobs <input data-jobs type="number" min="1" max="24" value="8"></label> <button data-run="workers">Worker pool</button> <button data-run="main">Main thread</button> <button data-run="stop">Stop</button><label>Type while running <input data-probe></label><pre aria-live="polite"></pre><p>Same deterministic CPU kernel in both modes. End-to-end includes worker startup and messages. The heartbeat gap measures event-loop responsiveness, not hardware input latency.</p>',
          display002: 'Stopped: no active workers or queued main-thread jobs.',
          display003: ': ',
          display004: '/',
          display005: ' completed; at most ',
          display006: ' in flight\nElapsed ',
          display007: ' ms; heartbeat max gap ',
          display008: ' ms\nResult checksum ',
          display009: '\nFinal end-to-end ',
          display010: ' ms; observed heartbeat gap ',
          display011: ' ms.\nAll jobs finished; pool terminated.',
          display012: 'Worker failed: ',
          display013:
            'Choose a mode. Compare the same job count and type into the input.',
          displayFix1001: ' input events; event-loop max gap ',
          displayFix1002: ' ms',
        }
  const root = document.createElement('section')
  root.style.cssText = 'padding:16px'
  container.append(root)
  root.innerHTML =
    '<h3>Bounded worker queue</h3><label>Workers <input data-pool type="number" min="1" max="4" value="2"></label> <label>Jobs <input data-jobs type="number" min="1" max="24" value="8"></label> <button data-run="workers">Worker pool</button> <button data-run="main">Main thread</button> <button data-run="stop">Stop</button><label>Type while running <input data-probe></label><pre aria-live="polite"></pre><p>Same deterministic CPU kernel in both modes. End-to-end includes worker startup and messages. The heartbeat gap measures event-loop responsiveness, not hardware input latency.</p>'
  const output = root.querySelector('pre')
  const poolInput = /** @type {HTMLInputElement} */ (
      root.querySelector('input[data-pool]')
    ),
    jobsInput = /** @type {HTMLInputElement} */ (
      root.querySelector('input[data-jobs]')
    ),
    probe = /** @type {HTMLInputElement} */ (
      root.querySelector('input[data-probe]')
    )
  // Keep work bounded, but substantial enough to compare UI responsiveness.
  const kernel = (seed) => {
    let sum = 0
    for (let i = 0; i < 1500000; i++) sum += Math.sqrt((i + seed) % 1000)
    return sum
  }
  let workers = [],
    url = '',
    generation = 0,
    timer = 0,
    maxGap = 0,
    last = performance.now(),
    count = 0
  const stop = () => {
    generation++
    workers.forEach((w) => w.terminate())
    workers = []
    if (url) URL.revokeObjectURL(url)
    url = ''
    clearTimeout(timer)
  }
  const heartbeat = setInterval(() => {
    const now = performance.now()
    maxGap = Math.max(maxGap, now - last)
    last = now
  }, 30)
  probe.oninput = () => {
    count++
    probe.title = `${count} input events; event-loop max gap ${maxGap.toFixed(1)} ms`
  }
  const run = (mode) => {
    stop()
    if (mode === 'stop') {
      output.textContent =
        'Stopped: no active workers or queued main-thread jobs.'
      return
    }
    const token = generation,
      n = Math.max(1, Math.min(24, Math.trunc(Number(jobsInput.value) || 8))),
      size = Math.max(1, Math.min(4, Math.trunc(Number(poolInput.value) || 2)))
    let next = 0,
      done = 0,
      completedMs = 0
    const start = performance.now()
    maxGap = 0
    last = start
    const results = []
    const report = () => {
      output.textContent = `${mode}: ${done}/${n} completed; at most ${mode === 'main' ? 1 : size} in flight\nElapsed ${(performance.now() - start).toFixed(1)} ms; heartbeat max gap ${maxGap.toFixed(1)} ms\nResult checksum ${results.reduce((a, b) => a + b, 0).toFixed(3)}`
      if (done === n) {
        completedMs = performance.now() - start
        timer = setTimeout(() => {
          reportFinal()
          stop()
        }, 35)
      }
    }
    const reportFinal = () => {
      output.textContent += `\nFinal end-to-end ${completedMs.toFixed(1)} ms; observed heartbeat gap ${maxGap.toFixed(1)} ms.\nAll jobs finished; pool terminated.`
    }
    if (mode === 'main') {
      const step = () => {
        if (token !== generation) return
        results.push(kernel(next++))
        done++
        report()
        if (done < n) timer = setTimeout(step, 0)
      }
      timer = setTimeout(step, 0)
    } else {
      try {
        url = URL.createObjectURL(
          new Blob(
            [
              `const kernel=${kernel.toString()};onmessage=e=>postMessage({id:e.data,value:kernel(e.data)})`,
            ],
            { type: 'text/javascript' },
          ),
        )
        for (let i = 0; i < Math.min(size, n); i++) {
          const w = new Worker(url)
          workers.push(w)
          w.onerror = (e) => {
            stop()
            output.textContent = 'Worker failed: ' + e.message
          }
          w.onmessage = (e) => {
            if (token !== generation) return
            results[e.data.id] = e.data.value
            done++
            report()
            if (next < n) w.postMessage(next++)
          }
          w.postMessage(next++)
        }
      } catch (error) {
        stop()
        output.textContent = String(error)
      }
    }
  }
  root
    .querySelectorAll('button')
    .forEach((button) => (button.onclick = () => run(button.dataset.run)))
  output.textContent =
    'Choose a mode. Compare the same job count and type into the input.'
  return () => {
    stop()
    clearInterval(heartbeat)
    root.remove()
  }
}
