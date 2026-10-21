# 13 · ShaderMaterial 통합

2주 차 / 원문 Day 13 · 문서 제공 / 실행 예제 준비 중 · 고정된 하루 분량이 아닌 학습 순서입니다.

[전체 로드맵](../README.md) · [학습 화면 사용법](../../../../learning-workspace.md)

## 목표

커스텀 shader의 입력·수명·오류를 Three.js 장면에 연결한다.

## 선수 지식

08~12.

## 핵심 개념과 설명

ShaderMaterial은 GPU 프로그램의 소스와 uniform을 장면 재질에 연결합니다. RawShaderMaterial과 달리 Three.js가 기본 선언을 제공합니다. 입력 선언을 중복하거나 기대하는 attribute가 geometry에 없으면 오류가 생길 수 있습니다.

uniform 값 변화와 shader 소스/defines 변화는 다른 종류의 변경입니다. 필요 없는 material 재생성을 피하고, 더 이상 쓰지 않는 material은 dispose합니다. 오류 로그와 실제 사용 중인 소스 버전을 함께 기록합니다.

## 학습 후 얻을 역량

- 커스텀 shader의 입력·수명·오류를 Three.js 장면에 연결한다.
- 아래 완료 조건을 재현하고 자가 점검 질문에 자신의 말로 답할 수 있습니다.

## 실습 과제

1. 이전 파동 shader를 재질 생성 함수로 묶고 입력 uniform 목록을 문서화합니다.
2. 시간·색만 바꿀 때 기존 value를 갱신합니다.
3. 잘못된 변수 이름, 없는 UV, material 교체 시 정리라는 세 상황을 점검합니다.

이 단위의 실행 예제는 아직 준비 중입니다. 현재 화면에서는 문서를 읽고 단위별 필기를 쓸 수 있습니다. 01 예제에서 수행할 수 있는 작은 변수 실험은 그 화면에서 진행하고, 새 shader/GS 등의 코드 과제는 후속 로컬 실습으로 추가합니다. 제공되지 않은 기능을 완료된 것으로 표시하지 않습니다.

## 관찰할 변수

uniform 값, defines, shader 소스. 어떤 변경이 재컴파일을 요구하는지 구분합니다.

## 완료 조건

- [ ] 재질 생성·갱신·정리 경로를 설명한다.
- [ ] 기본 입력과 직접 선언을 구분한다.
- [ ] shader 오류 원인과 수정 결과를 남겼다.

## 자가 점검 질문

1. RawShaderMaterial은 무엇을 직접 제공해야 하나요?
2. 색 uniform을 바꿀 때 재질을 새로 만들 필요가 있나요?

## 공식 참고

- [ShaderMaterial](https://threejs.org/docs/pages/ShaderMaterial.html)
- [RawShaderMaterial](https://threejs.org/docs/pages/RawShaderMaterial.html)

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

[이전: Noise·Sin·Cos 물결과 왜곡](../12-waves/README.md) · [다음: 인터랙티브 셰이더 복습](../14-shader-review/README.md)
