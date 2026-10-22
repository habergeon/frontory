# Svelte · 18 Requests and Stale Results

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Stores and Workspace State · External example · preview instructions · Storage ID: `svelte-step-18`

## Goals and learning outcomes

- The final query and result id are both B.
- Results are not applied after component removal.

## Prerequisites

Unit 18 continues with the work and experiment records from Unit 17.

## Key concepts and explanations

### Asynchronous Races

Search requests can finish in a different order from the order sent. You need a rule that accepts only results for the latest query.

### Effect Cleanup

Read query synchronously at the start of the Effect and create the request. In cleanup, cancel it or mark its eventual result to be ignored.

## Practice setup

First check the execution scope guidance on the example screen. The following environment is for extending the assignment in a separate project. Compile and run .svelte files in a separate Svelte 5 Vite project. Record package versions and the lockfile. Frontory’s Svelte preview uses actual writable stores and an explicit DOM adapter; it is not a .svelte compiler or a runes runner.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. In src/Search.svelte, connect an AbortController to an $effect that reads query.
2. Add delays of 800ms for A and 100ms for B to fakeSearch.
3. Enter A followed by B and use a latest-id check to confirm that the final result is B.

## Variables to observe

| Variable | Baseline | Change | Expected change / hypothesis |
| --- | --- | --- | --- |
| Response Delay | Both 100ms | Only A at 800ms | The late A does not change the B result. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] The final query and result id are both B.
- [ ] Results are not applied after component removal.

## Self-check

1. What happens to the cleanup return if you declare the Effect itself async?
2. How do you distinguish cancellation errors from actual failures?

## Official references

- [Svelte Official Documentation and Runes Index](https://svelte.dev/docs/svelte/overview)
- [Svelte $effect and Cleanup](https://svelte.dev/docs/svelte/$effect)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/svelte-step-18/example.js) · [Runtime environments and limits](../../../../../examples.md)

The preview is a Svelte writable/DOM contract experiment. To run runes, snippets, and compiled output, run the actual App.svelte in a Svelte 5 project.

- [App.svelte](../../../../../../../src/labs/svelte-step-18/App.svelte)

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Connecting Workspaces with Context](../17/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions
