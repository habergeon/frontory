# OffscreenCanvas

[Frontory technology map](../../README.md)

Engineering · 4 stages · 28 units in the full series · 12 published in English

## Series goal

Design Canvas ownership and size·input protocols, and evaluate the benefits and costs of Worker rendering.

## Prerequisites

Canvas 2D·Web Workers

## Practice approach and scope

Learning units are not calendar days. Read the explanation and tasks, check the completion criteria, then move on. Use each example as a starting point: change variables and observe the results. Built-in examples and tasks requiring a separate environment are identified separately. Opening an example does not complete a unit.

Existing unit IDs and notes are preserved. The original 01, 02, and 03 examples occupy positions 1, 14, and 28 in the expanded sequence, so the number in the address may differ from the learning order.

Only published English units are linked below. The full series has 28 units.

## Learning path

### Stage 1 · Control and the First Render

- [01. Transferring Canvas Control](01-foundations/README.md) — Editable example
- [02. Renderer Contract](units/02/README.md) — Editable example
- [03. Initialization Handshake](units/03/README.md) — Editable example
- [04. Context Creation Failure](units/04/README.md) — Editable example
- [05. Coordinate Units](units/05/README.md) — Editable example
- [06. Frame Timing](units/06/README.md) — Editable example
- [07. Basic Rendering Validation](units/07/README.md) — Editable example

### Stage 2 · Synchronizing Size and Input

- [08. Resize Messages](units/08/README.md) — Editable example
- [09. Resize Sequence Numbers](units/09/README.md) — Editable example
- [10. Detecting DPR Changes](units/10/README.md) — Editable example
- [11. Transforming Pointer Coordinates](units/11/README.md) — Editable example
- [12. Coalescing Input](units/12/README.md) — Editable example

### Stage 3 · Rendering Lifecycle and Recovery


### Stage 4 · Responsiveness Comparison Project


## Capstone project and deliverables

Run the same particle scene on the main thread and in a Worker, comparing resize·input·errors·stop·restart behavior.

Keep the implementation, run instructions, baseline and changed conditions, failure cases, and recovery steps together. Do not report unmeasured performance or tests you have not run as results.

## Official references

- [MDN OffscreenCanvas](https://developer.mozilla.org/en-US/docs/Web/API/OffscreenCanvas)
- [MDN Using Web Workers](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers)
