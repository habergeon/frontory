export function mount({locale='ko', React, createRoot, THREE, container }) {
  const messages=locale==='en'?{"display01":"Created: renderer / RAF / ResizeObserver / pointer","display02":"Cleaned up: RAF / observer / listener / geometry / material / renderer","display03":"A Three.js scene owned by an Effect","display04":"Hiding the scene or changing its key runs cleanup. Move the pointer to tilt the cube.","display05":"Hide scene","display06":"Show scene","display07":"Remount","display08":"Generation "}:{"display01":"생성: renderer / RAF / ResizeObserver / pointer","display02":"정리: RAF / observer / listener / geometry / material / renderer","display03":"Effect가 소유하는 Three.js 장면","display04":"장면을 숨기거나 key를 바꾸면 cleanup이 실행됩니다. pointer 이동으로 큐브를 기울이세요.","display05":"장면 숨기기","display06":"장면 표시","display07":"재마운트","display08":"세대 "};
  const h = React.createElement
  function Scene({ report }) {
    const host = React.useRef(null)
    React.useEffect(() => {
      const scene = new THREE.Scene(), camera = new THREE.PerspectiveCamera(50, 1, 0.1, 100)
      camera.position.z = 4
      const renderer = new THREE.WebGLRenderer({ antialias: true })
      const geometry = new THREE.BoxGeometry(), material = new THREE.MeshNormalMaterial()
      const cube = new THREE.Mesh(geometry, material); scene.add(cube); host.current.append(renderer.domElement)
      renderer.setPixelRatio(Math.min(devicePixelRatio, 2))
      let frame = 0, resizeFrame = 0, stopped = false
      renderer.domElement.style.height = '220px'
      const size = () => {
        const width = host.current?.clientWidth || 320
        renderer.setSize(width, 220, false); camera.aspect = width / 220; camera.updateProjectionMatrix()
      }
      size()
      const resize = new ResizeObserver(() => {
        cancelAnimationFrame(resizeFrame)
        resizeFrame = requestAnimationFrame(() => { if (!stopped) size() })
      }); resize.observe(host.current)
      const pointer = event => { cube.rotation.x = event.offsetY / 100 }
      renderer.domElement.addEventListener('pointermove', pointer)
      function draw(time) { if (stopped) return; cube.rotation.y = time / 1200; renderer.render(scene, camera); frame = requestAnimationFrame(draw) }
      frame = requestAnimationFrame(draw); report(messages.display01)
      return () => {
        stopped = true; cancelAnimationFrame(frame); cancelAnimationFrame(resizeFrame); resize.disconnect()
        renderer.domElement.removeEventListener('pointermove', pointer)
        geometry.dispose(); material.dispose(); renderer.dispose(); renderer.forceContextLoss(); renderer.domElement.remove()
        report(messages.display02)
      }
    }, [report])
    return h('div', { ref: host, style: { width: '100%', minHeight: 220 } })
  }
  function App() {
    const [visible, setVisible] = React.useState(true), [generation, setGeneration] = React.useState(1)
    const [logs, setLogs] = React.useState([])
    const report = React.useCallback(message => setLogs(previous => [message, ...previous].slice(0, 8)), [])
    return h('section', null, h('h2', null, messages.display03),
      h('p', null, messages.display04),
      h('button', { onClick: () => setVisible(value => !value) }, visible ? messages.display05 : messages.display06),
      h('button', { onClick: () => { setVisible(true); setGeneration(value => value + 1) } }, messages.display07),
      h('p', null, `${messages.display08}${generation}`), visible && h(Scene, { key: generation, report }), h('pre', null, logs.join('\n')))
  }
  const root = createRoot(container); root.render(h(App)); return () => root.unmount()
}
