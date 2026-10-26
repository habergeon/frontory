// Releasing Textures and Owning Caches
// Experiment: User count: 2 screens → 0 screens
// Release the shared atlas only when its last user finishes
// Experiments with the reference lifetimes of directly owned frame Textures and TextureSources. See day 10 for the Assets.unload example.
/** @param {any} context */
export async function mount(context) {
  const { container, THREE, OrbitControls, PIXI, locale = 'ko' } = context
  const messages =
    locale === 'en'
      ? {
          display001: 'Releasing Textures and Owning Caches',
          display002: 'User count: 2 screens ↔ 0 screens',
          display003: 'Release users',
          display004: 'Shared TextureSource retained for ',
          display005: ' user',
          display006:
            'Last user ended: shared source may now be released (owned by mount cleanup)',
          display007:
            'Two frame Textures share one source; source is owned by this lesson',
        }
      : {
          display001: '텍스처 해제와 캐시 소유',
          display002: '사용자 수: 2개 화면 ↔ 0개 화면',
          display003: 'Release users',
          display004: 'Shared TextureSource retained for ',
          display005: ' user',
          display006:
            'Last user ended: shared source may now be released (owned by mount cleanup)',
          display007:
            'Two frame Textures share one source; source is owned by this lesson',
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
  const sharedSource = texture.source
  let users = [100, 250].map((x) => {
    const frame = new PIXI.Texture({
      source: sharedSource,
      frame: new PIXI.Rectangle(0, 0, 64, 64),
    })
    const sprite = new PIXI.Sprite(frame)
    sprite.position.set(x, 100)
    app.stage.addChild(sprite)
    return sprite
  })
  button(messages.display003, () => {
    const count = changed ? users.length : Math.min(1, users.length)
    for (let i = 0; i < count; i++) {
      const sprite = users.pop()
      const frame = sprite.texture
      sprite.destroy()
      frame.destroy(false)
    }
    status.textContent = users.length
      ? messages.display004 + users.length + messages.display005
      : messages.display006
  })
  disposers.push(() => users.forEach((s) => s.texture.destroy(false)))
  function draw() {
    status.textContent = messages.display007
  }
  draw()
  return () => {
    closed = true
    cancelAnimationFrame(frame)
    disposers.reverse().forEach((fn) => fn())
    ui.remove()
  }
}
