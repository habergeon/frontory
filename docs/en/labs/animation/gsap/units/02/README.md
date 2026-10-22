# GSAP · 02 Starting and target values

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Tweens and the time model · Editable example · Storage ID: `gsap-step-02`

## Goals and learning outcomes

- Learning outcome: explain the roles of from and to. Input case: a card initially at x=40.
- Output: a transform table immediately after creation and after completion. Connect your explanation of initial application to the code.

## Prerequisites

Prepare the Tween and playhead exercise results from Unit 1, “Tween and Timeline”.

## Key concepts and explanations

### What from and to leave implicit

x is the element’s horizontal translation transform value, compared in px in this unit. For a card initially at x=40, gsap.to(card, { x: 240 }) moves from the current value to 240. gsap.from(card, { x: -80 }) starts at -80 and returns to the original value 40. gsap.fromTo(card, { x: -80 }, { x: 240 }) specifies both values explicitly, so the original 40 is not an endpoint of the movement. To compare the three APIs, create a separate card for each and initialize all of them to 40. Running them sequentially on one card makes the previous tween’s end value the next tween’s current value, changing the comparison conditions.

### The built-in example runs a single fromTo path

The default built-in example’s Run experiment button is not a to/from selector. Before a click, x has not been set and the card is at x=0. On the first click, reverse changes from false to true and creates gsap.fromTo(box, { x: 240, opacity: 0.2 }, { x: 0, opacity: 1, duration: 1, immediateRender: false }). The next click starts at x=0 and ends at x=240. The first run therefore moves from 240 on the right back to the original position. The output text is guidance defined in the code, rather than a measurement log continuously reading the current coordinates.

### Initial application separates creation from the first render

For from and fromTo, immediateRender defaults to true, applying the starting values on creation. Specifying immediateRender: false preserves the original styles between tween creation and the first render. Put this option in the target settings, the third argument to fromTo. The built-in example creates the tween itself on a click, preserving the appearance before that click. Even if x=0 immediately after the first click’s synchronous code, playback moves from the specified starting value x=240, so a jump may be visible. Do not interpret immediateRender: false as smoothly continuing from the current position. Compare the role of to if you want to start from the current position.

### A minimal experiment comparing the three APIs under the same conditions

This experiment is separate from the default example. Replace all JavaScript in the built-in editor with this mount code and run it, or supply gsap and container in a separate practice environment. All three cards start at x=40. With paused: true preventing automatic playback, the code outputs a table at creation and directly sets progress to 0.5 and 1. This is not a timing measurement that actually waits 0.5 seconds.

```js
export function mount({ container, gsap }) {
  const root = document.createElement('section');
  const output = document.createElement('pre');
  const names = ['to', 'from', 'fromTo'];
  const cards = names.map(name => {
    const card = document.createElement('div');
    card.textContent = name;
    card.style.cssText = 'width:64px;margin:8px;background:#76d3de';
    root.append(card);
    return card;
  });
  root.append(output);
  container.append(root);
  gsap.set(cards, { x: 40 });
  const rows = [];
  function sample(phase) {
    cards.forEach((card, index) => rows.push({
      api: names[index], phase,
      x: Number(gsap.getProperty(card, 'x')),
      transform: getComputedStyle(card).transform
    }));
  }
  sample('before');
  const options = { duration: 1, ease: 'none', paused: true };
  const tweens = [
    gsap.to(cards[0], { ...options, x: 240 }),
    gsap.from(cards[1], { ...options, x: -80 }),
    gsap.fromTo(cards[2], { x: -80 }, { ...options, x: 240 })
  ];
  sample('created');
  tweens.forEach(tween => tween.progress(0.5));
  sample('half');
  tweens.forEach(tween => tween.progress(1));
  sample('end');
  output.textContent = JSON.stringify(rows, null, 2);
  return () => {
    tweens.forEach(tween => tween.kill());
    root.remove();
  };
}
```

The experiment sets ease: 'none' so that halfway progress also means half the distance. The output includes both numeric x and the browser’s computed transform. Compare x rather than judging API differences from the transform string’s notation alone.

### Calculate the controlled experiment’s expected table first

For the code above, the expected x at before is 40 for all three cards. At created, expect to=40, from=-80, fromTo=-80, because the from APIs retain their default initial application. At half, expect to=140, from=-20, fromTo=80; at end, expect to=240, from=40, fromTo=240. For example, the midpoint of to is 40 + (240 - 40) × 0.5 = 140. These numbers are predictions calculated from the code’s conditions. After running, save each output row as an actual observation. For rows that differ from the predictions, also record the initial value, API, ease, and progress settings.

### Values verified in the built-in example and the scope of verification

Verification of the existing example’s mount on a local Vite page in HeadlessChrome 151.0.7922.34 confirmed initial x=0 and x=0 immediately after the first click’s synchronous code. After forcing progress(1) on the first tween, it read x=0 and opacity=1; after progress(1) on the second tween, it read x=240. At progress(0.5), it read x=60 and opacity=0.8; the default example does not specify ease. This record contains property values checked by directly moving GSAP’s progress. The three-card code above was also run in the same browser, confirming that x at before, created, half, and end matched the expected table. With immediateRender: false added, created was 40 for all three cards, and half and end still matched the original table. This record does not measure actual natural-playback duration or whether the screen flickers. The reproduction code is in [Representative lesson browser checks](../../../../../../../tests/browser/representative-lessons.js).

### Failure cases that produce unexpected results

Creating to, from, and fromTo in succession on the same card can make multiple tweens write the same property or read styles left by a previous run. Use separate comparison cards and reset the initial values before each run. On each new click, the built-in example kills the existing tween and creates a new fromTo. Do not use it as an experiment in preserving the current position during rapid clicks. Also, expecting progress(0.5) to mean half the distance with the default ease leads to an incorrect comparison. Only the separate experiment above controls ease with ease: 'none'. Put duration in fromTo’s third, target object rather than its starting object, and check the expected direction and actual end value first.

### Repeat the experiment changing only initial application

Add immediateRender: false to options in the three-card experiment and run it again. In the paused state’s created rows, from and fromTo are now expected to retain the original x=40 too. Directly setting progress(0.5) and progress(1) moves to those points, so the expected half and end values remain unchanged. This comparison checks the styles immediately after creation separately from the movement interval. To visually check flicker in the initial screen, define automatic-playback and delay conditions in a separate experiment and observe again. Do not claim to have observed the screen’s first paint based only on a paused progress table.

## Practice setup

The project dependency is GSAP 3.15.0. The default src/labs/gsap-step-02/example.js runs fromTo with the Run experiment button. The three-API comparison code in this lesson is a separate mount replacement experiment using gsap and container supplied to mount. In a separate local GSAP project, prepare the gsap import and the DOM element to mount into, and record the version and lockfile. This unit does not use ScrollTrigger.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. Confirm that the default built-in example runs only fromTo. Record the card’s position before running, click Run experiment once, and observe its finishing direction. Compare it with the code’s expected targets: x=0 first, then x=240.
2. Use the separate mount code in this lesson to compare to/from/fromTo. Record the three cards’ initial x=40 and the ease: none, paused: true conditions, then calculate the expected before, created, half, and end values first.
3. After running, save the output x and transform. Compare the rows immediately after creation and after completion for baseline to and changed fromTo, and also explain the end value of from. Leave cells without actual observations marked as not run.
4. Add only immediateRender: false to options and run again. Compare the difference in created rows and the half and end rows. In notes/day-2.md, record the environment, inputs, predictions, observations, and causes of differences.

## Variables to observe

| Variable | Baseline | Change | Expected change / hypothesis |
| --- | --- | --- | --- |
| API | to | fromTo | The explicit starting value changes the movement interval. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Required output: a transform table immediately after creation and after completion. Results for both the baseline and changed conditions allow comparison of 2 conditions in total, with inputs and the execution environment recorded together.
- [ ] Connect the explanation of differences between the two conditions to both concepts: from and to, and initial application. For any unexpected result, record at least 1 cause or reason it remains unresolved.

## Self-check

1. Starting at x=40, what starting and ending values do to with x=240 and from with x=-80 each use?
2. If you expected the built-in example’s first run to move from 0 to 240, what did you miss in reverse’s first changed value or the two fromTo objects?
3. With paused: true, if you change only immediateRender to false, which observation point among created, half, and end do you expect to change? Explain by comparing with the table you obtained yourself.

## Official references

- [GSAP to target values and settings](https://gsap.com/docs/v3/GSAP/gsap.to()/)
- [GSAP from current state and initial application](https://gsap.com/docs/v3/GSAP/gsap.from()/)
- [GSAP fromTo endpoints and immediateRender](https://gsap.com/docs/v3/GSAP/gsap.fromTo()/)
- [GSAP reading property values](https://gsap.com/docs/v3/GSAP/gsap.getProperty()/)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/gsap-step-02/example.js) · [Runtime environments and limits](../../../../../examples.md)

This experiment explores starting and target values. You can manipulate it directly, and it cleans up the resources it uses.


Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Tween and Timeline](../../01-foundations/README.md) · [Next: The Time Curve of Ease](../03/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions
