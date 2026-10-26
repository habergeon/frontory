// Fetch responses and HTTP errors
// Editable experiment input and algorithm.
export function mount({ container, locale = 'ko' }) {
  const messages =
    locale === 'en'
      ? {
          title: 'Fetch responses and HTTP errors',
          help: 'Because the preview restricts network access, this runs 200/404 fixtures using actual Response objects. Test fetch and HTTP requests on a local server.',
          input: 'Experiment JSON input',
          run: 'Run experiment',
        }
      : {
          title: 'Fetch 응답과 HTTP 오류',
          help: '미리보기 네트워크 제한 때문에 실제 Response 객체의 200/404 fixture를 실행합니다. fetch·HTTP 요청은 로컬 서버에서 검사하세요.',
          input: '실험 JSON 입력',
          run: '실험 실행',
        }
  const INITIAL = { missing: false }
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
    const response = new Response(
      input.missing ? 'Not found' : '[{"title":"local fixture"}]',
      { status: input.missing ? 404 : 200 },
    )
    if (!response.ok) throw new Error('HTTP ' + response.status)
    return { status: response.status, notes: await response.json() }
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
