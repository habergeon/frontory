import fs from 'node:fs'
import path from 'node:path'
import { assertSourceHash } from './locale-content.mjs'
import {
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
  const ko = read('content/learning/threejs.json')
  const en = read('content/locales/en/learning/threejs.json')
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
  for (const file of Object.keys(en.codeSourceHashes ?? {}))
    if (!paths.has(file))
      throw Error('Unknown English learning code hash path: ' + file)
  validateLearningTranslation(ko, en, unitIds, readCode)
  return {
    ko,
    en,
    unitIds,
    readCode,
    validateTranslation: validateLearningTranslation,
  }
}
