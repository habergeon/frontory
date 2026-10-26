import { build } from 'esbuild'

for (const name of ['core', 'controls']) {
  await build({
    entryPoints: [`src/preview/three-${name}-entry.ts`],
    outfile: `src/preview/three-${name}.generated.js`,
    bundle: true,
    minify: true,
    format: 'esm',
    platform: 'browser',
    target: ['es2022'],
    legalComments: 'inline',
    plugins:
      name === 'controls'
        ? [
            {
              name: 'exact-three-external',
              setup(builder) {
                builder.onResolve({ filter: /^three$/ }, () => ({
                  path: 'three',
                  external: true,
                }))
              },
            },
          ]
        : [],
  })
}
console.log('Three.js preview modules bundled locally.')
