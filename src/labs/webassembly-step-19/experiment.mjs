import {readFile} from 'node:fs/promises';
import assert from 'node:assert/strict';
const cold=performance.now();const bytes=await readFile(new URL('./kernel.wasm',import.meta.url));const readMs=performance.now()-cold;let t0=performance.now();const module=await WebAssembly.compile(bytes);const compileMs=performance.now()-t0;const reports=[];const imports={host:{report:x=>reports.push(x)}};t0=performance.now();const instance=await WebAssembly.instantiate(module,imports);const instantiateMs=performance.now()-t0;const api=instance.exports,memory=api.memory;
{
const response=new Response(bytes,{headers:{'Content-Type':'application/wasm'}});const streamed=await WebAssembly.instantiateStreaming(response,imports);assert.equal(streamed.instance.exports.add(2,3),5);await assert.rejects(()=>WebAssembly.instantiateStreaming(new Response(bytes,{headers:{'Content-Type':'text/plain'}}),imports));
}
console.log('PASS: lesson assertions completed');
