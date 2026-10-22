# TypeScript · 22 DOM Types and null Checks

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Module Contracts and Plugins · Editable example · Storage ID: `typescript-step-22`

## Goals and learning outcomes

- Record handling results for all three targets.
- Pass tsc checking without non-null assertions.

## Prerequisites

Work and experiment records from Unit 21, “Template Literal Event Names”

## Key concepts and explanations

### DOM Queries

A querySelector result may be absent. Specifying a type argument alone does not validate the actual element kind.

### Runtime Narrowing

Use instanceof HTMLInputElement to identify an input element. EventTarget may need the same check.

## Practice setup

First check the execution scope guidance on the example screen. The following environment is for extending the assignment in a separate project. Implement it yourself in a separate local project and check it with browser developer tools and tsc --noEmit. Record the installed tsc version in a separate TypeScript project. Enable strict in tsconfig.json and check with tsc --noEmit, then open the runtime exercise using compiled output or a local development server. Do not assume the browser executes TS type annotations directly.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. In dom.ts, prepare conditions for an existing input, a selector with no match, and a div target.
2. Query the title input, narrow it with instanceof, then read value and create an error message.
3. Run with an existing input, a selector with no match, and a div target. Results to check: Record handling results for all three targets. Pass tsc checking without non-null assertions. Record expected and actual results separately.

## Variables to observe

| Variable | Baseline | Change | Expected change / hypothesis |
| --- | --- | --- | --- |
| Target | input | div | Pre-run hypothesis: an incorrect element will be rejected before reading value. Keep other conditions fixed and record the actual result separately after running. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Record handling results for all three targets.
- [ ] Pass tsc checking without non-null assertions.

## Self-check

1. Does the querySelector generic check the DOM?
2. Is it safe to immediately assert event.target as an input?

## Official references

- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/typescript-step-22/example.js) · [Runtime environments and limits](../../../../../examples.md)

The preview is a JavaScript runtime boundary experiment. It does not run TypeScript diagnostics. Check lesson.ts locally with tsc --strict --noEmit --lib ES2023,DOM.

- [example.js](../../../../../../../src/labs/typescript-step-22/example.js)
- [lesson.ts](../../../../../../../src/labs/typescript-step-22/lesson.ts)

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Template Literal Event Names](../21/README.md) · [Next: Async Functions and Error Types](../23/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions
