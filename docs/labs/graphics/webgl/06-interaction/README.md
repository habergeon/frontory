# 06 · Raycaster·OrbitControls

1주 차 / 원문 Day 6 · 문서 제공 / 실행 예제 준비 중 · 고정된 하루 분량이 아닌 학습 순서입니다.

[전체 로드맵](../README.md) · [학습 화면 사용법](../../../../learning-workspace.md)

## 목표

포인터를 공간 광선으로 바꾸고 카메라 조작과 선택을 구분한다.

## 선수 지식

02~04, DOM pointer 이벤트.

## 핵심 개념과 설명

clientX/clientY는 viewport 좌표입니다. canvas의 left/top을 빼고 width/height로 정규화해야 패널 안의 위치가 됩니다. NDC는 x=-1~1, y는 위쪽이 +1이므로 y 방향을 뒤집습니다.

Raycaster.setFromCamera는 카메라와 화면 점으로 광선을 만들고 교차 결과를 거리순으로 제공합니다. OrbitControls는 카메라를 움직입니다. 드래그 종료와 클릭 선택을 구분하고, 빈 공간을 눌렀을 때 선택을 해제해야 합니다.

## 학습 후 얻을 역량

- 포인터를 공간 광선으로 바꾸고 카메라 조작과 선택을 구분한다.
- 아래 완료 조건을 재현하고 자가 점검 질문에 자신의 말로 답할 수 있습니다.

## 실습 과제

1. 두 큐브를 놓고 x=((clientX-left)/width)*2-1, y=-((clientY-top)/height)*2+1을 계산합니다.
2. 가장 가까운 교차 물체의 색을 바꾸고 빈 공간에서는 복원합니다.
3. canvas 여백과 크기를 바꿔 다시 선택하고 이벤트를 cleanup에서 제거합니다.

이 단위의 실행 예제는 아직 준비 중입니다. 현재 화면에서는 문서를 읽고 단위별 필기를 쓸 수 있습니다. 01 예제에서 수행할 수 있는 작은 변수 실험은 그 화면에서 진행하고, 새 shader/GS 등의 코드 과제는 후속 로컬 실습으로 추가합니다. 제공되지 않은 기능을 완료된 것으로 표시하지 않습니다.

## 관찰할 변수

pointer 좌표, canvas 크기·위치, 물체 거리. 카메라 회전을 멈춘 기준도 남깁니다.

## 완료 조건

- [ ] 두 물체 선택과 선택 해제를 구현했다.
- [ ] 패널 크기가 바뀌어도 좌표가 맞는다.
- [ ] 선택과 카메라 드래그를 구분한다.

## 자가 점검 질문

1. window.innerWidth로 NDC를 만들면 왜 3분할 화면에서 틀리나요?
2. 겹친 물체 중 무엇을 선택해야 하나요?

## 공식 참고

- [Raycaster](https://threejs.org/docs/pages/Raycaster.html)
- [OrbitControls](https://threejs.org/docs/pages/OrbitControls.html)
- [getBoundingClientRect](https://developer.mozilla.org/en-US/docs/Web/API/Element/getBoundingClientRect)

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

[이전: Light·Shadow·Texture](../05-light/README.md) · [다음: 인터랙티브 장면 복습](../07-scene-review/README.md)
