# iframe sandbox boundary

Run `python -m http.server 8000` in this folder, then open http://localhost:8000/index.html .

- Unchecked: sandbox="". The guide HTML is visible, but script, button handlers, and postMessage do not run.
- Checked: sandbox="allow-scripts". The same document reloads, and the counter and messaging work. The origin is "null" because allow-same-origin is absent.
- The parent page checks event.source and the message type. This example does not send confidential data.

Frontory also applies a parent CSP restriction, so perform this comparison on a standalone local server. Do not add allow-same-origin. Record blocked requests and console messages alongside actual button behavior.
