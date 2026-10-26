import { parse } from 'parse5'
import type { DefaultTreeAdapterMap } from 'parse5'

export interface HtmlSourceInfo {
  headInsertOffset: number | null
  /** Fallback insertion after the actual html start tag or document prolog. */
  bootstrapInsertOffset: number
  /** Complete sensitive content spans; protected ancestors suppress descendants. */
  protectedSpans: {
    tag: string
    start: number
    end: number
    closed: boolean
    namespace: string
    attributes: string
  }[]
  /** Executable document blocks; inert template contents are excluded. */
  blocks: {
    tag: 'script' | 'style'
    start: number
    end: number
    type: string | null
    src: string | null
  }[]
}

export function parseHtmlSource(source: string): HtmlSourceInfo {
  const bom = source.startsWith('\ufeff') ? 1 : 0
  const document = parse(source.slice(bom), {
    sourceCodeLocationInfo: true,
    scriptingEnabled: true,
  })
  const html = document.childNodes.find(
    (node): node is DefaultTreeAdapterMap['element'] =>
      node.nodeName === 'html',
  )!
  const head = html.childNodes.find(
    (node): node is DefaultTreeAdapterMap['element'] =>
      node.nodeName === 'head',
  )
  const headInsertOffset = head?.sourceCodeLocation?.startTag
    ? head.sourceCodeLocation.startTag.endOffset + bom
    : null
  let prologEnd = bom
  for (const node of document.childNodes) {
    if (node.nodeName !== '#comment' && node.nodeName !== '#documentType') break
    if (node.sourceCodeLocation)
      prologEnd = node.sourceCodeLocation.endOffset + bom
  }
  const info: HtmlSourceInfo = {
    headInsertOffset,
    bootstrapInsertOffset:
      headInsertOffset ??
      (html.sourceCodeLocation?.startTag?.endOffset !== undefined
        ? html.sourceCodeLocation.startTag.endOffset + bom
        : prologEnd),
    blocks: [],
    protectedSpans: [],
  }
  const visit = (node: DefaultTreeAdapterMap['node']) => {
    if ('tagName' in node) {
      const location = node.sourceCodeLocation
      if (
        (node.tagName === 'script' || node.tagName === 'style') &&
        location?.startTag
      ) {
        info.blocks.push({
          tag: node.tagName,
          start: location.startTag.endOffset + bom,
          end: (location.endTag?.startOffset ?? source.length - bom) + bom,
          type: node.attrs.find((attr) => attr.name === 'type')?.value ?? null,
          src: node.attrs.find((attr) => attr.name === 'src')?.value ?? null,
        })
      }
    }
    if ('childNodes' in node) node.childNodes.forEach(visit)
  }
  visit(document)
  const protect = (node: DefaultTreeAdapterMap['node']) => {
    if (
      'tagName' in node &&
      ['script', 'style', 'pre', 'textarea', 'template'].includes(node.tagName)
    ) {
      const location = node.sourceCodeLocation
      if (location?.startTag) {
        info.protectedSpans.push({
          tag: node.tagName,
          start: location.startTag.endOffset + bom,
          end: (location.endTag?.startOffset ?? source.length - bom) + bom,
          closed: Boolean(location.endTag),
          namespace: node.namespaceURI,
          attributes: JSON.stringify(
            node.attrs
              .map((attr) => [
                attr.namespace ?? '',
                attr.prefix ?? '',
                attr.name,
                attr.value,
              ])
              .sort(),
          ),
        })
        return
      }
    }
    if ('childNodes' in node) node.childNodes.forEach(protect)
  }
  protect(document)
  info.protectedSpans.sort((a, b) => a.start - b.start)
  info.blocks.sort((a, b) => a.start - b.start)
  return info
}
