// motion-step-07: Child Entrance Order
export function mount({ locale = 'ko', container, React, createRoot, Motion }) {
  const messages =
    locale === 'en'
      ? {
          display001: 'Child Entrance Order',
          display002: 'Orchestration / Stagger',
          display003: 'Toggle / replay',
        }
      : {
          display001: '자식 등장 순서',
          display002: 'Orchestration / Stagger',
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
          m.div,
          {
            key: count,
            initial: 'hidden',
            animate: 'visible',
            variants: {
              visible: { transition: { delayChildren: Motion.stagger(0.2) } },
            },
          },
          [1, 2, 3].map((i) =>
            h(
              m.div,
              {
                key: i,
                variants: {
                  hidden: { opacity: 0, y: 30 },
                  visible: { opacity: 1, y: 0 },
                },
                style: card,
              },
              String(i),
            ),
          ),
        ),
      ),
    )
  }
  root.render(h(App))
  return () => root.unmount()
}
