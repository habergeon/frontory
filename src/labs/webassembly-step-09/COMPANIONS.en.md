# webassembly-step-09 companion execution

Compile kernel.wat in an isolated copy with WABT, then run the real Node assertion harness. Existing legacy kernel.wasm can run directly with Node. The iframe preview does not execute Wasm or certify these checks.

Run `wat2wasm kernel.wat -o kernel.wasm`, then `node experiment.mjs`. Keep worker.mjs alongside experiment.mjs when supplied. Record tool versions and assertion output; timing observations do not establish relative performance.

- [experiment.mjs](./experiment.mjs) · preserved original
- [kernel.wat](./kernel.wat) · preserved original
