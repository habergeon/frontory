// 네트워크 없이 지연 Promise로 응답 역전을 재현합니다.
export function mount({ container }) {
  container.innerHTML = `<h2>비동기 검색과 취소</h2><p>짧은 검색어일수록 느립니다. “r” 다음 “react”를 빠르게 입력하세요.</p>
    <label>보호 방식 <select id="mode"><option value="abort">AbortController</option><option value="latest">요청 ID</option><option value="none">보호 없음 (비교)</option></select></label>
    <label>검색 <input id="query" value="react"></label><button id="race">응답 역전 재현</button><p role="status"></p><pre></pre>`
  const query = container.querySelector('#query'), mode = container.querySelector('#mode')
  const status = container.querySelector('[role=status]'), log = container.querySelector('pre')
  const lifetime = new AbortController(), pending = new Set()
  let current, sequence = 0, closed = false, demoTimer
  const write = text => { log.textContent = (text + '\n' + log.textContent).slice(0, 1800) }
  function delayed(term, signal) {
    return new Promise((resolve, reject) => {
      const ms = term.length < 3 ? 1100 : 180
      const timer = setTimeout(() => { signal.removeEventListener('abort', cancel); resolve({ term, ms }) }, ms)
      function cancel() { clearTimeout(timer); reject(new DOMException('취소됨', 'AbortError')) }
      signal.addEventListener('abort', cancel, { once: true })
    })
  }
  async function search(term) {
    const id = ++sequence, protection = mode.value
    if (protection === 'abort') current?.abort()
    const controller = new AbortController(); current = controller; pending.add(controller)
    status.textContent = `#${id} 검색 중: ${term}`
    try {
      const result = await delayed(term, controller.signal)
      if (closed) return
      if (protection === 'latest' && id !== sequence) { write(`#${id} 이전 결과 무시`); return }
      status.textContent = `#${id} 결과: ${result.term} (${result.ms}ms 지연)`
      write(`#${id} 결과 반영: ${result.term}`)
    } catch (error) { if (!closed) write(`#${id} ${error.name}`) }
    finally { pending.delete(controller) }
  }
  query.addEventListener('input', () => search(query.value), { signal: lifetime.signal })
  mode.addEventListener('change', () => { pending.forEach(c => c.abort()); sequence++; write('모드 변경: 기존 요청 정리') }, { signal: lifetime.signal })
  container.querySelector('#race').addEventListener('click', () => {
    clearTimeout(demoTimer); query.value = 'r'; search('r')
    demoTimer = setTimeout(() => { query.value = 'react'; search('react') }, 80)
  }, { signal: lifetime.signal })
  search(query.value)
  return () => { closed = true; clearTimeout(demoTimer); lifetime.abort(); pending.forEach(c => c.abort()); container.replaceChildren() }
}
