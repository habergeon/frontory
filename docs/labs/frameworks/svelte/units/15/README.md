# Svelte · 15 writable과 구독 계약

[시리즈 목차](../../README.md) · [전체 기술 지도](../../../../README.md)

단계: store와 작업공간 상태 · 외부 실행 예제 · 미리보기 안내 · 저장 ID: `svelte-step-15`

## 목표와 학습 후 역량

- 두 소비자가 최신 id를 읽는다.
- 직접 구독 해제 뒤 해당 로그가 더 나오지 않는다.

## 선수 지식

15단위는 14단위 결과물과 실험 기록을 이어 사용합니다.

## 핵심 개념과 설명

### store

writable은 subscribe·set·update 계약으로 값을 전달합니다. runes와 별개로 외부 구독자나 기존 코드와 연결할 때 사용할 수 있습니다.

### 자동 구독

컴포넌트의 $store 구문은 구독 수명을 처리합니다. 일반 JS 어댑터에서 직접 subscribe했다면 해제 함수를 직접 호출해야 합니다.

## 실습 준비

예제 화면의 실행 범위 안내를 먼저 확인하세요. 다음은 과제를 별도 프로젝트로 확장할 때의 준비 환경입니다. 별도 Svelte 5 Vite 프로젝트에서 .svelte 파일을 컴파일해 실행합니다. 패키지 버전과 lockfile을 기록하세요. Frontory의 Svelte 미리보기는 실제 writable와 명시적 DOM 어댑터이며 .svelte 컴파일러나 runes 실행기가 아닙니다.

연결된 예제는 출발점입니다. 아래 과제 전체가 완성된 코드는 아니며, 예제의 지원 범위를 넘는 작업은 별도 프로젝트에서 수행하세요.

## 실습 과제

1. src/stores.js에 writable 선택 id를 선언하세요.
2. Selection.svelte에서 $selection을 표시하고 별도 JS 구독 로그를 추가하세요.
3. 컴포넌트를 제거한 뒤 JS 구독도 해제해 처리 횟수를 비교하세요.

## 관찰할 변수

| 변수 | 기준 조건 | 바꿀 조건 | 예상할 변화·검증 가설 |
| --- | --- | --- | --- |
| 구독 방식 | 직접 subscribe | 컴포넌트 $store | 해제 책임 위치가 달라진다. |

표의 예상은 측정 결과가 아닙니다. 한 번에 한 조건만 바꾸고 실제 결과가 다르면 원인을 기록하세요.

## 완료 조건

- [ ] 두 소비자가 최신 id를 읽는다.
- [ ] 직접 구독 해제 뒤 해당 로그가 더 나오지 않는다.

## 자가 점검

1. store와 $state 중 어떤 것이 항상 더 좋은가요?
2. 내장 미리보기의 DOM 어댑터는 왜 unsubscribe를 반환하나요?

## 공식 참고

- [Svelte 공식 문서와 runes 목차](https://svelte.dev/docs/svelte/overview)
- [Svelte $effect와 cleanup](https://svelte.dev/docs/svelte/$effect)
- [Svelte onMount와 tick](https://svelte.dev/docs/svelte/lifecycle-hooks)

## 연결된 예제와 실행 범위

[예제 원본](../../../../../../src/labs/svelte-step-15/example.js) · [실행 환경과 제한](../../../../../examples.md)

미리보기는 Svelte writable/DOM 계약 실험입니다. runes·snippet·컴파일 결과는 실제 App.svelte를 Svelte 5 프로젝트에서 실행하세요.

- [App.svelte](../../../../../../src/labs/svelte-step-15/App.svelte)

원본 코드·기록은 자동으로 덮어쓰지 않습니다. 기존 예제를 초기화할 때도 필기는 유지됩니다.

## 다음 학습

[이전: 이벤트와 자원 정리](../../02-experiments/README.md) · [다음: 공유 runes 모듈](../16/README.md)

## 실험 기록 — 직접 작성

### 목표

### 핵심 개념

### 바꾼 변수와 예상

### 실제 결과

### 배운 점

### 남은 질문
