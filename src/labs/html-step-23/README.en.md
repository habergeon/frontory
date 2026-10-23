# Classic, defer, and async loading

Run `python -m http.server 8000` in this folder, then open http://localhost:8000/index.html . The two external scripts are intentionally placed in head before target.

1. Default defer: body inline → first.js → second.js → DOMContentLoaded. Both external scripts report targetExists:true.
2. Remove both defer attributes: first.js → second.js → body inline. Both external scripts block parsing, so targetExists:false.
3. Change both defer attributes to async: scripts run in download-completion order. Record DOM availability and execution order each time. Do not assume async always changes the order or always executes before the DOM exists.
4. Enable Disable cache and slow network conditions in DevTools Network, then retry. If the small local files show no difference, record that observation.

Times are observations from performance.now. The console and page display the same loadingLog. This performs actual fetch and parsing; distinguish it from the static source checks inside Frontory.
