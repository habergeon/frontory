// webgpu-step-27: Acceptance of the Integrated Particle Experiment
// GPUBufferUsage: MAP_READ=1, COPY_SRC=4, COPY_DST=8, VERTEX=32, UNIFORM=64, STORAGE=128.
export function mount({ container, locale = 'ko' }) {
  const messages =
    locale === 'en'
      ? {
          display001: 'Acceptance of the Integrated Particle Experiment',
          display002:
            'Runs real WebGPU/WGSL. Requires HTTPS/localhost and a supported adapter; unsupported environments display a reason, and CPU results are not substituted for GPU results.',
          display003: 'Starting state',
          display004: 'Existing session',
          display005: 'New session with saved settings',
          display006: 'Run / reinitialize',
          display007:
            'WebGPU unavailable: HTTPS/localhost and a supported browser are required. CPU results are not presented as GPU execution.',
          display008: 'No adapter is available.',
          display009: 'Device lost: ',
          display010: ' — use the Run button to request a new device.',
          display011: 'GPU validation: ',
          display012: 'WebGPU canvas unavailable',
          display013:
            'Each press of Run reconstructs particles with a new device and the same initial CPU input. This makes no claim about training or simulation performance.',
        }
      : {
          display001: '통합 입자 실험 인수',
          display002:
            '실제 WebGPU/WGSL 실행. HTTPS/localhost와 지원 adapter 필요; 미지원 환경에는 사유를 표시하며 CPU 결과를 GPU로 대체하지 않습니다.',
          display003: '시작 상태',
          display004: '기존 세션',
          display005: '새 세션과 저장 설정',
          display006: '실행 / 다시 초기화',
          display007:
            'WebGPU 미지원: HTTPS/localhost와 지원 브라우저가 필요합니다. CPU 결과를 GPU 실행으로 표시하지 않습니다.',
          display008: '사용 가능한 adapter가 없습니다.',
          display009: 'Device lost: ',
          display010: ' — 실행 버튼으로 새 장치를 요청하세요.',
          display011: 'GPU validation: ',
          display012: 'WebGPU canvas 불가',
          display013:
            '실행 버튼마다 새 device와 동일 CPU 초기 입력에서 입자를 재구성합니다. 학습·시뮬레이션 성능 주장이 아닙니다.',
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

      const n = 64
      const src = buffer(
        Float32Array.from(
          { length: n * 2 },
          (_, i) =>
            (i % 2
              ? Math.floor(i / 2) / n
              : ((Math.floor(i / 2) * 17) % n) / n) *
              1.6 -
            0.8,
        ),
      )
      const dst = buffer(n * 8, 128 | 4 | 8 | 32)
      await compute(
        '@group(0) @binding(0) var<storage,read> a:array<vec2f>;@group(0) @binding(1) var<storage,read_write> b:array<vec2f>;@compute @workgroup_size(64) fn main(@builtin(global_invocation_id) id:vec3u){if(id.x>=arrayLength(&a)){return;}b[id.x]=a[id.x]+vec2f(.05*sin(f32(id.x)),0);}',
        [
          { binding: 0, resource: { buffer: src } },
          { binding: 1, resource: { buffer: dst } },
        ],
        [Math.ceil(n / 64)],
      )
      const format = setupCanvas()
      const module = await compile(
        '@vertex fn vs(@location(0) center:vec2f,@builtin(vertex_index) i:u32)->@builtin(position) vec4f{let p=array<vec2f,3>(vec2f(-.012,-.012),vec2f(.012,-.012),vec2f(0,.018));return vec4f(center+p[i],0,1);}@fragment fn fs()->@location(0) vec4f{return vec4f(.2,.8,.6,1);}',
      )
      const p = await device.createRenderPipelineAsync({
        layout: 'auto',
        vertex: {
          module,
          entryPoint: 'vs',
          buffers: [
            {
              arrayStride: 8,
              stepMode: 'instance',
              attributes: [
                { shaderLocation: 0, offset: 0, format: 'float32x2' },
              ],
            },
          ],
        },
        fragment: { module, entryPoint: 'fs', targets: [{ format }] },
      })
      if (!current()) throw new Error('Cancelled')
      const e = device.createCommandEncoder()
      const pass = e.beginRenderPass({
        colorAttachments: [
          {
            view: context.getCurrentTexture().createView(),
            clearValue: [0, 0, 0, 1],
            loadOp: 'clear',
            storeOp: 'store',
          },
        ],
      })
      pass.setPipeline(p)
      pass.setVertexBuffer(0, dst)
      pass.draw(3, n)
      pass.end()
      device.queue.submit([e.finish()])
      log({ instances: n, drawCalls: 1, vertexInvocations: n * 3 })
      log({ seed: 'index*17 modulo n', count: n, note: messages.display013 })
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
