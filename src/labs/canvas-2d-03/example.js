// Compare CPU drawing time with the SAME deterministic particles and background.
export function mount({ locale = 'ko', container }) {
  const messages =
    locale === 'en'
      ? {
          display001:
            '<label>Particles <select><option>200</option><option>2000</option><option>10000</option></select></label> <label><input type="checkbox" checked> Cache static background</label> <button>Record sample</button><pre></pre>',
          display002: ' · cache ',
          display003: ' frames · CPU draw ',
          display004: ' ms · rAF ',
          display005: ' ms\n',
        }
      : {
          display001:
            '<label>Particles <select><option>200</option><option>2000</option><option>10000</option></select></label> <label><input type="checkbox" checked> Cache static background</label> <button>Record sample</button><pre></pre>',
          display002: ' · cache ',
          display003: ' frames · CPU draw ',
          display004: ' ms · rAF ',
          display005: ' ms\n',
        }
  const controls = document.createElement('div')
  controls.innerHTML = messages.display001
  const count = controls.querySelector('select'),
    cached = controls.querySelector('input'),
    log = controls.querySelector('pre')
  const canvas = document.createElement('canvas')
  canvas.style.cssText = 'width:100%;height:60%;display:block'
  const background = document.createElement('canvas')
  container.append(controls, canvas)
  const ctx = canvas.getContext('2d'),
    bg = background.getContext('2d')
  if (!ctx || !bg) throw new Error('Canvas unavailable')
  let w = 1,
    h = 1,
    frame = 0,
    total = 0,
    samples = 0,
    last = 0,
    interval = 0
  const paint = (c) => {
    c.fillStyle = '#edf2f7'
    c.fillRect(0, 0, w, h)
    c.strokeStyle = '#ccd9e5'
    for (let i = 0; i < 150; i++) {
      c.beginPath()
      c.arc(w / 2, h / 2, i * 5, 0, Math.PI * 2)
      c.stroke()
    }
  }
  const resize = () => {
    w = Math.max(1, canvas.clientWidth)
    h = Math.max(1, canvas.clientHeight)
    const d = Math.min(devicePixelRatio, 2)
    ;[canvas, background].forEach((c) => {
      c.width = w * d
      c.height = h * d
    })
    ctx.setTransform(d, 0, 0, d, 0, 0)
    bg.setTransform(d, 0, 0, d, 0, 0)
    paint(bg)
    total = samples = interval = 0
  }
  const observer = new ResizeObserver(resize)
  observer.observe(canvas)
  resize()
  count.onchange = cached.onchange = () => {
    total = samples = interval = 0
  }
  controls.querySelector('button').onclick = () => {
    log.textContent += `${count.value}${messages.display002}${cached.checked} · ${samples}${messages.display003}${(total / Math.max(samples, 1)).toFixed(2)}${messages.display004}${(interval / Math.max(samples, 1)).toFixed(2)}${messages.display005}`
  }
  const tick = (now) => {
    const start = performance.now()
    if (cached.checked) ctx.drawImage(background, 0, 0, w, h)
    else paint(ctx)
    ctx.fillStyle = '#3179bf'
    for (let i = 0; i < Number(count.value); i++) {
      const x = (i * 73.37 + now * 0.025) % w,
        y = (i * 47.17) % h
      ctx.fillRect(x, y, 2, 2)
    }
    total += performance.now() - start
    interval += last ? now - last : 0
    last = now
    samples++
    frame = requestAnimationFrame(tick)
  }
  frame = requestAnimationFrame(tick)
  return () => {
    cancelAnimationFrame(frame)
    observer.disconnect()
    container.replaceChildren()
  }
}
