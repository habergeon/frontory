// Requests and Stale Results
// Browser: real Svelte writable + DOM harness, NOT compiled Svelte components.
// Open App.svelte in a Svelte 5 project to execute runes, snippets, bindings, and transitions.
/** @param {any} context */
export function mount({ locale = 'ko', writable, container }) {
  const messages =
    locale === 'en'
      ? {
          display01: 'Requests and Stale Results',
          display02:
            'DOM/store harness — App.svelte is the actual compiler experiment.',
          display03: 'Request slow A',
          display04: 'Request fast B',
        }
      : {
          display01: '요청과 오래된 결과',
          display02:
            'DOM/store harness — App.svelte is the actual compiler experiment.',
          display03: 'Request slow A',
          display04: 'Request fast B',
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
  let timer
  function request(id) {
    clearTimeout(timer)
    show({ pending: id })
    timer = setTimeout(() => show({ result: id }), id === 'A' ? 800 : 100)
  }
  control(messages.display03, () => request('A'))
  control(messages.display04, () => request('B'))
  cleanups.push(() => clearTimeout(timer))
  request('A')
  return () => {
    cleanups.reverse().forEach((dispose) => dispose())
    container.replaceChildren()
  }
}
