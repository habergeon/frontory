# Vue · 17 provide and inject

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Composables and Store Lifetimes · Editable example · Storage ID: `vue-step-17`

## Goals and learning outcomes

- Selections in the two Workspaces do not mix.
- Consumers change selection with the select function, without direct assignment.

## Prerequisites

Unit 17 builds on the work and experiment records from Unit 16.

## Key concepts and explanations

### Passing dependencies

provide passes a value to a descendant tree. inject reads from the nearest provider, reducing intermediate prop passing.

### Mutation location

Passing a reactive value still requires a separate decision about mutation responsibility. Providing a readonly value with a mutation function exposes the boundary.

## Practice setup

First check the execution scope guidance on the example screen. The following is the preparation environment for extending the assignment in a separate project. Use .vue SFCs and script setup in a separate Vue Vite project. Record package versions and the lockfile, and run on the development server. The built-in Vue examples use the h function and are not a general-purpose SFC compiler.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. In src/Workspace.vue, provide a readonly selection ref and select function with a Symbol key.
2. Use inject in Detail.vue three levels down to display the title.
3. Add a nested Workspace and check that each tree's selection is independent.

## Variables to observe

| Variable | Baseline | Change | Expected change / hypothesis |
| --- | --- | --- | --- |
| Provider placement | One shared provider | Two nested providers | Inner consumers read the selection from the nearest provider. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Selections in the two Workspaces do not mix.
- [ ] Consumers change selection with the select function, without direct assignment.

## Self-check

1. How do you handle an injection with neither a default nor a provider?
2. Why use a Symbol instead of a string key?

## Official references

- [Vue Composition API Guide](https://vuejs.org/guide/introduction.html)
- [Vue Watchers and cleanup](https://vuejs.org/guide/essentials/watchers.html)
- [Vue Composables and Lifetime Management](https://vuejs.org/guide/reusability/composables.html)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/vue-step-17/example.js) · [Runtime environments and limits](../../../../../examples.md)

This is an experiment with actual Vue reactivity and render functions. Check SFC templates in an external compilation environment.


Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Composable Lifetimes](../16/README.md) · [Next: Shared Store Scope](../18/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions
