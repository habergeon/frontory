// GLSL ES 1 ShaderMaterial: UV → time color → vertex wave, controlled independently.
export function mount({ locale = 'ko', THREE, container }) {
  const messages =
    locale === 'en'
      ? {
          display001:
            '<label>Stage <select><option value="0">UV</option><option value="1">Time color</option><option value="2">Vertex wave</option></select></label> <label>Amplitude <input type="range" min="0" max=".8" step=".05" value=".3"></label> <label>Frequency <input type="range" min="1" max="16" value="6"></label> <label>Speed <input type="range" min="0" max="3" step=".1" value="1"></label>',
        }
      : {
          display001:
            '<label>Stage <select><option value="0">UV</option><option value="1">Time color</option><option value="2">Vertex wave</option></select></label> <label>Amplitude <input type="range" min="0" max=".8" step=".05" value=".3"></label> <label>Frequency <input type="range" min="1" max="16" value="6"></label> <label>Speed <input type="range" min="0" max="3" step=".1" value="1"></label>',
        }
  const ui = document.createElement('div')
  ui.innerHTML = messages.display001
  container.append(ui)
  const [amplitude, frequency, speed] = ui.querySelectorAll('input'),
    stage = ui.querySelector('select')
  const renderer = new THREE.WebGLRenderer()
  container.append(renderer.domElement)
  const scene = new THREE.Scene(),
    camera = new THREE.PerspectiveCamera(50, 1, 0.1, 100)
  camera.position.set(0, 1, 3.5)
  camera.lookAt(0, 0, 0)
  const uniforms = {
    time: { value: 0 },
    amplitude: { value: 0.3 },
    frequency: { value: 6 },
    stage: { value: 0 },
  }
  const geometry = new THREE.PlaneGeometry(2.6, 2, 80, 60),
    material = new THREE.ShaderMaterial({
      side: THREE.DoubleSide,
      uniforms,
      vertexShader:
        'varying vec2 vUv; uniform float time, amplitude, frequency, stage; void main(){vUv=uv;vec3 p=position;if(stage>1.5)p.z+=sin(uv.x*frequency+time)*amplitude;gl_Position=projectionMatrix*modelViewMatrix*vec4(p,1.);}',
      fragmentShader:
        'varying vec2 vUv; uniform float time, stage; void main(){float b=stage>.5?.5+.5*sin(time):.5;gl_FragColor=vec4(vUv,b,1.);}',
    })
  scene.add(new THREE.Mesh(geometry, material))
  let previous = 0
  renderer.setAnimationLoop((now) => {
    const dt = previous ? Math.min((now - previous) / 1000, 0.1) : 0
    previous = now
    uniforms.time.value += dt * Number(speed.value)
    uniforms.amplitude.value = Number(amplitude.value)
    uniforms.frequency.value = Number(frequency.value)
    uniforms.stage.value = Number(stage.value)
    renderer.render(scene, camera)
  })
  const resize = () => {
    const w = Math.max(1, container.clientWidth),
      h = Math.max(1, container.clientHeight - ui.offsetHeight)
    renderer.setSize(w, h, false)
    camera.aspect = w / h
    camera.updateProjectionMatrix()
  }
  const observer = new ResizeObserver(resize)
  observer.observe(container)
  resize()
  return () => {
    renderer.setAnimationLoop(null)
    observer.disconnect()
    geometry.dispose()
    material.dispose()
    renderer.dispose()
    renderer.forceContextLoss()
    container.replaceChildren()
  }
}
