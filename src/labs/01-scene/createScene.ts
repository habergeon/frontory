import {
  AxesHelper,
  BoxGeometry,
  Color,
  DirectionalLight,
  GridHelper,
  HemisphereLight,
  Mesh,
  MeshStandardMaterial,
  PerspectiveCamera,
  Scene,
  WebGLRenderer,
} from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'

export interface SceneController {
  setPaused: (paused: boolean) => void
  resetCamera: () => void
  dispose: () => void
}

/** React 밖에서 장면을 만들고, 소유한 자원의 정리 함수를 React에 돌려줍니다. */
export function createScene(container: HTMLElement): SceneController {
  const renderer = new WebGLRenderer({ antialias: true })
  const scene = new Scene()
  scene.background = new Color('#eaf0f5')

  const camera = new PerspectiveCamera(50, 1, 0.1, 100)
  // 첫 과제: 이 위치만 바꾼 뒤 어느 면이 보이는지 비교해 보세요.
  camera.position.set(3, 2, 5)

  const geometry = new BoxGeometry(1, 1, 1)
  const material = new MeshStandardMaterial({ color: '#3179bf', roughness: 0.55 })
  const cube = new Mesh(geometry, material)
  scene.add(cube)

  const ambientLight = new HemisphereLight('#ffffff', '#64748b', 2)
  const directionalLight = new DirectionalLight('#ffffff', 3)
  directionalLight.position.set(4, 6, 3)
  scene.add(ambientLight, directionalLight)

  const grid = new GridHelper(10, 10, '#94a3b8', '#cbd5e1')
  grid.position.y = -1
  const axes = new AxesHelper(2)
  scene.add(grid, axes)

  const canvas = renderer.domElement
  canvas.setAttribute('role', 'img')
  canvas.setAttribute('aria-label', '회전하는 파란 큐브와 X, Y, Z 좌표축')
  container.appendChild(canvas)

  const controls = new OrbitControls(camera, canvas)
  controls.enableDamping = true
  controls.minDistance = 1.5
  controls.maxDistance = 25
  controls.target.set(0, 0, 0)
  controls.update()
  controls.saveState()

  const resize = () => {
    const width = container.clientWidth
    const height = container.clientHeight
    if (width <= 0 || height <= 0) return
    // CSS 크기와 실제 렌더링 픽셀 수는 다릅니다. 고해상도 비용은 4주 차에 측정합니다.
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(width, height, false)
    camera.aspect = width / height
    camera.updateProjectionMatrix()
  }
  const resizeObserver = new ResizeObserver(resize)
  resizeObserver.observe(container)
  window.addEventListener('resize', resize)
  resize()

  let paused = false
  let lastTime: number | undefined
  let disposed = false
  renderer.setAnimationLoop((time) => {
    // 탭 복귀 때 과도하게 회전하지 않도록 시간 간격을 제한합니다.
    const delta = lastTime === undefined ? 0 : Math.min((time - lastTime) / 1000, 0.1)
    lastTime = time
    if (!paused) {
      cube.rotation.x += delta * 0.3
      cube.rotation.y += delta * 0.5
    }
    controls.update()
    renderer.render(scene, camera)
  })

  return {
    setPaused(value) {
      paused = value
    },
    resetCamera() {
      // 남은 damping을 먼저 소진해야 reset 이후에도 시작 시점이 유지됩니다.
      controls.enableDamping = false
      controls.update()
      controls.reset()
      controls.enableDamping = true
    },
    dispose() {
      if (disposed) return
      disposed = true
      renderer.setAnimationLoop(null)
      resizeObserver.disconnect()
      window.removeEventListener('resize', resize)
      controls.dispose()
      geometry.dispose()
      material.dispose()
      grid.geometry.dispose()
      axes.geometry.dispose()
      for (const helper of [grid, axes]) {
        const materials = Array.isArray(helper.material) ? helper.material : [helper.material]
        materials.forEach((helperMaterial) => helperMaterial.dispose())
      }
      scene.clear()
      renderer.dispose()
      // 실습 전환 시 사용하지 않는 WebGL context도 반납합니다.
      renderer.forceContextLoss()
      canvas.remove()
    },
  }
}
