import { test } from 'node:test'
import assert from 'node:assert/strict'
import { setTimeout as delay } from 'node:timers/promises'
import { mount as mountPromises } from '../src/labs/javascript-step-13/example.js'
import { mount as mountImport } from '../src/labs/javascript-step-23/example.js'

// Run the generated mounts, including their input, output, and file handlers.
function fixture(mount) {
  const previous = globalThis.document
  globalThis.document = {
    createElement(tag) {
      return {
        tag,
        children: [],
        textContent: '',
        handlers: {},
        style: {},
        setAttribute() {},
        addEventListener(event, handler) {
          this.handlers[event] = handler
        },
        append(...nodes) {
          this.children.push(...nodes)
        },
        replaceChildren(...nodes) {
          this.children = nodes
        },
      }
    },
  }
  const container = document.createElement('main')
  const dispose = mount({ container })
  const [, , editor, button, stage, output] = container.children
  return {
    editor,
    button,
    stage,
    output,
    close() {
      dispose()
      globalThis.document = previous
    },
  }
}

async function waitForOutput(output) {
  for (let tries = 0; tries < 100; tries++) {
    if (output.textContent) return JSON.parse(output.textContent)
    await delay(5)
  }
  throw Error('Generated mount did not produce output within 500 ms')
}

test('Promise snapshot observes the actual inner work in both return modes', async () => {
  const lab = fixture(mountPromises)
  try {
    for (const returnPromise of [true, false]) {
      lab.editor.value = JSON.stringify({ returnPromise })
      lab.output.textContent = ''
      await lab.button.handlers.click()
      const events = await waitForOutput(lab.output)
      assert.equal(events.filter((event) => event === 'inner').length, 1)
      assert.equal(events.filter((event) => event === 'chain done').length, 1)
      assert.equal(
        events.indexOf('inner') < events.indexOf('chain done'),
        returnPromise,
      )
    }
  } finally {
    lab.close()
  }
})

test('file import accepts the download envelope while textarea keeps the array contract', async () => {
  const lab = fixture(mountImport)
  try {
    await waitForOutput(lab.output)
    const file = lab.stage.children[0]
    for (const [data, accepted] of [
      [{ schemaVersion: 1, notes: [{ id: 1, title: '한글\n줄바꿈' }] }, true],
      [{ schemaVersion: 2, notes: [] }, false],
      [{ schemaVersion: 1, notes: [{ id: 1, title: 42 }] }, false],
      [{ schemaVersion: 1, notes: {} }, false],
      [[{ id: 1, title: 'A' }], false],
      [null, false],
    ]) {
      file.files = [new Blob([JSON.stringify(data)])]
      await file.onchange()
      assert.equal(JSON.parse(lab.output.textContent).accepted, accepted)
    }
    file.files = [new Blob(['{'])]
    await file.onchange()
    assert.match(JSON.parse(lab.output.textContent).error, /SyntaxError/)
    lab.editor.value = JSON.stringify([{ id: 1, title: 'A' }])
    await lab.button.handlers.click()
    assert.equal(JSON.parse(lab.output.textContent).accepted, true)
  } finally {
    lab.close()
  }
})
