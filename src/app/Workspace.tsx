import { useLocale } from '../i18n/LocaleProvider'
import { message, messages } from '../i18n/messages'
import { getLocalizedUnit } from './curriculum'
import { lazy, Suspense, useState } from 'react'
import { draftStore, restoreCode, type Draft, type CodeLanguage, type LearningProgress } from '../shared/drafts'
import type { Compilation } from '../editor/CodeEditor'
import { MarkdownView } from '../shared/MarkdownView'
import { Preview } from '../preview/Preview'
import type { Unit } from './curriculum'

type Panel = 'result' | 'code' | 'notes'
const CodeEditor = lazy(() => import('../editor/CodeEditor'))
export function Workspace({ unit, onProgressChange }: { unit: Unit; onProgressChange: () => void }) {
  const { locale } = useLocale()
  const text = messages[locale]
  const [saved, setSaved] = useState(() => draftStore.begin(unit.id, unit.source ?? '', locale))
  const [panel, setPanel] = useState<Panel>('result')
  const [notePreview, setNotePreview] = useState(false)
  const [revision, setRevision] = useState(0)
  const [confirmReset, setConfirmReset] = useState(false)
  const [compilation, setCompilation] = useState<Compilation | null>(null)
  const [executable, setExecutable] = useState<string | null>(null)
  const { draft, warning } = saved
  const language = draft.language ?? 'javascript'
  const checked = compilation?.source === draft.code && compilation.language === language
  const notice = !checked || (!compilation?.error && compilation?.output === null)
    ? text.checkingCode
    : compilation?.error ? text.invalidCode : undefined
  const save = (next: Draft) => setSaved(draftStore.save(unit.id, next))
  const reset = () => {
    if (unit.source !== undefined) {
      save(restoreCode(draft, unit.source))
      setRevision(value => value + 1)
      setConfirmReset(false)
    }
  }
  const download = () => {
    const url = URL.createObjectURL(new Blob([draft.notes], { type: 'text/markdown;charset=utf-8' }))
    const link = document.createElement('a')
    link.href = url
    link.download = unit.id + '-notes.md'
    link.click()
    window.setTimeout(() => URL.revokeObjectURL(url), 1000)
  }
  return <>
    <div className="learning-status" role="group" aria-label={text.learningStatus}>
      <span>{text.myLearningStatus}</span>
      {([['not-started',text.notStarted],['in-progress',text.inProgress],['completed',text.completed]] as const).map(([value,label]) => <button key={value} aria-pressed={(draft.progress ?? 'not-started') === value} onClick={() => { save({ ...draft, progress: value as LearningProgress }); onProgressChange() }}>{label}</button>)}
      <small>{text.markCompletion}</small>
    </div>
    <div className="save-row">
      <span role="status">{warning ? text.saveNeedsCheck : draft.updatedAt ? message(locale, 'savedAt', { time: new Date(draft.updatedAt).toLocaleTimeString(locale === 'ko' ? 'ko-KR' : 'en-US') }) : text.originalExample}</span>
      <span>{text.localStorageHint}</span>
    </div>
    {warning && <div className="storage-warning" role="alert"><p>{warning === 'read-failed' ? text.storageReadFailed : text.storageWriteFailed}</p><button onClick={() => save(draft)}>{text.retrySave}</button></div>}
    {getLocalizedUnit(locale, unit.id)?.exampleNote && <p className="example-note" role="note">{getLocalizedUnit(locale, unit.id)?.exampleNote}</p>}
    {unit.exampleReadingSource && <p className="example-note"><a href={unit.exampleReadingSource} download>{text.downloadEnglishReadingSource}</a></p>}
    {!!unit.exampleFiles?.length && <details className="example-note"><summary>{text.downloadExampleFiles}</summary><p>{text.originalFilesHint}</p><ul>{unit.exampleFiles.map(file => <li key={file}><a href={'/examples/' + file.slice('src/labs/'.length)} download>{file.split('/').pop()}</a></li>)}</ul></details>}
    {unit.source && draft.code === '' && <p className="example-note">{text.emptyCodePreserved}</p>}
    <div className="mobile-tabs" role="tablist" aria-label={text.workspace}>
      {(['result', 'code', 'notes'] as const).map((value, index) =>
        <button key={value} role="tab" id={'tab-' + value} aria-selected={panel === value} aria-controls={'panel-' + value}
          onClick={() => setPanel(value)}>{[text.practiceScreen, text.sourceCode, text.markdownNotes][index]}</button>)}
    </div>
    <div className="workspace">
      <section id="panel-result" className={'panel ' + (panel === 'result' ? 'mobile-active' : '')} aria-label={text.practiceScreen}>
        <header className="panel-header"><div><span className="eyebrow">01 / PREVIEW</span><h2>{text.practiceScreen}</h2></div>
          {unit.source !== undefined && <button onClick={() => setRevision(value => value + 1)}>{text.rerun}</button>}
        </header>
        {unit.source !== undefined ? (executable !== null ? <Preview locale={locale} code={executable} revision={revision} notice={notice} /> : <div className="empty-state"><p>{compilation?.error ? text.fixCodeToRun : text.preparingEditor}</p></div>) :
          <div className="empty-state"><span>{text.documentPractice}</span><h3>{text.implementTask}</h3><p>{text.documentPracticeHint}</p></div>}
      </section>
      <section id="panel-code" className={'panel ' + (panel === 'code' ? 'mobile-active' : '')} aria-label={text.editSourceCode}>
        <header className="panel-header"><div><span className="eyebrow">02 / SOURCE</span><h2>{text.sourceCode}</h2></div>
          <button disabled={unit.source === undefined} onClick={() => setConfirmReset(true)}>{text.restoreOriginal}</button>
        </header>
        {confirmReset && <div className="reset-confirm" role="alert"><p>{text.resetConfirmation}</p><div><button onClick={reset}>{text.resetCodeOnly}</button><button onClick={() => setConfirmReset(false)}>{text.cancel}</button></div></div>}
        <div className="editor-caption">{unit.source !== undefined ? <><label htmlFor="code-language">{text.codeLanguage}</label><select id="code-language" value={language} onChange={event => save({ ...draft, language: event.target.value as CodeLanguage })}><option value="javascript">JavaScript</option><option value="typescript">TypeScript</option></select><span>{text.editorCaption}</span></> : text.documentImplementation}</div>
        {unit.source !== undefined ? <Suspense fallback={<div className="empty-state">{text.loadingEditor}</div>}><CodeEditor value={draft.code} language={language} unitId={unit.id}
          onChange={code => save({ ...draft, code })} onCompile={result => { setCompilation(result); if (result.output !== null) setExecutable(result.output) }} /></Suspense> : <div className="empty-state">{text.separateProjectHint}</div>}
        <p className="panel-hint">{unit.source !== undefined ? text.mountHint : text.separateCodeHint}</p>
      </section>
      <section id="panel-notes" className={'panel ' + (panel === 'notes' ? 'mobile-active' : '')} aria-label={text.markdownNotes}>
        <header className="panel-header"><div><span className="eyebrow">03 / NOTES</span><h2>{text.markdownNotes}</h2></div>
          <button onClick={download} title={text.downloadNotesTitle}>{text.downloadMarkdown}</button>
        </header>
        <div className="notes-toolbar">
          <button aria-pressed={!notePreview} onClick={() => setNotePreview(false)}>{text.write}</button>
          <button aria-pressed={notePreview} onClick={() => setNotePreview(true)}>{text.preview}</button>
          <span>{message(locale, 'unitDay', { day: String(unit.day).padStart(2, '0') })}</span>
        </div>
        {notePreview ? <div className="notes-preview"><MarkdownView text={draft.notes} /></div> :
          <textarea aria-label={text.markdownNotes} className="notes-editor" spellCheck={false} value={draft.notes}
            onChange={event => save({ ...draft, notes: event.target.value })} />}
        <p className="panel-hint">{text.notesHint}</p>
      </section>
    </div>
  </>
}
