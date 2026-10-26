import roadmapKo from '../../content/learning/threejs-roadmap.json'
import roadmapEn from '../../content/locales/en/learning/threejs-roadmap.json'
import ko from '../../content/learning/threejs.json'
import en from '../../content/locales/en/learning/threejs.json'
import catalog from './catalog.json'
import type { Locale } from '../i18n/locale'
import {
  validateLearningRoadmap,
  validateRoadmapParity,
  type LearningRoadmap,
  validateLearningContent,
  validateLearningParity,
  localizedLearningCodePath,
  type LessonLearningData,
  type ApiReference,
} from './learningSchema'
export type {
  LessonLearningData,
  LearningStep,
  ApiReference,
} from './learningSchema'

const sources = import.meta.glob<string>('../labs/**/*.html', {
  eager: true,
  query: '?raw',
  import: 'default',
})
export function readLearningCode(path: string, locale: Locale = 'ko'): string {
  path = localizedLearningCodePath(
    path,
    locale,
    (en as { codeSourceHashes?: Record<string, string> }).codeSourceHashes,
    (path) => sources['../' + path.slice('src/'.length)] !== undefined,
  )
  const source = sources['../' + path.slice('src/'.length)]
  if (source === undefined) throw Error('Unknown code path: ' + path)
  return source
}
const unitIds = catalog.units.map((unit) => unit.id)
validateLearningContent(ko, unitIds, readLearningCode)
validateLearningContent(en, unitIds, (path) => readLearningCode(path, 'en'))
validateLearningParity(ko, en)
export const getLessonLearning = (
  unitId: string,
  locale: Locale,
): LessonLearningData | null =>
  (locale === 'ko' ? ko : en).lessons.find(
    (lesson) => lesson.unitId === unitId,
  ) ?? null
export const getApiReference = (
  id: string,
  locale: Locale,
): ApiReference | null =>
  (locale === 'ko' ? ko : en).apis.find((api) => api.id === id) ?? null

const roadmapIds = catalog.units
  .filter((unit) => unit.seriesId === 'threejs')
  .map((unit) => unit.id)
validateLearningRoadmap(roadmapKo as LearningRoadmap, roadmapIds)
validateLearningRoadmap(roadmapEn as LearningRoadmap, roadmapIds)
validateRoadmapParity(
  roadmapKo as LearningRoadmap,
  roadmapEn as LearningRoadmap,
)
export const getSeriesRoadmap = (locale: Locale) =>
  ((locale === 'ko' ? roadmapKo : roadmapEn) as LearningRoadmap).entries
