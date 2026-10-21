# Svelte 컴포넌트 실습

`example.js`는 내장 실행기의 실제 Svelte writable 저장소와 DOM 어댑터 예제입니다. Svelte 컴포넌트로 오해하지 마세요.

Svelte 5 Vite 프로젝트의 `src/App.svelte`를 이 폴더의 `App.svelte`로 교체하고 `PointerCanvas.svelte`를 같은 경로에 복사하세요. 프로젝트의 개발 서버에서 실행합니다. 외부 프로젝트의 패키지·lockfile은 별도로 관리합니다.

숨기기/표시를 반복하고 주기를 변경하세요. `onMount`가 반환한 정리 함수는 타이머와 pointer 리스너를 해제합니다. `#key period`는 주기가 바뀔 때 새 컴포넌트를 생성합니다. 숨긴 동안에는 Canvas의 타이머가 없어야 합니다.
