# Three.js

[Frontory 기술 지도](../../README.md)

그래픽스 · 4단계 · 28개 학습 단위

## 시리즈 목표

장면 그래프부터 모델 로딩과 GPU 자원 수명까지 이해하고 측정 가능한 3D 검사기를 만든다.

## 선수 지식

HTML·CSS·JavaScript 기초

## 실습 방식과 제공 범위

학습 단위는 날짜가 아닙니다. 설명과 과제를 읽고 완료 조건을 확인한 뒤 다음 단위로 이동하세요. 각 단위의 예제를 출발점으로 삼아 변수를 바꾸고 결과를 관찰합니다. 내장 실행 예제와 별도 환경이 필요한 과제를 구분해서 표시합니다. 예제를 여는 것만으로 학습을 완료한 것으로 처리하지 않습니다.

기존 단위 ID와 필기는 유지됩니다. 기존 01·02·03 예제는 확장된 학습 순서의 1·14·28번째에 연결되므로 주소의 숫자와 화면의 학습 순서가 다를 수 있습니다.

## 학습 경로

### 1단계 · 장면 좌표·카메라·기하

- [01. 장면 그래프와 카메라](01-foundations/README.md) — 편집 가능한 예제
- [02. 렌더러와 화면 크기](units/02/README.md) — 편집 가능한 예제
- [03. 원근과 직교 투영](units/03/README.md) — 편집 가능한 예제
- [04. 회전과 피벗](units/04/README.md) — 편집 가능한 예제
- [05. 버퍼 지오메트리](units/05/README.md) — 편집 가능한 예제
- [06. 법선과 표면 방향](units/06/README.md) — 편집 가능한 예제
- [07. 공유 지오메트리와 복제](units/07/README.md) — 편집 가능한 예제

### 2단계 · 조명·재질·모델 선택

- [08. 조명 종류와 배치](units/08/README.md) — 편집 가능한 예제
- [09. 거칠기와 금속성](units/09/README.md) — 편집 가능한 예제
- [10. 텍스처와 UV](units/10/README.md) — 편집 가능한 예제
- [11. 색 공간과 출력](units/11/README.md) — 편집 가능한 예제
- [12. 그림자 지도](units/12/README.md) — 편집 가능한 예제
- [13. 정규화 좌표와 선택](units/13/README.md) — 편집 가능한 예제
- [14. 재질·로딩·선택](02-experiments/README.md) — 편집 가능한 예제

### 3단계 · 애니메이션·인스턴싱·렌더 패스

- [15. 모델 크기와 카메라 맞춤](units/15/README.md) — 편집 가능한 예제
- [16. 궤도 제어와 요구 렌더링](units/16/README.md) — 편집 가능한 예제
- [17. 클립 애니메이션](units/17/README.md) — 편집 가능한 예제
- [18. 투명도와 깊이](units/18/README.md) — 편집 가능한 예제
- [19. 인스턴싱 기초](units/19/README.md) — 편집 가능한 예제
- [20. 인스턴스 선택과 갱신](units/20/README.md) — 편집 가능한 예제
- [21. 화면 밖 객체와 상세도](units/21/README.md) — 편집 가능한 예제

### 4단계 · 자원 수명·접근성·측정

- [22. 렌더 타깃과 미니맵](units/22/README.md) — 편집 가능한 예제
- [23. 자원 소유권 장부](units/23/README.md) — 편집 가능한 예제
- [24. 비동기 장면 교체](units/24/README.md) — 편집 가능한 예제
- [25. HTML 제어와 접근성](units/25/README.md) — 편집 가능한 예제
- [26. 렌더 통계와 프로파일](units/26/README.md) — 편집 가능한 예제
- [27. 장면 검사기 통합](units/27/README.md) — 편집 가능한 예제
- [28. 렌더링 자원과 측정](03-project/README.md) — 편집 가능한 예제

## 통합 프로젝트와 제출물

모델 선택·카메라 맞춤·애니메이션·미니맵·오류 복구를 갖춘 3D 검사기와 자원·성능 보고서

구현 코드와 실행 방법, 기준 조건과 변경 조건의 기록, 실패 사례와 복구 방법을 함께 남기세요. 측정하지 않은 성능과 수행하지 않은 테스트는 결과로 기재하지 않습니다.

## 공식 참고

- [Three.js Fundamentals](https://threejs.org/manual/pages/fundamentals.html)
- [Three.js WebGLRenderer](https://threejs.org/docs/pages/WebGLRenderer.html)
- [Three.js BufferGeometry](https://threejs.org/docs/pages/BufferGeometry.html)
- [Three.js MeshStandardMaterial](https://threejs.org/docs/pages/MeshStandardMaterial.html)
- [Three.js Cleanup](https://threejs.org/manual/pages/cleanup.html)
- [Three.js Shadows](https://threejs.org/manual/pages/shadows.html)
- [Three.js Color Management](https://threejs.org/manual/pages/color-management.html)
- [Three.js Raycaster](https://threejs.org/docs/pages/Raycaster.html)
- [Three.js GLTFLoader](https://threejs.org/docs/pages/GLTFLoader.html)
- [Three.js OrbitControls](https://threejs.org/docs/pages/OrbitControls.html)
- [Three.js AnimationMixer](https://threejs.org/docs/pages/AnimationMixer.html)
- [Three.js InstancedMesh](https://threejs.org/docs/pages/InstancedMesh.html)
