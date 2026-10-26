// 전환 중 수명 확인
// Browser: real Svelte writable + DOM harness, NOT compiled Svelte components.
// Open App.svelte in a Svelte 5 project to execute runes, snippets, bindings, and transitions.
/** @param {any} context */
export function mount({ locale = 'ko', writable, container }) {
  const messages =
    locale === 'en'
      ? {
          display01: 'Checking Lifetimes During Transitions',
          display02:
            'DOM/store harness — App.svelte is the actual compiler experiment.',
          display03: 'Persistent draft panel',
          display04: 'Duration 300 / 0ms',
          display05: 'Toggle transition',
          display06: 'Preserved draft',
        }
      : {
          display01: '전환 중 수명 확인',
          display02:
            'DOM/store harness — App.svelte is the actual compiler experiment.',
          display03: 'Persistent draft panel',
          display04: 'Duration 300 / 0ms',
          display05: 'Toggle transition',
          display06: 'Preserved draft',
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
  const panel = el('p')
  panel.textContent = messages.display03
  let duration = 300,
    visible = true
  control(messages.display04, () => {
    duration = duration ? 0 : 300
    show({ duration })
  })
  control(messages.display05, () => {
    visible = !visible
    panel.style.transition = 'opacity ' + duration + 'ms'
    panel.style.opacity = visible ? '1' : '0'
  })
  field(messages.display06, '', (value) => show({ draft: value, duration }))
  return () => {
    cleanups.reverse().forEach((dispose) => dispose())
    container.replaceChildren()
  }
}
