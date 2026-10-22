# JavaScript · 11 Creating DOM Nodes and Inserting Text

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: DOM and asynchronous operations · Editable example · Storage ID: `javascript-step-11`

## Goals and learning outcomes

- There are 3 li elements corresponding to 3 notes.
- The tag input does not create a strong element.

## Prerequisites

The work and experiment records from Unit 10, “Exceptions and Recovery Paths”

## Key concepts and explanations

### Creating Nodes

The result of createElement becomes visible when it is attached to the document. DocumentFragment lets you group multiple nodes for insertion.

### Handling Text

textContent treats a string as text. Inserting user input with innerHTML can cause it to be interpreted as markup.

## Practice setup

First check the execution scope guidance on the example screen. The following environment is for extending the assignment in a separate project. Implement it yourself in a separate local project and check it with browser developer tools. In a separate folder, connect your practice JS from index.html using script type="module" and open it through a local HTTP server. Use the Console, Network, and Elements panels.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. In render.js, prepare 3 notes and the title <strong>실험</strong>.
2. Create li elements, set their titles with textContent, and attach the fragment to the ul.
3. Run with 3 notes and the title <strong>실험</strong>. Results to check: There are 3 li elements corresponding to 3 notes. The tag input does not create a strong element. Record expected and actual results separately.

## Variables to observe

| Variable | Baseline | Change | Expected change / hypothesis |
| --- | --- | --- | --- |
| Title | Plain text | A string shaped like a tag | Hypothesis before running: The tag itself will appear as text. Keep the other conditions fixed and record the actual result separately after running. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] There are 3 li elements corresponding to 3 notes.
- [ ] The tag input does not create a strong element.

## Self-check

1. What separate contract is needed when formatting is required?
2. How should existing nodes be handled when rendering again?

## Official references

- [MDN JavaScript Guide](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/javascript-step-11/example.js) · [Runtime environments and limits](../../../../../examples.md)

Compare the editable inputs with actual browser execution results.


Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Exceptions and Recovery Paths](../10/README.md) · [Next: Event Propagation and Delegation](../12/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions
