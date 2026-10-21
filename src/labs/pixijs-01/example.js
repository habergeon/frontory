// PixiJS Application과 Graphics입니다. SPEED를 바꾸고 원을 클릭해 보세요.
export async function mount({ PIXI, container }) {
  const SPEED = 0.02
  const app = new PIXI.Application()
  await app.init({ preference: 'webgl', background: '#edf2f7', width: container.clientWidth, height: container.clientHeight })
  container.append(app.canvas)
  const circle = new PIXI.Graphics().circle(0, 0, 40).fill('#3179bf')
  circle.eventMode = 'static'; circle.cursor = 'pointer'
  circle.on('pointertap', () => { circle.scale.set(circle.scale.x === 1 ? 1.5 : 1) })
  app.stage.addChild(circle)
  let time = 0
  app.ticker.add(ticker => { time += ticker.deltaTime * SPEED; circle.position.set(app.screen.width / 2 + Math.sin(time) * 70, app.screen.height / 2) })
  const observer = new ResizeObserver(() => app.renderer.resize(Math.max(1, container.clientWidth), Math.max(1, container.clientHeight)))
  observer.observe(container)
  return () => { observer.disconnect(); app.destroy(true, { children: true }) }
}
