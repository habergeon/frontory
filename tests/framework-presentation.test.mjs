import { test } from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'
import { renderToStaticMarkup } from 'react-dom/server'
import * as React from 'react'

// The actual mount renders with React's server renderer at the createRoot boundary.
async function renderReact(id, locale) {
  const { mount } = await import(`../src/labs/${id}/example.js`)
  let html
  let unmounted = false
  const dispose = mount({
    React,
    locale,
    container: {},
    createRoot: () => ({
      render(element) {
        html = renderToStaticMarkup(element)
      },
      unmount() {
        unmounted = true
      },
    }),
  })
  dispose()
  assert.equal(unmounted, true)
  return html
}

test('manual React renders the selected button language and initial count with cleanup', async () => {
  const en = await renderReact('react-01', 'en')
  const ko = await renderReact('react-01', 'ko')
  assert.match(en, />Increment<\/button>/)
  assert.match(ko, />증가<\/button>/)
  assert.match(en, /count: 0/)
  assert.match(en, /aria-live="polite"/)
})

test('generated React translates heading and input aria without translating card fixtures', async () => {
  const en = await renderReact('react-step-05', 'en')
  assert.match(en, /Conditional Screens and Empty States/)
  assert.match(en, /aria-label="Experiment input"/)
  for (const fixture of ['State', 'Effects', 'Canvas'])
    assert.ok(en.includes(fixture))
})

test('Svelte generated external records retain the canonical reading after final metadata assignment', () => {
  const records = JSON.parse(
    fs.readFileSync('content/examples/svelte.json', 'utf8'),
  )
  for (const [id, record] of Object.entries(records).filter(([id]) =>
    id.includes('-step-'),
  )) {
    assert.equal(record.readingSource, `/examples-en/${id}/example.js`)
    assert.equal(record.mode, 'external')
    assert.ok(record.files.includes(`src/labs/${id}/App.svelte`))
  }
  assert.equal(records['svelte-01'].mode, 'browser')
  for (const id of ['svelte-02', 'svelte-03']) {
    assert.equal(records[id].mode, 'external')
    assert.ok(records[id].files.includes(`src/labs/${id}/App.svelte`))
  }
})

test('Svelte harness localizes display while showing HTML-looking fixture as text and unsubscribing', async () => {
  const { writable } = await import('svelte/store')
  const { mount } = await import('../src/labs/svelte-step-02/example.js')
  const previous = globalThis.document
  const nodes = []
  globalThis.document = {
    createElement(tag) {
      return {
        tag,
        attributes: {},
        setAttribute(key, value) {
          this.attributes[key] = value
        },
      }
    },
  }
  try {
    const container = {
      append(node) {
        nodes.push(node)
      },
      replaceChildren() {
        nodes.length = 0
      },
    }
    const dispose = mount({ writable, container, locale: 'en' })
    assert.equal(nodes[0].textContent, 'Markup and Event Attributes')
    const output = nodes.find(
      (node) => node.tag === 'p' && node.textContent === 'Card title',
    )
    assert.ok(output)
    const input = nodes.find((node) => node.tag === 'input')
    assert.equal(input.attributes['aria-label'], 'Title')
    input.value = '한글 · café · 日本語'
    input.oninput()
    assert.equal(output.textContent, '한글 · café · 日本語')
    nodes.find((node) => node.tag === 'button').onclick()
    assert.equal(output.textContent, '<img src=x onerror=alert(1)>')
    dispose()
    assert.equal(nodes.length, 0)
    input.value = 'after cleanup'
    input.oninput()
    assert.equal(output.textContent, '<img src=x onerror=alert(1)>')
  } finally {
    globalThis.document = previous
  }
})
