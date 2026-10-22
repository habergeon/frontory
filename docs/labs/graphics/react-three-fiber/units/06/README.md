# React Three Fiber · 06 ref로 Three.js 객체 읽기

[시리즈 목차](../../README.md) · [전체 기술 지도](../../../../README.md)

단계: 선언적 장면과 프레임 좌표 · 편집 가능한 예제 · 저장 ID: `react-three-fiber-step-06`

## 목표와 학습 후 역량

- ref.current의 객체 타입과 uuid가 기록된다.
- 최종 구현은 rotation을 한 경로에서만 갱신한다.

## 선수 지식

6단위는 5단위 결과물과 실험 기록을 이어 사용합니다.

## 핵심 개념과 설명

### 객체 ref

mesh ref는 DOM이 아닌 Three.js Mesh를 가리킵니다. 커밋 이후 현재 객체의 위치·회전·uuid를 읽을 수 있습니다.

### 소유자 일치

같은 속성을 props와 명령형 코드가 동시에 쓰면 갱신이 충돌할 수 있습니다. 어떤 경로가 해당 속성을 소유하는지 정합니다.

## 실습 준비

예제 화면의 실행 범위 안내를 먼저 확인하세요. 다음은 과제를 별도 프로젝트로 확장할 때의 준비 환경입니다. 별도 React Vite 프로젝트에서 JSX를 사용합니다. React와 @react-three/fiber의 호환 메이저 버전, Three.js 버전과 lockfile을 기록하세요. 이 과정은 WebGL 기반 안정 버전 API를 사용하며 alpha WebGPU API를 혼용하지 않습니다. 프레임 갱신은 useFrame과 ref로 처리합니다.

연결된 예제는 출발점입니다. 아래 과제 전체가 완성된 코드는 아니며 예제의 지원 범위를 넘는 작업은 별도 프로젝트에서 수행하세요.

## 실습 과제

1. src/InspectableBox.jsx의 mesh에 useRef를 연결하세요.
2. 버튼 입력을 받은 Effect에서 rotation.y를 변경하고 uuid를 기록하세요.
3. 동일 rotation을 props에서도 전달한 대조군과 결과를 비교하세요.

## 관찰할 변수

| 변수 | 기준 조건 | 바꿀 조건 | 예상할 변화·검증 가설 |
| --- | --- | --- | --- |
| 회전 소유자 | ref 한 경로 | ref와 props 두 경로 | 두 경로는 재렌더 때 값을 덮을 수 있다. |

표의 예상은 측정 결과가 아닙니다. 한 번에 한 조건만 바꾸고 실제 결과가 다르면 원인을 기록하세요.

## 완료 조건

- [ ] ref.current의 객체 타입과 uuid가 기록된다.
- [ ] 최종 구현은 rotation을 한 경로에서만 갱신한다.

## 자가 점검

1. ref가 null인 시점은 언제인가요?
2. React state와 Three.js 객체 속성을 모두 저장할 필요가 있나요?

## 공식 참고

- [R3F 객체와 자원 해제](https://r3f.docs.pmnd.rs/api/objects)
- [R3F Hooks](https://r3f.docs.pmnd.rs/api/hooks)

## 연결된 예제와 실행 범위

[예제 원본](../../../../../../src/labs/react-three-fiber-step-06/example.js) · [실행 환경과 제한](../../../../../examples.md)

실제 React Three Fiber Canvas 실험입니다. WebGL을 지원하는 브라우저가 필요합니다.


원본 코드·기록은 자동으로 덮어쓰지 않습니다. 기존 예제를 초기화할 때도 필기는 유지됩니다.

## 다음 학습

[이전: 재질과 조명](../05/README.md) · [다음: useFrame과 시간 기반 회전](../07/README.md)

## 실험 기록 — 직접 작성

### 목표

### 핵심 개념

### 바꾼 변수와 예상

### 실제 결과

### 배운 점

### 남은 질문
