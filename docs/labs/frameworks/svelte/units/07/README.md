# Svelte · 07 폼 바인딩과 검증

[시리즈 목차](../../README.md) · [전체 기술 지도](../../../../README.md)

단계: 컴파일과 runes 기초 · 외부 실행 예제 · 미리보기 안내 · 저장 ID: `svelte-step-07`

## 목표와 학습 후 역량

- 공백 제출 후 카드 수가 그대로다.
- Enter 제출 뒤 제목이 같은 카드가 1개 추가된다.

## 선수 지식

7단위는 6단위 결과물과 실험 기록을 이어 사용합니다.

## 핵심 개념과 설명

### bind:value

bind:value는 입력과 상태를 연결합니다. 숫자·빈 입력의 실제 값과 타입을 확인해 검증 규칙을 정합니다.

### 제출 경로

form 제출은 키보드와 버튼을 같은 경로로 처리합니다. 실패 입력을 남겨 사용자가 수정할 수 있게 합니다.

## 실습 준비

예제 화면의 실행 범위 안내를 먼저 확인하세요. 다음은 과제를 별도 프로젝트로 확장할 때의 준비 환경입니다. 별도 Svelte 5 Vite 프로젝트에서 .svelte 파일을 컴파일해 실행합니다. 패키지 버전과 lockfile을 기록하세요. Frontory의 Svelte 미리보기는 실제 writable와 명시적 DOM 어댑터이며 .svelte 컴파일러나 runes 실행기가 아닙니다.

연결된 예제는 출발점입니다. 아래 과제 전체가 완성된 코드는 아니며 예제의 지원 범위를 넘는 작업은 별도 프로젝트에서 수행하세요.

## 실습 과제

1. src/AddCard.svelte에 label·bind:value·onsubmit을 작성하세요.
2. submit에서 preventDefault하고 공백 제목을 거절하세요.
3. 빈 제목·한글 제목·Enter 제출을 각각 실행해 카드 수를 적으세요.

## 관찰할 변수

| 변수 | 기준 조건 | 바꿀 조건 | 예상할 변화·검증 가설 |
| --- | --- | --- | --- |
| 제목 | 공백 | 새 카드 | 공백은 거절하고 새 카드는 한 번 추가한다. |

표의 예상은 측정 결과가 아닙니다. 한 번에 한 조건만 바꾸고 실제 결과가 다르면 원인을 기록하세요.

## 완료 조건

- [ ] 공백 제출 후 카드 수가 그대로다.
- [ ] Enter 제출 뒤 제목이 같은 카드가 1개 추가된다.

## 자가 점검

1. Svelte 5 이벤트 속성에서 preventDefault는 어디서 호출하나요?
2. 검증 실패 때 입력을 지우지 않는 이유는 무엇인가요?

## 공식 참고

- [Svelte 공식 문서와 runes 목차](https://svelte.dev/docs/svelte/overview)
- [Svelte $effect와 cleanup](https://svelte.dev/docs/svelte/$effect)

## 연결된 예제와 실행 범위

[예제 원본](../../../../../../src/labs/svelte-step-07/example.js) · [실행 환경과 제한](../../../../../examples.md)

미리보기는 Svelte writable/DOM 계약 실험입니다. runes·snippet·컴파일 결과는 실제 App.svelte를 Svelte 5 프로젝트에서 실행하세요.

- [App.svelte](../../../../../../src/labs/svelte-step-07/App.svelte)

원본 코드·기록은 자동으로 덮어쓰지 않습니다. 기존 예제를 초기화할 때도 필기는 유지됩니다.

## 다음 학습

[이전: keyed each와 카드 정체성](../06/README.md) · [다음: $props와 변경 콜백](../08/README.md)

## 실험 기록 — 직접 작성

### 목표

### 핵심 개념

### 바꾼 변수와 예상

### 실제 결과

### 배운 점

### 남은 질문
