# Vue · 24 얕은 반응성과 외부 객체

[시리즈 목차](../../README.md) · [전체 기술 지도](../../../../README.md)

단계: Canvas 통합과 갱신 검증 · 문서 기반 직접 구현 · 저장 ID: `vue-step-24`

## 목표와 학습 후 역량

- renderer 핸들 교체 시 소비자가 새 핸들을 읽는다.
- 프레임 변화마다 템플릿 통계가 갱신되지 않는다.

## 선수 지식

24단위는 23단위 결과물과 실험 기록을 이어 사용합니다.

## 핵심 개념과 설명

### shallowRef

shallowRef는 .value 교체를 추적하고 내부 객체를 깊게 감싸지 않습니다. Three.js 같은 외부 객체 수명을 관리할 때 검토할 수 있습니다.

### 수동 알림

내부 값을 직접 바꿔도 Vue 갱신이 필요한 것은 아닙니다. 화면 요약이 필요하면 별도 ref나 명시적 교체로 통지합니다.

## 실습 준비

별도 Vue Vite 프로젝트에서 .vue SFC와 script setup을 사용합니다. 패키지 버전과 lockfile을 기록하고 개발 서버에서 실행하세요. 내장 Vue 예제는 h 함수 기반이며 범용 SFC 컴파일러가 아닙니다. Frontory 내장 실행 예제가 없는 확장 단위이며 아래 파일은 외부 실습 프로젝트에 작성합니다.

이 단위에는 내장 실행 예제가 없습니다. 아래 절차에 따라 별도 실습 파일을 만들고 실행 결과를 필기에 남기세요. 코드 파일은 작업 폴더에서 따로 보관하고 Frontory 필기는 JSON 또는 Markdown으로 백업하세요.

## 실습 과제

1. src/useRenderer.js에 외부 renderer 핸들을 shallowRef로 보관하세요.
2. 장면 객체 내부 회전은 루프에서 변경하고 UI에는 별도 저빈도 통계를 표시하세요.
3. 깊은 ref 대조군과 객체 식별·UI 갱신 로그를 비교하세요.

## 관찰할 변수

| 변수 | 기준 조건 | 바꿀 조건 | 예상할 변화·검증 가설 |
| --- | --- | --- | --- |
| 보관 방식 | 깊은 ref | shallowRef | 외부 객체 내부 변경이 Vue의 깊은 추적 대상에서 빠진다. |

표의 예상은 측정 결과가 아닙니다. 한 번에 한 조건만 바꾸고 실제 결과가 다르면 원인을 기록하세요.

## 완료 조건

- [ ] renderer 핸들 교체 시 소비자가 새 핸들을 읽는다.
- [ ] 프레임 변화마다 템플릿 통계가 갱신되지 않는다.

## 자가 점검

1. shallowRef 내부 변경 후 UI를 갱신하려면 어떤 선택지가 있나요?
2. markRaw와 shallowRef는 무엇을 다르게 제어하나요?

## 공식 참고

- [Vue Composition API 가이드](https://vuejs.org/guide/introduction.html)
- [Vue Watchers와 cleanup](https://vuejs.org/guide/essentials/watchers.html)
- [Vue Composable과 수명 관리](https://vuejs.org/guide/reusability/composables.html)

## 연결된 예제와 실행 범위

문서와 필기를 제공합니다. 내장 실행 예제는 아직 제공하지 않습니다.

원본 코드·기록은 자동으로 덮어쓰지 않습니다. 기존 예제를 초기화할 때도 필기는 유지됩니다.

## 다음 학습

[이전: 프레임 값과 UI 값 분리](../23/README.md) · [다음: Vue 성능 관찰](../25/README.md)

## 실험 기록 — 직접 작성

### 목표

### 핵심 개념

### 바꾼 변수와 예상

### 실제 결과

### 배운 점

### 남은 질문
