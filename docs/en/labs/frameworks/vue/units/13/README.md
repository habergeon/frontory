# Vue · 13 Watcher Cleanup and Out-of-Order Requests

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Component Contracts and Watching · Editable example · Storage ID: `vue-step-13`

## Goals and learning outcomes

- The final result matches the latest B input.
- Request updates are not applied after removing the component.

## Prerequisites

Unit 13 builds on the work and experiment records from Unit 12.

## Key concepts and explanations

### cleanup

onCleanup in a watch callback registers a function to clean up previous work. Cancel timers or requests before rerunning to limit the previous work's effects.

### Response consistency

A late response can overwrite the latest search result. Checking a request id also distinguishes completion paths that cancellation alone did not handle.

## Practice setup

First check the execution scope guidance on the example screen. The following is the preparation environment for extending the assignment in a separate project. Use .vue SFCs and script setup in a separate Vue Vite project. Record package versions and the lockfile, and run on the development server. The built-in Vue examples use the h function and are not a general-purpose SFC compiler.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. Add AbortController and onCleanup to src/useSearch.js.
2. In fakeSearch, create delays of A 800ms and B 100ms.
3. Enter A followed by B, and compare the final query, result id, and cancellation records.

## Variables to observe

| Variable       | Baseline   | Change          | Expected change / hypothesis                       |
| -------------- | ---------- | --------------- | -------------------------------------------------- |
| Response delay | Same 100ms | A 800ms·B 100ms | A late A response does not overwrite the B result. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] The final result matches the latest B input.
- [ ] Request updates are not applied after removing the component.

## Self-check

1. How does automatic cleanup scope change if you create watch inside an asynchronous callback?
2. Should AbortError be displayed as a user error?

## Official references

- [Vue Composition API Guide](https://vuejs.org/guide/introduction.html)
- [Vue Watchers and cleanup](https://vuejs.org/guide/essentials/watchers.html)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/vue-step-13/example.js) · [Runtime environments and limits](../../../../../examples.md)

This is an experiment with actual Vue reactivity and render functions. Check SFC templates in an external compilation environment.

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: watch Sources and Timing](../12/README.md) · [Next: Component Contracts and Watching](../../02-experiments/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions
