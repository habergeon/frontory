# Playwright

[Frontory 기술 지도](../../README.md)

테스트 · 4단계 · 28개 학습 단위

## 시리즈 목표

별도 Node 테스트 환경에서 사용자 흐름을 검증하고 데이터 격리·비동기 대기·진단 근거를 설계한다.

## 선수 지식

DOM 역할·비동기, 테스트 기본

## 실습 방식과 제공 범위

학습 단위는 날짜가 아닙니다. 설명과 과제를 읽고 완료 조건을 확인한 뒤 다음 단위로 이동하세요. 각 단위의 예제를 출발점으로 삼아 변수를 바꾸고 결과를 관찰합니다. 내장 실행 예제와 별도 환경이 필요한 과제를 구분해서 표시합니다. 예제를 여는 것만으로 학습을 완료한 것으로 처리하지 않습니다.

기존 단위 ID와 필기는 유지됩니다. 기존 01·02·03 예제는 확장된 학습 순서의 1·14·28번째에 연결되므로 주소의 숫자와 화면의 학습 순서가 다를 수 있습니다.

## 학습 경로

### 1단계 · 사용자 흐름과 Locator

- [01. 사용자 관점의 테스트](01-foundations/README.md) — 편집 가능한 예제
- [02. 설정과 실행 범위](units/02/README.md) — 외부 실행 예제 · 미리보기 안내
- [03. Role과 접근 가능한 이름](units/03/README.md) — 외부 실행 예제 · 미리보기 안내
- [04. Label과 입력](units/04/README.md) — 외부 실행 예제 · 미리보기 안내
- [05. Locator 범위](units/05/README.md) — 외부 실행 예제 · 미리보기 안내
- [06. 재시도 Assertion](units/06/README.md) — 외부 실행 예제 · 미리보기 안내
- [07. 첫 흐름의 실패 진단](units/07/README.md) — 외부 실행 예제 · 미리보기 안내

### 2단계 · 영속 데이터와 파일 왕복

- [08. BrowserContext 격리](units/08/README.md) — 외부 실행 예제 · 미리보기 안내
- [09. 저장과 새로고침](units/09/README.md) — 외부 실행 예제 · 미리보기 안내
- [10. 다운로드 이벤트](units/10/README.md) — 외부 실행 예제 · 미리보기 안내
- [11. 파일 업로드](units/11/README.md) — 외부 실행 예제 · 미리보기 안내
- [12. 잘못된 파일과 보존](units/12/README.md) — 외부 실행 예제 · 미리보기 안내
- [13. 항목별 저장 격리](units/13/README.md) — 외부 실행 예제 · 미리보기 안내
- [14. 저장·다운로드·복원](02-experiments/README.md) — 편집 가능한 예제

### 3단계 · 비동기·격리·진단

- [15. Keyboard 탐색](units/15/README.md) — 외부 실행 예제 · 미리보기 안내
- [16. Viewport와 반응형](units/16/README.md) — 외부 실행 예제 · 미리보기 안내
- [17. Network Route](units/17/README.md) — 외부 실행 예제 · 미리보기 안내
- [18. 지연과 경합](units/18/README.md) — 외부 실행 예제 · 미리보기 안내
- [19. 시계와 예약 저장](units/19/README.md) — 외부 실행 예제 · 미리보기 안내
- [20. Console과 PageError](units/20/README.md) — 외부 실행 예제 · 미리보기 안내
- [21. Trace 읽기](units/21/README.md) — 외부 실행 예제 · 미리보기 안내

### 4단계 · 시각 회귀와 실행 전략

- [22. Fixtures와 준비 책임](units/22/README.md) — 외부 실행 예제 · 미리보기 안내
- [23. 병렬 실행과 충돌](units/23/README.md) — 외부 실행 예제 · 미리보기 안내
- [24. Retries와 흔들림](units/24/README.md) — 외부 실행 예제 · 미리보기 안내
- [25. 시각 기준 만들기](units/25/README.md) — 외부 실행 예제 · 미리보기 안내
- [26. 허용 차이와 검토](units/26/README.md) — 외부 실행 예제 · 미리보기 안내
- [27. CI 실행과 산출물](units/27/README.md) — 외부 실행 예제 · 미리보기 안내
- [28. 시각 회귀와 흔들림](03-project/README.md) — 편집 가능한 예제

## 통합 프로젝트와 제출물

Frontory의 탐색·문서·필기 백업·복원·오류 보존·시각 회귀를 독립 origin에서 검증하는 테스트 묶음을 만든다.

구현 코드와 실행 방법, 기준 조건과 변경 조건의 기록, 실패 사례와 복구 방법을 함께 남기세요. 측정하지 않은 성능과 수행하지 않은 테스트는 결과로 기재하지 않습니다.

## 공식 참고

- [Playwright 설치와 실행](https://playwright.dev/docs/intro)
- [Playwright Locators](https://playwright.dev/docs/locators)
- [Playwright Assertions](https://playwright.dev/docs/test-assertions)
- [Playwright Downloads](https://playwright.dev/docs/downloads)
- [Playwright Visual comparisons](https://playwright.dev/docs/test-snapshots)
- [Playwright Network interception](https://playwright.dev/docs/network)
- [Playwright Clock](https://playwright.dev/docs/clock)
