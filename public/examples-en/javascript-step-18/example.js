// Public boundaries of ES modules
// Editable experiment input and algorithm.
export function mount({ container, locale = 'ko' }) {
  const messages =
    locale === 'en'
      ? {
          title: 'Public boundaries of ES modules',
          help: 'This runs the public boundary of a Blob ES module. Test actual relative-file separation and Network paths in an HTTP project.',
          input: 'Experiment JSON input',
          run: 'Run experiment',
        }
      : {
          title: 'ES 모듈의 공개 경계',
          help: 'Blob ES 모듈의 공개 경계를 실행합니다. 실제 상대 파일 분리와 Network 경로 검증은 HTTP 프로젝트에서 수행하세요.',
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
    const url = URL.createObjectURL(
      new Blob(
        [
          'const state={count:0}; export const increment=()=>++state.count; export const read=()=>state.count;',
        ],
        { type: 'text/javascript' },
      ),
    )
    try {
      const module = await import(input.missing ? './missing.js' : url)
      return {
        publicKeys: Object.keys(module),
        first: module.increment(),
        second: module.increment(),
        read: module.read(),
        privateStateVisible: 'state' in module,
      }
    } finally {
      URL.revokeObjectURL(url)
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
