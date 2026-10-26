// Zoom/rotate/pan to extreme values, then reset. The camera and target are restored together.
export function mount({ locale = 'ko', THREE, OrbitControls, container }) {
  const messages =
    locale === 'en'
      ? { display001: 'Reset camera', display002: 'Three.js learning scene' }
      : { display001: '카메라 초기화', display002: 'Three.js 학습 장면' }
  const lab = setup(THREE, OrbitControls, container, messages)
  lab.scene.add(
    new THREE.Mesh(
      new THREE.TorusKnotGeometry(0.6, 0.2, 96, 12),
      new THREE.MeshNormalMaterial(),
    ),
    new THREE.GridHelper(10, 10),
  )
  lab.controls.minDistance = 2
  lab.controls.maxDistance = 10
  lab.controls.maxPolarAngle = Math.PI * 0.85
  lab.controls.saveState()
  const reset = document.createElement('button')
  reset.textContent = messages.display001
  reset.onclick = () => lab.controls.reset()
  lab.label.append(reset)
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
  renderer.debug.onShaderError = (gl, program, vertex, fragment) => {
    const message = [
      gl.getProgramInfoLog(program),
      gl.getShaderInfoLog(vertex),
      gl.getShaderInfoLog(fragment),
    ]
      .filter(Boolean)
      .join('\n')
    window.dispatchEvent(
      new ErrorEvent('error', { error: new Error(message), message }),
    )
  }
  const controls = new OrbitControls(camera, renderer.domElement)
  controls.enableDamping = true
  scene.add(new THREE.HemisphereLight(0xffffff, 0x64748b, 2))
  const light = new THREE.DirectionalLight(0xffffff, 3)
  light.position.set(3, 6, 4)
  scene.add(light)
  const resize = () => {
    const w = container.clientWidth,
      h = container.clientHeight
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
  label.style.cssText =
    'position:absolute;top:12px;left:12px;right:12px;padding:10px;background:#ffffffdf;color:#142433;font:13px system-ui;pointer-events:auto;white-space:pre-wrap'
  container.append(label)
  let tick = (_time) => {}
  renderer.setAnimationLoop((time) => {
    tick(time / 1000)
    controls.update()
    renderer.render(scene, camera)
  })
  const dispose = () => {
    renderer.setAnimationLoop(null)
    observer.disconnect()
    controls.dispose()
    const disposed = new Set()
    const release = (object) => {
      if (object && !disposed.has(object)) {
        disposed.add(object)
        object.dispose()
      }
    }
    scene.traverse((object) => {
      release(object.geometry)
      const materials = Array.isArray(object.material)
        ? object.material
        : [object.material]
      materials.filter(Boolean).forEach((material) => {
        Object.values(material)
          .filter((value) => value && value.isTexture)
          .forEach(release)
        release(material)
      })
    })
    renderer.dispose()
    renderer.forceContextLoss()
    container.replaceChildren()
  }
  return {
    scene,
    camera,
    renderer,
    controls,
    light,
    label,
    dispose,
    animate: (fn) => {
      tick = fn
    },
  }
}
