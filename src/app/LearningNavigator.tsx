import { useEffect, useRef, useState } from 'react'
import { categories, series, units, type Unit } from './curriculum'
import { draftStore } from '../shared/drafts'

const statusOf = (unit: Unit) => draftStore.load(unit.id, unit.source ?? '').draft.progress ?? 'not-started'
const labels = { 'not-started': '미시작', 'in-progress': '진행 중', completed: '완료' }
const finished = (list: Unit[]) => list.filter(unit => statusOf(unit) === 'completed').length

function SeriesDialog({ current, onSelect, onClose }: { current: string; onSelect: (id: string) => void; onClose: () => void }) {
  const dialog = useRef<HTMLDialogElement>(null)
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('all')
  useEffect(() => { dialog.current?.showModal() }, [])
  const filtered = series.filter(item => (category === 'all' || item.category === category) && (item.title + ' ' + item.prerequisites).toLowerCase().includes(query.toLowerCase()))
  return <dialog ref={dialog} className="series-dialog" aria-labelledby="series-title" onCancel={onClose} onClose={onClose}>
    <header className="dialog-header"><div><span className="eyebrow">FRONTORY SERIES</span><h2 id="series-title">기술을 고르고, 나의 속도로 배워요</h2></div><button onClick={onClose}>닫기 · Esc</button></header>
    <div className="series-tools"><label>시리즈 검색<input value={query} onChange={event => setQuery(event.target.value)} placeholder="React, Canvas, WebGPU…" /></label>
      <div className="category-filters" role="group" aria-label="분야 필터"><button aria-pressed={category === 'all'} onClick={() => setCategory('all')}>전체</button>{Object.entries(categories).map(([id,label]) => <button key={id} aria-pressed={category === id} onClick={() => setCategory(id)}>{label}</button>)}</div>
      <p>{filtered.length}개 시리즈 · 시리즈마다 4단계·28단위 · 연결 예제와 문서 기반 직접 구현 과제를 구분합니다.</p>
    </div>
    <div className="series-grid">{filtered.map(item => {
      const lessons = units.filter(unit => unit.seriesId === item.id)
      const count = finished(lessons)
      return <button className="series-card" key={item.id} aria-current={item.id === current ? 'true' : undefined} onClick={() => { onSelect(lessons.find(unit => statusOf(unit) === 'in-progress')?.id ?? lessons[0].id); onClose() }}>
        <span className="eyebrow">{categories[item.category]} · {'★'.repeat(item.priority)}</span><strong>{item.title}</strong><span>{lessons.length}개 단위 · 완료 {count}개</span>
        <progress value={count} max={lessons.length} aria-label={item.title + ' 완료율'} />
        <small>선수: {item.prerequisites}</small><span className="badge">{item.id === 'playwright' ? '별도 실행용 테스트 소스' : '연결된 예제 ' + lessons.filter(unit => unit.source !== undefined).length + '개'}</span>
      </button>
    })}{filtered.length === 0 && <p>일치하는 시리즈가 없습니다. 검색어나 분야를 바꿔보세요.</p>}</div>
  </dialog>
}

export function LearningNavigator({ selected, onSelect, onDocument }: { selected: Unit; onSelect: (id: string) => void; onDocument: (path: string) => void }) {
  const [showCatalog, setShowCatalog] = useState(false)
  const [expanded, setExpanded] = useState(false)
  const current = series.find(item => item.id === selected.seriesId)!
  const lessons = units.filter(unit => unit.seriesId === current.id)
  const count = finished(lessons)
  const index = lessons.findIndex(unit => unit.id === selected.id)
  const phase = lessons.filter(unit => unit.week === selected.week)
  return <section className="learning-journey" aria-label="학습 여정">
    <div className="journey-heading"><div><span className="eyebrow">{categories[current.category]} / SERIES</span><h2>{current.title}</h2><p>{current.id === 'webgl' ? '장면부터 통합 뷰어까지, 28단계 학습 여정' : '선수 지식: ' + current.prerequisites + ' · 4단계, 28개 단위'}</p></div>
      <div className="journey-actions"><button onClick={() => setShowCatalog(true)}>시리즈 둘러보기 · {series.length}</button><button onClick={() => onDocument(current.docPath)}>시리즈 학습 계획</button></div>
    </div>
    <div className="journey-progress"><progress value={count} max={lessons.length} aria-label="현재 시리즈 완료율" /><span>{count} / {lessons.length} 완료 · {Math.round(count / lessons.length * 100)}%</span></div>
    <nav className="stage-rail" aria-label="학습 단계">{current.stages.map((label,i) => {
      const stageUnits = lessons.filter(unit => unit.week === i + 1)
      return <button key={label} aria-current={selected.week === i+1 ? 'step' : undefined} onClick={() => { onSelect(stageUnits[0].id); setExpanded(true) }}><span className="stage-number">{String(i+1).padStart(2,'0')}</span><span><strong>{label}</strong><small>{finished(stageUnits)} / {stageUnits.length} 완료</small></span></button>
    })}</nav>
    <div className="unit-outline"><button className="outline-toggle" aria-expanded={expanded} aria-controls="unit-outline-list" onClick={() => setExpanded(value => !value)}>{current.stages[selected.week-1]} 목차 {expanded ? '접기 −' : '펼치기 +'}</button><span>현재 {index + 1} / {lessons.length} 단위 · {labels[statusOf(selected)]}</span></div>
    {expanded && <nav id="unit-outline-list" className="unit-grid" aria-label="단계별 학습 목차">{phase.map(unit => <button key={unit.id} aria-current={selected.id === unit.id ? 'page' : undefined} onClick={() => onSelect(unit.id)}><span className={'unit-state ' + statusOf(unit)}>{statusOf(unit) === 'completed' ? '✓' : String(unit.day).padStart(2,'0')}</span><span><strong>{unit.title}</strong><small>{labels[statusOf(unit)]} · {unit.source === undefined ? '문서·필기' : '실행 실습'}</small></span></button>)}</nav>}
    <div className="current-lesson"><div><span className="eyebrow">UNIT {String(selected.day).padStart(2,'0')} / {current.stages[selected.week-1]}</span><h3>{selected.title}</h3><p>{selected.goal}</p></div><button className="primary-button" onClick={() => onDocument(selected.docPath)}>학습 문서 열기</button></div>
    <div className="unit-pagination"><button disabled={index === 0} onClick={() => onSelect(lessons[index-1].id)}>← 이전 단위</button><span>{selected.source === undefined ? '문서 기반 직접 구현 · 필기 저장 가능' : (selected.exampleMode === 'external' || selected.seriesId === 'playwright') ? '별도 환경 실행용 예제' : '실행 가능한 예제 제공'}</span><button disabled={index === lessons.length-1} onClick={() => onSelect(lessons[index+1].id)}>다음 단위 →</button></div>
    {showCatalog && <SeriesDialog current={current.id} onSelect={onSelect} onClose={() => setShowCatalog(false)} />}
  </section>
}
