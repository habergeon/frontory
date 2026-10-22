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
  const englishFiles = [...pages.keys()].filter(file => file.startsWith('en/') && file.endsWith('/index.html'))
  assert.deepEqual(englishFiles.sort(), routes.map(route => route.slice(1) + 'index.html').sort())
  const manifest = JSON.parse(fs.readFileSync('content/locales/en/manifest.json', 'utf8'))
  assert.equal(englishFiles.length, 4 + translated.series.length + manifest.publishedUnitIds.length)
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
  assert.equal(sitemap.length, 671 + routes.length)
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
  for (const route of ['/en/learn/missing-series/', '/en/learn/javascript/missing-id/']) assert.equal(pages.has(route.slice(1) + 'index.html'), false)
  for (const unit of JSON.parse(fs.readFileSync('src/app/catalog.json', 'utf8')).units.filter(unit => !manifest.publishedUnitIds.includes(unit.id))) {
    assert.equal(pages.has(`en/learn/${unit.seriesId}/${unit.id}/index.html`), false)
    assert.doesNotMatch(pages.get(`learn/${unit.seriesId}/${unit.id}/index.html`), /hreflang="en"/)
  }
  for (const unit of translated.units) {
    const html = pages.get(`en/learn/${unit.seriesId}/${unit.id}/index.html`)
    assert.ok(html.includes(unit.title))
    assert.ok(html.includes(`href="/en/#${unit.id}"`))
    assert.doesNotMatch(html, /Experiment notes — write your own/)
    const siblings = translated.units.filter(candidate => candidate.seriesId === unit.seriesId)
    for (const [offset, label] of [[-1, 'Previous lesson'], [1, 'Next lesson']]) {
      const adjacent = siblings.find(candidate => candidate.day === unit.day + offset)
      assert.equal(html.includes(label), !!adjacent, unit.id + ': ' + label)
      if (adjacent) assert.ok(html.includes(`href="/en/learn/${unit.seriesId}/${adjacent.id}/"`))
    }
    const metadata = JSON.parse(fs.readFileSync(`content/examples/${unit.seriesId}.json`, 'utf8'))[unit.id]
    if (metadata?.readingSource) {
      assert.ok(html.includes(`href="${metadata.readingSource}" download`))
      assert.ok(fs.existsSync('public' + metadata.readingSource))
      assert.match(html, /Download source with English comments · for reading/)
    } else {
      assert.doesNotMatch(html, /Download source with English comments|href="\/examples-en\//)
      assert.ok(html.includes(`href="/examples/${unit.id}/example.js" download`))
      assert.ok(fs.existsSync(`src/labs/${unit.id}/example.js`))
    }
  }
  for (const id of ['javascript-step-02', 'css-step-04', 'react-step-03', 'gsap-step-02']) {
    assert.ok(pages.get(`en/learn/${translated.units.find(unit => unit.id === id).seriesId}/${id}/index.html`).includes(`href="/examples-en/${id}/example.js" download`))
  }
  assert.ok(sitemap.every(url => !url.includes('/examples/') && !url.includes('/examples-en/')))
})

test('English document links and home fallback use only published localized routes', async () => {
  const { renderDocument, homeFallback } = await import('../scripts/search-pages.mjs')
  const html = renderDocument(`[React](../react/README.md#goals)

[Source](../../../../../src/labs/react-step-03/example.js)

[Korean Vue](../../../../labs/frameworks/vue/README.md)

[Unpublished](../missing-series/README.md)`, '/docs/en/labs/frameworks/test/README.md', 'en')
  assert.match(html, /href="\/en\/learn\/react\/#goals"/)
  assert.match(html, /href="\/examples\/react-step-03\/example.js"/)
  assert.match(html, /href="\/learn\/vue\/"/)
  assert.doesNotMatch(html, /href="\/en\/learn\/missing-series\/"/)
  assert.match(html, /https:\/\/github.com\/habergeon\/frontory\/blob\/main\/docs\/en\/labs\/frameworks\/missing-series\/README.md/)
  const fallback = homeFallback('en')
  assert.match(fallback, /href="\/en\/learn\/"/)
  assert.match(fallback, /href="\/en\/about\/"/)
  assert.match(fallback, /href="\/en\/privacy\/"/)
  assert.doesNotMatch(fallback, /href="\/en\/learn\/missing-series\/"/)
  const manifest = JSON.parse(fs.readFileSync('content/locales/en/manifest.json', 'utf8'))
  assert.ok(fallback.includes(`${manifest.publishedUnitIds.length} English`))
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

test('built English app entry shares real Vite assets and localized head, with localized static errors', { timeout: 120000 }, async () => {
  const { execFileSync } = await import('node:child_process')
  execFileSync(process.execPath, ['node_modules/vite/bin/vite.js', 'build'], { encoding: 'utf8' })
  execFileSync(process.execPath, ['scripts/build-search.mjs'], { encoding: 'utf8' })
  const ko = fs.readFileSync('dist/index.html', 'utf8')
  const en = fs.readFileSync('dist/en/index.html', 'utf8')
  const assets = html => [...html.matchAll(/(?:src|href)="(\/assets\/[^"?]+\.(?:js|css))"/g)].map(match => match[1]).sort()
  assert.ok(assets(en).some(file => file.endsWith('.js')), 'English app has a Vite JavaScript entry')
  assert.ok(assets(en).some(file => file.endsWith('.css')), 'English app has Vite CSS')
  assert.deepEqual(assets(en), assets(ko))
  for (const file of assets(en)) assert.ok(fs.existsSync('dist' + file), file)
  assert.match(en, /<html lang="en">/)
  assert.match(en, /<title>Frontend learning and practice · Frontory<\/title>/)
  const translated = JSON.parse(fs.readFileSync('src/app/catalog.en.json', 'utf8'))
  assert.ok(en.includes(`name="description" content="${translated.series.length} series and ${translated.units.length} English learning units`))
  assert.match(en, /rel="canonical" href="https:\/\/frontory.pages.dev\/en\/"/)
  assert.doesNotMatch(en, /rel="canonical" href="https:\/\/frontory.pages.dev\/"/)
  assert.doesNotMatch(en, /adsbygoogle|google-adsense-account|href="\/learn.css"/)
  assert.match(en, /<div id="root"><main>/)
  const schema = JSON.parse(en.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)[1])
  assert.equal(schema.inLanguage, 'en-US')
  assert.equal(schema.url, 'https://frontory.pages.dev/en/')
  for (const html of [en, ko]) {
    assert.match(html, /hreflang="ko" href="https:\/\/frontory.pages.dev\/"/)
    assert.match(html, /hreflang="en" href="https:\/\/frontory.pages.dev\/en\/"/)
  }
  assert.match(fs.readFileSync('dist/en/404.html', 'utf8'), /<h1>Page not found<\/h1>/)
  const { preview } = await import('vite')
  const previousNodeEnv = process.env.NODE_ENV
  const server = await preview({ preview: { host: '127.0.0.1', port: 0 } })
  try { await checkPublicHttp(server.httpServer.address().port) }
  finally {
    await new Promise(resolve => server.httpServer.close(resolve))
    if (previousNodeEnv === undefined) delete process.env.NODE_ENV
    else process.env.NODE_ENV = previousNodeEnv
  }
})

test('development English routes load the app and missing translations return genuine 404s', { timeout: 120000 }, async () => {
  const { createServer } = await import('vite')
  const server = await createServer({ server: { host: '127.0.0.1', port: 0 } })
  await server.listen()
  try {
    await checkPublicHttp(server.httpServer.address().port)
    const en = await (await fetch(`http://127.0.0.1:${server.httpServer.address().port}/en/`)).text()
    assert.match(en, /<div id="root"><main>/)
    assert.match(en, /src="\/src\/main.tsx"/)
    assert.match(en, /@react-refresh/)
    assert.doesNotMatch(en, /google-adsense-account/)
  } finally { await server.close() }
})

async function checkPublicHttp(port) {
  const base = `http://127.0.0.1:${port}`
  for (const route of ['/', '/en/', '/learn/', '/en/learn/', '/en/about/', '/en/learn/react/react-step-03/']) {
    const response = await fetch(base + route)
    assert.equal(response.status, 200, route)
    assert.match(await response.text(), route.startsWith('/en/') ? /<html lang="en">/ : /<html lang="ko">/)
  }
  for (const route of ['/en', '/en/learn', '/en/about']) {
    const response = await fetch(base + route + '?from=test', { redirect: 'manual' })
    assert.equal(response.status, 301, route)
    assert.equal(response.headers.get('location'), route + '/?from=test')
  }
  for (const route of ['/en/learn/missing/', '/en/not-found/', '/en/learn/missing-series/', '/learn/missing/']) {
    const response = await fetch(base + route)
    assert.equal(response.status, 404, route)
    const html = await response.text()
    assert.match(html, route.startsWith('/en/') ? /<h1>Page not found<\/h1>/ : /페이지를 찾을 수 없습니다/)
    assert.match(html, /noindex/)
  }
  for (const route of ['/examples/react-step-03/example.js', '/examples-en/react-step-03/example.js']) {
    const response = await fetch(base + route)
    assert.equal(response.status, 200, route)
    assert.equal(response.headers.get('x-robots-tag'), 'noindex')
    assert.match(response.headers.get('content-disposition'), /^attachment/)
  }
}
