// mesh raycast 교차점에 마커를 놓습니다. GS 선택 알고리즘으로 일반화하지 마세요.
export function mount({ locale = 'ko', THREE, OrbitControls, container }) {
  const messages =
    locale === 'en'
      ? {
          display001: 'Intersection ',
          display002: 'Click the sphere surface → world-space marker',
          display003: 'Three.js learning scene',
        }
      : {
          display001: '교차점 ',
          display002: '구 표면 클릭 → world-space 마커',
          display003: 'Three.js 학습 장면',
        }
  const lab = setup(THREE, OrbitControls, container, messages)
  const mesh = new THREE.Mesh(
    new THREE.SphereGeometry(1, 32, 24),
    new THREE.MeshStandardMaterial({ color: '#3179bf' }),
  )
  lab.scene.add(mesh)
  const marker = new THREE.Mesh(
    new THREE.SphereGeometry(0.06, 12, 8),
    new THREE.MeshBasicMaterial({ color: '#ef6f39' }),
  )
  marker.visible = false
  lab.scene.add(marker)
  const ray = new THREE.Raycaster(),
    pointer = new THREE.Vector2()
  const pick = (event) => {
    const rect = lab.renderer.domElement.getBoundingClientRect()
    pointer.set(
      ((event.clientX - rect.left) / rect.width) * 2 - 1,
      (-(event.clientY - rect.top) / rect.height) * 2 + 1,
    )
    ray.setFromCamera(pointer, lab.camera)
    const hit = ray.intersectObject(mesh)[0]
    marker.visible = !!hit
    if (hit) {
      marker.position.copy(hit.point).addScaledVector(hit.face.normal, 0.03)
      lab.label.textContent =
        messages.display001 +
        hit.point
          .toArray()
          .map((v) => v.toFixed(2))
          .join(', ')
    }
  }
  lab.renderer.domElement.addEventListener('click', pick)
  lab.label.textContent = messages.display002
  return () => {
    lab.renderer.domElement.removeEventListener('click', pick)
    lab.dispose()
  }
}
// 공통 장면 초기화: 아래 코드도 편집한 내용 그대로 실행됩니다.
function setup(THREE, OrbitControls, container, messages) {
  const scene = new THREE.Scene()
  scene.background = new THREE.Color('#edf2f7')
  const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 100)
  camera.position.set(4, 3, 6)
  const renderer = new THREE.WebGLRenderer({ antialias: true })
  renderer.domElement.setAttribute('aria-label', messages.display003)
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
