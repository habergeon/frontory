import { isDraft, type Draft } from './drafts.ts'

export const MAX_BACKUP_BYTES = 10 * 1024 * 1024
export interface StudyBackup {
  format: 'web-gl-study' | 'frontory'
  version: 1 | 2 | 3
  exportedAt: string
  selectedUnitId: string
  units: Array<{ id: string; draft: Draft }>
}

export type BackupValidationCode =
  'too-large' | 'invalid-format' | 'invalid-units' | 'invalid-time'
export class BackupValidationError extends Error {
  readonly code: BackupValidationCode
  constructor(code: BackupValidationCode) {
    super(code)
    this.code = code
    this.name = 'BackupValidationError'
  }
}

export function parseBackup(
  text: string,
  ids: string[],
  legacyIds: string[] = ids,
  v2Ids: string[] = ids,
): StudyBackup {
  if (new TextEncoder().encode(text).length > MAX_BACKUP_BYTES)
    throw new BackupValidationError('too-large')
  const value = JSON.parse(
    text.replace(/^\uFEFF/, ''),
  ) as Partial<StudyBackup> | null
  const legacy = value?.format === 'web-gl-study' && value?.version === 1
  const previous = value?.format === 'frontory' && value?.version === 2
  const expectedIds = legacy ? legacyIds : previous ? v2Ids : ids
  if (
    !value ||
    !(
      legacy ||
      previous ||
      (value.format === 'frontory' && value.version === 3)
    ) ||
    typeof value.exportedAt !== 'string' ||
    typeof value.selectedUnitId !== 'string' ||
    !expectedIds.includes(value.selectedUnitId)
  )
    throw new BackupValidationError('invalid-format')
  if (!Number.isFinite(Date.parse(value.exportedAt)))
    throw new BackupValidationError('invalid-time')
  if (!Array.isArray(value.units) || value.units.length !== expectedIds.length)
    throw new BackupValidationError('invalid-units')
  const seen = new Set<string>()
  const entries = value.units.map((entry) => {
    if (
      !entry ||
      typeof entry.id !== 'string' ||
      !expectedIds.includes(entry.id) ||
      seen.has(entry.id) ||
      !isDraft(entry.draft)
    )
      throw new BackupValidationError('invalid-units')
    seen.add(entry.id)
    const { code, notes, updatedAt, language, progress } = entry.draft
    if (updatedAt !== '' && !Number.isFinite(Date.parse(updatedAt)))
      throw new BackupValidationError('invalid-time')
    return {
      id: entry.id,
      draft: {
        version: 1 as const,
        code,
        notes,
        updatedAt,
        language: language ?? ('javascript' as const),
        ...(progress ? { progress } : {}),
      },
    }
  })
  return {
    format: legacy ? 'web-gl-study' : 'frontory',
    version: legacy ? 1 : previous ? 2 : 3,
    exportedAt: value.exportedAt,
    selectedUnitId: value.selectedUnitId,
    units: entries,
  }
}

/** Historical archives replace only their catalog; newer-unit drafts remain intact. */
export function mergeBackupDrafts(
  backup: StudyBackup,
  ids: string[],
  load: (id: string) => Draft,
): Record<string, Draft> {
  const imported = new Map(backup.units.map((unit) => [unit.id, unit.draft]))
  return Object.fromEntries(ids.map((id) => [id, imported.get(id) ?? load(id)]))
}
