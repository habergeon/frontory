# Web Workers

[Frontory technology map](../../README.md)

Engineering · 4 stages · 28 units in the full series · 6 published in English

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

### Stage 2 · Ownership and Cancellation


### Stage 3 · Queues and Error Recovery


### Stage 4 · Validating Throughput and Responsiveness


## Capstone project and deliverables

Build a cancellable array-processing queue and compare correctness, end-to-end latency, and input responsiveness on the main thread and Workers.

Keep the implementation, run instructions, baseline and changed conditions, failure cases, and recovery steps together. Do not report unmeasured performance or tests you have not run as results.

## Official references

- [MDN Using Web Workers](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers)
- [MDN Transferable objects](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Transferable_objects)
