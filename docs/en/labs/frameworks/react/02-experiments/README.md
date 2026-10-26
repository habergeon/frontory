# React · 14 Effects and External Renderers

[Series contents](../README.md) · [Technology map](../../../README.md)

Stage: Shared state and external systems · Editable example · Storage ID: `react-02`

## Goals and learning outcomes

- After 5 switches, only 1 Canvas exists.
- Frame logs and resize callbacks stop after hiding.

## Prerequisites

Unit 14 continues using the work and experiment records from Unit 13.

## Key concepts and explanations

### Renderer Ownership

A Canvas renderer operates separately from React's DOM calculations. Specify who owns created geometry·material·listeners so their disposal points can be identified.

### Symmetrical Cleanup

Close loops and subscriptions created by an Effect in cleanup. If the previous Canvas remains on rerun, renderers are duplicated.

## Practice setup

This is a JSX exercise in a separate React Vite project. Record Node and package versions and the lockfile, and run it on the project development server. The built-in editor is not a general-purpose JSX compiler. The existing react-02 preview is a starting point. Implement the expanded deliverable described here in a separate project.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. Create a canvas ref and Effect in src/ThreeScene.jsx, and connect the existing Three.js cube.
2. Include RAF cancellation, resize listener removal, and geometry/material/renderer.dispose in cleanup.
3. Toggle the display button 5 times, and record active Canvas and loop counts and interaction with the cube after showing it again.

## Variables to observe

| Variable      | Baseline | Change  | Expected change / hypothesis                           |
| ------------- | -------- | ------- | ------------------------------------------------------ |
| Remount Count | 1 time   | 5 times | Keep 1 active loop while displayed and 0 while hidden. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] After 5 switches, only 1 Canvas exists.
- [ ] Frame logs and resize callbacks stop after hiding.

## Self-check

1. Is it safe to dispose a shared material in a child's cleanup?
2. Does the renderer need to be recreated for every color prop change?

## Official references

- [React Learning Guide](https://react.dev/learn)
- [React API Reference](https://react.dev/reference/react)
- [React useEffect: External Systems and Cleanup](https://react.dev/reference/react/useEffect)

## Linked example and execution scope

[Example source](../../../../../../src/labs/react-02/example.js) · [Runtime environments and limits](../../../../examples.md)

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Request Races and Cancellation](../units/13/README.md) · [Next: Custom Hook Boundaries](../units/15/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions
