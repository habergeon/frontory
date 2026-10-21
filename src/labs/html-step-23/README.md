# 일반 · defer · async 로딩

이 폴더에서 `python -m http.server 8000` 실행 후 http://localhost:8000/index.html 을 엽니다. 두 외부 script는 의도적으로 head에서 target보다 앞에 있습니다.

1. 기본 defer: body inline → first.js → second.js → DOMContentLoaded. 외부 두 스크립트는 targetExists:true입니다.
2. 두 defer를 제거: first.js → second.js → body inline. 외부 두 스크립트는 파싱을 멈추므로 targetExists:false입니다.
3. 두 defer를 async로 변경: 다운로드가 끝난 순서로 실행됩니다. DOM 존재와 순서를 매번 기록하세요. async가 항상 순서를 바꾸거나 항상 DOM보다 먼저 실행된다고 가정하지 마세요.
4. DevTools Network의 Disable cache와 느린 네트워크 조건을 적용하고 재시도하세요. 작은 로컬 파일에서 차이가 안 보이면 해당 관찰 자체를 기록하세요.

시간은 performance.now의 관찰값입니다. console과 화면은 같은 loadingLog를 표시합니다. 실제 fetch·파싱을 실행하므로 Frontory 내부의 정적 소스 검사와 구분하세요.
