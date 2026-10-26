import assert from 'node:assert/strict'
import test from 'node:test'
import { fileURLToPath } from 'node:url'
import * as prettier from 'prettier'
import { compile, parse } from 'svelte/compiler'

function projectScript(value) {
  if (Array.isArray(value)) return value.map(projectScript)
  if (value && typeof value === 'object') {
    return Object.fromEntries(
      Object.entries(value)
        .filter(
          ([key]) =>
            !['start', 'end', 'loc', 'range', 'raw', 'extra'].includes(key),
        )
        .map(([key, item]) => [key, projectScript(item)]),
    )
  }
  return value
}

function templateBodies(source) {
  return [...source.matchAll(/`([^`]*)`/g)].map((match) => match[1])
}

test('Svelte config formats runes while preserving nested template literals', async () => {
  const filepath = fileURLToPath(new URL('../fixture.svelte', import.meta.url))
  const config = await prettier.resolveConfig(filepath)
  assert.equal(config.parser, 'svelte')
  assert.equal(config.embeddedLanguageFormatting, 'auto')
  const jsConfig = await prettier.resolveConfig(
    filepath.replace('.svelte', '.js'),
  )
  assert.equal(jsConfig.embeddedLanguageFormatting, 'off')

  const source = [
    '<script lang="ts">',
    'let count=$state(0);let label:string="Clicks";',
    'const markup=html`<div  id="x"><span>Keep  spaces</span></div>`;',
    'const shader=glsl`void main(){  gl_Position = vec4(1.0); }`;',
    'const cssText=css`.x{color:red;}`;',
    'const worker=`self.onmessage = (event) => {  postMessage(event.data); };`;',
    '</script>',
    '<button class:active={count > 0} onclick={() => count++}>',
    '{label}: {count} {html`<b  id="a">Keep  spaces</b>`}',
    '</button>',
    '<style>.active{color:red;}</style>',
  ].join('')
  const options = { ...config, filepath }
  const output = await prettier.format(source, options)
  assert.notEqual(output, source)
  assert.equal(await prettier.format(output, options), output)
  assert.equal(output.includes('\r'), false)
  assert.deepEqual(templateBodies(output), templateBodies(source))

  const before = parse(source, { modern: true })
  const after = parse(output, { modern: true })
  assert.deepEqual(
    projectScript(after.instance.content),
    projectScript(before.instance.content),
  )
  assert(output.includes('let count = $state(0)'))
  assert(output.includes('class:active={count > 0}'))
  assert(output.includes('onclick={() => count++}'))
  assert(output.includes('color: red;'))
  assert.doesNotThrow(() =>
    compile(output, { filename: filepath, generate: 'client', runes: true }),
  )
})
