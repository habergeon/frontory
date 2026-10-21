# Svelte · 10 snippet으로 행 표시 바꾸기

[시리즈 목차](../../README.md) · [전체 기술 지도](../../../../README.md)

단계: 컴포넌트 계약과 Effect · 외부 실행 예제 · 미리보기 안내 · 저장 ID: `svelte-step-10`

## 목표와 학습 후 역량

- 두 표현의 카드 id 순서가 같다.
- 상세 표현에만 완료 설명이 추가된다.

## 선수 지식

10단위는 9단위 결과물과 실험 기록을 이어 사용합니다.

## 핵심 개념과 설명

### snippet

snippet은 재사용할 마크업 조각을 정의합니다. 매개변수로 데이터를 받고 {@render}로 표시합니다.

### 구성 경계

목록 계산과 행 표시를 분리하면 같은 데이터를 다른 형태로 보여 줄 수 있습니다. 표시 조각이 원본 데이터를 변경하지 않게 합니다.

## 실습 준비

예제 화면의 실행 범위 안내를 먼저 확인하세요. 다음은 과제를 별도 프로젝트로 확장할 때의 준비 환경입니다. 별도 Svelte 5 Vite 프로젝트에서 .svelte 파일을 컴파일해 실행합니다. 패키지 버전과 lockfile을 기록하세요. Frontory의 Svelte 미리보기는 실제 writable와 명시적 DOM 어댑터이며 .svelte 컴파일러나 runes 실행기가 아닙니다.

연결된 예제는 출발점입니다. 아래 과제 전체가 완성된 코드는 아니며, 예제의 지원 범위를 넘는 작업은 별도 프로젝트에서 수행하세요.

## 실습 과제

1. src/CardList.svelte에 행 snippet prop을 받는 구조를 만드세요.
2. 부모에서 compact와 detailed snippet을 각각 정의하세요.
3. 같은 필터 결과에 두 snippet을 적용하고 id·개수 일치를 확인하세요.

## 관찰할 변수

| 변수 | 기준 조건 | 바꿀 조건 | 예상할 변화·검증 가설 |
| --- | --- | --- | --- |
| 행 표시 | compact | detailed | 카드 개수와 순서는 같고 표시 정보만 달라진다. |

표의 예상은 측정 결과가 아닙니다. 한 번에 한 조건만 바꾸고 실제 결과가 다르면 원인을 기록하세요.

## 완료 조건

- [ ] 두 표현의 카드 id 순서가 같다.
- [ ] 상세 표현에만 완료 설명이 추가된다.

## 자가 점검

1. snippet과 일반 함수가 반환하는 값은 어떻게 다른가요?
2. 행 표시 책임을 부모로 넘기는 이유는 무엇인가요?

## 공식 참고

- [Svelte 공식 문서와 runes 목차](https://svelte.dev/docs/svelte/overview)
- [Svelte $effect와 cleanup](https://svelte.dev/docs/svelte/$effect)

## 연결된 예제와 실행 범위

[예제 원본](../../../../../../src/labs/svelte-step-10/example.js) · [실행 환경과 제한](../../../../../examples.md)

미리보기는 Svelte writable/DOM 계약 실험입니다. runes·snippet·컴파일 결과는 실제 App.svelte를 Svelte 5 프로젝트에서 실행하세요.

- [App.svelte](../../../../../../src/labs/svelte-step-10/App.svelte)

원본 코드·기록은 자동으로 덮어쓰지 않습니다. 기존 예제를 초기화할 때도 필기는 유지됩니다.

## 다음 학습

[이전: $bindable과 편집기 계약](../09/README.md) · [다음: DOM 참조와 tick](../11/README.md)

## 실험 기록 — 직접 작성

### 목표

### 핵심 개념

### 바꾼 변수와 예상

### 실제 결과

### 배운 점

### 남은 질문
