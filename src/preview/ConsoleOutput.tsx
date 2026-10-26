import type { Locale } from '../i18n/locale'
import { messages } from '../i18n/messages'

export interface ConsoleItem {
  level: 'log' | 'info' | 'warn' | 'error' | 'debug'
  message: string
}
export function ConsoleOutput({
  items,
  locale,
}: {
  items: ConsoleItem[]
  locale: Locale
}) {
  if (!items.length) return null
  return (
    <section
      className="preview-console"
      aria-label={messages[locale].previewConsole}
    >
      <strong>{messages[locale].previewConsole}</strong>
      <ol>
        {items.map((item, index) => (
          <li key={index} data-level={item.level}>
            <pre>{item.message}</pre>
          </li>
        ))}
      </ol>
    </section>
  )
}
