# Vue · 22 Canvas 생성과 해제

[시리즈 목차](../../README.md) · [전체 기술 지도](../../../../README.md)

단계: Canvas 통합과 갱신 검증 · 편집 가능한 예제 · 저장 ID: `vue-step-22`

## 목표와 학습 후 역량

- 제거 후 tick 로그가 멈춘다.
- 재표시 후 원 하나만 움직인다.

## 선수 지식

22단위는 21단위 결과물과 실험 기록을 이어 사용합니다.

## 핵심 개념과 설명

### 외부 자원

Canvas context와 RAF는 Vue 반응성 밖의 객체입니다. onMounted에서 DOM이 준비된 뒤 생성합니다.

### 종료 처리

onUnmounted에서 RAF·observer·리스너를 해제합니다. 반복 표시에도 한 세대의 자원만 남아야 합니다.

## 실습 준비

예제 화면의 실행 범위 안내를 먼저 확인하세요. 다음은 과제를 별도 프로젝트로 확장할 때의 준비 환경입니다. 별도 Vue Vite 프로젝트에서 .vue SFC와 script setup을 사용합니다. 패키지 버전과 lockfile을 기록하고 개발 서버에서 실행하세요. 내장 Vue 예제는 h 함수 기반이며 범용 SFC 컴파일러가 아닙니다.

연결된 예제는 출발점입니다. 아래 과제 전체가 완성된 코드는 아니며 예제의 지원 범위를 넘는 작업은 별도 프로젝트에서 수행하세요.

## 실습 과제

1. src/CanvasPanel.vue에 canvas ref와 onMounted에서 2D context를 만드세요.
2. RAF로 원을 그리고 onUnmounted에 취소와 ResizeObserver.disconnect를 넣으세요.
3. v-if로 5회 표시·제거해 활성 루프 수를 기록하세요.

## 관찰할 변수

| 변수 | 기준 조건 | 바꿀 조건 | 예상할 변화·검증 가설 |
| --- | --- | --- | --- |
| 표시 횟수 | 1회 | 5회 | 표시 중 1개·제거 후 0개의 루프를 유지한다. |

표의 예상은 측정 결과가 아닙니다. 한 번에 한 조건만 바꾸고 실제 결과가 다르면 원인을 기록하세요.

## 완료 조건

- [ ] 제거 후 tick 로그가 멈춘다.
- [ ] 재표시 후 원 하나만 움직인다.

## 자가 점검

1. v-show로 바꾸면 cleanup이 실행되나요?
2. 외부 자원 전체를 reactive로 감쌀 필요가 있나요?

## 공식 참고

- [Vue Composition API 가이드](https://vuejs.org/guide/introduction.html)
- [Vue Watchers와 cleanup](https://vuejs.org/guide/essentials/watchers.html)
- [Vue Composable과 수명 관리](https://vuejs.org/guide/reusability/composables.html)

## 연결된 예제와 실행 범위

[예제 원본](../../../../../../src/labs/vue-step-22/example.js) · [실행 환경과 제한](../../../../../examples.md)

실제 Vue 반응성과 render 함수 실험입니다. SFC 템플릿은 외부 컴파일 환경에서 확인합니다.


원본 코드·기록은 자동으로 덮어쓰지 않습니다. 기존 예제를 초기화할 때도 필기는 유지됩니다.

## 다음 학습

[이전: KeepAlive와 일시 정지](../21/README.md) · [다음: 프레임 값과 UI 값 분리](../23/README.md)

## 실험 기록 — 직접 작성

### 목표

### 핵심 개념

### 바꾼 변수와 예상

### 실제 결과

### 배운 점

### 남은 질문
