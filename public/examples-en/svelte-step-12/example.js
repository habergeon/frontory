// $effect Dependencies and Cleanup
// Browser: real Svelte writable + DOM harness, NOT compiled Svelte components.
// Open App.svelte in a Svelte 5 project to execute runes, snippets, bindings, and transitions.
/** @param {any} context */
export function mount({ locale = 'ko', writable, container }) {
  const messages =
    locale === 'en'
      ? {
          display01: '$effect Dependencies and Cleanup',
          display02:
            'DOM/store harness — App.svelte is the actual compiler experiment.',
          display03: 'Period 100 / 500ms',
        }
      : {
          display01: '$effect 의존성과 해제',
          display02:
            'DOM/store harness — App.svelte is the actual compiler experiment.',
          display03: 'Period 100 / 500ms',
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
  let period = 100,
    ticks = 0,
    timer
  function restart() {
    clearInterval(timer)
    timer = setInterval(
      () => show({ period, ticks: ++ticks, activeTimers: 1 }),
      period,
    )
  }
  control(messages.display03, () => {
    period = period === 100 ? 500 : 100
    restart()
  })
  restart()
  cleanups.push(() => clearInterval(timer))
  return () => {
    cleanups.reverse().forEach((dispose) => dispose())
    container.replaceChildren()
  }
}
