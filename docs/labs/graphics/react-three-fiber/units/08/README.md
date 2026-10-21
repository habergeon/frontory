# React Three Fiber · 08 useThree의 범위와 선택

[시리즈 목차](../../README.md) · [전체 기술 지도](../../../../README.md)

단계: 3D 입력과 UI 상태 · 문서 기반 직접 구현 · 저장 ID: `react-three-fiber-step-08`

## 목표와 학습 후 역량

- useThree 호출이 Canvas 자식 안에 있다.
- size와 viewport를 서로 다른 단위로 기록한다.

## 선수 지식

8단위는 7단위 결과물과 실험 기록을 이어 사용합니다.

## 핵심 개념과 설명

### Canvas Context

useThree는 Canvas 내부 컴포넌트에서만 사용할 수 있습니다. Canvas를 반환하는 부모에서 호출하면 아직 해당 Context가 없습니다.

### 선택 구독

selector로 필요한 상태만 읽으면 의존 범위가 명확해집니다. 카메라 내부 속성의 모든 명령형 변경이 자동 구독된다고 가정하지 않습니다.

## 실습 준비

별도 React Vite 프로젝트에서 JSX를 사용합니다. React와 @react-three/fiber의 호환 메이저 버전, Three.js 버전과 lockfile을 기록하세요. 이 과정은 WebGL 기반 안정 버전 API를 사용하며 alpha WebGPU API를 혼용하지 않습니다. 프레임 갱신은 useFrame과 ref로 처리합니다. Frontory 내장 실행 예제가 없는 확장 단위이며 아래 파일은 외부 실습 프로젝트에 작성합니다.

이 단위에는 내장 실행 예제가 없습니다. 아래 절차에 따라 별도 실습 파일을 만들고 실행 결과를 필기에 남기세요. 코드 파일은 작업 폴더에서 따로 보관하고 Frontory 필기는 JSON 또는 Markdown으로 백업하세요.

## 실습 과제

1. src/SceneInfo.jsx를 Canvas 자식으로 만들고 size·viewport를 읽으세요.
2. DOM 패널에 저빈도 보고 콜백으로 측정값을 표시하세요.
3. 부모 폭을 400에서 800으로 바꾸고 픽셀 size와 월드 viewport를 비교하세요.

## 관찰할 변수

| 변수 | 기준 조건 | 바꿀 조건 | 예상할 변화·검증 가설 |
| --- | --- | --- | --- |
| 부모 폭 | 400px | 800px | 픽셀 size와 카메라 기준 월드 범위가 각각 갱신된다. |

표의 예상은 측정 결과가 아닙니다. 한 번에 한 조건만 바꾸고 실제 결과가 다르면 원인을 기록하세요.

## 완료 조건

- [ ] useThree 호출이 Canvas 자식 안에 있다.
- [ ] size와 viewport를 서로 다른 단위로 기록한다.

## 자가 점검

1. size.width와 viewport.width는 같은 값인가요?
2. camera.position.x 변경을 selector가 자동 추적하나요?

## 공식 참고

- [R3F Hooks](https://r3f.docs.pmnd.rs/api/hooks)

## 연결된 예제와 실행 범위

문서와 필기를 제공합니다. 내장 실행 예제는 아직 제공하지 않습니다.

원본 코드·기록은 자동으로 덮어쓰지 않습니다. 기존 예제를 초기화할 때도 필기는 유지됩니다.

## 다음 학습

[이전: useFrame과 시간 기반 회전](../07/README.md) · [다음: 카메라 조작과 projection 갱신](../09/README.md)

## 실험 기록 — 직접 작성

### 목표

### 핵심 개념

### 바꾼 변수와 예상

### 실제 결과

### 배운 점

### 남은 질문
