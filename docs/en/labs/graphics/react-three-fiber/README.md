# React Three Fiber

[Frontory technology map](../../README.md)

Graphics · 4 stages · 28 units in the full series · 27 published in English

## Series goal

Build Three.js scenes with React components, and manage frame values, selection state, and shared resource lifetimes separately.

## Prerequisites

React effect and ref; Three.js

## Practice approach and scope

Learning units are not calendar days. Read the explanation and tasks, check the completion criteria, then move on. Use each example as a starting point: change variables and observe the results. Built-in examples and tasks requiring a separate environment are identified separately. Opening an example does not complete a unit.

Existing unit IDs and notes are preserved. The original 01, 02, and 03 examples occupy positions 1, 14, and 28 in the expanded sequence, so the number in the address may differ from the learning order.

Only published English units are linked below. The full series has 28 units.

## Learning path

### Stage 1 · Declarative Scenes and Frame Coordinates

- [01. Declarative Scenes](01-foundations/README.md) — Editable example
- [02. Canvas Size and Camera](units/02/README.md) — Editable example
- [03. args and Object Recreation](units/03/README.md) — Editable example
- [04. group and Local Coordinates](units/04/README.md) — Editable example
- [05. Materials and Lighting](units/05/README.md) — Editable example
- [06. Reading Three.js Objects through ref](units/06/README.md) — Editable example
- [07. useFrame and Time-based Rotation](units/07/README.md) — Editable example

### Stage 2 · 3D Input and UI State

- [08. useThree Scope and Selection](units/08/README.md) — Editable example
- [09. Camera Control and projection Updates](units/09/README.md) — Editable example
- [10. Pointer Intersections and Selection](units/10/README.md) — Editable example
- [11. Event Propagation and Occlusion](units/11/README.md) — Editable example
- [12. Dragging and Pointer Capture](units/12/README.md) — Editable example
- [13. UI State and Frame Targets](units/13/README.md) — Editable example
- [14. Frames and Events](02-experiments/README.md) — Editable example

### Stage 3 · Models, Shared Resources, and Instancing

- [15. Model Loading and Suspense](units/15/README.md) — External example · preview instructions
- [16. Cloning and Sharing Cached Models](units/16/README.md) — Editable example
- [17. Texture Inputs and Updates](units/17/README.md) — Editable example
- [18. Shared geometry and material](units/18/README.md) — Editable example
- [19. Reducing Allocations during Frames](units/19/README.md) — Editable example
- [20. Drawing Repeated Objects with instancedMesh](units/20/README.md) — Editable example
- [21. Instance Selection and Bounds](units/21/README.md) — Editable example

### Stage 4 · demand Policy and Performance Verification

- [22. demand Rendering](units/22/README.md) — Editable example
- [23. demand and Ending Motion](units/23/README.md) — Editable example
- [24. DPR and Shadow Cost](units/24/README.md) — Editable example
- [25. Scene Switching and Resource Audits](units/25/README.md) — Editable example
- [26. Alternative Controls and Errors in 3D UI](units/26/README.md) — Editable example
- [27. Performance Experiments for the Integrated Scene](units/27/README.md) — Editable example

## Capstone project and deliverables

A 3D learning scene with selection and notes, a comparison of individual mesh objects and instancing, demand behavior verification, and a resource ownership report.

Keep the implementation, run instructions, baseline and changed conditions, failure cases, and recovery steps together. Do not report unmeasured performance or tests you have not run as results.

## Official references

- [R3F Getting Started and React Version Compatibility](https://r3f.docs.pmnd.rs/getting-started/introduction)
- [R3F Objects and Resource Disposal](https://r3f.docs.pmnd.rs/api/objects)
- [R3F Canvas Configuration](https://r3f.docs.pmnd.rs/api/canvas)
- [R3F Hooks](https://r3f.docs.pmnd.rs/api/hooks)
- [R3F Performance Pitfalls](https://r3f.docs.pmnd.rs/advanced/pitfalls)
- [R3F Pointer Events](https://r3f.docs.pmnd.rs/api/events)
- [R3F Model Loading](https://r3f.docs.pmnd.rs/tutorials/loading-models)
- [R3F Scaling Performance and demand Rendering](https://r3f.docs.pmnd.rs/advanced/scaling-performance)
