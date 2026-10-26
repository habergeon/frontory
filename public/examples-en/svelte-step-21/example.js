// Key Blocks and Draft Preservation
// Browser: real Svelte writable + DOM harness, NOT compiled Svelte components.
// Open App.svelte in a Svelte 5 project to execute runes, snippets, bindings, and transitions.
/** @param {any} context */
export function mount({ locale = 'ko', writable, container }) {
  const messages =
    locale === 'en'
      ? {
          display01: 'Key Blocks and Draft Preservation',
          display02:
            'DOM/store harness — App.svelte is the actual compiler experiment.',
          display03: 'Draft',
          display04: 'Switch unit and recreate local state',
        }
      : {
          display01: 'key 블록과 초안 보존',
          display02:
            'DOM/store harness — App.svelte is the actual compiler experiment.',
          display03: 'Draft',
          display04: 'Switch unit and recreate local state',
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
  let unit = 'A',
    edits = 0
  const drafts = { A: '', B: '' }
  const input = field(messages.display03, '', (value) => {
    drafts[unit] = value
    edits++
    show({ unit, drafts, localEdits: edits })
  })
  control(messages.display04, () => {
    unit = unit === 'A' ? 'B' : 'A'
    edits = 0
    input.value = drafts[unit]
    show({ unit, drafts, localEdits: edits })
  })
  return () => {
    cleanups.reverse().forEach((dispose) => dispose())
    container.replaceChildren()
  }
}
