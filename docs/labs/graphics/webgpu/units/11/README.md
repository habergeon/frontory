# WebGPU · 11 Texture와 sampler

[시리즈 목차](../../README.md) · [전체 기술 지도](../../../../README.md)

단계: 렌더 자원과 화면 구성 · 문서 기반 직접 구현 · 저장 ID: `webgpu-step-11`

## 목표와 학습 후 역량

- Texture 입력을 연결한다.
- 샘플러 설정의 효과를 비교한다.

## 선수 지식

10단위 결과물과 기록을 이어 사용합니다. Texture와 sampler 실험에 앞서 이전 입력과 기준 출력을 보관합니다.

## 핵심 개념과 설명

### 역할 분리

texture는 texel 데이터를 저장하고 sampler는 보간과 경계 처리를 정합니다. 두 자원을 별도 binding으로 연결합니다.

### 입력 색

이미지의 색 표현과 texture 형식 선택은 표시 결과에 영향을 줍니다. 작은 직접 만든 패턴으로 방향과 채널을 먼저 확인합니다.

## 실습 준비

별도 localhost 또는 HTTPS 프로젝트에서 직접 구현하는 문서 안내 실습입니다. secure context, navigator.gpu, adapter 요청 결과를 확인하고 미지원 안내를 제공합니다. device.lost 처리와 자원 해제를 유지합니다.

이 단위에는 내장 실행 예제가 없습니다. 아래 절차에 따라 별도 실습 파일을 만들고 실행 결과를 필기에 남기세요. 코드 파일은 작업 폴더에서 따로 보관하고 Frontory 필기는 JSON 또는 Markdown으로 백업하세요.

## 실습 과제

1. texture.js에서 2×2 RGBA 패턴을 만들어 queue.writeTexture로 업로드하세요.
2. texture_2d와 sampler binding을 fragment shader에 연결하세요.
3. UV 방향·nearest·linear 샘플링을 비교하고 네 모서리 색을 기록하세요.

## 관찰할 변수

| 변수 | 기준 조건 | 바꿀 조건 | 예상할 변화·검증 가설 |
| --- | --- | --- | --- |
| filter | nearest | linear | 경계에서 색이 부드럽게 섞일 것으로 예상합니다. |

표의 예상은 측정 결과가 아닙니다. 한 번에 한 조건만 바꾸고 실제 결과가 다르면 원인을 기록하세요.

## 완료 조건

- [ ] 2×2 네 모서리 색의 위치를 확인한다.
- [ ] 두 필터의 경계 출력 차이를 보관한다.

## 자가 점검

1. texture와 sampler를 하나로 보지 않는 이유는 무엇인가요?
2. UV의 Y 방향 오류와 이미지 행 순서 오류를 어떻게 구분하나요?

## 공식 참고

- [WebGPU API와 오류 처리](https://developer.mozilla.org/en-US/docs/Web/API/WebGPU_API)
- [WGSL 명세](https://www.w3.org/TR/WGSL/)

## 연결된 예제와 실행 범위

문서와 필기를 제공합니다. 내장 실행 예제는 아직 제공하지 않습니다.

원본 코드·기록은 자동으로 덮어쓰지 않습니다. 기존 예제를 초기화할 때도 필기는 유지됩니다.

## 다음 학습

[이전: 행렬과 카메라](../10/README.md) · [다음: 깊이 attachment](../12/README.md)

## 실험 기록 — 직접 작성

### 목표

### 핵심 개념

### 바꾼 변수와 예상

### 실제 결과

### 배운 점

### 남은 질문
