# React Three Fiber · 03 args와 객체 재생성

[시리즈 목차](../../README.md) · [전체 기술 지도](../../../../README.md)

단계: 선언적 장면과 프레임 좌표 · 문서 기반 직접 구현 · 저장 ID: `react-three-fiber-step-03`

## 목표와 학습 후 역량

- scale 변경만으로 geometry uuid가 바뀌지 않는다.
- args 변경 전후 uuid를 기록한다.

## 선수 지식

3단위는 2단위 결과물과 실험 기록을 이어 사용합니다.

## 핵심 개념과 설명

### 생성자 인자

args는 Three.js 생성자 인자를 전달합니다. args가 바뀌면 해당 객체를 다시 만들 수 있으므로 단순 변환과 구분합니다.

### 속성 갱신

position·rotation·scale은 기존 객체의 변환 속성입니다. geometry 크기를 다시 만드는 것과 scale을 바꾸는 것은 비용이 다릅니다.

## 실습 준비

별도 React Vite 프로젝트에서 JSX를 사용합니다. React와 @react-three/fiber의 호환 메이저 버전, Three.js 버전과 lockfile을 기록하세요. 이 과정은 WebGL 기반 안정 버전 API를 사용하며 alpha WebGPU API를 혼용하지 않습니다. 프레임 갱신은 useFrame과 ref로 처리합니다. Frontory 내장 실행 예제가 없는 확장 단위이며 아래 파일은 외부 실습 프로젝트에 작성합니다.

이 단위에는 내장 실행 예제가 없습니다. 아래 절차에 따라 별도 실습 파일을 만들고 실행 결과를 필기에 남기세요. 코드 파일은 작업 폴더에서 따로 보관하고 Frontory 필기는 JSON 또는 Markdown으로 백업하세요.

## 실습 과제

1. src/Box.jsx에 boxGeometry args와 mesh scale을 각각 prop으로 받으세요.
2. geometry uuid를 Effect 로그로 기록하세요.
3. 폭 args 변경과 scale 변경을 각각 수행해 uuid와 화면을 비교하세요.

## 관찰할 변수

| 변수 | 기준 조건 | 바꿀 조건 | 예상할 변화·검증 가설 |
| --- | --- | --- | --- |
| 크기 변경 방식 | mesh scale | geometry args | args 변경에서 geometry 정체성이 달라진다. |

표의 예상은 측정 결과가 아닙니다. 한 번에 한 조건만 바꾸고 실제 결과가 다르면 원인을 기록하세요.

## 완료 조건

- [ ] scale 변경만으로 geometry uuid가 바뀌지 않는다.
- [ ] args 변경 전후 uuid를 기록한다.

## 자가 점검

1. render 안에서 new BoxGeometry를 계속 호출하면 무엇이 생기나요?
2. scale로 표현하면 안 되는 geometry 변경은 무엇인가요?

## 공식 참고

- [R3F 객체와 자원 해제](https://r3f.docs.pmnd.rs/api/objects)

## 연결된 예제와 실행 범위

문서와 필기를 제공합니다. 내장 실행 예제는 아직 제공하지 않습니다.

원본 코드·기록은 자동으로 덮어쓰지 않습니다. 기존 예제를 초기화할 때도 필기는 유지됩니다.

## 다음 학습

[이전: Canvas 크기와 카메라](../02/README.md) · [다음: group과 로컬 좌표](../04/README.md)

## 실험 기록 — 직접 작성

### 목표

### 핵심 개념

### 바꾼 변수와 예상

### 실제 결과

### 배운 점

### 남은 질문
