# Web Workers · 05 TypedArray와 Buffer

[시리즈 목차](../../README.md) · [전체 기술 지도](../../../../README.md)

단계: 메시지와 실행 문맥 · 편집 가능한 예제 · 저장 ID: `web-workers-step-05`

## 목표와 학습 후 역량

- 학습 결과: View의 역할을 설명한다. 입력 사례: [10,20,30,40]의 중간 두 값.
- 산출물: 송수신 범위와 합계 표. Offset 처리 근거를 코드와 연결해 설명한다.

## 선수 지식

4단위 「Structured Clone」의 복사 및 복제 제한 실습 결과를 준비한다.

## 핵심 개념과 설명

### View

TypedArray는 ArrayBuffer의 해석 창이다. view와 실제 저장소의 범위는 다를 수 있다.

### Offset

subarray는 같은 저장소 일부를 가리킨다. 수신 측에서도 offset과 length를 보존해야 한다.

## 실습 준비

예제 화면의 실행 범위 안내를 먼저 확인하세요. 다음은 과제를 별도 프로젝트로 확장할 때의 준비 환경입니다. 기존 web-workers-01·02·03은 시작 예제이며 새 과제는 별도 로컬 HTTP 프로젝트의 main.js와 worker.js로 작성한다. CSP와 iframe 격리를 유지한다. SharedArrayBuffer는 자신이 통제하는 외부 서버의 COOP·COEP 조건을 확인하며 미충족 시 transfer 경로를 사용한다. 성능 수치는 직접 측정한다.

연결된 예제는 출발점입니다. 아래 과제 전체가 완성된 코드는 아니며, 예제의 지원 범위를 넘는 작업은 별도 프로젝트에서 수행하세요.

## 실습 과제

1. 별도 실습 프로젝트의 src/day-5.js에 전체 배열과 subarray를 보내 byteOffset·length·값을 출력한다. 기존 1·14·28단위 예제는 출발점으로만 참고한다.
2. 입력 조건: [10,20,30,40]의 중간 두 값. 기준: 전체. 기준 조건에서 실행한 뒤 관찰값과 오류를 notes/day-5.md에 남긴다.
3. 변경 변수: 범위. 변경값: 중간 subarray. 같은 입력 경로로 다시 실행한다. 저장할 산출물: 송수신 범위와 합계 표. 확인할 가설: 부분 범위 합계만 계산된다. 실제 결과와 비교해 일치 여부 및 차이의 원인을 기록한다.

## 관찰할 변수

| 변수 | 기준 조건 | 바꿀 조건 | 예상할 변화·검증 가설 |
| --- | --- | --- | --- |
| 범위 | 전체 | 중간 subarray | 부분 범위 합계만 계산된다. |

표의 예상은 측정 결과가 아닙니다. 한 번에 한 조건만 바꾸고 실제 결과가 다르면 원인을 기록하세요.

## 완료 조건

- [ ] 필수 산출물: 송수신 범위와 합계 표. 기준 및 변경 조건 각각의 결과가 있어 총 2조건을 비교할 수 있고, 입력값과 실행 환경을 함께 기록했다.
- [ ] 두 조건의 차이에 관한 설명에 다음 개념을 모두 연결했다: View, Offset. 예상과 다른 항목은 원인 또는 미해결 이유를 1개 이상 적었다.

## 자가 점검

1. 이번 실습에서 View 개념은 어느 처리 단계에 영향을 주는가? 입력 사례: [10,20,30,40]의 중간 두 값.
2. 변경 변수: 범위. 확인할 가설: 부분 범위 합계만 계산된다. 실제 결과가 가설과 일치했는가? Offset 관점에서 근거를 설명하라.

## 공식 참고

- [MDN Using Web Workers](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers)
- [MDN Transferable objects](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Transferable_objects)

## 연결된 예제와 실행 범위

[예제 원본](../../../../../../src/labs/web-workers-step-05/example.js) · [실행 환경과 제한](../../../../../examples.md)

Interactive TypedArray와 Buffer experiment with resource cleanup.


원본 코드·기록은 자동으로 덮어쓰지 않습니다. 기존 예제를 초기화할 때도 필기는 유지됩니다.

## 다음 학습

[이전: Structured Clone](../04/README.md) · [다음: 오류 응답 계약](../06/README.md)

## 실험 기록 — 직접 작성

### 목표

### 핵심 개념

### 바꾼 변수와 예상

### 실제 결과

### 배운 점

### 남은 질문
