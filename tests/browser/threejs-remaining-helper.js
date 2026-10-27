import assert from 'node:assert/strict'
export const editorCode = (page) =>
  page.evaluate(async () =>
    (await import('/src/editor/monaco.ts')).monaco.editor
      .getEditors()[0]
      .getValue(),
  )
export async function editCode(page, code) {
  await page.evaluate(async (code) => {
    const editor = (
      await import('/src/editor/monaco.ts')
    ).monaco.editor.getEditors()[0]
    editor.executeEdits('learner-edit', [
      { range: editor.getModel().getFullModelRange(), text: code },
    ])
  }, code)
}
export async function ready(page) {
  await page.waitForSelector('.monaco-editor', { state: 'attached' })
  await page.waitForFunction(
    () =>
      !/준비하고|Preparing/.test(
        document.querySelector('.code-check-status').textContent,
      ),
  )
}
export async function reading(page) {
  if ((await page.viewportSize()).width < 768)
    await page.locator('#tab-reading').click()
}
export async function preview(page) {
  if ((await page.viewportSize()).width < 768)
    await page.locator('#tab-result').click()
}
export async function loadSource(page, step, solution) {
  await reading(page)
  await page.selectOption('#learning-step', step)
  const details = page
    .locator('.lesson-learning > details')
    .nth(solution ? 2 : 0)
  if ((await details.getAttribute('open')) === null)
    await details.locator('summary').click()
  await details.getByRole('button').click()
  await page.locator('.example-confirm button').first().click()
  return editorCode(page)
}
let serial = 0
export async function instrument(page, source, expression) {
  const tag = ++serial
  const hook = `\nglobalThis.__remaining={tag:${tag}, snapshot(){draw();const gl=renderer.getContext();const pixels=new Uint8Array(canvas.width*canvas.height*4);gl.readPixels(0,0,canvas.width,canvas.height,gl.RGBA,gl.UNSIGNED_BYTE,pixels);let sum=0,changed=0,energy=0,momentX=0;const halfHash=[2166136261,2166136261];for(let i=0;i<pixels.length;i+=4){const x=(i/4)%canvas.width,lum=pixels[i]+pixels[i+1]+pixels[i+2],half=x<canvas.width/2?0:1;sum+=lum;for(let c=0;c<3;c++)halfHash[half]=Math.imul(halfHash[half]^pixels[i+c],16777619)>>>0;if(Math.abs(pixels[i]-237)>12||Math.abs(pixels[i+1]-242)>12||Math.abs(pixels[i+2]-247)>12){changed++;energy+=lum;momentX+=x*lum;}}return {w:stage.clientWidth,h:stage.clientHeight,buffer:[canvas.width,canvas.height],aspect:camera.aspect,sum,halfHash,brightCenterX:energy?momentX/energy:null,pixels:changed,output:output.textContent,actual:(${expression})};},cleanup, cleanupSnapshot(){let count=0;for(const resource of [...ownedGeometry,...ownedMaterial,...ownedTargets])resource.addEventListener("dispose",()=>count++);cleanup();cleanup();return {disposed:count,expected:ownedGeometry.size+ownedMaterial.size+ownedTargets.size,children:scene.children.length};}};\n`
  await editCode(page, source.replace('</script>', hook + '</script>'))
  await preview(page)
  await page.waitForFunction(
    (tag) =>
      document
        .querySelector('#panel-result iframe')
        ?.srcdoc.includes('tag:' + tag + ','),
    tag,
  )
  const frame = await (
    await page.locator('#panel-result iframe').elementHandle()
  ).contentFrame()
  await frame.waitForFunction((tag) => globalThis.__remaining?.tag === tag, tag)
  await frame.waitForFunction(
    () =>
      document.querySelector('canvas').width > 0 &&
      document.querySelector('canvas').clientWidth > 0,
  )
  return frame
}
export const snapshot = (frame) =>
  frame.evaluate(() => globalThis.__remaining.snapshot())
export function visible(actual) {
  assert.ok(actual.w > 0 && actual.h > 0)
  assert.deepEqual(actual.buffer, [actual.w, actual.h])
  assert.ok(Number.isFinite(actual.aspect))
  assert.ok(Math.abs(actual.aspect - actual.w / actual.h) < 1e-9)
}
