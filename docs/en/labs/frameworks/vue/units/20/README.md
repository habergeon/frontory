# Vue · 20 Async Components and Loading UI

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Composables and Store Lifetimes · Editable example · Storage ID: `vue-step-20`

## Goals and learning outcomes

- Loading guidance appears during a delay instead of a blank screen.
- List and note controls remain usable after a failure.

## Prerequisites

Unit 20 builds on the work and experiment records from Unit 19.

## Key concepts and explanations

### Lazy loading

defineAsyncComponent defers loading component code. Data requests and code loading have separate failure paths.

### Error boundaries

Loading and error components explain the current state to the user. Provide a fallback screen or retry policy for failures.

## Practice setup

First check the execution scope guidance on the example screen. The following is the preparation environment for extending the assignment in a separate project. Use .vue SFCs and script setup in a separate Vue Vite project. Record package versions and the lockfile, and run on the development server. The built-in Vue examples use the h function and are not a general-purpose SFC compiler.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. Load the heavy PreviewPanel.vue through defineAsyncComponent in src/App.vue.
2. Specify loadingComponent and errorComponent.
3. Add a delay and a failure separately to a mock import Promise, and record the guidance states.

## Variables to observe

| Variable | Baseline | Change | Expected change / hypothesis |
| --- | --- | --- | --- |
| Code loading | Immediate success | Failure after a delay | An error message appears after the loading guidance. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Loading guidance appears during a delay instead of a blank screen.
- [ ] List and note controls remain usable after a failure.

## Self-check

1. Can code-loading failures and search failures use the same state variable?
2. Can the size of a split bundle alone determine perceived performance?

## Official references

- [Vue Composition API Guide](https://vuejs.org/guide/introduction.html)
- [Vue Watchers and cleanup](https://vuejs.org/guide/essentials/watchers.html)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/vue-step-20/example.js) · [Runtime environments and limits](../../../../../examples.md)

This is an experiment with actual Vue reactivity and render functions. Check SFC templates in an external compilation environment.


Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Restoring Saved Data and Validation](../19/README.md) · [Next: KeepAlive and Pausing](../21/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions
