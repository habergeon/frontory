import { test } from 'node:test'
import assert from 'node:assert/strict'
import { createDocumentLoader, localizedDocPath, parseDocumentPath } from '../src/app/documentLoader.ts'

const deferred = () => {
  let resolve
  let reject
  const promise = new Promise((yes, no) => { resolve = yes; reject = no })
  return { promise, resolve, reject }
}

test('localized paths retain canonical identity and never fall back to Korean', async () => {
  assert.equal(localizedDocPath('ko', '/docs/labs/unit.md'), '/docs/labs/unit.md')
  assert.equal(localizedDocPath('en', '/docs/labs/unit.md'), '/docs/en/labs/unit.md')
  const loadDocument = createDocumentLoader({ '/docs/only-ko.md': async () => '한국어' })
  await assert.rejects(loadDocument('en', '/docs/only-ko.md'), /Document not found/)
  assert.equal(await loadDocument('ko', '/docs/only-ko.md'), '한국어')
})

test('in-flight requests and completed results are cached by locale and canonical path', async () => {
  const ko = deferred()
  const en = deferred()
  let koCalls = 0
  let enCalls = 0
  const loadDocument = createDocumentLoader({
    '/docs/unit.md': () => { koCalls++; return ko.promise },
    '/docs/en/unit.md': () => { enCalls++; return en.promise },
    '/docs/en/other.md': async () => 'other',
  })
  const korean = loadDocument('ko', '/docs/unit.md')
  const english = loadDocument('en', '/docs/unit.md')
  assert.equal(loadDocument('ko', '/docs/unit.md'), korean)
  assert.equal(loadDocument('en', '/docs/unit.md'), english)
  en.resolve('English')
  assert.equal(await english, 'English')
  assert.equal(await loadDocument('en', '/docs/other.md'), 'other')
  ko.resolve('한국어')
  assert.equal(await korean, '한국어')
  assert.equal(await loadDocument('en', '/docs/unit.md'), 'English')
  assert.equal(koCalls, 1)
  assert.equal(enCalls, 1)
})

test('rejected requests are evicted and can retry, including synchronous loader errors', async () => {
  for (const synchronous of [false, true]) {
    let calls = 0
    const first = deferred()
    const loadDocument = createDocumentLoader({ '/docs/unit.md': () => {
      calls++
      if (calls > 1) return Promise.resolve('retried')
      if (synchronous) throw new Error('network')
      return first.promise
    } })
    const request = loadDocument('ko', '/docs/unit.md')
    const failed = assert.rejects(request, /network/)
    if (!synchronous) first.reject(new Error('network'))
    await failed
    assert.equal(await loadDocument('ko', '/docs/unit.md'), 'retried')
    assert.equal(calls, 2)
  }
})

test('actual document paths distinguish translated documents and explicit Korean links', () => {
  assert.deepEqual(parseDocumentPath('/docs/en/labs/unit.md'), { locale: 'en', koDocPath: '/docs/labs/unit.md' })
  assert.deepEqual(parseDocumentPath('/docs/labs/unit.md'), { locale: 'ko', koDocPath: '/docs/labs/unit.md' })
  const relative = new URL('../other.md', 'https://local-docs.invalid/docs/en/labs/unit.md').pathname
  assert.deepEqual(parseDocumentPath(relative), { locale: 'en', koDocPath: '/docs/other.md' })
  const explicit = new URL('/docs/other.md', 'https://local-docs.invalid/docs/en/labs/unit.md').pathname
  assert.deepEqual(parseDocumentPath(explicit), { locale: 'ko', koDocPath: '/docs/other.md' })
})
