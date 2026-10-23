// px/second movement; pointer coordinates stay in CSS pixels regardless of DPR.
export function mount({locale='ko', container }) {
  const messages=locale==='en'?{"display001":"Pause","display002":"Resume","display003":" Δt ","display004":" ms · speed ","display005":" px/s","display006":" · click ","display007":" · click canvas"}:{"display001":"Pause","display002":"Resume","display003":" Δt ","display004":" ms · speed ","display005":" px/s","display006":" · click ","display007":" · click canvas"};
  const pause = document.createElement('button'); pause.textContent = messages.display001
  const info = document.createElement('output')
  const canvas = document.createElement('canvas'); canvas.style.cssText = 'width:100%;height:calc(100% - 40px);display:block;touch-action:none'
  container.append(pause, info, canvas)
  const ctx = canvas.getContext('2d'); if (!ctx) throw new Error('Canvas unavailable')
  let w = 1, h = 1, x = 40, y = 40, vx = 120, vy = 85, paused = false, last = 0, frame = 0, mark = null
  const resize = () => { const r = canvas.getBoundingClientRect(); w = r.width; h = r.height; const d = Math.min(devicePixelRatio, 2); canvas.width = Math.max(1, w*d); canvas.height = Math.max(1, h*d); ctx.setTransform(d,0,0,d,0,0); x = Math.min(x, w-16); y = Math.min(y,h-16) }
  const observer = new ResizeObserver(resize); observer.observe(canvas); resize()
  pause.onclick = () => { paused = !paused; pause.textContent = paused ? messages.display002 : messages.display001; last = 0 }
  canvas.onpointerdown = e => { const r = canvas.getBoundingClientRect(); mark = { x: (e.clientX-r.left)*w/r.width, y: (e.clientY-r.top)*h/r.height } }
  const tick = now => {
    const dt = last ? Math.min((now-last)/1000, .05) : 0; last = now
    if (!paused) { x += vx*dt; y += vy*dt; if (x<16 || x>w-16) { vx *= -1; x=Math.max(16,Math.min(w-16,x)) } if (y<16 || y>h-16) { vy *= -1; y=Math.max(16,Math.min(h-16,y)) } }
    ctx.fillStyle='#edf2f7'; ctx.fillRect(0,0,w,h); ctx.fillStyle='#3179bf'; ctx.beginPath(); ctx.arc(x,y,16,0,Math.PI*2); ctx.fill()
    if (mark) { ctx.strokeStyle='#d65d35'; ctx.beginPath(); ctx.arc(mark.x,mark.y,9,0,Math.PI*2); ctx.stroke() }
    info.textContent = `${messages.display003}${(dt*1000).toFixed(1)}${messages.display004}${Math.hypot(vx,vy).toFixed(0)}${messages.display005}` + (mark ? `${messages.display006}${mark.x.toFixed(0)},${mark.y.toFixed(0)}` : messages.display007)
    frame=requestAnimationFrame(tick)
  }; frame=requestAnimationFrame(tick)
  return () => { cancelAnimationFrame(frame); observer.disconnect(); pause.onclick=null; canvas.onpointerdown=null; container.replaceChildren() }
}
