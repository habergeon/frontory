# WebGPU · 17 Map과 staging buffer

[시리즈 목차](../../README.md) · [전체 기술 지도](../../../../README.md)

단계: Compute와 데이터 이동 · 편집 가능한 예제 · 저장 ID: `webgpu-step-17`

## 목표와 학습 후 역량

- 안전한 readback을 구현한다.
- buffer 매핑 수명을 관리한다.

## 선수 지식

16단위 결과물과 기록을 이어 사용합니다. Map과 staging buffer 실험에 앞서 이전 입력과 기준 출력을 보관합니다.

## 핵심 개념과 설명

### 읽기 경로

GPU storage buffer를 곧바로 CPU에서 읽는 방식은 일반적인 readback 계약과 다릅니다. COPY_DST|MAP_READ staging buffer로 복사한 뒤 매핑합니다.

### 매핑 상태

매핑된 buffer는 GPU가 사용할 수 없는 상태입니다. getMappedRange의 데이터를 복사해 보관한 뒤 unmap합니다.

## 실습 준비

예제 화면의 실행 범위 안내를 먼저 확인하세요. 다음은 과제를 별도 프로젝트로 확장할 때의 준비 환경입니다. 별도 localhost 또는 HTTPS 프로젝트에서 직접 구현하는 문서 안내 실습입니다. secure context, navigator.gpu, adapter 요청 결과를 확인하고 미지원 안내를 제공합니다. device.lost 처리와 자원 해제를 유지합니다.

연결된 예제는 출발점입니다. 아래 과제 전체가 완성된 코드는 아니며 예제의 지원 범위를 넘는 작업은 별도 프로젝트에서 수행하세요.

## 실습 과제

1. readback.js에서 결과 COPY_SRC buffer와 staging buffer를 분리하세요.
2. copyBufferToBuffer를 제출한 뒤 mapAsync(GPUMapMode.READ)를 기다리세요.
3. getMappedRange를 복사하고 unmap한 뒤 다음 계산을 수행하세요.

## 관찰할 변수

| 변수 | 기준 조건 | 바꿀 조건 | 예상할 변화·검증 가설 |
| --- | --- | --- | --- |
| 읽기 횟수 | 마지막 한 번 | 매 단계 | 반복 매핑과 대기가 전체 지연을 늘릴 것으로 예상합니다. |

표의 예상은 측정 결과가 아닙니다. 한 번에 한 조건만 바꾸고 실제 결과가 다르면 원인을 기록하세요.

## 완료 조건

- [ ] unmap 후에도 복사한 CPU 결과가 유지된다.
- [ ] 매핑된 staging buffer를 GPU 명령에 다시 사용하지 않는다.

## 자가 점검

1. getMappedRange view를 그대로 보관하면 unmap 후 무엇이 달라지나요?
2. GPU 결과를 표시만 할 때 readback이 꼭 필요한가요?

## 공식 참고

- [WebGPU API와 오류 처리](https://developer.mozilla.org/en-US/docs/Web/API/WebGPU_API)
- [WGSL 명세](https://www.w3.org/TR/WGSL/)

## 연결된 예제와 실행 범위

[예제 원본](../../../../../../src/labs/webgpu-step-17/example.js) · [실행 환경과 제한](../../../../../examples.md)

실제 WebGPU/WGSL 실행. HTTPS/localhost와 지원 adapter 필요; 미지원 환경에는 사유를 표시하며 CPU 결과를 GPU로 대체하지 않습니다.


원본 코드·기록은 자동으로 덮어쓰지 않습니다. 기존 예제를 초기화할 때도 필기는 유지됩니다.

## 다음 학습

[이전: Storage와 ping-pong](../16/README.md) · [다음: 복사 정렬과 texture 행](../18/README.md)

## 실험 기록 — 직접 작성

### 목표

### 핵심 개념

### 바꾼 변수와 예상

### 실제 결과

### 배운 점

### 남은 질문
