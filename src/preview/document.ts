import type { Locale } from '../i18n/locale'

/** Serialize editor text as data; it cannot close the bootstrap script tag. */
export function createPreviewDocument(source: string, token: string, runtime: string, locale: Locale = 'ko') {
  const safeJson = (value: string) => JSON.stringify(value).replace(/</g, '\\u003c')
  const safeRuntime = runtime.replace(/<\/script/gi, '<\\/script')
  return '<!doctype html><html lang="' + locale + '"><head><meta charset="UTF-8">' +
    '<meta http-equiv="Content-Security-Policy" content="default-src \'none\'; script-src \'unsafe-inline\' blob:; style-src \'unsafe-inline\'; img-src data: blob:; connect-src \'none\'; base-uri \'none\'; form-action \'none\'; frame-src \'none\'">' +
    '<style>html,body,#scene-root{width:100%;height:100%;margin:0;overflow:hidden}#scene-root{overflow:auto;box-sizing:border-box}canvas{display:block;width:100%;height:100%;touch-action:none}</style>' +
    '</head><body><div id="scene-root"></div><script>' + safeRuntime +
    ';StudyRuntime.start(' + safeJson(source) + ',' + safeJson(token) + ',' + safeJson(locale) + ');</script></body></html>'
}
