# TypeScript · 15 Type Guards and False Guarantees

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Validation and Type Transformations · Editable example · Storage ID: `typescript-step-15`

## Goals and learning outcomes

- Create a results table in which only the 1 valid input passes.
- Compare the runtime failure of a false guard with the corrected result.

## Prerequisites

Work and experiment records from Unit 14, “Generics and Boundary Validation”

## Key concepts and explanations

### User-Defined Guards

The is syntax narrows a type after a check succeeds. The compiler does not prove that the guard implementation is sufficient.

### Validation Evidence

Check a guard's contract with failing inputs for each field. Do not judge safety from a single valid case.

## Practice setup

First check the execution scope guidance on the example screen. The following environment is for extending the assignment in a separate project. Implement it yourself in a separate local project and check it with browser developer tools and tsc --noEmit. Record the installed tsc version in a separate TypeScript project. Enable strict in tsconfig.json and check with tsc --noEmit, then open the runtime exercise using compiled output or a local development server. Do not assume the browser executes TS type annotations directly.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. In guards.ts, prepare conditions for 1 valid input and 4 counterexamples.
2. Implement isNote and test an array of counterexamples such as a missing id, a numeric title, and null.
3. Run with 1 valid input and 4 counterexamples. Results to check: Create a results table in which only the 1 valid input passes. Compare the runtime failure of a false guard with the corrected result. Record expected and actual results separately.

## Variables to observe

| Variable | Baseline    | Change       | Expected change / hypothesis                                                                                                             |
| -------- | ----------- | ------------ | ---------------------------------------------------------------------------------------------------------------------------------------- |
| Guard    | always true | field checks | Pre-run hypothesis: counterexamples will be rejected. Keep other conditions fixed and record the actual result separately after running. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Create a results table in which only the 1 valid input passes.
- [ ] Compare the runtime failure of a false guard with the corrected result.

## Self-check

1. Is a type predicate a proof?
2. How do you decide whether inherited properties are allowed?

## Official references

- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/typescript-step-15/example.js) · [Runtime environments and limits](../../../../../examples.md)

The preview is a JavaScript runtime boundary experiment. It does not run TypeScript diagnostics. Check lesson.ts locally with tsc --strict --noEmit --lib ES2023,DOM.

- [example.js](../../../../../../../src/labs/typescript-step-15/example.js)
- [lesson.ts](../../../../../../../src/labs/typescript-step-15/lesson.ts)

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Generics and Boundary Validation](../../02-experiments/README.md) · [Next: Passing Failures with Result Types](../16/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions
