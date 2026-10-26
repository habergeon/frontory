import { useEffect, useState } from 'react'
import { units, type Unit } from './curriculum'
import { practiceGuide } from './guideContent'
import { MarkdownView } from '../shared/MarkdownView'
import type { Locale } from '../i18n/locale'
import { messages } from '../i18n/messages'
import {
  DocumentNotFoundError,
  loadDocument,
  localizedDocPath,
} from './documents'

export function PracticeGuide({
  unit,
  onDocument,
  locale = 'ko',
}: {
  unit: Unit
  onDocument: (path: string) => void
  locale?: Locale
}) {
  const [expanded, setExpanded] = useState(true)
  const [content, setContent] = useState<{
    key: string
    text: string
    error?: 'missing' | 'failed'
  } | null>(null)
  const koDocPath = units.find((common) => common.id === unit.id)!.docPath
  const key = locale + ':' + koDocPath
  const current = content?.key === key ? content : null
  const copy = messages[locale]
  useEffect(() => {
    let cancelled = false
    loadDocument(locale, koDocPath).then(
      (text) => {
        if (!cancelled) setContent({ key, text })
      },
      (error) => {
        if (!cancelled)
          setContent({
            key,
            text: '',
            error:
              error instanceof DocumentNotFoundError ? 'missing' : 'failed',
          })
      },
    )
    return () => {
      cancelled = true
    }
  }, [locale, koDocPath, key])
  const guide = practiceGuide(current?.text ?? '', locale)
  const markdown = (text: string) => (
    <MarkdownView
      locale={locale}
      text={text}
      documentPath={localizedDocPath(locale, koDocPath)}
      onDocument={onDocument}
    />
  )
  return (
    <section className="practice-guide" aria-labelledby="practice-guide-title">
      <header className="practice-guide-heading">
        <div>
          <span className="eyebrow">
            PRACTICE GUIDE · {String(unit.day).padStart(2, '0')}
          </span>
          <h2 id="practice-guide-title">{copy.practiceGuide}</h2>
        </div>
        <button
          aria-expanded={expanded}
          aria-controls="practice-guide-body"
          onClick={() => setExpanded((value) => !value)}
        >
          {expanded ? copy.collapseGuide : copy.expandGuide}
        </button>
      </header>
      <p className="practice-guide-scope" role="note">
        <strong>{copy.executionScope}</strong>{' '}
        {unit.source === undefined
          ? copy.documentPractice
          : unit.exampleMode === 'external'
            ? copy.externalExecutionScope
            : copy.browserExecutionScope}
        {unit.exampleNote && <> {unit.exampleNote}</>}
      </p>
      {expanded && (
        <div id="practice-guide-body" aria-busy={!current}>
          {!current ? (
            <p role="status">
              {locale === 'en'
                ? 'Loading practice guide…'
                : '실습 안내 불러오는 중…'}
            </p>
          ) : current.error ? (
            <p role={current.error === 'failed' ? 'alert' : 'status'}>
              {locale === 'en'
                ? current.error === 'missing'
                  ? 'This practice guide is not available in English yet.'
                  : 'Could not load the practice guide. Select another unit, then return to retry.'
                : current.error === 'missing'
                  ? '실습 안내가 없습니다.'
                  : '실습 안내를 불러오지 못했습니다. 다른 단위를 선택한 뒤 돌아와 주세요.'}
              {current.error === 'missing' && locale === 'en' && (
                <>
                  {' '}
                  <button
                    className="text-link"
                    onClick={() => onDocument(koDocPath)}
                  >
                    Read the Korean document
                  </button>
                </>
              )}
            </p>
          ) : (
            <div className="practice-guide-grid">
              <div>
                <h3>{copy.guideSteps}</h3>
                {markdown(guide.steps || copy.guideFallback)}
              </div>
              <div className="practice-guide-observe">
                <h3>{copy.guideObserve}</h3>
                {markdown(guide.variables)}
                <p>{copy.observeHint}</p>
                <h3>{copy.guideComplete}</h3>
                {markdown(guide.criteria)}
              </div>
            </div>
          )}
          <footer>
            <p>
              {unit.source !== undefined
                ? copy.executableGuideHint
                : copy.documentGuideHint}
            </p>
            <button
              onClick={() => onDocument(localizedDocPath(locale, koDocPath))}
            >
              {copy.readDetailedDocument}
            </button>
          </footer>
        </div>
      )}
    </section>
  )
}
