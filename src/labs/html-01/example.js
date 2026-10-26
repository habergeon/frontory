// 아래 문자열이 실제 HTML로 삽입됩니다. heading 순서와 label 연결을 확인하세요.
export function mount({ container, locale = 'ko' }) {
  const messages =
    locale === 'en'
      ? {
          display001:
            'Can you navigate with Tab? What roles do headings and paragraphs play?',
          display002: 'Try editing the HTML structure.',
          display003: 'Meaningful document structure',
          display004: 'My learning card',
          display005: "Today's goal",
          display006: 'Self-check',
          display007: 'Topic',
        }
      : {
          display001:
            'Tab으로 이동할 수 있나요? 제목과 문단의 역할은 무엇인가요?',
          display002: 'HTML 구조를 편집해 보세요.',
          display003: '의미 있는 문서 구조',
          display004: '나의 학습 카드',
          display005: '오늘의 목표',
          display006: '자가 점검',
          display007: '주제',
        }
  container.innerHTML = `<article><header><h1>${messages.display004}</h1><p>${messages.display003}</p></header><section aria-labelledby="goal"><h2 id="goal">${messages.display005}</h2><label for="topic">${messages.display007}</label><input id="topic" value="Semantic HTML"><details><summary>${messages.display006}</summary><p>${messages.display001}</p></details></section><footer><small>${messages.display002}</small></footer></article>`
  return () => container.replaceChildren()
}
