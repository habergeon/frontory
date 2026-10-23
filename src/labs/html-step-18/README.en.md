# Media, captions, and failure paths

Run `python -m http.server 8000` in this folder, then open http://localhost:8000/index.html . Captions may be restricted when opened with file:// .

1. Play the 6-second silent sample.mp4 and select Korean in the captions menu. Blue changes to orange at 3 seconds.
2. Use the missing-file button to check the 404 and transcript fallback. Also test restoring the valid file.
3. Change the timing and text in captions.vtt, reload, and compare.

This silent synthetic video is not intended to assess caption quality for actual speech. When replacing it with a speech video you own, update both captions and transcript.

The playback asset was generated with the FFmpeg color source. No external video or audio was used. See the generate-foundations-examples.mjs comments in the repository for the generation command.
