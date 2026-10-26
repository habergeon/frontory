# React Three Fiber · 22 demand 렌더링

[시리즈 목차](../../README.md) · [전체 기술 지도](../../../../README.md)

단계: demand 정책과 성능 검증 · 편집 가능한 예제 · 저장 ID: `react-three-fiber-step-22`

## 목표와 학습 후 역량

- demand 정지 구간에서 불필요한 연속 프레임이 없다.
- 버튼 클릭 뒤 각도가 화면에 반영된다.

## 선수 지식

22단위는 21단위 결과물과 실험 기록을 이어 사용합니다.

## 핵심 개념과 설명

### 필요할 때 그리기

frameloop='demand'는 변화가 있을 때 프레임을 요청하는 정책입니다. 정지 장면에서 계속 렌더하지 않도록 할 수 있습니다.

### 수동 무효화

ref로 직접 객체를 바꾸면 React가 변화를 알지 못할 수 있습니다. invalidate로 다음 프레임을 요청해 화면에 반영합니다.

## 실습 준비

예제 화면의 실행 범위 안내를 먼저 확인하세요. 다음은 과제를 별도 프로젝트로 확장할 때의 준비 환경입니다. 별도 React Vite 프로젝트에서 JSX를 사용합니다. React와 @react-three/fiber의 호환 메이저 버전, Three.js 버전과 lockfile을 기록하세요. 이 과정은 WebGL 기반 안정 버전 API를 사용하며 alpha WebGPU API를 혼용하지 않습니다. 프레임 갱신은 useFrame과 ref로 처리합니다.

연결된 예제는 출발점입니다. 아래 과제 전체가 완성된 코드는 아니며 예제의 지원 범위를 넘는 작업은 별도 프로젝트에서 수행하세요.

## 실습 과제

1. src/DemandScene.jsx의 Canvas frameloop을 demand로 설정하세요.
2. 버튼 Effect에서 group.rotation.y를 바꾸고 invalidate를 호출하세요.
3. always와 demand에서 정지 5초·버튼 조작 5회의 프레임 수를 기록하세요.

## 관찰할 변수

| 변수      | 기준 조건 | 바꿀 조건 | 예상할 변화·검증 가설                               |
| --------- | --------- | --------- | --------------------------------------------------- |
| frameloop | always    | demand    | 정지 중 프레임은 줄고 버튼 변화는 계속 보여야 한다. |

표의 예상은 측정 결과가 아닙니다. 한 번에 한 조건만 바꾸고 실제 결과가 다르면 원인을 기록하세요.

## 완료 조건

- [ ] demand 정지 구간에서 불필요한 연속 프레임이 없다.
- [ ] 버튼 클릭 뒤 각도가 화면에 반영된다.

## 자가 점검

1. invalidate는 즉시 동기 렌더 명령인가요?
2. 여러 invalidate 호출이 같은 수의 프레임을 보장하나요?

## 공식 참고

- [R3F 성능 확장과 demand 렌더링](https://r3f.docs.pmnd.rs/advanced/scaling-performance)
- [R3F Hooks](https://r3f.docs.pmnd.rs/api/hooks)

## 연결된 예제와 실행 범위

[예제 원본](../../../../../../src/labs/react-three-fiber-step-22/example.js) · [실행 환경과 제한](../../../../../examples.md)

실제 React Three Fiber Canvas 실험입니다. WebGL을 지원하는 브라우저가 필요합니다.

원본 코드·기록은 자동으로 덮어쓰지 않습니다. 기존 예제를 초기화할 때도 필기는 유지됩니다.

## 다음 학습

[이전: 인스턴스 선택과 경계](../21/README.md) · [다음: demand와 움직임의 종료](../23/README.md)

## 실험 기록 — 직접 작성

### 목표

### 핵심 개념

### 바꾼 변수와 예상

### 실제 결과

### 배운 점

### 남은 질문
