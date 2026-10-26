# Vue · 28 Canvas Lifecycle

[Series contents](../README.md) · [Technology map](../../../README.md)

Stage: Canvas Integration and Update Verification · Editable example · Storage ID: `vue-03`

## Goals and learning outcomes

- Active RAF, observer, and listener counts are 0 after final removal.
- Draft and Canvas controls work after speed changes and 10 remounts.

## Prerequisites

Unit 28 builds on the work and experiment records from Unit 27.

## Key concepts and explanations

### Render loop boundary

onMounted and onUnmounted connect creation and termination of an external Canvas. Keep frame coordinates local and accept only user settings as reactive inputs.

### Comparing lifetimes

React Effects also clean up and reset on dependency changes. In Vue, check mount lifetimes separately from watch rerun lifetimes.

## Practice setup

Use .vue SFCs and script setup in a separate Vue Vite project. Record package versions and the lockfile, and run on the development server. The built-in Vue examples use the h function and are not a general-purpose SFC compiler. The existing vue-03 preview is a starting point. Implement the extended deliverables described here in a separate project.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. Integrate Canvas in src/Workspace.vue with speed controls, resizing, and unit switching.
2. Record RAF, observer, and listener counts across 10 remounts and return after hiding.
3. Submit the React comparison table, draft preservation results, performance measurements, and failure recovery together in notes/final.md.

## Variables to observe

| Variable      | Baseline       | Change      | Expected change / hypothesis                                    |
| ------------- | -------------- | ----------- | --------------------------------------------------------------- |
| Frame storage | Reactive angle | Local angle | UI update frequency differs while preserving the same movement. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Active RAF, observer, and listener counts are 0 after final removal.
- [ ] Draft and Canvas controls work after speed changes and 10 remounts.

## Self-check

1. Which resources belong in watch cleanup and which in onUnmounted?
2. What supports separating local frame values from reactive settings?

## Official references

- [Vue Composition API Guide](https://vuejs.org/guide/introduction.html)
- [Vue Watchers and cleanup](https://vuejs.org/guide/essentials/watchers.html)
- [Vue Composables and Lifetime Management](https://vuejs.org/guide/reusability/composables.html)

## Linked example and execution scope

[Example source](../../../../../../src/labs/vue-03/example.js) · [Runtime environments and limits](../../../../examples.md)

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Composition API Integration Review](../units/27/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions
