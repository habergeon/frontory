# Vue · 21 KeepAlive and Pausing

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Composables and Store Lifetimes · Editable example · Storage ID: `vue-step-21`

## Goals and learning outcomes

- The Editor's local string remains on return.
- The inactive Preview's tick does not increase.

## Prerequisites

Unit 21 builds on the work and experiment records from Unit 20.

## Key concepts and explanations

### Preserving instances

KeepAlive caches inactive component instances. Unlike removal, it can retain local state.

### Active lifetime

Cached components can hold resources even while inactive. Design pausing and resuming through onActivated and onDeactivated.

## Practice setup

First check the execution scope guidance on the example screen. The following is the preparation environment for extending the assignment in a separate project. Use .vue SFCs and script setup in a separate Vue Vite project. Record package versions and the lockfile, and run on the development server. The built-in Vue examples use the h function and are not a general-purpose SFC compiler.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. Wrap Editor and Preview dynamic components with KeepAlive in src/Workspace.vue.
2. Start the Preview timer in onActivated and stop it in onDeactivated.
3. Alternate panels 5 times and check local values and active timer counts.

## Variables to observe

| Variable | Baseline | Change | Expected change / hypothesis |
| --- | --- | --- | --- |
| Preservation method | Ordinary dynamic component | KeepAlive | Local values remain and inactive timers must stop. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] The Editor's local string remains on return.
- [ ] The inactive Preview's tick does not increase.

## Self-check

1. Does onUnmounted alone stop a cached screen's loop?
2. What should you check when limiting the cache count?

## Official references

- [Vue Composition API Guide](https://vuejs.org/guide/introduction.html)
- [Vue Watchers and cleanup](https://vuejs.org/guide/essentials/watchers.html)
- [Vue Composables and Lifetime Management](https://vuejs.org/guide/reusability/composables.html)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/vue-step-21/example.js) · [Runtime environments and limits](../../../../../examples.md)

This is an experiment with actual Vue reactivity and render functions. Check SFC templates in an external compilation environment.


Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Async Components and Loading UI](../20/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions
