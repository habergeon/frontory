# WebGPU · 19 Workgroup 공유 메모리

[시리즈 목차](../../README.md) · [전체 기술 지도](../../../../README.md)

단계: Compute와 데이터 이동 · 편집 가능한 예제 · 저장 ID: `webgpu-step-19`

## 목표와 학습 후 역량

- 공유 메모리 감소 연산을 만든다.
- barrier 도달 조건을 유지한다.

## 선수 지식

18단위 결과물과 기록을 이어 사용합니다. Workgroup 공유 메모리 실험에 앞서 이전 입력과 기준 출력을 보관합니다.

## 핵심 개념과 설명

### 공유 범위

var<workgroup>은 같은 workgroup invocation들이 공유합니다. 서로 다른 workgroup 사이에는 이 메모리로 통신할 수 없습니다.

### 동기화

공유 값을 읽기 전에 workgroupBarrier로 해당 단계의 쓰기를 맞춥니다. barrier는 workgroup 전체가 같은 제어 흐름에서 도달해야 합니다.

## 실습 준비

예제 화면의 실행 범위 안내를 먼저 확인하세요. 다음은 과제를 별도 프로젝트로 확장할 때의 준비 환경입니다. 별도 localhost 또는 HTTPS 프로젝트에서 직접 구현하는 문서 안내 실습입니다. secure context, navigator.gpu, adapter 요청 결과를 확인하고 미지원 안내를 제공합니다. device.lost 처리와 자원 해제를 유지합니다.

연결된 예제는 출발점입니다. 아래 과제 전체가 완성된 코드는 아니며 예제의 지원 범위를 넘는 작업은 별도 프로젝트에서 수행하세요.

## 실습 과제

1. reduce.wgsl에 64개 값을 workgroup 배열에 넣는 부분합 kernel을 작성하세요.
2. 범위 밖 lane도 0을 쓰고 barrier에 참여하게 하세요.
3. N=65의 두 부분합을 CPU에서 합쳐 전체 합과 비교하세요.

## 관찰할 변수

| 변수 | 기준 조건 | 바꿀 조건 | 예상할 변화·검증 가설 |
| --- | --- | --- | --- |
| 길이 | 64 | 65 | 두 번째 그룹의 빈 lane은 0으로 참여하고 합은 정확할 것으로 예상합니다. |

표의 예상은 측정 결과가 아닙니다. 한 번에 한 조건만 바꾸고 실제 결과가 다르면 원인을 기록하세요.

## 완료 조건

- [ ] 65개 CPU 합과 GPU 부분합의 합이 허용 오차 내에서 같다.
- [ ] barrier 이전에 일부 lane만 return하는 경로가 없다.

## 자가 점검

1. barrier가 dispatch 전체를 동기화하나요?
2. 범위 밖 lane을 0으로 채우는 이유는 무엇인가요?

## 공식 참고

- [WebGPU API와 오류 처리](https://developer.mozilla.org/en-US/docs/Web/API/WebGPU_API)
- [WGSL 명세](https://www.w3.org/TR/WGSL/)

## 연결된 예제와 실행 범위

[예제 원본](../../../../../../src/labs/webgpu-step-19/example.js) · [실행 환경과 제한](../../../../../examples.md)

실제 WebGPU/WGSL 실행. HTTPS/localhost와 지원 adapter 필요; 미지원 환경에는 사유를 표시하며 CPU 결과를 GPU로 대체하지 않습니다.


원본 코드·기록은 자동으로 덮어쓰지 않습니다. 기존 예제를 초기화할 때도 필기는 유지됩니다.

## 다음 학습

[이전: 복사 정렬과 texture 행](../18/README.md) · [다음: Compute 결과 렌더링](../20/README.md)

## 실험 기록 — 직접 작성

### 목표

### 핵심 개념

### 바꾼 변수와 예상

### 실제 결과

### 배운 점

### 남은 질문
