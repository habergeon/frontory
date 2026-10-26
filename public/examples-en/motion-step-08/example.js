// motion-step-08: Measuring Layout
export function mount({ locale = 'ko', container, React, createRoot, Motion }) {
  const messages =
    locale === 'en'
      ? {
          display001: 'Measuring Layout',
          display002: 'Layout / Transform interpolation',
          display003: 'Toggle / replay',
          display004: 'Measure layout',
        }
      : {
          display001: 'Layout 측정',
          display002: 'Layout / Transform 보간',
          display003: 'Toggle / replay',
          display004: 'Measure layout',
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
          m.div,
          {
            layout: true,
            style: { ...card, width: on ? 260 : 110, height: on ? 120 : 60 },
          },
          'Measure layout',
        ),
      ),
    )
  }
  root.render(h(App))
  return () => root.unmount()
}
