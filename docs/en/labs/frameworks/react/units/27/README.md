# React · 27 Integrated Editor and Resource Audit

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Performance verification and an integrated editor · Editable example · Storage ID: `react-step-27`

## Goals and learning outcomes

- A and B drafts remain unchanged after 10 switches.
- There are 0 active render loops in the final hidden state.

## Prerequisites

Unit 27 continues using the work and experiment records from Unit 26.

## Key concepts and explanations

### Integration Boundaries

Notes, search, and Canvas have different update rates and lifetimes. Assigning ownership to each area makes data and resources easier to track during switches.

### Audit Records

Matching creation and disposal counts alone can miss resources that are still active. Check final active counts and restored functionality together.

## Practice setup

First check the execution scope guidance on the example screen. The following environment is for extending the assignment in a separate project. This is a JSX exercise in a separate React Vite project. Record Node and package versions and the lockfile, and run it on the project development server. The built-in editor is not a general-purpose JSX compiler.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. Combine the list, notes, and ThreeScene in src/StudyWorkspace.jsx.
2. During 10 unit switches, interleave input and hiding Canvas.
3. In notes/audit.md, record draft ids, active loops, listeners, and results of handling save errors.

## Variables to observe

| Variable | Baseline | Change | Expected change / hypothesis |
| --- | --- | --- | --- |
| Switch Count | 1 time | 10 times | Drafts remain separated by id, and resource counts do not accumulate. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] A and B drafts remain unchanged after 10 switches.
- [ ] There are 0 active render loops in the final hidden state.

## Self-check

1. Which state should be preserved during switching, and which should reset?
2. Can creation/disposal logs alone guarantee GPU resource disposal?

## Official references

- [React Learning Guide](https://react.dev/learn)
- [React API Reference](https://react.dev/reference/react)
- [React useEffect: External Systems and Cleanup](https://react.dev/reference/react/useEffect)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/react-step-27/example.js) · [Runtime environments and limits](../../../../../examples.md)

This is an experiment using actual React APIs. It uses createElement instead of JSX.


Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Creating Regression Scenarios](../26/README.md) · [Next: State Preservation and Performance](../../03-project/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions
