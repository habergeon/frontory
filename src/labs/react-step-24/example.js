// 이벤트 경계와 접근 가능한 선택
// Executable React createElement equivalent of JSX. Edit the experiment below.
/** @param {any} context */
export function mount({ locale = 'ko', React, createRoot, container }) {
  const messages =
    locale === 'en'
      ? {
          display01: 'Experiment input',
          display02: 'Select ',
          display03: 'select ',
          display04: 'Delete ',
          display05: 'delete ',
          display06: 'Event Boundaries and Accessible Selection',
        }
      : {
          display01: 'Experiment input',
          display02: 'Select ',
          display03: 'select ',
          display04: 'Delete ',
          display05: 'delete ',
          display06: '이벤트 경계와 접근 가능한 선택',
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
      [selected, setSelected] = React.useState(null),
      [log, setLog] = React.useState([])
    return h(
      'div',
      null,
      out({ selected, log }),
      ...items.map((item) =>
        h(
          'div',
          { key: item.id },
          button(messages.display02 + item.title, () => {
            setSelected(item.id)
            setLog([...log, messages.display03 + item.id])
          }),
          button(messages.display04 + item.title, () => {
            setItems(items.filter((row) => row.id !== item.id))
            setLog([...log, messages.display05 + item.id])
          }),
        ),
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
      h('h2', null, messages.display06),
      h(Experiment),
    ),
  )
  return () => root.unmount()
}
