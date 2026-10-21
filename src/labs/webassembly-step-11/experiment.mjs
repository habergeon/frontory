import {readFile} from 'node:fs/promises';
import assert from 'node:assert/strict';
const cold=performance.now();const bytes=await readFile(new URL('./kernel.wasm',import.meta.url));const readMs=performance.now()-cold;let t0=performance.now();const module=await WebAssembly.compile(bytes);const compileMs=performance.now()-t0;const reports=[];const imports={host:{report:x=>reports.push(x)}};t0=performance.now();const instance=await WebAssembly.instantiate(module,imports);const instantiateMs=performance.now()-t0;const api=instance.exports,memory=api.memory;
{
const old=new Int32Array(memory.buffer);memory.grow(1);assert.equal(old.byteLength,0);assert.equal(new Int32Array(memory.buffer).length,3*65536/4);
}
console.log('PASS: lesson assertions completed');
