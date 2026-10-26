# React · 08 Lifting State Up

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Shared state and external systems · Editable example · Storage ID: `react-step-08`

## Goals and learning outcomes

- Title edits appear in both the list and details.
- The previous details do not remain after deleting the selected card.

## Prerequisites

Unit 8 continues using the work and experiment records from Unit 7.

## Key concepts and explanations

### Shared State

When sibling components display the same selection, their common parent owns the state. Children communicate the intent to change it through callbacks.

### Minimal State

Storing an id instead of an entire selected object makes synchronization with list changes easier. Calculate selection details by finding the item in the current list.

## Practice setup

First check the execution scope guidance on the example screen. The following environment is for extending the assignment in a separate project. This is a JSX exercise in a separate React Vite project. Record Node and package versions and the lockfile, and run it on the project development server. The built-in editor is not a general-purpose JSX compiler.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. Place selectedId in src/App.jsx and pass it to List and Detail.
2. Change the selection on List clicks, and connect a callback for editing the title in Detail.
3. Implement a rule that returns to empty details when the selected card is deleted.

## Variables to observe

| Variable         | Baseline    | Change | Expected change / hypothesis                                         |
| ---------------- | ----------- | ------ | -------------------------------------------------------------------- |
| Stored Selection | Object copy | id     | After a title edit, the list and details show the same latest title. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Title edits appear in both the list and details.
- [ ] The previous details do not remain after deleting the selected card.

## Self-check

1. Why does a copy of the selected object become stale?
2. Should all state be lifted to the top level?

## Official references

- [React Learning Guide](https://react.dev/learn)
- [React API Reference](https://react.dev/reference/react)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/react-step-08/example.js) · [Runtime environments and limits](../../../../../examples.md)

This is an experiment using actual React APIs. It uses createElement instead of JSX.

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Controlled Inputs and Form Validation](../07/README.md) · [Next: Collecting Update Rules in a Reducer](../09/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions
