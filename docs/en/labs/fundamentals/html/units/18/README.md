# HTML · 18 Media Captions and Alternatives

[Series contents](../../README.md) · [Technology map](../../../../README.md)

Stage: Native UI and Media · External example · preview instructions · Storage ID: `html-step-18`

## Goals and learning outcomes

- The 2 caption cues appear at their specified times.
- Access the transcript link when the video fails to load.

## Prerequisites

The work and experiment records from Unit 17, “dialog and Modal Flow”.

## Key concepts and explanations

### Media Controls

The controls attribute on audio and video provides native playback UI. Relying on autoplay is affected by environment policies and user preferences.

### Timed Text

Associate captions using track and WebVTT. Make spoken information accessible through a transcript as well.

## Practice setup

First check the execution scope guidance on the example screen. The following environment is for extending the assignment in a separate project. Implement it yourself in a separate local project and check it with browser developer tools. Prepare HTML and any necessary image/media files in a separate folder and open them through a local HTTP server. Check with the Elements and accessibility panels and actual keyboard operation.

The linked example is a starting point. It does not implement every task below. Complete work beyond its supported scope in a separate project.

## Practice tasks

1. In media.html, prepare a video file, captions.vtt, and a transcript.
2. Connect controls and a Korean caption track to a short local video, and add a transcript link.
3. Run with a video file, captions.vtt, and a transcript. Results to check: The 2 caption cues appear at their specified times. Access the transcript link when the video fails to load. Record expected and actual results separately.

## Variables to observe

| Variable | Baseline | Change | Expected change / hypothesis |
| --- | --- | --- | --- |
| Caption Path | Existing file | Nonexistent file | Pre-run hypothesis: The video will play but captions will not appear. Keep other conditions fixed and record the actual result separately after running. |

Predictions in this table are not measured results. Change one condition at a time and record why the actual result differs.

## Completion criteria

- [ ] The 2 caption cues appear at their specified times.
- [ ] Access the transcript link when the video fails to load.

## Self-check

1. How do captions and subtitles differ?
2. Does any information remain available only through sound?

## Official references

- [MDN HTML](https://developer.mozilla.org/en-US/docs/Web/HTML)

## Linked example and execution scope

[Example source](../../../../../../../src/labs/html-step-18/example.js) · [Runtime environments and limits](../../../../../examples.md)

External HTTP example: provides a 6-second synthetic MP4, Korean VTT, a transcript, and switching between success/failure cases. This is a silent synthetic fixture; evaluate accessibility for actual speech with a separate video.

- [index.html](../../../../../../../src/labs/html-step-18/index.html)
- [captions.vtt](../../../../../../../src/labs/html-step-18/captions.vtt)
- [transcript.html](../../../../../../../src/labs/html-step-18/transcript.html)
- [README.md](../../../../../../../src/labs/html-step-18/README.md)
- [sample.mp4](../../../../../../../src/labs/html-step-18/sample.mp4)

Source code and records are not overwritten automatically. Resetting an existing example also preserves your notes.

## Next learning

[Previous: dialog and Modal Flow](../17/README.md) · [Next: Responsive Image Selection](../19/README.md)

## Experiment notes — write your own

### Goal

### Key concepts

### Changed variables and predictions

### Actual results

### What I learned

### Remaining questions
