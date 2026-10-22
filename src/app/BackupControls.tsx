import { useLocale } from '../i18n/LocaleProvider'
import { message, messages, type MessageParams } from '../i18n/messages'
import { useRef, useState } from 'react'
import { units, legacyUnitIds, v2UnitIds, getLocalizedUnit } from './curriculum'
import { draftStore } from '../shared/drafts'
import { BackupValidationError, MAX_BACKUP_BYTES, parseBackup, mergeBackupDrafts, type StudyBackup } from '../shared/backup'

type Notice = { key: keyof MessageParams; count?: number; details?: string; importing?: boolean }

export function BackupControls({ selectedId, onRestore }: { selectedId: string; onRestore: (id: string) => void }) {
  const { locale } = useLocale()
  const text = messages[locale]
  const renderNotice = (notice: Notice) => {
    const detail = notice.key === 'exportRequested' || notice.key === 'exportWarnings'
      ? message(locale, notice.key, { count: notice.count! })
      : notice.details ?? message(locale, notice.key, {})
    return notice.importing ? message(locale, 'importStopped', { error: detail }) : detail
  }
  const failure = (cause: unknown, importing = false): Notice => {
    if (cause instanceof BackupValidationError) {
      const key = { 'too-large': 'backupTooLarge', 'invalid-format': 'invalidBackup', 'invalid-units': 'invalidBackupUnits', 'invalid-time': 'invalidSavedTime' } as const
      return { key: key[cause.code], importing }
    }
    return { key: importing ? 'fileReadFailed' : 'exportFailed', ...(cause instanceof SyntaxError ? { details: cause.message } : {}), importing }
  }
  const input = useRef<HTMLInputElement>(null)
  const request = useRef(0)
  const [pending, setPending] = useState<StudyBackup | null>(null)
  const [notice, setMessage] = useState<Notice | null>(null)
  const [error, setError] = useState<Notice | null>(null)
  const [reading, setReading] = useState(false)
  const download = () => {
    setError(null)
    try {
      let warnings = 0
      const backup: StudyBackup = {
        format: 'frontory', version: 3, exportedAt: new Date().toISOString(), selectedUnitId: selectedId,
        units: units.map(unit => {
          const result = draftStore.load(unit.id, unit.source ?? '')
          if (result.warning) warnings++
          return { id: unit.id, draft: { ...result.draft, language: result.draft.language ?? 'javascript' } }
        }),
      }
      const text = JSON.stringify(backup, null, 2)
      parseBackup(text, units.map(unit => unit.id), legacyUnitIds, v2UnitIds)
      const url = URL.createObjectURL(new Blob([text], { type: 'application/json;charset=utf-8' }))
      const link = document.createElement('a')
      link.href = url
      link.download = 'frontory-' + backup.exportedAt.replace(/[:.]/g, '-') + '.json'
      link.click()
      window.setTimeout(() => URL.revokeObjectURL(url), 1000)
      setMessage({ key: 'exportRequested', count: units.length })
      if (warnings) setError({ key: 'exportWarnings', count: warnings })
    } catch (cause) { setError(failure(cause)) }
  }
  const read = async (file?: File) => {
    if (!file) return
    const current = ++request.current
    setPending(null); setError(null); setMessage(null); setReading(true)
    try {
      if (file.size > MAX_BACKUP_BYTES) throw new BackupValidationError('too-large')
      const backup = parseBackup(await file.text(), units.map(unit => unit.id), legacyUnitIds, v2UnitIds)
      if (current === request.current) setPending(backup)
    } catch (cause) {
      if (current === request.current) setError(failure(cause, true))
    } finally { if (current === request.current) setReading(false) }
  }
  const restore = () => {
    if (!pending) return
    try {
      draftStore.replaceAll(mergeBackupDrafts(pending, units.map(unit => unit.id), id => {
        const unit = units.find(item => item.id === id)!
        return draftStore.load(id, unit.source ?? '').draft
      }))
      onRestore(pending.selectedUnitId)
      setPending(null); setError(null); setMessage({ key: 'restoreCompleted' })
    } catch {
      setError({ key: 'restoreFailed' })
    }
  }
  return <section className="backup-controls" aria-label={text.backup}>
    <div className="backup-toolbar"><strong>{text.backup}</strong><button onClick={download}>{text.exportJson}</button><button disabled={reading} onClick={() => input.current?.click()}>{text.importJson}</button>
      <input ref={input} type="file" accept=".json,application/json" aria-label={text.backupFile} hidden onChange={event => { void read(event.target.files?.[0]); event.target.value = '' }} />
      <span>{message(locale, 'backupContents', { count: units.length })}</span></div>
    {reading && <p role="status">{text.checkingFile}</p>}
    {notice && <p role="status">{renderNotice(notice)}</p>}
    {error && <p role="alert">{renderNotice(error)}</p>}
    {pending && <div className="backup-confirm">
      <p>{message(locale, 'backupDate', { date: new Date(pending.exportedAt).toLocaleString(locale === 'ko' ? 'ko-KR' : 'en-US'), count: pending.units.length })}</p>
      <p>{pending.version < 3 ? message(locale, 'legacyRestore', { count: pending.units.length }) : text.replaceAll} {message(locale, 'restoreHint', { title: getLocalizedUnit(locale, pending.selectedUnitId)?.title ?? pending.selectedUnitId })}</p>
      <button onClick={restore}>{text.confirmRestore}</button><button onClick={() => { setPending(null); setError(null) }}>{text.cancel}</button>
    </div>}
  </section>
}
