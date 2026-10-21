# Playwright · 18 지연과 경합

[시리즈 목차](../../README.md) · [전체 기술 지도](../../../../README.md)

단계: 비동기·격리·진단 · 문서 기반 직접 구현 · 저장 ID: `playwright-step-18`

## 목표와 학습 후 역량

- 17단위 fixture 앱에 latestRequestId 가드를 구현하고 오래된 응답을 배제한다.
- A→B와 B→A 두 완료 순서에서 최종 선택 ID·제목·본문이 B로 일치함을 검증한다.

## 선수 지식

17단위 「Network Route」의 의존성 제어 및 범위 실습 결과를 준비한다.

## 핵심 개념과 설명

### 최신 상태

fetch 기반 fixture 앱에서는 선택한 문서보다 이전 요청이 늦게 완료될 수 있다. 요청마다 증가하는 ID를 두고 최신 ID의 응답만 화면에 반영한다.

### 응답 순서

route에서 A와 B 응답을 각각 보류하면 완료 순서를 통제할 수 있다. 응답 해제 후에는 본문뿐 아니라 로딩·오류 상태도 최신 요청 기준으로 갱신해야 한다.

## 실습 준비

별도 Node Playwright 프로젝트에서 학습자가 직접 만든 fixture 앱의 전용 로컬 origin을 테스트한다. fixture 파일과 테스트 파일은 이 과제에서 작성할 산출물이며 기존 제공 파일이 아니다. Frontory 문서는 src/app/curriculum.ts에서 eager 번들되므로 문서 선택 fetch를 가정하지 않는다. 사용자 데이터·CSP·격리는 변경하지 않는다.

이 단위에는 내장 실행 예제가 없습니다. 아래 절차에 따라 별도 실습 파일을 만들고 실행 결과를 필기에 남기세요. 코드 파일은 작업 폴더에서 따로 보관하고 Frontory 필기는 JSON 또는 Markdown으로 백업하세요.

## 실습 과제

1. 17단위의 fixture-app/src/main.ts를 확장한다. 문서 선택마다 requestId를 증가시키고 fetch 응답·catch·finally에서 현재 ID인지 검사한 뒤 본문·오류·로딩 상태를 갱신한다. tests/day-18.spec.ts의 baseURL은 Frontory가 아닌 같은 fixture origin으로 설정한다.
2. A·B 요청을 각각 page.route로 보류하고 두 요청이 도착한 것을 확인한다. A 선택 직후 B를 선택한 뒤 A 응답, B 응답 순서로 반환한다. 최종 선택 ID와 제목·본문이 B인지, 로딩 상태가 끝났는지 확인한다.
3. 독립 테스트에서 같은 선택 순서를 유지하되 B 응답을 먼저 반환한 뒤 A 응답을 반환한다. 늦은 A가 B 본문이나 상태를 덮지 않는지 검사한다. 두 완료 순서와 가드 적용 위치를 notes/day-18.md에 기록한다.

## 관찰할 변수

| 변수 | 기준 조건 | 바꿀 조건 | 예상할 변화·검증 가설 |
| --- | --- | --- | --- |
| 응답 순서 | A→B | B→A | 늦은 A가 B 화면을 덮지 않는다. |

표의 예상은 측정 결과가 아닙니다. 한 번에 한 조건만 바꾸고 실제 결과가 다르면 원인을 기록하세요.

## 완료 조건

- [ ] fixture에서 두 요청이 실제 발생하고 A→B 및 B→A 두 응답 순서를 명시적으로 해제한 기록이 있다.
- [ ] 두 조건 모두 최종 선택 ID·제목·본문은 B이며 로딩은 종료된다. 늦은 A 응답 뒤에도 B 상태가 유지되는 assertion이 있다.

## 자가 점검

1. latestRequestId 검사를 본문 갱신에만 넣고 finally에는 넣지 않으면 어떤 문제가 생길 수 있는가?
2. 두 요청이 실제 도착하기 전에 응답 순서를 조작하지 않았음을 어떻게 확인했는가?

## 공식 참고

- [Playwright 설치와 실행](https://playwright.dev/docs/intro)
- [Playwright Locators](https://playwright.dev/docs/locators)
- [Playwright Assertions](https://playwright.dev/docs/test-assertions)
- [Playwright Downloads](https://playwright.dev/docs/downloads)
- [Playwright Visual comparisons](https://playwright.dev/docs/test-snapshots)
- [Playwright Network interception](https://playwright.dev/docs/network)

## 연결된 예제와 실행 범위

문서와 필기를 제공합니다. 내장 실행 예제는 아직 제공하지 않습니다.

원본 코드·기록은 자동으로 덮어쓰지 않습니다. 기존 예제를 초기화할 때도 필기는 유지됩니다.

## 다음 학습

[이전: Network Route](../17/README.md) · [다음: 시계와 예약 저장](../19/README.md)

## 실험 기록 — 직접 작성

### 목표

### 핵심 개념

### 바꾼 변수와 예상

### 실제 결과

### 배운 점

### 남은 질문
