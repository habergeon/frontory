# Vue · 16 Composable Lifetimes

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Composables and Store Lifetimes · Editable example · Storage ID: `vue-step-16`

## Goals and learning outcomes

- The remaining panel's size continues to update.
- After all panels are removed, the active listener count is 0.

## Prerequisites

Unit 16 builds on the work and experiment records from Unit 15.

## Key concepts and explanations

### Grouping logic

A Composable is a reusable function that uses the Composition API. Specify whether each call creates independent state or shares it.

### Cleanup responsibility

Lifecycle Hooks registered inside a component are tied to that instance. Remove external listeners at the same termination point.

## Practice setup

First check the execution scope guidance on the example screen. The following is the preparation environment for extending the assignment in a separate project. Use .vue SFCs and script setup in a separate Vue Vite project. Record package versions and the lockfile, and run on the development server. The built-in Vue examples use the h function and are not a general-purpose SFC compiler.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. Group a ref, resize listener, and onUnmounted in src/composables/useWindowSize.js.
2. Call it in two panels and display the size.
3. Remove panels one by one and check the listener count and remaining display.

## Variables to observe

| Variable       | Baseline   | Change      | Expected change / hypothesis                                               |
| -------------- | ---------- | ----------- | -------------------------------------------------------------------------- |
| Consumer count | 1 consumer | 2 consumers | An independent Composable has two listeners, which are removed one by one. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] The remaining panel's size continues to update.
- [ ] After all panels are removed, the active listener count is 0.

## Self-check

1. Is state independent for each call when using a module-scope ref?
2. Why is registering onMounted inside setTimeout a problem?

## Official references

- [Vue Composition API Guide](https://vuejs.org/guide/introduction.html)
- [Vue Watchers and cleanup](https://vuejs.org/guide/essentials/watchers.html)
- [Vue Composables and Lifetime Management](https://vuejs.org/guide/reusability/composables.html)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/vue-step-16/example.js) · [Runtime environments and limits](../../../../../examples.md)

This is an experiment with actual Vue reactivity and render functions. Check SFC templates in an external compilation environment.

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Template Refs and nextTick](../15/README.md) · [Next: provide and inject](../17/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions
