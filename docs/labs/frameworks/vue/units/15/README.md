# Vue · 15 템플릿 ref와 nextTick

[시리즈 목차](../../README.md) · [전체 기술 지도](../../../../README.md)

단계: Composable과 저장소 수명 · 편집 가능한 예제 · 저장 ID: `vue-step-15`

## 목표와 학습 후 역량

- 패널을 열 때 textarea가 활성 요소다.
- 숨김 상태에서 null 접근 오류가 없다.

## 선수 지식

15단위는 14단위 결과물과 실험 기록을 이어 사용합니다.

## 핵심 개념과 설명

### DOM 참조

템플릿 ref는 연결된 DOM이나 컴포넌트를 가리킵니다. 조건부 요소가 없을 때는 null일 수 있습니다.

### 갱신 배치

Vue는 DOM 갱신을 배치합니다. 상태 변경 뒤 실제 DOM 크기나 포커스를 다루려면 nextTick 이후를 확인합니다.

## 실습 준비

예제 화면의 실행 범위 안내를 먼저 확인하세요. 다음은 과제를 별도 프로젝트로 확장할 때의 준비 환경입니다. 별도 Vue Vite 프로젝트에서 .vue SFC와 script setup을 사용합니다. 패키지 버전과 lockfile을 기록하고 개발 서버에서 실행하세요. 내장 Vue 예제는 h 함수 기반이며 범용 SFC 컴파일러가 아닙니다.

연결된 예제는 출발점입니다. 아래 과제 전체가 완성된 코드는 아니며 예제의 지원 범위를 넘는 작업은 별도 프로젝트에서 수행하세요.

## 실습 과제

1. src/EditorPanel.vue에 조건부 textarea와 ref를 만드세요.
2. 표시 상태를 true로 바꾼 뒤 await nextTick과 focus를 연결하세요.
3. 표시·숨김을 5회 반복하며 활성 요소와 null 처리를 확인하세요.

## 관찰할 변수

| 변수 | 기준 조건 | 바꿀 조건 | 예상할 변화·검증 가설 |
| --- | --- | --- | --- |
| 포커스 시점 | 상태 변경 직후 | nextTick 이후 | 생성된 textarea에 포커스를 줄 수 있다. |

표의 예상은 측정 결과가 아닙니다. 한 번에 한 조건만 바꾸고 실제 결과가 다르면 원인을 기록하세요.

## 완료 조건

- [ ] 패널을 열 때 textarea가 활성 요소다.
- [ ] 숨김 상태에서 null 접근 오류가 없다.

## 자가 점검

1. nextTick이 네트워크 완료도 기다려 주나요?
2. DOM 참조를 computed 결과로 대체할 수 있나요?

## 공식 참고

- [Vue Composition API 가이드](https://vuejs.org/guide/introduction.html)
- [Vue Watchers와 cleanup](https://vuejs.org/guide/essentials/watchers.html)
- [Vue Composable과 수명 관리](https://vuejs.org/guide/reusability/composables.html)

## 연결된 예제와 실행 범위

[예제 원본](../../../../../../src/labs/vue-step-15/example.js) · [실행 환경과 제한](../../../../../examples.md)

실제 Vue 반응성과 render 함수 실험입니다. SFC 템플릿은 외부 컴파일 환경에서 확인합니다.


원본 코드·기록은 자동으로 덮어쓰지 않습니다. 기존 예제를 초기화할 때도 필기는 유지됩니다.

## 다음 학습

[이전: 컴포넌트 계약과 감시](../../02-experiments/README.md) · [다음: Composable의 수명](../16/README.md)

## 실험 기록 — 직접 작성

### 목표

### 핵심 개념

### 바꾼 변수와 예상

### 실제 결과

### 배운 점

### 남은 질문
