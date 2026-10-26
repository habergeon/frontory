// Effect의 의존성과 정리
// Executable React createElement equivalent of JSX. Edit the experiment below.
/** @param {any} context */
export function mount({ locale = 'ko', React, createRoot, container }) {
  const messages =
    locale === 'en'
      ? {
          display01: 'Experiment input',
          display02: 'connect ',
          display03: 'disconnect ',
          display04: 'Channel ',
          display05: 'Effect Dependencies and Cleanup',
        }
      : {
          display01: 'Experiment input',
          display02: 'connect ',
          display03: 'disconnect ',
          display04: 'Channel ',
          display05: 'Effect의 의존성과 정리',
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
    const [channel, setChannel] = React.useState('A'),
      [log, setLog] = React.useState([])
    React.useEffect(() => {
      setLog((old) => [...old, messages.display02 + channel])
      return () => setLog((old) => [...old, messages.display03 + channel])
    }, [channel])
    return h(
      'div',
      null,
      button(messages.display04 + channel, () =>
        setChannel(channel === 'A' ? 'B' : 'A'),
      ),
      out(log),
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
