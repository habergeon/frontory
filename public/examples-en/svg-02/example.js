// Native buttons and SVG nodes share one selection function and accessible names.
export function mount({ locale = 'ko', container }) {
  const messages =
    locale === 'en'
      ? {
          display001:
            '<p>Tab to a node; Enter/Space or click selects it.</p><div></div><svg viewBox="0 0 500 230" role="group" aria-label="Learning route" style="width:100%;max-height:65%"></svg><p role="status"></p>',
          display002: 'Selected: ',
          display003: 'Input',
          display004: 'Transform',
          display005: 'Render',
          display006: 'Inspect',
        }
      : {
          display001:
            '<p>Tab to a node; Enter/Space or click selects it.</p><div></div><svg viewBox="0 0 500 230" role="group" aria-label="Learning route" style="width:100%;max-height:65%"></svg><p role="status"></p>',
          display002: 'Selected: ',
          display003: 'Input',
          display004: 'Transform',
          display005: 'Render',
          display006: 'Inspect',
        }
  container.innerHTML = messages.display001
  const svg = container.querySelector('svg'),
    buttons = container.querySelector('div'),
    status = container.querySelector('[role=status]'),
    ns = 'http://www.w3.org/2000/svg'
  const nodes = []
  const select = (index) => {
    nodes.forEach((n, i) => {
      n.circle.setAttribute('fill', i === index ? '#e97645' : '#3179bf')
      n.button.setAttribute('aria-pressed', String(i === index))
      n.group.setAttribute('aria-pressed', String(i === index))
    })
    status.textContent = `${messages.display002}${nodes[index].name}`
  }
  ;[
    messages.display003,
    messages.display004,
    messages.display005,
    messages.display006,
  ].forEach((name, i) => {
    const x = 65 + i * 120,
      y = i % 2 ? 150 : 70
    if (i) {
      const line = document.createElementNS(ns, 'line')
      line.setAttribute('x1', String(x - 120))
      line.setAttribute('y1', String(i % 2 ? 70 : 150))
      line.setAttribute('x2', String(x))
      line.setAttribute('y2', String(y))
      line.setAttribute('stroke', '#8799aa')
      svg.append(line)
    }
    const group = document.createElementNS(ns, 'g')
    group.setAttribute('role', 'button')
    group.setAttribute('tabindex', '0')
    group.setAttribute('aria-label', name)
    group.style.cursor = 'pointer'
    const circle = document.createElementNS(ns, 'circle')
    circle.setAttribute('cx', String(x))
    circle.setAttribute('cy', String(y))
    circle.setAttribute('r', '31')
    const label = document.createElementNS(ns, 'text')
    label.setAttribute('x', String(x))
    label.setAttribute('y', String(y + 48))
    label.setAttribute('text-anchor', 'middle')
    label.textContent = name
    group.append(circle, label)
    svg.append(group)
    const button = document.createElement('button')
    button.textContent = name
    button.onclick = () => select(i)
    buttons.append(button)
    group.onclick = () => select(i)
    group.onkeydown = (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault()
        select(i)
      }
    }
    nodes.push({ name, circle, group, button })
  })
  select(0)
  return () => container.replaceChildren()
}
