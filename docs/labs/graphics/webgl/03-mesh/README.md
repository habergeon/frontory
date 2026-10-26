# 03 · Geometry·Material·Mesh

1주 차 / 원문 Day 3 · 문서 제공 / 실행 예제 제공 · 고정된 하루 분량이 아닌 학습 순서입니다.

[전체 로드맵](../README.md) · [학습 화면 사용법](../../../../learning-workspace.md)

## 목표

형상과 표면 표현을 분리하여 실험한다.

## 선수 지식

01~02, 객체 참조와 생성자.

## 핵심 개념과 설명

Geometry는 정점·면·UV 같은 구조를 담고 Material은 표면이 보이는 방식을 정의합니다. Mesh는 두 객체를 결합합니다. 같은 geometry를 다른 material과 함께 사용할 수 있습니다.

MeshStandardMaterial은 광원의 영향을 받지만 MeshBasicMaterial은 조명 계산 없이 색을 보여 줍니다. 검게 보이는 원인을 geometry와 광원·재질 중 어디에서 찾아야 할지 구분합니다. 공유한 geometry를 수정하거나 해제하면 다른 mesh에도 영향을 줄 수 있습니다.

## 학습 후 얻을 역량

- 형상과 표면 표현을 분리하여 실험한다.
- 아래 완료 조건을 재현하고 자가 점검 질문에 자신의 말로 답할 수 있습니다.

## 실습 과제

1. 01 소스를 복사한 로컬 실험에서 BoxGeometry의 가로 길이만 바꿉니다.
2. 같은 geometry에 MeshBasicMaterial과 MeshStandardMaterial을 각각 연결해 광원 유무를 비교합니다.
3. 큐브 두 개가 geometry를 공유하는 경우와 각각 갖는 경우의 소유권을 적습니다.

이 단위의 실행 코드를 학습 화면에서 편집할 수 있습니다. 기존 빈 코드 기록이 있다면 원본 코드를 복원하세요. 필기는 유지됩니다.

## 관찰할 변수

geometry 크기, material 종류, color, roughness. 카메라는 고정합니다.

## 완료 조건

- [ ] 형상과 표면 변경을 구분한다.
- [ ] 광원 없이 보이는 재질과 아닌 재질을 비교했다.
- [ ] 공유 자원 해제 책임을 설명했다.

## 자가 점검 질문

1. 재질만 바꾸면 정점 수도 변하나요?
2. 공유 geometry를 한 mesh 제거 때 해제해도 될까요?

## 공식 참고

- [Mesh](https://threejs.org/docs/pages/Mesh.html)
- [BufferGeometry](https://threejs.org/docs/pages/BufferGeometry.html)
- [MeshStandardMaterial](https://threejs.org/docs/pages/MeshStandardMaterial.html)

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

[이전: Scene·Camera·Renderer](../02-camera/README.md) · [다음: 좌표계·Vector3·Matrix4](../04-coordinates/README.md)

## 연결된 예제

[예제 원본](../../../../../src/labs/03-mesh/example.js)은 화면의 편집기에 표시되고 실제로 실행됩니다. 첫 주석의 변수나 과제를 하나씩 바꾸고 예상과 결과를 기록하세요. 원본 복원은 코드만 되돌리며 필기를 지우지 않습니다.

[실행 환경과 제한](../../../../examples.md)을 확인하세요.

## 연결된 예제와 실행 범위

[원본 실행 코드](../../../../../src/labs/03-mesh/example.js) · 화면 단위 ID: `03-mesh`

연결된 원본 코드를 Monaco에서 편집하면 검사 후 sandbox 미리보기에 반영됩니다. 확장 과제와 완료 조건은 직접 수행하고 결과를 기록하세요.

기존에 저장한 코드가 있으면 그대로 유지합니다. 새 원본을 사용하려면 먼저 전체 JSON으로 백업한 뒤 **원본 코드로**를 선택하세요. 필기는 지워지지 않습니다.
