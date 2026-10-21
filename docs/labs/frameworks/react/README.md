# React

[Frontory 기술 지도](../../README.md)

UI 프레임워크 · 4단계 · 28개 학습 단위

## 시리즈 목표

상태 소유권과 Effect 수명을 설명하고 단위별 필기·검색·Canvas가 함께 작동하는 학습 편집기를 만든다.

## 선수 지식

JavaScript·TypeScript, DOM 이벤트

## 실습 방식과 제공 범위

학습 단위는 날짜가 아닙니다. 설명과 과제를 읽고, 완료 조건을 확인한 뒤 다음 단위로 이동하세요. 기존 세 예제는 출발점으로 유지하며 나머지 25개 단위는 문서 기반 직접 구현 과제입니다. 내장 실행 예제와 별도 환경이 필요한 과제를 구분해서 표시합니다. 예제를 여는 것만으로 학습을 완료한 것으로 처리하지 않습니다.

기존 단위 ID와 필기는 유지됩니다. 기존 01·02·03 예제는 확장된 학습 순서의 1·14·28번째에 연결되므로 주소의 숫자와 화면의 학습 순서가 다를 수 있습니다.

## 학습 경로

### 1단계 · 컴포넌트와 상태 계산

- [01. 상태와 소유권](01-foundations/README.md) — 기존 예제에서 확장
- [02. JSX와 순수한 렌더](units/02/README.md) — 문서 기반 직접 구현
- [03. 이벤트와 상태 스냅샷](units/03/README.md) — 문서 기반 직접 구현
- [04. 객체와 배열 갱신](units/04/README.md) — 문서 기반 직접 구현
- [05. 조건부 화면과 빈 상태](units/05/README.md) — 문서 기반 직접 구현
- [06. 목록의 key와 정체성](units/06/README.md) — 문서 기반 직접 구현
- [07. 제어 입력과 폼 검증](units/07/README.md) — 문서 기반 직접 구현

### 2단계 · 공유 상태와 외부 시스템

- [08. 상태 끌어올리기](units/08/README.md) — 문서 기반 직접 구현
- [09. reducer로 변경 규칙 모으기](units/09/README.md) — 문서 기반 직접 구현
- [10. Context로 설정 전달하기](units/10/README.md) — 문서 기반 직접 구현
- [11. ref와 DOM 포커스](units/11/README.md) — 문서 기반 직접 구현
- [12. Effect의 의존성과 정리](units/12/README.md) — 문서 기반 직접 구현
- [13. 요청 경합과 취소](units/13/README.md) — 문서 기반 직접 구현
- [14. Effect와 외부 렌더러](02-experiments/README.md) — 기존 예제에서 확장

### 3단계 · 필기 보존과 렌더 측정

- [15. 커스텀 Hook의 경계](units/15/README.md) — 문서 기반 직접 구현
- [16. 필기 저장과 초기 복원](units/16/README.md) — 문서 기반 직접 구현
- [17. 단위별 상태 보존](units/17/README.md) — 문서 기반 직접 구현
- [18. 컴포넌트 합성과 children](units/18/README.md) — 문서 기반 직접 구현
- [19. 비동기 상태를 명시하기](units/19/README.md) — 문서 기반 직접 구현
- [20. 전환과 지연된 결과](units/20/README.md) — 문서 기반 직접 구현
- [21. Profiler로 병목 찾기](units/21/README.md) — 문서 기반 직접 구현

### 4단계 · 성능 검증과 통합 편집기

- [22. 측정한 경로만 메모하기](units/22/README.md) — 문서 기반 직접 구현
- [23. 긴 목록의 표시 범위](units/23/README.md) — 문서 기반 직접 구현
- [24. 이벤트 경계와 접근 가능한 선택](units/24/README.md) — 문서 기반 직접 구현
- [25. 구독 저장소와 스냅샷](units/25/README.md) — 문서 기반 직접 구현
- [26. 회귀 시나리오 만들기](units/26/README.md) — 문서 기반 직접 구현
- [27. 통합 편집기와 자원 감사](units/27/README.md) — 문서 기반 직접 구현
- [28. 상태 보존과 성능](03-project/README.md) — 기존 예제에서 확장

## 통합 프로젝트와 제출물

필기를 보존하는 학습 편집기, 자원 감사표, 같은 입력으로 비교한 Profiler 기록을 제출한다.

구현 코드와 실행 방법, 기준 조건과 변경 조건의 기록, 실패 사례와 복구 방법을 함께 남기세요. 측정하지 않은 성능과 수행하지 않은 테스트는 결과로 기재하지 않습니다.

## 공식 참고

- [React 학습 가이드](https://react.dev/learn)
- [React API 참고](https://react.dev/reference/react)
- [React 상태 보존과 초기화](https://react.dev/learn/preserving-and-resetting-state)
- [React useEffect: 외부 시스템과 정리](https://react.dev/reference/react/useEffect)
- [React useDeferredValue와 느린 자식의 memo 경계](https://react.dev/reference/react/useDeferredValue#deferring-re-rendering-for-a-part-of-the-ui)
