# Playwright · 17 Network Route

[시리즈 목차](../../README.md) · [전체 기술 지도](../../../../README.md)

단계: 비동기·격리·진단 · 외부 실행 예제 · 미리보기 안내 · 저장 ID: `playwright-step-17`

## 목표와 학습 후 역량

- fetch 기반 문서 로딩 fixture 앱과 별도 origin을 준비한다.
- 같은 /docs/a 요청에 200 및 500 응답을 주고 로딩·완료·오류 상태를 검증한다.

## 선수 지식

16단위 「Viewport와 반응형」의 조건 명시 및 핵심 동작 실습 결과를 준비한다.

## 핵심 개념과 설명

### 의존성 제어

page.route는 실제 발생하는 네트워크 요청의 응답을 통제한다. Frontory 문서는 eager 번들로 가져오므로 문서 선택 때 fetch 요청이 발생한다고 가정해서는 안 된다.

### 범위

이 단위는 직접 만드는 별도 fixture 앱의 fetch 요청을 검증한다. Frontory의 번들 문서 열기 테스트와 네트워크 의존성이 있는 fixture 테스트를 분리한다.

## 실습 준비

예제 화면의 실행 범위 안내를 먼저 확인하세요. 다음은 과제를 별도 프로젝트로 확장할 때의 준비 환경입니다. 별도 Node Playwright 프로젝트에서 학습자가 직접 만든 fixture 앱의 전용 로컬 origin을 테스트한다. fixture 파일과 테스트 파일은 이 과제에서 작성할 산출물이며 기존 제공 파일이 아니다. Frontory 문서는 src/app/curriculum.ts에서 eager 번들되므로 문서 선택 fetch를 가정하지 않는다. 사용자 데이터·CSP·격리는 변경하지 않는다.

연결된 예제는 출발점입니다. 아래 과제 전체가 완성된 코드는 아니며 예제의 지원 범위를 넘는 작업은 별도 프로젝트에서 수행하세요.

## 실습 과제

1. 별도 fixture-app/src/main.ts에 A·B 문서 버튼과 문서 영역, role=status 로딩 안내, role=alert 오류 안내를 만든다. 선택 시 fetch(`/docs/${id}`)를 호출하고 response.ok를 검사하도록 직접 구현한다. Frontory 소스나 문서 로더는 바꾸지 않는다.
2. fixture 앱을 전용 로컬 origin에서 실행한다. tests/day-17.spec.ts에서 page.route로 **/docs/a만 가로채도록 먼저 등록한 뒤 fixture origin으로 이동한다. A 버튼을 클릭하고 실제 요청 발생을 확인한 후 200 JSON 응답을 반환해 제목·본문·완료 상태를 검사한다.
3. 독립 테스트에서 같은 요청에 500 응답을 반환한다. 로딩 상태가 끝나고 role=alert 오류 안내가 나타나며 성공 문서가 표시되지 않는지 검사한다. 두 조건의 요청 URL·응답 코드·UI 결과를 notes/day-17.md에 기록한다.

## 관찰할 변수

| 변수 | 기준 조건 | 바꿀 조건 | 예상할 변화·검증 가설 |
| --- | --- | --- | --- |
| 응답 | 200 | 500 | 실패가 사용자 안내로 나타난다. |

표의 예상은 측정 결과가 아닙니다. 한 번에 한 조건만 바꾸고 실제 결과가 다르면 원인을 기록하세요.

## 완료 조건

- [ ] fixture origin에서 /docs/a 요청이 실제 발생하며 200·500 두 조건의 요청 및 UI 결과를 기록했다.
- [ ] 200에서는 예상 제목·본문이 표시되고 500에서는 오류 안내가 표시되며 로딩 상태가 종료된다. Frontory에 존재하지 않는 문서 fetch를 가로챘다고 주장하지 않는다.

## 자가 점검

1. Frontory의 eager 문서 번들과 fixture 앱의 fetch 문서 로딩은 테스트 대상이 어떻게 다른가?
2. 500 응답 처리에서 fetch 자체의 성공과 response.ok 검사가 필요한 이유는 무엇인가?

## 공식 참고

- [Playwright 설치와 실행](https://playwright.dev/docs/intro)
- [Playwright Locators](https://playwright.dev/docs/locators)
- [Playwright Assertions](https://playwright.dev/docs/test-assertions)
- [Playwright Downloads](https://playwright.dev/docs/downloads)
- [Playwright Visual comparisons](https://playwright.dev/docs/test-snapshots)
- [Playwright Network interception](https://playwright.dev/docs/network)

## 연결된 예제와 실행 범위

[예제 원본](../../../../../../src/labs/playwright-step-17/example.js) · [실행 환경과 제한](../../../../../examples.md)

Runnable standalone Playwright spec and HTTP fixture; preview does not run tests.

- [lesson.spec.mjs](../../../../../../src/labs/playwright-step-17/lesson.spec.mjs)
- [fixture.html](../../../../../../src/labs/playwright-step-17/fixture.html)
- [server.mjs](../../../../../../src/labs/playwright-step-17/server.mjs)
- [playwright.config.mjs](../../../../../../src/labs/playwright-step-17/playwright.config.mjs)

원본 코드·기록은 자동으로 덮어쓰지 않습니다. 기존 예제를 초기화할 때도 필기는 유지됩니다.

## 다음 학습

[이전: Viewport와 반응형](../16/README.md) · [다음: 지연과 경합](../18/README.md)

## 실험 기록 — 직접 작성

### 목표

### 핵심 개념

### 바꾼 변수와 예상

### 실제 결과

### 배운 점

### 남은 질문
