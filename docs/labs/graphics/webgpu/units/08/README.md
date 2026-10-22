# WebGPU · 08 Uniform과 bind group

[시리즈 목차](../../README.md) · [전체 기술 지도](../../../../README.md)

단계: 렌더 자원과 화면 구성 · 편집 가능한 예제 · 저장 ID: `webgpu-step-08`

## 목표와 학습 후 역량

- 자원을 binding에 연결한다.
- 작은 입력을 재생성 없이 갱신한다.

## 선수 지식

7단위 결과물과 기록을 이어 사용합니다. Uniform과 bind group 실험에 앞서 이전 입력과 기준 출력을 보관합니다.

## 핵심 개념과 설명

### 연결 계약

bind group은 shader의 group·binding 위치에 자원을 연결합니다. 자원 유형과 shader visibility도 layout의 일부입니다.

### 작은 갱신

uniform은 여러 invocation이 공유하는 작은 입력에 적합합니다. 매번 pipeline을 만들지 않고 buffer 값을 갱신할 수 있습니다.

## 실습 준비

예제 화면의 실행 범위 안내를 먼저 확인하세요. 다음은 과제를 별도 프로젝트로 확장할 때의 준비 환경입니다. 별도 localhost 또는 HTTPS 프로젝트에서 직접 구현하는 문서 안내 실습입니다. secure context, navigator.gpu, adapter 요청 결과를 확인하고 미지원 안내를 제공합니다. device.lost 처리와 자원 해제를 유지합니다.

연결된 예제는 출발점입니다. 아래 과제 전체가 완성된 코드는 아니며 예제의 지원 범위를 넘는 작업은 별도 프로젝트에서 수행하세요.

## 실습 과제

1. uniform.wgsl에 vec4f 색 uniform을 binding 0으로 선언하세요.
2. uniforms.js에서 UNIFORM|COPY_DST 16바이트 buffer와 bind group을 만드세요.
3. 색 슬라이더를 queue.writeBuffer와 연결하고 생성한 pipeline 수를 기록하세요.

## 관찰할 변수

| 변수 | 기준 조건 | 바꿀 조건 | 예상할 변화·검증 가설 |
| --- | --- | --- | --- |
| 색 입력 | [1,0,0,1] | [0,1,0,1] | pipeline 재생성 없이 삼각형 색만 바뀔 것으로 예상합니다. |

표의 예상은 측정 결과가 아닙니다. 한 번에 한 조건만 바꾸고 실제 결과가 다르면 원인을 기록하세요.

## 완료 조건

- [ ] 두 색 입력이 정확히 반영된다.
- [ ] 색을 열 번 바꿔도 pipeline 생성 횟수는 늘지 않는다.

## 자가 점검

1. binding 번호는 buffer 내부 offset인가요?
2. uniform buffer를 vertex buffer 대신 사용할 수 있나요?

## 공식 참고

- [WebGPU API와 오류 처리](https://developer.mozilla.org/en-US/docs/Web/API/WebGPU_API)
- [WGSL 명세](https://www.w3.org/TR/WGSL/)

## 연결된 예제와 실행 범위

[예제 원본](../../../../../../src/labs/webgpu-step-08/example.js) · [실행 환경과 제한](../../../../../examples.md)

실제 WebGPU/WGSL 실행. HTTPS/localhost와 지원 adapter 필요; 미지원 환경에는 사유를 표시하며 CPU 결과를 GPU로 대체하지 않습니다.


원본 코드·기록은 자동으로 덮어쓰지 않습니다. 기존 예제를 초기화할 때도 필기는 유지됩니다.

## 다음 학습

[이전: 인덱스와 primitive](../07/README.md) · [다음: Uniform 구조체 정렬](../09/README.md)

## 실험 기록 — 직접 작성

### 목표

### 핵심 개념

### 바꾼 변수와 예상

### 실제 결과

### 배운 점

### 남은 질문
