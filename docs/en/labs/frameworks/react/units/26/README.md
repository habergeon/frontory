# React · 26 Creating Regression Scenarios

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Performance verification and an integrated editor · Editable example · Storage ID: `react-step-26`

## Goals and learning outcomes

- Inputs and expected outputs are specified for at least 4 core flows.
- Previous drafts do not mix in when scenarios run in different orders.

## Prerequisites

Unit 26 continues using the work and experiment records from Unit 25.

## Key concepts and explanations

### User Contracts

Tests check what users enter and see rather than internal Hook names. If the contract stays the same after an implementation change, verification can remain valid.

### Isolation

Reset storage and input data for each test to keep results independent. Judge completion by screen conditions instead of waiting for a duration.

## Practice setup

First check the execution scope guidance on the example screen. The following environment is for extending the assignment in a separate project. This is a JSX exercise in a separate React Vite project. Record Node and package versions and the lockfile, and run it on the project development server. The built-in editor is not a general-purpose JSX compiler.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. Write card addition, toggling, and unit switching flows in tests/notes.spec.js in the external project.
2. Also verify expected outputs for A and B drafts, empty searches, and reversed request responses.
3. Rerun each scenario in a new context with storage cleared.

## Variables to observe

| Variable | Baseline | Change | Expected change / hypothesis |
| --- | --- | --- | --- |
| Initial Storage | Empty storage | A draft exists | Only the initial expectations differ; the subsequent editing contract stays the same. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Inputs and expected outputs are specified for at least 4 core flows.
- [ ] Previous drafts do not mix in when scenarios run in different orders.

## Self-check

1. Why use labels rather than selectors tied to implementation details?
2. What failures can a fixed sleep hide?

## Official references

- [React Learning Guide](https://react.dev/learn)
- [React API Reference](https://react.dev/reference/react)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/react-step-26/example.js) · [Runtime environments and limits](../../../../../examples.md)

This is an experiment using actual React APIs. It uses createElement instead of JSX.


Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Subscription Stores and Snapshots](../25/README.md) · [Next: Integrated Editor and Resource Audit](../27/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions
