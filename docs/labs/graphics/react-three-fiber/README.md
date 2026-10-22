# React Three Fiber

[Frontory 기술 지도](../../README.md)

그래픽스 · 4단계 · 28개 학습 단위

## 시리즈 목표

Three.js 장면을 React 컴포넌트로 구성하고 프레임 값·선택 상태·공유 자원의 수명을 나누어 관리한다.

## 선수 지식

React effect·ref, Three.js

## 실습 방식과 제공 범위

학습 단위는 날짜가 아닙니다. 설명과 과제를 읽고 완료 조건을 확인한 뒤 다음 단위로 이동하세요. 각 단위의 예제를 출발점으로 삼아 변수를 바꾸고 결과를 관찰합니다. 내장 실행 예제와 별도 환경이 필요한 과제를 구분해서 표시합니다. 예제를 여는 것만으로 학습을 완료한 것으로 처리하지 않습니다.

기존 단위 ID와 필기는 유지됩니다. 기존 01·02·03 예제는 확장된 학습 순서의 1·14·28번째에 연결되므로 주소의 숫자와 화면의 학습 순서가 다를 수 있습니다.

## 학습 경로

### 1단계 · 선언적 장면과 프레임 좌표

- [01. 선언적 장면](01-foundations/README.md) — 편집 가능한 예제
- [02. Canvas 크기와 카메라](units/02/README.md) — 편집 가능한 예제
- [03. args와 객체 재생성](units/03/README.md) — 편집 가능한 예제
- [04. group과 로컬 좌표](units/04/README.md) — 편집 가능한 예제
- [05. 재질과 조명](units/05/README.md) — 편집 가능한 예제
- [06. ref로 Three.js 객체 읽기](units/06/README.md) — 편집 가능한 예제
- [07. useFrame과 시간 기반 회전](units/07/README.md) — 편집 가능한 예제

### 2단계 · 3D 입력과 UI 상태

- [08. useThree의 범위와 선택](units/08/README.md) — 편집 가능한 예제
- [09. 카메라 조작과 projection 갱신](units/09/README.md) — 편집 가능한 예제
- [10. 포인터 교차와 선택](units/10/README.md) — 편집 가능한 예제
- [11. 이벤트 전파와 가림](units/11/README.md) — 편집 가능한 예제
- [12. 드래그와 포인터 캡처](units/12/README.md) — 편집 가능한 예제
- [13. UI 상태와 프레임 목표](units/13/README.md) — 편집 가능한 예제
- [14. 프레임과 이벤트](02-experiments/README.md) — 편집 가능한 예제

### 3단계 · 모델·공유 자원·인스턴싱

- [15. 모델 로딩과 Suspense](units/15/README.md) — 외부 실행 예제 · 미리보기 안내
- [16. 캐시 모델의 복제와 공유](units/16/README.md) — 편집 가능한 예제
- [17. 텍스처 입력과 갱신](units/17/README.md) — 편집 가능한 예제
- [18. 공유 geometry와 material](units/18/README.md) — 편집 가능한 예제
- [19. 프레임 중 할당 줄이기](units/19/README.md) — 편집 가능한 예제
- [20. instancedMesh로 반복 객체 그리기](units/20/README.md) — 편집 가능한 예제
- [21. 인스턴스 선택과 경계](units/21/README.md) — 편집 가능한 예제

### 4단계 · demand 정책과 성능 검증

- [22. demand 렌더링](units/22/README.md) — 편집 가능한 예제
- [23. demand와 움직임의 종료](units/23/README.md) — 편집 가능한 예제
- [24. DPR과 그림자 비용](units/24/README.md) — 편집 가능한 예제
- [25. 장면 전환과 자원 감사](units/25/README.md) — 편집 가능한 예제
- [26. 3D UI의 대체 조작과 오류](units/26/README.md) — 편집 가능한 예제
- [27. 통합 장면의 성능 실험](units/27/README.md) — 편집 가능한 예제
- [28. 자원 공유와 프레임 정책](03-project/README.md) — 편집 가능한 예제

## 통합 프로젝트와 제출물

선택과 필기가 있는 3D 학습 장면, 개별 mesh와 instancing 비교, demand 동작 검증 및 자원 소유권 보고서.

구현 코드와 실행 방법, 기준 조건과 변경 조건의 기록, 실패 사례와 복구 방법을 함께 남기세요. 측정하지 않은 성능과 수행하지 않은 테스트는 결과로 기재하지 않습니다.

## 공식 참고

- [R3F 시작과 React 버전 호환](https://r3f.docs.pmnd.rs/getting-started/introduction)
- [R3F 객체와 자원 해제](https://r3f.docs.pmnd.rs/api/objects)
- [R3F Canvas 설정](https://r3f.docs.pmnd.rs/api/canvas)
- [R3F Hooks](https://r3f.docs.pmnd.rs/api/hooks)
- [R3F 성능 함정](https://r3f.docs.pmnd.rs/advanced/pitfalls)
- [R3F 포인터 이벤트](https://r3f.docs.pmnd.rs/api/events)
- [R3F 모델 로딩](https://r3f.docs.pmnd.rs/tutorials/loading-models)
- [R3F 성능 확장과 demand 렌더링](https://r3f.docs.pmnd.rs/advanced/scaling-performance)
