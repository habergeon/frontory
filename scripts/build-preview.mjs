import { build } from 'esbuild'

await build({
  entryPoints: ['src/preview/runtime-entry.ts'],
  outfile: 'src/preview/runtime.generated.js',
  bundle: true,
  minify: true,
  format: 'iife',
  globalName: 'StudyRuntime',
  platform: 'browser',
  target: ['es2022'],
  legalComments: 'inline',
})
console.log('Preview runtime bundled locally.')
