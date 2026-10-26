import assert from 'node:assert/strict'

const document = (code) =>
  '<!doctype html><html lang="ko" data-html="keep-html"><head data-head="keep-head"><title>보존 검사</title><meta name="probe" content="keep-meta"><style>body{color:red}html:has(>head>title:first-child)>body{color:rgb(12,34,56)}</style></head><body data-body="keep-body"><canvas></canvas>' +
  code +
  '</body></html>'
const structure =
  'html:document.documentElement.dataset.html,head:document.head.dataset.head,body:document.body.dataset.body,lang:document.documentElement.lang,title:document.title,meta:document.querySelector("meta[name=probe]").content,color:getComputedStyle(document.body).color,nodes:[...document.head.children].map(n=>n.tagName)'
const cube = `import * as T from 'three';import {OrbitControls} from 'three/addons/controls/OrbitControls.js';window.order.push('module1');const camera=new T.PerspectiveCamera(60,2,.1,100);camera.position.z=5;const renderer=new T.WebGLRenderer({canvas:document.querySelector('canvas'),preserveDrawingBuffer:true});renderer.setSize(320,160,false);const controls=new OrbitControls(camera,renderer.domElement);const scene=new T.Scene();scene.add(new T.Mesh(new T.BoxGeometry(),new T.MeshBasicMaterial({color:0x00ff00})));renderer.render(scene,camera);const gl=renderer.getContext(),pixel=new Uint8Array(4);gl.readPixels(160,80,1,1,gl.RGBA,gl.UNSIGNED_BYTE,pixel);console.log(JSON.stringify({same:controls.object instanceof T.Object3D,constructorSame:controls.object.constructor===T.PerspectiveCamera,revision:T.REVISION,pixel:[...pixel],calls:renderer.info.render.calls,${structure}}));controls.dispose();renderer.dispose();`
const cases = {
  cube: document(
    `<script>window.order=['classic1']</script><script type="module">${cube}</script><script type="module">window.order.push('module2');console.log(window.order)</script>`,
  ),
  plainStructure: document(
    `<script>console.log(JSON.stringify({${structure}}))</script>`,
  ),
  sourceError:
    '<!doctype html>\n<html>\n<head data-head="keep">\n<title>error</title>\n</head>\n<body>\n<script>\nmissingKnownSource();\n</script>\n</body></html>',
  crlfError:
    '<!doctype html>\r\n<head>\r\n<script>\r\nmissingCrlfSource();\r\n</script>',
  unsupported: document(
    '<script type="module">import "three/addons/unsupported.js"</script>',
  ),
  rejection: document('<script>Promise.reject(new Error("REJECTED"))</script>'),
  lateError: document(
    '<script>setTimeout(()=>{throw new Error("LATE_ERROR")},30)</script>',
  ),
  network: document(
    '<script>fetch("https://example.com/task2-never-send").then(()=>console.log("UNEXPECTED")).catch(e=>console.log(e.message));try{parent.document.title;console.log("UNEXPECTED")}catch(e){console.log(e.name)};addEventListener("securitypolicyviolation",e=>console.log(e.effectiveDirective))</script>',
  ),
  fragment:
    '<!--keep--><style>p{color:rgb(12,34,56)}</style><p>fragment<script>console.log(getComputedStyle(document.querySelector("p")).color)</script>',
  malformed:
    '\ufeff<!doctype html><html lang="ko" data-html="keep"><head data-head="keep"><title>broken</title><script>console.log(document.head.dataset.head)</script><body data-body="keep"><p>recovered',
  inert: document(
    '<template><script>throw new Error("INERT")</script></template>',
  ),
  emptyMap: document('<script type="importmap">{}</script>'),
  noncollision: document(
    '<script type="importmap">{"imports":{"local":"blob:user"}}</script>',
  ),
  collision: document(
    '<script type="importmap">{"imports":{"three":"blob:other"}}</script>',
  ),
  scopedCollision: document(
    '<script type="importmap">{"scopes":{"blob:":{"three/addons/":"blob:other/"}}}</script>',
  ),
  absentModules: document(
    '<script type="importmap">{"imports":{"three":"blob:user"}}</script>',
  ),
  invalid: document('<script type="importmap">{bad</script>'),
  invalidKo: document('<script type="importmap">{bad</script>'),
}

/** Task 2 producer contracts, sharing the caller's owned server/browser/deadline. */
export async function runHtmlRuntimeFixtures(page, base) {
  await page.goto(base + '/tests/browser/html-runtime.html')
  await page.waitForFunction(() => window.makeHtmlPreview)
  const evidence = {}
  for (const [name, source] of Object.entries(cases)) {
    await page.evaluate(
      ({ name, source }) => {
        document.querySelector('iframe')?.remove()
        window.runtimeMessages = []
        const frame = document.createElement('iframe')
        frame.sandbox = 'allow-scripts'
        frame.srcdoc = window.makeHtmlPreview(
          source,
          'fixture',
          name === 'invalidKo' ? 'ko' : 'en',
          ['plainStructure', 'absentModules'].includes(name)
            ? {}
            : window.previewModules,
        )
        document.body.append(frame)
      },
      { name, source },
    )
    await page.waitForFunction(() =>
      window.runtimeMessages.some(
        (m) => m.status === 'ready' || m.status === 'error',
      ),
    )
    if (['rejection', 'lateError'].includes(name))
      await page.waitForFunction(() =>
        window.runtimeMessages.some((m) => m.status === 'error'),
      )
    if (name === 'network')
      await page.waitForFunction(() =>
        ['Failed to fetch', 'SecurityError', 'connect-src'].every((text) =>
          window.runtimeMessages.some((m) => m.message === text),
        ),
      )
    await page.evaluate(() =>
      document
        .querySelector('iframe')
        .contentWindow.postMessage(
          { type: 'study-dispose', token: 'wrong' },
          '*',
        ),
    )
    await page.waitForTimeout(30)
    assert.equal(
      await page.evaluate(() =>
        window.runtimeMessages.some((m) => m.status === 'disposed'),
      ),
      false,
      name + ' wrong-token dispose',
    )
    await page.evaluate(() =>
      document
        .querySelector('iframe')
        .contentWindow.postMessage(
          { type: 'study-dispose', token: 'fixture' },
          '*',
        ),
    )
    await page.waitForFunction(() =>
      window.runtimeMessages.some((m) => m.status === 'disposed'),
    )
    await page.evaluate(() =>
      document
        .querySelector('iframe')
        .contentWindow.postMessage(
          { type: 'study-dispose', token: 'fixture' },
          '*',
        ),
    )
    await page.waitForTimeout(20)
    evidence[name] = await page.evaluate(() => window.runtimeMessages)
    assert.equal(
      evidence[name].filter((m) => m.status === 'disposed').length,
      1,
      name + ' one ACK',
    )
  }
  const messages = (name) =>
    evidence[name].filter((m) => m.status !== 'disposed')
  const statuses = (name) => messages(name).map((m) => m.status)
  const logs = (name) =>
    messages(name)
      .filter((m) => m.status === 'console')
      .map((m) => m.message)
  for (const name of ['cube', 'plainStructure']) {
    const observed = JSON.parse(logs(name)[0])
    for (const [key, value] of Object.entries({
      html: 'keep-html',
      head: 'keep-head',
      body: 'keep-body',
      lang: 'ko',
      title: '보존 검사',
      meta: 'keep-meta',
      color: 'rgb(12, 34, 56)',
    }))
      assert.equal(observed[key], value, name + ' ' + key)
    assert.deepEqual(observed.nodes, ['TITLE', 'META', 'STYLE'])
  }
  const rendered = JSON.parse(logs('cube')[0])
  assert.equal(rendered.same, true)
  assert.equal(rendered.constructorSame, true)
  assert.equal(rendered.revision, '186')
  assert.equal(rendered.calls, 1)
  assert.deepEqual(rendered.pixel, [0, 255, 0, 255])
  assert.equal(logs('cube')[1], '["classic1","module1","module2"]')
  assert.deepEqual(statuses('cube'), ['console', 'console', 'ready'])
  for (const [name, line] of [
    ['sourceError', 8],
    ['crlfError', 4],
  ]) {
    assert.deepEqual(statuses(name), ['error'])
    assert.equal(messages(name)[0].line, line)
    assert.equal(messages(name)[0].column, 1)
  }
  assert.deepEqual(statuses('unsupported'), ['error'])
  assert.equal(messages('unsupported')[0].line, undefined)
  assert.equal(messages('unsupported')[0].column, undefined)
  for (const name of ['rejection', 'lateError'])
    assert.deepEqual(statuses(name), ['ready', 'error'])
  assert.ok(!logs('network').includes('UNEXPECTED'))
  assert.equal(logs('fragment')[0], 'rgb(12, 34, 56)')
  assert.equal(logs('malformed')[0], 'keep')
  for (const name of ['inert', 'emptyMap', 'noncollision', 'absentModules'])
    assert.deepEqual(statuses(name), ['ready'])
  for (const name of ['collision', 'scopedCollision']) {
    assert.deepEqual(statuses(name), ['error'])
    assert.match(messages(name)[0].message, /User import map conflicts/)
  }
  assert.match(messages('invalid')[0].message, /User import map is invalid/)
  assert.match(
    messages('invalidKo')[0].message,
    /사용자 import map이 올바르지 않습니다/,
  )
  return evidence
}
