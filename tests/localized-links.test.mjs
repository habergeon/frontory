import { test } from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'
import {
  generateSearchPages,
  origin,
  renderDocument,
  escape,
} from '../scripts/search-pages.mjs'

const read = (file) => fs.readFileSync(file, 'utf8')
const ko = JSON.parse(read('src/app/catalog.json'))
const en = JSON.parse(read('src/app/catalog.en.json'))
const manifest = JSON.parse(read('content/locales/en/manifest.json'))
const pages = generateSearchPages()
const fileFor = (route) => route.slice(1) + 'index.html'
const routesFor = (catalog) => [
  '/',
  '/learn/',
  '/about/',
  '/privacy/',
  ...catalog.series.map((series) => `/learn/${series.id}/`),
  ...catalog.units.map((unit) => `/learn/${unit.seriesId}/${unit.id}/`),
]
const hrefs = (html) =>
  [...html.matchAll(/href="([^"]+)"/g)].map((match) => match[1])

for (const id of ['html-01', '01-scene']) {
  test(`legacy public English page exposes validated reading download: ${id}`, () => {
    const unit = en.units.find((unit) => unit.id === id)
    assert.ok(unit, id)
    const html = pages.get(`en/learn/${unit.seriesId}/${id}/index.html`)
    assert.ok(
      html.includes(`href="/examples-en/${id}/example.js" download`),
      id,
    )
    assert.ok(html.includes(`href="/examples/${id}/example.js" download`), id)
  })
}

test('public route identities equal both complete catalogs and preserve every original route', () => {
  assert.equal(ko.series.length, 23)
  assert.equal(ko.units.length, 644)
  assert.deepEqual(
    en.units.map((unit) => unit.id).sort(),
    manifest.publishedUnitIds.toSorted(),
  )
  assert.deepEqual(
    en.units.map((unit) => unit.id).sort(),
    ko.units.map((unit) => unit.id).sort(),
  )
  assert.deepEqual(
    en.series.map((series) => series.id).sort(),
    ko.series.map((series) => series.id).sort(),
  )
  const original = JSON.parse(read('content/catalog-v2.json'))
  for (const unit of original.units) {
    const current = ko.units.find((candidate) => candidate.id === unit.id)
    assert.equal(current?.seriesId, unit.seriesId, unit.id)
    assert.equal(current?.docPath, unit.docPath, unit.id)
  }
  const koreanRoutes = routesFor(ko)
  const englishRoutes = routesFor(en).map((route) => '/en' + route)
  assert.equal(koreanRoutes.length, 671)
  assert.equal(englishRoutes.length, 671)
  const expected = [...koreanRoutes, ...englishRoutes]
    .map((route) => origin + route)
    .sort()
  const sitemap = [
    ...pages.get('sitemap.xml').matchAll(/<loc>(.*?)<\/loc>/g),
  ].map((match) => match[1])
  assert.equal(new Set(sitemap).size, 1342)
  assert.deepEqual(sitemap.toSorted(), expected)
  assert.deepEqual(
    [...pages.keys()].filter((file) => file.endsWith('index.html')).sort(),
    [...koreanRoutes.filter((route) => route !== '/'), ...englishRoutes]
      .map(fileFor)
      .sort(),
  )
  for (const route of [
    '/en/learn/missing/',
    '/learn/missing/',
    '/en/learn/webgl/missing/',
    '/404.html',
    '/en/404.html',
    '/#html-step-01',
    '/examples/html-step-01/example.js',
    '/examples-en/html-step-01/example.js',
  ]) {
    assert.ok(!sitemap.includes(origin + route), route)
    if (route.includes('missing')) assert.ok(!pages.has(fileFor(route)), route)
  }
  const allPages = new Map(pages)
  allPages.set('index.html', read('index.html'))
  for (const route of [...koreanRoutes, ...englishRoutes]) {
    const html = allPages.get(fileFor(route))
    const locale = route.startsWith('/en/') ? 'en' : 'ko'
    const koreanRoute = locale === 'en' ? route.slice(3) : route
    assert.ok(html.includes(`<html lang="${locale}"`), route)
    assert.ok(
      html.includes(`<link rel="canonical" href="${origin + route}"`),
      route,
    )
    assert.ok(
      html.includes(`<meta property="og:url" content="${origin + route}"`),
      route,
    )
    assert.ok(
      html.includes(
        `property="og:locale" content="${locale === 'en' ? 'en_US' : 'ko_KR'}"`,
      ),
      route,
    )
    for (const [lang, target] of route === '/'
      ? []
      : [
          ['ko', koreanRoute],
          ['en', '/en' + koreanRoute],
        ]) {
      assert.ok(
        html.includes(`hreflang="${lang}" href="${origin + target}"`),
        route,
      )
    }
    const schema = JSON.parse(
      html.match(
        /<script type="application\/ld\+json">([\s\S]*?)<\/script>/,
      )[1],
    )
    assert.equal(schema.url, origin + route, route)
    assert.equal(schema.inLanguage, locale === 'en' ? 'en-US' : 'ko-KR', route)
    assert.equal(
      schema['@type'],
      route === '/' || route === '/en/' ? 'WebSite' : 'WebPage',
      route,
    )
    if (locale === 'en')
      assert.doesNotMatch(html, /adsbygoogle|google-adsense-account/, route)
  }
})

test('all bilingual lesson bodies, navigation, original and reading downloads resolve publicly', () => {
  for (const [locale, catalog] of [
    ['ko', ko],
    ['en', en],
  ]) {
    const prefix = locale === 'en' ? '/en' : ''
    for (const series of catalog.series) {
      const route = `${prefix}/learn/${series.id}/`
      const seriesHtml = pages.get(fileFor(route))
      assert.ok(
        seriesHtml.includes(
          renderDocument(read(series.docPath.slice(1)), series.docPath, locale),
        ),
        route,
      )
      const lessons = catalog.units.filter(
        (unit) => unit.seriesId === series.id,
      )
      for (const [index, unit] of lessons.entries()) {
        const html = pages.get(fileFor(route + unit.id + '/'))
        assert.ok(html.includes(escape(unit.title)), unit.id)
        assert.ok(
          html.includes(
            renderDocument(read(unit.docPath.slice(1)), unit.docPath, locale),
          ),
          unit.id,
        )
        const navigation = html.match(
          new RegExp(
            `<nav aria-label="${locale === 'en' ? 'Lesson navigation' : '학습 문서 탐색'}">(.*?)</nav>`,
          ),
        )[1]
        assert.deepEqual(
          hrefs(navigation),
          [
            route,
            ...[lessons[index - 1], lessons[index + 1]]
              .filter(Boolean)
              .map((adjacent) => route + adjacent.id + '/'),
          ],
          unit.id,
        )
        assert.ok(html.includes(`href="${prefix}/#${unit.id}"`), unit.id)
        const footer = html.match(/<footer>(.*?)<\/footer>/)[1]
        assert.deepEqual(
          hrefs(footer),
          [
            `${prefix}/about/`,
            `${prefix}/privacy/`,
            'https://github.com/habergeon/frontory',
          ],
          unit.id,
        )
        assert.ok(
          html.includes(`href="/examples/${unit.id}/example.js" download`),
          unit.id,
        )
        assert.ok(fs.existsSync(`src/labs/${unit.id}/example.js`), unit.id)
        if (locale === 'en') {
          assert.equal(
            unit.exampleReadingSource,
            `/examples-en/${unit.id}/example.js`,
            unit.id,
          )
          assert.ok(
            html.includes(`href="${unit.exampleReadingSource}" download`),
            unit.id,
          )
          assert.ok(
            fs.existsSync('public' + unit.exampleReadingSource),
            unit.id,
          )
        }
        for (const href of hrefs(html)) {
          if (/^\/(?:en\/)?(?:learn|about|privacy)\//.test(href))
            assert.ok(
              pages.has(fileFor(href.split('#')[0])),
              unit.id + ': ' + href,
            )
          if (href.startsWith('/examples-en/'))
            assert.ok(fs.existsSync('public' + href.split('#')[0]), href)
          if (href.startsWith('/examples/'))
            assert.ok(
              fs.existsSync(
                'src/labs/' + href.slice('/examples/'.length).split('#')[0],
              ),
              href,
            )
        }
      }
    }
  }
  const adPages = [...pages].filter(([, html]) =>
    /<script[^>]+adsbygoogle/.test(html),
  )
  assert.deepEqual(adPages.map(([file]) => file).sort(), [
    'learn/css/css-step-04/index.html',
    'learn/gsap/gsap-step-02/index.html',
    'learn/javascript/javascript-step-02/index.html',
    'learn/react/react-step-03/index.html',
  ])
  for (const [file, html] of adPages)
    assert.equal((html.match(/<script[^>]+adsbygoogle/g) ?? []).length, 1, file)
})
