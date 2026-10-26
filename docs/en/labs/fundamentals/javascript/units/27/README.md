# JavaScript · 27 Listener Cleanup and Repeated Mounting

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Integrating and verifying the experiment log · Editable example · Storage ID: `javascript-step-27`

## Goals and learning outcomes

- After 5 remounts, there is 1 processing log entry.
- Calling dispose twice causes no exceptions and leaves no timers.

## Prerequisites

The work and experiment records from Unit 26, “Computational Cost and Splitting Work”

## Key concepts and explanations

### Resource Ownership

Release resources created in mount in dispose. removeEventListener requires the same function reference.

### Idempotent Cleanup

Repeated calls to dispose must have no side effects. Asynchronous callbacks that arrive after cleanup must also be blocked.

## Practice setup

First check the execution scope guidance on the example screen. The following environment is for extending the assignment in a separate project. Implement it yourself in a separate local project and check it with browser developer tools. In a separate folder, connect your practice JS from index.html using script type="module" and open it through a local HTTP server. Use the Console, Network, and Elements panels.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. In lifecycle.js, prepare 5 mount/unmount cycles followed by a single click.
2. Have mount return dispose, and clean up all listeners, timers, and in-flight requests.
3. Run with 5 mount/unmount cycles followed by a single click. Results to check: After 5 remounts, there is 1 processing log entry. Calling dispose twice causes no exceptions and leaves no timers. Record expected and actual results separately.

## Variables to observe

| Variable   | Baseline | Change  | Expected change / hypothesis                                                                                                                             |
| ---------- | -------- | ------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Remounting | 1 time   | 5 times | Hypothesis before running: A single click will be handled 1 time. Keep the other conditions fixed and record the actual result separately after running. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] After 5 remounts, there is 1 processing log entry.
- [ ] Calling dispose twice causes no exceptions and leaves no timers.

## Self-check

1. Does removing a node also remove all external listeners?
2. Where should responses for a disposed widget be blocked?

## Official references

- [MDN JavaScript Guide](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/javascript-step-27/example.js) · [Runtime environments and limits](../../../../../examples.md)

Compare the editable inputs with actual browser execution results.

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Computational Cost and Splitting Work](../26/README.md) · [Next: Modular Experiment Journal](../../03-project/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions
