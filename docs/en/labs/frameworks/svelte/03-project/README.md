# Svelte · 28 Framework Comparison

[Series contents](../README.md) · [Technology map](../../../README.md)

Stage: Canvas Verification and Framework Comparison · External example · preview instructions · Storage ID: `svelte-03`

## Goals and learning outcomes

- Toggle, filter, and draft results from all three implementations are recorded against the same contract.
- Store adapter results are not confused with compiled Svelte results.

## Prerequisites

Unit 28 continues with the work and experiment records from Unit 27.

## Key concepts and explanations

### Comparing Execution Models

React render calculations, Vue reactivity, and Svelte compiled updates do not share the same internal model. Explain differences using code that implements the same UI contract and observed results.

### Evidence and Preference

One experiment’s results are limited to its data and environment. Record measurements, verified lifetimes, and personal preferences separately.

## Practice setup

Compile and run .svelte files in a separate Svelte 5 Vite project. Record package versions and the lockfile. Frontory’s Svelte preview uses actual writable stores and an explicit DOM adapter; it is not a .svelte compiler or a runes runner. The existing svelte-03 preview is a starting point. Implement the expanded work described here in a separate project.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. Perform the same 10 operations on actual Svelte components in the external project and the React·Vue card implementations.
2. In notes/final.md, tabulate state, derived value, subscription, and cleanup code, plus the results of returning to A/B drafts.
3. Mark the built-in svelte-03 as a store adapter and submit items not run, failures, and measurement limitations together.

## Variables to observe

| Variable       | Baseline                                      | Change                    | Expected change / hypothesis                                                                 |
| -------------- | --------------------------------------------- | ------------------------- | -------------------------------------------------------------------------------------------- |
| Implementation | React·Vue·Svelte with identical functionality | Change only the framework | The output contract stays the same, while responsibilities in state and cleanup code differ. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Toggle, filter, and draft results from all three implementations are recorded against the same contract.
- [ ] Store adapter results are not confused with compiled Svelte results.

## Self-check

1. Which conditions prevent generalizing performance rankings?
2. Can you separate evidence from preference when explaining which implementation felt easier for the same requirements, and why?

## Official references

- [Svelte Official Documentation and Runes Index](https://svelte.dev/docs/svelte/overview)
- [Svelte $effect and Cleanup](https://svelte.dev/docs/svelte/$effect)
- [Svelte onMount and tick](https://svelte.dev/docs/svelte/lifecycle-hooks)

## Linked example and execution scope

[Example source](../../../../../../src/labs/svelte-03/example.js) · [Runtime environments and limits](../../../../examples.md)

The preview uses an actual Svelte writable store and a DOM adapter. It does not include the Svelte component compiler. Run the .svelte files in the same example folder in a separate Svelte project to compare component lifecycles.

- [App.svelte](../../../../../../src/labs/svelte-03/App.svelte)
- [README.md (Korean original)](../../../../../../src/labs/svelte-03/README.md) · [English reading](../../../../../../src/labs/svelte-03/README.en.md)

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Preparing a Three-Framework Comparison](../units/27/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions
