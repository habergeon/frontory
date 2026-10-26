// Motion JS animate + FLIP. Stable data IDs preserve the actual input DOM nodes.
export function mount({ locale = 'ko', animate, container }) {
  const messages =
    locale === 'en'
      ? {
          display001:
            '<p>Motion JS · stable IDs + layout FLIP + delayed exit removal</p><button>Reverse order</button><div data-list></div><p role="status"></p>',
          display002: 'ID ',
          display003: ': ',
          display004: 'Delete',
          display005: ' logically removed; DOM stays until exit finishes.',
          display006: ' DOM removed. ',
          display007: ' active cards.',
          display008:
            'Reversed by stable ID: typed notes stay with their cards.',
          displayFix1001: 'Read',
          displayFix1002: 'Experiment',
          displayFix1003: 'Explain',
          displayFix1004: 'Review',
          displayFix1005: ' notes',
        }
      : {
          display001:
            '<p>Motion JS · stable IDs + layout FLIP + delayed exit removal</p><button>Reverse order</button><div data-list></div><p role="status"></p>',
          display002: 'ID ',
          display003: ': ',
          display004: 'Delete',
          display005: ' logically removed; DOM stays until exit finishes.',
          display006: ' DOM removed. ',
          display007: ' active cards.',
          display008:
            'Reversed by stable ID: typed notes stay with their cards.',
          displayFix1001: 'Read',
          displayFix1002: 'Experiment',
          displayFix1003: 'Explain',
          displayFix1004: 'Review',
          displayFix1005: ' notes',
        }
  const root = document.createElement('div')
  root.innerHTML =
    '<p>Motion JS · stable IDs + layout FLIP + delayed exit removal</p><button>Reverse order</button><div data-list></div><p role="status"></p>'
  container.append(root)
  const list = root.querySelector('[data-list]'),
    status = root.querySelector('[role=status]'),
    reverse = root.querySelector('button'),
    preference = matchMedia('(prefers-reduced-motion: reduce)')
  let items = [],
    alive = true
  const animations = new Map(),
    exiting = new Set()
  const move = () => {
    const before = new Map(
      items.map((item) => [item.id, item.node.getBoundingClientRect().top]),
    )
    items.forEach((item) => list.append(item.node))
    items.forEach((item) => {
      const dy = before.get(item.id) - item.node.getBoundingClientRect().top
      animations.get(item.id)?.stop()
      animations.set(
        item.id,
        animate(
          item.node,
          { y: [preference.matches ? 0 : dy, 0] },
          { duration: preference.matches ? 0 : 0.35 },
        ),
      )
    })
  }
  ;['Read', 'Experiment', 'Explain', 'Review'].forEach((name, i) => {
    const node = document.createElement('div')
    node.style.cssText =
      'padding:14px;margin:8px 0;background:#edf2f7;border-radius:8px;display:flex;gap:8px'
    const label = document.createElement('label')
    label.textContent = `ID ${i}: ${name} `
    const input = document.createElement('input')
    input.value = `notes for ${name}`
    input.setAttribute('aria-label', `${name} notes`)
    label.append(input)
    const remove = document.createElement('button')
    remove.textContent = 'Delete'
    node.append(label, remove)
    const item = { id: i, node }
    items.push(item)
    list.append(node)
    remove.onclick = () => {
      if (exiting.has(i)) return
      exiting.add(i)
      remove.disabled = true
      status.textContent = `ID ${i} logically removed; DOM stays until exit finishes.`
      items = items.filter((x) => x.id !== i)
      animations.get(i)?.stop()
      const animation = animate(
        node,
        { opacity: 0, x: preference.matches ? 0 : 40 },
        { duration: preference.matches ? 0 : 0.4 },
      )
      animations.set(i, animation)
      animation.then(() => {
        if (!alive) return
        const before = new Map(
          items.map((x) => [x.id, x.node.getBoundingClientRect().top]),
        )
        node.remove()
        items.forEach((x) => {
          animations.get(x.id)?.stop()
          animations.set(
            x.id,
            animate(
              x.node,
              {
                y: [
                  preference.matches
                    ? 0
                    : before.get(x.id) - x.node.getBoundingClientRect().top,
                  0,
                ],
              },
              { duration: preference.matches ? 0 : 0.3 },
            ),
          )
        })
        status.textContent = `ID ${i} DOM removed. ${items.length} active cards.`
      })
    }
  })
  reverse.onclick = () => {
    items.reverse()
    move()
    status.textContent =
      'Reversed by stable ID: typed notes stay with their cards.'
  }
  return () => {
    alive = false
    animations.forEach((a) => a.stop())
    root.remove()
  }
}
