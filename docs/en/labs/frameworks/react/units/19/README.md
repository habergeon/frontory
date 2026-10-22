# React · 19 Making Asynchronous State Explicit

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Preserving notes and measuring renders · Editable example · Storage ID: `react-step-19`

## Goals and learning outcomes

- loading and error guidance do not appear together.
- The error text disappears after a successful retry.

## Prerequisites

Unit 19 continues using the work and experiment records from Unit 18.

## Key concepts and explanations

### State Model

Representing idle·loading·success·error as one state reduces contradictions. Independent loading and error booleans can both be on at once.

### Retrying

A failure screen should provide the cause and an action to retry. Set a rule for handling a previous failure when starting a request.

## Practice setup

First check the execution scope guidance on the example screen. The following environment is for extending the assignment in a separate project. This is a JSX exercise in a separate React Vite project. Record Node and package versions and the lockfile, and run it on the project development server. The built-in editor is not a general-purpose JSX compiler.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. Define status-based state transitions in src/loadState.js.
2. In Search.jsx, render success, empty results, and failure as separate screens.
3. Run a failing fakeSearch once, then make a retry succeed.

## Variables to observe

| Variable | Baseline | Change | Expected change / hypothesis |
| --- | --- | --- | --- |
| Response Type | Successful array | Failure followed by success | Retrying after error guidance switches to a successful list. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] loading and error guidance do not appear together.
- [ ] The error text disappears after a successful retry.

## Self-check

1. Is an empty array success or error?
2. How do you decide whether to keep previous results during a new request?

## Official references

- [React Learning Guide](https://react.dev/learn)
- [React API Reference](https://react.dev/reference/react)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/react-step-19/example.js) · [Runtime environments and limits](../../../../../examples.md)

This is an experiment using actual React APIs. It uses createElement instead of JSX.


Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Component Composition and children](../18/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions
