# 4주 학습 로드맵

React / TypeScript 경험을 바탕으로 **Three.js → GLSL → Gaussian Splatting → React 통합 뷰어와 성능** 순서로 공부합니다. Day 1~28 주제를 각각 작은 학습 단위로 연결했습니다. Day는 학습 순서이며 하루 2시간 같은 고정 시간이나 한 달 뒤 실무 수준을 보장하지 않습니다. 완료 조건을 확인하고 다음 단위로 이동하세요.

현재 **28개 단위 모두 문서와 연결 예제**를 제공합니다. GS 단위의 CPU 교육용 시각화와 모의 로딩 등 예제별 구현 범위는 [실행 환경과 제한](../../../examples.md)을 확인하세요. 예제가 존재하는 것과 본인이 학습을 마친 것은 다릅니다. 완료 체크는 직접 실험한 뒤 기록합니다.

## 시리즈 목표와 통합 결과물

Scene·Camera·Renderer의 관계를 설명하고 좌표·셰이더·GS 표현을 작은 실험으로 비교합니다. 마지막 단계에서는 UI 상태와 렌더 루프를 분리한 뷰어를 만들고 입력·리사이즈·정리·실패 경로를 검증합니다. 기준 환경과 변경 조건을 기록해 성능 가설을 검증하고 재현 방법을 문서로 남기는 것이 목표입니다.

네 단계의 제출물은 인터랙티브 장면, 변수 조절 셰이더, 제한이 명시된 GS 뷰어, 통합 뷰어와 측정 기록입니다. 결과물의 완성 여부는 각 단위의 완료 조건으로 판단합니다. 개별 기술을 더 깊게 공부하려면 [Three.js](../threejs/README.md), [GLSL](../../shader/glsl/README.md), [Gaussian Splatting](../gaussian-splatting/README.md)의 28단위 경로로 이어가세요.

## 학습 순서와 원문 대응

| 주차 | 원문 Day / 학습 단위                                                 | 얻을 역량                                                            | 실행 예제      |
| ---- | -------------------------------------------------------------------- | -------------------------------------------------------------------- | -------------- |
| 1주  | [01 · WebGL·GPU와 첫 화면](01-scene/README.md)                       | CPU와 GPU의 역할, 렌더링 파이프라인을 첫 장면 코드에 연결한다.       | 제공           |
| 1주  | [02 · Scene·Camera·Renderer](02-camera/README.md)                    | 카메라 위치와 시야각의 효과를 구분한다.                              | 연결 예제 제공 |
| 1주  | [03 · Geometry·Material·Mesh](03-mesh/README.md)                     | 형상과 표면 표현을 분리하여 실험한다.                                | 연결 예제 제공 |
| 1주  | [04 · 좌표계·Vector3·Matrix4](04-coordinates/README.md)              | local/world 좌표와 변환 순서를 예측한다.                             | 연결 예제 제공 |
| 1주  | [05 · Light·Shadow·Texture](05-light/README.md)                      | 빛·그림자·텍스처가 화면에 기여하는 경로를 구분한다.                  | 연결 예제 제공 |
| 1주  | [06 · Raycaster·OrbitControls](06-interaction/README.md)             | 포인터를 공간 광선으로 바꾸고 카메라 조작과 선택을 구분한다.         | 연결 예제 제공 |
| 1주  | [07 · 인터랙티브 장면 복습](07-scene-review/README.md)               | 카메라·선택·리사이즈·정리를 하나의 작은 장면으로 통합한다.           | 연결 예제 제공 |
| 2주  | [08 · Vertex·Fragment shader](08-shader-stages/README.md)            | 두 shader 단계의 입력과 출력을 구분한다.                             | 연결 예제 제공 |
| 2주  | [09 · GLSL 문법과 색상](09-glsl-color/README.md)                     | GLSL 타입·벡터 연산으로 색을 만들고 컴파일 오류를 수정한다.          | 연결 예제 제공 |
| 2주  | [10 · Uniform·Attribute·Varying와 시간](10-shader-data/README.md)    | JavaScript와 shader 사이 데이터 경로를 설명하고 시간 변화를 만든다.  | 연결 예제 제공 |
| 2주  | [11 · UV와 Texture Sampling](11-uv/README.md)                        | 표면 UV와 화면 좌표를 구분하고 샘플링의 의미를 설명한다.             | 연결 예제 제공 |
| 2주  | [12 · Noise·Sin·Cos 물결과 왜곡](12-waves/README.md)                 | 주기 함수와 noise의 차이를 설명하고 한 변수씩 파동을 실험한다.       | 연결 예제 제공 |
| 2주  | [13 · ShaderMaterial 통합](13-shader-material/README.md)             | 커스텀 shader의 입력·수명·오류를 Three.js 장면에 연결한다.           | 연결 예제 제공 |
| 2주  | [14 · 인터랙티브 셰이더 복습](14-shader-review/README.md)            | UI 입력과 uniform을 연결한 작은 효과를 완성하고 설명한다.            | 연결 예제 제공 |
| 3주  | [15 · NeRF와 3DGS 비교](15-nerf-gs/README.md)                        | 두 표현의 입력·표현·렌더링 차이를 설명한다.                          | 연결 예제 제공 |
| 3주  | [16 · Gaussian 위치·크기·회전·불투명도](16-gaussian/README.md)       | 가우시안의 공간 파라미터를 그림과 API 이름으로 연결한다.             | 연결 예제 제공 |
| 3주  | [17 · Spherical Harmonics와 시점별 색상](17-sh/README.md)            | 고정 RGB와 방향 의존 색 표현의 차이를 설명한다.                      | 연결 예제 제공 |
| 3주  | [18 · Projection·Sorting·Alpha Blending](18-gs-projection/README.md) | 화면 footprint와 순서 의존 합성을 설명한다.                          | 연결 예제 제공 |
| 3주  | [19 · .ply·.splat 로딩](19-gs-loading/README.md)                     | 입력 데이터 명세를 확인하고 정상·실패 로딩을 구현한다.               | 연결 예제 제공 |
| 3주  | [20 · Three.js+GS 카메라와 인터랙션](20-gs-interaction/README.md)    | GS의 좌표·스케일·선택 의미를 장면 조작에 연결한다.                   | 연결 예제 제공 |
| 3주  | [21 · GS 뷰어 복습과 후보 비교](21-gs-review/README.md)              | 작은 GS 뷰어의 범위와 라이브러리 선택 근거를 정리한다.               | 연결 예제 제공 |
| 4주  | [22 · React+Three.js 컴포넌트 설계](22-react-viewer/README.md)       | UI 상태와 매 프레임 장면 상태를 나누고 실습 계약을 만든다.           | 연결 예제 제공 |
| 4주  | [23 · 로딩 UI와 진행률](23-loading-ui/README.md)                     | 실제 단계와 근거가 있는 진행 상태를 표시한다.                        | 연결 예제 제공 |
| 4주  | [24 · 카메라 이동·회전·줌](24-camera-controls/README.md)             | 조작 범위와 초기화 동작을 일관되게 만든다.                           | 연결 예제 제공 |
| 4주  | [25 · 마커와 Raycasting](25-markers/README.md)                       | 선택 좌표의 의미를 정하고 마커를 배치한다.                           | 연결 예제 제공 |
| 4주  | [26 · FPS·Draw Calls·메모리 분석](26-performance/README.md)          | 재현 가능한 조건에서 성능 기준선을 기록한다.                         | 연결 예제 제공 |
| 4주  | [27 · 해상도·데이터 최적화](27-optimization/README.md)               | 한 변수만 바꾼 전후 비교로 병목 가설을 검증한다.                     | 연결 예제 제공 |
| 4주  | [28 · 문서화와 선택적 배포 계획](28-review/README.md)                | 재현 가능한 결과와 남은 질문을 정리하고 배포 조건을 문서로 검토한다. | 연결 예제 제공 |

## 진행 방법

1. 선수 지식을 확인하고 개념 설명을 읽습니다.
2. 과제에서 바꿀 변수 하나와 예상 결과를 필기에 먼저 적습니다.
3. 실행 후 실제 결과와 차이를 기록합니다. 실측하지 않은 수치는 쓰지 않습니다.
4. 완료 조건과 자가 점검 질문을 통해 설명 가능한지 확인합니다.
5. 필기를 Markdown으로 다운로드하고 해당 실습 문서에 직접 반영합니다.

화면의 학습 단위 선택과 문서 열람은 이 28개 문서와 연결됩니다. 원본은 docs/labs에 있으며 화면에서 별도의 축약본으로 대체하지 않습니다.

[학습 화면 사용법과 저장](../../../learning-workspace.md) · [성능 기록](../../../performance.md) · [설계](../../../design/learning-workspace.md) · [구현 계획](../../../plans/learning-workspace.md)

## GS 후보와 범위

원문 후보 **GaussianSplats3D, huggingface/gsplat.js**는 [21번 비교 단위](21-gs-review/README.md)에 남겼습니다. Spark는 Three.js 장면과 변환·수명을 연결하여 배우기 좋은 후보로 우선 검토합니다. 실측 없이 더 빠르다고 결론 내리지 않으며 아직 설치하지 않았습니다. 도입할 때 지원 형식·SH·Three.js 호환성·라이선스·선택 API를 비교합니다.

일반 PLY가 항상 GS 데이터는 아닙니다. GS picking은 mesh 삼각형 raycasting과 다를 수 있습니다. renderer.info는 전체 GPU VRAM 측정이 아닙니다. 대형 데이터 수집, 모델 학습, 회사 데이터 사용은 이번 범위 밖입니다. Day 28의 배포는 **계획 문서만 작성**하며 공개 배포나 push를 실행하지 않습니다.

## 실험 기록 — 직접 작성

### 목표

<!-- 이번에 답하려는 질문 -->

### 핵심 개념

<!-- 자기 말로 설명 -->

### 바꾼 변수와 예상

<!-- 기준값 → 변경값 / 고정 조건 / 실행 전 예상 -->

### 실제 결과

<!-- 실제 관찰 내용, 화면, 측정값. 실행 전에는 비워 둡니다. -->

### 배운 점

<!-- 예상과 실제의 차이, 이유 -->

### 남은 질문

<!-- 다음 실험으로 확인할 것 -->

## 원문과 공식 출발점

- [Vite](https://vite.dev/guide/)
- [Three.js 설치](https://threejs.org/manual/pages/installation.html)
- [Spark](https://sparkjs.dev/docs/)
