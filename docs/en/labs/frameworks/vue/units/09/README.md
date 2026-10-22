# Vue · 09 Communicating Change Intent with emits

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Component Contracts and Watching · Editable example · Storage ID: `vue-step-09`

## Goals and learning outcomes

- 1 click produces 1 toggle event.
- After sorting, only the clicked card changes completion state.

## Prerequisites

Unit 9 builds on the work and experiment records from Unit 8.

## Key concepts and explanations

### Component events

defineEmits declares events that a child can announce. The parent receives them and decides how to change the actual state.

### payload

Pass the target id and necessary values with an event. This makes the contract clearer than passing the entire DOM event object.

## Practice setup

First check the execution scope guidance on the example screen. The following is the preparation environment for extending the assignment in a separate project. Use .vue SFCs and script setup in a separate Vue Vite project. Record package versions and the lockfile, and run on the development server. The built-in Vue examples use the h function and are not a general-purpose SFC compiler.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. Declare a toggle event in src/Card.vue and pass the id.
2. In App.vue's @toggle handler, change only done for that id.
3. Log the events of the three cards and compare the clicked id with the changed id.

## Variables to observe

| Variable | Baseline | Change | Expected change / hypothesis |
| --- | --- | --- | --- |
| payload | Array index | Card id | The same target changes even after sorting. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] 1 click produces 1 toggle event.
- [ ] After sorting, only the clicked card changes completion state.

## Self-check

1. Do component emits automatically propagate to ancestors like DOM events?
2. How is this better than directly editing the parent's array from the child?

## Official references

- [Vue Composition API Guide](https://vuejs.org/guide/introduction.html)
- [Vue Watchers and cleanup](https://vuejs.org/guide/essentials/watchers.html)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/vue-step-09/example.js) · [Runtime environments and limits](../../../../../examples.md)

This is an experiment with actual Vue reactivity and render functions. Check SFC templates in an external compilation environment.


Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: The One-Way Contract of props](../08/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions
