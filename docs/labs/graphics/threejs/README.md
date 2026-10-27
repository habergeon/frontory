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
- [Three.js Box3](https://threejs.org/docs/pages/Box3.html)
- [Three.js AnimationMixer](https://threejs.org/docs/pages/AnimationMixer.html)
- [Three.js Material](https://threejs.org/docs/pages/Material.html)
- [Three.js Transparency](https://threejs.org/manual/pages/transparency.html)
- [Three.js InstancedMesh](https://threejs.org/docs/pages/InstancedMesh.html)

## Three.js 전체 28개 단원 로드맵

01~28은 사이트 안의 필수 실습 검증과 단원별 내용 검토를 마쳤습니다. 이 구현 상태는 나의 학습 진도와 별개이며 운영 배포 상태를 뜻하지 않습니다.

28개 단원 모두 한국어·영어의 독립 HTML 실습과 단계별 예제를 제공합니다. 구현 상태 `verified`는 단원별 실행·내용 검토를 마쳤다는 뜻이며 사용자의 학습 완료와는 별개입니다. 운영에 배포한 기준 커밋은 `0338dbe857265441d76d12b073170e24ac794cb5`입니다. 이후 24개 단원 확장은 로컬 검증 범위이며 아직 원격 push·배포하지 않았습니다. Chromium/SwiftShader 검증은 실제 기기·모든 GPU의 동작이나 실제 학습자 평가를 보장하지 않습니다.

### [01. 장면 그래프와 카메라](01-foundations/README.md) · 실습 검증 완료

ID: `threejs-01`

배울 내용: canvas · 첫 장면 · Scene·Camera·Renderer·Mesh · 애니메이션 · local/world 기초

선수 단원: 없음

완료 과제: HTML 문서에서 첫 장면을 만들고 부모 회전과 자식 좌표를 설명

필요한 실습 기능: 단일 HTML·inline CSS·module JavaScript · Three.js·OrbitControls · 정렬·콘솔·저장

### [02. 렌더러와 화면 크기](units/02/README.md) · 실습 검증 완료

ID: `threejs-step-02`

배울 내용: CSS 크기와 버퍼 크기 · aspect · DPR

선수 단원: [01](01-foundations/README.md)

완료 과제: 화면 크기가 달라져도 도형 비율을 유지

필요한 실습 기능: 단일 HTML·inline CSS·module JavaScript · Three.js·OrbitControls · 정렬·콘솔·저장

### [03. 원근과 직교 투영](units/03/README.md) · 실습 검증 완료

ID: `threejs-step-03`

배울 내용: 카메라 거리 · FOV · near/far · OrbitControls

선수 단원: [01](01-foundations/README.md) · [02](units/02/README.md)

완료 과제: 투영 차이와 물체가 보이지 않는 원인을 구별

필요한 실습 기능: 단일 HTML·inline CSS·module JavaScript · Three.js·OrbitControls · 정렬·콘솔·저장

### [04. 회전과 피벗](units/04/README.md) · 실습 검증 완료

ID: `threejs-step-04`

배울 내용: 좌표계 · 회전 중심 · 부모·자식 변환

선수 단원: [01](01-foundations/README.md) · [02](units/02/README.md) · [03](units/03/README.md)

완료 과제: 자전과 공전을 만들고 위치 변화를 예측

필요한 실습 기능: 단일 HTML·inline CSS·module JavaScript · Three.js·OrbitControls · 정렬·콘솔·저장

### [05. 버퍼 지오메트리](units/05/README.md) · 실습 검증 완료

ID: `threejs-step-05`

배울 내용: 정점·삼각형·인덱스·attribute

선수 단원: [01](01-foundations/README.md) · [04](units/04/README.md)

완료 과제: 직접 만든 삼각형의 정점 수와 인덱스를 설명하고 범위 오류 수정

필요한 실습 기능: 숫자 배열 편집·오류 출력

### [06. 법선과 표면 방향](units/06/README.md) · 실습 검증 완료

ID: `threejs-step-06`

배울 내용: 법선 · 면 방향 · 평면·부드러운 음영

선수 단원: [05](units/05/README.md)

완료 과제: 법선 유무와 경계 처리의 차이를 비교

필요한 실습 기능: 고정 조명 예제와 표면 비교; 조명 상세는 08에서 학습

### [07. 공유 지오메트리와 복제](units/07/README.md) · 실습 검증 완료

ID: `threejs-step-07`

배울 내용: geometry/material 공유와 clone

선수 단원: [05](units/05/README.md) · [06](units/06/README.md)

완료 과제: 한 물체의 변경이 다른 물체에 영향을 주는 조건 재현

필요한 실습 기능: 객체·자원 참조 출력

### [08. 조명 종류와 배치](units/08/README.md) · 실습 검증 완료

ID: `threejs-step-08`

배울 내용: 환경광·방향광·점광원 · position·target

선수 단원: [01](01-foundations/README.md) · [04](units/04/README.md) · [06](units/06/README.md)

완료 과제: 광원 위치와 target을 바꾸고 재질 반응 설명

필요한 실습 기능: 광원별 HTML 조작 입력

### [09. 거칠기와 금속성](units/09/README.md) · 실습 검증 완료

ID: `threejs-step-09`

배울 내용: PBR 기초 · roughness·metalness

선수 단원: [07](units/07/README.md) · [08](units/08/README.md)

완료 과제: 같은 조명에서 두 변수를 따로 바꿔 비교

필요한 실습 기능: 고정 조명·환경 조건의 비교 예제

### [10. 텍스처와 UV](units/10/README.md) · 실습 검증 완료

ID: `threejs-step-10`

배울 내용: UV · 이미지·수치 텍스처 · repeat·wrap · 로딩 실패

선수 단원: [05](units/05/README.md) · [09](units/09/README.md)

완료 과제: UV와 world 좌표를 구별하고 잘못된 자산 입력 복구

필요한 실습 기능: 샘플 이미지·로컬 파일 선택·TextureLoader 지원·실패 fixture

### [11. 색 공간과 출력](units/11/README.md) · 실습 검증 완료

ID: `threejs-step-11`

배울 내용: 색 맵과 데이터 맵 · 입력·작업·출력 색 공간

선수 단원: [09](units/09/README.md) · [10](units/10/README.md)

완료 과제: 색 이미지와 normal·roughness 데이터의 처리 차이 설명

필요한 실습 기능: 출처와 색 공간이 명시된 비교 자산

### [12. 그림자 지도](units/12/README.md) · 실습 검증 완료

ID: `threejs-step-12`

배울 내용: caster·receiver · shadow camera · 해상도·비용

선수 단원: [03](units/03/README.md) · [08](units/08/README.md)

완료 과제: 그림자 잘림과 해상도 저하를 구별해 조정

필요한 실습 기능: 그림자 카메라 표시·설정 입력

### [13. 정규화 좌표와 선택](units/13/README.md) · 실습 검증 완료

ID: `threejs-step-13`

배울 내용: canvas 기준 NDC · Raycaster · 교차 순서

선수 단원: [02](units/02/README.md) · [03](units/03/README.md) · [04](units/04/README.md)

완료 과제: 여백·크기 변경 후에도 가장 가까운 물체 선택

필요한 실습 기능: 포인터 위치와 교차 결과 출력

### [14. 재질·로딩·선택](02-experiments/README.md) · 실습 검증 완료

ID: `threejs-02`

배울 내용: glTF 로딩 상태 · 모델 선택 · 공유 재질 강조

선수 단원: [07](units/07/README.md) · [09](units/09/README.md) · [10](units/10/README.md) · [13](units/13/README.md)

완료 과제: 실패 후에도 UI를 유지하고 선택한 물체만 강조

필요한 실습 기능: GLTFLoader·샘플 GLB·로컬 파일·오류 fixture

### [15. 모델 크기와 카메라 맞춤](units/15/README.md) · 실습 검증 완료

ID: `threejs-step-15`

배울 내용: Box3 · 모델 중심·크기 · FOV 기반 프레이밍

선수 단원: [03](units/03/README.md) · [14](02-experiments/README.md)

완료 과제: 원점에서 먼 모델을 화면에 맞추고 빈 모델 처리

필요한 실습 기능: 다양한 크기·위치·빈 모델 fixture

### [16. 궤도 제어와 요구 렌더링](units/16/README.md) · 실습 검증 완료

ID: `threejs-step-16`

배울 내용: target · damping · 입력 시 렌더링

선수 단원: [02](units/02/README.md) · [03](units/03/README.md) · [15](units/15/README.md)

완료 과제: 정지 화면의 불필요한 렌더를 줄이되 조작 유지

필요한 실습 기능: 프레임 횟수·입력 상태 관찰

### [17. 클립 애니메이션](units/17/README.md) · 실습 검증 완료

ID: `threejs-step-17`

배울 내용: clip·action·mixer · 초 단위 delta · 속도

선수 단원: [01](01-foundations/README.md) · [14](02-experiments/README.md) · [16](units/16/README.md)

완료 과제: 클립 재생을 조작하고 클립 없는 모델도 처리

필요한 실습 기능: 애니메이션 포함·미포함 GLB와 재생 UI

### [18. 투명도와 깊이](units/18/README.md) · 실습 검증 완료

ID: `threejs-step-18`

배울 내용: opacity · transparent · depthWrite · 정렬 한계

선수 단원: [03](units/03/README.md) · [09](units/09/README.md)

완료 과제: 교차 표면의 결과와 객체 정렬의 한계를 설명

필요한 실습 기능: 동일 장면·시점 비교와 관찰 기록

### [19. 인스턴싱 기초](units/19/README.md) · 실습 검증 완료

ID: `threejs-step-19`

배울 내용: InstancedMesh · matrix · needsUpdate · draw call

선수 단원: [04](units/04/README.md) · [05](units/05/README.md) · [07](units/07/README.md)

완료 과제: 같은 배치를 개별 Mesh와 인스턴싱으로 비교

필요한 실습 기능: renderer.info의 해당 지표 설명·출력

### [20. 인스턴스 선택과 갱신](units/20/README.md) · 실습 검증 완료

ID: `threejs-step-20`

배울 내용: instanceId · 색·위치 갱신 · 경계

선수 단원: [13](units/13/README.md) · [19](units/19/README.md)

완료 과제: 한 인스턴스를 바꾼 뒤 새 위치에서 선택

필요한 실습 기능: 인스턴스 ID·변환·경계 관찰

### [21. 화면 밖 객체와 상세도](units/21/README.md) · 실습 검증 완료

ID: `threejs-step-21`

배울 내용: frustum culling · bounds · LOD

선수 단원: [03](units/03/README.md) · [05](units/05/README.md) · [20](units/20/README.md)

완료 과제: 거리별 품질·비용을 비교하고 잘못된 컬링 수정

필요한 실습 기능: bounds·상세도 상태·삼각형 수 표시

### [22. 렌더 타깃과 미니맵](units/22/README.md) · 실습 검증 완료

ID: `threejs-step-22`

배울 내용: offscreen render · texture · target 복원

선수 단원: [02](units/02/README.md) · [03](units/03/README.md) · [10](units/10/README.md)

완료 과제: 메인 화면과 미니맵을 갱신하고 렌더 상태 복원

필요한 실습 기능: 두 카메라·render target 실습

### [23. 자원 소유권 장부](units/23/README.md) · 실습 검증 완료

ID: `threejs-step-23`

배울 내용: remove와 dispose · 공유 자원 수명

선수 단원: [07](units/07/README.md) · [10](units/10/README.md) · [14](02-experiments/README.md) · [22](units/22/README.md)

완료 과제: 자원 소유자를 기록하고 중복 해제 방지

필요한 실습 기능: 생성·정리 횟수와 소유 관계 관찰

### [24. 비동기 장면 교체](units/24/README.md) · 실습 검증 완료

ID: `threejs-step-24`

배울 내용: 요청 순서·완료 순서 · stale 결과 · 정리

선수 단원: [14](02-experiments/README.md) · [17](units/17/README.md) · [23](units/23/README.md)

완료 과제: 늦은 모델이 새 장면을 덮지 않고 자원도 정리

필요한 실습 기능: 로컬 자산의 지연·실패·순서 역전 실험

### [25. HTML 제어와 접근성](units/25/README.md) · 실습 검증 완료

ID: `threejs-step-25`

배울 내용: 객체 목록 · 키보드 조작 · 텍스트 상태 알림

선수 단원: [13](units/13/README.md) · [14](02-experiments/README.md) · [16](units/16/README.md)

완료 과제: 마우스 없이 선택·카메라 조작하고 오류 파악

필요한 실습 기능: 실제 HTML controls·키보드·상태 알림 · HTML 접근성 기초

### [26. 렌더 통계와 프로파일](units/26/README.md) · 실습 검증 완료

ID: `threejs-step-26`

배울 내용: renderer.info 범위 · 다중 패스 · 측정 조건

선수 단원: [16](units/16/README.md) · [19](units/19/README.md) · [22](units/22/README.md) · [23](units/23/README.md)

완료 과제: 프레임 전체 통계를 비교하고 측정 한계 설명

필요한 실습 기능: 사이트 내 표·로그; 정확한 GPU 시간 측정을 필수로 요구하지 않음

### [27. 장면 검사기 통합](units/27/README.md) · 실습 검증 완료

ID: `threejs-step-27`

배울 내용: 로딩·선택·카메라·애니메이션·오류·미니맵 통합

선수 단원: [14](02-experiments/README.md) · [15](units/15/README.md) · [16](units/16/README.md) · [17](units/17/README.md) · [18](units/18/README.md) · [19](units/19/README.md) · [20](units/20/README.md) · [21](units/21/README.md) · [22](units/22/README.md) · [23](units/23/README.md) · [24](units/24/README.md) · [25](units/25/README.md) · [26](units/26/README.md)

완료 과제: 실패 후에도 조작 가능한 검사기를 구성

필요한 실습 기능: 앞선 자산·조작·관찰 기능을 연결한 시작 프로젝트

### [28. 렌더링 자원과 측정](03-project/README.md) · 실습 검증 완료

ID: `threejs-03`

배울 내용: 병목 분리 · 품질 유지 · 반복 생성·종료

선수 단원: [19](units/19/README.md) · [23](units/23/README.md) · [24](units/24/README.md) · [26](units/26/README.md) · [27](units/27/README.md)

완료 과제: 동일 조건의 성능·품질·자원 정리 보고서 작성

필요한 실습 기능: 반복 실행·통계 비교·필기·백업
