import { parse } from 'parse5'
import type { DefaultTreeAdapterMap } from 'parse5'
import type { CodeLanguage } from './drafts.ts'

export interface SourceFiles {
  html: string
  javascript: string
  css: string
  mode: 'document' | 'legacy'
  scriptLanguage?: 'javascript' | 'typescript'
}
export type SourceFile = 'html' | 'javascript' | 'css'

function elements(source: string) {
  const result: DefaultTreeAdapterMap['element'][] = []
  const visit = (node: DefaultTreeAdapterMap['node']) => {
    if ('tagName' in node && node.sourceCodeLocation) result.push(node)
    if ('childNodes' in node) node.childNodes.forEach(visit)
  }
  visit(parse(source, { sourceCodeLocationInfo: true }))
  return result
}
const attr = (node: DefaultTreeAdapterMap['element'], name: string) =>
  node.attrs.find((item) => item.name === name)?.value

function scriptElement(opening: string, source: string): string {
  if (!/<\/script[\t\n\f\r />]|<!--/i.test(source))
    return opening + source + '</script>'
  // Keep raw templates and classic script scope intact. Parser insertion also
  // preserves ordering with subsequent scripts without relaxing the CSP.
  const literal = (value: string) =>
    JSON.stringify(value).replace(/</g, '\\u003c')
  return `<script>(() => {
  const url = URL.createObjectURL(new Blob([${literal(source)}], { type: 'text/javascript' }));
  const release = (event) => {
    if (event.target.src !== url) return;
    URL.revokeObjectURL(url);
    document.removeEventListener('load', release, true);
    document.removeEventListener('error', release, true);
  };
  document.addEventListener('load', release, true);
  document.addEventListener('error', release, true);
  document.currentScript.remove();
  document.write(${literal(opening.slice(0, -1) + ' src="')} + url + ${literal('"></script>')});
})();</script>`
}

export function splitSource(code: string, language: CodeLanguage): SourceFiles {
  if (language !== 'html')
    return { html: '', css: '', javascript: code, mode: 'legacy' }
  const nodes = elements(code)
  const styles = nodes.filter((node) => node.tagName === 'style')
  const scripts = nodes.filter(
    (node) =>
      node.tagName === 'script' &&
      attr(node, 'src') === undefined &&
      ['', 'module', 'text/javascript'].includes(attr(node, 'type') ?? ''),
  )
  const files: SourceFiles = {
    html: code,
    css: '',
    javascript: '',
    mode: 'document',
  }
  const edits: { start: number; end: number; text: string }[] = []
  for (const [file, candidates] of [
    ['css', styles],
    ['javascript', scripts],
  ] as const) {
    // Multiple blocks can depend on their ordering and scope. Keep those intact.
    if (candidates.length !== 1) continue
    const node = candidates[0]
    const loc = node.sourceCodeLocation!
    if (!loc.startTag || !loc.endTag) continue
    if (file === 'css' && node.attrs.length) continue
    if (file === 'javascript' && node.attrs.some((a) => a.name !== 'type'))
      continue
    files[file] = code.slice(loc.startTag.endOffset, loc.endTag.startOffset)
    edits.push({
      start: loc.startOffset,
      end: loc.endOffset,
      text:
        file === 'css'
          ? '<link rel="stylesheet" href="style.css">'
          : `<script${attr(node, 'type') ? ` type="${attr(node, 'type')}"` : ''} src="script.js"></script>`,
    })
  }
  for (const edit of edits.sort((a, b) => b.start - a.start))
    files.html =
      files.html.slice(0, edit.start) + edit.text + files.html.slice(edit.end)
  return files
}

export function composeSource(
  files: SourceFiles,
  script = files.javascript,
): string {
  if (files.mode === 'legacy') {
    // Import the learner's module only after its HTML and CSS are installed.
    return `export async function mount(context) {
  context.container.innerHTML = ${JSON.stringify(files.html)};
  const style = document.createElement('style');
  style.textContent = ${JSON.stringify(files.css)};
  document.head.append(style);
  const url = URL.createObjectURL(new Blob([${JSON.stringify(script)}], { type: 'text/javascript' }));
  try {
    const module = await import(url);
    const cleanup = typeof module.mount === 'function' ? await module.mount(context) : undefined;
    return () => { if (typeof cleanup === 'function') cleanup(); style.remove(); context.container.replaceChildren(); };
  } finally { URL.revokeObjectURL(url); }
}`
  }
  const style =
    '<style>' +
    files.css.replace(
      /<\/style(?=[\t\n\f\r />])/gi,
      (tag) => '\\3c ' + tag.slice(1),
    ) +
    '</style>'
  const nodes = elements(files.html)
  let hasCss = false,
    hasScript = false
  const edits: { start: number; end: number; text: string }[] = []
  for (const node of nodes) {
    const loc = node.sourceCodeLocation!
    if (
      node.tagName === 'link' &&
      attr(node, 'href') === 'style.css' &&
      attr(node, 'rel') === 'stylesheet'
    ) {
      hasCss = true
      edits.push({ start: loc.startOffset, end: loc.endOffset, text: style })
    }
    if (node.tagName === 'script' && attr(node, 'src') === 'script.js') {
      hasScript = true
      const opening = files.html
        .slice(loc.startOffset, loc.startTag!.endOffset)
        .replace(
          /\s+src\s*=\s*(?:"script\.js"|'script\.js'|script\.js(?=[\s>]))/i,
          '',
        )
      edits.push({
        start: loc.startOffset,
        end: loc.endOffset,
        text: scriptElement(opening, script),
      })
    }
  }
  const end =
    nodes.find((node) => node.tagName === 'body')?.sourceCodeLocation?.endTag
      ?.startOffset ?? files.html.length
  edits.push({
    start: end,
    end,
    text:
      (!hasCss ? style : '') +
      (!hasScript ? scriptElement('<script type="module">', script) : ''),
  })
  let output = files.html
  for (const edit of edits.sort((a, b) => b.start - a.start))
    output = output.slice(0, edit.start) + edit.text + output.slice(edit.end)
  return output
}
