# Vue · 28 Canvas 수명주기

[시리즈 목차](../README.md) · [전체 기술 지도](../../../README.md)

단계: Canvas 통합과 갱신 검증 · 기존 예제에서 확장 · 저장 ID: `vue-03`

## 목표와 학습 후 역량

- 최종 제거 뒤 RAF·observer·리스너 활성 수가 0이다.
- 속도 조절과 10회 재마운트 후 초안·Canvas 조작이 정상이다.

## 선수 지식

28단위는 27단위 결과물과 실험 기록을 이어 사용합니다.

## 핵심 개념과 설명

### 렌더 루프 경계

onMounted와 onUnmounted는 외부 Canvas의 생성·종료를 연결합니다. 프레임 좌표는 지역 값으로 두고 사용자 설정만 반응형 입력으로 받습니다.

### 수명 비교

React Effect는 의존성 변경에도 정리·재설정을 수행합니다. Vue에서는 mount 수명과 watch 재실행 수명을 따로 확인해야 합니다.

## 실습 준비

별도 Vue Vite 프로젝트에서 .vue SFC와 script setup을 사용합니다. 패키지 버전과 lockfile을 기록하고 개발 서버에서 실행하세요. 내장 Vue 예제는 h 함수 기반이며 범용 SFC 컴파일러가 아닙니다. 기존 vue-03 미리보기는 출발점입니다. 본문의 확장 결과물은 별도 프로젝트에서 구현합니다.

연결된 예제는 출발점입니다. 아래 과제 전체가 완성된 코드는 아니며, 예제의 지원 범위를 넘는 작업은 별도 프로젝트에서 수행하세요.

## 실습 과제

1. src/Workspace.vue의 Canvas를 speed 조절·크기 변경·단위 전환과 통합하세요.
2. 10회 재마운트와 숨김 후 복귀에서 RAF·observer·리스너 계수를 기록하세요.
3. notes/final.md에 React 대응표·초안 보존 결과·성능 측정·실패 복구를 묶어 제출하세요.

## 관찰할 변수

| 변수 | 기준 조건 | 바꿀 조건 | 예상할 변화·검증 가설 |
| --- | --- | --- | --- |
| 프레임 저장 | 반응형 angle | 지역 angle | 동일한 이동을 유지하면서 UI 갱신 빈도가 달라진다. |

표의 예상은 측정 결과가 아닙니다. 한 번에 한 조건만 바꾸고 실제 결과가 다르면 원인을 기록하세요.

## 완료 조건

- [ ] 최종 제거 뒤 RAF·observer·리스너 활성 수가 0이다.
- [ ] 속도 조절과 10회 재마운트 후 초안·Canvas 조작이 정상이다.

## 자가 점검

1. watch cleanup과 onUnmounted가 각각 처리할 자원은 무엇인가요?
2. 지역 프레임 값과 반응형 설정을 분리한 근거는 무엇인가요?

## 공식 참고

- [Vue Composition API 가이드](https://vuejs.org/guide/introduction.html)
- [Vue Watchers와 cleanup](https://vuejs.org/guide/essentials/watchers.html)
- [Vue Composable과 수명 관리](https://vuejs.org/guide/reusability/composables.html)

## 연결된 예제와 실행 범위

[기존 예제 원본](../../../../../src/labs/vue-03/example.js) · [실행 환경과 제한](../../../../examples.md)

원본 코드·기록은 자동으로 덮어쓰지 않습니다. 기존 예제를 초기화할 때도 필기는 유지됩니다.

## 다음 학습

[이전: Composition API 통합 검토](../units/27/README.md)

## 실험 기록 — 직접 작성

### 목표

### 핵심 개념

### 바꾼 변수와 예상

### 실제 결과

### 배운 점

### 남은 질문
