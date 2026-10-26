import http from 'node:http'
import { readFile } from 'node:fs/promises'
const html = await readFile(new URL('./fixture.html', import.meta.url))
http
  .createServer((req, res) => {
    if (req.url.startsWith('/docs/')) {
      res.setHeader('Content-Type', 'text/plain')
      res.end('Document ' + req.url.split('/').at(-1))
    } else {
      res.setHeader('Content-Type', 'text/html')
      res.end(html)
    }
  })
  .listen(4179, '127.0.0.1')
