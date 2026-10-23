// Task: change LIGHT_X, ROUGHNESS, and SHADOWS to compare surface appearance and shadows.
export function mount({locale='ko', THREE, OrbitControls, container }) {
  const messages=locale==='en'?{"display001":"Procedurally generated checker texture · castShadow + receiveShadow + renderer.shadowMap","display002":"Three.js learning scene"}:{"display001":"직접 생성한 체크 텍스처 · castShadow + receiveShadow + renderer.shadowMap","display002":"Three.js 학습 장면"};
  const LIGHT_X = 3, ROUGHNESS = 0.6, SHADOWS = true
  const lab = setup(THREE, OrbitControls, container, messages)
  lab.renderer.shadowMap.enabled = SHADOWS
  lab.light.position.x = LIGHT_X
  lab.light.castShadow = true
  const image = document.createElement('canvas')
  image.width = image.height = 64
  const ctx = image.getContext('2d')
  for (let y = 0; y < 8; y++) for (let x = 0; x < 8; x++) {
    ctx.fillStyle = (x + y) % 2 ? '#3179bf' : '#ffffff'
    ctx.fillRect(x * 8, y * 8, 8, 8)
  }
  const texture = new THREE.CanvasTexture(image)
  texture.colorSpace = THREE.SRGBColorSpace
  const cube = new THREE.Mesh(new THREE.BoxGeometry(), new THREE.MeshStandardMaterial({ map: texture, roughness: ROUGHNESS }))
  cube.castShadow = true
  cube.position.y = 0.5
  const floor = new THREE.Mesh(new THREE.PlaneGeometry(14, 14), new THREE.MeshStandardMaterial({ color: '#d1dae4' }))
  floor.rotation.x = -Math.PI / 2
  floor.receiveShadow = true
  lab.scene.add(cube, floor)
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
