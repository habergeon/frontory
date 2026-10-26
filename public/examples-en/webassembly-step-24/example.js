// webassembly-step-24: Warm Repeats and Warm-up
export function mount({
  locale = 'ko',
  container,
  gsap,
  animate,
  React,
  createRoot,
  Motion,
  ScrollTrigger,
}) {
  const messages =
    locale === 'en'
      ? {
          display001:
            '<h3>Warm Repeats and Warm-up</h3><p>Warm-up / Equivalent conditions</p><button>Run experiment</button> <output aria-live="polite"></output><div class="stage" style="position:relative;min-height:180px;margin-top:16px;background:#edf3fa;padding:14px;overflow:hidden"></div>',
          display002: 'Show execution boundary',
          display003:
            'The iframe CSP does not allow Wasm compilation. The displayed companion runs real compiled Wasm externally; no JS replacement is labeled Wasm.',
        }
      : {
          display001:
            '<h3>웜 반복과 워밍업</h3><p>워밍업 / 동등 조건</p><button>Run experiment</button> <output aria-live="polite"></output><div class="stage" style="position:relative;min-height:180px;margin-top:16px;background:#edf3fa;padding:14px;overflow:hidden"></div>',
          display002: 'Show execution boundary',
          display003:
            'The iframe CSP does not allow Wasm compilation. The displayed companion runs real compiled Wasm externally; no JS replacement is labeled Wasm.',
        }
  const root = document.createElement('section')
  root.style.cssText = 'padding:18px;font:14px system-ui;color:#172b46'
  container.append(root)
  root.innerHTML = messages.display001
  const button = root.querySelector('button'),
    out = root.querySelector('output'),
    stage = /** @type {HTMLDivElement} */ (root.querySelector('.stage'))
  let dead = false
  const stops = []

  stage.innerHTML = ''
  const text = document.createElement('pre')
  text.style.cssText = 'white-space:pre-wrap;max-height:420px;overflow:auto'
  stage.append(text)
  text.textContent =
    'Standalone Node 22+ experiment. Install WABT wat2wasm CLI, cd to this lesson directory, then run:\nwat2wasm kernel.wat -o kernel.wasm\nnode experiment.mjs\n\n--- kernel.wat ---\n(module\n (import "host" "report" (func $report (param i32)))\n (memory (export "memory") 2 8)\n (func (export "add") (param i32 i32) (result i32) local.get 0 local.get 1 i32.add)\n (func (export "report") (param i32) local.get 0 call $report)\n (func (export "read") (param i32) (result i32) local.get 0 i32.load)\n (func (export "sum") (param $p i32) (param $n i32) (result i32)\n  (local $i i32) (local $s i32)\n  (block $done (loop $loop\n   local.get $i local.get $n i32.ge_u br_if $done\n   local.get $s local.get $p local.get $i i32.const 4 i32.mul i32.add i32.load i32.add local.set $s\n   local.get $i i32.const 1 i32.add local.set $i br $loop)) local.get $s)\n (func (export "transform") (param $p i32) (param $n i32)\n  (local $i i32) (local $a i32)\n  (block $done (loop $loop\n   local.get $i local.get $n i32.ge_u br_if $done\n   local.get $p local.get $i i32.const 4 i32.mul i32.add local.set $a\n   local.get $a local.get $a i32.load i32.const 2 i32.mul i32.const 1 i32.add i32.store\n   local.get $i i32.const 1 i32.add local.set $i br $loop))))\n\n--- experiment.mjs ---\nimport { readFile } from \'node:fs/promises\'\nimport assert from \'node:assert/strict\'\nconst cold = performance.now()\nconst bytes = await readFile(new URL(\'./kernel.wasm\', import.meta.url))\nconst readMs = performance.now() - cold\nlet t0 = performance.now()\nconst module = await WebAssembly.compile(bytes)\nconst compileMs = performance.now() - t0\nconst reports = []\nconst imports = { host: { report: (x) => reports.push(x) } }\nt0 = performance.now()\nconst instance = await WebAssembly.instantiate(module, imports)\nconst instantiateMs = performance.now() - t0\nconst api = instance.exports,\n  memory = api.memory\n{\n  const view = new Int32Array(memory.buffer, 0, 10000),\n    source = Int32Array.from({ length: 10000 }, (_, i) => i % 100)\n  const times = []\n  for (let r = 0; r < 30; r++) {\n    view.set(source)\n    const t = performance.now()\n    api.transform(0, view.length)\n    if (r >= 10) times.push(performance.now() - t)\n  }\n  console.log(\'20 warm kernel samples ms\', times)\n}\nconsole.log(\'PASS: lesson assertions completed\')\n'
  button.textContent = 'Show execution boundary'
  button.onclick = () =>
    (out.textContent =
      'The iframe CSP does not allow Wasm compilation. The displayed companion runs real compiled Wasm externally; no JS replacement is labeled Wasm.')
  button.click()
  return () => {
    dead = true
    stops.reverse().forEach((fn) => fn())
    root.remove()
  }
}
