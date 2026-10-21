// First: wat2wasm kernel.wat -o kernel.wasm
// Then: node benchmark.mjs (Node 22+, working directory = this lesson folder)
import { readFile } from 'node:fs/promises';
import assert from 'node:assert/strict';
const n = 100003, repeats = 20;
const source = Int32Array.from({length:n}, (_,i)=>i%100);
const coldStart = performance.now();
const bytes = await readFile(new URL('./kernel.wasm', import.meta.url));
const compileStart = performance.now();
const module = await WebAssembly.compile(bytes);
const compileMs = performance.now()-compileStart;
const instance = await WebAssembly.instantiate(module);
const {memory, sum, at, transform} = instance.exports;
const loadCompileInstantiateMs = performance.now()-coldStart;
const transformJS = input => { const output=input.slice(); for(let i=0;i<output.length;i++) output[i]=output[i]*2+1; return output; };
let view = new Int32Array(memory.buffer, 0, n);
let t = performance.now(); view.set(source); const copyMs=performance.now()-t;
t=performance.now();const batch=sum(0,n);const batchMs=performance.now()-t;
t=performance.now();let scalar=0;for(let i=0;i<n;i++)scalar+=at(i*4);const scalarMs=performance.now()-t;
const expected=source.reduce((a,b)=>a+b,0);assert.equal(batch,expected);assert.equal(scalar,expected);
// First actual transform includes no warm-up. Cold total also includes file loading/compile/instantiate.
t=performance.now();transform(0,n);const firstCallMs=performance.now()-t;
const reference=transformJS(source);assert.deepEqual(view,reference);
const coldHarnessTotalMs=performance.now()-coldStart; // Includes validation and scalar/batch experiments.
// Warm both paths; reset inputs every iteration to keep identical bounded arithmetic.
for(let i=0;i<10;i++){view.set(source);transform(0,n);transformJS(source)}
let jsTotal=0, wasmTotal=0, wasmKernel=0;
for(let r=0;r<repeats;r++){
 t=performance.now();const result=transformJS(source);jsTotal+=performance.now()-t;
 t=performance.now();view.set(source);const k=performance.now();transform(0,n);wasmKernel+=performance.now()-k;
 const copied=view.slice();wasmTotal+=performance.now()-t;assert.deepEqual(copied,result);
}
const old=view;memory.grow(1);assert.equal(old.byteLength,0);view=new Int32Array(memory.buffer,0,n);
console.table({n,copyMs,batchMs,scalarMs,compileMs,loadCompileInstantiateMs,firstCallMs,coldHarnessTotalMs,
 jsWarmMeanMs:jsTotal/repeats,wasmKernelMeanMs:wasmKernel/repeats,wasmWarmWithCopiesMeanMs:wasmTotal/repeats,
 oldViewBytesAfterGrow:old.byteLength,newViewBytes:view.byteLength});
console.log('PASS: scalar/batch/transform match JS. Compare warm total, not kernel time alone. Re-run at several sizes.');
