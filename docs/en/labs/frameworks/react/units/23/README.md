# React · 23 Display Ranges for Long Lists

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Performance verification and an integrated editor · Editable example · Storage ID: `react-step-23`

## Goals and learning outcomes

- There are no more than 50 card rows in the DOM.
- Changing the filter does not leave the user on an invalid empty page.

## Prerequisites

Unit 23 continues using the work and experiment records from Unit 22.

## Key concepts and explanations

### DOM Costs

Many rows increase layout work and DOM memory as well as React calculations. Limiting the range needed on screen also changes other costs.

### Pages and Accessibility

Pagination keeps implementation and keyboard navigation simple. Show the item count and current range so users know their position.

## Practice setup

First check the execution scope guidance on the example screen. The following environment is for extending the assignment in a separate project. This is a JSX exercise in a separate React Vite project. Record Node and package versions and the lockfile, and run it on the project development server. The built-in editor is not a general-purpose JSX compiler.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. Implement 50 items per page and previous/next buttons in src/PagedList.jsx.
2. Filter 1000 cards before applying slice, and display the total result count.
3. On the last page, change the filter and adjust the current page to the valid range.

## Variables to observe

| Variable  | Baseline   | Change   | Expected change / hypothesis                                               |
| --------- | ---------- | -------- | -------------------------------------------------------------------------- |
| Page Size | 1000 items | 50 items | DOM rows decrease to at most 50 while the total result count is preserved. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] There are no more than 50 card rows in the DOM.
- [ ] Changing the filter does not leave the user on an invalid empty page.

## Self-check

1. How do results change if slice is applied before the filter?
2. Why is keyboard navigation difficult with virtual scrolling?

## Official references

- [React Learning Guide](https://react.dev/learn)
- [React API Reference](https://react.dev/reference/react)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/react-step-23/example.js) · [Runtime environments and limits](../../../../../examples.md)

This is an experiment using actual React APIs. It uses createElement instead of JSX.

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Memoizing Only Measured Paths](../22/README.md) · [Next: Event Boundaries and Accessible Selection](../24/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions
