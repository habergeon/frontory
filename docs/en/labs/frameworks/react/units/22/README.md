# React · 22 Memoizing Only Measured Paths

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Performance verification and an integrated editor · Editable example · Storage ID: `react-step-22`

## Goals and learning outcomes

- There are before/after records for 10 identical inputs.
- Toggle and delete functionality stays consistent after memoization.

## Prerequisites

Unit 22 continues using the work and experiment records from Unit 21.

## Key concepts and explanations

### memo

memo allows a child render to be skipped when props are the same. Passing a new object or function every time may change the comparison result.

### Cache Costs

useMemo and useCallback also carry dependency management and storage costs. Judge performance optimization using measurements under identical conditions.

## Practice setup

First check the execution scope guidance on the example screen. The following environment is for extending the assignment in a separate project. This is a JSX exercise in a separate React Vite project. Record Node and package versions and the lockfile, and run it on the project development server. The built-in editor is not a general-purpose JSX compiler.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. Apply memo to the bottleneck candidate in src/CardRow.jsx.
2. Pass only necessary props, and check event function identity.
3. Repeat the inputs from Unit 21 to compare commits and times before and after; if there is no benefit, explain why.

## Variables to observe

| Variable | Baseline    | Change  | Expected change / hypothesis                                   |
| -------- | ----------- | ------- | -------------------------------------------------------------- |
| memo     | Not applied | Applied | Additional renders of cards with unchanged props may decrease. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] There are before/after records for 10 identical inputs.
- [ ] Toggle and delete functionality stays consistent after memoization.

## Self-check

1. Why is memo less effective without stable props?
2. Why is using useMemo as a correctness guarantee dangerous?

## Official references

- [React Learning Guide](https://react.dev/learn)
- [React API Reference](https://react.dev/reference/react)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/react-step-22/example.js) · [Runtime environments and limits](../../../../../examples.md)

This is an experiment using actual React APIs. It uses createElement instead of JSX.

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Finding Bottlenecks with Profiler](../21/README.md) · [Next: Display Ranges for Long Lists](../23/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions
