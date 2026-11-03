import type { SourceFiles } from './sourceFiles.ts'
import type { Locale } from '../i18n/locale.ts'
import { notesTemplateFor } from '../i18n/notes.ts'

export type CodeLanguage = 'javascript' | 'typescript' | 'html'
export type LearningProgress = 'not-started' | 'in-progress' | 'completed'
export interface Draft {
  version: 1
  code: string
  files?: SourceFiles
  notes: string
  updatedAt: string
  language?: CodeLanguage
  progress?: LearningProgress
}
interface StorageAccess {
  getItem(key: string): string | null
  setItem(key: string, value: string): void
}
export interface DraftResult {
  draft: Draft
  warning: 'read-failed' | 'write-failed' | null
}

export const draftKey = (id: string) => 'web-gl-study:unit:v1:' + id
export const notesTemplate = notesTemplateFor('ko')

export function isDraft(value: unknown): value is Draft {
  if (typeof value !== 'object' || value === null) return false
  const item = value as Partial<Draft>
  return (
    item.version === 1 &&
    typeof item.code === 'string' &&
    (item.files === undefined ||
      (item.files !== null &&
        typeof item.files === 'object' &&
        typeof item.files.html === 'string' &&
        typeof item.files.css === 'string' &&
        typeof item.files.javascript === 'string' &&
        (item.files.scriptLanguage === undefined ||
          ['javascript', 'typescript'].includes(item.files.scriptLanguage)) &&
        ['document', 'legacy'].includes(item.files.mode))) &&
    typeof item.notes === 'string' &&
    typeof item.updatedAt === 'string' &&
    (item.language === undefined ||
      item.language === 'javascript' ||
      item.language === 'typescript' ||
      item.language === 'html') &&
    (item.progress === undefined ||
      ['not-started', 'in-progress', 'completed'].includes(item.progress))
  )
}

export function restoreCode(
  draft: Draft,
  original: string,
  language: CodeLanguage = 'javascript',
): Draft {
  const { files: _files, ...rest } = draft
  return { ...rest, code: original, language }
}

/** Memory survives unit navigation, including when the browser denies storage. */
export function createDraftStore(getStorage: () => StorageAccess) {
  const memory = new Map<string, DraftResult>()
  const baselines = new Map<string, Draft>()
  const unstarted = new Set<string>()
  const snapshotKey = 'web-gl-study:all:v1'
  let snapshotCache: Record<string, Draft> | null | undefined
  const readSnapshot = (fresh = false): Record<string, Draft> | null => {
    if (!fresh && snapshotCache !== undefined) return snapshotCache
    const raw = getStorage().getItem(snapshotKey)
    if (raw === null) {
      snapshotCache = null
      return null
    }
    const value: unknown = JSON.parse(raw)
    if (
      !value ||
      typeof value !== 'object' ||
      Array.isArray(value) ||
      !Object.values(value).every(isDraft)
    )
      throw new Error('Invalid snapshot')
    snapshotCache = value as Record<string, Draft>
    return snapshotCache
  }
  return {
    replaceAll(drafts: Record<string, Draft>) {
      if (!Object.values(drafts).every(isDraft))
        throw new Error('Invalid snapshot')
      // A single setItem is atomic on failure; never commit memory before storage.
      getStorage().setItem(snapshotKey, JSON.stringify(drafts))
      snapshotCache = undefined
      memory.clear()
      baselines.clear()
      unstarted.clear()
    },
    /** Read progress/warnings without caching an empty original for an unopened unit. */
    inspect(id: string, language: CodeLanguage = 'javascript'): DraftResult {
      return (
        memory.get(id) ?? createDraftStore(getStorage).load(id, '', language)
      )
    },
    load(
      id: string,
      original: string,
      language: CodeLanguage = 'javascript',
      cacheOriginal = true,
    ): DraftResult {
      const cached = memory.get(id)
      if (cached) return cached
      let result: DraftResult = {
        draft: {
          version: 1,
          code: original,
          ...(language !== 'javascript' ? { language } : {}),
          notes: notesTemplate,
          updatedAt: '',
        },
        warning: null,
      }
      if (cacheOriginal) unstarted.add(id)
      try {
        const snapshot = readSnapshot()
        const raw =
          snapshot && Object.hasOwn(snapshot, id)
            ? JSON.stringify(snapshot[id])
            : getStorage().getItem(draftKey(id))
        if (raw !== null) {
          const parsed: unknown = JSON.parse(raw)
          if (!isDraft(parsed)) throw new Error('Invalid saved draft')
          result = { draft: parsed, warning: null }
          if (cacheOriginal) unstarted.delete(id)
        }
      } catch {
        result.warning = 'read-failed'
      }
      if (cacheOriginal) {
        memory.set(id, result)
        baselines.set(id, result.draft)
      }
      return result
    },
    begin(
      id: string,
      original: string,
      locale: Locale,
      language: CodeLanguage = 'javascript',
    ): DraftResult {
      const result = this.load(id, original, language)
      if (!unstarted.delete(id)) return result
      const draft = { ...result.draft }
      delete draft.language
      const started = {
        ...result,
        draft: {
          ...draft,
          code: original,
          ...(language !== 'javascript' ? { language } : {}),
          notes: notesTemplateFor(locale),
        },
      }
      memory.set(id, started)
      baselines.set(id, started.draft)
      return started
    },
    save(id: string, draft: Draft): DraftResult {
      unstarted.delete(id)
      const result: DraftResult = {
        draft: { ...draft, updatedAt: new Date().toISOString() },
        warning: null,
      }
      try {
        const snapshot = readSnapshot(true)
        const raw =
          snapshot && Object.hasOwn(snapshot, id)
            ? JSON.stringify(snapshot[id])
            : getStorage().getItem(draftKey(id))
        const persisted: unknown = raw === null ? null : JSON.parse(raw)
        if (raw !== null && !isDraft(persisted))
          throw new Error('Invalid saved draft')
        const baseline = baselines.get(id)
        if (baseline && isDraft(persisted)) {
          // Code, language and files form one edit; notes and progress are independent.
          const codeChanged =
            draft.code !== baseline.code ||
            draft.language !== baseline.language ||
            JSON.stringify(draft.files) !== JSON.stringify(baseline.files)
          const { code, language, files, ...rest } = result.draft
          result.draft = {
            ...rest,
            code: codeChanged ? code : persisted.code,
            ...((codeChanged ? language : persisted.language) !== undefined
              ? { language: codeChanged ? language : persisted.language }
              : {}),
            ...((codeChanged ? files : persisted.files) !== undefined
              ? { files: codeChanged ? files : persisted.files }
              : {}),
            notes:
              draft.notes === baseline.notes ? persisted.notes : draft.notes,
          }
          if (draft.progress === baseline.progress) {
            if (persisted.progress === undefined) delete result.draft.progress
            else result.draft.progress = persisted.progress
          }
          // A retry must not mistake merged remote fields for new local edits.
          baselines.set(id, persisted)
        }
        if (snapshot) {
          const nextSnapshot = { ...snapshot, [id]: result.draft }
          getStorage().setItem(snapshotKey, JSON.stringify(nextSnapshot))
          snapshotCache = nextSnapshot
        } else getStorage().setItem(draftKey(id), JSON.stringify(result.draft))
        baselines.set(id, result.draft)
      } catch {
        result.warning = 'write-failed'
      }
      memory.set(id, result)
      return result
    },
  }
}

export const draftStore = createDraftStore(() => window.localStorage)
