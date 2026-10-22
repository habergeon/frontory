# React Three Fiber · 15 Model Loading and Suspense

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Models, Shared Resources, and Instancing · External example · preview instructions · Storage ID: `react-three-fiber-step-15`

## Goals and learning outcomes

- The model appears at a valid URL.
- An invalid URL shows error guidance instead of a blank screen.

## Prerequisites

Unit 15 continues using the deliverables and experiment records from Unit 14.

## Key concepts and explanations

### Loader

useLoader reads and caches resources by loader and URL. Results for the same URL may be shared, so check ownership.

### Waiting and Failure

Suspense displays a fallback while loading. Handle loading failures with a separate error boundary and recovery behavior.

## Practice setup

First check the execution scope guidance on the example screen. The following describes preparation for extending the assignment in a separate project. Use JSX in a separate React Vite project. Record compatible major versions of React and @react-three/fiber, the Three.js version, and the lockfile. This course uses stable WebGL-based APIs and does not mix in alpha WebGPU APIs. Handle frame updates with useFrame and ref.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. Place a small GLB whose usage rights you have checked and a source record in public/models.
2. Use useLoader(GLTFLoader,url) and primitive in src/Model.jsx.
3. Add a Suspense fallback scene and an error boundary outside Canvas, and test valid and missing URLs.

## Variables to observe

| Variable | Baseline | Change | Expected change / hypothesis |
| --- | --- | --- | --- |
| Model URL | Valid GLB | Missing GLB | Failure guidance appears, and other UI controls remain usable. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] The model appears at a valid URL.
- [ ] An invalid URL shows error guidance instead of a blank screen.

## Self-check

1. Does Suspense fallback automatically handle loading errors too?
2. Who should call dispose when a URL cache is shared?

## Official references

- [R3F Model Loading](https://r3f.docs.pmnd.rs/tutorials/loading-models)
- [R3F Hooks](https://r3f.docs.pmnd.rs/api/hooks)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/react-three-fiber-step-15/example.js) · [Runtime environments and limits](../../../../../examples.md)

The preview performs actual JSON model loading with Three ObjectLoader. GLB, Suspense, and error boundary experiments require the external App.jsx and a valid /model.glb.

- [App.jsx](../../../../../../../src/labs/react-three-fiber-step-15/App.jsx)

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Frames and Events](../../02-experiments/README.md) · [Next: Cloning and Sharing Cached Models](../16/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions
