import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { writeGeneratedFile } from './example-presentation.mjs'

const read = file => JSON.parse(fs.readFileSync(file, 'utf8'))

// Build-time prose only. The original companion remains the executable owner.
export function companionOutputs({ owner, series } = {}) {
  const manifest = read('content/locales/en/companions.json')
  const prose = read('content/locales/en/companion-prose.json')
  const entries = manifest.entries.filter(entry =>
    (owner === undefined || entry.producer === owner) && (!series || entry.seriesId === series))
  const outputs = {}
  for (const entry of entries) {
    if (!entry.englishPath) continue
    if (Object.hasOwn(prose.documents, entry.englishPath)) {
      outputs[entry.englishPath] = prose.documents[entry.englishPath]
      continue
    }
    const translations = prose.translations.filter(pair => pair.path === entry.path)
    outputs[entry.englishPath] = `# ${path.posix.basename(entry.path)} — English reading guide\n\n` +
      `Read the [original source](./${path.posix.basename(entry.path)}) and [execution guidance](./COMPANIONS.en.md). ` +
      'This guide translates prose and visible text; it is not an executable copy. Source line numbers identify the original reading locations.\n\n' +
      translations.map(pair => `- Line ${pair.line}: ${pair.english}${pair.english.endsWith(' ') ? '<!-- text fragment -->' : ''}`).join('\n') + '\n'
  }
  for (const unitId of new Set(entries.map(entry => entry.unitId))) {
    const files = entries.filter(entry => entry.unitId === unitId)
    const seriesId = files[0].seriesId
    const group = seriesId === 'webassembly' ? 'wat' : seriesId === 'webgl' ? 'scene' : seriesId === 'react-three-fiber' ? 'r3f' : seriesId
    let guidance = prose.guidance[group]
    if (!guidance) throw Error(`Missing companion execution guidance: ${unitId}`)
    if (seriesId === 'svelte') guidance += '\n\nIn an existing Svelte 5 Vite project, copy App.svelte and every supplied .svelte/.svelte.js file into src/ together, keeping relative imports intact. Install that project’s dependencies with `npm install`, then run `npm run dev` and open the printed local URL. Use the Svelte Vite plugin so workspace.svelte.js uses compileModule. Test the controls, then unmount the component and inspect subscriptions, timers and event listeners.'
    if (seriesId === 'typescript') guidance += '\n\nIn an isolated project with TypeScript installed: `npx tsc --strict --noEmit --target ES2023 --lib ES2023,DOM --skipLibCheck lesson.ts`.'
    if (seriesId === 'html') guidance += '\n\nRun `python -m http.server 8000 --bind 127.0.0.1` in a complete copy of this folder, then open http://localhost:8000/index.html .'
    if (seriesId === 'webassembly') guidance += `\n\n${unitId.includes('-step-') ? 'Run `wat2wasm kernel.wat -o kernel.wasm`, then `node experiment.mjs`. Keep worker.mjs alongside experiment.mjs when supplied.' : 'Run `node benchmark.mjs` with the supplied kernel.wasm, or rebuild it with `wat2wasm kernel.wat -o kernel.wasm` first.'} Record tool versions and assertion output; timing observations do not establish relative performance.`
    if (seriesId === 'playwright' && !unitId.includes('-step-')) guidance = 'Use an isolated Playwright project with @playwright/test and Chromium installed. These manual specs use a separately running Frontory server; no companion HTTP fixture or generated config is supplied.'
    if (seriesId === 'playwright') guidance += unitId.includes('-step-')
      ? '\n\nCopy the complete folder into an empty test project. Run `npm init -y`, `npm install -D @playwright/test`, `npx playwright install chromium`, then `npx playwright test --config=playwright.config.mjs`. Pin the resolved package version and commit that project’s package-lock.json. Use a fresh browser context. Review captured visual baselines before a normal rerun. The Notes input uses the textbox role to distinguish it from the Notes region. ci.yml, when supplied, assumes this separate project root and its package-lock.json.'
      : '\n\nThese specs target the Korean production UI and preserve Korean locators and memo fixtures. Run the repository’s development server separately. Copy the spec into an isolated @playwright/test project and configure testDir/use.baseURL for that server; set FRONTORY_TEST_ORIGIN if needed. Run `npx playwright test` in that project with a fresh context. English-route testing requires separate reviewed UI locators. Review newly captured screenshots before a normal rerun; the local 2D canvas fixture does not validate WebGL scene correctness.'
    if (unitId === 'html-step-18') guidance += '\n\nThe original HTML still loads captions.vtt with srclang="ko". Select Korean in that fixture. [English captions](./captions.en.vtt) are supplied separately for reading/download and are not relabeled as the original Korean track.'
    if (unitId === 'playwright-step-19') guidance += '\n\nThis spec installs the clock after navigation and pauses it before typing. runFor(499) preserves Unsaved, and the next runFor(1) reaches the existing 500ms save boundary. Installing a clock alone does not pause time.'
    outputs[files[0].guidancePath] = `# ${unitId} companion execution\n\n${guidance}\n\n` +
      files.map(entry => `- [${path.posix.basename(entry.path)}](./${path.posix.basename(entry.path)})${entry.englishPath ? ` · [English reading](./${path.posix.basename(entry.englishPath)})` : ' · preserved original'}`).join('\n') + '\n'
  }
  return outputs
}

export function writeCompanionGuidance(owner, series) {
  for (const [file, contents] of Object.entries(companionOutputs({ owner, series }))) {
    writeGeneratedFile(file, contents)
  }
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  // Manual companions have no generator owner; never write their originals.
  writeCompanionGuidance(null)
}
