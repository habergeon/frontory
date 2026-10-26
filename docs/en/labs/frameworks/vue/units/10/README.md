# Vue · 10 Component v-model

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Component Contracts and Watching · Editable example · Storage ID: `vue-step-10`

## Goals and learning outcomes

- Input in editor A appears in editor B.
- The parent's draft remains after removing and showing the child again.

## Prerequisites

Unit 10 builds on the work and experiment records from Unit 9.

## Key concepts and explanations

### Model contract

Component v-model combines a passed value and an update event. Implementing modelValue and update:modelValue directly makes ownership visible.

### Draft management

The parent stores drafts that must survive editor removal. The child displays the current value and announces only a new string.

## Practice setup

First check the execution scope guidance on the example screen. The following is the preparation environment for extending the assignment in a separate project. Use .vue SFCs and script setup in a separate Vue Vite project. Record package versions and the lockfile, and run on the development server. The built-in Vue examples use the h function and are not a general-purpose SFC compiler.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. Implement a modelValue prop and update:modelValue emit in src/NoteEditor.vue.
2. Connect the textarea value and input, and use v-model in App.
3. Connect both editors to the same ref and check that input in one appears in the other.

## Variables to observe

| Variable    | Baseline        | Change     | Expected change / hypothesis          |
| ----------- | --------------- | ---------- | ------------------------------------- |
| Draft owner | Child local ref | Parent ref | Both editors display the same string. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Input in editor A appears in editor B.
- [ ] The parent's draft remains after removing and showing the child again.

## Self-check

1. Where does value ownership lie when using defineModel?
2. What mismatch occurs if the default differs from the parent's initial value?

## Official references

- [Vue Composition API Guide](https://vuejs.org/guide/introduction.html)
- [Vue Watchers and cleanup](https://vuejs.org/guide/essentials/watchers.html)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/vue-step-10/example.js) · [Runtime environments and limits](../../../../../examples.md)

This is an experiment with actual Vue reactivity and render functions. Check SFC templates in an external compilation environment.

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Communicating Change Intent with emits](../09/README.md) · [Next: Composing Screens with Slots](../11/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions
