import fs from 'node:fs'
import path from 'node:path'
import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { socialMeta } from './social-meta.mjs'

const root = path.resolve(import.meta.dirname, '..')
const catalog = JSON.parse(fs.readFileSync(path.join(root, 'src/app/catalog.json'), 'utf8'))
export const origin = 'https://frontory.pages.dev'
const repository = 'https://github.com/habergeon/frontory/blob/main'
const documentRoutes = new Map([
  ['/docs/labs/README.md', '/learn/'],
  ...catalog.series.map(series => [series.docPath, `/learn/${series.id}/`]),
  ...catalog.units.map(unit => [unit.docPath, `/learn/${unit.seriesId}/${unit.id}/`]),
])
export const escape = value => String(value).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;').replaceAll("'", '&#39;')

export function renderDocument(markdown, docPath) {
  return renderToStaticMarkup(React.createElement(Markdown, {
    remarkPlugins: [remarkGfm], skipHtml: true,
    components: {
      a: ({ href, children }) => {
        let target = href || ''
        if (target && !/^(https?:|mailto:|#)/i.test(target)) {
          const local = path.posix.resolve(path.posix.dirname(docPath), target).split('#')[0]
          target = documentRoutes.get(local) ?? repository + local
        }
        return React.createElement('a', { href: target }, children)
      },
    },
  }, markdown))
}

function page(title, description, route, body, noindex = false) {
  return `<!doctype html><html lang="ko"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${escape(title)} · Frontory</title><meta name="description" content="${escape(description)}"><meta name="robots" content="${noindex ? 'noindex,follow' : 'index,follow'}"><link rel="canonical" href="${origin + route}"><meta property="og:type" content="website"><meta property="og:title" content="${escape(title)} · Frontory"><meta property="og:description" content="${escape(description)}"><meta property="og:url" content="${origin + route}">${socialMeta}<link rel="icon" href="/favicon.svg"><link rel="stylesheet" href="/learn.css"></head><body><header><a class="brand" href="/">Frontory</a><nav aria-label="사이트 탐색"><a href="/learn/">전체 커리큘럼</a><a href="/">실습 홈</a></nav></header><main>${body}</main><footer>Frontory · 개념을 읽고, 실험하고, 경험을 기록하세요. <a href="https://github.com/habergeon/frontory">GitHub</a></footer></body></html>`
}

export function generateSearchPages() {
  const pages = new Map()
  const routes = ['/', '/learn/']
  const seriesLinks = catalog.series.map(series => `<li><a href="/learn/${series.id}/">${escape(series.title)}</a><p>${escape(series.prerequisites)} · 28개 학습 단위</p></li>`).join('')
  pages.set('learn/index.html', page('프론트엔드 학습 커리큘럼', '23개 기술 시리즈, 644개 학습 단위의 목표·개념·실습 과제를 살펴보세요.', '/learn/', `<h1>프론트엔드 학습 커리큘럼</h1><p>목표와 개념을 읽고, 연결된 실습 환경에서 코드를 실험하세요. 각 문서는 로그인이나 JavaScript 없이 읽을 수 있습니다.</p><ul class="series-list">${seriesLinks}</ul>`))
  for (const series of catalog.series) {
    const route = `/learn/${series.id}/`
    routes.push(route)
    pages.set(route.slice(1) + 'index.html', page(`${series.title} 학습 계획`, `${series.title} 28단위 커리큘럼: 개념 설명, 학습목표, 실습 과제와 완료 조건.`, route, renderDocument(fs.readFileSync(path.join(root, series.docPath), 'utf8'), series.docPath)))
    const lessons = catalog.units.filter(unit => unit.seriesId === series.id)
    for (const [index, unit] of lessons.entries()) {
      const unitRoute = route + unit.id + '/'
      routes.push(unitRoute)
      const navigation = `<nav aria-label="학습 문서 탐색"><a href="${route}">${escape(series.title)} 전체 계획</a>${index > 0 ? `<a href="${route + lessons[index - 1].id}/">← 이전 학습</a>` : ''}${index < lessons.length - 1 ? `<a href="${route + lessons[index + 1].id}/">다음 학습 →</a>` : ''}</nav>`
      const launch = `<p class="launch"><a href="/#${unit.id}">코드 편집 · 실습 · 필기 열기 →</a></p>`
      pages.set(unitRoute.slice(1) + 'index.html', page(`${series.title} — ${unit.title}`, unit.goal, unitRoute, navigation + launch + renderDocument(fs.readFileSync(path.join(root, unit.docPath), 'utf8'), unit.docPath) + launch + navigation))
    }
  }
  pages.set('sitemap.xml', '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' + routes.map(route => `  <url><loc>${origin + route}</loc></url>`).join('\n') + '\n</urlset>\n')
  pages.set('robots.txt', `User-agent: *\nAllow: /\n\nSitemap: ${origin}/sitemap.xml\n`)
  pages.set('404.html', page('페이지를 찾을 수 없습니다', '요청한 학습 페이지가 없습니다.', '/404.html', '<h1>페이지를 찾을 수 없습니다</h1><p>주소를 확인하거나 <a href="/learn/">전체 커리큘럼</a>에서 학습을 찾아보세요.</p>', true))
  return pages
}

export function homeFallback() {
  return `<main><h1>Frontory — 프론트엔드 학습과 실습</h1><p>23개 시리즈, 644개 학습 단위의 개념과 실습을 읽고 나의 경험을 기록하세요.</p><p><a href="/learn/">전체 학습 문서 읽기</a></p><ul>${catalog.series.map(series => `<li><a href="/learn/${series.id}/">${escape(series.title)} 커리큘럼</a></li>`).join('')}</ul></main>`
}
