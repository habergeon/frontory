// gsap-step-17: Pointer와 QuickTo
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
            '<h3>Pointer and QuickTo</h3><p>Input Frequency / QuickTo</p><button>Run experiment</button> <output aria-live="polite"></output><div class="stage" style="position:relative;min-height:180px;margin-top:16px;background:#edf3fa;padding:14px;overflow:hidden"></div>',
          display002: 'GSAP',
          display003: 'One reusable tween follows pointer',
        }
      : {
          display001:
            '<h3>Pointer와 QuickTo</h3><p>입력 빈도 / QuickTo</p><button>Run experiment</button> <output aria-live="polite"></output><div class="stage" style="position:relative;min-height:180px;margin-top:16px;background:#edf3fa;padding:14px;overflow:hidden"></div>',
          display002: 'GSAP',
          display003: 'One reusable tween follows pointer',
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
  const xTo = gsap.quickTo(box, 'x', { duration: 0.3, ease: 'power3' })
  stage.addEventListener('pointermove', (e) => {
    xTo(
      Math.max(
        0,
        Math.min(240, e.clientX - stage.getBoundingClientRect().left - 24),
      ),
    )
    out.textContent = 'One reusable tween follows pointer'
  })
  button.onclick = () => xTo(120)
  return () => {
    dead = true
    stops.reverse().forEach((fn) => fn())
    root.remove()
  }
}
