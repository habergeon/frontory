# React Three Fiber · 18 공유 geometry와 material

[시리즈 목차](../../README.md) · [전체 기술 지도](../../../../README.md)

단계: 모델·공유 자원·인스턴싱 · 편집 가능한 예제 · 저장 ID: `react-three-fiber-step-18`

## 목표와 학습 후 역량

- 36개 mesh의 geometry uuid가 같다.
- 전체 종료 때 소유자가 각 자원을 한 번 해제한다.

## 선수 지식

18단위는 17단위 결과물과 실험 기록을 이어 사용합니다.

## 핵심 개념과 설명

### 자원 공유

동일한 geometry와 material을 여러 mesh에 전달하면 중복 생성을 줄일 수 있습니다. transform은 mesh마다 독립적으로 유지됩니다.

### 해제 책임

공유 자원을 자식 하나가 해제하면 다른 소비자도 영향을 받습니다. dispose={null}을 사용한다면 마지막 소유자가 명시적으로 해제해야 합니다.

## 실습 준비

예제 화면의 실행 범위 안내를 먼저 확인하세요. 다음은 과제를 별도 프로젝트로 확장할 때의 준비 환경입니다. 별도 React Vite 프로젝트에서 JSX를 사용합니다. React와 @react-three/fiber의 호환 메이저 버전, Three.js 버전과 lockfile을 기록하세요. 이 과정은 WebGL 기반 안정 버전 API를 사용하며 alpha WebGPU API를 혼용하지 않습니다. 프레임 갱신은 useFrame과 ref로 처리합니다.

연결된 예제는 출발점입니다. 아래 과제 전체가 완성된 코드는 아니며, 예제의 지원 범위를 넘는 작업은 별도 프로젝트에서 수행하세요.

## 실습 과제

1. src/SharedGrid.jsx에서 geometry와 material을 소유 컴포넌트에서 한 번 만드세요.
2. 36개 mesh에 같은 참조를 전달하고 자식 자동 해제 정책을 명시하세요.
3. mesh 하나 제거와 전체 grid 제거를 나눠 uuid·dispose 로그를 기록하세요.

## 관찰할 변수

| 변수 | 기준 조건 | 바꿀 조건 | 예상할 변화·검증 가설 |
| --- | --- | --- | --- |
| 자원 생성 | mesh마다 생성 | 상위에서 한 번 공유 | 36개 mesh가 geometry·material 각 1개를 참조한다. |

표의 예상은 측정 결과가 아닙니다. 한 번에 한 조건만 바꾸고 실제 결과가 다르면 원인을 기록하세요.

## 완료 조건

- [ ] 36개 mesh의 geometry uuid가 같다.
- [ ] 전체 종료 때 소유자가 각 자원을 한 번 해제한다.

## 자가 점검

1. useMemo는 영구 수명 저장소로 보장되나요?
2. dispose=null을 넣고 cleanup을 생략하면 무엇이 남나요?

## 공식 참고

- [R3F 객체와 자원 해제](https://r3f.docs.pmnd.rs/api/objects)
- [R3F 성능 확장과 demand 렌더링](https://r3f.docs.pmnd.rs/advanced/scaling-performance)

## 연결된 예제와 실행 범위

[예제 원본](../../../../../../src/labs/react-three-fiber-step-18/example.js) · [실행 환경과 제한](../../../../../examples.md)

실제 React Three Fiber Canvas 실험입니다. WebGL을 지원하는 브라우저가 필요합니다.


원본 코드·기록은 자동으로 덮어쓰지 않습니다. 기존 예제를 초기화할 때도 필기는 유지됩니다.

## 다음 학습

[이전: 텍스처 입력과 갱신](../17/README.md) · [다음: 프레임 중 할당 줄이기](../19/README.md)

## 실험 기록 — 직접 작성

### 목표

### 핵심 개념

### 바꾼 변수와 예상

### 실제 결과

### 배운 점

### 남은 질문
