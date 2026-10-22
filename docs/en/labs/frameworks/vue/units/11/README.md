# Vue · 11 Composing Screens with Slots

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Component Contracts and Watching · Editable example · Storage ID: `vue-step-11`

## Goals and learning outcomes

- The two panels' footers display different content.
- The number of filtered results stays the same after changing slots.

## Prerequisites

Unit 11 builds on the work and experiment records from Unit 10.

## Key concepts and explanations

### Slots

Slots place parent-provided content inside a child's layout. Template expressions written by the parent use the parent's scope.

### Scoped slots

Pass child data through slot props when the parent needs to render it. Separate data ownership from presentation responsibility for reuse.

## Practice setup

First check the execution scope guidance on the example screen. The following is the preparation environment for extending the assignment in a separate project. Use .vue SFCs and script setup in a separate Vue Vite project. Record package versions and the lockfile, and run on the development server. The built-in Vue examples use the h function and are not a general-purpose SFC compiler.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. Create header, default, and footer slots in src/Panel.vue.
2. Supply different headers and footers to the list and note panels.
3. Use CardList's item slot so the parent renders the title and completion badge.

## Variables to observe

| Variable | Baseline | Change | Expected change / hypothesis |
| --- | --- | --- | --- |
| item slot | Default title | Title and badge | List calculations stay the same while only the row presentation changes. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] The two panels' footers display different content.
- [ ] The number of filtered results stays the same after changing slots.

## Self-check

1. Can a parent slot access a child's local variables directly?
2. How do you choose between props and slots?

## Official references

- [Vue Composition API Guide](https://vuejs.org/guide/introduction.html)
- [Vue Watchers and cleanup](https://vuejs.org/guide/essentials/watchers.html)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/vue-step-11/example.js) · [Runtime environments and limits](../../../../../examples.md)

This is an experiment with actual Vue reactivity and render functions. Check SFC templates in an external compilation environment.


Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Component v-model](../10/README.md) · [Next: watch Sources and Timing](../12/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions
