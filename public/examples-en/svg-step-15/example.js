// Accessible Names and Descriptions
// Experiment: Graphic role: Informational, with a name → Decorative aria-hidden
// Decoration is excluded from navigation while the informational name remains
// Standalone example: edit the code and run it again to compare the results.
/** @param {any} context */
export function mount(context) {
  const { container, THREE, OrbitControls, PIXI, locale = 'ko' } = context
  const messages =
    locale === 'en'
      ? {
          display001: 'Accessible Names and Descriptions',
          display002:
            'Graphic role: Informational, with a name ↔ Decorative aria-hidden',
          display003: 'Study progress',
          display004: 'Three out of four units completed.',
          display005: 'Decorative SVG excluded from accessibility tree',
          display006: 'Named image: Study progress; 3 of 4',
        }
      : {
          display001: '접근 가능한 이름과 설명',
          display002: '그림 역할: 정보용 이름 있음 ↔ 장식용 aria-hidden',
          display003: 'Study progress',
          display004: 'Three out of four units completed.',
          display005: 'Decorative SVG excluded from accessibility tree',
          display006: 'Named image: Study progress; 3 of 4',
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
    svg.setAttribute('role', 'img')
    svg.setAttribute(
      'aria-labelledby',
      'accessible-title accessible-description',
    )
    if (changed) svg.setAttribute('aria-hidden', 'true')
    else svg.removeAttribute('aria-hidden')
    el('title', { id: 'accessible-title' }, svg, messages.display003)
    el('desc', { id: 'accessible-description' }, svg, messages.display004)
    ;[0, 1, 2, 3].forEach((i) =>
      el('rect', {
        x: 30 + i * 90,
        y: 90,
        width: 70,
        height: 80,
        fill: i < 3 ? '#2563eb' : '#cbd5e1',
      }),
    )
    status.textContent = changed ? messages.display005 : messages.display006
  }
  draw()
  return () => {
    closed = true
    cancelAnimationFrame(frame)
    disposers.reverse().forEach((fn) => fn())
    ui.remove()
  }
}
