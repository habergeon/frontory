import { test } from 'node:test'
import assert from 'node:assert/strict'
import { localeFromPath, localizePath, practicePath } from '../src/i18n/locale.ts'
import { messages, message, headings } from '../src/i18n/messages.ts'

test('URL prefixes distinguish supported app and public locales without accepting other routes', () => {
  for (const path of ['/', '/learn/', '/learn/react/react-step-03/', '/about', '/about/', '/privacy/']) assert.equal(localeFromPath(path), 'ko', path)
  for (const path of ['/en', '/en/', '/en/learn/react/react-step-03/', '/en/about/']) assert.equal(localeFromPath(path), 'en', path)
  for (const path of ['/fr/', '/enough/', '/learning/', '/aboutness/', '/unknown/', 'learn/react/']) assert.equal(localeFromPath(path), null, path)
})

test('localized links preserve Korean paths, queries, fragments and stable practice IDs', () => {
  for (const path of ['/', '/learn/react/', '/about/', '/privacy/?from=home#storage']) {
    assert.equal(localizePath('ko', path), path)
    assert.equal(localizePath('en', path), '/en' + path)
  }
  assert.equal(practicePath('ko', 'react-step-03'), '/#react-step-03')
  assert.equal(practicePath('en', 'react-step-03'), '/en/#react-step-03')
})

const placeholders = text => [...text.matchAll(/\{(\w+)\}/g)].map(match => match[1]).sort()
const forms = template => typeof template === 'string' ? [template] : [template.one, template.other]

test('every dictionary key and plural branch has equivalent placeholders and renders without leftovers', () => {
  assert.deepEqual(Object.keys(messages.en).sort(), Object.keys(messages.ko).sort())
  for (const [key, template] of Object.entries(messages.ko)) {
    const names = placeholders(forms(template)[0])
    for (const locale of ['ko', 'en']) {
      for (const text of forms(messages[locale][key])) assert.deepEqual(placeholders(text), names, locale + ':' + key)
      const params = Object.fromEntries(names.map(name => [name, name === 'count' || name.endsWith('Count') || ['total', 'completed', 'index', 'percent', 'day'].includes(name) ? 2 : '$& <React>']))
      assert.ok(!/\{\w+\}/.test(message(locale, key, params)), locale + ':' + key)
    }
  }
  assert.equal(message('en', 'savedAt', { time: '$& <React>' }), 'Saved in this browser · $& <React>')
  assert.equal(message('ko', 'home', {}), '홈으로')
})

test('count sentences handle zero, one and multiple units or errors', () => {
  for (const [count, units, errors] of [[0, '0 units', '0 errors · execution paused'], [1, '1 unit', '1 error · execution paused'], [2, '2 units', '2 errors · execution paused']]) {
    assert.equal(message('en', 'unitCount', { count }), units)
    assert.equal(message('en', 'editorErrorCount', { count }), errors)
    assert.equal(message('ko', 'unitCount', { count }), count + '개 단위')
  }
  assert.equal(message('en', 'catalogCount', { seriesCount: 1, unitCount: 2 }), '1 series · 2 learning units')
  assert.equal(message('ko', 'catalogCount', { seriesCount: 1, unitCount: 2 }), '1개 시리즈 · 2개 학습 단위')
})

test('guide extraction and blank notes share locale-specific heading contracts', () => {
  assert.deepEqual(headings.ko, {
    tasks: '실습 과제', variables: '관찰할 변수', criteria: '완료 조건',
    notes: '실험 기록', goal: '목표', concepts: '핵심 개념', prediction: '바꾼 변수와 예상',
    result: '실제 결과', learning: '배운 점', questions: '남은 질문',
  })
  assert.deepEqual(Object.keys(headings.en).sort(), Object.keys(headings.ko).sort())
  assert.equal(headings.en.tasks, 'Practice tasks')
  assert.equal(headings.en.notes, 'Experiment notes')
})
