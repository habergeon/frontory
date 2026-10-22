# React · 21 Finding Bottlenecks with Profiler

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Preserving notes and measuring renders · Editable example · Storage ID: `react-step-21`

## Goals and learning outcomes

- There are 10 recordings for each of the two conditions.
- Record React render costs separately from Canvas costs without confusing them.

## Prerequisites

Unit 21 continues using the work and experiment records from Unit 20.

## Key concepts and explanations

### Measurement Scope

Profiler observes render costs for React commits. It does not measure GPU rendering time or network time in their place.

### Comparison Conditions

Different development modes or input data distort time comparisons. Record the same operation several times, noting the range and variation.

## Practice setup

First check the execution scope guidance on the example screen. The following environment is for extending the assignment in a separate project. This is a JSX exercise in a separate React Vite project. Record Node and package versions and the lockfile, and run it on the project development server. The built-in editor is not a general-purpose JSX compiler.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. Wrap the list in Profiler in src/App.jsx, and save onRender records.
2. With the same 1000 cards, perform 10 inputs and 10 selections separately.
3. Summarize actualDuration, commit count, and environment in notes/profile.md, and choose one path with the largest cost.

## Variables to observe

| Variable | Baseline | Change | Expected change / hypothesis |
| --- | --- | --- | --- |
| Item Count | 100 items | 1000 items | Use measurements to judge whether list rendering costs increase. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] There are 10 recordings for each of the two conditions.
- [ ] Record React render costs separately from Canvas costs without confusing them.

## Self-check

1. Do more renders always mean slower performance?
2. Why might a default production build have no Profiler callbacks?

## Official references

- [React Learning Guide](https://react.dev/learn)
- [React API Reference](https://react.dev/reference/react)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/react-step-21/example.js) · [Runtime environments and limits](../../../../../examples.md)

This is an experiment using actual React APIs. It uses createElement instead of JSX. Measure the Profiler callback in a build with profiling support. The callback may be inactive in a production React build.


Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Transitions and Deferred Results](../20/README.md) · [Next: Memoizing Only Measured Paths](../22/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions
