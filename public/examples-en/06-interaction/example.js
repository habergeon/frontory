// Task: click an object and check that selection still works after dragging.
export function mount({ locale = 'ko', THREE, OrbitControls, container }) {
  const messages =
    locale === 'en'
      ? {
          display001: 'Object ',
          display002: ' · distance ',
          display003: 'No selection',
          display004: 'Click: Raycaster selection · drag: OrbitControls',
          display005: 'Three.js learning scene',
        }
      : {
          display001: '물체 ',
          display002: ' · 거리 ',
          display003: '선택 없음',
          display004: '클릭: Raycaster 선택 · 드래그: OrbitControls',
          display005: 'Three.js 학습 장면',
        }
  const lab = setup(THREE, OrbitControls, container, messages)
  const targets = []
  for (let i = 0; i < 3; i++) {
    const mesh = new THREE.Mesh(
      new THREE.BoxGeometry(),
      new THREE.MeshStandardMaterial({ color: '#3179bf' }),
    )
    mesh.position.x = (i - 1) * 2
    mesh.name = messages.display001 + (i + 1)
    targets.push(mesh)
    lab.scene.add(mesh)
  }
  const raycaster = new THREE.Raycaster()
  const pointer = new THREE.Vector2()
  const pick = (event) => {
    const rect = lab.renderer.domElement.getBoundingClientRect()
    pointer.set(
      ((event.clientX - rect.left) / rect.width) * 2 - 1,
      (-(event.clientY - rect.top) / rect.height) * 2 + 1,
    )
    raycaster.setFromCamera(pointer, lab.camera)
    const hit = raycaster.intersectObjects(targets)[0]
    targets.forEach((mesh) =>
      mesh.material.color.set(mesh === hit?.object ? '#e97645' : '#3179bf'),
    )
    lab.label.textContent = hit
      ? hit.object.name + messages.display002 + hit.distance.toFixed(2)
      : messages.display003
  }
  lab.renderer.domElement.addEventListener('click', pick)
  lab.label.textContent = messages.display004
  return () => {
    lab.renderer.domElement.removeEventListener('click', pick)
    lab.dispose()
  }
}

// Shared scene setup: the code below also runs exactly as edited.
function setup(THREE, OrbitControls, container, messages) {
  const scene = new THREE.Scene()
  scene.background = new THREE.Color('#edf2f7')
  const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 100)
  camera.position.set(4, 3, 6)
  const renderer = new THREE.WebGLRenderer({ antialias: true })
  renderer.domElement.setAttribute('aria-label', messages.display005)
  container.appendChild(renderer.domElement)
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
    'position:absolute;top:12px;left:12px;right:12px;padding:10px;background:#ffffffdf;color:#142433;font:13px system-ui;pointer-events:none;white-space:pre-wrap'
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
