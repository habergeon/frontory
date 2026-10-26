// File import and structure validation
// Editable experiment input and algorithm.
export function mount({ container, locale = 'ko' }) {
  const messages =
    locale === 'en'
      ? {
          title: 'File import and structure validation',
          help: 'Use the textarea to compare string and numeric titles in a notes array. Upload Unit 22’s {schemaVersion:1,notes:[...]} JSON file through the file input.',
          input: 'Experiment JSON input',
          run: 'Run experiment',
          display05: 'Apply only when the entire array passes validation',
        }
      : {
          title: '파일 가져오기와 구조 검사',
          help: 'textarea는 notes 배열의 title 문자열·숫자를 비교합니다. 파일 입력에는 22단위의 {schemaVersion:1,notes:[...]} JSON 파일을 넣으세요.',
          input: '실험 JSON 입력',
          run: '실험 실행',
          display05: '전체 배열 통과 시에만 반영',
        }
  const INITIAL = [
    { id: 1, title: 'valid' },
    { id: 2, title: 42 },
  ]
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
    const validate = (notes) =>
      Array.isArray(notes) &&
      notes.every(
        (n) => n && typeof n.id === 'number' && typeof n.title === 'string',
      )
    stage.replaceChildren()
    const file = document.createElement('input')
    file.type = 'file'
    file.accept = '.json,application/json'
    file.onchange = async () => {
      try {
        const text = await file.files?.[0]?.text()
        if (text) {
          const data = JSON.parse(text)
          show({
            accepted:
              !!data &&
              typeof data === 'object' &&
              !Array.isArray(data) &&
              data.schemaVersion === 1 &&
              validate(data.notes),
          })
        }
      } catch (error) {
        show({ error: String(error) })
      }
    }
    stage.append(file)
    return {
      accepted: validate(input),
      committed: validate(input) ? input : [],
      policy: messages.display05,
    }
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
