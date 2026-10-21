import { lazy, Suspense, useEffect, useState } from 'react'
import { units } from './curriculum'
import { Home } from './Home'
import { DocumentDialog } from './DocumentDialog'
import { BackupControls } from './BackupControls'
import { LearningNavigator } from './LearningNavigator'
import { PracticeGuide } from './PracticeGuide'

const Workspace = lazy(() => import('./Workspace').then(module => ({ default: module.Workspace })))
const fromHash = () => units.find(unit => unit.id === window.location.hash.slice(1)) ?? null
export function App() {
  const [selected, setSelected] = useState(fromHash)
  const [documentPath, setDocumentPath] = useState<string | null>(null)
  const [restoreRevision, setRestoreRevision] = useState(0)
  const [, refreshProgress] = useState(0)
  useEffect(() => {
    const sync = () => setSelected(fromHash())
    window.addEventListener('hashchange', sync)
    window.addEventListener('popstate', sync)
    return () => { window.removeEventListener('hashchange', sync); window.removeEventListener('popstate', sync) }
  }, [])
  const select = (id: string) => {
    const unit = units.find(item => item.id === id)
    if (!unit) return
    setSelected(unit)
    if (window.location.hash !== '#' + unit.id) history.pushState(null, '', '#' + unit.id)
    window.scrollTo(0, 0)
  }
  return <main className={'app-shell' + (!selected ? ' home-shell' : '')}>
    <header className="app-header">
      <a className="brand home-brand" href="#" aria-label="Frontory 홈"><span className="brand-mark" aria-hidden="true">F<span>↗</span></span><div><strong>Frontory</strong>{selected && <p>배우고, 실험하고, 나의 경험으로 남기다.</p>}</div></a>
      <nav aria-label="학습 안내">{selected ? <a href="#">홈으로</a> : <a href="#series">시리즈 탐색</a>}<button onClick={() => setDocumentPath('/docs/learning-workspace.md')}>사용법</button>{!selected && <a className="home-github" href="https://github.com/habergeon/frontory" target="_blank" rel="noreferrer">GitHub ↗</a>}</nav>
    </header>
    {!selected ? <Home onSelect={select} /> : <>
    <LearningNavigator selected={selected} onSelect={select} onDocument={setDocumentPath} />
    <PracticeGuide key={selected.id} unit={selected} onDocument={setDocumentPath} />
    <details className="backup-disclosure"><summary>학습 아카이브 · 전체 JSON 내보내기 / 가져오기</summary><BackupControls selectedId={selected.id} onRestore={id => { select(id); setRestoreRevision(value => value + 1) }} /></details>
    <Suspense fallback={<p role="status">실습 환경을 준비하고 있습니다…</p>}><Workspace key={selected.id + ':' + restoreRevision} unit={selected} onProgressChange={() => refreshProgress(value => value + 1)} /></Suspense>
    </>}
    {documentPath && <DocumentDialog initialPath={documentPath} unitPath={selected?.docPath ?? '/docs/labs/README.md'} onClose={() => setDocumentPath(null)} />}
    <footer className="app-footer"><span>Frontory · 기록은 이 브라우저에 저장됩니다. 정기적으로 JSON 백업을 내려받으세요.</span><nav aria-label="서비스 안내"><button onClick={() => setDocumentPath('/docs/privacy.md')}>저장 및 개인정보</button><a href="https://github.com/habergeon/frontory" target="_blank" rel="noreferrer">GitHub</a></nav></footer>
  </main>
}
