// Exporting and Source Data
// Experiment: Input JSON: valid coordinates → a string in x
// Invalid data is rejected, and the existing scene is preserved
// PNG output is generated as a preview, and JSON is imported through an input field. File downloads may require an external environment depending on iframe policy.
/** @param {any} context */
export function mount(context) {
  const { container, THREE, OrbitControls, PIXI, locale = 'ko' } = context
  const messages =
    locale === 'en'
      ? {
          display001: 'Exporting and Source Data',
          display002: 'Input JSON: valid coordinates ↔ a string in x',
          display003: 'Import JSON',
          display004: 'Valid scene imported',
          display005: 'PNG preview',
        }
      : {
          display001: '내보내기와 원본 데이터',
          display002: '입력 JSON: 유효 좌표 ↔ x에 문자열',
          display003: 'Import JSON',
          display004: 'Valid scene imported',
          display005: 'PNG preview',
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
  let objects = [
    { x: 100, y: 130 },
    { x: 280, y: 130 },
  ]
  const input = document.createElement('textarea')
  input.value = JSON.stringify(objects)
  ui.append(input)
  button(messages.display003, () => {
    try {
      const data = JSON.parse(input.value)
      if (
        !Array.isArray(data) ||
        !data.every((s) => Number.isFinite(s.x) && Number.isFinite(s.y))
      )
        throw Error('Coordinates must be finite numbers')
      objects = data
      draw()
      status.textContent = messages.display004
    } catch (e) {
      status.textContent = String(e)
    }
  })
  button(messages.display005, () =>
    canvas.toBlob((blob) => {
      if (!blob || closed) return
      const url = URL.createObjectURL(blob)
      const img = document.createElement('img')
      img.src = url
      img.width = 160
      ui.append(img)
      disposers.push(() => URL.revokeObjectURL(url))
    }),
  )
  function draw() {
    clear()
    objects.forEach((s) => circle(s.x, s.y, 25))
    input.value = JSON.stringify(changed ? [{ x: 'invalid', y: 130 }] : objects)
  }
  draw()
  return () => {
    closed = true
    cancelAnimationFrame(frame)
    disposers.reverse().forEach((fn) => fn())
    ui.remove()
  }
}
