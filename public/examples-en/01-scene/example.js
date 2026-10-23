// This module runs in the right/center editor and the practice view.
// First task: change CAMERA_POSITION to [0, 2, 5] and [5, 2, 0], then record your predictions and results.
export function mount({locale='ko', THREE, OrbitControls, container }) {
  const messages=locale==='en'?{"display001":"Rotating cube and coordinate axes"}:{"display001":"회전 큐브와 좌표축"};
  const CAMERA_POSITION = [3, 2, 5]
  const CUBE_COLOR = '#3179bf'
  const FOV = 50
  const ROTATE = true

  const scene = new THREE.Scene()
  scene.background = new THREE.Color('#eaf0f5')
  const camera = new THREE.PerspectiveCamera(FOV, 1, 0.1, 100)
  camera.position.set(...CAMERA_POSITION)
  const renderer = new THREE.WebGLRenderer({ antialias: true })
  const canvas = renderer.domElement
  canvas.setAttribute('aria-label', messages.display001)
  container.appendChild(canvas)

  const geometry = new THREE.BoxGeometry(1, 1, 1)
  const material = new THREE.MeshStandardMaterial({ color: CUBE_COLOR, roughness: 0.55 })
  const cube = new THREE.Mesh(geometry, material)
  scene.add(cube)

  const fillLight = new THREE.HemisphereLight('#ffffff', '#64748b', 2)
  const keyLight = new THREE.DirectionalLight('#ffffff', 3)
  keyLight.position.set(4, 6, 3)
  scene.add(fillLight, keyLight)
  const grid = new THREE.GridHelper(10, 10, '#94a3b8', '#cbd5e1')
  grid.position.y = -1
  const axes = new THREE.AxesHelper(2)
  scene.add(grid, axes)

  const controls = new OrbitControls(camera, canvas)
  controls.enableDamping = true
  controls.minDistance = 1.5
  controls.maxDistance = 25
  controls.target.set(0, 0, 0)
  controls.update()

  const resize = () => {
    const width = container.clientWidth
    const height = container.clientHeight
    if (width <= 0 || height <= 0) return
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(width, height, false)
    camera.aspect = width / height
    camera.updateProjectionMatrix()
  }
  const observer = new ResizeObserver(resize)
  observer.observe(container)
  window.addEventListener('resize', resize)
  resize()

  let lastTime
  renderer.setAnimationLoop(time => {
    const delta = lastTime === undefined ? 0 : Math.min((time - lastTime) / 1000, 0.1)
    lastTime = time
    if (ROTATE) {
      cube.rotation.x += delta * 0.3
      cube.rotation.y += delta * 0.5
    }
    controls.update()
    renderer.render(scene, camera)
  })

  // Manage resources and their cleanup together so they can be released on rerun or when the view closes.
  let disposed = false
  return () => {
    if (disposed) return
    disposed = true
    renderer.setAnimationLoop(null)
    observer.disconnect()
    window.removeEventListener('resize', resize)
    controls.dispose()
    geometry.dispose()
    material.dispose()
    for (const helper of [grid, axes]) {
      helper.geometry.dispose()
      const materials = Array.isArray(helper.material) ? helper.material : [helper.material]
      materials.forEach(item => item.dispose())
    }
    scene.clear()
    renderer.dispose()
    renderer.forceContextLoss()
    canvas.remove()
  }
}
