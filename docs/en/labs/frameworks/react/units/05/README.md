# React · 05 Conditional Screens and Empty States

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Components and state calculations · Editable example · Storage ID: `react-step-05`

## Goals and learning outcomes

- The guidance appears exactly once when there are 0 results.
- Resetting restores the 3 cards.

## Prerequisites

Unit 5 continues using the work and experiment records from Unit 4.

## Key concepts and explanations

### Conditional Rendering

Choosing JSX based on a condition changes which components exist. Hiding with CSS and removing have different lifecycles.

### Empty States

0 search results is a valid state rather than an error. Placing the number 0 before && can display 0 on the screen.

## Practice setup

First check the execution scope guidance on the example screen. The following environment is for extending the assignment in a separate project. This is a JSX exercise in a separate React Vite project. Record Node and package versions and the lockfile, and run it on the project development server. The built-in editor is not a general-purpose JSX compiler.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. In src/CardList.jsx, display a guidance sentence when there are no results.
2. Enter a string that matches nothing in the filter input, and connect a reset button.
3. Change the result count condition to an explicit comparison, and check for unwanted text showing 0.

## Variables to observe

| Variable     | Baseline     | Change            | Expected change / hypothesis                                 |
| ------------ | ------------ | ----------------- | ------------------------------------------------------------ |
| Search Query | Empty string | Nonexistent title | An empty state and reset button appear in place of the list. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] The guidance appears exactly once when there are 0 results.
- [ ] Resetting restores the 3 cards.

## Self-check

1. Does an editor hidden with CSS lose its state?
2. Why distinguish empty results from a failed request?

## Official references

- [React Learning Guide](https://react.dev/learn)
- [React API Reference](https://react.dev/reference/react)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/react-step-05/example.js) · [Runtime environments and limits](../../../../../examples.md)

This is an experiment using actual React APIs. It uses createElement instead of JSX.

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Updating Objects and Arrays](../04/README.md) · [Next: List Keys and Identity](../06/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions
