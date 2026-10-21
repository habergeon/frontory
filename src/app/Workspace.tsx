import { lazy, Suspense, useState } from 'react'
import { draftStore, restoreCode, type Draft, type CodeLanguage, type LearningProgress } from '../shared/drafts'
import type { Compilation } from '../editor/CodeEditor'
import { MarkdownView } from '../shared/MarkdownView'
import { Preview } from '../preview/Preview'
import type { Unit } from './curriculum'

type Panel = 'result' | 'code' | 'notes'
const CodeEditor = lazy(() => import('../editor/CodeEditor'))
export function Workspace({ unit, onProgressChange }: { unit: Unit; onProgressChange: () => void }) {
  const [saved, setSaved] = useState(() => draftStore.load(unit.id, unit.source ?? ''))
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
    ? '코드 검사 중 · 마지막 정상 장면 유지'
    : compilation?.error ? '문법·타입 오류 · 마지막 정상 장면 유지' : undefined
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
    <div className="learning-status" role="group" aria-label="학습 상태">
      <span>나의 학습 상태</span>
      {([['not-started','미시작'],['in-progress','진행 중'],['completed','완료']] as const).map(([value,label]) => <button key={value} aria-pressed={(draft.progress ?? 'not-started') === value} onClick={() => { save({ ...draft, progress: value as LearningProgress }); onProgressChange() }}>{label}</button>)}
      <small>완료 조건을 확인하고 직접 표시하세요.</small>
    </div>
    <div className="save-row">
      <span role="status">{warning ? '저장 확인 필요' : draft.updatedAt ? '브라우저에 저장됨 · ' + new Date(draft.updatedAt).toLocaleTimeString('ko-KR') : '원본 예제 · 편집하면 자동 저장'}</span>
      <span>현재 브라우저에만 저장 · 필기는 Markdown으로 백업하세요.</span>
    </div>
    {warning && <div className="storage-warning" role="alert"><p>{warning}</p><button onClick={() => save(draft)}>저장 다시 시도</button></div>}
    {unit.exampleNote && <p className="example-note" role="note">{unit.exampleNote}</p>}
    {unit.source && draft.code === '' && <p className="example-note">빈 코드 기록이 보존되어 있습니다. 새 예제를 불러오려면 ‘원본 코드로’를 선택하세요. 필기는 유지됩니다.</p>}
    <div className="mobile-tabs" role="tablist" aria-label="실습 영역">
      {(['result', 'code', 'notes'] as const).map((value, index) =>
        <button key={value} role="tab" id={'tab-' + value} aria-selected={panel === value} aria-controls={'panel-' + value}
          onClick={() => setPanel(value)}>{['실습 화면', '실행 코드', 'Markdown 필기'][index]}</button>)}
    </div>
    <div className="workspace">
      <section id="panel-result" className={'panel ' + (panel === 'result' ? 'mobile-active' : '')} aria-label="실습 화면">
        <header className="panel-header"><div><span className="eyebrow">01 / PREVIEW</span><h2>실습 화면</h2></div>
          {unit.source !== undefined && <button onClick={() => setRevision(value => value + 1)}>다시 실행</button>}
        </header>
        {unit.source !== undefined ? (executable !== null ? <Preview code={executable} revision={revision} notice={notice} /> : <div className="empty-state"><p>{compilation?.error ? '코드 오류를 수정하면 장면이 실행됩니다.' : '편집기와 언어 서비스를 준비하고 있습니다…'}</p></div>) :
          <div className="empty-state"><span>문서 기반 실습</span><h3>과제를 따라 직접 구현하는 단위입니다.</h3><p>상단의 순서와 학습 문서의 준비 환경을 확인해 별도 프로젝트에서 실습하세요. 이 단위에는 내장 실행 예제가 없습니다. 결과와 코드 파일 위치를 오른쪽 필기에 기록할 수 있습니다.</p></div>}
      </section>
      <section id="panel-code" className={'panel ' + (panel === 'code' ? 'mobile-active' : '')} aria-label="실행 코드 편집">
        <header className="panel-header"><div><span className="eyebrow">02 / SOURCE</span><h2>실행 코드</h2></div>
          <button disabled={unit.source === undefined} onClick={() => setConfirmReset(true)}>원본 코드로</button>
        </header>
        {confirmReset && <div className="reset-confirm" role="alert"><p>코드를 원본 JavaScript로 되돌립니다. 필기는 유지됩니다.</p><div><button onClick={reset}>코드만 되돌리기</button><button onClick={() => setConfirmReset(false)}>취소</button></div></div>}
        <div className="editor-caption">{unit.source !== undefined ? <><label htmlFor="code-language">언어 </label><select id="code-language" value={language} onChange={event => save({ ...draft, language: event.target.value as CodeLanguage })}><option value="javascript">JavaScript</option><option value="typescript">TypeScript</option></select><span> · Monaco · 600ms 후 검사·반영</span></> : '문서 기반 직접 구현'}</div>
        {unit.source !== undefined ? <Suspense fallback={<div className="empty-state">코드 편집기 로딩 중…</div>}><CodeEditor value={draft.code} language={language} unitId={unit.id}
          onChange={code => save({ ...draft, code })} onCompile={result => { setCompilation(result); if (result.output !== null) setExecutable(result.output) }} /></Suspense> : <div className="empty-state">이 단위는 별도 프로젝트에서 구현합니다. 준비 환경과 과제는 상단 학습 문서에서 확인하세요.</div>}
        <p className="panel-hint">{unit.source !== undefined ? 'mount 함수가 실제로 실행됩니다. 원본 복원은 코드·언어를 되돌리고 필기를 유지합니다.' : '별도 프로젝트의 코드는 작업 폴더에서 보관하세요. Frontory에는 필기와 학습 상태를 저장합니다.'}</p>
      </section>
      <section id="panel-notes" className={'panel ' + (panel === 'notes' ? 'mobile-active' : '')} aria-label="Markdown 필기">
        <header className="panel-header"><div><span className="eyebrow">03 / NOTES</span><h2>Markdown 필기</h2></div>
          <button onClick={download} title="현재 단위의 필기를 Markdown 파일로 저장">MD 다운로드</button>
        </header>
        <div className="notes-toolbar">
          <button aria-pressed={!notePreview} onClick={() => setNotePreview(false)}>작성</button>
          <button aria-pressed={notePreview} onClick={() => setNotePreview(true)}>미리보기</button>
          <span>단위 {String(unit.day).padStart(2, '0')}</span>
        </div>
        {notePreview ? <div className="notes-preview"><MarkdownView text={draft.notes} /></div> :
          <textarea aria-label="Markdown 필기" className="notes-editor" spellCheck={false} value={draft.notes}
            onChange={event => save({ ...draft, notes: event.target.value })} />}
        <p className="panel-hint">예상 → 관찰 → 설명. 실제 결과는 직접 기록하세요.</p>
      </section>
    </div>
  </>
}
