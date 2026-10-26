import fs from 'node:fs'
import path from 'node:path'
import { generateSearchPages, homeFallback } from './search-pages.mjs'

const output = path.resolve('dist')
if (!fs.existsSync(path.join(output, 'index.html')))
  throw Error('Run vite build before build-search.')
const pages = generateSearchPages()
const builtHome = fs.readFileSync(path.join(output, 'index.html'), 'utf8')
const appAssets = [
  ...builtHome.matchAll(
    /<script[^>]*type="module"[^>]*src="[^"]+"[^>]*><\/script>|<link[^>]*rel="(?:stylesheet|modulepreload)"[^>]*>/g,
  ),
]
  .map((match) => match[0])
  .join('')
if (!appAssets.includes('<script'))
  throw Error('Vite app entry assets are missing.')
pages.set(
  'en/index.html',
  pages
    .get('en/index.html')
    .replace('<link rel="stylesheet" href="/learn.css">', appAssets)
    .replace(
      /<body>[\s\S]*<\/body>/,
      `<body><div id="root">${homeFallback('en')}</div></body>`,
    ),
)
for (const [file, content] of pages) {
  const target = path.join(output, file)
  fs.mkdirSync(path.dirname(target), { recursive: true })
  fs.writeFileSync(target, content)
}
const home = path.join(output, 'index.html')
fs.writeFileSync(
  home,
  builtHome.replace(
    '<div id="root"></div>',
    `<div id="root">${homeFallback()}</div>`,
  ),
)
const catalog = JSON.parse(fs.readFileSync('src/app/catalog.json', 'utf8'))
const copies = new Set(
  catalog.units
    .map((unit) => `src/labs/${unit.id}/example.js`)
    .filter((file) => fs.existsSync(file)),
)
if (fs.existsSync('content/examples'))
  for (const entry of fs
    .readdirSync('content/examples')
    .filter((file) => file.endsWith('.json'))) {
    const metadata = JSON.parse(
      fs.readFileSync(path.join('content/examples', entry), 'utf8'),
    )
    for (const [id, details] of Object.entries(metadata))
      for (const file of details.files ?? []) {
        if (!file.startsWith('src/labs/' + id + '/') || file.includes('..'))
          throw Error('Invalid companion path: ' + file)
        copies.add(file)
      }
  }
for (const file of copies) {
  const target = path.join(output, 'examples', file.slice('src/labs/'.length))
  fs.mkdirSync(path.dirname(target), { recursive: true })
  fs.copyFileSync(file, target)
}
console.log(
  `Generated ${pages.size} search assets; sitemap contains ${(pages.get('sitemap.xml').match(/<loc>/g) ?? []).length} canonical URLs.`,
)
