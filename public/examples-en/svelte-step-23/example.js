// Style Scope and Accessibility
// Browser: real Svelte writable + DOM harness, NOT compiled Svelte components.
// Open App.svelte in a Svelte 5 project to execute runes, snippets, bindings, and transitions.
/** @param {any} context */
export function mount({ locale = 'ko', writable, container }) {
  const messages =
    locale === 'en'
      ? {
          display01: 'Style Scope and Accessibility',
          display02:
            'DOM/store harness — App.svelte is the actual compiler experiment.',
          display03: 'Select card with mouse, Space, or Enter',
        }
      : {
          display01: '스타일 범위와 접근성',
          display02:
            'DOM/store harness — App.svelte is the actual compiler experiment.',
          display03: 'Select card with mouse, Space, or Enter',
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
  let selected = false
  const b = control(messages.display03, () => {
    selected = !selected
    b.setAttribute('aria-pressed', String(selected))
    b.style.background = selected ? '#9bdfff' : ''
    show({ selected })
  })
  b.setAttribute('aria-pressed', 'false')
  return () => {
    cleanups.reverse().forEach((dispose) => dispose())
    container.replaceChildren()
  }
}
