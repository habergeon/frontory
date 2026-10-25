import fs from 'node:fs'
import path from 'node:path'
import { localizeExampleSource, writeGeneratedFile } from './example-presentation.mjs'

// Authoring templates only: every emitted example is standalone and import-free.
const root = path.resolve(import.meta.dirname, '..')
const ui = (u, note) => `
  container.style.cssText = 'overflow:auto;background:#101827;color:#e5edf8;font:14px system-ui;padding:12px;box-sizing:border-box';
  const title=document.createElement('h3'); title.textContent=messages.display001;
  const help=document.createElement('p'); help.textContent=messages.display002;
  const choice=document.createElement('select'); choice.setAttribute('aria-label',messages.display003);
  for(const text of [messages.display004,messages.display005]) { const o=document.createElement('option');o.textContent=text;choice.append(o); }
  const button=document.createElement('button'); button.textContent=messages.display006;
  const output=document.createElement('pre'); output.style.cssText='white-space:pre-wrap;overflow-wrap:anywhere'; output.setAttribute('aria-live','polite');
  const canvas=document.createElement('canvas'); canvas.width=640;canvas.height=360;canvas.style.cssText='width:100%;height:auto;max-height:360px;object-fit:contain';
  container.append(title,help,choice,button,canvas,output);
`
const gpuTemplate = (u, body, note) => `// ${u.id}: ${u.title}
// GPUBufferUsage: MAP_READ=1, COPY_SRC=4, COPY_DST=8, VERTEX=32, UNIFORM=64, STORAGE=128.
export function mount({container,locale='ko'}) {
/* GPU_MESSAGES */
${ui(u,note)}
  let active=true, generation=0, release=()=>{};
  async function run() {
    const token=++generation;release();release=()=>{};button.disabled=true;
    const current=()=>active && token===generation;
    const log=value=>{if(current())output.textContent=typeof value==='string'?value:JSON.stringify(value,null,2);};
    const variant=choice.selectedIndex;
    /** @type {any} */ const gpu=navigator['gpu'];
    if(!globalThis.isSecureContext || !gpu) {log(messages.display007);button.disabled=false;return;}
    /** @type {any} */ let device;
    const resources=[];let context;
    const dispose=()=>{for(const r of resources)r.destroy();resources.length=0;context?.unconfigure();device?.destroy();};
    try {
      const adapter=await gpu.requestAdapter();if(!current())return;
      if(!adapter)throw new Error(messages.display008);
      const optional=${u.id==='webgpu-step-02'?'variant':'false'} && adapter.features.has('timestamp-query')?['timestamp-query']:[];
      device=await adapter.requestDevice({requiredFeatures:optional});
      if(!current()){device.destroy();return;} release=dispose;
      device.lost.then(info=>{if(current())log(messages.display009+info.reason+messages.display010);});
      device.addEventListener('uncapturederror',event=>log(messages.display011+event.error.message));
      const buffer=(data,usage=128|4|8)=>{const bytes=typeof data==='number'?Math.max(4,data):data.byteLength;const b=device.createBuffer({size:Math.ceil(bytes/4)*4,usage});resources.push(b);if(typeof data!=='number')device.queue.writeBuffer(b,0,data);return b;};
      const read=async(b,size)=>{const staging=buffer(size,1|8);const e=device.createCommandEncoder();e.copyBufferToBuffer(b,0,staging,0,size);device.queue.submit([e.finish()]);await staging.mapAsync(1);if(!current()){staging.unmap();throw new Error('Cancelled');}const result=new Float32Array(staging.getMappedRange().slice(0));staging.unmap();return result;};
      const compile=async(code)=>{const m=device.createShaderModule({code});const info=await m.getCompilationInfo();if(!current())throw new Error('Cancelled');const errors=info.messages.filter(x=>x.type==='error');if(errors.length)throw new Error(errors.map(x=>'line '+x.lineNum+': '+x.message).join('\\n'));return m;};
      const compute=async(code,entries,groups,constants={})=>{const module=await compile(code);const p=await device.createComputePipelineAsync({layout:'auto',compute:{module,entryPoint:'main',constants}});if(!current())throw new Error('Cancelled');device.pushErrorScope('validation');const bind=device.createBindGroup({layout:p.getBindGroupLayout(0),entries});const e=device.createCommandEncoder();const pass=e.beginComputePass();pass.setPipeline(p);pass.setBindGroup(0,bind);pass.dispatchWorkgroups(...groups);pass.end();device.queue.submit([e.finish()]);const error=await device.popErrorScope();if(!current())throw new Error('Cancelled');if(error)throw new Error(error.message);};
      const setupCanvas=()=>{context=canvas.getContext('webgpu');if(!context)throw new Error(messages.display012);const format=gpu.getPreferredCanvasFormat();context.configure({device,format,alphaMode:'opaque'});return format;};
      const triangle=\`@vertex fn vs(@builtin(vertex_index) i:u32)->@builtin(position) vec4f {let p=array<vec2f,3>(vec2f(-.7,-.6),vec2f(.7,-.6),vec2f(0,.7));return vec4f(p[i],0,1);}
      @fragment fn fs()->@location(0) vec4f{return vec4f(.2,.7,1,1);}\`;
      const render=async(code=triangle,options={})=>{const format=setupCanvas();const module=await compile(code);const p=await device.createRenderPipelineAsync({layout:'auto',vertex:{module,entryPoint:'vs'},fragment:{module,entryPoint:'fs',targets:[{format}]},...options});if(!current())throw new Error('Cancelled');const e=device.createCommandEncoder();const pass=e.beginRenderPass({colorAttachments:[{view:context.getCurrentTexture().createView(),clearValue:[.02,.04,.08,1],loadOp:'clear',storeOp:'store'}]});pass.setPipeline(p);pass.draw(3);pass.end();device.queue.submit([e.finish()]);};
      ${body}
    } catch(error){if(current()){log(error instanceof Error?error.message:String(error));dispose();release=()=>{};}}
    finally{if(current())button.disabled=false;}
  }
  button.onclick=()=>{void run();};choice.onchange=()=>{void run();};void run();
  return ()=>{active=false;generation++;release();button.onclick=null;choice.onchange=null;container.replaceChildren();};
}
`

const simpleCompute = (expression, {count='variant?65:64',prefix='',init='i+1',workgroup='64',extra=''}={}) => `
const n=${count},wg=${workgroup};const input=Float32Array.from({length:n},(_,i)=>${init});const src=buffer(input),dst=buffer(n*4);
await compute(${JSON.stringify(`@group(0) @binding(0) var<storage,read> src:array<f32>; @group(0) @binding(1) var<storage,read_write> dst:array<f32>; ${prefix}
@compute @workgroup_size(WORKGROUP) fn main(@builtin(global_invocation_id) id:vec3u){let i=id.x;if(i>=arrayLength(&src)){return;} ${expression}}`)}.replace('WORKGROUP',String(wg)),[{binding:0,resource:{buffer:src}},{binding:1,resource:{buffer:dst}}],[Math.ceil(n/wg)]);
const result=await read(dst,n*4);log({length:n,workgroup:wg,input:Array.from(input.slice(0,12)),output:Array.from(result.slice(0,12)),last:result[n-1]});${extra}`

const reduction = (bad=false) => `
const n=variant?1003:65,wg=64;const input=Float32Array.from({length:n},(_,i)=>i%7);const src=buffer(input),dst=buffer(Math.ceil(n/wg)*4);
await compute(\`@group(0) @binding(0) var<storage,read> src:array<f32>;
@group(0) @binding(1) var<storage,read_write> dst:array<f32>;var<workgroup> tile:array<f32,64>;
@compute @workgroup_size(64) fn main(@builtin(global_invocation_id) gid:vec3u,@builtin(local_invocation_id) lid:vec3u,@builtin(workgroup_id) group:vec3u){
var value=\$\{${bad?'variant?1:0':'0'}\}.0;if(gid.x<arrayLength(&src)){value=src[gid.x];}tile[lid.x]=value;workgroupBarrier();
var step=32u;loop {if(lid.x<step){tile[lid.x]+=tile[lid.x+step];}workgroupBarrier();if(step==1u){break;}step/=2u;}
if(lid.x==0u){dst[group.x]=tile[0];}}\`,[{binding:0,resource:{buffer:src}},{binding:1,resource:{buffer:dst}}],[Math.ceil(n/wg)]);
const result=await read(dst,Math.ceil(n/wg)*4);log({n,partialSums:Array.from(result),gpuSum:result.reduce((a,b)=>a+b,0),cpuSum:input.reduce((a,b)=>a+b,0),padding:${bad?'variant?1:0':'0'}});`

const wgsl = {
2:simpleCompute('dst[i]=f32(i32(src[i]))/2.0;',{count:'8',init:'variant?i+0.5:i',extra:"log({input:Array.from(input),integerCastThenDivide:Array.from(result),note:messages.display013});"}),
3:simpleCompute('let m=mat2x2f(vec2f(1,2),vec2f(3,4));dst[i]=(m*vec2f(src[i],1)).x;',{count:'4',prefix:'',extra:"log({output:Array.from(result),note:messages.display013});"}),
4:simpleCompute('let base=src[i];var value=base*SCALE;dst[i]=value;',{prefix:'override SCALE:f32=1;',count:'8'}),
5:simpleCompute('let w=Wave(src[i],AMPLITUDE);dst[i]=displace(w);',{count:'16',init:'i/16*6.28318',prefix:'struct Wave { phase:f32, amplitude:f32 } fn displace(w:Wave)->f32{return sin(w.phase)*w.amplitude;} const AMPLITUDE:f32=0.1;'}),
6:simpleCompute('var sum=0.0;for(var k=0u;k<ITERATIONS;k++){sum+=src[i];}dst[i]=sum;',{count:'8',prefix:'const ITERATIONS:u32=1;'}),
7:`const interpolation=variant?'@interpolate(flat)':'';await render(\`struct Out{@builtin(position) p:vec4f,@location(0) \$\{interpolation\} color:vec3f};@vertex fn vs(@builtin(vertex_index) i:u32)->Out{let p=array<vec2f,3>(vec2f(-.8,-.7),vec2f(.8,-.7),vec2f(0,.8));let c=array<vec3f,3>(vec3f(1,0,0),vec3f(0,1,0),vec3f(0,0,1));return Out(vec4f(p[i],0,1),c[i]);}@fragment fn fs(in:Out)->@location(0) vec4f{return vec4f(in.color,1);}\`);log({interpolation:interpolation||'perspective'});`,
8:`const code=\`@group(0) @binding(0) var<storage,read> src:array<f32>; @compute @workgroup_size(1) fn main(){\${variant?'src[0]=1.0;':'let x=src[0];'}}\`;await compile(code);log(messages.display013);`,
9:`const src=buffer(new Float32Array([3]));await compute('@group(0) @binding(0) var<storage,read_write> x:array<f32>;@compute @workgroup_size(1) fn main(){x[0]*=2.0;}',[{binding:variant?1:0,resource:{buffer:src}}],[1]);log(Array.from(await read(src,4)));`,
10:`const packed=new Float32Array(8);packed[0]=1;packed.set([2,3,4],variant?1:4);packed[7]=5;const src=buffer(packed),dst=buffer(16);await compute('struct Data{a:f32,b:vec3f,c:f32};@group(0) @binding(0) var<storage,read> data:Data;@group(0) @binding(1) var<storage,read_write> dst:array<f32>;@compute @workgroup_size(1) fn main(){dst[0]=data.a;dst[1]=data.b.x;dst[2]=data.b.z;dst[3]=data.c;}',[{binding:0,resource:{buffer:src}},{binding:1,resource:{buffer:dst}}],[1]);log({hostWords:Array.from(packed),gpuFields:Array.from(await read(dst,16)),expected:[1,2,4,5]});`,
11:`const packed=new Float32Array(24);const stride=variant?9:12;for(let m=0;m<2;m++)for(let c=0;c<3;c++)packed[m*stride+c*(variant?3:4)+c]=m+1;const src=buffer(packed),dst=buffer(8);await compute('@group(0) @binding(0) var<storage,read> m:array<mat3x3f,2>;@group(0) @binding(1) var<storage,read_write> out:array<f32>;@compute @workgroup_size(1) fn main(){out[0]=m[0][2][2];out[1]=m[1][2][2];}',[{binding:0,resource:{buffer:src}},{binding:1,resource:{buffer:dst}}],[1]);log({matrixStride:stride*4,result:Array.from(await read(dst,8)),expected:[1,2]});`,
12:`const packed=new Float32Array(16);for(let i=0;i<4;i++)packed[i*(variant?1:4)]=i+1;const src=buffer(packed,64|8),dst=buffer(16);await compute('struct Item{@size(16) value:f32};@group(0) @binding(0) var<uniform> items:array<Item,4>;@group(0) @binding(1) var<storage,read_write> out:array<f32>;@compute @workgroup_size(4) fn main(@builtin(local_invocation_id) id:vec3u){out[id.x]=items[id.x].value;}',[{binding:0,resource:{buffer:src}},{binding:1,resource:{buffer:dst}}],[1]);log({hostStride:variant?4:16,result:Array.from(await read(dst,16)),expected:[1,2,3,4]});`,
13:`const src=buffer(new Float32Array(16).fill(1)),dst=buffer(4);await compute('@group(0) @binding(0) var<storage,read> x:array<f32>;@group(0) @binding(1) var<storage,read_write> y:array<f32>;@compute @workgroup_size(1) fn main(){y[0]=f32(arrayLength(&x));}',[{binding:0,resource:{buffer:src,size:variant?32:64}},{binding:1,resource:{buffer:dst}}],[1]);log({allocated:64,boundBytes:variant?32:64,arrayLength:(await read(dst,4))[0]});`,
15:`const w=variant?13:8,h=variant?9:8,dst=buffer(w*h*4);await compute(\`@group(0) @binding(0) var<storage,read_write> out:array<f32>;@compute @workgroup_size(8,8) fn main(@builtin(global_invocation_id) id:vec3u){if(id.x>=\$\{w\}u || id.y>=\$\{h\}u){return;}let i=id.y*\$\{w\}u+id.x;out[i]=f32(i+1u);}\`,[{binding:0,resource:{buffer:dst}}],[Math.ceil(w/8),Math.ceil(h/8)]);const r=await read(dst,w*h*4);log({w,h,valid:r.length,unique:new Set(r).size,last:r[r.length-1]});`,
16:simpleCompute('dst[i]=src[i]*2.0;'),
17:reduction(true),
18:`const code=\`var<workgroup> tile:array<u32,64>;@compute @workgroup_size(64) fn main(@builtin(local_invocation_id) id:vec3u){tile[id.x]=id.x;\${variant?'workgroupBarrier();if(id.x<32u){tile[id.x]+=tile[id.x+32u];}':'if(id.x<32u){workgroupBarrier();tile[id.x]+=tile[id.x+32u];}'}}\`;await compile(code);log(messages.display013);`,
19:`const input=Float32Array.from({length:64},(_,i)=>variant?1:(i%2?1:-1));const src=buffer(input),dst=buffer(new Uint32Array([0]));await compute('@group(0) @binding(0) var<storage,read> x:array<f32>;@group(0) @binding(1) var<storage,read_write> count:atomic<u32>;@compute @workgroup_size(64) fn main(@builtin(global_invocation_id) id:vec3u){if(x[id.x]>0){atomicAdd(&count,1u);}}',[{binding:0,resource:{buffer:src}},{binding:1,resource:{buffer:dst}}],[1]);const r=await read(dst,4);log({positiveCount:new Uint32Array(r.buffer)[0],expected:variant?64:32});`,
20:reduction(),
21:`const n=16;let src=buffer(Float32Array.from({length:n},(_,i)=>i===0?1:0)),dst=buffer(n*4);const code=\`@group(0) @binding(0) var<storage,read> a:array<f32>;@group(0) @binding(1) var<storage,read_write> b:array<f32>;@compute @workgroup_size(16) fn main(@builtin(global_invocation_id) id:vec3u){let i=id.x;let n=arrayLength(&a);\$\{variant?'b[i]=(a[(i+n-1u)%n]+a[i]+a[(i+1u)%n])/3.0;':'if(i==0u || i==n-1u){b[i]=a[i];}else{b[i]=(a[i-1u]+a[i]+a[i+1u])/3.0;}'\}}\`;for(let step=0;step<4;step++){await compute(code,[{binding:0,resource:{buffer:src}},{binding:1,resource:{buffer:dst}}],[1]);[src,dst]=[dst,src];}log({boundary:variant?'periodic':'fixed',after4:Array.from(await read(src,n*4))});`,
24:simpleCompute('let v=vec2f(src[i],0);var direction=vec2f(0,1);if(dot(v,v)>1e-12){direction=v*inverseSqrt(dot(v,v));}dst[i]=direction.y;',{count:'3',init:'variant?[0,1e-8,1][i]:1'}),
25:simpleCompute('dst[i]=src[i]*src[i];',{count:'variant?65:63',extra:"const expected=Array.from(input,x=>Math.fround(x*x));log({length:n,pass:expected.every((x,i)=>x===result[i]),last:result[n-1],note:'경계 유효값을 CPU와 비교합니다. 별도 sentinel 영역은 아래 코드를 확장해 추가하세요.'});"}),
26:simpleCompute('dst[i]=sqrt(abs(src[i]));',{count:'1024',workgroup:'variant?128:32',extra:"log({workgroup:wg,pass:Array.from(result).every((x,i)=>Math.abs(x-Math.sqrt(input[i]))<1e-4),note:messages.display013});"}),
27:simpleCompute('dst[i]=src[i]*2.0+1.0;',{count:'16',init:'((i*17+13)%101)/101',extra:"log({contract:{input:'f32[16]',output:'2*x+1',seed:13,workgroup:64},pass:Array.from(result).every((x,i)=>Math.abs(x-(input[i]*2+1))<1e-6),result:Array.from(result)});"}),
}

// Texture load vs filtered sample and storage texture writes use real GPU textures.
const textureCompute = (storage=false) => `
const texture=device.createTexture({size:[4,4],format:'rgba8unorm',usage:4|8|2|1});resources.push(texture);
const pixels=new Uint8Array(64);for(let i=0;i<16;i++){pixels[i*4]=i%2?255:0;pixels[i*4+2]=255;pixels[i*4+3]=255;}device.queue.writeTexture({texture},pixels,{bytesPerRow:16},{width:4,height:4});
${storage?`await compute(\`@group(0) @binding(0) var image:texture_storage_2d<rgba8unorm,write>;@compute @workgroup_size(4,4) fn main(@builtin(global_invocation_id) id:vec3u){textureStore(image,vec2i(id.xy),vec4f(\${variant?'2.0':'0.5'},.25,0,1));}\`,[{binding:0,resource:texture.createView()}],[1]);const staging=buffer(1024,1|8);const e=device.createCommandEncoder();e.copyTextureToBuffer({texture},{buffer:staging,bytesPerRow:256},{width:4,height:4});device.queue.submit([e.finish()]);await staging.mapAsync(1);if(!current())throw new Error('Cancelled');const bytes=new Uint8Array(staging.getMappedRange().slice(0));staging.unmap();log({firstPixel:Array.from(bytes.slice(0,4)),note:messages.display013});`:`const sampler=device.createSampler({magFilter:'linear',minFilter:'linear'});const dst=buffer(16);await compute(\`@group(0) @binding(0) var image:texture_2d<f32>;@group(0) @binding(1) var samp:sampler;@group(0) @binding(2) var<storage,read_write> out:vec4f;@compute @workgroup_size(1) fn main(){out=\${variant?'textureSampleLevel(image,samp,vec2f(.25,.5),0)':'textureLoad(image,vec2i(0,1),0)'};}\`,[{binding:0,resource:texture.createView()},{binding:1,resource:sampler},{binding:2,resource:{buffer:dst}}],[1]);log({rgba:Array.from(await read(dst,16)),note:messages.display013});`}`
wgsl[22]=textureCompute(false);wgsl[23]=textureCompute(true);
// Both sampled bindings remain statically used in both variants of the pipeline.
wgsl[22]=wgsl[22].replace("variant?'textureSampleLevel(image,samp,vec2f(.25,.5),0)':'textureLoad(image,vec2i(0,1),0)'", "'select(textureLoad(image,vec2i(0,1),0),textureSampleLevel(image,samp,vec2f(.25,.5),0),'+Boolean(variant)+')'");
wgsl[17]=wgsl[17].replace('n=variant?1003:65','n=65');
wgsl[20]=wgsl[20].replace('n=variant?1003:65','n=variant?1003:64');
wgsl[2]=wgsl[2].replace(".replace('WORKGROUP',String(wg))", ".replace('WORKGROUP',String(wg)).replace('f32(i32(src[i]))/2.0',variant?'src[i]/2.0':'f32(i32(src[i]))/2.0')");
wgsl[25]=`
const n=variant?65:63;const input=Float32Array.from({length:n},(_,i)=>i+1);const src=buffer(input);const initial=new Float32Array(n+2).fill(-999);const dst=buffer(initial);
await compute('@group(0) @binding(0) var<storage,read> a:array<f32>;@group(0) @binding(1) var<storage,read_write> b:array<f32>;@compute @workgroup_size(64) fn main(@builtin(global_invocation_id) id:vec3u){let i=id.x;if(i>=arrayLength(&a)){return;}b[i]=a[i]*a[i];}',[{binding:0,resource:{buffer:src}},{binding:1,resource:{buffer:dst}}],[Math.ceil(n/64)]);
const result=await read(dst,(n+2)*4);log({n,pass:Array.from(input).every((x,i)=>result[i]===x*x),sentinels:Array.from(result.slice(n)),sentinelPass:result[n]===-999&&result[n+1]===-999});`;

// Change the actual kernel source/constant, not just the explanatory label.
wgsl[3]=wgsl[3].replace(".replace('WORKGROUP',String(wg))", ".replace('WORKGROUP',String(wg)).replace('vec2f(1,2),vec2f(3,4)',variant?'vec2f(1,3),vec2f(2,4)':'vec2f(1,2),vec2f(3,4)')");
wgsl[4]=wgsl[4].replace('[Math.ceil(n/wg)]);','[Math.ceil(n/wg)],{SCALE:variant?2:1});');
wgsl[5]=wgsl[5].replace(".replace('WORKGROUP',String(wg))", ".replace('WORKGROUP',String(wg)).replace('AMPLITUDE:f32=0.1',variant?'AMPLITUDE:f32=0.3':'AMPLITUDE:f32=0.1')");
wgsl[6]=wgsl[6].replace(".replace('WORKGROUP',String(wg))", ".replace('WORKGROUP',String(wg)).replace('ITERATIONS:u32=1',variant?'ITERATIONS:u32=8':'ITERATIONS:u32=1')");

const webgpu = {
2:`log({requestedOptional:optional,enabled:Array.from(device.features),adapterMaxBufferSize:adapter.limits.maxBufferSize,deviceMaxBufferSize:device.limits.maxBufferSize,requestedBytes:1024,accepted:1024<=device.limits.maxBufferSize});`,
3:`setupCanvas();const e=device.createCommandEncoder();const p=e.beginRenderPass({colorAttachments:[{view:context.getCurrentTexture().createView(),clearValue:variant?[.02,.1,.3,1]:[0,0,0,1],loadOp:'clear',storeOp:'store'}]});p.end();device.queue.submit([e.finish()]);log(messages.display013);`,
4:`setupCanvas();const events=[];for(let i=0;i<(variant?2:1);i++){const e=device.createCommandEncoder();const p=e.beginRenderPass({colorAttachments:[{view:context.getCurrentTexture().createView(),clearValue:i?[.3,.1,.02,1]:[.02,.1,.3,1],loadOp:'clear',storeOp:'store'}]});p.end();device.queue.submit([e.finish()]);events.push(messages.display013+(i+1));}await device.queue.onSubmittedWorkDone();events.push(messages.display014);log(events);`,
5:`await render(triangle,{vertex:{module:await compile(triangle),entryPoint:variant?'missing':'vs'}});log(messages.display013);`,
8:`const uniform=buffer(new Float32Array(variant?[0,1,0,1]:[1,0,0,1]),64|8);const format=setupCanvas();const module=await compile(triangle.replace('@fragment fn fs()->@location(0) vec4f{return vec4f(.2,.7,1,1);}','@group(0) @binding(0) var<uniform> color:vec4f;@fragment fn fs()->@location(0) vec4f{return color;}'));const p=await device.createRenderPipelineAsync({layout:'auto',vertex:{module,entryPoint:'vs'},fragment:{module,entryPoint:'fs',targets:[{format}]}});if(!current())throw new Error('Cancelled');const group=device.createBindGroup({layout:p.getBindGroupLayout(0),entries:[{binding:0,resource:{buffer:uniform}}]});const draw=()=>{const e=device.createCommandEncoder();const pass=e.beginRenderPass({colorAttachments:[{view:context.getCurrentTexture().createView(),clearValue:[0,0,0,1],loadOp:'clear',storeOp:'store'}]});pass.setPipeline(p);pass.setBindGroup(0,group);pass.draw(3);pass.end();device.queue.submit([e.finish()]);};draw();device.queue.writeBuffer(uniform,0,new Float32Array(variant?[0,1,0,1]:[1,0,0,1]));draw();log(messages.display013);`,
9:`const words=new Float32Array(8);words.set([1,.5,.25]);words[variant?4:3]=2;const src=buffer(words,64|8),dst=buffer(16);await compute('struct Params{color:vec3f,gain:f32};@group(0) @binding(0) var<uniform> p:Params;@group(0) @binding(1) var<storage,read_write> out:vec4f;@compute @workgroup_size(1) fn main(){out=vec4f(p.color*p.gain,p.gain);}',[{binding:0,resource:{buffer:src}},{binding:1,resource:{buffer:dst}}],[1]);log({gainByteOffset:variant?16:12,result:Array.from(await read(dst,16)),expected:[2,1,.5,2]});`,
10:`const transform=variant?'r*(p[i]+vec2f(.45,0))':'r*p[i]+vec2f(.45,0)';await render(triangle.replace('return vec4f(p[i],0,1);',\`let a=.7;let r=mat2x2f(vec2f(cos(a),sin(a)),vec2f(-sin(a),cos(a)));return vec4f(\${transform},0,1);\`));log({order:variant?messages.display013:messages.display014,angle:.7});`,
11:textureCompute(false),
15:simpleCompute('dst[i]=src[i]*2.0;'),
16:wgsl[21],
17:`const n=64;let src=buffer(Float32Array.from({length:n},(_,i)=>i)),dst=buffer(n*4);let mappings=0;const start=performance.now();for(let step=0;step<4;step++){await compute('@group(0) @binding(0) var<storage,read> a:array<f32>;@group(0) @binding(1) var<storage,read_write> b:array<f32>;@compute @workgroup_size(64) fn main(@builtin(global_invocation_id) id:vec3u){b[id.x]=a[id.x]+1.0;}',[{binding:0,resource:{buffer:src}},{binding:1,resource:{buffer:dst}}],[1]);[src,dst]=[dst,src];if(variant){await read(src,n*4);mappings++;}}const result=await read(src,n*4);mappings++;log({mappings,endToEndMs:performance.now()-start,last:result[n-1],note:messages.display013});`,
18:`const texture=device.createTexture({size:[13,2],format:'rgba8unorm',usage:2|1});resources.push(texture);const input=Uint8Array.from({length:104},(_,i)=>i%256);device.queue.writeTexture({texture},input,{bytesPerRow:52},{width:13,height:2});const bytesPerRow=variant?256:52;const staging=buffer(512,1|8);device.pushErrorScope('validation');const e=device.createCommandEncoder();e.copyTextureToBuffer({texture},{buffer:staging,bytesPerRow},{width:13,height:2});device.queue.submit([e.finish()]);const error=await device.popErrorScope();if(error){log(error.message);return;}await staging.mapAsync(1);if(!current())throw new Error('Cancelled');const padded=new Uint8Array(staging.getMappedRange().slice(0));staging.unmap();const restored=[...padded.slice(0,52),...padded.slice(bytesPerRow,bytesPerRow+52)];log({bytesPerRow,restoredBytes:restored.length,pass:restored.every((x,i)=>x===input[i])});`,
19:reduction(),
22:`await render();if(variant){device.destroy();log(messages.display013);}else log(messages.display014);`,
23:`let accepted=0;const requests=[1,2];const results=await Promise.all(requests.map(async id=>{const module=await compile(triangle);const p=await device.createRenderPipelineAsync({layout:'auto',vertex:{module,entryPoint:'vs'},fragment:{module,entryPoint:'fs',targets:[{format:gpu.getPreferredCanvasFormat()}]}});if(variant && id===1)await new Promise(resolve=>setTimeout(resolve,40));if(!current())return 'disposed';if(id!==2)return messages.display013+id+messages.display014;accepted=id;return messages.display015+id+messages.display016+Boolean(p);}));log({accepted,results,note:messages.display017});`,
24:simpleCompute('dst[i]=src[i]*src[i]+1.0;',{count:'variant?65536:1024',extra:"log({n,endToEndMs:performance.now()-started,note:messages.display013});"}),
25:simpleCompute('dst[i]=sqrt(abs(src[i]))*src[i];',{count:'6',init:'variant?[0,-1,1e-8,1e8,-1e8,3.1][i]:i+1',extra:"const checks=Array.from(input,(x,i)=>{const expected=Math.sqrt(Math.abs(x))*x,error=Math.abs(result[i]-expected),tolerance=1e-5+Math.abs(expected)*1e-5;return {x,expected,gpu:result[i],error,tolerance,pass:error<=tolerance};});log(checks);"}),
26:wgsl[26],
27:wgsl[27],
}
webgpu[24]='const started=performance.now();'+webgpu[24];
webgpu[11]=wgsl[22].replace("const sampler=device.createSampler({magFilter:'linear',minFilter:'linear'})", "const sampler=device.createSampler({magFilter:variant?'linear':'nearest',minFilter:variant?'linear':'nearest'})").replace("'select(textureLoad(image,vec2i(0,1),0),textureSampleLevel(image,samp,vec2f(.25,.5),0),'+Boolean(variant)+')'", "'textureSampleLevel(image,samp,vec2f(.25,.5),0)'");
webgpu[16]=wgsl[21].replace("boundary:variant?'periodic':'fixed'","boundary:'fixed'").replace("variant?'b[i]=(a[(i+n-1u)%n]+a[i]+a[(i+1u)%n])/3.0;':'if", "false?'b[i]=(a[(i+n-1u)%n]+a[i]+a[(i+1u)%n])/3.0;':'if")+"if(variant)log({review:messages.display013,safeReference:Array.from(await read(src,n*4)),inPlaceExecuted:false});";
webgpu[19]=reduction().replace('n=variant?1003:65','n=variant?65:64');

const vertexRender = (day) => `
const format=setupCanvas();const padded=${day===6?'Boolean(variant)':'false'};const stride=padded?24:20;
const vertexData=padded?new Float32Array([-.8,-.6,1,0,0,0, .0,.7,0,1,0,0, .8,-.6,0,0,1,0]):new Float32Array([-.8,-.6,1,0,0, .0,.7,0,1,0, .8,-.6,0,0,1]);
const vertices=buffer(vertexData,32|8);const indices=buffer(new Uint16Array([0,1,2,2,1,0]),16|8);
const module=await compile('struct Out{@builtin(position) p:vec4f,@location(0) c:vec3f};@vertex fn vs(@location(0) p:vec2f,@location(1) c:vec3f)->Out{return Out(vec4f(p,0,1),c);}@fragment fn fs(o:Out)->@location(0) vec4f{return vec4f(o.c,1);}');
const p=await device.createRenderPipelineAsync({layout:'auto',vertex:{module,entryPoint:'vs',buffers:[{arrayStride:stride,attributes:[{shaderLocation:0,offset:0,format:'float32x2'},{shaderLocation:1,offset:8,format:'float32x3'}]}]},fragment:{module,entryPoint:'fs',targets:[{format}]},primitive:{cullMode:${day===7?"variant?'back':'none'":"'none'"}}});if(!current())throw new Error('Cancelled');
const e=device.createCommandEncoder();const pass=e.beginRenderPass({colorAttachments:[{view:context.getCurrentTexture().createView(),clearValue:[.03,.04,.07,1],loadOp:'clear',storeOp:'store'}]});pass.setPipeline(p);pass.setVertexBuffer(0,vertices);
${day===7?"pass.setIndexBuffer(indices,'uint16');pass.setViewport(0,0,320,360,0,1);pass.drawIndexed(3,1,0);pass.setViewport(320,0,320,360,0,1);pass.drawIndexed(3,1,3);":"pass.draw(3);"}
pass.end();device.queue.submit([e.finish()]);log({stride,vertices:3,note:messages.display013});`
webgpu[6]=vertexRender(6);webgpu[7]=vertexRender(7);
webgpu[12]=`
const format=setupCanvas();const depth=device.createTexture({size:[640,360],format:'depth24plus',usage:16});resources.push(depth);
const module=await compile('struct Out{@builtin(position) p:vec4f,@location(0) color:vec3f};@vertex fn vs(@builtin(vertex_index) i:u32,@builtin(instance_index) j:u32)->Out{let p=array<vec2f,3>(vec2f(-.7,-.6),vec2f(.7,-.6),vec2f(0,.7));let z=select(.2,.8,j==1u);let c=select(vec3f(1,.2,.1),vec3f(.1,.5,1),j==1u);return Out(vec4f(p[i]+vec2f(f32(j)*.2,0),z,1),c);}@fragment fn fs(o:Out)->@location(0) vec4f{return vec4f(o.color,1);}');
const p=await device.createRenderPipelineAsync({layout:'auto',vertex:{module,entryPoint:'vs'},fragment:{module,entryPoint:'fs',targets:[{format}]},depthStencil:{format:'depth24plus',depthWriteEnabled:!!variant,depthCompare:variant?'less':'always'}});if(!current())throw new Error('Cancelled');const e=device.createCommandEncoder();const pass=e.beginRenderPass({colorAttachments:[{view:context.getCurrentTexture().createView(),clearValue:[0,0,0,1],loadOp:'clear',storeOp:'store'}],depthStencilAttachment:{view:depth.createView(),depthClearValue:1,depthLoadOp:'clear',depthStoreOp:'store'}});pass.setPipeline(p);pass.draw(3,2);pass.end();device.queue.submit([e.finish()]);log(messages.display013);`;
webgpu[13]=`
const format=setupCanvas(),samples=variant?4:1;const target=device.createTexture({size:[640,360],format,sampleCount:samples,usage:16});resources.push(target);const module=await compile(triangle);const p=await device.createRenderPipelineAsync({layout:'auto',vertex:{module,entryPoint:'vs'},fragment:{module,entryPoint:'fs',targets:[{format}]},multisample:{count:samples}});if(!current())throw new Error('Cancelled');const view=context.getCurrentTexture().createView();const e=device.createCommandEncoder();const pass=e.beginRenderPass({colorAttachments:[{view:samples===4?target.createView():view,...(samples===4?{resolveTarget:view}:{}),clearValue:[0,0,0,1],loadOp:'clear',storeOp:'store'}]});pass.setPipeline(p);pass.draw(3);pass.end();device.queue.submit([e.finish()]);log({sampleCount:samples,attachment:[640,360],note:messages.display013});`;
const particles = (instancing=false) => `
const n=${instancing?'variant?512:64':'64'};const src=buffer(Float32Array.from({length:n*2},(_,i)=>(i%2?Math.floor(i/2)/n:((Math.floor(i/2)*17)%n)/n)*1.6-.8));const dst=buffer(n*8,128|4|8|32);
await compute('@group(0) @binding(0) var<storage,read> a:array<vec2f>;@group(0) @binding(1) var<storage,read_write> b:array<vec2f>;@compute @workgroup_size(64) fn main(@builtin(global_invocation_id) id:vec3u){if(id.x>=arrayLength(&a)){return;}b[id.x]=a[id.x]+vec2f(.05*sin(f32(id.x)),0);}',[{binding:0,resource:{buffer:src}},{binding:1,resource:{buffer:dst}}],[Math.ceil(n/64)]);
const format=setupCanvas();const module=await compile('@vertex fn vs(@location(0) center:vec2f,@builtin(vertex_index) i:u32)->@builtin(position) vec4f{let p=array<vec2f,3>(vec2f(-.012,-.012),vec2f(.012,-.012),vec2f(0,.018));return vec4f(center+p[i],0,1);}@fragment fn fs()->@location(0) vec4f{return vec4f(.2,.8,.6,1);}');const p=await device.createRenderPipelineAsync({layout:'auto',vertex:{module,entryPoint:'vs',buffers:[{arrayStride:8,stepMode:'instance',attributes:[{shaderLocation:0,offset:0,format:'float32x2'}]}]},fragment:{module,entryPoint:'fs',targets:[{format}]}});if(!current())throw new Error('Cancelled');const e=device.createCommandEncoder();const pass=e.beginRenderPass({colorAttachments:[{view:context.getCurrentTexture().createView(),clearValue:[0,0,0,1],loadOp:'clear',storeOp:'store'}]});pass.setPipeline(p);pass.setVertexBuffer(0,dst);pass.draw(3,n);pass.end();device.queue.submit([e.finish()]);
${instancing?"log({instances:n,drawCalls:1,vertexInvocations:n*3});":"if(!variant)log({readback:Array.from((await read(dst,n*8)).slice(0,8)),note:messages.display013});else log(messages.display014);"}`;
webgpu[20]=particles();webgpu[21]=particles(true);webgpu[27]=particles(true).replace('n=variant?512:64','n=64')+"log({seed:'index*17 modulo n',count:n,note:messages.display013});";

const noiseGLSL=`float hash(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}float noise(vec2 p){vec2 i=floor(p),f=fract(p);vec2 s=mix(f,f*f*(3.-2.*f),uVariant);return mix(mix(hash(i),hash(i+vec2(1,0)),s.x),mix(hash(i+vec2(0,1)),hash(i+1.),s.x),s.y);}`;
const glslBodies={
2:'vec3 c=vec3(vUv,.3);vec3 result=mix(c*c,vec3(dot(c,c)),uVariant);gl_FragColor=vec4(result,1);',
3:'vec2 p=vUv+vec2(uVariant*100000.);float stripes=sin(p.x*500.);gl_FragColor=vec4(vec3(.5+.5*stripes),1);',
4:'gl_FragColor=vec4(vColor,1);',
5:'gl_FragColor=vec4(fract(vWorld*.5+.5),1);',
6:'gl_FragColor=vec4(vec3(.4,.8,1.)*mix(.5,1.,uVariant),1);',
7:'vec3 c=mix(vec3(.1,.7,.9)*smoothstep(.5,.1,length(vUv-.5)),vec3(vUv,0),uVariant);gl_FragColor=vec4(c,1);',
8:'vec2 p=vUv-.5;p.x*=mix(1.,uResolution.x/uResolution.y,uVariant);float m=1.-smoothstep(.24,.25,length(p));gl_FragColor=vec4(vec3(m),1);',
9:'float d=length(vUv-.5);float width=mix(.001,.03,uVariant);float m=1.-smoothstep(.25-width,.25+width,d);gl_FragColor=vec4(vec3(m),1);',
10:'vec2 p=fract(vUv*mix(4.,16.,uVariant));gl_FragColor=vec4(vec3(step(.5,p.x)*step(.5,p.y)),1);',
11:'gl_FragColor=texture2D(uTexture,vUv*3.-1.);',
12:'float d=length((vUv-.5)*vec2(uResolution.x/uResolution.y,1.))-.25;float w=mix(.01,fwidth(d),uVariant);gl_FragColor=vec4(vec3(1.-smoothstep(-w,w,d)),1);',
13:'float wave=.5+.5*sin(vUv.x*25.-uTime*mix(1.,2.,uVariant));gl_FragColor=vec4(wave,.2,1.-wave,1);',
15:'vec2 p=vUv-.5;float circle=length(p)-.23;vec2 q=abs(p-vec2(uVariant*.2,0))-.16;float box=length(max(q,0.))+min(max(q.x,q.y),0.);float difference=max(circle,-box);gl_FragColor=vec4(vec3(1.-smoothstep(-.005,.005,difference)),1);',
16:'gl_FragColor=vec4(vec3(noise(vUv*8.)),1);',
17:'float n=0.,a=.5,f=3.;for(int i=0;i<5;i++){if(float(i)>=mix(1.,5.,uVariant))break;n+=a*noise(vUv*f);f*=2.;a*=.5;}gl_FragColor=vec4(vec3(n),1);',
18:'vec3 n=normalize(vNormal);float diffuse=max(dot(n,normalize(vec3(.6,.7,1.))),0.);gl_FragColor=vec4(vec3(.15,.65,.9)*diffuse,1);',
19:'vec3 n=normalize(vNormal),l=normalize(vec3(.6,.7,1.)),v=normalize(-vView);float spec=pow(max(dot(n,normalize(l+v)),0.),mix(8.,64.,uVariant));gl_FragColor=vec4(vec3(.08,.3,.5)*max(dot(n,l),0.)+vec3(spec),1);',
20:'vec3 n=normalize(vNormal);float light=.15+.85*max(dot(n,normalize(vec3(.5,.7,1.))),0.);gl_FragColor=vec4(vec3(.2,.7,.6)*light,1);',
21:'gl_FragColor=vec4(uColor,.55);',
22:'vec4 c=texture2D(uTexture,vUv);gl_FragColor=vec4(vec3(1.)-c.rgb,1);',
23:'vec2 stepUV=vec2(mix(1.,3.,uVariant)/16.,0);vec4 c=texture2D(uTexture,vUv)*.4;c+=texture2D(uTexture,vUv+stepUV)*.3;c+=texture2D(uTexture,vUv-stepUV)*.3;gl_FragColor=c;',
24:'vec2 p=(vUv-uPointer)*vec2(uResolution.x/uResolution.y,1);float m=1.-smoothstep(.07,.09,length(p));gl_FragColor=vec4(vec3(.1,.6,1.)*m,1);',
25:'vec2 p=vUv;float n=0.;for(int i=0;i<8;i++){if(float(i)>=mix(1.,8.,uVariant))break;p=sin(p.yx*3.1+float(i));n+=sin(p.x*8.)*.06;}gl_FragColor=vec4(vec3(n+.5),1);',
26:'gl_FragColor=vec4(vUv,.5,1);',
27:'float n=0.,a=.5,f=4.;for(int i=0;i<4;i++){n+=noise(vUv*f)*a;f*=2.;a*=.5;}gl_FragColor=vec4(vec3(n),1);',
};

function glslTemplate(u){
  const d=u.day;
  const vertex=`varying vec2 vUv;varying vec3 vColor;varying vec3 vWorld;varying vec3 vNormal;varying vec3 vView;uniform float uVariant;uniform float uTime;${d===4?'attribute vec3 aColor;':''}void main(){vUv=uv;vec3 p=position;${d===20?'p.z+=.15*sin(p.x*8.);':''}vWorld=(modelMatrix*vec4(p,1)).xyz;vColor=${d===4?'mix(vec3(1,0,0),aColor,uVariant)':'vec3(1)'};vNormal=normalize(normalMatrix*normal);${d===20?'if(uVariant>.5)vNormal=normalize(normalMatrix*vec3(-1.2*cos(p.x*8.),0,1));':''}vView=(modelViewMatrix*vec4(p,1)).xyz;gl_Position=projectionMatrix*modelViewMatrix*vec4(p,1);}`;
  const fragment=`uniform float uVariant;uniform float uTime;uniform vec2 uResolution;uniform vec2 uPointer;uniform sampler2D uTexture;uniform vec3 uColor;varying vec2 vUv;varying vec3 vColor;varying vec3 vWorld;varying vec3 vNormal;varying vec3 vView;${[16,17,27].includes(d)?noiseGLSL:''}void main(){${glslBodies[d]}}`;
  return `// ${u.id}: real GLSL ShaderMaterial experiment.
export function mount({THREE,container,locale='ko'}) {
/* GPU_MESSAGES */
${ui(u,'실제 WebGL ShaderMaterial입니다. 조건을 바꾸고 GLSL 소스의 식을 편집하세요. 수치·시간 결과는 장치와 해상도에 따라 달라집니다.')}
  const renderer=new THREE.WebGLRenderer({canvas,antialias:true});renderer.setPixelRatio(1);
  const scene=new THREE.Scene();const camera=${[18,19,20].includes(d)?'new THREE.PerspectiveCamera(45,640/360,.1,20)':'new THREE.OrthographicCamera(-1,1,1,-1,.1,20)'};camera.position.z=3;
  const pixels=new Uint8Array(16*16*4);for(let y=0;y<16;y++)for(let x=0;x<16;x++){const i=(y*16+x)*4,v=(x+y)%2?255:0;pixels.set([v,80,255-v,255],i);}
  const texture=new THREE.DataTexture(pixels,16,16,THREE.RGBAFormat);texture.magFilter=THREE.NearestFilter;texture.minFilter=THREE.NearestFilter;texture.needsUpdate=true;
  const uniforms={uVariant:{value:0},uTime:{value:0},uResolution:{value:new THREE.Vector2(640,360)},uPointer:{value:new THREE.Vector2(.5,.5)},uTexture:{value:texture},uColor:{value:new THREE.Color(1,.1,.1)}};
  const geometry=${[18,19].includes(d)?'new THREE.SphereGeometry(.8,48,32)':'new THREE.PlaneGeometry(2,2,64,64)'};
  ${d===4?"const colors=Float32Array.from({length:geometry.attributes.position.count*3},(_,i)=>{const j=Math.floor(i/3),x=geometry.attributes.position.getX(j),y=geometry.attributes.position.getY(j);return i%3===0?(1-x)/2:i%3===1?(1+y)/2:(1+x)/2;});geometry.setAttribute('aColor',new THREE.BufferAttribute(colors,3));":''}
  const material=new THREE.ShaderMaterial({uniforms,vertexShader:${JSON.stringify(vertex)},fragmentShader:${JSON.stringify(fragment)},side:THREE.DoubleSide,transparent:${d===21},depthTest:${d!==21},depthWrite:${d!==21}});
  const mesh=new THREE.Mesh(geometry,material);scene.add(mesh);
  ${d===21?"mesh.scale.set(.65,.65,1);mesh.position.x=-.25;const backMaterial=material.clone();backMaterial.uniforms.uColor.value=new THREE.Color(.1,.2,1);const back=new THREE.Mesh(geometry,backMaterial);back.position.set(.25,0,-.1);back.scale.set(.65,.65,1);scene.add(back);":''}
  ${d===22?"const target=new THREE.WebGLRenderTarget(640,360);const firstScene=new THREE.Scene();const firstMaterial=new THREE.ShaderMaterial({vertexShader:'varying vec2 p;void main(){p=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1);}',fragmentShader:'varying vec2 p;void main(){gl_FragColor=vec4(vec3(step(.5,fract(p.x*90.))*step(.5,fract(p.y*50.))),1);}'});firstScene.add(new THREE.Mesh(geometry,firstMaterial));uniforms.uTexture.value=target.texture;":''}
  let active=true,frame=0,last=performance.now(),sampleStart=last,frames=0;const pointer=new THREE.Vector2(.5,.5);
  const onPointer=event=>{const rect=canvas.getBoundingClientRect();pointer.set((event.clientX-rect.left)/rect.width,1-(event.clientY-rect.top)/rect.height);};canvas.addEventListener('pointermove',onPointer);
  function apply(){const v=choice.selectedIndex;uniforms.uVariant.value=v;
    ${d===5?'mesh.position.x=v;':''}
    ${d===11?'texture.wrapS=texture.wrapT=v?THREE.RepeatWrapping:THREE.ClampToEdgeWrapping;texture.needsUpdate=true;':''}
    ${d===18?'mesh.scale.set(v?2:1,1,v?.5:1);':''}
    ${d===21?'mesh.renderOrder=v?2:1;back.renderOrder=v?1:2;':''}
    ${d===22?'target.setSize(v?320:640,v?180:360);':''}
    ${d===26?`const gl=renderer.getContext();const shader=gl.createShader(gl.FRAGMENT_SHADER);gl.shaderSource(shader,v?'precision mediump float;void main(){gl_FragColor = ;}':'precision mediump float;void main(){gl_FragColor=vec4(1.);}');gl.compileShader(shader);const ok=gl.getShaderParameter(shader,gl.COMPILE_STATUS);output.textContent=ok?messages.display007:gl.getShaderInfoLog(shader)+messages.display008;gl.deleteShader(shader);return;`:''}
    ${d===27?'renderer.setSize(v?320:640,v?180:360,false);uniforms.uResolution.value.set(v?320:640,v?180:360);':''}
    output.textContent=messages.display003+messages.${d===26?'display009':'display007'}+choice.options[v].text+'\\n'+messages.${d===26?'display010':'display008'};
  }
  renderer.setSize(640,360,false);apply();button.onclick=apply;choice.onchange=apply;
  function tick(now){if(!active)return;const dt=Math.min(.1,(now-last)/1000);last=now;uniforms.uTime.value=now/1000;uniforms.uPointer.value.lerp(pointer,1-Math.exp(-${d===24?'(choice.selectedIndex?16:4)':'12'}*dt));
    ${d===22?'renderer.setRenderTarget(target);renderer.render(firstScene,camera);renderer.setRenderTarget(null);':''}
    renderer.render(scene,camera);frames++;
    ${d===25?"if(now-sampleStart>1500){output.textContent=messages.display009+((now-sampleStart)/frames).toFixed(2)+messages.display010+(choice.selectedIndex?8:1);sampleStart=now;frames=0;}":''}
    frame=requestAnimationFrame(tick);
  }frame=requestAnimationFrame(tick);
  return ()=>{active=false;cancelAnimationFrame(frame);canvas.removeEventListener('pointermove',onPointer);button.onclick=null;choice.onchange=null;${d===21?'backMaterial.dispose();':''}${d===22?'target.dispose();firstMaterial.dispose();':''}geometry.dispose();material.dispose();texture.dispose();renderer.dispose();renderer.forceContextLoss();container.replaceChildren();};
}

`;
}

const gsBodies={
2:`const size=variant?1048577:1024;const blob=new Blob([new Uint8Array(size)]);const manifest={id:'synthetic-fixture-v1',source:'generated locally by this example',license:'CC0 synthetic coordinates',bytes:blob.size,format:'toy-json',trained:false};if(blob.size>1048576){log({status:'rejected',code:'SIZE_LIMIT',manifest});return;}log({status:'accepted-before-parse',manifest});`,
3:`const points=[{x:0,y:0,z:0},{x:0,y:variant?0:.6,z:variant?.6:0}];clear();ctx.strokeStyle='#fff';ctx.beginPath();points.forEach((p,i)=>{const q=project(p,3);if(i)ctx.lineTo(q.x,q.y);else ctx.moveTo(q.x,q.y);});ctx.stroke();for(const p of points){const q=project(p,3);draw({...q,sx:8,sy:8,angle:0,color:[40,180,255],opacity:1});}log({upAxis:variant?messages.display008:messages.display004,points,note:messages.display009});`,
4:`const angle=variant?Math.PI/2:0,q=[0,0,Math.sin(angle/2),Math.cos(angle/2)];const theta=2*Math.atan2(q[2],q[3]);clear();draw({x:200,y:180,sx:70,sy:20,angle:theta,color:[40,180,255],opacity:.9});draw({x:440,y:180,sx:40,sy:40,angle:theta,color:[255,160,40],opacity:.9});log({quaternionXYZW:q,angleDegrees:theta*180/Math.PI,note:messages.display008});`,
5:`const sx=variant?.2:.1,sy=.04,theta=.6,c=Math.cos(theta),s=Math.sin(theta);const covariance=[[c*c*sx*sx+s*s*sy*sy,c*s*(sx*sx-sy*sy)],[c*s*(sx*sx-sy*sy),s*s*sx*sx+c*c*sy*sy]];clear();draw({x:320,y:180,sx:sx*400,sy:sy*400,angle:theta,color:[70,210,160],opacity:1});log({scale:[sx,sy],eigenvalues:[sx*sx,sy*sy],covariance});`,
6:`const distance=variant?4:2,focal=280,worldScale=.2;const q=project({x:.2,y:0,z:0},distance);clear();draw({...q,sx:focal*worldScale/distance,sy:focal*.07/distance,angle:.3,color:[100,170,255],opacity:1});log({distance,focalPixels:focal,sigmaPixels:focal*worldScale/distance,jacobian:[[focal/distance,0,-focal*.2/(distance*distance)],[0,focal/distance,0]],note:messages.display008});`,
7:`const opacity=variant?1:.5;clear();draw({x:320,y:180,sx:75,sy:35,angle:.3,color:[60,200,255],opacity});log({opacity,samples:[0,1,2,3].map(r=>({mahalanobisRadius:r,alpha:opacity*Math.exp(-.5*r*r)})),note:messages.display008});`,
8:`clear();const a={x:290,y:180,sx:65,sy:45,angle:0,color:[255,0,0],opacity:.6},b={...a,x:350,color:[0,0,255]};for(const p of variant?[b,a]:[a,b])draw(p);const center=ctx.getImageData(320,180,1,1).data;log({order:variant?messages.display008:messages.display009,centerRGBA:Array.from(center),formula:'Cout = Cs * alpha_s + Cd * (1-alpha_s)',note:messages.display010});`,
9:`const angle=variant?Math.PI/2:0;const objects=[{x:-.3,y:0,z:.3,color:[255,80,50]},{x:.3,y:0,z:-.3,color:[40,130,255]}];const sorted=objects.map(p=>({...p,depth:p.x*Math.sin(angle)+p.z*Math.cos(angle),screenX:p.x*Math.cos(angle)-p.z*Math.sin(angle)})).sort((a,b)=>b.depth-a.depth);clear();for(const p of sorted)draw({x:320+p.screenX*150,y:180,sx:90,sy:40,angle:.4,color:p.color,opacity:.65});log({angleDegrees:angle*180/Math.PI,centerDepthOrder:sorted.map(p=>p.depth),note:messages.display008});`,
10:`const properties=variant?['x','y','z']:['x','y','z','scale_0','scale_1','scale_2','rot_0','rot_1','rot_2','rot_3','opacity','f_dc_0','f_dc_1','f_dc_2'];const header=['ply','format ascii 1.0','element vertex 1',...properties.map(p=>'property float '+p),'end_header'].join('\\n');const parsed=header.split('\\n').filter(l=>l.startsWith('property float ')).map(l=>l.slice(15));const required=['x','y','z','scale_0','scale_1','scale_2','rot_0','rot_1','rot_2','rot_3','opacity','f_dc_0','f_dc_1','f_dc_2'];const missing=required.filter(p=>!parsed.includes(p));log({header,kind:missing.length?messages.display008:messages.display009,missing,note:messages.display010});`,
11:`const encoded=variant?Math.log(.1):.1;const decoded=variant?Math.exp(encoded):encoded;const quaternion=[0,0,0,1],norm=Math.hypot(...quaternion);const opacity=1/(1+Math.exp(-0));const valid=Number.isFinite(decoded)&&decoded>0&&norm>1e-8;clear();if(valid)draw({x:320,y:180,sx:decoded*500,sy:decoded*200,angle:0,color:[80,210,160],opacity});log({encoding:variant?'log':'raw',encoded,decoded,normalizedQuaternion:quaternion.map(x=>x/norm),sigmoidOpacity:opacity,valid});`,
12:`clear();const samples=[];for(let i=0;i<8;i++){const angle=i/8*Math.PI*2;const direction=[Math.cos(angle),Math.sin(angle),0];const dc=.2820947918*.8,first=variant?.4886025119*direction[0]*.6:0;const value=Math.max(0,Math.min(1,.5+dc+first));samples.push({direction,value});draw({x:320+Math.cos(angle)*180,y:180+Math.sin(angle)*110,sx:28,sy:20,angle,color:[value*255,100,255-value*255],opacity:1});}log({syntheticSH:true,samples,note:messages.display008});`,
13:`const accepted=[];let request=0;const load=(name,delay)=>{const id=++request;return new Promise(resolve=>{const timer=setTimeout(()=>{timers.delete(timer);if(!isCurrent()||id!==request){resolve(name+messages.display008);return;}clear();draw({x:320,y:180,sx:60,sy:35,angle:0,color:name==='A'?[255,120,40]:[40,150,255],opacity:1});accepted.push(name);resolve(name+messages.display009);},delay);timers.add(timer);});};const a=load('A',variant?140:20),b=load('B',variant?20:140);const outcomes=await Promise.all([a,b]);log({outcomes,accepted,lastSelection:'B',note:messages.display010});`,
15:`const radius=variant?24:8;clear();const projected=data.slice(0,80).map(p=>({...p,...project(p,3)}));for(const p of projected)draw({...p,sx:6,sy:3,angle:0,opacity:.6});const pick=(x,y)=>{const candidates=projected.filter(p=>Math.hypot(p.x-x,p.y-y)<=radius);ctx.strokeStyle='#fff';ctx.beginPath();ctx.arc(x,y,radius,0,Math.PI*2);ctx.stroke();log({radius,candidateIds:candidates.map(p=>p.id),note:messages.display008});};canvas.onclick=event=>{const r=canvas.getBoundingClientRect();pick((event.clientX-r.left)*canvas.width/r.width,(event.clientY-r.top)*canvas.height/r.height);};pick(320,180);`,
16:`const objects=[{x:-25,y:180,sx:25,sy:20,angle:0,color:[255,150,40],opacity:1},{x:320,y:180,sx:40,sy:30,angle:0,color:[40,170,255],opacity:1},{x:670,y:150,sx:20,sy:15,angle:0,color:[255,90,150],opacity:1}];const visible=objects.filter(p=>variant?p.x+3*p.sx>=0&&p.x-3*p.sx<640:p.x>=0&&p.x<640);clear();visible.forEach(draw);log({rule:variant?messages.display008:messages.display009,processed:visible.length,total:objects.length,note:messages.display010});`,
17:`const period=variant?4:1;let frameIndex=0,sorts=0,ordered=[];function tick(){if(!isCurrent())return;const angle=frameIndex*.04;const projected=data.slice(0,64).map(p=>({...p,depth:p.x*Math.sin(angle)+p.z*Math.cos(angle),px:320+(p.x*Math.cos(angle)-p.z*Math.sin(angle))*170}));if(frameIndex%period===0){ordered=projected.slice().sort((a,b)=>b.depth-a.depth).map(p=>p.id);sorts++;}clear();for(const id of ordered){const p=projected.find(x=>x.id===id);draw({x:p.px,y:180-p.y*110,sx:14,sy:7,angle:.3,color:p.color,opacity:.5});}log({frame:frameIndex,sorts,period,staleFrames:frameIndex%period});frameIndex++;raf=requestAnimationFrame(tick);}tick();`,
18:`canvas.width=variant?320:640;canvas.height=variant?180:360;renderData(data.slice(0,128),0);log({renderScale:variant?.5:1,pixels:canvas.width*canvas.height,note:messages.display008});`,
19:`const count=variant?128:256;const kept=data.slice(0,count);renderData(kept,0);log({sourceCount:256,kept:count,policy:messages.display008,note:messages.display009});`,
20:`clear(variant?'white':'black');draw({x:320,y:180,sx:80,sy:35,angle:.4,color:[60,140,255],opacity:.5});log({background:variant?'white':'black',blend:messages.display008,note:messages.display009});`,
21:`renderData(data,0);const reference=ctx.getImageData(0,0,canvas.width,canvas.height);renderData(data.slice(0,128),0);const reduced=ctx.getImageData(0,0,canvas.width,canvas.height);const roi=variant?{x:300,y:60,w:40,h:240}:{x:0,y:0,w:640,h:360};let sum=0,n=0;for(let y=roi.y;y<roi.y+roi.h;y++)for(let x=roi.x;x<roi.x+roi.w;x++)for(let c=0;c<3;c++){const i=(y*640+x)*4+c;sum+=(reference.data[i]-reduced.data[i])**2;n++;}ctx.strokeStyle='#fff';ctx.strokeRect(roi.x,roi.y,roi.w,roi.h);log({roi,byteRGB_MSE:sum/n,reference:messages.display008,candidate:messages.display009,note:messages.display010});`,
22:`const count=variant?512:64,input=makeData(count);const t0=performance.now();const projected=input.map(p=>({...p,...project(p,3)}));const t1=performance.now();projected.sort((a,b)=>b.depth-a.depth);const t2=performance.now();clear();for(const p of projected)draw({...p,sx:8,sy:4,angle:.2,opacity:.6});const t3=performance.now();log({count,cpuProjectionMs:t1-t0,cpuSortMs:t2-t1,cpuCanvasSubmissionMs:t3-t2,note:messages.display008});`,
23:`let currentData=[];const loops=variant?10:1;const counts=[];for(let i=0;i<loops;i++){currentData=[];currentData=makeData(64);counts.push(currentData.length);}renderData(currentData,0);log({replacements:loops,currentReferences:currentData.length,counts,activeAnimationLoops:0,note:messages.display008});`,
24:`let cameraX=0;const speed=variant?.1:.01;const update=()=>{clear();for(const p of data.slice(0,100)){const q=project({...p,x:p.x-cameraX},3);draw({...q,sx:8,sy:4,angle:0,color:p.color,opacity:.7});}log({cameraX,speed,keys:messages.display008});};canvas.tabIndex=0;canvas.onkeydown=event=>{if(event.key==='ArrowLeft')cameraX-=speed;if(event.key==='ArrowRight')cameraX+=speed;if(event.key==='Home')cameraX=0;if(['ArrowLeft','ArrowRight','Home'].includes(event.key)){event.preventDefault();update();}};update();`,
25:`const fixtures=variant?[{id:'empty',points:[]},{id:'nonfinite',points:[{x:NaN}]},{id:'oversize',points:makeData(513)},{id:'valid',points:makeData(32)}]:[{id:'valid',points:makeData(32)}];const states=[];for(const f of fixtures){let error=!f.points.length?'EMPTY':f.points.length>512?'COUNT_LIMIT':f.points.some(p=>!Number.isFinite(p.x))?'NONFINITE':null;states.push({id:f.id,state:error?'error':'ready',error});if(!error)renderData(f.points,0);}log({states,last:states[states.length-1],note:messages.display008});`,
26:`canvas.width=variant?320:640;canvas.height=variant?180:360;const times=[];let index=0,previous=0;function tick(now){if(!isCurrent())return;if(previous)times.push(now-previous);previous=now;const angle=index/60*Math.PI*2;renderData(data,angle);index++;if(index<61){raf=requestAnimationFrame(tick);return;}const sorted=times.slice().sort((a,b)=>a-b);const report={fixture:'synthetic-seed-17-v1',path:messages.display008,frames:times.length,renderScale:variant?.5:1,medianRafMs:sorted[Math.floor(sorted.length*.5)],p95RafMs:sorted[Math.floor(sorted.length*.95)],note:messages.display009};log(report);}raf=requestAnimationFrame(tick);`,
27:`const fresh=makeData(256),signature=fresh.reduce((sum,p)=>sum+p.x+p.y+p.z,0);renderData(fresh,0);log({manifest:{id:'synthetic-seed-17-v1',source:'local deterministic formula',license:'CC0 generated coordinates',renderer:'CPU Canvas2D Gaussian approximation',count:fresh.length,trained:false},signature,checks:{freshData:true,finite:fresh.every(p=>Number.isFinite(p.x+p.y+p.z)),noNetwork:true},limits:[messages.display008,messages.display009,messages.display010,messages.display011]});`,
};

function gsTemplate(u){return `// ${u.id}: deliberately small CPU teaching experiment, not a trained GS renderer.
export function mount({container,locale='ko'}) {
/* GPU_MESSAGES */
${ui(u,'CPU Canvas2D 합성 fixture · 학습 데이터 없음 · Spark/GPU 렌더러 아님. 3D Gaussian의 일부 수학과 로더 계약만 작은 입력으로 실험합니다.')}
  const ctx=canvas.getContext('2d');if(!ctx)throw new Error(messages.display007);
  let active=true,generation=0,raf=0;const timers=new Set();
  function clear(background='#07111f'){ctx.globalCompositeOperation='source-over';ctx.fillStyle=background;ctx.fillRect(0,0,canvas.width,canvas.height);}
  function draw(p){ctx.save();ctx.translate(p.x,p.y);ctx.rotate(p.angle);ctx.scale(p.sx,p.sy);const gradient=ctx.createRadialGradient(0,0,0,0,0,3);for(let i=0;i<=24;i++){const r=i/8;gradient.addColorStop(i/24,'rgba('+p.color.map(x=>Math.round(x)).join(',')+','+(i===24?0:p.opacity*Math.exp(-.5*r*r))+')');}ctx.fillStyle=gradient;ctx.fillRect(-3,-3,6,6);ctx.restore();}
  function project(p,distance){const depth=Math.max(.1,distance+p.z);return {x:320+p.x*280/depth,y:180-p.y*280/depth,depth};}
  function makeData(count){return Array.from({length:count},(_,i)=>({id:i,x:Math.sin(i*2.399)*(.2+(i%17)/17),y:Math.cos(i*2.399)*(.2+(i%17)/17),z:Math.sin(i*.7)*.4,color:[50+(i*17)%190,80+(i*13)%170,130+(i*7)%125]}));}
  const data=makeData(256);
  function renderData(points,angle){clear();const scale=canvas.width/640;const list=points.map(p=>{const x=p.x*Math.cos(angle)-p.z*Math.sin(angle),z=p.x*Math.sin(angle)+p.z*Math.cos(angle);return {...p,...project({...p,x,z},3)};}).sort((a,b)=>b.depth-a.depth);ctx.save();ctx.scale(scale,scale);for(const p of list)draw({...p,sx:6,sy:3,angle:.3,opacity:.65});ctx.restore();}
  async function run(){generation++;const token=generation;cancelAnimationFrame(raf);canvas.onclick=null;canvas.onkeydown=null;canvas.width=640;canvas.height=360;clear();const variant=choice.selectedIndex;const isCurrent=()=>active&&token===generation;const log=value=>{if(isCurrent())output.textContent=JSON.stringify(value,null,2);};try{${gsBodies[u.day]}}catch(error){log({error:String(error)});}}
  button.onclick=()=>{void run();};choice.onchange=()=>{void run();};void run();
  return ()=>{active=false;generation++;cancelAnimationFrame(raf);for(const timer of timers)clearTimeout(timer);timers.clear();canvas.onclick=null;canvas.onkeydown=null;button.onclick=null;choice.onchange=null;container.replaceChildren();};
}
`;}

const noteOverrides={
  "webgpu-step-16": "실제 WebGPU/WGSL 실행. HTTPS/localhost와 지원 adapter 필요; 미지원 환경에는 사유를 표시하며 CPU 결과를 GPU로 대체하지 않습니다. 두 선택 모두 고정 경계에서 입력·출력 buffer를 분리해 4단계 ping-pong을 실행합니다. 제자리 쓰기는 실행하지 않으며 두 번째 선택은 그 위험을 검토하는 안내입니다.",
  "glsl-step-07": "브라우저 WebGL ShaderMaterial 실행. 고정 640×360 비교이며 프레임 간격은 GPU 시간과 다릅니다. 제공된 최종 색 식의 smoothstep(.5,.1,...)은 edge0 >= edge1이므로 결과가 정의되지 않습니다. 정상 기준 화면으로 해석하지 마세요. 브라우저 실패를 실행으로 확인한 것은 아닙니다. UV 직접 출력과 진단 과제는 별도로 관찰하세요.",
  "glsl-step-17": "브라우저 WebGL ShaderMaterial 실행. 고정 640×360 비교이며 프레임 간격은 GPU 시간과 다릅니다. 제공된 선택은 octave 수 1/5와 noise 보간식을 함께 바꿉니다. 이 비교만으로 octave 수의 효과를 분리해 판단할 수 없습니다. 보간식을 고정한 비교는 별도 과제입니다.",
  "glsl-step-26": "브라우저 WebGL ShaderMaterial 실행. 고정 640×360 비교이며 프레임 간격은 GPU 시간과 다릅니다. 제공된 예제는 독립 fragment shader만 compile하고 원문 compiler log를 표시하며 기존 ShaderMaterial 화면을 유지합니다. 성공한 candidate program 설치·교체나 context 복구는 구현하지 않습니다.",
  "glsl-step-27": "브라우저 WebGL ShaderMaterial 실행. 640×360/320×180 비교이며 프레임 간격은 GPU 시간과 다릅니다. 제공된 선택은 전체/절반 해상도와 noise 보간식을 함께 바꾸며 4 octave는 유지합니다. 해상도만 바꾼 통제 비교로 해석할 수 없습니다. 보간식을 고정한 비교는 별도 과제입니다.",
  "gaussian-splatting-step-19": "CPU Canvas2D 합성 fixture와 계약 검사. Spark GPU·학습 데이터·재구성 품질·GPU 성능 주장을 제공하지 않습니다. 제공된 예제는 data.slice(0,count)로 앞의 N개를 유지합니다. seed 기반 선택과 opacity 선택 정책은 별도 과제이며 화면 기여도 기반 pruning은 구현하지 않습니다.",
  "gaussian-splatting-step-21": "CPU Canvas2D 합성 fixture와 계약 검사. Spark GPU·학습 데이터·재구성 품질·GPU 성능 주장을 제공하지 않습니다. 제공된 예제는 동일 카메라의 256/128 synthetic splat 이미지에서 byte RGB의 평균제곱오차(byteRGB_MSE)를 계산합니다. 과제의 평균절대오차와 여러 시점 비교는 별도로 구현해야 합니다.",
  "gaussian-splatting-step-26": "CPU Canvas2D 합성 fixture와 계약 검사. Spark GPU·학습 데이터·재구성 품질·GPU 성능 주장을 제공하지 않습니다. 제공된 예제는 frame index 기준 카메라 tick 61개와 rAF 간격 60개를 한 번 수집합니다. 과제의 시간 기반 경로와 설정별 3회 반복은 별도 구현이며 GPU 시간 측정이 아닙니다."
};

for(const series of ['webgpu','wgsl','glsl','gaussian-splatting']){
  const curriculum=JSON.parse(fs.readFileSync(path.join(root,'content/curricula',series+'.json'),'utf8'));
  if(process.argv[2] && process.argv[2]!==series)continue;
  const metadata={};let count=0;
  const legacyIds=new Set(JSON.parse(fs.readFileSync('content/catalog-v2.json','utf8')).units.filter(unit=>unit.seriesId===series).map(unit=>unit.id))
  Object.assign(metadata,Object.fromEntries(Object.entries(JSON.parse(fs.readFileSync('content/examples/'+series+'.json','utf8'))).filter(([id])=>legacyIds.has(id))))
  for(const u of curriculum.units){
    if(!u.id.includes('-step-'))continue;
    const note=noteOverrides[u.id]??(series==='gaussian-splatting'?'CPU Canvas2D 합성 fixture와 계약 검사. Spark GPU·학습 데이터·재구성 품질·GPU 성능 주장을 제공하지 않습니다.':series==='glsl'?'브라우저 WebGL ShaderMaterial 실행. 고정 640×360 비교이며 프레임 간격은 GPU 시간과 다릅니다.':'실제 WebGPU/WGSL 실행. HTTPS/localhost와 지원 adapter 필요; 미지원 환경에는 사유를 표시하며 CPU 결과를 GPU로 대체하지 않습니다.');
    let source=series==='glsl'?glslTemplate(u):series==='gaussian-splatting'?gsTemplate(u):gpuTemplate(u,(series==='wgsl'?wgsl:webgpu)[u.day],note);
    if(source.includes('undefined'))throw new Error('Missing implementation '+u.id);
    source=source.trimEnd()+String.fromCharCode(10);
    const localized=localizeExampleSource(u.id,source,{}, {messagesMarker:'/* GPU_MESSAGES */'});source=localized.source;
    const dir=path.join(root,'src/labs',u.id);fs.mkdirSync(dir,{recursive:true});writeGeneratedFile(path.join(dir,'example.js'),source);
    metadata[u.id]={mode:'browser',note,readingSource:localized.readingSource};count++;
  }
  if(count!==25)throw new Error(series+': expected 25, got '+count);
  fs.mkdirSync(path.join(root,'content/examples'),{recursive:true});writeGeneratedFile(path.join(root,'content/examples',series+'.json'),JSON.stringify(metadata,null,2)+'\n');
  console.log(series+': '+count+' standalone examples');
}
