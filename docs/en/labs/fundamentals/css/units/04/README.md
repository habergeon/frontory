# CSS · 04 The box model and measured dimensions

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Cascade and size calculations · Editable example · Storage ID: `css-step-04`

## Goals and learning outcomes

- Record the actual widths of both cards.
- Distinguish the content, padding, border, and margin regions in the tools.

## Prerequisites

The output and experiment log from Unit 3, “Inheritance and initialization”

## Key concepts and explanations

### Adding dimensions

With content-box, width: 200px specifies the content area’s width. padding: 20px adds 20px on each side, and border: 2px adds 2px on each side, so the width through the border is 200 + 20 × 2 + 2 × 2 = 244px. Counting padding 20 as a total of 20 gives the incorrect answer 224px. The default card in this lesson has no margin or transform and uses normal block layout, so this formula applies to the comparison.

### What the specified width includes

With border-box, the content, padding, and border fit within the specified width of 200px. Keeping the same padding and border gives a content width of 200 - 20 × 2 - 2 × 2 = 156px. The outer border width is 200px, and the smaller content area may change text wrapping. In both models, margin is spacing outside width and is not included in this 200px.

### Calculated and measured values

getBoundingClientRect().width returns the width of the element’s border box as drawn on screen, excluding margin. The example’s inspection output nodes[].width rounds this value with Math.round. To investigate small fractional differences, inspect the original return value in developer tools. Adding transform: scale() also affects this measurement, so leave out transform for the initial comparison.

### Container and viewport

The example’s width slider changes only the width of the container holding the cards. The inspection output’s containerWidth and viewportWidth are different values. Keep the container conditions the same when comparing fixed-width cards. @media width conditions are evaluated against the viewport of the preview iframe document containing the Shadow DOM. Do not assume this equals the width of the main app window or the card container. Testing media queries by moving only the slider can lead to incorrect conclusions. For viewport experiments, change the browser window width or the device-mode width in developer tools, then verify that the output’s viewportWidth actually changed.

### Small widths and overflow

Even border-box does not fit all content into a specified width. If the combined left and right padding and borders exceed width, the content width cannot shrink below 0. Under these conditions, the actual border box may exceed the specified width. Long words, min-width, and Flex or Grid sizing constraints can be separate causes, so investigate them separately from the basic box calculation experiment.

### Inspecting the preview

HTML and CSS input affect the cards only after you click Apply. Inspect current DOM / styles outputs the current card dimensions and computed styles again. The example creates cards inside a Shadow DOM and maps body, html, and :root selectors to .doc. This differs from styling the outer page or directly looking up document.querySelector(".card"), so select the actual element inside shadow-root in developer tools.

### Two cards to copy and compare

Enter the following contents in the lesson example’s HTML source and CSS source, respectively, then click Apply. Compare the two cards under the same conditions, keeping margin as spacing outside the border width.

```html
<div class="card content">content-box</div>
<div class="card border">border-box</div>
```

```css
.card { width: 200px; padding: 20px; border: 2px solid #285ea8; margin: 12px; }
.content { box-sizing: content-box; }
.border { box-sizing: border-box; }
```

## Practice setup

The starter example applies HTML source and CSS source for a preview inside a Shadow DOM. Click Apply to update the source, then Inspect current DOM / styles to read the border width. The width slider changes the container width; it does not change the preview iframe document’s viewport. In a separate local project, create both cards in index.html and connect box.css with link rel="stylesheet". Check the box model in Elements and Computed in developer tools.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. In the lesson example’s HTML source, enter `<div class="card">width 200 + padding 40 + border 4</div>`. In CSS source, enter `.card{width:200px;padding:20px;border:2px solid #285ea8;box-sizing:content-box}`. Click Apply, then Inspect current DOM / styles.
2. Before running, record the predicted border width as 200 + 40 + 4 = 244px. In the inspection output’s nodes, read the DIV card’s width and boxSizing. The expected values are 244 and content-box. The default example was measured at 244px in Windows Chromium 151. Record the value from your own screen in a separate field too.
3. Change only content-box to border-box in the CSS, then click Apply followed by Inspect current DOM / styles. The expected border width is 200px and content width is 156px. The existing Chromium 151 verification measured a border width of 200px. The content width 156px is calculated by subtracting the total horizontal padding of 40px and borders of 4px from the computed style width of 200px. The example output shows only the border width, so also check the content area in the developer tools box model diagram.
4. To compare both cards simultaneously, copy the HTML and CSS from “Two cards to copy and compare” in the concepts into their respective inputs, then click Apply. The expected border widths are 244px and 200px. margin 12px is spacing outside the box and is not added to these widths. Run this two-card variant yourself and record the results.
5. In Elements, select the .content card inside shadow-root. In Computed’s box model diagram, identify content 200, padding 20 on each side, border 2 on each side, and margin 12 on each side. Check that the .border card has content 156. In the console, use $0, which refers to the selected element, and run $0.getBoundingClientRect().width to read the width before rounding.
6. Move the container width slider and click Inspect current DOM / styles. Record containerWidth, viewportWidth, and both card widths together. While the CSS retains fixed width values, the expected card widths remain the same. The container’s max-width constraint may make the slider value differ from the measured containerWidth, so record the output value. This variant is outside the measurement scope of the existing browser verification record.
7. For a boundary experiment, add width:30px to .border and click Apply. The combined horizontal padding and borders total 44px, and content cannot have a negative width, so the predicted minimum border width is 44px. Check it yourself with Inspect current DOM / styles and the box model diagram, and explain why you had assumed width 30 was the actual border width. This is a calculated prediction; it is not included in the existing measurement record provided here.
8. If results differ, first check whether you clicked Apply, which of the two cards you selected, and whether boxSizing has the intended value. Then look for min-width, transform, or additional padding. Record the original CSS / formula / predicted width / measured width / cause of any difference in your experiment log. Restore the default CSS and check both card widths again.

## Variables to observe

| Variable | Baseline | Change | Expected change / hypothesis |
| --- | --- | --- | --- |
| box-sizing | content-box | border-box | Hypothesis before running: the outer width will change from 244px to 200px. Keep other conditions fixed and record the actual result separately after running. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Record the actual widths of both cards.
- [ ] Distinguish the content, padding, border, and margin regions in the tools.

## Self-check

1. Is margin included within width?
2. How does the minimum content size affect the calculation?

## Official references

- [MDN box-sizing](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/box-sizing)
- [MDN box model](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Styling_basics/Box_model)
- [MDN getBoundingClientRect](https://developer.mozilla.org/en-US/docs/Web/API/Element/getBoundingClientRect)
- [MDN using media queries](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Media_queries/Using)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/css-step-04/example.js) · [Runtime environments and limits](../../../../../examples.md)

Change box-sizing to border-box and compare the measured widths of 244px and 200px. Document body/html selectors are scoped inside the Shadow DOM. @media responds to the outer preview viewport, while the width slider changes only the container. Network access, form navigation, and iframe execution are restricted.


Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning



## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions
