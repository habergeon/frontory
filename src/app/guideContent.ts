import type { Locale } from '../i18n/locale'
import { headings } from '../i18n/messages.ts'

/** Read the learner-facing task from the same Markdown shown in the document dialog. */
export function practiceGuide(markdown: string, locale: Locale = 'ko') {
  const section = (heading: string) => {
    const lines = markdown.replace(/\r\n/g, '\n').split('\n')
    const start = lines.findIndex((line) => line === '## ' + heading)
    if (start < 0) return ''
    const end = lines.findIndex(
      (line, index) => index > start && /^## /.test(line),
    )
    return lines
      .slice(start + 1, end < 0 ? undefined : end)
      .join('\n')
      .trim()
  }
  return {
    steps: (
      section(headings[locale].tasks) ||
      (locale === 'en' ? section('Exercises') : '')
    )
      .split('\n')
      .filter((line) => /^\d+\. /.test(line))
      .join('\n'),
    variables: section(headings[locale].variables),
    criteria: section(headings[locale].criteria).replace(/^- \[ \] /gm, '- '),
  }
}
