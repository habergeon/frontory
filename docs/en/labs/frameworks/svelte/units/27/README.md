# Svelte · 27 Preparing a Three-Framework Comparison

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Canvas Verification and Framework Comparison · External example · preview instructions · Storage ID: `svelte-step-27`

## Goals and learning outcomes

- All three implementations use the same fixture.
- The table includes execution status and locations of APIs to compare.

## Prerequisites

Unit 27 continues with the work and experiment records from Unit 26.

## Key concepts and explanations

### Identical Input

Fix the ids, titles, completion states, and operation order in the comparison data. Different functionality weakens the basis for comparing code size and response speed.

### Separate Observations

Record implementation differences separately from personal preferences. Mark items you could not actually run as not run.

## Practice setup

First check the execution scope guidance on the example screen. The following environment is for extending the assignment in a separate project. Compile and run .svelte files in a separate Svelte 5 Vite project. Record package versions and the lockfile. Frontory’s Svelte preview uses actual writable stores and an explicit DOM adapter; it is not a .svelte compiler or a runes runner.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. In notes/comparison-plan.md, write the contract for 3 cards, toggling, filtering, and A/B notes.
2. Provide the same data to separate React·Vue projects and record their execution environments.
3. Collect corresponding code locations for state, derived values, events, and cleanup.

## Variables to observe

| Variable | Baseline | Change | Expected change / hypothesis |
| --- | --- | --- | --- |
| Input Data | Different data per framework | Shared fixture | Output differences can be explained against the same inputs. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] All three implementations use the same fixture.
- [ ] The table includes execution status and locations of APIs to compare.

## Self-check

1. Do fewer source lines always mean easier maintenance?
2. From which kinds of comparisons should the built-in Svelte column be excluded?

## Official references

- [Svelte Official Documentation and Runes Index](https://svelte.dev/docs/svelte/overview)
- [Svelte $effect and Cleanup](https://svelte.dev/docs/svelte/$effect)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/svelte-step-27/example.js) · [Runtime environments and limits](../../../../../examples.md)

The preview is a Svelte writable/DOM contract experiment. To run runes, snippets, and compiled output, run the actual App.svelte in a Svelte 5 project.

- [App.svelte](../../../../../../../src/labs/svelte-step-27/App.svelte)

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Regression Scenarios for the Same Contract](../26/README.md) · [Next: Framework Comparison](../../03-project/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions
