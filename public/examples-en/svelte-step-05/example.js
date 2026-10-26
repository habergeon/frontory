// Conditional Blocks and Empty States
// Browser: real Svelte writable + DOM harness, NOT compiled Svelte components.
// Open App.svelte in a Svelte 5 project to execute runes, snippets, bindings, and transitions.
/** @param {any} context */
export function mount({ locale = 'ko', writable, container }) {
  const messages =
    locale === 'en'
      ? {
          display01: 'Conditional Blocks and Empty States',
          display02:
            'DOM/store harness — App.svelte is the actual compiler experiment.',
          display03: 'No matches. Reset query to restore.',
          display04: 'Query',
          display05: 'Reset',
        }
      : {
          display01: '조건 블록과 빈 화면',
          display02:
            'DOM/store harness — App.svelte is the actual compiler experiment.',
          display03: 'No matches. Reset query to restore.',
          display04: 'Query',
          display05: 'Reset',
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
  function render(q) {
    list.replaceChildren()
    const matches = ['State', 'Effects', 'Canvas'].filter((v) => v.includes(q))
    if (matches.length)
      matches.forEach((v) => {
        const p = document.createElement('p')
        p.textContent = v
        list.append(p)
      })
    else list.textContent = messages.display03
  }
  const query = field(messages.display04, '', render)
  control(messages.display05, () => {
    query.value = ''
    render('')
  })
  render('')
  return () => {
    cleanups.reverse().forEach((dispose) => dispose())
    container.replaceChildren()
  }
}
