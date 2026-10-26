// Actual compute dispatch and GPU readback. Timings are wall-clock, not GPU timestamp queries.
export async function mount({ locale = 'ko', container }) {
  const messages =
    locale === 'en'
      ? {
          display001:
            '<h3>Compute versus CPU + readback costs</h3><label>Array length <input type="number" min="1" max="262144" value="1003"></label> <label>Workgroup <select><option>32</option><option selected>64</option><option>128</option></select></label> <button>Dispatch and compare</button><pre aria-live="polite"></pre>',
          display002:
            'WebGPU unavailable: real compute requires a supported HTTPS/localhost browser.',
          display003: 'No adapter available',
          display004: 'n=',
          display005: '; group=',
          display006: '; dispatched=',
          display007: '; guarded extras=',
          display008: '\nCPU reference: ',
          display009: ' ms\nsubmit → queue complete (includes copy): ',
          display010: ' ms\nmap + JS copy: ',
          display011: ' ms\nGPU path end-to-end (includes pipeline creation): ',
          display012: ' ms\nmax absolute error=',
          display013: '; last=',
          display014: ' expected=',
          display015: ' — queue duration is not isolated GPU execution time.',
          display016: 'Device lost: ',
        }
      : {
          display001:
            '<h3>Compute versus CPU + readback costs</h3><label>Array length <input type="number" min="1" max="262144" value="1003"></label> <label>Workgroup <select><option>32</option><option selected>64</option><option>128</option></select></label> <button>Dispatch and compare</button><pre aria-live="polite"></pre>',
          display002:
            'WebGPU unavailable: real compute requires a supported HTTPS/localhost browser.',
          display003: 'No adapter available',
          display004: 'n=',
          display005: '; group=',
          display006: '; dispatched=',
          display007: '; guarded extras=',
          display008: '\nCPU reference: ',
          display009: ' ms\nsubmit → queue complete (includes copy): ',
          display010: ' ms\nmap + JS copy: ',
          display011: ' ms\nGPU path end-to-end (includes pipeline creation): ',
          display012: ' ms\nmax absolute error=',
          display013: '; last=',
          display014: ' expected=',
          display015: ' — queue duration is not isolated GPU execution time.',
          display016: 'Device lost: ',
        }
  const root = document.createElement('section')
  root.style.cssText = 'padding:16px'
  container.append(root)
  root.innerHTML = messages.display001
  const output = root.querySelector('pre'),
    button = root.querySelector('button'),
    input = root.querySelector('input'),
    select = root.querySelector('select')
  /** @type {any} */ const gpu = /** @type {any} */ (navigator).gpu
  if (!gpu) {
    output.textContent = messages.display002
    button.disabled = true
    return () => root.remove()
  }
  const adapter = await gpu.requestAdapter()
  if (!adapter) {
    output.textContent = messages.display003
    button.disabled = true
    return () => root.remove()
  }
  const device = await adapter.requestDevice()
  let alive = true
  const owned = new Set()
  const run = async () => {
    button.disabled = true
    const buffers = []
    const make = (size, usage) => {
      const b = device.createBuffer({ size, usage })
      buffers.push(b)
      owned.add(b)
      return b
    }
    try {
      const n = Math.max(
          1,
          Math.min(262144, Math.trunc(Number(input.value) || 1003)),
        ),
        group = Number(select.value)
      input.value = String(n)
      const data = Float32Array.from({ length: n }, (_, i) => i % 100)
      const start = performance.now()
      const expected = Float32Array.from(data, (x) => x * 2 + 1)
      const cpu = performance.now() - start
      const totalStart = performance.now()
      const module = device.createShaderModule({
        code: `@group(0) @binding(0) var<storage,read_write> values:array<f32>;
 @compute @workgroup_size(${group}) fn main(@builtin(global_invocation_id) id:vec3u) {
   if (id.x >= arrayLength(&values)) { return; } // Extra invocations MUST exit.
   values[id.x]=values[id.x]*2.0+1.0;
 }`,
      })
      const info = await module.getCompilationInfo()
      const errors = info.messages.filter((m) => m.type === 'error')
      if (errors.length) throw Error(errors.map((m) => m.message).join('\n'))
      const pipeline = await device.createComputePipelineAsync({
        layout: 'auto',
        compute: { module, entryPoint: 'main' },
      })
      const storage = make(n * 4, 128 | 8 | 4),
        readback = make(n * 4, 1 | 8)
      device.queue.writeBuffer(storage, 0, data)
      const bind = device.createBindGroup({
        layout: pipeline.getBindGroupLayout(0),
        entries: [{ binding: 0, resource: { buffer: storage } }],
      })
      const encoder = device.createCommandEncoder()
      const pass = encoder.beginComputePass()
      pass.setPipeline(pipeline)
      pass.setBindGroup(0, bind)
      pass.dispatchWorkgroups(Math.ceil(n / group))
      pass.end()
      encoder.copyBufferToBuffer(storage, 0, readback, 0, n * 4)
      const submitStart = performance.now()
      device.queue.submit([encoder.finish()])
      await device.queue.onSubmittedWorkDone()
      const completion = performance.now() - submitStart
      const readStart = performance.now()
      await readback.mapAsync(1)
      const actual = new Float32Array(readback.getMappedRange()).slice()
      readback.unmap()
      const readTime = performance.now() - readStart
      let maxError = 0
      for (let i = 0; i < n; i++)
        maxError = Math.max(maxError, Math.abs(actual[i] - expected[i]))
      if (alive)
        output.textContent = `${messages.display004}${n}${messages.display005}${group}${messages.display006}${Math.ceil(n / group) * group}${messages.display007}${Math.ceil(n / group) * group - n}${messages.display008}${cpu.toFixed(3)}${messages.display009}${completion.toFixed(3)}${messages.display010}${readTime.toFixed(3)}${messages.display011}${(performance.now() - totalStart).toFixed(3)}${messages.display012}${maxError}${messages.display013}${actual[n - 1]}${messages.display014}${expected[n - 1]}\n${maxError === 0 ? 'PASS' : 'FAIL'}${messages.display015}`
    } catch (error) {
      if (alive) output.textContent = String(error)
    } finally {
      buffers.forEach((b) => {
        b.destroy()
        owned.delete(b)
      })
      if (alive) button.disabled = false
    }
  }
  button.onclick = run
  await run()
  device.lost.then((info) => {
    if (alive) output.textContent = messages.display016 + info.message
  })
  return () => {
    alive = false
    owned.forEach((b) => b.destroy())
    device.destroy()
    root.remove()
  }
}
