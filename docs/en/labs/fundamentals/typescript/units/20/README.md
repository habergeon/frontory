# TypeScript · 20 Conditional Types and Distribution

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Validation and Type Transformations · Editable example · Storage ID: `typescript-step-20`

## Goals and learning outcomes

- Record example result types for the three inputs.
- Compare accepted and rejected assignments with and without distribution.

## Prerequisites

Work and experiment records from Unit 19, “State Tables with Mapped Types”

## Key concepts and explanations

### Type Conditions

Conditional types select a result based on type relationships. They operate separately from runtime if statements.

### Union Distribution

A condition on a naked type parameter may apply to each union member. Wrapping it in a tuple controls distribution.

## Practice setup

First check the execution scope guidance on the example screen. The following environment is for extending the assignment in a separate project. Implement it yourself in a separate local project and check it with browser developer tools and tsc --noEmit. Record the installed tsc version in a separate TypeScript project. Enable strict in tsconfig.json and check with tsc --noEmit, then open the runtime exercise using compiled output or a local development server. Do not assume the browser executes TS type annotations directly.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. In conditional.ts, prepare conditions for a string array, a number, and a union of the two types.
2. Create array-element extraction and distributive and non-distributive helper types, and check results through assignment.
3. Run with a string array, a number, and a union of the two types. Results to check: Record example result types for the three inputs. Compare accepted and rejected assignments with and without distribution. Record expected and actual results separately.

## Variables to observe

| Variable | Baseline | Change | Expected change / hypothesis |
| --- | --- | --- | --- |
| Condition Form | T extends condition | tuple-wrapped condition | Pre-run hypothesis: the result of testing the union as a whole may differ. Keep other conditions fixed and record the actual result separately after running. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Record example result types for the three inputs.
- [ ] Compare accepted and rejected assignments with and without distribution.

## Self-check

1. Do conditional types reduce execution time?
2. When is distribution unwanted?

## Official references

- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)
- [TypeScript Conditional Types](https://www.typescriptlang.org/docs/handbook/2/conditional-types.html)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/typescript-step-20/example.js) · [Runtime environments and limits](../../../../../examples.md)

The preview is a JavaScript runtime boundary experiment. It does not run TypeScript diagnostics. Check lesson.ts locally with tsc --strict --noEmit --lib ES2023,DOM.

- [example.js](../../../../../../../src/labs/typescript-step-20/example.js)
- [lesson.ts](../../../../../../../src/labs/typescript-step-20/lesson.ts)

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: State Tables with Mapped Types](../19/README.md) · [Next: Template Literal Event Names](../21/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions
