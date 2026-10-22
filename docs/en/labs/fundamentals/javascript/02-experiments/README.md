# JavaScript · 14 Asynchrony and Cancellation

[Series contents](../README.md) · [Technology map](../../../README.md)

Stage: DOM and asynchronous operations · Editable example · Storage ID: `javascript-02`

## Goals and learning outcomes

- The second search term remains on screen even when responses finish in reverse order.
- Distinguish cancellation logs from ordinary failure logs.

## Prerequisites

The work and experiment records from Unit 13, “Promises and Execution Order”

## Key concepts and explanations

### Response Races

Requests may finish in a different order from the order in which they were made. Checking the request id prevents stale responses from being applied.

### Cancellation Signals

The signal from AbortController communicates cancellation. A mock function must also handle the signal to actually stop.

## Practice setup

Frontory's existing preview is a limited starter example, not a complete solution to the assignment. Implement additional files and features yourself in a separate local project. In a separate folder, connect your practice JS from index.html using script type="module" and open it through a local HTTP server. Use the Console, Network, and Elements panels.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. In search.js, prepare two searches 100ms apart, with the second response taking 100ms.
2. Implement request id checks and signal handling in the delayed mock search, and display the final result.
3. Run two searches 100ms apart, with the second response taking 100ms. Results to check: The second search term remains on screen even when responses finish in reverse order. Distinguish cancellation logs from ordinary failure logs. Record expected and actual results separately.

## Variables to observe

| Variable | Baseline | Change | Expected change / hypothesis |
| --- | --- | --- | --- |
| First response delay | 50ms | 800ms | Hypothesis before running: The latest search result will be preserved. Keep the other conditions fixed and record the actual result separately after running. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] The second search term remains on screen even when responses finish in reverse order.
- [ ] Distinguish cancellation logs from ordinary failure logs.

## Self-check

1. Which paths still need an id check after cancellation?
2. Must the current request also be checked when ending the loading state?

## Official references

- [MDN JavaScript Guide](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide)
- [MDN AbortController](https://developer.mozilla.org/en-US/docs/Web/API/AbortController)

## Linked example and execution scope

[Example source](../../../../../../src/labs/javascript-02/example.js) · [Runtime environments and limits](../../../../examples.md)

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Promises and Execution Order](../units/13/README.md) · [Next: Fetch Responses and HTTP Errors](../units/15/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions
