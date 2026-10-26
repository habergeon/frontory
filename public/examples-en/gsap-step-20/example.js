// gsap-step-20: Completion Callbacks and Interruption
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
            '<h3>Completion Callbacks and Interruption</h3><p>Meaning of Completion / Request Generation</p><button>Run experiment</button> <output aria-live="polite"></output><div class="stage" style="position:relative;min-height:180px;margin-top:16px;background:#edf3fa;padding:14px;overflow:hidden"></div>',
          display002: 'GSAP',
          display003: 'Request ',
          display004: ' pending',
          display005: ' completed',
        }
      : {
          display001:
            '<h3>완료 콜백과 중단</h3><p>완료 의미 / 요청 세대</p><button>Run experiment</button> <output aria-live="polite"></output><div class="stage" style="position:relative;min-height:180px;margin-top:16px;background:#edf3fa;padding:14px;overflow:hidden"></div>',
          display002: 'GSAP',
          display003: 'Request ',
          display004: ' pending',
          display005: ' completed',
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
  let generation = 0
  button.onclick = () => {
    const token = ++generation
    gsap.killTweensOf(box)
    out.textContent = 'Request ' + token + ' pending'
    gsap.fromTo(
      box,
      { x: 0 },
      {
        x: 230,
        duration: 1,
        onComplete: () => {
          if (token === generation)
            out.textContent = 'Request ' + token + ' completed'
        },
      },
    )
  }
  return () => {
    dead = true
    stops.reverse().forEach((fn) => fn())
    root.remove()
  }
}
