// motion-step-19: Reordering with Buttons
export function mount({ locale = 'ko', container, React, createRoot, Motion }) {
  const messages =
    locale === 'en'
      ? {
          display001: 'Reordering with Buttons',
          display002: 'Explicit order / Equivalent alternatives',
          display003: 'Toggle / replay',
        }
      : {
          display001: '버튼으로 재배치',
          display002: '명시적 순서 / 동등한 대안',
          display003: 'Toggle / replay',
        }
  const h = React.createElement,
    m = Motion.motion,
    root = createRoot(container)
  function App() {
    const [on, setOn] = React.useState(true),
      [count, setCount] = React.useState(0),
      [saved, setSaved] = React.useState('Persisted above child')
    const control = React.useRef(null),
      scrollRef = React.useRef(null),
      renders = React.useRef(0)
    renders.current++
    const x = Motion.useMotionValue(0),
      spring = Motion.useSpring(x, { stiffness: 90, damping: 15 }),
      derived = Motion.useTransform(x, [0, 200], [0.3, 1])
    const { scrollYProgress } = Motion.useScroll({})
    const reduce = Motion.useReducedMotion()
    const [scope, sequence] = Motion.useAnimate()
    const card = {
      padding: 18,
      margin: 8,
      width: 110,
      background: '#89dae4',
      borderRadius: 10,
    }
    React.useEffect(() => {
      return () => {}
    }, [])
    return h(
      'section',
      { style: { padding: 18, fontFamily: 'system-ui' } },
      h('h3', {}, messages.display001),
      h('p', {}, messages.display002),
      h(
        'button',
        {
          ref: control,
          onClick: () => {
            setOn((v) => !v)
            setCount((c) => c + 1)
          },
        },
        'Toggle / replay',
      ),
      h(
        'div',
        { style: { minHeight: 220, marginTop: 20 } },
        h(
          'div',
          {},
          (on ? ['C', 'A', 'B'] : ['A', 'B', 'C']).map((id) =>
            h(m.div, { layout: true, key: id, style: card }, id),
          ),
        ),
      ),
    )
  }
  root.render(h(App))
  return () => root.unmount()
}
