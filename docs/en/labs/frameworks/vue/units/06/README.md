# Vue · 06 Events and Input Conversion

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Reactive Data and Templates · Editable example · Storage ID: `vue-step-06`

## Goals and learning outcomes

- Submitting once with Enter adds 1 card.
- The rule for empty count input matches the actual result.

## Prerequisites

Unit 6 builds on the work and experiment records from Unit 5.

## Key concepts and explanations

### Events

v-on connects template events to functions. Distinguish the event object from explicitly passed arguments to clarify the intended change.

### Input model

v-model expresses the connection between an input value and state concisely. Numeric input and an empty string are separate boundary cases, so check the conversion result.

## Practice setup

First check the execution scope guidance on the example screen. The following is the preparation environment for extending the assignment in a separate project. Use .vue SFCs and script setup in a separate Vue Vite project. Record package versions and the lockfile, and run on the development server. The built-in Vue examples use the h function and are not a general-purpose SFC compiler.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. In src/CardForm.vue, create a title v-model and a target count v-model.number.
2. Reject blank titles and add a new card in form @submit.prevent.
3. Submit a count of 3, an empty input, and a Korean title, and record the stored values and types.

## Variables to observe

| Variable | Baseline | Change | Expected change / hypothesis |
| --- | --- | --- | --- |
| Count input | 3 | Empty string | Validate empty input without unconditionally assuming it is the number 0. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Submitting once with Enter adds 1 card.
- [ ] The rule for empty count input matches the actual result.

## Self-check

1. Does .prevent also stop event propagation?
2. Does the number modifier alone complete range validation?

## Official references

- [Vue Reactivity Fundamentals](https://vuejs.org/guide/essentials/reactivity-fundamentals.html)
- [Vue Composition API Guide](https://vuejs.org/guide/introduction.html)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/vue-step-06/example.js) · [Runtime environments and limits](../../../../../examples.md)

This is an experiment with actual Vue reactivity and render functions. Check SFC templates in an external compilation environment.


Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: List Keys and Conditional Lifetimes](../05/README.md) · [Next: Expressing State with Classes and Styles](../07/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions
