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
  const dispose = mount({ React, locale, container: {}, createRoot: () => ({ render(element) { html = renderToStaticMarkup(element) }, unmount() { unmounted = true } }) })
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
  for (const fixture of ['State', 'Effects', 'Canvas']) assert.ok(en.includes(fixture))
})
