import { useEffect, useRef, useState } from 'react'
import { monaco } from './monaco'
import type { CodeLanguage } from '../shared/drafts'

export interface Compilation { source: string; language: CodeLanguage; output: string | null; error: string | null }
interface Props { value: string; language: CodeLanguage; unitId: string; onChange: (value: string) => void; onCompile: (result: Compilation) => void }

export default function CodeEditor({ value, language, unitId, onChange, onCompile }: Props) {
  const host = useRef<HTMLDivElement>(null)
  const editor = useRef<monaco.editor.IStandaloneCodeEditor | null>(null)
  const callbacks = useRef({ onChange, onCompile })
  callbacks.current = { onChange, onCompile }
  const initialValue = useRef(value)
  initialValue.current = value
  const [status, setStatus] = useState('언어 서비스 준비 중…')
  const [issues, setIssues] = useState<monaco.editor.IMarkerData[]>([])
  useEffect(() => {
    const uri = monaco.Uri.parse('file:///labs/' + unitId + '/example.' + (language === 'typescript' ? 'ts' : 'js'))
    const model = monaco.editor.createModel(initialValue.current, language, uri)
    const instance = monaco.editor.create(host.current!, {
      model, automaticLayout: true, minimap: { enabled: false }, fontSize: 12,
      lineNumbers: 'on', scrollBeyondLastLine: false, tabSize: 2,
      ariaLabel: '실행 코드', theme: 'vs', fixedOverflowWidgets: true,
      padding: { top: 12 }, wordWrap: 'off', renderValidationDecorations: 'on',
    })
    editor.current = instance
    let timer: number | undefined
    let sequence = 0
    let disposed = false
    const validate = () => {
      window.clearTimeout(timer)
      const request = ++sequence
      const source = model.getValue()
      setStatus('검사 대기 · 600ms')
      setIssues([])
      callbacks.current.onCompile({ source, language, output: null, error: null })
      timer = window.setTimeout(async () => {
        try {
          const factory = await (language === 'typescript' ? monaco.typescript.getTypeScriptWorker() : monaco.typescript.getJavaScriptWorker())
          const worker = await factory(uri)
          const [syntax, semantic] = await Promise.all([worker.getSyntacticDiagnostics(uri.toString()), worker.getSemanticDiagnostics(uri.toString())])
          if (disposed || request !== sequence) return
          const flatten = (message: string | { messageText: string; next?: Array<string | { messageText: string }> }): string => typeof message === 'string' ? message : [message.messageText, ...(message.next?.map(flatten) ?? [])].join('\n')
          const markers = [...syntax, ...semantic].filter(item => item.category === 1).map(item => {
            const start = model.getPositionAt(item.start ?? 0)
            const end = model.getPositionAt((item.start ?? 0) + Math.max(item.length ?? 1, 1))
            return { severity: monaco.MarkerSeverity.Error, message: flatten(item.messageText ?? ''), startLineNumber: start.lineNumber, startColumn: start.column, endLineNumber: end.lineNumber, endColumn: end.column, code: String(item.code) }
          })
          monaco.editor.setModelMarkers(model, 'study-check', markers)
          setIssues(markers)
          if (markers.length) {
            setStatus('오류 ' + markers.length + '개 · 실행 보류')
            callbacks.current.onCompile({ source, language, output: null, error: markers.map(item => item.startLineNumber + ':' + item.startColumn + ' ' + item.message).join('\n') })
            return
          }
          const emitted = await worker.getEmitOutput(uri.toString())
          if (disposed || request !== sequence) return
          const output = language === 'javascript' ? source : emitted.outputFiles.find(file => file.name.endsWith('.js'))?.text
          if (output === undefined) throw new Error('TypeScript 변환 결과를 생성하지 못했습니다.')
          setStatus('문법·타입 검사 통과')
          callbacks.current.onCompile({ source, language, output, error: null })
        } catch (error) {
          if (disposed || request !== sequence) return
          const message = error instanceof Error ? error.message : String(error)
          setStatus('언어 서비스 오류: ' + message + ' · 다시 검사하려면 코드를 수정하세요.')
          callbacks.current.onCompile({ source, language, output: null, error: message })
        }
      }, 600)
    }
    const change = model.onDidChangeContent(() => { callbacks.current.onChange(model.getValue()); validate() })
    validate()
    return () => { disposed = true; sequence++; window.clearTimeout(timer); change.dispose(); instance.dispose(); model.dispose(); editor.current = null }
  }, [language, unitId])
  useEffect(() => { const model = editor.current?.getModel(); if (model && model.getValue() !== value) model.setValue(value) }, [value])
  return <div className="code-workbench">
    <div ref={host} className="monaco-host" />
    <div className="code-check-status" role="status">{status}</div>
    {issues.length > 0 && <ul className="code-issues" aria-label="코드 오류 목록">{issues.map((issue, index) => <li key={index}><button onClick={() => { editor.current?.setPosition({ lineNumber: issue.startLineNumber, column: issue.startColumn }); editor.current?.revealLineInCenter(issue.startLineNumber); editor.current?.focus() }}>{issue.startLineNumber}:{issue.startColumn} · {issue.message}</button></li>)}</ul>}
  </div>
}
