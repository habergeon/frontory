# Vue · 16 Composable의 수명

[시리즈 목차](../../README.md) · [전체 기술 지도](../../../../README.md)

단계: Composable과 저장소 수명 · 문서 기반 직접 구현 · 저장 ID: `vue-step-16`

## 목표와 학습 후 역량

- 남은 패널의 크기가 계속 갱신된다.
- 모든 패널 제거 뒤 활성 리스너가 0이다.

## 선수 지식

16단위는 15단위 결과물과 실험 기록을 이어 사용합니다.

## 핵심 개념과 설명

### 로직 묶기

Composable은 Composition API를 사용하는 재사용 함수입니다. 호출마다 독립 상태를 만들지 공유할지 명시해야 합니다.

### 정리 책임

컴포넌트 안에서 등록한 수명주기 Hook은 그 인스턴스에 연결됩니다. 외부 리스너도 동일한 종료 지점에 해제합니다.

## 실습 준비

별도 Vue Vite 프로젝트에서 .vue SFC와 script setup을 사용합니다. 패키지 버전과 lockfile을 기록하고 개발 서버에서 실행하세요. 내장 Vue 예제는 h 함수 기반이며 범용 SFC 컴파일러가 아닙니다. Frontory 내장 실행 예제가 없는 확장 단위이며 아래 파일은 외부 실습 프로젝트에 작성합니다.

이 단위에는 내장 실행 예제가 없습니다. 아래 절차에 따라 별도 실습 파일을 만들고 실행 결과를 필기에 남기세요. 코드 파일은 작업 폴더에서 따로 보관하고 Frontory 필기는 JSON 또는 Markdown으로 백업하세요.

## 실습 과제

1. src/composables/useWindowSize.js에 ref·resize 리스너·onUnmounted를 묶으세요.
2. 두 패널에서 호출해 크기를 표시하세요.
3. 패널을 하나씩 제거하고 리스너 계수와 남은 표시를 확인하세요.

## 관찰할 변수

| 변수 | 기준 조건 | 바꿀 조건 | 예상할 변화·검증 가설 |
| --- | --- | --- | --- |
| 소비자 수 | 1개 | 2개 | 독립 Composable이면 리스너도 두 개이며 하나씩 해제된다. |

표의 예상은 측정 결과가 아닙니다. 한 번에 한 조건만 바꾸고 실제 결과가 다르면 원인을 기록하세요.

## 완료 조건

- [ ] 남은 패널의 크기가 계속 갱신된다.
- [ ] 모든 패널 제거 뒤 활성 리스너가 0이다.

## 자가 점검

1. 모듈 범위 ref를 쓰면 호출별 상태가 독립인가요?
2. onMounted를 setTimeout 안에서 등록하면 왜 문제가 되나요?

## 공식 참고

- [Vue Composition API 가이드](https://vuejs.org/guide/introduction.html)
- [Vue Watchers와 cleanup](https://vuejs.org/guide/essentials/watchers.html)
- [Vue Composable과 수명 관리](https://vuejs.org/guide/reusability/composables.html)

## 연결된 예제와 실행 범위

문서와 필기를 제공합니다. 내장 실행 예제는 아직 제공하지 않습니다.

원본 코드·기록은 자동으로 덮어쓰지 않습니다. 기존 예제를 초기화할 때도 필기는 유지됩니다.

## 다음 학습

[이전: 템플릿 ref와 nextTick](../15/README.md) · [다음: provide와 inject](../17/README.md)

## 실험 기록 — 직접 작성

### 목표

### 핵심 개념

### 바꾼 변수와 예상

### 실제 결과

### 배운 점

### 남은 질문
