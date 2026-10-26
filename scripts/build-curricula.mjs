import { readLearningContent } from './learning-content.mjs'
import {
  learningMarkdown,
  localizedLearningCodePath,
} from '../src/app/learningSchema.ts'
import { formatGeneratedText } from './format-generated.mjs'
import fs from 'node:fs'
import path from 'node:path'
import { readEnglishContent } from './locale-content.mjs'
import { roadmapMessages, headings, messages } from '../src/i18n/messages.ts'

const root = path.resolve(import.meta.dirname, '..')
const read = (file) =>
  JSON.parse(fs.readFileSync(path.join(root, file), 'utf8'))
const baseline = read('content/catalog-v2.json')
const companions = read('content/locales/en/companions.json').entries
const categories = {
  fundamentals: '언어 및 기초',
  frameworks: 'UI 프레임워크',
  graphics: '그래픽스',
  shader: '셰이더',
  animation: '애니메이션',
  engineering: '엔지니어링',
  testing: '테스트',
}
const learning = readLearningContent(root)
const roadmapMarkdown = (locale, units, from) => {
  const copy = roadmapMessages[locale]
  const entries = (locale === 'ko' ? learning.roadmapKo : learning.roadmapEn)
    .entries
  return [
    '## ' + copy.title,
    '',
    copy.explanation,
    '',
    ...entries.flatMap((entry, index) => {
      const unit = units.find((unit) => unit.id === entry.unitId)
      return [
        `### ${link(from, unit.docPath, `${String(index + 1).padStart(2, '0')}. ${unit.title}`)} · ${copy[entry.readiness]}`,
        '',
        `ID: \`${entry.unitId}\``,
        '',
        `${copy.topics}: ${entry.topics.join(' · ')}`,
        '',
        `${copy.prerequisites}: ${
          entry.prerequisiteIds.length
            ? entry.prerequisiteIds
                .map((id) => {
                  const prerequisite = units.find((unit) => unit.id === id)
                  return link(
                    from,
                    prerequisite.docPath,
                    String(prerequisite.day).padStart(2, '0'),
                  )
                })
                .join(' · ')
            : copy.none
        }`,
        '',
        `${copy.outcome}: ${entry.outcome}`,
        '',
        `${copy.capabilities}: ${entry.requiredCapabilities.join(' · ')}`,
        '',
      ]
    }),
  ].join('\n')
}
const outputs = new Map()
const catalog = { series: [], units: [] }
const relative = (from, to) => path.posix.relative(path.posix.dirname(from), to)
const link = (from, to, title) => `[${title}](${relative(from, to)})`
const bullets = (values) => values.map((value) => '- ' + value).join('\n')
const numbered = (values) =>
  values.map((value, index) => `${index + 1}. ${value}`).join('\n')
const table = (value) => value.replaceAll('|', '\\|').replaceAll('\n', ' ')
const exampleSourcePath = (id, locale = 'ko') => {
  const html =
    catalog.units.find((unit) => unit.id === id)?.sourceLanguage === 'html'
  const file = 'src/labs/' + id + '/example.' + (html ? 'html' : 'js')
  return (
    '/' +
    (html
      ? localizedLearningCodePath(
          file,
          locale,
          learning.en.codeSourceHashes,
          (file) => fs.existsSync(path.join(root, file)),
        )
      : file)
  )
}
const hasExample = (id) =>
  fs.existsSync(path.join(root, exampleSourcePath(id).slice(1)))
const metadataDirectory = path.join(root, 'content/examples')
const metadata = fs.existsSync(metadataDirectory)
  ? Object.assign(
      {},
      ...fs
        .readdirSync(metadataDirectory)
        .filter((file) => file.endsWith('.json'))
        .map((file) => read('content/examples/' + file)),
    )
  : {}
const exampleLabel = (id) =>
  !hasExample(id)
    ? '문서 기반 직접 구현'
    : metadata[id]?.mode === 'external'
      ? '외부 실행 예제 · 미리보기 안내'
      : '편집 가능한 예제'

for (const series of baseline.series) {
  if (series.id === 'webgl') {
    catalog.series.push(series)
    catalog.units.push(
      ...baseline.units.filter((unit) => unit.seriesId === series.id),
    )
    continue
  }
  const content = read(`content/curricula/${series.id}.json`)
  if (
    content.seriesId !== series.id ||
    content.stages.length !== 4 ||
    content.units.length !== 28
  )
    throw Error('Invalid series: ' + series.id)
  const base = path.posix.dirname(series.docPath)
  const units = content.units.map((unit, index) => {
    if (unit.day !== index + 1) throw Error('Invalid sequence: ' + unit.id)
    const old = baseline.units.find((item) => item.id === unit.id)
    if (old && (old.seriesId !== series.id || old.title !== unit.title))
      throw Error('Changed legacy identity: ' + unit.id)
    const docPath =
      old?.docPath ??
      `${base}/units/${String(unit.day).padStart(2, '0')}/README.md`
    return {
      id: unit.id,
      day: unit.day,
      week: Math.ceil(unit.day / 7),
      title: unit.title,
      goal: unit.outcomes.join(' '),
      docPath,
      seriesId: series.id,
      ...(unit.sourceLanguage ? { sourceLanguage: unit.sourceLanguage } : {}),
      ...(unit.runtimeProfile ? { runtimeProfile: unit.runtimeProfile } : {}),
    }
  })
  catalog.series.push({ ...series, stages: content.stages })
  catalog.units.push(...units)
  const intro = [
    `# ${series.title}`,
    '',
    link(series.docPath, '/docs/labs/README.md', 'Frontory 기술 지도'),
    '',
    `${categories[series.category]} · 4단계 · 28개 학습 단위`,
    '',
    '## 시리즈 목표',
    '',
    content.goal,
    '',
    '## 선수 지식',
    '',
    series.prerequisites,
    '',
    '## 실습 방식과 제공 범위',
    '',
    '학습 단위는 날짜가 아닙니다. 설명과 과제를 읽고 완료 조건을 확인한 뒤 다음 단위로 이동하세요. 각 단위의 예제를 출발점으로 삼아 변수를 바꾸고 결과를 관찰합니다. 내장 실행 예제와 별도 환경이 필요한 과제를 구분해서 표시합니다. 예제를 여는 것만으로 학습을 완료한 것으로 처리하지 않습니다.',
    '',
    '기존 단위 ID와 필기는 유지됩니다. 기존 01·02·03 예제는 확장된 학습 순서의 1·14·28번째에 연결되므로 주소의 숫자와 화면의 학습 순서가 다를 수 있습니다.',
    '',
    '## 학습 경로',
    '',
  ]
  content.stages.forEach((stage, index) => {
    intro.push(
      `### ${index + 1}단계 · ${stage}`,
      '',
      ...units
        .filter((unit) => unit.week === index + 1)
        .map(
          (unit) =>
            `- ${link(series.docPath, unit.docPath, `${String(unit.day).padStart(2, '0')}. ${unit.title}`)} — ${exampleLabel(unit.id)}`,
        ),
      '',
    )
  })
  intro.push(
    '## 통합 프로젝트와 제출물',
    '',
    content.capstone,
    '',
    '구현 코드와 실행 방법, 기준 조건과 변경 조건의 기록, 실패 사례와 복구 방법을 함께 남기세요. 측정하지 않은 성능과 수행하지 않은 테스트는 결과로 기재하지 않습니다.',
    '',
    '## 공식 참고',
    '',
    ...[
      ...new Map(
        content.units
          .flatMap((unit) => unit.references)
          .map((reference) => [reference.url, reference]),
      ).values(),
    ].map((reference) => `- [${reference.title}](${reference.url})`),
    '',
  )
  if (series.id === 'threejs')
    intro.push(roadmapMarkdown('ko', units, series.docPath))
  outputs.set(series.docPath.slice(1), intro.join('\n'))
  content.units.forEach((unit, index) => {
    const entry = units[index]
    const old = baseline.units.some((item) => item.id === unit.id)
    const lesson = learning.ko.lessons.find((item) => item.unitId === unit.id)
    const lines = [
      `# ${series.title} · ${String(unit.day).padStart(2, '0')} ${unit.title}`,
      '',
      link(entry.docPath, series.docPath, '시리즈 목차') +
        ' · ' +
        link(entry.docPath, '/docs/labs/README.md', '전체 기술 지도'),
      '',
      `단계: ${content.stages[entry.week - 1]} · ${exampleLabel(unit.id)} · 저장 ID: \`${unit.id}\``,
      '',
      '## 목표와 학습 후 역량',
      '',
      bullets(unit.outcomes),
      '',
      '## 선수 지식',
      '',
      unit.prerequisites,
      '',
      '## 핵심 개념과 설명',
      '',
      ...unit.concepts.flatMap((concept) => [
        `### ${concept.title}`,
        '',
        concept.explanation,
        '',
      ]),
      '## 실습 준비',
      '',
      unit.environment,
      '',
      unit.sourceLanguage === 'html' && lesson
        ? '모든 필수 과제를 사이트 안에서 단계별로 수행합니다. 아래 학습 단계의 시작 코드를 불러와 수정하고 실행한 뒤, 실제 결과와 이유를 사이트 필기에 남기세요.'
        : hasExample(unit.id)
          ? '연결된 예제는 출발점입니다. 아래 과제 전체가 완성된 코드는 아니며 예제의 지원 범위를 넘는 작업은 별도 프로젝트에서 수행하세요.'
          : '이 단위에는 내장 실행 예제가 없습니다. 아래 절차에 따라 별도 실습 파일을 만들고 실행 결과를 필기에 남기세요.',
      '',
      '## 실습 과제',
      '',
      numbered(unit.steps),
      '',
      '## 관찰할 변수',
      '',
      '| 변수 | 기준 조건 | 바꿀 조건 | 예상할 변화·검증 가설 |',
      '| --- | --- | --- | --- |',
      ...unit.variables.map(
        (variable) =>
          `| ${[variable.name, variable.baseline, variable.change, variable.expected].map(table).join(' | ')} |`,
      ),
      '',
      '표의 예상은 측정 결과가 아닙니다. 한 번에 한 조건만 바꾸고 실제 결과가 다르면 원인을 기록하세요.',
      '',
      '## 완료 조건',
      '',
      unit.criteria.map((criterion) => '- [ ] ' + criterion).join('\n'),
      '',
      '## 자가 점검',
      '',
      numbered(unit.questions),
      '',
      '## 공식 참고',
      '',
      ...unit.references.map(
        (reference) => `- [${reference.title}](${reference.url})`,
      ),
      '',
      '## 연결된 예제와 실행 범위',
      '',
      hasExample(unit.id)
        ? `${link(entry.docPath, exampleSourcePath(unit.id), '예제 원본')} · ${link(entry.docPath, '/docs/examples.md', '실행 환경과 제한')}`
        : '문서와 필기를 제공합니다.',
      '',
      ...(metadata[unit.id]
        ? [
            metadata[unit.id].note,
            '',
            ...(metadata[unit.id].files ?? []).map(
              (file) =>
                '- ' +
                link(entry.docPath, '/' + file, path.posix.basename(file)),
            ),
            '',
          ]
        : []),
      '원본 코드·기록은 자동으로 덮어쓰지 않습니다. 기존 예제를 초기화할 때도 필기는 유지됩니다.',
      '',
      '## 다음 학습',
      '',
      [
        index > 0 &&
          link(
            entry.docPath,
            units[index - 1].docPath,
            '이전: ' + units[index - 1].title,
          ),
        index < 27 &&
          link(
            entry.docPath,
            units[index + 1].docPath,
            '다음: ' + units[index + 1].title,
          ),
      ]
        .filter(Boolean)
        .join(' · '),
      '',
      '## 실험 기록 — 직접 작성',
      '',
      ...[
        '목표',
        '핵심 개념',
        '바꾼 변수와 예상',
        '실제 결과',
        '배운 점',
        '남은 질문',
      ].flatMap((title) => ['### ' + title, '']),
    ]
    if (lesson)
      lines.splice(
        lines.indexOf('## 다음 학습'),
        0,
        learningMarkdown(lesson, learning.ko.apis, learning.readCode, 'ko'),
      )
    if (unit.id === 'threejs-step-04')
      lines.push(roadmapMarkdown('ko', units, entry.docPath))
    outputs.set(entry.docPath.slice(1), lines.join('\n'))
  })
}
if (new Set(catalog.units.map((unit) => unit.id)).size !== 644)
  throw Error('Expected 644 unique units')
for (const old of baseline.units)
  if (
    !catalog.units.some(
      (unit) => unit.id === old.id && unit.docPath === old.docPath,
    )
  )
    throw Error('Missing historical unit: ' + old.id)
const presentations = read('content/example-presentations.json')
for (const unit of catalog.units) {
  if (presentations[unit.id])
    unit.exampleReadingSource = `/examples-en/${unit.id}/example.js`
}
outputs.set('src/app/catalog.json', JSON.stringify(catalog, null, 2) + '\n')
const exampleIndexPath = '/docs/examples-expanded.md'
const exampleIndex = [
  '# 확장 학습 단위 예제',
  '',
  '각 예제의 실행 범위를 확인하세요. 브라우저 미리보기와 별도 실행 파일의 역할은 다를 수 있습니다. 예제 연결은 과제 전체의 완성이나 학습 완료를 의미하지 않습니다.',
  '',
  link(exampleIndexPath, '/docs/examples.md', '기존 예제와 공통 실행 안내'),
  '',
]
for (const series of catalog.series.filter((item) => item.id !== 'webgl')) {
  exampleIndex.push(
    '## ' + series.title,
    '',
    '| 학습 단위 | 실행 방식 | 원본과 지원 범위 |',
    '| --- | --- | --- |',
  )
  for (const unit of catalog.units.filter(
    (item) =>
      item.seriesId === series.id &&
      !baseline.units.some((old) => old.id === item.id),
  )) {
    const detail = metadata[unit.id]
    exampleIndex.push(
      `| ${link(exampleIndexPath, unit.docPath, unit.day + '. ' + unit.title)} | ${exampleLabel(unit.id)} | ${link(exampleIndexPath, exampleSourcePath(unit.id), '원본 코드')} — ${table(detail?.note ?? '예제 준비 중')} |`,
    )
  }
  exampleIndex.push('')
}
outputs.set(exampleIndexPath.slice(1), exampleIndex.join('\n'))
const english = readEnglishContent()
const englishPath = (docPath) => docPath.replace('/docs/', '/docs/en/')
const englishCatalog = {
  series: english.catalog.series.map((series) => ({
    ...series,
    docPath: englishPath(series.docPath),
  })),
  units: english.catalog.units.map(({ exampleReadingSource, ...unit }) => ({
    ...unit,
    docPath: englishPath(unit.docPath),
    ...(english.exampleReadingSources[unit.id]
      ? { exampleReadingSource: english.exampleReadingSources[unit.id] }
      : {}),
    ...(english.exampleNotes[unit.id]
      ? { exampleNote: english.exampleNotes[unit.id] }
      : {}),
  })),
}
const englishExampleLabel = (id) =>
  !hasExample(id)
    ? 'Document-based implementation'
    : metadata[id]?.mode === 'external'
      ? 'External example · preview instructions'
      : 'Editable example'
const englishHeadings = headings.en
// Translated explanations retain the source document's relative link destinations.
const englishExplanation = (text, docPath) =>
  text
    .split(/(```[\s\S]*?```)/g)
    .map((part, index) =>
      index % 2
        ? part
        : part.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (match, title, href) => {
            if (/^(?:[a-z]+:|\/|#)/i.test(href)) return match
            const originalPath = docPath.replace('/docs/en/', '/docs/')
            const target = path.posix.resolve(
              path.posix.dirname(originalPath),
              href,
            )
            return link(docPath, target, title)
          }),
    )
    .join('')
for (const series of englishCatalog.series.filter(
  (series) => series.id !== 'webgl',
)) {
  const content = english.curricula[series.id]
  const units = englishCatalog.units.filter(
    (unit) => unit.seriesId === series.id,
  )
  const categoryKey =
    'category' + series.category[0].toUpperCase() + series.category.slice(1)
  const intro = [
    `# ${series.title}`,
    '',
    link(series.docPath, '/docs/en/labs/README.md', 'Frontory technology map'),
    '',
    `${messages.en[categoryKey]} · 4 stages · 28 units in the full series · ${units.length} published in English`,
    '',
    '## Series goal',
    '',
    content.goal,
    '',
    '## Prerequisites',
    '',
    series.prerequisites,
    '',
    '## Practice approach and scope',
    '',
    'Learning units are not calendar days. Read the explanation and tasks, check the completion criteria, then move on. Use each example as a starting point: change variables and observe the results. Built-in examples and tasks requiring a separate environment are identified separately. Opening an example does not complete a unit.',
    '',
    'Existing unit IDs and notes are preserved. The original 01, 02, and 03 examples occupy positions 1, 14, and 28 in the expanded sequence, so the number in the address may differ from the learning order.',
    '',
    'Only published English units are linked below. The full series has 28 units.',
    '',
    '## Learning path',
    '',
  ]
  content.stages.forEach((stage, index) => {
    intro.push(
      `### Stage ${index + 1} · ${stage}`,
      '',
      ...units
        .filter((unit) => unit.week === index + 1)
        .map(
          (unit) =>
            `- ${link(series.docPath, unit.docPath, `${String(unit.day).padStart(2, '0')}. ${unit.title}`)} — ${englishExampleLabel(unit.id)}`,
        ),
      '',
    )
  })
  intro.push(
    '## Capstone project and deliverables',
    '',
    content.capstone,
    '',
    'Keep the implementation, run instructions, baseline and changed conditions, failure cases, and recovery steps together. Do not report unmeasured performance or tests you have not run as results.',
    '',
    '## Official references',
    '',
    ...[
      ...new Map(
        content.units
          .flatMap((unit) => unit.references)
          .map((reference) => [reference.url, reference]),
      ).values(),
    ].map((reference) => `- [${reference.title}](${reference.url})`),
    '',
  )
  if (series.id === 'threejs')
    intro.push(roadmapMarkdown('en', units, series.docPath))
  outputs.set(series.docPath.slice(1), intro.join('\n'))
  for (const unit of content.units) {
    const entry = units.find((item) => item.id === unit.id)
    const previous = units.find((item) => item.day === unit.day - 1)
    const next = units.find((item) => item.day === unit.day + 1)
    const lesson = learning.en.lessons.find((item) => item.unitId === unit.id)
    const lines = [
      `# ${series.title} · ${String(unit.day).padStart(2, '0')} ${unit.title}`,
      '',
      link(entry.docPath, series.docPath, 'Series contents') +
        ' · ' +
        link(entry.docPath, '/docs/en/labs/README.md', 'Technology map'),
      '',
      `Stage: ${content.stages[entry.week - 1]} · ${englishExampleLabel(unit.id)} · Storage ID: \`${unit.id}\``,
      '',
      '## Goals and learning outcomes',
      '',
      bullets(unit.outcomes),
      '',
      '## Prerequisites',
      '',
      unit.prerequisites,
      '',
      '## Key concepts and explanations',
      '',
      ...unit.concepts.flatMap((concept) => [
        `### ${concept.title}`,
        '',
        englishExplanation(concept.explanation, entry.docPath),
        '',
      ]),
      '## Practice setup',
      '',
      unit.environment,
      '',
      unit.sourceLanguage === 'html' && lesson
        ? 'Complete every required task inside the site, step by step. Load a starter from the learning steps below, edit and run it, then record the actual results and reasons in the site notes.'
        : hasExample(unit.id)
          ? 'The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.'
          : 'This unit has no built-in runnable example. Create separate practice files following the steps below and record the results in your notes.',
      '',
      '## ' + englishHeadings.tasks,
      '',
      numbered(unit.steps),
      '',
      '## ' + englishHeadings.variables,
      '',
      '| Variable | Baseline | Change | Expected change / hypothesis |',
      '| --- | --- | --- | --- |',
      ...unit.variables.map(
        (variable) =>
          `| ${[variable.name, variable.baseline, variable.change, variable.expected].map(table).join(' | ')} |`,
      ),
      '',
      'Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.',
      '',
      '## ' + englishHeadings.criteria,
      '',
      unit.criteria.map((criterion) => '- [ ] ' + criterion).join('\n'),
      '',
      '## Self-check',
      '',
      numbered(unit.questions),
      '',
      '## Official references',
      '',
      ...unit.references.map(
        (reference) => `- [${reference.title}](${reference.url})`,
      ),
      '',
      '## Linked example and execution scope',
      '',
      hasExample(unit.id)
        ? `${link(entry.docPath, exampleSourcePath(unit.id, 'en'), 'Example source')} · ${link(entry.docPath, '/docs/en/examples.md', 'Runtime environments and limits')}`
        : 'Documents and notes are provided.',
      '',
      ...(entry.exampleNote
        ? [
            entry.exampleNote,
            '',
            ...(metadata[unit.id]?.files ?? []).map((file) => {
              const companion = companions.find((item) => item.path === file)
              return (
                '- ' +
                link(
                  entry.docPath,
                  '/' + file,
                  path.posix.basename(file) +
                    (file.endsWith('.md') ? ' (Korean original)' : ''),
                ) +
                (file.endsWith('.md') && companion?.englishPath
                  ? ' · ' +
                    link(
                      entry.docPath,
                      '/' + companion.englishPath,
                      'English reading',
                    )
                  : '')
              )
            }),
            '',
          ]
        : []),
      'Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.',
      '',
      '## Next learning',
      '',
      [
        previous &&
          link(entry.docPath, previous.docPath, 'Previous: ' + previous.title),
        next && link(entry.docPath, next.docPath, 'Next: ' + next.title),
      ]
        .filter(Boolean)
        .join(' · '),
      '',
      '## ' + englishHeadings.notes + ' — write your own',
      '',
      ...[
        'goal',
        'concepts',
        'prediction',
        'result',
        'learning',
        'questions',
      ].flatMap((key) => ['### ' + englishHeadings[key], '']),
    ]
    if (lesson)
      lines.splice(
        lines.indexOf('## Next learning'),
        0,
        learningMarkdown(lesson, learning.en.apis, learning.readCode, 'en'),
      )
    if (unit.id === 'threejs-step-04')
      lines.push(roadmapMarkdown('en', units, entry.docPath))
    outputs.set(entry.docPath.slice(1), lines.join('\n'))
  }
}
outputs.set(
  'src/app/catalog.en.json',
  JSON.stringify(englishCatalog, null, 2) + '\n',
)
const englishExampleIndexPath = '/docs/en/examples-expanded.md'
const englishExampleIndex = [
  '# Expanded learning unit examples',
  '',
  'Check the scope of each example. Browser previews and files run in a separate environment may serve different purposes. A linked example does not mean every task is implemented or that the unit is complete.',
  '',
  link(
    englishExampleIndexPath,
    '/docs/en/examples.md',
    'Original examples and shared execution guide',
  ),
  '',
]
for (const series of englishCatalog.series.filter(
  (item) => item.id !== 'webgl',
)) {
  englishExampleIndex.push(
    '## ' + series.title,
    '',
    '| Learning unit | Execution mode | Source and supported scope |',
    '| --- | --- | --- |',
  )
  for (const unit of englishCatalog.units.filter(
    (item) =>
      item.seriesId === series.id &&
      !baseline.units.some((old) => old.id === item.id),
  )) {
    const source = hasExample(unit.id)
      ? [
          link(
            englishExampleIndexPath,
            exampleSourcePath(unit.id, 'en'),
            'Source code',
          ),
          ...(unit.exampleReadingSource
            ? [
                link(
                  englishExampleIndexPath,
                  '/public' + unit.exampleReadingSource,
                  'English reading-source download',
                ),
              ]
            : []),
        ].join(' · ')
      : 'No built-in example'
    const companion = companions.find((item) => item.unitId === unit.id)
    const companionLink = companion
      ? ' · ' +
        link(
          englishExampleIndexPath,
          '/' + companion.guidancePath,
          'Companion execution and English readings',
        )
      : ''
    englishExampleIndex.push(
      `| ${link(englishExampleIndexPath, unit.docPath, unit.day + '. ' + unit.title)} | ${englishExampleLabel(unit.id)} | ${source}${companionLink} — ${table(unit.exampleNote ?? 'Document-based practice')} |`,
    )
  }
  englishExampleIndex.push('')
}
outputs.set(englishExampleIndexPath.slice(1), englishExampleIndex.join('\n'))
const check = process.argv.includes('--check')
for (const [file, source] of outputs) {
  const text = await formatGeneratedText(file, source)
  const target = path.join(root, file)
  const current = fs.existsSync(target)
    ? fs.readFileSync(target, 'utf8').replaceAll('\r\n', '\n')
    : null
  if (check) {
    if (current !== text) throw Error('Generated content is stale: ' + file)
  } else if (current !== text) {
    fs.mkdirSync(path.dirname(target), { recursive: true })
    fs.writeFileSync(target, text)
  }
}
console.log(
  `${check ? 'Verified' : 'Generated'} ${outputs.size} files; 23 series, 644 Korean units, ${englishCatalog.units.length} English units, 94 retained example IDs.`,
)
