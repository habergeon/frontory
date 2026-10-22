# TypeScript · 16 Passing Failures with Result Types

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Validation and Type Transformations · Editable example · Storage ID: `typescript-step-16`

## Goals and learning outcomes

- The success value is inferred as Note.
- Distinguish the two kinds of failure by code.

## Prerequisites

Work and experiment records from Unit 15, “Type Guards and False Guarantees”

## Key concepts and explanations

### Explicit Results

An ok tag distinguishes success values from errors. Callers narrow the result before accessing the required fields.

### Exception Boundaries

Converting exceptions to Result treats expected failures as values. Classify errors so that programming errors are not hidden unconditionally.

## Practice setup

First check the execution scope guidance on the example screen. The following environment is for extending the assignment in a separate project. Implement it yourself in a separate local project and check it with browser developer tools and tsc --noEmit. Record the installed tsc version in a separate TypeScript project. Enable strict in tsconfig.json and check with tsc --noEmit, then open the runtime exercise using compiled output or a local development server. Do not assume the browser executes TS type annotations directly.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. In result.ts, prepare conditions for two cases: invalid JSON and an invalid structure.
2. Create Result<T,E> and parseNote, and convert error codes to UI messages.
3. Run with two cases: invalid JSON and an invalid structure. Results to check: The success value is inferred as Note. Distinguish the two kinds of failure by code. Record expected and actual results separately.

## Variables to observe

| Variable | Baseline | Change | Expected change / hypothesis |
| --- | --- | --- | --- |
| Error Kind | syntax error | structure error | Pre-run hypothesis: different error codes will be returned. Keep other conditions fixed and record the actual result separately after running. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] The success value is inferred as Note.
- [ ] Distinguish the two kinds of failure by code.

## Self-check

1. When should you use exceptions versus Result?
2. What narrowing is needed before reading error?

## Official references

- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/typescript-step-16/example.js) · [Runtime environments and limits](../../../../../examples.md)

The preview is a JavaScript runtime boundary experiment. It does not run TypeScript diagnostics. Check lesson.ts locally with tsc --strict --noEmit --lib ES2023,DOM.

- [example.js](../../../../../../../src/labs/typescript-step-16/example.js)
- [lesson.ts](../../../../../../../src/labs/typescript-step-16/lesson.ts)

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Type Guards and False Guarantees](../15/README.md) · [Next: Editing Models with Utility Types](../17/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions
