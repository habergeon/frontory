# Vue · 15 Template Refs and nextTick

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Composables and Store Lifetimes · Editable example · Storage ID: `vue-step-15`

## Goals and learning outcomes

- The textarea is the active element when the panel opens.
- There is no null access error while hidden.

## Prerequisites

Unit 15 builds on the work and experiment records from Unit 14.

## Key concepts and explanations

### DOM references

A template ref points to the connected DOM element or component. It can be null when a conditional element is absent.

### Batched updates

Vue batches DOM updates. After changing state, check after nextTick before handling actual DOM dimensions or focus.

## Practice setup

First check the execution scope guidance on the example screen. The following is the preparation environment for extending the assignment in a separate project. Use .vue SFCs and script setup in a separate Vue Vite project. Record package versions and the lockfile, and run on the development server. The built-in Vue examples use the h function and are not a general-purpose SFC compiler.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. Create a conditional textarea and ref in src/EditorPanel.vue.
2. After setting visibility to true, connect await nextTick and focus.
3. Repeat showing and hiding 5 times, checking the active element and null handling.

## Variables to observe

| Variable | Baseline | Change | Expected change / hypothesis |
| --- | --- | --- | --- |
| Focus timing | Immediately after changing state | After nextTick | The created textarea can receive focus. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] The textarea is the active element when the panel opens.
- [ ] There is no null access error while hidden.

## Self-check

1. Does nextTick also wait for network completion?
2. Can a computed result replace a DOM reference?

## Official references

- [Vue Composition API Guide](https://vuejs.org/guide/introduction.html)
- [Vue Watchers and cleanup](https://vuejs.org/guide/essentials/watchers.html)
- [Vue Composables and Lifetime Management](https://vuejs.org/guide/reusability/composables.html)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/vue-step-15/example.js) · [Runtime environments and limits](../../../../../examples.md)

This is an experiment with actual Vue reactivity and render functions. Check SFC templates in an external compilation environment.


Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Component Contracts and Watching](../../02-experiments/README.md) · [Next: Composable Lifetimes](../16/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions
