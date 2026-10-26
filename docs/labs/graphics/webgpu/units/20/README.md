# WebGPU · 20 Compute 결과 렌더링

[시리즈 목차](../../README.md) · [전체 기술 지도](../../../../README.md)

단계: Compute와 데이터 이동 · 편집 가능한 예제 · 저장 ID: `webgpu-step-20`

## 목표와 학습 후 역량

- Compute와 렌더 pass를 연결한다.
- 불필요한 데이터 왕복을 줄인다.

## 선수 지식

19단위 결과물과 기록을 이어 사용합니다. Compute 결과 렌더링 실험에 앞서 이전 입력과 기준 출력을 보관합니다.

## 핵심 개념과 설명

### GPU 내부 연결

계산 결과를 vertex 또는 storage 입력으로 바로 렌더링할 수 있습니다. CPU readback 없이도 다음 pass가 같은 제출의 결과를 소비할 수 있습니다.

### 사용 선언

buffer의 compute 쓰기와 렌더 읽기에 필요한 usage를 함께 선언합니다. pass 사이 역할을 명시해 충돌을 피합니다.

## 실습 준비

예제 화면의 실행 범위 안내를 먼저 확인하세요. 다음은 과제를 별도 프로젝트로 확장할 때의 준비 환경입니다. 별도 localhost 또는 HTTPS 프로젝트에서 직접 구현하는 문서 안내 실습입니다. secure context, navigator.gpu, adapter 요청 결과를 확인하고 미지원 안내를 제공합니다. device.lost 처리와 자원 해제를 유지합니다.

연결된 예제는 출발점입니다. 아래 과제 전체가 완성된 코드는 아니며 예제의 지원 범위를 넘는 작업은 별도 프로젝트에서 수행하세요.

## 실습 과제

1. particles.js에 위치 STORAGE|VERTEX|COPY_SRC|COPY_DST buffer와 속도 STORAGE|COPY_DST buffer를 만들고 초기 데이터를 writeBuffer로 기록하세요.
2. compute pass에서 위치를 갱신하고 뒤의 render pass에서 정점 위치로 사용하세요.
3. readback은 검증 버튼에만 연결하고 프레임별 호출 수를 표시하세요.

## 관찰할 변수

| 변수          | 기준 조건 | 바꿀 조건      | 예상할 변화·검증 가설                                         |
| ------------- | --------- | -------------- | ------------------------------------------------------------- |
| readback 정책 | 매 프레임 | 검증 버튼 때만 | 시각 결과는 유지하며 CPU 대기 비용이 줄 수 있다고 예상합니다. |

표의 예상은 측정 결과가 아닙니다. 한 번에 한 조건만 바꾸고 실제 결과가 다르면 원인을 기록하세요.

## 완료 조건

- [ ] 일반 프레임에서 mapAsync 호출이 0회이다.
- [ ] 검증 버튼의 위치 값이 CPU 기준값과 오차 범위 내에서 같다.

## 자가 점검

1. 같은 pass 안에서 읽기와 쓰기를 겹치면 왜 검토가 필요한가요?
2. usage를 추가하면 데이터가 자동 복사되나요?

## 공식 참고

- [WebGPU API와 오류 처리](https://developer.mozilla.org/en-US/docs/Web/API/WebGPU_API)
- [WGSL 명세](https://www.w3.org/TR/WGSL/)

## 연결된 예제와 실행 범위

[예제 원본](../../../../../../src/labs/webgpu-step-20/example.js) · [실행 환경과 제한](../../../../../examples.md)

실제 WebGPU/WGSL 실행. HTTPS/localhost와 지원 adapter 필요; 미지원 환경에는 사유를 표시하며 CPU 결과를 GPU로 대체하지 않습니다.

원본 코드·기록은 자동으로 덮어쓰지 않습니다. 기존 예제를 초기화할 때도 필기는 유지됩니다.

## 다음 학습

[이전: Workgroup 공유 메모리](../19/README.md) · [다음: Instancing과 데이터 구조](../21/README.md)

## 실험 기록 — 직접 작성

### 목표

### 핵심 개념

### 바꾼 변수와 예상

### 실제 결과

### 배운 점

### 남은 질문
