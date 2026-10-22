# Vue · 17 provide와 inject

[시리즈 목차](../../README.md) · [전체 기술 지도](../../../../README.md)

단계: Composable과 저장소 수명 · 편집 가능한 예제 · 저장 ID: `vue-step-17`

## 목표와 학습 후 역량

- 두 Workspace 선택이 서로 섞이지 않는다.
- 소비자에서 직접 대입하지 않고 select 함수로 변경한다.

## 선수 지식

17단위는 16단위 결과물과 실험 기록을 이어 사용합니다.

## 핵심 개념과 설명

### 의존성 전달

provide는 하위 트리에 값을 전달합니다. inject는 가장 가까운 제공자의 값을 읽어 중간 props 전달을 줄입니다.

### 변경 위치

반응형 값을 전달해도 변경 책임은 별도로 정해야 합니다. readonly 값과 변경 함수를 함께 제공하면 경계가 드러납니다.

## 실습 준비

예제 화면의 실행 범위 안내를 먼저 확인하세요. 다음은 과제를 별도 프로젝트로 확장할 때의 준비 환경입니다. 별도 Vue Vite 프로젝트에서 .vue SFC와 script setup을 사용합니다. 패키지 버전과 lockfile을 기록하고 개발 서버에서 실행하세요. 내장 Vue 예제는 h 함수 기반이며 범용 SFC 컴파일러가 아닙니다.

연결된 예제는 출발점입니다. 아래 과제 전체가 완성된 코드는 아니며 예제의 지원 범위를 넘는 작업은 별도 프로젝트에서 수행하세요.

## 실습 과제

1. src/Workspace.vue에서 Symbol 키로 readonly 선택 ref와 select 함수를 provide하세요.
2. 세 단계 아래 Detail.vue에서 inject해 제목을 표시하세요.
3. 중첩 Workspace를 추가하고 각 트리의 선택이 독립인지 확인하세요.

## 관찰할 변수

| 변수 | 기준 조건 | 바꿀 조건 | 예상할 변화·검증 가설 |
| --- | --- | --- | --- |
| Provider 배치 | 공통 한 개 | 중첩 두 개 | 내부 소비자는 가장 가까운 제공자의 선택을 읽는다. |

표의 예상은 측정 결과가 아닙니다. 한 번에 한 조건만 바꾸고 실제 결과가 다르면 원인을 기록하세요.

## 완료 조건

- [ ] 두 Workspace 선택이 서로 섞이지 않는다.
- [ ] 소비자에서 직접 대입하지 않고 select 함수로 변경한다.

## 자가 점검

1. 주입값에 기본값이 없고 제공자도 없으면 어떻게 처리하나요?
2. 문자열 키 대신 Symbol을 쓰는 이유는 무엇인가요?

## 공식 참고

- [Vue Composition API 가이드](https://vuejs.org/guide/introduction.html)
- [Vue Watchers와 cleanup](https://vuejs.org/guide/essentials/watchers.html)
- [Vue Composable과 수명 관리](https://vuejs.org/guide/reusability/composables.html)

## 연결된 예제와 실행 범위

[예제 원본](../../../../../../src/labs/vue-step-17/example.js) · [실행 환경과 제한](../../../../../examples.md)

실제 Vue 반응성과 render 함수 실험입니다. SFC 템플릿은 외부 컴파일 환경에서 확인합니다.


원본 코드·기록은 자동으로 덮어쓰지 않습니다. 기존 예제를 초기화할 때도 필기는 유지됩니다.

## 다음 학습

[이전: Composable의 수명](../16/README.md) · [다음: 공유 저장소의 범위](../18/README.md)

## 실험 기록 — 직접 작성

### 목표

### 핵심 개념

### 바꾼 변수와 예상

### 실제 결과

### 배운 점

### 남은 질문
