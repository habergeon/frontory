// Calculating Filters with $derived
// Browser: real Svelte writable + DOM harness, NOT compiled Svelte components.
// Open App.svelte in a Svelte 5 project to execute runes, snippets, bindings, and transitions.
/** @param {any} context */
export function mount({ locale = 'ko', writable, container }) {
  const messages =
    locale === 'en'
      ? {
          display01: 'Calculating Filters with $derived',
          display02:
            'DOM/store harness — App.svelte is the actual compiler experiment.',
          display03: 'Query',
        }
      : {
          display01: '$derived로 필터 계산하기',
          display02:
            'DOM/store harness — App.svelte is the actual compiler experiment.',
          display03: 'Query',
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
  const items = ['State', 'Effects', 'Canvas']
  field(messages.display03, '', (value) =>
    show({
      matches: items.filter((item) =>
        item.toLowerCase().includes(value.toLowerCase()),
      ),
      original: items,
    }),
  )
  show(items)
  return () => {
    cleanups.reverse().forEach((dispose) => dispose())
    container.replaceChildren()
  }
}
