# React · 15 Custom Hook Boundaries

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Preserving notes and measuring renders · Editable example · Storage ID: `react-step-15`

## Goals and learning outcomes

- Both panels display the same size.
- The subscription count is 0 after removing the last panel.

## Prerequisites

Unit 15 continues using the work and experiment records from Unit 14.

## Key concepts and explanations

### Reusing Logic

A custom Hook groups stateful logic. Calling a Hook twice normally creates separate state and Effects.

### Calling Rules

Call Hooks at the top level of a component or Hook. Handle conditions inside the Hook's logic to preserve the call order.

## Practice setup

First check the execution scope guidance on the example screen. The following environment is for extending the assignment in a separate project. This is a JSX exercise in a separate React Vite project. Record Node and package versions and the lockfile, and run it on the project development server. The built-in editor is not a general-purpose JSX compiler.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. Extract the resize subscription and cleanup into src/useWindowSize.js.
2. Call the Hook in two panels that display the size.
3. Remove one panel, and check updates in the remaining panel and the subscription count.

## Variables to observe

| Variable | Baseline | Change | Expected change / hypothesis |
| --- | --- | --- | --- |
| Hook Consumers | 1 consumer | 2 consumers | Each independent call creates a subscription, so removing consumers cleans them up one by one. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Both panels display the same size.
- [ ] The subscription count is 0 after removing the last panel.

## Self-check

1. How does sharing logic differ from sharing state?
2. What structure can replace conditional Hook calls?

## Official references

- [React Learning Guide](https://react.dev/learn)
- [React API Reference](https://react.dev/reference/react)
- [React useEffect: External Systems and Cleanup](https://react.dev/reference/react/useEffect)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/react-step-15/example.js) · [Runtime environments and limits](../../../../../examples.md)

This is an experiment using actual React APIs. It uses createElement instead of JSX.


Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Effects and External Renderers](../../02-experiments/README.md) · [Next: Saving Notes and Initial Restoration](../16/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions
