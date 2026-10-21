# Svelte · 11 DOM 참조와 tick

[시리즈 목차](../../README.md) · [전체 기술 지도](../../../../README.md)

단계: 컴포넌트 계약과 Effect · 외부 실행 예제 · 미리보기 안내 · 저장 ID: `svelte-step-11`

## 목표와 학습 후 역량

- 열기 후 활성 요소가 textarea다.
- 숨긴 요소에 접근하는 오류가 없다.

## 선수 지식

11단위는 10단위 결과물과 실험 기록을 이어 사용합니다.

## 핵심 개념과 설명

### DOM 연결

bind:this는 생성된 DOM 참조를 제공합니다. 요소가 제거될 수 있으므로 사용 시점과 존재 여부를 확인합니다.

### 반영 대기

tick은 대기 중인 상태 변경이 DOM에 반영된 뒤 이어 실행하도록 합니다. 외부 요청 완료까지 기다리는 기능은 아닙니다.

## 실습 준비

예제 화면의 실행 범위 안내를 먼저 확인하세요. 다음은 과제를 별도 프로젝트로 확장할 때의 준비 환경입니다. 별도 Svelte 5 Vite 프로젝트에서 .svelte 파일을 컴파일해 실행합니다. 패키지 버전과 lockfile을 기록하세요. Frontory의 Svelte 미리보기는 실제 writable와 명시적 DOM 어댑터이며 .svelte 컴파일러나 runes 실행기가 아닙니다.

연결된 예제는 출발점입니다. 아래 과제 전체가 완성된 코드는 아니며, 예제의 지원 범위를 넘는 작업은 별도 프로젝트에서 수행하세요.

## 실습 과제

1. src/EditorPanel.svelte에 조건부 textarea와 bind:this를 연결하세요.
2. 열기 함수에서 visible=true 후 await tick()과 focus를 호출하세요.
3. 열기·닫기를 5회 반복해 활성 요소와 오류 여부를 기록하세요.

## 관찰할 변수

| 변수 | 기준 조건 | 바꿀 조건 | 예상할 변화·검증 가설 |
| --- | --- | --- | --- |
| focus 시점 | 표시 변경 직후 | tick 이후 | 생성된 textarea에 안정적으로 포커스한다. |

표의 예상은 측정 결과가 아닙니다. 한 번에 한 조건만 바꾸고 실제 결과가 다르면 원인을 기록하세요.

## 완료 조건

- [ ] 열기 후 활성 요소가 textarea다.
- [ ] 숨긴 요소에 접근하는 오류가 없다.

## 자가 점검

1. tick 전에 DOM 크기를 읽으면 무엇을 측정할 수 있나요?
2. bind:this를 화면 상태와 같은 방식으로 다뤄도 되나요?

## 공식 참고

- [Svelte 공식 문서와 runes 목차](https://svelte.dev/docs/svelte/overview)
- [Svelte $effect와 cleanup](https://svelte.dev/docs/svelte/$effect)
- [Svelte onMount와 tick](https://svelte.dev/docs/svelte/lifecycle-hooks)

## 연결된 예제와 실행 범위

[예제 원본](../../../../../../src/labs/svelte-step-11/example.js) · [실행 환경과 제한](../../../../../examples.md)

미리보기는 Svelte writable/DOM 계약 실험입니다. runes·snippet·컴파일 결과는 실제 App.svelte를 Svelte 5 프로젝트에서 실행하세요.

- [App.svelte](../../../../../../src/labs/svelte-step-11/App.svelte)

원본 코드·기록은 자동으로 덮어쓰지 않습니다. 기존 예제를 초기화할 때도 필기는 유지됩니다.

## 다음 학습

[이전: snippet으로 행 표시 바꾸기](../10/README.md) · [다음: $effect 의존성과 해제](../12/README.md)

## 실험 기록 — 직접 작성

### 목표

### 핵심 개념

### 바꾼 변수와 예상

### 실제 결과

### 배운 점

### 남은 질문
