// Task: change SEGMENTS, WIREFRAME, and ROUGHNESS one at a time.
export function mount({locale='ko', THREE, OrbitControls, container }) {
  const messages=locale==='en'?{"display001":"Geometry: vertices/triangles · Material: surface · Mesh: combines both","display002":"Three.js learning scene"}:{"display001":"Geometry: 정점/삼각형 · Material: 표면 · Mesh: 둘의 결합","display002":"Three.js 학습 장면"};
  const SEGMENTS = 12, WIREFRAME = false, ROUGHNESS = 0.4
  const lab = setup(THREE, OrbitControls, container, messages)
  const shapes = [new THREE.BoxGeometry(), new THREE.SphereGeometry(0.7, SEGMENTS, SEGMENTS), new THREE.TorusGeometry(0.55, 0.2, SEGMENTS, SEGMENTS)]
  shapes.forEach((geometry, index) => {
    const material = new THREE.MeshStandardMaterial({ color: ['#3179bf', '#e97645', '#26836c'][index], roughness: ROUGHNESS, wireframe: WIREFRAME })
    const mesh = new THREE.Mesh(geometry, material)
    mesh.position.x = (index - 1) * 2
    lab.scene.add(mesh)
  })
  lab.label.textContent = messages.display001
  return lab.dispose
}

// Shared scene setup: the code below also runs exactly as edited.
function setup(THREE, OrbitControls, container, messages) {
  const scene = new THREE.Scene()
  scene.background = new THREE.Color('#edf2f7')
  const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 100)
  camera.position.set(4, 3, 6)
  const renderer = new THREE.WebGLRenderer({ antialias: true })
  renderer.domElement.setAttribute('aria-label', messages.display002)
  container.appendChild(renderer.domElement)
  const controls = new OrbitControls(camera, renderer.domElement)
  controls.enableDamping = true
  scene.add(new THREE.HemisphereLight(0xffffff, 0x64748b, 2))
  const light = new THREE.DirectionalLight(0xffffff, 3)
  light.position.set(3, 6, 4)
  scene.add(light)
  const resize = () => {
    const w = container.clientWidth, h = container.clientHeight
    if (!w || !h) return
    renderer.setPixelRatio(Math.min(devicePixelRatio, 2))
    renderer.setSize(w, h, false)
    camera.aspect = w / h
    camera.updateProjectionMatrix()
  }
  const observer = new ResizeObserver(resize)
  observer.observe(container)
  resize()
  const label = document.createElement('output')
  label.style.cssText = 'position:absolute;top:12px;left:12px;right:12px;padding:10px;background:#ffffffdf;color:#142433;font:13px system-ui;pointer-events:none;white-space:pre-wrap'
  container.append(label)
  let tick = (_time) => {}
  renderer.setAnimationLoop(time => { tick(time / 1000); controls.update(); renderer.render(scene, camera) })
  const dispose = () => {
    renderer.setAnimationLoop(null)
    observer.disconnect()
    controls.dispose()
    const disposed = new Set()
    const release = object => { if (object && !disposed.has(object)) { disposed.add(object); object.dispose() } }
    scene.traverse(object => {
      release(object.geometry)
      const materials = Array.isArray(object.material) ? object.material : [object.material]
      materials.filter(Boolean).forEach(material => {
        Object.values(material).filter(value => value && value.isTexture).forEach(release)
        release(material)
      })
    })
    renderer.dispose()
    renderer.forceContextLoss()
    container.replaceChildren()
  }
  return { scene, camera, renderer, controls, light, label, dispose, animate: fn => { tick = fn } }
}
