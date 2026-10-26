# Vue · 27 Composition API Integration Review

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Canvas Integration and Update Verification · Editable example · Storage ID: `vue-step-27`

## Goals and learning outcomes

- Owners of state, derived values, and external work are documented separately.
- After 5 switches, there is 1 active Canvas.

## Prerequisites

Unit 27 builds on the work and experiment records from Unit 26.

## Key concepts and explanations

### Separating responsibilities

Composables separate responsibilities with different lifetimes, such as search, saving, and rendering. Excessive splitting can hide data flow, so document the actual owner.

### Comparable contracts

Use the same inputs, results, and lifetime requirements when comparing with React. Do not judge structure or performance by line count alone.

## Practice setup

First check the execution scope guidance on the example screen. The following is the preparation environment for extending the assignment in a separate project. Use .vue SFCs and script setup in a separate Vue Vite project. Record package versions and the lockfile, and run on the development server. The built-in Vue examples use the h function and are not a general-purpose SFC compiler.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. Integrate cards, notes, and Canvas in src/Workspace.vue.
2. Document what ref, computed, watch, and onUnmounted own in notes/ownership.md.
3. Use the same 5-switch scenario to tabulate React Effect and Vue Hook counterparts.

## Variables to observe

| Variable         | Baseline         | Change             | Expected change / hypothesis                              |
| ---------------- | ---------------- | ------------------ | --------------------------------------------------------- |
| Switching method | Stay on one unit | Switch A/B 5 times | Drafts remain and external loop counts do not accumulate. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Owners of state, derived values, and external work are documented separately.
- [ ] After 5 switches, there is 1 active Canvas.

## Self-check

1. Which watch-calculated values should become computed?
2. Do React cleanup and Vue onUnmounted occur at exactly the same time?

## Official references

- [Vue Composition API Guide](https://vuejs.org/guide/introduction.html)
- [Vue Watchers and cleanup](https://vuejs.org/guide/essentials/watchers.html)
- [Vue Composables and Lifetime Management](https://vuejs.org/guide/reusability/composables.html)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/vue-step-27/example.js) · [Runtime environments and limits](../../../../../examples.md)

This is an experiment with actual Vue reactivity and render functions. Check SFC templates in an external compilation environment.

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Checking Behavior Regressions and Save Races](../26/README.md) · [Next: Canvas Lifecycle](../../03-project/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions
