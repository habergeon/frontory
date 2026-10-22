import { test } from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'

test('home and learning pages provide complete social metadata and site identity', async () => {
  const { generateSearchPages } = await import('../scripts/search-pages.mjs')
  const pages = [fs.readFileSync('index.html', 'utf8'), ...[...generateSearchPages()].filter(([name]) => name.endsWith('.html')).map(([, html]) => html)]
  for (const html of pages) {
    assert.match(html, /property="og:site_name" content="Frontory"/)
    assert.match(html, new RegExp(`property="og:locale" content="${html.includes('<html lang="en"') ? 'en_US' : 'ko_KR'}"`))
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
  const koreanLocations = locations.filter(url => !url.startsWith('https://frontory.pages.dev/en/'))
  const expectedKorean = ['/', '/learn/', '/privacy/', '/about/', ...catalog.series.map(series => `/learn/${series.id}/`), ...catalog.units.map(unit => `/learn/${unit.seriesId}/${unit.id}/`)].map(route => 'https://frontory.pages.dev' + route)
  assert.equal(koreanLocations.length, 671)
  assert.deepEqual(koreanLocations.sort(), expectedKorean.sort())
  assert.equal(new Set(locations).size, locations.length)
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
    if (file.endsWith('.html')) assert.match(html, file.startsWith('en/') ? /href="\/en\/privacy\/"/ : /href="\/privacy\/"/, file)
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

test('only actual English pages are published with reciprocal locale metadata', async () => {
  const { generateSearchPages, origin } = await import('../scripts/search-pages.mjs')
  const pages = generateSearchPages()
  const translated = JSON.parse(fs.readFileSync('src/app/catalog.en.json', 'utf8'))
  const routes = ['/en/', '/en/learn/', '/en/about/', '/en/privacy/',
    ...translated.series.map(series => `/en/learn/${series.id}/`),
    ...translated.units.map(unit => `/en/learn/${unit.seriesId}/${unit.id}/`)]
  const englishFiles = [...pages.keys()].filter(file => file.startsWith('en/') && file.endsWith('.html'))
  assert.deepEqual(englishFiles.sort(), routes.map(route => route.slice(1) + 'index.html').sort())
  assert.equal(englishFiles.length, 12)
  for (const route of routes) {
    const html = pages.get(route.slice(1) + 'index.html')
    assert.match(html, /<html lang="en">/)
    assert.ok(html.includes(`<link rel="canonical" href="${origin + route}">`))
    assert.ok(html.includes(`<meta property="og:url" content="${origin + route}">`))
    assert.match(html, /property="og:locale" content="en_US"/)
    const koreanRoute = route.slice(3)
    const koreanHtml = koreanRoute === '/' ? null : pages.get(koreanRoute.slice(1) + 'index.html')
    if (koreanRoute !== '/') assert.ok(koreanHtml, koreanRoute)
    for (const candidate of [html, koreanHtml].filter(Boolean)) {
      assert.ok(candidate.includes(`hreflang="en" href="${origin + route}"`))
      assert.ok(candidate.includes(`hreflang="ko" href="${origin + koreanRoute}"`))
    }
    const schema = JSON.parse(html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)[1])
    assert.equal(schema.url, origin + route)
    assert.equal(schema.inLanguage, 'en-US')
    assert.equal(schema['@type'], route === '/en/' ? 'WebSite' : 'WebPage')
    assert.doesNotMatch(html, /adsbygoogle|google-adsense-account/)
    assert.match(html, /href="\/en\/learn\/"/)
    assert.match(html, /href="\/en\/about\/"/)
    assert.match(html, /href="\/en\/privacy\/"/)
  }
  const sitemap = [...pages.get('sitemap.xml').matchAll(/<loc>(.*?)<\/loc>/g)].map(match => match[1])
  assert.equal(sitemap.length, 683)
  assert.deepEqual(sitemap.filter(url => url.startsWith(origin + '/en/')).sort(), routes.map(route => origin + route).sort())
  const canonicalFiles = [...pages].filter(([file]) => file.endsWith('/index.html'))
  assert.deepEqual(sitemap.toSorted(), [origin + '/', ...canonicalFiles.map(([file]) => origin + '/' + file.slice(0, -'index.html'.length))].sort())
  for (const [file, html] of canonicalFiles) {
    const locale = file.startsWith('en/') ? 'en' : 'ko'
    const url = origin + '/' + file.slice(0, -'index.html'.length)
    assert.ok(html.includes(`<html lang="${locale}">`), file)
    assert.ok(html.includes(`<link rel="canonical" href="${url}">`), file)
    assert.ok(html.includes(`<meta property="og:url" content="${url}">`), file)
    const schema = JSON.parse(html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)[1])
    assert.equal(schema.url, url, file)
    assert.equal(schema.inLanguage, locale === 'en' ? 'en-US' : 'ko-KR', file)
    if (locale === 'ko' && !routes.includes('/en' + url.slice(origin.length))) assert.doesNotMatch(html, /hreflang="en"/, file)
  }
  for (const route of ['/en/learn/vue/', '/en/learn/javascript/javascript-01/']) assert.equal(pages.has(route.slice(1) + 'index.html'), false)
  assert.doesNotMatch(pages.get('learn/javascript/javascript-01/index.html'), /hreflang="en"/)
  for (const unit of translated.units) {
    const html = pages.get(`en/learn/${unit.seriesId}/${unit.id}/index.html`)
    assert.ok(html.includes(unit.title))
    assert.ok(html.includes(`href="/en/#${unit.id}"`))
    assert.doesNotMatch(html, /Previous lesson|Next lesson|Experiment notes — write your own/)
    assert.ok(html.includes(`href="/examples-en/${unit.id}/example.js" download`))
    assert.ok(fs.existsSync(`public/examples-en/${unit.id}/example.js`))
    assert.match(html, /Download source with English comments · for reading/)
  }
  assert.ok(sitemap.every(url => !url.includes('/examples/') && !url.includes('/examples-en/')))
})

test('English document links and home fallback use only published localized routes', async () => {
  const { renderDocument, homeFallback } = await import('../scripts/search-pages.mjs')
  const html = renderDocument(`[React](../react/README.md#goals)

[Source](../../../../../src/labs/react-step-03/example.js)

[Korean Vue](../../../../labs/frameworks/vue/README.md)

[Unpublished](../vue/README.md)`, '/docs/en/labs/frameworks/test/README.md', 'en')
  assert.match(html, /href="\/en\/learn\/react\/#goals"/)
  assert.match(html, /href="\/examples\/react-step-03\/example.js"/)
  assert.match(html, /href="\/learn\/vue\/"/)
  assert.doesNotMatch(html, /href="\/en\/learn\/vue\/"/)
  assert.match(html, /https:\/\/github.com\/habergeon\/frontory\/blob\/main\/docs\/en\/labs\/frameworks\/vue\/README.md/)
  const fallback = homeFallback('en')
  assert.match(fallback, /href="\/en\/learn\/"/)
  assert.match(fallback, /href="\/en\/about\/"/)
  assert.match(fallback, /href="\/en\/privacy\/"/)
  assert.doesNotMatch(fallback, /href="\/en\/learn\/vue\/"/)
  assert.match(fallback, /4 English/)
})

test('English worksheets use shared headings and preserve every written field', async () => {
  const { headings } = await import('../src/i18n/messages.ts')
  const { renderDocument } = await import('../scripts/search-pages.mjs')
  const h = headings.en
  const fields = ['goal', 'concepts', 'prediction', 'result', 'learning', 'questions']
  const worksheet = `\n## ${h.notes} — write your own\n\n${fields.map(key => `### ${h[key]}\n\n`).join('')}`
  assert.doesNotMatch(renderDocument('# Lesson\n' + worksheet, '/docs/en/test.md', 'en'), /Experiment notes/)
  for (const field of fields) {
    const written = worksheet.replace(`### ${h[field]}\n`, `### ${h[field]}\n\nMy measured width is 244px.\n`)
    const html = renderDocument('# Lesson\n' + written, '/docs/en/test.md', 'en')
    assert.match(html, /Experiment notes/)
    assert.match(html, /My measured width is 244px/)
  }
})
