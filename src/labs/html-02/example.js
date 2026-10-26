export function mount({ container, locale = 'ko' }) {
  const messages =
    locale === 'en'
      ? {
          display001:
            'Navigate with Tab and submit with Enter while entering a title. Data is kept only for this run.',
          display002: 'Enter 3–60 characters excluding surrounding whitespace.',
          display003: 'Note title (required, at least 3 characters)',
          display004: 'Enter a title with at least 3 characters.',
          display005: 'A note form operated with the keyboard',
          display006: 'Note added.',
          display007: 'Save note',
          display008: 'Reset',
          display009: 'Content',
        }
      : {
          display001:
            'Tab으로 이동하고 제목 입력 중 Enter로 제출해 보세요. 데이터는 이번 실행에서만 유지됩니다.',
          display002: '공백을 제외하고 3~60자로 작성하세요.',
          display003: '필기 제목 (필수, 3자 이상)',
          display004: '제목을 3자 이상 입력하세요.',
          display005: '키보드로 작성하는 필기 폼',
          display006: '필기를 추가했습니다.',
          display007: '필기 저장',
          display008: '초기화',
          display009: '내용',
        }
  container.innerHTML = `<h2>${messages.display005}</h2><p>${messages.display001}</p>
    <form><label for="title">${messages.display003}</label><input id="title" name="title" required minlength="3" maxlength="60" aria-describedby="title-help title-error">
    <p id="title-help">${messages.display002}</p><p id="title-error" role="alert"></p>
    <label for="body">${messages.display009}</label><textarea id="body" name="body" rows="4"></textarea><button type="submit">${messages.display007}</button><button type="reset">${messages.display008}</button></form>
    <output aria-live="polite"></output><ul></ul>`
  const form = container.querySelector('form'),
    title = container.querySelector('#title'),
    error = container.querySelector('#title-error'),
    events = new AbortController()
  function validate() {
    title.setCustomValidity(
      title.value.trim().length < 3 ? messages.display004 : '',
    )
    title.setAttribute('aria-invalid', String(!title.validity.valid))
    error.textContent = title.validity.valid ? '' : title.validationMessage
  }
  title.addEventListener('input', validate, { signal: events.signal })
  title.addEventListener('invalid', validate, { signal: events.signal })
  form.addEventListener(
    'submit',
    (event) => {
      event.preventDefault()
      validate()
      if (!form.reportValidity()) return
      const li = document.createElement('li')
      li.textContent = `${title.value.trim()}: ${container.querySelector('#body').value}`
      container.querySelector('ul').append(li)
      container.querySelector('output').textContent = messages.display006
      form.reset()
      title.focus()
    },
    { signal: events.signal },
  )
  form.addEventListener(
    'reset',
    () => {
      title.setCustomValidity('')
      title.removeAttribute('aria-invalid')
      error.textContent = ''
    },
    { signal: events.signal },
  )
  return () => {
    events.abort()
    container.replaceChildren()
  }
}
