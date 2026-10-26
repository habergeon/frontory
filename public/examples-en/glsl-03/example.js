// Raw WebGL allows a compile-error experiment without discarding the working program.
export function mount({ locale = 'ko', container }) {
  const messages =
    locale === 'en'
      ? {
          display001:
            '<label>Iterations <input type="range" min="1" max="32" value="8"></label> <label>Resolution <select><option value="1">1x</option><option value=".5">0.5x</option><option value="2">2x</option></select></label> <button>Try broken shader</button> <button>Restore shader</button> <button>Record</button><pre></pre>',
          display002: 'WebGL unavailable',
          display003: 'Shader compiled and linked. Move pointer.',
          display004: 'Compile/link failed; previous program retained:\n',
          display005: ' iterations · ',
          display006: '×',
          display007: ' · ',
          display008: ' rAF samples: ',
          display009: ' ms (not GPU time)',
        }
      : {
          display001:
            '<label>Iterations <input type="range" min="1" max="32" value="8"></label> <label>Resolution <select><option value="1">1x</option><option value=".5">0.5x</option><option value="2">2x</option></select></label> <button>Try broken shader</button> <button>Restore shader</button> <button>Record</button><pre></pre>',
          display002: 'WebGL unavailable',
          display003: 'Shader compiled and linked. Move pointer.',
          display004: 'Compile/link failed; previous program retained:\n',
          display005: ' iterations · ',
          display006: '×',
          display007: ' · ',
          display008: ' rAF samples: ',
          display009: ' ms (not GPU time)',
        }
  const ui = document.createElement('div')
  ui.innerHTML = messages.display001
  const canvas = document.createElement('canvas')
  canvas.style.cssText = 'width:100%;height:65%;display:block'
  container.append(ui, canvas)
  const gl = canvas.getContext('webgl')
  if (!gl) throw new Error(messages.display002)
  const iterations = ui.querySelector('input'),
    resolution = ui.querySelector('select'),
    [broken, restore, record] = ui.querySelectorAll('button'),
    log = ui.querySelector('pre')
  const vertex =
      'attribute vec2 p;varying vec2 uv;void main(){uv=p*.5+.5;gl_Position=vec4(p,0.,1.);}',
    fragment =
      'precision mediump float;varying vec2 uv;uniform vec2 pointer;uniform float time;uniform int steps;void main(){float v=0.;for(int i=0;i<32;i++){if(i>=steps)break;float f=float(i)+1.;v+=sin(length(uv-pointer)*f*22.-time)/f;}gl_FragColor=vec4(.2+.2*sin(v),.4+.3*cos(v),.7,1.);}'
  let program = null,
    locations = null,
    frame = 0,
    last = 0,
    sum = 0,
    n = 0
  const mouse = [0.5, 0.5]
  const compile = (bad) => {
    const shaders = []
    let next = null
    try {
      for (const [type, source] of [
        [gl.VERTEX_SHADER, vertex],
        [gl.FRAGMENT_SHADER, bad ? 'invalid GLSL' : fragment],
      ]) {
        const s = gl.createShader(Number(type))
        shaders.push(s)
        gl.shaderSource(s, String(source))
        gl.compileShader(s)
        if (!gl.getShaderParameter(s, gl.COMPILE_STATUS))
          throw new Error(gl.getShaderInfoLog(s))
      }
      next = gl.createProgram()
      shaders.forEach((s) => gl.attachShader(next, s))
      gl.linkProgram(next)
      if (!gl.getProgramParameter(next, gl.LINK_STATUS))
        throw new Error(gl.getProgramInfoLog(next))
      if (program) gl.deleteProgram(program)
      program = next
      locations = {
        p: gl.getAttribLocation(program, 'p'),
        time: gl.getUniformLocation(program, 'time'),
        pointer: gl.getUniformLocation(program, 'pointer'),
        steps: gl.getUniformLocation(program, 'steps'),
      }
      log.textContent = messages.display003
    } catch (e) {
      if (next) gl.deleteProgram(next)
      log.textContent = messages.display004 + e.message
    } finally {
      shaders.forEach((s) => gl.deleteShader(s))
    }
  }
  compile(false)
  const buffer = gl.createBuffer()
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
    gl.STATIC_DRAW,
  )
  const resize = () => {
    canvas.width = Math.max(1, canvas.clientWidth * Number(resolution.value))
    canvas.height = Math.max(1, canvas.clientHeight * Number(resolution.value))
    gl.viewport(0, 0, canvas.width, canvas.height)
    sum = n = 0
  }
  const observer = new ResizeObserver(resize)
  observer.observe(canvas)
  resize()
  resolution.onchange = resize
  iterations.oninput = () => {
    sum = n = 0
  }
  canvas.onpointermove = (e) => {
    const r = canvas.getBoundingClientRect()
    mouse[0] = (e.clientX - r.left) / r.width
    mouse[1] = 1 - (e.clientY - r.top) / r.height
  }
  broken.onclick = () => compile(true)
  restore.onclick = () => compile(false)
  record.onclick = () => {
    log.textContent += `\n${iterations.value}${messages.display005}${canvas.width}${messages.display006}${canvas.height}${messages.display007}${n}${messages.display008}${(sum / Math.max(n, 1)).toFixed(2)}${messages.display009}`
  }
  const tick = (now) => {
    if (last) {
      sum += now - last
      n++
    }
    last = now
    gl.useProgram(program)
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
    gl.enableVertexAttribArray(locations.p)
    gl.vertexAttribPointer(locations.p, 2, gl.FLOAT, false, 0, 0)
    gl.uniform1f(locations.time, now / 1000)
    gl.uniform2f(locations.pointer, mouse[0], mouse[1])
    gl.uniform1i(locations.steps, Number(iterations.value))
    gl.drawArrays(gl.TRIANGLES, 0, 6)
    frame = requestAnimationFrame(tick)
  }
  frame = requestAnimationFrame(tick)
  return () => {
    cancelAnimationFrame(frame)
    observer.disconnect()
    gl.deleteProgram(program)
    gl.deleteBuffer(buffer)
    gl.getExtension('WEBGL_lose_context')?.loseContext()
    container.replaceChildren()
  }
}
