import { test } from 'node:test'
import assert from 'node:assert/strict'
import { mkdtemp, rm } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import path from 'node:path'
import { checkPublicHttp, readPublicResponse } from './helpers/public-http.mjs'

// Vite preview changes NODE_ENV; keep development checks in a separate test process.
test(
  'development English routes load the app and missing translations return genuine 404s',
  { timeout: 120000 },
  async (t) => {
    const { createServer } = await import('vite')
    // Concurrent dev/browser sessions must not rewrite each other's optimizer cache.
    const cacheDir = await mkdtemp(path.join(tmpdir(), 'frontory-public-http-'))
    let server
    try {
      server = await createServer({
        cacheDir,
        server: { host: '127.0.0.1', port: 0, watch: null },
      })
      await server.listen()
      await checkPublicHttp(server.httpServer.address().port, {
        signal: t.signal,
      })
      const { text: en } = await readPublicResponse(
        `http://127.0.0.1:${server.httpServer.address().port}/en/`,
        { signal: t.signal },
      )
      assert.match(en, /<div id="root"><main>/)
      assert.match(en, /src="\/src\/main.tsx"/)
      assert.match(en, /@react-refresh/)
      assert.doesNotMatch(en, /google-adsense-account/)
    } finally {
      try {
        await server?.close()
      } finally {
        await rm(cacheDir, { recursive: true, force: true })
      }
    }
  },
)
