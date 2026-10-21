# WebGPU · 12 깊이 attachment

[시리즈 목차](../../README.md) · [전체 기술 지도](../../../../README.md)

단계: 렌더 자원과 화면 구성 · 편집 가능한 예제 · 저장 ID: `webgpu-step-12`

## 목표와 학습 후 역량

- 깊이 검사를 설정한다.
- attachment 크기와 수명을 관리한다.

## 선수 지식

11단위 결과물과 기록을 이어 사용합니다. 깊이 attachment 실험에 앞서 이전 입력과 기준 출력을 보관합니다.

## 핵심 개념과 설명

### 깊이 검사

depth texture는 fragment의 앞뒤 관계를 저장합니다. color attachment만으로는 그리기 순서와 독립적인 가림을 만들 수 없습니다.

### 수명

크기가 바뀌면 depth texture도 같은 크기로 다시 만들어야 합니다. 교체한 texture는 더 이상 쓰지 않는 시점에 해제합니다.

## 실습 준비

예제 화면의 실행 범위 안내를 먼저 확인하세요. 다음은 과제를 별도 프로젝트로 확장할 때의 준비 환경입니다. 별도 localhost 또는 HTTPS 프로젝트에서 직접 구현하는 문서 안내 실습입니다. secure context, navigator.gpu, adapter 요청 결과를 확인하고 미지원 안내를 제공합니다. device.lost 처리와 자원 해제를 유지합니다.

연결된 예제는 출발점입니다. 아래 과제 전체가 완성된 코드는 아니며, 예제의 지원 범위를 넘는 작업은 별도 프로젝트에서 수행하세요.

## 실습 과제

1. depth.js에 depth24plus texture와 depthStencil 설정을 추가하세요.
2. 겹친 삼각형 두 개를 서로 다른 깊이에 놓고 draw 순서를 바꾸세요.
3. depthClearValue·depthCompare·depthWriteEnabled를 기록하며 결과를 비교하세요.

## 관찰할 변수

| 변수 | 기준 조건 | 바꿀 조건 | 예상할 변화·검증 가설 |
| --- | --- | --- | --- |
| 깊이 검사 | 비활성 | less와 쓰기 활성 | 불투명 도형의 가림이 draw 순서와 독립적일 것으로 예상합니다. |

표의 예상은 측정 결과가 아닙니다. 한 번에 한 조건만 바꾸고 실제 결과가 다르면 원인을 기록하세요.

## 완료 조건

- [ ] 두 draw 순서에서 앞쪽 도형이 같다.
- [ ] depth attachment 크기가 color 출력 크기와 일치한다.

## 자가 점검

1. 투명 물체에도 같은 깊이 쓰기 정책이 맞나요?
2. 깊이 clear 값과 compare를 함께 정해야 하는 이유는 무엇인가요?

## 공식 참고

- [WebGPU API와 오류 처리](https://developer.mozilla.org/en-US/docs/Web/API/WebGPU_API)
- [WGSL 명세](https://www.w3.org/TR/WGSL/)

## 연결된 예제와 실행 범위

[예제 원본](../../../../../../src/labs/webgpu-step-12/example.js) · [실행 환경과 제한](../../../../../examples.md)

실제 WebGPU/WGSL 실행. HTTPS/localhost와 지원 adapter 필요; 미지원 환경에는 사유를 표시하며 CPU 결과를 GPU로 대체하지 않습니다.


원본 코드·기록은 자동으로 덮어쓰지 않습니다. 기존 예제를 초기화할 때도 필기는 유지됩니다.

## 다음 학습

[이전: Texture와 sampler](../11/README.md) · [다음: Resize와 샘플 수](../13/README.md)

## 실험 기록 — 직접 작성

### 목표

### 핵심 개념

### 바꾼 변수와 예상

### 실제 결과

### 배운 점

### 남은 질문
