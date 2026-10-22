# 09 · GLSL 문법과 색상

2주 차 / 원문 Day 9 · 문서·예제 제공 · 고정된 하루 분량이 아닌 학습 순서입니다.

[전체 로드맵](../README.md) · [학습 화면 사용법](../../../../learning-workspace.md)

## 목표

GLSL 타입·벡터 연산으로 색을 만들고 컴파일 오류를 수정한다.

## 선수 지식

08의 최소 shader.

## 핵심 개념과 설명

GLSL의 float/vec2/vec3/vec4는 JavaScript 숫자·배열과 다른 정적 타입입니다. swizzle은 .xy나 .rgb처럼 성분을 선택하며 벡터와 스칼라 연산은 각 성분에 적용할 수 있습니다.

색상 계산에서 범위와 alpha를 구분합니다. GLSL 버전에 따라 attribute/varying 또는 in/out와 색상 출력 문법이 다릅니다. 이번에는 기본 ShaderMaterial 문법을 유지하고 버전 전환을 할 때 양쪽 shader를 같이 맞춥니다.

## 학습 후 얻을 역량

- GLSL 타입·벡터 연산으로 색을 만들고 컴파일 오류를 수정한다.
- 아래 완료 조건을 재현하고 자가 점검 질문에 자신의 말로 답할 수 있습니다.

## 실습 과제

1. 빨강·초록·파랑·회색을 각각 vec4로 출력합니다.
2. vec3와 vec4를 잘못 대입해 오류의 줄·타입 정보를 읽고 수정합니다.
3. mix와 clamp로 두 색을 섞어 0,0.5,1에서 예상한 색을 비교합니다.


## 관찰할 변수

RGB 채널, 혼합 비율, alpha. geometry·카메라를 고정합니다.

## 완료 조건

- [ ] 타입 오류 하나를 설명하고 고쳤다.
- [ ] 혼합 비율 세 조건을 기록했다.
- [ ] GLSL 문법 버전을 명시했다.

## 자가 점검 질문

1. vec3(0.5)는 어떤 성분을 가지나요?
2. RGB와 alpha의 역할은 어떻게 다른가요?

## 공식 참고

- [GLSL shader 기초](https://developer.mozilla.org/en-US/docs/Games/Techniques/3D_on_the_web/GLSL_Shaders)
- [ShaderMaterial](https://threejs.org/docs/pages/ShaderMaterial.html)

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

[이전: Vertex·Fragment shader](../08-shader-stages/README.md) · [다음: Uniform·Attribute·Varying와 시간](../10-shader-data/README.md)

## 연결된 예제와 실행 범위

[원본 실행 코드](../../../../../src/labs/09-glsl-color/example.js) · 화면 단위 ID: `09-glsl-color`

연결된 원본 코드를 Monaco에서 편집하면 검사 후 sandbox 미리보기에 반영됩니다. 확장 과제와 완료 조건은 직접 수행하고 결과를 기록하세요.

기존에 저장한 코드가 있으면 그대로 유지합니다. 새 원본을 사용하려면 먼저 전체 JSON으로 백업한 뒤 **원본 코드로**를 선택하세요. 필기는 지워지지 않습니다.
