import { test } from 'node:test'
import assert from 'node:assert/strict'
import { execFileSync } from 'node:child_process'
import * as formatter from '../scripts/format-generated.mjs'

test('generated formatter preserves unsupported bytes and formats supported text idempotently', async () => {
  for (const file of ['kernel.wat', 'captions.vtt', 'notes.txt'])
    assert.equal(
      await formatter.formatGeneratedText(file, '(module)\r\n'),
      '(module)\r\n',
    )
  const result = await formatter.formatGeneratedText(
    'example.js',
    'const n={a:1};\r\n',
  )
  assert.equal(result, 'const n = { a: 1 }\n')
  assert.equal(
    await formatter.formatGeneratedText('example.js', result),
    result,
  )
  await assert.rejects(
    formatter.formatGeneratedText('broken.js', 'const ='),
    /broken\.js/,
  )
})

test('Svelte helper matches CLI and preserves nested tagged template literals', async () => {
  const input =
    '<script>const html = (x) => x.raw[0]; const value = html`<p>  hello </p>`;</script><p>{value}</p>'
  const result = await formatter.formatGeneratedText('literal.svelte', input)
  assert.ok(result.includes('`<p>  hello </p>`'))
  const cli = execFileSync(
    process.execPath,
    [
      'node_modules/prettier/bin/prettier.cjs',
      '--stdin-filepath',
      'literal.svelte',
    ],
    { input, encoding: 'utf8' },
  )
  assert.equal(result, cli)
  assert.equal(
    await formatter.formatGeneratedText('literal.svelte', result),
    result,
  )
})

test('multiline upload call reaches a stable generated representation', async () => {
  const input =
    "await page.getByLabel('Import backup').setInputFiles({name:'valid.json',mimeType:'application/json',buffer:Buffer.from(JSON.stringify({version:1,text:'restored'}))});"
  const first = await formatter.formatGeneratedText('lesson.spec.mjs', input)
  assert.equal(
    await formatter.formatGeneratedText('lesson.spec.mjs', first),
    first,
  )
  assert.equal(
    execFileSync(
      process.execPath,
      [
        'node_modules/prettier/bin/prettier.cjs',
        '--stdin-filepath',
        'lesson.spec.mjs',
      ],
      { input: first, encoding: 'utf8' },
    ),
    first,
  )
})

test('a nonconverging formatter stops after three passes and identifies its file', () => {
  // This dependency double exercises a failure Prettier's normal fixtures cannot
  // produce reliably; all successful formatting tests above use real Prettier.
  const script = `
    import { registerHooks } from 'node:module'
    import assert from 'node:assert/strict'
    const dependency = 'data:text/javascript,' + encodeURIComponent('export async function getFileInfo(){return {inferredParser:"babel"}};export async function format(text){globalThis.formatCalls=(globalThis.formatCalls??0)+1;return text+" "}')
    registerHooks({resolve(specifier,context,next){
      if(specifier==='prettier'&&context.parentURL.endsWith('/scripts/format-generated.mjs'))return {url:dependency,shortCircuit:true}
      return next(specifier,context)
    }})
    const {formatGeneratedText}=await import('./scripts/format-generated.mjs')
    await assert.rejects(formatGeneratedText('unstable.js','const n=1'), /unstable.js:.*three passes/)
    assert.equal(globalThis.formatCalls,3)
    console.log('bounded failure verified')
  `
  assert.equal(
    execFileSync(process.execPath, ['--input-type=module', '-e', script], {
      encoding: 'utf8',
    }).trim(),
    'bounded failure verified',
  )
})
