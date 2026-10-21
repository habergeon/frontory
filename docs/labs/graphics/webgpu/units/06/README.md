# WebGPU · 06 정점 buffer와 속성

[시리즈 목차](../../README.md) · [전체 기술 지도](../../../../README.md)

단계: 장치와 명령의 기초 · 문서 기반 직접 구현 · 저장 ID: `webgpu-step-06`

## 목표와 학습 후 역량

- 정점 데이터 layout을 설계한다.
- CPU 배열을 GPU 정점 입력에 연결한다.

## 선수 지식

5단위 결과물과 기록을 이어 사용합니다. 정점 buffer와 속성 실험에 앞서 이전 입력과 기준 출력을 보관합니다.

## 핵심 개념과 설명

### 바이트 계약

vertex buffer layout은 stride와 각 속성 offset·format을 선언합니다. TypedArray의 원소 번호와 byte offset을 혼동하면 잘못된 값을 읽습니다.

### 업로드

GPUBufferUsage는 buffer를 어떤 명령에 사용할지 명시합니다. queue.writeBuffer를 쓰려면 대상에 COPY_DST 사용을 포함합니다.

## 실습 준비

별도 localhost 또는 HTTPS 프로젝트에서 직접 구현하는 문서 안내 실습입니다. secure context, navigator.gpu, adapter 요청 결과를 확인하고 미지원 안내를 제공합니다. device.lost 처리와 자원 해제를 유지합니다.

이 단위에는 내장 실행 예제가 없습니다. 아래 절차에 따라 별도 실습 파일을 만들고 실행 결과를 필기에 남기세요. 코드 파일은 작업 폴더에서 따로 보관하고 Frontory 필기는 JSON 또는 Markdown으로 백업하세요.

## 실습 과제

1. vertices.js에 위치 두 성분과 색 세 성분을 가진 세 정점을 만드세요.
2. 20바이트 stride와 0·8바이트 offset을 pipeline에 선언하세요.
3. VERTEX|COPY_DST buffer에 업로드하고 각 정점 색을 화면에서 확인하세요.

## 관찰할 변수

| 변수 | 기준 조건 | 바꿀 조건 | 예상할 변화·검증 가설 |
| --- | --- | --- | --- |
| arrayStride | 20바이트 | 24바이트와 맞는 padding 데이터 | 데이터와 layout을 함께 바꾸면 같은 삼각형이 나올 것으로 예상합니다. |

표의 예상은 측정 결과가 아닙니다. 한 번에 한 조건만 바꾸고 실제 결과가 다르면 원인을 기록하세요.

## 완료 조건

- [ ] 세 정점의 byte offset 표를 작성한다.
- [ ] 두 layout에서 정점 위치와 색이 일치한다.

## 자가 점검

1. format과 TypedArray 타입은 어떤 관계인가요?
2. stride만 바꾸고 데이터는 그대로 두면 어떻게 되나요?

## 공식 참고

- [WebGPU API와 오류 처리](https://developer.mozilla.org/en-US/docs/Web/API/WebGPU_API)
- [WGSL 명세](https://www.w3.org/TR/WGSL/)

## 연결된 예제와 실행 범위

문서와 필기를 제공합니다. 내장 실행 예제는 아직 제공하지 않습니다.

원본 코드·기록은 자동으로 덮어쓰지 않습니다. 기존 예제를 초기화할 때도 필기는 유지됩니다.

## 다음 학습

[이전: 셰이더 모듈과 진단](../05/README.md) · [다음: 인덱스와 primitive](../07/README.md)

## 실험 기록 — 직접 작성

### 목표

### 핵심 개념

### 바꾼 변수와 예상

### 실제 결과

### 배운 점

### 남은 질문
