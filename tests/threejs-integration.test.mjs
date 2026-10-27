import assert from 'node:assert/strict'
import test from 'node:test'
import fs from 'node:fs'
import { readLearningContent } from '../scripts/learning-content.mjs'
import { roadmapMessages } from '../src/i18n/messages.ts'
const read = (p) => JSON.parse(fs.readFileSync(p, 'utf8'))
test('complete course preserves all 28 HTML defaults, ordered lessons and verified KO/EN parity', () => {
  const data = readLearningContent()
  const units = read('content/curricula/threejs.json').units
  const ids = units.map((u) => u.id)
  assert.equal(ids.length, 28)
  assert.equal(ids[13], 'threejs-02')
  assert.equal(ids[27], 'threejs-03')
  for (const locale of ['ko', 'en']) {
    assert.deepEqual(
      data[locale].lessons.map((l) => l.unitId),
      ids,
    )
    for (const entry of (locale === 'ko' ? data.roadmapKo : data.roadmapEn)
      .entries)
      assert.equal(entry.readiness, 'verified')
    assert.match(
      roadmapMessages[locale].explanation,
      locale === 'ko' ? /^01~28은/ : /^Units 01–28 have completed verification/,
    )
    assert.doesNotMatch(
      roadmapMessages[locale].explanation,
      /검증이 남았|still pending/,
    )
    for (const unit of units) {
      assert.equal(unit.sourceLanguage, 'html')
      const suffix = locale === 'en' ? '.en' : ''
      assert.match(
        fs.readFileSync(`src/labs/${unit.id}/example${suffix}.html`, 'utf8'),
        new RegExp(`lang="${locale}"`),
      )
    }
    for (const api of data[locale].apis)
      assert.equal(api.packageVersion, '0.186.1')
  }
  assert.equal(data.ko.lessons.slice(4).flatMap((l) => l.steps).length * 4, 300)
})
test('output-color observes actual linear material and recovery starter explains its intentional failure', () => {
  for (const locale of ['ko', 'en']) {
    const suffix = locale === 'en' ? '.en' : ''
    const starter = fs.readFileSync(
      `src/labs/threejs-step-10/steps/load-recovery${suffix}.html`,
      'utf8',
    )
    assert.match(
      starter,
      locale === 'ko' ? /의도한 로딩 실패/ : /intentionally/,
    )
    for (const kind of ['steps', 'solutions']) {
      const source = fs.readFileSync(
        `src/labs/threejs-step-11/${kind}/output${suffix}.html`,
        'utf8',
      )
      assert.doesNotMatch(source, /DataTexture|source byte/)
      assert.match(source, /material\.color\.toArray\(\)/)
    }
  }
})
