# Vue · 24 Shallow Reactivity and External Objects

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Canvas Integration and Update Verification · Editable example · Storage ID: `vue-step-24`

## Goals and learning outcomes

- Consumers read the new handle when the renderer handle is replaced.
- Template statistics do not update on every frame change.

## Prerequisites

Unit 24 builds on the work and experiment records from Unit 23.

## Key concepts and explanations

### shallowRef

shallowRef tracks replacement of .value without deeply wrapping the inner object. Consider it when managing lifetimes of external objects such as Three.js objects.

### Explicit notification

An internal mutation does not always require a Vue update. For an on-screen summary, notify through a separate ref or explicit replacement.

## Practice setup

First check the execution scope guidance on the example screen. The following is the preparation environment for extending the assignment in a separate project. Use .vue SFCs and script setup in a separate Vue Vite project. Record package versions and the lockfile, and run on the development server. The built-in Vue examples use the h function and are not a general-purpose SFC compiler.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. Store an external renderer handle in a shallowRef in src/useRenderer.js.
2. Change the scene object's internal rotation in the loop, and display separate low-frequency statistics in the UI.
3. Compare object identity and UI update logs against a deep ref control.

## Variables to observe

| Variable       | Baseline | Change     | Expected change / hypothesis                                                   |
| -------------- | -------- | ---------- | ------------------------------------------------------------------------------ |
| Storage method | Deep ref | shallowRef | Internal changes to the external object are excluded from Vue's deep tracking. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Consumers read the new handle when the renderer handle is replaced.
- [ ] Template statistics do not update on every frame change.

## Self-check

1. What options update the UI after a shallowRef's internals change?
2. What do markRaw and shallowRef control differently?

## Official references

- [Vue Composition API Guide](https://vuejs.org/guide/introduction.html)
- [Vue Watchers and cleanup](https://vuejs.org/guide/essentials/watchers.html)
- [Vue Composables and Lifetime Management](https://vuejs.org/guide/reusability/composables.html)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/vue-step-24/example.js) · [Runtime environments and limits](../../../../../examples.md)

This is an experiment with actual Vue reactivity and render functions. Check SFC templates in an external compilation environment.

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Separating Frame Values from UI Values](../23/README.md) · [Next: Observing Vue Performance](../25/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions
