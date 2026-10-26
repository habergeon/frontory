import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readLearningContent } from '../scripts/learning-content.mjs'
import {
  validateLearningContent,
  learningMarkdown,
} from '../src/app/learningSchema.ts'

const fixture = () => readLearningContent()
test('integrated HTML lesson documents keep every required task inside the site', async () => {
  const fs = await import('node:fs')
  for (const [locale, expected, excluded] of [
    [
      'ko',
      /모든 필수 과제를 사이트 안에서 단계별로 수행/,
      /별도 프로젝트에서 수행|별도 실습 파일을 만들/,
    ],
    [
      'en',
      /Complete every required task inside the site, step by step/,
      /scope in a separate project|Create separate practice files/,
    ],
  ]) {
    const prefix = locale === 'ko' ? 'docs/labs' : 'docs/en/labs'
    const completed = fs.readFileSync(
      prefix + '/graphics/threejs/01-foundations/README.md',
      'utf8',
    )
    assert.match(completed, expected)
    assert.doesNotMatch(completed, excluded)
    const future = fs.readFileSync(
      prefix + '/graphics/threejs/units/02/README.md',
      'utf8',
    )
    assert.match(
      future,
      locale === 'ko'
        ? /별도 프로젝트에서 수행/
        : /scope in a separate project/,
    )
  }
})
test('optional lessons and APIs keep existing guide fallback; same source generates Markdown', () => {
  const { ko, en, readCode } = fixture()
  assert.equal(
    ko.lessons.find((x) => x.unitId === 'html-step-02') ?? null,
    null,
  )
  assert.equal(ko.apis.find((x) => x.id === 'missing-api') ?? null, null)
  assert.equal(ko.lessons[0].unitId, 'threejs-01')
  for (const data of [ko, en]) {
    const lesson = data.lessons[0]
    const text = learningMarkdown(
      lesson,
      data.apis,
      readCode,
      data === en ? 'en' : 'ko',
    )
    assert.ok(text.includes(lesson.steps[0].solutionExplanation))
    assert.ok(
      text.includes(
        readCode(lesson.steps[0].starterPath, data === en ? 'en' : 'ko').trim(),
      ),
    )
  }
})
test('shared validator rejects broken IDs, paths and required explanation', () => {
  for (const [change, expected] of [
    [(d) => d.lessons[0].steps.push(d.lessons[0].steps[0]), /Duplicate step/],
    [(d) => d.apis.push(d.apis[0]), /Duplicate API/],
    [(d) => d.lessons[0].apiIds.push('unknown'), /Unknown API/],
    [
      (d) => d.lessons[0].prerequisiteIds.push('unknown'),
      /Unknown prerequisite/,
    ],
    [
      (d) => (d.lessons[0].steps[0].starterPath = '../unknown.html'),
      /Unknown code/,
    ],
    [
      (d) => delete d.lessons[0].steps[0].solutionExplanation,
      /solutionExplanation/,
    ],
  ]) {
    const { ko, unitIds, readCode } = fixture()
    change(ko)
    assert.throws(
      () => validateLearningContent(ko, unitIds, readCode),
      expected,
    )
  }
})
test('English overlay rejects missing prose, structural drift and stale source hashes', () => {
  for (const [change, expected] of [
    [
      (d) => delete d.lessons[0].steps[0].solutionExplanation,
      /solutionExplanation/,
    ],
    [(d) => d.lessons[0].steps[0].hints.pop(), /Translation parity/],
    [
      (d) => (d.lessons[0].steps[0].solutionPath = 'different'),
      /Translation parity|Unknown code/,
    ],
    [(d) => (d.sourceHash = 'stale'), /Stale learning/],
  ]) {
    const { ko, en, unitIds, readCode, validateTranslation } = fixture()
    change(en)
    assert.throws(
      () => validateTranslation(ko, en, unitIds, readCode),
      expected,
    )
  }
})

test('browser lookup adapter exposes optional data without a Node filesystem dependency', async () => {
  const fs = await import('node:fs')
  const { createRequire } = await import('node:module')
  const { transformSync } = await import('esbuild')
  const { ko } = readLearningContent()
  const sources = Object.fromEntries(
    ko.lessons
      .flatMap((lesson) =>
        lesson.steps.flatMap((step) => [
          step.starterPath,
          step.solutionPath,
          step.starterPath.replace('.html', '.en.html'),
          step.solutionPath.replace('.html', '.en.html'),
        ]),
      )
      .map((file) => ['../' + file.slice(4), fs.readFileSync(file, 'utf8')]),
  )
  const source = fs
    .readFileSync('src/app/learningContent.ts', 'utf8')
    .replace(/import\.meta\.glob<string>\([\s\S]*?\)/, JSON.stringify(sources))
  assert.doesNotMatch(source, /node:fs|node:crypto|scripts\//)
  const compiled = transformSync(source, { loader: 'ts', format: 'cjs' }).code
  const require = createRequire(
    new URL('../src/app/learningContent.ts', import.meta.url),
  )
  const module = { exports: {} }
  new Function('require', 'exports', 'module', compiled)(
    (id) => require(id === './learningSchema' ? './learningSchema.ts' : id),
    module.exports,
    module,
  )
  assert.match(
    module.exports.readLearningCode(ko.lessons[0].steps[0].starterPath, 'ko'),
    /lang="ko"/,
  )
  assert.match(
    module.exports.readLearningCode(ko.lessons[0].steps[0].starterPath, 'en'),
    /lang="en"/,
  )
  for (const locale of ['ko', 'en']) {
    assert.equal(module.exports.getLessonLearning('html-step-02', locale), null)
    assert.equal(module.exports.getApiReference('missing-api', locale), null)
    assert.equal(
      module.exports.getLessonLearning('threejs-01', locale).unitId,
      'threejs-01',
    )
    assert.equal(
      module.exports.getApiReference('object-add', locale).symbol,
      'object.add',
    )
  }
})

test('learning UI copy has the same complete Korean and English key set', async () => {
  const { learningMessages } = await import('../src/i18n/messages.ts')
  assert.deepEqual(
    Object.keys(learningMessages.ko).sort(),
    Object.keys(learningMessages.en).sort(),
  )
  for (const strings of Object.values(learningMessages))
    for (const value of Object.values(strings)) assert.ok(value.trim())
})

test('localized HTML selects distinct bytes and rejects missing/stale code freshness records', async () => {
  const fs = await import('node:fs')
  const path = await import('node:path')
  const { tmpdir } = await import('node:os')
  const root = fs.mkdtempSync(path.join(tmpdir(), 'frontory-learning-'))
  try {
    const original = readLearningContent()
    const paths = [
      'src/labs/threejs-01/example.html',
      ...original.ko.lessons.flatMap((l) =>
        l.steps.flatMap((s) => [s.starterPath, s.solutionPath]),
      ),
    ]
    for (const file of [
      'src/app/catalog.json',
      'content/curricula/threejs.json',
      'content/learning/threejs.json',
      'content/locales/en/learning/threejs.json',
      ...paths,
      ...paths.map((p) => p.replace('.html', '.en.html')),
    ]) {
      fs.mkdirSync(path.dirname(path.join(root, file)), { recursive: true })
      fs.copyFileSync(file, path.join(root, file))
    }
    const enPath = path.join(root, 'content/locales/en/learning/threejs.json')
    const save = (data) => fs.writeFileSync(enPath, JSON.stringify(data))
    const logical = paths[0]
    const positive = readLearningContent(root)
    assert.match(positive.readCode(logical, 'ko'), /lang="ko"/)
    assert.match(positive.readCode(logical, 'en'), /lang="en"/)
    let en = structuredClone(original.en)
    delete en.codeSourceHashes[logical]
    save(en)
    assert.throws(
      () => readLearningContent(root),
      /Missing English learning code hash/,
    )
    en = structuredClone(original.en)
    en.codeSourceHashes[logical] = 'stale'
    save(en)
    assert.throws(() => readLearningContent(root), /Stale learning code/)
    save(original.en)
    en = structuredClone(original.en)
    en.codeSourceHashes['src/labs/unknown/example.html'] = 'unknown'
    save(en)
    assert.throws(
      () => readLearningContent(root),
      /Unknown English learning code hash path/,
    )
    save(original.en)
    fs.unlinkSync(path.join(root, logical.replace('.html', '.en.html')))
    assert.throws(
      () => readLearningContent(root),
      /Missing English learning code file/,
    )
    en = structuredClone(original.en)
    delete en.codeSourceHashes[logical]
    save(en)
    assert.throws(
      () => readLearningContent(root),
      /Missing English learning code hash/,
    )
    fs.copyFileSync(
      logical.replace('.html', '.en.html'),
      path.join(root, logical.replace('.html', '.en.html')),
    )
    en = structuredClone(original.en)
    const shared = paths[1]
    fs.unlinkSync(path.join(root, shared.replace('.html', '.en.html')))
    delete en.codeSourceHashes[shared]
    save(en)
    assert.match(
      readLearningContent(root).readCode(shared, 'en'),
      /lang="ko"/,
      'legacy shared-code fallback still requires both file and hash to be absent',
    )
  } finally {
    assert.ok(
      path
        .resolve(root)
        .startsWith(path.resolve(tmpdir()) + path.sep + 'frontory-learning-'),
    )
    fs.rmSync(root, { recursive: true, force: true })
  }
})
