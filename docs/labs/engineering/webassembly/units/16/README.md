# WebAssembly · 16 정렬과 비정렬 접근

[시리즈 목차](../../README.md) · [전체 기술 지도](../../../../README.md)

단계: 배포와 실행 구조 · 문서 기반 직접 구현 · 저장 ID: `webassembly-step-16`

## 목표와 학습 후 역량

- 학습 결과: 정렬의 역할을 설명한다. 입력 사례: 같은 네 바이트.
- 산출물: 생성 오류와 읽은 값. DataView 처리 근거를 코드와 연결해 설명한다.

## 선수 지식

15단위 「In-place 변환」의 덮어쓰기 및 반복 조건 실습 결과를 준비한다.

## 핵심 개념과 설명

### 정렬

Int32Array의 byteOffset은 원소 크기 배수여야 한다. Wasm의 load와 JS view 제약을 구별한다.

### DataView

DataView는 바이트 기준 접근을 제공한다. 비정렬 데이터를 명시적으로 읽을 수 있다.

## 실습 준비

iframe 미리보기는 WebAssembly.Memory와 JS 기준 계산 실험이며 실제 Wasm 모듈 실행으로 표시하지 않는다. 실제 모듈 실습은 별도 Node 22+ 또는 통제한 로컬 웹 프로젝트에서 한다. 기존 src/labs/webassembly-02·03의 kernel.wat·kernel.wasm·benchmark.mjs를 사용하며 WAT 수정 시 공식 wat2wasm 도구로 다시 빌드한다. CSP·격리를 완화하지 않고 측정값은 직접 기록한다.

이 단위에는 내장 실행 예제가 없습니다. 아래 절차에 따라 별도 실습 파일을 만들고 실행 결과를 필기에 남기세요. 코드 파일은 작업 폴더에서 따로 보관하고 Frontory 필기는 JSON 또는 Markdown으로 백업하세요.

## 실습 과제

1. 별도 실습 프로젝트의 day-16.mjs에 offset 0과 1에 데이터를 배치해 TypedArray 생성 및 DataView 접근을 비교한다. 기존 1·14·28단위 예제는 출발점으로만 참고한다.
2. 입력 조건: 같은 네 바이트. 기준: 0. 기준 조건에서 실행한 뒤 관찰값과 오류를 notes/day-16.md에 남긴다.
3. 변경 변수: offset. 변경값: 1. 같은 입력 경로로 다시 실행한다. 저장할 산출물: 생성 오류와 읽은 값. 확인할 가설: TypedArray 제약과 바이트 접근 차이가 드러난다. 실제 결과와 비교해 일치 여부 및 차이의 원인을 기록한다.

## 관찰할 변수

| 변수 | 기준 조건 | 바꿀 조건 | 예상할 변화·검증 가설 |
| --- | --- | --- | --- |
| offset | 0 | 1 | TypedArray 제약과 바이트 접근 차이가 드러난다. |

표의 예상은 측정 결과가 아닙니다. 한 번에 한 조건만 바꾸고 실제 결과가 다르면 원인을 기록하세요.

## 완료 조건

- [ ] 필수 산출물: 생성 오류와 읽은 값. 기준 및 변경 조건 각각의 결과가 있어 총 2조건을 비교할 수 있고, 입력값과 실행 환경을 함께 기록했다.
- [ ] 두 조건의 차이에 관한 설명에 다음 개념을 모두 연결했다: 정렬, DataView. 예상과 다른 항목은 원인 또는 미해결 이유를 1개 이상 적었다.

## 자가 점검

1. 이번 실습에서 정렬 개념은 어느 처리 단계에 영향을 주는가? 입력 사례: 같은 네 바이트.
2. 변경 변수: offset. 확인할 가설: TypedArray 제약과 바이트 접근 차이가 드러난다. 실제 결과가 가설과 일치했는가? DataView 관점에서 근거를 설명하라.

## 공식 참고

- [WebAssembly 개발 도구 안내](https://webassembly.org/getting-started/developers-guide/)
- [MDN WebAssembly JavaScript API](https://developer.mozilla.org/en-US/docs/WebAssembly/Guides/Using_the_JavaScript_API)
- [MDN WebAssembly.Memory](https://developer.mozilla.org/en-US/docs/WebAssembly/Reference/JavaScript_interface/Memory)

## 연결된 예제와 실행 범위

문서와 필기를 제공합니다. 내장 실행 예제는 아직 제공하지 않습니다.

원본 코드·기록은 자동으로 덮어쓰지 않습니다. 기존 예제를 초기화할 때도 필기는 유지됩니다.

## 다음 학습

[이전: In-place 변환](../15/README.md) · [다음: 복수 배열의 배치](../17/README.md)

## 실험 기록 — 직접 작성

### 목표

### 핵심 개념

### 바꾼 변수와 예상

### 실제 결과

### 배운 점

### 남은 질문
