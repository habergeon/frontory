// 구독 저장소와 스냅샷
// Executable React createElement equivalent of JSX. Edit the experiment below.
/** @param {any} context */
export function mount({ locale = 'ko', React, createRoot, container }) {
  const messages =
    locale === 'en'
      ? {
          display01: 'Experiment input',
          display02: 'Read twice',
          display03: 'Same reference: ',
          display04:
            'A new object on every read violates the API contract and may loop. Compare identity safely before subscribing.',
          display05: 'Subscription Stores and Snapshots',
        }
      : {
          display01: 'Experiment input',
          display02: 'Read twice',
          display03: 'Same reference: ',
          display04:
            'A new object on every read violates the API contract and may loop. Compare identity safely before subscribing.',
          display05: '구독 저장소와 스냅샷',
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
    const store = React.useMemo(() => {
      let snapshot = { text: 'Stable snapshot' }
      const listeners = new Set()
      return {
        getSnapshot: () => snapshot,
        subscribe: (listener) => {
          listeners.add(listener)
          return () => listeners.delete(listener)
        },
        set: (text) => {
          snapshot = { text }
          listeners.forEach((listener) => listener())
        },
      }
    }, [])
    const value = React.useSyncExternalStore(store.subscribe, store.getSnapshot)
    const [audit, setAudit] = React.useState('')
    return h(
      'div',
      null,
      input(value.text, store.set),
      button(messages.display02, () =>
        setAudit(
          messages.display03 + (store.getSnapshot() === store.getSnapshot()),
        ),
      ),
      out(audit),
      h('p', null, messages.display04),
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
