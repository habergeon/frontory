// gaussian-splatting-step-26: deliberately small CPU teaching experiment, not a trained GS renderer.
export function mount({ container, locale = 'ko' }) {
  const messages =
    locale === 'en'
      ? {
          display001: 'Reproducible Camera Benchmarks',
          display002:
            'CPU Canvas2D compositing fixture · no trained data · not a Spark/GPU renderer. Experiment with selected 3D Gaussian mathematics and loader contracts using small inputs. The provided example collects 61 frame-index camera ticks and 60 rAF intervals once. The assignment’s time-based path and 3 runs per configuration require separate implementation; this does not measure GPU time.',
          display003: 'Setting',
          display004: 'Resolution 1.0',
          display005: 'Resolution 0.5',
          display006: 'Run / reinitialize',
          display007: 'Canvas2D unavailable',
          display008: 'angle = frame / 60 * 2pi',
          display009:
            'Actual rAF intervals, not GPU time. Background tabs and browser synchronization affect the results.',
        }
      : {
          display001: '재현 가능한 카메라 벤치마크',
          display002:
            'CPU Canvas2D 합성 fixture · 학습 데이터 없음 · Spark/GPU 렌더러 아님. 3D Gaussian의 일부 수학과 로더 계약만 작은 입력으로 실험합니다. 제공된 예제는 frame index 기준 카메라 tick 61개와 rAF 간격 60개를 한 번 수집합니다. 과제의 시간 기반 경로와 설정별 3회 반복은 별도 구현이며 GPU 시간 측정이 아닙니다.',
          display003: '설정',
          display004: '해상도 1.0',
          display005: '해상도 0.5',
          display006: '실행 / 다시 초기화',
          display007: 'Canvas2D unavailable',
          display008: 'angle = frame / 60 * 2pi',
          display009:
            '실제 rAF 간격; GPU 시간 아님. 백그라운드 탭·브라우저 동기화 영향을 받습니다.',
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

  const ctx = canvas.getContext('2d')
  if (!ctx) throw new Error(messages.display007)
  let active = true,
    generation = 0,
    raf = 0
  const timers = new Set()
  function clear(background = '#07111f') {
    ctx.globalCompositeOperation = 'source-over'
    ctx.fillStyle = background
    ctx.fillRect(0, 0, canvas.width, canvas.height)
  }
  function draw(p) {
    ctx.save()
    ctx.translate(p.x, p.y)
    ctx.rotate(p.angle)
    ctx.scale(p.sx, p.sy)
    const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, 3)
    for (let i = 0; i <= 24; i++) {
      const r = i / 8
      gradient.addColorStop(
        i / 24,
        'rgba(' +
          p.color.map((x) => Math.round(x)).join(',') +
          ',' +
          (i === 24 ? 0 : p.opacity * Math.exp(-0.5 * r * r)) +
          ')',
      )
    }
    ctx.fillStyle = gradient
    ctx.fillRect(-3, -3, 6, 6)
    ctx.restore()
  }
  function project(p, distance) {
    const depth = Math.max(0.1, distance + p.z)
    return { x: 320 + (p.x * 280) / depth, y: 180 - (p.y * 280) / depth, depth }
  }
  function makeData(count) {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.sin(i * 2.399) * (0.2 + (i % 17) / 17),
      y: Math.cos(i * 2.399) * (0.2 + (i % 17) / 17),
      z: Math.sin(i * 0.7) * 0.4,
      color: [
        50 + ((i * 17) % 190),
        80 + ((i * 13) % 170),
        130 + ((i * 7) % 125),
      ],
    }))
  }
  const data = makeData(256)
  function renderData(points, angle) {
    clear()
    const scale = canvas.width / 640
    const list = points
      .map((p) => {
        const x = p.x * Math.cos(angle) - p.z * Math.sin(angle),
          z = p.x * Math.sin(angle) + p.z * Math.cos(angle)
        return { ...p, ...project({ ...p, x, z }, 3) }
      })
      .sort((a, b) => b.depth - a.depth)
    ctx.save()
    ctx.scale(scale, scale)
    for (const p of list)
      draw({ ...p, sx: 6, sy: 3, angle: 0.3, opacity: 0.65 })
    ctx.restore()
  }
  async function run() {
    generation++
    const token = generation
    cancelAnimationFrame(raf)
    canvas.onclick = null
    canvas.onkeydown = null
    canvas.width = 640
    canvas.height = 360
    clear()
    const variant = choice.selectedIndex
    const isCurrent = () => active && token === generation
    const log = (value) => {
      if (isCurrent()) output.textContent = JSON.stringify(value, null, 2)
    }
    try {
      canvas.width = variant ? 320 : 640
      canvas.height = variant ? 180 : 360
      const times = []
      let index = 0,
        previous = 0
      function tick(now) {
        if (!isCurrent()) return
        if (previous) times.push(now - previous)
        previous = now
        const angle = (index / 60) * Math.PI * 2
        renderData(data, angle)
        index++
        if (index < 61) {
          raf = requestAnimationFrame(tick)
          return
        }
        const sorted = times.slice().sort((a, b) => a - b)
        const report = {
          fixture: 'synthetic-seed-17-v1',
          path: messages.display008,
          frames: times.length,
          renderScale: variant ? 0.5 : 1,
          medianRafMs: sorted[Math.floor(sorted.length * 0.5)],
          p95RafMs: sorted[Math.floor(sorted.length * 0.95)],
          note: messages.display009,
        }
        log(report)
      }
      raf = requestAnimationFrame(tick)
    } catch (error) {
      log({ error: String(error) })
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
    cancelAnimationFrame(raf)
    for (const timer of timers) clearTimeout(timer)
    timers.clear()
    canvas.onclick = null
    canvas.onkeydown = null
    button.onclick = null
    choice.onchange = null
    container.replaceChildren()
  }
}
