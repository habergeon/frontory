# WebAssembly · 28 실제 병목 평가

[시리즈 목차](../README.md) · [전체 기술 지도](../../../README.md)

단계: 정확도와 병목 평가 · 외부 실행 예제 · 미리보기 안내 · 저장 ID: `webassembly-03`

## 목표와 학습 후 역량

- 학습 결과: 전체 지연의 역할을 설명한다. 입력 사례: 여러 크기와 반복 수.
- 산출물: 콜드·웜·복사·정확도·채택 근거 보고서. 근거 있는 결정 처리의 근거를 코드와 연결해 설명한다.

## 선수 지식

27단위 「환경과 채택 기준」의 재현성 및 채택 기준 실습 결과를 준비한다.

## 핵심 개념과 설명

### 전체 지연

컴파일과 전송을 빼면 실제 사용 경험과 어긋날 수 있다. 콜드와 웜을 분리해 읽는다.

### 근거 있는 결정

Wasm은 모든 작업을 자동 가속하지 않는다. 정확도와 실제 병목을 바탕으로 채택 여부를 정한다.

## 실습 준비

iframe 미리보기는 WebAssembly.Memory와 JS 기준 계산 실험이며 실제 Wasm 모듈 실행으로 표시하지 않는다. 실제 모듈 실습은 별도 Node 22+ 또는 통제한 로컬 웹 프로젝트에서 한다. 기존 src/labs/webassembly-02·03의 kernel.wat·kernel.wasm·benchmark.mjs를 사용하며 WAT 수정 시 공식 wat2wasm 도구로 다시 빌드한다. CSP·격리를 완화하지 않고 측정값은 직접 기록한다.

연결된 예제는 출발점입니다. 아래 과제 전체가 완성된 코드는 아니며 예제의 지원 범위를 넘는 작업은 별도 프로젝트에서 수행하세요.

## 실습 과제

1. 별도 실습 프로젝트의 day-28.mjs에 node src/labs/webassembly-03/benchmark.mjs를 실행하고 JS·실제 Wasm 배열 변환 보고서를 완성한다. 기존 1·14·28단위 예제는 출발점으로만 참고한다.
2. 입력 조건: 여러 크기와 반복 수. 기준: 함수만. 기준 조건에서 실행한 뒤 관찰값과 오류를 notes/day-28.md에 남긴다.
3. 변경 변수: 비교 범위, 변경값: 전체 요청. 같은 입력 경로로 다시 실행한다. 저장할 산출물: 콜드·웜·복사·정확도·채택 근거 보고서. 확인할 가설: 전체 비용을 보면 판단이 달라질 수 있다. 실제 결과와 비교해 일치 여부 및 차이의 원인을 기록한다.

## 관찰할 변수

| 변수 | 기준 조건 | 바꿀 조건 | 예상할 변화·검증 가설 |
| --- | --- | --- | --- |
| 비교 범위 | 함수만 | 전체 요청 | 전체 비용을 보면 판단이 달라질 수 있다. |

표의 예상은 측정 결과가 아닙니다. 한 번에 한 조건만 바꾸고 실제 결과가 다르면 원인을 기록하세요.

## 완료 조건

- [ ] 필수 산출물: 콜드·웜·복사·정확도·채택 근거 보고서. 기준 및 변경 조건 각각의 결과가 있어 총 2조건을 비교할 수 있고 입력값과 실행 환경을 함께 기록했다.
- [ ] 두 조건의 차이에 관한 설명에 다음 개념을 모두 연결했다: 전체 지연, 근거 있는 결정. 예상과 다른 항목은 원인 또는 미해결 이유를 1개 이상 적었다.

## 자가 점검

1. 이번 실습에서 전체 지연 개념은 어느 처리 단계에 영향을 주는가? 입력 사례: 여러 크기와 반복 수.
2. 변경 변수: 비교 범위. 확인할 가설: 전체 비용을 보면 판단이 달라질 수 있다. 실제 결과가 가설과 일치했는가? 근거 있는 결정 관점에서 근거를 설명하라.

## 공식 참고

- [WebAssembly 개발 도구 안내](https://webassembly.org/getting-started/developers-guide/)
- [MDN WebAssembly JavaScript API](https://developer.mozilla.org/en-US/docs/WebAssembly/Guides/Using_the_JavaScript_API)
- [MDN WebAssembly.Memory](https://developer.mozilla.org/en-US/docs/WebAssembly/Reference/JavaScript_interface/Memory)

## 연결된 예제와 실행 범위

[예제 원본](../../../../../src/labs/webassembly-03/example.js) · [실행 환경과 제한](../../../../examples.md)

미리보기는 WebAssembly.Memory 및 JS 경계 비용 실험입니다. CSP를 유지하므로 WASM 모듈 컴파일은 iframe 밖에서 실행합니다. 같은 폴더의 kernel.wat, kernel.wasm, benchmark.mjs로 실제 WASM 계산과 JS 결과를 비교하세요.

- [benchmark.mjs](../../../../../src/labs/webassembly-03/benchmark.mjs)
- [kernel.wasm](../../../../../src/labs/webassembly-03/kernel.wasm)
- [kernel.wat](../../../../../src/labs/webassembly-03/kernel.wat)

원본 코드·기록은 자동으로 덮어쓰지 않습니다. 기존 예제를 초기화할 때도 필기는 유지됩니다.

## 다음 학습

[이전: 환경과 채택 기준](../units/27/README.md)

## 실험 기록 — 직접 작성

### 목표

### 핵심 개념

### 바꾼 변수와 예상

### 실제 결과

### 배운 점

### 남은 질문
