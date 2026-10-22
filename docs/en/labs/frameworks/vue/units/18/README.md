# Vue · 18 Shared Store Scope

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Composables and Store Lifetimes · Editable example · Storage ID: `vue-step-18`

## Goals and learning outcomes

- The two workspaces preserve different strings.
- reset clears only the specified workspace.

## Prerequisites

Unit 18 builds on the work and experiment records from Unit 17.

## Key concepts and explanations

### Shared reactivity

A module-scope reactive lets multiple components read the same object. Its lifetime differs from a per-component initialization function.

### Initialization boundary

Tests or multiple app instances sharing the same module state can mix data. A store factory can make the scope explicit.

## Practice setup

First check the execution scope guidance on the example screen. The following is the preparation environment for extending the assignment in a separate project. Use .vue SFCs and script setup in a separate Vue Vite project. Record package versions and the lockfile, and run on the development server. The built-in Vue examples use the h function and are not a general-purpose SFC compiler.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. In src/createNotesStore.js, write a function returning drafts, update, and reset.
2. Create and provide a store for each Workspace.
3. Enter different strings for the same unit id in two different Workspaces.

## Variables to observe

| Variable | Baseline | Change | Expected change / hypothesis |
| --- | --- | --- | --- |
| Store creation | One module instance | Factory per Workspace | Drafts remain separate between the two workspaces even for the same id. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] The two workspaces preserve different strings.
- [ ] reset clears only the specified workspace.

## Self-check

1. Why does moving all state to globals make testing difficult?
2. How do you separate shared values from per-instance values?

## Official references

- [Vue Composition API Guide](https://vuejs.org/guide/introduction.html)
- [Vue Watchers and cleanup](https://vuejs.org/guide/essentials/watchers.html)
- [Vue Composables and Lifetime Management](https://vuejs.org/guide/reusability/composables.html)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/vue-step-18/example.js) · [Runtime environments and limits](../../../../../examples.md)

This is an experiment with actual Vue reactivity and render functions. Check SFC templates in an external compilation environment.


Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: provide and inject](../17/README.md) · [Next: Restoring Saved Data and Validation](../19/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions
