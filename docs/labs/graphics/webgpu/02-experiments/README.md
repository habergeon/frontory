# WebGPU · 14 Buffer와 Render pass

[시리즈 목차](../README.md) · [전체 기술 지도](../../../README.md)

단계: 렌더 자원과 화면 구성 · 기존 예제에서 확장 · 저장 ID: `webgpu-02`

## 목표와 학습 후 역량

- 렌더 경로를 통합한다.
- validation 실패를 진단하고 복구한다.

## 선수 지식

13단위 결과물과 기록을 이어 사용합니다. Buffer와 Render pass 실험에 앞서 이전 입력과 기준 출력을 보관합니다.

## 핵심 개념과 설명

### 통합 경로

CPU 배열은 buffer와 binding을 거쳐 shader 입력이 됩니다. render pass는 출력 attachment와 pipeline·draw 상태를 묶습니다.

### 오류 범위

validation 오류를 잡을 때는 오류가 날 수 있는 작업 전후에 error scope를 둡니다. 오류를 숨기기보다 descriptor와 메시지를 함께 기록합니다.

## 실습 준비

기존 webgpu-02 미리보기는 출발점입니다. 이후 과제 전체의 구현이나 검증을 대신하지 않습니다. 별도 localhost 또는 HTTPS 프로젝트에서 직접 구현하는 문서 안내 실습입니다. secure context, navigator.gpu, adapter 요청 결과를 확인하고 미지원 안내를 제공합니다. device.lost 처리와 자원 해제를 유지합니다.

연결된 예제는 출발점입니다. 아래 과제 전체가 완성된 코드는 아니며, 예제의 지원 범위를 넘는 작업은 별도 프로젝트에서 수행하세요.

## 실습 과제

1. renderer.js에 정점·색 uniform·attachment·draw 경로를 한 함수로 묶으세요.
2. pushErrorScope('validation') 뒤 잘못된 usage buffer를 사용하는 최소 사례를 만들고 popErrorScope 결과를 표시하세요.
3. usage를 복구하고 색·해상도 입력을 바꿔 같은 렌더 경로를 재실행하세요.

## 관찰할 변수

| 변수 | 기준 조건 | 바꿀 조건 | 예상할 변화·검증 가설 |
| --- | --- | --- | --- |
| buffer usage | UNIFORM\|COPY_DST | COPY_DST만 지정 | uniform binding 검증에서 오류가 나고 복구 후 색이 갱신될 것으로 예상합니다. |

표의 예상은 측정 결과가 아닙니다. 한 번에 한 조건만 바꾸고 실제 결과가 다르면 원인을 기록하세요.

## 완료 조건

- [ ] CPU 색 값에서 화면 출력까지 다섯 단계의 연결을 설명한다.
- [ ] 의도한 validation 오류를 기록하고 정상 렌더링으로 복구한다.

## 자가 점검

1. pass 설정과 pipeline 설정은 어디에서 맞물리나요?
2. submit 성공만으로 렌더 정확성을 보장할 수 있나요?

## 공식 참고

- [WebGPU API와 오류 처리](https://developer.mozilla.org/en-US/docs/Web/API/WebGPU_API)
- [WGSL 명세](https://www.w3.org/TR/WGSL/)

## 연결된 예제와 실행 범위

[기존 예제 원본](../../../../../src/labs/webgpu-02/example.js) · [실행 환경과 제한](../../../../examples.md)

원본 코드·기록은 자동으로 덮어쓰지 않습니다. 기존 예제를 초기화할 때도 필기는 유지됩니다.

## 다음 학습

[이전: Resize와 샘플 수](../units/13/README.md) · [다음: Compute 첫 배열 변환](../units/15/README.md)

## 실험 기록 — 직접 작성

### 목표

### 핵심 개념

### 바꾼 변수와 예상

### 실제 결과

### 배운 점

### 남은 질문
