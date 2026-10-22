# TypeScript · 13 Constraints and Minimal Contracts

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Unions and Generics · Editable example · Storage ID: `typescript-step-13`

## Goals and learning outcomes

- Additional field types are preserved for two kinds of objects.
- Record the diagnostic for input without id.

## Prerequisites

Work and experiment records from Unit 12, “Generic Functions and Inference”

## Key concepts and explanations

### Generic Constraints

Use extends to constrain the structure a function needs. The return type can preserve a call's more specific type beyond the constraint.

### Excessive Contracts

Requiring unused fields limits reuse. Constrain only the minimum properties the implementation needs.

## Practice setup

First check the execution scope guidance on the example screen. The following environment is for extending the assignment in a separate project. Implement it yourself in a separate local project and check it with browser developer tools and tsc --noEmit. Record the installed tsc version in a separate TypeScript project. Enable strict in tsconfig.json and check with tsc --noEmit, then open the runtime exercise using compiled output or a local development server. Do not assume the browser executes TS type annotations directly.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. In constraints.ts, prepare conditions for a note object, a user object, and an object without id.
2. Write a function that indexes objects with id while preserving additional field types.
3. Run with a note object, a user object, and an object without id. Results to check: Additional field types are preserved for two kinds of objects. Record the diagnostic for input without id. Record expected and actual results separately.

## Variables to observe

| Variable | Baseline | Change | Expected change / hypothesis |
| --- | --- | --- | --- |
| Input Structure | has id | no id | Pre-run hypothesis: the call will be rejected for violating the constraint. Keep other conditions fixed and record the actual result separately after running. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Additional field types are preserved for two kinds of objects.
- [ ] Record the diagnostic for input without id.

## Self-check

1. What is restricted if the constraint is the entire Note type?
2. Does returning the constraint type itself preserve specific information?

## Official references

- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)
- [TypeScript Generics](https://www.typescriptlang.org/docs/handbook/2/generics.html)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/typescript-step-13/example.js) · [Runtime environments and limits](../../../../../examples.md)

The preview is a JavaScript runtime boundary experiment. It does not run TypeScript diagnostics. Check lesson.ts locally with tsc --strict --noEmit --lib ES2023,DOM.

- [example.js](../../../../../../../src/labs/typescript-step-13/example.js)
- [lesson.ts](../../../../../../../src/labs/typescript-step-13/lesson.ts)

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Generic Functions and Inference](../12/README.md) · [Next: Generics and Boundary Validation](../../02-experiments/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions
