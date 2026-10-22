# React Three Fiber · 07 useFrame과 시간 기반 회전

[시리즈 목차](../../README.md) · [전체 기술 지도](../../../../README.md)

단계: 선언적 장면과 프레임 좌표 · 편집 가능한 예제 · 저장 ID: `react-three-fiber-step-07`

## 목표와 학습 후 역량

- 회전량이 speed × 누적 delta와 허용 오차 안에서 맞는다.
- 프레임 콜백에 React setState가 없다.

## 선수 지식

7단위는 6단위 결과물과 실험 기록을 이어 사용합니다.

## 핵심 개념과 설명

### 프레임 콜백

useFrame은 Canvas 렌더 루프에 참여합니다. 컴포넌트가 제거되면 등록도 해제되므로 별도 RAF를 겹쳐 만들지 않습니다.

### delta

delta는 지난 프레임과의 시간 차이입니다. 각도에 속도와 delta를 곱하면 프레임 수에 따른 속도 차이를 줄입니다.

## 실습 준비

예제 화면의 실행 범위 안내를 먼저 확인하세요. 다음은 과제를 별도 프로젝트로 확장할 때의 준비 환경입니다. 별도 React Vite 프로젝트에서 JSX를 사용합니다. React와 @react-three/fiber의 호환 메이저 버전, Three.js 버전과 lockfile을 기록하세요. 이 과정은 WebGL 기반 안정 버전 API를 사용하며 alpha WebGPU API를 혼용하지 않습니다. 프레임 갱신은 useFrame과 ref로 처리합니다.

연결된 예제는 출발점입니다. 아래 과제 전체가 완성된 코드는 아니며 예제의 지원 범위를 넘는 작업은 별도 프로젝트에서 수행하세요.

## 실습 과제

1. src/RotatingBox.jsx에서 useFrame((_state,delta) => ...)로 ref 회전을 갱신하세요.
2. speed prop을 0·1·2로 전달하고 React setState는 프레임 안에서 쓰지 마세요.
3. 누적 delta와 회전량을 5초 구간으로 기록하세요.

## 관찰할 변수

| 변수 | 기준 조건 | 바꿀 조건 | 예상할 변화·검증 가설 |
| --- | --- | --- | --- |
| speed | 1 rad/s | 2 rad/s | 같은 누적 delta에서 회전량이 두 배다. |

표의 예상은 측정 결과가 아닙니다. 한 번에 한 조건만 바꾸고 실제 결과가 다르면 원인을 기록하세요.

## 완료 조건

- [ ] 회전량이 speed × 누적 delta와 허용 오차 안에서 맞는다.
- [ ] 프레임 콜백에 React setState가 없다.

## 자가 점검

1. 매 프레임 0.01을 더하면 어떤 기기 차이가 생기나요?
2. 탭 복귀의 큰 delta를 제한하면 어떤 의미가 달라지나요?

## 공식 참고

- [R3F Hooks](https://r3f.docs.pmnd.rs/api/hooks)
- [R3F 성능 함정](https://r3f.docs.pmnd.rs/advanced/pitfalls)

## 연결된 예제와 실행 범위

[예제 원본](../../../../../../src/labs/react-three-fiber-step-07/example.js) · [실행 환경과 제한](../../../../../examples.md)

실제 React Three Fiber Canvas 실험입니다. WebGL을 지원하는 브라우저가 필요합니다.


원본 코드·기록은 자동으로 덮어쓰지 않습니다. 기존 예제를 초기화할 때도 필기는 유지됩니다.

## 다음 학습

[이전: ref로 Three.js 객체 읽기](../06/README.md) · [다음: useThree의 범위와 선택](../08/README.md)

## 실험 기록 — 직접 작성

### 목표

### 핵심 개념

### 바꾼 변수와 예상

### 실제 결과

### 배운 점

### 남은 질문
