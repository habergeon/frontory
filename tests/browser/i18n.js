import { categoryLabels } from '../../src/i18n/messages'
import englishCatalog from '../../src/app/catalog.en.json'
import koreanCatalog from '../../src/app/catalog.json'

const frame = document.querySelector('#app')
const results = []
const searches = ['no-such-series', 'react', '언어와 웹 기초', 'Languages and web fundamentals', ''].map(query => [query, englishCatalog.series.filter(item => [item.id, item.title, item.prerequisites, categoryLabels.ko[item.category], categoryLabels.en[item.category]].join(' ').toLowerCase().includes(query.toLowerCase())).length])
const wait = async predicate => {
  for (let i = 0; i < 400; i++) { if (predicate()) return; await new Promise(resolve => setTimeout(resolve, 50)) }
  throw new Error('Timed out waiting for rendered UI')
}
const check = (name, actual, expected) => {
  const ok = actual === expected
  results.push({ name, actual, expected, ok })
  document.querySelector('#results').textContent = JSON.stringify(results, null, 2)
  if (!ok) throw new Error(name + ': ' + JSON.stringify(actual))
}
const doc = () => frame.contentDocument
const win = () => frame.contentWindow
const language = () => doc().querySelector('.interface-language button')
const click = async element => { element.click(); await new Promise(resolve => setTimeout(resolve, 100)) }
const search = async (element, value) => {
  Object.getOwnPropertyDescriptor(win().HTMLInputElement.prototype, 'value').set.call(element, value)
  element.dispatchEvent(new (win().Event)('input', { bubbles: true }))
  await new Promise(resolve => setTimeout(resolve, 100))
}
try {
  await wait(() => doc().querySelector('.home-series-row'))
  check('Language control exists', !!language(), true)
  check('Korean catalog remains complete', doc().querySelectorAll('.home-series-row').length, 23)
  await click(language())
  check('English home URL', win().location.pathname, '/en/')
  check('English home language', doc().documentElement.lang, 'en')
  win().history.back()
  await wait(() => doc().documentElement.lang === 'ko')
  check('Back restores Korean home', win().location.pathname, '/')
  await click(language())
  check('English catalog count', doc().querySelectorAll('.home-series-row').length, englishCatalog.series.length)
  const homeSearch = doc().querySelector('input[type="search"]')
  for (const [query, count] of searches) {
    await search(homeSearch, query)
    check('Home search ' + query, doc().querySelectorAll('.home-series-row').length, count)
    check('Home search result wording ' + query, doc().querySelector('.home-result-count').textContent, count + ' series')
  }
  const singleUnitSeries = [...doc().querySelectorAll('.home-series-row')].find(row => row.querySelector('h3').textContent === 'CSS')
  check('Home CSS unit count', singleUnitSeries.querySelector('.home-series-progress').firstChild.textContent, englishCatalog.units.filter(unit => unit.seriesId === 'css').length + ' units')
  await click([...doc().querySelectorAll('.home-series-row')].find(row => row.querySelector('h3').textContent === 'JavaScript').querySelector('button'))
  await wait(() => doc().querySelector('.workspace') && doc().querySelector('.monaco-editor') && doc().querySelector('.workspace iframe'))
  check('English selection uses published stable ID', win().location.hash, '#' + englishCatalog.units.find(unit => unit.seriesId === 'javascript').id)
  win().location.hash = '#javascript-step-02'
  await wait(() => doc().querySelector('.current-lesson h3')?.textContent.includes('String input and number conversion'))
  check('English title matches current lesson', doc().title.includes(doc().querySelector('.current-lesson h3').textContent), true)
  await wait(() => /checks passed|execution paused/.test(doc().querySelector('.code-check-status').textContent))
  check('Editor status translated to English', /checks passed|execution paused/.test(doc().querySelector('.code-check-status').textContent), true)
  await wait(() => doc().querySelector('.workspace iframe')?.srcdoc.includes('export function mount(){return()=>{}}') && doc().querySelector('.preview-status')?.textContent === 'Running')
  const workspace = doc().querySelector('.workspace')
  const editor = doc().querySelector('.monaco-editor')
  const preview = doc().querySelector('.workspace iframe')
  const storage = () => JSON.stringify(Object.keys(win().localStorage).sort().map(key => [key, win().localStorage.getItem(key)]))
  const notes = doc().querySelector('.notes-editor')
  Object.getOwnPropertyDescriptor(win().HTMLTextAreaElement.prototype, 'value').set.call(notes, 'F09 locale continuity')
  notes.dispatchEvent(new (win().Event)('input', { bubbles: true }))
  await new Promise(resolve => setTimeout(resolve, 100))
  const beforeStorage = storage()
  await click(language())
  check('Switch to Korean preserves unit', win().location.pathname + win().location.hash, '/#javascript-step-02')
  check('Workspace DOM preserved', doc().querySelector('.workspace') === workspace, true)
  check('Monaco DOM preserved', doc().querySelector('.monaco-editor') === editor, true)
  check('Preview iframe preserved', doc().querySelector('.workspace iframe') === preview, true)
  check('Notes remain in the same control', doc().querySelector('.notes-editor') === notes && notes.value === 'F09 locale continuity', true)
  check('Code language remains JavaScript', doc().querySelector('#code-language').value, 'javascript')
  check('Locale switch does not write storage', storage() === beforeStorage, true)
  win().history.back()
  await wait(() => doc().documentElement.lang === 'en')
  check('Back restores English and same unit', win().location.pathname + win().location.hash, '/en/#javascript-step-02')
  check('Back keeps Workspace DOM', doc().querySelector('.workspace') === workspace, true)
  await click(doc().querySelector('.journey-actions button'))
  await wait(() => doc().querySelector('.series-dialog[open]'))
  const dialog = doc().querySelector('.series-dialog')
  for (const [query, count] of searches) {
    await search(dialog.querySelector('input'), query)
    check('Navigator search ' + query, dialog.querySelectorAll('.series-card').length, count)
    check('Navigator search count wording ' + query, dialog.querySelector('.series-tools p').textContent.startsWith(count + ' series ·'), true)
  }
  const snapshot = JSON.parse(win().localStorage.getItem('web-gl-study:all:v1') || '{}')
  const javascriptUnits = englishCatalog.units.filter(unit => unit.seriesId === 'javascript')
  const completed = javascriptUnits.filter(unit => {
    const draft = snapshot[unit.id] ?? JSON.parse(win().localStorage.getItem('web-gl-study:unit:v1:' + unit.id) || '{}')
    return draft.progress === 'completed'
  }).length
  check('Navigator published unit and completion counts', [...dialog.querySelectorAll('.series-card')].find(card => card.querySelector('strong').textContent === 'JavaScript').textContent.includes(javascriptUnits.length + ' units · ' + completed + ' completed'), true)
  check('Published stable ID sets match', JSON.stringify(englishCatalog.units.map(unit => unit.id).sort()), JSON.stringify(koreanCatalog.units.map(unit => unit.id).sort()))
  check('Navigator full published ID set', englishCatalog.units.length, 644)
  for (const item of englishCatalog.series) {
    const card = [...dialog.querySelectorAll('.series-card')].find(card => card.querySelector('strong').textContent === item.title)
    check('Navigator unit count ' + item.id, Number(card.querySelector('progress').max), englishCatalog.units.filter(unit => unit.seriesId === item.id).length)
  }
  check('Navigator full series set', dialog.querySelectorAll('.series-card').length, englishCatalog.series.length)
  await click(dialog.querySelector('.dialog-header button'))
  await click(doc().querySelector('.current-lesson button'))
  await wait(() => doc().querySelector('.document-dialog article h1'))
  check('Navigator requests actual English document', /[A-Za-z]/.test(doc().querySelector('.document-dialog article h1').textContent), true)
  check('English document has no Korean lesson fallback', /[가-힣]/.test(doc().querySelector('.document-dialog article h1').textContent), false)
  await click(doc().querySelector('.document-dialog .dialog-header button'))
  await click(language())
  const unknownId = 'e09-does-not-exist'
  win().location.hash = '#' + unknownId
  await click(language())
  check('Unknown ID remains selected in English', win().location.pathname + win().location.hash, '/en/#' + unknownId)
  await wait(() => doc().querySelectorAll('.home-series-row').length === englishCatalog.series.length)
  check('Unknown ID renders English home', doc().documentElement.lang, 'en')
  check('Unknown ID has no lesson workspace', doc().querySelector('.workspace'), null)
  check('Unknown ID has no lesson navigator', doc().querySelector('.current-lesson'), null)
  await click(language())
  check('Unknown ID Korean roundtrip preserves hash', win().location.pathname + win().location.hash, '/#' + unknownId)
  check('Unknown ID restores Korean home', doc().querySelectorAll('.home-series-row').length, koreanCatalog.series.length)
  check('No Vite overlay', !!doc().querySelector('vite-error-overlay'), false)
  document.querySelector('#state').textContent = 'PASS'
} catch (error) {
  results.push({ error: String(error) })
  document.querySelector('#state').textContent = 'FAIL'
}
document.querySelector('#results').textContent = JSON.stringify({ userAgent: navigator.userAgent, results }, null, 2)
