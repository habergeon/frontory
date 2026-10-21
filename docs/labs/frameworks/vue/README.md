# Vue

[Frontory 기술 지도](../../README.md)

UI 프레임워크 · 4단계 · 28개 학습 단위

## 시리즈 목표

Composition API로 상태·파생 값·부수 효과를 구분하고 필기와 Canvas의 수명을 관리한다.

## 선수 지식

JavaScript·HTML, React와 비교할 상태 개념

## 실습 방식과 제공 범위

학습 단위는 날짜가 아닙니다. 설명과 과제를 읽고, 완료 조건을 확인한 뒤 다음 단위로 이동하세요. 기존 세 예제는 출발점으로 유지하며 나머지 25개 단위는 문서 기반 직접 구현 과제입니다. 내장 실행 예제와 별도 환경이 필요한 과제를 구분해서 표시합니다. 예제를 여는 것만으로 학습을 완료한 것으로 처리하지 않습니다.

기존 단위 ID와 필기는 유지됩니다. 기존 01·02·03 예제는 확장된 학습 순서의 1·14·28번째에 연결되므로 주소의 숫자와 화면의 학습 순서가 다를 수 있습니다.

## 학습 경로

### 1단계 · 반응형 데이터와 템플릿

- [01. 반응성과 템플릿](01-foundations/README.md) — 기존 예제에서 확장
- [02. SFC와 템플릿 바인딩](units/02/README.md) — 문서 기반 직접 구현
- [03. reactive와 참조 유지](units/03/README.md) — 문서 기반 직접 구현
- [04. computed의 순수한 계산](units/04/README.md) — 문서 기반 직접 구현
- [05. 목록 key와 조건부 수명](units/05/README.md) — 문서 기반 직접 구현
- [06. 이벤트와 입력 변환](units/06/README.md) — 문서 기반 직접 구현
- [07. 클래스와 스타일의 상태 표현](units/07/README.md) — 문서 기반 직접 구현

### 2단계 · 컴포넌트 계약과 감시

- [08. props의 단방향 계약](units/08/README.md) — 문서 기반 직접 구현
- [09. emits로 변경 의도 전달](units/09/README.md) — 문서 기반 직접 구현
- [10. 컴포넌트 v-model](units/10/README.md) — 문서 기반 직접 구현
- [11. 슬롯으로 화면 조합하기](units/11/README.md) — 문서 기반 직접 구현
- [12. watch의 대상과 시점](units/12/README.md) — 문서 기반 직접 구현
- [13. 감시 정리와 요청 역전](units/13/README.md) — 문서 기반 직접 구현
- [14. 컴포넌트 계약과 감시](02-experiments/README.md) — 기존 예제에서 확장

### 3단계 · Composable과 저장소 수명

- [15. 템플릿 ref와 nextTick](units/15/README.md) — 문서 기반 직접 구현
- [16. Composable의 수명](units/16/README.md) — 문서 기반 직접 구현
- [17. provide와 inject](units/17/README.md) — 문서 기반 직접 구현
- [18. 공유 저장소의 범위](units/18/README.md) — 문서 기반 직접 구현
- [19. 저장 복원과 데이터 검증](units/19/README.md) — 문서 기반 직접 구현
- [20. 비동기 컴포넌트와 로딩 UI](units/20/README.md) — 문서 기반 직접 구현
- [21. KeepAlive와 일시 정지](units/21/README.md) — 문서 기반 직접 구현

### 4단계 · Canvas 통합과 갱신 검증

- [22. Canvas 생성과 해제](units/22/README.md) — 문서 기반 직접 구현
- [23. 프레임 값과 UI 값 분리](units/23/README.md) — 문서 기반 직접 구현
- [24. 얕은 반응성과 외부 객체](units/24/README.md) — 문서 기반 직접 구현
- [25. Vue 성능 관찰](units/25/README.md) — 문서 기반 직접 구현
- [26. 동작 회귀와 저장 경합 검증](units/26/README.md) — 문서 기반 직접 구현
- [27. Composition API 통합 검토](units/27/README.md) — 문서 기반 직접 구현
- [28. Canvas 수명주기](03-project/README.md) — 기존 예제에서 확장

## 통합 프로젝트와 제출물

단위별 필기와 Canvas가 있는 Vue 작업공간, props/emits 계약표, React 수명 비교 및 자원 감사 기록.

구현 코드와 실행 방법, 기준 조건과 변경 조건의 기록, 실패 사례와 복구 방법을 함께 남기세요. 측정하지 않은 성능과 수행하지 않은 테스트는 결과로 기재하지 않습니다.

## 공식 참고

- [Vue 반응성 기초](https://vuejs.org/guide/essentials/reactivity-fundamentals.html)
- [Vue Composition API 가이드](https://vuejs.org/guide/introduction.html)
- [Vue Watchers와 cleanup](https://vuejs.org/guide/essentials/watchers.html)
- [Vue Composable과 수명 관리](https://vuejs.org/guide/reusability/composables.html)
