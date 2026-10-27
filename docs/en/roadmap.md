# Frontory roadmap

All 28 units provide independent HTML practice and step examples in Korean and English. Implementation readiness `verified` means unit execution and content review are complete; learner progress is separate. The deployed production baseline is `0338dbe857265441d76d12b073170e24ac794cb5`. The subsequent 24-unit expansion is locally validated and has not been pushed or deployed. Chromium/SwiftShader validation does not establish behavior on real devices or every GPU, or learner assessment.

[Technology map of 23 series](labs/README.md) · [WebGL: 28 units in progress](labs/graphics/webgl/README.md) · [Practice and storage guide](learning-workspace.md)

## Choosing a learning path

Each series contains 28 units across four stages. This is not a schedule requiring one unit a day. If you can explain the prerequisites, start with the unit you need and check its completion criteria before moving to the next exercise.

- Web fundamentals: HTML → CSS → JavaScript → TypeScript. Learn meaningful documents and input, state changes, asynchronous work, and type boundaries.
- UI design: Choose React, Vue, or Svelte first. Implement the same list and notes problem in different frameworks to compare ownership of state and resources.
- Graphics: Canvas 2D and SVG → WebGL Journey → Three.js and GLSL. Connect 2D coordinates, scene graphs, cameras, and shaders. PixiJS covers 2D rendering; React Three Fiber combines React and Three.js.
- Advanced GPU: Study WebGPU and WGSL together. Separate the boundaries of pipelines, memory layout, and compute. Start Gaussian Splatting after understanding cameras, projection, and compositing.
- Interaction: GSAP and Motion cover the relationship between time and state, interruption and recovery, keyboards, and reduced motion settings.
- Execution structure and verification: Web Workers → OffscreenCanvas; choose WebAssembly when needed. Playwright is a path for repeatedly verifying real user flows and saving and restoring data.

## Outcomes of the four stages

1. **Foundations:** Explain the technology's execution model and inputs and outputs with small examples.
2. **Core features:** Separate key boundaries such as state, coordinates, and resources, and expand through the existing 02 example.
3. **Application:** Reproduce failures, cancellation, resizing, and support limits; compare baseline and modified conditions.
4. **Integration:** Complete a project starting from the existing 03 example and document how to run it, verification records, and remaining limits.

Each series index has stage names adapted to the technology and 28 documents. WebGL Journey keeps its existing flow: scenes → GLSL → GS → integrated viewer.

## Current scope

Documents, examples, and notes are provided for 644 units. The existing 94 examples are retained, and examples for individual concepts are linked to the 550 new units. Browser experiments are distinguished from files requiring separate execution; simply opening an example does not complete an exercise. Each document and the [example guide](examples.md) describe separate execution environments and the limits of built-in examples.

No learning duration or professional skill level is guaranteed. Use each unit's completion criteria and experiment records as your measure.
