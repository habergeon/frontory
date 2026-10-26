import type { Locale } from '../i18n/locale'
import { roadmapMessages } from '../i18n/messages'
import { getLocalizedUnit } from './curriculum'
import { getSeriesRoadmap } from './learningContent'

export function SeriesRoadmap({ locale }: { locale: Locale }) {
  const copy = roadmapMessages[locale]
  return (
    <details className="series-roadmap">
      <summary>{copy.title}</summary>
      <p>{copy.explanation}</p>
      <ol>
        {getSeriesRoadmap(locale).map((entry, index) => (
          <li
            key={entry.unitId}
            data-unit-id={entry.unitId}
            data-readiness={entry.readiness}
          >
            <a href={'#' + entry.unitId}>
              {String(index + 1).padStart(2, '0')} ·{' '}
              {getLocalizedUnit(locale, entry.unitId)!.title}
            </a>{' '}
            <span className="badge">{copy[entry.readiness]}</span>
            <dl>
              <dt>{copy.topics}</dt>
              <dd>{entry.topics.join(' · ')}</dd>
              <dt>{copy.prerequisites}</dt>
              <dd>
                {entry.prerequisiteIds.length
                  ? entry.prerequisiteIds.map((id) => (
                      <a key={id} href={'#' + id}>
                        {String(getLocalizedUnit(locale, id)!.day).padStart(
                          2,
                          '0',
                        )}{' '}
                      </a>
                    ))
                  : copy.none}
              </dd>
              <dt>{copy.outcome}</dt>
              <dd>{entry.outcome}</dd>
              <dt>{copy.capabilities}</dt>
              <dd>{entry.requiredCapabilities.join(' · ')}</dd>
            </dl>
          </li>
        ))}
      </ol>
    </details>
  )
}
