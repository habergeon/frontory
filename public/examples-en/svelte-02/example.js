// This runner does not inject the Svelte compiler. It uses actual writable stores and an explicit DOM adapter.
// Practice the onMount component lifecycle in PointerCanvas.svelte / App.svelte in the same folder.
export function mount({locale='ko', writable, container }) {
  const messages=locale==='en'?{"display01":"<h2>Svelte store and resource cleanup experiment</h2><p>Preview scope: actual writable subscriptions and a DOM adapter. This is not a compiled Svelte component. Run the same lifecycle in the included App.svelte.</p>\n    <button id=\"toggle\">Hide Canvas</button><label>Sample period in ms <input type=\"range\" min=\"30\" max=\"500\" value=\"100\"></label><p role=\"status\"></p><section></section>","display02":"Active Canvas 0 / subscriptions 0 / timers 0","display03":"A circle drawn at the pointer coordinates","display04":"Generation ","display05":" / active subscriptions 1 / timers 1 / tick ","display06":"Hide Canvas","display07":"Show Canvas"}:{"display01":"<h2>Svelte store와 자원 정리 실험</h2><p>미리보기 범위: 실제 writable 구독 + DOM 어댑터. 컴파일된 Svelte 컴포넌트가 아닙니다. 동봉한 App.svelte에서 같은 수명주기를 실행하세요.</p>\n    <button id=\"toggle\">Canvas 숨기기</button><label>샘플 주기 ms <input type=\"range\" min=\"30\" max=\"500\" value=\"100\"></label><p role=\"status\"></p><section></section>","display02":"활성 Canvas 0 / 구독 0 / 타이머 0","display03":"포인터 좌표에 그리는 원","display04":"세대 ","display05":" / 활성 구독 1 / 타이머 1 / tick ","display06":"Canvas 숨기기","display07":"Canvas 표시"};
  container.innerHTML = messages.display01
  const pointer = writable({ x: 160, y: 90 }), events = new AbortController()
  const host = container.querySelector('section'), status = container.querySelector('[role=status]')
  let visible = true, period = 100, disposeScene = () => {}, generations = 0
  function attach() {
    disposeScene(); if (!visible) { status.textContent = messages.display02; return }
    generations++
    const canvas = document.createElement('canvas'); canvas.width = 320; canvas.height = 180
    canvas.style.maxWidth = '100%'; canvas.style.background = '#172554'; canvas.setAttribute('aria-label', messages.display03); host.append(canvas)
    const context = canvas.getContext('2d'); let point = { x: 160, y: 90 }, ticks = 0, disposed = false
    const unsubscribe = pointer.subscribe(value => { point = value })
    function move(event) {
      const rect = canvas.getBoundingClientRect()
      pointer.set({ x: (event.clientX - rect.left) * canvas.width / rect.width, y: (event.clientY - rect.top) * canvas.height / rect.height })
    }
    canvas.addEventListener('pointermove', move)
    const timer = setInterval(() => {
      context.clearRect(0, 0, 320, 180); context.fillStyle = '#67e8f9'; context.beginPath(); context.arc(point.x, point.y, 12, 0, Math.PI * 2); context.fill()
      status.textContent = `${messages.display04}${generations}${messages.display05}${++ticks} / (${point.x.toFixed(0)}, ${point.y.toFixed(0)})`
    }, period)
    disposeScene = () => { if (disposed) return; disposed = true; clearInterval(timer); unsubscribe(); canvas.removeEventListener('pointermove', move); canvas.remove() }
  }
  container.querySelector('button').addEventListener('click', event => { visible = !visible; event.currentTarget.textContent = visible ? messages.display06 : messages.display07; attach() }, { signal: events.signal })
  container.querySelector('input').addEventListener('input', event => { period = Number(event.target.value); attach() }, { signal: events.signal })
  attach(); return () => { events.abort(); disposeScene(); container.replaceChildren() }
}
