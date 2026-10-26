import assert from 'node:assert/strict'
import { once } from 'node:events'
import { fork, spawn, spawnSync } from 'node:child_process'
import { mkdtemp, rm, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const args = process.argv.slice(2)
const selected = args[args.indexOf('--case') + 1]
assert.ok(
  ['storage', 'runtime', 'format', 'learning'].includes(selected),
  'Use --case storage|runtime|format|learning',
)
const totalMs = Number(process.env.THREEJS_TIMEOUT_MS ?? 120_000)
const closeMs = Number(process.env.THREEJS_CLOSE_MS ?? 3_000)
assert.ok(Number.isFinite(totalMs) && totalMs > 0)
assert.ok(Number.isFinite(closeMs) && closeMs > 0)
const output =
  process.env.THREEJS_EVIDENCE ??
  path.join(tmpdir(), `frontory-threejs-${selected}-${Date.now()}.json`)
const bounded = async (action, ms, label) => {
  let timer
  try {
    return await Promise.race([
      Promise.resolve().then(action),
      new Promise((_, reject) => {
        timer = setTimeout(() => reject(Error(label + ' timed out')), ms)
      }),
    ])
  } finally {
    clearTimeout(timer)
  }
}
const alive = (pid) => {
  try {
    process.kill(pid, 0)
    return true
  } catch {
    return false
  }
}

if (!args.includes('--worker')) {
  // This process owns the child tree even when browser launch never reports a PID.
  const child = fork(fileURLToPath(import.meta.url), [...args, '--worker'], {
    env: { ...process.env, THREEJS_EVIDENCE: output },
    stdio: ['ignore', 'inherit', 'inherit', 'ipc'],
    detached: process.platform !== 'win32',
  })
  const evidence = { case: selected, runnerPid: child.pid, cleanup: {}, output }
  let ending = false
  child.on('message', (message) => {
    Object.assign(evidence, message)
    if (message.failure) void fail(message.failure.message)
  })
  const fail = async (reason) => {
    if (ending) return
    ending = true
    clearTimeout(deadline)
    // A second bound includes forced termination and emergency evidence writing.
    setTimeout(() => process.exit(1), 2_000)
    evidence.failure = { message: reason }
    const owned = [child.pid, ...(evidence.browserProcesses ?? [])]
    if (process.platform === 'win32') {
      if (alive(child.pid))
        spawnSync('taskkill', ['/PID', String(child.pid), '/T', '/F'], {
          windowsHide: true,
          timeout: 1_000,
          stdio: 'ignore',
        })
      for (const pid of owned.filter(alive)) {
        try {
          process.kill(pid, 'SIGKILL')
        } catch {}
      }
    } else {
      try {
        process.kill(-child.pid, 'SIGKILL')
      } catch {}
      for (const pid of owned.filter(alive)) {
        try {
          process.kill(pid, 'SIGKILL')
        } catch {}
      }
    }
    const settleBy = Date.now() + 400
    while (owned.some(alive) && Date.now() < settleBy)
      await new Promise((resolve) => setTimeout(resolve, 20))
    evidence.cleanup.forcedOwnedTree = child.pid
    evidence.cleanup.remainingOwnedProcesses = owned.filter(alive)
    try {
      await bounded(
        () => writeFile(output, JSON.stringify(evidence, null, 2)),
        250,
        'Emergency evidence',
      )
    } catch {}
    console.error(reason)
    process.exit(1)
  }
  const deadline = setTimeout(
    () => void fail('Browser verification total deadline exceeded'),
    totalMs,
  )
  child.on('error', (error) => void fail(error.message))
  child.on('exit', (code, signal) => {
    if (code !== 0 || signal)
      void fail(`Browser worker failed: ${signal ?? code}`)
    else {
      clearTimeout(deadline)
      ending = true
    }
  })
} else {
  const evidence = {
    case: selected,
    checks: [],
    errors: [],
    cleanup: {},
    output,
  }
  const publish = () => process.send?.(evidence)
  let server, browser, cache, failure
  const probe = args[args.indexOf('--probe-deadline') + 1]
  try {
    if (args.includes('--probe-deadline')) {
      assert.ok(['launch', 'work', 'close', 'evidence'].includes(probe))
      const sentinel = spawn(
        process.execPath,
        ['-e', 'setInterval(()=>{},1000)'],
        { stdio: 'ignore', windowsHide: true },
      )
      if (process.env.THREEJS_PROBE_PID_FILE)
        await writeFile(
          process.env.THREEJS_PROBE_PID_FILE,
          String(sentinel.pid),
        )
      if (probe !== 'launch') {
        evidence.browserProcesses = [sentinel.pid]
        publish()
      }
      // launch intentionally hangs after creating a descendant but before PID IPC.
      if (probe === 'launch' || probe === 'work') await new Promise(() => {})
      browser = {
        close:
          probe === 'close'
            ? () => new Promise(() => {})
            : async () => {
                const exited = once(sentinel, 'exit')
                sentinel.kill()
                await exited
              },
      }
    } else {
      const { createServer } = await import('vite')
      const { runStorage, runRuntime, runFormat, runLearning } =
        await import('../tests/browser/threejs-learning.js')
      const { runHtmlRuntimeFixtures } =
        await import('../tests/browser/html-runtime.js')
      const playwright =
        process.env.PLAYWRIGHT_MODULE ??
        'C:/Users/johjh/AppData/Local/npm-cache/_npx/9833c18b2d85bc59/node_modules/playwright/index.mjs'
      const executablePath =
        process.env.CHROMIUM_PATH ??
        'C:/Users/johjh/AppData/Local/Temp/frontory-e05-browser-NYfuH6/chromium-1248/chrome-win64/chrome.exe'
      const { chromium } = await import(pathToFileURL(playwright).href)
      cache = await mkdtemp(path.join(tmpdir(), 'frontory-threejs-'))
      server = await createServer({
        cacheDir: cache,
        server: { host: '127.0.0.1', port: 0 },
        logLevel: 'error',
      })
      await server.listen()
      const base = `http://127.0.0.1:${server.httpServer.address().port}`
      evidence.server = {
        pid: process.pid,
        port: server.httpServer.address().port,
      }
      publish()
      browser = await chromium.launch({
        executablePath,
        headless: true,
        timeout: totalMs,
        args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader'],
      })
      evidence.browserProcesses = (
        await (
          await browser.newBrowserCDPSession()
        ).send('SystemInfo.getProcessInfo')
      ).processInfo.map((item) => item.id)
      publish()
      const page = await browser.newPage({
        viewport: { width: 1500, height: 1000 },
      })
      page.setDefaultTimeout(20_000)
      page.on('pageerror', (error) =>
        evidence.errors.push({ message: error.message, stack: error.stack }),
      )
      evidence.checks = await (
        selected === 'learning'
          ? runLearning
          : selected === 'storage'
            ? runStorage
            : selected === 'format'
              ? runFormat
              : runRuntime
      )(page, base)
      if (selected === 'runtime')
        evidence.producer = await runHtmlRuntimeFixtures(page, base)
      assert.deepEqual(evidence.errors, [])
    }
  } catch (error) {
    failure = error
  } finally {
    // Every cleanup attempt is bounded; the supervisor owns the final tree kill.
    for (const [name, action] of [
      ['browserClosed', () => browser?.close()],
      ['serverClosed', () => server?.close()],
      [
        'cacheRemoved',
        () => cache && rm(cache, { recursive: true, force: true }),
      ],
    ]) {
      try {
        await bounded(action, closeMs, name)
        evidence.cleanup[name] = true
      } catch (error) {
        failure ??= error
        evidence.cleanup[name] = false
      }
    }
    evidence.cleanup.remainingOwnedProcesses = (
      evidence.browserProcesses ?? []
    ).filter(alive)
    if (evidence.cleanup.remainingOwnedProcesses.length)
      failure ??= Error('Owned processes remain')
    if (failure) evidence.failure = { message: failure.message }
    publish()
    try {
      await bounded(
        () =>
          probe === 'evidence'
            ? new Promise(() => {})
            : writeFile(output, JSON.stringify(evidence, null, 2)),
        closeMs,
        'Evidence write',
      )
    } catch (error) {
      failure ??= error
    }
  }
  if (failure) {
    evidence.failure = { message: failure.message }
    publish()
    console.error(failure.message)
    process.exitCode = 1
  } else
    console.log(
      JSON.stringify({
        result: 'PASS',
        case: selected,
        checks: evidence.checks,
        producerCases: Object.keys(evidence.producer ?? {}).length,
        cleanup: evidence.cleanup,
        output,
      }),
    )
  process.disconnect?.()
}
