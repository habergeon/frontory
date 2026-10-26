// 실측 값입니다. 다른 기기/백그라운드 탭과 직접 비교하지 마세요. renderer.info는 총 VRAM이 아닙니다.
export function mount({ locale = 'ko', THREE, OrbitControls, container }) {
  const messages =
    locale === 'en'
      ? {
          display001: 'Observed FPS ',
          display002: ' · calls ',
          display003: ' · triangles ',
          display004: '\ngeometries ',
          display005: ' · textures ',
          display006: ' (counts, not VRAM)\nINSTANCED=',
          display007: ' / DPR=',
          display008: 'Three.js learning scene',
        }
      : {
          display001: '관찰 FPS ',
          display002: ' · calls ',
          display003: ' · triangles ',
          display004: '\ngeometries ',
          display005: ' · textures ',
          display006: ' (개수, VRAM 아님)\nINSTANCED=',
          display007: ' / DPR=',
          display008: 'Three.js 학습 장면',
        }
  const COUNT = 120,
    INSTANCED = true,
    DPR = 1
  const lab = setup(THREE, OrbitControls, container, messages)
  const geometry = new THREE.BoxGeometry(0.25, 0.25, 0.25),
    material = new THREE.MeshNormalMaterial()
  let instance
  if (INSTANCED) {
    instance = new THREE.InstancedMesh(geometry, material, COUNT)
    lab.scene.add(instance)
  }
  for (let i = 0; i < COUNT; i++) {
    const matrix = new THREE.Matrix4().makeTranslation(
      ((i % 10) - 5) * 0.45,
      ((Math.floor(i / 10) % 6) - 3) * 0.45,
      Math.floor(i / 60) * 0.7,
    )
    if (instance) instance.setMatrixAt(i, matrix)
    else {
      const mesh = new THREE.Mesh(geometry, material)
      mesh.applyMatrix4(matrix)
      lab.scene.add(mesh)
    }
  }
  if (instance) instance.instanceMatrix.needsUpdate = true
  let frames = 0,
    previous = 0
  lab.animate((time) => {
    if (lab.renderer.getPixelRatio() !== Math.min(devicePixelRatio, DPR))
      lab.renderer.setPixelRatio(Math.min(devicePixelRatio, DPR))
    frames++
    if (time - previous > 1) {
      lab.label.textContent =
        messages.display001 +
        (frames / (time - previous)).toFixed(1) +
        messages.display002 +
        lab.renderer.info.render.calls +
        messages.display003 +
        lab.renderer.info.render.triangles +
        messages.display004 +
        lab.renderer.info.memory.geometries +
        messages.display005 +
        lab.renderer.info.memory.textures +
        messages.display006 +
        INSTANCED +
        messages.display007 +
        DPR
      previous = time
      frames = 0
    }
  })
  return lab.dispose
}
// 공통 장면 초기화: 아래 코드도 편집한 내용 그대로 실행됩니다.
function setup(THREE, OrbitControls, container, messages) {
  const scene = new THREE.Scene()
  scene.background = new THREE.Color('#edf2f7')
  const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 100)
  camera.position.set(4, 3, 6)
  const renderer = new THREE.WebGLRenderer({ antialias: true })
  renderer.domElement.setAttribute('aria-label', messages.display008)
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
