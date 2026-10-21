# 20 · Three.js+GS 카메라와 인터랙션

3주 차 / 원문 Day 20 · 문서·예제 제공 · 고정된 하루 분량이 아닌 학습 순서입니다.

[전체 로드맵](../README.md) · [학습 화면 사용법](../../../../learning-workspace.md)

## 목표

GS의 좌표·스케일·선택 의미를 장면 조작에 연결한다.

## 선수 지식

06, 19의 데이터 로딩.

## 핵심 개념과 설명

GS 객체도 장면 계층에서 변환할 수 있지만 지원되는 scale이나 선택 API는 라이브러리별로 다를 수 있습니다. 데이터의 up 축·단위·중심을 확인하고 camera near/far와 target을 맞춥니다.

GS picking은 일반 mesh 삼각형 raycasting과 같지 않을 수 있습니다. 가우시안 중심 근사, opacity 조건, 라이브러리 전용 raycast 등이 다를 수 있어 무엇을 선택했다고 간주할지 정의해야 합니다. 화면에서 보이는 경계와 선택 경계가 다를 수 있습니다.

## 학습 후 얻을 역량

- GS의 좌표·스케일·선택 의미를 장면 조작에 연결한다.
- 아래 완료 조건을 재현하고 자가 점검 질문에 자신의 말로 답할 수 있습니다.

## 실습 과제

1. 작은 GS 데이터의 중심·up 축·스케일을 기록하고 초기 카메라를 맞춥니다.
2. 회전·이동·줌의 최소/최대 거리를 설정하고 초기화를 추가합니다.
3. 사용할 GS picking API의 기준을 조사하고 화면 경계의 세 지점에 대해 예상 결과를 적습니다.


## 관찰할 변수

camera target/position/near/far, 데이터 transform, picking 조건.

## 완료 조건

- [ ] 초기 시점과 조작 범위를 설명했다.
- [ ] GS 선택 기준과 한계를 명시했다.
- [ ] mesh 선택과 다른 경우를 기록했다.

## 자가 점검 질문

1. 보이는 가장 앞 색과 가장 가까운 Gaussian 중심은 항상 같은가요?
2. 일반 mesh의 raycast 코드를 그대로 적용할 수 있나요?

## 공식 참고

- [Spark SplatMesh raycast](https://sparkjs.dev/docs/splat-mesh/)
- [OrbitControls](https://threejs.org/docs/pages/OrbitControls.html)

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

[이전: .ply·.splat 로딩](../19-gs-loading/README.md) · [다음: GS 뷰어 복습과 후보 비교](../21-gs-review/README.md)

## 연결된 예제와 실행 범위

[원본 실행 코드](../../../../../src/labs/20-gs-interaction/example.js) · 화면 단위 ID: `20-gs-interaction`

소형 .splat 및 ASCII GS PLY를 읽는 CPU Canvas 교육용 뷰어입니다. 최대 1 MiB·512 splat이며 binary PLY와 일반 mesh PLY는 지원하지 않습니다. Spark, GPU tile 렌더링, 고차 SH, GS picking은 구현 범위 밖입니다. 기본 장면은 직접 생성한 데이터이며 측정값은 이 CPU 예제에만 해당합니다.

기존에 저장한 코드가 있으면 그대로 유지합니다. 새 원본을 사용하려면 먼저 전체 JSON으로 백업한 뒤 **원본 코드로**를 선택하세요. 필기는 지워지지 않습니다.
