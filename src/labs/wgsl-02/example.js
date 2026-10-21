// Edit the WGSL and byte offsets together; actual GPU validation remains enabled.
export async function mount({ container }) {
  const root = document.createElement('section'); root.style.cssText='padding:12px;color:#dce7f7;background:#102037;min-height:100%;box-sizing:border-box'; container.append(root)
  root.innerHTML='<h3>WGSL binding and byte layout</h3><p>Two independent uniform fields: red at byte 0 and translation at byte 16. Move both controls and compare the layout below.</p><label>Red <input type="range" min="0" max="1" step="0.01" value="0.3"></label> <label>Translation X <input type="range" min="-0.5" max="0.5" step="0.01" value="0"></label> <button>Trigger validation / recover</button><pre aria-live="polite"></pre>'
  const status=root.querySelector('pre'); const sliders=root.querySelectorAll('input'); const button=root.querySelector('button')
  /** @type {any} */ const gpu = /** @type {any} */ (navigator).gpu
  if(!gpu) { status.textContent='WebGPU unavailable. Use a supported browser on HTTPS/localhost. Controls require a real GPU.'; return ()=>root.remove() }
  const adapter=await gpu.requestAdapter(); if(!adapter){status.textContent='No GPU adapter available.';return ()=>root.remove()}
  const device=await adapter.requestDevice(); let alive=true
  const canvas=document.createElement('canvas'); canvas.style.cssText='width:100%;height:230px';root.append(canvas)
  /** @type {any} */ const context=canvas.getContext('webgpu'); const format=gpu.getPreferredCanvasFormat()
  if(!context){device.destroy();throw Error('WebGPU context unavailable')}
  const code=`struct Params { color: vec4f, offset: vec2f, scale: f32, padding: f32, };
@group(0) @binding(0) var<uniform> params: Params;
@vertex fn vs(@builtin(vertex_index) i:u32)->@builtin(position) vec4f {
 let p=array<vec2f,3>(vec2f(0,0.7),vec2f(-0.65,-0.6),vec2f(0.65,-0.6));
 return vec4f(p[i]*params.scale+params.offset,0,1);
}
@fragment fn fs()->@location(0) vec4f { return params.color; }`;
  const shader=device.createShaderModule({code}); const info=await shader.getCompilationInfo()
  const errors=info.messages.filter(m=>m.type==='error'); if(errors.length){device.destroy();throw Error(errors.map(m=>m.message).join('\n'))}
  const pipeline=await device.createRenderPipelineAsync({layout:'auto',vertex:{module:shader,entryPoint:'vs'},fragment:{module:shader,entryPoint:'fs',targets:[{format}]}})
  // GPUBufferUsage.UNIFORM=64, COPY_DST=8. 32 bytes, 16-byte struct alignment.
  const buffer=device.createBuffer({size:32,usage:64|8}); const data=new Float32Array([.3,.65,1,1,0,0,.75,0])
  const group=device.createBindGroup({layout:pipeline.getBindGroupLayout(0),entries:[{binding:0,resource:{buffer}}]})
  const draw=()=>{
    if(!alive)return;data[0]=Number(sliders[0].value);data[4]=Number(sliders[1].value);device.queue.writeBuffer(buffer,0,data)
    canvas.width=Math.max(1,Math.round(canvas.clientWidth*devicePixelRatio));canvas.height=Math.max(1,Math.round(230*devicePixelRatio))
    context.configure({device,format,alphaMode:'opaque'}); const encoder=device.createCommandEncoder()
    const pass=encoder.beginRenderPass({colorAttachments:[{view:context.getCurrentTexture().createView(),clearValue:{r:.025,g:.05,b:.09,a:1},loadOp:'clear',storeOp:'store'}]})
    pass.setPipeline(pipeline);pass.setBindGroup(0,group);pass.draw(3);pass.end();device.queue.submit([encoder.finish()])
    status.textContent='CPU → writeBuffer → group 0 / binding 0 → render pass → submit\ncolor vec4f: bytes 0–15 | offset vec2f: 16–23 | scale: 24–27 | padding: 28–31\nred='+data[0].toFixed(2)+'; offset.x='+data[4].toFixed(2)+'; allocation=32 bytes'
  }
  button.onclick=async()=>{button.disabled=true;device.pushErrorScope('validation');const invalid=device.createBuffer({size:4,usage:1|64}); const error=await device.popErrorScope();invalid.destroy();if(alive){draw();status.textContent+='\nIntentional MAP_READ | UNIFORM error: '+(error?.message??'No diagnostic returned');button.disabled=false}}
  sliders.forEach(input=>input.oninput=draw);const observer=new ResizeObserver(draw);observer.observe(canvas);draw()
  device.lost.then(info=>{if(alive)status.textContent='Device lost: '+info.message})
  return ()=>{alive=false;observer.disconnect();buffer.destroy();context.unconfigure();device.destroy();root.remove()}
}
