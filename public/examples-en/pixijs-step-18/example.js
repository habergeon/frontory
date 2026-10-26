// Masks and Scroll Regions
// Experiment: Scroll position: 0 → Halfway through the list
// A different section of the same card data appears inside the mask
// Standalone example: edit the code and run it again to compare the results.
/** @param {any} context */
export async function mount(context) {
  const { container, THREE, OrbitControls, PIXI, locale = 'ko' } = context
  const messages =
    locale === 'en'
      ? {
          display001: 'Masks and Scroll Regions',
          display002: 'Scroll position: 0 ↔ Halfway through the list',
          display003: 'Visible row ',
          display004: 'Scroll offset ',
          display005: '; input restricted to viewport',
        }
      : {
          display001: '마스크와 스크롤 영역',
          display002: '스크롤 위치: 0 ↔ 목록 절반',
          display003: 'Visible row ',
          display004: 'Scroll offset ',
          display005: '; input restricted to viewport',
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
  const list = new PIXI.Container()
  list.position.set(90, 40)
  app.stage.addChild(list)
  for (let i = 0; i < 10; i++) {
    const card = new PIXI.Graphics()
      .roundRect(0, i * 55, 220, 45, 8)
      .fill(i % 2 ? 0xf97316 : 0x2563eb)
    list.addChild(card)
  }
  const mask = new PIXI.Graphics().rect(90, 40, 220, 180).fill(0xffffff)
  app.stage.addChild(mask)
  list.mask = mask
  app.stage.eventMode = 'static'
  app.stage.hitArea = new PIXI.Rectangle(90, 40, 220, 180)
  app.stage.on('pointerdown', (e) => {
    if (
      e.global.x < 90 ||
      e.global.x > 310 ||
      e.global.y < 40 ||
      e.global.y > 220
    )
      return
    status.textContent =
      messages.display003 + Math.floor((e.global.y - list.y) / 55)
  })
  function draw() {
    list.y = 40 - (changed ? 275 : 0)
    status.textContent =
      messages.display004 + (changed ? 275 : 0) + messages.display005
  }
  draw()
  return () => {
    closed = true
    cancelAnimationFrame(frame)
    disposers.reverse().forEach((fn) => fn())
    ui.remove()
  }
}
