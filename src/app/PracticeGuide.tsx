import { useState } from 'react'
import { documents, type Unit } from './curriculum'
import { practiceGuide } from './guideContent'
import { MarkdownView } from '../shared/MarkdownView'

export function PracticeGuide({ unit, onDocument }: { unit: Unit; onDocument: (path: string) => void }) {
  const [expanded, setExpanded] = useState(true)
  const guide = practiceGuide(documents[unit.docPath] ?? '')
  const markdown = (text: string) => <MarkdownView text={text} documentPath={unit.docPath} onDocument={onDocument} />
  return <section className="practice-guide" aria-labelledby="practice-guide-title">
    <header className="practice-guide-heading">
      <div><span className="eyebrow">PRACTICE GUIDE · {String(unit.day).padStart(2, '0')}</span><h2 id="practice-guide-title">이번 실습, 이렇게 해보세요</h2></div>
      <button aria-expanded={expanded} aria-controls="practice-guide-body" onClick={() => setExpanded(value => !value)}>{expanded ? '안내 접기' : '안내 펼치기'}</button>
    </header>
    <p className="practice-guide-goal"><strong>목표</strong> {unit.goal}</p>
    {expanded && <div id="practice-guide-body">
      <div className="practice-guide-grid">
        <div><h3>01 · 따라 할 순서</h3>{markdown(guide.steps || '학습 문서의 실습 과제를 확인하세요.')}</div>
        <div className="practice-guide-observe"><h3>02 · 비교하고 기록하기</h3>{markdown(guide.variables)}<p>한 번에 변수 하나만 바꾸세요. 변경 전 예상과 실행 후 실제 결과를 오른쪽 필기에 구분해 기록합니다.</p><h3>03 · 완료 전 확인</h3>{markdown(guide.criteria)}</div>
      </div>
      <footer><p>입력을 멈추면 약 600ms 후 코드 검사·반영됩니다. 구문·타입 오류가 나면 마지막 정상 화면을 유지하므로 오류를 먼저 고치세요.</p><button onClick={() => onDocument(unit.docPath)}>개념·상세 문서 읽기</button></footer>
    </div>}
  </section>
}

