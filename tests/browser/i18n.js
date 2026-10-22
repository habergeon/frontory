const frame = document.querySelector('#app')
const results = []
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
  check('English catalog count', doc().querySelectorAll('.home-series-row').length, 4)
  const homeSearch = doc().querySelector('input[type="search"]')
  for (const [query, count] of [['no-such-series', 0], ['react', 1], ['언어와 웹 기초', 2], ['Languages and web fundamentals', 2], ['', 4]]) {
    await search(homeSearch, query)
    check('Home search ' + query, doc().querySelectorAll('.home-series-row').length, count)
    check('Home search result wording ' + query, doc().querySelector('.home-result-count').textContent, count + ' series')
  }
  check('Home unit singular', doc().querySelector('.home-series-progress').textContent, '1 unit')
  await click([...doc().querySelectorAll('.home-series-row')].find(row => row.querySelector('h3').textContent === 'JavaScript').querySelector('button'))
  await wait(() => doc().querySelector('.workspace') && doc().querySelector('.monaco-editor') && doc().querySelector('.workspace iframe'))
  check('English selection uses published stable ID', win().location.hash, '#javascript-step-02')
  check('English title matches current lesson', doc().title.includes(doc().querySelector('.current-lesson h3').textContent), true)
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
  for (const [query, count] of [['no-such-series', 0], ['react', 1], ['언어와 웹 기초', 2], ['Languages and web fundamentals', 2], ['', 4]]) {
    await search(dialog.querySelector('input'), query)
    check('Navigator search ' + query, dialog.querySelectorAll('.series-card').length, count)
    check('Navigator search count wording ' + query, dialog.querySelector('.series-tools p').textContent.startsWith(count + ' series ·'), true)
  }
  check('Navigator singular unit', dialog.querySelector('.series-card').textContent.includes('1 unit · 0 completed'), true)
  await click(dialog.querySelector('.dialog-header button'))
  await click(doc().querySelector('.current-lesson button'))
  await wait(() => doc().querySelector('.document-dialog article h1'))
  check('Navigator requests actual English document', /[A-Za-z]/.test(doc().querySelector('.document-dialog article h1').textContent), true)
  check('English document has no Korean lesson fallback', /[가-힣]/.test(doc().querySelector('.document-dialog article h1').textContent), false)
  await click(doc().querySelector('.document-dialog .dialog-header button'))
  await click(language())
  await click(doc().querySelector('.unit-pagination button:last-child'))
  check('Korean next selects canonical unpublished ID', win().location.hash, '#javascript-step-03')
  await click(language())
  check('Unpublished ID remains selected in English', win().location.pathname + win().location.hash, '/en/#javascript-step-03')
  check('English unavailable message', doc().body.textContent.includes('This lesson is not available in English yet.'), true)
  check('No Korean navigator fallback', doc().querySelector('.current-lesson'), null)
  const source = [...doc().querySelectorAll('a')].find(link => link.textContent === 'Read the Korean lesson')
  check('Explicit Korean source URL', source.getAttribute('href'), '/#javascript-step-03')
  await click(source)
  check('Korean source control restores same unit', win().location.pathname + win().location.hash, '/#javascript-step-03')
  check('Korean navigator is restored', !!doc().querySelector('.current-lesson'), true)
  check('No Vite overlay', !!doc().querySelector('vite-error-overlay'), false)
  document.querySelector('#state').textContent = 'PASS'
} catch (error) {
  results.push({ error: String(error) })
  document.querySelector('#state').textContent = 'FAIL'
}
document.querySelector('#results').textContent = JSON.stringify({ userAgent: navigator.userAgent, results }, null, 2)
