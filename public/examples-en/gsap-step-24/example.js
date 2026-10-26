// gsap-step-24: Measuring Frame Cost
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
            '<h3>Measuring Frame Cost</h3><p>Long Frames / Recording Conditions</p><button>Run experiment</button> <output aria-live="polite"></output><div class="stage" style="position:relative;min-height:180px;margin-top:16px;background:#edf3fa;padding:14px;overflow:hidden"></div>',
          display002: 'GSAP',
          display003: 'Last ',
          display004: ' frames; >32ms: ',
        }
      : {
          display001:
            '<h3>프레임 비용 측정</h3><p>긴 프레임 / 조건 기록</p><button>Run experiment</button> <output aria-live="polite"></output><div class="stage" style="position:relative;min-height:180px;margin-top:16px;background:#edf3fa;padding:14px;overflow:hidden"></div>',
          display002: 'GSAP',
          display003: 'Last ',
          display004: ' frames; >32ms: ',
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
  const box = document.createElement('div')
  box.textContent = 'GSAP'
  box.style.cssText =
    'width:64px;height:48px;background:#76d3de;display:grid;place-items:center'
  stage.append(box)
  stops.push(() => gsap.killTweensOf(box))
  const samples = []
  const tick = (time, delta) => {
    samples.push(delta)
    if (samples.length > 120) samples.shift()
    out.textContent =
      'Last ' +
      samples.length +
      ' frames; >32ms: ' +
      samples.filter((x) => x > 32).length
  }
  gsap.ticker.add(tick)
  button.onclick = () => {
    const t = performance.now()
    while (performance.now() - t < 60) {}
  }
  stops.push(() => gsap.ticker.remove(tick))
  return () => {
    dead = true
    stops.reverse().forEach((fn) => fn())
    root.remove()
  }
}
