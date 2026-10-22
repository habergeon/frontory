# React · 12 Effect Dependencies and Cleanup

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Shared state and external systems · Editable example · Storage ID: `react-step-12`

## Goals and learning outcomes

- The active connection count is 1 while displayed and 0 after removal.
- In the A→B transition logs, disconnection precedes the new connection.

## Prerequisites

Unit 12 continues using the work and experiment records from Unit 11.

## Key concepts and explanations

### Synchronization

An Effect synchronizes render results with an external system. Calculable derived values do not need an Effect.

### Cleanup Order

When dependencies change, cleanup for the previous setup runs before the new setup starts. The extra execution in development StrictMode checks for missing cleanup.

## Practice setup

First check the execution scope guidance on the example screen. The following environment is for extending the assignment in a separate project. This is a JSX exercise in a separate React Vite project. Record Node and package versions and the lockfile, and run it on the project development server. The built-in editor is not a general-purpose JSX compiler.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. In src/Connection.jsx, create an Effect that receives a channel prop and logs connections and disconnections.
2. Put channel in the dependency array, and change it through A→B→A.
3. Remove the component through conditional rendering, and count whether the last connection is also disconnected.

## Variables to observe

| Variable | Baseline | Change | Expected change / hypothesis |
| --- | --- | --- | --- |
| channel | Keep A | Change to B | The B connection log appears after A is disconnected. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] The active connection count is 1 while displayed and 0 after removal.
- [ ] In the A→B transition logs, disconnection precedes the new connection.

## Self-check

1. What stale values remain if dependency warnings are suppressed?
2. Can two start logs in StrictMode alone prove a leak?

## Official references

- [React Learning Guide](https://react.dev/learn)
- [React API Reference](https://react.dev/reference/react)
- [React useEffect: External Systems and Cleanup](https://react.dev/reference/react/useEffect)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/react-step-12/example.js) · [Runtime environments and limits](../../../../../examples.md)

This is an experiment using actual React APIs. It uses createElement instead of JSX.


Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Refs and DOM Focus](../11/README.md) · [Next: Request Races and Cancellation](../13/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions
