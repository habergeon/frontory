// Promises and execution order
// Editable experiment input and algorithm.
export function mount({ container, locale = 'ko' }) {
  const messages =
    locale === 'en'
      ? {
          title: 'Promises and execution order',
          help: 'Change the input from returning the Promise to omitting the return and run the experiment.',
          input: 'Experiment JSON input',
          run: 'Run experiment',
        }
      : {
          title: 'Promise와 실행 순서',
          help: 'Promise 반환 → 반환 생략 조건으로 입력을 바꿔 실행하세요.',
          input: '실험 JSON 입력',
          run: '실험 실행',
        }
  const INITIAL = { returnPromise: true }
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
    const events = ['sync']
    let innerPromise
    const inner = () =>
      (innerPromise = new Promise((resolve) =>
        later(() => {
          events.push('inner')
          resolve(null)
        }, 30),
      ))
    const chain = Promise.resolve()
      .then(() => {
        if (input.returnPromise) return inner()
        inner()
      })
      .then(() => events.push('chain done'))
    events.push('sync end')
    await chain
    await new Promise((resolve) => later(resolve, 0))
    events.push('timer')
    await innerPromise
    return events
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
