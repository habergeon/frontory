import fs from 'node:fs'
import path from 'node:path'
import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { socialMetaForLocale } from './social-meta.mjs'
import { readEnglishContent } from './locale-content.mjs'
import { headings } from '../src/i18n/messages.ts'
import { localizePath } from '../src/i18n/locale.ts'

const root = path.resolve(import.meta.dirname, '..')
const catalog = JSON.parse(fs.readFileSync(path.join(root, 'src/app/catalog.json'), 'utf8'))
const englishCatalog = JSON.parse(fs.readFileSync(path.join(root, 'src/app/catalog.en.json'), 'utf8'))
const englishContent = readEnglishContent()
export const origin = 'https://frontory.pages.dev'
const repository = 'https://github.com/habergeon/frontory/blob/main'
// Start with reading pages whose explanations and example results were reviewed.
const adReadingRoutes = new Set([
  '/learn/javascript/javascript-step-02/',
  '/learn/css/css-step-04/',
  '/learn/react/react-step-03/',
  '/learn/gsap/gsap-step-02/',
])
const routeEntries = data => [
  ...data.series.map(series => [series.docPath, `/learn/${series.id}/`]),
  ...data.units.map(unit => [unit.docPath, `/learn/${unit.seriesId}/${unit.id}/`]),
]
const guideRoutes = [
  ['/docs/labs/README.md', '/learn/'],
  ['/docs/privacy.md', '/privacy/'],
  ['/docs/about.md', '/about/'],
]
const documentRoutes = new Map([
  ...guideRoutes,
  ...routeEntries(catalog),
  ...routeEntries(englishCatalog).map(([doc, route]) => [doc, localizePath('en', route)]),
  ...guideRoutes.map(([doc, route]) => [englishContent.documents.get(doc).translatedPath, localizePath('en', route)]),
])
const translatedRoutes = new Set(['/', ...[...documentRoutes.values()].filter(route => route.startsWith('/en/')).map(route => route.slice(3))])
const downloads = new Map()
const readingSources = new Map()
for (const unit of catalog.units) {
  const file = `/src/labs/${unit.id}/example.js`
  if (fs.existsSync(path.join(root, file))) downloads.set(file, `/examples/${unit.id}/example.js`)
}
for (const entry of fs.readdirSync(path.join(root, 'content/examples')).filter(file => file.endsWith('.json'))) {
  const metadata = JSON.parse(fs.readFileSync(path.join(root, 'content/examples', entry), 'utf8'))
  for (const [id, details] of Object.entries(metadata)) {
    for (const file of details.files ?? []) downloads.set('/' + file, '/examples/' + file.slice('src/labs/'.length))
    if (englishContent.publishedUnitIds.includes(id) && details.readingSource) readingSources.set(id, details.readingSource)
  }
}
export const escape = value => String(value).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;').replaceAll("'", '&#39;')

export function renderDocument(markdown, docPath, locale = 'ko') {
  // Omit only the untouched worksheet tail; retain any written experiment record.
  const h = headings[locale]
  const literal = value => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  const worksheet = [`## ${h.notes} — ${locale === 'en' ? 'write your own' : '직접 작성'}`,
    ...['goal', 'concepts', 'prediction', 'result', 'learning', 'questions'].map(key => `### ${h[key]}`)]
  const publicMarkdown = markdown.replace(new RegExp(String.raw`\n` + worksheet.map(literal).join(String.raw`\s+`) + String.raw`\s*$`), '\n')
  return renderToStaticMarkup(React.createElement(Markdown, {
    remarkPlugins: [remarkGfm], skipHtml: true,
    components: {
      a: ({ href, children }) => {
        let target = href || ''
        if (target && !/^(https?:|mailto:|#)/i.test(target)) {
          const fragmentIndex = target.indexOf('#')
          const fragment = fragmentIndex < 0 ? '' : target.slice(fragmentIndex)
          const local = path.posix.resolve(path.posix.dirname(docPath), fragmentIndex < 0 ? target : target.slice(0, fragmentIndex))
          target = (documentRoutes.get(local) ?? downloads.get(local) ?? repository + local) + fragment
        }
        return React.createElement('a', { href: target, ...(target.startsWith('/examples/') ? { download: true } : {}) }, children)
      },
    },
  }, publicMarkdown))
}

function page(title, description, route, body, locale = 'ko', noindex = false) {
  const en = locale === 'en'
  const home = localizePath(locale, '/')
  const learn = localizePath(locale, '/learn/')
  const koreanRoute = en ? route.slice(3) : route
  const alternates = !noindex && translatedRoutes.has(koreanRoute)
    ? `<link rel="alternate" hreflang="ko" href="${origin + koreanRoute}"><link rel="alternate" hreflang="en" href="${origin + localizePath('en', koreanRoute)}">` : ''
  const adsense = en || noindex || !adReadingRoutes.has(route) ? '' : '<meta name="google-adsense-account" content="ca-pub-2698855152594465"><script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2698855152594465" crossorigin="anonymous"></script>'
  const schema = JSON.stringify({ '@context': 'https://schema.org', '@type': route === home ? 'WebSite' : 'WebPage', name: title, url: origin + route, inLanguage: en ? 'en-US' : 'ko-KR', description }).replaceAll('<', String.raw`\u003c`)
  return `<!doctype html><html lang="${locale}"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${escape(title)} · Frontory</title><meta name="description" content="${escape(description)}"><meta name="robots" content="${noindex ? 'noindex,follow' : 'index,follow'}"><link rel="canonical" href="${origin + route}">${alternates}<meta property="og:type" content="website"><meta property="og:title" content="${escape(title)} · Frontory"><meta property="og:description" content="${escape(description)}"><meta property="og:url" content="${origin + route}">${socialMetaForLocale(locale)}<script type="application/ld+json">${schema}</script>${adsense}<link rel="icon" href="/favicon.svg"><link rel="stylesheet" href="/learn.css"></head><body><header><a class="brand" href="${home}">Frontory</a><nav aria-label="${en ? 'Site navigation' : '사이트 탐색'}"><a href="${learn}">${en ? 'Curriculum' : '전체 커리큘럼'}</a><a href="${home}">${en ? 'Practice home' : '실습 홈'}</a></nav></header>${route === home ? body : `<main>${body}</main>`}<footer>Frontory · ${en ? 'Read concepts, experiment, and record what you learn.' : '개념을 읽고, 실험하고, 경험을 기록하세요.'} <nav aria-label="${en ? 'Service information' : '서비스 안내'}"><a href="${localizePath(locale, '/about/')}">${en ? 'About and contact' : '소개와 문의'}</a><a href="${localizePath(locale, '/privacy/')}">${en ? 'Storage and privacy' : '저장 및 개인정보'}</a><a href="https://github.com/habergeon/frontory">GitHub</a></nav></footer></body></html>`
}

export function generateSearchPages() {
  const pages = new Map()
  const routes = ['/']
  const add = (title, description, route, body, locale) => {
    pages.set(route.slice(1) + 'index.html', page(title, description, route, body, locale))
    routes.push(route)
  }
  for (const locale of ['ko', 'en']) {
    const en = locale === 'en'
    const data = en ? englishCatalog : catalog
    const learn = localizePath(locale, '/learn/')
    const seriesLinks = data.series.map(series => {
      const count = data.units.filter(unit => unit.seriesId === series.id).length
      return `<li><a href="${learn + series.id}/">${escape(series.title)}</a><p>${escape(series.prerequisites)} · ${en ? `${count} English learning unit${count === 1 ? '' : 's'}` : `${count}개 학습 단위`}</p></li>`
    }).join('')
    add(en ? 'Frontend learning curriculum' : '프론트엔드 학습 커리큘럼', en ? `${data.series.length} series and ${data.units.length} English learning units. Read goals, concepts, and practice tasks.` : '23개 기술 시리즈, 644개 학습 단위의 목표·개념·실습 과제를 살펴보세요.', learn,
      `<h1>${en ? 'Frontend learning curriculum' : '프론트엔드 학습 커리큘럼'}</h1><p>${en ? `Read goals and concepts, then experiment in the linked workspace. ${data.units.length} English learning units are currently published; the Korean curriculum contains 23 series and 644 units. These documents can be read without login or JavaScript.` : '목표와 개념을 읽고, 연결된 실습 환경에서 코드를 실험하세요. 각 문서는 로그인이나 JavaScript 없이 읽을 수 있습니다.'}</p><ul class="series-list">${seriesLinks}</ul>`, locale)
    for (const series of data.series) {
      const route = `${learn}${series.id}/`
      const lessons = data.units.filter(unit => unit.seriesId === series.id)
      add(en ? `${series.title} learning plan` : `${series.title} 학습 계획`, en ? `${series.title}: ${lessons.length} published English learning units with concepts, goals, and practice tasks.` : `${series.title} 28단위 커리큘럼: 개념 설명, 학습목표, 실습 과제와 완료 조건.`, route, renderDocument(fs.readFileSync(path.join(root, series.docPath), 'utf8'), series.docPath, locale), locale)
      for (const [index, unit] of lessons.entries()) {
        const unitRoute = route + unit.id + '/'
        const previous = lessons[index - 1]
        const next = lessons[index + 1]
        const navigation = `<nav aria-label="${en ? 'Lesson navigation' : '학습 문서 탐색'}"><a href="${route}">${escape(series.title)} ${en ? 'learning plan' : '전체 계획'}</a>${previous && (!en || previous.day === unit.day - 1) ? `<a href="${route + previous.id}/">← ${en ? 'Previous lesson' : '이전 학습'}</a>` : ''}${next && (!en || next.day === unit.day + 1) ? `<a href="${route + next.id}/">${en ? 'Next lesson' : '다음 학습'} →</a>` : ''}</nav>`
        const launch = `<p class="launch"><a href="${localizePath(locale, '/')}#${unit.id}">${en ? 'Open code, practice, and notes →' : '코드 편집 · 실습 · 필기 열기 →'}</a></p>`
        const reading = en && readingSources.has(unit.id) ? `<p><a href="${escape(readingSources.get(unit.id))}" download>Download source with English comments · for reading</a></p>` : ''
        add(`${series.title} — ${unit.title}`, unit.goal, unitRoute, navigation + launch + reading + renderDocument(fs.readFileSync(path.join(root, unit.docPath), 'utf8'), unit.docPath, locale) + launch + navigation, locale)
      }
    }
    for (const [name, title, description] of en ? [
      ['privacy', 'Storage and privacy', 'How Frontory stores learning records, handles analytics and advertising data, and receives privacy questions.'],
      ['about', 'About Frontory and contact', 'How to learn with Frontory, its public repository, reviewed document scope, and contact information.'],
    ] : [
      ['privacy', '저장 및 개인정보 안내', 'Frontory의 학습 기록 저장, 분석·광고 데이터 처리와 개인정보 문의 방법.'],
      ['about', 'Frontory 소개와 문의', 'Frontory의 학습 방식, 공개 저장소, 문서 검증 범위와 문의 방법.'],
    ]) {
      const doc = en ? englishContent.documents.get(`/docs/${name}.md`) : { translatedPath: `/docs/${name}.md`, text: fs.readFileSync(path.join(root, `docs/${name}.md`), 'utf8') }
      add(title, description, localizePath(locale, `/${name}/`), renderDocument(doc.text, doc.translatedPath, locale), locale)
    }
    if (en) add('Frontend learning and practice', `${data.series.length} series and ${data.units.length} English learning units for reading, experiments, and notes.`, '/en/', homeFallback('en'), 'en')
  }
  pages.set('sitemap.xml', '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' + routes.map(route => `  <url><loc>${origin + route}</loc></url>`).join('\n') + '\n</urlset>\n')
  pages.set('robots.txt', `User-agent: *\nAllow: /\n\nSitemap: ${origin}/sitemap.xml\n`)
  pages.set('404.html', page('페이지를 찾을 수 없습니다', '요청한 학습 페이지가 없습니다.', '/404.html', '<h1>페이지를 찾을 수 없습니다</h1><p>주소를 확인하거나 <a href="/learn/">전체 커리큘럼</a>에서 학습을 찾아보세요.</p>', 'ko', true))
  pages.set('en/404.html', page('Page not found', 'The requested learning page is not available.', '/en/404.html', '<h1>Page not found</h1><p>Check the address or find a lesson in the <a href="/en/learn/">English curriculum</a>.</p>', 'en', true))
  return pages
}

export function homeFallback(locale = 'ko') {
  if (locale === 'en') return `<main><h1>Frontory — frontend learning and practice</h1><p>${englishCatalog.units.length} English learning units in ${englishCatalog.series.length} series are currently published. Read concepts, experiment, and record what you learn. The Korean curriculum contains 23 series and 644 units.</p><p><a href="/en/about/">About and contact</a> · <a href="/en/privacy/">Storage and privacy</a></p><p><a href="/en/learn/">Read English learning documents</a></p><ul>${englishCatalog.series.map(series => `<li><a href="/en/learn/${series.id}/">${escape(series.title)} curriculum</a></li>`).join('')}</ul></main>`
  return `<main><h1>Frontory — 프론트엔드 학습과 실습</h1><p>23개 시리즈, 644개 학습 단위의 개념과 실습을 읽고 나의 경험을 기록하세요.</p><p><a href="/about/">소개와 문의</a> · <a href="/privacy/">저장 및 개인정보 안내</a></p><p><a href="/learn/">전체 학습 문서 읽기</a></p><ul>${catalog.series.map(series => `<li><a href="/learn/${series.id}/">${escape(series.title)} 커리큘럼</a></li>`).join('')}</ul></main>`
}
