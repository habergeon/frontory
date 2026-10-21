import {readFile} from 'node:fs/promises';
import assert from 'node:assert/strict';
const cold=performance.now();const bytes=await readFile(new URL('./kernel.wasm',import.meta.url));const readMs=performance.now()-cold;let t0=performance.now();const module=await WebAssembly.compile(bytes);const compileMs=performance.now()-t0;const reports=[];const imports={host:{report:x=>reports.push(x)}};t0=performance.now();const instance=await WebAssembly.instantiate(module,imports);const instantiateMs=performance.now()-t0;const api=instance.exports,memory=api.memory;
{
const a=Int32Array.from({length:10000},(_,i)=>i%100);new Int32Array(memory.buffer,0,a.length).set(a);let t=performance.now(),scalar=0;for(let i=0;i<a.length;i++)scalar+=api.read(i*4);const scalarMs=performance.now()-t;t=performance.now();const batch=api.sum(0,a.length);assert.equal(batch,scalar);console.table({scalarMs,batchMs:performance.now()-t});
}
console.log('PASS: lesson assertions completed');
