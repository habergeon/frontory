// Styles and Themes
// Experiment: Color specification: fill attribute only → Add a CSS fill rule
// The cascade may make the displayed color differ from the attribute string
// Standalone example: edit the code and run it again to compare the results.
/** @param {any} context */
export function mount(context) {
  const { container, THREE, OrbitControls, PIXI, locale = 'ko' } = context
  const messages =
    locale === 'en'
      ? {
          display001: 'Styles and Themes',
          display002:
            'Color specification: fill attribute only ↔ Add a CSS fill rule',
          display003: 'Attribute fill = #7c3aed; CSS rule ',
          display004: 'overrides',
          display005: 'absent',
        }
      : {
          display001: '스타일과 테마',
          display002: '색 지정: fill 속성만 ↔ CSS fill 규칙 추가',
          display003: 'Attribute fill = #7c3aed; CSS rule ',
          display004: 'overrides',
          display005: 'absent',
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
  function draw() {
    svg.replaceChildren()
    svg.style.color = changed ? '#f97316' : '#2563eb'
    el('style', {}, svg, changed ? '.theme-icon { fill: currentColor; }' : '')
    el('path', {
      class: 'theme-icon',
      d: 'M80 200 L200 40 L320 200 Z',
      fill: '#7c3aed',
      stroke: 'currentColor',
      'stroke-width': 8,
    })
    status.textContent =
      messages.display003 +
      (changed ? messages.display004 : messages.display005)
  }
  draw()
  return () => {
    closed = true
    cancelAnimationFrame(frame)
    disposers.reverse().forEach((fn) => fn())
    ui.remove()
  }
}
