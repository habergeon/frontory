// 초안 저장과 복원
// Browser: real Svelte writable + DOM harness, NOT compiled Svelte components.
// Open App.svelte in a Svelte 5 project to execute runes, snippets, bindings, and transitions.
/** @param {any} context */
export function mount({ locale = 'ko', writable, container }) {
  const messages =
    locale === 'en'
      ? {
          display01: 'Saving and Restoring Drafts',
          display02:
            'DOM/store harness — App.svelte is the actual compiler experiment.',
          display03: 'Serialized draft',
          display04: 'Restore',
          display05: 'Invalid storage; recovered empty draft',
        }
      : {
          display01: '초안 저장과 복원',
          display02:
            'DOM/store harness — App.svelte is the actual compiler experiment.',
          display03: 'Serialized draft',
          display04: 'Restore',
          display05: 'Invalid storage; recovered empty draft',
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
  let raw = JSON.stringify({ A: 'Saved draft' })
  field(messages.display03, raw, (v) => (raw = v))
  control(messages.display04, () => {
    try {
      const data = JSON.parse(raw)
      if (typeof data.A !== 'string') throw Error('Expected string A')
      show(data)
    } catch {
      show({ A: '', error: messages.display05 })
    }
  })
  return () => {
    cleanups.reverse().forEach((dispose) => dispose())
    container.replaceChildren()
  }
}
