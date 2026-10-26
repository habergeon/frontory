// 디바운스와 타이머 정리
// 편집할 실험 입력과 알고리즘입니다.
export function mount({ container, locale = 'ko' }) {
  const messages =
    locale === 'en'
      ? {
          title: 'Debouncing and timer cleanup',
          help: 'Change the input from 0ms to 300ms and run the experiment.',
          input: 'Experiment JSON input',
          run: 'Run experiment',
          display05: 'Type quickly. Execution occurs ',
          display06: 'Search executed: ',
          display07: 'ms after the last input.',
        }
      : {
          title: '디바운스와 타이머 정리',
          help: '0ms → 300ms 조건으로 입력을 바꿔 실행하세요.',
          input: '실험 JSON 입력',
          run: '실험 실행',
          display05: '빠르게 입력하세요. 실행 시점은 마지막 입력 이후 ',
          display06: '검색 실행: ',
          display07: 'ms입니다.',
        }
  const INITIAL = { delay: 300, query: 'grid' }
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
    const field = document.createElement('input')
    field.value = input.query
    const result = document.createElement('output')
    let pending
    field.oninput = () => {
      clearTimeout(pending)
      pending = later(() => {
        result.textContent = messages.display06 + field.value
      }, input.delay)
    }
    stage.append(field, result)
    field.dispatchEvent(new Event('input'))
    return messages.display05 + input.delay + messages.display07
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
