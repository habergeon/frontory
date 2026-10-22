# 학습 단위별 예제 안내

644개 학습 단위에 원본 예제를 연결합니다. 아래 표는 기존 94개 예제이며 [추가 550개 예제와 실행 범위](examples-expanded.md)는 별도 목록에서 확인하세요. 기존 01·02·03 저장 ID는 확장된 순서의 1·14·28번째에 유지됩니다(WebGL은 기존 순서 유지).

연결된 예제의 JS/TS 코드를 편집하면 실제 미리보기에 반영됩니다. HTML·CSS·GLSL·WGSL 문자열은 해당 브라우저 API에서 처리하며 Monaco JS/TS 진단과 별개입니다. 예제가 있다는 사실은 실습 과제나 사용자의 학습 완료를 의미하지 않습니다.

기존 저장 코드·필기를 자동 덮어쓰지 않습니다. 새 예제를 사용하려면 JSON 백업 후 **원본 코드로**를 선택하세요. 필기는 보존됩니다.

## 실행 범위

- React는 createElement, Vue는 h 렌더 함수로 실행합니다. JSX/SFC 컴파일러는 내장하지 않습니다.
- Svelte는 store와 DOM 어댑터로 실행합니다. 확장 단위에는 별도 프로젝트에서 컴파일하는 실제 .svelte 파일을 제공합니다.
- WebAssembly 02·03은 실제 컴파일된 작은 모듈과 Node 벤치마크를 함께 제공합니다. iframe의 CSP를 완화하지 않습니다.
- Playwright 28단위는 별도 Node 테스트 환경용 소스입니다. 화면에서 테스트 통과를 주장하지 않습니다.
- GS 로더는 1 MiB·512개 이하 .splat/ASCII GS PLY용 CPU 교육 뷰어입니다. 일반 PLY는 GS 데이터가 아닐 수 있습니다. Spark 및 대형 데이터 로딩은 포함하지 않습니다.
- WebGPU/WGSL/OffscreenCanvas는 브라우저 지원 여부를 확인합니다. 실제 성능은 각 환경에서 측정하고 renderer.info를 총 GPU VRAM으로 해석하지 않습니다.

## 기존 94개 연결 목록

| 시리즈 | 단위 | 예제/범위 |
| --- | --- | --- |
| webgl | [1. WebGL·GPU와 첫 화면](labs/graphics/webgl/01-scene/README.md) | [01-scene](../src/labs/01-scene/example.js) — 연결된 원본 코드를 Monaco에서 편집하면 검사 후 sandbox 미리보기에 반영됩니다. 확장 과제와 완료 조건은 직접 수행하고 결과를 기록하세요. |
| webgl | [2. Scene·Camera·Renderer](labs/graphics/webgl/02-camera/README.md) | [02-camera](../src/labs/02-camera/example.js) — 연결된 원본 코드를 Monaco에서 편집하면 검사 후 sandbox 미리보기에 반영됩니다. 확장 과제와 완료 조건은 직접 수행하고 결과를 기록하세요. |
| webgl | [3. Geometry·Material·Mesh](labs/graphics/webgl/03-mesh/README.md) | [03-mesh](../src/labs/03-mesh/example.js) — 연결된 원본 코드를 Monaco에서 편집하면 검사 후 sandbox 미리보기에 반영됩니다. 확장 과제와 완료 조건은 직접 수행하고 결과를 기록하세요. |
| webgl | [4. 좌표계·Vector3·Matrix4](labs/graphics/webgl/04-coordinates/README.md) | [04-coordinates](../src/labs/04-coordinates/example.js) — 연결된 원본 코드를 Monaco에서 편집하면 검사 후 sandbox 미리보기에 반영됩니다. 확장 과제와 완료 조건은 직접 수행하고 결과를 기록하세요. |
| webgl | [5. Light·Shadow·Texture](labs/graphics/webgl/05-light/README.md) | [05-light](../src/labs/05-light/example.js) — 연결된 원본 코드를 Monaco에서 편집하면 검사 후 sandbox 미리보기에 반영됩니다. 확장 과제와 완료 조건은 직접 수행하고 결과를 기록하세요. |
| webgl | [6. Raycaster·OrbitControls](labs/graphics/webgl/06-interaction/README.md) | [06-interaction](../src/labs/06-interaction/example.js) — 연결된 원본 코드를 Monaco에서 편집하면 검사 후 sandbox 미리보기에 반영됩니다. 확장 과제와 완료 조건은 직접 수행하고 결과를 기록하세요. |
| webgl | [7. 인터랙티브 장면 복습](labs/graphics/webgl/07-scene-review/README.md) | [07-scene-review](../src/labs/07-scene-review/example.js) — 연결된 원본 코드를 Monaco에서 편집하면 검사 후 sandbox 미리보기에 반영됩니다. 확장 과제와 완료 조건은 직접 수행하고 결과를 기록하세요. |
| webgl | [8. Vertex·Fragment shader](labs/graphics/webgl/08-shader-stages/README.md) | [08-shader-stages](../src/labs/08-shader-stages/example.js) — 연결된 원본 코드를 Monaco에서 편집하면 검사 후 sandbox 미리보기에 반영됩니다. 확장 과제와 완료 조건은 직접 수행하고 결과를 기록하세요. |
| webgl | [9. GLSL 문법과 색상](labs/graphics/webgl/09-glsl-color/README.md) | [09-glsl-color](../src/labs/09-glsl-color/example.js) — 연결된 원본 코드를 Monaco에서 편집하면 검사 후 sandbox 미리보기에 반영됩니다. 확장 과제와 완료 조건은 직접 수행하고 결과를 기록하세요. |
| webgl | [10. Uniform·Attribute·Varying와 시간](labs/graphics/webgl/10-shader-data/README.md) | [10-shader-data](../src/labs/10-shader-data/example.js) — 연결된 원본 코드를 Monaco에서 편집하면 검사 후 sandbox 미리보기에 반영됩니다. 확장 과제와 완료 조건은 직접 수행하고 결과를 기록하세요. |
| webgl | [11. UV와 Texture Sampling](labs/graphics/webgl/11-uv/README.md) | [11-uv](../src/labs/11-uv/example.js) — 연결된 원본 코드를 Monaco에서 편집하면 검사 후 sandbox 미리보기에 반영됩니다. 확장 과제와 완료 조건은 직접 수행하고 결과를 기록하세요. |
| webgl | [12. Noise·Sin·Cos 물결과 왜곡](labs/graphics/webgl/12-waves/README.md) | [12-waves](../src/labs/12-waves/example.js) — 연결된 원본 코드를 Monaco에서 편집하면 검사 후 sandbox 미리보기에 반영됩니다. 확장 과제와 완료 조건은 직접 수행하고 결과를 기록하세요. |
| webgl | [13. ShaderMaterial 통합](labs/graphics/webgl/13-shader-material/README.md) | [13-shader-material](../src/labs/13-shader-material/example.js) — 연결된 원본 코드를 Monaco에서 편집하면 검사 후 sandbox 미리보기에 반영됩니다. 확장 과제와 완료 조건은 직접 수행하고 결과를 기록하세요. |
| webgl | [14. 인터랙티브 셰이더 복습](labs/graphics/webgl/14-shader-review/README.md) | [14-shader-review](../src/labs/14-shader-review/example.js) — 연결된 원본 코드를 Monaco에서 편집하면 검사 후 sandbox 미리보기에 반영됩니다. 확장 과제와 완료 조건은 직접 수행하고 결과를 기록하세요. |
| webgl | [15. NeRF와 3DGS 비교](labs/graphics/webgl/15-nerf-gs/README.md) | [15-nerf-gs](../src/labs/15-nerf-gs/example.js) — 해석적 밀도장의 ray 적분과 splat 합성 비교입니다. NeRF 학습이나 추론 모델을 실행하지 않습니다. |
| webgl | [16. Gaussian 위치·크기·회전·불투명도](labs/graphics/webgl/16-gaussian/README.md) | [16-gaussian](../src/labs/16-gaussian/example.js) — CPU 기반 Gaussian 투영·합성 원리 시각화입니다. SH는 합성한 1차 계수를 사용하며 학습된 GS 모델의 품질 측정이 아닙니다. |
| webgl | [17. Spherical Harmonics와 시점별 색상](labs/graphics/webgl/17-sh/README.md) | [17-sh](../src/labs/17-sh/example.js) — CPU 기반 Gaussian 투영·합성 원리 시각화입니다. SH는 합성한 1차 계수를 사용하며 학습된 GS 모델의 품질 측정이 아닙니다. |
| webgl | [18. Projection·Sorting·Alpha Blending](labs/graphics/webgl/18-gs-projection/README.md) | [18-gs-projection](../src/labs/18-gs-projection/example.js) — CPU 기반 Gaussian 투영·합성 원리 시각화입니다. SH는 합성한 1차 계수를 사용하며 학습된 GS 모델의 품질 측정이 아닙니다. |
| webgl | [19. .ply·.splat 로딩](labs/graphics/webgl/19-gs-loading/README.md) | [19-gs-loading](../src/labs/19-gs-loading/example.js) — 소형 .splat 및 ASCII GS PLY를 읽는 CPU Canvas 교육용 뷰어입니다. 최대 1 MiB·512 splat이며 binary PLY와 일반 mesh PLY는 지원하지 않습니다. Spark, GPU tile 렌더링, 고차 SH, GS picking은 구현 범위 밖입니다. 기본 장면은 직접 생성한 데이터이며 측정값은 이 CPU 예제에만 해당합니다. |
| webgl | [20. Three.js+GS 카메라와 인터랙션](labs/graphics/webgl/20-gs-interaction/README.md) | [20-gs-interaction](../src/labs/20-gs-interaction/example.js) — 소형 .splat 및 ASCII GS PLY를 읽는 CPU Canvas 교육용 뷰어입니다. 최대 1 MiB·512 splat이며 binary PLY와 일반 mesh PLY는 지원하지 않습니다. Spark, GPU tile 렌더링, 고차 SH, GS picking은 구현 범위 밖입니다. 기본 장면은 직접 생성한 데이터이며 측정값은 이 CPU 예제에만 해당합니다. |
| webgl | [21. GS 뷰어 복습과 후보 비교](labs/graphics/webgl/21-gs-review/README.md) | [21-gs-review](../src/labs/21-gs-review/example.js) — 소형 .splat 및 ASCII GS PLY를 읽는 CPU Canvas 교육용 뷰어입니다. 최대 1 MiB·512 splat이며 binary PLY와 일반 mesh PLY는 지원하지 않습니다. Spark, GPU tile 렌더링, 고차 SH, GS picking은 구현 범위 밖입니다. 기본 장면은 직접 생성한 데이터이며 측정값은 이 CPU 예제에만 해당합니다. |
| webgl | [22. React+Three.js 컴포넌트 설계](labs/graphics/webgl/22-react-viewer/README.md) | [22-react-viewer](../src/labs/22-react-viewer/example.js) — 연결된 원본 코드를 Monaco에서 편집하면 검사 후 sandbox 미리보기에 반영됩니다. 확장 과제와 완료 조건은 직접 수행하고 결과를 기록하세요. |
| webgl | [23. 로딩 UI와 진행률](labs/graphics/webgl/23-loading-ui/README.md) | [23-loading-ui](../src/labs/23-loading-ui/example.js) — 지연과 진행률을 제어한 모의 로더입니다. 실제 네트워크 전송량을 측정하지 않습니다. |
| webgl | [24. 카메라 이동·회전·줌](labs/graphics/webgl/24-camera-controls/README.md) | [24-camera-controls](../src/labs/24-camera-controls/example.js) — 연결된 원본 코드를 Monaco에서 편집하면 검사 후 sandbox 미리보기에 반영됩니다. 확장 과제와 완료 조건은 직접 수행하고 결과를 기록하세요. |
| webgl | [25. 마커와 Raycasting](labs/graphics/webgl/25-markers/README.md) | [25-markers](../src/labs/25-markers/example.js) — 연결된 원본 코드를 Monaco에서 편집하면 검사 후 sandbox 미리보기에 반영됩니다. 확장 과제와 완료 조건은 직접 수행하고 결과를 기록하세요. |
| webgl | [26. FPS·Draw Calls·메모리 분석](labs/graphics/webgl/26-performance/README.md) | [26-performance](../src/labs/26-performance/example.js) — 연결된 원본 코드를 Monaco에서 편집하면 검사 후 sandbox 미리보기에 반영됩니다. 확장 과제와 완료 조건은 직접 수행하고 결과를 기록하세요. |
| webgl | [27. 해상도·데이터 최적화](labs/graphics/webgl/27-optimization/README.md) | [27-optimization](../src/labs/27-optimization/example.js) — 연결된 원본 코드를 Monaco에서 편집하면 검사 후 sandbox 미리보기에 반영됩니다. 확장 과제와 완료 조건은 직접 수행하고 결과를 기록하세요. |
| webgl | [28. 문서화와 선택적 배포 계획](labs/graphics/webgl/28-review/README.md) | [28-review](../src/labs/28-review/example.js) — 연결된 원본 코드를 Monaco에서 편집하면 검사 후 sandbox 미리보기에 반영됩니다. 확장 과제와 완료 조건은 직접 수행하고 결과를 기록하세요. |
| javascript | [1. 값과 상태](labs/fundamentals/javascript/01-foundations/README.md) | [javascript-01](../src/labs/javascript-01/example.js) — 연결된 원본 코드를 Monaco에서 편집하면 검사 후 sandbox 미리보기에 반영됩니다. 확장 과제와 완료 조건은 직접 수행하고 결과를 기록하세요. |
| javascript | [2. 비동기와 취소](labs/fundamentals/javascript/02-experiments/README.md) | [javascript-02](../src/labs/javascript-02/example.js) — 연결된 원본 코드를 Monaco에서 편집하면 검사 후 sandbox 미리보기에 반영됩니다. 확장 과제와 완료 조건은 직접 수행하고 결과를 기록하세요. |
| javascript | [3. 모듈형 실험 기록장](labs/fundamentals/javascript/03-project/README.md) | [javascript-03](../src/labs/javascript-03/example.js) — 연결된 원본 코드를 Monaco에서 편집하면 검사 후 sandbox 미리보기에 반영됩니다. 확장 과제와 완료 조건은 직접 수행하고 결과를 기록하세요. |
| typescript | [1. 타입과 좁히기](labs/fundamentals/typescript/01-foundations/README.md) | [typescript-01](../src/labs/typescript-01/example.js) — 연결된 원본 코드를 Monaco에서 편집하면 검사 후 sandbox 미리보기에 반영됩니다. 확장 과제와 완료 조건은 직접 수행하고 결과를 기록하세요. |
| typescript | [2. 제네릭과 경계 검증](labs/fundamentals/typescript/02-experiments/README.md) | [typescript-02](../src/labs/typescript-02/example.js) — 연결된 원본 코드를 Monaco에서 편집하면 검사 후 sandbox 미리보기에 반영됩니다. 확장 과제와 완료 조건은 직접 수행하고 결과를 기록하세요. |
| typescript | [3. 플러그인 계약](labs/fundamentals/typescript/03-project/README.md) | [typescript-03](../src/labs/typescript-03/example.js) — 연결된 원본 코드를 Monaco에서 편집하면 검사 후 sandbox 미리보기에 반영됩니다. 확장 과제와 완료 조건은 직접 수행하고 결과를 기록하세요. |
| html | [1. 의미와 문서 구조](labs/fundamentals/html/01-foundations/README.md) | [html-01](../src/labs/html-01/example.js) — 연결된 원본 코드를 Monaco에서 편집하면 검사 후 sandbox 미리보기에 반영됩니다. 확장 과제와 완료 조건은 직접 수행하고 결과를 기록하세요. |
| html | [2. 폼과 키보드](labs/fundamentals/html/02-experiments/README.md) | [html-02](../src/labs/html-02/example.js) — 연결된 원본 코드를 Monaco에서 편집하면 검사 후 sandbox 미리보기에 반영됩니다. 확장 과제와 완료 조건은 직접 수행하고 결과를 기록하세요. |
| html | [3. 접근 가능한 학습 카드](labs/fundamentals/html/03-project/README.md) | [html-03](../src/labs/html-03/example.js) — 연결된 원본 코드를 Monaco에서 편집하면 검사 후 sandbox 미리보기에 반영됩니다. 확장 과제와 완료 조건은 직접 수행하고 결과를 기록하세요. |
| css | [1. Cascade와 레이아웃](labs/fundamentals/css/01-foundations/README.md) | [css-01](../src/labs/css-01/example.js) — 연결된 원본 코드를 Monaco에서 편집하면 검사 후 sandbox 미리보기에 반영됩니다. 확장 과제와 완료 조건은 직접 수행하고 결과를 기록하세요. |
| css | [2. 반응형과 모션](labs/fundamentals/css/02-experiments/README.md) | [css-02](../src/labs/css-02/example.js) — 연결된 원본 코드를 Monaco에서 편집하면 검사 후 sandbox 미리보기에 반영됩니다. 확장 과제와 완료 조건은 직접 수행하고 결과를 기록하세요. |
| css | [3. 토큰과 렌더링 관찰](labs/fundamentals/css/03-project/README.md) | [css-03](../src/labs/css-03/example.js) — 연결된 원본 코드를 Monaco에서 편집하면 검사 후 sandbox 미리보기에 반영됩니다. 확장 과제와 완료 조건은 직접 수행하고 결과를 기록하세요. |
| react | [1. 상태와 소유권](labs/frameworks/react/01-foundations/README.md) | [react-01](../src/labs/react-01/example.js) — 연결된 원본 코드를 Monaco에서 편집하면 검사 후 sandbox 미리보기에 반영됩니다. 확장 과제와 완료 조건은 직접 수행하고 결과를 기록하세요. |
| react | [2. Effect와 외부 렌더러](labs/frameworks/react/02-experiments/README.md) | [react-02](../src/labs/react-02/example.js) — 연결된 원본 코드를 Monaco에서 편집하면 검사 후 sandbox 미리보기에 반영됩니다. 확장 과제와 완료 조건은 직접 수행하고 결과를 기록하세요. |
| react | [3. 상태 보존과 성능](labs/frameworks/react/03-project/README.md) | [react-03](../src/labs/react-03/example.js) — 실제 React 상태·memo 실험입니다. Profiler 시간은 개발용 React에서 관찰하세요. 프로덕션 빌드에서는 콜백이 제공되지 않을 수 있습니다. |
| vue | [1. 반응성과 템플릿](labs/frameworks/vue/01-foundations/README.md) | [vue-01](../src/labs/vue-01/example.js) — 연결된 원본 코드를 Monaco에서 편집하면 검사 후 sandbox 미리보기에 반영됩니다. 확장 과제와 완료 조건은 직접 수행하고 결과를 기록하세요. |
| vue | [2. 컴포넌트 계약과 감시](labs/frameworks/vue/02-experiments/README.md) | [vue-02](../src/labs/vue-02/example.js) — 연결된 원본 코드를 Monaco에서 편집하면 검사 후 sandbox 미리보기에 반영됩니다. 확장 과제와 완료 조건은 직접 수행하고 결과를 기록하세요. |
| vue | [3. Canvas 수명주기](labs/frameworks/vue/03-project/README.md) | [vue-03](../src/labs/vue-03/example.js) — 연결된 원본 코드를 Monaco에서 편집하면 검사 후 sandbox 미리보기에 반영됩니다. 확장 과제와 완료 조건은 직접 수행하고 결과를 기록하세요. |
| svelte | [1. 컴파일과 반응성](labs/frameworks/svelte/01-foundations/README.md) | [svelte-01](../src/labs/svelte-01/example.js) — 미리보기는 실제 Svelte writable store와 DOM 어댑터를 사용합니다. Svelte 컴포넌트 컴파일러는 내장하지 않습니다. |
| svelte | [2. 이벤트와 자원 정리](labs/frameworks/svelte/02-experiments/README.md) | [svelte-02](../src/labs/svelte-02/example.js) — 미리보기는 실제 Svelte writable store와 DOM 어댑터를 사용합니다. Svelte 컴포넌트 컴파일러는 내장하지 않습니다. 같은 예제 폴더의 .svelte 파일을 별도 Svelte 프로젝트에서 실행하여 컴포넌트 수명주기도 비교하세요. |
| svelte | [3. 프레임워크 비교](labs/frameworks/svelte/03-project/README.md) | [svelte-03](../src/labs/svelte-03/example.js) — 미리보기는 실제 Svelte writable store와 DOM 어댑터를 사용합니다. Svelte 컴포넌트 컴파일러는 내장하지 않습니다. 같은 예제 폴더의 .svelte 파일을 별도 Svelte 프로젝트에서 실행하여 컴포넌트 수명주기도 비교하세요. |
| canvas-2d | [1. 좌표와 픽셀](labs/graphics/canvas-2d/01-foundations/README.md) | [canvas-2d-01](../src/labs/canvas-2d-01/example.js) — 연결된 원본 코드를 Monaco에서 편집하면 검사 후 sandbox 미리보기에 반영됩니다. 확장 과제와 완료 조건은 직접 수행하고 결과를 기록하세요. |
| canvas-2d | [2. 시간과 입력](labs/graphics/canvas-2d/02-experiments/README.md) | [canvas-2d-02](../src/labs/canvas-2d-02/example.js) — 연결된 원본 코드를 Monaco에서 편집하면 검사 후 sandbox 미리보기에 반영됩니다. 확장 과제와 완료 조건은 직접 수행하고 결과를 기록하세요. |
| canvas-2d | [3. 입자와 비용](labs/graphics/canvas-2d/03-project/README.md) | [canvas-2d-03](../src/labs/canvas-2d-03/example.js) — 연결된 원본 코드를 Monaco에서 편집하면 검사 후 sandbox 미리보기에 반영됩니다. 확장 과제와 완료 조건은 직접 수행하고 결과를 기록하세요. |
| svg | [1. viewBox와 벡터](labs/graphics/svg/01-foundations/README.md) | [svg-01](../src/labs/svg-01/example.js) — 연결된 원본 코드를 Monaco에서 편집하면 검사 후 sandbox 미리보기에 반영됩니다. 확장 과제와 완료 조건은 직접 수행하고 결과를 기록하세요. |
| svg | [2. DOM 인터랙션](labs/graphics/svg/02-experiments/README.md) | [svg-02](../src/labs/svg-02/example.js) — 연결된 원본 코드를 Monaco에서 편집하면 검사 후 sandbox 미리보기에 반영됩니다. 확장 과제와 완료 조건은 직접 수행하고 결과를 기록하세요. |
| svg | [3. Canvas와 비교](labs/graphics/svg/03-project/README.md) | [svg-03](../src/labs/svg-03/example.js) — 연결된 원본 코드를 Monaco에서 편집하면 검사 후 sandbox 미리보기에 반영됩니다. 확장 과제와 완료 조건은 직접 수행하고 결과를 기록하세요. |
| threejs | [1. 장면 그래프와 카메라](labs/graphics/threejs/01-foundations/README.md) | [threejs-01](../src/labs/threejs-01/example.js) — 연결된 원본 코드를 Monaco에서 편집하면 검사 후 sandbox 미리보기에 반영됩니다. 확장 과제와 완료 조건은 직접 수행하고 결과를 기록하세요. |
| threejs | [2. 재질·로딩·선택](labs/graphics/threejs/02-experiments/README.md) | [threejs-02](../src/labs/threejs-02/example.js) — 연결된 원본 코드를 Monaco에서 편집하면 검사 후 sandbox 미리보기에 반영됩니다. 확장 과제와 완료 조건은 직접 수행하고 결과를 기록하세요. |
| threejs | [3. 렌더링 자원과 측정](labs/graphics/threejs/03-project/README.md) | [threejs-03](../src/labs/threejs-03/example.js) — 연결된 원본 코드를 Monaco에서 편집하면 검사 후 sandbox 미리보기에 반영됩니다. 확장 과제와 완료 조건은 직접 수행하고 결과를 기록하세요. |
| gaussian-splatting | [1. 3DGS 표현과 데이터](labs/graphics/gaussian-splatting/01-foundations/README.md) | [gaussian-splatting-01](../src/labs/gaussian-splatting-01/example.js) — 2D Gaussian 밀도 원리 시각화입니다. 3DGS 데이터 로더가 아닙니다. |
| gaussian-splatting | [2. 로딩과 카메라 통합](labs/graphics/gaussian-splatting/02-experiments/README.md) | [gaussian-splatting-02](../src/labs/gaussian-splatting-02/example.js) — 소형 .splat 및 ASCII GS PLY를 읽는 CPU Canvas 교육용 뷰어입니다. 최대 1 MiB·512 splat이며 binary PLY와 일반 mesh PLY는 지원하지 않습니다. Spark, GPU tile 렌더링, 고차 SH, GS picking은 구현 범위 밖입니다. 기본 장면은 직접 생성한 데이터이며 측정값은 이 CPU 예제에만 해당합니다. |
| gaussian-splatting | [3. 정렬·품질·성능](labs/graphics/gaussian-splatting/03-project/README.md) | [gaussian-splatting-03](../src/labs/gaussian-splatting-03/example.js) — 소형 .splat 및 ASCII GS PLY를 읽는 CPU Canvas 교육용 뷰어입니다. 최대 1 MiB·512 splat이며 binary PLY와 일반 mesh PLY는 지원하지 않습니다. Spark, GPU tile 렌더링, 고차 SH, GS picking은 구현 범위 밖입니다. 기본 장면은 직접 생성한 데이터이며 측정값은 이 CPU 예제에만 해당합니다. |
| webgpu | [1. Adapter·Device·Pipeline](labs/graphics/webgpu/01-foundations/README.md) | [webgpu-01](../src/labs/webgpu-01/example.js) — 실제 WebGPU 파이프라인을 사용하며 지원 GPU·브라우저가 필요합니다. 미지원 환경에서는 안내를 표시합니다. WGSL 오류는 GPU 컴파일러에서 확인합니다. |
| webgpu | [2. Buffer와 Render pass](labs/graphics/webgpu/02-experiments/README.md) | [webgpu-02](../src/labs/webgpu-02/example.js) — 실제 WebGPU 파이프라인을 사용하며 지원 GPU·브라우저가 필요합니다. 미지원 환경에서는 안내를 표시합니다. WGSL 오류는 GPU 컴파일러에서 확인합니다. |
| webgpu | [3. Compute와 Readback](labs/graphics/webgpu/03-project/README.md) | [webgpu-03](../src/labs/webgpu-03/example.js) — 실제 WebGPU 파이프라인을 사용하며 지원 GPU·브라우저가 필요합니다. 미지원 환경에서는 안내를 표시합니다. WGSL 오류는 GPU 컴파일러에서 확인합니다. |
| react-three-fiber | [1. 선언적 장면](labs/graphics/react-three-fiber/01-foundations/README.md) | [react-three-fiber-01](../src/labs/react-three-fiber-01/example.js) — 연결된 원본 코드를 Monaco에서 편집하면 검사 후 sandbox 미리보기에 반영됩니다. 확장 과제와 완료 조건은 직접 수행하고 결과를 기록하세요. |
| react-three-fiber | [2. 프레임과 이벤트](labs/graphics/react-three-fiber/02-experiments/README.md) | [react-three-fiber-02](../src/labs/react-three-fiber-02/example.js) — 연결된 원본 코드를 Monaco에서 편집하면 검사 후 sandbox 미리보기에 반영됩니다. 확장 과제와 완료 조건은 직접 수행하고 결과를 기록하세요. |
| react-three-fiber | [3. 자원 공유와 프레임 정책](labs/graphics/react-three-fiber/03-project/README.md) | [react-three-fiber-03](../src/labs/react-three-fiber-03/example.js) — 연결된 원본 코드를 Monaco에서 편집하면 검사 후 sandbox 미리보기에 반영됩니다. 확장 과제와 완료 조건은 직접 수행하고 결과를 기록하세요. |
| pixijs | [1. Application과 Scene graph](labs/graphics/pixijs/01-foundations/README.md) | [pixijs-01](../src/labs/pixijs-01/example.js) — 연결된 원본 코드를 Monaco에서 편집하면 검사 후 sandbox 미리보기에 반영됩니다. 확장 과제와 완료 조건은 직접 수행하고 결과를 기록하세요. |
| pixijs | [2. Assets와 이벤트](labs/graphics/pixijs/02-experiments/README.md) | [pixijs-02](../src/labs/pixijs-02/example.js) — 직접 생성한 atlas와 모의 로딩 실패를 사용합니다. 외부 Assets 서버 요청은 하지 않습니다. |
| pixijs | [3. 배칭과 품질](labs/graphics/pixijs/03-project/README.md) | [pixijs-03](../src/labs/pixijs-03/example.js) — 연결된 원본 코드를 Monaco에서 편집하면 검사 후 sandbox 미리보기에 반영됩니다. 확장 과제와 완료 조건은 직접 수행하고 결과를 기록하세요. |
| glsl | [1. Vertex와 Fragment](labs/shader/glsl/01-foundations/README.md) | [glsl-01](../src/labs/glsl-01/example.js) — 연결된 원본 코드를 Monaco에서 편집하면 검사 후 sandbox 미리보기에 반영됩니다. 확장 과제와 완료 조건은 직접 수행하고 결과를 기록하세요. |
| glsl | [2. UV·Uniform·파동](labs/shader/glsl/02-experiments/README.md) | [glsl-02](../src/labs/glsl-02/example.js) — 연결된 원본 코드를 Monaco에서 편집하면 검사 후 sandbox 미리보기에 반영됩니다. 확장 과제와 완료 조건은 직접 수행하고 결과를 기록하세요. |
| glsl | [3. 상호작용과 비용](labs/shader/glsl/03-project/README.md) | [glsl-03](../src/labs/glsl-03/example.js) — 연결된 원본 코드를 Monaco에서 편집하면 검사 후 sandbox 미리보기에 반영됩니다. 확장 과제와 완료 조건은 직접 수행하고 결과를 기록하세요. |
| wgsl | [1. 타입과 Entry point](labs/shader/wgsl/01-foundations/README.md) | [wgsl-01](../src/labs/wgsl-01/example.js) — 실제 WebGPU 파이프라인을 사용하며 지원 GPU·브라우저가 필요합니다. 미지원 환경에서는 안내를 표시합니다. WGSL 오류는 GPU 컴파일러에서 확인합니다. |
| wgsl | [2. Binding과 메모리 배치](labs/shader/wgsl/02-experiments/README.md) | [wgsl-02](../src/labs/wgsl-02/example.js) — 실제 WebGPU 파이프라인을 사용하며 지원 GPU·브라우저가 필요합니다. 미지원 환경에서는 안내를 표시합니다. WGSL 오류는 GPU 컴파일러에서 확인합니다. |
| wgsl | [3. Compute와 경계](labs/shader/wgsl/03-project/README.md) | [wgsl-03](../src/labs/wgsl-03/example.js) — 실제 WebGPU 파이프라인을 사용하며 지원 GPU·브라우저가 필요합니다. 미지원 환경에서는 안내를 표시합니다. WGSL 오류는 GPU 컴파일러에서 확인합니다. |
| gsap | [1. Tween과 Timeline](labs/animation/gsap/01-foundations/README.md) | [gsap-01](../src/labs/gsap-01/example.js) — 연결된 원본 코드를 Monaco에서 편집하면 검사 후 sandbox 미리보기에 반영됩니다. 확장 과제와 완료 조건은 직접 수행하고 결과를 기록하세요. |
| gsap | [2. Scroll과 수명주기](labs/animation/gsap/02-experiments/README.md) | [gsap-02](../src/labs/gsap-02/example.js) — 기본 scroll 이벤트를 GSAP timeline에 연결합니다. ScrollTrigger 플러그인은 사용하지 않습니다. |
| gsap | [3. 모션 설계와 검증](labs/animation/gsap/03-project/README.md) | [gsap-03](../src/labs/gsap-03/example.js) — 연결된 원본 코드를 Monaco에서 편집하면 검사 후 sandbox 미리보기에 반영됩니다. 확장 과제와 완료 조건은 직접 수행하고 결과를 기록하세요. |
| motion | [1. 상태 기반 애니메이션](labs/animation/motion/01-foundations/README.md) | [motion-01](../src/labs/motion-01/example.js) — 연결된 원본 코드를 Monaco에서 편집하면 검사 후 sandbox 미리보기에 반영됩니다. 확장 과제와 완료 조건은 직접 수행하고 결과를 기록하세요. |
| motion | [2. Layout과 Exit](labs/animation/motion/02-experiments/README.md) | [motion-02](../src/labs/motion-02/example.js) — 연결된 원본 코드를 Monaco에서 편집하면 검사 후 sandbox 미리보기에 반영됩니다. 확장 과제와 완료 조건은 직접 수행하고 결과를 기록하세요. |
| motion | [3. 제스처와 접근성](labs/animation/motion/03-project/README.md) | [motion-03](../src/labs/motion-03/example.js) — 연결된 원본 코드를 Monaco에서 편집하면 검사 후 sandbox 미리보기에 반영됩니다. 확장 과제와 완료 조건은 직접 수행하고 결과를 기록하세요. |
| web-workers | [1. 메시지와 실행 경계](labs/engineering/web-workers/01-foundations/README.md) | [web-workers-01](../src/labs/web-workers-01/example.js) — 연결된 원본 코드를 Monaco에서 편집하면 검사 후 sandbox 미리보기에 반영됩니다. 확장 과제와 완료 조건은 직접 수행하고 결과를 기록하세요. |
| web-workers | [2. Transfer와 취소](labs/engineering/web-workers/02-experiments/README.md) | [web-workers-02](../src/labs/web-workers-02/example.js) — 연결된 원본 코드를 Monaco에서 편집하면 검사 후 sandbox 미리보기에 반영됩니다. 확장 과제와 완료 조건은 직접 수행하고 결과를 기록하세요. |
| web-workers | [3. 작업 큐와 측정](labs/engineering/web-workers/03-project/README.md) | [web-workers-03](../src/labs/web-workers-03/example.js) — 연결된 원본 코드를 Monaco에서 편집하면 검사 후 sandbox 미리보기에 반영됩니다. 확장 과제와 완료 조건은 직접 수행하고 결과를 기록하세요. |
| offscreen-canvas | [1. Canvas 제어권 이전](labs/engineering/offscreen-canvas/01-foundations/README.md) | [offscreen-canvas-01](../src/labs/offscreen-canvas-01/example.js) — 연결된 원본 코드를 Monaco에서 편집하면 검사 후 sandbox 미리보기에 반영됩니다. 확장 과제와 완료 조건은 직접 수행하고 결과를 기록하세요. |
| offscreen-canvas | [2. Resize와 입력 프로토콜](labs/engineering/offscreen-canvas/02-experiments/README.md) | [offscreen-canvas-02](../src/labs/offscreen-canvas-02/example.js) — 연결된 원본 코드를 Monaco에서 편집하면 검사 후 sandbox 미리보기에 반영됩니다. 확장 과제와 완료 조건은 직접 수행하고 결과를 기록하세요. |
| offscreen-canvas | [3. 렌더링 분리 평가](labs/engineering/offscreen-canvas/03-project/README.md) | [offscreen-canvas-03](../src/labs/offscreen-canvas-03/example.js) — 연결된 원본 코드를 Monaco에서 편집하면 검사 후 sandbox 미리보기에 반영됩니다. 확장 과제와 완료 조건은 직접 수행하고 결과를 기록하세요. |
| webassembly | [1. 모듈과 선형 메모리](labs/engineering/webassembly/01-foundations/README.md) | [webassembly-01](../src/labs/webassembly-01/example.js) — 미리보기는 WebAssembly.Memory 및 JS 경계 비용 실험입니다. CSP를 유지하므로 WASM 모듈 컴파일은 iframe 밖에서 실행합니다. |
| webassembly | [2. 배열과 경계 비용](labs/engineering/webassembly/02-experiments/README.md) | [webassembly-02](../src/labs/webassembly-02/example.js) — 미리보기는 WebAssembly.Memory 및 JS 경계 비용 실험입니다. CSP를 유지하므로 WASM 모듈 컴파일은 iframe 밖에서 실행합니다. 같은 폴더의 kernel.wat, kernel.wasm, benchmark.mjs로 실제 WASM 계산과 JS 결과를 비교하세요. |
| webassembly | [3. 실제 병목 평가](labs/engineering/webassembly/03-project/README.md) | [webassembly-03](../src/labs/webassembly-03/example.js) — 미리보기는 WebAssembly.Memory 및 JS 경계 비용 실험입니다. CSP를 유지하므로 WASM 모듈 컴파일은 iframe 밖에서 실행합니다. 같은 폴더의 kernel.wat, kernel.wasm, benchmark.mjs로 실제 WASM 계산과 JS 결과를 비교하세요. |
| playwright | [1. 사용자 관점의 테스트](labs/testing/playwright/01-foundations/README.md) | [playwright-01](../src/labs/playwright-01/example.js) — 화면은 별도 실행용 Playwright 테스트 소스를 생성합니다. Node 환경에서 실행해야 하며 미리보기 표시가 E2E 테스트 통과를 뜻하지 않습니다. |
| playwright | [2. 저장·다운로드·복원](labs/testing/playwright/02-experiments/README.md) | [playwright-02](../src/labs/playwright-02/example.js) — 화면은 별도 실행용 Playwright 테스트 소스를 생성합니다. Node 환경에서 실행해야 하며 미리보기 표시가 E2E 테스트 통과를 뜻하지 않습니다. |
| playwright | [3. 시각 회귀와 흔들림](labs/testing/playwright/03-project/README.md) | [playwright-03](../src/labs/playwright-03/example.js) — 화면은 별도 실행용 Playwright 테스트 소스를 생성합니다. Node 환경에서 실행해야 하며 미리보기 표시가 E2E 테스트 통과를 뜻하지 않습니다. |

## 별도 도구 실행

WebAssembly: `node src/labs/webassembly-03/benchmark.mjs` (추가 패키지 불필요).

Playwright: 별도 테스트 폴더에서 `npm init -y`, `npm install -D @playwright/test`, `npx playwright install chromium`을 실행하고 예제의 `lesson.spec.mjs`를 복사합니다. Frontory 서버를 실행한 후 `FRONTORY_TEST_ORIGIN` 환경 변수에 주소를 지정하고 `npx playwright test lesson.spec.mjs`를 실행합니다. 시각 기준은 결과를 검토한 후 `--update-snapshots`로 만듭니다.

## 공식 참고

- [Three.js](https://threejs.org/docs/)
- [Vue 렌더 함수](https://vuejs.org/guide/extras/render-function.html)
- [Svelte stores](https://svelte.dev/docs/svelte/stores)
- [WebGPU](https://developer.mozilla.org/en-US/docs/Web/API/WebGPU_API)
- [Playwright](https://playwright.dev/docs/intro)
