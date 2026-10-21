# iframe의 sandbox 경계

이 폴더에서 `python -m http.server 8000` 실행 후 http://localhost:8000/index.html 을 엽니다.

- 체크 해제: sandbox="". 안내 HTML은 보이지만 script, 버튼 핸들러, postMessage는 실행되지 않습니다.
- 체크: sandbox="allow-scripts". 동일 문서를 다시 로드하고 카운터와 메시지가 작동합니다. origin은 allow-same-origin이 없으므로 "null"입니다.
- 부모 페이지는 event.source와 메시지 type을 검사합니다. 이 예제는 기밀 데이터를 전송하지 않습니다.

Frontory 내부에는 상위 CSP 제한도 있으므로 이 비교는 반드시 독립 로컬 서버에서 수행합니다. allow-same-origin은 추가하지 마세요. 네트워크 응답·콘솔의 차단 기록과 실제 버튼 동작을 함께 기록하세요.
