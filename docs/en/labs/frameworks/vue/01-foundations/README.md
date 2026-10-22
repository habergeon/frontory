# Vue · 01 Reactivity and Templates

[Series contents](../README.md) · [Technology map](../../../README.md)

Stage: Reactive Data and Templates · Editable example · Storage ID: `vue-01`

## Goals and learning outcomes

- The completed count increases by 1 per toggle.
- The original 3 cards remain after removing the filter.

## Prerequisites

JavaScript objects, arrays, and functions; HTML forms; running an npm project.

## Key concepts and explanations

### ref

ref wraps a reactive value, which you read and write with .value in scripts. Templates automatically unwrap top-level refs for display.

### computed

computed calculates a result from the reactive values it reads. Do not copy values derivable from the source, such as the completed count, into another ref.

## Practice setup

Use .vue SFCs and script setup in a separate Vue Vite project. Record package versions and the lockfile, and run on the development server. The built-in Vue examples use the h function and are not a general-purpose SFC compiler. The existing vue-01 preview is a starting point. Implement the extended deliverables described here in a separate project.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. In script setup in src/App.vue of an external Vue Vite project, create a ref containing 3 cards.
2. Use computed to derive the completed count and incomplete list, and display them in the template.
3. Connect the completion button and record how the list and total change together in notes/day01.md.

## Variables to observe

| Variable | Baseline | Change | Expected change / hypothesis |
| --- | --- | --- | --- |
| Completed cards | 0 cards | 1 card | The completed count is 1 and the incomplete list contains 2 cards. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] The completed count increases by 1 per toggle.
- [ ] The original 3 cards remain after removing the filter.

## Self-check

1. Why does ref access differ between scripts and templates?
2. What cost does copying the completed count with watch introduce?

## Official references

- [Vue Reactivity Fundamentals](https://vuejs.org/guide/essentials/reactivity-fundamentals.html)
- [Vue Composition API Guide](https://vuejs.org/guide/introduction.html)

## Linked example and execution scope

[Example source](../../../../../../src/labs/vue-01/example.js) · [Runtime environments and limits](../../../../examples.md)

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Next: SFCs and Template Binding](../units/02/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions
