# WebAssembly · 17 복수 배열의 배치

[시리즈 목차](../../README.md) · [전체 기술 지도](../../../../README.md)

단계: 배포와 실행 구조 · 외부 실행 예제 · 미리보기 안내 · 저장 ID: `webassembly-step-17`

## 목표와 학습 후 역량

- 학습 결과: 영역 분리의 역할을 설명한다. 입력 사례: 서로 다른 길이의 두 배열.
- 산출물: 영역 표와 sentinel 값. 소유권 규약 처리 근거를 코드와 연결해 설명한다.

## 선수 지식

16단위 「정렬과 비정렬 접근」의 정렬 및 DataView 실습 결과를 준비한다.

## 핵심 개념과 설명

### 영역 분리

입력과 출력 영역은 겹치지 않게 계산해야 한다. 포인터를 수동 배치하면 충돌 위험이 있다.

### 소유권 규약

누가 할당하고 재사용하는지 래퍼 계약에 적는다. 사용 중 영역을 다른 요청에 덮어쓰지 않는다.

## 실습 준비

예제 화면의 실행 범위 안내를 먼저 확인하세요. 다음은 과제를 별도 프로젝트로 확장할 때의 준비 환경입니다. iframe 미리보기는 WebAssembly.Memory와 JS 기준 계산 실험이며 실제 Wasm 모듈 실행으로 표시하지 않는다. 실제 모듈 실습은 별도 Node 22+ 또는 통제한 로컬 웹 프로젝트에서 한다. 기존 src/labs/webassembly-02·03의 kernel.wat·kernel.wasm·benchmark.mjs를 사용하며 WAT 수정 시 공식 wat2wasm 도구로 다시 빌드한다. CSP·격리를 완화하지 않고 측정값은 직접 기록한다.

연결된 예제는 출발점입니다. 아래 과제 전체가 완성된 코드는 아니며, 예제의 지원 범위를 넘는 작업은 별도 프로젝트에서 수행하세요.

## 실습 과제

1. 별도 실습 프로젝트의 day-17.mjs에 두 배열 offset과 길이를 계산하고 sentinel로 경계 오염을 검사한다. 기존 1·14·28단위 예제는 출발점으로만 참고한다.
2. 입력 조건: 서로 다른 길이의 두 배열. 기준: 분리. 기준 조건에서 실행한 뒤 관찰값과 오류를 notes/day-17.md에 남긴다.
3. 변경 변수: 배치. 변경값: 의도적 겹침. 같은 입력 경로로 다시 실행한다. 저장할 산출물: 영역 표와 sentinel 값. 확인할 가설: 겹친 경우 데이터 오염이 검출된다. 실제 결과와 비교해 일치 여부 및 차이의 원인을 기록한다.

## 관찰할 변수

| 변수 | 기준 조건 | 바꿀 조건 | 예상할 변화·검증 가설 |
| --- | --- | --- | --- |
| 배치 | 분리 | 의도적 겹침 | 겹친 경우 데이터 오염이 검출된다. |

표의 예상은 측정 결과가 아닙니다. 한 번에 한 조건만 바꾸고 실제 결과가 다르면 원인을 기록하세요.

## 완료 조건

- [ ] 필수 산출물: 영역 표와 sentinel 값. 기준 및 변경 조건 각각의 결과가 있어 총 2조건을 비교할 수 있고, 입력값과 실행 환경을 함께 기록했다.
- [ ] 두 조건의 차이에 관한 설명에 다음 개념을 모두 연결했다: 영역 분리, 소유권 규약. 예상과 다른 항목은 원인 또는 미해결 이유를 1개 이상 적었다.

## 자가 점검

1. 이번 실습에서 영역 분리 개념은 어느 처리 단계에 영향을 주는가? 입력 사례: 서로 다른 길이의 두 배열.
2. 변경 변수: 배치. 확인할 가설: 겹친 경우 데이터 오염이 검출된다. 실제 결과가 가설과 일치했는가? 소유권 규약 관점에서 근거를 설명하라.

## 공식 참고

- [WebAssembly 개발 도구 안내](https://webassembly.org/getting-started/developers-guide/)
- [MDN WebAssembly JavaScript API](https://developer.mozilla.org/en-US/docs/WebAssembly/Guides/Using_the_JavaScript_API)
- [MDN WebAssembly.Memory](https://developer.mozilla.org/en-US/docs/WebAssembly/Reference/JavaScript_interface/Memory)

## 연결된 예제와 실행 범위

[예제 원본](../../../../../../src/labs/webassembly-step-17/example.js) · [실행 환경과 제한](../../../../../examples.md)

Standalone WAT + Node assertions; iframe CSP blocks Wasm compilation.

- [kernel.wat](../../../../../../src/labs/webassembly-step-17/kernel.wat)
- [experiment.mjs](../../../../../../src/labs/webassembly-step-17/experiment.mjs)

원본 코드·기록은 자동으로 덮어쓰지 않습니다. 기존 예제를 초기화할 때도 필기는 유지됩니다.

## 다음 학습

[이전: 정렬과 비정렬 접근](../16/README.md) · [다음: 문자열 바이트 계약](../18/README.md)

## 실험 기록 — 직접 작성

### 목표

### 핵심 개념

### 바꾼 변수와 예상

### 실제 결과

### 배운 점

### 남은 질문
