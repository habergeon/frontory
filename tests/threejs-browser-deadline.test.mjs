import { test } from 'node:test'
import assert from 'node:assert/strict'
import { spawn } from 'node:child_process'
import { mkdtemp, readFile, rm } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import path from 'node:path'

const alive = (pid) => {
  try {
    process.kill(pid, 0)
    return true
  } catch {
    return false
  }
}
for (const phase of ['launch', 'work', 'close', 'evidence']) {
  test(
    `runner bounds never-resolving ${phase} and cleans only its owned tree`,
    { timeout: 8_000 },
    async () => {
      const dir = await mkdtemp(path.join(tmpdir(), 'threejs-deadline-'))
      const output = path.join(dir, 'evidence.json')
      const pidFile = path.join(dir, 'sentinel.pid')
      const start = Date.now()
      const child = spawn(
        process.execPath,
        [
          'scripts/check-threejs-browser.mjs',
          '--case',
          'runtime',
          '--probe-deadline',
          phase,
        ],
        {
          env: {
            ...process.env,
            THREEJS_TIMEOUT_MS: '800',
            THREEJS_CLOSE_MS: '100',
            THREEJS_EVIDENCE: output,
            THREEJS_PROBE_PID_FILE: pidFile,
          },
          stdio: ['ignore', 'pipe', 'pipe'],
          windowsHide: true,
        },
      )
      let logs = ''
      child.stdout.on('data', (chunk) => {
        logs += chunk
      })
      child.stderr.on('data', (chunk) => {
        logs += chunk
      })
      let sentinel
      try {
        const code = await new Promise((resolve, reject) => {
          child.on('error', reject)
          child.on('exit', resolve)
        })
        sentinel = Number(await readFile(pidFile, 'utf8'))
        const evidence = JSON.parse(await readFile(output, 'utf8'))
        assert.equal(code, 1, logs)
        assert.ok(
          Date.now() - start < 4_000,
          'total deadline including force/evidence',
        )
        assert.match(
          evidence.failure.message,
          phase === 'close'
            ? /browserClosed timed out/
            : phase === 'evidence'
              ? /Evidence write timed out/
              : /total deadline exceeded/,
        )
        assert.deepEqual(evidence.cleanup.remainingOwnedProcesses, [])
        if (phase === 'launch')
          assert.equal(
            evidence.browserProcesses,
            undefined,
            'sentinel PID was never reported over IPC',
          )
        assert.equal(
          alive(sentinel),
          false,
          'unreported launch descendants must also stop',
        )
        assert.equal(alive(evidence.runnerPid), false)
        assert.ok(alive(process.pid), 'unrelated test process remains alive')
        assert.ok(evidence.cleanup.forcedOwnedTree)
      } finally {
        if (alive(child.pid)) child.kill('SIGKILL')
        if (sentinel && alive(sentinel)) process.kill(sentinel, 'SIGKILL')
        await rm(dir, { recursive: true, force: true })
      }
    },
  )
}
