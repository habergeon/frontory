import {readFile} from 'node:fs/promises';
import assert from 'node:assert/strict';
const cold=performance.now();const bytes=await readFile(new URL('./kernel.wasm',import.meta.url));const readMs=performance.now()-cold;let t0=performance.now();const module=await WebAssembly.compile(bytes);const compileMs=performance.now()-t0;const reports=[];const imports={host:{report:x=>reports.push(x)}};t0=performance.now();const instance=await WebAssembly.instantiate(module,imports);const instantiateMs=performance.now()-t0;const api=instance.exports,memory=api.memory;
{
const view=new DataView(memory.buffer);view.setInt32(1,12345,true);assert.equal(api.read(1),12345);console.log('Unaligned i32.load is valid; JS typed array offset 1 is not');assert.throws(()=>new Int32Array(memory.buffer,1,1),RangeError);
}
console.log('PASS: lesson assertions completed');
