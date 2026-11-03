import assert from 'node:assert/strict'
import { test } from 'node:test'
import { createServer } from 'node:http'
import { once } from 'node:events'
import { readPublicResponse } from './helpers/public-http.mjs'

for (const phase of ['headers', 'body']) {
  test(`public HTTP bounds stalled ${phase} and reports the route`, async () => {
    const server = createServer((_request, response) => {
      if (phase === 'body') {
        response.writeHead(200)
        response.write('incomplete')
      }
    })
    server.listen(0, '127.0.0.1')
    await once(server, 'listening')
    const url = `http://127.0.0.1:${server.address().port}/stalled-${phase}`
    try {
      await assert.rejects(
        readPublicResponse(url, { timeoutMs: 100 }),
        (error) => {
          assert.ok(error.message.startsWith(url + ' failed after '))
          assert.equal(error.cause.name, 'TimeoutError')
          return true
        },
      )
    } finally {
      server.closeAllConnections()
      await new Promise((resolve) => server.close(resolve))
    }
  })
}
