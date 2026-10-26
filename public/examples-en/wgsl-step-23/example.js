// wgsl-step-23: Storage Texture Output
// GPUBufferUsage: MAP_READ=1, COPY_SRC=4, COPY_DST=8, VERTEX=32, UNIFORM=64, STORAGE=128.
export function mount({ container, locale = 'ko' }) {
  const messages =
    locale === 'en'
      ? {
          display001: 'Storage Texture Output',
          display002:
            'Runs actual WebGPU/WGSL. Requires HTTPS/localhost and a supported adapter; unsupported environments display a reason, and CPU results are not presented as GPU results.',
          display003: 'Output color',
          display004: 'Range 0..1',
          display005: 'Some components above 1',
          display006: 'Run / reinitialize',
          display007:
            'WebGPU unavailable: HTTPS/localhost and a supported browser are required. CPU results are not presented as GPU execution.',
          display008: 'No adapter is available.',
          display009: 'Device lost: ',
          display010: ' — use the Run button to request a new device.',
          display011: 'GPU validation: ',
          display012: 'WebGPU canvas unavailable',
          display013: 'rgba8unorm stores 0..1 as 0..255.',
        }
      : {
          display001: 'Storage texture 출력',
          display002:
            '실제 WebGPU/WGSL 실행. HTTPS/localhost와 지원 adapter 필요; 미지원 환경에는 사유를 표시하며 CPU 결과를 GPU로 대체하지 않습니다.',
          display003: '출력 색',
          display004: '0..1 범위',
          display005: '일부 성분 1 초과',
          display006: '실행 / 다시 초기화',
          display007:
            'WebGPU 미지원: HTTPS/localhost와 지원 브라우저가 필요합니다. CPU 결과를 GPU 실행으로 표시하지 않습니다.',
          display008: '사용 가능한 adapter가 없습니다.',
          display009: 'Device lost: ',
          display010: ' — 실행 버튼으로 새 장치를 요청하세요.',
          display011: 'GPU validation: ',
          display012: 'WebGPU canvas 불가',
          display013: 'rgba8unorm은 0..1을 0..255로 저장합니다.',
        }

  container.style.cssText =
    'overflow:auto;background:#101827;color:#e5edf8;font:14px system-ui;padding:12px;box-sizing:border-box'
  const title = document.createElement('h3')
  title.textContent = messages.display001
  const help = document.createElement('p')
  help.textContent = messages.display002
  const choice = document.createElement('select')
  choice.setAttribute('aria-label', messages.display003)
  for (const text of [messages.display004, messages.display005]) {
    const o = document.createElement('option')
    o.textContent = text
    choice.append(o)
  }
  const button = document.createElement('button')
  button.textContent = messages.display006
  const output = document.createElement('pre')
  output.style.cssText = 'white-space:pre-wrap;overflow-wrap:anywhere'
  output.setAttribute('aria-live', 'polite')
  const canvas = document.createElement('canvas')
  canvas.width = 640
  canvas.height = 360
  canvas.style.cssText =
    'width:100%;height:auto;max-height:360px;object-fit:contain'
  container.append(title, help, choice, button, canvas, output)

  let active = true,
    generation = 0,
    release = () => {}
  async function run() {
    const token = ++generation
    release()
    release = () => {}
    button.disabled = true
    const current = () => active && token === generation
    const log = (value) => {
      if (current())
        output.textContent =
          typeof value === 'string' ? value : JSON.stringify(value, null, 2)
    }
    const variant = choice.selectedIndex
    /** @type {any} */ const gpu = navigator['gpu']
    if (!globalThis.isSecureContext || !gpu) {
      log(messages.display007)
      button.disabled = false
      return
    }
    /** @type {any} */ let device
    const resources = []
    let context
    const dispose = () => {
      for (const r of resources) r.destroy()
      resources.length = 0
      context?.unconfigure()
      device?.destroy()
    }
    try {
      const adapter = await gpu.requestAdapter()
      if (!current()) return
      if (!adapter) throw new Error(messages.display008)
      const optional =
        false && adapter.features.has('timestamp-query')
          ? ['timestamp-query']
          : []
      device = await adapter.requestDevice({ requiredFeatures: optional })
      if (!current()) {
        device.destroy()
        return
      }
      release = dispose
      device.lost.then((info) => {
        if (current())
          log(messages.display009 + info.reason + messages.display010)
      })
      device.addEventListener('uncapturederror', (event) =>
        log(messages.display011 + event.error.message),
      )
      const buffer = (data, usage = 128 | 4 | 8) => {
        const bytes =
          typeof data === 'number' ? Math.max(4, data) : data.byteLength
        const b = device.createBuffer({ size: Math.ceil(bytes / 4) * 4, usage })
        resources.push(b)
        if (typeof data !== 'number') device.queue.writeBuffer(b, 0, data)
        return b
      }
      const read = async (b, size) => {
        const staging = buffer(size, 1 | 8)
        const e = device.createCommandEncoder()
        e.copyBufferToBuffer(b, 0, staging, 0, size)
        device.queue.submit([e.finish()])
        await staging.mapAsync(1)
        if (!current()) {
          staging.unmap()
          throw new Error('Cancelled')
        }
        const result = new Float32Array(staging.getMappedRange().slice(0))
        staging.unmap()
        return result
      }
      const compile = async (code) => {
        const m = device.createShaderModule({ code })
        const info = await m.getCompilationInfo()
        if (!current()) throw new Error('Cancelled')
        const errors = info.messages.filter((x) => x.type === 'error')
        if (errors.length)
          throw new Error(
            errors
              .map((x) => 'line ' + x.lineNum + ': ' + x.message)
              .join('\n'),
          )
        return m
      }
      const compute = async (code, entries, groups, constants = {}) => {
        const module = await compile(code)
        const p = await device.createComputePipelineAsync({
          layout: 'auto',
          compute: { module, entryPoint: 'main', constants },
        })
        if (!current()) throw new Error('Cancelled')
        device.pushErrorScope('validation')
        const bind = device.createBindGroup({
          layout: p.getBindGroupLayout(0),
          entries,
        })
        const e = device.createCommandEncoder()
        const pass = e.beginComputePass()
        pass.setPipeline(p)
        pass.setBindGroup(0, bind)
        pass.dispatchWorkgroups(...groups)
        pass.end()
        device.queue.submit([e.finish()])
        const error = await device.popErrorScope()
        if (!current()) throw new Error('Cancelled')
        if (error) throw new Error(error.message)
      }
      const setupCanvas = () => {
        context = canvas.getContext('webgpu')
        if (!context) throw new Error(messages.display012)
        const format = gpu.getPreferredCanvasFormat()
        context.configure({ device, format, alphaMode: 'opaque' })
        return format
      }
      const triangle = `@vertex fn vs(@builtin(vertex_index) i:u32)->@builtin(position) vec4f {let p=array<vec2f,3>(vec2f(-.7,-.6),vec2f(.7,-.6),vec2f(0,.7));return vec4f(p[i],0,1);}
      @fragment fn fs()->@location(0) vec4f{return vec4f(.2,.7,1,1);}`
      const render = async (code = triangle, options = {}) => {
        const format = setupCanvas()
        const module = await compile(code)
        const p = await device.createRenderPipelineAsync({
          layout: 'auto',
          vertex: { module, entryPoint: 'vs' },
          fragment: { module, entryPoint: 'fs', targets: [{ format }] },
          ...options,
        })
        if (!current()) throw new Error('Cancelled')
        const e = device.createCommandEncoder()
        const pass = e.beginRenderPass({
          colorAttachments: [
            {
              view: context.getCurrentTexture().createView(),
              clearValue: [0.02, 0.04, 0.08, 1],
              loadOp: 'clear',
              storeOp: 'store',
            },
          ],
        })
        pass.setPipeline(p)
        pass.draw(3)
        pass.end()
        device.queue.submit([e.finish()])
      }

      const texture = device.createTexture({
        size: [4, 4],
        format: 'rgba8unorm',
        usage: 4 | 8 | 2 | 1,
      })
      resources.push(texture)
      const pixels = new Uint8Array(64)
      for (let i = 0; i < 16; i++) {
        pixels[i * 4] = i % 2 ? 255 : 0
        pixels[i * 4 + 2] = 255
        pixels[i * 4 + 3] = 255
      }
      device.queue.writeTexture(
        { texture },
        pixels,
        { bytesPerRow: 16 },
        { width: 4, height: 4 },
      )
      await compute(
        `@group(0) @binding(0) var image:texture_storage_2d<rgba8unorm,write>;@compute @workgroup_size(4,4) fn main(@builtin(global_invocation_id) id:vec3u){textureStore(image,vec2i(id.xy),vec4f(${variant ? '2.0' : '0.5'},.25,0,1));}`,
        [{ binding: 0, resource: texture.createView() }],
        [1],
      )
      const staging = buffer(1024, 1 | 8)
      const e = device.createCommandEncoder()
      e.copyTextureToBuffer(
        { texture },
        { buffer: staging, bytesPerRow: 256 },
        { width: 4, height: 4 },
      )
      device.queue.submit([e.finish()])
      await staging.mapAsync(1)
      if (!current()) throw new Error('Cancelled')
      const bytes = new Uint8Array(staging.getMappedRange().slice(0))
      staging.unmap()
      log({
        firstPixel: Array.from(bytes.slice(0, 4)),
        note: messages.display013,
      })
    } catch (error) {
      if (current()) {
        log(error instanceof Error ? error.message : String(error))
        dispose()
        release = () => {}
      }
    } finally {
      if (current()) button.disabled = false
    }
  }
  button.onclick = () => {
    void run()
  }
  choice.onchange = () => {
    void run()
  }
  void run()
  return () => {
    active = false
    generation++
    release()
    button.onclick = null
    choice.onchange = null
    container.replaceChildren()
  }
}
