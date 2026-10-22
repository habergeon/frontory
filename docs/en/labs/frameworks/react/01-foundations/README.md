# React · 01 State and Ownership

[Series contents](../README.md) · [Technology map](../../../README.md)

Stage: Components and state calculations · Editable example · Storage ID: `react-01`

## Goals and learning outcomes

- After toggling 1 card, the total increases by exactly 1.
- The state of the original 3 cards is preserved when the filter is turned off and on again.

## Prerequisites

JavaScript arrays·objects·functions, DOM events, and running npm projects.

## Key concepts and explanations

### Single Source of Truth

useState holds values the screen needs to remember. Derive the completed count from the list during render so it stays consistent with the source.

### Component Boundaries

props are inputs a parent passes to a child. When two children use the same value, their common parent owns it and passes a function for changing it.

## Practice setup

This is a JSX exercise in a separate React Vite project. Record Node and package versions and the lockfile, and run it on the project development server. The built-in editor is not a general-purpose JSX compiler. The existing react-01 preview is a starting point. Implement the expanded deliverable described here in a separate project.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. In src/App.jsx of an external React Vite project, use useState to create 3 cards with id·title·done.
2. Separate CardList and Summary, and calculate the list and completed count from the same items.
3. Connect the completion toggle and incomplete filter, and record a state ownership diagram in notes/day01.md.

## Variables to observe

| Variable | Baseline | Change | Expected change / hypothesis |
| --- | --- | --- | --- |
| Completed Items | 0 items | 1 item | The total changes to 1, and only that card disappears from the incomplete list. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] After toggling 1 card, the total increases by exactly 1.
- [ ] The state of the original 3 cards is preserved when the filter is turned off and on again.

## Self-check

1. What inconsistencies can arise if the completed count is stored as separate state?
2. Who should own the filter and completion state respectively?

## Official references

- [React Learning Guide](https://react.dev/learn)
- [React API Reference](https://react.dev/reference/react)

## Linked example and execution scope

[Example source](../../../../../../src/labs/react-01/example.js) · [Runtime environments and limits](../../../../examples.md)

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Next: JSX and Pure Rendering](../units/02/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions
