# JavaScript · 01 Values and State

[Series contents](../README.md) · [Technology map](../../../README.md)

Stage: Values and calculations · Editable example · Storage ID: `javascript-01`

## Goals and learning outcomes

- Extract 2 incomplete task titles.
- Record 2 pairs of reference equality and original value comparisons.

## Prerequisites

HTML elements and events

## Key concepts and explanations

### Shared References

Assigning an object copies a value that points to the same object. A shallow copy still shares nested objects.

### Derived Lists

filter and map return new arrays. Modifying an object inside a callback can also change the original.

## Practice setup

Frontory's existing preview is a limited starter example, not a complete solution to the assignment. Implement additional files and features yourself in a separate local project. In a separate folder, connect your practice JS from index.html using script type="module" and open it through a local HTTP server. Use the Console, Network, and Elements panels.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. In state.js, prepare an array of nested objects with 1 complete task and 2 incomplete tasks.
2. Use filter/map to get the incomplete task titles, and use console.assert to compare direct mutation with replacement by a new object.
3. Run with an array of nested objects containing 1 complete task and 2 incomplete tasks. Results to check: Extract 2 incomplete task titles. Record 2 pairs of reference equality and original value comparisons. Record expected and actual results separately.

## Variables to observe

| Variable | Baseline | Change | Expected change / hypothesis |
| --- | --- | --- | --- |
| Copy depth | Spread only the array | Spread the nested objects as well | Hypothesis before running: The original will remain unchanged even when a nested value changes. Keep the other conditions fixed and record the actual result separately after running. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Extract 2 incomplete task titles.
- [ ] Record 2 pairs of reference equality and original value comparisons.

## Self-check

1. Does a new array also contain new objects?
2. What synchronization is needed if you store a derived list separately?

## Official references

- [MDN JavaScript Guide](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide)

## Linked example and execution scope

[Example source](../../../../../../src/labs/javascript-01/example.js) · [Runtime environments and limits](../../../../examples.md)

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Next: String input and number conversion](../units/02/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions
