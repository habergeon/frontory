// Observing Compilation Output and Performance
// Browser: real Svelte writable + DOM harness, NOT compiled Svelte components.
// Open App.svelte in a Svelte 5 project to execute runes, snippets, bindings, and transitions.
/** @param {any} context */
export function mount({ locale = 'ko', writable, container }) {
  const messages =
    locale === 'en'
      ? {
          display01: 'Observing Compilation Output and Performance',
          display02:
            'DOM/store harness — App.svelte is the actual compiler experiment.',
          display03: 'Card ',
          display04: 'DOM harness timing, not compiled Svelte timing',
          display05: '100 / 1000 cards',
        }
      : {
          display01: '컴파일 결과와 성능 관찰',
          display02:
            'DOM/store harness — App.svelte is the actual compiler experiment.',
          display03: 'Card ',
          display04: 'DOM harness timing, not compiled Svelte timing',
          display05: '100 / 1000 cards',
        }
  const cleanups = []
  /** @returns {any} */ function el(tag) {
    const node = document.createElement(tag)
    container.append(node)
    return node
  }
  el('h2').textContent = messages.display01
  el('p').textContent = messages.display02
  const report = el('pre')
  const show = (value) => (report.textContent = JSON.stringify(value, null, 2))
  function control(label, handler) {
    const b = el('button')
    b.textContent = label
    b.type = 'button'
    b.onclick = handler
    return b
  }
  function field(label, value, change) {
    const node = el('input')
    node.setAttribute('aria-label', label)
    node.placeholder = label
    node.value = value
    node.oninput = () => change(node.value)
    return node
  }
  const list = el('div')
  let count = 100
  function measure() {
    const start = performance.now()
    const fragment = document.createDocumentFragment()
    for (let i = 0; i < count; i++) {
      const p = document.createElement('p')
      p.textContent = messages.display03 + i
      fragment.append(p)
    }
    list.replaceChildren(fragment)
    show({
      count,
      domBuildMs: performance.now() - start,
      note: messages.display04,
    })
  }
  control(messages.display05, () => {
    count = count === 100 ? 1000 : 100
    measure()
  })
  measure()
  return () => {
    cleanups.reverse().forEach((dispose) => dispose())
    container.replaceChildren()
  }
}
