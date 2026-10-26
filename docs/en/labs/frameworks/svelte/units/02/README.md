# Svelte · 02 Markup and Event Attributes

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Compilation and Runes Basics · External example · preview instructions · Storage ID: `svelte-step-02`

## Goals and learning outcomes

- The initial click count is 0.
- It displays 1 after one click.

## Prerequisites

Unit 2 continues with the work and experiment records from Unit 1.

## Key concepts and explanations

### Expressions

Brace expressions connect state to the screen. Rendering an HTML string and displaying text differ in security and meaning.

### Event Attributes

Pass a function to onclick to handle user input. Distinguish a function reference from a function call so that you do not pass the result of a call.

## Practice setup

First check the execution scope guidance on the example screen. The following environment is for extending the assignment in a separate project. Compile and run .svelte files in a separate Svelte 5 Vite project. Record package versions and the lockfile. Frontory’s Svelte preview uses actual writable stores and an explicit DOM adapter; it is not a .svelte compiler or a runes runner.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. In src/Card.svelte, create a title expression and an onclick button.
2. Set the title to the string '<b>메모</b>' and display it as text.
3. Count clicks with $state and compare the output after loading alone with the output after clicking.

## Variables to observe

| Variable | Baseline    | Change              | Expected change / hypothesis                            |
| -------- | ----------- | ------------------- | ------------------------------------------------------- |
| Title    | Plain title | HTML-looking string | The string appears as written without executing markup. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] The initial click count is 0.
- [ ] It displays 1 after one click.

## Self-check

1. What validation responsibility comes with using {@html}?
2. What is the difference between onclick={handler()} and onclick={handler}?

## Official references

- [Svelte Official Documentation and Runes Index](https://svelte.dev/docs/svelte/overview)
- [Svelte $effect and Cleanup](https://svelte.dev/docs/svelte/$effect)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/svelte-step-02/example.js) · [Runtime environments and limits](../../../../../examples.md)

The preview is a Svelte writable/DOM contract experiment. To run runes, snippets, and compiled output, run the actual App.svelte in a Svelte 5 project.

- [App.svelte](../../../../../../../src/labs/svelte-step-02/App.svelte)

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Compilation and Reactivity](../../01-foundations/README.md) · [Next: Update Paths in $state Objects](../03/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions
