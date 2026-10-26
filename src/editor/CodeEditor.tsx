import { useLocale } from '../i18n/LocaleProvider'
import { message, messages } from '../i18n/messages'
import {
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
  type Ref,
} from 'react'
import { monaco } from './monaco'
import type { CodeLanguage } from '../shared/drafts'
import { CodeFormatError, formatCode } from './formatCode'

export interface Compilation {
  source: string
  language: CodeLanguage
  output: string | null
  error: string | null
}
export interface EditorReplacement {
  code: string
  language: CodeLanguage
}
export interface CodeEditorHandle {
  // Native Undo covers text replacements, including identical nonempty text.
  // An empty-to-empty language-only replacement has no native text Undo entry.
  replace: (replacement: EditorReplacement) => void
  format: () => Promise<void>
}
interface Props {
  ref?: Ref<CodeEditorHandle>
  wrap: boolean
  value: string
  language: CodeLanguage
  unitId: string
  onChange: (replacement: EditorReplacement) => void
  onCompile: (result: Compilation) => void
}

export default function CodeEditor({
  ref,
  wrap,
  value,
  language,
  unitId,
  onChange,
  onCompile,
}: Props) {
  const { locale } = useLocale()
  const text = messages[locale]
  const [status, setStatus] = useState<
    'loading' | 'waiting' | 'invalid' | 'valid' | 'failed' | 'html'
  >('loading')
  const [failure, setFailure] = useState<{ details: string; emit: boolean }>({
    details: '',
    emit: false,
  })
  const [formatFailure, setFormatFailure] = useState('')
  const host = useRef<HTMLDivElement>(null)
  const editor = useRef<monaco.editor.IStandaloneCodeEditor | null>(null)
  const callbacks = useRef({ onChange, onCompile })
  callbacks.current = { onChange, onCompile }
  const controller = useRef<{
    replace: CodeEditorHandle['replace']
    format: CodeEditorHandle['format']
    select: (language: CodeLanguage) => void
  } | null>(null)
  const currentLanguage = useRef(language)
  useImperativeHandle(
    ref,
    () => ({
      replace: (next) => controller.current?.replace(next),
      format: async () => {
        await controller.current?.format()
      },
    }),
    [],
  )
  const initialValue = useRef(value)
  initialValue.current = value
  const [issues, setIssues] = useState<monaco.editor.IMarkerData[]>([])
  useEffect(() => {
    setFormatFailure('')
    const uri = monaco.Uri.parse('file:///labs/' + unitId + '/example.html')
    const model = monaco.editor.createModel(initialValue.current, language, uri)
    const instance = monaco.editor.create(host.current!, {
      model,
      automaticLayout: true,
      minimap: { enabled: false },
      fontSize: 12,
      lineNumbers: 'on',
      scrollBeyondLastLine: false,
      tabSize: 2,
      ariaLabel: messages[locale].sourceCode,
      theme: 'vs',
      fixedOverflowWidgets: true,
      padding: { top: 12 },
      wordWrap: 'on',
      renderValidationDecorations: 'on',
      occurrencesHighlight: 'off',
    })
    editor.current = instance
    let timer: number | undefined
    let sequence = 0
    let formatSequence = 0
    let disposed = false
    let replacing = false
    let previousVersion = model.getAlternativeVersionId()
    // Alternative versions identify native Undo boundaries, never asynchronous freshness.
    const boundaries: Array<{
      before: number
      after: number
      beforeLanguage: CodeLanguage
      afterLanguage: CodeLanguage
    }> = []
    currentLanguage.current = language
    const select = (next: CodeLanguage) => {
      formatSequence++
      setFormatFailure('')
      currentLanguage.current = next
      monaco.editor.setModelLanguage(model, next)
    }
    const validate = () => {
      window.clearTimeout(timer)
      const request = ++sequence
      const source = model.getValue()
      const language = currentLanguage.current
      const version = model.getVersionId()
      const stale = () =>
        disposed ||
        request !== sequence ||
        model.getVersionId() !== version ||
        currentLanguage.current !== language
      setStatus('waiting')
      setIssues([])
      monaco.editor.setModelMarkers(model, 'study-check', [])
      if (language === 'html') {
        setStatus('html')
        callbacks.current.onCompile({
          source,
          language,
          output: source,
          error: null,
        })
        return
      }
      callbacks.current.onCompile({
        source,
        language,
        output: null,
        error: null,
      })
      timer = window.setTimeout(async () => {
        try {
          const factory = await (language === 'typescript'
            ? monaco.typescript.getTypeScriptWorker()
            : monaco.typescript.getJavaScriptWorker())
          const worker = await factory(uri)
          const [syntax, semantic] = await Promise.all([
            worker.getSyntacticDiagnostics(uri.toString()),
            worker.getSemanticDiagnostics(uri.toString()),
          ])
          if (stale()) return
          const flatten = (
            message:
              | string
              | {
                  messageText: string
                  next?: Array<string | { messageText: string }>
                },
          ): string =>
            typeof message === 'string'
              ? message
              : [
                  message.messageText,
                  ...(message.next?.map(flatten) ?? []),
                ].join('\n')
          const markers = [...syntax, ...semantic]
            .filter((item) => item.category === 1)
            .map((item) => {
              const start = model.getPositionAt(item.start ?? 0)
              const end = model.getPositionAt(
                (item.start ?? 0) + Math.max(item.length ?? 1, 1),
              )
              return {
                severity: monaco.MarkerSeverity.Error,
                message: flatten(item.messageText ?? ''),
                startLineNumber: start.lineNumber,
                startColumn: start.column,
                endLineNumber: end.lineNumber,
                endColumn: end.column,
                code: String(item.code),
              }
            })
          monaco.editor.setModelMarkers(model, 'study-check', markers)
          setIssues(markers)
          if (markers.length) {
            setStatus('invalid')
            callbacks.current.onCompile({
              source,
              language,
              output: null,
              error: markers
                .map(
                  (item) =>
                    item.startLineNumber +
                    ':' +
                    item.startColumn +
                    ' ' +
                    item.message,
                )
                .join('\n'),
            })
            return
          }
          const emitted = await worker.getEmitOutput(uri.toString())
          if (stale()) return
          const output =
            language === 'javascript'
              ? source
              : emitted.outputFiles.find((file) => file.name.endsWith('.js'))
                  ?.text
          if (output === undefined) throw new Error(messages.ko.emitFailed)
          setStatus('valid')
          callbacks.current.onCompile({ source, language, output, error: null })
        } catch (error) {
          if (stale()) return
          const message = error instanceof Error ? error.message : String(error)
          setFailure({
            details: message,
            emit: message === messages.ko.emitFailed,
          })
          setStatus('failed')
          callbacks.current.onCompile({
            source,
            language,
            output: null,
            error: message,
          })
        }
      }, 600)
    }
    const notify = () =>
      callbacks.current.onChange({
        code: model.getValue(),
        language: currentLanguage.current,
      })
    const prepareFormat = async (token?: monaco.CancellationToken) => {
      const request = ++formatSequence
      const version = model.getVersionId()
      const language = currentLanguage.current
      const source = model.getValue()
      const stale = () =>
        disposed ||
        token?.isCancellationRequested ||
        request !== formatSequence ||
        instance.getModel() !== model ||
        model.uri.toString() !== uri.toString() ||
        model.getVersionId() !== version ||
        currentLanguage.current !== language
      setFormatFailure('')
      try {
        const formatted = await formatCode(source, language)
        if (stale()) return null
        // Monaco 0.55.1 cannot safely group EOL and text changes through Undo/Redo.
        // Keep the model EOL; the pure formatter still uses common LF options.
        const code = formatted.replace(/\r\n|\r|\n/g, model.getEOL())
        if (code === source) return null
        return { code, language }
      } catch (error) {
        if (!stale()) {
          const position =
            error instanceof CodeFormatError ? error.position : undefined
          setFormatFailure(
            (position ? position.line + ':' + position.column + ' ' : '') +
              (error instanceof Error ? error.message : String(error)),
          )
        }
        return null
      }
    }
    const applyFormat = async (token?: monaco.CancellationToken) => {
      const next = await prepareFormat(token)
      if (next) controller.current?.replace(next)
    }
    const providers = ['html', 'javascript', 'typescript'].map((language) =>
      monaco.languages.registerDocumentFormattingEditProvider(language, {
        async provideDocumentFormattingEdits(target, _options, token) {
          if (target !== model) return []
          const next = await prepareFormat(token)
          return next
            ? [
                {
                  range: model.getFullModelRange(),
                  text: next.code,
                },
              ]
            : []
        },
      }),
    )
    controller.current = {
      format: applyFormat,
      select: (next) => {
        select(next)
        validate()
      },
      replace: (next) => {
        if (
          next.code === model.getValue() &&
          next.language === currentLanguage.current
        )
          return
        const before = model.getAlternativeVersionId()
        const beforeLanguage = currentLanguage.current
        replacing = true
        instance.pushUndoStop()
        instance.executeEdits('study-replace', [
          { range: model.getFullModelRange(), text: next.code },
        ])
        instance.pushUndoStop()
        select(next.language)
        const after = model.getAlternativeVersionId()
        boundaries.push({
          before,
          after,
          beforeLanguage,
          afterLanguage: next.language,
        })
        previousVersion = after
        replacing = false
        notify()
        validate()
      },
    }
    const change = model.onDidChangeContent((event) => {
      formatSequence++
      setFormatFailure('')
      const next = model.getAlternativeVersionId()
      if (replacing) return
      const boundary = boundaries.findLast((item) =>
        event.isUndoing
          ? item.after === previousVersion && item.before === next
          : event.isRedoing &&
            item.before === previousVersion &&
            item.after === next,
      )
      if (boundary)
        select(
          event.isUndoing ? boundary.beforeLanguage : boundary.afterLanguage,
        )
      previousVersion = next
      notify()
      validate()
    })
    validate()
    return () => {
      disposed = true
      sequence++
      formatSequence++
      providers.forEach((provider) => provider.dispose())
      window.clearTimeout(timer)
      change.dispose()
      instance.dispose()
      model.dispose()
      editor.current = null
      controller.current = null
    }
  }, [unitId])
  useEffect(() => {
    editor.current?.updateOptions({ wordWrap: wrap ? 'on' : 'off' })
  }, [wrap, language, unitId])
  useEffect(() => {
    editor.current?.updateOptions({ ariaLabel: messages[locale].sourceCode })
  }, [locale, language, unitId])
  useEffect(() => {
    if (currentLanguage.current !== language)
      controller.current?.select(language)
  }, [language])
  return (
    <div className="code-workbench">
      {formatFailure && (
        <p className="format-error" role="alert">
          {message(locale, 'formatFailed', { error: formatFailure })}
        </p>
      )}
      <div ref={host} className="monaco-host" />
      <div className="code-check-status" role="status">
        {status === 'loading'
          ? text.preparingLanguageService
          : status === 'waiting'
            ? text.waitingForCheck
            : status === 'html'
              ? text.htmlSourceReady
              : status === 'invalid'
                ? message(locale, 'editorErrorCount', { count: issues.length })
                : status === 'valid'
                  ? text.codeCheckPassed
                  : message(locale, 'languageServiceError', {
                      error: failure.emit ? text.emitFailed : failure.details,
                    })}
      </div>
      {issues.length > 0 && (
        <ul className="code-issues" aria-label={text.codeIssues}>
          {issues.map((issue, index) => (
            <li key={index}>
              <button
                onClick={() => {
                  editor.current?.setPosition({
                    lineNumber: issue.startLineNumber,
                    column: issue.startColumn,
                  })
                  editor.current?.revealLineInCenter(issue.startLineNumber)
                  editor.current?.focus()
                }}
              >
                {issue.startLineNumber}:{issue.startColumn} · {issue.message}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
