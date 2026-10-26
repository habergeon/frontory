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
