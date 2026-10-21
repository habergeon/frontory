import { isDraft, type Draft } from './drafts.ts'

export const MAX_BACKUP_BYTES = 10 * 1024 * 1024
export interface StudyBackup {
  format: 'web-gl-study' | 'frontory'
  version: 1 | 2
  exportedAt: string
  selectedUnitId: string
  units: Array<{ id: string; draft: Draft }>
}

export function parseBackup(text: string, ids: string[], legacyIds: string[] = ids): StudyBackup {
  if (new TextEncoder().encode(text).length > MAX_BACKUP_BYTES) throw new Error('파일은 10 MiB 이하여야 합니다.')
  const value = JSON.parse(text.replace(/^\uFEFF/, '')) as Partial<StudyBackup> | null
  const legacy = value?.format === 'web-gl-study' && value?.version === 1
  const expectedIds = legacy ? legacyIds : ids
  if (!value || !(legacy || (value.format === 'frontory' && value.version === 2)) ||
    typeof value.exportedAt !== 'string' || !Number.isFinite(Date.parse(value.exportedAt)) ||
    typeof value.selectedUnitId !== 'string' || !expectedIds.includes(value.selectedUnitId) ||
    !Array.isArray(value.units) || value.units.length !== expectedIds.length) throw new Error('Frontory v2 전체 백업 또는 기존 WebGL v1 백업 파일이 아닙니다.')
  const seen = new Set<string>()
  const entries = value.units.map(entry => {
    if (!entry || typeof entry.id !== 'string' || !expectedIds.includes(entry.id) || seen.has(entry.id) || !isDraft(entry.draft)) throw new Error('학습 단위가 누락·중복되었거나 코드/필기 형식이 잘못되었습니다.')
    seen.add(entry.id)
    const { code, notes, updatedAt, language, progress } = entry.draft
    if (updatedAt !== '' && !Number.isFinite(Date.parse(updatedAt))) throw new Error('잘못된 저장 시간입니다.')
    return { id: entry.id, draft: { version: 1 as const, code, notes, updatedAt, language: language ?? 'javascript' as const, ...(progress ? { progress } : {}) } }
  })
  return { format: legacy ? 'web-gl-study' : 'frontory', version: legacy ? 1 : 2, exportedAt: value.exportedAt, selectedUnitId: value.selectedUnitId, units: entries }
}
