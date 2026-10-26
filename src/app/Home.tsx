import { useState } from 'react'
import { getCatalog } from './curriculum'
import { draftStore } from '../shared/drafts'
import './home.css'
import { useLocale } from '../i18n/LocaleProvider'
import { categoryLabels, message, messages } from '../i18n/messages'
import { localizePath } from '../i18n/locale'

export function Home({ onSelect }: { onSelect: (id: string) => void }) {
  const { locale } = useLocale()
  const copy = messages[locale]
  const { series, units } = getCatalog(locale)
  const categories = categoryLabels[locale]
  const startingUnits = ['html-01', 'css-01', 'javascript-01'].map((id) =>
    units.find((unit) => unit.id === id)!,
  )
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('all')
  const filtered = series.filter(
    (item) =>
      (category === 'all' || item.category === category) &&
      `${item.id} ${item.title} ${item.prerequisites} ${categoryLabels.ko[item.category]} ${categoryLabels.en[item.category]}`
        .toLowerCase()
        .includes(query.trim().toLowerCase()),
  )
  return (
    <div className="home">
      <section className="home-hero" aria-labelledby="home-title">
        <div>
          <h1 id="home-title">
            {locale === 'ko' ? (
              <>
                배운 것을,
                <br />
                직접 만드는 <em>경험으로.</em>
              </>
            ) : (
              copy.heroTitle
            )}
          </h1>
          <p>
            {locale === 'ko' ? (
              <>
                문서를 읽고, 코드를 바꾸고,
                <br className="home-mobile-break" /> 나의 언어로 기록하세요.
              </>
            ) : (
              copy.heroDescription
            )}
          </p>
          <div className="home-hero-action">
            <button
              className="home-primary"
              onClick={() => onSelect('html-01')}
            >
              {copy.startWithHtml} <span aria-hidden="true">→</span>
            </button>
            <a href="#series">{copy.browseSeries}</a>
            <span>
              {message(locale, 'catalogCount', {
                seriesCount: series.length,
                unitCount: units.length,
              })}
            </span>
          </div>
        </div>
        <div className="home-wordmark" aria-hidden="true">
          <span>Learn.</span>
          <span>Experiment.</span>
          <span>Archive.</span>
        </div>
      </section>
      <section className="home-start" aria-labelledby="home-start-title">
        <h2 id="home-start-title">{copy.beginnerPathTitle}</h2>
        <p>{copy.beginnerPathDescription}</p>
        <ol className="home-start-list">
          {startingUnits.map((unit, index) => {
            const item = series.find((item) => item.id === unit.seriesId)!
            return (
              <li className="home-series-row home-start-row" key={unit.id}>
                <span className="home-series-category">0{index + 1}</span>
                <div className="home-start-topic">
                  <h3>{item.title}</h3>
                  <p>{unit.title}</p>
                </div>
                <p className="home-start-prerequisite">
                  {message(locale, 'prerequisites', {
                    text: item.prerequisites,
                  })}
                </p>
                <button
                  onClick={() => onSelect(unit.id)}
                  aria-label={message(locale, 'firstUnitLabel', {
                    title: item.title,
                  })}
                >
                  {copy.openFirstUnit} <span aria-hidden="true">→</span>
                </button>
              </li>
            )
          })}
        </ol>
        <p className="home-start-note">{copy.beginnerPathNote}</p>
        <p className="home-start-note">{copy.firstHtmlResult}</p>
      </section>
      <section className="home-method" aria-label={copy.learningMethod}>
        {[
          [copy.readConcepts, copy.readConceptsDescription],
          [copy.experimentCode, copy.experimentCodeDescription],
          [copy.recordExperience, copy.recordExperienceDescription],
        ].map(([title, description], index) => (
          <div key={title}>
            <span>0{index + 1}</span>
            <div>
              <h2>{title}</h2>
              <p>{description}</p>
            </div>
          </div>
        ))}
      </section>
      <section
        className="home-catalog"
        id="series"
        aria-labelledby="catalog-title"
      >
        <div className="home-catalog-heading">
          <div>
            <h2 id="catalog-title">{copy.catalogTitle}</h2>
            <p>{copy.catalogDescription}</p>
          </div>
          <label>
            <span className="home-sr-only">{copy.searchSeries}</span>
            <input
              type="search"
              placeholder={copy.searchSeries}
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
          </label>
        </div>
        <div
          className="home-filters"
          role="group"
          aria-label={copy.seriesCategory}
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
        <p className="home-result-count" role="status">
          {message(locale, 'seriesCount', { count: filtered.length })}
        </p>
        <div className="home-series-list">
          {filtered.map((item) => {
            const lessons = units.filter((unit) => unit.seriesId === item.id)
            const records = lessons.map((unit) => ({
              unit,
              ...draftStore.load(unit.id, unit.source ?? ''),
            }))
            const completed = records.filter(
              (record) => record.draft.progress === 'completed',
            ).length
            const ongoing = records.find(
              (record) => record.draft.progress === 'in-progress',
            )
            return (
              <article className="home-series-row" key={item.id}>
                <span className="home-series-category">
                  {categories[item.category]}
                </span>
                <h3>
                  <a href={localizePath(locale, '/learn/' + item.id + '/')}>
                    {item.title}
                  </a>
                </h3>
                <div className="home-series-description">
                  <p>
                    {message(locale, 'prerequisites', {
                      text: item.prerequisites,
                    })}
                  </p>
                  <small>
                    {message(locale, 'exampleCounts', {
                      exampleCount: lessons.filter(
                        (unit) => unit.source !== undefined,
                      ).length,
                      documentCount: lessons.filter(
                        (unit) => unit.source === undefined,
                      ).length,
                    })}
                  </small>
                  {item.id === 'playwright' && (
                    <small>{copy.externalTestExample}</small>
                  )}
                  {records.some((record) => record.warning) && (
                    <small>{copy.storageNeedsCheck}</small>
                  )}
                </div>
                <span className="home-series-progress">
                  {message(locale, 'unitCount', { count: lessons.length })}
                  {completed > 0 && (
                    <small>
                      {message(locale, 'completedCount', { count: completed })}
                    </small>
                  )}
                </span>
                <button
                  onClick={() => onSelect(ongoing?.unit.id ?? lessons[0].id)}
                  aria-label={message(
                    locale,
                    ongoing ? 'seriesContinueLabel' : 'seriesStartLabel',
                    { title: item.title },
                  )}
                >
                  {ongoing ? copy.continueLearning : copy.startLearning}{' '}
                  <span aria-hidden="true">→</span>
                </button>
              </article>
            )
          })}
        </div>
        {filtered.length === 0 && (
          <div className="home-no-results">
            <h3>{copy.noSeries}</h3>
            <p>{copy.changeSearch}</p>
            <button
              onClick={() => {
                setQuery('')
                setCategory('all')
              }}
            >
              {copy.viewAllSeries}
            </button>
          </div>
        )}
      </section>
    </div>
  )
}
