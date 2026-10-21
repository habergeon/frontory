# WebGPU · 18 복사 정렬과 texture 행

[시리즈 목차](../../README.md) · [전체 기술 지도](../../../../README.md)

단계: Compute와 데이터 이동 · 문서 기반 직접 구현 · 저장 ID: `webgpu-step-18`

## 목표와 학습 후 역량

- 복사 정렬을 계산한다.
- texture readback padding을 제거한다.

## 선수 지식

17단위 결과물과 기록을 이어 사용합니다. 복사 정렬과 texture 행 실험에 앞서 이전 입력과 기준 출력을 보관합니다.

## 핵심 개념과 설명

### Buffer 복사

copyBufferToBuffer의 offset과 크기에는 4바이트 정렬 조건이 있습니다. buffer 전체 용량과 실제 유효 데이터 길이를 분리해 기록합니다.

### Texture 행

encoder의 buffer↔texture 복사에서 bytesPerRow는 필요한 경우 256바이트 배수를 사용합니다. queue.writeTexture의 행 규칙과 혼동하지 않습니다.

## 실습 준비

별도 localhost 또는 HTTPS 프로젝트에서 직접 구현하는 문서 안내 실습입니다. secure context, navigator.gpu, adapter 요청 결과를 확인하고 미지원 안내를 제공합니다. device.lost 처리와 자원 해제를 유지합니다.

이 단위에는 내장 실행 예제가 없습니다. 아래 절차에 따라 별도 실습 파일을 만들고 실행 결과를 필기에 남기세요. 코드 파일은 작업 폴더에서 따로 보관하고 Frontory 필기는 JSON 또는 Markdown으로 백업하세요.

## 실습 과제

1. copy-layout.js에 13픽셀 RGBA8 행의 유효 52바이트와 padded stride 256을 계산하세요.
2. copyTextureToBuffer 결과의 padding을 건너뛰며 CPU 이미지를 복원하세요.
3. buffer 복사 offset 4와 잘못된 offset 2를 error scope로 비교하세요.

## 관찰할 변수

| 변수 | 기준 조건 | 바꿀 조건 | 예상할 변화·검증 가설 |
| --- | --- | --- | --- |
| 행 stride | 52바이트 유효 데이터 | 256바이트 복사용 stride | padding을 제외하면 원본 13픽셀 행이 복원될 것으로 예상합니다. |

표의 예상은 측정 결과가 아닙니다. 한 번에 한 조건만 바꾸고 실제 결과가 다르면 원인을 기록하세요.

## 완료 조건

- [ ] 유효 행 바이트와 복사 stride를 각각 기록한다.
- [ ] 복원 이미지가 원본과 일치하고 잘못된 offset은 검증 오류가 된다.

## 자가 점검

1. writeTexture에도 언제나 256배수 규칙을 적용해야 하나요?
2. padding을 픽셀로 읽으면 어떤 줄무늬가 나타나나요?

## 공식 참고

- [WebGPU API와 오류 처리](https://developer.mozilla.org/en-US/docs/Web/API/WebGPU_API)
- [WGSL 명세](https://www.w3.org/TR/WGSL/)

## 연결된 예제와 실행 범위

문서와 필기를 제공합니다. 내장 실행 예제는 아직 제공하지 않습니다.

원본 코드·기록은 자동으로 덮어쓰지 않습니다. 기존 예제를 초기화할 때도 필기는 유지됩니다.

## 다음 학습

[이전: Map과 staging buffer](../17/README.md) · [다음: Workgroup 공유 메모리](../19/README.md)

## 실험 기록 — 직접 작성

### 목표

### 핵심 개념

### 바꾼 변수와 예상

### 실제 결과

### 배운 점

### 남은 질문
