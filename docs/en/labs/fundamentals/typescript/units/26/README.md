# TypeScript · 26 Cases That Verify Compilation Failures

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Module Contracts and Plugins · Editable example · Storage ID: `typescript-step-26`

## Goals and learning outcomes

- The 3 valid cases compile.
- Document reasons for the 3 rejected cases in comments and verify them with expected errors.

## Prerequisites

Work and experiment records from Unit 25, “Declaration Files and External Boundaries”

## Key concepts and explanations

### Expected Failures

@ts-expect-error expects an error on the next line. If the error disappears, an unused-directive diagnostic signals a contract change.

### Checking Both Directions

Check valid and rejected cases together. Ignoring all errors can hide a weakened contract.

## Practice setup

First check the execution scope guidance on the example screen. The following environment is for extending the assignment in a separate project. Implement it yourself in a separate local project and check it with browser developer tools and tsc --noEmit. Record the installed tsc version in a separate TypeScript project. Enable strict in tsconfig.json and check with tsc --noEmit, then open the runtime exercise using compiled output or a local development server. Do not assume the browser executes TS type annotations directly.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. In contracts.test.ts, prepare conditions for 3 valid cases and 3 rejected cases.
2. Add expected errors for invalid states·payloads·plugins and write valid calls alongside them.
3. Run with 3 valid cases and 3 rejected cases. Results to check: The 3 valid cases compile. Document reasons for the 3 rejected cases in comments and verify them with expected errors. Record expected and actual results separately.

## Variables to observe

| Variable | Baseline     | Change        | Expected change / hypothesis                                                                                                                                   |
| -------- | ------------ | ------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Contract | strict types | weaken to any | Pre-run hypothesis: expected errors will disappear and the check will fail. Keep other conditions fixed and record the actual result separately after running. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] The 3 valid cases compile.
- [ ] Document reasons for the 3 rejected cases in comments and verify them with expected errors.

## Self-check

1. How do ts-ignore and expect-error differ?
2. Do type tests alone guarantee actual behavior?

## Official references

- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/typescript-step-26/example.js) · [Runtime environments and limits](../../../../../examples.md)

The preview is a JavaScript runtime boundary experiment. It does not run TypeScript diagnostics. Check lesson.ts locally with tsc --strict --noEmit --lib ES2023,DOM.

- [example.js](../../../../../../../src/labs/typescript-step-26/example.js)
- [lesson.ts](../../../../../../../src/labs/typescript-step-26/lesson.ts)

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Declaration Files and External Boundaries](../25/README.md) · [Next: Plugin Ownership and Cleanup Contracts](../27/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions
