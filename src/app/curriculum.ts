import type { CodeLanguage } from '../shared/drafts'
import type { RuntimeProfile } from '../preview/types'
import catalog from './catalog.json'
import englishCatalog from './catalog.en.json'
import type { Locale } from '../i18n/locale'
import previousCatalog from '../../content/catalog-v2.json'
import {
  readLearningCode,
  loadLearningCode,
  getLessonLearning,
} from './learningContent'
import { createSourceLoader } from './sourceLoader.ts'

export interface Unit {
  id: string
  day: number
  week: number
  title: string
  goal: string
  docPath: string
  seriesId: string
  sourceLanguage?: CodeLanguage
  runtimeProfile?: RuntimeProfile
  source?: string
  exampleNote?: string
  exampleMode?: 'browser' | 'external'
  exampleFiles?: string[]
  exampleReadingSource?: string
}
type ExampleDetails = {
  mode: 'browser' | 'external'
  note: string
  files?: string[]
  readingSource?: string
}
const detailModules = import.meta.glob<Record<string, ExampleDetails>>(
  '../../content/examples/*.json',
  { eager: true, import: 'default' },
)
const exampleDetails: Record<string, ExampleDetails> = Object.assign(
  {},
  ...Object.values(detailModules),
)
for (const unit of catalog.units as Unit[]) {
  const readingSource = exampleDetails[unit.id]?.readingSource
  if (readingSource && readingSource !== unit.exampleReadingSource)
    throw Error('Mismatched example reading source: ' + unit.id)
}
export const series = catalog.series
const examples = import.meta.glob<string>('../labs/*/example.js', {
  query: '?raw',
  import: 'default',
})
const sourceLoader = createSourceLoader(examples)
// Metadata enumeration (including React dev profiling) must not read lazy source.
export const units: Unit[] = (catalog.units as Unit[]).map((unit) =>
  Object.defineProperty(
    {
      ...unit,
      exampleMode: exampleDetails[unit.id]?.mode,
      exampleFiles: exampleDetails[unit.id]?.files,
      exampleNote: exampleDetails[unit.id]?.note,
    },
    'source',
    {
      enumerable: false,
      configurable: true,
      get() {
        return unit.sourceLanguage === 'html'
          ? readLearningCode('src/labs/' + unit.id + '/example.html')
          : sourceLoader.read('../labs/' + unit.id + '/example.js')
      },
    },
  ),
)
export const legacyUnitIds = units
  .filter((unit) => unit.seriesId === 'webgl')
  .map((unit) => unit.id)
export const v2UnitIds = previousCatalog.units.map((unit) => unit.id)
export const categories: Record<string, string> = {
  fundamentals: '언어와 웹 기초',
  frameworks: 'UI 프레임워크',
  graphics: '그래픽스',
  shader: '셰이더',
  animation: '애니메이션',
  engineering: '엔지니어링',
  testing: '테스트',
}

const localizedCatalogs = {
  ko: { series, units },
  en: {
    series: englishCatalog.series,
    units: englishCatalog.units.map<Unit>((entry) => {
      const common = units.find((unit) => unit.id === entry.id)!
      return Object.defineProperty(
        {
          ...entry,
          sourceLanguage: common.sourceLanguage,
          runtimeProfile: common.runtimeProfile,
          exampleMode: common.exampleMode,
          exampleFiles: common.exampleFiles,
        },
        'source',
        {
          enumerable: false,
          configurable: true,
          get() {
            return common.sourceLanguage === 'html'
              ? readLearningCode('src/labs/' + entry.id + '/example.html', 'en')
              : common.source
          },
        },
      )
    }),
  },
}

export function getCatalog(locale: Locale): {
  series: typeof series
  units: Unit[]
} {
  return localizedCatalogs[locale]
}

export function getLocalizedUnit(locale: Locale, id: string): Unit | null {
  return getCatalog(locale).units.find((unit) => unit.id === id) ?? null
}

export function hasUnitSource(unit: Unit): boolean {
  return (
    unit.sourceLanguage === 'html' ||
    sourceLoader.has('../labs/' + unit.id + '/example.js')
  )
}

export async function loadUnitSource(
  unit: Unit,
  locale: Locale = 'ko',
): Promise<void> {
  if (unit.sourceLanguage === 'html')
    await loadLearningCode('src/labs/' + unit.id + '/example.html', locale)
  else if (hasUnitSource(unit))
    await sourceLoader.load('../labs/' + unit.id + '/example.js')
}

export async function prepareUnitSources(
  unit: Unit,
  locale: Locale,
): Promise<void> {
  const lesson = getLessonLearning(unit.id, locale)
  await Promise.all([
    loadUnitSource(unit, locale),
    ...(lesson?.steps.flatMap((step) => [
      loadLearningCode(step.starterPath, locale),
      loadLearningCode(step.solutionPath, locale),
    ]) ?? []),
  ])
}
