// FormData and domain validation
// Editable experiment input and algorithm.
export function mount({ container, locale = 'ko' }) {
  const messages =
    locale === 'en'
      ? {
          title: 'FormData and domain validation',
          help: 'Change the input from checked to unchecked and run the experiment.',
          input: 'Experiment JSON input',
          run: 'Run experiment',
          display05: 'Submit the form to inspect the domain validation result.',
          display06: 'Title ',
          display07: 'Done ',
          display08: 'Minutes ',
          display09: 'Save',
        }
      : {
          title: 'FormData와 도메인 검증',
          help: '체크 → 해제 조건으로 입력을 바꿔 실행하세요.',
          input: '실험 JSON 입력',
          run: '실험 실행',
          display05: '폼을 제출해 도메인 검증 결과를 확인하세요.',
          display06: '제목 ',
          display07: '완료 ',
          display08: '분 ',
          display09: '저장',
        }
  const INITIAL = { title: 'Grid', minutes: '15', done: true }
  const controller = new AbortController(),
    signal = controller.signal
  const timers = [],
    urls = []
  let disposed = false
  const later = (fn, delay) => {
    const id = setTimeout(fn, delay)
    timers.push(id)
    return id
  }
  const title = document.createElement('h2')
  title.textContent = messages.title
  const help = document.createElement('p')
  help.textContent = messages.help
  const editor = document.createElement('textarea')
  editor.value = JSON.stringify(INITIAL, null, 2)
  editor.rows = 10
  editor.style.cssText = 'width:100%;font-family:monospace'
  editor.setAttribute('aria-label', messages.input)
  const button = document.createElement('button')
  button.textContent = messages.run
  const output = document.createElement('pre')
  output.style.whiteSpace = 'pre-wrap'
  output.setAttribute('aria-live', 'polite')
  const stage = document.createElement('section')
  const show = (value) => {
    if (!disposed)
      output.textContent =
        typeof value === 'string' ? value : JSON.stringify(value, null, 2)
  }
  /** @param {any} input */
  async function experiment(input) {
    stage.replaceChildren()
    const form = document.createElement('form')
    form.innerHTML =
      '<label>' +
      messages.display06 +
      '<input name="title"></label><label>' +
      messages.display08 +
      '<input name="minutes"></label><label>' +
      messages.display07 +
      '<input name="done" type="checkbox"></label><button>' +
      messages.display09 +
      '</button>'
    ;/** @type {HTMLInputElement} */ (
      form.querySelector('input[name=title]')
    ).value = input.title
    ;/** @type {HTMLInputElement} */ (
      form.querySelector('input[name=minutes]')
    ).value = input.minutes
    ;/** @type {HTMLInputElement} */ (
      form.querySelector('input[name=done]')
    ).checked = input.done
    form.onsubmit = (event) => {
      event.preventDefault()
      const data = new FormData(form),
        title = String(data.get('title')).trim(),
        raw = String(data.get('minutes')),
        minutes = Number(raw)
      show({
        ok:
          !!title &&
          raw.trim() !== '' &&
          Number.isFinite(minutes) &&
          minutes >= 0,
        title,
        minutes,
        done: data.has('done'),
      })
    }
    stage.append(form)
    return messages.display05
  }
  let generation = 0
  const run = async () => {
    const current = ++generation
    try {
      const result = await experiment(JSON.parse(editor.value))
      if (current === generation) show(result)
    } catch (error) {
      if (current === generation) show({ error: String(error) })
    }
  }
  button.addEventListener('click', run, { signal })
  container.append(title, help, editor, button, stage, output)
  run()
  return () => {
    disposed = true
    controller.abort()
    timers.forEach(clearTimeout)
    urls.forEach((url) => URL.revokeObjectURL(url))
    container.replaceChildren()
  }
}
