# React · 07 Controlled Inputs and Form Validation

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Components and state calculations · Editable example · Storage ID: `react-step-07`

## Goals and learning outcomes

- The card count stays the same after submitting whitespace.
- One Enter submission adds 1 card.

## Prerequisites

Unit 7 continues using the work and experiment records from Unit 6.

## Key concepts and explanations

### Controlled Inputs

Providing value and onChange together makes React state the source of the input. Initialize it to an empty string so its controlled status does not change.

### Form Submission

A form's submit event handles both Enter and button submissions. If validation fails, preserve the input and tell users where to make a correction.

## Practice setup

First check the execution scope guidance on the example screen. The following environment is for extending the assignment in a separate project. This is a JSX exercise in a separate React Vite project. Record Node and package versions and the lockfile, and run it on the project development server. The built-in editor is not a general-purpose JSX compiler.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. Write a label·input·submit button in src/AddCardForm.jsx.
2. If the trimmed title is empty, display an error; otherwise add a card with a new id.
3. Submit whitespace and a Korean title using Enter, and record the list counts.

## Variables to observe

| Variable | Baseline | Change | Expected change / hypothesis |
| --- | --- | --- | --- |
| Title | Whitespace only | 새 카드 | Whitespace is rejected, and a valid title is added once. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] The card count stays the same after submitting whitespace.
- [ ] One Enter submission adds 1 card.

## Self-check

1. What gaps in keyboard submission arise from handling only onClick?
2. How does ownership differ between value and defaultValue?

## Official references

- [React Learning Guide](https://react.dev/learn)
- [React API Reference](https://react.dev/reference/react)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/react-step-07/example.js) · [Runtime environments and limits](../../../../../examples.md)

This is an experiment using actual React APIs. It uses createElement instead of JSX.


Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: List Keys and Identity](../06/README.md) · [Next: Lifting State Up](../08/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions
