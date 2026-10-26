import { test } from 'node:test'
import assert from 'node:assert/strict'
import * as semantics from '../scripts/generated-source-semantics.mjs'

test('semantic comparison accepts formatting and rejects operators, literals, regexps, comments and raw templates', async () => {
  await semantics.assertGeneratedSemantics(
    'a.js',
    '// note\nconst n={x:.2};',
    '// note\nconst n = { x: 0.2 }\n',
  )
  for (const [before, after] of [
    ['const n=1+2', 'const n=1-2'],
    ['const n="hello"', 'const n="Hello"'],
    ['const n=/a+/g', 'const n=/a*/g'],
    ['// hi\nlet n=1', '// bye\nlet n=1'],
    [
      'String.raw`a' + String.fromCharCode(92) + 'n`',
      'String.raw`a' + String.fromCharCode(10) + '`',
    ],
  ]) {
    await assert.rejects(
      semantics.assertGeneratedSemantics('a.js', before, after),
    )
  }
})

test('HTML comparison preserves inline boundary spaces and whitespace-sensitive text', async () => {
  await semantics.assertGeneratedSemantics(
    'a.html',
    '<div><p>Hello <b>world</b> !</p></div>',
    '<div>\n  <p>Hello <b>world</b> !</p>\n</div>\n',
  )
  for (const [before, after] of [
    ['<p>Hello <b>world</b></p>', '<p>Hello<b>world</b></p>'],
    ['<pre>  a\n b</pre>', '<pre>a b</pre>'],
  ])
    await assert.rejects(
      semantics.assertGeneratedSemantics('a.html', before, after),
    )
})

for (const [name, before, after] of [
  ['pre leading spaces', '<pre>  a\n b</pre>', '<pre>a\n b</pre>'],
  ['pre trailing spaces', '<pre>a  </pre>', '<pre>a</pre>'],
  [
    'block leading spaces under pre',
    '<pre><div>  a</div></pre>',
    '<pre><div>a</div></pre>',
  ],
  [
    'block trailing spaces under pre',
    '<pre><div>a  </div></pre>',
    '<pre><div>a</div></pre>',
  ],
]) {
  test(`HTML comparison rejects changes to ${name}`, async () => {
    await semantics.assertGeneratedSemantics('sensitive.html', before, before)
    await assert.rejects(
      semantics.assertGeneratedSemantics('sensitive.html', before, after),
    )
  })
}

test('Markdown prose spacing can change while inline code and fences retain exact content', async () => {
  await semantics.assertGeneratedSemantics(
    'a.md',
    'A  paragraph\n',
    'A paragraph\n',
  )
  await assert.rejects(
    semantics.assertGeneratedSemantics('a.md', '`["  "]`\n', '`[" "]`\n'),
  )
  await assert.rejects(
    semantics.assertGeneratedSemantics(
      'a.md',
      '```js\nconst x="  "\n```\n',
      '```js\nconst x=" "\n```\n',
    ),
  )
})

test('CSS comparison accepts formatting and retains values, strings, selector spaces and media constraints', async () => {
  await semantics.assertGeneratedSemantics(
    'a.css',
    'a[lang=ko]{color:red;font-size:.9em}@media(max-width:600px){a{color:red}}',
    "a[lang='ko'] {\n  color: red;\n  font-size: 0.9em;\n}\n@media (max-width: 600px) { a { color: red; } }\n",
  )
  for (const [before, after] of [
    ['a{color:red}', 'a{color:blue}'],
    ['a{content:"a  b"}', 'a{content:"a b"}'],
    ['.a .b{color:red}', '.a.b{color:red}'],
    ['a{width:1px}', 'a{width:1em}'],
    [
      '@media(max-width:600px){a{color:red}}',
      '@media(max-width:601px){a{color:red}}',
    ],
    ['a{--label:a  b}', 'a{--label:a b}'],
  ])
    await assert.rejects(
      semantics.assertGeneratedSemantics('a.css', before, after),
    )
})

test('YAML comparison accepts layout while preserving scalar values and block whitespace', async () => {
  for (const extension of ['yaml', 'yml']) {
    await semantics.assertGeneratedSemantics(
      'a.' + extension,
      'a: [1,2]\n',
      'a: [1, 2]\n',
    )
    for (const [before, after] of [
      ['a: 1\n', 'a: 2\n'],
      ['a: "a  b"\n', 'a: "a b"\n'],
      ['a: |\n  x  y\n', 'a: |\n  x y\n'],
    ])
      await assert.rejects(
        semantics.assertGeneratedSemantics('a.' + extension, before, after),
      )
  }
})

test('noncomputed numeric property spellings agree without masking keys or runtime values', async () => {
  await semantics.assertGeneratedSemantics(
    'a.js',
    'const a={"2":"two"}',
    'const a={2:"two"}',
  )
  for (const [before, after] of [
    ['const a={"2":"two"}', 'const a={3:"two"}'],
    ['const a={["2"]:1}', 'const a={[2]:1}'],
    ['const a="2"', 'const a=2'],
  ])
    await assert.rejects(
      semantics.assertGeneratedSemantics('a.js', before, after),
    )
})

test('JSX explicit spaces and top-level ASI guards retain runtime structure', async () => {
  await semantics.assertGeneratedSemantics(
    'a.jsx',
    'const a=<p>Hello <b>world</b></p>',
    "const a=<p>Hello{' '}<b>world</b></p>",
  )
  await semantics.assertGeneratedSemantics(
    'a.js',
    '(function(){})()',
    ';(function(){})()',
  )
  await semantics.assertGeneratedSemantics(
    'a.jsx',
    'const a=<p>{ready && <> <b>x</b></>}</p>',
    "const a=<p>{ready && <>{' '}<b>x</b></>}</p>",
  )
  await assert.rejects(
    semantics.assertGeneratedSemantics(
      'a.jsx',
      'const a=<Custom>Hello <b>x</b></Custom>',
      "const a=<Custom>Hello{' '}<b>x</b></Custom>",
    ),
  )
  await assert.rejects(
    semantics.assertGeneratedSemantics(
      'a.jsx',
      'const a=<p><Custom><> <b>x</b></></Custom></p>',
      "const a=<p><Custom><>{' '}<b>x</b></></Custom></p>",
    ),
  )
  await assert.rejects(
    semantics.assertGeneratedSemantics(
      'a.jsx',
      "const a=<p>{'x'}</p>",
      "const a=<p>{'y'}</p>",
    ),
  )
  await assert.rejects(
    semantics.assertGeneratedSemantics(
      'a.jsx',
      'const a=<p>Hello <b>world</b></p>',
      'const a=<p>Hello<b>world</b></p>',
    ),
  )
  await assert.rejects(
    semantics.assertGeneratedSemantics(
      'a.js',
      'while(x);run()',
      'while(x){run()}',
    ),
  )
})

test('HTML JSON-LD uses JSON values and unknown data-script bodies stay exact', async () => {
  await semantics.assertGeneratedSemantics(
    'a.html',
    '<script type="application/ld+json">{"x":1}</script>',
    '<script type="application/ld+json">{ "x": 1 }</script>',
  )
  await assert.rejects(
    semantics.assertGeneratedSemantics(
      'a.html',
      '<script type="application/ld+json">{"x":1}</script>',
      '<script type="application/ld+json">{"x":2}</script>',
    ),
  )
  await assert.rejects(
    semantics.assertGeneratedSemantics(
      'a.html',
      '<script type="text/plain">a  b</script>',
      '<script type="text/plain">a b</script>',
    ),
  )
})
