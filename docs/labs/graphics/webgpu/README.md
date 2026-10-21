# WebGPU

[Frontory 기술 지도](../../README.md)

그래픽스 · 4단계 · 28개 학습 단위

## 시리즈 목표

WebGPU의 장치·자원·명령 모델을 이해하고 렌더링과 compute를 정확성 및 전체 비용으로 검증합니다.

## 선수 지식

WebGL 파이프라인, TypedArray·비동기

## 실습 방식과 제공 범위

학습 단위는 날짜가 아닙니다. 설명과 과제를 읽고, 완료 조건을 확인한 뒤 다음 단위로 이동하세요. 각 단위의 예제를 출발점으로 삼아 변수를 바꾸고 결과를 관찰합니다. 내장 실행 예제와 별도 환경이 필요한 과제를 구분해서 표시합니다. 예제를 여는 것만으로 학습을 완료한 것으로 처리하지 않습니다.

기존 단위 ID와 필기는 유지됩니다. 기존 01·02·03 예제는 확장된 학습 순서의 1·14·28번째에 연결되므로 주소의 숫자와 화면의 학습 순서가 다를 수 있습니다.

## 학습 경로

### 1단계 · 장치와 명령의 기초

- [01. Adapter·Device·Pipeline](01-foundations/README.md) — 편집 가능한 예제
- [02. 기능과 limits 협상](units/02/README.md) — 편집 가능한 예제
- [03. Canvas 구성과 현재 texture](units/03/README.md) — 편집 가능한 예제
- [04. 명령 기록과 제출](units/04/README.md) — 편집 가능한 예제
- [05. 셰이더 모듈과 진단](units/05/README.md) — 편집 가능한 예제
- [06. 정점 buffer와 속성](units/06/README.md) — 편집 가능한 예제
- [07. 인덱스와 primitive](units/07/README.md) — 편집 가능한 예제

### 2단계 · 렌더 자원과 화면 구성

- [08. Uniform과 bind group](units/08/README.md) — 편집 가능한 예제
- [09. Uniform 구조체 정렬](units/09/README.md) — 편집 가능한 예제
- [10. 행렬과 카메라](units/10/README.md) — 편집 가능한 예제
- [11. Texture와 sampler](units/11/README.md) — 편집 가능한 예제
- [12. 깊이 attachment](units/12/README.md) — 편집 가능한 예제
- [13. Resize와 샘플 수](units/13/README.md) — 편집 가능한 예제
- [14. Buffer와 Render pass](02-experiments/README.md) — 편집 가능한 예제

### 3단계 · Compute와 데이터 이동

- [15. Compute 첫 배열 변환](units/15/README.md) — 편집 가능한 예제
- [16. Storage와 ping-pong](units/16/README.md) — 편집 가능한 예제
- [17. Map과 staging buffer](units/17/README.md) — 편집 가능한 예제
- [18. 복사 정렬과 texture 행](units/18/README.md) — 편집 가능한 예제
- [19. Workgroup 공유 메모리](units/19/README.md) — 편집 가능한 예제
- [20. Compute 결과 렌더링](units/20/README.md) — 편집 가능한 예제
- [21. Instancing과 데이터 구조](units/21/README.md) — 편집 가능한 예제

### 4단계 · 복구·측정·통합 프로젝트

- [22. Device loss와 재초기화](units/22/README.md) — 편집 가능한 예제
- [23. 비동기 오류와 작업 식별](units/23/README.md) — 편집 가능한 예제
- [24. 시간 측정의 범위](units/24/README.md) — 편집 가능한 예제
- [25. CPU 기준과 오차 예산](units/25/README.md) — 편집 가능한 예제
- [26. Workgroup 크기 실험](units/26/README.md) — 편집 가능한 예제
- [27. 통합 입자 실험 인수](units/27/README.md) — 편집 가능한 예제
- [28. Compute와 Readback](03-project/README.md) — 편집 가능한 예제

## 통합 프로젝트와 제출물

지원 안내와 device loss 복구, compute 갱신, readback 검증을 갖춘 소형 입자 실험

구현 코드와 실행 방법, 기준 조건과 변경 조건의 기록, 실패 사례와 복구 방법을 함께 남기세요. 측정하지 않은 성능과 수행하지 않은 테스트는 결과로 기재하지 않습니다.

## 공식 참고

- [WebGPU API와 오류 처리](https://developer.mozilla.org/en-US/docs/Web/API/WebGPU_API)
- [WGSL 명세](https://www.w3.org/TR/WGSL/)
