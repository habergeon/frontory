import {readFile} from 'node:fs/promises';
import assert from 'node:assert/strict';
const cold=performance.now();const bytes=await readFile(new URL('./kernel.wasm',import.meta.url));const readMs=performance.now()-cold;let t0=performance.now();const module=await WebAssembly.compile(bytes);const compileMs=performance.now()-t0;const reports=[];const imports={host:{report:x=>reports.push(x)}};t0=performance.now();const instance=await WebAssembly.instantiate(module,imports);const instantiateMs=performance.now()-t0;const api=instance.exports,memory=api.memory;
{
for(const [a,b] of [[0,0],[-1,1],[2147483647,1],[-2147483648,-1]])assert.equal(api.add(a,b),(a+b)|0);assert.equal(api.sum(0,0),0);console.log('Boundary cases passed with explicit signed i32 wrapping contract');
}
console.log('PASS: lesson assertions completed');
