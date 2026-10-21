# PixiJS

[Frontory 기술 지도](../../README.md)

그래픽스 · 4단계 · 28개 학습 단위

## 시리즈 목표

PixiJS 8의 장면 그래프와 비동기 자원 수명을 이해하고 입력 가능한 2D 편집기를 만든다.

## 선수 지식

Canvas 2D 루프와 텍스처

## 실습 방식과 제공 범위

학습 단위는 날짜가 아닙니다. 설명과 과제를 읽고, 완료 조건을 확인한 뒤 다음 단위로 이동하세요. 각 단위의 예제를 출발점으로 삼아 변수를 바꾸고 결과를 관찰합니다. 내장 실행 예제와 별도 환경이 필요한 과제를 구분해서 표시합니다. 예제를 여는 것만으로 학습을 완료한 것으로 처리하지 않습니다.

기존 단위 ID와 필기는 유지됩니다. 기존 01·02·03 예제는 확장된 학습 순서의 1·14·28번째에 연결되므로 주소의 숫자와 화면의 학습 순서가 다를 수 있습니다.

## 학습 경로

### 1단계 · Application·좌표·표시 객체

- [01. Application과 Scene graph](01-foundations/README.md) — 편집 가능한 예제
- [02. 스프라이트와 앵커](units/02/README.md) — 편집 가능한 예제
- [03. 컨테이너와 로컬 좌표](units/03/README.md) — 편집 가능한 예제
- [04. Graphics 8 도형 API](units/04/README.md) — 편집 가능한 예제
- [05. 텍스트와 스타일 갱신](units/05/README.md) — 편집 가능한 예제
- [06. 레이어와 그리기 순서](units/06/README.md) — 편집 가능한 예제
- [07. 반응형 화면과 해상도](units/07/README.md) — 편집 가능한 예제

### 2단계 · Ticker·Assets·포인터 입력

- [08. Ticker와 시간 단위](units/08/README.md) — 편집 가능한 예제
- [09. 시작·정지와 콜백 정리](units/09/README.md) — 편집 가능한 예제
- [10. Assets 비동기 로딩](units/10/README.md) — 편집 가능한 예제
- [11. 아틀라스와 프레임](units/11/README.md) — 편집 가능한 예제
- [12. 이벤트 모드와 히트 영역](units/12/README.md) — 편집 가능한 예제
- [13. 드래그와 전역 포인터](units/13/README.md) — 편집 가능한 예제
- [14. Assets와 이벤트](02-experiments/README.md) — 편집 가능한 예제

### 3단계 · 접근성·장면 구성·효과

- [15. 키보드와 접근성](units/15/README.md) — 편집 가능한 예제
- [16. 장면 전환과 상태 보존](units/16/README.md) — 편집 가능한 예제
- [17. 애니메이션 프레임 시퀀스](units/17/README.md) — 편집 가능한 예제
- [18. 마스크와 스크롤 영역](units/18/README.md) — 편집 가능한 예제
- [19. 필터와 적용 범위](units/19/README.md) — 편집 가능한 예제
- [20. 블렌드 모드와 순서](units/20/README.md) — 편집 가능한 예제
- [21. 정적 UI 캐시](units/21/README.md) — 편집 가능한 예제

### 4단계 · 자원 소유·대량 렌더링·측정

- [22. 텍스처 해제와 캐시 소유](units/22/README.md) — 편집 가능한 예제
- [23. 대량 입자와 기능 경계](units/23/README.md) — 편집 가능한 예제
- [24. 화면 밖 처리와 갱신 줄이기](units/24/README.md) — 편집 가능한 예제
- [25. 배칭 가설 만들기](units/25/README.md) — 편집 가능한 예제
- [26. 프로파일과 품질 예산](units/26/README.md) — 편집 가능한 예제
- [27. 2D 장면 편집기 완성](units/27/README.md) — 편집 가능한 예제
- [28. 배칭과 품질](03-project/README.md) — 편집 가능한 예제

## 통합 프로젝트와 제출물

아틀라스 기반 2D 장면 편집기, 키보드 조작과 실패 복구, 배칭·필터·해상도 비교 보고서

구현 코드와 실행 방법, 기준 조건과 변경 조건의 기록, 실패 사례와 복구 방법을 함께 남기세요. 측정하지 않은 성능과 수행하지 않은 테스트는 결과로 기재하지 않습니다.

## 공식 참고

- [PixiJS 8 app](https://pixijs.com/8.x/guides/components/application)
- [PixiJS 8 container](https://pixijs.com/8.x/guides/components/scene-objects/container)
- [PixiJS 8 sprite](https://pixijs.com/8.x/guides/components/scene-objects/sprite)
- [PixiJS 8 assets](https://pixijs.com/8.x/guides/components/assets)
- [PixiJS 8 graphics](https://pixijs.com/8.x/guides/components/scene-objects/graphics)
- [PixiJS 8 text](https://pixijs.com/8.x/guides/components/scene-objects/text)
- [PixiJS 8 perf](https://pixijs.com/8.x/guides/concepts/performance-tips)
- [PixiJS 8 ticker](https://pixijs.com/8.x/guides/components/ticker)
- [PixiJS 8 gc](https://pixijs.com/8.x/guides/concepts/garbage-collection)
- [PixiJS 8 events](https://pixijs.com/8.x/guides/components/events)
- [PixiJS 8 a11y](https://pixijs.com/8.x/guides/components/accessibility)
- [PixiJS 8 filters](https://pixijs.com/8.x/guides/components/filters)
- [PixiJS 8 cache](https://pixijs.com/8.x/guides/components/scene-objects/container/cache-as-texture)
- [PixiJS 8 particles](https://pixijs.com/8.x/guides/components/scene-objects/particle-container)
