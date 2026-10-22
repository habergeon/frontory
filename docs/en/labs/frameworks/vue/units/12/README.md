# Vue · 12 watch Sources and Timing

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Component Contracts and Watching · Editable example · Storage ID: `vue-step-12`

## Goals and learning outcomes

- Changing theme does not start a search request.
- After changing query, the request log contains the latest string.

## Prerequisites

Unit 12 builds on the work and experiment records from Unit 11.

## Key concepts and explanations

### Explicit watching

watch runs side effects when specified reactive sources change. computed is more direct when you need the calculated result itself.

### Watch scope

Deeply watching an entire object can react to many changes. Reading only required fields in a getter narrows the watch's intent.

## Practice setup

First check the execution scope guidance on the example screen. The following is the preparation environment for extending the assignment in a separate project. Use .vue SFCs and script setup in a separate Vue Vite project. Record package versions and the lockfile, and run on the development server. The built-in Vue examples use the h function and are not a general-purpose SFC compiler.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. Write watch(() => filters.query, ...) in src/useSearch.js.
2. Display the query change count and request-start log.
3. Change theme, onlyOpen, and query in turn, and record which changes run the watcher.

## Variables to observe

| Variable | Baseline | Change | Expected change / hypothesis |
| --- | --- | --- | --- |
| Watch source | Deep watch of all filters | query getter | Request starts are tied only to search query changes. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Changing theme does not start a search request.
- [ ] After changing query, the request log contains the latest string.

## Self-check

1. How do watchEffect and watch determine dependencies?
2. Which execution timing should you check to measure after a DOM update?

## Official references

- [Vue Composition API Guide](https://vuejs.org/guide/introduction.html)
- [Vue Watchers and cleanup](https://vuejs.org/guide/essentials/watchers.html)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/vue-step-12/example.js) · [Runtime environments and limits](../../../../../examples.md)

This is an experiment with actual Vue reactivity and render functions. Check SFC templates in an external compilation environment.


Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Composing Screens with Slots](../11/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions
