# Vue · 04 Pure Computation with computed

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Reactive Data and Templates · Editable example · Storage ID: `vue-step-04`

## Goals and learning outcomes

- The displayed card titles match the search query.
- Changing only theme leaves the original items unchanged.

## Prerequisites

Unit 4 builds on the work and experiment records from Unit 3.

## Key concepts and explanations

### Derived computation

A computed getter updates its calculated result when dependencies change. Do not save data or mutate the source inside the getter.

### Caching

The calculated result is reused while reactive dependencies remain unchanged. Distinguish it from an ordinary function call when judging cost and meaning.

## Practice setup

First check the execution scope guidance on the example screen. The following is the preparation environment for extending the assignment in a separate project. Use .vue SFCs and script setup in a separate Vue Vite project. Record package versions and the lockfile, and run on the development server. The built-in Vue examples use the h function and are not a general-purpose SFC compiler.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. In src/App.vue, write a filteredCards computed that reads query and items.
2. Log the evaluation count and change an unrelated theme ref.
3. After changing query, record how the results and evaluation logs differ.

## Variables to observe

| Variable      | Baseline | Change | Expected change / hypothesis                                   |
| ------------- | -------- | ------ | -------------------------------------------------------------- |
| Change target | theme    | query  | Changing query updates a dependency of the filter computation. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] The displayed card titles match the search query.
- [ ] Changing only theme leaves the original items unchanged.

## Self-check

1. Does a computed that reads only Date.now update itself?
2. What changes if you call items.sort inside the getter?

## Official references

- [Vue Reactivity Fundamentals](https://vuejs.org/guide/essentials/reactivity-fundamentals.html)
- [Vue Composition API Guide](https://vuejs.org/guide/introduction.html)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/vue-step-04/example.js) · [Runtime environments and limits](../../../../../examples.md)

This is an experiment with actual Vue reactivity and render functions. Check SFC templates in an external compilation environment.

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: reactive and Preserving References](../03/README.md) · [Next: List Keys and Conditional Lifetimes](../05/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions
