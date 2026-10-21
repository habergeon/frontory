# Vue · 21 KeepAlive와 일시 정지

[시리즈 목차](../../README.md) · [전체 기술 지도](../../../../README.md)

단계: Composable과 저장소 수명 · 문서 기반 직접 구현 · 저장 ID: `vue-step-21`

## 목표와 학습 후 역량

- 복귀한 Editor의 로컬 문자열이 남는다.
- 비활성 Preview의 tick이 증가하지 않는다.

## 선수 지식

21단위는 20단위 결과물과 실험 기록을 이어 사용합니다.

## 핵심 개념과 설명

### 인스턴스 보존

KeepAlive는 비활성 컴포넌트 인스턴스를 캐시합니다. 제거와 달리 로컬 상태를 유지할 수 있습니다.

### 활성 수명

캐시된 컴포넌트는 비활성 상태에서도 자원을 가질 수 있습니다. onActivated와 onDeactivated에서 일시 정지·재개를 설계합니다.

## 실습 준비

별도 Vue Vite 프로젝트에서 .vue SFC와 script setup을 사용합니다. 패키지 버전과 lockfile을 기록하고 개발 서버에서 실행하세요. 내장 Vue 예제는 h 함수 기반이며 범용 SFC 컴파일러가 아닙니다. Frontory 내장 실행 예제가 없는 확장 단위이며 아래 파일은 외부 실습 프로젝트에 작성합니다.

이 단위에는 내장 실행 예제가 없습니다. 아래 절차에 따라 별도 실습 파일을 만들고 실행 결과를 필기에 남기세요. 코드 파일은 작업 폴더에서 따로 보관하고 Frontory 필기는 JSON 또는 Markdown으로 백업하세요.

## 실습 과제

1. src/Workspace.vue에 Editor와 Preview 동적 컴포넌트를 KeepAlive로 감싸세요.
2. Preview 타이머를 onActivated에서 시작하고 onDeactivated에서 정지하세요.
3. 패널을 5회 교대하며 로컬 값과 활성 타이머 수를 확인하세요.

## 관찰할 변수

| 변수 | 기준 조건 | 바꿀 조건 | 예상할 변화·검증 가설 |
| --- | --- | --- | --- |
| 보존 방식 | 일반 동적 컴포넌트 | KeepAlive | 로컬 값은 보존되고 비활성 타이머는 멈춰야 한다. |

표의 예상은 측정 결과가 아닙니다. 한 번에 한 조건만 바꾸고 실제 결과가 다르면 원인을 기록하세요.

## 완료 조건

- [ ] 복귀한 Editor의 로컬 문자열이 남는다.
- [ ] 비활성 Preview의 tick이 증가하지 않는다.

## 자가 점검

1. onUnmounted만으로 캐시된 화면의 루프가 멈추나요?
2. 캐시 수를 제한해야 할 때 어떤 정보를 보나요?

## 공식 참고

- [Vue Composition API 가이드](https://vuejs.org/guide/introduction.html)
- [Vue Watchers와 cleanup](https://vuejs.org/guide/essentials/watchers.html)
- [Vue Composable과 수명 관리](https://vuejs.org/guide/reusability/composables.html)

## 연결된 예제와 실행 범위

문서와 필기를 제공합니다. 내장 실행 예제는 아직 제공하지 않습니다.

원본 코드·기록은 자동으로 덮어쓰지 않습니다. 기존 예제를 초기화할 때도 필기는 유지됩니다.

## 다음 학습

[이전: 비동기 컴포넌트와 로딩 UI](../20/README.md) · [다음: Canvas 생성과 해제](../22/README.md)

## 실험 기록 — 직접 작성

### 목표

### 핵심 개념

### 바꾼 변수와 예상

### 실제 결과

### 배운 점

### 남은 질문
