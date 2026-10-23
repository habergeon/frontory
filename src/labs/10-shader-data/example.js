// uTime은 uniform, uv는 attribute, vUv는 varying입니다. SPEED=0/1/3을 비교하세요.
export function mount({locale='ko', THREE, OrbitControls, container }) {
  const messages=locale==='en'?{"display001":"uniform uTime / attribute uv / varying vUv","display002":"Three.js learning scene"}:{"display001":"uniform uTime / attribute uv / varying vUv","display002":"Three.js 학습 장면"};
  const SEGMENTS=32, AMPLITUDE=0.25, SPEED=1
  const lab=setup(THREE,OrbitControls,container, messages)
  lab.camera.position.set(0,0,4)
  function createMaterial() {
    return new THREE.ShaderMaterial({ side:THREE.DoubleSide,
      uniforms:{uTime:{value:0},uAmplitude:{value:AMPLITUDE},uFrequency:{value:4},uMix:{value:0.5},uRepeat:{value:8},uTexture:{value:null},uColor:{value:new THREE.Color('#3179bf')}},
      vertexShader:"varying vec2 vUv; void main(){vUv=uv; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);}",
      fragmentShader:"uniform float uTime; varying vec2 vUv; void main(){gl_FragColor=vec4(vUv.x,0.5+0.5*sin(uTime),vUv.y,1.0);}"
    })
  }
  const material=createMaterial()
  const plane=new THREE.Mesh(new THREE.PlaneGeometry(3,3,SEGMENTS,SEGMENTS),material)
  lab.scene.add(plane)
  /** @type {any} */ let texture; let paused=false, speedValue=SPEED, previous=0
  lab.label.textContent = messages.display001;
  lab.animate(time=>{const delta=previous?Math.min(time-previous,0.1):0;previous=time;if(!paused) material.uniforms.uTime.value+=delta*speedValue})
  return ()=>{texture?.dispose();lab.dispose()}
}
// 공통 장면 초기화: 아래 코드도 편집한 내용 그대로 실행됩니다.
function setup(THREE, OrbitControls, container, messages) {
  const scene = new THREE.Scene()
  scene.background = new THREE.Color('#edf2f7')
  const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 100)
  camera.position.set(4, 3, 6)
  const renderer = new THREE.WebGLRenderer({ antialias: true })
  renderer.domElement.setAttribute('aria-label', messages.display002)
  container.appendChild(renderer.domElement)
  renderer.debug.onShaderError = (gl, program, vertex, fragment) => {
    const message = [gl.getProgramInfoLog(program), gl.getShaderInfoLog(vertex), gl.getShaderInfoLog(fragment)].filter(Boolean).join('\n')
    window.dispatchEvent(new ErrorEvent('error', { error: new Error(message), message }))
  }
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
  label.style.cssText = 'position:absolute;top:12px;left:12px;right:12px;padding:10px;background:#ffffffdf;color:#142433;font:13px system-ui;pointer-events:auto;white-space:pre-wrap'
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
