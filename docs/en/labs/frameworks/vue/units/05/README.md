# Vue · 05 List Keys and Conditional Lifetimes

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Reactive Data and Templates · Editable example · Storage ID: `vue-step-05`

## Goals and learning outcomes

- Notes stay with the same card after sorting with an id key.
- Record note preservation results for each hiding method.

## Prerequisites

Unit 5 builds on the work and experiment records from Unit 4.

## Key concepts and explanations

### List identity

The key in v-for identifies each item. Index keys can obscure the connection between input state and data after reordering.

### Conditional display

v-if creates or removes components. v-show retains the DOM and changes its display style.

## Practice setup

First check the execution scope guidance on the example screen. The following is the preparation environment for extending the assignment in a separate project. Use .vue SFCs and script setup in a separate Vue Vite project. Record package versions and the lockfile, and run on the development server. The built-in Vue examples use the h function and are not a general-purpose SFC compiler.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. Add a local input to src/CardRow.vue and create a list with id keys.
2. Enter a note in the first row, then reverse the card array.
3. Hide the list with v-if and v-show separately, and compare whether local notes remain.

## Variables to observe

| Variable | Baseline | Change | Expected change / hypothesis |
| --- | --- | --- | --- |
| Hiding method | v-show | v-if | After removal through v-if, the local note takes the initial value of a new instance. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Notes stay with the same card after sorting with an id key.
- [ ] Record note preservation results for each hiding method.

## Self-check

1. Does a timer hidden through v-show keep running?
2. What happens on a title edit if the title is used as the key?

## Official references

- [Vue Reactivity Fundamentals](https://vuejs.org/guide/essentials/reactivity-fundamentals.html)
- [Vue Composition API Guide](https://vuejs.org/guide/introduction.html)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/vue-step-05/example.js) · [Runtime environments and limits](../../../../../examples.md)

This is an experiment with actual Vue reactivity and render functions. Check SFC templates in an external compilation environment.


Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Pure Computation with computed](../04/README.md) · [Next: Events and Input Conversion](../06/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions
