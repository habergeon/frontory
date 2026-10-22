# WebAssembly · 18 문자열 바이트 계약

[시리즈 목차](../../README.md) · [전체 기술 지도](../../../../README.md)

단계: 배포와 실행 구조 · 외부 실행 예제 · 미리보기 안내 · 저장 ID: `webassembly-step-18`

## 목표와 학습 후 역량

- 학습 결과: 인코딩의 역할을 설명한다. 입력 사례: 영문·한글·이모지.
- 산출물: 문자 수·바이트 수·왕복 문자열. 길이 전달 처리의 근거를 코드와 연결해 설명한다.

## 선수 지식

17단위 「복수 배열의 배치」의 영역 분리 및 소유권 규약 실습 결과를 준비한다.

## 핵심 개념과 설명

### 인코딩

JS 문자열 길이와 UTF-8 바이트 길이는 다르다. 한글과 이모지는 여러 바이트를 쓴다.

### 길이 전달

문자열 주소만으로 끝을 알 수 없다. byteLength나 종료 규약을 명시해야 한다.

## 실습 준비

예제 화면의 실행 범위 안내를 먼저 확인하세요. 다음은 과제를 별도 프로젝트로 확장할 때의 준비 환경입니다. iframe 미리보기는 WebAssembly.Memory와 JS 기준 계산 실험이며 실제 Wasm 모듈 실행으로 표시하지 않는다. 실제 모듈 실습은 별도 Node 22+ 또는 통제한 로컬 웹 프로젝트에서 한다. 기존 src/labs/webassembly-02·03의 kernel.wat·kernel.wasm·benchmark.mjs를 사용하며 WAT 수정 시 공식 wat2wasm 도구로 다시 빌드한다. CSP·격리를 완화하지 않고 측정값은 직접 기록한다.

연결된 예제는 출발점입니다. 아래 과제 전체가 완성된 코드는 아니며 예제의 지원 범위를 넘는 작업은 별도 프로젝트에서 수행하세요.

## 실습 과제

1. 별도 실습 프로젝트의 day-18.mjs에 TextEncoder로 문자열을 메모리에 쓰고 TextDecoder로 정해진 범위를 복원한다. 기존 1·14·28단위 예제는 출발점으로만 참고한다.
2. 입력 조건: 영문·한글·이모지. 기준: 문자 수. 기준 조건에서 실행한 뒤 관찰값과 오류를 notes/day-18.md에 남긴다.
3. 변경 변수: 길이 기준, 변경값: byteLength. 같은 입력 경로로 다시 실행한다. 저장할 산출물: 문자 수·바이트 수·왕복 문자열. 확인할 가설: byteLength를 사용해야 잘림 없이 복원된다. 실제 결과와 비교해 일치 여부 및 차이의 원인을 기록한다.

## 관찰할 변수

| 변수 | 기준 조건 | 바꿀 조건 | 예상할 변화·검증 가설 |
| --- | --- | --- | --- |
| 길이 기준 | 문자 수 | byteLength | byteLength를 사용해야 잘림 없이 복원된다. |

표의 예상은 측정 결과가 아닙니다. 한 번에 한 조건만 바꾸고 실제 결과가 다르면 원인을 기록하세요.

## 완료 조건

- [ ] 필수 산출물: 문자 수·바이트 수·왕복 문자열. 기준 및 변경 조건 각각의 결과가 있어 총 2조건을 비교할 수 있고 입력값과 실행 환경을 함께 기록했다.
- [ ] 두 조건의 차이에 관한 설명에 다음 개념을 모두 연결했다: 인코딩, 길이 전달. 예상과 다른 항목은 원인 또는 미해결 이유를 1개 이상 적었다.

## 자가 점검

1. 이번 실습에서 인코딩 개념은 어느 처리 단계에 영향을 주는가? 입력 사례: 영문·한글·이모지.
2. 변경 변수: 길이 기준. 확인할 가설: byteLength를 사용해야 잘림 없이 복원된다. 실제 결과가 가설과 일치했는가? 길이 전달 관점에서 근거를 설명하라.

## 공식 참고

- [WebAssembly 개발 도구 안내](https://webassembly.org/getting-started/developers-guide/)
- [MDN WebAssembly JavaScript API](https://developer.mozilla.org/en-US/docs/WebAssembly/Guides/Using_the_JavaScript_API)
- [MDN WebAssembly.Memory](https://developer.mozilla.org/en-US/docs/WebAssembly/Reference/JavaScript_interface/Memory)

## 연결된 예제와 실행 범위

[예제 원본](../../../../../../src/labs/webassembly-step-18/example.js) · [실행 환경과 제한](../../../../../examples.md)

Standalone WAT + Node assertions; iframe CSP blocks Wasm compilation.

- [kernel.wat](../../../../../../src/labs/webassembly-step-18/kernel.wat)
- [experiment.mjs](../../../../../../src/labs/webassembly-step-18/experiment.mjs)

원본 코드·기록은 자동으로 덮어쓰지 않습니다. 기존 예제를 초기화할 때도 필기는 유지됩니다.

## 다음 학습

[이전: 복수 배열의 배치](../17/README.md) · [다음: 브라우저 로딩과 MIME](../19/README.md)

## 실험 기록 — 직접 작성

### 목표

### 핵심 개념

### 바꾼 변수와 예상

### 실제 결과

### 배운 점

### 남은 질문
