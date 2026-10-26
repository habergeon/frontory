# JavaScript · 17 Debouncing and Timer Cleanup

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Modules and data boundaries · Editable example · Storage ID: `javascript-step-17`

## Goals and learning outcomes

- With the 300ms setting, there is 1 search call.
- There are 0 pending search calls after dispose.

## Prerequisites

The work and experiment records from Unit 16, “Parallel Work and Partial Failure”

## Key concepts and explanations

### Grouping Input

Debouncing cancels the previous timer on every new input. It runs after the specified time has elapsed since the last input.

### Lifecycle

Clear pending timers when removing the screen. Cancellation of requests that have already started is handled separately.

## Practice setup

First check the execution scope guidance on the example screen. The following environment is for extending the assignment in a separate project. Implement it yourself in a separate local project and check it with browser developer tools. In a separate folder, connect your practice JS from index.html using script type="module" and open it through a local HTTP server. Use the Console, Network, and Elements panels.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. In debounce.js, prepare inputs 100ms apart, 5 times, and a dispose call while a search is pending.
2. Use clearTimeout to delay the search, and cancel pending work in dispose.
3. Run with inputs 100ms apart, 5 times, and a dispose call while a search is pending. Results to check: With the 300ms setting, there is 1 search call. There are 0 pending search calls after dispose. Record expected and actual results separately.

## Variables to observe

| Variable | Baseline | Change | Expected change / hypothesis                                                                                                                                                          |
| -------- | -------- | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Delay    | 0ms      | 300ms  | Hypothesis before running: Search calls will be grouped into a single call for the last input. Keep the other conditions fixed and record the actual result separately after running. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] With the 300ms setting, there is 1 search call.
- [ ] There are 0 pending search calls after dispose.

## Self-check

1. How does debouncing differ from request cancellation?
2. When should the search term be captured?

## Official references

- [MDN JavaScript Guide](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/javascript-step-17/example.js) · [Runtime environments and limits](../../../../../examples.md)

Compare the editable inputs with actual browser execution results.

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Parallel Work and Partial Failure](../16/README.md) · [Next: Public Interfaces of ES Modules](../18/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions
