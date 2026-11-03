import fs from 'node:fs/promises'
import path from 'node:path'
import { pathToFileURL } from 'node:url'
import { gzipSync } from 'node:zlib'
import { build } from 'esbuild'

// Count original emitted bytes, including every static JS dependency. Dynamic
// sources/editor chunks are measured separately by the browser payload audit.
export async function measureInitialBundle(directory = 'dist') {
  const root = path.resolve(directory)
  const pages = []
  for (const page of ['index.html', 'en/index.html']) {
    const html = await fs.readFile(path.join(root, page), 'utf8')
    const entries = [
      ...html.matchAll(/<script\b[^>]*\bsrc=["']([^"']+)["'][^>]*>/g),
    ]
      .map((match) => match[1])
      .filter((url) => !/^(?:https?:)?\/\//.test(url))
    if (!entries.length) throw Error('No local entry script: ' + page)
    const seen = new Set()
    const files = []
    async function visit(url, base = root) {
      const file = url.startsWith('/')
        ? path.join(root, url)
        : path.resolve(base, url)
      if (seen.has(file)) return
      seen.add(file)
      const bytes = await fs.readFile(file)
      files.push({
        file: path.relative(root, file).split(path.sep).join('/'),
        raw: bytes.length,
        gzip: gzipSync(bytes).length,
      })
      const parsed = await build({
        stdin: {
          contents: bytes.toString('utf8'),
          resolveDir: path.dirname(file),
        },
        write: false,
        metafile: true,
        logLevel: 'silent',
      })
      for (const dependency of Object.values(parsed.metafile.outputs)[0]
        .imports) {
        if (dependency.kind === 'import-statement')
          await visit(dependency.path, path.dirname(file))
      }
    }
    for (const entry of entries) await visit(entry)
    pages.push({
      page,
      files,
      raw: files.reduce((n, f) => n + f.raw, 0),
      gzip: files.reduce((n, f) => n + f.gzip, 0),
    })
  }
  return pages
}
export const initialBudget = { raw: 2_200_000, gzip: 500_000 }
export function assertInitialBudget(pages, budget = initialBudget) {
  for (const page of pages)
    for (const metric of ['raw', 'gzip']) {
      if (page[metric] > budget[metric])
        throw Error(
          `${page.page} initial JavaScript ${metric}: ${page[metric]} > ${budget[metric]} bytes`,
        )
    }
}
if (
  process.argv[1] &&
  import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href
) {
  const pages = await measureInitialBundle(process.argv[2] ?? 'dist')
  console.log(JSON.stringify({ budget: initialBudget, pages }, null, 2))
  assertInitialBudget(pages)
}
