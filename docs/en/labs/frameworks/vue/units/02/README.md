# Vue · 02 SFCs and Template Binding

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Reactive Data and Templates · Editable example · Storage ID: `vue-step-02`

## Goals and learning outcomes

- The button can be clicked with a false binding.
- The button is disabled with a true binding.

## Prerequisites

Unit 2 builds on the work and experiment records from Unit 1.

## Key concepts and explanations

### SFC

A .vue file compiles its template, logic, and styles into one component. Distinguish runtime h function examples from SFCs that require a build.

### Binding

v-bind passes an expression result to an attribute. String attributes and dynamic boolean attributes have different meanings in the browser.

## Practice setup

First check the execution scope guidance on the example screen. The following is the preparation environment for extending the assignment in a separate project. Use .vue SFCs and script setup in a separate Vue Vite project. Record package versions and the lockfile, and run on the development server. The built-in Vue examples use the h function and are not a general-purpose SFC compiler.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. Write script setup and template in src/Card.vue.
2. Bind :disabled and :aria-pressed to the completion state.
3. Compare a fixed disabled string with a boolean binding and record the DOM attributes.

## Variables to observe

| Variable       | Baseline | Change | Expected change / hypothesis                         |
| -------------- | -------- | ------ | ---------------------------------------------------- |
| disabled value | false    | true   | Whether the button can actually be operated changes. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] The button can be clicked with a false binding.
- [ ] The button is disabled with a true binding.

## Self-check

1. Why can disabled='false' disable a button?
2. Why does an SFC file fail to run in a general JS runner?

## Official references

- [Vue Reactivity Fundamentals](https://vuejs.org/guide/essentials/reactivity-fundamentals.html)
- [Vue Composition API Guide](https://vuejs.org/guide/introduction.html)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/vue-step-02/example.js) · [Runtime environments and limits](../../../../../examples.md)

This is an experiment with actual Vue reactivity and render functions. Check SFC templates in an external compilation environment.

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Reactivity and Templates](../../01-foundations/README.md) · [Next: reactive and Preserving References](../03/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions
