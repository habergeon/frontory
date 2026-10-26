// Passing Settings with Context
// Executable React createElement equivalent of JSX. Edit the experiment below.
/** @param {any} context */
export function mount({ locale = 'ko', React, createRoot, container }) {
  const messages =
    locale === 'en'
      ? {
          display01: 'Experiment input',
          display02: 'Theme',
          display03: 'Value: ',
          display04: 'new object',
          display05: 'Parent render ',
          display06: 'Passing Settings with Context',
        }
      : {
          display01: 'Experiment input',
          display02: 'Theme',
          display03: 'Value: ',
          display04: 'new object',
          display05: 'Parent render ',
          display06: 'Context로 설정 전달하기',
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
    const Context = React.useMemo(() => React.createContext('light'), [])
    const [theme, setTheme] = React.useState('light'),
      [fresh, setFresh] = React.useState(false),
      [tick, setTick] = React.useState(0)
    const Consumer = React.useMemo(
      () =>
        React.memo(function Consumer() {
          const value = React.useContext(Context)
          const renders = React.useRef(0)
          return out({ theme: value, renders: ++renders.current })
        }),
      [Context],
    )
    return h(
      Context.Provider,
      { value: fresh ? { theme } : theme },
      button(messages.display02, () =>
        setTheme(theme === 'light' ? 'dark' : 'light'),
      ),
      button(messages.display03 + (fresh ? messages.display04 : 'string'), () =>
        setFresh(!fresh),
      ),
      button(messages.display05 + tick, () => setTick(tick + 1)),
      h(Consumer),
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
      h('h2', null, messages.display06),
      h(Experiment),
    ),
  )
  return () => root.unmount()
}
