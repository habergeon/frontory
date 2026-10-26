# React · 11 Refs and DOM Focus

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Shared state and external systems · Editable example · Storage ID: `react-step-11`

## Goals and learning outcomes

- After adding, the active element is the title input.
- Record the observation that changing a ref alone does not change the display.

## Prerequisites

Unit 11 continues using the work and experiment records from Unit 10.

## Key concepts and explanations

### ref

useRef keeps a value between renders, but changing it alone does not request a render. Distinguish data to display from DOM handles.

### DOM Access

ref.current can be used after the DOM is attached. Do not move focus inside the render function.

## Practice setup

First check the execution scope guidance on the example screen. The following environment is for extending the assignment in a separate project. This is a JSX exercise in a separate React Vite project. Record Node and package versions and the lockfile, and run it on the project development server. The built-in editor is not a general-purpose JSX compiler.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. Attach a ref to the input in src/AddCardForm.jsx.
2. After a successful addition, clear the input and call focus.
3. Place a ref counter and state counter side by side, and compare screen updates from each button input.

## Variables to observe

| Variable        | Baseline | Change | Expected change / hypothesis                              |
| --------------- | -------- | ------ | --------------------------------------------------------- |
| Counter Storage | ref      | state  | Only a state change immediately updates the counter text. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] After adding, the active element is the title input.
- [ ] Record the observation that changing a ref alone does not change the display.

## Self-check

1. Why is building UI by reading a ref during render confusing?
2. How should focus be handled when a conditional input is absent?

## Official references

- [React Learning Guide](https://react.dev/learn)
- [React API Reference](https://react.dev/reference/react)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/react-step-11/example.js) · [Runtime environments and limits](../../../../../examples.md)

This is an experiment using actual React APIs. It uses createElement instead of JSX.

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Passing Settings with Context](../10/README.md) · [Next: Effect Dependencies and Cleanup](../12/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions
