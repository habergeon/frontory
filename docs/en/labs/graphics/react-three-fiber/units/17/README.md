# React Three Fiber · 17 Texture Inputs and Updates

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Models, Shared Resources, and Instancing · Editable example · Storage ID: `react-three-fiber-step-17`

## Goals and learning outcomes

- Record texture types and color space settings.
- Provide comparison images at two resolutions with the same camera.

## Prerequisites

Unit 17 continues using the deliverables and experiment records from Unit 16.

## Key concepts and explanations

### Texture Meaning

Color textures differ in meaning from data textures such as normal and roughness. Check color space settings for each texture type.

### Memory Cost

Texture resolution affects GPU memory as well as download size. Compare this with the visual quality gained.

## Practice setup

First check the execution scope guidance on the example screen. The following describes preparation for extending the assignment in a separate project. Use JSX in a separate React Vite project. Record compatible major versions of React and @react-three/fiber, the Three.js version, and the lockfile. This course uses stable WebGL-based APIs and does not mix in alpha WebGPU APIs. Handle frame updates with useFrame and ref.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. Prepare a small color texture whose usage rights you have checked in public/textures.
2. Connect TextureLoader and the material map in src/TexturedBox.jsx.
3. Compare versions at resolutions 256 and 1024 with the same camera, and record dimensions and file sizes.

## Variables to observe

| Variable           | Baseline | Change    | Expected change / hypothesis            |
| ------------------ | -------- | --------- | --------------------------------------- |
| Texture Resolution | 256×256  | 1024×1024 | Both detail and memory cost may change. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Record texture types and color space settings.
- [ ] Provide comparison images at two resolutions with the same camera.

## Self-check

1. Is compressed file size the same as GPU memory usage?
2. What errors arise if a roughness texture is treated as color data?

## Official references

- [R3F Hooks](https://r3f.docs.pmnd.rs/api/hooks)
- [R3F Model Loading](https://r3f.docs.pmnd.rs/tutorials/loading-models)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/react-three-fiber-step-17/example.js) · [Runtime environments and limits](../../../../../examples.md)

This is an actual React Three Fiber Canvas experiment. A browser with WebGL support is required.

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Cloning and Sharing Cached Models](../16/README.md) · [Next: Shared geometry and material](../18/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions
