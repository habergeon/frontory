// Indexing with Map and Set
// Editable experiment input and algorithm.
export function mount({ container, locale = 'ko' }) {
  const messages =
    locale === 'en'
      ? {
          title: 'Indexing with Map and Set',
          help: 'Change the input from new id 4 to existing id 2 and run the experiment.',
          input: 'Experiment JSON input',
          run: 'Run experiment',
        }
      : {
          title: 'Map과 Set 색인',
          help: '새 id 4 → 기존 id 2 조건으로 입력을 바꿔 실행하세요.',
          input: '실험 JSON 입력',
          run: '실험 실행',
        }
  const INITIAL = { tags: ['js', 'css', 'js', 'html', 'css', 'js'], key: 2 }
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
    const map = new Map([
      [1, 'one'],
      [2, 'two'],
      [3, 'three'],
    ])
    map.set(input.key, 'updated')
    return {
      tags: [...new Set(input.tags)],
      before: input.tags.length,
      after: new Set(input.tags).size,
      map: [...map],
      missing: map.get(99) ?? 'not found',
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
