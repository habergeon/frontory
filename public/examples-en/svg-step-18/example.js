// Zooming and Panning
// Experiment: Zoom center: Origin → Pointer position
// The node under the pointer stays at the same screen point after zooming
// Standalone example: edit the code and run it again to compare the results.
/** @param {any} context */
export function mount(context) {
  const { container, THREE, OrbitControls, PIXI, locale = 'ko' } = context
  const messages =
    locale === 'en'
      ? {
          display001: 'Zooming and Panning',
          display002: 'Zoom center: Origin ↔ Pointer position',
          display003: 'Reset zoom',
          display004: 'Wheel zoom ',
          display005: '; anchor ',
          display006: 'pointer',
          display007: 'origin',
        }
      : {
          display001: '확대와 이동',
          display002: '확대 중심: 원점 ↔ 포인터 위치',
          display003: 'Reset zoom',
          display004: 'Wheel zoom ',
          display005: '; anchor ',
          display006: 'pointer',
          display007: 'origin',
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
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
  svg.setAttribute('viewBox', '0 0 400 260')
  svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg')
  svg.style.cssText =
    'display:block;width:400px;max-width:100%;background:#edf2f7;touch-action:none'
  ui.append(svg)
  /** @param {string} tag @param {any} attrs @param {any} [parent] @param {string} [text] @returns {any} */
  function el(tag, attrs, parent = svg, text = '') {
    const node = document.createElementNS('http://www.w3.org/2000/svg', tag)
    for (const [key, value] of Object.entries(attrs))
      node.setAttribute(key, String(value))
    if (text) node.textContent = text
    parent.append(node)
    return node
  }
  const group = el('g', {})
  for (let i = 0; i < 20; i++)
    el(
      'circle',
      {
        cx: 30 + (i % 5) * 75,
        cy: 30 + Math.floor(i / 5) * 60,
        r: 14,
        fill: '#2563eb',
      },
      group,
    )
  let scale = 1,
    x = 0,
    y = 0
  on(svg, 'wheel', (e) => {
    e.preventDefault()
    const p = new DOMPoint(e.clientX, e.clientY).matrixTransform(
        svg.getScreenCTM().inverse(),
      ),
      next = Math.max(0.3, Math.min(4, scale * (e.deltaY < 0 ? 1.1 : 0.9)))
    if (changed) {
      x = p.x - ((p.x - x) * next) / scale
      y = p.y - ((p.y - y) * next) / scale
    }
    scale = next
    draw()
  })
  button(messages.display003, () => {
    scale = 1
    x = y = 0
    draw()
  })
  function draw() {
    group.setAttribute(
      'transform',
      'translate(' + x + ' ' + y + ') scale(' + scale + ')',
    )
    status.textContent =
      messages.display004 +
      scale.toFixed(2) +
      messages.display005 +
      (changed ? messages.display006 : messages.display007)
  }
  draw()
  return () => {
    closed = true
    cancelAnimationFrame(frame)
    disposers.reverse().forEach((fn) => fn())
    ui.remove()
  }
}
