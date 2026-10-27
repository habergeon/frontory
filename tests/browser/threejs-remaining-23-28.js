import assert from 'node:assert/strict'
import fs from 'node:fs'
import { createHash } from 'node:crypto'
import { makeGlb, glbData } from './gltf-fixtures.mjs'
import {
  ready,
  loadSource,
  instrument,
  snapshot,
  visible,
  preview,
} from './threejs-remaining-helper.js'
const lessons = JSON.parse(
  fs.readFileSync('content/learning/threejs.json', 'utf8'),
).lessons
const hash = (s) => createHash('sha256').update(s).digest('hex')
const expressions = {
  23: '({counts,refs:[...ledger.values()].map(e=>e.refs),children:scene.children.length,parents:[!!a.parent,!!b.parent]})',
  24: '({counts,current,status,generation,completions,books:books.size,selected,camera:camera.position.toArray(),names:meshes.map(o=>o.name),playing,time:mixer?.time??0,x:meshes[0]?.position.x,stats})',
  25: '({counts,selected,status,camera:camera.position.toArray(),target:target.toArray()})',
  26: '({counts,stats})',
  27: '({counts,current,status,generation,completions,books:books.size,selected,camera:camera.position.toArray(),target:targetPoint.toArray(),names:meshes.map(o=>o.name),playing,time:mixer?.time??0,x:meshes[0]?.position.x,stats})',
  28: '({counts,stats,records})',
}
function auditSource(source) {
  return source.replace(
    "import * as THREE from 'three';",
    `import * as THREE from 'three';
globalThis.__disposeAudit={geometry:[],material:[],texture:[],target:[],bitmap:[]};for(const [name,proto]of [['geometry',THREE.BufferGeometry.prototype],['material',THREE.Material.prototype],['texture',THREE.Texture.prototype],['target',THREE.WebGLRenderTarget.prototype]]){const original=proto.dispose;proto.dispose=function(){globalThis.__disposeAudit[name].push(this.uuid??this.texture.uuid);return original.call(this);};}if(globalThis.ImageBitmap){const close=ImageBitmap.prototype.close;ImageBitmap.prototype.close=function(){const all=globalThis.__disposeAudit.bitmap;all.push(this);return close.call(this);};}`,
  )
}
async function settle(frame, n) {
  if (n === 24 || n === 27)
    await frame.waitForFunction(() => {
      try {
        return (
          JSON.parse(document.querySelector('output').textContent).status ===
          'ready'
        )
      } catch {
        return false
      }
    })
}
async function keyboardTo(page, frame, selector) {
  await frame
    .locator(selector)
    .evaluate((el) => el.setAttribute('data-keyboard-target', 'true'))
  let reached = false
  for (let i = 0; i < 65; i++) {
    if (
      await frame.evaluate(
        () =>
          document.activeElement?.getAttribute('data-keyboard-target') ===
          'true',
      )
    ) {
      reached = true
      break
    }
    await page.keyboard.press('Tab')
  }
  assert.ok(reached, 'keyboard reaches ' + selector)
  await frame
    .locator(selector)
    .evaluate((el) => el.removeAttribute('data-keyboard-target'))
}
export async function runGroup(page, base, unitId) {
  const checks = [],
    inventory = [],
    consolePhases = [],
    assetURLs = []
  let phase = 'setup'
  await page.exposeBinding('__task6URL', ({ frame }, event) =>
    assetURLs.push({ ...event, phase, frameURL: frame.url() }),
  )
  await page.addInitScript(() => {
    const create = URL.createObjectURL.bind(URL),
      revoke = URL.revokeObjectURL.bind(URL)
    URL.createObjectURL = (blob) => {
      const url = create(blob)
      void globalThis.__task6URL({
        action: 'create',
        url,
        mime: blob.type,
        time: Date.now(),
      })
      return url
    }
    URL.revokeObjectURL = (url) => {
      void globalThis.__task6URL({ action: 'revoke', url, time: Date.now() })
      return revoke(url)
    }
  })
  const listener = (m) => {
    if (['warning', 'error'].includes(m.type()))
      consolePhases.push({
        phase,
        time: Date.now(),
        type: m.type(),
        message: m.text(),
        location: m.location(),
      })
  }
  page.on('console', listener)
  for (const n of [23, 24, 25, 26, 27, 28]) {
    const id = n === 28 ? 'threejs-03' : 'threejs-step-' + n
    if (unitId && id !== unitId) continue
    const lesson = lessons.find((l) => l.unitId === id)
    assert.ok(lesson, id + ' requires actual HTML lesson')
    for (const locale of ['ko', 'en']) {
      await page.setViewportSize({ width: 390, height: 900 })
      await page.goto(
        base + '/tests/browser/threejs-learning.html?learning#' + id,
      )
      await ready(page)
      const lang = page.getByRole('button', {
        name: locale === 'en' ? 'English' : '한국어',
        exact: true,
      })
      if (await lang.count()) await lang.click()
      await page.evaluate((id) => {
        localStorage.removeItem('web-gl-study:unit:v1:' + id)
        localStorage.removeItem('web-gl-study:all:v1')
      }, id)
      await page.reload()
      await ready(page)
      const hidden = await page.locator('#panel-result').isVisible()
      assert.equal(hidden, false)
      await preview(page)
      const defaultFrame = await (
        await page.locator('#panel-result iframe').elementHandle()
      ).contentFrame()
      await defaultFrame.waitForFunction(
        () => document.querySelector('output')?.textContent,
      )
      await settle(defaultFrame, n)
      const defaultPath = `src/labs/${id}/example${locale === 'en' ? '.en' : ''}.html`
      checks.push({
        default: true,
        id,
        locale,
        path: defaultPath,
        sha256: hash(fs.readFileSync(defaultPath, 'utf8')),
        rawOutput: await defaultFrame.locator('output').textContent(),
        hiddenStartup: true,
      })
      for (const step of lesson.steps)
        for (const kind of ['starter', 'solution']) {
          phase = { id, locale, step: step.id, kind }
          console.log('CASE', JSON.stringify(phase))
          const source = await loadSource(page, step.id, kind === 'solution')
          await ready(page)
          await preview(page)
          const raw = await (
            await page.locator('#panel-result iframe').elementHandle()
          ).contentFrame()
          await raw.waitForFunction(
            () => document.querySelector('output')?.textContent,
          )
          await settle(raw, n)
          const rawOutput = await raw.locator('output').textContent()
          let frame = await instrument(
            page,
            auditSource(source),
            expressions[n],
          )
          await settle(frame, n)
          let a = await snapshot(frame)
          visible(a)
          assert.ok(a.pixels > 100)
          const path = (
            kind === 'starter' ? step.starterPath : step.solutionPath
          ).replace('.html', locale === 'en' ? '.en.html' : '.html')
          const disk = fs.readFileSync(path, 'utf8')
          assert.equal(
            source.replaceAll('\r\n', '\n'),
            disk.replaceAll('\r\n', '\n'),
          )
          const meta = { ...phase, path, sha256: hash(disk) }
          inventory.push(meta)
          checks.push({ ...meta, rawOutput, initial: a })
          if (n === 23) {
            await frame.locator('#remove').click()
            let detached = await snapshot(frame)
            assert.deepEqual(detached.actual.parents, [false, true])
            assert.equal(detached.actual.counts.geometry, 0)
            await frame.locator('#attach').click()
            await frame.locator('#disposal').check()
            await frame.locator('#ledger').check()
            await frame.locator('#release-a').click()
            const one = await snapshot(frame)
            assert.deepEqual(one.actual.refs, [1, 1])
            assert.equal(one.actual.counts.geometry, 0)
            await frame.locator('#release-b').click()
            const both = await snapshot(frame)
            assert.equal(both.actual.counts.geometry, 1)
            assert.equal(both.actual.counts.material, 1)
            for (let i = 0; i < 3; i++) await frame.locator('#cycle').click()
            const cycles = await snapshot(frame)
            assert.equal(cycles.actual.counts.geometry, 4)
            assert.equal(cycles.actual.counts.createdGeometry, 4)
            checks.push({ ...meta, detached, one, both, cycles })
          }
          if (n === 24 && process.env.THREEJS_RED_RACE === '1') {
            await frame.locator('#race').click()
            await frame.waitForFunction(() =>
              globalThis.__remaining
                .snapshot()
                .actual.completions.includes('A'),
            )
            const red = await snapshot(frame)
            console.log('RED actual lifecycle/race', JSON.stringify(red.actual))
            assert.equal(
              red.actual.current,
              'B',
              'RED: latest requested B must survive late A',
            )
          }
          if (n === 24 || n === 27) {
            if (kind === 'solution' && step === lesson.steps[0]) {
              await frame.locator('#file').setInputFiles({
                name: 'local-textured.glb',
                mimeType: 'model/gltf-binary',
                buffer: makeGlb('textured'),
              })
              await settle(frame, n)
              const local = await snapshot(frame)
              assert.equal(local.actual.current, 'local-textured.glb')
              assert.ok(local.actual.counts.createdTexture > 0)
              assert.equal(
                await page.evaluate(
                  (base64) =>
                    Object.values(localStorage).some((value) =>
                      value.includes(base64),
                    ),
                  glbData.textured,
                ),
                false,
              )
              checks.push({
                ...meta,
                localFile: local,
                excludedFromDraft: true,
              })
            }
            await frame.locator('#guard').check()
            await frame.locator('#stale').check()
            const before = (await snapshot(frame)).actual.counts
            await frame.locator('#race').click()
            await frame.waitForFunction(() => {
              try {
                const a = globalThis.__remaining.snapshot().actual
                return (
                  a.completions.includes('A') && a.completions.includes('B')
                )
              } catch {
                return false
              }
            })
            const raced = await snapshot(frame)
            assert.equal(raced.actual.current, 'B')
            assert.ok(
              raced.actual.completions.indexOf('B') <
                raced.actual.completions.indexOf('A'),
            )
            assert.ok(raced.actual.counts.texture > before.texture)
            assert.ok(raced.actual.counts.bitmap > before.bitmap)
            assert.equal(raced.actual.books, 1)
            await frame.locator('#invalid').click()
            await frame.waitForFunction(
              () => globalThis.__remaining.snapshot().actual.status === 'error',
            )
            const failed = await snapshot(frame)
            assert.equal(failed.actual.current, 'B')
            assert.deepEqual(failed.actual.names, ['Left', 'Right'])
            assert.ok(await frame.locator('#error').textContent())
            await frame.locator('#recover').click()
            await settle(frame, n)
            const recovered = await snapshot(frame)
            assert.equal(recovered.actual.current, 'recovered')
            checks.push({ ...meta, raced, failed, recovered })
            if (n === 27) {
              await frame.locator('#framing').check()
              await frame.locator('#objects').selectOption('1')
              await frame.locator('#frame').click()
              assert.equal((await snapshot(frame)).actual.selected, 1)
              await frame.locator('#speed').fill('1')
              await frame.locator('#apply').click()
              await frame.locator('#play').click()
              const start = await snapshot(frame)
              await frame.waitForTimeout(160)
              const moved = await snapshot(frame)
              assert.ok(moved.actual.time > start.actual.time)
              await frame.locator('#pause').click()
              const paused = await snapshot(frame)
              await frame.waitForTimeout(90)
              assert.equal(
                (await snapshot(frame)).actual.time,
                paused.actual.time,
              )
              await frame.locator('#minimap').uncheck()
              const plain = await snapshot(frame)
              await frame.locator('#minimap').check()
              const map = await snapshot(frame)
              assert.ok(map.actual.stats.calls > plain.actual.stats.calls)
              assert.ok(map.actual.stats.calls >= plain.actual.stats.calls + 2)
              assert.notDeepEqual(plain.halfHash, map.halfHash)
              checks.push({ ...meta, start, moved, paused, plain, map })
              if (kind === 'solution' && step === lesson.steps.at(-1)) {
                await keyboardTo(page, frame, '#invalid')
                await page.keyboard.press('Enter')
                await frame.waitForFunction(
                  () =>
                    globalThis.__remaining.snapshot().actual.status === 'error',
                )
                await keyboardTo(page, frame, '#recover')
                await page.keyboard.press('Enter')
                await settle(frame, n)
                await keyboardTo(page, frame, '#objects')
                await page.keyboard.press('Home')
                await page.keyboard.press('ArrowDown')
                await page.keyboard.press('Tab')
                assert.equal((await snapshot(frame)).actual.selected, 1)
                await keyboardTo(page, frame, '#frame')
                await page.keyboard.press('Enter')
                await keyboardTo(page, frame, '#play')
                await page.keyboard.press('Enter')
                assert.equal((await snapshot(frame)).actual.playing, true)
                checks.push({ ...meta, keyboardIntegratedRecovery: true })
              }
            }
          }
          if (n === 25) {
            for (const id of ['wiring', 'keys', 'announce'])
              await frame.locator('#' + id).check()
            await frame.locator('#apply').click()
            await keyboardTo(page, frame, '#objects')
            await page.keyboard.press('Home')
            await page.keyboard.press('ArrowDown')
            await page.keyboard.press('Tab')
            assert.equal((await snapshot(frame)).actual.selected, 1)
            await keyboardTo(page, frame, '#right')
            const before = await snapshot(frame)
            await page.keyboard.press('Enter')
            const moved = await snapshot(frame)
            assert.equal(moved.actual.camera[0], before.actual.camera[0] + 1)
            await keyboardTo(page, frame, '#zoom')
            await page.keyboard.press('Enter')
            assert.equal(
              (await snapshot(frame)).actual.camera[2],
              before.actual.camera[2] - 1,
            )
            await keyboardTo(page, frame, '#frame')
            await page.keyboard.press('Enter')
            await keyboardTo(page, frame, '#fail')
            await page.keyboard.press('Enter')
            assert.equal((await snapshot(frame)).actual.status, 'error')
            assert.ok(await frame.getByRole('status').count())
            await keyboardTo(page, frame, '#recover')
            await page.keyboard.press('Enter')
            assert.equal((await snapshot(frame)).actual.status, 'ready')
            assert.equal(
              await frame.evaluate(() => document.activeElement.id),
              'objects',
            )
            checks.push({
              ...meta,
              keyboard: { before, moved, recovered: true },
            })
          }
          if (n === 26 || n === 28) {
            assert.equal(
              await frame.evaluate(
                () =>
                  !!(
                    document
                      .querySelector('canvas')
                      .compareDocumentPosition(
                        document.querySelector('#report'),
                      ) & Node.DOCUMENT_POSITION_FOLLOWING
                  ),
              ),
              true,
              'Measurements remain after the canvas',
            )
            await frame.locator('#totals').check()
            if (n === 28) await frame.locator('#segments').fill('16')
            await frame.locator('#passes').fill('1')
            await frame.locator('#apply').click()
            const single = await snapshot(frame)
            await frame.locator('#passes').fill('2')
            await frame.locator('#apply').click()
            const multi = await snapshot(frame)
            assert.equal(
              multi.actual.stats.calls,
              single.actual.stats.calls * 2,
            )
            assert.equal(
              multi.actual.stats.triangles,
              single.actual.stats.triangles * 2,
            )
            if (n === 26) {
              assert.equal(single.actual.stats.calls, 2)
              assert.equal(single.actual.stats.triangles, 24)
            }
            for (let i = 0; i < 3; i++) await frame.locator('#cycle').click()
            const cycles = await snapshot(frame)
            assert.equal(
              cycles.actual.counts.createdGeometry -
                cycles.actual.counts.geometry,
              1,
            )
            assert.equal(
              cycles.actual.counts.createdMaterial -
                cycles.actual.counts.material,
              1,
            )
            if (n === 28) {
              await frame.locator('#segments').fill('8')
              await frame.locator('#apply').click()
              const lower = await snapshot(frame)
              assert.ok(
                lower.actual.stats.triangles < multi.actual.stats.triangles,
              )
              assert.notDeepEqual(lower.halfHash, multi.halfHash)
              if (step.id.endsWith('quality-cost') && kind === 'solution') {
                await frame.locator('canvas').scrollIntoViewIfNeeded()
                const evidencePath = process.env.THREEJS_EVIDENCE?.replace(
                  /\.json$/,
                  '',
                )
                if (evidencePath)
                  await page.screenshot({
                    path: evidencePath + '-quality-' + locale + '-390.png',
                  })
                checks.push({ ...meta, canvasBeforeReport: true })
              }
              await frame.locator('#select-report').click()
              assert.ok(
                (
                  await frame.evaluate(() => getSelection().toString())
                ).includes('records'),
              )
              const report = await frame.locator('#report').textContent()
              checks.push({ ...meta, lower, report })
              if (kind === 'solution' && step === lesson.steps.at(-1)) {
                await page.locator('#tab-notes').click()
                await page
                  .locator('.notes-editor')
                  .fill(
                    report +
                      String.fromCharCode(10) +
                      'Observed silhouette change; CPU duration is not GPU time.',
                  )
                assert.ok(
                  (await page.locator('.notes-editor').inputValue()).includes(
                    'records',
                  ),
                )
                await preview(page)
                checks.push({ ...meta, notesTransfer: true })
              }
            }
            checks.push({ ...meta, single, multi, cycles })
          }
          if (kind === 'starter' && step === lesson.steps[0]) {
            const edit = source.replace(
              'camera.position.set(0,2,7)',
              'camera.position.set(0,2,9)',
            )
            assert.notEqual(edit, source)
            frame = await instrument(page, auditSource(edit), expressions[n])
            await settle(frame, n)
            const changed = await snapshot(frame)
            assert.notDeepEqual(changed.halfHash, a.halfHash)
            checks.push({
              ...meta,
              editor: { sha256: hash(edit), result: changed },
            })
          }
          await page.setViewportSize({ width: 1440, height: 900 })
          await frame.waitForTimeout(80)
          visible(await snapshot(frame))
          if (kind === 'solution' && step === lesson.steps.at(-1)) {
            const p =
              process.env.THREEJS_EVIDENCE?.replace(/\.json$/, '') ??
              '.superpowers/sdd/2026-10-27-threejs-complete-learning/task-6'
            await page.screenshot({
              path: p + '-' + id + '-' + locale + '-1440.png',
            })
            await page.setViewportSize({ width: 390, height: 900 })
            await preview(page)
            await page.screenshot({
              path: p + '-' + id + '-' + locale + '-390.png',
            })
          }
          if (
            (n === 24 || n === 27) &&
            kind === 'solution' &&
            step === lesson.steps.at(-1)
          ) {
            await frame.locator('#race').click()
            await frame.waitForTimeout(10)
          }
          const cleanup = await frame.evaluate(async () => {
            globalThis.__remaining.cleanup()
            await new Promise((r) => setTimeout(r, 400))
            const before = Object.fromEntries(
              Object.entries(globalThis.__disposeAudit).map(([k, v]) => [
                k,
                { count: v.length, unique: new Set(v).size },
              ]),
            )
            globalThis.__remaining.cleanup()
            await new Promise((r) => setTimeout(r, 20))
            const after = Object.fromEntries(
              Object.entries(globalThis.__disposeAudit).map(([k, v]) => [
                k,
                { count: v.length, unique: new Set(v).size },
              ]),
            )
            return {
              before,
              after,
              output: document.querySelector('output').textContent,
              report: document.querySelector('#report')?.textContent,
              actual: globalThis.__remaining.snapshot().actual,
            }
          })
          assert.match(cleanup.output, /Cleanup|정리/)
          assert.deepEqual(cleanup.before, cleanup.after)
          for (const item of Object.values(cleanup.after))
            assert.equal(
              item.count,
              item.unique,
              'each resource is disposed once',
            )
          if (n === 28) assert.ok(cleanup.report.includes('geometry'))
          if (n === 24 || n === 27) {
            assert.equal(cleanup.actual.books, 0)
            assert.equal(
              cleanup.actual.counts.createdGeometry,
              cleanup.actual.counts.geometry,
            )
            assert.equal(
              cleanup.actual.counts.createdMaterial,
              cleanup.actual.counts.material,
            )
            assert.equal(
              cleanup.actual.counts.createdTexture,
              cleanup.actual.counts.texture,
            )
          }
          checks.push({ ...meta, cleanup })
          await page.setViewportSize({ width: 390, height: 900 })
        }
    }
  }
  page.off('console', listener)
  checks.push({ inventory, assetURLs, consolePhases })
  return checks
}
