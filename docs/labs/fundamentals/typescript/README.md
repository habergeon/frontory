# TypeScript

[Frontory 기술 지도](../../README.md)

언어 및 기초 · 4단계 · 28개 학습 단위

## 시리즈 목표

정적 타입 관계와 런타임 데이터 검증을 구분하고 변경 가능한 계약을 설계합니다.

## 선수 지식

JavaScript 객체·함수·모듈

## 실습 방식과 제공 범위

학습 단위는 날짜가 아닙니다. 설명과 과제를 읽고, 완료 조건을 확인한 뒤 다음 단위로 이동하세요. 각 단위의 예제를 출발점으로 삼아 변수를 바꾸고 결과를 관찰합니다. 내장 실행 예제와 별도 환경이 필요한 과제를 구분해서 표시합니다. 예제를 여는 것만으로 학습을 완료한 것으로 처리하지 않습니다.

기존 단위 ID와 필기는 유지됩니다. 기존 01·02·03 예제는 확장된 학습 순서의 1·14·28번째에 연결되므로 주소의 숫자와 화면의 학습 순서가 다를 수 있습니다.

## 학습 경로

### 1단계 · 타입 검사와 데이터 모델

- [01. 타입과 좁히기](01-foundations/README.md) — 편집 가능한 예제
- [02. strict 설정과 실행 코드](units/02/README.md) — 편집 가능한 예제
- [03. 추론과 리터럴 타입](units/03/README.md) — 편집 가능한 예제
- [04. 객체 계약과 선택 필드](units/04/README.md) — 편집 가능한 예제
- [05. 배열과 튜플의 위치 의미](units/05/README.md) — 편집 가능한 예제
- [06. 함수 인수와 반환 계약](units/06/README.md) — 편집 가능한 예제
- [07. unknown과 안전한 접근](units/07/README.md) — 편집 가능한 예제

### 2단계 · 유니온과 제네릭

- [08. 판별 유니온으로 비동기 상태 표현](units/08/README.md) — 편집 가능한 예제
- [09. never로 분기 누락 찾기](units/09/README.md) — 편집 가능한 예제
- [10. readonly와 변경 범위](units/10/README.md) — 편집 가능한 예제
- [11. keyof와 속성 조회 함수](units/11/README.md) — 편집 가능한 예제
- [12. 제네릭 함수와 추론](units/12/README.md) — 편집 가능한 예제
- [13. 제약 조건과 최소 계약](units/13/README.md) — 편집 가능한 예제
- [14. 제네릭과 경계 검증](02-experiments/README.md) — 편집 가능한 예제

### 3단계 · 검증과 타입 변환

- [15. 타입 가드와 거짓 보장](units/15/README.md) — 편집 가능한 예제
- [16. Result 타입으로 실패 전달](units/16/README.md) — 편집 가능한 예제
- [17. Utility Types로 편집 모델 만들기](units/17/README.md) — 편집 가능한 예제
- [18. satisfies로 설정 검사](units/18/README.md) — 편집 가능한 예제
- [19. Mapped Types로 상태 표 만들기](units/19/README.md) — 편집 가능한 예제
- [20. 조건부 타입과 분배](units/20/README.md) — 편집 가능한 예제
- [21. 템플릿 리터럴 이벤트 이름](units/21/README.md) — 편집 가능한 예제

### 4단계 · 모듈 계약과 플러그인

- [22. DOM 타입과 null 검사](units/22/README.md) — 편집 가능한 예제
- [23. 비동기 함수와 오류 타입](units/23/README.md) — 편집 가능한 예제
- [24. 모듈과 type-only import](units/24/README.md) — 편집 가능한 예제
- [25. 선언 파일과 외부 경계](units/25/README.md) — 편집 가능한 예제
- [26. 컴파일 실패를 검증하는 사례](units/26/README.md) — 편집 가능한 예제
- [27. 플러그인 소유권과 정리 계약](units/27/README.md) — 편집 가능한 예제
- [28. 플러그인 계약](03-project/README.md) — 편집 가능한 예제

## 통합 프로젝트와 제출물

DOM과 Canvas 구현을 교체하는 mount/dispose 플러그인과 정상·거부 사례 모음

구현 코드와 실행 방법, 기준 조건과 변경 조건의 기록, 실패 사례와 복구 방법을 함께 남기세요. 측정하지 않은 성능과 수행하지 않은 테스트는 결과로 기재하지 않습니다.

## 공식 참고

- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)
- [TypeScript Narrowing](https://www.typescriptlang.org/docs/handbook/2/narrowing.html)
- [TypeScript Object Types](https://www.typescriptlang.org/docs/handbook/2/objects.html)
- [TypeScript Generics](https://www.typescriptlang.org/docs/handbook/2/generics.html)
- [TypeScript Mapped Types](https://www.typescriptlang.org/docs/handbook/2/mapped-types.html)
- [TypeScript Conditional Types](https://www.typescriptlang.org/docs/handbook/2/conditional-types.html)
