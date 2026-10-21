# 04 · 좌표계·Vector3·Matrix4

1주 차 / 원문 Day 4 · 문서 제공 / 실행 예제 준비 중 · 고정된 하루 분량이 아닌 학습 순서입니다.

[전체 로드맵](../README.md) · [학습 화면 사용법](../../../../learning-workspace.md)

## 목표

local/world 좌표와 변환 순서를 예측한다.

## 선수 지식

02~03, 벡터의 성분과 라디안.

## 핵심 개념과 설명

Object3D의 position·rotation·scale은 부모 기준 local transform입니다. 이동한 Group 아래의 자식은 같은 position이라도 scene 바로 아래 물체와 world 위치가 다를 수 있습니다.

Vector3는 위치·방향·이동량을 표현하지만 의미와 단위는 코드에서 정해야 합니다. Matrix4는 이동·회전·스케일을 합성하며 순서는 결과에 영향을 줍니다. 부모 행렬과 자식 행렬이 결합된 matrixWorld를 그림과 숫자로 확인합니다.

## 학습 후 얻을 역량

- local/world 좌표와 변환 순서를 예측한다.
- 아래 완료 조건을 재현하고 자가 점검 질문에 자신의 말로 답할 수 있습니다.

## 실습 과제

1. Group 아래 큐브를 놓고 child.position.x=2를 고정합니다.
2. 부모 x를 0 → 3으로 바꾸고 getWorldPosition으로 결과를 비교합니다.
3. 부모 y 회전을 Math.PI/2로 바꾸기 전에 자식 궤도를 예측하고, scale=2와도 비교합니다.

이 단위의 실행 예제는 아직 준비 중입니다. 현재 화면에서는 문서를 읽고 단위별 필기를 쓸 수 있습니다. 01 예제에서 수행할 수 있는 작은 변수 실험은 그 화면에서 진행하고, 새 shader/GS 등의 코드 과제는 후속 로컬 실습으로 추가합니다. 제공되지 않은 기능을 완료된 것으로 표시하지 않습니다.

## 관찰할 변수

부모 position/rotation/scale, 자식 position. 카메라와 geometry는 고정합니다.

## 완료 조건

- [ ] local/world 위치 쌍을 세 조건에서 기록했다.
- [ ] 부모 회전의 중심을 설명한다.
- [ ] Vector3와 Matrix4의 역할을 구분한다.

## 자가 점검 질문

1. position이 같아도 world 위치가 다를 수 있나요?
2. geometry.translate와 mesh.position 변경은 어떻게 다른가요?

## 공식 참고

- [Object3D](https://threejs.org/docs/pages/Object3D.html)
- [Vector3](https://threejs.org/docs/pages/Vector3.html)
- [Matrix4](https://threejs.org/docs/pages/Matrix4.html)

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

[이전: Geometry·Material·Mesh](../03-mesh/README.md) · [다음: Light·Shadow·Texture](../05-light/README.md)
