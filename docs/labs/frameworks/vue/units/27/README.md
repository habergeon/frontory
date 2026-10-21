# Vue · 27 Composition API 통합 검토

[시리즈 목차](../../README.md) · [전체 기술 지도](../../../../README.md)

단계: Canvas 통합과 갱신 검증 · 문서 기반 직접 구현 · 저장 ID: `vue-step-27`

## 목표와 학습 후 역량

- 상태·파생·외부 작업의 소유자가 각각 적혀 있다.
- 5회 전환 후 활성 Canvas가 1개다.

## 선수 지식

27단위는 26단위 결과물과 실험 기록을 이어 사용합니다.

## 핵심 개념과 설명

### 관심사 분리

Composable은 검색·저장·렌더러처럼 수명이 다른 책임을 나눕니다. 지나친 분리는 데이터 흐름을 숨길 수 있어 실제 소유자를 문서화합니다.

### 비교 가능한 계약

React와 비교하려면 같은 입력·결과·수명 요구를 사용합니다. 코드 줄 수만으로 구조나 성능을 판단하지 않습니다.

## 실습 준비

별도 Vue Vite 프로젝트에서 .vue SFC와 script setup을 사용합니다. 패키지 버전과 lockfile을 기록하고 개발 서버에서 실행하세요. 내장 Vue 예제는 h 함수 기반이며 범용 SFC 컴파일러가 아닙니다. Frontory 내장 실행 예제가 없는 확장 단위이며 아래 파일은 외부 실습 프로젝트에 작성합니다.

이 단위에는 내장 실행 예제가 없습니다. 아래 절차에 따라 별도 실습 파일을 만들고 실행 결과를 필기에 남기세요. 코드 파일은 작업 폴더에서 따로 보관하고 Frontory 필기는 JSON 또는 Markdown으로 백업하세요.

## 실습 과제

1. src/Workspace.vue에 카드·필기·Canvas를 통합하세요.
2. notes/ownership.md에 ref·computed·watch·onUnmounted의 소유 대상을 적으세요.
3. 같은 5회 전환 시나리오로 React 구현의 Effect와 Vue Hook 대응을 표로 작성하세요.

## 관찰할 변수

| 변수 | 기준 조건 | 바꿀 조건 | 예상할 변화·검증 가설 |
| --- | --- | --- | --- |
| 전환 방식 | 한 단위 유지 | A/B 5회 전환 | 초안은 보존되고 외부 루프 수는 누적되지 않는다. |

표의 예상은 측정 결과가 아닙니다. 한 번에 한 조건만 바꾸고 실제 결과가 다르면 원인을 기록하세요.

## 완료 조건

- [ ] 상태·파생·외부 작업의 소유자가 각각 적혀 있다.
- [ ] 5회 전환 후 활성 Canvas가 1개다.

## 자가 점검

1. watch로 계산한 값 중 computed로 바꿀 것은 무엇인가요?
2. React cleanup과 Vue onUnmounted가 완전히 같은 시점인가요?

## 공식 참고

- [Vue Composition API 가이드](https://vuejs.org/guide/introduction.html)
- [Vue Watchers와 cleanup](https://vuejs.org/guide/essentials/watchers.html)
- [Vue Composable과 수명 관리](https://vuejs.org/guide/reusability/composables.html)

## 연결된 예제와 실행 범위

문서와 필기를 제공합니다. 내장 실행 예제는 아직 제공하지 않습니다.

원본 코드·기록은 자동으로 덮어쓰지 않습니다. 기존 예제를 초기화할 때도 필기는 유지됩니다.

## 다음 학습

[이전: 동작 회귀와 저장 경합 검증](../26/README.md) · [다음: Canvas 수명주기](../../03-project/README.md)

## 실험 기록 — 직접 작성

### 목표

### 핵심 개념

### 바꾼 변수와 예상

### 실제 결과

### 배운 점

### 남은 질문
