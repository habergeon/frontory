# JavaScript · 04 Branches and Early Returns

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Values and calculations · Editable example · Storage ID: `javascript-step-04`

## Goals and learning outcomes

- Record outputs for 3 normal cases and 2 error cases.
- Every returned object has an ok field.

## Prerequisites

The work and experiment records from Unit 3, “Equality Comparisons and Defaults”

## Key concepts and explanations

### Handling Invalid Input

An early return handles invalid input at the start of a function. It reduces nesting in the normal path while keeping return values in a consistent shape.

### Missing Branches

The default branch of a switch handles unexpected values. Treating an unknown value as a success hides the cause.

## Practice setup

First check the execution scope guidance on the example screen. The following environment is for extending the assignment in a separate project. Implement it yourself in a separate local project and check it with browser developer tools. In a separate folder, connect your practice JS from index.html using script type="module" and open it through a local HTTP server. Use the Console, Network, and Elements panels.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. In status.js, prepare the cases idle, running, done, null, and paused.
2. Convert each status into a display message and return ok and message on every path.
3. Run with idle, running, done, null, and paused. Results to check: Record outputs for 3 normal cases and 2 error cases. Every returned object has an ok field. Record expected and actual results separately.

## Variables to observe

| Variable | Baseline | Change | Expected change / hypothesis |
| --- | --- | --- | --- |
| Status | running | paused | Hypothesis before running: There will be an explicit error result. Keep the other conditions fixed and record the actual result separately after running. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Record outputs for 3 normal cases and 2 error cases.
- [ ] Every returned object has an ok field.

## Self-check

1. What does returning success from default hide?
2. What code is skipped after an early return?

## Official references

- [MDN JavaScript Guide](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/javascript-step-04/example.js) · [Runtime environments and limits](../../../../../examples.md)

Compare the editable inputs with actual browser execution results.


Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Equality Comparisons and Defaults](../03/README.md) · [Next: Functions and Pure Calculations](../05/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions
