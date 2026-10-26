# WebAssembly · 04 Export 검사

[시리즈 목차](../../README.md) · [전체 기술 지도](../../../../README.md)

단계: 모듈과 수치 계약 · 외부 실행 예제 · 미리보기 안내 · 저장 ID: `webassembly-step-04`

## 목표와 학습 후 역량

- 학습 결과: Export 표면의 역할을 설명한다. 입력 사례: 정상 모듈과 필수 이름 오타.
- 산출물: export 목록과 오류 안내. 계약 검사 처리의 근거를 코드와 연결해 설명한다.

## 선수 지식

3단위 「Compile과 Instance」의 Module 및 Instance 실습 결과를 준비한다.

## 핵심 개념과 설명

### Export 표면

JS는 공개된 이름으로 함수와 메모리에 접근한다. 이름과 타입을 추측하면 실행 때 실패한다.

### 계약 검사

Module.exports는 공개 항목을 확인하게 한다. 필수 export 누락은 초기화 오류로 처리한다.

## 실습 준비

예제 화면의 실행 범위 안내를 먼저 확인하세요. 다음은 과제를 별도 프로젝트로 확장할 때의 준비 환경입니다. iframe 미리보기는 WebAssembly.Memory와 JS 기준 계산 실험이며 실제 Wasm 모듈 실행으로 표시하지 않는다. 실제 모듈 실습은 별도 Node 22+ 또는 통제한 로컬 웹 프로젝트에서 한다. 기존 src/labs/webassembly-02·03의 kernel.wat·kernel.wasm·benchmark.mjs를 사용하며 WAT 수정 시 공식 wat2wasm 도구로 다시 빌드한다. CSP·격리를 완화하지 않고 측정값은 직접 기록한다.

연결된 예제는 출발점입니다. 아래 과제 전체가 완성된 코드는 아니며 예제의 지원 범위를 넘는 작업은 별도 프로젝트에서 수행하세요.

## 실습 과제

1. 별도 실습 프로젝트의 day-4.mjs에 Module.exports를 출력하고 memory·sum·at·transform 존재를 검사한다. 기존 1·14·28단위 예제는 출발점으로만 참고한다.
2. 입력 조건: 정상 모듈과 필수 이름 오타. 기준: sum. 기준 조건에서 실행한 뒤 관찰값과 오류를 notes/day-4.md에 남긴다.
3. 변경 변수: 요청 이름, 변경값: sumMissing. 같은 입력 경로로 다시 실행한다. 저장할 산출물: export 목록과 오류 안내. 확인할 가설: 누락을 명확히 보고하고 계산을 시작하지 않는다. 실제 결과와 비교해 일치 여부 및 차이의 원인을 기록한다.

## 관찰할 변수

| 변수      | 기준 조건 | 바꿀 조건  | 예상할 변화·검증 가설                          |
| --------- | --------- | ---------- | ---------------------------------------------- |
| 요청 이름 | sum       | sumMissing | 누락을 명확히 보고하고 계산을 시작하지 않는다. |

표의 예상은 측정 결과가 아닙니다. 한 번에 한 조건만 바꾸고 실제 결과가 다르면 원인을 기록하세요.

## 완료 조건

- [ ] 필수 산출물: export 목록과 오류 안내. 기준 및 변경 조건 각각의 결과가 있어 총 2조건을 비교할 수 있고 입력값과 실행 환경을 함께 기록했다.
- [ ] 두 조건의 차이에 관한 설명에 다음 개념을 모두 연결했다: Export 표면, 계약 검사. 예상과 다른 항목은 원인 또는 미해결 이유를 1개 이상 적었다.

## 자가 점검

1. 이번 실습에서 Export 표면 개념은 어느 처리 단계에 영향을 주는가? 입력 사례: 정상 모듈과 필수 이름 오타.
2. 변경 변수: 요청 이름. 확인할 가설: 누락을 명확히 보고하고 계산을 시작하지 않는다. 실제 결과가 가설과 일치했는가? 계약 검사 관점에서 근거를 설명하라.

## 공식 참고

- [WebAssembly 개발 도구 안내](https://webassembly.org/getting-started/developers-guide/)
- [MDN WebAssembly JavaScript API](https://developer.mozilla.org/en-US/docs/WebAssembly/Guides/Using_the_JavaScript_API)
- [MDN WebAssembly.Memory](https://developer.mozilla.org/en-US/docs/WebAssembly/Reference/JavaScript_interface/Memory)

## 연결된 예제와 실행 범위

[예제 원본](../../../../../../src/labs/webassembly-step-04/example.js) · [실행 환경과 제한](../../../../../examples.md)

Standalone WAT + Node assertions; iframe CSP blocks Wasm compilation.

- [kernel.wat](../../../../../../src/labs/webassembly-step-04/kernel.wat)
- [experiment.mjs](../../../../../../src/labs/webassembly-step-04/experiment.mjs)

원본 코드·기록은 자동으로 덮어쓰지 않습니다. 기존 예제를 초기화할 때도 필기는 유지됩니다.

## 다음 학습

[이전: Compile과 Instance](../03/README.md) · [다음: Import와 Host 함수](../05/README.md)

## 실험 기록 — 직접 작성

### 목표

### 핵심 개념

### 바꾼 변수와 예상

### 실제 결과

### 배운 점

### 남은 질문
