# React · 09 Collecting Update Rules in a Reducer

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Shared state and external systems · Editable example · Storage ID: `react-step-09`

## Goals and learning outcomes

- Input/output examples for the three actions are recorded.
- After deleting the selected card, the selection does not point to a nonexistent id.

## Prerequisites

Unit 9 continues using the work and experiment records from Unit 8.

## Key concepts and explanations

### reducer

A reducer calculates the next state from the current state and an action. It returns the same output for the same input and does not perform storage operations or start timers.

### Action Design

An action expresses user intent, such as add·toggle·remove. Rules that change several fields together can be reviewed in one place.

## Practice setup

First check the execution scope guidance on the example screen. The following environment is for extending the assignment in a separate project. This is a JSX exercise in a separate React Vite project. Record Node and package versions and the lockfile, and run it on the project development server. The built-in editor is not a general-purpose JSX compiler.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. Implement add·toggle·remove actions in src/reducer.js.
2. Use useReducer to manage App's cards and selectedId together.
3. Run the action to delete the selected card, and check that card removal and selection clearing happen together.

## Variables to observe

| Variable        | Baseline        | Change        | Expected change / hypothesis                                    |
| --------------- | --------------- | ------------- | --------------------------------------------------------------- |
| Deletion Target | Unselected card | Selected card | selectedId becomes null only when the selected card is deleted. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Input/output examples for the three actions are recorded.
- [ ] After deleting the selected card, the selection does not point to a nonexistent id.

## Self-check

1. Why does writing to localStorage inside a reducer break the separation?
2. Should an action contain screen coordinates or user intent?

## Official references

- [React Learning Guide](https://react.dev/learn)
- [React API Reference](https://react.dev/reference/react)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/react-step-09/example.js) · [Runtime environments and limits](../../../../../examples.md)

This is an experiment using actual React APIs. It uses createElement instead of JSX.

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Lifting State Up](../08/README.md) · [Next: Passing Settings with Context](../10/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions
