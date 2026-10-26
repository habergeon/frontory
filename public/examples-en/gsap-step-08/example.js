// gsap-step-08: Context and Restoration
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
            '<h3>Context and Restoration</h3><p>Context / Revert</p><button>Run experiment</button> <output aria-live="polite"></output><div class="stage" style="position:relative;min-height:180px;margin-top:16px;background:#edf3fa;padding:14px;overflow:hidden"></div>',
          display002: 'GSAP',
          display003: 'revert restored original inline styles',
          display004: 'Context active',
        }
      : {
          display001:
            '<h3>Context와 복원</h3><p>Context / Revert</p><button>Run experiment</button> <output aria-live="polite"></output><div class="stage" style="position:relative;min-height:180px;margin-top:16px;background:#edf3fa;padding:14px;overflow:hidden"></div>',
          display002: 'GSAP',
          display003: 'revert restored original inline styles',
          display004: 'Context active',
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
  let ctx
  button.onclick = () => {
    if (ctx) {
      ctx.revert()
      ctx = null
      out.textContent = 'revert restored original inline styles'
    } else {
      ctx = gsap.context(
        () => gsap.to(box, { x: 220, rotation: 90, duration: 1 }),
        root,
      )
      out.textContent = 'Context active'
    }
  }
  stops.push(() => ctx?.revert())
  return () => {
    dead = true
    stops.reverse().forEach((fn) => fn())
    root.remove()
  }
}
