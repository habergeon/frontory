# WebGPU · 15 Compute 첫 배열 변환

[시리즈 목차](../../README.md) · [전체 기술 지도](../../../../README.md)

단계: Compute와 데이터 이동 · 편집 가능한 예제 · 저장 ID: `webgpu-step-15`

## 목표와 학습 후 역량

- 독립 원소 compute를 구현한다.
- dispatch 경계를 처리한다.

## 선수 지식

14단위 결과물과 기록을 이어 사용합니다. Compute 첫 배열 변환 실험에 앞서 이전 입력과 기준 출력을 보관합니다.

## 핵심 개념과 설명

### 병렬 인덱스

global_invocation_id는 처리할 원소의 위치를 정하는 데 사용할 수 있습니다. dispatch 크기는 원소 수와 workgroup 크기를 함께 고려합니다.

### 경계 검사

마지막 workgroup에는 실제 데이터보다 많은 invocation이 생길 수 있습니다. 독립 원소 커널에서는 길이를 검사한 뒤 접근합니다.

## 실습 준비

예제 화면의 실행 범위 안내를 먼저 확인하세요. 다음은 과제를 별도 프로젝트로 확장할 때의 준비 환경입니다. 별도 localhost 또는 HTTPS 프로젝트에서 직접 구현하는 문서 안내 실습입니다. secure context, navigator.gpu, adapter 요청 결과를 확인하고 미지원 안내를 제공합니다. device.lost 처리와 자원 해제를 유지합니다.

연결된 예제는 출발점입니다. 아래 과제 전체가 완성된 코드는 아니며, 예제의 지원 범위를 넘는 작업은 별도 프로젝트에서 수행하세요.

## 실습 과제

1. compute.wgsl에 입력 배열 원소를 두 배로 만드는 kernel을 작성하세요.
2. storage buffer 두 개와 compute pipeline을 만들고 ceil(N/64) workgroup을 dispatch하세요.
3. N=65를 입력하고 출력 마지막 원소까지 staging buffer로 복사해 검사하세요.

## 관찰할 변수

| 변수 | 기준 조건 | 바꿀 조건 | 예상할 변화·검증 가설 |
| --- | --- | --- | --- |
| 배열 길이 | 64 | 65 | 두 번째 workgroup의 한 원소만 유효하게 계산될 것으로 예상합니다. |

표의 예상은 측정 결과가 아닙니다. 한 번에 한 조건만 바꾸고 실제 결과가 다르면 원인을 기록하세요.

## 완료 조건

- [ ] 65개 결과가 CPU의 두 배 결과와 일치한다.
- [ ] 길이보다 큰 invocation이 buffer 접근 전에 제외된다.

## 자가 점검

1. dispatchWorkgroups의 인자는 원소 수인가요?
2. barrier를 추가하면 조기 return 조건을 다시 검토해야 하나요?

## 공식 참고

- [WebGPU API와 오류 처리](https://developer.mozilla.org/en-US/docs/Web/API/WebGPU_API)
- [WGSL 명세](https://www.w3.org/TR/WGSL/)

## 연결된 예제와 실행 범위

[예제 원본](../../../../../../src/labs/webgpu-step-15/example.js) · [실행 환경과 제한](../../../../../examples.md)

실제 WebGPU/WGSL 실행. HTTPS/localhost와 지원 adapter 필요; 미지원 환경에는 사유를 표시하며 CPU 결과를 GPU로 대체하지 않습니다.


원본 코드·기록은 자동으로 덮어쓰지 않습니다. 기존 예제를 초기화할 때도 필기는 유지됩니다.

## 다음 학습

[이전: Buffer와 Render pass](../../02-experiments/README.md) · [다음: Storage와 ping-pong](../16/README.md)

## 실험 기록 — 직접 작성

### 목표

### 핵심 개념

### 바꾼 변수와 예상

### 실제 결과

### 배운 점

### 남은 질문
