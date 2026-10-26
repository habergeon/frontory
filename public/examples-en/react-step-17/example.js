// Preserving State by Unit
// Executable React createElement equivalent of JSX. Edit the experiment below.
/** @param {any} context */
export function mount({ locale = 'ko', React, createRoot, container }) {
  const messages =
    locale === 'en'
      ? {
          display01: 'Experiment input',
          display02: 'Unit ',
          display03: 'Key ',
          display04: 'Preserving State by Unit',
        }
      : {
          display01: 'Experiment input',
          display02: 'Unit ',
          display03: 'Key ',
          display04: '단위별 상태 보존',
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
      [keyed, setKeyed] = React.useState(true)
    const Editor = React.useMemo(
      () =>
        function Editor({ text, onChange }) {
          const [edits, setEdits] = React.useState(0)
          return h(
            'div',
            null,
            input(text, (value) => {
              setEdits(edits + 1)
              onChange(value)
            }),
            out({ localEdits: edits }),
          )
        },
      [],
    )
    return h(
      'div',
      null,
      button(messages.display02 + unit, () =>
        setUnit(unit === 'A' ? 'B' : 'A'),
      ),
      button(messages.display03 + (keyed ? 'unitId' : 'fixed'), () =>
        setKeyed(!keyed),
      ),
      h(Editor, {
        key: keyed ? unit : 'fixed',
        text: drafts[unit],
        onChange: (text) => setDrafts({ ...drafts, [unit]: text }),
      }),
      out(drafts),
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
      h('h2', null, messages.display04),
      h(Experiment),
    ),
  )
  return () => root.unmount()
}
