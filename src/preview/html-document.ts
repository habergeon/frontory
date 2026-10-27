import type { Locale } from '../i18n/locale'
import { parseHtmlSource } from '../shared/htmlSource.ts'
import { startHtmlRuntime } from './html-runtime.ts'
import type { HtmlPreviewModules } from './types'

export function createHtmlPreviewDocument(
  source: string,
  token: string,
  locale: Locale,
  modules: HtmlPreviewModules,
): string {
  const parsed = parseHtmlSource(source)
  const supplied = [
    ...(modules.core !== undefined ? ['three'] : []),
    ...(modules.controls !== undefined
      ? ['three/addons/controls/OrbitControls.js']
      : []),
    ...(modules.gltf !== undefined
      ? ['three/addons/loaders/GLTFLoader.js']
      : []),
  ]
  const isRecord = (value: unknown): value is Record<string, unknown> =>
    value !== null && typeof value === 'object' && !Array.isArray(value)
  const conflicts = (mapping: unknown, scoped = false) =>
    mapping !== null &&
    typeof mapping === 'object' &&
    Object.keys(mapping).some(
      (key) =>
        supplied.includes(key) ||
        (scoped &&
          key.endsWith('/') &&
          supplied.some((name) => name.startsWith(key))),
    )
  let invalidMap = false
  const collision = parsed.blocks.some((block) => {
    if (
      block.tag !== 'script' ||
      block.type?.trim().toLowerCase() !== 'importmap'
    )
      return false
    try {
      const map: unknown = JSON.parse(source.slice(block.start, block.end))
      if (
        !isRecord(map) ||
        (map.imports !== undefined && !isRecord(map.imports)) ||
        (map.scopes !== undefined &&
          (!isRecord(map.scopes) || !Object.values(map.scopes).every(isRecord)))
      ) {
        invalidMap = true
        return false
      }
      const { imports, scopes } = map
      return (
        conflicts(imports) ||
        (scopes !== null &&
          typeof scopes === 'object' &&
          Object.values(scopes).some((scope) => conflicts(scope, true)))
      )
    } catch {
      invalidMap = true
      return false
    }
  })
  const connect = modules.core !== undefined ? 'blob: data:' : "'none'"
  const prefix = `<meta http-equiv="Content-Security-Policy" content="default-src 'none'; script-src 'unsafe-inline' blob:; style-src 'unsafe-inline'; img-src data: blob:; connect-src ${connect}; base-uri 'none'; form-action 'none'; frame-src 'none'">`
  const options = JSON.stringify({
    token,
    modules,
    diagnostic: invalidMap
      ? locale === 'en'
        ? 'User import map is invalid. Check its JSON and mapping structure.'
        : '사용자 import map이 올바르지 않습니다. JSON과 매핑 구조를 확인하세요.'
      : collision
        ? locale === 'en'
          ? 'User import map conflicts with the provided modules. Remove the conflicting mapping.'
          : '사용자 import map이 제공된 모듈과 충돌합니다. 충돌하는 매핑을 제거하세요.'
        : null,
    source,
    insertionOffset: parsed.bootstrapInsertOffset,
    injectedLines: -909090901,
    injectedLastLineLength: -909090902,
    scripts: parsed.blocks.filter(
      (block) => block.tag === 'script' && block.src === null,
    ),
  }).replace(/</g, '\\u003c')
  const runtime = startHtmlRuntime
    .toString()
    .replace(/<\/script/gi, '<\\/script')
  let bootstrap = `${prefix}<script>(${runtime})(${options});</script>`
  const lines = bootstrap.replace(/\r\n?/g, '\n').split('\n')
  // Fixed-width numeric slots keep the measured injection layout unchanged.
  bootstrap = bootstrap
    .replace(
      '"injectedLines":-909090901',
      '"injectedLines":' + String(lines.length - 1).padStart(10, ' '),
    )
    .replace(
      '"injectedLastLineLength":-909090902',
      '"injectedLastLineLength":' +
        String(lines.at(-1)!.length).padStart(10, ' '),
    )
  const offset = parsed.bootstrapInsertOffset
  return source.slice(0, offset) + bootstrap + source.slice(offset)
}
