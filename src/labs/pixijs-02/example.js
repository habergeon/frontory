// Procedural local atlas: two frames share ONE TextureSource, owned by mount.
export async function mount({ locale = 'ko', PIXI, container }) {
  const messages =
    locale === 'en'
      ? {
          display001:
            '<button>Load invalid atlas</button> <button>Reload valid atlas</button> <button>Remove selected sprite</button><p role="status"></p>',
          display002: 'Parsing local atlas…',
          display003: 'Selected. Remove it: siblings keep their shared atlas.',
          display004: 'Loaded 2 atlas frames, 5 sprites. Click a sprite.',
          display005: 'Atlas failed: ',
          display006: '. Existing sprites retained; retry available.',
          display007: ' sprites still use the shared atlas.',
        }
      : {
          display001:
            '<button>Load invalid atlas</button> <button>Reload valid atlas</button> <button>Remove selected sprite</button><p role="status"></p>',
          display002: 'Parsing local atlas…',
          display003: 'Selected. Remove it: siblings keep their shared atlas.',
          display004: 'Loaded 2 atlas frames, 5 sprites. Click a sprite.',
          display005: 'Atlas failed: ',
          display006: '. Existing sprites retained; retry available.',
          display007: ' sprites still use the shared atlas.',
        }
  const ui = document.createElement('div')
  ui.innerHTML = messages.display001
  container.append(ui)
  const [fail, retry, remove] = ui.querySelectorAll('button'),
    status = ui.querySelector('p')
  const app = new PIXI.Application()
  await app.init({
    preference: 'webgl',
    width: Math.max(1, container.clientWidth),
    height: Math.max(1, container.clientHeight - 80),
    background: '#edf2f7',
  })
  container.append(app.canvas)
  const image = document.createElement('canvas')
  image.width = 128
  image.height = 64
  const ctx = image.getContext('2d')
  ctx.fillStyle = '#3179bf'
  ctx.fillRect(0, 0, 64, 64)
  ctx.fillStyle = '#e97645'
  ctx.beginPath()
  ctx.arc(96, 32, 30, 0, Math.PI * 2)
  ctx.fill()
  const base = PIXI.Texture.from(image)
  let textures = [],
    sprites = [],
    selected = null,
    closed = false,
    version = 0
  const clear = () => {
    sprites.forEach((s) => s.destroy({ texture: false, textureSource: false }))
    sprites = []
    textures.forEach((t) => t.destroy(false))
    textures = []
    selected = null
  }
  const load = async (invalid) => {
    const id = ++version
    status.textContent = messages.display002
    try {
      const manifest = await Promise.resolve(
        invalid
          ? { frames: [] }
          : {
              frames: [
                { x: 0, y: 0, w: 64, h: 64 },
                { x: 64, y: 0, w: 64, h: 64 },
              ],
            },
      )
      if (!manifest.frames.length) throw new Error('atlas has no frames')
      if (closed || id !== version) return
      clear()
      textures = manifest.frames.map(
        (f) =>
          new PIXI.Texture({
            source: base.source,
            frame: new PIXI.Rectangle(f.x, f.y, f.w, f.h),
          }),
      )
      for (let i = 0; i < 5; i++) {
        const s = new PIXI.Sprite(textures[i % 2])
        s.anchor.set(0.5)
        s.position.set(50 + i * 75, 100)
        s.eventMode = 'static'
        s.cursor = 'pointer'
        s.on('pointertap', () => {
          selected = s
          sprites.forEach((v) => (v.alpha = v === s ? 1 : 0.5))
          status.textContent = messages.display003
        })
        sprites.push(s)
        app.stage.addChild(s)
      }
      status.textContent = messages.display004
    } catch (e) {
      if (!closed && id === version)
        status.textContent = `${messages.display005}${e.message}${messages.display006}`
    }
  }
  fail.onclick = () => load(true)
  retry.onclick = () => load(false)
  remove.onclick = () => {
    if (!selected) return
    sprites = sprites.filter((s) => s !== selected)
    selected.destroy({ texture: false, textureSource: false })
    selected = null
    sprites.forEach((s) => (s.alpha = 1))
    status.textContent = `${sprites.length}${messages.display007}`
  }
  const observer = new ResizeObserver(() =>
    app.renderer.resize(
      Math.max(1, container.clientWidth),
      Math.max(1, container.clientHeight - 80),
    ),
  )
  observer.observe(container)
  await load(false)
  return () => {
    closed = true
    observer.disconnect()
    clear()
    base.destroy(true)
    app.destroy(true, { children: true })
    container.replaceChildren()
  }
}
