# webassembly-03 companion execution

Compile kernel.wat in an isolated copy with WABT, then run the real Node assertion harness. Existing legacy kernel.wasm can run directly with Node. The iframe preview does not execute Wasm or certify these checks.

Run `node benchmark.mjs` with the supplied kernel.wasm, or rebuild it with `wat2wasm kernel.wat -o kernel.wasm` first. Record tool versions and assertion output; timing observations do not establish relative performance.

- [benchmark.mjs](./benchmark.mjs) · preserved original
- [kernel.wasm](./kernel.wasm) · preserved original
- [kernel.wat](./kernel.wat) · preserved original
