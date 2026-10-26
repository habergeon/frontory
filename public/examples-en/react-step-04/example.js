// Updating Objects and Arrays
// Executable React createElement equivalent of JSX. Edit the experiment below.
/** @param {any} context */
export function mount({ locale = 'ko', React, createRoot, container }) {
  const messages =
    locale === 'en'
      ? {
          display01: 'Experiment input',
          display02: 'Choose a target',
          display03: 'Updating Objects and Arrays',
        }
      : {
          display01: 'Experiment input',
          display02: 'Choose a target',
          display03: '객체와 배열 갱신',
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
    const [items, setItems] = React.useState(fixture),
      [audit, setAudit] = React.useState(messages.display02)
    function toggle(id) {
      const next = items.map((item) =>
        item.id === id ? { ...item, done: !item.done } : item,
      )
      setAudit(
        JSON.stringify(
          items.map((old, i) => ({
            id: old.id,
            sameReference: old === next[i],
            oldDone: old.done,
            newDone: next[i].done,
          })),
        ),
      )
      setItems(next)
    }
    return h(
      'div',
      null,
      ...items.map((item) =>
        button(item.title + ': ' + item.done, () => toggle(item.id)),
      ),
      out(audit),
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
