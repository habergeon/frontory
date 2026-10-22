import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'node:fs'
import path from 'node:path'
import { generateSearchPages, homeFallback } from './scripts/search-pages.mjs'

export default defineConfig({
  appType: 'mpa',
  plugins: [react(), {
    name: 'frontory-public-learning-documents',
    transformIndexHtml(html, context) {
      if (context.path !== '/' && context.path !== '/index.html') return html
      return html.replace('</head>', '<link rel="alternate" hreflang="ko" href="https://frontory.pages.dev/"><link rel="alternate" hreflang="en" href="https://frontory.pages.dev/en/"></head>')
    },
    configureServer(server) {
      let pages: Map<string, string> | undefined
      server.watcher.on('all', (event, file) => {
        if (!['add', 'change', 'unlink'].includes(event)) return
        const relative = path.relative(server.config.root, file).split(path.sep).join('/')
        if (/^(docs\/|content\/(?:locales|examples)\/|src\/i18n\/|src\/app\/catalog(?:\.en)?\.json$)/.test(relative)) {
          pages = undefined
          // The generator also caches locale catalogs and document maps at module scope.
          void server.restart()
        }
      })
      server.middlewares.use(async (request, response, next) => {
        const url = new URL(request.url ?? '/', 'http://localhost')
        const pathname = url.pathname
        if (pathname.startsWith('/examples/') || pathname.startsWith('/examples-en/')) {
          const english = pathname.startsWith('/examples-en/')
          const relative = pathname.slice(english ? '/examples-en/'.length : '/examples/'.length)
          if (!/^[a-z0-9-]+\/[a-zA-Z0-9._-]+$/.test(relative)) { response.statusCode = 404; response.end(); return }
          const file = path.resolve(english ? 'public/examples-en' : 'src/labs', relative)
          if (!fs.existsSync(file) || !fs.statSync(file).isFile()) { response.statusCode = 404; response.end(); return }
          response.setHeader('Content-Type', 'application/octet-stream')
          response.setHeader('Content-Disposition', 'attachment; filename="' + path.basename(file) + '"')
          response.setHeader('X-Robots-Tag', 'noindex')
          response.end(fs.readFileSync(file)); return
        }
        if (!/^\/(?:en(?:\/|$)|learn(?:\/|$)|privacy(?:\/|$)|about(?:\/|$)|robots\.txt$|sitemap\.xml$)/.test(pathname)) { next(); return }
        try {
          pages ??= generateSearchPages()
          const key = pathname.slice(1) + (pathname.endsWith('/') ? 'index.html' : '')
          if (!pathname.endsWith('/') && pages.has(key + '/index.html')) {
            response.statusCode = 301; response.setHeader('Location', pathname + '/' + url.search); response.end(); return
          }
          let html = pages.get(key) ?? pages.get(pathname.startsWith('/en/') ? 'en/404.html' : '404.html')!
          if (pathname === '/en/') {
            html = html.replace('<link rel="stylesheet" href="/learn.css">', '')
              .replace(/<body>[\s\S]*<\/body>/, `<body><div id="root">${homeFallback('en')}</div><script type="module" src="/src/main.tsx"></script></body>`)
            html = await server.transformIndexHtml(pathname, html)
          }
          response.statusCode = pages.has(key) ? 200 : 404
          response.setHeader('Content-Type', pathname.endsWith('.xml') ? 'application/xml; charset=utf-8' : pathname.endsWith('.txt') ? 'text/plain; charset=utf-8' : 'text/html; charset=utf-8')
          response.end(html)
        } catch (error) { next(error) }
      })
    },
    configurePreviewServer(server) {
      server.middlewares.use((request, response, next) => {
        const url = new URL(request.url ?? '/', 'http://localhost')
        const pathname = url.pathname
        const output = path.resolve(server.config.root, server.config.build.outDir)
        const file = path.join(output, pathname)
        if (!pathname.endsWith('/') && fs.existsSync(path.join(file, 'index.html'))) {
          response.statusCode = 301; response.setHeader('Location', pathname + '/' + url.search); response.end(); return
        }
        const target = pathname.endsWith('/') ? path.join(file, 'index.html') : file
        if (fs.existsSync(target) && fs.statSync(target).isFile()) {
          if (/^\/examples(?:-en)?\//.test(pathname)) {
            response.setHeader('X-Robots-Tag', 'noindex')
            response.setHeader('Content-Disposition', 'attachment; filename="' + path.basename(target) + '"')
          }
          next(); return
        }
        response.statusCode = 404
        response.setHeader('Content-Type', 'text/html; charset=utf-8')
        response.end(fs.readFileSync(path.join(output, pathname.startsWith('/en/') ? 'en/404.html' : '404.html')))
      })
    },
  }],
})
