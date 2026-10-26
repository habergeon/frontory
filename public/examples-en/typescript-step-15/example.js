// Type Guards and False Guarantees
// Editable experiment input and algorithm.
export function mount({ container, locale = 'ko' }) {
  const messages =
    locale === 'en'
      ? {
          title: 'Type Guards and False Guarantees',
          help: 'The preview is a JavaScript runtime boundary experiment. It does not run TypeScript diagnostics. Check lesson.ts locally with tsc --strict --noEmit --lib ES2023,DOM.',
          display003: 'Experiment JSON input',
          display004: 'Run experiment',
        }
      : {
          title: '타입 가드와 거짓 보장',
          help: '미리보기는 JavaScript 런타임 경계 실험입니다. TypeScript 진단은 실행하지 않습니다. lesson.ts를 로컬 tsc --strict --noEmit --lib ES2023,DOM 으로 검사하세요.',
          display003: '실험 JSON 입력',
          display004: '실험 실행',
        }
  const INITIAL = [
    null,
    { title: 'A' },
    { id: 1, title: 2 },
    { id: 1, title: 'A' },
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
  editor.setAttribute('aria-label', messages.display003)
  const button = document.createElement('button')
  button.textContent = messages.display004
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
    return input.map((v) => ({
      value: v,
      accepted:
        !!v &&
        typeof v === 'object' &&
        typeof v.id === 'number' &&
        typeof v.title === 'string',
    }))
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
