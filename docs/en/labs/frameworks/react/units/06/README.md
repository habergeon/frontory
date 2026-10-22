# React · 06 List Keys and Identity

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Components and state calculations · Editable example · Storage ID: `react-step-06`

## Goals and learning outcomes

- With id keys, note A stays on the original card.
- Record the comparison with index keys together with the ids.

## Prerequisites

Unit 6 continues using the work and experiment records from Unit 5.

## Key concepts and explanations

### Stable Keys

key represents the identity of sibling items. Using the array index can attach local input to different data after reordering.

### State Position

Component state is tied to its position in the tree, type, and key. Separate data ids from sort order to preserve the editing target.

## Practice setup

First check the execution scope guidance on the example screen. The following environment is for extending the assignment in a separate project. This is a JSX exercise in a separate React Vite project. Record Node and package versions and the lockfile, and run it on the project development server. The built-in editor is not a general-purpose JSX compiler.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. Add a local note input in src/CardRow.jsx.
2. Create an experimental branch in CardList that switches between id keys and index keys.
3. Enter A on the first card, reverse the list, and record the id carrying the note.

## Variables to observe

| Variable | Baseline | Change | Expected change / hypothesis |
| --- | --- | --- | --- |
| key | index | item.id | The note stays with the same id after reversing the order. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] With id keys, note A stays on the original card.
- [ ] Record the comparison with index keys together with the ids.

## Self-check

1. Can key be read directly from props?
2. What disappears if a random key is created on every render?

## Official references

- [React Learning Guide](https://react.dev/learn)
- [React API Reference](https://react.dev/reference/react)
- [React: Preserving and Resetting State](https://react.dev/learn/preserving-and-resetting-state)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/react-step-06/example.js) · [Runtime environments and limits](../../../../../examples.md)

This is an experiment using actual React APIs. It uses createElement instead of JSX.


Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Conditional Screens and Empty States](../05/README.md) · [Next: Controlled Inputs and Form Validation](../07/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions
