# TypeScript · 12 Generic Functions and Inference

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Unions and Generics · Editable example · Storage ID: `typescript-step-12`

## Goals and learning outcomes

- Preserve the returned element types of both arrays.
- Check for undefined where the empty array result is used.

## Prerequisites

Work and experiment records from Unit 11, “keyof and Property Lookup Functions”

## Key concepts and explanations

### Type Relationships

Generics express input-output relationships for each call. This differs from replacing every value with any.

### Empty Input

Include undefined in the return contract when there may be no first element. A type parameter alone cannot guarantee array length.

## Practice setup

First check the execution scope guidance on the example screen. The following environment is for extending the assignment in a separate project. Implement it yourself in a separate local project and check it with browser developer tools and tsc --noEmit. Record the installed tsc version in a separate TypeScript project. Enable strict in tsconfig.json and check with tsc --noEmit, then open the runtime exercise using compiled output or a local development server. Do not assume the browser executes TS type annotations directly.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. In generic.ts, prepare conditions for string arrays, number arrays, and an empty array.
2. Write first and mapValues, and call them with string and number arrays.
3. Run with string arrays, number arrays, and an empty array. Results to check: Preserve the returned element types of both arrays. Check for undefined where the empty array result is used. Record expected and actual results separately.

## Variables to observe

| Variable | Baseline | Change | Expected change / hypothesis |
| --- | --- | --- | --- |
| Input Length | 2 | 0 | Pre-run hypothesis: first will need to handle the undefined path. Keep other conditions fixed and record the actual result separately after running. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Preserve the returned element types of both arrays.
- [ ] Check for undefined where the empty array result is used.

## Self-check

1. How do generics differ from union parameters?
2. When are explicit type arguments needed?

## Official references

- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)
- [TypeScript Generics](https://www.typescriptlang.org/docs/handbook/2/generics.html)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/typescript-step-12/example.js) · [Runtime environments and limits](../../../../../examples.md)

The preview is a JavaScript runtime boundary experiment. It does not run TypeScript diagnostics. Check lesson.ts locally with tsc --strict --noEmit --lib ES2023,DOM.

- [example.js](../../../../../../../src/labs/typescript-step-12/example.js)
- [lesson.ts](../../../../../../../src/labs/typescript-step-12/lesson.ts)

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: keyof and Property Lookup Functions](../11/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions
