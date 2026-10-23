// Edit position in vertexShader and the color in fragmentShader directly.
export function mount({locale='ko', THREE, OrbitControls, container }) {
  const messages=locale==='en'?{}:{};
  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 100); camera.position.z = 3
  const renderer = new THREE.WebGLRenderer(); container.append(renderer.domElement)
  const geometry = new THREE.PlaneGeometry(2, 2, 24, 24)
  const material = new THREE.ShaderMaterial({
    vertexShader: `varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }`,
    fragmentShader: `varying vec2 vUv; void main(){ gl_FragColor = vec4(vUv.x, vUv.y, 0.5, 1.0); }`
  })
  scene.add(new THREE.Mesh(geometry, material))
  const resize = () => { const w = container.clientWidth, h = container.clientHeight; if (!w || !h) return; renderer.setSize(w,h,false); camera.aspect=w/h; camera.updateProjectionMatrix(); renderer.render(scene,camera) }
  const observer = new ResizeObserver(resize); observer.observe(container); resize()
  return () => { observer.disconnect(); geometry.dispose(); material.dispose(); renderer.dispose(); renderer.forceContextLoss(); container.replaceChildren() }
}
