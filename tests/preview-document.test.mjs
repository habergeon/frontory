import { test } from 'node:test'
import assert from 'node:assert/strict'
import vm from 'node:vm'
import { createPreviewDocument } from '../src/preview/document.ts'

test('editor text cannot terminate the bootstrap script', () => {
  const source = '</script><script>parent.pwned=true</script>\u2028'
  const html = createPreviewDocument(
    source,
    'test-token',
    'var StudyRuntime={start(){}};',
  )
  assert.equal((html.match(/<script>/g) || []).length, 1)
  assert.equal((html.match(/<\/script>/g) || []).length, 1)
  assert.ok(!html.includes(source))
  const args = html.match(
    /;StudyRuntime.start\((.*),"test-token"(?:,"ko")?\);<\/script>/s,
  )
  assert.equal(JSON.parse(args[1]), source)
})
test('preview document restricts network, form, nested frames and base URL', () => {
  const html = createPreviewDocument('', 'token', '')
  for (const policy of [
    "default-src 'none'",
    "connect-src 'none'",
    "frame-src 'none'",
    "form-action 'none'",
    "base-uri 'none'",
  ])
    assert.ok(html.includes(policy))
  assert.ok(!html.includes('unsafe-eval'))
})

for (const locale of [undefined, 'ko', 'en']) {
  test(`preview document uses ${locale ?? 'default Korean'} lang and runtime locale`, () => {
    const source = '</script><script>parent.pwned=true</script> '
    const token = '</script>token'
    const html = createPreviewDocument(source, token, '/* </ScRiPt> */', locale)
    assert.ok(html.startsWith(`<!doctype html><html lang="${locale ?? 'ko'}">`))
    assert.equal((html.match(/<script>/g) || []).length, 1)
    assert.equal((html.match(/<\/script>/gi) || []).length, 1)
    let received
    const script = html.match(/<script>(.*)<\/script>/s)[1]
    vm.runInNewContext(script, {
      StudyRuntime: {
        start: (...args) => {
          received = args
        },
      },
    })
    assert.deepEqual(received, [source, token, locale ?? 'ko'])
  })
}
