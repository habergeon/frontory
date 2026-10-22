# React · 16 Saving Notes and Initial Restoration

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Preserving notes and measuring renders · Editable example · Storage ID: `react-step-16`

## Goals and learning outcomes

- Saved drafts for each unit are restored on reopening.
- Editing remains possible even with invalid JSON.

## Prerequisites

Unit 16 continues using the work and experiment records from Unit 15.

## Key concepts and explanations

### Lazy Initialization

The useState initializer function separates initial state calculation. Validate the format of saved JSON before using it as state.

### External Storage

Writing to localStorage is an external operation that can fail. Distinguishing the on-screen draft from save success keeps failures visible.

## Practice setup

First check the execution scope guidance on the example screen. The following environment is for extending the assignment in a separate project. This is a JSX exercise in a separate React Vite project. Record Node and package versions and the lockfile, and run it on the project development server. The built-in editor is not a general-purpose JSX compiler.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. In src/storage.js, create a read function that checks the version, unit id, and string.
2. Connect initial restoration and saving after changes in useNotes.js.
3. Inject valid JSON, broken JSON, and storage exceptions separately, and check the draft and error text.

## Variables to observe

| Variable | Baseline | Change | Expected change / hypothesis |
| --- | --- | --- | --- |
| Saved Data | Valid JSON | Broken JSON | Recover with an empty draft and error guidance while the screen keeps working. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Saved drafts for each unit are restored on reopening.
- [ ] Editing remains possible even with invalid JSON.

## Self-check

1. What might be overwritten by saving an empty value immediately on the initial render?
2. Are successful storage and an in-memory update the same event?

## Official references

- [React Learning Guide](https://react.dev/learn)
- [React API Reference](https://react.dev/reference/react)
- [React useEffect: External Systems and Cleanup](https://react.dev/reference/react/useEffect)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/react-step-16/example.js) · [Runtime environments and limits](../../../../../examples.md)

This is an experiment using actual React APIs. It uses createElement instead of JSX.


Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Custom Hook Boundaries](../15/README.md) · [Next: Preserving State by Unit](../17/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions
