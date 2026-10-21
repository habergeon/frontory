export type CodeLanguage = 'javascript' | 'typescript'
export type LearningProgress = 'not-started' | 'in-progress' | 'completed'
export interface Draft {
  version: 1
  code: string
  notes: string
  updatedAt: string
  language?: CodeLanguage
  progress?: LearningProgress
}
interface StorageAccess {
  getItem(key: string): string | null
  setItem(key: string, value: string): void
}
export interface DraftResult { draft: Draft; warning: string | null }

export const draftKey = (id: string) => 'web-gl-study:unit:v1:' + id
export const notesTemplate = '# 실험 기록\n\n## 목표\n\n## 핵심 개념\n\n## 바꾼 변수와 예상\n\n## 실제 결과\n\n## 배운 점\n\n## 남은 질문\n'

export function isDraft(value: unknown): value is Draft {
  if (typeof value !== 'object' || value === null) return false
  const item = value as Partial<Draft>
  return item.version === 1 && typeof item.code === 'string' &&
    typeof item.notes === 'string' && typeof item.updatedAt === 'string' &&
    (item.language === undefined || item.language === 'javascript' || item.language === 'typescript') &&
    (item.progress === undefined || ['not-started', 'in-progress', 'completed'].includes(item.progress))
}

export function restoreCode(draft: Draft, original: string): Draft {
  return { ...draft, code: original, language: 'javascript' }
}

/** Memory survives unit navigation, including when the browser denies storage. */
export function createDraftStore(getStorage: () => StorageAccess) {
  const memory = new Map<string, DraftResult>()
  const snapshotKey = 'web-gl-study:all:v1'
  const readSnapshot = (): Record<string, Draft> | null => {
    const raw = getStorage().getItem(snapshotKey)
    if (raw === null) return null
    const value: unknown = JSON.parse(raw)
    if (!value || typeof value !== 'object' || Array.isArray(value) || !Object.values(value).every(isDraft)) throw new Error('Invalid snapshot')
    return value as Record<string, Draft>
  }
  return {
    replaceAll(drafts: Record<string, Draft>) {
      if (!Object.values(drafts).every(isDraft)) throw new Error('Invalid snapshot')
      // A single setItem is atomic on failure; never commit memory before storage.
      getStorage().setItem(snapshotKey, JSON.stringify(drafts))
      memory.clear()
    },
    load(id: string, original: string): DraftResult {
      const cached = memory.get(id)
      if (cached) return cached
      let result: DraftResult = {
        draft: { version: 1, code: original, notes: notesTemplate, updatedAt: '' },
        warning: null,
      }
      try {
        const snapshot = readSnapshot()
        const raw = snapshot && Object.hasOwn(snapshot, id) ? JSON.stringify(snapshot[id]) : getStorage().getItem(draftKey(id))
        if (raw !== null) {
          const parsed: unknown = JSON.parse(raw)
          if (!isDraft(parsed)) throw new Error('Invalid saved draft')
          result = { draft: parsed, warning: null }
        }
      } catch {
        result.warning = '저장된 내용을 읽을 수 없습니다. 손상된 데이터 또는 브라우저 저장 제한을 확인하세요. 기존 저장값은 삭제하지 않았습니다. 편집하면 해당 단위의 저장값을 새 내용으로 덮어씁니다.'
      }
      memory.set(id, result)
      return result
    },
    save(id: string, draft: Draft): DraftResult {
      const result: DraftResult = {
        draft: { ...draft, updatedAt: new Date().toISOString() },
        warning: null,
      }
      try {
        const snapshot = readSnapshot()
        if (snapshot) getStorage().setItem(snapshotKey, JSON.stringify({ ...snapshot, [id]: result.draft }))
        else getStorage().setItem(draftKey(id), JSON.stringify(result.draft))
      } catch {
        result.warning = '브라우저 저장에 실패했습니다. 현재 탭에서만 유지됩니다. 새로고침하거나 닫기 전에 필기를 다운로드하고 코드를 복사하세요.'
      }
      memory.set(id, result)
      return result
    },
  }
}

export const draftStore = createDraftStore(() => window.localStorage)
