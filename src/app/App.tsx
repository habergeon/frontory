import {
  lazy,
  Suspense,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react'
import { getLocalizedUnit, units } from './curriculum'
import { Home } from './Home'
import { DocumentDialog } from './DocumentDialog'
import { BackupControls } from './BackupControls'
import { LearningNavigator } from './LearningNavigator'
import { UnitPagination } from './UnitPagination'
import type { WorkspaceHandle } from './Workspace'
import { LessonLearning } from './LessonLearning'
import { getLessonLearning } from './learningContent'
import { learningMessages } from '../i18n/messages'
import { PracticeGuide } from './PracticeGuide'
import { useLocale } from '../i18n/LocaleProvider'
import { messages } from '../i18n/messages'
import { localizePath, practicePath } from '../i18n/locale'
import { localizedDocPath, parseDocumentPath } from './documents'

const Workspace = lazy(() =>
  import('./Workspace').then((module) => ({ default: module.Workspace })),
)
const fromHash = () =>
  units.find((unit) => unit.id === window.location.hash.slice(1)) ?? null
export function App() {
  const { locale, setLocale } = useLocale()
  const copy = messages[locale]
  const [selected, setSelected] = useState(fromHash)
  const contained = selected?.seriesId === 'threejs' && selected.day <= 4
  const learning = selected ? getLessonLearning(selected.id, locale) : null
  const localizedUnit = selected && getLocalizedUnit(locale, selected.id)
  useEffect(() => {
    document.documentElement.lang = locale
    document.title = localizedUnit
      ? localizedUnit.title + ' · Frontory'
      : 'Frontory'
  }, [locale, localizedUnit])
  const [documentRequest, setDocumentRequest] = useState<{
    path: string
    locale: typeof locale
  } | null>(null)
  const documentPath = documentRequest?.path ?? null
  const setDocumentPath = (path: string | null) =>
    setDocumentRequest(path ? { path, locale } : null)
  useEffect(() => {
    setDocumentRequest((current) =>
      current && current.locale !== locale
        ? {
            path: localizedDocPath(
              locale,
              parseDocumentPath(current.path).koDocPath,
            ),
            locale,
          }
        : current,
    )
  }, [locale])
  const [readerView, setReaderView] = useState<'reading' | 'practice'>(
    'reading',
  )
  const navigator = useRef<HTMLDivElement>(null)
  const reader = useRef<HTMLElement>(null)
  const lessonScroll = useRef<{
    unitId: string
    top: number
    pageY: number
  } | null>(null)
  const focusPractice = useRef(false)
  const [restoreRevision, setRestoreRevision] = useState(0)
  const [, refreshProgress] = useState(0)
  const [workspace, setWorkspace] = useState<WorkspaceHandle | null>(null)
  useEffect(() => {
    const sync = () => {
      const unit = fromHash()
      setSelected(unit)
      if (!unit) setDocumentRequest(null)
    }
    window.addEventListener('hashchange', sync)
    window.addEventListener('popstate', sync)
    return () => {
      window.removeEventListener('hashchange', sync)
      window.removeEventListener('popstate', sync)
    }
  }, [])
  useLayoutEffect(() => {
    if (!focusPractice.current || !workspace) return
    focusPractice.current = false
    workspace.focusCode()
  }, [readerView, workspace])
  useLayoutEffect(() => {
    const saved = lessonScroll.current
    if (!saved) return
    if (saved.unitId !== selected?.id) {
      lessonScroll.current = null
      return
    }
    if (documentPath) return
    lessonScroll.current = null
    const frame = requestAnimationFrame(() => {
      document.getElementById('panel-reading')?.scrollTo({ top: saved.top })
      window.scrollTo({ top: saved.pageY })
    })
    return () => cancelAnimationFrame(frame)
  }, [documentPath, selected?.id])
  const openDocument = (path: string) => {
    if (contained && selected && !documentPath)
      lessonScroll.current = {
        unitId: selected.id,
        top: document.getElementById('panel-reading')?.scrollTop ?? 0,
        pageY: window.scrollY,
      }
    setDocumentPath(path)
    setReaderView('reading')
    if (readerView === 'reading') {
      reader.current?.focus({ preventScroll: true })
      reader.current?.scrollIntoView({ block: 'start' })
    }
  }
  const practice = () => {
    if (readerView === 'practice' || (!documentPath && !contained))
      workspace?.focusCode()
    else {
      focusPractice.current = true
      setReaderView('practice')
    }
  }
  const restoreDocumentFocus = () =>
    navigator.current
      ?.querySelector<HTMLButtonElement>('.current-lesson-actions button')
      ?.focus()
  const select = (id: string) => {
    const unit = units.find((item) => item.id === id)
    if (!unit) return
    setSelected(unit)
    if (window.location.hash !== '#' + unit.id)
      history.pushState(null, '', '#' + unit.id)
    window.scrollTo(0, 0)
  }
  return (
    <main
      className={
        'app-shell' +
        (!selected ? ' home-shell' : '') +
        (contained ? ' contained-shell' : '')
      }
    >
      <header className={'app-header' + (selected ? ' learning-header' : '')}>
        <a className="brand home-brand" href="#" aria-label={copy.brandHome}>
          <span className="brand-mark" aria-hidden="true">
            F<span>↗</span>
          </span>
          <div>
            <strong>Frontory</strong>
            {selected && <p>{copy.tagline}</p>}
          </div>
        </a>
        <nav className="header-navigation" aria-label={copy.learningNavigation}>
          {selected ? (
            <a className="header-action" href="#">
              {copy.home}
            </a>
          ) : (
            <a className="header-action" href="#series">
              {copy.exploreSeries}
            </a>
          )}
          <button
            className="header-action"
            onClick={() =>
              openDocument(
                localizedDocPath(locale, '/docs/learning-workspace.md'),
              )
            }
          >
            {copy.usage}
          </button>
          {!selected && (
            <a
              className="home-github header-action"
              href="https://github.com/habergeon/frontory"
              target="_blank"
              rel="noreferrer"
            >
              GitHub ↗
            </a>
          )}
          <span
            className="interface-language"
            role="group"
            aria-label={copy.interfaceLanguage}
          >
            <button
              className="header-action"
              onClick={() => setLocale(locale === 'ko' ? 'en' : 'ko')}
              lang={locale === 'ko' ? 'en' : 'ko'}
            >
              {locale === 'ko' ? 'English' : '한국어'}
            </button>
          </span>
        </nav>
      </header>
      {!selected ? (
        <Home onSelect={select} />
      ) : (
        <>
          <div ref={navigator}>
            <LearningNavigator
              selected={selected}
              onSelect={select}
              onDocument={openDocument}
              onPractice={workspace ? practice : undefined}
            />
          </div>
          {documentPath && !contained && (
            <div
              className="reader-view-controls"
              role="group"
              aria-label={copy.learningView}
            >
              <button
                aria-pressed={readerView === 'reading'}
                onClick={() => setReaderView('reading')}
              >
                {copy.readingView}
              </button>
              <button
                aria-pressed={readerView === 'practice'}
                onClick={() => setReaderView('practice')}
              >
                {copy.practiceView}
              </button>
            </div>
          )}
          <div
            className={
              'learning-layout' +
              (!contained && documentPath
                ? ' reader-open view-' + readerView
                : '')
            }
          >
            <div className="practice-pane">
              {localizedUnit && !contained && (
                <PracticeGuide
                  key={selected.id}
                  unit={localizedUnit}
                  locale={locale}
                  onDocument={openDocument}
                />
              )}
              {localizedUnit ? (
                <p>
                  <a
                    href={localizePath(
                      locale,
                      '/learn/' + selected.seriesId + '/' + selected.id + '/',
                    )}
                  >
                    {copy.publicDocument}
                  </a>
                </p>
              ) : (
                <p role="status">
                  This lesson is not available in English yet.{' '}
                  <a
                    href={practicePath('ko', selected.id)}
                    onClick={(event) => {
                      event.preventDefault()
                      setLocale('ko')
                    }}
                  >
                    Read the Korean lesson
                  </a>
                </p>
              )}
              <details className="backup-disclosure">
                <summary>{copy.archive}</summary>
                <BackupControls
                  selectedId={selected.id}
                  onRestore={(id) => {
                    select(id)
                    setRestoreRevision((value) => value + 1)
                  }}
                />
              </details>
              <Suspense
                fallback={<p role="status">{copy.preparingWorkspace}</p>}
              >
                <Workspace
                  ref={setWorkspace}
                  key={selected.id + ':' + restoreRevision}
                  unit={localizedUnit ?? selected}
                  readingActive={readerView === 'reading'}
                  onReadingChange={
                    contained
                      ? (active) =>
                          setReaderView(active ? 'reading' : 'practice')
                      : undefined
                  }
                  reading={
                    contained
                      ? (onLoadExample, onNotes) => (
                          <>
                            {learning ? (
                              <LessonLearning
                                key={selected.id}
                                lesson={learning}
                                locale={locale}
                                hidden={!!documentPath}
                                onDocument={openDocument}
                                onLoadExample={onLoadExample}
                                onNotes={onNotes}
                              />
                            ) : !documentPath && localizedUnit ? (
                              <PracticeGuide
                                unit={localizedUnit}
                                locale={locale}
                                onDocument={openDocument}
                              />
                            ) : null}
                            {documentPath && (
                              <>
                                <button onClick={() => setDocumentPath(null)}>
                                  {learningMessages[locale].back}
                                </button>
                                <DocumentDialog
                                  locale={locale}
                                  path={documentPath}
                                  requestedLocale={documentRequest!.locale}
                                  unitPath={selected.docPath}
                                  onNavigate={setDocumentPath}
                                  onClose={() => setDocumentPath(null)}
                                  inline
                                  active={readerView === 'reading'}
                                  readerRef={reader}
                                  onRestoreFocus={restoreDocumentFocus}
                                />
                              </>
                            )}
                          </>
                        )
                      : undefined
                  }
                  onProgressChange={() => refreshProgress((value) => value + 1)}
                />
              </Suspense>
              <UnitPagination selected={selected} onSelect={select} />
            </div>
            {documentPath && !contained && (
              <DocumentDialog
                locale={locale}
                path={documentPath}
                requestedLocale={documentRequest!.locale}
                unitPath={selected.docPath}
                onNavigate={setDocumentPath}
                onClose={() => setDocumentPath(null)}
                inline
                active={readerView === 'reading'}
                readerRef={reader}
                onRestoreFocus={restoreDocumentFocus}
              />
            )}
          </div>
        </>
      )}
      {!selected && documentPath && (
        <DocumentDialog
          locale={locale}
          path={documentPath}
          requestedLocale={documentRequest!.locale}
          unitPath="/docs/labs/README.md"
          onNavigate={setDocumentPath}
          onClose={() => setDocumentPath(null)}
        />
      )}
      <footer className="app-footer">
        <span>{copy.footer}</span>
        <nav aria-label={copy.serviceNavigation}>
          <a href={localizePath(locale, '/about/')}>{copy.about}</a>
          <a href={localizePath(locale, '/privacy/')}>{copy.privacy}</a>
          <a
            href="https://github.com/habergeon/frontory"
            target="_blank"
            rel="noreferrer"
          >
            GitHub
          </a>
        </nav>
      </footer>
    </main>
  )
}
