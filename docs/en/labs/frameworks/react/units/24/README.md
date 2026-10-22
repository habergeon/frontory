# React · 24 Event Boundaries and Accessible Selection

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Performance verification and an integrated editor · Editable example · Storage ID: `react-step-24`

## Goals and learning outcomes

- 1 delete click causes only 1 delete action.
- Perform both selection and deletion using only the keyboard.

## Prerequisites

Unit 24 continues using the work and experiment records from Unit 23.

## Key concepts and explanations

### Event Propagation

A child button click may propagate to the parent's click handler. Separate the roles of nested interactions or deliberately control propagation.

### Native Controls

button provides built-in keyboard behavior and focus. Adding only a click handler to a div does not provide the same interaction path.

## Practice setup

First check the execution scope guidance on the example screen. The following environment is for extending the assignment in a separate project. This is a JSX exercise in a separate React Vite project. Record Node and package versions and the lockfile, and run it on the project development server. The built-in editor is not a general-purpose JSX compiler.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. Split selection and deletion into separate buttons in src/CardRow.jsx.
2. Use logs to check whether a delete click also changes selection.
3. Perform selection and deletion using only Tab·Enter·Space, and implement focus restoration.

## Variables to observe

| Variable | Baseline | Change | Expected change / hypothesis |
| --- | --- | --- | --- |
| Deletion Location | Inside the selection area | Independent button | One deletion is not followed by a selection change event. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] 1 delete click causes only 1 delete action.
- [ ] Perform both selection and deletion using only the keyboard.

## Self-check

1. How does stopPropagation differ from preventDefault?
2. Where should focus move after deleting the currently focused card?

## Official references

- [React Learning Guide](https://react.dev/learn)
- [React API Reference](https://react.dev/reference/react)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/react-step-24/example.js) · [Runtime environments and limits](../../../../../examples.md)

This is an experiment using actual React APIs. It uses createElement instead of JSX.


Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Display Ranges for Long Lists](../23/README.md) · [Next: Subscription Stores and Snapshots](../25/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions
