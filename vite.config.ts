import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'node:fs'
import path from 'node:path'
import { generateSearchPages } from './scripts/search-pages.mjs'

export default defineConfig({
  plugins: [react(), {
    name: 'frontory-public-learning-documents',
    configureServer(server) {
      let pages: Map<string, string> | undefined
      server.watcher.on('change', file => { if (file.includes('/docs/') || file.includes('\\docs\\')) pages = undefined })
      server.middlewares.use((request, response, next) => {
        const pathname = (request.url ?? '/').split('?')[0]
        if (pathname.startsWith('/examples/')) {
          const relative = pathname.slice('/examples/'.length)
          if (!/^[a-z0-9-]+\/[a-zA-Z0-9._-]+$/.test(relative)) { response.statusCode = 404; response.end(); return }
          const file = path.resolve('src/labs', relative)
          if (!fs.existsSync(file) || !fs.statSync(file).isFile()) { response.statusCode = 404; response.end(); return }
          response.setHeader('Content-Type', 'application/octet-stream')
          response.setHeader('Content-Disposition', 'attachment; filename="' + path.basename(file) + '"')
          response.end(fs.readFileSync(file)); return
        }
        if (!pathname.startsWith('/learn/') && pathname !== '/learn' && pathname !== '/robots.txt' && pathname !== '/sitemap.xml') { next(); return }
        pages ??= generateSearchPages()
        const key = pathname.slice(1) + (pathname.endsWith('/') ? 'index.html' : '')
        if (!pathname.endsWith('/') && pages.has(key + '/index.html')) {
          response.statusCode = 301; response.setHeader('Location', pathname + '/'); response.end(); return
        }
        response.statusCode = pages.has(key) ? 200 : 404
        response.setHeader('Content-Type', pathname.endsWith('.xml') ? 'application/xml; charset=utf-8' : pathname.endsWith('.txt') ? 'text/plain; charset=utf-8' : 'text/html; charset=utf-8')
        response.end(pages.get(key) ?? pages.get('404.html'))
      })
    },
  }],
})
