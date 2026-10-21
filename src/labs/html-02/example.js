export function mount({ container }) {
  container.innerHTML = `<h2>키보드로 작성하는 필기 폼</h2><p>Tab으로 이동하고 제목 입력 중 Enter로 제출해 보세요. 데이터는 이번 실행에서만 유지됩니다.</p>
    <form><label for="title">필기 제목 (필수, 3자 이상)</label><input id="title" name="title" required minlength="3" maxlength="60" aria-describedby="title-help title-error">
    <p id="title-help">공백을 제외하고 3~60자로 작성하세요.</p><p id="title-error" role="alert"></p>
    <label for="body">내용</label><textarea id="body" name="body" rows="4"></textarea><button type="submit">필기 저장</button><button type="reset">초기화</button></form>
    <output aria-live="polite"></output><ul></ul>`
  const form = container.querySelector('form'), title = container.querySelector('#title'), error = container.querySelector('#title-error'), events = new AbortController()
  function validate() {
    title.setCustomValidity(title.value.trim().length < 3 ? '제목을 3자 이상 입력하세요.' : '')
    title.setAttribute('aria-invalid', String(!title.validity.valid))
    error.textContent = title.validity.valid ? '' : title.validationMessage
  }
  title.addEventListener('input', validate, { signal: events.signal })
  title.addEventListener('invalid', validate, { signal: events.signal })
  form.addEventListener('submit', event => {
    event.preventDefault(); validate(); if (!form.reportValidity()) return
    const li = document.createElement('li'); li.textContent = `${title.value.trim()}: ${container.querySelector('#body').value}`
    container.querySelector('ul').append(li); container.querySelector('output').textContent = '필기를 추가했습니다.'
    form.reset(); title.focus()
  }, { signal: events.signal })
  form.addEventListener('reset', () => { title.setCustomValidity(''); title.removeAttribute('aria-invalid'); error.textContent = '' }, { signal: events.signal })
  return () => { events.abort(); container.replaceChildren() }
}
