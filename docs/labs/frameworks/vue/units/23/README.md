# Vue · 23 프레임 값과 UI 값 분리

[시리즈 목차](../../README.md) · [전체 기술 지도](../../../../README.md)

단계: Canvas 통합과 갱신 검증 · 문서 기반 직접 구현 · 저장 ID: `vue-step-23`

## 목표와 학습 후 역량

- speed 0에서 원 위치가 멈춘다.
- speed 변경 때 Canvas 생성 계수가 늘지 않는다.

## 선수 지식

23단위는 22단위 결과물과 실험 기록을 이어 사용합니다.

## 핵심 개념과 설명

### 갱신 빈도

프레임 좌표는 매 프레임 바뀌지만 UI 설정은 드물게 바뀝니다. 모두 ref로 표시하면 불필요한 화면 갱신이 생깁니다.

### 시간 기반 이동

RAF timestamp 차이를 초 단위 delta로 바꿔 이동량을 계산합니다. 탭 복귀의 큰 간격은 제한 정책을 명시합니다.

## 실습 준비

별도 Vue Vite 프로젝트에서 .vue SFC와 script setup을 사용합니다. 패키지 버전과 lockfile을 기록하고 개발 서버에서 실행하세요. 내장 Vue 예제는 h 함수 기반이며 범용 SFC 컴파일러가 아닙니다. Frontory 내장 실행 예제가 없는 확장 단위이며 아래 파일은 외부 실습 프로젝트에 작성합니다.

이 단위에는 내장 실행 예제가 없습니다. 아래 절차에 따라 별도 실습 파일을 만들고 실행 결과를 필기에 남기세요. 코드 파일은 작업 폴더에서 따로 보관하고 Frontory 필기는 JSON 또는 Markdown으로 백업하세요.

## 실습 과제

1. src/CanvasPanel.vue에서 angle을 지역 변수로 두고 speed만 prop으로 받으세요.
2. angle += delta * speed로 이동시키고 delta 상한을 기록하세요.
3. speed 0·1·2를 입력해 정지와 속도 변화가 renderer 재생성 없이 반영되는지 확인하세요.

## 관찰할 변수

| 변수 | 기준 조건 | 바꿀 조건 | 예상할 변화·검증 가설 |
| --- | --- | --- | --- |
| speed | 1 | 2 | 같은 시간의 회전량이 약 두 배가 된다. |

표의 예상은 측정 결과가 아닙니다. 한 번에 한 조건만 바꾸고 실제 결과가 다르면 원인을 기록하세요.

## 완료 조건

- [ ] speed 0에서 원 위치가 멈춘다.
- [ ] speed 변경 때 Canvas 생성 계수가 늘지 않는다.

## 자가 점검

1. 지역 angle 변경이 템플릿에 자동 표시되나요?
2. 탭 복귀 delta를 제한하면 실제 시간과 어떤 차이가 생기나요?

## 공식 참고

- [Vue Composition API 가이드](https://vuejs.org/guide/introduction.html)
- [Vue Watchers와 cleanup](https://vuejs.org/guide/essentials/watchers.html)
- [Vue Composable과 수명 관리](https://vuejs.org/guide/reusability/composables.html)

## 연결된 예제와 실행 범위

문서와 필기를 제공합니다. 내장 실행 예제는 아직 제공하지 않습니다.

원본 코드·기록은 자동으로 덮어쓰지 않습니다. 기존 예제를 초기화할 때도 필기는 유지됩니다.

## 다음 학습

[이전: Canvas 생성과 해제](../22/README.md) · [다음: 얕은 반응성과 외부 객체](../24/README.md)

## 실험 기록 — 직접 작성

### 목표

### 핵심 개념

### 바꾼 변수와 예상

### 실제 결과

### 배운 점

### 남은 질문
