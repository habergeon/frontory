// Motion JS gesture feedback; drag and native buttons call the same reorder action.
export function mount({ locale = 'ko', animate, container }) {
  const messages =
    locale === 'en'
      ? {
          display001:
            '<p>Drag a card at least 40px vertically, or use Up/Down buttons.</p><div></div><p role="status"></p>',
          display002: ' → ',
          display003: 'Order: ',
          display004: '. ',
          display005: ' is position ',
          display006: '.',
          display007: '↑ Up',
          display008: '↓ Down',
          display009: 'Order: Observe → Predict → Test',
          displayFix1001: 'Observe',
          displayFix1002: 'Predict',
          displayFix1003: 'Test',
          displayFix1004: 'Move ',
          displayFix1005: ' up',
          displayFix1006: ' down',
        }
      : {
          display001:
            '<p>Drag a card at least 40px vertically, or use Up/Down buttons.</p><div></div><p role="status"></p>',
          display002: ' → ',
          display003: 'Order: ',
          display004: '. ',
          display005: ' is position ',
          display006: '.',
          display007: '↑ Up',
          display008: '↓ Down',
          display009: 'Order: Observe → Predict → Test',
          displayFix1001: 'Observe',
          displayFix1002: 'Predict',
          displayFix1003: 'Test',
          displayFix1004: 'Move ',
          displayFix1005: ' up',
          displayFix1006: ' down',
        }
  const root = document.createElement('div')
  root.innerHTML =
    '<p>Drag a card at least 40px vertically, or use Up/Down buttons.</p><div></div><p role="status"></p>'
  container.append(root)
  const list = root.querySelector('div'),
    status = root.querySelector('[role=status]'),
    preference = matchMedia('(prefers-reduced-motion: reduce)')
  let items = [],
    drag = null
  const animations = new Map()
  const reorder = (id, direction) => {
    const index = items.findIndex((x) => x.id === id),
      target = Math.max(0, Math.min(items.length - 1, index + direction))
    const before = new Map(
      items.map((x) => [x.id, x.node.getBoundingClientRect().top]),
    )
    const [item] = items.splice(index, 1)
    items.splice(target, 0, item)
    items.forEach((x) => list.append(x.node))
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
            scale: 1,
          },
          { duration: preference.matches ? 0 : 0.25 },
        ),
      )
    })
    status.textContent = `Order: ${items.map((x) => x.name).join(' → ')}. ${item.name} is position ${target + 1}.`
  }
  ;['Observe', 'Predict', 'Test'].forEach((name, id) => {
    const node = document.createElement('div')
    node.style.cssText =
      'padding:22px;margin:10px;background:#edf2f7;border-radius:10px;touch-action:none'
    const label = document.createElement('strong')
    label.textContent = name + ' '
    const up = document.createElement('button'),
      down = document.createElement('button')
    up.textContent = '↑ Up'
    down.textContent = '↓ Down'
    up.setAttribute('aria-label', `Move ${name} up`)
    down.setAttribute('aria-label', `Move ${name} down`)
    node.append(label, up, down)
    list.append(node)
    items.push({ id, name, node })
    up.onclick = () => reorder(id, -1)
    down.onclick = () => reorder(id, 1)
    node.onpointerdown = (e) => {
      if (e.target instanceof HTMLButtonElement) return
      drag = { id, y: e.clientY, pointer: e.pointerId }
      node.setPointerCapture(e.pointerId)
      animations.get(id)?.stop()
      animations.set(
        id,
        animate(
          node,
          { scale: preference.matches ? 1 : 1.03 },
          { duration: 0.1 },
        ),
      )
    }
    node.onpointerup = (e) => {
      if (!drag || drag.id !== id) return
      const delta = e.clientY - drag.y
      drag = null
      reorder(id, Math.abs(delta) >= 40 ? Math.sign(delta) : 0)
    }
    node.onpointercancel = () => {
      drag = null
      reorder(id, 0)
    }
  })
  status.textContent = 'Order: Observe → Predict → Test'
  return () => {
    animations.forEach((a) => a.stop())
    root.remove()
  }
}
