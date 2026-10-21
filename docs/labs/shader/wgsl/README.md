# WGSL

[Frontory 기술 지도](../../README.md)

셰이더 · 4단계 · 28개 학습 단위

## 시리즈 목표

WGSL 타입·stage 인터페이스·주소 공간·메모리 배치와 병렬 제어 흐름을 이해하고 검증 가능한 커널을 작성합니다.

## 선수 지식

WebGPU buffer·pipeline, 벡터

## 실습 방식과 제공 범위

학습 단위는 날짜가 아닙니다. 설명과 과제를 읽고, 완료 조건을 확인한 뒤 다음 단위로 이동하세요. 기존 세 예제는 출발점으로 유지하며 나머지 25개 단위는 문서 기반 직접 구현 과제입니다. 내장 실행 예제와 별도 환경이 필요한 과제를 구분해서 표시합니다. 예제를 여는 것만으로 학습을 완료한 것으로 처리하지 않습니다.

기존 단위 ID와 필기는 유지됩니다. 기존 01·02·03 예제는 확장된 학습 순서의 1·14·28번째에 연결되므로 주소의 숫자와 화면의 학습 순서가 다를 수 있습니다.

## 학습 경로

### 1단계 · 타입과 셰이더 인터페이스

- [01. 타입과 Entry point](01-foundations/README.md) — 기존 예제에서 확장
- [02. 리터럴과 명시적 수치 타입](units/02/README.md) — 문서 기반 직접 구현
- [03. 벡터·행렬 생성과 곱](units/03/README.md) — 문서 기반 직접 구현
- [04. Const·Let·Var·Override](units/04/README.md) — 문서 기반 직접 구현
- [05. 함수와 구조체 계약](units/05/README.md) — 문서 기반 직접 구현
- [06. 조건·반복과 종료](units/06/README.md) — 문서 기반 직접 구현
- [07. 보간과 Stage 인터페이스](units/07/README.md) — 문서 기반 직접 구현

### 2단계 · 자원 선언과 메모리 배치

- [08. 주소 공간과 접근 모드](units/08/README.md) — 문서 기반 직접 구현
- [09. Group·Binding과 호스트 연결](units/09/README.md) — 문서 기반 직접 구현
- [10. Scalar·Vector 정렬](units/10/README.md) — 문서 기반 직접 구현
- [11. 행렬과 배열 Stride](units/11/README.md) — 문서 기반 직접 구현
- [12. Uniform의 추가 배치 제약](units/12/README.md) — 문서 기반 직접 구현
- [13. 런타임 배열과 Binding 범위](units/13/README.md) — 문서 기반 직접 구현
- [14. Binding과 메모리 배치](02-experiments/README.md) — 기존 예제에서 확장

### 3단계 · 병렬 계산과 동기화

- [15. Compute ID와 인덱스](units/15/README.md) — 문서 기반 직접 구현
- [16. 경계 검사와 빈 입력](units/16/README.md) — 문서 기반 직접 구현
- [17. Workgroup 메모리와 협력](units/17/README.md) — 문서 기반 직접 구현
- [18. Barrier와 균일 제어 흐름](units/18/README.md) — 문서 기반 직접 구현
- [19. Atomic과 카운터](units/19/README.md) — 문서 기반 직접 구현
- [20. 부분합 Reduction](units/20/README.md) — 문서 기반 직접 구현
- [21. Ping-pong과 데이터 경쟁](units/21/README.md) — 문서 기반 직접 구현

### 4단계 · 수치 검증과 커널 설계

- [22. Texture 함수의 단계 제약](units/22/README.md) — 문서 기반 직접 구현
- [23. Storage texture 출력](units/23/README.md) — 문서 기반 직접 구현
- [24. 수치 안정성과 특수 입력](units/24/README.md) — 문서 기반 직접 구현
- [25. 커널 테스트와 Sentinel](units/25/README.md) — 문서 기반 직접 구현
- [26. Workgroup 구성과 측정](units/26/README.md) — 문서 기반 직접 구현
- [27. 커널 계약 문서화](units/27/README.md) — 문서 기반 직접 구현
- [28. Compute와 경계](03-project/README.md) — 기존 예제에서 확장

## 통합 프로젝트와 제출물

경계·레이아웃·동기화를 검증하는 소형 compute 모음과 CPU 기준 비교 보고서

구현 코드와 실행 방법, 기준 조건과 변경 조건의 기록, 실패 사례와 복구 방법을 함께 남기세요. 측정하지 않은 성능과 수행하지 않은 테스트는 결과로 기재하지 않습니다.

## 공식 참고

- [WGSL 명세](https://www.w3.org/TR/WGSL/)
- [WebGPU API](https://developer.mozilla.org/en-US/docs/Web/API/WebGPU_API)
