export function mount({ container }) {
  container.innerHTML = `<style>.learning-cards{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,240px),1fr));gap:16px}.learning-cards article{border:1px solid #64748b;padding:16px;min-width:0}.learning-cards img{width:100%;height:110px;object-fit:contain}summary,button{cursor:pointer}:focus-visible{outline:3px solid #38bdf8;outline-offset:3px}</style>
    <h2>이미지 없이도 읽히는 학습 카드</h2><button id="images" aria-pressed="false">이미지 실패 재현</button><p role="status">브라우저 확대 200%와 Tab/Enter를 시험하세요.</p>
    <section class="learning-cards" aria-label="학습 단위">
      <article><h3>1. 요청과 응답</h3><img alt="요청 A보다 나중에 보낸 요청 B의 응답이 먼저 도착하는 순서도"><p>응답 순서는 요청 순서와 다를 수 있습니다. 최신 요청 ID를 확인하여 이전 응답을 무시합니다.</p><details><summary>학습 목차</summary><ol><li>지연 Promise 만들기</li><li>요청 ID 비교하기</li><li>이전 요청 취소하기</li></ol></details></article>
      <article><h3>2. 자원 수명</h3><img alt="생성, 사용, 정리의 세 단계가 왼쪽에서 오른쪽으로 이어지는 그림"><p>타이머와 이벤트는 화면을 제거할 때 함께 정리합니다.</p><details><summary>점검 항목</summary><ul><li>타이머 취소</li><li>이벤트 해제</li><li>반복 정리의 안전성</li></ul></details></article>
    </section>`
  const images = Array.from(container.querySelectorAll('img')), events = new AbortController()
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 100"><rect x="10" y="25" width="70" height="50" fill="#38bdf8"/><path d="M90 50h110m-15-12 15 12-15 12" stroke="#94a3b8" stroke-width="5" fill="none"/><circle cx="250" cy="50" r="30" fill="#a78bfa"/></svg>`
  const url = URL.createObjectURL(new Blob([svg], { type: 'image/svg+xml' }))
  images.forEach(image => { image.src = url })
  let failed = false
  container.querySelector('button').addEventListener('click', event => {
    failed = !failed; event.currentTarget.setAttribute('aria-pressed', String(failed))
    // 잘못된 로컬 data URI로 네트워크 없이 이미지 실패를 만듭니다.
    images.forEach(image => { image.src = failed ? 'data:image/png;base64,AA==' : url })
    container.querySelector('[role=status]').textContent = failed ? '이미지 실패: 대체 텍스트와 본문으로 의미를 확인하세요.' : '이미지 복구됨'
  }, { signal: events.signal })
  return () => { events.abort(); URL.revokeObjectURL(url); container.replaceChildren() }
}
