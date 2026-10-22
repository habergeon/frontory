# JavaScript · 13 Promises and Execution Order

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: DOM and asynchronous operations · Editable example · Storage ID: `javascript-step-13`

## Goals and learning outcomes

- Record the actual order of the three types of logs.
- A reject is handled once in the final catch.

## Prerequisites

The work and experiment records from Unit 12, “Event Propagation and Delegation”

## Key concepts and explanations

### Microtasks

Promise reaction callbacks are processed after synchronous code finishes. Their execution order is determined in a different queue from timer callbacks.

### Returning from a Chain

If you return a Promise from then, the next step waits for its result. Omitting the return separates the inner work from the following step.

## Practice setup

First check the execution scope guidance on the example screen. The following environment is for extending the assignment in a separate project. Implement it yourself in a separate local project and check it with browser developer tools. In a separate folder, connect your practice JS from index.html using script type="module" and open it through a local HTTP server. Use the Console, Network, and Elements panels.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. In order.js, prepare two delayed operations and one reject.
2. Place synchronous, then, and setTimeout logs, and compare returning versus omitting a return and how reject propagates.
3. Run with two delayed operations and one reject. Results to check: Record the actual order of the three types of logs. A reject is handled once in the final catch. Record expected and actual results separately.

## Variables to observe

| Variable | Baseline | Change | Expected change / hypothesis |
| --- | --- | --- | --- |
| Return from then | Return a Promise | Omit the return | Hypothesis before running: The following step may proceed before the inner work. Keep the other conditions fixed and record the actual result separately after running. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Record the actual order of the three types of logs.
- [ ] A reject is handled once in the final catch.

## Self-check

1. Does await stop the thread?
2. Where does a failure go if the Promise was not returned?

## Official references

- [MDN JavaScript Guide](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/javascript-step-13/example.js) · [Runtime environments and limits](../../../../../examples.md)

Compare the editable inputs with actual browser execution results.


Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Event Propagation and Delegation](../12/README.md) · [Next: Asynchrony and Cancellation](../../02-experiments/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions
