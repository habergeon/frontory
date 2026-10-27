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
