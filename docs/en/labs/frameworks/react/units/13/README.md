# React · 13 Request Races and Cancellation

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Shared state and external systems · Editable example · Storage ID: `react-step-13`

## Goals and learning outcomes

- The final search query B matches the result id.
- A response completed after removal does not request a screen update.

## Prerequisites

Unit 13 continues using the work and experiment records from Unit 12.

## Key concepts and explanations

### Response Order

Responses may arrive in a different order from requests. Only results corresponding to the latest input should appear on the screen.

### Cancellation and Ignoring

AbortController aborts requests that support it. An active flag or request id check may also be needed to prevent processing that has already completed from taking effect.

## Practice setup

First check the execution scope guidance on the example screen. The following environment is for extending the assignment in a separate project. This is a JSX exercise in a separate React Vite project. Record Node and package versions and the lockfile, and run it on the project development server. The built-in editor is not a general-purpose JSX compiler.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. Write a query-dependent Effect and AbortController in src/Search.jsx.
2. In src/fakeSearch.js, reproduce an A response of 800ms and a B response of 100ms.
3. Enter B immediately after A, and use cleanup and a latest-request check to preserve B's result.

## Variables to observe

| Variable | Baseline | Change | Expected change / hypothesis |
| --- | --- | --- | --- |
| Response Delay | A 100ms·B 100ms | A 800ms·B 100ms | Late A does not overwrite the latest B result. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] The final search query B matches the result id.
- [ ] A response completed after removal does not request a screen update.

## Self-check

1. How do you distinguish cancellation errors from actual network errors?
2. Should a request be sent when the input is an empty string?

## Official references

- [React Learning Guide](https://react.dev/learn)
- [React API Reference](https://react.dev/reference/react)
- [React useEffect: External Systems and Cleanup](https://react.dev/reference/react/useEffect)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/react-step-13/example.js) · [Runtime environments and limits](../../../../../examples.md)

This is an experiment using actual React APIs. It uses createElement instead of JSX.


Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Effect Dependencies and Cleanup](../12/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions
