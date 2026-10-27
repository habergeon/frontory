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
import { makeGlb } from './gltf-fixtures.mjs'
const lessons = JSON.parse(
  fs.readFileSync('content/learning/threejs.json', 'utf8'),
).lessons
const expressions = {
  14: `({status,coreIdentity:root instanceof THREE.Object3D,meshes:meshes.length,sharedAtLoad,shared:meshes.length>1&&meshes[0].material===meshes[1].material,colors:meshes.map(m=>m.material.color.getHexString()),selected:selected?.name??null,textures:ownedTextures.size,recursive,isolateMaterial,centers:meshes.map(m=>m.getWorldPosition(new THREE.Vector3()).project(camera).toArray())})`,
  15: `({status,coreIdentity:root instanceof THREE.Object3D,empty,center:center.toArray(),size:size.toArray(),target:controls.target.toArray(),camera:camera.position.toArray(),near:camera.near,far:camera.far,useCenter,useFov,guardEmpty,ndc:box.isEmpty()?[]:[...Array(8)].map((_,i)=>new THREE.Vector3(i&1?box.max.x:box.min.x,i&2?box.max.y:box.min.y,i&4?box.max.z:box.min.z).project(camera).toArray())})`,
  16: `({status,target:controls.target.toArray(),camera:camera.position.toArray(),damping:controls.enableDamping,dampingFactor:controls.dampingFactor,demand,raf,frames})`,
  17: `({status,clips:clips.map(c=>({name:c.name,duration:c.duration})),mixerTime:mixer?.time??null,timeScale:mixer?.timeScale??null,rootIdentity:mixer?.getRoot()===root,actionRunning:action?.isRunning()??false,paused:action?.paused??null,playing,speed,delta,seconds,x:meshes[0]?.position.x??null})`,
  18: `({rgba:[.4,.6].map(x=>{const i=(Math.floor(canvas.height*.5)*canvas.width+Math.floor(canvas.width*x))*4;return Array.from(pixels.slice(i,i+4))}),opacity:redMaterial.opacity,transparent:redMaterial.transparent,blueTransparent:blueMaterial.transparent,depthWrite:redMaterial.depthWrite,depthTest:redMaterial.depthTest,order:[red.renderOrder,blue.renderOrder],camera:camera.position.toArray()})`,
}
function probeResources(source) {
  return source
    .replace(
      '</script>',
      "globalThis.__renderProbe=()=>({frames,raf:typeof raf==='undefined'?null:raf,position:camera.position.toArray()});\n</script>",
    )
    .replace(
      "import * as THREE from 'three';",
      `import * as THREE from 'three';
const resourceProbe={geometry:[],material:[],texture:[],closed:0,mixerStops:0,mixerUncache:0};globalThis.__resourceProbe=resourceProbe;
for(const [name,prototype] of [['geometry',THREE.BufferGeometry.prototype],['material',THREE.Material.prototype],['texture',THREE.Texture.prototype]]){const original=prototype.dispose;prototype.dispose=function(){resourceProbe[name].push(this.uuid);return original.call(this);};}
const closeBitmap=ImageBitmap.prototype.close;ImageBitmap.prototype.close=function(){resourceProbe.closed++;return closeBitmap.call(this);};
for(const [method,key]of [['stopAllAction','mixerStops'],['uncacheRoot','mixerUncache']]){const original=THREE.AnimationMixer.prototype[method];THREE.AnimationMixer.prototype[method]=function(...args){resourceProbe[key]++;return original.apply(this,args);};}
`,
    )
}
async function settle(frame) {
  await frame.waitForFunction(
    () => globalThis.__remaining.snapshot().actual.status !== 'loading',
  )
}
async function idleFrames(frame) {
  await frame.waitForFunction(() => globalThis.__renderProbe().raf === 0)
  const first = await frame.evaluate(() => globalThis.__renderProbe().frames)
  await frame.waitForTimeout(180)
  const second = await frame.evaluate(() => globalThis.__renderProbe().frames)
  assert.equal(first, second)
  return first
}
async function drag(frame, page) {
  await frame.locator('canvas').scrollIntoViewIfNeeded()
  const box = await frame.locator('canvas').boundingBox()
  await page.mouse.move(box.x + box.width * 0.45, box.y + box.height * 0.5)
  await page.mouse.down()
  await page.mouse.move(box.x + box.width * 0.65, box.y + box.height * 0.6, {
    steps: 6,
  })
  await page.mouse.up()
}
async function choose(frame, kind) {
  await frame.locator('#model').selectOption(kind)
  await frame.locator('#sample').click()
  await settle(frame)
}
function mutateGlb(buffer, mutate) {
  const oldLength = buffer.readUInt32LE(12),
    json = JSON.parse(buffer.subarray(20, 20 + oldLength).toString('utf8'))
  mutate(json)
  const encoded = Buffer.from(JSON.stringify(json)),
    text = Buffer.alloc(Math.ceil(encoded.length / 4) * 4, 0x20)
  encoded.copy(text)
  const bin = buffer.subarray(20 + oldLength),
    out = Buffer.alloc(20 + text.length + bin.length)
  buffer.copy(out, 0, 0, 20)
  out.writeUInt32LE(out.length, 8)
  out.writeUInt32LE(text.length, 12)
  text.copy(out, 20)
  bin.copy(out, 20 + text.length)
  return out
}
async function rejectedFiles(frame, checks, meta) {
  for (const [name, bytes, reason] of [
    [
      'external.glb',
      mutateGlb(
        makeGlb('static'),
        (j) => (j.buffers[0].uri = 'https://example.invalid/model.bin'),
      ),
      'External URI unsupported',
    ],
    [
      'compressed.glb',
      mutateGlb(
        makeGlb('static'),
        (j) => (j.extensionsUsed = ['KHR_draco_mesh_compression']),
      ),
      'Compression unsupported',
    ],
    ['large.glb', Buffer.alloc(2 * 1024 * 1024 + 1), 'GLB exceeds 2 MiB'],
  ]) {
    const before = await snapshot(frame)
    await frame.locator('#file').setInputFiles({ name, buffer: bytes })
    await settle(frame)
    const after = await snapshot(frame)
    assert.equal(after.actual.status, 'error')
    assert.match(
      await frame.locator('#error').textContent(),
      new RegExp(reason),
    )
    assert.equal(before.sum, after.sum)
    checks.push({ ...meta, rejected: name, reason, after })
  }
  await choose(frame, 'static')
}
async function measuredSpeed(frame, speed) {
  await frame.locator('#stop').click()
  await frame.locator('#value').fill(String(speed))
  await frame.locator('#apply').click()
  await frame.locator('#play').click()
  const first = await snapshot(frame),
    start = Date.now()
  await frame.waitForTimeout(280)
  const after = await snapshot(frame),
    elapsed = (Date.now() - start) / 1000
  await frame.locator('#pause').click()
  const rate = (after.actual.mixerTime - first.actual.mixerTime) / elapsed
  assert.ok(Math.abs(rate - speed) < 0.45, { speed, elapsed, rate })
  return { speed, elapsed, rate, first, after }
}
async function persistence(page, locale, lesson, checks) {
  await page.setViewportSize({ width: 1440, height: 900 })
  const source = await loadSource(page, lesson.steps[0].id, true)
  let frame = await instrument(
    page,
    probeResources(source) + '\n<!-- task4-saved-edit -->',
    expressions[14],
  )
  await settle(frame)
  const fileBytes = makeGlb('textured')
  await frame.locator('#file').setInputFiles({
    name: 'private-task4.glb',
    mimeType: 'model/gltf-binary',
    buffer: fileBytes,
  })
  await settle(frame)
  assert.equal((await snapshot(frame)).actual.meshes, 1)
  assert.match(
    await frame.locator('body').textContent(),
    locale === 'ko' ? /백업에 포함하지 않습니다/ : /excluded from backups/,
  )
  const code = await editorCode(page),
    note = 'Task4 저장 · ' + locale
  await page.locator('.notes-toggle').click()
  await page.locator('.notes-editor').fill(note)
  await page.locator('.notes-toggle').click()
  await page.locator('.learning-status button').nth(2).click()
  await page
    .locator('details')
    .filter({ has: page.locator('.backup-controls') })
    .evaluate((d) => (d.open = true))
  const downloadPromise = page.waitForEvent('download')
  await page
    .locator('.backup-controls')
    .getByRole('button', {
      name: locale === 'ko' ? 'JSON 내보내기' : 'Export JSON',
      exact: true,
    })
    .click()
  const download = await downloadPromise,
    stream = await download.createReadStream(),
    chunks = []
  for await (const chunk of stream) chunks.push(chunk)
  const backup = Buffer.concat(chunks),
    text = backup.toString('utf8'),
    data = JSON.parse(text),
    draft = data.units.find((u) => u.id === lesson.unitId).draft
  assert.equal(draft.code, code)
  assert.equal(draft.notes, note)
  assert.equal(draft.progress, 'completed')
  assert.ok(!text.includes(fileBytes.toString('base64')))
  assert.ok(!text.includes('private-task4.glb'))
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
  await settle(frame)
  assert.equal((await snapshot(frame)).actual.meshes, 2)
  assert.equal(await frame.locator('#file').inputValue(), '')
  await editCode(page, '<p>temporary replacement</p>')
  await page.locator('.notes-toggle').click()
  await page.locator('.notes-editor').fill('temporary note')
  await page.locator('.notes-toggle').click()
  await page.locator('.backup-controls input[type=file]').setInputFiles({
    name: 'task4-backup.json',
    mimeType: 'application/json',
    buffer: backup,
  })
  await page.locator('.backup-confirm').getByRole('button').first().click()
  await ready(page)
  await page.waitForFunction(() =>
    document
      .querySelector('#panel-result iframe')
      ?.srcdoc.includes('task4-saved-edit'),
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
  await settle(frame)
  assert.equal((await snapshot(frame)).actual.meshes, 2)
  assert.equal(await frame.locator('#file').inputValue(), '')
  checks.push({
    unit: lesson.unitId,
    locale,
    persistence: {
      codeRestored: true,
      notesRestored: true,
      completionRestored: true,
      fileExcluded: true,
      rerunMeshes: 2,
      restoredMeshes: 2,
      backupVersion: data.version,
    },
  })
}
export async function runGroup(page, base, unitId) {
  const checks = [],
    inventory = [],
    phases = [],
    assetURLs = []
  let phase = 'setup'
  await page.exposeBinding('__task4AssetURL', (_source, event) => {
    assetURLs.push({ ...event, phase })
  })
  await page.addInitScript(() => {
    const create = URL.createObjectURL.bind(URL),
      revoke = URL.revokeObjectURL.bind(URL)
    URL.createObjectURL = (blob) => {
      const url = create(blob)
      void globalThis.__task4AssetURL({
        action: 'create',
        url,
        mime: blob.type,
      })
      return url
    }
    URL.revokeObjectURL = (url) => {
      void globalThis.__task4AssetURL({ action: 'revoke', url })
      return revoke(url)
    }
  })
  const listener = (m) => {
    if (['error', 'warning'].includes(m.type()))
      phases.push({
        phase,
        type: m.type(),
        message: m.text(),
        location: m.location(),
      })
  }
  page.on('console', listener)
  const ids = [
    'threejs-02',
    ...[15, 16, 17, 18].map((n) => 'threejs-step-' + n),
  ].filter((id) => !unitId || unitId === id)
  for (const id of ids)
    for (const locale of ['ko', 'en']) {
      await page.setViewportSize({ width: 390, height: 900 })
      phase = { id, locale, source: 'navigation' }
      await page.goto(
        base + '/tests/browser/threejs-learning.html?learning#' + id,
      )
      await ready(page)
      const lang = page.getByRole('button', {
        name: locale === 'en' ? 'English' : '한국어',
        exact: true,
      })
      if (await lang.count()) await lang.click()
      await page.waitForTimeout(200)
      await page.evaluate((id) => {
        localStorage.removeItem('web-gl-study:unit:v1:' + id)
        localStorage.removeItem('web-gl-study:all:v1')
      }, id)
      await page.reload()
      await ready(page)
      const lesson = lessons.find((l) => l.unitId === id)
      assert.ok(lesson, id + ' missing')
      const n = id === 'threejs-02' ? 14 : Number(id.slice(-2))
      for (const step of lesson.steps)
        for (const kind of ['starter', 'solution']) {
          const meta = { unit: id, step: step.id, locale, source: kind }
          phase = meta
          console.log(id, locale, step.id, kind)
          await page.setViewportSize({ width: 390, height: 900 })
          await reading(page)
          const source = await loadSource(page, step.id, kind === 'solution')
          assert.match(source, new RegExp('lang="' + locale + '"'))
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
            probeResources(source),
            expressions[n],
          )
          await settle(frame)
          let a = await snapshot(frame)
          visible(a)
          inventory.push(meta)
          checks.push({ ...meta, initial: a })
          await page.setViewportSize({ width: 1440, height: 900 })
          await frame.waitForFunction(
            () => document.querySelector('canvas').clientWidth > 0,
          )
          if (n === 14) {
            if (kind === 'starter' && step.id.endsWith('loading')) {
              assert.equal(a.actual.status, 'error')
              await choose(frame, 'static')
              a = await snapshot(frame)
            }
            assert.equal(a.actual.coreIdentity, true)
            assert.equal(a.actual.meshes, 2)
            assert.equal(a.actual.sharedAtLoad, true)
            await frame.locator('#objects').selectOption('0')
            let left = await snapshot(frame)
            assert.equal(left.actual.selected, 'Left')
            assert.equal(left.actual.colors[0], 'f97316')
            assert.equal(
              left.actual.colors[1] === 'f97316',
              !a.actual.isolateMaterial,
            )
            await frame.locator('#objects').selectOption('1')
            let right = await snapshot(frame)
            assert.equal(right.actual.selected, 'Right')
            await frame.locator('#clear').click()
            let cleared = await snapshot(frame)
            assert.equal(cleared.actual.shared, true)
            assert.deepEqual(cleared.actual.colors, a.actual.colors)
            if (step.id.endsWith('selection')) {
              const [x, y] = a.actual.centers[0],
                canvas = frame.locator('canvas'),
                size = await canvas.evaluate((c) => ({
                  w: c.clientWidth,
                  h: c.clientHeight,
                }))
              await canvas.click({
                position: {
                  x: ((x + 1) / 2) * size.w,
                  y: ((1 - y) / 2) * size.h,
                },
              })
              const ray = await snapshot(frame)
              assert.equal(
                ray.actual.selected,
                a.actual.recursive ? 'Left' : null,
              )
              checks.push({ ...meta, ray })
            }
            if (kind === 'solution' && step.id.endsWith('loading')) {
              for (const asset of ['static', 'animated', 'empty', 'textured']) {
                await frame.locator('#file').setInputFiles({
                  name: asset + '.glb',
                  mimeType: 'model/gltf-binary',
                  buffer: makeGlb(asset),
                })
                await settle(frame)
                const assetState = await snapshot(frame)
                assert.equal(assetState.actual.status, 'ready')
                assert.equal(
                  assetState.actual.meshes,
                  asset === 'empty' ? 0 : 1,
                )
                assert.equal(
                  assetState.actual.textures,
                  asset === 'textured' ? 1 : 0,
                )
                checks.push({ ...meta, asset, actual: assetState })
              }
              const before = await snapshot(frame)
              await frame.locator('#file').setInputFiles({
                name: 'invalid.glb',
                buffer: Buffer.from('invalid'),
              })
              await settle(frame)
              const failed = await snapshot(frame)
              assert.equal(failed.actual.status, 'error')
              assert.equal(failed.sum, before.sum)
              await choose(frame, 'static')
              assert.equal((await snapshot(frame)).actual.status, 'ready')
              checks.push({ ...meta, failed })
            }
            if (kind === 'solution' && step.id.endsWith('loading')) {
              await rejectedFiles(frame, checks, meta)
              await choose(frame, 'textured')
              const embedded = await snapshot(frame)
              assert.equal(embedded.actual.meshes, 2)
              assert.equal(embedded.actual.textures, 1)
              assert.equal(embedded.actual.shared, true)
              await frame.locator('#objects').selectOption('0')
              const selected = await snapshot(frame)
              assert.equal(selected.actual.shared, false)
              await frame.locator('#clear').click()
              assert.equal((await snapshot(frame)).actual.shared, true)
              checks.push({
                ...meta,
                asset: 'embedded-textured',
                embedded,
                selected,
              })
              await choose(frame, 'static')
            }
            if (kind === 'starter' && step === lesson.steps[0]) {
              const edited = source.replace(
                "sample('invalid');",
                "sample('static');",
              )
              assert.notEqual(source, edited)
              frame = await instrument(
                page,
                probeResources(edited),
                expressions[n],
              )
              await settle(frame)
              assert.equal((await snapshot(frame)).actual.status, 'ready')
              checks.push({
                ...meta,
                source: 'editor-edit',
                actual: await snapshot(frame),
              })
            }
          }
          if (n === 15) {
            if (step.id.endsWith('empty')) {
              assert.equal(a.actual.empty, true)
              await choose(frame, 'static')
              const before = await snapshot(frame)
              await choose(frame, 'empty')
              const after = await snapshot(frame)
              if (a.actual.guardEmpty)
                assert.deepEqual(before.actual.camera, after.actual.camera)
              else
                assert.notDeepEqual(before.actual.camera, after.actual.camera)
              await choose(frame, 'offset')
            }
            await frame.locator('#value').fill('1.25')
            await frame.locator('#apply').click()
            const fitted = await snapshot(frame)
            assert.equal(
              await frame.locator('#value').evaluate((i) => i.checkValidity()),
              true,
            )
            if (kind === 'solution') {
              assert.deepEqual(fitted.actual.center, [40, -15, 3])
              assert.ok(Math.abs(fitted.actual.size[0] - 30.4) < 1e-5)
              assert.equal(fitted.actual.camera[0], 40)
              assert.ok(
                fitted.actual.ndc.every(
                  (p) =>
                    p.every((v) => Number.isFinite(v)) &&
                    Math.abs(p[0]) < 1 &&
                    Math.abs(p[1]) < 1 &&
                    Math.abs(p[2]) < 1,
                ),
              )
              assert.ok(fitted.pixels > 500)
            }
            if (kind === 'starter' && step === lesson.steps[0]) {
              const edited = source.replace(
                'const useCenter = false,',
                'const useCenter = true,',
              )
              assert.notEqual(edited, source)
              frame = await instrument(
                page,
                probeResources(edited),
                expressions[n],
              )
              await settle(frame)
              const edit = await snapshot(frame)
              assert.equal(edit.actual.camera[0], 40)
              assert.ok(edit.pixels > 500)
              checks.push({ ...meta, source: 'editor-edit', edit })
            }
            if (kind === 'solution' && step.id.endsWith('empty')) {
              const bytes = mutateGlb(
                makeGlb('static'),
                (j) => (j.nodes[0].scale = [0.0001, 0.0001, 0.0001]),
              )
              await frame
                .locator('#file')
                .setInputFiles({ name: 'tiny.glb', buffer: bytes })
              await settle(frame)
              const tiny = await snapshot(frame)
              assert.equal(tiny.actual.empty, false)
              assert.ok(tiny.actual.size[0] < 0.001)
              assert.ok(tiny.actual.camera.every(Number.isFinite))
              assert.ok(
                tiny.actual.near > 0 && tiny.actual.far > tiny.actual.near,
              )
              checks.push({ ...meta, tiny })
              await choose(frame, 'offset')
            }
            checks.push({ ...meta, fitted })
          }
          if (n === 16) {
            await frame.locator('#value').fill('4')
            await frame.locator('#damping').check()
            await frame.locator('#demand').check()
            await frame.locator('#apply').click()
            assert.equal((await snapshot(frame)).actual.target[0], 4)
            const first = await idleFrames(frame)
            const beforeDrag = await frame.evaluate(() =>
              globalThis.__renderProbe(),
            )
            await drag(frame, page)
            await frame.waitForTimeout(40)
            const moving = await snapshot(frame)
            assert.ok(moving.actual.frames > first + 1)
            assert.notDeepEqual(moving.actual.camera, beforeDrag.position)
            const last = await idleFrames(frame)
            assert.ok(last > moving.actual.frames)
            await frame.locator('#orbit').click()
            const orbit = await snapshot(frame)
            assert.notDeepEqual(orbit.actual.camera, moving.actual.camera)
            await idleFrames(frame)
            if (kind === 'starter' && step === lesson.steps[0]) {
              const edited = source.replace('value="0"', 'value="4"')
              assert.notEqual(edited, source)
              frame = await instrument(
                page,
                probeResources(edited),
                expressions[n],
              )
              await settle(frame)
              const edit = await snapshot(frame)
              assert.equal(edit.actual.target[0], 4)
              checks.push({ ...meta, source: 'editor-edit', edit })
            }
            checks.push({ ...meta, first, beforeDrag, moving, last, orbit })
          }
          if (n === 17) {
            if (step.id.endsWith('clips') && kind === 'starter') {
              assert.deepEqual(a.actual.clips, [])
              assert.equal(await frame.locator('#play').isDisabled(), true)
              await choose(frame, 'animated')
            }
            let playback = await snapshot(frame)
            assert.equal(playback.actual.rootIdentity, true)
            assert.equal(playback.actual.clips[0].duration, 1)
            await frame.locator('#play').click()
            await frame.waitForTimeout(140)
            const run = await snapshot(frame)
            assert.ok(run.actual.mixerTime > playback.actual.mixerTime)
            if (playback.actual.seconds) assert.ok(run.actual.delta < 1)
            else assert.ok(run.actual.delta > 1)
            await frame.locator('#pause').click()
            const paused = await snapshot(frame)
            await frame.waitForTimeout(100)
            const held = await snapshot(frame)
            assert.equal(paused.actual.x, held.actual.x)
            assert.equal(paused.actual.mixerTime, held.actual.mixerTime)
            await frame.locator('#stop').click()
            const stopped = await snapshot(frame)
            assert.equal(stopped.actual.mixerTime, 0)
            assert.ok(Math.abs(stopped.actual.x + 1.1) < 1e-5)
            await frame.locator('#value').fill('2')
            await frame.locator('#apply').click()
            assert.equal((await snapshot(frame)).actual.speed, 2)
            if (kind === 'solution' && step.id.endsWith('actions')) {
              const one = await measuredSpeed(frame, 1),
                two = await measuredSpeed(frame, 2)
              assert.ok(two.rate > one.rate * 1.5)
              checks.push({ ...meta, speedMeasurements: [one, two] })
            }
            if (kind === 'starter' && step.id.endsWith('time')) {
              const edited = source.replace(
                'const seconds = false;',
                'const seconds = true;',
              )
              assert.notEqual(edited, source)
              frame = await instrument(
                page,
                probeResources(edited),
                expressions[n],
              )
              await settle(frame)
              await frame.waitForTimeout(100)
              const edit = await snapshot(frame)
              assert.equal(edit.actual.seconds, true)
              assert.ok(edit.actual.delta < 1)
              checks.push({ ...meta, source: 'editor-edit', edit })
            }
            await choose(frame, 'static')
            assert.equal(await frame.locator('#play').isDisabled(), true)
            await choose(frame, 'animated')
            checks.push({ ...meta, run, paused, held, stopped })
          }
          if (n === 18) {
            await frame.locator('#transparent').check()
            await frame.locator('#depthWrite').uncheck()
            await frame.locator('#value').fill('0.45')
            await frame.locator('#apply').click()
            const blended = await snapshot(frame)
            assert.equal(blended.actual.opacity, 0.45)
            assert.equal(blended.actual.transparent, true)
            assert.equal(blended.actual.depthWrite, false)
            assert.equal(blended.actual.depthTest, true)
            if (step.id.endsWith('opacity')) {
              await frame.locator('#transparent').uncheck()
              await frame.locator('#apply').click()
              const opaque = await snapshot(frame)
              assert.notDeepEqual(opaque.halfHash, blended.halfHash)
              await frame.locator('#transparent').check()
              await frame.locator('#apply').click()
              checks.push({ ...meta, opaque, blended })
            }
            if (step.id.endsWith('depth-write')) {
              await frame.locator('#depthWrite').check()
              await frame.locator('#apply').click()
              const depth = await snapshot(frame)
              assert.notDeepEqual(depth.halfHash, blended.halfHash)
              await frame.locator('#depthWrite').uncheck()
              await frame.locator('#apply').click()
              checks.push({ ...meta, depth, blended })
            }
            if (step.id.endsWith('sorting')) {
              await frame.locator('#order').selectOption('red-last')
              await frame.locator('#apply').click()
              const redLast = await snapshot(frame)
              await frame.locator('#order').selectOption('blue-last')
              await frame.locator('#apply').click()
              const blueLast = await snapshot(frame)
              assert.notDeepEqual(redLast.halfHash, blueLast.halfHash)
              assert.deepEqual(blueLast.actual.order, [0, 1])
              checks.push({ ...meta, redLast, blueLast })
            }
            if (kind === 'starter' && step === lesson.steps[0]) {
              const edited = source.replace(
                '<input id="transparent" type="checkbox" />',
                '<input id="transparent" type="checkbox" checked />',
              )
              assert.notEqual(source, edited)
              frame = await instrument(
                page,
                probeResources(edited),
                expressions[n],
              )
              const edit = await snapshot(frame)
              assert.equal(edit.actual.transparent, true)
              assert.equal(edit.actual.blueTransparent, true)
              checks.push({ ...meta, source: 'editor-edit', edit })
            }
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
              if (n === 14) {
                await frame.locator('#objects').selectOption('0')
                assert.equal((await snapshot(frame)).actual.selected, 'Left')
                await frame.locator('#clear').click()
              }
              if (n === 15) {
                await frame.locator('#value').fill('1.25')
                await frame.locator('#apply').click()
                assert.ok(
                  (await snapshot(frame)).actual.ndc.every(
                    (p) => Math.abs(p[0]) < 1 && Math.abs(p[1]) < 1,
                  ),
                )
              }
              if (n === 16) {
                await frame.locator('#value').fill('4')
                await frame.locator('#apply').click()
                await frame.locator('#orbit').click()
                await idleFrames(frame)
              }
              if (n === 17) {
                await frame.locator('#value').fill('2')
                await frame.locator('#apply').click()
                await frame.locator('#play').click()
                await frame.waitForTimeout(80)
                await frame.locator('#pause').click()
                assert.equal((await snapshot(frame)).actual.playing, false)
              }
              if (n === 18) {
                await frame
                  .locator('#view')
                  .selectOption(width === 390 ? '2' : '0')
                await frame.locator('#apply').click()
                assert.equal(
                  (await snapshot(frame)).actual.camera[0],
                  width === 390 ? 2 : 0,
                )
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
              await frame.locator('canvas').screenshot({
                path:
                  process.env.THREEJS_EVIDENCE.replace(/\.json$/, '') +
                  '-' +
                  id +
                  '-' +
                  locale +
                  '-' +
                  width +
                  '-canvas.png',
              })
            }
          }
          if (n === 14 && kind === 'solution' && step.id.endsWith('loading')) {
            const bytes = makeGlb('textured')
            await frame
              .locator('#file')
              .setInputFiles({ name: 'cleanup-textured.glb', buffer: bytes })
            await settle(frame)
            assert.equal((await snapshot(frame)).actual.textures, 1)
          }
          const beforeCleanup = await snapshot(frame),
            selectionClone =
              n === 14 &&
              beforeCleanup.actual.selected &&
              beforeCleanup.actual.isolateMaterial
                ? 1
                : 0
          const cleanup = await frame.evaluate(
            async (pending) => {
              if (pending) {
                const transfer = new DataTransfer()
                transfer.items.add(
                  new File(
                    [Uint8Array.from(atob(pending), (c) => c.charCodeAt(0))],
                    'pending.glb',
                  ),
                )
                const input = document.querySelector('#file')
                input.files = transfer.files
                input.dispatchEvent(new Event('change'))
              }
              const result = globalThis.__remaining.cleanupSnapshot()
              await new Promise((resolve) => setTimeout(resolve, 150))
              return { ...result, resources: globalThis.__resourceProbe }
            },
            n === 14 && kind === 'solution' && step.id.endsWith('loading')
              ? makeGlb('textured').toString('base64')
              : null,
          )
          assert.equal(cleanup.disposed, cleanup.expected + selectionClone)
          assert.equal(cleanup.children, 0)
          for (const key of ['geometry', 'material', 'texture'])
            assert.equal(
              new Set(cleanup.resources[key]).size,
              cleanup.resources[key].length,
              'no double disposal ' + key,
            )
          if (n === 17) {
            assert.ok(cleanup.resources.mixerStops > 0)
            assert.ok(cleanup.resources.mixerUncache > 0)
          }
          assert.equal(
            cleanup.resources.closed,
            cleanup.resources.texture.length,
            'close each parsed ImageBitmap exactly once',
          )
          checks.push({ ...meta, cleanup })
        }
      if (n === 14) {
        phase = { unit: id, locale, source: 'backup-file-lifetime' }
        await persistence(page, locale, lesson, checks)
      }
      await page.evaluate((id) => {
        localStorage.removeItem('web-gl-study:unit:v1:' + id)
        localStorage.removeItem('web-gl-study:all:v1')
      }, id)
    }
  const expected = ids.flatMap((id) =>
    lessons
      .find((l) => l.unitId === id)
      .steps.flatMap((step) =>
        ['ko', 'en'].flatMap((locale) =>
          ['starter', 'solution'].map((source) => ({
            unit: id,
            step: step.id,
            locale,
            source,
          })),
        ),
      ),
  )
  assert.deepEqual(
    inventory.map((x) => JSON.stringify(x)).sort(),
    expected.map((x) => JSON.stringify(x)).sort(),
  )
  checks.push({ inventory })
  for (const entry of phases) {
    if (!/Not allowed to load local resource: blob:null\//.test(entry.message))
      continue
    const url = entry.message.match(/blob:null\/[^\s]+/)[0],
      created = assetURLs.find(
        (event) => event.action === 'create' && event.url === url,
      ),
      revoked = assetURLs.find(
        (event) => event.action === 'revoke' && event.url === url,
      )
    assert.ok(created && revoked, 'attribute the exact cancelled blob URL')
    assert.equal(created.mime, 'text/javascript')
    assert.equal(entry.phase.source, 'backup-file-lifetime')
    entry.classification =
      'revoked-runtime-module-during-backup-iframe-replacement'
    entry.urlEvidence = { created, revoked }
  }
  checks.push({ assetURLs })
  checks.push({ consolePhases: phases })
  page.off('console', listener)
  return checks
}
