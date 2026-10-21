# Playwright · 19 시계와 예약 저장

[시리즈 목차](../../README.md) · [전체 기술 지도](../../../../README.md)

단계: 비동기·격리·진단 · 외부 실행 예제 · 미리보기 안내 · 저장 ID: `playwright-step-19`

## 목표와 학습 후 역량

- 500ms debounce 저장 기능이 있는 독립 fixture 페이지와 저장 횟수 표시를 만든다.
- 600ms 및 100ms 입력 간격에서 저장 횟수 3회 및 1회와 동일한 마지막 저장값을 검증한다.

## 선수 지식

18단위 「지연과 경합」의 최신 상태 및 응답 순서 실습 결과를 준비한다.

## 핵심 개념과 설명

### 시간 제어

Clock API는 별도 fixture 페이지에 직접 구현한 debounce 타이머를 제어하는 데 사용한다. Frontory Workspace의 필기는 onChange에서 동기 저장하므로 예약 저장 기능이 있다고 가정하지 않는다.

### 관찰 조건

fixture의 타이머 실행과 저장된 값의 표시는 별도 관찰 대상이다. 저장 횟수와 마지막 저장 문자열을 화면에 노출해 시계 제어 후 결과를 검사한다.

## 실습 준비

예제 화면의 실행 범위 안내를 먼저 확인하세요. 다음은 과제를 별도 프로젝트로 확장할 때의 준비 환경입니다. 별도 Node Playwright runner와 학습자가 직접 구현한 debounce fixture 페이지를 사용한다. Frontory Workspace.tsx의 필기는 onChange마다 draftStore.save를 동기 호출하며 이 실습의 500ms 타이머와 다르다. 편집기의 600ms 코드 검사·반영 지연을 필기 저장 지연으로 혼동하지 않는다. 사용자 데이터·CSP·격리는 유지한다.

연결된 예제는 출발점입니다. 아래 과제 전체가 완성된 코드는 아니며, 예제의 지원 범위를 넘는 작업은 별도 프로젝트에서 수행하세요.

## 실습 과제

1. fixture-app/src/debounce.ts에 label이 있는 필기 입력, 저장 횟수, 마지막 저장값을 만든다. input 이벤트마다 기존 timeout을 해제하고 500ms 후 현재 문자열을 저장하는 함수를 직접 구현한다. 이 페이지는 Frontory의 실제 필기 저장 동작을 재현한 것이 아님을 문서화한다.
2. tests/day-19.spec.ts에서 page.clock.install을 fixture 페이지 이동 전에 호출한다. 전용 fixture origin의 debounce 페이지에서 A·AB·ABC를 차례로 입력하고 각 입력 뒤 runFor(600)으로 시간을 진행한다. 저장 횟수 3과 마지막 값 ABC를 assertion으로 확인한다.
3. 새 context의 동일 fixture에서 세 입력 사이마다 runFor(100)을 실행하고 마지막 입력 뒤 runFor(500)을 실행한다. 저장 횟수 1과 마지막 값 ABC를 확인한다. 실제 sleep 없이 두 입력 간격의 시계 진행·저장 결과를 notes/day-19.md에 기록한다.

## 관찰할 변수

| 변수 | 기준 조건 | 바꿀 조건 | 예상할 변화·검증 가설 |
| --- | --- | --- | --- |
| 500ms debounce fixture의 입력 간격 | 입력마다 600ms 진행 | 입력 사이 100ms, 마지막 입력 뒤 500ms 진행 | 600ms 간격에서는 3회, 100ms 간격에서는 마지막 값으로 1회 저장하며 마지막 문자열은 둘 다 ABC다. |

표의 예상은 측정 결과가 아닙니다. 한 번에 한 조건만 바꾸고 실제 결과가 다르면 원인을 기록하세요.

## 완료 조건

- [ ] 독립 fixture의 debounce 구현과 전용 origin이 명시되어 있고 600ms·100ms 두 조건의 시계 진행 기록이 있다.
- [ ] 긴 간격은 저장 3회, 짧은 간격은 저장 1회이며 두 조건의 마지막 값은 ABC다. Frontory 필기 저장에 debounce가 있다고 서술하지 않는다.

## 자가 점검

1. Frontory의 동기 onChange 저장과 fixture의 500ms 예약 저장은 어떤 점이 다른가?
2. Clock 설치를 페이지 초기화 전에 하는 이유와 마지막 입력 뒤 500ms를 진행하는 이유는 무엇인가?

## 공식 참고

- [Playwright 설치와 실행](https://playwright.dev/docs/intro)
- [Playwright Locators](https://playwright.dev/docs/locators)
- [Playwright Assertions](https://playwright.dev/docs/test-assertions)
- [Playwright Downloads](https://playwright.dev/docs/downloads)
- [Playwright Visual comparisons](https://playwright.dev/docs/test-snapshots)
- [Playwright Clock](https://playwright.dev/docs/clock)

## 연결된 예제와 실행 범위

[예제 원본](../../../../../../src/labs/playwright-step-19/example.js) · [실행 환경과 제한](../../../../../examples.md)

Runnable standalone Playwright spec and HTTP fixture; preview does not run tests.

- [lesson.spec.mjs](../../../../../../src/labs/playwright-step-19/lesson.spec.mjs)
- [fixture.html](../../../../../../src/labs/playwright-step-19/fixture.html)
- [server.mjs](../../../../../../src/labs/playwright-step-19/server.mjs)
- [playwright.config.mjs](../../../../../../src/labs/playwright-step-19/playwright.config.mjs)

원본 코드·기록은 자동으로 덮어쓰지 않습니다. 기존 예제를 초기화할 때도 필기는 유지됩니다.

## 다음 학습

[이전: 지연과 경합](../18/README.md) · [다음: Console과 PageError](../20/README.md)

## 실험 기록 — 직접 작성

### 목표

### 핵심 개념

### 바꾼 변수와 예상

### 실제 결과

### 배운 점

### 남은 질문
