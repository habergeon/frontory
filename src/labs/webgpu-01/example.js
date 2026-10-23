// WGSL 정점/색상을 직접 바꿔 보세요. 지원 GPU와 보안 컨텍스트가 필요합니다.
export async function mount({locale='ko', container }) {
  const messages=locale==='en'?{"display001":"WebGPU unavailable: check in a supported browser on HTTPS/localhost.","display002":"No WebGPU adapter is available.","display003":"Failed to create a WebGPU canvas context"}:{"display001":"WebGPU 미지원: 지원 브라우저와 HTTPS/localhost에서 확인하세요.","display002":"사용 가능한 WebGPU adapter가 없습니다.","display003":"WebGPU canvas context 생성 실패"};
  /** @type {any} */ const gpu = navigator['gpu']
  if (!gpu) { container.textContent = messages.display001; return () => container.replaceChildren() }
  const adapter = await gpu.requestAdapter()
  if (!adapter) { container.textContent = messages.display002; return () => container.replaceChildren() }
  const device = await adapter.requestDevice()
  const canvas = document.createElement('canvas'); container.append(canvas)
  /** @type {any} */ const context = canvas.getContext('webgpu')
  if (!context) { device.destroy(); throw new Error(messages.display003) }
  const format = gpu.getPreferredCanvasFormat()
  const module = device.createShaderModule({ code: `
    @vertex fn vertexMain(@builtin(vertex_index) i: u32) -> @builtin(position) vec4f {
      let points = array<vec2f,3>(vec2f(0,0.7),vec2f(-0.7,-0.6),vec2f(0.7,-0.6));
      return vec4f(points[i],0,1);
    }
    @fragment fn fragmentMain() -> @location(0) vec4f { return vec4f(0.19,0.47,0.75,1); }
  ` })
  const diagnostics = await module.getCompilationInfo()
  const errors = diagnostics.messages.filter(message => message.type === 'error')
  if (errors.length) { device.destroy(); throw new Error(errors.map(message => message.message).join('\n')) }
  const pipeline = await device.createRenderPipelineAsync({ layout:'auto', vertex:{ module,entryPoint:'vertexMain' }, fragment:{ module,entryPoint:'fragmentMain',targets:[{format}] } })
  const draw = () => {
    canvas.width = Math.max(1, container.clientWidth); canvas.height = Math.max(1, container.clientHeight)
    context.configure({device,format,alphaMode:'opaque'})
    const encoder = device.createCommandEncoder()
    const pass = encoder.beginRenderPass({colorAttachments:[{view:context.getCurrentTexture().createView(),clearValue:{r:0.93,g:0.95,b:0.97,a:1},loadOp:'clear',storeOp:'store'}]})
    pass.setPipeline(pipeline); pass.draw(3); pass.end(); device.queue.submit([encoder.finish()])
  }
  const observer = new ResizeObserver(draw); observer.observe(container); draw()
  return () => { observer.disconnect(); context.unconfigure(); device.destroy(); canvas.remove() }
}
