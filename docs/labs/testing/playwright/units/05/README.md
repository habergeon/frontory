# Playwright · 05 Locator 범위

[시리즈 목차](../../README.md) · [전체 기술 지도](../../../../README.md)

단계: 사용자 흐름과 Locator · 외부 실행 예제 · 미리보기 안내 · 저장 ID: `playwright-step-05`

## 목표와 학습 후 역량

- 학습 결과: 범위 좁히기의 역할을 설명한다. 입력 사례: 같은 버튼 이름의 카드 세 개.
- 산출물: 선택된 카드 ID와 제목. 엄격성 처리의 근거를 코드와 연결해 설명한다.

## 선수 지식

4단위 「Label과 입력」의 Label 및 값 assertion 실습 결과를 준비한다.

## 핵심 개념과 설명

### 범위 좁히기

목록 항목 안에서 버튼을 찾으면 중복 이름을 구분한다. 전체 페이지의 첫 번째 버튼에 의존하지 않는다.

### 엄격성

여러 요소가 일치하는 오류는 모호한 계약을 드러낸다. nth로 숨기기 전에 항목의 의미를 찾는다.

## 실습 준비

예제 화면의 실행 범위 안내를 먼저 확인하세요. 다음은 과제를 별도 프로젝트로 확장할 때의 준비 환경입니다. 모든 테스트는 별도 Node 프로젝트의 @playwright/test와 테스트 전용 로컬 origin에서 작성·실행한다. 기존 playwright-01·02·03 미리보기는 테스트 소스를 보여줄 뿐 iframe에서 Playwright를 실행하지 않는다. 새 테스트 파일은 과제에서 직접 작성하며 통과 여부는 실제 runner 출력으로만 판단한다. 사용자 profile·실사용 저장소를 사용하지 않고 CSP·격리를 유지한다.

연결된 예제는 출발점입니다. 아래 과제 전체가 완성된 코드는 아니며 예제의 지원 범위를 넘는 작업은 별도 프로젝트에서 수행하세요.

## 실습 과제

1. 별도 실습 프로젝트의 tests/day-5.spec.ts에 카드 locator를 제목으로 filter한 뒤 내부 버튼을 클릭한다. 기존 1·14·28단위 예제는 출발점으로만 참고한다.
2. 입력 조건: 같은 버튼 이름의 카드 세 개. 기준: 원래 순서. 기준 조건에서 실행한 뒤 관찰값과 오류를 notes/day-5.md에 남긴다.
3. 변경 변수: 목록 순서, 변경값: 역순. 같은 입력 경로로 다시 실행한다. 저장할 산출물: 선택된 카드 ID와 제목. 확인할 가설: 순서가 바뀌어도 같은 카드를 조작한다. 실제 결과와 비교해 일치 여부 및 차이의 원인을 기록한다.

## 관찰할 변수

| 변수      | 기준 조건 | 바꿀 조건 | 예상할 변화·검증 가설                 |
| --------- | --------- | --------- | ------------------------------------- |
| 목록 순서 | 원래 순서 | 역순      | 순서가 바뀌어도 같은 카드를 조작한다. |

표의 예상은 측정 결과가 아닙니다. 한 번에 한 조건만 바꾸고 실제 결과가 다르면 원인을 기록하세요.

## 완료 조건

- [ ] 필수 산출물: 선택된 카드 ID와 제목. 기준 및 변경 조건 각각의 결과가 있어 총 2조건을 비교할 수 있고 입력값과 실행 환경을 함께 기록했다.
- [ ] 두 조건의 차이에 관한 설명에 다음 개념을 모두 연결했다: 범위 좁히기, 엄격성. 예상과 다른 항목은 원인 또는 미해결 이유를 1개 이상 적었다.

## 자가 점검

1. 이번 실습에서 범위 좁히기 개념은 어느 처리 단계에 영향을 주는가? 입력 사례: 같은 버튼 이름의 카드 세 개.
2. 변경 변수: 목록 순서. 확인할 가설: 순서가 바뀌어도 같은 카드를 조작한다. 실제 결과가 가설과 일치했는가? 엄격성 관점에서 근거를 설명하라.

## 공식 참고

- [Playwright 설치와 실행](https://playwright.dev/docs/intro)
- [Playwright Locators](https://playwright.dev/docs/locators)
- [Playwright Assertions](https://playwright.dev/docs/test-assertions)
- [Playwright Downloads](https://playwright.dev/docs/downloads)
- [Playwright Visual comparisons](https://playwright.dev/docs/test-snapshots)

## 연결된 예제와 실행 범위

[예제 원본](../../../../../../src/labs/playwright-step-05/example.js) · [실행 환경과 제한](../../../../../examples.md)

Runnable standalone Playwright spec and HTTP fixture; preview does not run tests.

- [lesson.spec.mjs](../../../../../../src/labs/playwright-step-05/lesson.spec.mjs)
- [fixture.html](../../../../../../src/labs/playwright-step-05/fixture.html)
- [server.mjs](../../../../../../src/labs/playwright-step-05/server.mjs)
- [playwright.config.mjs](../../../../../../src/labs/playwright-step-05/playwright.config.mjs)

원본 코드·기록은 자동으로 덮어쓰지 않습니다. 기존 예제를 초기화할 때도 필기는 유지됩니다.

## 다음 학습

[이전: Label과 입력](../04/README.md) · [다음: 재시도 Assertion](../06/README.md)

## 실험 기록 — 직접 작성

### 목표

### 핵심 개념

### 바꾼 변수와 예상

### 실제 결과

### 배운 점

### 남은 질문
