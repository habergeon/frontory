# 07 · 인터랙티브 장면 복습

1주 차 / 원문 Day 7 · 문서 제공 / 실행 예제 준비 중 · 고정된 하루 분량이 아닌 학습 순서입니다.

[전체 로드맵](../README.md) · [학습 화면 사용법](../../../../learning-workspace.md)

## 목표

카메라·선택·리사이즈·정리를 하나의 작은 장면으로 통합한다.

## 선수 지식

01~06.

## 핵심 개념과 설명

canvas의 CSS 크기와 drawing buffer 픽셀 수는 다릅니다. DPR이 2배면 가로·세로 픽셀 수가 각각 2배여서 픽셀 수는 4배가 됩니다. camera.aspect와 renderer 크기를 함께 갱신합니다.

ResizeObserver는 창뿐 아니라 컨테이너 크기도 관찰합니다. 렌더 루프는 경과 시간 기준으로 갱신하고 탭 복귀 때 큰 delta를 제한합니다. DOM 제거만으로 geometry/material·이벤트·observer가 모두 정리되는 것은 아닙니다.

## 학습 후 얻을 역량

- 카메라·선택·리사이즈·정리를 하나의 작은 장면으로 통합한다.
- 아래 완료 조건을 재현하고 자가 점검 질문에 자신의 말로 답할 수 있습니다.

## 실습 과제

1. 장면에 카메라 조작, 선택 강조, 초기화를 결합합니다.
2. 가로·세로 패널에서 CSS 크기와 buffer 크기를 기록하고 찌그러짐이 없는지 확인합니다.
3. 전환을 10회 반복하며 canvas/루프/observer가 늘지 않는지 점검하고 핵심 코드 흐름을 설명합니다.

이 단위의 실행 예제는 아직 준비 중입니다. 현재 화면에서는 문서를 읽고 단위별 필기를 쓸 수 있습니다. 01 예제에서 수행할 수 있는 작은 변수 실험은 그 화면에서 진행하고, 새 shader/GS 등의 코드 과제는 후속 로컬 실습으로 추가합니다. 제공되지 않은 기능을 완료된 것으로 표시하지 않습니다.

## 관찰할 변수

viewport, DPR 상한, delta, 전환 횟수. 장면 구성은 고정합니다.

## 완료 조건

- [ ] 선택·조작·리사이즈가 함께 동작한다.
- [ ] 생성한 자원과 cleanup을 짝지었다.
- [ ] 1주 개념을 자신의 말로 정리했다.

## 자가 점검 질문

1. window resize만으로 놓치는 변화는 무엇인가요?
2. React StrictMode 재실행에서 중복 canvas가 생기면 어디를 보나요?

## 공식 참고

- [WebGLRenderer](https://threejs.org/docs/pages/WebGLRenderer.html)
- [ResizeObserver](https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserver)
- [React useEffect](https://react.dev/reference/react/useEffect)

## 실험 기록 — 직접 작성

### 목표
<!-- 이번에 답하려는 질문 -->

### 핵심 개념
<!-- 자기 말로 설명 -->

### 바꾼 변수와 예상
<!-- 기준값 → 변경값 / 고정 조건 / 실행 전 예상 -->

### 실제 결과
<!-- 실제 관찰 내용, 화면, 측정값. 실행 전에는 비워 둡니다. -->

### 배운 점
<!-- 예상과 실제의 차이, 이유 -->

### 남은 질문
<!-- 다음 실험으로 확인할 것 -->

[이전: Raycaster·OrbitControls](../06-interaction/README.md) · [다음: Vertex·Fragment shader](../08-shader-stages/README.md)
