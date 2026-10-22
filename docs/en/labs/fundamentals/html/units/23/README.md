# HTML · 23 Script Loading and Document Parsing

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Accessibility Review and Card Integration · External example · preview instructions · Storage ID: `html-step-23`

## Goals and learning outcomes

- Record execution logs and whether the element exists for the three loading methods.
- Choose a configuration that reliably executes dependent scripts in order.

## Prerequisites

The work and experiment records from Unit 22, “template and Repeated Content”.

## Key concepts and explanations

### Loading Time

A classic script may block parsing depending on its position. defer makes scripts execute in order after document parsing.

### Independent Execution

async executes when ready and does not guarantee document order. Also distinguish the default deferred behavior of module scripts.

## Practice setup

First check the execution scope guidance on the example screen. The following environment is for extending the assignment in a separate project. Implement it yourself in a separate local project and check it with browser developer tools. Prepare HTML and any necessary image/media files in a separate folder and open them through a local HTTP server. Check with the Elements and accessibility panels and actual keyboard operation.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. In scripts.html, prepare scripts in head and a target element below in body.
2. Compare two DOM-reading scripts with classic·defer·async loading.
3. Run with scripts in head and a target element below in body. Results to check: Record execution logs and whether the element exists for the three loading methods. Choose a configuration that reliably executes dependent scripts in order. Record expected and actual results separately.

## Variables to observe

| Variable | Baseline | Change | Expected change / hypothesis |
| --- | --- | --- | --- |
| Attribute | defer | async | Pre-run hypothesis: Code that assumes DOM readiness or script ordering may behave differently. Keep other conditions fixed and record the actual result separately after running. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Record execution logs and whether the element exists for the three loading methods.
- [ ] Choose a configuration that reliably executes dependent scripts in order.

## Self-check

1. Does async always make a page faster?
2. What is the relationship between type=module and defer?

## Official references

- [MDN HTML](https://developer.mozilla.org/en-US/docs/Web/HTML)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/html-step-23/example.js) · [Runtime environments and limits](../../../../../examples.md)

External HTTP example: actually loads first.js/second.js and records parsing/execution order for classic/defer/async scripts.

- [index.html](../../../../../../../src/labs/html-step-23/index.html)
- [first.js](../../../../../../../src/labs/html-step-23/first.js)
- [second.js](../../../../../../../src/labs/html-step-23/second.js)
- [README.md](../../../../../../../src/labs/html-step-23/README.md)

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: template and Repeated Content](../22/README.md) · [Next: Accessible Names and Descriptions](../24/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions
