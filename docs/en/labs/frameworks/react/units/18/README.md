# React · 18 Component Composition and children

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Preserving notes and measuring renders · Editable example · Storage ID: `react-step-18`

## Goals and learning outcomes

- Panel does not directly read the items or notes structure.
- Each panel displays its own title and buttons correctly.

## Prerequisites

Unit 18 continues using the work and experiment records from Unit 17.

## Key concepts and explanations

### Composition

children is an input for placing UI passed by the parent. A layout can wrap content without knowing the card data structure.

### Limiting Responsibilities

Handling every screen with multiple booleans quickly multiplies combinations. Separate shared layout from content using slot-like props or children.

## Practice setup

First check the execution scope guidance on the example screen. The following environment is for extending the assignment in a separate project. This is a JSX exercise in a separate React Vite project. Record Node and package versions and the lockfile, and run it on the project development server. The built-in editor is not a general-purpose JSX compiler.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. Arrange the title, tools area, and children in src/Panel.jsx.
2. Use the same Panel for the list panel and notes panel.
3. Pass a save button to only one panel, and check whether empty space remains in the other panel.

## Variables to observe

| Variable   | Baseline | Change      | Expected change / hypothesis                                 |
| ---------- | -------- | ----------- | ------------------------------------------------------------ |
| Tools Area | None     | Save button | Only the tools are added, without changing the content area. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Panel does not directly read the items or notes structure.
- [ ] Each panel displays its own title and buttons correctly.

## Self-check

1. When would children be accepted as a function?
2. Why does putting every variation into boolean props make verification difficult?

## Official references

- [React Learning Guide](https://react.dev/learn)
- [React API Reference](https://react.dev/reference/react)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/react-step-18/example.js) · [Runtime environments and limits](../../../../../examples.md)

This is an experiment using actual React APIs. It uses createElement instead of JSX.

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Preserving State by Unit](../17/README.md) · [Next: Making Asynchronous State Explicit](../19/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions
