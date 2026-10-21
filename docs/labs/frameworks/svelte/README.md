# Svelte

[Frontory 기술 지도](../../README.md)

UI 프레임워크 · 4단계 · 28개 학습 단위

## 시리즈 목표

Svelte 5 runes와 컴포넌트 수명을 익히고 같은 학습 카드 요구를 React·Vue와 비교한다.

## 선수 지식

JavaScript·HTML·CSS

## 실습 방식과 제공 범위

학습 단위는 날짜가 아닙니다. 설명과 과제를 읽고, 완료 조건을 확인한 뒤 다음 단위로 이동하세요. 각 단위의 예제를 출발점으로 삼아 변수를 바꾸고 결과를 관찰합니다. 내장 실행 예제와 별도 환경이 필요한 과제를 구분해서 표시합니다. 예제를 여는 것만으로 학습을 완료한 것으로 처리하지 않습니다.

기존 단위 ID와 필기는 유지됩니다. 기존 01·02·03 예제는 확장된 학습 순서의 1·14·28번째에 연결되므로 주소의 숫자와 화면의 학습 순서가 다를 수 있습니다.

## 학습 경로

### 1단계 · 컴파일과 runes 기초

- [01. 컴파일과 반응성](01-foundations/README.md) — 편집 가능한 예제
- [02. 마크업과 이벤트 속성](units/02/README.md) — 외부 실행 예제 · 미리보기 안내
- [03. $state 객체의 변경 경로](units/03/README.md) — 외부 실행 예제 · 미리보기 안내
- [04. $derived로 필터 계산하기](units/04/README.md) — 외부 실행 예제 · 미리보기 안내
- [05. 조건 블록과 빈 화면](units/05/README.md) — 외부 실행 예제 · 미리보기 안내
- [06. keyed each와 카드 정체성](units/06/README.md) — 외부 실행 예제 · 미리보기 안내
- [07. 폼 바인딩과 검증](units/07/README.md) — 외부 실행 예제 · 미리보기 안내

### 2단계 · 컴포넌트 계약과 Effect

- [08. $props와 변경 콜백](units/08/README.md) — 외부 실행 예제 · 미리보기 안내
- [09. $bindable과 편집기 계약](units/09/README.md) — 외부 실행 예제 · 미리보기 안내
- [10. snippet으로 행 표시 바꾸기](units/10/README.md) — 외부 실행 예제 · 미리보기 안내
- [11. DOM 참조와 tick](units/11/README.md) — 외부 실행 예제 · 미리보기 안내
- [12. $effect 의존성과 해제](units/12/README.md) — 외부 실행 예제 · 미리보기 안내
- [13. onMount와 초기 자원](units/13/README.md) — 외부 실행 예제 · 미리보기 안내
- [14. 이벤트와 자원 정리](02-experiments/README.md) — 편집 가능한 예제

### 3단계 · store와 작업공간 상태

- [15. writable과 구독 계약](units/15/README.md) — 외부 실행 예제 · 미리보기 안내
- [16. 공유 runes 모듈](units/16/README.md) — 외부 실행 예제 · 미리보기 안내
- [17. Context로 작업공간 연결](units/17/README.md) — 외부 실행 예제 · 미리보기 안내
- [18. 요청과 오래된 결과](units/18/README.md) — 외부 실행 예제 · 미리보기 안내
- [19. await 블록과 상태 안내](units/19/README.md) — 외부 실행 예제 · 미리보기 안내
- [20. 초안 저장과 복원](units/20/README.md) — 외부 실행 예제 · 미리보기 안내
- [21. key 블록과 초안 보존](units/21/README.md) — 외부 실행 예제 · 미리보기 안내

### 4단계 · Canvas 검증과 프레임워크 비교

- [22. Canvas 루프와 반응성 분리](units/22/README.md) — 외부 실행 예제 · 미리보기 안내
- [23. 스타일 범위와 접근성](units/23/README.md) — 외부 실행 예제 · 미리보기 안내
- [24. 전환 중 수명 확인](units/24/README.md) — 외부 실행 예제 · 미리보기 안내
- [25. 컴파일 결과와 성능 관찰](units/25/README.md) — 외부 실행 예제 · 미리보기 안내
- [26. 동일 계약의 회귀 시나리오](units/26/README.md) — 외부 실행 예제 · 미리보기 안내
- [27. 세 프레임워크 비교 준비](units/27/README.md) — 외부 실행 예제 · 미리보기 안내
- [28. 프레임워크 비교](03-project/README.md) — 편집 가능한 예제

## 통합 프로젝트와 제출물

실제 .svelte 학습 작업공간과 세 프레임워크의 동일 입력 비교표, 구독·타이머 정리 기록.

구현 코드와 실행 방법, 기준 조건과 변경 조건의 기록, 실패 사례와 복구 방법을 함께 남기세요. 측정하지 않은 성능과 수행하지 않은 테스트는 결과로 기재하지 않습니다.

## 공식 참고

- [Svelte 공식 문서와 runes 목차](https://svelte.dev/docs/svelte/overview)
- [Svelte $effect와 cleanup](https://svelte.dev/docs/svelte/$effect)
- [Svelte state rune](https://svelte.dev/docs/svelte/$state)
- [Svelte onMount와 tick](https://svelte.dev/docs/svelte/lifecycle-hooks)
