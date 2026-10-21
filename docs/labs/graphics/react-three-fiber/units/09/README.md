# React Three Fiber · 09 카메라 조작과 projection 갱신

[시리즈 목차](../../README.md) · [전체 기술 지도](../../../../README.md)

단계: 3D 입력과 UI 상태 · 편집 가능한 예제 · 저장 ID: `react-three-fiber-step-09`

## 목표와 학습 후 역량

- 입력 fov와 camera.fov가 일치한다.
- 행렬 갱신 호출 전후 결과를 구분해 기록한다.

## 선수 지식

9단위는 8단위 결과물과 실험 기록을 이어 사용합니다.

## 핵심 개념과 설명

### 투영 설정

카메라 fov·near·far는 투영 행렬에 영향을 줍니다. 명령형으로 변경했다면 updateProjectionMatrix 호출이 필요할 수 있습니다.

### 관측 조건

카메라 이동은 모든 객체의 화면 위치를 바꿉니다. 객체 이동 실험과 별도로 기록해야 좌표 변화를 해석할 수 있습니다.

## 실습 준비

예제 화면의 실행 범위 안내를 먼저 확인하세요. 다음은 과제를 별도 프로젝트로 확장할 때의 준비 환경입니다. 별도 React Vite 프로젝트에서 JSX를 사용합니다. React와 @react-three/fiber의 호환 메이저 버전, Three.js 버전과 lockfile을 기록하세요. 이 과정은 WebGL 기반 안정 버전 API를 사용하며 alpha WebGPU API를 혼용하지 않습니다. 프레임 갱신은 useFrame과 ref로 처리합니다.

연결된 예제는 출발점입니다. 아래 과제 전체가 완성된 코드는 아니며, 예제의 지원 범위를 넘는 작업은 별도 프로젝트에서 수행하세요.

## 실습 과제

1. src/CameraRig.jsx에서 useThree로 camera를 읽으세요.
2. UI fov 값 변경 Effect에서 fov를 대입하고 updateProjectionMatrix를 호출하세요.
3. fov 40·70과 camera z 5·8을 한 번에 하나씩 바꿔 화면을 기록하세요.

## 관찰할 변수

| 변수 | 기준 조건 | 바꿀 조건 | 예상할 변화·검증 가설 |
| --- | --- | --- | --- |
| fov | 40 | 70 | 투영 갱신 후 같은 큐브가 더 작게 보인다. |

표의 예상은 측정 결과가 아닙니다. 한 번에 한 조건만 바꾸고 실제 결과가 다르면 원인을 기록하세요.

## 완료 조건

- [ ] 입력 fov와 camera.fov가 일치한다.
- [ ] 행렬 갱신 호출 전후 결과를 구분해 기록한다.

## 자가 점검

1. camera prop 갱신과 직접 대입은 어떤 경로가 다른가요?
2. near를 너무 크게 하면 무엇이 잘리나요?

## 공식 참고

- [R3F Hooks](https://r3f.docs.pmnd.rs/api/hooks)
- [R3F Canvas 설정](https://r3f.docs.pmnd.rs/api/canvas)

## 연결된 예제와 실행 범위

[예제 원본](../../../../../../src/labs/react-three-fiber-step-09/example.js) · [실행 환경과 제한](../../../../../examples.md)

실제 React Three Fiber Canvas 실험입니다. WebGL을 지원하는 브라우저가 필요합니다.


원본 코드·기록은 자동으로 덮어쓰지 않습니다. 기존 예제를 초기화할 때도 필기는 유지됩니다.

## 다음 학습

[이전: useThree의 범위와 선택](../08/README.md) · [다음: 포인터 교차와 선택](../10/README.md)

## 실험 기록 — 직접 작성

### 목표

### 핵심 개념

### 바꾼 변수와 예상

### 실제 결과

### 배운 점

### 남은 질문
