/** @typedef {{dispose: () => void}} Mounted */
/** @typedef {{name: string, mount: (host: HTMLElement) => Mounted}} Plugin */
export function mount({ container ,locale='ko'}) {
const messages=locale==='en'?{"display001":"Plugin contract: mount / dispose","display002":"DOM plugin tick ","display003":"Call dispose twice","display004":"Mount Canvas","display005":" / actual releases ","display006":"Mount DOM","display007":" / active "}:{"display001":"플러그인 계약: mount / dispose","display002":"DOM 플러그인 tick ","display003":"dispose 두 번","display004":"Canvas 장착","display005":" / 실제 해제 ","display006":"DOM 장착","display007":" / 활성 "};
  container.innerHTML = ("<h2>"+messages.display001+"</h2><button data-kind=\"DOM\">"+messages.display006+"</button><button data-kind=\"Canvas\">"+messages.display004+"</button><button id=\"dispose\">"+messages.display003+"</button><p role=\"status\"></p><section></section>")
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
      else node.textContent = `${messages.display002}${ticks}`
    }, 100)
    mounts++
    return { dispose() {
      if (closed) return // Idempotence: repeated calls have no effect.
      closed = true; clearInterval(timer); node.remove(); releases++
    } }
  } }))
  function report() { status.textContent = `mount ${mounts}${messages.display005}${releases}${messages.display007}${mounts - releases}` }
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
