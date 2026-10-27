import assert from 'node:assert/strict'
import test from 'node:test'
import { transformSync } from 'esbuild'
import { readLearningContent } from '../scripts/learning-content.mjs'
const owned = [5, 6, 7, 8, 9].map(
  (n) => 'threejs-step-' + String(n).padStart(2, '0'),
)
test('23–28 provide lifecycle, race, accessible inspector and measured report experiments', () => {
  const data = readLearningContent()
  for (const n of [23, 24, 25, 26, 27, 28]) {
    const id = n === 28 ? 'threejs-03' : 'threejs-step-' + n
    const lesson = data.ko.lessons.find((l) => l.unitId === id)
    assert.ok(lesson, id + ' missing lifecycle experiment')
    assert.equal(lesson.steps.length, n === 27 ? 5 : n === 28 ? 4 : 3)
    for (const locale of ['ko', 'en'])
      for (const step of lesson.steps) {
        const a = data.readCode(step.starterPath, locale),
          b = data.readCode(step.solutionPath, locale)
        assert.notEqual(a, b)
        for (const source of [a, b]) {
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
test('19–22 expose independent bilingual instancing and multiple-view experiments', () => {
  const data = readLearningContent()
  for (const n of [19, 20, 21, 22]) {
    const lesson = data.ko.lessons.find((l) => l.unitId === 'threejs-step-' + n)
    assert.ok(lesson, n + ' missing HTML lesson')
    assert.ok(lesson.steps.length >= 3)
    for (const locale of ['ko', 'en'])
      for (const step of lesson.steps) {
        const starter = data.readCode(step.starterPath, locale)
        const solution = data.readCode(step.solutionPath, locale)
        assert.notEqual(starter, solution)
        for (const source of [starter, solution])
          transformSync(
            source.split('<script type="module">')[1].split('</script>')[0],
            { loader: 'js' },
          )
      }
  }
})
test('10–13 expose independent localized HTML experiments', () => {
  const data = readLearningContent()
  for (const n of [10, 11, 12, 13]) {
    const id = 'threejs-step-' + n
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
test('image and shadow numeric inputs accept every assigned exercise target', () => {
  const data = readLearningContent()
  for (const [n, name, targets] of [
    [10, 'uv', { value: 0.5 }],
    [10, 'repeat', { repeatX: 4, repeatY: 2 }],
    [12, 'shadow-frustum', { value: 4 }],
    [12, 'map-size', { value: 512 }],
  ]) {
    const lesson = data.ko.lessons.find((l) => l.unitId === 'threejs-step-' + n)
    const step = lesson.steps.find((s) => s.id.endsWith('-' + name))
    for (const locale of ['ko', 'en'])
      for (const path of [step.starterPath, step.solutionPath])
        for (const [id, target] of Object.entries(targets)) {
          const source = data.readCode(path, locale),
            input = source.match(
              new RegExp('<input\\s+id="' + id + '"[\\s\\S]*?/>'),
            )[0]
          const attr = (name) =>
            Number(input.match(new RegExp(name + '="([^"]+)"'))[1])
          assert.ok(target >= attr('min') && target <= attr('max'))
          const interval = (target - attr('min')) / attr('step')
          assert.ok(
            Math.abs(interval - Math.round(interval)) < 1e-9,
            locale + ' ' + path + ' rejects ' + target,
          )
        }
  }
})
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
test('14–18 provide independent bilingual model and motion lessons', () => {
  const data = readLearningContent()
  for (const id of [
    'threejs-02',
    ...[15, 16, 17, 18].map((n) => 'threejs-step-' + n),
  ]) {
    const lesson = data.ko.lessons.find((l) => l.unitId === id)
    assert.ok(lesson, id + ' missing model lesson')
    assert.ok(lesson.steps.length >= 3)
    for (const locale of ['ko', 'en'])
      for (const step of lesson.steps) {
        const starter = data.readCode(step.starterPath, locale),
          solution = data.readCode(step.solutionPath, locale)
        assert.notEqual(starter, solution)
        for (const source of [starter, solution]) {
          assert.match(source, new RegExp('lang="' + locale + '"'))
          assert.match(source, /ResizeObserver/)
          assert.match(source, /dispose\(/)
          transformSync(
            source.split('<script type="module">')[1].split('</script>')[0],
            { loader: 'js' },
          )
          if (id !== 'threejs-step-18') {
            assert.match(source, /GLTFLoader/)
            assert.match(source, /parseAsync\(/)
            assert.match(source, /arrayBuffer\(/)
            assert.doesNotMatch(source, /tests\/browser/)
          }
        }
      }
  }
})

test('explicit preserved legacy JavaScript sources remain available after all HTML defaults', async () => {
  const fs = await import('node:fs')
  const { createHash } = await import('node:crypto')
  const hashes = {
    'src/labs/threejs-step-23/example.js':
      '7b1540b4d2553fac69f6a22e95b78ef51227d9d1bca7f6ab76c856223dc46fdd',
    'src/labs/threejs-step-24/example.js':
      'b1d2dae37ce6f0390311beaf821df9e3568452d2dc4d0c917ef0144455834948',
    'src/labs/threejs-step-25/example.js':
      'e663ddaed7900a647f5250dcb845e7fccd4e29e6d29505cca5a9a6e05071b732',
    'src/labs/threejs-step-26/example.js':
      '83badd47572f25bc7f8ae4c209f768ca5f4fe88110146a9c7c5fa605bb13b0ee',
    'src/labs/threejs-step-27/example.js':
      '6daba29d0c79076ac9f74ef79b3bd7c514ac171ec3398e7f30bbba7db9815baa',
    'src/labs/threejs-03/example.js':
      '17b910d97117d7d96c2727f5fdbf4369308d685d71ce1761965f6f2476d8f00e',
  }
  for (const [file, expected] of Object.entries(hashes))
    assert.equal(
      createHash('sha256').update(fs.readFileSync(file)).digest('hex'),
      expected,
      file,
    )
})
