import assert from 'node:assert/strict'

// Consume every body, including redirects/downloads, before reusing the connection.
// Bound each request separately so a stalled route identifies itself in failures.
export async function readPublicResponse(url, options = {}) {
  const { timeoutMs = 30_000, signal, ...init } = options
  const start = Date.now()
  try {
    const response = await fetch(url, {
      ...init,
      signal: AbortSignal.any([
        AbortSignal.timeout(timeoutMs),
        ...(signal ? [signal] : []),
      ]),
    })
    return {
      status: response.status,
      headers: response.headers,
      text: await response.text(),
    }
  } catch (cause) {
    throw new Error(`${url} failed after ${Date.now() - start}ms`, { cause })
  }
}

export async function checkPublicHttp(port, options = {}) {
  const base = `http://127.0.0.1:${port}`
  for (const route of [
    '/',
    '/en/',
    '/learn/',
    '/en/learn/',
    '/en/about/',
    '/en/learn/react/react-step-03/',
  ]) {
    const response = await readPublicResponse(base + route, options)
    assert.equal(response.status, 200, route)
    assert.match(
      response.text,
      route.startsWith('/en/') ? /<html lang="en">/ : /<html lang="ko">/,
    )
  }
  for (const route of ['/en', '/en/learn', '/en/about']) {
    const response = await readPublicResponse(base + route + '?from=test', {
      ...options,
      redirect: 'manual',
    })
    assert.equal(response.status, 301, route)
    assert.equal(response.headers.get('location'), route + '/?from=test')
  }
  for (const route of [
    '/en/learn/missing/',
    '/en/not-found/',
    '/en/learn/missing-series/',
    '/learn/missing/',
  ]) {
    const response = await readPublicResponse(base + route, options)
    assert.equal(response.status, 404, route)
    const html = response.text
    assert.match(
      html,
      route.startsWith('/en/')
        ? /<h1>Page not found<\/h1>/
        : /페이지를 찾을 수 없습니다/,
    )
    assert.match(html, /noindex/)
  }
  for (const route of [
    '/examples/react-step-03/example.js',
    '/examples-en/react-step-03/example.js',
  ]) {
    const response = await readPublicResponse(base + route, options)
    assert.equal(response.status, 200, route)
    assert.equal(response.headers.get('x-robots-tag'), 'noindex')
    assert.match(response.headers.get('content-disposition'), /^attachment/)
  }
}
