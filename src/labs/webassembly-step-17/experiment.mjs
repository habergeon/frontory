import {readFile} from 'node:fs/promises';
import assert from 'node:assert/strict';
const cold=performance.now();const bytes=await readFile(new URL('./kernel.wasm',import.meta.url));const readMs=performance.now()-cold;let t0=performance.now();const module=await WebAssembly.compile(bytes);const compileMs=performance.now()-t0;const reports=[];const imports={host:{report:x=>reports.push(x)}};t0=performance.now();const instance=await WebAssembly.instantiate(module,imports);const instantiateMs=performance.now()-t0;const api=instance.exports,memory=api.memory;
{
const a=new Int32Array(memory.buffer,0,4),b=new Int32Array(memory.buffer,16,4);a.set([1,2,3,4]);b.set([5,6,7,8]);api.transform(16,4);assert.deepEqual([...a],[1,2,3,4]);assert.deepEqual([...b],[11,13,15,17]);
}
console.log('PASS: lesson assertions completed');
