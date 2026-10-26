// Separate data changes, rendering, and event binding. Storage is limited to memory for this run.
export function mount({ container, locale = 'ko' }) {
  const messages =
    locale === 'en'
      ? {
          display01: ' times (1 active listener set)',
          display02: 'Rebind events',
          display03: 'View JSON',
          display04: ' notes · Handled ',
          display05: ' times · Bound ',
          display06: 'Note module',
          display07: 'New note ',
          display08: 'Filter ',
          display09: 'Add',
          display10: 'Total ',
        }
      : {
          display01: '회 (활성 리스너 세트 1개)',
          display02: '이벤트 재연결',
          display03: 'JSON 보기',
          display04: '개 · 처리 ',
          display05: '회 · 연결 ',
          display06: '메모 모듈',
          display07: '새 메모 ',
          display08: '필터 ',
          display09: '추가',
          display10: '총 ',
        }
  container.innerHTML = `<h2>${messages.display06}</h2><form><label>${messages.display07}<input name="note" required maxlength="120"></label><button>${messages.display09}</button></form>
    <label>${messages.display08}<input id="filter"></label><button id="rebind">${messages.display02}</button><button id="export">${messages.display03}</button><ul></ul><output></output><pre></pre>`
  let notes = [{ id: 1, text: '이벤트는 한 번만 연결', done: false }],
    nextId = 2,
    handled = 0,
    bindings = 0,
    events
  const list = container.querySelector('ul'),
    status = container.querySelector('output')
  function render() {
    const filter = container.querySelector('#filter').value.toLowerCase()
    list.replaceChildren()
    notes
      .filter((note) => note.text.toLowerCase().includes(filter))
      .forEach((note) => {
        const li = document.createElement('li'),
          button = document.createElement('button')
        button.textContent = `${note.done ? '✓' : '○'} ${note.text}`
        button.dataset.id = String(note.id)
        button.setAttribute('aria-pressed', String(note.done))
        li.append(button)
        list.append(li)
      })
    status.textContent = `${messages.display10}${notes.length}${messages.display04}${handled}${messages.display05}${bindings}${messages.display01}`
  }
  function bind() {
    events?.abort()
    events = new AbortController()
    bindings++
    const options = { signal: events.signal }
    container.querySelector('form').addEventListener(
      'submit',
      (event) => {
        event.preventDefault()
        const input = container.querySelector('[name=note]'),
          text = input.value.trim()
        if (!text) return
        notes = [...notes, { id: nextId++, text, done: false }]
        handled++
        input.value = ''
        render()
      },
      options,
    )
    list.addEventListener(
      'click',
      (event) => {
        const button = event.target.closest('button[data-id]')
        if (!button) return
        notes = notes.map((note) =>
          note.id === Number(button.dataset.id)
            ? { ...note, done: !note.done }
            : note,
        )
        handled++
        render()
      },
      options,
    )
    container
      .querySelector('#filter')
      .addEventListener('input', render, options)
    container.querySelector('#rebind').addEventListener(
      'click',
      () => {
        bind()
        render()
      },
      options,
    )
    container.querySelector('#export').addEventListener(
      'click',
      () => {
        container.querySelector('pre').textContent = JSON.stringify(
          notes,
          null,
          2,
        )
      },
      options,
    )
  }
  bind()
  render()
  return () => {
    events.abort()
    container.replaceChildren()
  }
}
