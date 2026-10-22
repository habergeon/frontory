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
  assert.equal(locations.length, 671)
  assert.equal(new Set(locations).size, 671)
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

test('privacy is public and linked while the practice workspace stays free of AdSense execution', async () => {
  const { generateSearchPages, homeFallback, renderDocument } = await import('../scripts/search-pages.mjs')
  const pages = generateSearchPages()
  const privacy = pages.get('privacy/index.html')
  assert.match(privacy, /<h1>저장 및 개인정보 안내<\/h1>/)
  assert.match(privacy, /href="mailto:hefa91@gmail.com"/)
  assert.match(privacy, /Google AdSense/)
  assert.doesNotMatch(privacy, /광고는 제공하지 않습니다/)
  assert.match(privacy, /rel="canonical" href="https:\/\/frontory.pages.dev\/privacy\/"/)
  for (const [file, html] of pages) {
    if (file.endsWith('.html')) assert.match(html, /href="\/privacy\/"/, file)
  }
  assert.match(homeFallback(), /href="\/privacy\/"/)
  assert.match(homeFallback(), /href="\/about\/"/)
  const about = pages.get('about/index.html')
  assert.match(about, /href="mailto:hefa91@gmail.com"/)
  assert.match(about, /href="https:\/\/github.com\/habergeon\/frontory\/issues"/)
  assert.match(about, /href="\/learn\/react\/react-step-03\/"/)
  assert.match(about, /rel="canonical" href="https:\/\/frontory.pages.dev\/about\/"/)
  assert.match(renderDocument('[개인정보](privacy.md)', '/docs/README.md'), /href="\/privacy\/"/)
  const home = fs.readFileSync('index.html', 'utf8')
  assert.match(home, /name="google-adsense-account" content="ca-pub-2698855152594465"/)
  for (const html of [home, privacy, about, pages.get('404.html')]) assert.doesNotMatch(html, /<script[^>]+adsbygoogle/)
  const adPages = [...pages].filter(([, html]) => /<script[^>]+adsbygoogle/.test(html)).map(([file]) => file).sort()
  assert.deepEqual(adPages, ['learn/css/css-step-04/index.html', 'learn/gsap/gsap-step-02/index.html', 'learn/javascript/javascript-step-02/index.html', 'learn/react/react-step-03/index.html'])
  for (const file of adPages) assert.equal((pages.get(file).match(/<script[^>]+adsbygoogle/g) ?? []).length, 1)
  assert.equal(fs.readFileSync('public/ads.txt', 'utf8').trim(), 'google.com, pub-2698855152594465, DIRECT, f08c47fec0942fa0')
})

test('public reading pages omit empty worksheets but preserve written experiment records', async () => {
  const { renderDocument } = await import('../scripts/search-pages.mjs')
  const worksheet = '\n## 실험 기록 — 직접 작성\n\n### 목표\n\n### 핵심 개념\n\n### 바꾼 변수와 예상\n\n### 실제 결과\n\n### 배운 점\n\n### 남은 질문\n'
  const content = '# 학습\n\n코드와 설명은 유지합니다.\n'
  const empty = renderDocument(content + worksheet, '/docs/test.md')
  assert.match(empty, /코드와 설명은 유지합니다/)
  assert.doesNotMatch(empty, /실험 기록 — 직접 작성/)
  const written = renderDocument(content + worksheet.replace('### 실제 결과', '### 실제 결과\n\n실측 너비는 244px입니다.'), '/docs/test.md')
  assert.match(written, /실험 기록 — 직접 작성/)
  assert.match(written, /실측 너비는 244px입니다/)
})
