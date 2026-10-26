// State transitions and undo
// Editable experiment input and algorithm.
export function mount({ container, locale = 'ko' }) {
  const messages =
    locale === 'en'
      ? {
          title: 'State transitions and undo',
          help: 'Change the input from modifying the nested object to creating a new object and run the experiment.',
          input: 'Experiment JSON input',
          run: 'Run experiment',
        }
      : {
          title: '상태 전이와 실행 취소',
          help: '내부 객체 수정 → 새 객체 생성 조건으로 입력을 바꿔 실행하세요.',
          input: '실험 JSON 입력',
          run: '실험 실행',
        }
  const INITIAL = { mutate: false }
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
    let state = [{ id: 1, done: false }],
      history = [state]
    state = input.mutate
      ? ((state[0].done = true), state)
      : state.map((n) => ({ ...n, done: !n.done }))
    const after = state
    state = history.pop()
    return { after, undo: state, undoSucceeded: state[0].done === false }
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
