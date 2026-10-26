# TypeScript · 18 Checking Configuration with satisfies

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Validation and Type Transformations · Editable example · Storage ID: `typescript-step-18`

## Goals and learning outcomes

- The invalid key is rejected during compilation.
- Record literal inference for the valid configuration.

## Prerequisites

Work and experiment records from Unit 17, “Editing Models with Utility Types”

## Key concepts and explanations

### Contract Checking

satisfies checks whether a value meets a contract. It preserves the value's inferred information where possible.

### Type Annotations

An explicit type annotation defines the contract visible through a variable. Compare it with as const when preserving literals matters.

## Practice setup

First check the execution scope guidance on the example screen. The following environment is for extending the assignment in a separate project. Implement it yourself in a separate local project and check it with browser developer tools and tsc --noEmit. Record the installed tsc version in a separate TypeScript project. Enable strict in tsconfig.json and check with tsc --noEmit, then open the runtime exercise using compiled output or a local development server. Do not assume the browser executes TS type annotations directly.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. In config.ts, prepare conditions for a valid theme and an invalid property name.
2. Declare theme configuration with a type annotation and with as const satisfies, then compare key and value usage.
3. Run with a valid theme and an invalid property name. Results to check: The invalid key is rejected during compilation. Record literal inference for the valid configuration. Record expected and actual results separately.

## Variables to observe

| Variable          | Baseline   | Change    | Expected change / hypothesis                                                                                                                    |
| ----------------- | ---------- | --------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| Configuration Key | foreground | foregound | Pre-run hypothesis: the contract check will detect the typo. Keep other conditions fixed and record the actual result separately after running. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] The invalid key is rejected during compilation.
- [ ] Record literal inference for the valid configuration.

## Self-check

1. How does satisfies differ from an as assertion?
2. Is the configuration object also frozen at runtime?

## Official references

- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/typescript-step-18/example.js) · [Runtime environments and limits](../../../../../examples.md)

The preview is a JavaScript runtime boundary experiment. It does not run TypeScript diagnostics. Check lesson.ts locally with tsc --strict --noEmit --lib ES2023,DOM.

- [example.js](../../../../../../../src/labs/typescript-step-18/example.js)
- [lesson.ts](../../../../../../../src/labs/typescript-step-18/lesson.ts)

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Editing Models with Utility Types](../17/README.md) · [Next: State Tables with Mapped Types](../19/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions
