# WGSL · 23 Storage texture 출력

[시리즈 목차](../../README.md) · [전체 기술 지도](../../../../README.md)

단계: 수치 검증과 커널 설계 · 문서 기반 직접 구현 · 저장 ID: `wgsl-step-23`

## 목표와 학습 후 역량

- 이미지 compute 출력을 구성한다.
- 형식에 따른 값 변환을 검증한다.

## 선수 지식

22단위 결과물과 기록을 이어 사용합니다. Storage texture 출력 실험에 앞서 이전 입력과 기준 출력을 보관합니다.

## 핵심 개념과 설명

### 출력 형식

storage texture 선언의 format과 호스트 texture 형식은 일치해야 합니다. 저장값의 범위와 정밀도도 형식에 따라 달라집니다.

### Pass 연결

compute가 쓴 texture를 다음 render pass에서 읽을 수 있습니다. 같은 작업에서 충돌하는 사용을 피하고 자원 usage를 맞춥니다.

## 실습 준비

별도 localhost 또는 HTTPS 프로젝트에서 직접 구현하는 문서 안내 실습입니다. secure context, navigator.gpu, adapter 요청 결과를 확인하고 미지원 안내를 제공합니다. device.lost 처리와 자원 해제를 유지합니다.

이 단위에는 내장 실행 예제가 없습니다. 아래 절차에 따라 별도 실습 파일을 만들고 실행 결과를 필기에 남기세요. 코드 파일은 작업 폴더에서 따로 보관하고 Frontory 필기는 JSON 또는 Markdown으로 백업하세요.

## 실습 과제

1. image.wgsl에 rgba8unorm write storage texture를 선언하세요.
2. global id의 x/y를 색으로 변환하고 textureStore로 기록하세요.
3. 호스트에 STORAGE_BINDING|TEXTURE_BINDING texture를 만들고 다음 render pass로 표시하세요.

## 관찰할 변수

| 변수 | 기준 조건 | 바꿀 조건 | 예상할 변화·검증 가설 |
| --- | --- | --- | --- |
| 출력 색 | 0..1 범위 | 일부 성분 1 초과 | unorm 형식에서 저장 범위 제한이 드러날 것으로 예상합니다. |

표의 예상은 측정 결과가 아닙니다. 한 번에 한 조건만 바꾸고 실제 결과가 다르면 원인을 기록하세요.

## 완료 조건

- [ ] shader와 호스트의 format이 일치한다.
- [ ] 네 모서리 출력과 범위 초과 성분의 저장값을 확인한다.

## 자가 점검

1. f32 계산 결과가 texture에 그대로 f32로 저장되나요?
2. storage texture와 storage buffer 중 어떤 결과 구조에 무엇이 적합한가요?

## 공식 참고

- [WGSL 명세](https://www.w3.org/TR/WGSL/)
- [WebGPU API](https://developer.mozilla.org/en-US/docs/Web/API/WebGPU_API)

## 연결된 예제와 실행 범위

문서와 필기를 제공합니다. 내장 실행 예제는 아직 제공하지 않습니다.

원본 코드·기록은 자동으로 덮어쓰지 않습니다. 기존 예제를 초기화할 때도 필기는 유지됩니다.

## 다음 학습

[이전: Texture 함수의 단계 제약](../22/README.md) · [다음: 수치 안정성과 특수 입력](../24/README.md)

## 실험 기록 — 직접 작성

### 목표

### 핵심 개념

### 바꾼 변수와 예상

### 실제 결과

### 배운 점

### 남은 질문
