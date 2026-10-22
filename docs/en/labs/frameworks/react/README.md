# React

[Frontory technology map](../../README.md)

UI frameworks · 4 stages · 28 units in the full series · 25 published in English

## Series goal

Explain state ownership and Effect lifetimes, and build a learning editor that combines per-unit notes, search, and Canvas.

## Prerequisites

JavaScript, TypeScript, and DOM events

## Practice approach and scope

Learning units are not calendar days. Read the explanation and tasks, check the completion criteria, then move on. Use each example as a starting point: change variables and observe the results. Built-in examples and tasks requiring a separate environment are identified separately. Opening an example does not complete a unit.

Existing unit IDs and notes are preserved. The original 01, 02, and 03 examples occupy positions 1, 14, and 28 in the expanded sequence, so the number in the address may differ from the learning order.

Only published English units are linked below. The full series has 28 units.

## Learning path

### Stage 1 · Components and state calculations

- [01. State and Ownership](01-foundations/README.md) — Editable example
- [02. JSX and Pure Rendering](units/02/README.md) — Editable example
- [03. Events and state snapshots](units/03/README.md) — Editable example
- [04. Updating Objects and Arrays](units/04/README.md) — Editable example
- [05. Conditional Screens and Empty States](units/05/README.md) — Editable example
- [06. List Keys and Identity](units/06/README.md) — Editable example
- [07. Controlled Inputs and Form Validation](units/07/README.md) — Editable example

### Stage 2 · Shared state and external systems

- [08. Lifting State Up](units/08/README.md) — Editable example
- [09. Collecting Update Rules in a Reducer](units/09/README.md) — Editable example
- [10. Passing Settings with Context](units/10/README.md) — Editable example
- [11. Refs and DOM Focus](units/11/README.md) — Editable example
- [12. Effect Dependencies and Cleanup](units/12/README.md) — Editable example
- [13. Request Races and Cancellation](units/13/README.md) — Editable example
- [14. Effects and External Renderers](02-experiments/README.md) — Editable example

### Stage 3 · Preserving notes and measuring renders

- [15. Custom Hook Boundaries](units/15/README.md) — Editable example
- [16. Saving Notes and Initial Restoration](units/16/README.md) — Editable example
- [17. Preserving State by Unit](units/17/README.md) — Editable example
- [18. Component Composition and children](units/18/README.md) — Editable example
- [19. Making Asynchronous State Explicit](units/19/README.md) — Editable example
- [20. Transitions and Deferred Results](units/20/README.md) — Editable example
- [21. Finding Bottlenecks with Profiler](units/21/README.md) — Editable example

### Stage 4 · Performance verification and an integrated editor

- [22. Memoizing Only Measured Paths](units/22/README.md) — Editable example
- [23. Display Ranges for Long Lists](units/23/README.md) — Editable example
- [24. Event Boundaries and Accessible Selection](units/24/README.md) — Editable example
- [25. Subscription Stores and Snapshots](units/25/README.md) — Editable example

## Capstone project and deliverables

Submit a learning editor that preserves notes, a resource audit table, and Profiler records compared using the same inputs.

Keep the implementation, run instructions, baseline and changed conditions, failure cases, and recovery steps together. Do not report unmeasured performance or tests you have not run as results.

## Official references

- [React Learning Guide](https://react.dev/learn)
- [React API Reference](https://react.dev/reference/react)
- [React state as a snapshot](https://react.dev/learn/state-as-a-snapshot)
- [React state update queues and batching](https://react.dev/learn/queueing-a-series-of-state-updates)
- [React passing event handlers](https://react.dev/learn/responding-to-events)
- [useState updaters and Strict Mode](https://react.dev/reference/react/useState#my-initializer-or-updater-function-runs-twice)
- [React: Preserving and Resetting State](https://react.dev/learn/preserving-and-resetting-state)
- [React useEffect: External Systems and Cleanup](https://react.dev/reference/react/useEffect)
- [React useDeferredValue and the memo Boundary for Slow Children](https://react.dev/reference/react/useDeferredValue#deferring-re-rendering-for-a-part-of-the-ui)
