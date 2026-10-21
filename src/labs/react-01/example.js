// React createElement는 JSX와 같은 요소 트리를 만듭니다. STEP과 상태 소유권을 실험하세요.
export function mount({ React, createRoot, container }) {
  const STEP = 1
  function Counter() {
    const [count, setCount] = React.useState(0)
    return React.createElement('section', null,
      React.createElement('h1', null, 'React state'),
      React.createElement('output', { 'aria-live': 'polite' }, 'count: ' + count),
      React.createElement('button', { onClick: () => setCount(previous => previous + STEP) }, '증가'))
  }
  const root = createRoot(container)
  root.render(React.createElement(Counter))
  return () => root.unmount()
}
