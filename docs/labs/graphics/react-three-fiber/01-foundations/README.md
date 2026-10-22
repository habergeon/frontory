# React Three Fiber · 01 선언적 장면

[시리즈 목차](../README.md) · [전체 기술 지도](../../../README.md)

단계: 선언적 장면과 프레임 좌표 · 편집 가능한 예제 · 저장 ID: `react-three-fiber-01`

## 목표와 학습 후 역량

- 큐브·카메라·조명의 대응 코드가 기록된다.
- scale 변경 뒤 큐브 크기가 달라진다.

## 선수 지식

React state·ref·Effect와 cleanup, Three.js geometry·material·카메라, 벡터와 delta.

## 핵심 개념과 설명

### React renderer

R3F는 Three.js 객체를 React 트리로 표현합니다. Canvas 내부의 mesh는 DOM 요소가 아니며 별도의 renderer가 관리합니다.

### 객체 소유권

JSX로 선언한 geometry와 material은 장면 트리에 연결됩니다. 외부에서 만든 객체를 전달하는 경우 수명 책임을 별도로 확인해야 합니다.

## 실습 준비

별도 React Vite 프로젝트에서 JSX를 사용합니다. React와 @react-three/fiber의 호환 메이저 버전, Three.js 버전과 lockfile을 기록하세요. 이 과정은 WebGL 기반 안정 버전 API를 사용하며 alpha WebGPU API를 혼용하지 않습니다. 프레임 갱신은 useFrame과 ref로 처리합니다. 기존 react-three-fiber-01 미리보기는 출발점입니다. 본문의 확장 결과물은 별도 프로젝트에서 구현합니다.

연결된 예제는 출발점입니다. 아래 과제 전체가 완성된 코드는 아니며 예제의 지원 범위를 넘는 작업은 별도 프로젝트에서 수행하세요.

## 실습 과제

1. 외부 React Vite 프로젝트에 호환되는 React·Three.js·@react-three/fiber 버전을 설치하고 기록하세요.
2. src/Scene.jsx의 Canvas 안에 mesh·boxGeometry·meshStandardMaterial·조명을 선언하세요.
3. 기존 명령형 큐브의 생성·추가·제거 코드와 JSX를 notes/day01.md에서 대응시키세요.

## 관찰할 변수

| 변수 | 기준 조건 | 바꿀 조건 | 예상할 변화·검증 가설 |
| --- | --- | --- | --- |
| scale prop | 1 | 1.5 | 같은 geometry를 사용하는 큐브의 표시 크기가 커진다. |

표의 예상은 측정 결과가 아닙니다. 한 번에 한 조건만 바꾸고 실제 결과가 다르면 원인을 기록하세요.

## 완료 조건

- [ ] 큐브·카메라·조명의 대응 코드가 기록된다.
- [ ] scale 변경 뒤 큐브 크기가 달라진다.

## 자가 점검

1. Canvas 안에 일반 div를 넣으면 왜 문제가 되나요?
2. mesh 선언과 geometry 생성은 어떤 객체를 만들나요?

## 공식 참고

- [R3F 시작과 React 버전 호환](https://r3f.docs.pmnd.rs/getting-started/introduction)
- [R3F 객체와 자원 해제](https://r3f.docs.pmnd.rs/api/objects)

## 연결된 예제와 실행 범위

[예제 원본](../../../../../src/labs/react-three-fiber-01/example.js) · [실행 환경과 제한](../../../../examples.md)

원본 코드·기록은 자동으로 덮어쓰지 않습니다. 기존 예제를 초기화할 때도 필기는 유지됩니다.

## 다음 학습

[다음: Canvas 크기와 카메라](../units/02/README.md)

## 실험 기록 — 직접 작성

### 목표

### 핵심 개념

### 바꾼 변수와 예상

### 실제 결과

### 배운 점

### 남은 질문
