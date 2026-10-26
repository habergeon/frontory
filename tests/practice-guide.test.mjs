import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { practiceGuide } from '../src/app/guideContent.ts'

test('English task extraction accepts generated and manual headings with section boundaries', () => {
  for (const heading of ['Practice tasks', 'Exercises']) {
    const text =
      '## ' +
      heading +
      '\n\n1. Change one variable.\n2. Record the result.\n\n## Variables to observe\n\nDPR\n\n## Completion criteria\n\n- [ ] Compared results.\n\n## Next learning\n\n1. Keep this out of the tasks.'
    assert.deepEqual(practiceGuide(text, 'en'), {
      steps: '1. Change one variable.\n2. Record the result.',
      variables: 'DPR',
      criteria: '- Compared results.',
    })
    assert.equal(practiceGuide(text).steps, '')
  }
})

test('every lesson exposes tasks, observation variables and completion criteria from its document', () => {
  const catalog = JSON.parse(
    readFileSync(new URL('../src/app/catalog.json', import.meta.url), 'utf8'),
  )
  for (const unit of catalog.units) {
    const text = readFileSync(
      new URL('..' + unit.docPath, import.meta.url),
      'utf8',
    )
    const guide = practiceGuide(text)
    assert.ok(guide.steps.length > 30, unit.id + ': tasks')
    assert.ok(guide.variables.length > 5, unit.id + ': observation')
    assert.ok(guide.criteria.length > 10, unit.id + ': criteria')
    assert.ok(!guide.criteria.includes('## '), unit.id + ': section boundary')
  }
})

test('all published English lessons use the shared English section headings', () => {
  const catalog = JSON.parse(
    readFileSync(
      new URL('../src/app/catalog.en.json', import.meta.url),
      'utf8',
    ),
  )
  const manifest = JSON.parse(
    readFileSync(
      new URL('../content/locales/en/manifest.json', import.meta.url),
      'utf8',
    ),
  )
  assert.deepEqual(
    catalog.units.map((unit) => unit.id).sort(),
    [...manifest.publishedUnitIds].sort(),
  )
  for (const unit of catalog.units) {
    const text = readFileSync(
      new URL('..' + unit.docPath, import.meta.url),
      'utf8',
    )
    const guide = practiceGuide(text, 'en')
    for (const key of ['steps', 'variables', 'criteria']) {
      assert.ok(guide[key].length > 5, unit.id + ': ' + key)
      assert.ok(
        !guide[key].includes('## '),
        unit.id + ': ' + key + ' section boundary',
      )
    }
    assert.equal(
      practiceGuide(text).steps,
      '',
      'English never parsed as Korean',
    )
  }
})
