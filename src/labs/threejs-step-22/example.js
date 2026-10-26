// 렌더 타깃과 미니맵
// 실험: 타깃 크기: 256×256 → 512×512
// 미니맵 선명도와 처리 픽셀 수가 함께 늘어납니다
// 독립 실행 예제: 코드를 수정하고 다시 실행해 결과를 비교하세요.
/** @param {any} context */
export function mount(context) {
  const { container, THREE, OrbitControls, PIXI, locale = 'ko' } = context
  const messages =
    locale === 'en'
      ? {
          display001: 'Render Targets and Minimap',
          display002: 'Target size: 256×256 ↔ 512×512',
          display003: 'Render target ',
          display004: '; top camera inset',
        }
      : {
          display001: '렌더 타깃과 미니맵',
          display002: '타깃 크기: 256×256 ↔ 512×512',
          display003: 'Render target ',
          display004: '; top camera inset',
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
  const viewport = document.createElement('div')
  viewport.style.cssText = 'width:400px;max-width:100%;height:260px'
  ui.append(viewport)
  const scene = new THREE.Scene()
  scene.background = new THREE.Color('#edf2f7')
  let camera = new THREE.PerspectiveCamera(45, 400 / 260, 0.1, 100)
  camera.position.set(3, 2, 6)
  camera.lookAt(0, 0, 0)
  const renderer = new THREE.WebGLRenderer({ antialias: true })
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2))
  viewport.append(renderer.domElement)
  const resources = new Set()
  function track(resource) {
    resources.add(resource)
    return resource
  }
  function mesh(
    geometry,
    material = track(
      new THREE.MeshStandardMaterial({ color: '#2563eb', roughness: 0.4 }),
    ),
  ) {
    track(geometry)
    const object = new THREE.Mesh(geometry, material)
    scene.add(object)
    return object
  }
  scene.add(new THREE.HemisphereLight(0xffffff, 0x64748b, 1.5))
  const keyLight = new THREE.DirectionalLight(0xffffff, 3)
  keyLight.position.set(3, 5, 4)
  scene.add(keyLight)
  function resize() {
    const w = Math.max(1, viewport.clientWidth),
      h = Math.max(1, viewport.clientHeight)
    renderer.setSize(w, h)
    if (camera.isPerspectiveCamera) camera.aspect = w / h
    camera.updateProjectionMatrix()
  }
  resize()
  let tick = (_dt, _time) => {},
    renderEveryFrame = true
  disposers.push(() => {
    renderer.setAnimationLoop(null)
    resources.forEach((resource) => resource.dispose())
    scene.traverse((o) => {
      if (o.isLight && o.dispose) o.dispose()
    })
    renderer.dispose()
    renderer.forceContextLoss()
  })
  mesh(new THREE.TorusKnotGeometry(0.8, 0.2, 64, 12))
  const target = track(new THREE.WebGLRenderTarget(256, 256)),
    top = new THREE.PerspectiveCamera(50, 1, 0.1, 100)
  top.position.set(0, 6, 0)
  top.up.set(0, 0, -1)
  top.lookAt(0, 0, 0)
  const overlayScene = new THREE.Scene(),
    overlayCamera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 2),
    quad = new THREE.Mesh(
      track(new THREE.PlaneGeometry(2, 2)),
      track(new THREE.MeshBasicMaterial({ map: target.texture })),
    )
  overlayScene.add(quad)
  renderEveryFrame = false
  tick = () => {
    renderer.setRenderTarget(target)
    renderer.render(scene, top)
    renderer.setRenderTarget(null)
    renderer.setViewport(0, 0, viewport.clientWidth, viewport.clientHeight)
    renderer.render(scene, camera)
    renderer.autoClear = false
    renderer.clearDepth()
    renderer.setViewport(0, 0, 120, 120)
    renderer.render(overlayScene, overlayCamera)
    renderer.autoClear = true
    renderer.setViewport(0, 0, viewport.clientWidth, viewport.clientHeight)
  }
  function draw() {
    const size = changed ? 512 : 256
    target.setSize(size, size)
    status.textContent =
      messages.display003 + size + '×' + size + messages.display004
  }
  draw()
  loop((dt, time) => {
    tick(dt, time)
    if (renderEveryFrame) renderer.render(scene, camera)
  })
  return () => {
    closed = true
    cancelAnimationFrame(frame)
    disposers.reverse().forEach((fn) => fn())
    ui.remove()
  }
}
