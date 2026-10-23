import { lazy, Suspense, useEffect, useState } from 'react'
import { getLocalizedUnit, units } from './curriculum'
import { Home } from './Home'
import { DocumentDialog } from './DocumentDialog'
import { BackupControls } from './BackupControls'
import { LearningNavigator } from './LearningNavigator'
import { UnitPagination } from './UnitPagination'
import type { WorkspaceHandle } from './Workspace'
import { PracticeGuide } from './PracticeGuide'
import { useLocale } from '../i18n/LocaleProvider'
import { messages } from '../i18n/messages'
import { localizePath, practicePath } from '../i18n/locale'
import { localizedDocPath } from './documents'

const Workspace = lazy(() => import('./Workspace').then(module => ({ default: module.Workspace })))
const fromHash = () => units.find(unit => unit.id === window.location.hash.slice(1)) ?? null
export function App() {
  const { locale, setLocale } = useLocale()
  const copy = messages[locale]
  const [selected, setSelected] = useState(fromHash)
  const localizedUnit = selected && getLocalizedUnit(locale, selected.id)
  useEffect(() => {
    document.documentElement.lang = locale
    document.title = localizedUnit ? localizedUnit.title + ' · Frontory' : 'Frontory'
  }, [locale, localizedUnit])
  const [documentPath, setDocumentPath] = useState<string | null>(null)
  const [restoreRevision, setRestoreRevision] = useState(0)
  const [, refreshProgress] = useState(0)
  const [workspace, setWorkspace] = useState<WorkspaceHandle | null>(null)
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
    <header className={'app-header' + (selected ? ' learning-header' : '')}>
      <a className="brand home-brand" href="#" aria-label={copy.brandHome}><span className="brand-mark" aria-hidden="true">F<span>↗</span></span><div><strong>Frontory</strong>{selected && <p>{copy.tagline}</p>}</div></a>
      <nav className="header-navigation" aria-label={copy.learningNavigation}>{selected ? <a className="header-action" href="#">{copy.home}</a> : <a className="header-action" href="#series">{copy.exploreSeries}</a>}<button className="header-action" onClick={() => setDocumentPath(localizedDocPath(locale, '/docs/learning-workspace.md'))}>{copy.usage}</button>{!selected && <a className="home-github header-action" href="https://github.com/habergeon/frontory" target="_blank" rel="noreferrer">GitHub ↗</a>}<span className="interface-language" role="group" aria-label={copy.interfaceLanguage}><button className="header-action" onClick={() => setLocale(locale === 'ko' ? 'en' : 'ko')} lang={locale === 'ko' ? 'en' : 'ko'}>{locale === 'ko' ? 'English' : '한국어'}</button></span></nav>
    </header>
    {!selected ? <Home onSelect={select} /> : <>
    <LearningNavigator selected={selected} onSelect={select} onDocument={setDocumentPath} onPractice={workspace?.focusCode} />
    {localizedUnit && <PracticeGuide key={selected.id} unit={localizedUnit} locale={locale} onDocument={setDocumentPath} />}
    {localizedUnit ? <p><a href={localizePath(locale, '/learn/' + selected.seriesId + '/' + selected.id + '/')}>{copy.publicDocument}</a></p> : <p role="status">This lesson is not available in English yet. <a href={practicePath('ko', selected.id)} onClick={event => { event.preventDefault(); setLocale('ko') }}>Read the Korean lesson</a></p>}
    <details className="backup-disclosure"><summary>{copy.archive}</summary><BackupControls selectedId={selected.id} onRestore={id => { select(id); setRestoreRevision(value => value + 1) }} /></details>
    <Suspense fallback={<p role="status">{copy.preparingWorkspace}</p>}><Workspace ref={setWorkspace} key={selected.id + ':' + restoreRevision} unit={selected} onProgressChange={() => refreshProgress(value => value + 1)} /></Suspense>
    <UnitPagination selected={selected} onSelect={select} />
    </>}
    {documentPath && <DocumentDialog locale={locale} initialPath={documentPath} unitPath={selected?.docPath ?? '/docs/labs/README.md'} onClose={() => setDocumentPath(null)} />}
    <footer className="app-footer"><span>{copy.footer}</span><nav aria-label={copy.serviceNavigation}><a href={localizePath(locale, '/about/')}>{copy.about}</a><a href={localizePath(locale, '/privacy/')}>{copy.privacy}</a><a href="https://github.com/habergeon/frontory" target="_blank" rel="noreferrer">GitHub</a></nav></footer>
  </main>
}
