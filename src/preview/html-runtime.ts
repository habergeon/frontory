interface HtmlRuntimeOptions {
  token: string
  modules: { core?: string; controls?: string }
  diagnostic: string | null
  source: string
  insertionOffset: number
  injectedLines: number
  injectedLastLineLength: number
  scripts: { start: number; end: number }[]
}

/** Self-contained: serialized into the iframe before any user script. */
export function startHtmlRuntime(options: HtmlRuntimeOptions) {
  const { token } = options
  let closed = false
  let failed = false
  let consoleCount = 0
  const urls: string[] = []
  const normalize = (text: string) => text.replace(/\r\n?/g, '\n')
  const original = normalize(options.source)
  const offset = normalize(
    options.source.slice(0, options.insertionOffset),
  ).length
  const send = (status: string, message = '', extra: object = {}) => {
    if (!closed || status === 'disposed')
      parent.postMessage(
        { type: 'study-preview', token, status, message, ...extra },
        '*',
      )
  }
  const summarize = (value: unknown): string => {
    try {
      if (value instanceof Error) return value.message.slice(0, 4000)
      if (typeof value === 'string') return value.slice(0, 4000)
      const seen = new WeakSet<object>()
      return (
        JSON.stringify(value, (_key, item: unknown) => {
          if (typeof item === 'bigint') return String(item)
          if (typeof item === 'object' && item !== null) {
            if (seen.has(item)) return '[Circular]'
            seen.add(item)
          }
          return item
        }) ?? String(value)
      ).slice(0, 4000)
    } catch {
      return '[Unserializable]'
    }
  }
  const location = (event: ErrorEvent) => {
    if (
      event.filename !== 'about:srcdoc' ||
      event.lineno <= 0 ||
      event.colno <= 0
    )
      return {}
    const prefixLines = original.slice(0, offset).split('\n')
    const insertionLine = prefixLines.length
    const insertionColumn = prefixLines.at(-1)!.length + 1
    let line = event.lineno
    let column = event.colno
    if (line >= insertionLine) {
      const endLine = insertionLine + options.injectedLines
      if (
        line < endLine ||
        (line === insertionLine && column < insertionColumn)
      )
        return {}
      if (line === endLine) {
        column -= options.injectedLastLineLength
        if (options.injectedLines > 0) column += insertionColumn - 1
      }
      line -= options.injectedLines
    }
    const lines = original.split('\n')
    if (
      line < 1 ||
      line > lines.length ||
      column < 1 ||
      column > lines[line - 1].length + 1
    )
      return {}
    const position =
      lines.slice(0, line - 1).reduce((n, text) => n + text.length + 1, 0) +
      column -
      1
    const known = options.scripts.some((block) => {
      const start = normalize(options.source.slice(0, block.start)).length
      const end = normalize(options.source.slice(0, block.end)).length
      return position >= start && position < end
    })
    if (!known) return {}
    const before = original.slice(0, position).split('\n')
    return { line: before.length, column: before.at(-1)!.length + 1 }
  }
  const report = (value: unknown, extra: object = {}) => {
    failed = true
    send('error', summarize(value), extra)
  }
  addEventListener('error', (event) => {
    event.preventDefault()
    report(event.error ?? event.message, location(event))
  })
  addEventListener('unhandledrejection', (event) => {
    event.preventDefault()
    report(event.reason)
  })
  for (const level of ['log', 'info', 'warn', 'error', 'debug'] as const) {
    const originalConsole = console[level].bind(console)
    console[level] = (...args: unknown[]) => {
      originalConsole(...args)
      if (consoleCount++ < 200)
        send('console', args.map(summarize).join(' ').slice(0, 4000), { level })
    }
  }
  const dispose = () => {
    if (closed) return
    closed = true
    urls.forEach((url) => URL.revokeObjectURL(url))
    send('disposed')
  }
  addEventListener('message', (event) => {
    if (
      event.source === parent &&
      event.data?.type === 'study-dispose' &&
      event.data.token === token
    )
      dispose()
  })
  addEventListener('pagehide', dispose, { once: true })
  addEventListener(
    'DOMContentLoaded',
    () => {
      if (!failed) send('ready')
    },
    { once: true },
  )
  if (options.diagnostic) report(options.diagnostic)
  const makeModule = (source: string) => {
    const url = URL.createObjectURL(
      new Blob([source], { type: 'text/javascript' }),
    )
    urls.push(url)
    return url
  }
  const imports: Record<string, string> = {}
  if (options.modules.core !== undefined)
    imports.three = makeModule(options.modules.core)
  if (options.modules.controls !== undefined)
    imports['three/addons/controls/OrbitControls.js'] = makeModule(
      options.modules.controls,
    )
  if (Object.keys(imports).length) {
    const map = document.createElement('script')
    map.type = 'importmap'
    map.textContent = JSON.stringify({ imports })
    document.head.append(map)
  }
}
