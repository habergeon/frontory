import { test } from 'node:test'
import assert from 'node:assert/strict'
import { checkPublicHttp } from './helpers/public-http.mjs'

// Vite preview changes NODE_ENV; keep development checks in a separate test process.
test('development English routes load the app and missing translations return genuine 404s', { timeout: 120000 }, async () => {
  const { createServer } = await import('vite')
  const server = await createServer({ server: { host: '127.0.0.1', port: 0 } })
  await server.listen()
  try {
    await checkPublicHttp(server.httpServer.address().port)
    const en = await (await fetch(`http://127.0.0.1:${server.httpServer.address().port}/en/`)).text()
    assert.match(en, /<div id="root"><main>/)
    assert.match(en, /src="\/src\/main.tsx"/)
    assert.match(en, /@react-refresh/)
    assert.doesNotMatch(en, /google-adsense-account/)
  } finally { await server.close() }
})
