import { useState } from 'react'
import { categories, series, units } from './curriculum'
import { draftStore } from '../shared/drafts'
import './home.css'

export function Home({ onSelect }: { onSelect: (id: string) => void }) {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('all')
  const filtered = series.filter(item => (category === 'all' || item.category === category) &&
    `${item.title} ${item.prerequisites} ${categories[item.category]}`.toLowerCase().includes(query.trim().toLowerCase()))
  return <div className="home">
    <section className="home-hero" aria-labelledby="home-title">
      <div><h1 id="home-title">배운 것을,<br />직접 만드는 <em>경험으로.</em></h1>
        <p>문서를 읽고, 코드를 바꾸고,<br className="home-mobile-break" /> 나의 언어로 기록하세요.</p>
        <div className="home-hero-action"><a href="#series" className="home-primary">시리즈 둘러보기 <span aria-hidden="true">→</span></a><span>{series.length}개 시리즈 · {units.length}개 학습 단위</span></div>
      </div>
      <div className="home-wordmark" aria-hidden="true"><span>Learn.</span><span>Experiment.</span><span>Archive.</span></div>
    </section>
    <section className="home-method" aria-label="Frontory 학습 방식">
      {[
        ['개념 읽기', '목표와 개념을 읽고, 이번 실습에서 확인할 질문을 정합니다.'],
        ['코드 실험', '실제 실행 코드를 바꾸고, 예상과 화면의 차이를 관찰합니다.'],
        ['경험 기록', '배운 내용을 Markdown으로 남기고, JSON으로 백업합니다.'],
      ].map(([title, description], index) => <div key={title}><span>0{index + 1}</span><div><h2>{title}</h2><p>{description}</p></div></div>)}
    </section>
    <section className="home-catalog" id="series" aria-labelledby="catalog-title">
      <div className="home-catalog-heading"><div><h2 id="catalog-title">어떤 기술을 탐험할까요?</h2><p>관심 있는 기술부터, 나의 속도로 시작하세요.</p></div>
        <label><span className="home-sr-only">시리즈 검색</span><input type="search" placeholder="시리즈 검색" value={query} onChange={event => setQuery(event.target.value)} /></label>
      </div>
      <div className="home-filters" role="group" aria-label="시리즈 분야"><button aria-pressed={category === 'all'} onClick={() => setCategory('all')}>전체</button>{Object.entries(categories).map(([id, label]) => <button key={id} aria-pressed={category === id} onClick={() => setCategory(id)}>{label}</button>)}</div>
      <p className="home-result-count" role="status">{filtered.length}개 시리즈</p>
      <div className="home-series-list">{filtered.map(item => {
        const lessons = units.filter(unit => unit.seriesId === item.id)
        const records = lessons.map(unit => ({ unit, ...draftStore.load(unit.id, unit.source ?? '') }))
        const completed = records.filter(record => record.draft.progress === 'completed').length
        const ongoing = records.find(record => record.draft.progress === 'in-progress')
        return <article className="home-series-row" key={item.id}>
          <span className="home-series-category">{categories[item.category]}</span><h3>{item.title}</h3>
          <div className="home-series-description"><p>선수 지식 · {item.prerequisites}</p>{item.id === 'playwright' && <small>별도 환경에서 실행하는 테스트 예제</small>}{records.some(record => record.warning) && <small>저장 기록 확인이 필요합니다. 학습 화면에서 안내를 확인하세요.</small>}</div>
          <span className="home-series-progress">{lessons.length}개 단위{completed > 0 && <small>{completed}개 완료</small>}</span>
          <button onClick={() => onSelect(ongoing?.unit.id ?? lessons[0].id)} aria-label={item.title + (ongoing ? ' 학습 이어가기' : ' 학습 시작')}>{ongoing ? '이어가기' : '학습 시작'} <span aria-hidden="true">→</span></button>
        </article>
      })}</div>
      {filtered.length === 0 && <div className="home-no-results"><h3>일치하는 시리즈가 없습니다.</h3><p>다른 검색어를 입력하거나 분야 필터를 초기화하세요.</p><button onClick={() => { setQuery(''); setCategory('all') }}>전체 시리즈 보기</button></div>}
    </section>
  </div>
}
