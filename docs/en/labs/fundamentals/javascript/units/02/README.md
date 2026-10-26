# JavaScript · 02 String input and number conversion

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Values and calculations · Editable example · Storage ID: `javascript-step-02`

## Goals and learning outcomes

- Record the validation result and type of all four inputs.
- The saved count does not increase for whitespace or negative numbers.

## Prerequisites

The output and experiment log from Unit 1, “Values and state”

## Key concepts and explanations

### Input types

A form’s input.value is a string. For example, "15" + 1 is "151", while Number("15") + 1 is 16. This exercise also covers converting strings to numbers. However, the example’s input field is a JSON editor, rather than an ordinary number input. Entering an array of strings such as ["15", "", "15px", "-1"] lets JSON.parse create an array and pass each element as raw. Keep the quotation marks: mixing in the number 15, null, or objects may cause an error at raw.trim().

### Conversion and validation

Number(raw) is the conversion step that checks whether the input can become a number; ok determines whether saving is allowed. The example sets ok to true only when raw.trim() !== "", Number.isFinite(value), and value >= 0 all hold. Number("") and Number(" ") are 0, but the whitespace check rejects them. "0" is a nonempty string that converts to a finite 0, so it is accepted. Keep these two steps separate to avoid saving empty input as 0 minutes based on the conversion result alone.

### NaN and null in the output

Converting "15px" with Number produces NaN, and converting "Infinity" produces Infinity. Number.isFinite returns false for both. The screen displays results with JSON.stringify, so NaN and Infinity appear as value: null. The actual conversion result has not become JavaScript null. In the console, check Number.isNaN(Number("15px")) and Number("Infinity") === Infinity to distinguish the display format from the original values.

### Input policy boundaries

The current conditions accept finite numbers greater than or equal to 0, so decimals, the 16 from "0x10", and the 1000 from "1e3" also pass. Decide separately whether these results fit your policy for minute inputs. To allow only whole minutes, add Number.isInteger(value). To accept only decimal notation, define the allowed string syntax before conversion. parseInt("15px", 10) reads 15, so simply switching to that function can allow invalid strings containing units.

### Fixing an error and running again

JSON uses double quotation marks for strings and does not allow a trailing comma in an array. Entering only [ makes JSON.parse throw an error, and the screen shows error. The exact error message may vary by browser. Correct the input to ["2"] and click Run experiment again to display a new result. You do not need to reopen the page.

### The scope of the example and the saving assignment

The current example calculates and displays raw, type, ok, and value; it does not implement a saved list. Use the separate code below to check the completion criterion that the saved count does not increase for whitespace or negative numbers. Record whether every row’s type is string, what the converted value is, and the final ok separately to avoid confusing string input with numeric validation.

### Saving code to copy and run

Create index.html and numbers.js in a separate folder with the following contents. Open index.html through a local HTTP server and inspect the developer tools console. This code does not represent a saving feature in the lesson’s example screen, and it assumes an array of string inputs.

```html
<!doctype html>
<html lang="ko">
<meta charset="utf-8">
<title>숫자 입력 저장 실험</title>
<script type="module" src="./numbers.js"></script>
</html>
```

```js
function parseMinutes(raw) {
  if (raw.trim() === "") return { ok: false, error: "값을 입력하세요" };
  const value = Number(raw);
  if (!Number.isFinite(value) || value < 0) {
    return { ok: false, error: "0 이상의 유한한 수를 입력하세요" };
  }
  return { ok: true, value };
}
const saved = [];
const inputs = ["15", "", "15px", "-1", "  ", "0"];
for (const raw of inputs) {
  const before = saved.length;
  const result = parseMinutes(raw);
  if (result.ok) saved.push(result.value);
  if (!result.ok) console.assert(saved.length === before, raw);
  console.log({ raw, type: typeof raw, result, count: saved.length });
}
console.assert(JSON.stringify(saved) === "[15,0]", saved);
```

## Practice setup

The starter example reads a JSON array of strings and displays validation results. Use the Run experiment button to process the input again. The saved list and parseMinutes are a separate assignment: implement them in numbers.js in a local project. Connect it in index.html with script type="module" and open the page through a local HTTP server. Check the original numeric values and console.assert results in the developer tools console.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. Open the lesson example, paste ["15", "", "15px", "-1"] into the experiment JSON input, and click Run experiment. Before running, write down your predicted type, value, and ok for each row. This is an array of strings, so even the number-looking 15 needs double quotation marks.
2. Check that the output row with raw "15" is string / 15 / true, the empty string is string / 0 / false, "15px" is string / null / false, and "-1" is string / -1 / false. The order here is type / displayed value / ok. Also record that null is the JSON representation of NaN. An existing run of the example in Windows Chromium 151 matched these four results. Write your own run’s values in a separate measurement field.
3. Change the JSON input to [" ", "0", "Infinity", "0x10", "1e3"] and click Run experiment. The expected ok values are false, true, false, true, true, and the displayed values are 0, 0, null, 16, 1000. These boundary inputs also matched the existing Chromium 151 run record. Explain which row would be wrong if you used an if (!value) check that rejects 0.
4. Change the input to [ and click Run experiment to check the error display. Then correct it to ["2"], click the same button again, and check that it recovers to value 2 and ok true. The existing browser record confirmed this error display and recovery. Errors from non-string elements such as [15] occur at a different stage from JSON syntax errors.
5. Check the saving conditions in a separate project using “Saving code to copy and run” in the concepts. Copy index.html and numbers.js into their respective files, open the page through a local HTTP server, and check that the console has no console.assert failures.
6. The separate code’s expected saved list is [15, 0], with a count of 2. Compare the counts before and after processing the empty string, whitespace, a string with a unit, and a negative number, and record the actual console results. This saving assignment’s code is not automatically applied to the current example screen.
7. Compare Number and parseInt in the console with console.log(Number("15px"), parseInt("15px", 10));. Then pass "2.5", "0x10", and "1e3" to parseMinutes and write a one-sentence input policy specifying whether to allow only integers or only decimal notation. If you change the policy, redefine the expected values too.
8. In your experiment log, record the original input / prediction before running / screen or console value after running / cause of any difference. To complete the exercise, go beyond recording success: explain why the empty string has value 0 but ok false, and why the displayed null does not mean actual null.

## Variables to observe

| Variable | Baseline | Change       | Expected change / hypothesis                                                                                                                                                  |
| -------- | -------- | ------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| String   | 15       | Empty string | Hypothesis before running: an empty value will be rejected rather than saved as 0 minutes. Keep other conditions fixed and record the actual result separately after running. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] Record the validation result and type of all four inputs.
- [ ] The saved count does not increase for whitespace or negative numbers.

## Self-check

1. How does parseInt handle 15px?
2. Can you rely solely on the constraints of a number input?

## Official references

- [MDN Number — number coercion](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number#number_coercion)
- [MDN Number.isFinite](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isFinite)
- [MDN String.trim](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/trim)
- [MDN JSON.stringify — displaying NaN and Infinity](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify#description)
- [MDN JSON.parse — JSON syntax errors](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse#exceptions)
- [MDN parseInt](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/parseInt)
- [MDN HTMLInputElement.value](https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/value)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/javascript-step-02/example.js) · [Runtime environments and limits](../../../../../examples.md)

Compare editable inputs with actual browser execution results.

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: Values and State](../../01-foundations/README.md) · [Next: Equality Comparisons and Defaults](../03/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions
