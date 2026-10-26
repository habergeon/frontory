import assert from 'node:assert/strict'
import path from 'node:path'
import { parsers as babel } from 'prettier/plugins/babel'
import { parsers as html } from 'prettier/plugins/html'
import { parsers as markdown } from 'prettier/plugins/markdown'
import { parsers as postcss } from 'prettier/plugins/postcss'
import { parse, compile } from 'svelte/compiler'

const metadata = new Set([
  'start',
  'end',
  'loc',
  'range',
  'extra',
  'raw',
  'position',
  'sourceSpan',
  'startSourceSpan',
  'endSourceSpan',
  'nameSpan',
  'valueSpan',
  'tokens',
  'leadingComments',
  'trailingComments',
  'innerComments',
  'parent',
  'source',
  'raws',
  '__contentEnd',
])
// TemplateElement.value.raw is deliberately retained: tagged templates observe it.
function project(value) {
  if (Array.isArray(value))
    return value
      .map(project)
      .filter((child) => child?.type !== 'JSXText' || child.value)
  if (!value || typeof value !== 'object') return value
  if (value.type === 'JSXText') {
    const lines = value.value
      .replaceAll(String.fromCharCode(9), ' ')
      .replaceAll(String.fromCharCode(13), '')
      .split(String.fromCharCode(10))
    const last = lines.findLastIndex((line) => line.trim())
    return {
      type: 'JSXText',
      value: lines
        .map((line, index) => {
          if (index) line = line.trimStart()
          if (index < lines.length - 1) line = line.trimEnd()
          return line ? line + (index < last ? ' ' : '') : ''
        })
        .join(''),
    }
  }
  if (value.type === 'text')
    return { type: 'text', value: value.value.replace(/\s+/g, ' ') }
  const result = {}
  for (const [key, child] of Object.entries(value)) {
    if (metadata.has(key) || key.endsWith('Span')) continue
    result[key] =
      key === 'value' && value.type === 'TemplateElement'
        ? child
        : project(child)
  }
  if (
    ['ObjectProperty', 'ObjectMethod', 'Property'].includes(value.type) &&
    !value.computed &&
    value.key
  ) {
    result.key = { name: value.key.name ?? value.key.value }
  }
  return result
}

export async function javascriptStructure(source) {
  const ast = await babel['babel-ts'].parse(source)
  const result = project(ast)
  result.comments = (ast.comments ?? []).map(({ type, value }) => ({
    type,
    value: value.trim().replace(/\r\n/g, '\n'),
  }))
  return result
}

const blocks = new Set([
  'pre',
  'html',
  'head',
  'body',
  'main',
  'section',
  'article',
  'aside',
  'header',
  'footer',
  'nav',
  'div',
  'p',
  'h1',
  'h2',
  'h3',
  'h4',
  'ul',
  'ol',
  'li',
  'table',
  'tr',
  'td',
  'form',
  'script',
  'style',
  'meta',
  'title',
  'link',
])
async function htmlStructure(source) {
  const ast = await html.html.parse(source)
  async function visit(node, sensitive = false) {
    const whitespaceSensitive =
      sensitive || ['pre', 'textarea'].includes(node.name)
    if (node.kind === 'text')
      return {
        kind: 'text',
        value: sensitive ? node.value : node.value.replace(/\s+/g, ' '),
      }
    const result = project(node)
    delete result.children
    if (node.isVoid) delete result.isSelfClosing
    if (node.name === 'script') {
      result.script = await javascriptStructure(
        node.children.map((child) => child.value ?? '').join(''),
      )
    } else if (node.name === 'style') {
      result.css = project(
        await postcss.css.parse(
          node.children.map((child) => child.value ?? '').join(''),
        ),
      )
    } else if (node.children) {
      const children = node.children.filter((child, index, all) => {
        if (child.kind !== 'text' || child.value.trim()) return true
        if (whitespaceSensitive) return true
        const adjacent = [all[index - 1], all[index + 1]].filter(Boolean)
        return (
          adjacent.length === 2 &&
          adjacent.every(
            (item) =>
              item.kind !== 'docType' &&
              (item.kind !== 'element' || !blocks.has(item.name)),
          ) &&
          node.name !== 'video'
        )
      })
      result.children = await Promise.all(
        children.map((child) => visit(child, whitespaceSensitive)),
      )
      if (
        !whitespaceSensitive &&
        (blocks.has(node.name) || node.name === 'video')
      ) {
        if (result.children[0]?.kind === 'text')
          result.children[0].value = result.children[0].value.trimStart()
        if (result.children.at(-1)?.kind === 'text')
          result.children.at(-1).value = result.children.at(-1).value.trimEnd()
        if (node.name === 'video')
          for (const child of result.children)
            if (child.kind === 'text') child.value = child.value.trim()
      }
    }
    return result
  }
  return visit(ast)
}

function svelteStructure(source) {
  const ast = parse(source, { modern: true })
  if (ast.css?.content) delete ast.css.content.styles
  // Compiler parsing/compilation also validates Svelte 5 script and markup syntax.
  compile(source, { generate: 'client' })
  function visit(node, sensitive = false, parentName) {
    if (Array.isArray(node)) {
      const children = node
        .filter((child, index) => {
          if (child.type !== 'Text' || child.data.trim() || sensitive)
            return true
          const adjacent = [node[index - 1], node[index + 1]].filter(Boolean)
          return (
            adjacent.length === 2 &&
            adjacent.every((item) => !blocks.has(item.name))
          )
        })
        .map((child) => visit(child, sensitive, parentName))
      if (blocks.has(parentName) && !sensitive) {
        if (children[0]?.type === 'Text')
          children[0].data = children[0].data.trimStart()
        if (children.at(-1)?.type === 'Text')
          children.at(-1).data = children.at(-1).data.trimEnd()
      }
      return children
    }
    if (!node || typeof node !== 'object') return node
    if (node.type === 'Text')
      return {
        type: 'Text',
        data: sensitive ? node.data : node.data.replace(/\s+/g, ' '),
      }
    const result = {}
    for (const [key, value] of Object.entries(node)) {
      if (metadata.has(key) || key === 'metadata') continue
      result[key] =
        key === 'value' && node.type === 'TemplateElement'
          ? value
          : visit(
              value,
              sensitive || ['pre', 'textarea'].includes(node.name),
              node.name ?? parentName,
            )
    }
    if (node.type === 'Property' && !node.computed)
      result.key = { name: node.key.name ?? node.key.value }
    return result
  }
  return visit(ast)
}

export async function assertGeneratedSemantics(file, before, after) {
  const extension = path.extname(file)
  let kind, left, right
  if (/^\.(?:[cm]?[jt]s|[jt]sx)$/.test(extension)) {
    kind = 'js-ts-ast'
    left = await javascriptStructure(before)
    right = await javascriptStructure(after)
  } else if (extension === '.svelte') {
    kind = 'svelte-compile'
    left = svelteStructure(before)
    right = svelteStructure(after)
  } else if (extension === '.html') {
    kind = 'html-whitespace'
    left = await htmlStructure(before)
    right = await htmlStructure(after)
  } else if (extension === '.json') {
    kind = 'json-value'
    left = JSON.parse(before)
    right = JSON.parse(after)
  } else if (extension === '.md') {
    kind = 'markdown-ast'
    left = project(
      await markdown.markdown.parse(before.replaceAll('\r\n', '\n')),
    )
    right = project(
      await markdown.markdown.parse(after.replaceAll('\r\n', '\n')),
    )
  } else if (['.wat', '.vtt', '.yml'].includes(extension)) {
    kind = 'exact-lf-text'
    left = before.replaceAll('\r\n', '\n')
    right = after.replaceAll('\r\n', '\n')
  } else {
    kind = 'exact-bytes'
    left = before
    right = after
  }
  assert.deepEqual(right, left, `${file}: ${kind} semantics changed`)
  return kind
}
