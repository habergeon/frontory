# React Three Fiber · 15 모델 로딩과 Suspense

[시리즈 목차](../../README.md) · [전체 기술 지도](../../../../README.md)

단계: 모델·공유 자원·인스턴싱 · 외부 실행 예제 · 미리보기 안내 · 저장 ID: `react-three-fiber-step-15`

## 목표와 학습 후 역량

- 정상 URL에서 모델이 표시된다.
- 잘못된 URL에서 흰 화면 대신 오류 안내가 있다.

## 선수 지식

15단위는 14단위 결과물과 실험 기록을 이어 사용합니다.

## 핵심 개념과 설명

### 로더

useLoader는 로더와 URL로 자원을 읽고 캐시합니다. 같은 URL의 결과를 공유할 수 있으므로 소유권을 확인해야 합니다.

### 대기와 실패

Suspense는 로딩 중 대체 화면을 표시합니다. 로딩 실패는 별도의 오류 경계와 복구 동작으로 처리합니다.

## 실습 준비

예제 화면의 실행 범위 안내를 먼저 확인하세요. 다음은 과제를 별도 프로젝트로 확장할 때의 준비 환경입니다. 별도 React Vite 프로젝트에서 JSX를 사용합니다. React와 @react-three/fiber의 호환 메이저 버전, Three.js 버전과 lockfile을 기록하세요. 이 과정은 WebGL 기반 안정 버전 API를 사용하며 alpha WebGPU API를 혼용하지 않습니다. 프레임 갱신은 useFrame과 ref로 처리합니다.

연결된 예제는 출발점입니다. 아래 과제 전체가 완성된 코드는 아니며 예제의 지원 범위를 넘는 작업은 별도 프로젝트에서 수행하세요.

## 실습 과제

1. public/models에 사용 권한을 확인한 작은 GLB와 출처 기록을 두세요.
2. src/Model.jsx에서 useLoader(GLTFLoader,url)와 primitive를 사용하세요.
3. Suspense 대체 장면과 Canvas 밖 오류 경계를 두고 정상·없는 URL을 시험하세요.

## 관찰할 변수

| 변수     | 기준 조건 | 바꿀 조건 | 예상할 변화·검증 가설                       |
| -------- | --------- | --------- | ------------------------------------------- |
| 모델 URL | 유효 GLB  | 없는 GLB  | 실패 안내가 나오고 다른 UI 조작은 가능하다. |

표의 예상은 측정 결과가 아닙니다. 한 번에 한 조건만 바꾸고 실제 결과가 다르면 원인을 기록하세요.

## 완료 조건

- [ ] 정상 URL에서 모델이 표시된다.
- [ ] 잘못된 URL에서 흰 화면 대신 오류 안내가 있다.

## 자가 점검

1. Suspense fallback이 로딩 오류도 자동 처리하나요?
2. URL 캐시를 공유할 때 dispose를 누가 해야 하나요?

## 공식 참고

- [R3F 모델 로딩](https://r3f.docs.pmnd.rs/tutorials/loading-models)
- [R3F Hooks](https://r3f.docs.pmnd.rs/api/hooks)

## 연결된 예제와 실행 범위

[예제 원본](../../../../../../src/labs/react-three-fiber-step-15/example.js) · [실행 환경과 제한](../../../../../examples.md)

미리보기는 Three ObjectLoader의 실제 JSON 모델 로딩입니다. GLB·Suspense·오류 경계 실험은 외부 App.jsx와 유효한 /model.glb가 필요합니다.

- [App.jsx](../../../../../../src/labs/react-three-fiber-step-15/App.jsx)

원본 코드·기록은 자동으로 덮어쓰지 않습니다. 기존 예제를 초기화할 때도 필기는 유지됩니다.

## 다음 학습

[이전: 프레임과 이벤트](../../02-experiments/README.md) · [다음: 캐시 모델의 복제와 공유](../16/README.md)

## 실험 기록 — 직접 작성

### 목표

### 핵심 개념

### 바꾼 변수와 예상

### 실제 결과

### 배운 점

### 남은 질문
