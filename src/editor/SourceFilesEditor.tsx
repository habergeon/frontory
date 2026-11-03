import { splitExample } from './splitExample'
import { useEffect, useImperativeHandle, useRef, useState } from 'react'
import type { Ref } from 'react'
import CodeEditor, {
  type CodeEditorHandle,
  type Compilation,
} from './CodeEditor'
import type { CodeLanguage } from '../shared/drafts'
import {
  composeSource,
  splitSource,
  type SourceFile,
  type SourceFiles,
} from '../shared/sourceFiles'
import { useLocale } from '../i18n/LocaleProvider'

interface Replacement {
  code: string
  language: CodeLanguage
  files?: SourceFiles
}
interface Props {
  ref?: Ref<CodeEditorHandle>
  value: string
  language: CodeLanguage
  files?: SourceFiles
  original?: string
  wrap: boolean
  unitId: string
  onChange: (value: Replacement) => void
  onCompile: (value: Compilation) => void
}
const names = { html: 'index.html', javascript: 'script.js', css: 'style.css' }
const fileOrder: SourceFile[] = ['html', 'javascript', 'css']

export default function SourceFilesEditor(props: Props) {
  const { locale } = useLocale()
  const initial = (code: string, language: CodeLanguage) =>
    language === 'javascript' && code === props.original
      ? splitExample(code, locale)
      : splitSource(code, language)
  const [files, setFiles] = useState(
    () => props.files ?? initial(props.value, props.language),
  )
  const [scriptLanguage, setScriptLanguage] = useState<
    'javascript' | 'typescript'
  >(
    props.files?.scriptLanguage ??
      (props.language === 'typescript' ? 'typescript' : 'javascript'),
  )
  const [active, setActive] = useState<SourceFile>(
    files.mode === 'document' || files.html ? 'html' : 'javascript',
  )
  const [compiled, setCompiled] = useState<Compilation | null>(null)
  const handles = useRef<Partial<Record<SourceFile, CodeEditorHandle | null>>>(
    {},
  )
  const buttons = useRef<Partial<Record<SourceFile, HTMLButtonElement | null>>>(
    {},
  )
  const latest = useRef(files)
  latest.current = files
  const callbacks = useRef(props)
  callbacks.current = props
  const replacing = useRef(false)
  const publish = (
    next: SourceFiles,
    language = scriptLanguage,
    persist = true,
  ) => {
    latest.current = next
    setFiles(next)
    if (persist && !replacing.current)
      callbacks.current.onChange({
        files: { ...next, scriptLanguage: language },
        code: composeSource(next),
        language: next.mode === 'document' ? 'html' : language,
      })
  }
  useEffect(() => {
    const code = composeSource(files)
    const language = files.mode === 'document' ? 'html' : scriptLanguage
    const current =
      compiled?.source === files.javascript &&
      compiled.language === scriptLanguage
    callbacks.current.onCompile({
      source: code,
      language,
      output:
        current && compiled.output !== null
          ? composeSource(files, compiled.output)
          : null,
      error: current ? compiled.error : null,
    })
  }, [files, compiled, scriptLanguage])
  useImperativeHandle(props.ref, () => ({
    replace(next) {
      if (next.language === 'css') return
      const replacement = initial(next.code, next.language)
      const beforeMode = latest.current.mode
      const language =
        next.language === 'typescript' ? 'typescript' : 'javascript'
      setScriptLanguage(language)
      latest.current = replacement
      replacing.current = true
      for (const file of fileOrder) {
        handles.current[file]?.replace(
          {
            code: replacement[file],
            language: file === 'javascript' ? language : file,
          },
          (direction) => {
            latest.current = {
              ...latest.current,
              mode: direction === 'undo' ? beforeMode : replacement.mode,
            }
          },
        )
      }
      replacing.current = false
      // Monaco preserves each model's EOL; callbacks contain its actual text.
      publish(latest.current, language)
      setActive(
        replacement.mode === 'document' || replacement.html
          ? 'html'
          : 'javascript',
      )
    },
    async format() {
      await handles.current[active]?.format()
    },
  }))
  return (
    <div className="source-files-editor">
      <div
        className="source-file-tabs"
        role="tablist"
        aria-label={locale === 'ko' ? '실행 파일' : 'Source files'}
      >
        {fileOrder.map((file, index) => (
          <button
            key={file}
            ref={(element) => {
              buttons.current[file] = element
            }}
            id={'file-tab-' + file}
            role="tab"
            aria-selected={active === file}
            aria-controls={'file-panel-' + file}
            tabIndex={active === file ? 0 : -1}
            onClick={() => setActive(file)}
            onKeyDown={(event) => {
              const next =
                event.key === 'ArrowRight'
                  ? (index + 1) % 3
                  : event.key === 'ArrowLeft'
                    ? (index + 2) % 3
                    : event.key === 'Home'
                      ? 0
                      : event.key === 'End'
                        ? 2
                        : null
              if (next === null) return
              event.preventDefault()
              setActive(fileOrder[next])
              buttons.current[fileOrder[next]]?.focus()
            }}
          >
            {file === 'javascript' && scriptLanguage === 'typescript'
              ? 'script.ts'
              : names[file]}
          </button>
        ))}
      </div>
      {active === 'javascript' && (
        <label className="editor-caption">
          {locale === 'ko' ? '스크립트 언어' : 'Script language'}
          <select
            id="code-language"
            value={scriptLanguage}
            onChange={(event) => {
              const language = event.target.value as 'javascript' | 'typescript'
              setScriptLanguage(language)
              publish(latest.current, language)
            }}
          >
            <option value="javascript">JavaScript</option>
            <option value="typescript">TypeScript</option>
          </select>
        </label>
      )}
      {fileOrder.map((file) => (
        <div
          key={file}
          id={'file-panel-' + file}
          role="tabpanel"
          aria-labelledby={'file-tab-' + file}
          hidden={active !== file}
          className="source-file-panel"
        >
          <CodeEditor
            ref={(handle) => {
              handles.current[file] = handle
            }}
            unitId={props.unitId + '/' + file + '/source'}
            wrap={props.wrap}
            value={files[file]}
            language={file === 'javascript' ? scriptLanguage : file}
            syntaxOnly={files.mode === 'document'}
            formatOnLoad={file === 'html' || file === 'css'}
            onChange={(next) => {
              const language =
                file === 'javascript'
                  ? (next.language as 'javascript' | 'typescript')
                  : scriptLanguage
              if (file === 'javascript') setScriptLanguage(language)
              publish({ ...latest.current, [file]: next.code }, language)
            }}
            onDisplayChange={(next) =>
              publish(
                { ...latest.current, [file]: next.code },
                scriptLanguage,
                false,
              )
            }
            onCompile={file === 'javascript' ? setCompiled : () => {}}
          />
        </div>
      ))}
      <p className="panel-hint">
        {locale === 'ko'
          ? '세 파일은 함께 실행되며 자동 저장됩니다. 코드 정렬은 선택한 파일에 적용됩니다.'
          : 'All three files run together and are saved automatically. Format applies to the selected file.'}
      </p>
    </div>
  )
}
