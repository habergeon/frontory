import prettier from 'prettier/standalone'
import babel from 'prettier/plugins/babel'
import estree from 'prettier/plugins/estree'
import html from 'prettier/plugins/html'
import postcss from 'prettier/plugins/postcss'
import typescript from 'prettier/plugins/typescript'
import type { Options, ParserOptions } from 'prettier'
import commonOptions from '../../prettier-options.json' with { type: 'json' }
import { parseHtmlSource } from '../shared/htmlSource.ts'
import type { HtmlSourceInfo } from '../shared/htmlSource.ts'
import type { CodeLanguage } from '../shared/drafts.ts'

type Position = { line: number; column: number }
export class CodeFormatError extends Error {
  position?: Position
  constructor(cause: unknown, position?: Position) {
    // Keep the parser's original cause, but never show its block-relative codeframe.
    const summary = (
      cause instanceof Error ? cause.message : String(cause)
    ).split('\n')[0]
    super(summary.replace(/\s*\(\d+:\d+\)\.?$/, ''), { cause })
    this.name = 'CodeFormatError'
    this.position = position
  }
}
const plugins = [babel, estree, html, postcss, typescript]
const format = (source: string, parser: string) =>
  prettier.format(source, { ...commonOptions, parser, plugins } as Options)
const invariant = (condition: boolean) => {
  if (!condition)
    throw new Error('Cannot safely preserve source spans while formatting')
}
const marker = (source: string, kind: string, index: number) => {
  let nonce = 0
  while (source.includes(`STUDY_FORMAT_${kind}_${index}_${nonce}`)) nonce++
  return `STUDY_FORMAT_${kind}_${index}_${nonce}`
}
const splice = (source: string, start: number, end: number, text: string) =>
  source.slice(0, start) + text + source.slice(end)
const positionAt = (source: string, offset: number): Position => {
  const lines = source.slice(0, offset).split(/\r\n|\r|\n/)
  return { line: lines.length, column: lines.at(-1)!.length + 1 }
}
function parserPosition(error: unknown): Position | undefined {
  const loc = (error as { loc?: { start?: Position } & Partial<Position> })?.loc
  const value = loc?.start ?? loc
  return value &&
    Number.isInteger(value.line) &&
    Number.isInteger(value.column) &&
    value.line! > 0 &&
    value.column! > 0
    ? { line: value.line!, column: value.column! }
    : undefined
}
const originalPosition = (error: unknown, source: string, offset: number) => {
  const relative = parserPosition(error)
  if (!relative) return undefined
  const start = positionAt(source, offset)
  return {
    line: start.line + relative.line - 1,
    column:
      relative.line === 1
        ? start.column + relative.column - 1
        : relative.column,
  }
}

// Exact MIME allowlist: parameters and unknown dialects remain untouched.
const javascriptMimes = new Set([
  '',
  'module',
  'application/ecmascript',
  'application/javascript',
  'application/x-ecmascript',
  'application/x-javascript',
  'text/ecmascript',
  'text/javascript',
  'text/javascript1.0',
  'text/javascript1.1',
  'text/javascript1.2',
  'text/javascript1.3',
  'text/javascript1.4',
  'text/javascript1.5',
  'text/jscript',
  'text/livescript',
  'text/x-ecmascript',
  'text/x-javascript',
])
function blockParser(block: HtmlSourceInfo['blocks'][number]) {
  const type = (block.type ?? '').trim().toLowerCase()
  if (block.tag === 'style')
    return type === '' || type === 'text/css' ? 'css' : null
  if (block.src !== null) return null
  return type === 'importmap'
    ? 'json'
    : javascriptMimes.has(type)
      ? 'babel'
      : null
}

// These source offsets are supplied by the installed standalone postcss parser.
// Assert them at the boundary so a parser upgrade cannot silently corrupt text.
interface CssNode {
  type: string
  prop?: string
  value?: { text?: string }
  source?: { startOffset: number; endOffset: number }
  nodes?: CssNode[]
}
async function customDeclarations(source: string) {
  const tree = (await postcss.parsers.css.parse(
    source,
    {} as ParserOptions,
  )) as CssNode
  const declarations: Array<
    CssNode & {
      prop: string
      source: { startOffset: number; endOffset: number }
    }
  > = []
  const visit = (node: CssNode) => {
    if (node.type === 'css-decl' && node.prop?.startsWith('--')) {
      invariant(
        Boolean(
          node.source &&
          Number.isInteger(node.source.startOffset) &&
          Number.isInteger(node.source.endOffset) &&
          node.source.startOffset >= 0 &&
          node.source.endOffset <= source.length &&
          node.source.startOffset < node.source.endOffset,
        ),
      )
      declarations.push(node as (typeof declarations)[number])
    }
    node.nodes?.forEach(visit)
  }
  visit(tree)
  declarations.sort((a, b) => a.source.startOffset - b.source.startOffset)
  invariant(
    declarations.every(
      (node, i) =>
        i === 0 ||
        declarations[i - 1].source.endOffset <= node.source.startOffset,
    ),
  )
  return declarations
}
async function formatCss(source: string) {
  const originals = await customDeclarations(source)
  const saved = originals.map((node, i) => ({
    ...node,
    marker: marker(source, 'CSS', i),
    text: source.slice(node.source.startOffset, node.source.endOffset),
  }))
  let masked = source
  for (const node of saved.toReversed())
    masked = splice(
      masked,
      node.source.startOffset,
      node.source.endOffset,
      `${node.prop}: ${node.marker};`,
    )
  let output = await format(masked, 'css')
  const targets = await customDeclarations(output)
  invariant(targets.length === saved.length)
  for (let i = targets.length - 1; i >= 0; i--) {
    const target = targets[i],
      original = saved[i]
    invariant(
      target.prop === original.prop && target.value?.text === original.marker,
    )
    output = splice(
      output,
      target.source.startOffset,
      target.source.endOffset,
      original.text,
    )
  }
  invariant(
    JSON.stringify(
      (await customDeclarations(output)).map((n) =>
        output.slice(n.source.startOffset, n.source.endOffset),
      ),
    ) === JSON.stringify(saved.map((n) => n.text)),
  )
  return output
}

async function htmlPass(source: string, original: boolean) {
  const parsed = parseHtmlSource(source)
  const spans = parsed.protectedSpans
  invariant(
    spans.every(
      (span, i) =>
        span.closed &&
        span.namespace === 'http://www.w3.org/1999/xhtml' &&
        span.start <= span.end &&
        (i === 0 || spans[i - 1].end <= span.start),
    ),
  )
  const saved: Array<
    HtmlSourceInfo['protectedSpans'][number] & { value: string; marker: string }
  > = []
  for (const [i, span] of spans.entries()) {
    const block = parsed.blocks.find(
      (block) => block.start === span.start && block.end === span.end,
    )
    const parser = block && blockParser(block)
    let value = source.slice(span.start, span.end)
    if (parser) {
      // Only direct failures on an original body have proven editor coordinates.
      try {
        // Validate original CSS before its masked formatting, too.
        if (parser === 'css') await customDeclarations(value)
        else value = await format(value, parser)
      } catch (cause) {
        throw new CodeFormatError(
          cause,
          original ? originalPosition(cause, source, span.start) : undefined,
        )
      }
      if (parser === 'css') value = await formatCss(value)
    }
    saved.push({ ...span, value, marker: marker(source, 'BODY', i) })
  }
  let masked = source
  for (const span of saved.toReversed())
    masked = splice(masked, span.start, span.end, span.marker)
  let output = await format(masked, 'html')
  const targets = parseHtmlSource(output).protectedSpans
  invariant(targets.length === saved.length)
  for (let i = targets.length - 1; i >= 0; i--) {
    const target = targets[i],
      span = saved[i]
    invariant(
      target.closed &&
        target.tag === span.tag &&
        target.namespace === span.namespace &&
        target.attributes === span.attributes &&
        output.slice(target.start, target.end).trim() === span.marker,
    )
    output = splice(output, target.start, target.end, span.value)
  }
  const restored = parseHtmlSource(output).protectedSpans
  invariant(
    restored.length === saved.length &&
      restored.every(
        (span, i) =>
          span.closed &&
          span.tag === saved[i].tag &&
          span.attributes === saved[i].attributes &&
          output.slice(span.start, span.end) === saved[i].value,
      ),
  )
  return output
}

export async function formatCode(
  code: string,
  language: CodeLanguage,
): Promise<string> {
  let source = code
  for (let pass = 0; pass < 3; pass++) {
    let next: string
    try {
      next =
        language === 'html'
          ? await htmlPass(source, pass === 0)
          : await format(
              source,
              language === 'typescript' ? 'typescript' : 'babel',
            )
    } catch (cause) {
      if (cause instanceof CodeFormatError) throw cause
      throw new CodeFormatError(
        cause,
        pass === 0 && language !== 'html' ? parserPosition(cause) : undefined,
      )
    }
    if (next === source) return next
    source = next
  }
  throw new CodeFormatError(
    new Error('Formatting did not stabilize after three passes'),
  )
}
