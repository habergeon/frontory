# 08 · Vertex·Fragment shader

2주 차 / 원문 Day 8 · 문서 제공 / 실행 예제 준비 중 · 고정된 하루 분량이 아닌 학습 순서입니다.

[전체 로드맵](../README.md) · [학습 화면 사용법](../../../../learning-workspace.md)

## 목표

두 shader 단계의 입력과 출력을 구분한다.

## 선수 지식

1주 장면, 벡터 성분과 좌표 변환.

## 핵심 개념과 설명

vertex shader는 정점을 clip space로 변환하고 gl_Position을 출력합니다. fragment shader는 래스터화된 fragment의 색상 등을 계산합니다. fragment가 깊이 검사나 합성 뒤에도 반드시 화면에 남는 것은 아닙니다.

Three.js ShaderMaterial은 position, projectionMatrix, modelViewMatrix 등의 입력을 제공합니다. 먼저 최소 위치 변환과 단색 출력을 작성하여 어느 단계에서 문제가 생겼는지 구분합니다.

## 학습 후 얻을 역량

- 두 shader 단계의 입력과 출력을 구분한다.
- 아래 완료 조건을 재현하고 자가 점검 질문에 자신의 말로 답할 수 있습니다.

## 실습 과제

1. 평면과 ShaderMaterial을 연결하는 로컬 실습을 만듭니다.
2. vertex에서 projectionMatrix * modelViewMatrix * vec4(position,1.0), fragment에서 단색을 출력합니다.
3. 위치 오프셋과 색 채널을 각각 바꾼 결과를 비교합니다.

이 단위의 실행 예제는 아직 준비 중입니다. 현재 화면에서는 문서를 읽고 단위별 필기를 쓸 수 있습니다. 01 예제에서 수행할 수 있는 작은 변수 실험은 그 화면에서 진행하고, 새 shader/GS 등의 코드 과제는 후속 로컬 실습으로 추가합니다. 제공되지 않은 기능을 완료된 것으로 표시하지 않습니다.

## 관찰할 변수

정점 위치 오프셋, 출력 색. 카메라·시간은 고정합니다.

## 완료 조건

- [ ] 각 shader의 역할과 출력을 설명했다.
- [ ] 최소 shader 두 개를 작성했다.
- [ ] 정점 변화와 색 변화의 차이를 기록했다.

## 자가 점검 질문

1. fragment 색을 바꾸면 정점 수도 바뀌나요?
2. gl_Position이 vec4인 이유는 무엇인가요?

## 공식 참고

- [ShaderMaterial](https://threejs.org/docs/pages/ShaderMaterial.html)
- [GLSL shaders](https://developer.mozilla.org/en-US/docs/Games/Techniques/3D_on_the_web/GLSL_Shaders)

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

[이전: 인터랙티브 장면 복습](../07-scene-review/README.md) · [다음: GLSL 문법과 색상](../09-glsl-color/README.md)
