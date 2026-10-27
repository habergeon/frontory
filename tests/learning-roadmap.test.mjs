import { test } from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'
import { readLearningContent } from '../scripts/learning-content.mjs'
import { sourceHash, assertSourceHash } from '../scripts/locale-content.mjs'
import {
  validateLearningRoadmap,
  validateRoadmapParity,
  validateRoadmapLessons,
} from '../src/app/learningSchema.ts'
import { createDraftStore } from '../src/shared/drafts.ts'
import { roadmapMessages } from '../src/i18n/messages.ts'
const { roadmapKo: ko, roadmapEn: en } = readLearningContent()
const catalog = JSON.parse(fs.readFileSync('src/app/catalog.json'))
const ids = catalog.units
  .filter((unit) => unit.seriesId === 'threejs')
  .map((unit) => unit.id)
const mutated = (change) => {
  const data = structuredClone(ko)
  change(data.entries)
  return data
}

test('roadmap retains all 28 existing IDs in exact order and independent readiness', () => {
  assert.equal(ko.entries.length, 28)
  assert.equal(new Set(ko.entries.map((entry) => entry.unitId)).size, 28)
  assert.deepEqual(
    ko.entries.map((entry) => entry.unitId),
    ids,
  )
  assert.equal(ko.entries[13].unitId, 'threejs-02')
  assert.equal(ko.entries[27].unitId, 'threejs-03')
  assert.ok(
    ko.entries.slice(0, 4).every((entry) => entry.readiness === 'verified'),
  )
  assert.ok(
    ko.entries.slice(13).every((entry) => entry.readiness === 'planned'),
  )
  const before = JSON.stringify(ko)
  const storage = new Map()
  const store = createDraftStore(() => ({
    getItem: (key) => storage.get(key) ?? null,
    setItem: (key, value) => storage.set(key, value),
  }))
  for (const id of ids) {
    const draft = store.load(id, '').draft
    store.save(id, { ...draft, progress: 'completed' })
  }
  assert.equal(JSON.stringify(ko), before)
})
test('validator rejects unknown, duplicate, self and incorrect sequence/status data', () => {
  for (const change of [
    (e) => e.pop(),
    (e) => {
      e[5].unitId = e[4].unitId
    },
    (e) => {
      e[5].unitId = 'unknown'
    },
    (e) => {
      ;[e[4], e[5]] = [e[5], e[4]]
    },
    (e) => {
      e[4].prerequisiteIds = ['unknown']
    },
    (e) => {
      e[4].prerequisiteIds = [e[4].unitId]
    },
    (e) => {
      e[4].readiness = 'unknown'
    },
    (e) => {
      e[0].topics = []
    },
    (e) => {
      e[0].requiredCapabilities = ['']
    },
  ])
    assert.throws(() => validateLearningRoadmap(mutated(change), ids))
  const swapped = mutated((e) => {
    ;[e[13], e[27]] = [e[27], e[13]]
  })
  assert.throws(
    () =>
      validateLearningRoadmap(
        swapped,
        swapped.entries.map((e) => e.unitId),
      ),
    /historical/,
  )
})
test('readiness accepts either status at any position and verified requires a real lesson', () => {
  const data = mutated((e) => {
    e[0].readiness = 'planned'
    e[13].readiness = 'verified'
  })
  validateLearningRoadmap(data, ids)
  const { ko: originalLearning } = readLearningContent()
  const learning = {
    ...originalLearning,
    lessons: originalLearning.lessons.filter((l) => l.unitId !== 'threejs-02'),
  }
  assert.throws(
    () => validateRoadmapLessons(data, learning),
    /Verified roadmap unit has no lesson: threejs-02/,
  )
  const lesson = { ...learning.lessons[0], unitId: 'threejs-02' }
  validateRoadmapLessons(data, {
    ...learning,
    lessons: [...learning.lessons, lesson],
  })
})
test('both locale data and generated documents retain roadmap content and fresh source hash', () => {
  validateLearningRoadmap(en, ids)
  validateRoadmapParity(ko, en)
  assert.equal(en.sourceHash, sourceHash(ko))
  assert.throws(
    () =>
      assertSourceHash(
        mutated((e) => {
          e[4].outcome += ' changed'
        }),
        en.sourceHash,
        'roadmap',
      ),
    /Stale roadmap/,
  )
  assert.throws(
    () =>
      validateRoadmapParity(
        ko,
        mutated((e) => {
          e[4].prerequisiteIds = []
        }),
      ),
    /parity/,
  )
  for (const locale of ['ko', 'en']) {
    const data = locale === 'ko' ? ko : en
    const localized = JSON.parse(
      fs.readFileSync(`src/app/catalog${locale === 'en' ? '.en' : ''}.json`),
    )
    const series = localized.series.find((s) => s.id === 'threejs')
    const unit = localized.units.find((u) => u.id === 'threejs-step-04')
    for (const doc of [series.docPath, unit.docPath]) {
      const text = fs.readFileSync(doc.slice(1), 'utf8')
      const roadmap = text.slice(
        text.indexOf('## ' + roadmapMessages[locale].title),
      )
      assert.ok(roadmap.includes(roadmapMessages[locale].explanation))
      assert.equal((roadmap.match(/ID: `threejs/g) ?? []).length, 28)
      for (const e of data.entries) {
        assert.ok(roadmap.includes('`' + e.unitId + '`'))
        assert.ok(roadmap.includes(e.outcome))
        for (const value of [...e.topics, ...e.requiredCapabilities])
          assert.ok(roadmap.includes(value))
      }
    }
  }
})

test('the approved follow-up topics, outcomes and capability text remain represented', () => {
  const rows = fs
    .readFileSync(
      'docs/superpowers/specs/2026-10-26-threejs-learning-roadmap.md',
      'utf8',
    )
    .split('\n')
    .map((line) =>
      line
        .split('|')
        .slice(1, -1)
        .map((cell) => cell.trim()),
    )
    .filter((cells) => /^\d\d ·/.test(cells[0] ?? ''))
  assert.equal(rows.length, 28)
  for (let index = 4; index < 28; index++) {
    const entry = ko.entries[index]
    assert.ok(rows[index][0].includes('`' + entry.unitId + '`'))
    assert.equal(entry.topics.join(', '), rows[index][1])
    assert.equal(entry.outcome, rows[index][3])
    assert.ok(entry.requiredCapabilities.includes(rows[index][4]))
  }
})
