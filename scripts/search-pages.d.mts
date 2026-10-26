import type { Locale } from '../src/i18n/locale.ts'

export const origin: string
export function generateSearchPages(): Map<string, string>
export function homeFallback(locale?: Locale): string
export function renderDocument(
  markdown: string,
  docPath: string,
  locale?: Locale,
): string
export function escape(value: unknown): string
