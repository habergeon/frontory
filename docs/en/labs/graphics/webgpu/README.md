# WebGPU

[Frontory technology map](../../README.md)

Graphics · 4 stages · 28 units in the full series · 27 published in English

## Series goal

Understand WebGPU devices, resources, and the command model, and validate rendering and compute through correctness and overall cost.

## Prerequisites

WebGL pipeline, TypedArray, and asynchronous JavaScript

## Practice approach and scope

Learning units are not calendar days. Read the explanation and tasks, check the completion criteria, then move on. Use each example as a starting point: change variables and observe the results. Built-in examples and tasks requiring a separate environment are identified separately. Opening an example does not complete a unit.

Existing unit IDs and notes are preserved. The original 01, 02, and 03 examples occupy positions 1, 14, and 28 in the expanded sequence, so the number in the address may differ from the learning order.

Only published English units are linked below. The full series has 28 units.

## Learning path

### Stage 1 · Device and Command Fundamentals

- [01. Adapter·Device·Pipeline](01-foundations/README.md) — Editable example
- [02. Negotiating Features and limits](units/02/README.md) — Editable example
- [03. Canvas Configuration and the Current Texture](units/03/README.md) — Editable example
- [04. Recording and Submitting Commands](units/04/README.md) — Editable example
- [05. Shader Modules and Diagnostics](units/05/README.md) — Editable example
- [06. Vertex Buffers and Attributes](units/06/README.md) — Editable example
- [07. Indices and Primitives](units/07/README.md) — Editable example

### Stage 2 · Render Resources and Display Configuration

- [08. Uniforms and Bind Groups](units/08/README.md) — Editable example
- [09. Uniform Struct Alignment](units/09/README.md) — Editable example
- [10. Matrices and Cameras](units/10/README.md) — Editable example
- [11. Textures and Samplers](units/11/README.md) — Editable example
- [12. Depth Attachments](units/12/README.md) — Editable example
- [13. Resize and Sample Count](units/13/README.md) — Editable example
- [14. Buffers and Render Passes](02-experiments/README.md) — Editable example

### Stage 3 · Compute and Data Movement

- [15. A First Compute Array Transform](units/15/README.md) — Editable example
- [16. Storage and Ping-Pong](units/16/README.md) — Editable example
- [17. Mapping and Staging Buffers](units/17/README.md) — Editable example
- [18. Copy Alignment and Texture Rows](units/18/README.md) — Editable example
- [19. Workgroup Shared Memory](units/19/README.md) — Editable example
- [20. Rendering Compute Results](units/20/README.md) — Editable example
- [21. Instancing and Data Structures](units/21/README.md) — Editable example

### Stage 4 · Recovery, Measurement, and an Integrated Project

- [22. Device Loss and Reinitialization](units/22/README.md) — Editable example
- [23. Asynchronous Errors and Task Identity](units/23/README.md) — Editable example
- [24. The Scope of Timing](units/24/README.md) — Editable example
- [25. CPU References and Error Budgets](units/25/README.md) — Editable example
- [26. Workgroup Size Experiments](units/26/README.md) — Editable example
- [27. Acceptance of the Integrated Particle Experiment](units/27/README.md) — Editable example

## Capstone project and deliverables

A small particle experiment with support guidance, device loss recovery, compute updates, and readback validation

Keep the implementation, run instructions, baseline and changed conditions, failure cases, and recovery steps together. Do not report unmeasured performance or tests you have not run as results.

## Official references

- [WebGPU API and Error Handling](https://developer.mozilla.org/en-US/docs/Web/API/WebGPU_API)
- [WGSL Specification](https://www.w3.org/TR/WGSL/)
