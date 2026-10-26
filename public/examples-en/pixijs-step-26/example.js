// Profiling and Quality Budgets
// Experiment: resolution: 1 → 2
// More buffer pixels may increase filter or fill workload
// Standalone example: edit the code and run it again to compare the results.
/** @param {any} context */
export async function mount(context) {
  const { container, THREE, OrbitControls, PIXI, locale = 'ko' } = context
  const messages =
    locale === 'en'
      ? {
          display001: 'Profiling and Quality Budgets',
          display002: 'resolution: 1 ↔ 2',
          display003: 'Resolution ',
          display004: '; buffer pixels ',
          display005: '; median interval ',
          display006: 'ms (not GPU time)',
        }
      : {
          display001: '프로파일과 품질 예산',
          display002: 'resolution: 1 ↔ 2',
          display003: 'Resolution ',
          display004: '; buffer pixels ',
          display005: '; median interval ',
          display006: 'ms (not GPU time)',
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
  const group = new PIXI.Container()
  app.stage.addChild(group)
  for (let i = 0; i < 100; i++) {
    const sprite = new PIXI.Sprite(texture)
    sprite.scale.set(0.4)
    sprite.position.set((i % 20) * 20, Math.floor(i / 20) * 45)
    group.addChild(sprite)
  }
  const filter = new PIXI.BlurFilter({ strength: 2, quality: 2 })
  group.filters = [filter]
  disposers.push(() => filter.destroy())
  const samples = []
  tick = (_dt, ticker) => {
    samples.push(ticker.elapsedMS)
    if (samples.length > 120) samples.shift()
    const sorted = [...samples].sort((a, b) => a - b)
    status.textContent =
      messages.display003 +
      app.renderer.resolution +
      messages.display004 +
      app.canvas.width * app.canvas.height +
      messages.display005 +
      sorted[Math.floor(sorted.length / 2)].toFixed(2) +
      messages.display006
  }
  function draw() {
    app.renderer.resize(400, 260, changed ? 2 : 1)
  }
  draw()
  return () => {
    closed = true
    cancelAnimationFrame(frame)
    disposers.reverse().forEach((fn) => fn())
    ui.remove()
  }
}
