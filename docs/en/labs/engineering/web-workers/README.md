# Web Workers

[Frontory technology map](../../README.md)

Engineering · 4 stages · 28 units in the full series · 24 published in English

## Series goal

Design Worker communication contracts and buffer ownership, and measure the costs of cancellation, queues, and recovery.

## Prerequisites

JavaScript asynchronous behavior and TypedArray

## Practice approach and scope

Learning units are not calendar days. Read the explanation and tasks, check the completion criteria, then move on. Use each example as a starting point: change variables and observe the results. Built-in examples and tasks requiring a separate environment are identified separately. Opening an example does not complete a unit.

Existing unit IDs and notes are preserved. The original 01, 02, and 03 examples occupy positions 1, 14, and 28 in the expanded sequence, so the number in the address may differ from the learning order.

Only published English units are linked below. The full series has 28 units.

## Learning path

### Stage 1 · Messages and Execution Contexts

- [01. Messages and Execution Boundaries](01-foundations/README.md) — Editable example
- [02. Module Worker Loading](units/02/README.md) — Editable example
- [03. Message Contracts](units/03/README.md) — Editable example
- [04. Structured Clone](units/04/README.md) — Editable example
- [05. TypedArray and Buffer](units/05/README.md) — Editable example
- [06. Error Response Contracts](units/06/README.md) — Editable example
- [07. Observing Main-Thread Responsiveness](units/07/README.md) — Editable example

### Stage 2 · Ownership and Cancellation

- [08. Transfer Ownership](units/08/README.md) — Editable example
- [09. Transferring a Partial View](units/09/README.md) — Editable example
- [10. Returning Buffers](units/10/README.md) — Editable example
- [11. Rejecting Stale Results](units/11/README.md) — Editable example
- [12. Cooperative Cancellation](units/12/README.md) — Editable example
- [13. Termination and Recreation](units/13/README.md) — Editable example
- [14. Transfer and Cancellation](02-experiments/README.md) — Editable example

### Stage 3 · Queues and Error Recovery

- [15. Progress Reporting](units/15/README.md) — Editable example
- [16. A Bounded Task Queue](units/16/README.md) — Editable example
- [17. Worker Pool](units/17/README.md) — Editable example
- [18. Restoring Result Order](units/18/README.md) — Editable example
- [19. Timeouts and Duplicate Responses](units/19/README.md) — Editable example
- [20. Failure Recovery](units/20/README.md) — Editable example
- [21. Separating MessageChannels](units/21/README.md) — Editable example

### Stage 4 · Validating Throughput and Responsiveness

- [22. Splitting and Merging Data](units/22/README.md) — Editable example
- [23. Shared Memory Requirements](units/23/README.md) — Editable example
- [24. Atomics and Synchronization](units/24/README.md) — Editable example

## Capstone project and deliverables

Build a cancellable array-processing queue and compare correctness, end-to-end latency, and input responsiveness on the main thread and Workers.

Keep the implementation, run instructions, baseline and changed conditions, failure cases, and recovery steps together. Do not report unmeasured performance or tests you have not run as results.

## Official references

- [MDN Using Web Workers](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers)
- [MDN Transferable objects](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Transferable_objects)
