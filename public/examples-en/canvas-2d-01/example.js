// Compare CSS coordinates with the backing buffer pixel count. Try changing SCALE to 1 or 2.
export function mount({locale='ko', container }) {
  const messages=locale==='en'?{"display001":"Canvas 2D coordinates and pixels","display002":"CSS ","display003":" / buffer "}:{"display001":"Canvas 2D 좌표와 픽셀","display002":"CSS ","display003":" / buffer "};
  const SCALE = Math.min(devicePixelRatio, 2)
  const canvas = document.createElement('canvas')
  canvas.setAttribute('aria-label', messages.display001)
  container.append(canvas)
  const context = canvas.getContext('2d')
  const draw = () => {
    const w = container.clientWidth, h = container.clientHeight
    canvas.width = Math.max(1, w * SCALE); canvas.height = Math.max(1, h * SCALE)
    context.setTransform(SCALE, 0, 0, SCALE, 0, 0)
    context.fillStyle = '#edf2f7'; context.fillRect(0, 0, w, h)
    context.fillStyle = '#3179bf'; context.fillRect(30, 70, 100, 100)
    context.beginPath(); context.arc(w / 2, h / 2, 45, 0, Math.PI * 2); context.fillStyle = '#e97645'; context.fill()
    context.fillStyle = '#172c3f'; context.font = '14px system-ui'
    context.fillText(messages.display002 + w + '×' + h + messages.display003 + canvas.width + '×' + canvas.height, 16, 30)
  }
  const observer = new ResizeObserver(draw); observer.observe(container); draw()
  return () => { observer.disconnect(); canvas.remove() }
}
