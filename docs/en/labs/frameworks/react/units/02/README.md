# React · 02 JSX and Pure Rendering

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Components and state calculations · Editable example · Storage ID: `react-step-02`

## Goals and learning outcomes

- The title and badge match when rendered twice with the same input.
- aria-pressed is true on a completed card.

## Prerequisites

Unit 2 continues using the work and experiment records from Unit 1.

## Key concepts and explanations

### JSX Expressions

JavaScript expressions go inside JSX braces. Calculate strings and attributes from data, but do not change the data during render.

### Purity

The same props and state should produce the same screen calculation. Code that calls push on an array or increments an external counter changes the result according to how many times it is called.

## Practice setup

First check the execution scope guidance on the example screen. The following environment is for extending the assignment in a separate project. This is a JSX exercise in a separate React Vite project. Record Node and package versions and the lockfile, and run it on the project development server. The built-in editor is not a general-purpose JSX compiler.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. In src/Card.jsx, write a function component that receives title and done props.
2. Calculate the badge and aria-pressed from done without changing the card data.
3. Render the same card twice with input frozen using Object.freeze, and compare the title and badge.

## Variables to observe

| Variable | Baseline | Change | Expected change / hypothesis                                                  |
| -------- | -------- | ------ | ----------------------------------------------------------------------------- |
| done     | false    | true   | Only the badge and pressed state change; the original object stays unchanged. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] The title and badge match when rendered twice with the same input.
- [ ] aria-pressed is true on a completed card.

## Self-check

1. Why is calling push during render dangerous?
2. Should a display badge be stored in state?

## Official references

- [React Learning Guide](https://react.dev/learn)
- [React API Reference](https://react.dev/reference/react)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/react-step-02/example.js) · [Runtime environments and limits](../../../../../examples.md)

This is an experiment using actual React APIs. It uses createElement instead of JSX.

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: State and Ownership](../../01-foundations/README.md) · [Next: Events and state snapshots](../03/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions
