// 텍스트와 스타일 갱신
// 실험: 갱신 주기: 매 프레임 → 값 변경 시
// 불필요한 텍스트 갱신 요청이 줄어듭니다
// 독립 실행 예제: 코드를 수정하고 다시 실행해 결과를 비교하세요.
/** @param {any} context */
export async function mount(context) {
  const { container, THREE, OrbitControls, PIXI, locale = 'ko' } = context
  const messages =
    locale === 'en'
      ? {
          display001: 'Text and Style Updates',
          display002: 'Update frequency: Every frame ↔ When the value changes',
          display003: 'Text assignments ',
          display004: '; only ',
          display005: ' value changes',
        }
      : {
          display001: '텍스트와 스타일 갱신',
          display002: '갱신 주기: 매 프레임 ↔ 값 변경 시',
          display003: 'Text assignments ',
          display004: '; only ',
          display005: ' value changes',
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
  const app = new PIXI.Application()
  await app.init({
    preference: 'webgl',
    width: 400,
    height: 260,
    resolution: 1,
    autoDensity: true,
    background: '#edf2f7',
  })
  app.canvas.style.cssText = 'display:block;max-width:100%;touch-action:none'
  ui.append(app.canvas)
  const source = document.createElement('canvas')
  source.width = source.height = 64
  const sourceContext = source.getContext('2d')
  ;['#2563eb', '#f97316', '#fbbf24', '#22c55e'].forEach((color, i) => {
    sourceContext.fillStyle = color
    sourceContext.fillRect((i % 2) * 32, Math.floor(i / 2) * 32, 32, 32)
    sourceContext.fillStyle = '#fff'
    sourceContext.font = '18px sans-serif'
    sourceContext.fillText(
      String(i + 1),
      (i % 2) * 32 + 10,
      Math.floor(i / 2) * 32 + 24,
    )
  })
  const texture = PIXI.Texture.from(source)
  let tick = (_dt, _ticker) => {}
  const ownedTickerUpdate = (ticker) =>
    tick(Math.min(ticker.deltaMS / 1000, 0.1), ticker)
  app.ticker.add(ownedTickerUpdate)
  disposers.push(() => {
    app.ticker.remove(ownedTickerUpdate)
    app.destroy(true, { children: true })
    texture.destroy(true)
  })
  const text = new PIXI.Text({
    text: 'Score: 0',
    style: { fontFamily: 'system-ui', fontSize: 32, fill: 0x2563eb },
  })
  text.position.set(90, 100)
  app.stage.addChild(text)
  let time = 0,
    previous = -1,
    writes = 0
  tick = (dt) => {
    time += dt
    const score = Math.floor(time)
    if (!changed || score !== previous) {
      text.text = 'Score: ' + score
      previous = score
      writes++
    }
    status.textContent =
      messages.display003 +
      writes +
      messages.display004 +
      score +
      messages.display005
  }
  function draw() {}
  draw()
  return () => {
    closed = true
    cancelAnimationFrame(frame)
    disposers.reverse().forEach((fn) => fn())
    ui.remove()
  }
}
