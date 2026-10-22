# TypeScript · 19 State Tables with Mapped Types

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Validation and Type Transformations · Editable example · Storage ID: `typescript-step-19`

## Goals and learning outcomes

- Every configuration key has a corresponding message.
- Record the missing-new-key diagnostic and the corrected result.

## Prerequisites

Work and experiment records from Unit 18, “Checking Configuration with satisfies”

## Key concepts and explanations

### Iterating Keys

A Mapped Type maps each member of a key union to a type. It does not generate a runtime loop.

### Modifiers

You can add or remove readonly and optional modifiers. Check that the derived contract matches actual usage policy.

## Practice setup

First check the execution scope guidance on the example screen. The following environment is for extending the assignment in a separate project. Implement it yourself in a separate local project and check it with browser developer tools and tsc --noEmit. Record the installed tsc version in a separate TypeScript project. Enable strict in tsconfig.json and check with tsc --noEmit, then open the runtime exercise using compiled output or a local development server. Do not assume the browser executes TS type annotations directly.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. In mapped.ts, prepare conditions for a configuration with 3 keys and the addition of 1 new key.
2. Write an error-message map for configuration keys and a read-only configuration type.
3. Run with a configuration with 3 keys and the addition of 1 new key. Results to check: Every configuration key has a corresponding message. Record the missing-new-key diagnostic and the corrected result. Record expected and actual results separately.

## Variables to observe

| Variable | Baseline | Change | Expected change / hypothesis |
| --- | --- | --- | --- |
| Configuration Key Count | 3 keys | 4 keys | Pre-run hypothesis: a missing required map entry will be revealed. Keep other conditions fixed and record the actual result separately after running. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Every configuration key has a corresponding message.
- [ ] Record the missing-new-key diagnostic and the corrected result.

## Self-check

1. Does a Mapped Type create an actual object?
2. Can an optional map detect missing entries?

## Official references

- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)
- [TypeScript Mapped Types](https://www.typescriptlang.org/docs/handbook/2/mapped-types.html)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/typescript-step-19/example.js) · [Runtime environments and limits](../../../../../examples.md)

The preview is a JavaScript runtime boundary experiment. It does not run TypeScript diagnostics. Check lesson.ts locally with tsc --strict --noEmit --lib ES2023,DOM.

- [example.js](../../../../../../../src/labs/typescript-step-19/example.js)
- [lesson.ts](../../../../../../../src/labs/typescript-step-19/lesson.ts)

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Checking Configuration with satisfies](../18/README.md) · [Next: Conditional Types and Distribution](../20/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions
