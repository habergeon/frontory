# GLSL

[Frontory 기술 지도](../../README.md)

셰이더 · 4단계 · 28개 학습 단위

## 시리즈 목표

GLSL ES의 단계별 입력과 수학을 이해하고 WebGL2에서 시각 효과를 구현·진단·비교합니다.

## 선수 지식

WebGL 파이프라인·벡터

## 실습 방식과 제공 범위

학습 단위는 날짜가 아닙니다. 설명과 과제를 읽고, 완료 조건을 확인한 뒤 다음 단위로 이동하세요. 각 단위의 예제를 출발점으로 삼아 변수를 바꾸고 결과를 관찰합니다. 내장 실행 예제와 별도 환경이 필요한 과제를 구분해서 표시합니다. 예제를 여는 것만으로 학습을 완료한 것으로 처리하지 않습니다.

기존 단위 ID와 필기는 유지됩니다. 기존 01·02·03 예제는 확장된 학습 순서의 1·14·28번째에 연결되므로 주소의 숫자와 화면의 학습 순서가 다를 수 있습니다.

## 학습 경로

### 1단계 · 셰이더 언어와 데이터 흐름

- [01. Vertex와 Fragment](01-foundations/README.md) — 편집 가능한 예제
- [02. 스칼라와 벡터 타입](units/02/README.md) — 편집 가능한 예제
- [03. 정밀도와 수치 범위](units/03/README.md) — 편집 가능한 예제
- [04. Attribute와 보간](units/04/README.md) — 편집 가능한 예제
- [05. 좌표 공간 추적](units/05/README.md) — 편집 가능한 예제
- [06. Uniform 조회와 갱신](units/06/README.md) — 편집 가능한 예제
- [07. 디버그 출력과 최소 재현](units/07/README.md) — 편집 가능한 예제

### 2단계 · 좌표·질감·시간 표현

- [08. UV와 종횡비](units/08/README.md) — 편집 가능한 예제
- [09. Step과 Smoothstep 마스크](units/09/README.md) — 편집 가능한 예제
- [10. 타일링과 반복 좌표](units/10/README.md) — 편집 가능한 예제
- [11. Texture sampling](units/11/README.md) — 편집 가능한 예제
- [12. 미분과 가장자리 완화](units/12/README.md) — 편집 가능한 예제
- [13. 시간과 주기](units/13/README.md) — 편집 가능한 예제
- [14. UV·Uniform·파동](02-experiments/README.md) — 편집 가능한 예제

### 3단계 · 조명과 절차적 표면

- [15. 2D 거리장 도형](units/15/README.md) — 편집 가능한 예제
- [16. Value noise의 구성](units/16/README.md) — 편집 가능한 예제
- [17. 옥타브와 대역 제한](units/17/README.md) — 편집 가능한 예제
- [18. 법선과 확산 조명](units/18/README.md) — 편집 가능한 예제
- [19. 반사광과 시선 벡터](units/19/README.md) — 편집 가능한 예제
- [20. 변형 표면의 법선](units/20/README.md) — 편집 가능한 예제
- [21. Alpha와 합성 상태](units/21/README.md) — 편집 가능한 예제

### 4단계 · 상호작용·후처리·비용 평가

- [22. Framebuffer와 화면 패스](units/22/README.md) — 편집 가능한 예제
- [23. Texel 크기와 필터](units/23/README.md) — 편집 가능한 예제
- [24. 포인터 좌표와 입력 완화](units/24/README.md) — 편집 가능한 예제
- [25. 분기와 반복의 비용](units/25/README.md) — 편집 가능한 예제
- [26. 편집 실패와 Context 복구](units/26/README.md) — 편집 가능한 예제
- [27. 품질 기준과 회귀 기록](units/27/README.md) — 편집 가능한 예제
- [28. 상호작용과 비용](03-project/README.md) — 편집 가능한 예제

## 통합 프로젝트와 제출물

포인터로 조작하는 절차적 표면과 후처리를 갖추고 컴파일 복구 및 품질·비용 기록을 제공하는 실험

구현 코드와 실행 방법, 기준 조건과 변경 조건의 기록, 실패 사례와 복구 방법을 함께 남기세요. 측정하지 않은 성능과 수행하지 않은 테스트는 결과로 기재하지 않습니다.

## 공식 참고

- [GLSL ES 3.00 명세](https://registry.khronos.org/OpenGL/specs/es/3.0/GLSL_ES_Specification_3.00.pdf)
