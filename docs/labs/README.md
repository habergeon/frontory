# Frontory 기술 지도

Frontend + Story + Repository. 개념을 읽고, 변수를 실험하고, 결과와 실패를 기록하는 프론트엔드 학습 공간입니다.

## 추천 진행 순서

기존 React/TypeScript 경험을 활용해 **WebGL Journey를 계속 진행**합니다. 기초가 막히면 JavaScript·HTML·CSS·Canvas 2D로 돌아갑니다. Three.js·GLSL·Gaussian Splatting으로 이어진 뒤 WebGPU·WGSL을 별도 경로로 학습합니다. Framework·Animation·Engineering·Testing 시리즈는 필요한 기능에 맞춰 병행합니다. 별 개수는 학습 우선순위이며 선수 지식을 건너뛰라는 뜻이 아닙니다. 기본 목록에 없던 우선순위는 이 프로젝트의 제안입니다.

현재 **23개 시리즈 / 94개 단위**입니다. WebGL 기존 28개 문서를 보존했고 나머지 22개 시리즈에 기초·실험·응용 3단위를 작성했습니다. 실행 가능한 내장 예제는 WebGL 첫 장면 하나입니다. 학습 완료와 성능 개선을 미리 주장하지 않습니다.

## 언어와 웹 기초

- [JavaScript](fundamentals/javascript/README.md) — ★★★★★ / 3단위 / 선수: HTML 요소와 이벤트
- [TypeScript](fundamentals/typescript/README.md) — ★★★★★ / 3단위 / 선수: JavaScript 객체·함수·모듈
- [HTML](fundamentals/html/README.md) — ★★★★★ / 3단위 / 선수: 브라우저와 파일 경로
- [CSS](fundamentals/css/README.md) — ★★★★★ / 3단위 / 선수: HTML 구조

## UI 프레임워크

- [React](frameworks/react/README.md) — ★★★★★ / 3단위 / 선수: JavaScript·TypeScript, DOM 이벤트
- [Vue](frameworks/vue/README.md) — ★★★★ / 3단위 / 선수: JavaScript·HTML, React와 비교할 상태 개념
- [Svelte](frameworks/svelte/README.md) — ★★★ / 3단위 / 선수: JavaScript·HTML·CSS

## 그래픽스

- [WebGL Journey](graphics/webgl/README.md) — ★★★★★ / 28단위 / 선수: React·TypeScript 경험
- [Canvas 2D](graphics/canvas-2d/README.md) — ★★★★★ / 3단위 / 선수: JavaScript·좌표와 함수
- [SVG](graphics/svg/README.md) — ★★★★ / 3단위 / 선수: HTML·CSS, 좌표
- [Three.js](graphics/threejs/README.md) — ★★★★★ / 3단위 / 선수: WebGL 첫 장면, 벡터·행렬
- [Gaussian Splatting](graphics/gaussian-splatting/README.md) — ★★★★★ / 3단위 / 선수: Three.js 카메라·투영, alpha blending
- [WebGPU](graphics/webgpu/README.md) — ★★★★★ / 3단위 / 선수: WebGL 파이프라인, TypedArray·비동기
- [React Three Fiber](graphics/react-three-fiber/README.md) — ★★★★★ / 3단위 / 선수: React effect·ref, Three.js
- [PixiJS](graphics/pixijs/README.md) — ★★★★ / 3단위 / 선수: Canvas 2D 루프와 텍스처

## 셰이더

- [GLSL](shader/glsl/README.md) — ★★★★★ / 3단위 / 선수: WebGL 파이프라인·벡터
- [WGSL](shader/wgsl/README.md) — ★★★★★ / 3단위 / 선수: WebGPU buffer·pipeline, 벡터

## 애니메이션

- [GSAP](animation/gsap/README.md) — ★★★★ / 3단위 / 선수: DOM·CSS transform, 시간
- [Motion](animation/motion/README.md) — ★★★★ / 3단위 / 선수: React 상태, CSS transform

## 엔지니어링

- [Web Workers](engineering/web-workers/README.md) — ★★★★★ / 3단위 / 선수: JavaScript 비동기·TypedArray
- [OffscreenCanvas](engineering/offscreen-canvas/README.md) — ★★★★★ / 3단위 / 선수: Canvas 2D·Web Workers
- [WebAssembly](engineering/webassembly/README.md) — ★★★★ / 3단위 / 선수: JavaScript·TypedArray, 선택한 컴파일 언어 기초

## 테스트

- [Playwright](testing/playwright/README.md) — ★★★★ / 3단위 / 선수: DOM 역할·비동기, 테스트 기본

## 공통 기록

모든 실험은 목표 → 핵심 개념 → 바꾼 변수와 예상 → 실제 결과 → 배운 점 → 남은 질문으로 기록합니다. 학습 상태는 문서를 열었다는 이유로 자동 완료하지 않습니다. 완료 조건을 확인한 뒤 직접 표시하세요.

## 근거와 다음 확장

- [프로젝트 저장소](https://github.com/habergeon/frontory)

Next.js, Web Animations API, 브라우저 렌더링, 접근성 심화는 후속 후보입니다. 이번 구현 범위의 독립 시리즈에는 포함하지 않았습니다.
