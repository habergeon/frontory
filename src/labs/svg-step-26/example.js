// 지도 편집기 통합
// 실험: 가져오기 데이터: 정상 그래프 → 중복 id
// 새 데이터 적용을 거부하고 편집 상태를 유지합니다
// 중복 id 검증·키보드 선택·이동·직렬화 실험입니다. 자유 드래그는 17일 예제에서 결합할 수 있습니다.
/** @param {any} context */
export function mount(context) {
  const { container, THREE, OrbitControls, PIXI, locale = 'ko' } = context
  const messages =
    locale === 'en'
      ? {
          display001: 'Integrating the Map Editor',
          display002: 'Imported data: Valid graph ↔ Duplicate id',
          display003: 'Import',
          display004: 'Move selected',
          display005: 'SVG source',
          display006: 'Select ',
          display007: 'Selected ',
        }
      : {
          display001: '지도 편집기 통합',
          display002: '가져오기 데이터: 정상 그래프 ↔ 중복 id',
          display003: 'Import',
          display004: 'Move selected',
          display005: 'SVG source',
          display006: 'Select ',
          display007: 'Selected ',
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
  let data = [
      { id: 'a', x: 100, y: 130 },
      { id: 'b', x: 300, y: 130 },
    ],
    selected = 'a'
  const input = document.createElement('textarea')
  ui.append(input)
  button(messages.display003, () => {
    try {
      const next = JSON.parse(input.value)
      if (
        !Array.isArray(next) ||
        new Set(next.map((n) => n.id)).size !== next.length ||
        !next.every(
          (n) =>
            typeof n.id === 'string' &&
            Number.isFinite(n.x) &&
            Number.isFinite(n.y),
        )
      )
        throw Error('Unique IDs and finite coordinates required')
      data = next
      draw()
    } catch (e) {
      status.textContent = String(e)
    }
  })
  button(messages.display004, () => {
    const node = data.find((n) => n.id === selected)
    if (node) node.x += 10
    draw()
  })
  button(
    messages.display005,
    () => (input.value = new XMLSerializer().serializeToString(svg)),
  )
  function draw() {
    svg.replaceChildren()
    data.forEach((n) => {
      const c = el('circle', {
        cx: n.x,
        cy: n.y,
        r: 28,
        fill: n.id === selected ? '#f97316' : '#2563eb',
        tabindex: 0,
        role: 'button',
        'aria-label': messages.display006 + n.id,
      })
      c.onpointerdown = () => {
        selected = n.id
        draw()
      }
      c.onkeydown = (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          selected = n.id
          draw()
        }
      }
    })
    input.value = JSON.stringify(changed ? [data[0], data[0]] : data)
    status.textContent = messages.display007 + selected
  }
  draw()
  return () => {
    closed = true
    cancelAnimationFrame(frame)
    disposers.reverse().forEach((fn) => fn())
    ui.remove()
  }
}
