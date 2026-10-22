# Vue · 07 Expressing State with Classes and Styles

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Reactive Data and Templates · Editable example · Storage ID: `vue-step-07`

## Goals and learning outcomes

- Completion text and aria-pressed agree across all four combinations.
- Changing the selection style does not affect other cards.

## Prerequisites

Unit 7 builds on the work and experiment records from Unit 6.

## Key concepts and explanations

### Declarative styles

class and style bindings calculate presentation from state. Directly editing DOM classes can conflict with the next render result.

### Conveying meaning

Using color alone to indicate completion can lose meaning. Derive text and aria attributes from the same state as well.

## Practice setup

First check the execution scope guidance on the example screen. The following is the preparation environment for extending the assignment in a separate project. Use .vue SFCs and script setup in a separate Vue Vite project. Record package versions and the lockfile, and run on the development server. The built-in Vue examples use the h function and are not a general-purpose SFC compiler.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. In src/Card.vue, pass done and selected conditions to :class.
2. Connect completion text and aria-pressed, and distinguish the two states with scoped CSS.
3. Create the four completion and selection combinations, and record screenshots and DOM values.

## Variables to observe

| Variable | Baseline | Change | Expected change / hypothesis |
| --- | --- | --- | --- |
| State combination | done false·selected false | done true·selected true | Both states are expressed separately without conflict. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Completion text and aria-pressed agree across all four combinations.
- [ ] Changing the selection style does not affect other cards.

## Self-check

1. Does scoped CSS completely block global styles?
2. Who determines the final value when direct class edits and bindings are mixed?

## Official references

- [Vue Reactivity Fundamentals](https://vuejs.org/guide/essentials/reactivity-fundamentals.html)
- [Vue Composition API Guide](https://vuejs.org/guide/introduction.html)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/vue-step-07/example.js) · [Runtime environments and limits](../../../../../examples.md)

This is an experiment with actual Vue reactivity and render functions. Check SFC templates in an external compilation environment.


Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Events and Input Conversion](../06/README.md) · [Next: The One-Way Contract of props](../08/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions
