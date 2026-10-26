// React createElement builds the same element tree as JSX. Experiment with STEP and state ownership.
export function mount({ locale = 'ko', React, createRoot, container }) {
  const messages =
    locale === 'en'
      ? {
          display01: 'React state',
          display02: 'count: ',
          display03: 'Increment',
        }
      : { display01: 'React state', display02: 'count: ', display03: '증가' }
  const STEP = 1
  function Counter() {
    const [count, setCount] = React.useState(0)
    return React.createElement(
      'section',
      null,
      React.createElement('h1', null, messages.display01),
      React.createElement(
        'output',
        { 'aria-live': 'polite' },
        messages.display02 + count,
      ),
      React.createElement(
        'button',
        { onClick: () => setCount((previous) => previous + STEP) },
        messages.display03,
      ),
    )
  }
  const root = createRoot(container)
  root.render(React.createElement(Counter))
  return () => root.unmount()
}
