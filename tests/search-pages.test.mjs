import { test } from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'

test('home and learning pages provide complete social metadata and site identity', async () => {
  const { generateSearchPages } = await import('../scripts/search-pages.mjs')
  const pages = [fs.readFileSync('index.html', 'utf8'), ...[...generateSearchPages()].filter(([name]) => name.endsWith('.html')).map(([, html]) => html)]
  for (const html of pages) {
    assert.match(html, /property="og:site_name" content="Frontory"/)
    assert.match(html, /property="og:locale" content="ko_KR"/)
    assert.match(html, /property="og:image" content="https:\/\/frontory.pages.dev\/og\/frontory.png"/)
    assert.match(html, /name="twitter:card" content="summary_large_image"/)
    assert.match(html, /property="og:image:alt"/)
  }
  const home = pages[0]
  const schema = JSON.parse(home.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)[1])
  assert.equal(schema['@type'], 'WebSite')
  assert.equal(schema.name, 'Frontory')
  assert.equal(schema.url, 'https://frontory.pages.dev/')
  const png = fs.readFileSync('public/og/frontory.png')
  assert.equal(png.subarray(1, 4).toString(), 'PNG')
  assert.equal(png.readUInt32BE(16), 1200)
  assert.equal(png.readUInt32BE(20), 630)
})

test('search documents expose all curriculum pages without executing JavaScript', async () => {
  assert.ok(fs.existsSync('scripts/search-pages.mjs'), 'static search-page generator exists')
  const { generateSearchPages } = await import('../scripts/search-pages.mjs')
  const pages = generateSearchPages()
  const catalog = JSON.parse(fs.readFileSync('src/app/catalog.json', 'utf8'))
  for (const unit of catalog.units) {
    const route = `/learn/${unit.seriesId}/${unit.id}/`
    const html = pages.get(route.slice(1) + 'index.html')
    assert.ok(html, route)
    assert.ok(html.includes(`<link rel="canonical" href="https://frontory.pages.dev${route}"`), route)
    assert.ok(html.includes(unit.title.replaceAll('&', '&amp;')), unit.id)
    assert.ok(html.includes(`href="/#${unit.id}"`), unit.id)
    assert.ok(html.includes('<h2>'), unit.id)
    assert.ok(!html.includes('href="/docs/'), unit.id)
  }
  const locations = [...pages.get('sitemap.xml').matchAll(/<loc>(.*?)<\/loc>/g)].map(match => match[1])
  assert.equal(locations.length, 669)
  assert.equal(new Set(locations).size, 669)
  assert.ok(locations.every(url => url.startsWith('https://frontory.pages.dev/') && !url.includes('#')))
  assert.match(pages.get('robots.txt'), /Sitemap: https:\/\/frontory.pages.dev\/sitemap.xml/)
  assert.match(pages.get('404.html'), /noindex/)
})

test('Markdown rendering strips raw HTML and maps relative document and source links', async () => {
  assert.ok(fs.existsSync('scripts/search-pages.mjs'))
  const { renderDocument } = await import('../scripts/search-pages.mjs')
  const html = renderDocument('<script>alert(1)</script>\n\n[React](../react/README.md)\n\n[unsafe](javascript:alert%281%29)', '/docs/labs/frameworks/vue/README.md')
  assert.ok(!html.includes('<script'))
  assert.ok(!html.includes('href="javascript:'))
  assert.ok(html.includes('href="/learn/react/"'))
})
