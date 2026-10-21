# WGSL · 14 Binding과 메모리 배치

[시리즈 목차](../README.md) · [전체 기술 지도](../../../README.md)

단계: 자원 선언과 메모리 배치 · 기존 예제에서 확장 · 저장 ID: `wgsl-02`

## 목표와 학습 후 역량

- 혼합 uniform 배치를 구현한다.
- 필드 갱신의 독립성을 검증한다.

## 선수 지식

13단위 결과물과 기록을 이어 사용합니다. Binding과 메모리 배치 실험에 앞서 이전 입력과 기준 출력을 보관합니다.

## 핵심 개념과 설명

### 통합 계약

색과 변환을 묶어도 각각의 alignment와 offset을 계산해야 합니다. 바이트 표를 먼저 작성하면 값이 섞이는 문제를 재현하기 쉽습니다.

### 독립 갱신

두 필드가 같은 buffer에 있어도 올바른 offset과 범위로 갱신할 수 있습니다. 바뀌지 않아야 하는 필드를 함께 확인해야 덮어쓰기를 찾습니다.

## 실습 준비

기존 wgsl-02 미리보기는 출발점입니다. 이후 과제 전체의 구현이나 검증을 대신하지 않습니다. 별도 localhost 또는 HTTPS 프로젝트에서 직접 구현하는 문서 안내 실습입니다. secure context, navigator.gpu, adapter 요청 결과를 확인하고 미지원 안내를 제공합니다. device.lost 처리와 자원 해제를 유지합니다.

연결된 예제는 출발점입니다. 아래 과제 전체가 완성된 코드는 아니며, 예제의 지원 범위를 넘는 작업은 별도 프로젝트에서 수행하세요.

## 실습 과제

1. Params의 color:vec4f와 transform:mat4x4f offset을 0·16, 전체 80바이트로 적으세요.
2. host.js에서 color만 writeBuffer한 뒤 transform만 갱신하세요.
3. @group/@binding 대응을 확인하고 잘못된 offset 사례를 복구하세요.

## 관찰할 변수

| 변수 | 기준 조건 | 바꿀 조건 | 예상할 변화·검증 가설 |
| --- | --- | --- | --- |
| 갱신 범위 | color 16바이트 | transform 64바이트를 offset16에 갱신 | 색은 유지되고 변환만 바뀔 것으로 예상합니다. |

표의 예상은 측정 결과가 아닙니다. 한 번에 한 조건만 바꾸고 실제 결과가 다르면 원인을 기록하세요.

## 완료 조건

- [ ] 색 갱신이 변환을 바꾸지 않고 변환 갱신이 색을 바꾸지 않는다.
- [ ] 두 필드의 byte offset·크기와 binding 표가 있다.

## 자가 점검

1. TypedArray offset 단위와 writeBuffer offset 단위는 어떻게 구분하나요?
2. 80바이트 구조체가 dynamic uniform 슬롯도 80바이트라는 뜻인가요?

## 공식 참고

- [WGSL 명세](https://www.w3.org/TR/WGSL/)
- [WebGPU API](https://developer.mozilla.org/en-US/docs/Web/API/WebGPU_API)

## 연결된 예제와 실행 범위

[기존 예제 원본](../../../../../src/labs/wgsl-02/example.js) · [실행 환경과 제한](../../../../examples.md)

원본 코드·기록은 자동으로 덮어쓰지 않습니다. 기존 예제를 초기화할 때도 필기는 유지됩니다.

## 다음 학습

[이전: 런타임 배열과 Binding 범위](../units/13/README.md) · [다음: Compute ID와 인덱스](../units/15/README.md)

## 실험 기록 — 직접 작성

### 목표

### 핵심 개념

### 바꾼 변수와 예상

### 실제 결과

### 배운 점

### 남은 질문
