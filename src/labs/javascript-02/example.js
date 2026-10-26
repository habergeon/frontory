// 네트워크 없이 지연 Promise로 응답 역전을 재현합니다.
export function mount({ container, locale = 'ko' }) {
  const messages =
    locale === 'en'
      ? {
          display01:
            'Shorter search terms take longer. Quickly type “r” followed by “react”.',
          display02: 'Mode changed: existing requests cleaned up',
          display03: 'Asynchronous search and cancellation',
          display04: 'No protection (comparison)',
          display05: ' Ignored stale result',
          display06: 'Reproduce out-of-order responses',
          display07: ' Applied result: ',
          display08: ' Searching: ',
          display09: 'Protection mode ',
          display10: 'ms delay)',
          display11: 'Request ID',
          display12: ' Result: ',
          display13: 'Search ',
        }
      : {
          display01:
            '짧은 검색어일수록 느립니다. “r” 다음 “react”를 빠르게 입력하세요.',
          display02: '모드 변경: 기존 요청 정리',
          display03: '비동기 검색과 취소',
          display04: '보호 없음 (비교)',
          display05: ' 이전 결과 무시',
          display06: '응답 역전 재현',
          display07: ' 결과 반영: ',
          display08: ' 검색 중: ',
          display09: '보호 방식 ',
          display10: 'ms 지연)',
          display11: '요청 ID',
          display12: ' 결과: ',
          display13: '검색 ',
        }
  container.innerHTML = `<h2>${messages.display03}</h2><p>${messages.display01}</p>
    <label>${messages.display09}<select id="mode"><option value="abort">AbortController</option><option value="latest">${messages.display11}</option><option value="none">${messages.display04}</option></select></label>
    <label>${messages.display13}<input id="query" value="react"></label><button id="race">${messages.display06}</button><p role="status"></p><pre></pre>`
  const query = container.querySelector('#query'),
    mode = container.querySelector('#mode')
  const status = container.querySelector('[role=status]'),
    log = container.querySelector('pre')
  const lifetime = new AbortController(),
    pending = new Set()
  let current,
    sequence = 0,
    closed = false,
    demoTimer
  const write = (text) => {
    log.textContent = (text + '\n' + log.textContent).slice(0, 1800)
  }
  function delayed(term, signal) {
    return new Promise((resolve, reject) => {
      const ms = term.length < 3 ? 1100 : 180
      const timer = setTimeout(() => {
        signal.removeEventListener('abort', cancel)
        resolve({ term, ms })
      }, ms)
      function cancel() {
        clearTimeout(timer)
        reject(new DOMException('취소됨', 'AbortError'))
      }
      signal.addEventListener('abort', cancel, { once: true })
    })
  }
  async function search(term) {
    const id = ++sequence,
      protection = mode.value
    if (protection === 'abort') current?.abort()
    const controller = new AbortController()
    current = controller
    pending.add(controller)
    status.textContent = `#${id}${messages.display08}${term}`
    try {
      const result = await delayed(term, controller.signal)
      if (closed) return
      if (protection === 'latest' && id !== sequence) {
        write(`#${id}${messages.display05}`)
        return
      }
      status.textContent = `#${id}${messages.display12}${result.term} (${result.ms}${messages.display10}`
      write(`#${id}${messages.display07}${result.term}`)
    } catch (error) {
      if (!closed) write(`#${id} ${error.name}`)
    } finally {
      pending.delete(controller)
    }
  }
  query.addEventListener('input', () => search(query.value), {
    signal: lifetime.signal,
  })
  mode.addEventListener(
    'change',
    () => {
      pending.forEach((c) => c.abort())
      sequence++
      write(messages.display02)
    },
    { signal: lifetime.signal },
  )
  container.querySelector('#race').addEventListener(
    'click',
    () => {
      clearTimeout(demoTimer)
      query.value = 'r'
      search('r')
      demoTimer = setTimeout(() => {
        query.value = 'react'
        search('react')
      }, 80)
    },
    { signal: lifetime.signal },
  )
  search(query.value)
  return () => {
    closed = true
    clearTimeout(demoTimer)
    lifetime.abort()
    pending.forEach((c) => c.abort())
    container.replaceChildren()
  }
}
