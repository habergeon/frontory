# WGSL · 01 타입과 Entry point

[시리즈 목차](../README.md) · [전체 기술 지도](../../../README.md)

단계: 타입과 셰이더 인터페이스 · 편집 가능한 예제 · 저장 ID: `wgsl-01`

## 목표와 학습 후 역량

- 단계별 입출력 계약을 작성한다.
- 인터페이스 오류를 진단한다.

## 선수 지식

WebGPU buffer·pipeline과 벡터 연산

## 핵심 개념과 설명

### Stage 계약

@vertex·@fragment·@compute는 함수가 실행되는 shader 단계를 지정합니다. 단계마다 허용되는 입력·출력과 builtin이 다릅니다.

### 입출력 식별

@location은 사용자 데이터의 인터페이스 위치를 지정하고 @builtin은 시스템이 정한 값을 전달합니다. 둘은 이름만 바꿔 교환할 수 있는 장식이 아닙니다.

## 실습 준비

기존 wgsl-01 미리보기는 출발점입니다. 이후 과제 전체의 구현이나 검증을 대신하지 않습니다. 별도 localhost 또는 HTTPS 프로젝트에서 직접 구현하는 문서 안내 실습입니다. secure context, navigator.gpu, adapter 요청 결과를 확인하고 미지원 안내를 제공합니다. device.lost 처리와 자원 해제를 유지합니다.

연결된 예제는 출발점입니다. 아래 과제 전체가 완성된 코드는 아니며, 예제의 지원 범위를 넘는 작업은 별도 프로젝트에서 수행하세요.

## 실습 과제

1. shader.wgsl에 vertex_index로 삼각형 위치를 만드는 @vertex 함수를 작성하세요.
2. @builtin(position)과 @location(0) 색을 구조체로 반환하고 fragment에서 받으세요.
3. location 타입을 어긋나게 한 뒤 getCompilationInfo와 pipeline 오류를 확인하고 복구하세요.

## 관찰할 변수

| 변수 | 기준 조건 | 바꿀 조건 | 예상할 변화·검증 가설 |
| --- | --- | --- | --- |
| 색 location | 양쪽 0 | fragment만 1 | stage 연결 검증에서 불일치가 드러날 것으로 예상합니다. |

표의 예상은 측정 결과가 아닙니다. 한 번에 한 조건만 바꾸고 실제 결과가 다르면 원인을 기록하세요.

## 완료 조건

- [ ] builtin과 location 입력을 각각 두 항목으로 설명한다.
- [ ] 정상 소스와 오류 소스의 진단 결과를 구분한다.

## 자가 점검

1. position builtin을 일반 location으로 대체할 수 있나요?
2. vertex_index와 정점 buffer 속성은 어떻게 다른가요?

## 공식 참고

- [WGSL 명세](https://www.w3.org/TR/WGSL/)
- [WebGPU API](https://developer.mozilla.org/en-US/docs/Web/API/WebGPU_API)

## 연결된 예제와 실행 범위

[예제 원본](../../../../../src/labs/wgsl-01/example.js) · [실행 환경과 제한](../../../../examples.md)

원본 코드·기록은 자동으로 덮어쓰지 않습니다. 기존 예제를 초기화할 때도 필기는 유지됩니다.

## 다음 학습

[다음: 리터럴과 명시적 수치 타입](../units/02/README.md)

## 실험 기록 — 직접 작성

### 목표

### 핵심 개념

### 바꾼 변수와 예상

### 실제 결과

### 배운 점

### 남은 질문
