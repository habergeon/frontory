# WebAssembly

[Frontory 기술 지도](../../README.md)

엔지니어링 · 4단계 · 28개 학습 단위

## 시리즈 목표

실제 Wasm 모듈을 호출하고 선형 메모리·복사·수치 표현·초기화 비용을 구분한다.

## 선수 지식

JavaScript·TypedArray, 선택한 컴파일 언어 기초

## 실습 방식과 제공 범위

학습 단위는 날짜가 아닙니다. 설명과 과제를 읽고 완료 조건을 확인한 뒤 다음 단위로 이동하세요. 각 단위의 예제를 출발점으로 삼아 변수를 바꾸고 결과를 관찰합니다. 내장 실행 예제와 별도 환경이 필요한 과제를 구분해서 표시합니다. 예제를 여는 것만으로 학습을 완료한 것으로 처리하지 않습니다.

기존 단위 ID와 필기는 유지됩니다. 기존 01·02·03 예제는 확장된 학습 순서의 1·14·28번째에 연결되므로 주소의 숫자와 화면의 학습 순서가 다를 수 있습니다.

## 학습 경로

### 1단계 · 모듈과 수치 계약

- [01. 모듈과 선형 메모리](01-foundations/README.md) — 편집 가능한 예제
- [02. WAT와 바이너리](units/02/README.md) — 외부 실행 예제 · 미리보기 안내
- [03. Compile과 Instance](units/03/README.md) — 외부 실행 예제 · 미리보기 안내
- [04. Export 검사](units/04/README.md) — 외부 실행 예제 · 미리보기 안내
- [05. Import와 Host 함수](units/05/README.md) — 외부 실행 예제 · 미리보기 안내
- [06. I32와 JS Number](units/06/README.md) — 외부 실행 예제 · 미리보기 안내
- [07. Trap과 입력 검사](units/07/README.md) — 외부 실행 예제 · 미리보기 안내

### 2단계 · 메모리와 배열 경계

- [08. 페이지와 Byte Offset](units/08/README.md) — 외부 실행 예제 · 미리보기 안내
- [09. View와 엔디언](units/09/README.md) — 외부 실행 예제 · 미리보기 안내
- [10. 배열 복사와 범위](units/10/README.md) — 외부 실행 예제 · 미리보기 안내
- [11. Memory Grow와 View 수명](units/11/README.md) — 외부 실행 예제 · 미리보기 안내
- [12. 용량 한도와 실패](units/12/README.md) — 외부 실행 예제 · 미리보기 안내
- [13. 스칼라와 배치 호출](units/13/README.md) — 외부 실행 예제 · 미리보기 안내
- [14. 배열과 경계 비용](02-experiments/README.md) — 외부 실행 예제 · 미리보기 안내

### 3단계 · 배포와 실행 구조

- [15. In-place 변환](units/15/README.md) — 외부 실행 예제 · 미리보기 안내
- [16. 정렬과 비정렬 접근](units/16/README.md) — 외부 실행 예제 · 미리보기 안내
- [17. 복수 배열의 배치](units/17/README.md) — 외부 실행 예제 · 미리보기 안내
- [18. 문자열 바이트 계약](units/18/README.md) — 외부 실행 예제 · 미리보기 안내
- [19. 브라우저 로딩과 MIME](units/19/README.md) — 외부 실행 예제 · 미리보기 안내
- [20. 초기화 재사용](units/20/README.md) — 외부 실행 예제 · 미리보기 안내
- [21. Worker와 Wasm](units/21/README.md) — 외부 실행 예제 · 미리보기 안내

### 4단계 · 정확도와 병목 평가

- [22. 모듈 캐시와 버전](units/22/README.md) — 외부 실행 예제 · 미리보기 안내
- [23. 콜드 실행 분해](units/23/README.md) — 외부 실행 예제 · 미리보기 안내
- [24. 웜 반복과 워밍업](units/24/README.md) — 외부 실행 예제 · 미리보기 안내
- [25. 복사 포함 총비용](units/25/README.md) — 외부 실행 예제 · 미리보기 안내
- [26. 경계값 정확도](units/26/README.md) — 외부 실행 예제 · 미리보기 안내
- [27. 환경과 채택 기준](units/27/README.md) — 외부 실행 예제 · 미리보기 안내
- [28. 실제 병목 평가](03-project/README.md) — 외부 실행 예제 · 미리보기 안내

## 통합 프로젝트와 제출물

배열 변환을 JS와 실제 Wasm에서 검증하고 콜드·웜·복사 포함 전체 지연으로 채택 여부를 결정한다.

구현 코드와 실행 방법, 기준 조건과 변경 조건의 기록, 실패 사례와 복구 방법을 함께 남기세요. 측정하지 않은 성능과 수행하지 않은 테스트는 결과로 기재하지 않습니다.

## 공식 참고

- [WebAssembly 개발 도구 안내](https://webassembly.org/getting-started/developers-guide/)
- [MDN WebAssembly JavaScript API](https://developer.mozilla.org/en-US/docs/WebAssembly/Guides/Using_the_JavaScript_API)
- [MDN WebAssembly.Memory](https://developer.mozilla.org/en-US/docs/WebAssembly/Reference/JavaScript_interface/Memory)
