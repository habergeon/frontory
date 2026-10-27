import type { Locale } from '../i18n/locale'

export interface LearningStep {
  id: string
  title: string
  explanation: string
  solutionExplanation: string
  starterPath: string
  expected: string
  hints: string[]
  solutionPath: string
  questions: string[]
}
export interface LessonLearningData {
  unitId: string
  prerequisiteIds: string[]
  introduction: string
  steps: LearningStep[]
  apiIds: string[]
}
export interface ApiReference {
  id: string
  symbol: string
  description: string
  parameters: {
    name: string
    type: string
    description: string
    defaultValue?: string
  }[]
  result: string
  cautions: string[]
  example: string
  sourceUrl: string
  packageVersion: string
  checkedAt: string
}
export interface LearningContent {
  lessons: LessonLearningData[]
  apis: ApiReference[]
}
export type ReadLearningCode = (path: string, locale?: Locale) => string

// Both adapters validate the exact same data before exposing it.
export function validateLearningContent(
  data: LearningContent,
  unitIds: string[],
  readCode: ReadLearningCode,
) {
  const string = (v: unknown, key: string) => {
    if (typeof v !== 'string' || !v.trim())
      throw Error('Invalid learning field: ' + key)
  }
  const strings = (v: unknown, key: string) => {
    if (!Array.isArray(v)) throw Error('Invalid learning array: ' + key)
    v.forEach((x) => string(x, key))
  }
  const unique = (ids: string[], label: string) => {
    if (new Set(ids).size !== ids.length) throw Error('Duplicate ' + label)
  }
  if (!Array.isArray(data.lessons) || !Array.isArray(data.apis))
    throw Error('Invalid learning content')
  unique(
    data.lessons.map((x) => x.unitId),
    'lesson ID',
  )
  unique(
    data.apis.map((x) => x.id),
    'API ID',
  )
  const stepIds: string[] = []
  for (const api of data.apis) {
    for (const key of [
      'id',
      'symbol',
      'description',
      'result',
      'example',
      'sourceUrl',
      'packageVersion',
      'checkedAt',
    ] as const)
      string(api[key], key)
    if (!/^https:\/\//.test(api.sourceUrl))
      throw Error('Invalid API source URL')
    strings(api.cautions, 'cautions')
    if (!Array.isArray(api.parameters)) throw Error('Invalid API parameters')
    for (const p of api.parameters) {
      for (const key of ['name', 'type', 'description'] as const)
        string(p[key], key)
      if (p.defaultValue !== undefined) string(p.defaultValue, 'defaultValue')
    }
  }
  for (const lesson of data.lessons) {
    string(lesson.unitId, 'unitId')
    string(lesson.introduction, 'introduction')
    if (!unitIds.includes(lesson.unitId))
      throw Error('Unknown lesson: ' + lesson.unitId)
    strings(lesson.prerequisiteIds, 'prerequisiteIds')
    strings(lesson.apiIds, 'apiIds')
    for (const id of lesson.prerequisiteIds)
      if (!unitIds.includes(id)) throw Error('Unknown prerequisite: ' + id)
    for (const id of lesson.apiIds)
      if (!data.apis.some((api) => api.id === id))
        throw Error('Unknown API: ' + id)
    if (!Array.isArray(lesson.steps) || !lesson.steps.length)
      throw Error('Missing learning steps')
    for (const step of lesson.steps) {
      for (const key of [
        'id',
        'title',
        'explanation',
        'solutionExplanation',
        'starterPath',
        'expected',
        'solutionPath',
      ] as const)
        string(step[key], key)
      strings(step.hints, 'hints')
      strings(step.questions, 'questions')
      stepIds.push(step.id)
      for (const file of [step.starterPath, step.solutionPath]) {
        if (!/^src\/labs\/[\w/-]+\.html$/.test(file))
          throw Error('Unknown code path: ' + file)
        readCode(file)
      }
    }
  }
  unique(stepIds, 'step ID')
}

export function validateLearningParity(
  source: LearningContent,
  translated: LearningContent,
) {
  const shape = (data: LearningContent) => ({
    lessons: data.lessons.map((l) => ({
      unitId: l.unitId,
      prerequisiteIds: l.prerequisiteIds,
      apiIds: l.apiIds,
      steps: l.steps.map((s) => ({
        id: s.id,
        starterPath: s.starterPath,
        solutionPath: s.solutionPath,
        hints: s.hints.length,
        questions: s.questions.length,
      })),
    })),
    apis: data.apis.map((a) => ({
      id: a.id,
      symbol: a.symbol,
      parameters: a.parameters.map((p) => ({
        name: p.name,
        type: p.type,
        defaultValue: p.defaultValue,
      })),
      cautions: a.cautions.length,
      sourceUrl: a.sourceUrl,
      packageVersion: a.packageVersion,
      checkedAt: a.checkedAt,
    })),
  })
  if (JSON.stringify(shape(source)) !== JSON.stringify(shape(translated)))
    throw Error('Translation parity mismatch: learning content')
}

export function learningMarkdown(
  lesson: LessonLearningData,
  apis: ApiReference[],
  readCode: ReadLearningCode,
  locale: Locale,
) {
  const en = locale === 'en'
  const code = (path: string) =>
    '```html\n' + readCode(path, locale).trim() + '\n```'
  return [
    '## ' + (en ? 'Guided learning' : '단계별 학습'),
    '',
    lesson.introduction,
    '',
    ...(lesson.prerequisiteIds.length
      ? [
          '### ' + (en ? 'Prerequisite units' : '선수 단원'),
          '',
          ...lesson.prerequisiteIds.map((id) => '- `' + id + '`'),
          '',
        ]
      : []),
    ...lesson.steps.flatMap((s) => [
      '### ' + s.title,
      '',
      s.explanation,
      '',
      en ? '**Expected result**' : '**예상 결과**',
      '',
      s.expected,
      '',
      code(s.starterPath),
      '',
      '<details>\n<summary>' + (en ? 'Hints' : '힌트') + '</summary>\n',
      ...s.hints.map((h) => '- ' + h),
      '\n</details>',
      '',
      '<details>\n<summary>' +
        (en ? 'Solution and explanation' : '완성 코드와 해설') +
        '</summary>\n',
      s.solutionExplanation,
      '',
      code(s.solutionPath),
      '\n</details>',
      '',
      ...s.questions.map((q) => '- ' + q),
      '',
    ]),
    ...lesson.apiIds.flatMap((id) => {
      const a = apis.find((a) => a.id === id)!
      return [
        '### API · ' + a.symbol,
        '',
        a.description,
        '',
        ...a.parameters.map(
          (p) =>
            '- `' +
            p.name +
            ': ' +
            p.type +
            '` — ' +
            p.description +
            (p.defaultValue === undefined ? '' : ' (' + p.defaultValue + ')'),
        ),
        '',
        a.result,
        '',
        ...a.cautions.map((c) => '- ' + c),
        '',
        '```js\n' + a.example + '\n```',
        '',
        '[' +
          a.symbol +
          '](' +
          a.sourceUrl +
          ') · three@' +
          a.packageVersion +
          ' · ' +
          a.checkedAt,
        '',
      ]
    }),
  ].join('\n')
}

// Logical paths stay identical across translations; only the reader selects bytes.
export function localizedLearningCodePath(
  path: string,
  locale: Locale,
  hashes: Record<string, string> | undefined,
  exists: (path: string) => boolean,
): string {
  if (locale !== 'en') return path
  const translated = path.replace(/\.html$/, '.en.html')
  if (hashes?.[path] === undefined && !exists(translated)) return path
  if (typeof hashes?.[path] !== 'string')
    throw Error('Missing English learning code hash: ' + path)
  if (!exists(translated))
    throw Error('Missing English learning code file: ' + translated)
  return translated
}

export interface RoadmapEntry {
  unitId: string
  prerequisiteIds: string[]
  topics: string[]
  outcome: string
  requiredCapabilities: string[]
  readiness: 'planned' | 'verified'
}
export interface LearningRoadmap {
  entries: RoadmapEntry[]
}

export function validateLearningRoadmap(
  data: LearningRoadmap,
  orderedUnitIds: string[],
) {
  if (!Array.isArray(data.entries) || data.entries.length !== 28)
    throw Error('Expected 28 roadmap entries')
  const ids = data.entries.map((entry) => entry.unitId)
  if (new Set(ids).size !== 28) throw Error('Duplicate roadmap unit ID')
  if (JSON.stringify(ids) !== JSON.stringify(orderedUnitIds))
    throw Error('Invalid roadmap sequence')
  if (ids[13] !== 'threejs-02' || ids[27] !== 'threejs-03')
    throw Error('Invalid historical roadmap positions')
  for (const entry of data.entries) {
    if (!['verified', 'planned'].includes(entry.readiness))
      throw Error('Invalid roadmap readiness: ' + entry.unitId)
    for (const key of ['topics', 'requiredCapabilities'] as const)
      if (
        !Array.isArray(entry[key]) ||
        !entry[key].length ||
        entry[key].some((text) => typeof text !== 'string' || !text.trim())
      )
        throw Error('Invalid roadmap field: ' + key)
    if (typeof entry.outcome !== 'string' || !entry.outcome.trim())
      throw Error('Invalid roadmap outcome')
    if (
      !Array.isArray(entry.prerequisiteIds) ||
      new Set(entry.prerequisiteIds).size !== entry.prerequisiteIds.length
    )
      throw Error('Invalid roadmap prerequisites')
    for (const id of entry.prerequisiteIds)
      if (id === entry.unitId || !ids.includes(id))
        throw Error('Invalid roadmap prerequisite: ' + id)
  }
}

export function validateRoadmapLessons(
  roadmap: LearningRoadmap,
  learning: LearningContent,
) {
  for (const entry of roadmap.entries)
    if (
      entry.readiness === 'verified' &&
      !learning.lessons.some((lesson) => lesson.unitId === entry.unitId)
    )
      throw Error('Verified roadmap unit has no lesson: ' + entry.unitId)
}

export function validateRoadmapParity(
  source: LearningRoadmap,
  translated: LearningRoadmap,
) {
  const shape = (data: LearningRoadmap) =>
    data.entries.map(({ unitId, prerequisiteIds, readiness }) => ({
      unitId,
      prerequisiteIds,
      readiness,
    }))
  if (JSON.stringify(shape(source)) !== JSON.stringify(shape(translated)))
    throw Error('Translation parity mismatch: roadmap')
}
