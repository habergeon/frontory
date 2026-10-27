import assert from 'node:assert/strict'
import test from 'node:test'
import { transformSync } from 'esbuild'
import { readLearningContent } from '../scripts/learning-content.mjs'
const owned = [5, 6, 7, 8, 9].map(
  (n) => 'threejs-step-' + String(n).padStart(2, '0'),
)
test('05–09 contain runnable localized HTML lessons with distinct learning corrections', () => {
  const data = readLearningContent()
  for (const id of owned) {
    const lesson = data.ko.lessons.find((l) => l.unitId === id)
    assert.ok(lesson, id + ' missing HTML learning lesson')
    assert.ok(lesson.steps.length >= 3)
    for (const locale of ['ko', 'en'])
      for (const step of lesson.steps) {
        const starter = data.readCode(step.starterPath, locale)
        const solution = data.readCode(step.solutionPath, locale)
        assert.notEqual(starter, solution)
        for (const source of [starter, solution]) {
          assert.match(source, new RegExp('lang="' + locale + '"'))
          assert.match(source, /from 'three'/)
          assert.match(source, /ResizeObserver/)
          assert.match(source, /dispose\(/)
          transformSync(
            source.split('<script type="module">')[1].split('</script>')[0],
            { loader: 'js' },
          )
        }
      }
  }
})

test('roughness HTML inputs accept the documented 0.15 task value', () => {
  const data = readLearningContent()
  const lesson = data.ko.lessons.find((l) => l.unitId === 'threejs-step-09')
  const step = lesson.steps.find((s) => s.id.endsWith('roughness'))
  for (const locale of ['ko', 'en'])
    for (const file of [
      'src/labs/threejs-step-09/example.html',
      step.starterPath,
      step.solutionPath,
    ]) {
      const input = data
        .readCode(file, locale)
        .match(/<input\s+id="value"[\s\S]*?\/>/)[0]
      const attr = (name) => input.match(new RegExp(name + '="([^"]+)"'))[1]
      const min = Number(attr('min')),
        max = Number(attr('max')),
        target = 0.15
      assert.ok(target >= min && target <= max)
      if (attr('step') !== 'any') {
        const offset = (target - min) / Number(attr('step'))
        assert.ok(
          Math.abs(offset - Math.round(offset)) < 1e-9,
          locale + ' ' + file + ' rejects 0.15',
        )
      }
    }
})
