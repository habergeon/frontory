/** @typedef {{dispose: () => void}} Mounted */
/** @typedef {{name: string, mount: (host: HTMLElement) => Mounted}} Plugin */
export function mount({ container }) {
  container.innerHTML = '<h2>플러그인 계약: mount / dispose</h2><button data-kind="DOM">DOM 장착</button><button data-kind="Canvas">Canvas 장착</button><button id="dispose">dispose 두 번</button><p role="status"></p><section></section>'
  const host = container.querySelector('section'), status = container.querySelector('p'), events = new AbortController()
  let active, mounts = 0, releases = 0
  /** @type {Plugin[]} */
  const plugins = ['DOM', 'Canvas'].map(name => ({ name, mount(host) {
    let closed = false, ticks = 0
    const node = document.createElement(name === 'DOM' ? 'output' : 'canvas'); host.append(node)
    const canvas = node instanceof HTMLCanvasElement ? node : null
    if (canvas) { canvas.width = 320; canvas.height = 120 }
    const context = canvas?.getContext('2d')
    const timer = setInterval(() => {
      ticks++
      if (context) { context.clearRect(0, 0, 320, 120); context.fillStyle = '#38bdf8'; context.fillRect((ticks * 8) % 280, 35, 40, 40) }
      else node.textContent = `DOM 플러그인 tick ${ticks}`
    }, 100)
    mounts++
    return { dispose() {
      if (closed) return // 멱등성: 중복 호출은 아무 효과가 없습니다.
      closed = true; clearInterval(timer); node.remove(); releases++
    } }
  } }))
  function report() { status.textContent = `mount ${mounts} / 실제 해제 ${releases} / 활성 ${mounts - releases}` }
  container.addEventListener('click', event => {
    const button = event.target.closest('button'); if (!button) return
    active?.dispose()
    if (button.dataset.kind) active = plugins.find(plugin => plugin.name === button.dataset.kind).mount(host)
    else { active?.dispose(); active = undefined }
    report()
  }, { signal: events.signal })
  active = plugins[0].mount(host); report()
  return () => { events.abort(); active?.dispose(); container.replaceChildren() }
}
