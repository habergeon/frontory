# Vue · 19 Restoring Saved Data and Validation

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Composables and Store Lifetimes · Editable example · Storage ID: `vue-step-19`

## Goals and learning outcomes

- Valid A and B drafts are restored separately.
- New input is retained even with invalid data.

## Prerequisites

Unit 19 builds on the work and experiment records from Unit 18.

## Key concepts and explanations

### Serialization

Store the data structure to save in JSON rather than the reactive Proxy itself. Check the version and fields to read older data safely.

### Handling failure

Storage writes can throw exceptions. Retain the in-memory draft and report save failures separately to avoid losing input.

## Practice setup

First check the execution scope guidance on the example screen. The following is the preparation environment for extending the assignment in a separate project. Use .vue SFCs and script setup in a separate Vue Vite project. Record package versions and the lockfile, and run on the development server. The built-in Vue examples use the h function and are not a general-purpose SFC compiler.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. Create versioned notes JSON read/write functions in src/persistence.js.
2. Insert only valid data into the store during initial loading.
3. Inject broken JSON and write exceptions, and record on-screen errors and draft preservation results.

## Variables to observe

| Variable | Baseline | Change | Expected change / hypothesis |
| --- | --- | --- | --- |
| Restore input | Valid JSON | Truncated JSON | Report the error and continue editing with an empty store. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Valid A and B drafts are restored separately.
- [ ] New input is retained even with invalid data.

## Self-check

1. What is lost if watch immediate saving runs before the initial restore?
2. Is deep watch appropriate for every saving requirement?

## Official references

- [Vue Composition API Guide](https://vuejs.org/guide/introduction.html)
- [Vue Watchers and cleanup](https://vuejs.org/guide/essentials/watchers.html)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/vue-step-19/example.js) · [Runtime environments and limits](../../../../../examples.md)

This is an experiment with actual Vue reactivity and render functions. Check SFC templates in an external compilation environment.


Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Shared Store Scope](../18/README.md) · [Next: Async Components and Loading UI](../20/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions
