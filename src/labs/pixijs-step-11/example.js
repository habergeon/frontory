// 아틀라스와 프레임
// 실험: 프레임: 첫 영역 → 두 번째 영역
// 원본 소스는 공유하면서 표시되는 부분만 바뀝니다
// 독립 실행 예제: 코드를 수정하고 다시 실행해 결과를 비교하세요.
/** @param {any} context */
export async function mount(context) {
  const { container, THREE, OrbitControls, PIXI, locale = 'ko' } = context
  const messages =
    locale === 'en'
      ? {
          display001: 'Atlases and Frames',
          display002: 'Frame: First region ↔ Second region',
          display003: 'Two frame Textures, one TextureSource; frame x=',
        }
      : {
          display001: '아틀라스와 프레임',
          display002: '프레임: 첫 영역 ↔ 두 번째 영역',
          display003: 'Two frame Textures, one TextureSource; frame x=',
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
  const frames = [0, 1].map(
    (i) =>
      new PIXI.Texture({
        source: texture.source,
        frame: new PIXI.Rectangle(i * 32, 0, 32, 64),
      }),
  )
  disposers.push(() => frames.forEach((f) => f.destroy(false)))
  const sprite = new PIXI.Sprite(frames[0])
  sprite.position.set(140, 60)
  sprite.scale.set(3)
  app.stage.addChild(sprite)
  function draw() {
    sprite.texture = frames[changed ? 1 : 0]
    status.textContent = messages.display003 + sprite.texture.frame.x
  }
  draw()
  return () => {
    closed = true
    cancelAnimationFrame(frame)
    disposers.reverse().forEach((fn) => fn())
    ui.remove()
  }
}
