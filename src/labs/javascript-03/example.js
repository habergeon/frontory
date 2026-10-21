// 데이터 변경, 렌더, 이벤트 연결을 분리합니다. 저장은 이 실행의 메모리 범위입니다.
export function mount({ container }) {
  container.innerHTML = `<h2>메모 모듈</h2><form><label>새 메모 <input name="note" required maxlength="120"></label><button>추가</button></form>
    <label>필터 <input id="filter"></label><button id="rebind">이벤트 재연결</button><button id="export">JSON 보기</button><ul></ul><output></output><pre></pre>`
  let notes = [{ id: 1, text: '이벤트는 한 번만 연결', done: false }], nextId = 2, handled = 0, bindings = 0, events
  const list = container.querySelector('ul'), status = container.querySelector('output')
  function render() {
    const filter = container.querySelector('#filter').value.toLowerCase()
    list.replaceChildren()
    notes.filter(note => note.text.toLowerCase().includes(filter)).forEach(note => {
      const li = document.createElement('li'), button = document.createElement('button')
      button.textContent = `${note.done ? '✓' : '○'} ${note.text}`; button.dataset.id = String(note.id)
      button.setAttribute('aria-pressed', String(note.done)); li.append(button); list.append(li)
    })
    status.textContent = `총 ${notes.length}개 · 처리 ${handled}회 · 연결 ${bindings}회 (활성 리스너 세트 1개)`
  }
  function bind() {
    events?.abort(); events = new AbortController(); bindings++
    const options = { signal: events.signal }
    container.querySelector('form').addEventListener('submit', event => {
      event.preventDefault(); const input = container.querySelector('[name=note]'), text = input.value.trim()
      if (!text) return
      notes = [...notes, { id: nextId++, text, done: false }]; handled++; input.value = ''; render()
    }, options)
    list.addEventListener('click', event => {
      const button = event.target.closest('button[data-id]'); if (!button) return
      notes = notes.map(note => note.id === Number(button.dataset.id) ? { ...note, done: !note.done } : note); handled++; render()
    }, options)
    container.querySelector('#filter').addEventListener('input', render, options)
    container.querySelector('#rebind').addEventListener('click', () => { bind(); render() }, options)
    container.querySelector('#export').addEventListener('click', () => { container.querySelector('pre').textContent = JSON.stringify(notes, null, 2) }, options)
  }
  bind(); render()
  return () => { events.abort(); container.replaceChildren() }
}
