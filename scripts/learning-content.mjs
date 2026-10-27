import fs from 'node:fs'
import path from 'node:path'
import { assertSourceHash } from './locale-content.mjs'
import {
  validateLearningRoadmap,
  validateRoadmapParity,
  validateRoadmapLessons,
  validateLearningContent,
  validateLearningParity,
  localizedLearningCodePath,
} from '../src/app/learningSchema.ts'

export function validateLearningTranslation(ko, en, unitIds, readCode) {
  validateLearningContent(ko, unitIds, readCode)
  validateLearningContent(en, unitIds, (file) => readCode(file, 'en'))
  validateLearningParity(ko, en)
  assertSourceHash(ko, en.sourceHash, 'learning')
}
export function readLearningContent(
  root = path.resolve(import.meta.dirname, '..'),
) {
  const read = (file) =>
    JSON.parse(fs.readFileSync(path.join(root, file), 'utf8'))
  const roadmapKo = read('content/learning/threejs-roadmap.json')
  const roadmapEn = read('content/locales/en/learning/threejs-roadmap.json')
  const roadmapIds = read('content/curricula/threejs.json').units.map(
    (unit) => unit.id,
  )
  validateLearningRoadmap(roadmapKo, roadmapIds)
  validateLearningRoadmap(roadmapEn, roadmapIds)
  validateRoadmapParity(roadmapKo, roadmapEn)
  assertSourceHash(roadmapKo, roadmapEn.sourceHash, 'roadmap')
  const ko = read('content/learning/threejs.json')
  const en = read('content/locales/en/learning/threejs.json')
  validateRoadmapLessons(roadmapKo, ko)
  validateRoadmapLessons(roadmapEn, en)
  const unitIds = read('src/app/catalog.json').units.map((unit) => unit.id)
  const readCode = (file, locale = 'ko') => {
    const target = localizedLearningCodePath(
      file,
      locale,
      en.codeSourceHashes,
      (file) => fs.existsSync(path.join(root, file)),
    )
    if (!fs.existsSync(path.join(root, file)))
      throw Error('Unknown code path: ' + file)
    const source = fs.readFileSync(path.join(root, file), 'utf8')
    if (target !== file)
      assertSourceHash(
        source,
        en.codeSourceHashes[file],
        'learning code: ' + file,
      )
    return target === file
      ? source
      : fs.readFileSync(path.join(root, target), 'utf8')
  }
  const paths = new Set(
    ko.lessons.flatMap((lesson) =>
      lesson.steps.flatMap((step) => [step.starterPath, step.solutionPath]),
    ),
  )
  const defaults = read('content/curricula/threejs.json')
    .units.filter(
      (unit) =>
        unit.sourceLanguage === 'html' &&
        ko.lessons.some((lesson) => lesson.unitId === unit.id),
    )
    .map((unit) => `src/labs/${unit.id}/example.html`)
  for (const file of defaults) paths.add(file)
  for (const file of Object.keys(en.codeSourceHashes ?? {}))
    if (!paths.has(file))
      throw Error('Unknown English learning code hash path: ' + file)
  validateLearningTranslation(ko, en, unitIds, readCode)
  for (const file of defaults) {
    if (!en.codeSourceHashes?.[file])
      throw Error('Missing English learning code hash: ' + file)
    readCode(file, 'en')
  }
  return {
    ko,
    en,
    roadmapKo,
    roadmapEn,
    unitIds,
    readCode,
    validateTranslation: validateLearningTranslation,
  }
}
