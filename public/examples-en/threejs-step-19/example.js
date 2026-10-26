// Instancing Basics
// Experiment: Representation: Individual Mesh objects → InstancedMesh
// Under the same material conditions, draw calls decrease.
// Standalone example: edit the code and run it again to compare the results.
/** @param {any} context */
export function mount(context) {
  const { container, THREE, OrbitControls, PIXI, locale = 'ko' } = context
  const messages =
    locale === 'en'
      ? {
          display001: 'Instancing Basics',
          display002: 'Representation: Individual Mesh objects ↔ InstancedMesh',
          display003: 'Previous render calls ',
          display004: '500 Mesh objects',
        }
      : {
          display001: '인스턴싱 기초',
          display002: '표현: 개별 Mesh ↔ InstancedMesh',
          display003: 'Previous render calls ',
          display004: '500 Mesh objects',
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
  const geometry = track(new THREE.BoxGeometry(0.15, 0.15, 0.15)),
    material = track(new THREE.MeshNormalMaterial()),
    individual = new THREE.Group(),
    instances = new THREE.InstancedMesh(geometry, material, 500)
  scene.add(individual, instances)
  const matrix = new THREE.Matrix4()
  for (let i = 0; i < 500; i++) {
    const x = ((i % 25) - 12) * 0.22,
      y = (Math.floor(i / 25) - 10) * 0.22
    const cube = new THREE.Mesh(geometry, material)
    cube.position.set(x, y, 0)
    individual.add(cube)
    matrix.makeTranslation(x, y, 0)
    instances.setMatrixAt(i, matrix)
  }
  instances.instanceMatrix.needsUpdate = true
  disposers.push(() => instances.dispose())
  function draw() {
    individual.visible = !changed
    instances.visible = changed
  }
  tick = () =>
    (status.textContent =
      messages.display003 +
      renderer.info.render.calls +
      '; ' +
      (changed ? 'InstancedMesh' : messages.display004))
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
