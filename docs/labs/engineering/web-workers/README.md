# Web Workers

[Frontory 기술 지도](../../README.md)

엔지니어링 · 4단계 · 28개 학습 단위

## 시리즈 목표

Worker 통신 계약과 버퍼 소유권을 설계하고 취소·큐·복구 비용을 측정한다.

## 선수 지식

JavaScript 비동기·TypedArray

## 실습 방식과 제공 범위

학습 단위는 날짜가 아닙니다. 설명과 과제를 읽고 완료 조건을 확인한 뒤 다음 단위로 이동하세요. 각 단위의 예제를 출발점으로 삼아 변수를 바꾸고 결과를 관찰합니다. 내장 실행 예제와 별도 환경이 필요한 과제를 구분해서 표시합니다. 예제를 여는 것만으로 학습을 완료한 것으로 처리하지 않습니다.

기존 단위 ID와 필기는 유지됩니다. 기존 01·02·03 예제는 확장된 학습 순서의 1·14·28번째에 연결되므로 주소의 숫자와 화면의 학습 순서가 다를 수 있습니다.

## 학습 경로

### 1단계 · 메시지와 실행 문맥

- [01. 메시지와 실행 경계](01-foundations/README.md) — 편집 가능한 예제
- [02. 모듈 Worker 로딩](units/02/README.md) — 편집 가능한 예제
- [03. 메시지 계약](units/03/README.md) — 편집 가능한 예제
- [04. Structured Clone](units/04/README.md) — 편집 가능한 예제
- [05. TypedArray와 Buffer](units/05/README.md) — 편집 가능한 예제
- [06. 오류 응답 계약](units/06/README.md) — 편집 가능한 예제
- [07. 메인 응답성 관찰](units/07/README.md) — 편집 가능한 예제

### 2단계 · 소유권과 취소

- [08. Transfer 소유권](units/08/README.md) — 편집 가능한 예제
- [09. 부분 View 전송](units/09/README.md) — 편집 가능한 예제
- [10. 버퍼 반환](units/10/README.md) — 편집 가능한 예제
- [11. 오래된 결과 거부](units/11/README.md) — 편집 가능한 예제
- [12. 협력적 취소](units/12/README.md) — 편집 가능한 예제
- [13. 강제 종료와 재생성](units/13/README.md) — 편집 가능한 예제
- [14. Transfer와 취소](02-experiments/README.md) — 편집 가능한 예제

### 3단계 · 큐와 오류 복구

- [15. 진행도 보고](units/15/README.md) — 편집 가능한 예제
- [16. 제한된 작업 큐](units/16/README.md) — 편집 가능한 예제
- [17. Worker Pool](units/17/README.md) — 편집 가능한 예제
- [18. 결과 순서 복원](units/18/README.md) — 편집 가능한 예제
- [19. Timeout과 중복 응답](units/19/README.md) — 편집 가능한 예제
- [20. 장애 복구](units/20/README.md) — 편집 가능한 예제
- [21. MessageChannel 분리](units/21/README.md) — 편집 가능한 예제

### 4단계 · 처리량과 응답성 검증

- [22. 데이터 분할과 병합](units/22/README.md) — 편집 가능한 예제
- [23. 공유 메모리 조건](units/23/README.md) — 편집 가능한 예제
- [24. Atomics와 동기화](units/24/README.md) — 편집 가능한 예제
- [25. 전체 지연 측정](units/25/README.md) — 편집 가능한 예제
- [26. 메모리와 풀 한도](units/26/README.md) — 편집 가능한 예제
- [27. 해제와 다시 시작](units/27/README.md) — 편집 가능한 예제
- [28. 작업 큐와 측정](03-project/README.md) — 편집 가능한 예제

## 통합 프로젝트와 제출물

취소 가능한 배열 처리 큐를 만들고 메인 스레드와 Worker의 정확도·전체 지연·입력 응답을 비교한다.

구현 코드와 실행 방법, 기준 조건과 변경 조건의 기록, 실패 사례와 복구 방법을 함께 남기세요. 측정하지 않은 성능과 수행하지 않은 테스트는 결과로 기재하지 않습니다.

## 공식 참고

- [MDN Using Web Workers](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers)
- [MDN Transferable objects](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Transferable_objects)
