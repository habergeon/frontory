# SVG

[Frontory 기술 지도](../../README.md)

그래픽스 · 4단계 · 28개 학습 단위

## 시리즈 목표

벡터 좌표와 DOM 의미를 연결해 접근 가능한 데이터 지도를 만든다.

## 선수 지식

HTML·CSS, 좌표

## 실습 방식과 제공 범위

학습 단위는 날짜가 아닙니다. 설명과 과제를 읽고, 완료 조건을 확인한 뒤 다음 단위로 이동하세요. 기존 세 예제는 출발점으로 유지하며 나머지 25개 단위는 문서 기반 직접 구현 과제입니다. 내장 실행 예제와 별도 환경이 필요한 과제를 구분해서 표시합니다. 예제를 여는 것만으로 학습을 완료한 것으로 처리하지 않습니다.

기존 단위 ID와 필기는 유지됩니다. 기존 01·02·03 예제는 확장된 학습 순서의 1·14·28번째에 연결되므로 주소의 숫자와 화면의 학습 순서가 다를 수 있습니다.

## 학습 경로

### 1단계 · 벡터 경로와 좌표

- [01. viewBox와 벡터](01-foundations/README.md) — 기존 예제에서 확장
- [02. 기본 도형과 속성](units/02/README.md) — 문서 기반 직접 구현
- [03. 경로 명령과 닫기](units/03/README.md) — 문서 기반 직접 구현
- [04. 베지어 곡선 조절](units/04/README.md) — 문서 기반 직접 구현
- [05. 호와 도넛 조각](units/05/README.md) — 문서 기반 직접 구현
- [06. 그룹과 변환 순서](units/06/README.md) — 문서 기반 직접 구현
- [07. 심벌과 재사용](units/07/README.md) — 문서 기반 직접 구현

### 2단계 · 스타일·효과·DOM 입력

- [08. 스타일과 테마](units/08/README.md) — 문서 기반 직접 구현
- [09. 그라디언트 좌표](units/09/README.md) — 문서 기반 직접 구현
- [10. 클립과 마스크](units/10/README.md) — 문서 기반 직접 구현
- [11. 필터 영역과 비용](units/11/README.md) — 문서 기반 직접 구현
- [12. 텍스트와 데이터 라벨](units/12/README.md) — 문서 기반 직접 구현
- [13. 화면 좌표를 SVG로](units/13/README.md) — 문서 기반 직접 구현
- [14. DOM 인터랙션](02-experiments/README.md) — 기존 예제에서 확장

### 3단계 · 접근성과 데이터 지도

- [15. 접근 가능한 이름과 설명](units/15/README.md) — 문서 기반 직접 구현
- [16. 포인터 이벤트 영역](units/16/README.md) — 문서 기반 직접 구현
- [17. 드래그와 캡처](units/17/README.md) — 문서 기반 직접 구현
- [18. 확대와 이동](units/18/README.md) — 문서 기반 직접 구현
- [19. 데이터와 DOM 갱신](units/19/README.md) — 문서 기반 직접 구현
- [20. 연결선과 그래프 배치](units/20/README.md) — 문서 기반 직접 구현
- [21. 애니메이션과 동작 줄이기](units/21/README.md) — 문서 기반 직접 구현

### 4단계 · 내보내기·대규모 비교

- [22. SVG 파일 내보내기](units/22/README.md) — 문서 기반 직접 구현
- [23. 큰 데이터와 갱신 비용](units/23/README.md) — 문서 기반 직접 구현
- [24. 가시 영역과 세부 수준](units/24/README.md) — 문서 기반 직접 구현
- [25. Canvas 대조 렌더러](units/25/README.md) — 문서 기반 직접 구현
- [26. 지도 편집기 통합](units/26/README.md) — 문서 기반 직접 구현
- [27. 재현 가능한 비교 실험](units/27/README.md) — 문서 기반 직접 구현
- [28. Canvas와 비교](03-project/README.md) — 기존 예제에서 확장

## 통합 프로젝트와 제출물

키보드로 편집 가능한 SVG 노드 지도, 독립 SVG 내보내기와 동일 데이터 Canvas 비교 보고서

구현 코드와 실행 방법, 기준 조건과 변경 조건의 기록, 실패 사례와 복구 방법을 함께 남기세요. 측정하지 않은 성능과 수행하지 않은 테스트는 결과로 기재하지 않습니다.

## 공식 참고

- [MDN SVG 기초 튜토리얼](https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorials/SVG_from_scratch)
- [MDN SVG title 접근 가능한 이름](https://developer.mozilla.org/en-US/docs/Web/SVG/Reference/Element/title)
- [MDN getScreenCTM 좌표 변환](https://developer.mozilla.org/en-US/docs/Web/API/SVGGraphicsElement/getScreenCTM)
- [MDN CanvasRenderingContext2D API](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D)
