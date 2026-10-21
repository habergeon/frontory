# WGSL · 22 Texture 함수의 단계 제약

[시리즈 목차](../../README.md) · [전체 기술 지도](../../../../README.md)

단계: 수치 검증과 커널 설계 · 문서 기반 직접 구현 · 저장 ID: `wgsl-step-22`

## 목표와 학습 후 역량

- 단계에 맞는 texture 함수를 선택한다.
- texel과 정규화 좌표를 구분한다.

## 선수 지식

21단위 결과물과 기록을 이어 사용합니다. Texture 함수의 단계 제약 실험에 앞서 이전 입력과 기준 출력을 보관합니다.

## 핵심 개념과 설명

### 암묵 미분

textureSample은 암묵 미분을 사용하는 샘플링 경로입니다. compute에서는 textureLoad나 명시적인 레벨의 textureSampleLevel 같은 적절한 함수를 선택합니다.

### 좌표 단위

textureLoad는 정수 texel 좌표로 접근하고 필터 샘플은 정규화 좌표를 사용합니다. 같은 숫자를 넣어도 같은 위치를 뜻하지 않습니다.

## 실습 준비

별도 localhost 또는 HTTPS 프로젝트에서 직접 구현하는 문서 안내 실습입니다. secure context, navigator.gpu, adapter 요청 결과를 확인하고 미지원 안내를 제공합니다. device.lost 처리와 자원 해제를 유지합니다.

이 단위에는 내장 실행 예제가 없습니다. 아래 절차에 따라 별도 실습 파일을 만들고 실행 결과를 필기에 남기세요. 코드 파일은 작업 폴더에서 따로 보관하고 Frontory 필기는 JSON 또는 Markdown으로 백업하세요.

## 실습 과제

1. texture-kernel.wgsl에서 textureDimensions로 입력 크기를 구하세요.
2. textureLoad로 4×4 직접 만든 texture를 읽어 storage output으로 복사하세요.
3. 별도 fragment 또는 명시적 level 샘플 경로와 모서리·중앙 값을 비교하세요.

## 관찰할 변수

| 변수 | 기준 조건 | 바꿀 조건 | 예상할 변화·검증 가설 |
| --- | --- | --- | --- |
| 접근 방식 | 정수 texel load | 정규화 좌표와 linear sampling | 보간 위치에서 색이 섞이지만 texel load는 저장값을 읽을 것으로 예상합니다. |

표의 예상은 측정 결과가 아닙니다. 한 번에 한 조건만 바꾸고 실제 결과가 다르면 원인을 기록하세요.

## 완료 조건

- [ ] 16 texel load 결과가 원본과 일치한다.
- [ ] compute 코드가 암묵 미분 샘플에 의존하지 않는다.

## 자가 점검

1. texel 중심을 UV로 바꿀 때 0.5 offset은 왜 필요한가요?
2. mipmap level을 고정하면 축소 품질은 어떻게 달라지나요?

## 공식 참고

- [WGSL 명세](https://www.w3.org/TR/WGSL/)
- [WebGPU API](https://developer.mozilla.org/en-US/docs/Web/API/WebGPU_API)

## 연결된 예제와 실행 범위

문서와 필기를 제공합니다. 내장 실행 예제는 아직 제공하지 않습니다.

원본 코드·기록은 자동으로 덮어쓰지 않습니다. 기존 예제를 초기화할 때도 필기는 유지됩니다.

## 다음 학습

[이전: Ping-pong과 데이터 경쟁](../21/README.md) · [다음: Storage texture 출력](../23/README.md)

## 실험 기록 — 직접 작성

### 목표

### 핵심 개념

### 바꾼 변수와 예상

### 실제 결과

### 배운 점

### 남은 질문
