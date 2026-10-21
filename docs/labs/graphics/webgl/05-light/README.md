# 05 · Light·Shadow·Texture

1주 차 / 원문 Day 5 · 문서 제공 / 실행 예제 준비 중 · 고정된 하루 분량이 아닌 학습 순서입니다.

[전체 로드맵](../README.md) · [학습 화면 사용법](../../../../learning-workspace.md)

## 목표

빛·그림자·텍스처가 화면에 기여하는 경로를 구분한다.

## 선수 지식

03~04, material과 UV의 존재.

## 핵심 개념과 설명

광원은 표면의 방향과 재질에 따라 밝기를 바꿉니다. 그림자는 광원에서 본 깊이 정보를 사용하는 추가 과정이며 castShadow/receiveShadow와 renderer의 shadow 설정을 함께 확인해야 합니다.

Texture는 UV로 표면에 대응되는 데이터입니다. 색상 이미지와 normal/roughness 같은 비색상 데이터는 의미가 다르므로 color space 설정을 구분합니다. 이번 과제는 직접 만든 작은 체크무늬로 충분하며 큰 외부 에셋을 수집하지 않습니다.

## 학습 후 얻을 역량

- 빛·그림자·텍스처가 화면에 기여하는 경로를 구분한다.
- 아래 완료 조건을 재현하고 자가 점검 질문에 자신의 말로 답할 수 있습니다.

## 실습 과제

1. 평면과 큐브를 놓고 DirectionalLight 위치만 바꿉니다.
2. 그림자를 켜는 설정을 각각 확인하고 그림자가 끊기거나 계단져 보이는 위치를 관찰합니다.
3. 작은 로컬 체크무늬 텍스처를 추가하고 광원 변화와 무늬 변화의 차이를 기록합니다.

이 단위의 실행 예제는 아직 준비 중입니다. 현재 화면에서는 문서를 읽고 단위별 필기를 쓸 수 있습니다. 01 예제에서 수행할 수 있는 작은 변수 실험은 그 화면에서 진행하고, 새 shader/GS 등의 코드 과제는 후속 로컬 실습으로 추가합니다. 제공되지 않은 기능을 완료된 것으로 표시하지 않습니다.

## 관찰할 변수

light 위치/강도, shadow map 크기·bias, texture/roughness. 하나씩 비교합니다.

## 완료 조건

- [ ] 빛과 그림자 설정의 역할을 설명했다.
- [ ] 같은 재질에서 조명 변경을 기록했다.
- [ ] 텍스처 출처와 color space 선택을 적었다.

## 자가 점검 질문

1. 밝은 물체가 항상 그림자를 만들까요?
2. normal map을 색상 이미지처럼 처리하면 왜 문제가 될까요?

## 공식 참고

- [DirectionalLight](https://threejs.org/docs/pages/DirectionalLight.html)
- [LightShadow](https://threejs.org/docs/pages/LightShadow.html)
- [Texture](https://threejs.org/docs/pages/Texture.html)

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

[이전: 좌표계·Vector3·Matrix4](../04-coordinates/README.md) · [다음: Raycaster·OrbitControls](../06-interaction/README.md)
