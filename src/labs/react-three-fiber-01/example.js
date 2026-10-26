// 실제 React Three Fiber Canvas입니다. props로 장면을 선언하고 클릭으로 상태를 변경합니다.
export function mount({ locale = 'ko', React, createRoot, Fiber, container }) {
  const messages = locale === 'en' ? {} : {}
  const h = React.createElement
  function Cube() {
    const ref = React.useRef()
    const [active, setActive] = React.useState(false)
    Fiber.useFrame((_state, delta) => {
      if (ref.current) ref.current.rotation.y += delta * 0.5
    })
    return h(
      'mesh',
      {
        ref,
        onClick: () => setActive((value) => !value),
        scale: active ? 1.4 : 1,
      },
      h('boxGeometry'),
      h('meshStandardMaterial', { color: active ? '#e97645' : '#3179bf' }),
    )
  }
  const root = createRoot(container)
  root.render(
    h(
      Fiber.Canvas,
      { camera: { position: [3, 2, 5] }, dpr: [1, 2] },
      h('ambientLight', { intensity: 1.5 }),
      h('directionalLight', { position: [3, 5, 4], intensity: 3 }),
      h(Cube),
    ),
  )
  return () => root.unmount()
}
