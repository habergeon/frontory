# React · 04 Updating Objects and Arrays

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Components and state calculations · Editable example · Storage ID: `react-step-04`

## Goals and learning outcomes

- The done values in the original array do not change.
- References to cards other than the target are preserved.

## Prerequisites

Unit 4 continues using the work and experiment records from Unit 3.

## Key concepts and explanations

### Immutable Updates

Mutating an object also contaminates snapshots from earlier renders. Copy the path being changed and pass a new reference.

### Partial Changes

map is suitable for replacing only the target id with a new object. References to unchanged items can be preserved.

## Practice setup

First check the execution scope guidance on the example screen. The following environment is for extending the assignment in a separate project. This is a JSX exercise in a separate React Vite project. Record Node and package versions and the lockfile, and run it on the project development server. The built-in editor is not a general-purpose JSX compiler.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. Write toggle(items,id) in src/model.js.
2. Connect toggle to the setter in App.jsx using a functional update.
3. Keep a copy of the input array, and compare references and done for target and non-target objects.

## Variables to observe

| Variable | Baseline | Change | Expected change / hypothesis |
| --- | --- | --- | --- |
| Change Target | id 1 | id 2 | Only the selected item's object gets a new reference. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] The done values in the original array do not change.
- [ ] References to cards other than the target are preserved.

## Self-check

1. Is a shallow copy enough to keep nested objects safe?
2. What problems arise if sort is called on the original array?

## Official references

- [React Learning Guide](https://react.dev/learn)
- [React API Reference](https://react.dev/reference/react)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/react-step-04/example.js) · [Runtime environments and limits](../../../../../examples.md)

This is an experiment using actual React APIs. It uses createElement instead of JSX.


Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Events and state snapshots](../03/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions
