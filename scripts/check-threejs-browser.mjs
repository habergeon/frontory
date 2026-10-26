import assert from 'node:assert/strict'
import { createServer } from 'vite'
import { mkdtemp, rm, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import path from 'node:path'
import { pathToFileURL } from 'node:url'
import { runStorage, runRuntime } from '../tests/browser/threejs-learning.js'

const selected = process.argv[process.argv.indexOf('--case') + 1]
assert.ok(
  ['storage', 'runtime'].includes(selected),
  'Use --case storage|runtime',
)
// Reuse an installed Playwright/Chromium or explicitly select local installations.
const playwright =
  process.env.PLAYWRIGHT_MODULE ??
  'C:/Users/johjh/AppData/Local/npm-cache/_npx/9833c18b2d85bc59/node_modules/playwright/index.mjs'
const executablePath =
  process.env.CHROMIUM_PATH ??
  'C:/Users/johjh/AppData/Local/Temp/frontory-e05-browser-NYfuH6/chromium-1248/chrome-win64/chrome.exe'
const { chromium } = await import(pathToFileURL(playwright).href)
const cache = await mkdtemp(path.join(tmpdir(), 'frontory-threejs-'))
let server, browser
const errors = []
const evidence = { case: selected, checks: [], errors, cleanup: {} }
const timeout = setTimeout(() => {
  console.error('Browser verification timed out')
  process.exitCode = 1
  void browser?.close()
  void server?.close()
}, 120_000)
try {
  server = await createServer({
    cacheDir: cache,
    server: { host: '127.0.0.1', port: 0 },
    logLevel: 'error',
  })
  await server.listen()
  const base = `http://127.0.0.1:${server.httpServer.address().port}`
  evidence.server = { pid: process.pid, port: server.httpServer.address().port }
  browser = await chromium.launch({
    executablePath,
    headless: true,
    args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader'],
  })
  evidence.browserProcesses = (
    await (
      await browser.newBrowserCDPSession()
    ).send('SystemInfo.getProcessInfo')
  ).processInfo.map((item) => item.id)
  const page = await browser.newPage({
    viewport: { width: 1500, height: 1000 },
  })
  page.setDefaultTimeout(20_000)
  page.on('pageerror', (error) =>
    errors.push({ message: error.message, stack: error.stack }),
  )
  try {
    evidence.checks = await (selected === 'storage' ? runStorage : runRuntime)(
      page,
      base,
    )
  } catch (error) {
    evidence.failure = {
      message: error.message,
      body: (await page.locator('body').innerText()).slice(-5000),
      storage: await page.evaluate(() => ({ ...localStorage })),
    }
    throw error
  }
  assert.deepEqual(errors, [])
} finally {
  clearTimeout(timeout)
  try {
    await browser?.close()
    evidence.cleanup.browserClosed = true
    evidence.cleanup.remainingOwnedProcesses = (
      evidence.browserProcesses ?? []
    ).filter((pid) => {
      try {
        process.kill(pid, 0)
        return true
      } catch {
        return false
      }
    })
  } finally {
    await server?.close()
    evidence.cleanup.serverClosed = true
    await rm(cache, { recursive: true, force: true })
  }
  const output =
    process.env.THREEJS_EVIDENCE ??
    path.join(tmpdir(), `frontory-threejs-${selected}-${Date.now()}.json`)
  if (output) {
    const destination = evidence.failure
      ? output.replace(/\.json$/, '') + '-failure-' + Date.now() + '.json'
      : output
    evidence.output = destination
    await writeFile(destination, JSON.stringify(evidence, null, 2))
  }
  assert.deepEqual(evidence.cleanup.remainingOwnedProcesses, [])
}
console.log(JSON.stringify({ result: 'PASS', ...evidence }))
