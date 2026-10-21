# React Three Fiber · 05 재질과 조명

[시리즈 목차](../../README.md) · [전체 기술 지도](../../../../README.md)

단계: 선언적 장면과 프레임 좌표 · 문서 기반 직접 구현 · 저장 ID: `react-three-fiber-step-05`

## 목표와 학습 후 역량

- 두 재질의 조명 반응 차이를 기록한다.
- 동일 카메라에서 roughness 두 조건도 구분한다.

## 선수 지식

5단위는 4단위 결과물과 실험 기록을 이어 사용합니다.

## 핵심 개념과 설명

### 조명 의존

MeshStandardMaterial은 조명의 영향을 받습니다. MeshBasicMaterial은 조명 없이도 기본 색을 보여 줍니다.

### 표면 입력

roughness와 metalness는 표면 반응을 바꿉니다. 조명·카메라를 고정해야 재질 변수의 영향을 비교할 수 있습니다.

## 실습 준비

별도 React Vite 프로젝트에서 JSX를 사용합니다. React와 @react-three/fiber의 호환 메이저 버전, Three.js 버전과 lockfile을 기록하세요. 이 과정은 WebGL 기반 안정 버전 API를 사용하며 alpha WebGPU API를 혼용하지 않습니다. 프레임 갱신은 useFrame과 ref로 처리합니다. Frontory 내장 실행 예제가 없는 확장 단위이며 아래 파일은 외부 실습 프로젝트에 작성합니다.

이 단위에는 내장 실행 예제가 없습니다. 아래 절차에 따라 별도 실습 파일을 만들고 실행 결과를 필기에 남기세요. 코드 파일은 작업 폴더에서 따로 보관하고 Frontory 필기는 JSON 또는 Markdown으로 백업하세요.

## 실습 과제

1. src/MaterialStudy.jsx에 같은 geometry의 두 mesh를 배치하세요.
2. 한쪽은 basic·다른 쪽은 standard material을 사용하세요.
3. directionalLight intensity를 0과 3으로 바꾸고 두 표면을 비교하세요.

## 관찰할 변수

| 변수 | 기준 조건 | 바꿀 조건 | 예상할 변화·검증 가설 |
| --- | --- | --- | --- |
| 조명 intensity | 0 | 3 | standard 표면은 달라지고 basic 색은 조명에 직접 의존하지 않는다. |

표의 예상은 측정 결과가 아닙니다. 한 번에 한 조건만 바꾸고 실제 결과가 다르면 원인을 기록하세요.

## 완료 조건

- [ ] 두 재질의 조명 반응 차이를 기록한다.
- [ ] 동일 카메라에서 roughness 두 조건도 구분한다.

## 자가 점검

1. standard가 검게 보이면 재질 색만 고쳐야 하나요?
2. metalness를 올렸는데 반사가 안 보이면 무엇을 확인하나요?

## 공식 참고

- [R3F 객체와 자원 해제](https://r3f.docs.pmnd.rs/api/objects)

## 연결된 예제와 실행 범위

문서와 필기를 제공합니다. 내장 실행 예제는 아직 제공하지 않습니다.

원본 코드·기록은 자동으로 덮어쓰지 않습니다. 기존 예제를 초기화할 때도 필기는 유지됩니다.

## 다음 학습

[이전: group과 로컬 좌표](../04/README.md) · [다음: ref로 Three.js 객체 읽기](../06/README.md)

## 실험 기록 — 직접 작성

### 목표

### 핵심 개념

### 바꾼 변수와 예상

### 실제 결과

### 배운 점

### 남은 질문
