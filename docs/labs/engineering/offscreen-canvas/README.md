# OffscreenCanvas

[Frontory 기술 지도](../../README.md)

엔지니어링 · 4단계 · 28개 학습 단위

## 시리즈 목표

Canvas 소유권과 크기·입력 프로토콜을 설계하고 Worker 렌더링의 이점과 비용을 검증한다.

## 선수 지식

Canvas 2D·Web Workers

## 실습 방식과 제공 범위

학습 단위는 날짜가 아닙니다. 설명과 과제를 읽고, 완료 조건을 확인한 뒤 다음 단위로 이동하세요. 각 단위의 예제를 출발점으로 삼아 변수를 바꾸고 결과를 관찰합니다. 내장 실행 예제와 별도 환경이 필요한 과제를 구분해서 표시합니다. 예제를 여는 것만으로 학습을 완료한 것으로 처리하지 않습니다.

기존 단위 ID와 필기는 유지됩니다. 기존 01·02·03 예제는 확장된 학습 순서의 1·14·28번째에 연결되므로 주소의 숫자와 화면의 학습 순서가 다를 수 있습니다.

## 학습 경로

### 1단계 · 제어권과 첫 렌더

- [01. Canvas 제어권 이전](01-foundations/README.md) — 편집 가능한 예제
- [02. 렌더러 계약](units/02/README.md) — 편집 가능한 예제
- [03. 초기화 핸드셰이크](units/03/README.md) — 편집 가능한 예제
- [04. Context 생성 실패](units/04/README.md) — 편집 가능한 예제
- [05. 좌표 단위의 기준](units/05/README.md) — 편집 가능한 예제
- [06. 프레임 시간](units/06/README.md) — 편집 가능한 예제
- [07. 기초 렌더 검증](units/07/README.md) — 편집 가능한 예제

### 2단계 · 크기와 입력 동기화

- [08. Resize 메시지](units/08/README.md) — 편집 가능한 예제
- [09. Resize 순서 번호](units/09/README.md) — 편집 가능한 예제
- [10. DPR 변경 감지](units/10/README.md) — 편집 가능한 예제
- [11. 포인터 좌표 변환](units/11/README.md) — 편집 가능한 예제
- [12. 입력 병합](units/12/README.md) — 편집 가능한 예제
- [13. Pointer Capture와 취소](units/13/README.md) — 편집 가능한 예제
- [14. Resize와 입력 프로토콜](02-experiments/README.md) — 편집 가능한 예제

### 3단계 · 렌더 수명과 복구

- [15. 장면 상태 갱신](units/15/README.md) — 편집 가능한 예제
- [16. 입자 데이터 배치](units/16/README.md) — 편집 가능한 예제
- [17. 정지와 재개](units/17/README.md) — 편집 가능한 예제
- [18. 페이지 숨김 정책](units/18/README.md) — 편집 가능한 예제
- [19. 정리 프로토콜](units/19/README.md) — 편집 가능한 예제
- [20. 재시작 Canvas](units/20/README.md) — 편집 가능한 예제
- [21. Worker 장애 복구](units/21/README.md) — 편집 가능한 예제

### 4단계 · 응답성 비교 프로젝트

- [22. ImageBitmap 전달](units/22/README.md) — 편집 가능한 예제
- [23. Canvas Context 손실](units/23/README.md) — 편집 가능한 예제
- [24. 요청과 화면 지연](units/24/README.md) — 편집 가능한 예제
- [25. 해상도와 작업량](units/25/README.md) — 편집 가능한 예제
- [26. 메인 스레드 경쟁 실험](units/26/README.md) — 편집 가능한 예제
- [27. 실험 결과 정리](units/27/README.md) — 편집 가능한 예제
- [28. 렌더링 분리 평가](03-project/README.md) — 편집 가능한 예제

## 통합 프로젝트와 제출물

동일한 입자 장면을 메인과 Worker에서 실행하며 resize·입력·오류·종료·재시작을 비교한다.

구현 코드와 실행 방법, 기준 조건과 변경 조건의 기록, 실패 사례와 복구 방법을 함께 남기세요. 측정하지 않은 성능과 수행하지 않은 테스트는 결과로 기재하지 않습니다.

## 공식 참고

- [MDN OffscreenCanvas](https://developer.mozilla.org/en-US/docs/Web/API/OffscreenCanvas)
- [MDN Using Web Workers](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers)
