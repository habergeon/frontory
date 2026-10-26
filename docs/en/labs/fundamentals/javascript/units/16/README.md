# JavaScript · 16 Parallel Work and Partial Failure

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Modules and data boundaries · Editable example · Storage ID: `javascript-step-16`

## Goals and learning outcomes

- Distinguish completion order from the order of the returned array.
- The partial-failure screen retains 2 successful items.

## Prerequisites

The work and experiment records from Unit 15, “Fetch Responses and HTTP Errors”

## Key concepts and explanations

### All Tasks Succeed

Promise.all returns successful results in input order. If one input rejects, the resulting Promise also rejects.

### Partial Results

allSettled collects the success or failure of each operation. Decide whether to display only successful items as a product policy.

## Practice setup

First check the execution scope guidance on the example screen. The following environment is for extending the assignment in a separate project. Implement it yourself in a separate local project and check it with browser developer tools. In a separate folder, connect your practice JS from index.html using script type="module" and open it through a local HTTP server. Use the Console, Network, and Elements panels.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. In batch.js, prepare different delays and a failure in the second operation.
2. Run 3 delayed operations with all and allSettled, and output their result order and status.
3. Compare all-success with {"reject":-1} and second-job failure with {"reject":1}. Check for 2 successes and 1 failure and the input order of the returned array. Log completion events in your separate batch.js to distinguish completion order from return order. This starter observes all after allSettled and does not measure when all first rejects.

## Variables to observe

| Variable | Baseline | Change | Expected change / hypothesis |
| --- | --- | --- | --- |
| Failure target index | -1 (no failure) | 1 (second job) | Hypothesis before running: It will be possible to separate 2 successes and 1 failure. Keep the other conditions fixed and record the actual result separately after running. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Distinguish completion order from the order of the returned array.
- [ ] The partial-failure screen retains 2 successful items.

## Self-check

1. Does a failure in all cancel the remaining operations?
2. How should partial failure be communicated?

## Official references

- [MDN JavaScript Guide](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/javascript-step-16/example.js) · [Runtime environments and limits](../../../../../examples.md)

Compare the editable inputs with actual browser execution results.


Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Fetch Responses and HTTP Errors](../15/README.md) · [Next: Debouncing and Timer Cleanup](../17/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions
