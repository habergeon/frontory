// Fast frame state lives in refs. React state changes only on pointer events.
export function mount({ locale = 'ko', React, createRoot, Fiber, container }) {
  const messages =
    locale === 'en'
      ? {
          display01: 'none',
          display02: 'Selected ',
          display03: ' · hover ',
          display04: ' · click overlap: stopPropagation',
        }
      : {
          display01: 'none',
          display02: 'Selected ',
          display03: ' · hover ',
          display04: ' · click overlap: stopPropagation',
        }
  const h = React.createElement
  function App() {
    const [selected, setSelected] = React.useState(-1)
    const [hover, setHover] = React.useState(-1)
    return h(
      React.Fragment,
      null,
      h(
        'p',
        { role: 'status' },
        `${messages.display02}${selected < 0 ? messages.display01 : selected + 1}${messages.display03}${hover < 0 ? messages.display01 : hover + 1}${messages.display04}`,
      ),
      h(
        'div',
        { style: { height: '80%' } },
        h(
          Fiber.Canvas,
          { camera: { position: [0, 1, 6] } },
          h('ambientLight', { intensity: 2 }),
          h('directionalLight', { position: [3, 4, 5], intensity: 3 }),
          [0, 1, 2].map((i) =>
            h(Cube, {
              key: i,
              index: i,
              selected: selected === i,
              hovered: hover === i,
              onSelect: setSelected,
              onHover: setHover,
            }),
          ),
        ),
      ),
    )
  }
  function Cube({ index, selected, hovered, onSelect, onHover }) {
    const mesh = React.useRef(null)
    Fiber.useFrame((_, delta) => {
      if (mesh.current) {
        mesh.current.rotation.x += delta * 0.25
        mesh.current.rotation.y += delta * 0.6
      }
    })
    return h(
      'mesh',
      {
        ref: mesh,
        position: [(index - 1) * 1.45, 0, index * 0.2],
        scale: selected ? 1.15 : 1,
        onClick: (e) => {
          e.stopPropagation()
          onSelect(index)
        },
        onPointerOver: (e) => {
          e.stopPropagation()
          onHover(index)
        },
        onPointerOut: () => onHover(-1),
      },
      h('boxGeometry'),
      h('meshStandardMaterial', {
        color: selected ? '#e97645' : hovered ? '#26836c' : '#3179bf',
      }),
    )
  }
  const root = createRoot(container)
  root.render(h(App))
  return () => root.unmount()
}
