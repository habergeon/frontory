# Vue · 08 The One-Way Contract of props

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Component Contracts and Watching · Editable example · Storage ID: `vue-step-08`

## Goals and learning outcomes

- The child code contains no direct assignment to props.
- The child title matches after the parent title changes.

## Prerequisites

Unit 8 builds on the work and experiment records from Unit 7.

## Key concepts and explanations

### props

props are inputs owned by the parent. Direct edits by the child make ownership and change paths difficult to trace.

### Defaults and validation

Prop types and defaults expose a component's usage conditions. They do not automatically replace all runtime data validation.

## Practice setup

First check the execution scope guidance on the example screen. The following is the preparation environment for extending the assignment in a separate project. Use .vue SFCs and script setup in a separate Vue Vite project. Record package versions and the lockfile, and run on the development server. The built-in Vue examples use the h function and are not a general-purpose SFC compiler.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. Declare id, title, and done with defineProps in src/Card.vue.
2. Connect the child display so that it changes when the parent changes the input.
3. Remove direct mutations inside the child and describe its read-only role in notes/contracts.md.

## Variables to observe

| Variable    | Baseline | Change     | Expected change / hypothesis                         |
| ----------- | -------- | ---------- | ---------------------------------------------------- |
| title input | State    | Reactivity | The parent's change is reflected in the child title. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] The child code contains no direct assignment to props.
- [ ] The child title matches after the parent title changes.

## Self-check

1. Does mutating an object prop internally also affect the parent?
2. If you copy an initial value into a local ref, does it follow later prop changes?

## Official references

- [Vue Composition API Guide](https://vuejs.org/guide/introduction.html)
- [Vue Watchers and cleanup](https://vuejs.org/guide/essentials/watchers.html)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/vue-step-08/example.js) · [Runtime environments and limits](../../../../../examples.md)

This is an experiment with actual Vue reactivity and render functions. Check SFC templates in an external compilation environment.

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Expressing State with Classes and Styles](../07/README.md) · [Next: Communicating Change Intent with emits](../09/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions
