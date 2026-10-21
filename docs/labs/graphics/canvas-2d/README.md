# Canvas 2D

[Frontory 기술 지도](../../README.md)

그래픽스 · 4단계 · 28개 학습 단위

## 시리즈 목표

논리 좌표와 픽셀을 구분하고 시간 기반 Canvas 편집기를 직접 구성한다.

## 선수 지식

JavaScript·좌표와 함수

## 실습 방식과 제공 범위

학습 단위는 날짜가 아닙니다. 설명과 과제를 읽고, 완료 조건을 확인한 뒤 다음 단위로 이동하세요. 기존 세 예제는 출발점으로 유지하며 나머지 25개 단위는 문서 기반 직접 구현 과제입니다. 내장 실행 예제와 별도 환경이 필요한 과제를 구분해서 표시합니다. 예제를 여는 것만으로 학습을 완료한 것으로 처리하지 않습니다.

기존 단위 ID와 필기는 유지됩니다. 기존 01·02·03 예제는 확장된 학습 순서의 1·14·28번째에 연결되므로 주소의 숫자와 화면의 학습 순서가 다를 수 있습니다.

## 학습 경로

### 1단계 · 픽셀과 드로잉 상태

- [01. 좌표와 픽셀](01-foundations/README.md) — 기존 예제에서 확장
- [02. 경로와 선의 상태](units/02/README.md) — 문서 기반 직접 구현
- [03. 도형 함수와 상태 격리](units/03/README.md) — 문서 기반 직접 구현
- [04. 행렬과 회전 중심](units/04/README.md) — 문서 기반 직접 구현
- [05. 색과 그라디언트](units/05/README.md) — 문서 기반 직접 구현
- [06. 이미지 로딩과 자르기](units/06/README.md) — 문서 기반 직접 구현
- [07. 텍스트와 배지 구성](units/07/README.md) — 문서 기반 직접 구현

### 2단계 · 시간·좌표·입력

- [08. 애니메이션 시계](units/08/README.md) — 문서 기반 직접 구현
- [09. 정지와 재개](units/09/README.md) — 문서 기반 직접 구현
- [10. 경계 충돌과 적분](units/10/README.md) — 문서 기반 직접 구현
- [11. 포인터 좌표 변환](units/11/README.md) — 문서 기반 직접 구현
- [12. 도형 선택과 히트 테스트](units/12/README.md) — 문서 기반 직접 구현
- [13. 드래그와 포인터 수명](units/13/README.md) — 문서 기반 직접 구현
- [14. 시간과 입력](02-experiments/README.md) — 기존 예제에서 확장

### 3단계 · 장면 편집과 합성

- [15. 장면 데이터와 다시 그리기](units/15/README.md) — 문서 기반 직접 구현
- [16. 실행 취소와 기록](units/16/README.md) — 문서 기반 직접 구현
- [17. 합성으로 지우개 만들기](units/17/README.md) — 문서 기반 직접 구현
- [18. 클리핑과 마스크](units/18/README.md) — 문서 기반 직접 구현
- [19. 픽셀 읽기와 필터](units/19/README.md) — 문서 기반 직접 구현
- [20. 정적 레이어와 캐시](units/20/README.md) — 문서 기반 직접 구현
- [21. 고해상도와 반응형](units/21/README.md) — 문서 기반 직접 구현

### 4단계 · 접근성·입자·성능 검증

- [22. 접근 가능한 캔버스 조작](units/22/README.md) — 문서 기반 직접 구현
- [23. 내보내기와 원본 데이터](units/23/README.md) — 문서 기반 직접 구현
- [24. 입자 상태와 방출](units/24/README.md) — 문서 기반 직접 구현
- [25. 입자 재사용과 할당](units/25/README.md) — 문서 기반 직접 구현
- [26. 프레임 계측과 병목](units/26/README.md) — 문서 기반 직접 구현
- [27. 통합 편집기와 회귀 점검](units/27/README.md) — 문서 기반 직접 구현
- [28. 입자와 비용](03-project/README.md) — 기존 예제에서 확장

## 통합 프로젝트와 제출물

도형 편집·실행 취소·입자 미리보기·PNG/JSON 저장을 갖춘 캔버스 실험실과 비교 보고서

구현 코드와 실행 방법, 기준 조건과 변경 조건의 기록, 실패 사례와 복구 방법을 함께 남기세요. 측정하지 않은 성능과 수행하지 않은 테스트는 결과로 기재하지 않습니다.

## 공식 참고

- [MDN devicePixelRatio](https://developer.mozilla.org/en-US/docs/Web/API/Window/devicePixelRatio)
- [MDN CanvasRenderingContext2D API](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D)
- [MDN Canvas 튜토리얼](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial)
