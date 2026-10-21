// wgsl-step-17: Workgroup 메모리와 협력
// GPUBufferUsage: MAP_READ=1, COPY_SRC=4, COPY_DST=8, VERTEX=32, UNIFORM=64, STORAGE=128.
export function mount({container}) {

  container.style.cssText = 'overflow:auto;background:#101827;color:#e5edf8;font:14px system-ui;padding:12px;box-sizing:border-box';
  const title=document.createElement('h3'); title.textContent="Workgroup 메모리와 협력";
  const help=document.createElement('p'); help.textContent="실제 WebGPU/WGSL 실행. HTTPS/localhost와 지원 adapter 필요; 미지원 환경에는 사유를 표시하며 CPU 결과를 GPU로 대체하지 않습니다.";
  const choice=document.createElement('select'); choice.setAttribute('aria-label',"남는 lane 값");
  for(const text of ["0으로 초기화","중립값 아닌 1"]) { const o=document.createElement('option');o.textContent=text;choice.append(o); }
  const button=document.createElement('button'); button.textContent='실행 / 다시 초기화';
  const output=document.createElement('pre'); output.style.cssText='white-space:pre-wrap;overflow-wrap:anywhere'; output.setAttribute('aria-live','polite');
  const canvas=document.createElement('canvas'); canvas.width=640;canvas.height=360;canvas.style.cssText='width:100%;height:auto;max-height:360px;object-fit:contain';
  container.append(title,help,choice,button,canvas,output);

  let active=true, generation=0, release=()=>{};
  async function run() {
    const token=++generation;release();release=()=>{};button.disabled=true;
    const current=()=>active && token===generation;
    const log=value=>{if(current())output.textContent=typeof value==='string'?value:JSON.stringify(value,null,2);};
    const variant=choice.selectedIndex;
    /** @type {any} */ const gpu=navigator['gpu'];
    if(!globalThis.isSecureContext || !gpu) {log('WebGPU 미지원: HTTPS/localhost와 지원 브라우저가 필요합니다. CPU 결과를 GPU 실행으로 표시하지 않습니다.');button.disabled=false;return;}
    /** @type {any} */ let device;
    const resources=[];let context;
    const dispose=()=>{for(const r of resources)r.destroy();resources.length=0;context?.unconfigure();device?.destroy();};
    try {
      const adapter=await gpu.requestAdapter();if(!current())return;
      if(!adapter)throw new Error('사용 가능한 adapter가 없습니다.');
      const optional=false && adapter.features.has('timestamp-query')?['timestamp-query']:[];
      device=await adapter.requestDevice({requiredFeatures:optional});
      if(!current()){device.destroy();return;} release=dispose;
      device.lost.then(info=>{if(current())log('Device lost: '+info.reason+' — 실행 버튼으로 새 장치를 요청하세요.');});
      device.addEventListener('uncapturederror',event=>log('GPU validation: '+event.error.message));
      const buffer=(data,usage=128|4|8)=>{const bytes=typeof data==='number'?Math.max(4,data):data.byteLength;const b=device.createBuffer({size:Math.ceil(bytes/4)*4,usage});resources.push(b);if(typeof data!=='number')device.queue.writeBuffer(b,0,data);return b;};
      const read=async(b,size)=>{const staging=buffer(size,1|8);const e=device.createCommandEncoder();e.copyBufferToBuffer(b,0,staging,0,size);device.queue.submit([e.finish()]);await staging.mapAsync(1);if(!current()){staging.unmap();throw new Error('Cancelled');}const result=new Float32Array(staging.getMappedRange().slice(0));staging.unmap();return result;};
      const compile=async(code)=>{const m=device.createShaderModule({code});const info=await m.getCompilationInfo();if(!current())throw new Error('Cancelled');const errors=info.messages.filter(x=>x.type==='error');if(errors.length)throw new Error(errors.map(x=>'line '+x.lineNum+': '+x.message).join('\n'));return m;};
      const compute=async(code,entries,groups,constants={})=>{const module=await compile(code);const p=await device.createComputePipelineAsync({layout:'auto',compute:{module,entryPoint:'main',constants}});if(!current())throw new Error('Cancelled');device.pushErrorScope('validation');const bind=device.createBindGroup({layout:p.getBindGroupLayout(0),entries});const e=device.createCommandEncoder();const pass=e.beginComputePass();pass.setPipeline(p);pass.setBindGroup(0,bind);pass.dispatchWorkgroups(...groups);pass.end();device.queue.submit([e.finish()]);const error=await device.popErrorScope();if(!current())throw new Error('Cancelled');if(error)throw new Error(error.message);};
      const setupCanvas=()=>{context=canvas.getContext('webgpu');if(!context)throw new Error('WebGPU canvas 불가');const format=gpu.getPreferredCanvasFormat();context.configure({device,format,alphaMode:'opaque'});return format;};
      const triangle=`@vertex fn vs(@builtin(vertex_index) i:u32)->@builtin(position) vec4f {let p=array<vec2f,3>(vec2f(-.7,-.6),vec2f(.7,-.6),vec2f(0,.7));return vec4f(p[i],0,1);}
      @fragment fn fs()->@location(0) vec4f{return vec4f(.2,.7,1,1);}`;
      const render=async(code=triangle,options={})=>{const format=setupCanvas();const module=await compile(code);const p=await device.createRenderPipelineAsync({layout:'auto',vertex:{module,entryPoint:'vs'},fragment:{module,entryPoint:'fs',targets:[{format}]},...options});if(!current())throw new Error('Cancelled');const e=device.createCommandEncoder();const pass=e.beginRenderPass({colorAttachments:[{view:context.getCurrentTexture().createView(),clearValue:[.02,.04,.08,1],loadOp:'clear',storeOp:'store'}]});pass.setPipeline(p);pass.draw(3);pass.end();device.queue.submit([e.finish()]);};

const n=65,wg=64;const input=Float32Array.from({length:n},(_,i)=>i%7);const src=buffer(input),dst=buffer(Math.ceil(n/wg)*4);
await compute(`@group(0) @binding(0) var<storage,read> src:array<f32>;
@group(0) @binding(1) var<storage,read_write> dst:array<f32>;var<workgroup> tile:array<f32,64>;
@compute @workgroup_size(64) fn main(@builtin(global_invocation_id) gid:vec3u,@builtin(local_invocation_id) lid:vec3u,@builtin(workgroup_id) group:vec3u){
var value=${variant?1:0}.0;if(gid.x<arrayLength(&src)){value=src[gid.x];}tile[lid.x]=value;workgroupBarrier();
var step=32u;loop {if(lid.x<step){tile[lid.x]+=tile[lid.x+step];}workgroupBarrier();if(step==1u){break;}step/=2u;}
if(lid.x==0u){dst[group.x]=tile[0];}}`,[{binding:0,resource:{buffer:src}},{binding:1,resource:{buffer:dst}}],[Math.ceil(n/wg)]);
const result=await read(dst,Math.ceil(n/wg)*4);log({n,partialSums:Array.from(result),gpuSum:result.reduce((a,b)=>a+b,0),cpuSum:input.reduce((a,b)=>a+b,0),padding:variant?1:0});
    } catch(error){if(current()){log(error instanceof Error?error.message:String(error));dispose();release=()=>{};}}
    finally{if(current())button.disabled=false;}
  }
  button.onclick=()=>{void run();};choice.onchange=()=>{void run();};void run();
  return ()=>{active=false;generation++;release();button.onclick=null;choice.onchange=null;container.replaceChildren();};
}
