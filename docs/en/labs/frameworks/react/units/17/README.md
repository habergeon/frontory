# React · 17 Preserving State by Unit

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Preserving notes and measuring renders · Editable example · Storage ID: `react-step-17`

## Goals and learning outcomes

- Strings for A and B do not mix.
- Distinguish at least two fields that reset when the key changes.

## Prerequisites

Unit 17 continues using the work and experiment records from Unit 16.

## Key concepts and explanations

### Tree Identity

The same component at the same position preserves state. Changing its key treats it as a new component and resets local state.

### Persistent Drafts

Data that must outlive a disappearing editor belongs to a parent store. Temporary UI state such as cursor position can remain in the editor.

## Practice setup

First check the execution scope guidance on the example screen. The following environment is for extending the assignment in a separate project. This is a JSX exercise in a separate React Vite project. Record Node and package versions and the lockfile, and run it on the project development server. The built-in editor is not a general-purpose JSX compiler.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. Add a unit key and local cursor display to src/NoteEditor.jsx.
2. Store the actual strings in App's draftsById.
3. After entering A→entering B→returning to A, record the difference between strings and local state.

## Variables to observe

| Variable   | Baseline | Change | Expected change / hypothesis                                  |
| ---------- | -------- | ------ | ------------------------------------------------------------- |
| Editor key | Fixed    | unitId | Local UI resets, but drafts held by the parent are preserved. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Strings for A and B do not mix.
- [ ] Distinguish at least two fields that reset when the key changes.

## Self-check

1. What disappears on switching if drafts exist only in local state?
2. Which requirements call for changing the key, and which call for preserving it?

## Official references

- [React Learning Guide](https://react.dev/learn)
- [React API Reference](https://react.dev/reference/react)
- [React: Preserving and Resetting State](https://react.dev/learn/preserving-and-resetting-state)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/react-step-17/example.js) · [Runtime environments and limits](../../../../../examples.md)

This is an experiment using actual React APIs. It uses createElement instead of JSX.

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Saving Notes and Initial Restoration](../16/README.md) · [Next: Component Composition and children](../18/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions
