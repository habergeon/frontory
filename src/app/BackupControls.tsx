import { useRef, useState } from 'react'
import { units, legacyUnitIds } from './curriculum'
import { draftStore } from '../shared/drafts'
import { MAX_BACKUP_BYTES, parseBackup, type StudyBackup } from '../shared/backup'

export function BackupControls({ selectedId, onRestore }: { selectedId: string; onRestore: (id: string) => void }) {
  const input = useRef<HTMLInputElement>(null)
  const request = useRef(0)
  const [pending, setPending] = useState<StudyBackup | null>(null)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [reading, setReading] = useState(false)
  const download = () => {
    setError('')
    try {
      let warnings = 0
      const backup: StudyBackup = {
        format: 'frontory', version: 2, exportedAt: new Date().toISOString(), selectedUnitId: selectedId,
        units: units.map(unit => {
          const result = draftStore.load(unit.id, unit.source ?? '')
          if (result.warning) warnings++
          return { id: unit.id, draft: { ...result.draft, language: result.draft.language ?? 'javascript' } }
        }),
      }
      const text = JSON.stringify(backup, null, 2)
      parseBackup(text, units.map(unit => unit.id), legacyUnitIds)
      const url = URL.createObjectURL(new Blob([text], { type: 'application/json;charset=utf-8' }))
      const link = document.createElement('a')
      link.href = url
      link.download = 'frontory-' + backup.exportedAt.replace(/[:.]/g, '-') + '.json'
      link.click()
      window.setTimeout(() => URL.revokeObjectURL(url), 1000)
      setMessage('전체 ' + units.length + '개 단위의 JSON 다운로드를 요청했습니다.')
      if (warnings) setError('저장소 읽기/쓰기 경고가 있는 단위 ' + warnings + '개가 포함됩니다. 현재 탭에서 읽을 수 있는 내용으로 내보냈으므로 파일을 확인하고 이전 백업도 보관하세요.')
    } catch (cause) { setError(cause instanceof Error ? cause.message : '내보내기에 실패했습니다.') }
  }
  const read = async (file?: File) => {
    if (!file) return
    const current = ++request.current
    setPending(null); setError(''); setMessage(''); setReading(true)
    try {
      if (file.size > MAX_BACKUP_BYTES) throw new Error('파일은 10 MiB 이하여야 합니다.')
      const backup = parseBackup(await file.text(), units.map(unit => unit.id), legacyUnitIds)
      if (current === request.current) setPending(backup)
    } catch (cause) {
      if (current === request.current) setError('가져오기 중단: ' + (cause instanceof Error ? cause.message : '파일을 읽지 못했습니다.'))
    } finally { if (current === request.current) setReading(false) }
  }
  const restore = () => {
    if (!pending) return
    try {
      const preserved = pending.version === 1 ? Object.fromEntries(units.filter(unit => !legacyUnitIds.includes(unit.id)).map(unit => [unit.id, draftStore.load(unit.id, unit.source ?? '').draft])) : {}
      draftStore.replaceAll({ ...preserved, ...Object.fromEntries(pending.units.map(unit => [unit.id, unit.draft])) })
      onRestore(pending.selectedUnitId)
      setPending(null); setError(''); setMessage('전체 학습 내용을 복원하고 저장된 목차로 이동했습니다.')
    } catch {
      setError('가져오기를 저장하지 못했습니다. 기존 내용은 유지됩니다. 브라우저 저장 권한·용량을 확인하고 다시 시도하세요.')
    }
  }
  return <section className="backup-controls" aria-label="전체 학습 백업">
    <div className="backup-toolbar"><strong>전체 학습 백업</strong><button onClick={download}>JSON 내보내기</button><button disabled={reading} onClick={() => input.current?.click()}>JSON 가져오기</button>
      <input ref={input} type="file" accept=".json,application/json" aria-label="학습 백업 JSON 파일" hidden onChange={event => { void read(event.target.files?.[0]); event.target.value = '' }} />
      <span>{units.length}개 목차 · 코드 · 필기 · 언어 · 학습 상태 · 현재 목차</span></div>
    {reading && <p role="status">파일 검사 중…</p>}
    {message && <p role="status">{message}</p>}
    {error && <p role="alert">{error}</p>}
    {pending && <div className="backup-confirm">
      <p>백업 날짜: {new Date(pending.exportedAt).toLocaleString('ko-KR')} · {pending.units.length}개 단위</p>
      <p>{pending.version === 1 ? '기존 WebGL 28개 단위만 교체하며 다른 시리즈는 유지합니다.' : '모든 시리즈의 코드·필기·학습 상태를 파일 내용으로 교체합니다.'} 복원 목차: {units.find(unit => unit.id === pending.selectedUnitId)?.title}. 해당 예제 코드는 검사 후 실행됩니다. 필요하면 먼저 현재 내용을 내보내세요.</p>
      <button onClick={restore}>전체 교체하여 복원</button><button onClick={() => { setPending(null); setError('') }}>취소</button>
    </div>}
  </section>
}
