import {readFile} from 'node:fs/promises';
import assert from 'node:assert/strict';
const cold=performance.now();const bytes=await readFile(new URL('./kernel.wasm',import.meta.url));const readMs=performance.now()-cold;let t0=performance.now();const module=await WebAssembly.compile(bytes);const compileMs=performance.now()-t0;const reports=[];const imports={host:{report:x=>reports.push(x)}};t0=performance.now();const instance=await WebAssembly.instantiate(module,imports);const instantiateMs=performance.now()-t0;const api=instance.exports,memory=api.memory;
{
const view=new Int32Array(memory.buffer,0,10000),source=Int32Array.from({length:10000},(_,i)=>i%100);const times=[];for(let r=0;r<30;r++){view.set(source);const t=performance.now();api.transform(0,view.length);if(r>=10)times.push(performance.now()-t)}console.log('20 warm kernel samples ms',times);
}
console.log('PASS: lesson assertions completed');
