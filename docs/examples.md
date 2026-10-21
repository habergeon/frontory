# 실행 예제 안내

23개 기술 시리즈마다 대표 예제 1개를 연결하고 WebGL 기초 예제 6개를 추가했습니다. 총 29개 단위에 편집 가능한 예제가 있습니다. 예제는 개념을 관찰하는 출발점이며 문서의 모든 과제를 대신 완성한 정답은 아닙니다. 나머지 65개 단위는 문서·과제·필기를 제공하며 실행 예제는 준비 중입니다.

## 사용 방법

시리즈의 첫 단위를 선택하고 코드를 수정합니다. JavaScript/TypeScript 검사를 통과한 코드가 실행됩니다. 코드 안의 HTML·CSS·GLSL·WGSL 문자열도 실제 실행 입력입니다. 이 문자열 내부의 전용 언어 진단은 Monaco JS/TS 진단과 별개이며 GLSL/WGSL 오류는 각 그래픽 API에서 발생합니다.

기존에 빈 코드가 저장된 단위는 빈 값을 보존합니다. 새 예제를 시작하려면 **원본 코드로 → 코드만 되돌리기**를 선택하세요. 기존 필기는 유지됩니다. 변경 내용과 진행 상태는 기존 JSON 백업 형식에 그대로 포함됩니다.

## 런타임과 범위

- React: 실제 React state와 createElement. JSX 대신 JS 문법으로 편집합니다.
- Vue: 실제 ref/computed와 h 렌더 함수. SFC 템플릿 컴파일은 포함하지 않습니다.
- Svelte: 실제 writable store의 구독·갱신·해제. 컴포넌트 컴파일·rune 예제는 후속 범위입니다.
- React Three Fiber: 실제 Canvas/useFrame과 mesh 클릭 상태.
- PixiJS: 실제 Application/Graphics. eval을 사용하지 않는 공식 정적 polyfill을 사용합니다.
- GSAP/Motion: 실제 timeline/animate와 정리.
- WebGPU/WGSL: 실제 GPU 파이프라인. GPU·브라우저가 지원하지 않으면 안내를 표시합니다.
- Workers/OffscreenCanvas: 실제 Blob Worker와 메시지·소유권 이전. 지원 환경이 필요합니다.
- WebAssembly: 실제 Memory와 TypedArray view. 모듈 컴파일을 위해 CSP를 완화하지 않습니다.
- Gaussian Splatting: 2D Gaussian 단면 원리 시각화. 학습된 3DGS 파일 로더가 아니며 Spark는 설치하지 않았습니다.
- Playwright: 실제 별도 실행할 테스트 소스를 관찰하는 예제. 브라우저 안에서 Node 테스트를 실행했다고 표시하지 않습니다.

## Playwright 별도 실행

학습용 별도 폴더에서 npm init -y, npm install -D @playwright/test, npx playwright install chromium을 실행합니다. 화면에 표시된 테스트 소스를 frontory.spec.ts로 저장하세요. Frontory 개발 서버를 실행한 상태에서 **npx playwright test frontory.spec.ts**로 실행합니다. 여러 브라우저 프로젝트를 사용하려면 playwright.config.ts에 프로젝트를 먼저 선언합니다. Node 의존성과 브라우저 설치는 별도 과정이며 학습 결과는 직접 확인합니다.

## 예제 목록

- [WebGL·GPU와 첫 화면](labs/graphics/webgl/01-scene/README.md) — 01-scene
- [Scene·Camera·Renderer](labs/graphics/webgl/02-camera/README.md) — 02-camera
- [Geometry·Material·Mesh](labs/graphics/webgl/03-mesh/README.md) — 03-mesh
- [좌표계·Vector3·Matrix4](labs/graphics/webgl/04-coordinates/README.md) — 04-coordinates
- [Light·Shadow·Texture](labs/graphics/webgl/05-light/README.md) — 05-light
- [Raycaster·OrbitControls](labs/graphics/webgl/06-interaction/README.md) — 06-interaction
- [인터랙티브 장면 복습](labs/graphics/webgl/07-scene-review/README.md) — 07-scene-review
- [값과 상태](labs/fundamentals/javascript/01-foundations/README.md) — javascript-01
- [타입과 좁히기](labs/fundamentals/typescript/01-foundations/README.md) — typescript-01
- [의미와 문서 구조](labs/fundamentals/html/01-foundations/README.md) — html-01
- [Cascade와 레이아웃](labs/fundamentals/css/01-foundations/README.md) — css-01
- [상태와 소유권](labs/frameworks/react/01-foundations/README.md) — react-01
- [반응성과 템플릿](labs/frameworks/vue/01-foundations/README.md) — vue-01
- [컴파일과 반응성](labs/frameworks/svelte/01-foundations/README.md) — svelte-01
- [좌표와 픽셀](labs/graphics/canvas-2d/01-foundations/README.md) — canvas-2d-01
- [viewBox와 벡터](labs/graphics/svg/01-foundations/README.md) — svg-01
- [장면 그래프와 카메라](labs/graphics/threejs/01-foundations/README.md) — threejs-01
- [3DGS 표현과 데이터](labs/graphics/gaussian-splatting/01-foundations/README.md) — gaussian-splatting-01
- [Adapter·Device·Pipeline](labs/graphics/webgpu/01-foundations/README.md) — webgpu-01
- [선언적 장면](labs/graphics/react-three-fiber/01-foundations/README.md) — react-three-fiber-01
- [Application과 Scene graph](labs/graphics/pixijs/01-foundations/README.md) — pixijs-01
- [Vertex와 Fragment](labs/shader/glsl/01-foundations/README.md) — glsl-01
- [타입과 Entry point](labs/shader/wgsl/01-foundations/README.md) — wgsl-01
- [Tween과 Timeline](labs/animation/gsap/01-foundations/README.md) — gsap-01
- [상태 기반 애니메이션](labs/animation/motion/01-foundations/README.md) — motion-01
- [메시지와 실행 경계](labs/engineering/web-workers/01-foundations/README.md) — web-workers-01
- [Canvas 제어권 이전](labs/engineering/offscreen-canvas/01-foundations/README.md) — offscreen-canvas-01
- [모듈과 선형 메모리](labs/engineering/webassembly/01-foundations/README.md) — webassembly-01
- [사용자 관점의 테스트](labs/testing/playwright/01-foundations/README.md) — playwright-01

## 공식 API 참고

- [Three.js](https://threejs.org/docs/)
- [Vue 렌더 함수](https://vuejs.org/guide/extras/render-function.html)
- [Svelte stores](https://svelte.dev/docs/svelte/stores)
- [React Three Fiber Canvas](https://r3f.docs.pmnd.rs/api/canvas)
- [PixiJS Application](https://pixijs.com/8.x/guides/components/application)
- [GSAP context](https://gsap.com/docs/v3/GSAP/gsap.context()/)
- [Motion](https://motion.dev/docs/quick-start)
- [WebGPU](https://developer.mozilla.org/en-US/docs/Web/API/WebGPU_API)
