# JavaScript · 07 Array Aggregation and Empty Input

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Values and calculations · Editable example · Storage ID: `javascript-step-07`

## Goals and learning outcomes

- Only the selected topic remains in the results, and the 5 original records are preserved.
- The sum for an empty array is 0, and the title list is an empty array.

## Prerequisites

The work and experiment records from Unit 6, “Scope and Closures”

## Key concepts and explanations

### Transformation Order

The order of filter and map changes the shape of intermediate data. Compare the final results as well as the amount of computation.

### Initial Accumulator Value

The initial value for reduce determines how it behaves on an empty array. Without an initial value, an empty array causes an exception.

## Practice setup

First check the execution scope guidance on the example screen. The following environment is for extending the assignment in a separate project. Implement it yourself in a separate local project and check it with browser developer tools. In a separate folder, connect your practice JS from index.html using script type="module" and open it through a local HTTP server. Use the Console, Network, and Elements panels.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. In summary.js, prepare 5 records and an empty array.
2. Create independent functions for filtering by topic, mapping titles, and summing time, and check that the original data is preserved.
3. Run with 5 records and an empty array. Results to check: Only the selected topic remains in the results, and the 5 original records are preserved. The sum for an empty array is 0, and the title list is an empty array. Record expected and actual results separately.

## Variables to observe

| Variable     | Baseline | Change | Expected change / hypothesis                                                                                                                                  |
| ------------ | -------- | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Array length | 5        | 0      | Hypothesis before running: A sum with an initial value of 0 will be 0. Keep the other conditions fixed and record the actual result separately after running. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Only the selected topic remains in the results, and the 5 original records are preserved.
- [ ] The sum for an empty array is 0, and the title list is an empty array.

## Self-check

1. What changes if you modify an object in map?
2. Does the initial value for reduce also affect the result type?

## Official references

- [MDN JavaScript Guide](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/javascript-step-07/example.js) · [Runtime environments and limits](../../../../../examples.md)

Compare the editable inputs with actual browser execution results.

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Scope and Closures](../06/README.md) · [Next: Object Destructuring and Optional Access](../08/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions
