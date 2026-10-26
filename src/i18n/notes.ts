import type { Locale } from './locale.ts'
import { headings } from './messages.ts'

export function notesTemplateFor(locale: Locale): string {
  const text = headings[locale]
  return (
    '# ' +
    text.notes +
    '\n\n' +
    [
      text.goal,
      text.concepts,
      text.prediction,
      text.result,
      text.learning,
      text.questions,
    ]
      .map((heading) => '## ' + heading)
      .join('\n\n') +
    '\n'
  )
}
