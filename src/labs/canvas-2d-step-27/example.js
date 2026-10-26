// 통합 편집기와 회귀 점검
// 실험: 재초기화 횟수: 1회 → 5회
// 정리가 맞으면 입력당 명령 실행 횟수가 늘지 않습니다
// 명령 재생·취소·JSON 상태를 검증하는 축소 편집기입니다. 전체 캡스톤의 모든 도구를 대체하지 않습니다.
/** @param {any} context */
export function mount(context) {
  const { container, THREE, OrbitControls, PIXI, locale = 'ko' } = context
  const messages =
    locale === 'en'
      ? {
          display001: 'Integrated Editor and Regression Checks',
          display002: 'Reinitialization Count: 1 time ↔ 5 times',
          display003: 'Move A',
          display004: 'Undo',
          display005: 'Replay / reinitialize',
          display006: 'JSON',
          display007: 'Command count: ',
          display008: '; A.x=',
          display009: '; replay expected 100',
        }
      : {
          display001: '통합 편집기와 회귀 점검',
          display002: '재초기화 횟수: 1회 ↔ 5회',
          display003: 'Move A',
          display004: 'Undo',
          display005: 'Replay / reinitialize',
          display006: 'JSON',
          display007: 'Command count: ',
          display008: '; A.x=',
          display009: '; replay expected 100',
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
  let scene = [
      { id: 'a', x: 80, y: 120 },
      { id: 'b', x: 240, y: 120 },
    ],
    history = [],
    commands = 0
  function move() {
    history.push(structuredClone(scene))
    scene[0].x += 20
    commands++
    draw()
  }
  button(messages.display003, move)
  button(messages.display004, () => {
    if (history.length) scene = history.pop()
    draw()
  })
  button(messages.display005, () => {
    for (let i = 0; i < (changed ? 5 : 1); i++) {
      scene = [
        { id: 'a', x: 80, y: 120 },
        { id: 'b', x: 240, y: 120 },
      ]
      history = []
    }
    commands = 0
    move()
  })
  button(
    messages.display006,
    () => (status.textContent = JSON.stringify(scene)),
  )
  function draw() {
    clear()
    for (const p of scene) circle(p.x, p.y, 25)
    status.textContent =
      messages.display007 +
      commands +
      messages.display008 +
      scene[0].x +
      messages.display009
  }
  draw()
  return () => {
    closed = true
    cancelAnimationFrame(frame)
    disposers.reverse().forEach((fn) => fn())
    ui.remove()
  }
}
