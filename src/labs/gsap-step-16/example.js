// gsap-step-16: 연속 입력과 Overwrite
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
            '<h3>Repeated Input and Overwrite</h3><p>Contention / Overwrite</p><button>Run experiment</button> <output aria-live="polite"></output><div class="stage" style="position:relative;min-height:180px;margin-top:16px;background:#edf3fa;padding:14px;overflow:hidden"></div>',
          display002: 'GSAP',
          display003: 'Latest target ',
          display004: '; click rapidly',
        }
      : {
          display001:
            '<h3>연속 입력과 Overwrite</h3><p>경합 / Overwrite</p><button>Run experiment</button> <output aria-live="polite"></output><div class="stage" style="position:relative;min-height:180px;margin-top:16px;background:#edf3fa;padding:14px;overflow:hidden"></div>',
          display002: 'GSAP',
          display003: 'Latest target ',
          display004: '; click rapidly',
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
  let target = 0
  button.onclick = () => {
    target = target === 0 ? 240 : 0
    gsap.to(box, { x: target, duration: 1.4, overwrite: true })
    out.textContent = 'Latest target ' + target + '; click rapidly'
  }
  return () => {
    dead = true
    stops.reverse().forEach((fn) => fn())
    root.remove()
  }
}
