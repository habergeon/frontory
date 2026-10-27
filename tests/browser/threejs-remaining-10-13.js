import assert from 'node:assert/strict'
import fs from 'node:fs'
import {
  editorCode,
  editCode,
  ready,
  reading,
  preview,
  loadSource,
  instrument,
  snapshot,
  visible,
} from './threejs-remaining-helper.js'
const lessons = JSON.parse(
  fs.readFileSync('content/learning/threejs.json', 'utf8'),
).lessons
const expressions = {
  10: `({uv:Array.from(uv.array),width:geometry.parameters.width*mesh.scale.x,status,repeat:current?.repeat.toArray(),wrap:current?.wrapS,image:current?[current.image.width,current.image.height]:null,textures:ownedTextures.size,urls:urls.size,map:material.map===current})`,
  11: `({input:typeof texture==='undefined'?null:texture.colorSpace,output:renderer.outputColorSpace,byte:typeof texture==='undefined'?null:texture.image.data[1],linear:material.color.toArray(),roughness:material.roughness??null,roughnessMap:typeof texture!=='undefined'&&material.roughnessMap===texture,center:Array.from(pixels.slice((Math.floor(canvas.height/2)*canvas.width+Math.floor(canvas.width/2))*4,(Math.floor(canvas.height/2)*canvas.width+Math.floor(canvas.width/2))*4+3))})`,
  12: `({cast:caster.castShadow,receive:floor.receiveShadow,enabled:renderer.shadowMap.enabled,lightCast:light.castShadow,extent:shadowCamera.right,mapSize:light.shadow.mapSize.toArray(),map:light.shadow.map?[light.shadow.map.width,light.shadow.map.height]:null,helper:helper.visible,unitsPerTexel:(shadowCamera.right-shadowCamera.left)/light.shadow.mapSize.x})`,
  13: `({pointer:pointer.toArray(),hits:hits.map(h=>({name:h.object.name,distance:h.distance})),selected:selected?.name??null,colors:[backMaterial.color.getHexString(),frontMaterial.color.getHexString()],canvasRelative,nearest,clearOnMiss})`,
}
async function clickAt(frame, x = 0.5, y = 0.5) {
  const canvas = frame.locator('canvas')
  const size = await canvas.evaluate((c) => ({
    w: c.clientWidth,
    h: c.clientHeight,
  }))
  await canvas.click({ position: { x: size.w * x, y: size.h * y } })
  return snapshot(frame)
}
async function settled(frame) {
  await frame.waitForFunction(
    () => globalThis.__remaining.snapshot().actual.status !== 'loading',
  )
}
function observeResources(source) {
  return source.replace(
    "import * as THREE from 'three';",
    `import * as THREE from 'three';
const resourceProbe={created:[],revoked:[],textures:[]};globalThis.__resourceProbe=resourceProbe;
const createURL=URL.createObjectURL.bind(URL),revokeURL=URL.revokeObjectURL.bind(URL),disposeTexture=THREE.Texture.prototype.dispose;
URL.createObjectURL=blob=>{const url=createURL(blob);resourceProbe.created.push(url);return url;};
URL.revokeObjectURL=url=>{resourceProbe.revoked.push(url);return revokeURL(url);};
THREE.Texture.prototype.dispose=function(){resourceProbe.textures.push(this.uuid);return disposeTexture.call(this);};
`,
  )
}
async function assets(frame, checks, meta) {
  for (const type of ['image/png', 'image/jpeg']) {
    const data = await frame.evaluate((type) => {
      const c = document.createElement('canvas')
      c.width = 12
      c.height = 6
      const ctx = c.getContext('2d')
      ctx.fillStyle = '#e11d48'
      ctx.fillRect(0, 0, 12, 6)
      return c.toDataURL(type).split(',')[1]
    }, type)
    await frame.locator('#file').setInputFiles({
      name: type === 'image/png' ? 'local.png' : 'local.jpg',
      mimeType: type,
      buffer: Buffer.from(data, 'base64'),
    })
    await settled(frame)
    const a = await snapshot(frame)
    assert.equal(a.actual.status, 'ready')
    assert.deepEqual(a.actual.image, [12, 6])
    assert.equal(a.actual.urls, 0)
    assert.equal(a.actual.textures, 1)
    assert.equal(a.actual.map, true)
    checks.push({ ...meta, asset: type, actual: a })
  }
  const before = await snapshot(frame)
  await frame.locator('#file').setInputFiles({
    name: 'corrupt.png',
    mimeType: 'image/png',
    buffer: Buffer.from('corrupt-task3-file'),
  })
  await settled(frame)
  const failed = await snapshot(frame)
  assert.equal(failed.actual.status, 'error')
  assert.deepEqual(failed.actual.image, [12, 6])
  assert.equal(failed.sum, before.sum)
  assert.equal(failed.actual.urls, 0)
  assert.equal(failed.actual.textures, 1)
  assert.ok(await frame.locator('#error').textContent())
  await frame.locator('#sample').click()
  await settled(frame)
  const recovered = await snapshot(frame)
  assert.equal(recovered.actual.status, 'ready')
  assert.deepEqual(recovered.actual.image, [8, 8])
  assert.equal(recovered.actual.textures, 1)
  assert.equal(await frame.locator('#error').textContent(), '')
  checks.push({ ...meta, asset: 'corrupt-recovery', failed, recovered })
}
async function persistence(page, locale, lesson, checks) {
  await page.setViewportSize({ width: 1440, height: 900 })
  const source = await loadSource(page, lesson.steps[0].id, true)
  let frame = await instrument(
    page,
    source + '\n<!-- task3-saved-edit -->',
    expressions[10],
  )
  await settled(frame)
  const bytes = await frame.evaluate(() => {
    const c = document.createElement('canvas')
    c.width = 17
    c.height = 9
    const x = c.getContext('2d')
    x.fillStyle = '#e11d48'
    x.fillRect(0, 0, 17, 9)
    return c.toDataURL('image/jpeg').split(',')[1]
  })
  await frame.locator('#file').setInputFiles({
    name: 'private-task3.jpg',
    mimeType: 'image/jpeg',
    buffer: Buffer.from(bytes, 'base64'),
  })
  await settled(frame)
  assert.deepEqual((await snapshot(frame)).actual.image, [17, 9])
  assert.match(
    await frame.locator('body').textContent(),
    locale === 'ko' ? /백업에 포함하지 않습니다/ : /excluded from backups/,
  )
  const code = await editorCode(page),
    note = 'Task3 저장 · ' + locale
  await page.locator('.notes-toggle').click()
  await page.locator('.notes-editor').fill(note)
  await page.locator('.notes-toggle').click()
  await page.locator('.learning-status button').nth(2).click()
  const toggle = page
    .locator('details')
    .filter({ has: page.locator('.backup-controls') })
  if (await toggle.count()) await toggle.evaluate((d) => (d.open = true))
  const downloadPromise = page.waitForEvent('download')
  await page
    .locator('.backup-controls')
    .getByRole('button', {
      name: locale === 'ko' ? 'JSON 내보내기' : 'Export JSON',
      exact: true,
    })
    .click()
  const download = await downloadPromise
  const stream = await download.createReadStream()
  const chunks = []
  for await (const chunk of stream) chunks.push(chunk)
  const backup = Buffer.concat(chunks),
    text = backup.toString('utf8'),
    data = JSON.parse(text),
    draft = data.units.find((u) => u.id === lesson.unitId).draft
  assert.equal(draft.code, code)
  assert.equal(draft.notes, note)
  assert.equal(draft.progress, 'completed')
  assert.ok(!text.includes(bytes))
  assert.ok(!text.includes('private-task3.jpg'))
  await page
    .locator('#panel-result')
    .getByRole('button', {
      name: locale === 'ko' ? '다시 실행' : 'Run again',
      exact: true,
    })
    .click()
  await page.waitForTimeout(300)
  frame = await (
    await page.locator('#panel-result iframe').elementHandle()
  ).contentFrame()
  await settled(frame)
  assert.deepEqual((await snapshot(frame)).actual.image, [8, 8])
  assert.equal(await frame.locator('#file').inputValue(), '')
  await editCode(page, '<p>temporary replacement</p>')
  await page.locator('.notes-toggle').click()
  await page.locator('.notes-editor').fill('temporary note')
  await page.locator('.notes-toggle').click()
  await page.locator('.backup-controls input[type=file]').setInputFiles({
    name: 'task3-backup.json',
    mimeType: 'application/json',
    buffer: backup,
  })
  await page.locator('.backup-confirm').getByRole('button').first().click()
  await ready(page)
  await page.waitForFunction(
    (code) =>
      document
        .querySelector('#panel-result iframe')
        ?.srcdoc.includes('task3-saved-edit'),
    code,
  )
  assert.equal(await editorCode(page), code)
  assert.equal(await page.locator('.notes-editor').inputValue(), note)
  assert.equal(
    await page
      .locator('.learning-status button')
      .nth(2)
      .getAttribute('aria-pressed'),
    'true',
  )
  frame = await (
    await page.locator('#panel-result iframe').elementHandle()
  ).contentFrame()
  await settled(frame)
  assert.deepEqual((await snapshot(frame)).actual.image, [8, 8])
  assert.equal(await frame.locator('#file').inputValue(), '')
  checks.push({
    unit: lesson.unitId,
    locale,
    persistence: {
      codeRestored: true,
      notesRestored: true,
      completionRestored: true,
      fileExcluded: true,
      rerunSample: [8, 8],
      restoredSample: [8, 8],
      backupVersion: data.version,
    },
  })
}
export async function runGroup(page, base, unitId) {
  let phase = 'setup'
  const consolePhases = []
  const consoleListener = (message) => {
    if (message.type() === 'error')
      consolePhases.push({
        phase,
        message: message.text(),
        location: message.location(),
      })
  }
  page.on('console', consoleListener)
  const ids = [10, 11, 12, 13].map((n) => 'threejs-step-' + n)
  assert.ok(!unitId || ids.includes(unitId))
  const checks = [],
    inventory = [],
    baselines = new Map()
  for (const id of ids.filter((id) => !unitId || id === unitId))
    for (const locale of ['ko', 'en']) {
      phase = { unit: id, locale, source: 'initial-navigation' }
      await page.setViewportSize({ width: 390, height: 900 })
      await page.goto(
        base + '/tests/browser/threejs-learning.html?learning#' + id,
      )
      await ready(page)
      const language = page.getByRole('button', {
        name: locale === 'en' ? 'English' : '한국어',
        exact: true,
      })
      if (await language.count()) await language.click()
      await page.waitForTimeout(300)
      await page.evaluate((id) => {
        localStorage.removeItem('web-gl-study:unit:v1:' + id)
        localStorage.removeItem('web-gl-study:all:v1')
      }, id)
      await page.reload()
      await ready(page)
      assert.match(await editorCode(page), new RegExp('lang="' + locale + '"'))
      const lesson = lessons.find((l) => l.unitId === id)
      assert.ok(lesson, id + ' missing')
      for (const step of lesson.steps)
        for (const kind of ['starter', 'solution']) {
          const meta = { unit: id, step: step.id, locale, source: kind }
          phase = meta
          console.log(id, locale, step.id, kind)
          await page.setViewportSize({ width: 390, height: 900 })
          await reading(page)
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
          const n = Number(id.slice(-2))
          let frame
          try {
            frame = await instrument(
              page,
              observeResources(source),
              expressions[n],
            )
            if (n === 10) await settled(frame)
          } catch (e) {
            console.log(
              'DIAGNOSTIC',
              await page.locator('#panel-result').textContent(),
            )
            throw e
          }
          const mobile = await snapshot(frame)
          visible(mobile)
          await page.setViewportSize({ width: 1440, height: 900 })
          await frame.waitForFunction(
            () =>
              document.querySelector('canvas').width ===
              document.querySelector('#stage').clientWidth,
          )
          const desktop = await snapshot(frame)
          visible(desktop)
          if (n === 10) {
            assert.equal(desktop.actual.width, 3.6)
            if (step.id.endsWith('-uv')) {
              assert.equal(
                Math.max(...desktop.actual.uv.filter((v, i) => i % 2 === 0)),
                kind === 'starter' ? 1 : 0.5,
              )
              await frame.locator('#value').fill('0.5')
              assert.equal(
                await frame
                  .locator('#value')
                  .evaluate((i) => i.checkValidity()),
                true,
              )
              await frame.locator('#apply').click()
              assert.equal((await snapshot(frame)).actual.uv[2], 0.5)
            }
            if (step.id.endsWith('-repeat')) {
              assert.deepEqual(desktop.actual.repeat, [4, 2])
              assert.equal(
                desktop.actual.wrap,
                kind === 'starter' ? 1001 : 1000,
              )
              await frame.locator('#wrap').check()
              await frame.locator('#repeatX').fill('4')
              await frame.locator('#repeatY').fill('2')
              await frame.locator('#apply').click()
              assert.equal((await snapshot(frame)).actual.wrap, 1000)
            }
            if (step.id.endsWith('load-recovery'))
              assert.equal(
                desktop.actual.status,
                kind === 'starter' ? 'error' : 'ready',
              )
            await assets(frame, checks, meta)
          }
          const baselineKey = step.id + locale
          if (kind === 'starter') baselines.set(baselineKey, desktop)
          if (n === 11) {
            const solution = kind === 'solution'
            if (!step.id.endsWith('output'))
              assert.equal(desktop.actual.byte, 128)
            const target = step.id.endsWith('data-map') ? 'none' : 'srgb'
            if (step.id.endsWith('color-map')) {
              assert.equal(desktop.actual.input, solution ? 'srgb' : '')
              assert.ok(
                Math.abs(desktop.actual.center[0] - (solution ? 128 : 188)) <=
                  1,
              )
            }
            if (step.id.endsWith('data-map')) {
              assert.equal(desktop.actual.input, solution ? '' : 'srgb')
              assert.equal(desktop.actual.roughness, 1)
              assert.equal(desktop.actual.roughnessMap, true)
            }
            if (step.id.endsWith('output')) {
              assert.deepEqual(desktop.actual.linear, [0.5, 0.5, 0.5])
              assert.equal(desktop.actual.byte, null)
              assert.equal(
                desktop.actual.output,
                solution ? 'srgb' : 'srgb-linear',
              )
              assert.ok(
                Math.abs(desktop.actual.center[0] - (solution ? 188 : 128)) <=
                  1,
              )
            }
            if (solution)
              assert.notEqual(desktop.sum, baselines.get(baselineKey).sum)
            const wrong =
              target === 'none'
                ? 'srgb'
                : step.id.endsWith('output')
                  ? 'linear'
                  : 'none'
            await frame.locator('#space').selectOption(wrong)
            await frame.locator('#apply').click()
            const before = await snapshot(frame)
            await frame.locator('#space').selectOption(target)
            await frame.locator('#apply').click()
            const changed = await snapshot(frame)
            assert.notEqual(changed.sum, before.sum)
            assert.equal(
              step.id.endsWith('output')
                ? changed.actual.output
                : changed.actual.input,
              target === 'none' ? '' : target,
            )
            checks.push({ ...meta, input: changed })
          }
          if (n === 12) {
            const a = desktop.actual,
              solution = kind === 'solution'
            assert.equal(a.enabled, true)
            assert.equal(a.lightCast, true)
            assert.equal(a.receive, true)
            if (step.id.endsWith('flags')) assert.equal(a.cast, solution)
            if (step.id.endsWith('shadow-frustum')) {
              assert.equal(a.extent, solution ? 4 : 0.5)
              assert.deepEqual(a.map, [512, 512])
            }
            if (step.id.endsWith('map-size')) {
              assert.equal(a.extent, 4)
              assert.deepEqual(a.map, solution ? [512, 512] : [32, 32])
              assert.equal(a.unitsPerTexel, solution ? 0.015625 : 0.25)
            }
            if (solution)
              assert.notEqual(
                desktop.sum,
                baselines.get(baselineKey).sum,
                'shadow pixels differ',
              )
            await frame.locator('#helper').check()
            assert.equal((await snapshot(frame)).actual.helper, true)
            await frame.locator('#helper').uncheck()
            if (step.id.endsWith('flags')) {
              await frame.locator('#cast').check()
              await frame.locator('#apply').click()
              const shadow = await snapshot(frame)
              await frame.locator('#receive').uncheck()
              await frame.locator('#apply').click()
              const noReceive = await snapshot(frame)
              assert.notEqual(noReceive.sum, shadow.sum)
              assert.equal(noReceive.actual.receive, false)
              await frame.locator('#receive').check()
              await frame.locator('#apply').click()
            } else {
              const target = step.id.endsWith('shadow-frustum') ? '4' : '512',
                other = step.id.endsWith('shadow-frustum') ? '0.5' : '32'
              await frame.locator('#value').fill(other)
              await frame.locator('#apply').click()
              const before = await snapshot(frame)
              await frame.locator('#value').fill(target)
              assert.equal(
                await frame
                  .locator('#value')
                  .evaluate((i) => i.checkValidity()),
                true,
              )
              await frame.locator('#apply').click()
              const after = await snapshot(frame)
              assert.notEqual(after.sum, before.sum)
              assert.equal(after.actual.extent, 4)
              assert.deepEqual(after.actual.map, [512, 512])
              checks.push({ ...meta, input: after })
              if (step.id.endsWith('shadow-frustum')) {
                await frame.locator('#value').fill('8')
                await frame.locator('#apply').click()
                const wide = await snapshot(frame)
                assert.equal(wide.actual.unitsPerTexel, 0.03125)
                await frame.locator('#value').fill('4')
                await frame.locator('#apply').click()
                const narrow = await snapshot(frame)
                assert.equal(narrow.actual.unitsPerTexel, 0.015625)
                assert.deepEqual(narrow.actual.map, wide.actual.map)
                assert.notEqual(narrow.sum, wide.sum)
                checks.push({ ...meta, wide, narrow })
              }
            }
          }
          if (n === 13) {
            const center = await clickAt(frame)
            if (!step.id.endsWith('canvas-ndc') || kind === 'solution') {
              assert.ok(center.actual.pointer.every((v) => Math.abs(v) < 0.01))
              assert.equal(center.actual.hits[0].name, 'front')
              assert.ok(
                center.actual.hits.at(-1).distance >
                  center.actual.hits[0].distance,
              )
              assert.equal(
                center.actual.selected,
                step.id.endsWith('intersections') && kind === 'starter'
                  ? 'back'
                  : 'front',
              )
            } else
              assert.ok(center.actual.pointer.some((v) => Math.abs(v) > 0.01))
            const missed = await clickAt(frame, 0.01, 0.01)
            assert.equal(
              missed.actual.selected,
              step.id.endsWith('selection') && kind === 'starter'
                ? 'front'
                : null,
            )
            await frame.locator('#layout').click()
            const moved = await clickAt(frame)
            if (!step.id.endsWith('canvas-ndc') || kind === 'solution') {
              assert.ok(moved.actual.pointer.every((v) => Math.abs(v) < 0.01))
              assert.equal(moved.actual.hits[0].name, 'front')
            }
            await page.setViewportSize({ width: 390, height: 900 })
            await preview(page)
            const resized = await clickAt(frame)
            if (!step.id.endsWith('canvas-ndc') || kind === 'solution') {
              assert.ok(resized.actual.pointer.every((v) => Math.abs(v) < 0.01))
              assert.equal(resized.actual.hits[0].name, 'front')
            }
            await frame.locator('#clear').click()
            assert.equal((await snapshot(frame)).actual.selected, null)
            checks.push({ ...meta, center, missed, moved, resized })
            await page.setViewportSize({ width: 1440, height: 900 })
          }
          checks.push({ ...meta, mobile, desktop })
          inventory.push(meta)
          if (kind === 'starter' && step === lesson.steps[0]) {
            checks.push({
              ...meta,
              resourcesBeforeEditor: await frame.evaluate(
                () => globalThis.__resourceProbe,
              ),
            })
            const edits = {
              10: ['const uvScale = 1;', 'const uvScale = 0.5;'],
              11: ["const inputSpace = 'none';", "const inputSpace = 'srgb';"],
              12: ['caster.castShadow = false;', 'caster.castShadow = true;'],
              13: [
                'const canvasRelative = false;',
                'const canvasRelative = true;',
              ],
            }
            const [from, to] = edits[n]
            assert.ok(source.includes(from))
            frame = await instrument(
              page,
              observeResources(source.replace(from, to)),
              expressions[n],
            )
            if (n === 10) await settled(frame)
            const edit = n === 13 ? await clickAt(frame) : await snapshot(frame)
            assert.notEqual(edit.sum, desktop.sum)
            if (n === 13) {
              assert.ok(edit.actual.pointer.every((v) => Math.abs(v) < 0.01))
              assert.equal(edit.actual.selected, 'front')
            }
            checks.push({ ...meta, source: 'editor-edit', edit })
          }
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
            if (kind === 'solution' && step === lesson.steps.at(-1)) {
              if (n === 10) {
                await frame.locator('#sample').click()
                await settled(frame)
                assert.deepEqual((await snapshot(frame)).actual.image, [8, 8])
              }
              if (n === 11) {
                await frame.locator('#space').selectOption('srgb')
                await frame.locator('#apply').click()
                assert.equal((await snapshot(frame)).actual.output, 'srgb')
              }
              if (n === 12) {
                await frame.locator('#value').fill('512')
                await frame.locator('#apply').click()
                assert.deepEqual((await snapshot(frame)).actual.map, [512, 512])
              }
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
                fullPage: true,
              })
            }
          }
          const cleanup = await frame.evaluate(async (pending) => {
            if (pending) {
              const image = document.createElement('canvas')
              image.width = image.height = 8
              const bytes = Uint8Array.from(
                atob(image.toDataURL('image/png').split(',')[1]),
                (c) => c.charCodeAt(0),
              )
              const file = new File([bytes], 'pending.png', {
                  type: 'image/png',
                }),
                transfer = new DataTransfer()
              transfer.items.add(file)
              const input = document.querySelector('#file')
              input.files = transfer.files
              input.dispatchEvent(new Event('change'))
            }
            const result = globalThis.__remaining.cleanupSnapshot()
            await new Promise((r) => setTimeout(r, 100))
            return { ...result, resources: globalThis.__resourceProbe }
          }, n === 10)
          assert.equal(cleanup.disposed, cleanup.expected)
          assert.equal(cleanup.children, 0)
          assert.equal(
            new Set(cleanup.resources.textures).size,
            cleanup.resources.textures.length,
            'no texture disposed twice including late image completion',
          )
          if (n === 10)
            assert.deepEqual(
              [...cleanup.resources.created].sort(),
              [...cleanup.resources.revoked].sort(),
              'every native object URL revoked exactly once',
            )
          checks.push({ ...meta, cleanup })
        }
      if (id.endsWith('10')) {
        phase = { unit: id, locale, source: 'persistence' }
        await persistence(page, locale, lesson, checks)
      }
      await page.evaluate((id) => {
        localStorage.removeItem('web-gl-study:unit:v1:' + id)
        localStorage.removeItem('web-gl-study:all:v1')
      }, id)
    }
  const expected = ids
    .filter((id) => !unitId || unitId === id)
    .flatMap((id) =>
      lessons
        .find((l) => l.unitId === id)
        .steps.flatMap((s) =>
          ['ko', 'en'].flatMap((locale) =>
            ['starter', 'solution'].map((source) => ({
              unit: id,
              step: s.id,
              locale,
              source,
            })),
          ),
        ),
    )
  const key = (x) => JSON.stringify(x)
  assert.deepEqual(inventory.map(key).sort(), expected.map(key).sort())
  checks.push({ inventory })
  checks.push({ consolePhases })
  page.off('console', consoleListener)
  return checks
}
