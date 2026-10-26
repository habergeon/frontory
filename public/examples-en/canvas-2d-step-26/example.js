// Frame Measurement and Bottlenecks
// Experiment: Particle Count: 500 → 2000
// You can distinguish whether the update or drawing section increases
// Standalone example: edit the code and run it again to compare the results.
/** @param {any} context */
export function mount(context) {
  const { container, THREE, OrbitControls, PIXI, locale = 'ko' } = context
  const messages =
    locale === 'en'
      ? {
          display001: 'Frame Measurement and Bottlenecks',
          display002: 'Particle Count: 500 ↔ 2000',
          display003: 'CPU update ',
          display004: 'ms / draw submission ',
          display005: 'ms; frame median ',
          display006: 'ms / p95 ',
          display007: 'ms (not GPU time)',
        }
      : {
          display001: '프레임 계측과 병목',
          display002: '입자 수: 500 ↔ 2000',
          display003: 'CPU update ',
          display004: 'ms / draw submission ',
          display005: 'ms; frame median ',
          display006: 'ms / p95 ',
          display007: 'ms (not GPU time)',
        }
  const TITLE = messages.display001
  const VARIABLE = messages.display002
  const ui = document.createElement('section')
  ui.style.cssText =
    'font:13px system-ui;color:#16324a;background:#f8fafc;padding:12px;box-sizing:border-box;max-height:100%;overflow:auto'
  container.append(ui)
  const heading = document.createElement('strong')
  heading.textContent = TITLE
  ui.append(heading)
  const status = document.createElement('output')
  status.style.cssText = 'display:block;margin:8px 0;white-space:pre-wrap'
  status.setAttribute('aria-live', 'polite')
  ui.append(status)
  let changed = false,
    closed = false
  const disposers = []
  function on(target, type, fn) {
    target.addEventListener(type, fn)
    disposers.push(() => target.removeEventListener(type, fn))
  }
  function button(text, fn) {
    const b = document.createElement('button')
    b.textContent = text
    b.style.margin = '4px'
    on(b, 'click', fn)
    ui.append(b)
    return b
  }
  const toggle = button(VARIABLE, () => {
    changed = !changed
    toggle.setAttribute('aria-pressed', String(changed))
    draw()
  })
  toggle.setAttribute('aria-pressed', 'false')
  let frame = 0
  function loop(fn) {
    let last = performance.now()
    const tick = (now) => {
      if (closed) return
      const dt = Math.min((now - last) / 1000, 0.1)
      last = now
      fn(dt, now / 1000)
      frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
  }
  const canvas = document.createElement('canvas')
  canvas.width = 400
  canvas.height = 260
  canvas.style.cssText =
    'display:block;max-width:100%;width:400px;height:auto;touch-action:none'
  canvas.setAttribute('aria-label', TITLE)
  ui.append(canvas)
  const ctx = canvas.getContext('2d')
  function clear() {
    ctx.resetTransform()
    ctx.globalAlpha = 1
    ctx.globalCompositeOperation = 'source-over'
    ctx.clearRect(0, 0, 400, 260)
    ctx.fillStyle = '#edf2f7'
    ctx.fillRect(0, 0, 400, 260)
  }
  function circle(x, y, r, color = '#2563eb') {
    ctx.fillStyle = color
    ctx.beginPath()
    ctx.arc(x, y, r, 0, Math.PI * 2)
    ctx.fill()
  }
  function point(e) {
    const r = canvas.getBoundingClientRect()
    return {
      x: ((e.clientX - r.left) * 400) / r.width,
      y: ((e.clientY - r.top) * 260) / r.height,
    }
  }
  const particles = Array.from({ length: 2000 }, (_, i) => ({
    x: (i * 73) % 400,
    y: (i * 37) % 260,
  }))
  const samples = []
  let updateMS = 0,
    drawMS = 0
  function draw() {
    clear()
    for (let i = 0; i < (changed ? 2000 : 500); i++)
      circle(particles[i].x, particles[i].y, 2)
  }
  loop((dt) => {
    const a = performance.now()
    for (let i = 0; i < (changed ? 2000 : 500); i++)
      particles[i].x = (particles[i].x + dt * 30) % 400
    const b = performance.now()
    draw()
    const c = performance.now()
    updateMS = b - a
    drawMS = c - b
    samples.push(dt * 1000)
    if (samples.length > 180) samples.shift()
    const sorted = [...samples].sort((a, b) => a - b)
    status.textContent =
      messages.display003 +
      updateMS.toFixed(2) +
      messages.display004 +
      drawMS.toFixed(2) +
      messages.display005 +
      sorted[Math.floor(sorted.length * 0.5)].toFixed(1) +
      messages.display006 +
      sorted[Math.floor(sorted.length * 0.95)].toFixed(1) +
      messages.display007
  })
  draw()
  return () => {
    closed = true
    cancelAnimationFrame(frame)
    disposers.reverse().forEach((fn) => fn())
    ui.remove()
  }
}
