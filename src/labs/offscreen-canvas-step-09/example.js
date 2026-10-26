// offscreen-canvas-step-09: Resize 순서 번호
export function mount({
  locale = 'ko',
  container,
  gsap,
  animate,
  React,
  createRoot,
  Motion,
  ScrollTrigger,
}) {
  const messages =
    locale === 'en'
      ? {
          display001:
            '<h3>Resize Sequence Numbers</h3><p>Latest size / Acknowledgment</p><button>Run experiment</button> <output aria-live="polite"></output><div class="stage" style="position:relative;min-height:180px;margin-top:16px;background:#edf3fa;padding:14px;overflow:hidden"></div>',
          display002: 'Request→ack ms ',
          display003: '; samples ',
          display004: '; excludes display compositor latency',
          display005: 'Context lost: saved state retained',
          display006: 'Main-thread fallback: ',
          display007: 'Use main-thread fallback',
          displayFix1001: '2D context unavailable',
          displayFix1002: 'transferControlToOffscreen unavailable',
          displayFix1003: 'manual comparison',
        }
      : {
          display001:
            '<h3>Resize 순서 번호</h3><p>최신 크기 / 응답 확인</p><button>Run experiment</button> <output aria-live="polite"></output><div class="stage" style="position:relative;min-height:180px;margin-top:16px;background:#edf3fa;padding:14px;overflow:hidden"></div>',
          display002: 'Request→ack ms ',
          display003: '; samples ',
          display004: '; excludes display compositor latency',
          display005: 'Context lost: saved state retained',
          display006: 'Main-thread fallback: ',
          display007: 'Use main-thread fallback',
          displayFix1001: '2D context unavailable',
          displayFix1002: 'transferControlToOffscreen unavailable',
          displayFix1003: 'manual comparison',
        }
  const root = document.createElement('section')
  root.style.cssText = 'padding:18px;font:14px system-ui;color:#172b46'
  container.append(root)
  root.innerHTML = messages.display001
  const button = root.querySelector('button'),
    out = root.querySelector('output'),
    stage = /** @type {HTMLDivElement} */ (root.querySelector('.stage'))
  let dead = false
  const stops = []

  let canvas,
    ctx,
    timer,
    last = 0,
    paused = false,
    version = 0
  let state = {
    x: 80,
    y: 70,
    count: 40,
    color: '#38b9ca',
    dpr: 1,
    width: 320,
    height: 160,
  }
  function draw(now = performance.now()) {
    const dt = Math.min((now - last) / 1000 || 0, 0.05)
    last = now
    if (!ctx || paused) return
    ctx.setTransform(state.dpr, 0, 0, state.dpr, 0, 0)
    ctx.fillStyle = '#10253e'
    ctx.fillRect(0, 0, state.width, state.height)
    ctx.fillStyle = state.color
    for (let i = 0; i < state.count; i++) {
      ctx.beginPath()
      ctx.arc(
        (state.x + i * 19) % state.width,
        (state.y + i * 23) % state.height,
        4,
        0,
        Math.PI * 2,
      )
      ctx.fill()
    }
    return dt
  }
  function handle(d) {
    if (d.type === 'init') {
      canvas = d.canvas
      ctx = canvas.getContext('2d')
      if (!ctx) throw Error('2D context unavailable')
      clearInterval(timer)
      draw()
      return { type: 'ready' }
    }
    if (d.type === 'dispose') {
      clearInterval(timer)
      ctx = null
      return { type: 'disposed' }
    }
    if (d.type === 'pause') {
      paused = d.value
      last = performance.now()
      return { type: 'paused', value: paused }
    }
    if (d.type === 'resize') {
      if (d.version < version) return { type: 'stale', version: d.version }
      version = d.version
      Object.assign(state, d.state)
      canvas.width = Math.round(state.width * state.dpr)
      canvas.height = Math.round(state.height * state.dpr)
    }
    if (d.type === 'patch') Object.assign(state, d.state)
    if (d.type === 'batch') {
      const a = new Float32Array(d.buffer)
      state.count = a.length / 2
      state.x = a[0]
      state.y = a[1]
    }
    const dt = draw()
    return {
      type: 'painted',
      version,
      dt,
      width: canvas.width,
      height: canvas.height,
    }
  }
  let worker = null,
    url = '',
    ready = false,
    pending = null,
    frame = 0,
    sent = 0,
    width = 320,
    dpr = 1
  const queued = [],
    samples = []
  const send = (message, transfer = []) => {
    if (worker) {
      if (!ready && message.type !== 'init') queued.push([message, transfer])
      else worker.postMessage(message, transfer)
    } else {
      try {
        receive(handle(message))
      } catch (e) {
        out.textContent = String(e)
      }
    }
  }
  const receive = (r) => {
    if (dead) return
    if (r.type === 'ready') {
      ready = true
      while (queued.length) {
        const [m, t] = queued.shift()
        worker?.postMessage(m, t)
      }
    }
    if (r.type === 'disposed') {
      worker?.terminate()
      worker = null
    }
    if (r.type === 'failure') {
      fallback(r.message)
      return
    }
    if (r.type === 'bitmap') {
      const bitmap = r.bitmap
      const preview = document.createElement('canvas')
      preview.width = bitmap.width
      preview.height = bitmap.height
      preview.getContext('2d').drawImage(bitmap, 0, 0)
      bitmap.close()
      stage.append(preview)
    }
    if (sent && r.type === 'painted') {
      samples.push(performance.now() - sent)
      sent = 0
      out.textContent =
        'Request→ack ms ' +
        samples.at(-1).toFixed(2) +
        '; samples ' +
        samples.length +
        '; excludes display compositor latency'
    } else out.textContent = JSON.stringify(r)
  }
  const patch = (s) => {
    Object.assign(state, s)
    send({ type: 'patch', state: s })
  }
  const resize = (w, h, ratio) => {
    width = w
    dpr = ratio
    canvas.style.width = w + 'px'
    canvas.style.height = h + 'px'
    send({
      type: 'resize',
      version: ++version,
      state: { width: w, height: h, dpr: ratio },
    })
  }
  const bind = () => {
    canvas.style.touchAction = 'none'
    canvas.onpointerdown = (e) => canvas.setPointerCapture(e.pointerId)
    canvas.onpointermove = (e) => {
      const r = canvas.getBoundingClientRect()
      pending = {
        x: ((e.clientX - r.left) * width) / r.width,
        y: ((e.clientY - r.top) * 160) / r.height,
      }
    }
    canvas.onpointerup = canvas.onpointercancel = (e) => {
      if (canvas.hasPointerCapture(e.pointerId))
        canvas.releasePointerCapture(e.pointerId)
    }
    canvas.addEventListener('contextlost', (e) => {
      e.preventDefault()
      out.textContent = 'Context lost: saved state retained'
    })
    canvas.addEventListener('contextrestored', () => patch(state))
  }
  const fallback = (reason) => {
    worker?.terminate()
    worker = null
    queued.length = 0
    canvas?.remove()
    canvas = document.createElement('canvas')
    stage.append(canvas)
    bind()
    handle({ type: 'init', canvas })
    resize(width, 160, dpr)
    out.textContent = 'Main-thread fallback: ' + reason
  }
  const start = () => {
    worker?.terminate()
    if (url) URL.revokeObjectURL(url)
    queued.length = 0
    ready = false
    canvas?.remove()
    canvas = document.createElement('canvas')
    stage.append(canvas)
    bind()
    if (!canvas.transferControlToOffscreen) {
      fallback('transferControlToOffscreen unavailable')
      return
    }
    try {
      url = URL.createObjectURL(
        new Blob(
          [
            "let canvas,ctx,timer,last=0,paused=false,version=0;let state={x:80,y:70,count:40,color:'#38b9ca',dpr:1,width:320,height:160};function draw(now=performance.now()){const dt=Math.min((now-last)/1000||0,.05);last=now;if(!ctx||paused)return;ctx.setTransform(state.dpr,0,0,state.dpr,0,0);ctx.fillStyle='#10253e';ctx.fillRect(0,0,state.width,state.height);ctx.fillStyle=state.color;for(let i=0;i<state.count;i++){ctx.beginPath();ctx.arc((state.x+i*19)%state.width,(state.y+i*23)%state.height,4,0,Math.PI*2);ctx.fill()}return dt}function handle(d){if(d.type==='init'){canvas=d.canvas;ctx=canvas.getContext('2d');if(!ctx)throw Error('2D context unavailable');clearInterval(timer);draw();return {type:'ready'}}if(d.type==='dispose'){clearInterval(timer);ctx=null;return {type:'disposed'}}if(d.type==='pause'){paused=d.value;last=performance.now();return {type:'paused',value:paused}}if(d.type==='resize'){if(d.version<version)return {type:'stale',version:d.version};version=d.version;Object.assign(state,d.state);canvas.width=Math.round(state.width*state.dpr);canvas.height=Math.round(state.height*state.dpr)}if(d.type==='patch')Object.assign(state,d.state);if(d.type==='batch'){const a=new Float32Array(d.buffer);state.count=a.length/2;state.x=a[0];state.y=a[1]}const dt=draw();return {type:'painted',version,dt,width:canvas.width,height:canvas.height}};onmessage=({data:d})=>{try{if(d.type==='crash')throw Error('Injected render failure');if(d.type==='bitmap'){const bitmap=canvas.transferToImageBitmap();postMessage({type:'bitmap',bitmap},[bitmap]);draw();return}postMessage(handle(d))}catch(e){postMessage({type:'failure',message:String(e)})}};",
          ],
          { type: 'text/javascript' },
        ),
      )
      worker = new Worker(url)
      worker.onmessage = (e) => receive(e.data)
      worker.onerror = (e) => fallback(e.message)
      const off = canvas.transferControlToOffscreen()
      worker.postMessage({ type: 'init', canvas: off }, [off])
      resize(width, 160, dpr)
    } catch (e) {
      fallback(String(e))
    }
  }
  start()
  const tick = () => {
    if (pending) {
      patch(pending)
      pending = null
    }
    frame = requestAnimationFrame(tick)
  }
  tick()
  const visible = () => send({ type: 'pause', value: document.hidden })
  document.addEventListener('visibilitychange', visible)
  const fallbackButton = document.createElement('button')
  fallbackButton.textContent = 'Use main-thread fallback'
  fallbackButton.onclick = () => fallback('manual comparison')
  stage.append(fallbackButton)
  button.onclick = () => {
    resize(280, 160, dpr)
    send({
      type: 'resize',
      version: version - 1,
      state: { width: 100, height: 100, dpr },
    })
  }
  stops.push(() => {
    cancelAnimationFrame(frame)
    clearInterval(timer)
    worker?.terminate()
    if (url) URL.revokeObjectURL(url)
    document.removeEventListener('visibilitychange', visible)
  })
  return () => {
    dead = true
    stops.reverse().forEach((fn) => fn())
    root.remove()
  }
}
