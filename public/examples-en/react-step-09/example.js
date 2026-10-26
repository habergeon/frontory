// Collecting Update Rules in a Reducer
// Executable React createElement equivalent of JSX. Edit the experiment below.
/** @param {any} context */
export function mount({ locale = 'ko', React, createRoot, container }) {
  const messages =
    locale === 'en'
      ? {
          display01: 'Experiment input',
          display02: 'Delete ',
          display03: 'Collecting Update Rules in a Reducer',
        }
      : {
          display01: 'Experiment input',
          display02: 'Delete ',
          display03: 'reducer로 변경 규칙 모으기',
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
    function reducer(state, action) {
      if (action.type === 'select') return { ...state, selectedId: action.id }
      if (action.type === 'delete')
        return {
          items: state.items.filter((item) => item.id !== action.id),
          selectedId: state.selectedId === action.id ? null : state.selectedId,
        }
      return state
    }
    const [state, dispatch] = React.useReducer(reducer, {
      items: fixture,
      selectedId: 1,
    })
    return h(
      'div',
      null,
      out({ selectedId: state.selectedId }),
      ...state.items.map((item) =>
        h(
          'div',
          { key: item.id },
          button(item.title, () => dispatch({ type: 'select', id: item.id })),
          button(messages.display02 + item.id, () =>
            dispatch({ type: 'delete', id: item.id }),
          ),
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
      h('h2', null, messages.display03),
      h(Experiment),
    ),
  )
  return () => root.unmount()
}
