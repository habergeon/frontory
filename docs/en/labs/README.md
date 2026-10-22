# Frontory technology map

Frontend + Story + Repository. A frontend learning space for reading concepts, experimenting with variables, and recording results and failures.

## Suggested order

Use your existing React/TypeScript experience to **continue WebGL Journey**. Return to JavaScript, HTML, CSS, or Canvas 2D when you get stuck on fundamentals. Continue through Three.js, GLSL, and Gaussian Splatting, then study WebGPU and WGSL as a separate path. Study Framework, Animation, Engineering, and Testing series alongside them as needed. Stars indicate learning priority, not permission to skip prerequisites. Priorities absent from the original list are this project's suggestions.

There are currently **23 series / 644 units**. Every series has 4 stages and 28 units, with examples linked to each unit. Check the [execution environments and limits](../examples.md). Each unit provides goals, concept explanations, exercise steps, comparison variables, completion criteria, and self-checks. Learning completion and performance improvements are not claimed in advance.

## Languages and web fundamentals

- [JavaScript](fundamentals/javascript/README.md) — ★★★★★ / 28 units / Prerequisites: HTML elements and events
- [TypeScript](fundamentals/typescript/README.md) — ★★★★★ / 28 units / Prerequisites: JavaScript objects, functions, and modules
- [HTML](fundamentals/html/README.md) — ★★★★★ / 28 units / Prerequisites: browsers and file paths
- [CSS](fundamentals/css/README.md) — ★★★★★ / 28 units / Prerequisites: HTML structure

## UI frameworks

- [React](frameworks/react/README.md) — ★★★★★ / 28 units / Prerequisites: JavaScript, TypeScript, DOM events
- [Vue (Korean)](../../labs/frameworks/vue/README.md) — ★★★★ / 28 units / Prerequisites: JavaScript, HTML, state concepts to compare with React
- [Svelte (Korean)](../../labs/frameworks/svelte/README.md) — ★★★ / 28 units / Prerequisites: JavaScript, HTML, CSS

## Graphics

- [WebGL Journey (Korean)](../../labs/graphics/webgl/README.md) — ★★★★★ / 28 units / Prerequisites: React and TypeScript experience
- [Canvas 2D (Korean)](../../labs/graphics/canvas-2d/README.md) — ★★★★★ / 28 units / Prerequisites: JavaScript, coordinates, and functions
- [SVG (Korean)](../../labs/graphics/svg/README.md) — ★★★★ / 28 units / Prerequisites: HTML, CSS, coordinates
- [Three.js (Korean)](../../labs/graphics/threejs/README.md) — ★★★★★ / 28 units / Prerequisites: first WebGL scene, vectors and matrices
- [Gaussian Splatting (Korean)](../../labs/graphics/gaussian-splatting/README.md) — ★★★★★ / 28 units / Prerequisites: Three.js cameras and projection, alpha blending
- [WebGPU (Korean)](../../labs/graphics/webgpu/README.md) — ★★★★★ / 28 units / Prerequisites: WebGL pipeline, TypedArray, asynchronous work
- [React Three Fiber (Korean)](../../labs/graphics/react-three-fiber/README.md) — ★★★★★ / 28 units / Prerequisites: React effect and ref, Three.js
- [PixiJS (Korean)](../../labs/graphics/pixijs/README.md) — ★★★★ / 28 units / Prerequisites: Canvas 2D loops and textures

## Shaders

- [GLSL (Korean)](../../labs/shader/glsl/README.md) — ★★★★★ / 28 units / Prerequisites: WebGL pipeline and vectors
- [WGSL (Korean)](../../labs/shader/wgsl/README.md) — ★★★★★ / 28 units / Prerequisites: WebGPU buffer and pipeline, vectors

## Animation

- [GSAP](animation/gsap/README.md) — ★★★★ / 28 units / Prerequisites: DOM, CSS transform, time
- [Motion (Korean)](../../labs/animation/motion/README.md) — ★★★★ / 28 units / Prerequisites: React state, CSS transform

## Engineering

- [Web Workers (Korean)](../../labs/engineering/web-workers/README.md) — ★★★★★ / 28 units / Prerequisites: JavaScript asynchronous work and TypedArray
- [OffscreenCanvas (Korean)](../../labs/engineering/offscreen-canvas/README.md) — ★★★★★ / 28 units / Prerequisites: Canvas 2D and Web Workers
- [WebAssembly (Korean)](../../labs/engineering/webassembly/README.md) — ★★★★ / 28 units / Prerequisites: JavaScript, TypedArray, basics of the chosen compilation language

## Testing

- [Playwright (Korean)](../../labs/testing/playwright/README.md) — ★★★★ / 28 units / Prerequisites: DOM roles, asynchronous work, testing basics

## Shared experiment notes

Record each experiment as goals → key concepts → changed variables and expectations → actual results → lessons learned → remaining questions. Opening a document does not automatically complete its learning status. Check the completion criteria and mark it yourself.

## Sources and possible extensions

- [Project repository](https://github.com/habergeon/frontory)

Next.js, Web Animations API, browser rendering, and advanced accessibility are candidates for later additions. They are not independent series in the current implementation scope.
