# WGSL

[Frontory technology map](../../README.md)

Shaders · 4 stages · 28 units in the full series · 21 published in English

## Series goal

Understand WGSL types, stage interfaces, address spaces, memory layout, and parallel control flow, and write verifiable kernels.

## Prerequisites

WebGPU buffers and pipelines, vectors

## Practice approach and scope

Learning units are not calendar days. Read the explanation and tasks, check the completion criteria, then move on. Use each example as a starting point: change variables and observe the results. Built-in examples and tasks requiring a separate environment are identified separately. Opening an example does not complete a unit.

Existing unit IDs and notes are preserved. The original 01, 02, and 03 examples occupy positions 1, 14, and 28 in the expanded sequence, so the number in the address may differ from the learning order.

Only published English units are linked below. The full series has 28 units.

## Learning path

### Stage 1 · Types and Shader Interfaces

- [01. Types and Entry Points](01-foundations/README.md) — Editable example
- [02. Literals and Explicit Numeric Types](units/02/README.md) — Editable example
- [03. Creating and Multiplying Vectors and Matrices](units/03/README.md) — Editable example
- [04. Const, Let, Var, and Override](units/04/README.md) — Editable example
- [05. Function and Structure Contracts](units/05/README.md) — Editable example
- [06. Conditions, Loops, and Termination](units/06/README.md) — Editable example
- [07. Interpolation and Stage Interfaces](units/07/README.md) — Editable example

### Stage 2 · Resource Declarations and Memory Layout

- [08. Address Spaces and Access Modes](units/08/README.md) — Editable example
- [09. Groups, Bindings, and Host Connections](units/09/README.md) — Editable example
- [10. Scalar and Vector Alignment](units/10/README.md) — Editable example
- [11. Matrix and Array Strides](units/11/README.md) — Editable example
- [12. Additional Uniform Layout Constraints](units/12/README.md) — Editable example
- [13. Runtime Arrays and Binding Ranges](units/13/README.md) — Editable example
- [14. Bindings and Memory Layout](02-experiments/README.md) — Editable example

### Stage 3 · Parallel Computation and Synchronization

- [15. Compute IDs and Indices](units/15/README.md) — Editable example
- [16. Bounds Checks and Empty Input](units/16/README.md) — Editable example
- [17. Workgroup Memory and Cooperation](units/17/README.md) — Editable example
- [18. Barriers and Uniform Control Flow](units/18/README.md) — Editable example
- [19. Atomics and Counters](units/19/README.md) — Editable example
- [20. Partial-Sum Reduction](units/20/README.md) — Editable example
- [21. Ping-pong and Data Races](units/21/README.md) — Editable example

### Stage 4 · Numeric Verification and Kernel Design


## Capstone project and deliverables

A small compute collection that verifies bounds, layout, and synchronization, and a comparison report against CPU references

Keep the implementation, run instructions, baseline and changed conditions, failure cases, and recovery steps together. Do not report unmeasured performance or tests you have not run as results.

## Official references

- [WGSL Specification](https://www.w3.org/TR/WGSL/)
- [WebGPU API](https://developer.mozilla.org/en-US/docs/Web/API/WebGPU_API)
