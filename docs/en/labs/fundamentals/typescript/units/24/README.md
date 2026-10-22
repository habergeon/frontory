# TypeScript · 24 Modules and type-only import

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Module Contracts and Plugins · Editable example · Storage ID: `typescript-step-24`

## Goals and learning outcomes

- Record differences in emitted code for type-only import.
- Load the modules in the actual environment and check for errors.

## Prerequisites

Work and experiment records from Unit 23, “Async Functions and Error Types”

## Key concepts and explanations

### Importing Types

import type explicitly marks a type-only use. This distinguishes it from runtime dependencies.

### Execution Environment

module and moduleResolution must match the execution and bundling environment. Changing options alone does not automatically resolve path issues.

## Practice setup

First check the execution scope guidance on the example screen. The following environment is for extending the assignment in a separate project. Implement it yourself in a separate local project and check it with browser developer tools and tsc --noEmit. Record the installed tsc version in a separate TypeScript project. Enable strict in tsconfig.json and check with tsc --noEmit, then open the runtime exercise using compiled output or a local development server. Do not assume the browser executes TS type annotations directly.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. In contracts.ts, prepare conditions for two modules in a browser bundling environment.
2. Export a type and read it with import type in main.ts, then compare emitted output with an actual function import.
3. Run with two modules in a browser bundling environment. Results to check: Record differences in emitted code for type-only import. Load the modules in the actual environment and check for errors. Record expected and actual results separately.

## Variables to observe

| Variable | Baseline | Change | Expected change / hypothesis |
| --- | --- | --- | --- |
| Import Kind | ordinary value import | import type | Pre-run hypothesis: the type-only dependency will be removed from executable code. Keep other conditions fixed and record the actual result separately after running. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Record differences in emitted code for type-only import.
- [ ] Load the modules in the actual environment and check for errors.

## Self-check

1. Can a type-only import be used as a value?
2. Why might module loading fail after successful compilation?

## Official references

- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/typescript-step-24/example.js) · [Runtime environments and limits](../../../../../examples.md)

The preview is a JavaScript runtime boundary experiment. It does not run TypeScript diagnostics. Check lesson.ts locally with tsc --strict --noEmit --lib ES2023,DOM.

- [example.js](../../../../../../../src/labs/typescript-step-24/example.js)
- [lesson.ts](../../../../../../../src/labs/typescript-step-24/lesson.ts)

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Async Functions and Error Types](../23/README.md) · [Next: Declaration Files and External Boundaries](../25/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions
