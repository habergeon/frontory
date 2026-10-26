// $state 객체의 변경 경로
// Browser: real Svelte writable + DOM harness, NOT compiled Svelte components.
// Open App.svelte in a Svelte 5 project to execute runes, snippets, bindings, and transitions.
/** @param {any} context */
export function mount({ locale = 'ko', writable, container }) {
  const messages =
    locale === 'en'
      ? {
          display01: 'Update Paths in $state Objects',
          display02:
            'DOM/store harness — App.svelte is the actual compiler experiment.',
          display03: 'Toggle done',
        }
      : {
          display01: '$state 객체의 변경 경로',
          display02:
            'DOM/store harness — App.svelte is the actual compiler experiment.',
          display03: 'Toggle done',
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
  const state = writable({ done: false })
  const detached = false
  cleanups.push(
    state.subscribe((value) => show({ detached, derived: value.done })),
  )
  control(messages.display03, () =>
    state.update((value) => ({ ...value, done: !value.done })),
  )
  return () => {
    cleanups.reverse().forEach((dispose) => dispose())
    container.replaceChildren()
  }
}
