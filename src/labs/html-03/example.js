export function mount({ container, locale = 'ko' }) {
  const messages =
    locale === 'en'
      ? {
          display001:
            'Responses may arrive in a different order from requests. Check the latest request ID to ignore earlier responses.',
          display002:
            'A diagram showing creation, use, and cleanup from left to right',
          display003:
            'A flowchart where the response to request B, sent after request A, arrives first',
          display004: 'Try 200% browser zoom and Tab/Enter.',
          display005:
            'Image failure: use the alternative text and body text to understand the content.',
          display006: 'Clean up timers and events when removing the view.',
          display007: 'Learning cards readable without images',
          display008: 'Create a delayed Promise',
          display009: 'Compare request IDs',
          display010: 'Cancel the previous request',
          display011: 'Safe repeated cleanup',
          display012: 'Reproduce image failure',
          display013: '1. Requests and responses',
          display014: '2. Resource lifetime',
          display015: 'Images restored',
          display016: 'Cancel timers',
          display017: 'Remove event listeners',
          display018: 'Learning units',
          display019: 'Learning outline',
          display020: 'Checklist',
        }
      : {
          display001:
            '응답 순서는 요청 순서와 다를 수 있습니다. 최신 요청 ID를 확인하여 이전 응답을 무시합니다.',
          display002:
            '생성, 사용, 정리의 세 단계가 왼쪽에서 오른쪽으로 이어지는 그림',
          display003:
            '요청 A보다 나중에 보낸 요청 B의 응답이 먼저 도착하는 순서도',
          display004: '브라우저 확대 200%와 Tab/Enter를 시험하세요.',
          display005: '이미지 실패: 대체 텍스트와 본문으로 의미를 확인하세요.',
          display006: '타이머와 이벤트는 화면을 제거할 때 함께 정리합니다.',
          display007: '이미지 없이도 읽히는 학습 카드',
          display008: '지연 Promise 만들기',
          display009: '요청 ID 비교하기',
          display010: '이전 요청 취소하기',
          display011: '반복 정리의 안전성',
          display012: '이미지 실패 재현',
          display013: '1. 요청과 응답',
          display014: '2. 자원 수명',
          display015: '이미지 복구됨',
          display016: '타이머 취소',
          display017: '이벤트 해제',
          display018: '학습 단위',
          display019: '학습 목차',
          display020: '점검 항목',
        }
  container.innerHTML = `<style>.learning-cards{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,240px),1fr));gap:16px}.learning-cards article{border:1px solid #64748b;padding:16px;min-width:0}.learning-cards img{width:100%;height:110px;object-fit:contain}summary,button{cursor:pointer}:focus-visible{outline:3px solid #38bdf8;outline-offset:3px}</style>
    <h2>${messages.display007}</h2><button id="images" aria-pressed="false">${messages.display012}</button><p role="status">${messages.display004}</p>
    <section class="learning-cards" aria-label="${messages.display018}">
      <article><h3>${messages.display013}</h3><img alt="${messages.display003}"><p>${messages.display001}</p><details><summary>${messages.display019}</summary><ol><li>${messages.display008}</li><li>${messages.display009}</li><li>${messages.display010}</li></ol></details></article>
      <article><h3>${messages.display014}</h3><img alt="${messages.display002}"><p>${messages.display006}</p><details><summary>${messages.display020}</summary><ul><li>${messages.display016}</li><li>${messages.display017}</li><li>${messages.display011}</li></ul></details></article>
    </section>`
  const images = Array.from(container.querySelectorAll('img')),
    events = new AbortController()
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 100"><rect x="10" y="25" width="70" height="50" fill="#38bdf8"/><path d="M90 50h110m-15-12 15 12-15 12" stroke="#94a3b8" stroke-width="5" fill="none"/><circle cx="250" cy="50" r="30" fill="#a78bfa"/></svg>`
  const url = URL.createObjectURL(new Blob([svg], { type: 'image/svg+xml' }))
  images.forEach((image) => {
    image.src = url
  })
  let failed = false
  container.querySelector('button').addEventListener(
    'click',
    (event) => {
      failed = !failed
      event.currentTarget.setAttribute('aria-pressed', String(failed))
      // 잘못된 로컬 data URI로 네트워크 없이 이미지 실패를 만듭니다.
      images.forEach((image) => {
        image.src = failed ? 'data:image/png;base64,AA==' : url
      })
      container.querySelector('[role=status]').textContent = failed
        ? messages.display005
        : messages.display015
    },
    { signal: events.signal },
  )
  return () => {
    events.abort()
    URL.revokeObjectURL(url)
    container.replaceChildren()
  }
}
