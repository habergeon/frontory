# React · 28 State Preservation and Performance

[Series contents](../README.md) · [Technology map](../../../README.md)

Stage: Performance verification and an integrated editor · Editable example · Storage ID: `react-03`

## Goals and learning outcomes

- The exact note string is restored after A→B→A.
- There are 10 before/after measurements under identical conditions and reasons for adoption or rejection.

## Prerequisites

Unit 28 continues using the work and experiment records from Unit 27.

## Key concepts and explanations

### Preservation Policy

key determines an editor's identity. Store note data by unit id, and define separate reset rules for temporary UI state.

### Evidence-Based Improvements

Compare performance changes using the same data and inputs. Record measurements and remaining bottlenecks instead of merely claiming speed.

## Practice setup

This is a JSX exercise in a separate React Vite project. Record Node and package versions and the lockfile, and run it on the project development server. The built-in editor is not a general-purpose JSX compiler. The existing react-03 preview is a starting point. Implement the expanded deliverable described here in a separate project.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. In src/StudyWorkspace.jsx, perform a final check of A·B switching and draft restoration.
2. Use the measurement procedure from Unit 21 to record input with 1000 cards, and change only one policy: memo or pagination.
3. Submit notes/final.md combining state ownership, a resource disposal table, before/after Profiler records, and failure cases.

## Variables to observe

| Variable            | Baseline      | Change                   | Expected change / hypothesis                                                                   |
| ------------------- | ------------- | ------------------------ | ---------------------------------------------------------------------------------------------- |
| Optimization Policy | Existing list | One measured improvement | Verify whether only the chosen cost changes while the draft preservation contract is retained. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] The exact note string is restored after A→B→A.
- [ ] There are 10 before/after measurements under identical conditions and reasons for adoption or rejection.

## Self-check

1. What criteria justify removing an optimization with no improvement?
2. How do you explain the boundary between React state and external renderer state?

## Official references

- [React Learning Guide](https://react.dev/learn)
- [React API Reference](https://react.dev/reference/react)
- [React: Preserving and Resetting State](https://react.dev/learn/preserving-and-resetting-state)

## Linked example and execution scope

[Example source](../../../../../../src/labs/react-03/example.js) · [Runtime environments and limits](../../../../examples.md)

An actual React state and memo experiment. Observe Profiler timing with development React. The callback may be unavailable in production builds.

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Integrated Editor and Resource Audit](../units/27/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions
