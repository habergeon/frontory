// await 블록과 상태 안내
// Browser: real Svelte writable + DOM harness, NOT compiled Svelte components.
// Open App.svelte in a Svelte 5 project to execute runes, snippets, bindings, and transitions.
/** @param {any} context */
export function mount({ locale = 'ko', writable, container }) {
  const messages =
    locale === 'en'
      ? {
          display01: 'Await Blocks and State Guidance',
          display02:
            'DOM/store harness — App.svelte is the actual compiler experiment.',
          display03: 'Loading',
          display04: 'Request failed; retry available',
          display05: 'Fail request',
          display06: 'Retry success',
        }
      : {
          display01: 'await 블록과 상태 안내',
          display02:
            'DOM/store harness — App.svelte is the actual compiler experiment.',
          display03: 'Loading',
          display04: 'Request failed; retry available',
          display05: 'Fail request',
          display06: 'Retry success',
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
  function request(fail) {
    clearTimeout(timer)
    show(messages.display03)
    timer = setTimeout(
      () =>
        show(
          fail ? { error: messages.display04 } : { items: ['State', 'Canvas'] },
        ),
      400,
    )
  }
  control(messages.display05, () => request(true))
  control(messages.display06, () => request(false))
  cleanups.push(() => clearTimeout(timer))
  request(false)
  return () => {
    cleanups.reverse().forEach((dispose) => dispose())
    container.replaceChildren()
  }
}
