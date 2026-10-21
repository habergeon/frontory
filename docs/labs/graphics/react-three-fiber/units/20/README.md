# React Three Fiber · 20 instancedMesh로 반복 객체 그리기

[시리즈 목차](../../README.md) · [전체 기술 지도](../../../../README.md)

단계: 모델·공유 자원·인스턴싱 · 문서 기반 직접 구현 · 저장 ID: `react-three-fiber-step-20`

## 목표와 학습 후 역량

- 100개 객체가 같은 배치로 보인다.
- 두 표현의 draw call을 동일 패스 조건에서 기록한다.

## 선수 지식

20단위는 19단위 결과물과 실험 기록을 이어 사용합니다.

## 핵심 개념과 설명

### 인스턴싱

InstancedMesh는 같은 geometry·material의 여러 변환을 한 객체로 묶습니다. 개별 mesh와 이벤트·업데이트 방식이 달라집니다.

### 행렬 업로드

setMatrixAt 후 instanceMatrix.needsUpdate로 변경을 알립니다. CPU 배열 변경과 GPU 반영을 구분합니다.

## 실습 준비

별도 React Vite 프로젝트에서 JSX를 사용합니다. React와 @react-three/fiber의 호환 메이저 버전, Three.js 버전과 lockfile을 기록하세요. 이 과정은 WebGL 기반 안정 버전 API를 사용하며 alpha WebGPU API를 혼용하지 않습니다. 프레임 갱신은 useFrame과 ref로 처리합니다. Frontory 내장 실행 예제가 없는 확장 단위이며 아래 파일은 외부 실습 프로젝트에 작성합니다.

이 단위에는 내장 실행 예제가 없습니다. 아래 절차에 따라 별도 실습 파일을 만들고 실행 결과를 필기에 남기세요. 코드 파일은 작업 폴더에서 따로 보관하고 Frontory 필기는 JSON 또는 Markdown으로 백업하세요.

## 실습 과제

1. src/InstancedGrid.jsx에 instancedMesh와 100개 위치를 만드세요.
2. 임시 Object3D로 행렬을 계산해 setMatrixAt 후 needsUpdate를 설정하세요.
3. 동일 100개 개별 mesh와 renderer.info.render.calls를 비교하세요.

## 관찰할 변수

| 변수 | 기준 조건 | 바꿀 조건 | 예상할 변화·검증 가설 |
| --- | --- | --- | --- |
| 표현 | 개별 mesh 100개 | instancedMesh 100개 | 동일 자원 조건에서 draw call 수가 줄어들 수 있다. |

표의 예상은 측정 결과가 아닙니다. 한 번에 한 조건만 바꾸고 실제 결과가 다르면 원인을 기록하세요.

## 완료 조건

- [ ] 100개 객체가 같은 배치로 보인다.
- [ ] 두 표현의 draw call을 동일 패스 조건에서 기록한다.

## 자가 점검

1. 재질이 모두 다르면 하나의 instancedMesh로 묶기 쉬운가요?
2. needsUpdate를 빼면 CPU 변경이 화면에 나타나나요?

## 공식 참고

- [R3F 성능 확장과 demand 렌더링](https://r3f.docs.pmnd.rs/advanced/scaling-performance)

## 연결된 예제와 실행 범위

문서와 필기를 제공합니다. 내장 실행 예제는 아직 제공하지 않습니다.

원본 코드·기록은 자동으로 덮어쓰지 않습니다. 기존 예제를 초기화할 때도 필기는 유지됩니다.

## 다음 학습

[이전: 프레임 중 할당 줄이기](../19/README.md) · [다음: 인스턴스 선택과 경계](../21/README.md)

## 실험 기록 — 직접 작성

### 목표

### 핵심 개념

### 바꾼 변수와 예상

### 실제 결과

### 배운 점

### 남은 질문
