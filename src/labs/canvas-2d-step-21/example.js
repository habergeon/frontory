// 고해상도와 반응형
// 실험: DPR 상한: 실제 devicePixelRatio가 2 이상인 환경에서 DPR 상한 1 → 2
// 선은 선명해질 수 있지만 처리 픽셀 수가 네 배가 됩니다
// 독립 실행 예제: 코드를 수정하고 다시 실행해 결과를 비교하세요.
/** @param {any} context */
export function mount(context) {
  const { container, THREE, OrbitControls, PIXI, locale = 'ko' } = context
  const messages =
    locale === 'en'
      ? {
          display001: 'High Resolution and Responsive Layout',
          display002:
            'DPR Cap: In an environment where actual devicePixelRatio is at least 2, DPR cap 1 ↔ 2',
          display003: 'DPR ',
          display004: ' buffer pixels',
        }
      : {
          display001: '고해상도와 반응형',
          display002:
            'DPR 상한: 실제 devicePixelRatio가 2 이상인 환경에서 DPR 상한 1 ↔ 2',
          display003: 'DPR ',
          display004: ' buffer pixels',
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
  function draw() {
    const dpr = Math.min(devicePixelRatio, changed ? 2 : 1),
      w = Math.min(400, container.clientWidth - 32)
    canvas.style.width = w + 'px'
    canvas.style.height = '260px'
    canvas.width = Math.max(1, Math.round(w * dpr))
    canvas.height = 260 * dpr
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    ctx.clearRect(0, 0, w, 260)
    ctx.strokeStyle = '#2563eb'
    ctx.lineWidth = 1
    for (let i = 0; i < 12; i++) {
      ctx.beginPath()
      ctx.arc(w / 2, 130, 10 + i * 8, 0, Math.PI * 2)
      ctx.stroke()
    }
    status.textContent =
      messages.display003 +
      dpr +
      '; ' +
      canvas.width * canvas.height +
      messages.display004
  }
  const observer = new ResizeObserver(draw)
  observer.observe(container)
  disposers.push(() => observer.disconnect())
  draw()
  return () => {
    closed = true
    cancelAnimationFrame(frame)
    disposers.reverse().forEach((fn) => fn())
    ui.remove()
  }
}
