// 통합 편집기와 자원 감사
// Executable React createElement equivalent of JSX. Edit the experiment below.
/** @param {any} context */
export function mount({ locale = 'ko', React, createRoot, container }) {
  const messages =
    locale === 'en'
      ? {
          display01: 'Experiment input',
          display02: 'mount ',
          display03: ' live',
          display04: 'Switch ',
          display05: 'Integrated Editor and Resource Audit',
        }
      : {
          display01: 'Experiment input',
          display02: 'mount ',
          display03: ' live',
          display04: 'Switch ',
          display05: '통합 편집기와 자원 감사',
        }
  const h = React.createElement
  const button = (label, onClick) =>
    h('button', { type: 'button', onClick, style: { margin: 4 } }, label)
  const input = (value, onChange) =>
    h('input', {
      value,
      onChange: (event) => onChange(event.target.value),
      'aria-label': messages.display01,
    })
  const out = (value) =>
    h(
      'pre',
      null,
      typeof value === 'string' ? value : JSON.stringify(value, null, 2),
    )
  const fixture = [
    { id: 1, title: 'State', done: false },
    { id: 2, title: 'Effects', done: false },
    { id: 3, title: 'Canvas', done: false },
  ]
  function Experiment() {
    const [unit, setUnit] = React.useState('A'),
      [drafts, setDrafts] = React.useState({ A: '', B: '' }),
      [audit, setAudit] = React.useState([])
    const live = React.useRef(0)
    React.useEffect(() => {
      live.current++
      setAudit((old) => [
        ...old,
        messages.display02 + unit + ': ' + live.current + messages.display03,
      ])
      const timer = setInterval(() => {}, 1000)
      return () => {
        clearInterval(timer)
        live.current--
      }
    }, [unit])
    return h(
      'div',
      null,
      button(messages.display04 + unit, () =>
        setUnit(unit === 'A' ? 'B' : 'A'),
      ),
      input(drafts[unit], (text) => setDrafts({ ...drafts, [unit]: text })),
      out({ drafts, activeResources: live.current, audit }),
    )
  }
  const root = createRoot(container)
  root.render(
    h(
      'section',
      {
        style: {
          padding: 16,
          color: '#172033',
          background: '#f6f8fc',
          minHeight: '100%',
        },
      },
      h('h2', null, messages.display05),
      h(Experiment),
    ),
  )
  return () => root.unmount()
}
