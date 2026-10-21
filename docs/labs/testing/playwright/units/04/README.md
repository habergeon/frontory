# Playwright · 04 Label과 입력

[시리즈 목차](../../README.md) · [전체 기술 지도](../../../../README.md)

단계: 사용자 흐름과 Locator · 문서 기반 직접 구현 · 저장 ID: `playwright-step-04`

## 목표와 학습 후 역량

- 학습 결과: Label의 역할을 설명한다. 입력 사례: 한글·줄바꿈 필기.
- 산출물: 입력값과 저장 상태 결과. 값 assertion 처리 근거를 코드와 연결해 설명한다.

## 선수 지식

3단위 「Role과 접근 가능한 이름」의 Role 및 이름 실습 결과를 준비한다.

## 핵심 개념과 설명

### Label

getByLabel은 입력과 이름의 연결을 사용한다. placeholder만으로 의미를 대신하지 않는다.

### 값 assertion

fill 성공과 저장 성공은 다른 조건이다. 입력값을 확인한 뒤 저장 상태를 별도로 확인한다.

## 실습 준비

모든 테스트는 별도 Node 프로젝트의 @playwright/test와 테스트 전용 로컬 origin에서 작성·실행한다. 기존 playwright-01·02·03 미리보기는 테스트 소스를 보여줄 뿐 iframe에서 Playwright를 실행하지 않는다. 새 테스트 파일은 과제에서 직접 작성하며 통과 여부는 실제 runner 출력으로만 판단한다. 사용자 profile·실사용 저장소를 사용하지 않고 CSP·격리를 유지한다.

이 단위에는 내장 실행 예제가 없습니다. 아래 절차에 따라 별도 실습 파일을 만들고 실행 결과를 필기에 남기세요. 코드 파일은 작업 폴더에서 따로 보관하고 Frontory 필기는 JSON 또는 Markdown으로 백업하세요.

## 실습 과제

1. 별도 실습 프로젝트의 tests/day-4.spec.ts에 필기 입력을 getByLabel로 찾아 fill하고 toHaveValue를 사용한다. 기존 1·14·28단위 예제는 출발점으로만 참고한다.
2. 입력 조건: 한글·줄바꿈 필기. 기준: 짧은 영문. 기준 조건에서 실행한 뒤 관찰값과 오류를 notes/day-4.md에 남긴다.
3. 변경 변수: 텍스트. 변경값: 한글 두 줄. 같은 입력 경로로 다시 실행한다. 저장할 산출물: 입력값과 저장 상태 결과. 확인할 가설: 내용이 변형 없이 입력된다. 실제 결과와 비교해 일치 여부 및 차이의 원인을 기록한다.

## 관찰할 변수

| 변수 | 기준 조건 | 바꿀 조건 | 예상할 변화·검증 가설 |
| --- | --- | --- | --- |
| 텍스트 | 짧은 영문 | 한글 두 줄 | 내용이 변형 없이 입력된다. |

표의 예상은 측정 결과가 아닙니다. 한 번에 한 조건만 바꾸고 실제 결과가 다르면 원인을 기록하세요.

## 완료 조건

- [ ] 필수 산출물: 입력값과 저장 상태 결과. 기준 및 변경 조건 각각의 결과가 있어 총 2조건을 비교할 수 있고, 입력값과 실행 환경을 함께 기록했다.
- [ ] 두 조건의 차이에 관한 설명에 다음 개념을 모두 연결했다: Label, 값 assertion. 예상과 다른 항목은 원인 또는 미해결 이유를 1개 이상 적었다.

## 자가 점검

1. 이번 실습에서 Label 개념은 어느 처리 단계에 영향을 주는가? 입력 사례: 한글·줄바꿈 필기.
2. 변경 변수: 텍스트. 확인할 가설: 내용이 변형 없이 입력된다. 실제 결과가 가설과 일치했는가? 값 assertion 관점에서 근거를 설명하라.

## 공식 참고

- [Playwright 설치와 실행](https://playwright.dev/docs/intro)
- [Playwright Locators](https://playwright.dev/docs/locators)
- [Playwright Assertions](https://playwright.dev/docs/test-assertions)
- [Playwright Downloads](https://playwright.dev/docs/downloads)
- [Playwright Visual comparisons](https://playwright.dev/docs/test-snapshots)

## 연결된 예제와 실행 범위

문서와 필기를 제공합니다. 내장 실행 예제는 아직 제공하지 않습니다.

원본 코드·기록은 자동으로 덮어쓰지 않습니다. 기존 예제를 초기화할 때도 필기는 유지됩니다.

## 다음 학습

[이전: Role과 접근 가능한 이름](../03/README.md) · [다음: Locator 범위](../05/README.md)

## 실험 기록 — 직접 작성

### 목표

### 핵심 개념

### 바꾼 변수와 예상

### 실제 결과

### 배운 점

### 남은 질문
