import assert from 'node:assert/strict'
import fs from 'node:fs'
import {
  editorCode,
  ready,
  loadSource,
  instrument,
  snapshot,
  visible,
  reading,
  preview,
} from './threejs-remaining-helper.js'
const lessons = JSON.parse(
  fs.readFileSync('content/learning/threejs.json', 'utf8'),
).lessons
const expressions = {
  6: `({normalCount:geometry.getAttribute('normal')?.count??0,nz:geometry.getAttribute('normal')?.getZ(0)??null,flat:material.flatShading??null,index:geometry.index?.count??0})`,
  7: `({sameGeometry:a.geometry===b.geometry,sameMaterial:a.material===b.material,heights:[a,b].map(m=>m.geometry.boundingBox.max.y-m.geometry.boundingBox.min.y),colors:[a.material.color.getHexString(),b.material.color.getHexString()],centers:[a.position.x,b.position.x]})`,
  8: `({kind:light.type,intensity:light.intensity,position:light.position.toArray(),target:light.target?.position.toArray()??null,decay:light.decay??null,distance:light.distance??null})`,
  9: `({left:[reference.roughness,reference.metalness,reference.envMapIntensity],right:[material.roughness,material.metalness,material.envMapIntensity],sharedMap:reference.envMap===material.envMap&&material.envMap===environmentTarget.texture,environment:scene.environment===environmentTarget.texture,targetSize:[environmentTarget.width,environmentTarget.height]})`,
  5: `({count:geometry.getAttribute('position').count,index:geometry.index?.count??0,y:geometry.getAttribute('position').getY(2),version:geometry.getAttribute('position').version})`,
}
export async function runGroup(page, base, unitId) {
  const ids = [5, 6, 7, 8, 9].map(
    (n) => 'threejs-step-' + String(n).padStart(2, '0'),
  )
  assert.ok(
    !unitId || ids.includes(unitId),
    'Unknown unit for 05-09: ' + unitId,
  )
  const checks = [],
    starters = new Map()
  for (const id of ids.filter((id) => !unitId || unitId === id))
    for (const locale of ['ko', 'en']) {
      await page.setViewportSize({ width: 390, height: 900 })
      await page.goto(
        base + '/tests/browser/threejs-learning.html?learning#' + id,
      )
      await ready(page)
      const languageButton = page.getByRole('button', {
        name: locale === 'en' ? 'English' : '한국어',
        exact: true,
      })
      if (await languageButton.count()) await languageButton.click()
      await page.evaluate(
        (id) => localStorage.removeItem('web-gl-study:unit:v1:' + id),
        id,
      )
      await page.reload()
      await ready(page)
      assert.match(await editorCode(page), new RegExp('lang="' + locale + '"'))
      for (const step of lessons.find((l) => l.unitId === id).steps)
        for (const kind of ['starter', 'solution']) {
          console.log(id, locale, step.id, kind)
          const source = await loadSource(page, step.id, kind === 'solution')
          assert.match(source, new RegExp('lang="' + locale + '"'))
          await page.waitForFunction(
            (title) =>
              document
                .querySelector('#panel-result iframe')
                ?.srcdoc.includes(title),
            source.match(/<title>(.*?)<\/title>/)[1],
          )
          await page
            .frameLocator('#panel-result iframe')
            .locator('canvas')
            .waitFor({ state: 'attached' })
          assert.equal(
            await page
              .frameLocator('#panel-result iframe')
              .locator('canvas')
              .evaluate((c) => c.clientWidth),
            0,
          )
          let frame = await instrument(
            page,
            source,
            expressions[Number(id.slice(-2))],
          )
          const mobile = await snapshot(frame)
          visible(mobile)
          await page.setViewportSize({ width: 1440, height: 900 })
          await frame.waitForFunction(
            () =>
              document.querySelector('canvas').width ===
              document.querySelector('#stage').clientWidth,
          )
          const actual = await snapshot(frame)
          visible(actual)
          if (step.id.endsWith('attributes')) {
            assert.equal(actual.actual.count, 3)
            assert.ok(
              Math.abs(actual.actual.y - (kind === 'starter' ? 0.2 : 1)) < 1e-6,
            )
            assert.ok(actual.pixels > 100)
          }
          if (step.id.endsWith('index')) {
            assert.equal(actual.actual.count, kind === 'starter' ? 6 : 4)
            assert.equal(actual.actual.index, kind === 'starter' ? 0 : 6)
            assert.ok(actual.pixels > 100)
          }
          if (step.id.endsWith('index')) {
            const original = await frame.locator('#indices').inputValue()
            await frame.locator('#indices').fill('0,1,99')
            await frame.locator('#applyIndices').click()
            assert.ok(await frame.locator('#error').textContent())
            assert.deepEqual((await snapshot(frame)).actual, actual.actual)
            await frame.locator('#indices').fill(original)
            await frame.locator('#applyIndices').click()
            assert.equal(await frame.locator('#error').textContent(), '')
            assert.equal((await snapshot(frame)).actual.index, 6)
          }
          if (step.id.endsWith('update')) {
            await frame.locator('#vertex').fill('4')
            await frame.locator('#apply').click()
            assert.ok(await frame.locator('#error').textContent())
            assert.equal((await snapshot(frame)).actual.y, 1)
            await frame.locator('#vertex').fill('2')
            await frame.locator('#apply').click()
            const after = await snapshot(frame)
            assert.ok(Math.abs(after.actual.y - 0.2) < 1e-6)
            assert.equal(after.actual.version, kind === 'starter' ? 0 : 1)
            if (kind === 'starter') assert.equal(after.pixels, actual.pixels)
            else assert.ok(after.pixels < actual.pixels)
            assert.equal(await frame.locator('#error').textContent(), '')
            checks.push({
              unit: id,
              step: step.id,
              locale,
              source: kind,
              input: after,
            })
          }
          const key = step.id + locale
          if (kind === 'starter') starters.set(key, actual)
          else if (!step.id.endsWith('update')) {
            const initial = starters.get(key)
            if (!step.id.endsWith('index'))
              assert.notEqual(
                actual.sum,
                initial.sum,
                'actual rendered pixels must change: ' + step.id,
              )
          }
          if (kind === 'solution' && id.endsWith('09')) {
            const baseline = starters.get(key)
            assert.equal(
              actual.halfHash[0],
              baseline.halfHash[0],
              'fixed left reference pixels',
            )
            assert.notEqual(
              actual.halfHash[1],
              baseline.halfHash[1],
              'right material pixels change',
            )
          }
          if (kind === 'solution' && step.id.endsWith('directional'))
            assert.ok(
              actual.brightCenterX < starters.get(key).brightCenterX,
              'target moves the bright side left',
            )
          const n = Number(id.slice(-2)),
            solution = kind === 'solution'
          if (n === 6) {
            if (step.id.endsWith('winding')) {
              assert.equal(actual.actual.nz, solution ? 1 : -1)
              assert.equal(actual.pixels > 0, solution)
            }
            if (step.id.endsWith('normals')) {
              assert.equal(actual.actual.normalCount, solution ? 4 : 0)
              if (solution)
                assert.ok(Math.abs(actual.actual.nz - 0.9622504486) < 1e-6)
            }
            if (step.id.endsWith('smooth')) {
              assert.equal(actual.actual.flat, !solution)
              assert.ok(actual.actual.normalCount > 3)
            }
          }
          if (n === 7) {
            const a = actual.actual
            assert.deepEqual(a.centers, [-1, 1])
            if (step.id.endsWith('shared')) {
              assert.equal(a.sameGeometry, true)
              assert.deepEqual(a.heights, solution ? [1.5, 1.5] : [1, 1])
            }
            if (step.id.endsWith('clone')) {
              assert.equal(a.sameGeometry, !solution)
              assert.equal(a.sameMaterial, !solution)
              assert.ok(Math.abs(a.heights[0] - (solution ? 1 : 1.6)) < 1e-6)
            }
            if (step.id.endsWith('independent')) {
              assert.equal(a.sameGeometry, true)
              assert.equal(a.sameMaterial, !solution)
            }
            if (!step.id.endsWith('shared'))
              assert.deepEqual(
                a.colors,
                solution ? ['2563eb', 'f97316'] : ['f97316', 'f97316'],
              )
          }
          if (n === 8) {
            const a = actual.actual
            if (step.id.endsWith('ambient'))
              assert.equal(a.intensity, solution ? 1 : 0)
            if (step.id.endsWith('directional')) {
              assert.deepEqual(a.position, [2, 2, 3])
              assert.deepEqual(a.target, [solution ? 4 : 0, 0, 0])
            }
            if (step.id.endsWith('point')) {
              assert.equal(a.position[2], solution ? 2 : 4)
              assert.equal(a.intensity, 20)
              assert.equal(a.decay, 2)
              assert.equal(a.distance, 0)
            }
          }
          if (n === 9) {
            const a = actual.actual
            assert.deepEqual(a.left, [0.8, 0, 1])
            assert.equal(a.environment, true)
            assert.equal(a.sharedMap, true)
            assert.ok(a.targetSize[0] > 0)
            if (step.id.endsWith('roughness'))
              assert.deepEqual(a.right, [solution ? 0.15 : 0.8, 0, 1])
            if (step.id.endsWith('metalness'))
              assert.deepEqual(a.right, [0.8, solution ? 1 : 0, 1])
            if (step.id.endsWith('environment'))
              assert.deepEqual(a.right, [0.8, 0, solution ? 1 : 0])
          }
          checks.push({
            unit: id,
            step: step.id,
            locale,
            source: kind,
            mobile,
            desktop: actual,
          })
          if (
            kind === 'starter' &&
            step === lessons.find((l) => l.unitId === id).steps[0]
          ) {
            const edits = {
              5: ['const topY = 0.2', 'const topY = 1'],
              6: [
                'geometry.setIndex([0, 2, 1])',
                'geometry.setIndex([0, 1, 2])',
              ],
              7: ['const stretch = 1;', 'const stretch = 1.5;'],
              8: ['const intensity = 0;', 'const intensity = 1;'],
              9: ['const roughness = 0.8;', 'const roughness = 0.15;'],
            }
            const [from, to] = edits[n]
            assert.ok(source.includes(from), 'editable condition exists')
            frame = await instrument(
              page,
              source.replace(from, to),
              expressions[n],
            )
            const edit = await snapshot(frame)
            assert.notEqual(edit.sum, actual.sum)
            checks.push({
              unit: id,
              step: step.id,
              locale,
              source: 'editor-edit',
              edit,
            })
          }
          if (n === 8 || n === 9) {
            const value =
              n === 8
                ? step.id.endsWith('ambient')
                  ? 0.5
                  : step.id.endsWith('directional')
                    ? -3
                    : 6
                : step.id.endsWith('roughness')
                  ? 0.4
                  : step.id.endsWith('metalness')
                    ? 0.7
                    : 2.5
            const before = await snapshot(frame)
            await frame.locator('#value').fill(String(value))
            await frame.locator('#apply').click()
            const changed = await snapshot(frame)
            assert.notDeepEqual(changed.actual, before.actual)
            assert.notEqual(changed.sum, before.sum)
            checks.push({
              unit: id,
              step: step.id,
              locale,
              source: kind,
              input: changed,
            })
          }
          if (
            kind === 'solution' &&
            step === lessons.find((l) => l.unitId === id).steps.at(-1)
          ) {
            for (const width of [1440, 390]) {
              await page.setViewportSize({ width, height: 900 })
              await preview(page)
              assert.ok(
                await page.evaluate(
                  () => document.documentElement.scrollWidth <= innerWidth,
                ),
              )
              assert.ok(
                await frame.evaluate(
                  () => document.documentElement.scrollWidth <= innerWidth,
                ),
              )
              await page.screenshot({
                path:
                  process.env.THREEJS_EVIDENCE.replace(/\.json$/, '') +
                  '-' +
                  id +
                  '-' +
                  locale +
                  '-' +
                  width +
                  '.png',
              })
            }
          }
          const cleanup = await frame.evaluate(() =>
            globalThis.__remaining.cleanupSnapshot(),
          )
          assert.equal(cleanup.disposed, cleanup.expected)
          assert.equal(cleanup.children, 0)
          checks.push({
            unit: id,
            step: step.id,
            locale,
            source: kind,
            cleanup,
          })
          await page.setViewportSize({ width: 390, height: 900 })
          await reading(page)
        }
      await page.evaluate(
        (id) => localStorage.removeItem('web-gl-study:unit:v1:' + id),
        id,
      )
    }
  const inventory = checks
    .filter((c) => c.mobile && c.desktop)
    .map((c) => [c.unit, c.step, c.locale, c.source].join('/'))
  const expected = ids
    .filter((id) => !unitId || id === unitId)
    .flatMap((id) =>
      lessons
        .find((l) => l.unitId === id)
        .steps.flatMap((s) =>
          ['ko', 'en'].flatMap((locale) =>
            ['starter', 'solution'].map((source) =>
              [id, s.id, locale, source].join('/'),
            ),
          ),
        ),
    )
  assert.deepEqual(inventory.sort(), expected.sort())
  assert.equal(new Set(inventory).size, expected.length)
  assert.equal(
    checks.filter((c) => c.source === 'editor-edit').length,
    ids.filter((id) => !unitId || id === unitId).length * 2,
  )
  checks.push({ inventory, expectedCount: expected.length })
  for (const id of [
    'threejs-01',
    'threejs-step-02',
    'threejs-step-03',
    'threejs-step-04',
    'threejs-step-10',
  ]) {
    await page.goto(
      base + '/tests/browser/threejs-learning.html?learning#' + id,
    )
    await ready(page)
    assert.equal(
      await page.locator('#tab-reading').count(),
      id === 'threejs-step-10' ? 0 : 1,
    )
    checks.push({ branch: id, contained: id !== 'threejs-step-10' })
  }
  return checks
}
