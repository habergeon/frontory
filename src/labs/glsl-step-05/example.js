// glsl-step-05: real GLSL ShaderMaterial experiment.
export function mount({ THREE, container, locale = 'ko' }) {
  const messages =
    locale === 'en'
      ? {
          display001: 'Tracking Coordinate Spaces',
          display002:
            'This uses an actual WebGL ShaderMaterial. Change conditions and edit expressions in the GLSL source. Numerical and timing results vary with the device and resolution.',
          display003: 'model translation',
          display004: 'x=0',
          display005: 'x=1',
          display006: 'Run / reinitialize',
          display007: ': ',
          display008:
            'Expect world and clip positions to change while the original vertex data remains unchanged.',
        }
      : {
          display001: '좌표 공간 추적',
          display002:
            '실제 WebGL ShaderMaterial입니다. 조건을 바꾸고 GLSL 소스의 식을 편집하세요. 수치·시간 결과는 장치와 해상도에 따라 달라집니다.',
          display003: 'model 이동',
          display004: 'x=0',
          display005: 'x=1',
          display006: '실행 / 다시 초기화',
          display007: ': ',
          display008:
            '월드 위치와 clip 위치가 바뀌지만 원래 정점 데이터는 유지될 것으로 예상합니다.',
        }

  container.style.cssText =
    'overflow:auto;background:#101827;color:#e5edf8;font:14px system-ui;padding:12px;box-sizing:border-box'
  const title = document.createElement('h3')
  title.textContent = messages.display001
  const help = document.createElement('p')
  help.textContent = messages.display002
  const choice = document.createElement('select')
  choice.setAttribute('aria-label', messages.display003)
  for (const text of [messages.display004, messages.display005]) {
    const o = document.createElement('option')
    o.textContent = text
    choice.append(o)
  }
  const button = document.createElement('button')
  button.textContent = messages.display006
  const output = document.createElement('pre')
  output.style.cssText = 'white-space:pre-wrap;overflow-wrap:anywhere'
  output.setAttribute('aria-live', 'polite')
  const canvas = document.createElement('canvas')
  canvas.width = 640
  canvas.height = 360
  canvas.style.cssText =
    'width:100%;height:auto;max-height:360px;object-fit:contain'
  container.append(title, help, choice, button, canvas, output)

  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true })
  renderer.setPixelRatio(1)
  const scene = new THREE.Scene()
  const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 20)
  camera.position.z = 3
  const pixels = new Uint8Array(16 * 16 * 4)
  for (let y = 0; y < 16; y++)
    for (let x = 0; x < 16; x++) {
      const i = (y * 16 + x) * 4,
        v = (x + y) % 2 ? 255 : 0
      pixels.set([v, 80, 255 - v, 255], i)
    }
  const texture = new THREE.DataTexture(pixels, 16, 16, THREE.RGBAFormat)
  texture.magFilter = THREE.NearestFilter
  texture.minFilter = THREE.NearestFilter
  texture.needsUpdate = true
  const uniforms = {
    uVariant: { value: 0 },
    uTime: { value: 0 },
    uResolution: { value: new THREE.Vector2(640, 360) },
    uPointer: { value: new THREE.Vector2(0.5, 0.5) },
    uTexture: { value: texture },
    uColor: { value: new THREE.Color(1, 0.1, 0.1) },
  }
  const geometry = new THREE.PlaneGeometry(2, 2, 64, 64)

  const material = new THREE.ShaderMaterial({
    uniforms,
    vertexShader:
      'varying vec2 vUv;varying vec3 vColor;varying vec3 vWorld;varying vec3 vNormal;varying vec3 vView;uniform float uVariant;uniform float uTime;void main(){vUv=uv;vec3 p=position;vWorld=(modelMatrix*vec4(p,1)).xyz;vColor=vec3(1);vNormal=normalize(normalMatrix*normal);vView=(modelViewMatrix*vec4(p,1)).xyz;gl_Position=projectionMatrix*modelViewMatrix*vec4(p,1);}',
    fragmentShader:
      'uniform float uVariant;uniform float uTime;uniform vec2 uResolution;uniform vec2 uPointer;uniform sampler2D uTexture;uniform vec3 uColor;varying vec2 vUv;varying vec3 vColor;varying vec3 vWorld;varying vec3 vNormal;varying vec3 vView;void main(){gl_FragColor=vec4(fract(vWorld*.5+.5),1);}',
    side: THREE.DoubleSide,
    transparent: false,
    depthTest: true,
    depthWrite: true,
  })
  const mesh = new THREE.Mesh(geometry, material)
  scene.add(mesh)

  let active = true,
    frame = 0,
    last = performance.now(),
    sampleStart = last,
    frames = 0
  const pointer = new THREE.Vector2(0.5, 0.5)
  const onPointer = (event) => {
    const rect = canvas.getBoundingClientRect()
    pointer.set(
      (event.clientX - rect.left) / rect.width,
      1 - (event.clientY - rect.top) / rect.height,
    )
  }
  canvas.addEventListener('pointermove', onPointer)
  function apply() {
    const v = choice.selectedIndex
    uniforms.uVariant.value = v
    mesh.position.x = v

    output.textContent =
      messages.display003 +
      messages.display007 +
      choice.options[v].text +
      '\n' +
      messages.display008
  }
  renderer.setSize(640, 360, false)
  apply()
  button.onclick = apply
  choice.onchange = apply
  function tick(now) {
    if (!active) return
    const dt = Math.min(0.1, (now - last) / 1000)
    last = now
    uniforms.uTime.value = now / 1000
    uniforms.uPointer.value.lerp(pointer, 1 - Math.exp(-12 * dt))

    renderer.render(scene, camera)
    frames++

    frame = requestAnimationFrame(tick)
  }
  frame = requestAnimationFrame(tick)
  return () => {
    active = false
    cancelAnimationFrame(frame)
    canvas.removeEventListener('pointermove', onPointer)
    button.onclick = null
    choice.onchange = null
    geometry.dispose()
    material.dispose()
    texture.dispose()
    renderer.dispose()
    renderer.forceContextLoss()
    container.replaceChildren()
  }
}
