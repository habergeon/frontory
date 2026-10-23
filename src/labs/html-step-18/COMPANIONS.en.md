# html-step-18 companion execution

Serve the complete lesson folder over local HTTP. Keep original lang and srclang fixture values, asset URLs and script ordering inputs unchanged. Verify playback/captions, sandbox behavior, or parsing order in the browser as directed by README.en.md.

Run `python -m http.server 8000 --bind 127.0.0.1` in a complete copy of this folder, then open http://localhost:8000/index.html .

The original HTML still loads captions.vtt with srclang="ko". Select Korean in that fixture. [English captions](./captions.en.vtt) are supplied separately for reading/download and are not relabeled as the original Korean track.

- [captions.vtt](./captions.vtt) · [English reading](./captions.en.vtt)
- [index.html](./index.html) · [English reading](./index.html.en.md)
- [README.md](./README.md) · [English reading](./README.en.md)
- [sample.mp4](./sample.mp4) · preserved original
- [transcript.html](./transcript.html) · [English reading](./transcript.html.en.md)
