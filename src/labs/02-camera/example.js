// 과제: FOV와 CAMERA_POSITION을 따로 바꾸며 원근과 크기를 비교하세요.
export function mount({ THREE, OrbitControls, container }) {
  const FOV = 50
  const CAMERA_POSITION = [4, 3, 6]
  const TARGET = [0, 0, 0]
  const lab = setup(THREE, OrbitControls, container)
  lab.camera.fov = FOV
  lab.camera.position.set(...CAMERA_POSITION)
  lab.camera.updateProjectionMatrix()
  lab.controls.target.set(...TARGET)
  for (let i = -2; i <= 2; i++) {
    const box = new THREE.Mesh(new THREE.BoxGeometry(0.8, 0.8, 0.8), new THREE.MeshStandardMaterial({ color: i === 0 ? '#e97645' : '#3179bf' }))
    box.position.set(i * 1.3, 0, -Math.abs(i))
    lab.scene.add(box)
  }
  lab.scene.add(new THREE.GridHelper(12, 12), new THREE.AxesHelper(2))
  lab.label.textContent = 'FOV ' + FOV + '° · 카메라 ' + CAMERA_POSITION.join(', ') + '\n창 크기를 바꾸어 비율이 유지되는지 확인하세요.'
  return lab.dispose
}

// 공통 장면 초기화: 아래 코드도 편집한 내용 그대로 실행됩니다.
function setup(THREE, OrbitControls, container) {
  const scene = new THREE.Scene()
  scene.background = new THREE.Color('#edf2f7')
  const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 100)
  camera.position.set(4, 3, 6)
  const renderer = new THREE.WebGLRenderer({ antialias: true })
  renderer.domElement.setAttribute('aria-label', 'Three.js 학습 장면')
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
