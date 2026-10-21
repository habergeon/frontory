// 아래 문자열이 실제 HTML로 삽입됩니다. heading 순서와 label 연결을 확인하세요.
export function mount({ container }) {
  container.innerHTML = `<article><header><h1>나의 학습 카드</h1><p>의미 있는 문서 구조</p></header><section aria-labelledby="goal"><h2 id="goal">오늘의 목표</h2><label for="topic">주제</label><input id="topic" value="Semantic HTML"><details><summary>자가 점검</summary><p>Tab으로 이동할 수 있나요? 제목과 문단의 역할은 무엇인가요?</p></details></section><footer><small>HTML 구조를 편집해 보세요.</small></footer></article>`
  return () => container.replaceChildren()
}
