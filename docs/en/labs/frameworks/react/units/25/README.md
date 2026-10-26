# React · 25 Subscription Stores and Snapshots

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Performance verification and an integrated editor · Editable example · Storage ID: `react-step-25`

## Goals and learning outcomes

- Both panels display the same latest id.
- The subscription count is 0 after removing all panels.

## Prerequisites

Unit 25 continues using the work and experiment records from Unit 24.

## Key concepts and explanations

### External Stores

A store updated outside React requires subscriptions and snapshot reads. useSyncExternalStore lets React read through this contract.

### Snapshot Stability

When nothing changes, getSnapshot must return the same value. Creating a new object every time makes changes difficult to distinguish.

## Practice setup

First check the execution scope guidance on the example screen. The following environment is for extending the assignment in a separate project. This is a JSX exercise in a separate React Vite project. Record Node and package versions and the lockfile, and run it on the project development server. The built-in editor is not a general-purpose JSX compiler.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. Implement getSnapshot·subscribe·update in src/store.js.
2. Use useSyncExternalStore to display the same selected id in two panels.
3. Call an external update, and remove the panels in turn to check the subscription count.

## Variables to observe

| Variable | Baseline              | Change                     | Expected change / hypothesis                              |
| -------- | --------------------- | -------------------------- | --------------------------------------------------------- |
| Snapshot | New object every time | New object only on changes | Reads with no changes do not trigger unnecessary updates. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Both panels display the same latest id.
- [ ] The subscription count is 0 after removing all panels.

## Self-check

1. When does the screen update if an external value is only read through a regular ref?
2. What function must subscribe return?

## Official references

- [React Learning Guide](https://react.dev/learn)
- [React API Reference](https://react.dev/reference/react)
- [React useEffect: External Systems and Cleanup](https://react.dev/reference/react/useEffect)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/react-step-25/example.js) · [Runtime environments and limits](../../../../../examples.md)

This is an experiment using actual React APIs. It uses createElement instead of JSX.

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Event Boundaries and Accessible Selection](../24/README.md) · [Next: Creating Regression Scenarios](../26/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions
