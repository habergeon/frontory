import { useEffect, useState } from 'react'
import { units } from './curriculum'
import { Workspace } from './Workspace'
import { DocumentDialog } from './DocumentDialog'
import { BackupControls } from './BackupControls'
import { LearningNavigator } from './LearningNavigator'

const fromHash = () => units.find(unit => unit.id === window.location.hash.slice(1)) ?? units[0]
export function App() {
  const [selected, setSelected] = useState(fromHash)
  const [documentPath, setDocumentPath] = useState<string | null>(null)
  const [restoreRevision, setRestoreRevision] = useState(0)
  const [, refreshProgress] = useState(0)
  useEffect(() => {
    const sync = () => setSelected(fromHash())
    window.addEventListener('hashchange', sync)
    return () => window.removeEventListener('hashchange', sync)
  }, [])
  const select = (id: string) => {
    const unit = units.find(item => item.id === id)
    if (!unit) return
    setSelected(unit)
    history.replaceState(null, '', '#' + unit.id)
  }
  return <main className="app-shell">
    <header className="app-header">
      <div className="brand"><span className="brand-mark" aria-hidden="true">F<span>↗</span></span><div><h1>Frontory</h1><p>배우고, 실험하고, 나의 경험으로 남기다.</p></div></div>
      <nav aria-label="학습 안내"><button onClick={() => setDocumentPath('/docs/labs/README.md')}>전체 기술 지도</button><button onClick={() => setDocumentPath('/docs/learning-workspace.md')}>사용법</button></nav>
    </header>
    <LearningNavigator selected={selected} onSelect={select} onDocument={setDocumentPath} />
    <details className="backup-disclosure"><summary>학습 아카이브 · 전체 JSON 내보내기 / 가져오기</summary><BackupControls selectedId={selected.id} onRestore={id => { select(id); setRestoreRevision(value => value + 1) }} /></details>
    <Workspace key={selected.id + ':' + restoreRevision} unit={selected} onProgressChange={() => refreshProgress(value => value + 1)} />
    {documentPath && <DocumentDialog initialPath={documentPath} unitPath={selected.docPath} onClose={() => setDocumentPath(null)} />}
    <footer className="app-footer"><span>Frontory · 기록은 이 브라우저에 저장됩니다. 정기적으로 JSON 백업을 내려받으세요.</span><nav aria-label="서비스 안내"><button onClick={() => setDocumentPath('/docs/privacy.md')}>저장 및 개인정보</button><a href="https://github.com/habergeon/frontory" target="_blank" rel="noreferrer">GitHub</a></nav></footer>
  </main>
}
