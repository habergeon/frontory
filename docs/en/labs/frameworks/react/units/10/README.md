# React · 10 Passing Settings with Context

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Shared state and external systems · Editable example · Storage ID: `react-step-10`

## Goals and learning outcomes

- The deeply nested Card's theme responds to button input.
- Keep separate logs for note input and theme changes.

## Prerequisites

Unit 10 continues using the work and experiment records from Unit 9.

## Key concepts and explanations

### Context

Context lets components read values without passing props through intermediate components. A changed value affects consumers that read that Context.

### Separating Responsibilities

Themes and rapidly changing inputs change at different frequencies. Splitting Context by purpose makes the update scope easier to understand.

## Practice setup

First check the execution scope guidance on the example screen. The following environment is for extending the assignment in a separate project. This is a JSX exercise in a separate React Vite project. Record Node and package versions and the lockfile, and run it on the project development server. The built-in editor is not a general-purpose JSX compiler.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. Create a theme Provider and a reading Hook in src/ThemeContext.jsx.
2. Read the theme in a Card three levels down, and change it with a settings button.
3. Keep note input in local state, and record render logs before and after a theme change.

## Variables to observe

| Variable | Baseline | Change | Expected change / hypothesis |
| --- | --- | --- | --- |
| Provider Value | Fixed theme string | New object every time | Even with the same theme, changes in object identity may affect consumer updates. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] The deeply nested Card's theme responds to button input.
- [ ] Keep separate logs for note input and theme changes.

## Self-check

1. Is Context itself a state store?
2. Who updates if an input string is included in the Provider value?

## Official references

- [React Learning Guide](https://react.dev/learn)
- [React API Reference](https://react.dev/reference/react)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/react-step-10/example.js) · [Runtime environments and limits](../../../../../examples.md)

This is an experiment using actual React APIs. It uses createElement instead of JSX.


Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Collecting Update Rules in a Reducer](../09/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions
