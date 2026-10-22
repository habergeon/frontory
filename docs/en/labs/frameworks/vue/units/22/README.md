# Vue · 22 Creating and Releasing Canvas Resources

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Canvas Integration and Update Verification · Editable example · Storage ID: `vue-step-22`

## Goals and learning outcomes

- tick logs stop after removal.
- Only one circle moves after showing again.

## Prerequisites

Unit 22 builds on the work and experiment records from Unit 21.

## Key concepts and explanations

### External resources

Canvas contexts and RAF are objects outside Vue reactivity. Create them in onMounted after the DOM is ready.

### Termination

Release RAF, observers, and listeners in onUnmounted. Repeated showing must leave resources from only one generation.

## Practice setup

First check the execution scope guidance on the example screen. The following is the preparation environment for extending the assignment in a separate project. Use .vue SFCs and script setup in a separate Vue Vite project. Record package versions and the lockfile, and run on the development server. The built-in Vue examples use the h function and are not a general-purpose SFC compiler.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. Create a canvas ref and a 2D context in onMounted in src/CanvasPanel.vue.
2. Draw a circle with RAF and add cancellation and ResizeObserver.disconnect to onUnmounted.
3. Show and remove it 5 times with v-if, recording active loop counts.

## Variables to observe

| Variable | Baseline | Change | Expected change / hypothesis |
| --- | --- | --- | --- |
| Show count | 1 time | 5 times | Maintain 1 loop while visible and 0 after removal. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] tick logs stop after removal.
- [ ] Only one circle moves after showing again.

## Self-check

1. Does cleanup run if you switch to v-show?
2. Must all external resources be wrapped in reactive?

## Official references

- [Vue Composition API Guide](https://vuejs.org/guide/introduction.html)
- [Vue Watchers and cleanup](https://vuejs.org/guide/essentials/watchers.html)
- [Vue Composables and Lifetime Management](https://vuejs.org/guide/reusability/composables.html)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/vue-step-22/example.js) · [Runtime environments and limits](../../../../../examples.md)

This is an experiment with actual Vue reactivity and render functions. Check SFC templates in an external compilation environment.


Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: KeepAlive and Pausing](../21/README.md) · [Next: Separating Frame Values from UI Values](../23/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions
