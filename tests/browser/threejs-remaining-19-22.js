import assert from 'node:assert/strict'
import fs from 'node:fs'
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
const expressions = {
  20: '({selected,matrices:Array.from(instances.instanceMatrix.array),colors:[0,1,2].map(i=>{const c=new THREE.Color();instances.getColorAt(i,c);return c.getHexString()}),center:instances.boundingSphere.center.toArray(),radius:instances.boundingSphere.radius,picking:document.querySelector("#picking").checked,upload:document.querySelector("#upload").checked,bounds:document.querySelector("#bounds").checked})',
  21: '({mode:mesh.visible?"bounds":"lod",center:geometry.boundingSphere.center.toArray(),culling:mesh.frustumCulled,level:lod.getCurrentLevel(),distance:camera.position.distanceTo(lod.position),stats})',
  22: '({x:red.position.x,update:document.querySelector("#update").checked,overlay:document.querySelector("#overlay").checked,restore:document.querySelector("#restore").checked,screen:renderer.getRenderTarget()===null,viewport:renderer.getViewport(new THREE.Vector4()).toArray(),stats})',

  19: '({stats,mode:instances.visible,count:instances.count,version:instances.instanceMatrix.version,x:instances.instanceMatrix.array[12],positions:meshes.map(m=>m.position.toArray()),matrices:Array.from(instances.instanceMatrix.array)})',
}
async function clickWorld(frame, page, x) {
  await frame.locator('canvas').scrollIntoViewIfNeeded()
  await frame.evaluate(
    () =>
      new Promise((resolve) =>
        requestAnimationFrame(() => requestAnimationFrame(resolve)),
      ),
  )
  const point = await frame.evaluate((x) => globalThis.__task5.project(x), x)
  const box = await frame.locator('canvas').boundingBox()
  await page.mouse.click(
    box.x + ((point[0] + 1) * box.width) / 2,
    box.y + ((1 - point[1]) * box.height) / 2,
  )
}
function probe(source, n) {
  let extra = ''
  if (n === 20)
    extra =
      'globalThis.__task5={project(x){camera.updateMatrixWorld();return new THREE.Vector3(x,0,0).project(camera).toArray();}};'
  if (n === 22)
    extra = `globalThis.__task5={targetPixels(){const bytes=new Uint8Array(128*128*4);renderer.readRenderTargetPixels(target,0,0,128,128,bytes);let hash=2166136261,redPixels=0,bluePixels=0;for(const v of bytes)hash=Math.imul(hash^v,16777619)>>>0;for(let i=0;i<bytes.length;i+=4){if(bytes[i]>160&&bytes[i]>bytes[i+2]*1.5)redPixels++;if(bytes[i+2]>160&&bytes[i+2]>bytes[i]*1.5)bluePixels++;}return {hash,redPixels,bluePixels};},restoreProbe(){const sentinel=new THREE.WebGLRenderTarget(64,64);renderer.setRenderTarget(sentinel);renderer.setViewport(7,9,31,35);renderer.setScissor(3,5,21,23);renderer.setScissorTest(true);const pack=s=>({face:s.face,mip:s.mip,viewport:s.viewport.toArray(),scissor:s.scissor.toArray(),test:s.test});const before=pack(state());renderMap();const after=pack(state()),sameTarget=renderer.getRenderTarget()===sentinel;renderer.setRenderTarget(null);sentinel.dispose();draw();return {before,after,sameTarget};}};`
  return source.replace('</script>', extra + '</script>').replace(
    "import * as THREE from 'three';",
    `import * as THREE from 'three';
const resourceProbe={geometry:[],material:[],target:[],instance:[]};globalThis.__resourceProbe=resourceProbe;for(const [name,p]of [['geometry',THREE.BufferGeometry.prototype],['material',THREE.Material.prototype],['target',THREE.WebGLRenderTarget.prototype],['instance',THREE.InstancedMesh.prototype]]){const original=p.dispose;p.dispose=function(){resourceProbe[name].push(this.uuid??this.texture.uuid);return original.call(this)}};`,
  )
}

export async function runGroup(page, base, unitId) {
  const checks = [],
    inventory = [],
    assetURLs = [],
    consolePhases = []
  let phase = 'setup'
  await page.exposeBinding('__task5URL', (_source, event) =>
    assetURLs.push({
      ...event,
      phase,
      receivedAt: Date.now(),
      frameURL: _source.frame.url(),
      ownerFrame: _source.frame === page.mainFrame() ? 'main' : 'iframe',
    }),
  )
  await page.addInitScript(() => {
    const create = URL.createObjectURL.bind(URL),
      revoke = URL.revokeObjectURL.bind(URL)
    URL.createObjectURL = (blob) => {
      const url = create(blob)
      void globalThis.__task5URL({
        action: 'create',
        url,
        mime: blob.type,
        at: Date.now(),
        documentURL: location.href,
      })
      return url
    }
    URL.revokeObjectURL = (url) => {
      void globalThis.__task5URL({
        action: 'revoke',
        url,
        at: Date.now(),
        documentURL: location.href,
      })
      return revoke(url)
    }
  })
  const listener = (m) => {
    if (['warning', 'error'].includes(m.type()))
      consolePhases.push({
        phase,
        at: Date.now(),
        type: m.type(),
        message: m.text(),
        location: m.location(),
      })
  }
  page.on('console', listener)

  for (const n of [19, 20, 21, 22]) {
    const id = 'threejs-step-' + n
    if (unitId && unitId !== id) continue
    const lesson = lessons.find((l) => l.unitId === id)
    assert.ok(lesson, id + ' missing HTML learning experiment')
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
      await page.waitForTimeout(200)
      await page.evaluate((id) => {
        localStorage.removeItem('web-gl-study:unit:v1:' + id)
        localStorage.removeItem('web-gl-study:all:v1')
      }, id)
      await page.reload()
      await ready(page)
      for (const step of lesson.steps)
        for (const kind of ['starter', 'solution']) {
          phase = { unit: id, locale, step: step.id, source: kind }
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
          checks.push({
            unit: id,
            locale,
            step: step.id,
            source: kind,
            rawOutput: await raw.locator('output').textContent(),
          })
          let frame = await instrument(page, probe(source, n), expressions[n])
          const a = await snapshot(frame)
          visible(a)
          const meta = { unit: id, locale, step: step.id, source: kind }
          inventory.push(meta)
          if (n === 19) {
            assert.equal(
              a.actual.mode,
              (await frame.locator('#mode').inputValue()) === 'instances',
            )
            assert.equal(
              a.actual.count,
              Number(await frame.locator('#count').inputValue()),
            )
            await frame.locator('#count').fill('500')
            await frame.locator('#mode').selectOption('mesh')
            await frame.locator('#apply').click()
            const mesh = await snapshot(frame)
            await frame.locator('#mode').selectOption('instances')
            await frame.locator('#apply').click()
            const inst = await snapshot(frame)
            assert.equal(mesh.actual.stats.calls, 500)
            assert.equal(inst.actual.stats.calls, 1)
            assert.equal(mesh.actual.stats.triangles, 6000)
            assert.equal(inst.actual.stats.triangles, 6000)
            assert.deepEqual(mesh.halfHash, inst.halfHash)
            for (let i = 0; i < 500; i++)
              assert.ok(
                Math.abs(
                  inst.actual.positions[i][0] -
                    inst.actual.matrices[i * 16 + 12],
                ) < 1e-6,
              )
            await frame.locator('#upload').uncheck()
            const before = await snapshot(frame)
            await frame.locator('#value').fill('0.8')
            await frame.locator('#apply').click()
            const stale = await snapshot(frame)
            assert.ok(Math.abs(stale.actual.x + 1.6) < 1e-6)
            assert.equal(stale.actual.version, before.actual.version)
            assert.deepEqual(stale.halfHash, before.halfHash)
            await frame.locator('#upload').check()
            await frame.locator('#apply').click()
            const moved = await snapshot(frame)
            assert.notDeepEqual(moved.halfHash, stale.halfHash)
            checks.push({ ...meta, mesh, inst, stale, moved })
            if (kind === 'starter' && step === lesson.steps[0]) {
              const edited = source.replace('value="500"', 'value="250"')
              assert.notEqual(edited, source)
              frame = await instrument(page, probe(edited, n), expressions[n])
              const edit = await snapshot(frame)
              assert.equal(edit.actual.count, 250)
              assert.equal(edit.actual.stats.triangles, 3000)
              checks.push({ ...meta, editor: edit })
            }
          }
          if (n === 20) {
            assert.equal(
              a.actual.picking,
              await frame.locator('#picking').isChecked(),
            )
            assert.equal(
              a.actual.upload,
              await frame.locator('#upload').isChecked(),
            )
            assert.equal(
              a.actual.bounds,
              await frame.locator('#bounds').isChecked(),
            )

            assert.deepEqual(
              [
                a.actual.matrices[12],
                a.actual.matrices[28],
                a.actual.matrices[44],
              ],
              [-1.5, 0, 1.5],
            )
            assert.deepEqual(a.actual.colors, ['2563eb', '2563eb', '2563eb'])
            if (!(await frame.locator('#picking').isChecked())) {
              await clickWorld(frame, page, 0)
              assert.equal((await snapshot(frame)).actual.selected, null)
            }
            if (kind === 'starter' && step.id.endsWith('update')) {
              await clickWorld(frame, page, 0)
              const old = await snapshot(frame)
              assert.equal(
                old.actual.selected,
                1,
                'select center before missing-upload experiment',
              )
              assert.equal(
                await frame.locator('#value').inputValue(),
                '4',
                'initial assigned X target',
              )
              await frame.locator('#apply').click()
              const cpu = await snapshot(frame)
              assert.equal(cpu.actual.matrices[28], 4)
              assert.equal(cpu.actual.colors[1], 'ef4444')
              assert.deepEqual(cpu.halfHash, old.halfHash)
              await frame.locator('#upload').check()
              await frame.locator('#apply').click()
              const gpu = await snapshot(frame)
              assert.notDeepEqual(gpu.halfHash, cpu.halfHash)
              checks.push({ ...meta, uploadMissing: { old, cpu, gpu } })
            }

            await frame.locator('#picking').check()
            await frame.locator('#upload').check()
            await frame.locator('#bounds').uncheck()
            await frame.locator('#reset').click()
            await clickWorld(frame, page, 0)
            assert.equal((await snapshot(frame)).actual.selected, 1)
            await frame.locator('#value').fill('4')
            await frame.locator('#apply').click()
            const moved = await snapshot(frame)
            assert.equal(moved.actual.matrices[28], 4)
            assert.equal(moved.actual.colors[1], 'ef4444')
            assert.equal(moved.actual.matrices[12], -1.5)
            assert.equal(moved.actual.matrices[44], 1.5)
            await clickWorld(frame, page, 4)
            const stale = await snapshot(frame)
            assert.equal(stale.actual.selected, null)
            await frame.locator('#bounds').check()
            await frame.locator('#reset').click()
            await clickWorld(frame, page, 0)
            await frame.locator('#apply').click()
            await clickWorld(frame, page, 4)
            const fresh = await snapshot(frame)
            assert.equal(fresh.actual.selected, 1)
            assert.ok(fresh.actual.radius > stale.actual.radius)
            assert.notDeepEqual(fresh.actual.center, stale.actual.center)
            await clickWorld(frame, page, 0)
            assert.equal((await snapshot(frame)).actual.selected, null)
            checks.push({ ...meta, moved, stale, fresh })
            if (kind === 'starter' && step === lesson.steps[0]) {
              const edited = source.replace('value="4"', 'value="3"')
              assert.notEqual(edited, source)
              frame = await instrument(page, probe(edited, n), expressions[n])
              await frame.locator('#picking').check()
              await clickWorld(frame, page, 0)
              await frame.locator('#apply').click()
              const edit = await snapshot(frame)
              assert.equal(edit.actual.matrices[28], 3)
              checks.push({ ...meta, editor: edit })
            }
          }
          if (n === 21) {
            assert.equal(
              a.actual.culling,
              await frame.locator('#culling').isChecked(),
            )
            assert.equal(
              a.actual.mode,
              await frame.locator('#mode').inputValue(),
            )
            assert.equal(
              a.actual.distance,
              Number(await frame.locator('#value').inputValue()),
            )
            assert.equal(
              a.actual.center[0],
              (await frame.locator('#bounds').isChecked()) ? 8 : 0,
            )
            await frame.locator('#mode').selectOption('bounds')
            await frame.locator('#bounds').uncheck()
            await frame.locator('#culling').check()
            await frame.locator('#value').fill('4')
            await frame.locator('#apply').click()
            const stale = await snapshot(frame)
            assert.equal(stale.actual.stats.calls, 0)
            await frame.locator('#culling').uncheck()
            await frame.locator('#apply').click()
            const bypass = await snapshot(frame)
            assert.ok(bypass.actual.stats.calls > 0)
            assert.notDeepEqual(bypass.halfHash, stale.halfHash)
            await frame.locator('#culling').check()
            await frame.locator('#bounds').check()
            await frame.locator('#apply').click()
            const fresh = await snapshot(frame)
            assert.deepEqual(fresh.halfHash, bypass.halfHash)
            assert.equal(fresh.actual.center[0], 8)
            await frame.locator('#mode').selectOption('lod')
            await frame.locator('#apply').click()
            const near = await snapshot(frame)
            await frame.locator('#value').fill('12')
            await frame.locator('#apply').click()
            const far = await snapshot(frame)
            assert.equal(near.actual.level, 0)
            assert.equal(far.actual.level, 1)
            assert.equal(near.actual.stats.triangles, 180)
            assert.equal(far.actual.stats.triangles, 20)
            assert.notDeepEqual(near.halfHash, far.halfHash)
            checks.push({ ...meta, stale, bypass, fresh, near, far })
            if (kind === 'starter' && step === lesson.steps[0]) {
              const edited = source.replace(
                '<input id="bounds" type="checkbox" />',
                '<input id="bounds" type="checkbox" checked />',
              )
              assert.notEqual(edited, source)
              frame = await instrument(page, probe(edited, n), expressions[n])
              const edit = await snapshot(frame)
              assert.equal(edit.actual.center[0], 8)
              assert.equal(edit.actual.stats.calls, 1)
              checks.push({ ...meta, editor: edit })
            }
          }
          if (n === 22) {
            assert.equal(a.actual.screen, !a.actual.update || a.actual.restore)

            assert.equal(
              a.actual.x,
              Number(await frame.locator('#value').inputValue()),
            )
            for (const field of ['update', 'overlay', 'restore'])
              assert.equal(
                a.actual[field],
                await frame.locator('#' + field).isChecked(),
              )
            await frame.locator('#restore').check()
            await frame.locator('#update').check()
            await frame.locator('#overlay').check()
            await frame.locator('#value').fill('1.5')
            await frame.locator('#apply').click()
            const right = await snapshot(frame)
            const targetRight = await frame.evaluate(() =>
              globalThis.__task5.targetPixels(),
            )
            assert.ok(
              targetRight.redPixels > 0 && targetRight.bluePixels > 0,
              'both cubes remain visible in minimap at assigned X=1.5',
            )
            await frame.locator('#update').uncheck()
            await frame.locator('#value').fill('-1.5')
            await frame.locator('#apply').click()
            const frozen = await snapshot(frame)
            assert.notDeepEqual(frozen.halfHash, right.halfHash)
            assert.deepEqual(
              await frame.evaluate(() => globalThis.__task5.targetPixels()),
              targetRight,
            )
            await frame.locator('#update').check()
            await frame.locator('#apply').click()
            const targetLeft = await frame.evaluate(() =>
              globalThis.__task5.targetPixels(),
            )
            assert.notDeepEqual(targetRight, targetLeft)
            await frame.locator('#overlay').uncheck()
            await frame.locator('#apply').click()
            const noMap = await snapshot(frame)
            await frame.locator('#overlay').check()
            await frame.locator('#apply').click()
            const map = await snapshot(frame)
            assert.notDeepEqual(map.halfHash, noMap.halfHash)
            const restored = await frame.evaluate(() =>
              globalThis.__task5.restoreProbe(),
            )
            assert.deepEqual(restored.before, restored.after)
            assert.equal(restored.sameTarget, true)
            checks.push({
              ...meta,
              right,
              frozen,
              targetRight,
              targetLeft,
              noMap,
              map,
              restored,
            })
            if (kind === 'starter' && step === lesson.steps[0]) {
              const edited = source.replace('value="0"', 'value="1.5"')
              assert.notEqual(edited, source)
              frame = await instrument(page, probe(edited, n), expressions[n])
              const edit = await snapshot(frame)
              assert.equal(edit.actual.x, 1.5)
              checks.push({ ...meta, editor: edit })
            }
          }

          for (const width of [1440, 390]) {
            await page.setViewportSize({ width, height: 900 })
            await preview(page)
            await frame.waitForFunction(() => {
              const c = document.querySelector('canvas'),
                s = document.querySelector('#stage')
              return c.width === s.clientWidth && s.clientWidth > 0
            })
            visible(await snapshot(frame))
            assert.ok(
              await page.evaluate(
                () => document.documentElement.scrollWidth <= innerWidth,
              ),
            )
            if (kind === 'solution' && step === lesson.steps.at(-1)) {
              if (n === 19) {
                await frame
                  .locator('#value')
                  .fill(width === 390 ? '0.4' : '0.8')
                await frame.locator('#apply').click()
                assert.ok(
                  Math.abs(
                    (await snapshot(frame)).actual.x -
                      (width === 390 ? -2 : -1.6),
                  ) < 1e-6,
                )
              }
              if (n === 20) {
                await frame.locator('#reset').click()
                await clickWorld(frame, page, 0)
                await frame.locator('#apply').click()
                await clickWorld(frame, page, 4)
                assert.equal((await snapshot(frame)).actual.selected, 1)
              }
              if (n === 21) {
                await frame.locator('#value').fill(width === 390 ? '12' : '4')
                await frame.locator('#apply').click()
                assert.equal(
                  (await snapshot(frame)).actual.stats.triangles,
                  width === 390 ? 20 : 180,
                )
              }
              if (n === 22) {
                await frame
                  .locator('#value')
                  .fill(width === 390 ? '-1.5' : '1.5')
                await frame.locator('#apply').click()
                assert.equal(
                  (await snapshot(frame)).actual.x,
                  width === 390 ? -1.5 : 1.5,
                )
              }

              await page.screenshot({
                path:
                  process.env.THREEJS_EVIDENCE.replace(/\.json$/, '') +
                  '-' +
                  n +
                  '-' +
                  locale +
                  '-' +
                  width +
                  '.png',
              })
              await frame.locator('canvas').screenshot({
                path:
                  process.env.THREEJS_EVIDENCE.replace(/\.json$/, '') +
                  '-' +
                  n +
                  '-' +
                  locale +
                  '-' +
                  width +
                  '-canvas.png',
              })
            }
          }
          const resources = await frame.evaluate(() =>
            structuredClone(globalThis.__resourceProbe),
          )
          const clean = await frame.evaluate(() =>
            globalThis.__remaining.cleanupSnapshot(),
          )
          assert.equal(clean.disposed, clean.expected)
          assert.equal(clean.children, 0)
          const resourcesAfter = await frame.evaluate(
            () => globalThis.__resourceProbe,
          )
          for (const [type, list] of Object.entries(resourcesAfter))
            assert.equal(
              new Set(list).size,
              list.length,
              'no double dispose ' + type,
            )
          assert.ok(resourcesAfter.geometry.length > 0)
          assert.ok(resourcesAfter.material.length > 0)
          if (n === 19 || n === 20)
            assert.equal(resourcesAfter.instance.length, 1)
          if (n === 22)
            assert.equal(
              resourcesAfter.target.length,
              resources.target.length + 1,
            )
          checks.push({ ...meta, clean, resourcesAfter })
        }
      await page.evaluate(
        (id) => localStorage.removeItem('web-gl-study:unit:v1:' + id),
        id,
      )
    }
  }
  const expected = [19, 20, 21, 22]
    .filter((n) => !unitId || unitId === 'threejs-step-' + n)
    .flatMap((n) =>
      lessons
        .find((l) => l.unitId === 'threejs-step-' + n)
        .steps.flatMap((step) =>
          ['ko', 'en'].flatMap((locale) =>
            ['starter', 'solution'].map((source) => ({
              unit: 'threejs-step-' + n,
              locale,
              step: step.id,
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
  checks.push({ assetURLs, consolePhases })
  page.off('console', listener)
  return checks
}
