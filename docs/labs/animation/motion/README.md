# Motion

[Frontory 기술 지도](../../README.md)

애니메이션 · 4단계 · 28개 학습 단위

## 시리즈 목표

현대 Motion React API로 상태·레이아웃·제스처를 연결하고 접근 가능한 전환을 구현한다.

## 선수 지식

React 상태, CSS transform

## 실습 방식과 제공 범위

학습 단위는 날짜가 아닙니다. 설명과 과제를 읽고 완료 조건을 확인한 뒤 다음 단위로 이동하세요. 각 단위의 예제를 출발점으로 삼아 변수를 바꾸고 결과를 관찰합니다. 내장 실행 예제와 별도 환경이 필요한 과제를 구분해서 표시합니다. 예제를 여는 것만으로 학습을 완료한 것으로 처리하지 않습니다.

기존 단위 ID와 필기는 유지됩니다. 기존 01·02·03 예제는 확장된 학습 순서의 1·14·28번째에 연결되므로 주소의 숫자와 화면의 학습 순서가 다를 수 있습니다.

## 학습 경로

### 1단계 · 상태와 Transition

- [01. 상태 기반 애니메이션](01-foundations/README.md) — 편집 가능한 예제
- [02. Initial과 Animate](units/02/README.md) — 편집 가능한 예제
- [03. Transition 구성](units/03/README.md) — 편집 가능한 예제
- [04. Spring의 물리 변수](units/04/README.md) — 편집 가능한 예제
- [05. Keyframes](units/05/README.md) — 편집 가능한 예제
- [06. Variants](units/06/README.md) — 편집 가능한 예제
- [07. 자식 등장 순서](units/07/README.md) — 편집 가능한 예제

### 2단계 · Layout과 Presence

- [08. Layout 측정](units/08/README.md) — 편집 가능한 예제
- [09. 안정적인 Key](units/09/README.md) — 편집 가능한 예제
- [10. AnimatePresence 기초](units/10/README.md) — 편집 가능한 예제
- [11. Presence 모드](units/11/README.md) — 편집 가능한 예제
- [12. LayoutId 공유](units/12/README.md) — 편집 가능한 예제
- [13. 삭제 중 포커스](units/13/README.md) — 편집 가능한 예제
- [14. Layout과 Exit](02-experiments/README.md) — 편집 가능한 예제

### 3단계 · 제스처와 동등한 조작

- [15. Hover와 Focus](units/15/README.md) — 편집 가능한 예제
- [16. Tap 피드백](units/16/README.md) — 편집 가능한 예제
- [17. Drag 좌표와 경계](units/17/README.md) — 편집 가능한 예제
- [18. 관성과 탄성](units/18/README.md) — 편집 가능한 예제
- [19. 버튼으로 재배치](units/19/README.md) — 편집 가능한 예제
- [20. MotionValue](units/20/README.md) — 편집 가능한 예제
- [21. Transform과 Spring 연결](units/21/README.md) — 편집 가능한 예제

### 4단계 · Motion 시스템 검증

- [22. 스크롤 연동](units/22/README.md) — 편집 가능한 예제
- [23. 화면 진입 애니메이션](units/23/README.md) — 편집 가능한 예제
- [24. UseAnimate 정리](units/24/README.md) — 편집 가능한 예제
- [25. 모션 감소 정책](units/25/README.md) — 편집 가능한 예제
- [26. 렌더와 성능 관찰](units/26/README.md) — 편집 가능한 예제
- [27. 재마운트와 상태 복구](units/27/README.md) — 편집 가능한 예제
- [28. 제스처와 접근성](03-project/README.md) — 편집 가능한 예제

## 통합 프로젝트와 제출물

재정렬 가능한 학습 카드 보드에 버튼 대안, exit, 모션 감소와 복구를 구현한다.

구현 코드와 실행 방법, 기준 조건과 변경 조건의 기록, 실패 사례와 복구 방법을 함께 남기세요. 측정하지 않은 성능과 수행하지 않은 테스트는 결과로 기재하지 않습니다.

## 공식 참고

- [Motion React animation](https://motion.dev/docs/react-animation)
- [Motion AnimatePresence](https://motion.dev/docs/react-animate-presence)
- [Motion LayoutGroup: namespace layoutId](https://motion.dev/docs/react-layout-group#namespace-layoutid)
