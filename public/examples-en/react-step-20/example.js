// Transitions and Deferred Results
// Executable React createElement equivalent of JSX. Edit the experiment below.
/** @param {any} context */
export function mount({ locale = 'ko', React, createRoot, container }) {
  const messages =
    locale === 'en'
      ? {
          display01: 'Experiment input',
          display02: 'Deferred ',
          display03: 'Transitions and Deferred Results',
        }
      : {
          display01: 'Experiment input',
          display02: 'Deferred ',
          display03: '전환과 지연된 결과',
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
    const [query, setQuery] = React.useState(''),
      [defer, setDefer] = React.useState(true)
    const deferred = React.useDeferredValue(query),
      used = defer ? deferred : query
    const results = React.useMemo(
      () =>
        Array.from({ length: 1500 }, (_, i) => 'Lesson ' + i).filter((title) =>
          title.includes(used),
        ),
      [used],
    )
    return h(
      'div',
      null,
      input(query, setQuery),
      button(messages.display02 + defer, () => setDefer(!defer)),
      out({
        query,
        listQuery: used,
        stale: query !== used,
        total: results.length,
      }),
      h(
        'ul',
        {
          style: {
            maxHeight: 220,
            overflow: 'auto',
            opacity: query !== used ? 0.5 : 1,
          },
        },
        ...results.map((title) => h('li', { key: title }, title)),
      ),
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
      h('h2', null, messages.display03),
      h(Experiment),
    ),
  )
  return () => root.unmount()
}
