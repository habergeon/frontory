// Canvas 소유권을 Worker로 넘깁니다. 색상과 SPEED를 수정해 보세요.
export function mount({ container }) {
  const canvas = document.createElement('canvas')
  if (!canvas.transferControlToOffscreen) { container.textContent = '이 브라우저는 OffscreenCanvas 이전을 지원하지 않습니다.'; return () => container.replaceChildren() }
  container.append(canvas)
  const code = `let canvas, context, t=0; self.onmessage = e => { if(e.data.canvas){canvas=e.data.canvas;context=canvas.getContext('2d');setInterval(()=>{t+=0.04;context.fillStyle='#edf2f7';context.fillRect(0,0,canvas.width,canvas.height);context.fillStyle='#3179bf';context.beginPath();context.arc(canvas.width/2+Math.sin(t)*60,canvas.height/2,30,0,Math.PI*2);context.fill();},16)} if(e.data.width){canvas.width=e.data.width;canvas.height=e.data.height;} };`
  const url = URL.createObjectURL(new Blob([code], { type: 'text/javascript' }))
  const worker = new Worker(url)
  const offscreen = canvas.transferControlToOffscreen()
  worker.postMessage({ canvas: offscreen }, [offscreen])
  const resize = () => worker.postMessage({ width: Math.max(1, container.clientWidth), height: Math.max(1, container.clientHeight) })
  const observer = new ResizeObserver(resize); observer.observe(container); resize()
  return () => { observer.disconnect(); worker.terminate(); URL.revokeObjectURL(url); canvas.remove() }
}
