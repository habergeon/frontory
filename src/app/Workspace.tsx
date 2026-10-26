import { useLocale } from '../i18n/LocaleProvider'
import { message, messages, learningMessages } from '../i18n/messages'
import {
  lazy,
  useEffect,
  type ReactNode,
  Suspense,
  useImperativeHandle,
  useLayoutEffect,
  useRef,
  useState,
  type Ref,
} from 'react'
import {
  draftStore,
  type Draft,
  type CodeLanguage,
  type LearningProgress,
} from '../shared/drafts'
import type { PreviewInput } from '../preview/types'
import type { CodeEditorHandle, Compilation } from '../editor/CodeEditor'
import { MarkdownView } from '../shared/MarkdownView'
import { Preview } from '../preview/Preview'
import type { Unit } from './curriculum'

const panels = ['result', 'code', 'notes'] as const
type Panel = (typeof panels)[number] | 'reading'
export interface WorkspaceHandle {
  focusCode: () => void
}
const CodeEditor = lazy(() => import('../editor/CodeEditor'))
export function Workspace({
  unit,
  onProgressChange,
  ref,
  reading,
  readingActive = true,
  onReadingChange,
}: {
  unit: Unit
  onProgressChange: () => void
  ref?: Ref<WorkspaceHandle>
  reading?: (
    load: (example: { code: string; language: 'html' }) => void,
    notes: () => void,
  ) => ReactNode
  readingActive?: boolean
  onReadingChange?: (reading: boolean) => void
}) {
  const { locale } = useLocale()
  const text = messages[locale]
  const [saved, setSaved] = useState(() =>
    draftStore.begin(unit.id, unit.source ?? '', locale, unit.sourceLanguage),
  )
  const editorHandle = useRef<CodeEditorHandle>(null)
  const [panel, setPanel] = useState<Panel>(reading ? 'reading' : 'result')
  const availablePanels: Panel[] = reading
    ? ['reading', 'code', 'result', 'notes']
    : [...panels]
  const choosePanel = (value: Panel) => {
    setPanel(value)
    onReadingChange?.(value === 'reading')
  }
  useEffect(() => {
    if (reading && readingActive && panel !== 'reading') setPanel('reading')
    else if (reading && !readingActive && panel === 'reading') setPanel('code')
  }, [readingActive, !!reading])
  const [wideCode, setWideCode] = useState(false)
  const [wrapCode, setWrapCode] = useState(true)
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([])
  const codePanel = useRef<HTMLElement>(null)
  const focusRequested = useRef(false)
  const focusCodePanel = () => {
    codePanel.current?.focus({ preventScroll: true })
    codePanel.current?.scrollIntoView({ block: 'start' })
  }
  useImperativeHandle(
    ref,
    () => ({
      focusCode: () => {
        if (panel === 'code') focusCodePanel()
        else {
          focusRequested.current = true
          choosePanel('code')
        }
      },
    }),
    [panel],
  )
  useLayoutEffect(() => {
    if (!focusRequested.current) return
    focusRequested.current = false
    focusCodePanel()
  }, [panel])
  const [notePreview, setNotePreview] = useState(false)
  const [revision, setRevision] = useState(0)
  const [confirmReset, setConfirmReset] = useState(false)
  const [compilation, setCompilation] = useState<Compilation | null>(null)
  const [executable, setExecutable] = useState<PreviewInput | null>(null)
  const { draft, warning } = saved
  const latestDraft = useRef(draft)
  latestDraft.current = draft
  const language = draft.language ?? 'javascript'
  const checked =
    compilation?.source === draft.code && compilation.language === language
  const notice =
    !checked || (!compilation?.error && compilation?.output === null)
      ? text.checkingCode
      : compilation?.error
        ? text.invalidCode
        : undefined
  const save = (next: Draft) => {
    latestDraft.current = next
    setSaved(draftStore.save(unit.id, next))
  }
  const reset = () => {
    if (unit.source !== undefined) {
      editorHandle.current?.replace({
        code: unit.source,
        language: unit.sourceLanguage ?? 'javascript',
      })
      setRevision((value) => value + 1)
      setConfirmReset(false)
    }
  }
  const download = () => {
    const url = URL.createObjectURL(
      new Blob([draft.notes], { type: 'text/markdown;charset=utf-8' }),
    )
    const link = document.createElement('a')
    link.href = url
    link.download = unit.id + '-notes.md'
    link.click()
    window.setTimeout(() => URL.revokeObjectURL(url), 1000)
  }
  return (
    <div className={reading ? 'contained-learning active-' + panel : undefined}>
      {(unit.exampleReadingSource || !!unit.exampleFiles?.length) && (
        <div className="learning-resources">
          {unit.exampleReadingSource && (
            <p>
              <a href={unit.exampleReadingSource} download>
                {text.downloadEnglishReadingSource}
              </a>
            </p>
          )}
          {!!unit.exampleFiles?.length && (
            <details>
              <summary>{text.downloadExampleFiles}</summary>
              <p>{text.originalFilesHint}</p>
              <ul>
                {unit.exampleFiles.map((file) => (
                  <li key={file}>
                    <a
                      href={'/examples/' + file.slice('src/labs/'.length)}
                      download
                    >
                      {file.split('/').pop()}
                    </a>
                  </li>
                ))}
              </ul>
            </details>
          )}
        </div>
      )}
      <div
        className="learning-status"
        role="group"
        aria-label={text.learningStatus}
      >
        <span>{text.myLearningStatus}</span>
        {(
          [
            ['not-started', text.notStarted],
            ['in-progress', text.inProgress],
            ['completed', text.completed],
          ] as const
        ).map(([value, label]) => (
          <button
            key={value}
            aria-pressed={(draft.progress ?? 'not-started') === value}
            onClick={() => {
              save({ ...draft, progress: value as LearningProgress })
              onProgressChange()
            }}
          >
            {label}
          </button>
        ))}
        {reading && (
          <button
            className="notes-toggle"
            aria-expanded={panel === 'notes'}
            aria-controls="panel-notes"
            onClick={() => choosePanel(panel === 'notes' ? 'reading' : 'notes')}
          >
            {text.markdownNotes}
          </button>
        )}
        <small>{text.markCompletion}</small>
      </div>
      <div className="save-row">
        <span role="status">
          {warning
            ? text.saveNeedsCheck
            : draft.updatedAt
              ? message(locale, 'savedAt', {
                  time: new Date(draft.updatedAt).toLocaleTimeString(
                    locale === 'ko' ? 'ko-KR' : 'en-US',
                  ),
                })
              : text.originalExample}
        </span>
        <span>{text.localStorageHint}</span>
      </div>
      {warning && (
        <div className="storage-warning" role="alert">
          <p>
            {warning === 'read-failed'
              ? text.storageReadFailed
              : text.storageWriteFailed}
          </p>
          <button onClick={() => save(draft)}>{text.retrySave}</button>
        </div>
      )}
      {unit.source && draft.code === '' && (
        <p className="example-note">{text.emptyCodePreserved}</p>
      )}
      {reading && (
        <div
          className="tablet-learning-tabs"
          role="group"
          aria-label={text.learningView}
        >
          <button
            aria-pressed={panel === 'reading'}
            onClick={() => choosePanel('reading')}
          >
            {text.readingView}
          </button>
          <button
            aria-pressed={panel !== 'reading'}
            onClick={() => choosePanel('code')}
          >
            {text.practiceView}
          </button>
          <button
            aria-pressed={panel === 'notes'}
            onClick={() => choosePanel('notes')}
          >
            {text.markdownNotes}
          </button>
        </div>
      )}
      <div className="mobile-tabs" role="tablist" aria-label={text.workspace}>
        {availablePanels.map((value, index) => (
          <button
            key={value}
            ref={(element) => {
              tabRefs.current[index] = element
            }}
            role="tab"
            id={'tab-' + value}
            aria-selected={panel === value}
            aria-controls={'panel-' + value}
            tabIndex={panel === value ? 0 : -1}
            onKeyDown={(event) => {
              const next =
                event.key === 'ArrowRight'
                  ? (index + 1) % availablePanels.length
                  : event.key === 'ArrowLeft'
                    ? (index + availablePanels.length - 1) %
                      availablePanels.length
                    : event.key === 'Home'
                      ? 0
                      : event.key === 'End'
                        ? availablePanels.length - 1
                        : null
              if (next === null) return
              event.preventDefault()
              choosePanel(availablePanels[next])
              tabRefs.current[next]?.focus()
            }}
            onClick={() => choosePanel(value)}
          >
            {
              {
                result: text.practiceScreen,
                code: text.sourceCode,
                notes: text.markdownNotes,
                reading: text.readingView,
              }[value]
            }
          </button>
        ))}
      </div>
      <div className={'workspace' + (wideCode ? ' wide-code' : '')}>
        {reading && (
          <section
            id="panel-reading"
            role="tabpanel"
            aria-label={text.readingView}
            className={
              'panel reading-panel ' +
              (panel === 'reading' ? 'mobile-active' : '')
            }
          >
            {reading(
              (example) => editorHandle.current?.replace(example),
              () => choosePanel('notes'),
            )}
          </section>
        )}
        <section
          ref={codePanel}
          id="panel-code"
          role="tabpanel"
          aria-label={text.sourceCode}
          tabIndex={0}
          className={'panel ' + (panel === 'code' ? 'mobile-active' : '')}
        >
          <header className="panel-header">
            <div>
              <span className="eyebrow">02 / SOURCE</span>
              <h2>{text.sourceCode}</h2>
            </div>
            <div className="code-panel-actions">
              <button
                disabled={unit.source === undefined}
                onClick={() => setConfirmReset(true)}
              >
                {text.restoreOriginal}
              </button>
              <button
                disabled={unit.source === undefined}
                onClick={() => void editorHandle.current?.format()}
              >
                {text.formatCode}
              </button>
              <button
                className="wide-code-toggle"
                aria-pressed={wideCode}
                onClick={() => setWideCode((value) => !value)}
              >
                {wideCode ? text.showAllPanels : text.widenCode}
              </button>
              <button
                disabled={unit.source === undefined}
                aria-pressed={wrapCode}
                onClick={() => setWrapCode((value) => !value)}
              >
                {text.wrapLines}
              </button>
            </div>
          </header>
          {confirmReset && (
            <div className="reset-confirm" role="alert">
              <p>{text.resetConfirmation}</p>
              <div>
                <button onClick={reset}>{text.resetCodeOnly}</button>
                <button onClick={() => setConfirmReset(false)}>
                  {text.cancel}
                </button>
              </div>
            </div>
          )}
          <div className="editor-caption">
            {unit.source !== undefined ? (
              <>
                <label htmlFor="code-language">{text.codeLanguage}</label>
                <select
                  id="code-language"
                  value={language}
                  onChange={(event) =>
                    save({
                      ...draft,
                      language: event.target.value as CodeLanguage,
                    })
                  }
                >
                  <option value="javascript">JavaScript</option>
                  <option value="typescript">TypeScript</option>
                  <option value="html">HTML</option>
                </select>
                <span>{text.editorCaption}</span>
              </>
            ) : (
              text.documentImplementation
            )}
          </div>
          {unit.source !== undefined ? (
            <Suspense
              fallback={<div className="empty-state">{text.loadingEditor}</div>}
            >
              <CodeEditor
                ref={editorHandle}
                wrap={wrapCode}
                value={draft.code}
                language={language}
                unitId={unit.id}
                onChange={(replacement) =>
                  save({ ...latestDraft.current, ...replacement })
                }
                onCompile={(result) => {
                  const current = latestDraft.current
                  if (
                    result.source !== current.code ||
                    result.language !== (current.language ?? 'javascript')
                  )
                    return
                  setCompilation(result)
                  if (result.output !== null)
                    setExecutable({
                      code: result.output,
                      kind: result.language === 'html' ? 'html' : 'javascript',
                      profile:
                        result.language === 'html'
                          ? unit.runtimeProfile === 'threejs'
                            ? 'threejs'
                            : 'html'
                          : 'legacy',
                    })
                }}
              />
            </Suspense>
          ) : (
            <div className="empty-state">{text.separateProjectHint}</div>
          )}
          <p className="panel-hint">
            {unit.source !== undefined
              ? language === 'html'
                ? learningMessages[locale].htmlRuntimeHint
                : text.mountHint
              : text.separateCodeHint}
          </p>
        </section>
        <section
          id="panel-result"
          role="tabpanel"
          aria-label={text.practiceScreen}
          tabIndex={0}
          className={'panel ' + (panel === 'result' ? 'mobile-active' : '')}
        >
          <header className="panel-header">
            <div>
              <span className="eyebrow">01 / PREVIEW</span>
              <h2>{text.practiceScreen}</h2>
            </div>
            {unit.source !== undefined && (
              <button onClick={() => setRevision((value) => value + 1)}>
                {text.rerun}
              </button>
            )}
          </header>
          {unit.source !== undefined ? (
            executable !== null ? (
              <Preview
                locale={locale}
                input={executable}
                revision={revision}
                notice={notice}
              />
            ) : (
              <div className="empty-state">
                <p>
                  {compilation?.error
                    ? text.fixCodeToRun
                    : text.preparingEditor}
                </p>
              </div>
            )
          ) : (
            <div className="empty-state">
              <span>{text.documentPractice}</span>
              <h3>{text.implementTask}</h3>
              <p>{text.documentPracticeHint}</p>
            </div>
          )}
        </section>
        <section
          id="panel-notes"
          role="tabpanel"
          aria-label={text.markdownNotes}
          tabIndex={0}
          className={'panel ' + (panel === 'notes' ? 'mobile-active' : '')}
        >
          <header className="panel-header">
            <div>
              <span className="eyebrow">03 / NOTES</span>
              <h2>{text.markdownNotes}</h2>
            </div>
            <button onClick={download} title={text.downloadNotesTitle}>
              {text.downloadMarkdown}
            </button>
          </header>
          <div className="notes-toolbar">
            <button
              aria-pressed={!notePreview}
              onClick={() => setNotePreview(false)}
            >
              {text.write}
            </button>
            <button
              aria-pressed={notePreview}
              onClick={() => setNotePreview(true)}
            >
              {text.preview}
            </button>
            <span>
              {message(locale, 'unitDay', {
                day: String(unit.day).padStart(2, '0'),
              })}
            </span>
          </div>
          <div hidden={!notePreview} className="notes-preview">
            <MarkdownView locale={locale} text={draft.notes} />
          </div>
          <textarea
            hidden={notePreview}
            aria-label={text.markdownNotes}
            className="notes-editor"
            spellCheck={false}
            value={draft.notes}
            onChange={(event) => save({ ...draft, notes: event.target.value })}
          />
          <p className="panel-hint">{text.notesHint}</p>
        </section>
      </div>
    </div>
  )
}
