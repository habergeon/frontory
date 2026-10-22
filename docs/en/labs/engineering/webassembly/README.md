# WebAssembly

[Frontory technology map](../../README.md)

Engineering · 4 stages · 28 units in the full series · 27 published in English

## Series goal

Call actual Wasm modules and distinguish linear memory·copying·numeric representation·initialization costs.

## Prerequisites

JavaScript·TypedArray, basics of the chosen compiled language

## Practice approach and scope

Learning units are not calendar days. Read the explanation and tasks, check the completion criteria, then move on. Use each example as a starting point: change variables and observe the results. Built-in examples and tasks requiring a separate environment are identified separately. Opening an example does not complete a unit.

Existing unit IDs and notes are preserved. The original 01, 02, and 03 examples occupy positions 1, 14, and 28 in the expanded sequence, so the number in the address may differ from the learning order.

Only published English units are linked below. The full series has 28 units.

## Learning path

### Stage 1 · Modules and Numeric Contracts

- [01. Modules and Linear Memory](01-foundations/README.md) — Editable example
- [02. WAT and Binary](units/02/README.md) — External example · preview instructions
- [03. Compile and Instance](units/03/README.md) — External example · preview instructions
- [04. Inspecting Exports](units/04/README.md) — External example · preview instructions
- [05. Imports and Host Functions](units/05/README.md) — External example · preview instructions
- [06. I32 and JS Number](units/06/README.md) — External example · preview instructions
- [07. Traps and Input Validation](units/07/README.md) — External example · preview instructions

### Stage 2 · Memory and Array Boundaries

- [08. Pages and Byte Offset](units/08/README.md) — External example · preview instructions
- [09. Views and Endianness](units/09/README.md) — External example · preview instructions
- [10. Array Copies and Bounds](units/10/README.md) — External example · preview instructions
- [11. Memory Grow and View Lifetime](units/11/README.md) — External example · preview instructions
- [12. Capacity Limits and Failure](units/12/README.md) — External example · preview instructions
- [13. Scalar and Batch Calls](units/13/README.md) — External example · preview instructions
- [14. Arrays and Boundary Costs](02-experiments/README.md) — Editable example

### Stage 3 · Deployment and Execution Structure

- [15. In-place Transformation](units/15/README.md) — External example · preview instructions
- [16. Aligned and Unaligned Access](units/16/README.md) — External example · preview instructions
- [17. Laying Out Multiple Arrays](units/17/README.md) — External example · preview instructions
- [18. String Byte Contracts](units/18/README.md) — External example · preview instructions
- [19. Browser Loading and MIME](units/19/README.md) — External example · preview instructions
- [20. Reusing Initialization](units/20/README.md) — External example · preview instructions
- [21. Workers and Wasm](units/21/README.md) — External example · preview instructions

### Stage 4 · Correctness and Bottleneck Evaluation

- [22. Module Caching and Versions](units/22/README.md) — External example · preview instructions
- [23. Breaking Down Cold Execution](units/23/README.md) — External example · preview instructions
- [24. Warm Repeats and Warm-up](units/24/README.md) — External example · preview instructions
- [25. Total Cost Including Copies](units/25/README.md) — External example · preview instructions
- [26. Boundary-value Correctness](units/26/README.md) — External example · preview instructions
- [27. Environment and Adoption Criteria](units/27/README.md) — External example · preview instructions

## Capstone project and deliverables

Validate array transformations in JS and actual Wasm, then decide whether to adopt Wasm using cold·warm·copy-inclusive end-to-end latency.

Keep the implementation, run instructions, baseline and changed conditions, failure cases, and recovery steps together. Do not report unmeasured performance or tests you have not run as results.

## Official references

- [WebAssembly Developer’s Guide](https://webassembly.org/getting-started/developers-guide/)
- [MDN WebAssembly JavaScript API](https://developer.mozilla.org/en-US/docs/WebAssembly/Guides/Using_the_JavaScript_API)
- [MDN WebAssembly.Memory](https://developer.mozilla.org/en-US/docs/WebAssembly/Reference/JavaScript_interface/Memory)
