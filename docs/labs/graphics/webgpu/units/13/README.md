# WebGPU · 13 Resize와 샘플 수

[시리즈 목차](../../README.md) · [전체 기술 지도](../../../../README.md)

단계: 렌더 자원과 화면 구성 · 편집 가능한 예제 · 저장 ID: `webgpu-step-13`

## 목표와 학습 후 역량

- 해상도를 안전하게 갱신한다.
- MSAA attachment 계약을 유지한다.

## 선수 지식

12단위 결과물과 기록을 이어 사용합니다. Resize와 샘플 수 실험에 앞서 이전 입력과 기준 출력을 보관합니다.

## 핵심 개념과 설명

### 실제 해상도

CSS 크기와 drawing buffer 크기는 서로 다를 수 있습니다. DPR을 반영하되 장치 texture 크기 한도를 넘지 않도록 제한합니다.

### MSAA

다중 샘플 attachment는 resolve target으로 표시 결과를 넘길 수 있습니다. pipeline과 attachment의 sampleCount는 일치해야 합니다.

## 실습 준비

예제 화면의 실행 범위 안내를 먼저 확인하세요. 다음은 과제를 별도 프로젝트로 확장할 때의 준비 환경입니다. 별도 localhost 또는 HTTPS 프로젝트에서 직접 구현하는 문서 안내 실습입니다. secure context, navigator.gpu, adapter 요청 결과를 확인하고 미지원 안내를 제공합니다. device.lost 처리와 자원 해제를 유지합니다.

연결된 예제는 출발점입니다. 아래 과제 전체가 완성된 코드는 아니며, 예제의 지원 범위를 넘는 작업은 별도 프로젝트에서 수행하세요.

## 실습 과제

1. resize.js에서 ResizeObserver로 크기를 읽고 DPR과 limits로 buffer 크기를 정하세요.
2. sampleCount 4의 color·depth texture를 만들고 현재 canvas view를 resolveTarget으로 쓰세요.
3. resize 때 attachment를 교체하며 sampleCount 1과 4의 경계 이미지를 저장하세요.

## 관찰할 변수

| 변수 | 기준 조건 | 바꿀 조건 | 예상할 변화·검증 가설 |
| --- | --- | --- | --- |
| sampleCount | 1 | 4 | 삼각형 가장자리 계단이 줄고 attachment 비용이 늘 것으로 예상합니다. |

표의 예상은 측정 결과가 아닙니다. 한 번에 한 조건만 바꾸고 실제 결과가 다르면 원인을 기록하세요.

## 완료 조건

- [ ] 세 canvas 크기에서 attachment 크기가 일치한다.
- [ ] 1·4 샘플의 경계 이미지를 같은 시점에서 비교한다.

## 자가 점검

1. MSAA가 모든 shader aliasing을 해결하나요?
2. 창 크기가 0이 될 때 texture 생성은 어떻게 처리하나요?

## 공식 참고

- [WebGPU API와 오류 처리](https://developer.mozilla.org/en-US/docs/Web/API/WebGPU_API)
- [WGSL 명세](https://www.w3.org/TR/WGSL/)

## 연결된 예제와 실행 범위

[예제 원본](../../../../../../src/labs/webgpu-step-13/example.js) · [실행 환경과 제한](../../../../../examples.md)

실제 WebGPU/WGSL 실행. HTTPS/localhost와 지원 adapter 필요; 미지원 환경에는 사유를 표시하며 CPU 결과를 GPU로 대체하지 않습니다.


원본 코드·기록은 자동으로 덮어쓰지 않습니다. 기존 예제를 초기화할 때도 필기는 유지됩니다.

## 다음 학습

[이전: 깊이 attachment](../12/README.md) · [다음: Buffer와 Render pass](../../02-experiments/README.md)

## 실험 기록 — 직접 작성

### 목표

### 핵심 개념

### 바꾼 변수와 예상

### 실제 결과

### 배운 점

### 남은 질문
