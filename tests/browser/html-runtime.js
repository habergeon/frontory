import assert from 'node:assert/strict'
import { glbData } from './gltf-fixtures.mjs'

const document = (code) =>
  '<!doctype html><html lang="ko" data-html="keep-html"><head data-head="keep-head"><title>보존 검사</title><meta name="probe" content="keep-meta"><style>body{color:red}html:has(>head>title:first-child)>body{color:rgb(12,34,56)}</style></head><body data-body="keep-body"><canvas></canvas>' +
  code +
  '</body></html>'
const structure =
  'html:document.documentElement.dataset.html,head:document.head.dataset.head,body:document.body.dataset.body,lang:document.documentElement.lang,title:document.title,meta:document.querySelector("meta[name=probe]").content,color:getComputedStyle(document.body).color,nodes:[...document.head.children].map(n=>n.tagName)'
const cube = `import * as T from 'three';import {OrbitControls} from 'three/addons/controls/OrbitControls.js';window.order.push('module1');const camera=new T.PerspectiveCamera(60,2,.1,100);camera.position.z=5;const renderer=new T.WebGLRenderer({canvas:document.querySelector('canvas'),preserveDrawingBuffer:true});renderer.setSize(320,160,false);const controls=new OrbitControls(camera,renderer.domElement);const scene=new T.Scene();scene.add(new T.Mesh(new T.BoxGeometry(),new T.MeshBasicMaterial({color:0x00ff00})));renderer.render(scene,camera);const gl=renderer.getContext(),pixel=new Uint8Array(4);gl.readPixels(160,80,1,1,gl.RGBA,gl.UNSIGNED_BYTE,pixel);console.log(JSON.stringify({same:controls.object instanceof T.Object3D,constructorSame:controls.object.constructor===T.PerspectiveCamera,revision:T.REVISION,pixel:[...pixel],calls:renderer.info.render.calls,${structure}}));controls.dispose();renderer.dispose();`
const gltf = `<input type="file" accept=".glb" aria-label="Model"><button id="recover">Sample</button><output id="state">loading</output>
<script type="module">
import * as T from 'three';
import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';
const data=${JSON.stringify(glbData)};
const revoked=[],revoke=URL.revokeObjectURL.bind(URL);
URL.revokeObjectURL=url=>{revoked.push(url);revoke(url)};
const bytes=kind=>Uint8Array.from(atob(data[kind]),c=>c.charCodeAt(0));
const loader=new GLTFLoader(),state=document.querySelector('#state');
const owned=[];
const parse=async buffer=>{const result=await loader.parseAsync(buffer,'');owned.push(result);return result};
const describe=result=>{let meshes=0,same=result.scene instanceof T.Group;result.scene.traverse(o=>{if(o.isMesh){meshes++;same&&=o instanceof T.Mesh}});return {meshes,same,clips:result.animations.length,empty:new T.Box3().setFromObject(result.scene).isEmpty()}};
const results={};
for(const kind of ['static','animated','empty','textured']) {
  const model=await parse(bytes(kind).buffer);
  results[kind]=describe(model);
  if(kind==='animated') {
    const mixer=new T.AnimationMixer(model.scene);
    mixer.clipAction(model.animations[0]).play();mixer.update(.5);
    results[kind].x=model.scene.getObjectByName('Triangle').position.x;
    mixer.stopAllAction();mixer.uncacheRoot(model.scene);
  }
  if(kind==='textured') {
    const image=model.scene.getObjectByName('Triangle').material.map.image;
    const canvas=document.createElement('canvas');canvas.width=image.width;canvas.height=image.height;
    const ctx=canvas.getContext('2d');ctx.drawImage(image,0,0);
    results[kind].image={width:image.width,height:image.height,pixels:[...ctx.getImageData(0,0,2,2).data]};
  }
}
// Exercise both FileLoader fetch schemes, in addition to ArrayBuffer parsing.
const url=URL.createObjectURL(new Blob([bytes('static')],{type:'model/gltf-binary'}));
try{const result=await loader.loadAsync(url);owned.push(result);results.blob=describe(result)}finally{URL.revokeObjectURL(url)}
const result=await loader.loadAsync('data:model/gltf-binary;base64,'+data.static);owned.push(result);results.data=describe(result);
const assetRevokes=revoked.length;
let cleaned=false;
document.querySelector('input').onchange=async event=>{
  try{await parse(await event.target.files[0].arrayBuffer());state.textContent='loaded'}catch(error){state.textContent='failed';console.log('file-error:'+error.message)}
};
document.querySelector('#recover').onclick=async()=>{const result=await parse(bytes('static').buffer);state.textContent='recovered:'+describe(result).meshes};
addEventListener('message',event=>{
  if(cleaned||event.source!==parent||event.data?.type!=='study-dispose'||event.data.token!=='fixture')return;
  cleaned=true;
  const geometries=new Set(),materials=new Set(),textures=new Set(),images=new Set();
  for(const model of owned)model.scene.traverse(o=>{if(o.isMesh){geometries.add(o.geometry);for(const material of Array.isArray(o.material)?o.material:[o.material]){materials.add(material);if(material.map){textures.add(material.map);images.add(material.map.image)}}}});
  geometries.forEach(g=>g.dispose());materials.forEach(m=>m.dispose());textures.forEach(t=>t.dispose());images.forEach(i=>i.close?.());
  parent.postMessage({token:'fixture',status:'asset-cleanup',message:JSON.stringify({moduleUrls:revoked.length-assetRevokes,geometries:geometries.size,materials:materials.size,textures:textures.size,images:images.size})},'*');
});
state.textContent='loaded';console.log('gltf-results:'+JSON.stringify(results));
</script>`
const network = `<script>
addEventListener('securitypolicyviolation',e=>console.log('blocked:'+e.blockedURI));
Promise.all([
  'https://example.com/task1-never-send',
  'http://example.com/task1-never-send',
  '__SELF_ORIGIN__/task1-never-send',
  'data:text/plain,local',
].map(async url=>{try{await fetch(url);console.log('fetched:'+url)}catch{console.log('rejected:'+url)}})).then(()=>console.log('network-complete'));
try{parent.document.title;console.log('UNEXPECTED')}catch(e){console.log(e.name)};
</script>`
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
  network: document(network),
  plainNetwork: document(network),
  gltf: document(gltf),
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
  gltfCollision: document(
    '<script type="importmap">{"imports":{"three/addons/loaders/GLTFLoader.js":"blob:other"}}</script>',
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
export async function runHtmlRuntimeFixtures(page, base, onFixture = () => {}) {
  onFixture('gltfPreview')
  await page.evaluate((data) => {
    window.runPreview({
      kind: 'html',
      profile: 'threejs',
      code: `<script type="module">
      import * as T from 'three';
      import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';
      const model=await new GLTFLoader().parseAsync(Uint8Array.from(atob('${data}'),c=>c.charCodeAt(0)).buffer,'');
      const mesh=model.scene.getObjectByName('Triangle'),image=mesh.material.map.image;
      console.log('gltf-preview:'+JSON.stringify({group:model.scene instanceof T.Group,mesh:mesh instanceof T.Mesh,width:image.width,height:image.height}));
      mesh.geometry.dispose();mesh.material.map.dispose();mesh.material.dispose();image.close?.();
      </script>`,
    })
  }, glbData.textured)
  await page.waitForFunction(() =>
    document
      .querySelector('.preview-console li:last-child pre')
      ?.textContent.startsWith('gltf-preview:'),
  )
  const preview = JSON.parse(
    (
      await page.locator('.preview-console li:last-child pre').textContent()
    ).slice('gltf-preview:'.length),
  )
  assert.deepEqual(preview, { group: true, mesh: true, width: 2, height: 2 })
  await page.goto(base + '/tests/browser/html-runtime.html')
  await page.waitForFunction(() => window.makeHtmlPreview)
  const outbound = []
  await page.route('**/*task1-never-send*', (route) => {
    outbound.push(route.request().url())
    return route.abort()
  })
  const evidence = { gltfPreview: preview }
  for (const [name, source] of Object.entries(cases)) {
    onFixture(name)
    await page.evaluate(
      ({ name, source }) => {
        document.querySelector('iframe')?.remove()
        window.runtimeMessages = []
        const frame = document.createElement('iframe')
        frame.sandbox = 'allow-scripts'
        frame.srcdoc = window.makeHtmlPreview(
          source.replaceAll('__SELF_ORIGIN__', location.origin),
          'fixture',
          name === 'invalidKo' ? 'ko' : 'en',
          ['plainStructure', 'plainNetwork', 'absentModules'].includes(name)
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
    if (['network', 'plainNetwork'].includes(name)) {
      await page.waitForFunction(() =>
        window.runtimeMessages.some((m) => m.message === 'network-complete'),
      )
      // CSP violation events arrive after the rejected fetch promises.
      await page.waitForFunction(
        () =>
          window.runtimeMessages.filter((m) => m.message.startsWith('blocked:'))
            .length >= 3,
      )
    }
    if (name === 'gltf') {
      await page.waitForFunction(() =>
        window.runtimeMessages.some((m) =>
          m.message.startsWith('gltf-results:'),
        ),
      )
      const frame = page.frameLocator('iframe')
      await frame.getByLabel('Model').setInputFiles({
        name: 'broken.glb',
        mimeType: 'model/gltf-binary',
        buffer: Buffer.from([0, 1, 2, 3, 4, 5, 6, 7]),
      })
      await frame.locator('#state').waitFor({ state: 'visible' })
      await page.waitForFunction(() =>
        window.runtimeMessages.some((m) => m.message.startsWith('file-error:')),
      )
      assert.equal(await frame.locator('#state').textContent(), 'failed')
      await frame.getByRole('button', { name: 'Sample' }).click()
      await frame.locator('#state').filter({ hasText: 'recovered:1' }).waitFor()
    }
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
  assert.deepEqual(
    outbound,
    [],
    'no HTTP(S) request reaches the network, including same origin',
  )
  for (const name of ['network', 'plainNetwork']) {
    assert.ok(!logs(name).includes('UNEXPECTED'))
    assert.ok(logs(name).includes('SecurityError'))
    assert.equal(
      logs(name).filter((m) => m.startsWith('rejected:')).length,
      name === 'network' ? 3 : 4,
    )
    assert.equal(
      logs(name).filter((m) => m.startsWith('fetched:')).length,
      name === 'network' ? 1 : 0,
    )
    for (const url of [
      'https://example.com/task1-never-send',
      'http://example.com/task1-never-send',
      new URL(base).origin + '/task1-never-send',
    ])
      assert.ok(logs(name).includes('blocked:' + url), name + ' blocks ' + url)
  }
  assert.ok(logs('plainNetwork').includes('blocked:data'))
  const parsed = JSON.parse(
    logs('gltf')
      .find((m) => m.startsWith('gltf-results:'))
      .slice('gltf-results:'.length),
  )
  for (const kind of ['static', 'animated', 'textured', 'blob', 'data']) {
    assert.equal(parsed[kind].meshes, 1, kind)
    assert.equal(
      parsed[kind].same,
      true,
      kind + ' shares core Group/Mesh identity',
    )
    assert.equal(parsed[kind].empty, false, kind)
    assert.equal(parsed[kind].clips, kind === 'animated' ? 1 : 0, kind)
  }
  assert.deepEqual(parsed.empty, {
    meshes: 0,
    same: true,
    clips: 0,
    empty: true,
  })
  assert.equal(parsed.animated.x, 1)
  assert.deepEqual(parsed.textured.image, {
    width: 2,
    height: 2,
    pixels: [
      255, 0, 0, 255, 0, 255, 0, 255, 0, 0, 255, 255, 255, 255, 255, 255,
    ],
  })
  assert.ok(
    !statuses('gltf').includes('error'),
    'handled malformed file preserves runtime',
  )
  const cleanup = JSON.parse(
    messages('gltf').find((m) => m.status === 'asset-cleanup').message,
  )
  assert.deepEqual(cleanup, {
    moduleUrls: 3,
    geometries: 6,
    materials: 6,
    textures: 1,
    images: 1,
  })
  assert.equal(
    messages('gltf').filter((m) => m.status === 'asset-cleanup').length,
    1,
  )
  assert.equal(logs('fragment')[0], 'rgb(12, 34, 56)')
  assert.equal(logs('malformed')[0], 'keep')
  for (const name of ['inert', 'emptyMap', 'noncollision', 'absentModules'])
    assert.deepEqual(statuses(name), ['ready'])
  for (const name of ['collision', 'gltfCollision', 'scopedCollision']) {
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
