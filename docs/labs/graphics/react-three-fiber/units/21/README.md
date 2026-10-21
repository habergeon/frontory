# React Three Fiber · 21 인스턴스 선택과 경계

[시리즈 목차](../../README.md) · [전체 기술 지도](../../../../README.md)

단계: 모델·공유 자원·인스턴싱 · 문서 기반 직접 구현 · 저장 ID: `react-three-fiber-step-21`

## 목표와 학습 후 역량

- 클릭 id와 DOM 선택 패널이 일치한다.
- 새 위치에서도 선택·표시 동작을 확인한다.

## 선수 지식

21단위는 20단위 결과물과 실험 기록을 이어 사용합니다.

## 핵심 개념과 설명

### 인스턴스 id

교차 이벤트의 instanceId는 묶음 안의 항목을 식별합니다. 배열 순번과 실제 도메인 id의 매핑을 보관해야 합니다.

### 경계 갱신

인스턴스 행렬 변경은 경계 계산에도 영향을 줄 수 있습니다. 이동 후 picking이나 culling 오류가 있으면 bounding 정보도 확인합니다.

## 실습 준비

별도 React Vite 프로젝트에서 JSX를 사용합니다. React와 @react-three/fiber의 호환 메이저 버전, Three.js 버전과 lockfile을 기록하세요. 이 과정은 WebGL 기반 안정 버전 API를 사용하며 alpha WebGPU API를 혼용하지 않습니다. 프레임 갱신은 useFrame과 ref로 처리합니다. Frontory 내장 실행 예제가 없는 확장 단위이며 아래 파일은 외부 실습 프로젝트에 작성합니다.

이 단위에는 내장 실행 예제가 없습니다. 아래 절차에 따라 별도 실습 파일을 만들고 실행 결과를 필기에 남기세요. 코드 파일은 작업 폴더에서 따로 보관하고 Frontory 필기는 JSON 또는 Markdown으로 백업하세요.

## 실습 과제

1. src/InstancedGrid.jsx의 onClick에서 instanceId를 도메인 id로 변환하세요.
2. setColorAt과 instanceColor.needsUpdate로 선택 색을 바꾸세요.
3. 인스턴스를 멀리 옮긴 뒤 경계 재계산과 클릭 결과를 비교하세요.

## 관찰할 변수

| 변수 | 기준 조건 | 바꿀 조건 | 예상할 변화·검증 가설 |
| --- | --- | --- | --- |
| 인스턴스 위치 | 초기 격자 | 격자 밖으로 이동 | 경계 정보를 갱신해야 새 위치의 picking·culling을 판단할 수 있다. |

표의 예상은 측정 결과가 아닙니다. 한 번에 한 조건만 바꾸고 실제 결과가 다르면 원인을 기록하세요.

## 완료 조건

- [ ] 클릭 id와 DOM 선택 패널이 일치한다.
- [ ] 새 위치에서도 선택·표시 동작을 확인한다.

## 자가 점검

1. instanceId를 영구 데이터 id로 써도 되나요?
2. 행렬과 색상 버퍼의 needsUpdate는 같은 속성인가요?

## 공식 참고

- [R3F 포인터 이벤트](https://r3f.docs.pmnd.rs/api/events)
- [R3F 성능 확장과 demand 렌더링](https://r3f.docs.pmnd.rs/advanced/scaling-performance)

## 연결된 예제와 실행 범위

문서와 필기를 제공합니다. 내장 실행 예제는 아직 제공하지 않습니다.

원본 코드·기록은 자동으로 덮어쓰지 않습니다. 기존 예제를 초기화할 때도 필기는 유지됩니다.

## 다음 학습

[이전: instancedMesh로 반복 객체 그리기](../20/README.md) · [다음: demand 렌더링](../22/README.md)

## 실험 기록 — 직접 작성

### 목표

### 핵심 개념

### 바꾼 변수와 예상

### 실제 결과

### 배운 점

### 남은 질문
