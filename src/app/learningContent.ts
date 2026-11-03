import roadmapKo from '../../content/learning/threejs-roadmap.json'
import roadmapEn from '../../content/locales/en/learning/threejs-roadmap.json'
import ko from '../../content/learning/threejs.json'
import en from '../../content/locales/en/learning/threejs.json'
import catalog from './catalog.json'
import type { Locale } from '../i18n/locale'
import { createSourceLoader } from './sourceLoader.ts'
import {
  validateLearningRoadmap,
  validateRoadmapParity,
  validateRoadmapLessons,
  type LearningRoadmap,
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
  query: '?raw',
  import: 'default',
})
const sourceLoader = createSourceLoader(sources)
function resolveCodePath(path: string, locale: Locale): string {
  return localizedLearningCodePath(
    path,
    locale,
    (en as { codeSourceHashes?: Record<string, string> }).codeSourceHashes,
    (path) => sourceLoader.has('../' + path.slice('src/'.length)),
  )
}
export function readLearningCode(path: string, locale: Locale = 'ko'): string {
  path = resolveCodePath(path, locale)
  const source = sourceLoader.read('../' + path.slice('src/'.length))
  if (source === undefined) throw Error('Unknown code path: ' + path)
  return source
}
export function loadLearningCode(
  path: string,
  locale: Locale = 'ko',
): Promise<void> {
  return sourceLoader.load(
    '../' + resolveCodePath(path, locale).slice('src/'.length),
  )
}
// Full source validation runs in check:curricula and check:translations before build.
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
validateRoadmapLessons(roadmapKo as LearningRoadmap, ko)
validateRoadmapLessons(roadmapEn as LearningRoadmap, en)
validateRoadmapParity(
  roadmapKo as LearningRoadmap,
  roadmapEn as LearningRoadmap,
)
export const getSeriesRoadmap = (locale: Locale) =>
  ((locale === 'ko' ? roadmapKo : roadmapEn) as LearningRoadmap).entries
