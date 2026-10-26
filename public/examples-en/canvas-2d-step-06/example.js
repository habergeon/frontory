// Loading and Cropping Images
// Experiment: Source Width: 64 → 32
// The cropped area is magnified twice as much at the same output width
// The browser example decodes a self-generated PNG before cropping it. Check external image URLs and CORS failures in a separate HTTP environment.
/** @param {any} context */
export function mount(context) {
  const { container, THREE, OrbitControls, PIXI, locale = 'ko' } = context
  const messages =
    locale === 'en'
      ? {
          display001: 'Loading and Cropping Images',
          display002: 'Source Width: 64 ↔ 32',
        }
      : { display001: '이미지 로딩과 자르기', display002: '소스 폭: 64 ↔ 32' }
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
  const source = document.createElement('canvas')
  source.width = 128
  source.height = 64
  const s = source.getContext('2d')
  for (let i = 0; i < 8; i++) {
    s.fillStyle = ['#2563eb', '#f97316'][i % 2]
    s.fillRect(i * 16, 0, 16, 64)
    s.fillStyle = '#fff'
    s.fillText(String(i), i * 16 + 3, 32)
  }
  const image = new Image()
  let ready = false
  image.src = source.toDataURL()
  image
    .decode()
    .then(() => {
      if (!closed) {
        ready = true
        draw()
      }
    })
    .catch((e) => (status.textContent = String(e)))
  function draw() {
    clear()
    if (ready) {
      ctx.imageSmoothingEnabled = false
      ctx.drawImage(image, 0, 0, changed ? 32 : 64, 64, 60, 50, 280, 180)
    }
  }
  draw()
  return () => {
    closed = true
    cancelAnimationFrame(frame)
    disposers.reverse().forEach((fn) => fn())
    ui.remove()
  }
}
