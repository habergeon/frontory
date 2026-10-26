import { SeriesRoadmap } from './SeriesRoadmap'
import { useEffect, useRef, useState } from 'react'
import { UnitPagination } from './UnitPagination'
import { getCatalog, getLocalizedUnit, type Unit } from './curriculum'
import { draftStore } from '../shared/drafts'
import { useLocale } from '../i18n/LocaleProvider'
import { categoryLabels, message, messages } from '../i18n/messages'

const statusOf = (unit: Unit) =>
  draftStore.load(unit.id, unit.source ?? '', unit.sourceLanguage).draft
    .progress ?? 'not-started'
const labelsFor = (copy: typeof messages.ko | typeof messages.en) => ({
  'not-started': copy.notStarted,
  'in-progress': copy.inProgress,
  completed: copy.completed,
})
const finished = (list: Unit[]) =>
  list.filter((unit) => statusOf(unit) === 'completed').length

function SeriesDialog({
  current,
  onSelect,
  onClose,
}: {
  current: string
  onSelect: (id: string) => void
  onClose: () => void
}) {
  const { locale } = useLocale()
  const copy = messages[locale]
  const { series, units } = getCatalog(locale)
  const categories = categoryLabels[locale]
  const dialog = useRef<HTMLDialogElement>(null)
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('all')
  useEffect(() => {
    dialog.current?.showModal()
  }, [])
  const filtered = series.filter(
    (item) =>
      (category === 'all' || item.category === category) &&
      `${item.id} ${item.title} ${item.prerequisites} ${categoryLabels.ko[item.category]} ${categoryLabels.en[item.category]}`
        .toLowerCase()
        .includes(query.trim().toLowerCase()),
  )
  return (
    <dialog
      ref={dialog}
      className="series-dialog"
      aria-labelledby="series-title"
      onCancel={onClose}
      onClose={onClose}
    >
      <header className="dialog-header">
        <div>
          <span className="eyebrow">FRONTORY SERIES</span>
          <h2 id="series-title">{copy.chooseSeries}</h2>
        </div>
        <button onClick={onClose}>{copy.close}</button>
      </header>
      <div className="series-tools">
        <label>
          {copy.searchSeries}
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={copy.searchPlaceholder}
          />
        </label>
        <div
          className="category-filters"
          role="group"
          aria-label={copy.categoryFilter}
        >
          <button
            aria-pressed={category === 'all'}
            onClick={() => setCategory('all')}
          >
            {copy.all}
          </button>
          {Object.entries(categories).map(([id, label]) => (
            <button
              key={id}
              aria-pressed={category === id}
              onClick={() => setCategory(id)}
            >
              {label}
            </button>
          ))}
        </div>
        <p>{message(locale, 'seriesSummary', { count: filtered.length })}</p>
      </div>
      <div className="series-grid">
        {filtered.map((item) => {
          const lessons = units.filter((unit) => unit.seriesId === item.id)
          const count = finished(lessons)
          return (
            <button
              className="series-card"
              key={item.id}
              aria-current={item.id === current ? 'true' : undefined}
              onClick={() => {
                onSelect(
                  lessons.find((unit) => statusOf(unit) === 'in-progress')
                    ?.id ?? lessons[0].id,
                )
                onClose()
              }}
            >
              <span className="eyebrow">
                {categories[item.category]} · {'★'.repeat(item.priority)}
              </span>
              <strong>{item.title}</strong>
              <span>
                {message(locale, 'seriesCompletion', {
                  total: lessons.length,
                  completed: count,
                })}
              </span>
              <progress
                value={count}
                max={lessons.length}
                aria-label={message(locale, 'completionLabel', {
                  title: item.title,
                })}
              />
              <small>
                {message(locale, 'prerequisiteShort', {
                  text: item.prerequisites,
                })}
              </small>
              <span className="badge">
                {item.id === 'playwright'
                  ? copy.externalTestSource
                  : message(locale, 'linkedExampleCount', {
                      count: lessons.filter((unit) => unit.source !== undefined)
                        .length,
                    })}
              </span>
            </button>
          )
        })}
        {filtered.length === 0 && <p>{copy.noSeriesSuggestion}</p>}
      </div>
    </dialog>
  )
}

export function LearningNavigator({
  selected,
  onSelect,
  onDocument,
  onPractice,
}: {
  selected: Unit
  onSelect: (id: string) => void
  onDocument: (path: string) => void
  onPractice?: () => void
}) {
  const { locale } = useLocale()
  const copy = messages[locale]
  const labels = labelsFor(copy)
  const { series, units } = getCatalog(locale)
  const categories = categoryLabels[locale]
  const localizedUnit = getLocalizedUnit(locale, selected.id)
  const [showCatalog, setShowCatalog] = useState(false)
  const catalog = showCatalog && (
    <SeriesDialog
      current={selected.seriesId}
      onSelect={onSelect}
      onClose={() => setShowCatalog(false)}
    />
  )
  const browse = (
    <button onClick={() => setShowCatalog(true)}>
      {message(locale, 'browseSeriesCount', { count: series.length })}
    </button>
  )
  const current = series.find((item) => item.id === selected.seriesId)
  if (!current || !localizedUnit)
    return (
      <section className="learning-journey" aria-label={copy.learningJourney}>
        {browse}
        {catalog}
      </section>
    )
  selected = localizedUnit
  const lessons = units.filter((unit) => unit.seriesId === current.id)
  const count = finished(lessons)
  const index = lessons.findIndex((unit) => unit.id === selected.id)
  const phase = lessons.filter((unit) => unit.week === selected.week)
  return (
    <section className="learning-journey" aria-label={copy.learningJourney}>
      <div className="current-lesson">
        <div>
          <span className="eyebrow">
            {current.title} · UNIT {String(selected.day).padStart(2, '0')} /{' '}
            {current.stages[selected.week - 1]}
          </span>
          <h2>{selected.title}</h2>
          <p>{selected.goal}</p>
        </div>
        <div className="current-lesson-actions">
          <button onClick={() => onDocument(selected.docPath)}>
            {copy.openDocument}
          </button>
          <button
            className="primary-button"
            disabled={!onPractice}
            onClick={onPractice}
          >
            {copy.goToPractice}
          </button>
        </div>
      </div>
      <div className="journey-progress">
        <progress
          value={count}
          max={lessons.length}
          aria-label={copy.currentCompletion}
        />
        <span>
          {message(locale, 'progressSummary', {
            completed: count,
            total: lessons.length,
            percent: Math.round((count / lessons.length) * 100),
          })}
        </span>
      </div>
      <p className="current-unit-status">
        {message(locale, 'currentUnit', {
          index: index + 1,
          total: lessons.length,
          status: labels[statusOf(selected)],
        })}
      </p>
      <UnitPagination selected={selected} onSelect={onSelect} />
      <details className="journey-outline">
        <summary>{copy.learningOutline}</summary>
        <div className="journey-heading">
          <div>
            <span className="eyebrow">
              {categories[current.category]} / SERIES
            </span>
            <h3>{current.title}</h3>
            <p>
              {current.id === 'webgl'
                ? copy.webglJourney
                : message(locale, 'seriesJourney', {
                    text: current.prerequisites,
                  })}
            </p>
          </div>
          <div className="journey-actions">
            {browse}
            <button onClick={() => onDocument(current.docPath)}>
              {copy.seriesPlan}
            </button>
          </div>
        </div>
        <nav className="stage-rail" aria-label={copy.learningStages}>
          {current.stages.map((label, i) => {
            const stageUnits = lessons.filter((unit) => unit.week === i + 1)
            if (stageUnits.length === 0) return null
            return (
              <button
                key={label}
                aria-current={selected.week === i + 1 ? 'step' : undefined}
                onClick={() => onSelect(stageUnits[0].id)}
              >
                <span className="stage-number">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span>
                  <strong>{label}</strong>
                  <small>
                    {message(locale, 'stageCompletion', {
                      completed: finished(stageUnits),
                      total: stageUnits.length,
                    })}
                  </small>
                </span>
              </button>
            )
          })}
        </nav>
        <nav className="unit-grid" aria-label={copy.unitOutline}>
          {phase.map((unit) => (
            <button
              key={unit.id}
              aria-current={selected.id === unit.id ? 'page' : undefined}
              onClick={() => onSelect(unit.id)}
            >
              <span className={'unit-state ' + statusOf(unit)}>
                {statusOf(unit) === 'completed'
                  ? '✓'
                  : String(unit.day).padStart(2, '0')}
              </span>
              <span>
                <strong>{unit.title}</strong>
                <small>
                  {labels[statusOf(unit)]} ·{' '}
                  {unit.source === undefined
                    ? copy.documentNotes
                    : copy.executablePractice}
                </small>
              </span>
            </button>
          ))}
        </nav>
      </details>
      {current.id === 'threejs' && <SeriesRoadmap locale={locale} />}
      {catalog}
    </section>
  )
}
