# TypeScript · 28 Plugin Contracts

[Series contents](../README.md) · [Technology map](../../../README.md)

Stage: Module Contracts and Plugins · Editable example · Storage ID: `typescript-03`

## Goals and learning outcomes

- Both implementations pass strict type checking.
- After 5 swaps, there are no duplicate events and calling dispose 2 times is safe.

## Prerequisites

Work and experiment records from Unit 27, “Plugin Ownership and Cleanup Contracts”

## Key concepts and explanations

### Interchangeable Implementations

Swap DOM and Canvas implementations satisfying the same interface. Each implementation owns its specific resources.

### Integration Checks

strict checking and actual behavior checks find different failures. Record their results separately.

## Practice setup

The existing Frontory preview is a limited starting example, not a complete implementation of the assignment. Implement additional files and features yourself in a separate local project. Record the installed tsc version in a separate TypeScript project. Enable strict in tsconfig.json and check with tsc --noEmit, then open the runtime exercise using compiled output or a local development server. Do not assume the browser executes TS type annotations directly.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. In main.ts, prepare conditions for 5 swaps between two implementations and duplicate dispose calls.
2. Connect DOMPlugin and CanvasPlugin with a mount/dispose contract and swap them through a selection UI.
3. Run with 5 swaps between two implementations and duplicate dispose calls. Results to check: Both implementations pass strict type checking. After 5 swaps, there are no duplicate events and calling dispose 2 times is safe. Record expected and actual results separately.

## Variables to observe

| Variable | Baseline | Change | Expected change / hypothesis |
| --- | --- | --- | --- |
| Implementation | DOM | Canvas | Pre-run hypothesis: the caller will be able to swap implementations through the same contract. Keep other conditions fixed and record the actual result separately after running. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Both implementations pass strict type checking.
- [ ] After 5 swaps, there are no duplicate events and calling dispose 2 times is safe.

## Self-check

1. Do implementation-specific properties leak into the common contract?
2. Which lifecycle problems did type checking miss?

## Official references

- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)

## Linked example and execution scope

[Example source](../../../../../../src/labs/typescript-03/example.js) · [Runtime environments and limits](../../../../examples.md)

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Plugin Ownership and Cleanup Contracts](../units/27/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions
