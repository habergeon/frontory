import { getCatalog, type Unit } from './curriculum'
import { useLocale } from '../i18n/LocaleProvider'
import { messages } from '../i18n/messages'

export function UnitPagination({ selected, onSelect }: { selected: Unit; onSelect: (id: string) => void }) {
  const { locale } = useLocale()
  const copy = messages[locale]
  const lessons = getCatalog(locale).units.filter(unit => unit.seriesId === selected.seriesId)
  const index = lessons.findIndex(unit => unit.id === selected.id)
  if (index < 0) return null
  return <nav className="unit-pagination" aria-label={copy.unitNavigation}>
    <button disabled={index === 0} onClick={() => onSelect(lessons[index-1].id)}>{copy.previousUnit}</button>
    <span>{selected.source === undefined ? copy.documentPracticeAvailable : (selected.exampleMode === 'external' || selected.seriesId === 'playwright') ? copy.externalExample : copy.executableExample}</span>
    <button disabled={index === lessons.length-1} onClick={() => onSelect(lessons[index+1].id)}>{copy.nextUnit}</button>
  </nav>
}
